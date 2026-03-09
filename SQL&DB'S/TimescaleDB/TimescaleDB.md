# TimescaleDB

## Introduction

TimescaleDB is an open-source time-series database built on PostgreSQL. It provides the power and reliability of PostgreSQL with optimizations specifically designed for time-series data, offering automatic partitioning (hypertables), continuous aggregates, data retention policies, and specialized time-series functions.

### Key Features

- **Built on PostgreSQL**: Full SQL support with PostgreSQL ecosystem
- **Automatic Partitioning**: Hypertables automatically partition data by time
- **High Performance**: Optimized for time-series workloads
- **Continuous Aggregates**: Materialized views for real-time analytics
- **Data Retention**: Automated data lifecycle management
- **Compression**: Native compression for historical data
- **Multi-Node Scaling**: Distributed hypertables across nodes
- **Time-Series Functions**: Built-in functions for time-series analysis
- **PostgreSQL Extensions**: Compatible with PostGIS, pgvector, etc.
- **ACID Compliance**: Full transactional support

### Common Use Cases

- **IoT and Sensor Data**: Device metrics, environmental monitoring
- **Application Monitoring**: Performance metrics, logs, traces
- **Financial Data**: Stock prices, trading data, market analysis
- **DevOps Monitoring**: Server metrics, container stats, alerts
- **Industrial Analytics**: Manufacturing data, equipment telemetry
- **User Analytics**: Event tracking, user behavior
- **Network Monitoring**: Traffic analysis, network performance
- **Energy Management**: Power consumption, smart grid data

## Installation & Setup

### Docker Installation

```bash
# Pull TimescaleDB image
docker pull timescale/timescaledb:latest-pg16

# Run TimescaleDB container
docker run -d \
  --name timescaledb \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=password \
  timescale/timescaledb:latest-pg16

# Access psql
docker exec -it timescaledb psql -U postgres

# Verify TimescaleDB installation
docker exec -it timescaledb psql -U postgres -c "SELECT default_version, installed_version FROM pg_available_extensions WHERE name = 'timescaledb';"
```

### Docker Compose Setup

```yaml
version: '3.8'

services:
  timescaledb:
    image: timescale/timescaledb:latest-pg16
    container_name: timescaledb
    hostname: timescaledb
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=postgres
    ports:
      - "5432:5432"
    volumes:
      - timescaledb-data:/var/lib/postgresql/data
      - ./init:/docker-entrypoint-initdb.d
    networks:
      - timescale-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Grafana for visualization (optional)
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - timescale-network
    depends_on:
      - timescaledb

volumes:
  timescaledb-data:
  grafana-data:

networks:
  timescale-network:
    driver: bridge
```

### Linux Installation (Ubuntu/Debian)

```bash
# Add PostgreSQL APT repository
sudo apt install gnupg postgresql-common apt-transport-https lsb-release wget
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh

# Add TimescaleDB repository
echo "deb https://packagecloud.io/timescale/timescaledb/ubuntu/ $(lsb_release -c -s) main" | sudo tee /etc/apt/sources.list.d/timescaledb.list
wget --quiet -O - https://packagecloud.io/timescale/timescaledb/gpgkey | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/timescaledb.gpg

# Install TimescaleDB
sudo apt update
sudo apt install timescaledb-2-postgresql-16

# Configure TimescaleDB
sudo timescaledb-tune --pg-config=/usr/lib/postgresql/16/bin/pg_config

# Restart PostgreSQL
sudo systemctl restart postgresql

# Connect to PostgreSQL
sudo -u postgres psql

# Create extension
CREATE EXTENSION IF NOT EXISTS timescaledb;
```

### Initial Setup

```sql
-- Connect to PostgreSQL
psql -U postgres -h localhost

-- Create database
CREATE DATABASE iot_data;

-- Connect to database
\c iot_data

-- Enable TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Verify installation
SELECT default_version, installed_version 
FROM pg_available_extensions 
WHERE name = 'timescaledb';
```

## Core Concepts

### Hypertables

Hypertables are the core abstraction in TimescaleDB - they look like regular PostgreSQL tables but are automatically partitioned by time.

```sql
-- Create regular table
CREATE TABLE sensor_data (
    time TIMESTAMPTZ NOT NULL,
    sensor_id INTEGER NOT NULL,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    location TEXT
);

-- Convert to hypertable
SELECT create_hypertable('sensor_data', 'time');

-- Create hypertable with custom chunk interval
SELECT create_hypertable(
    'sensor_data',
    'time',
    chunk_time_interval => INTERVAL '1 day'
);

-- Create hypertable with space partitioning
SELECT create_hypertable(
    'sensor_data',
    'time',
    partitioning_column => 'sensor_id',
    number_partitions => 4
);
```

### Chunks

Chunks are the internal partitions created by TimescaleDB.

```sql
-- View chunks
SELECT * FROM timescaledb_information.chunks
WHERE hypertable_name = 'sensor_data';

-- View chunk statistics
SELECT 
    chunk_name,
    range_start,
    range_end,
    pg_size_pretty(total_bytes) as total_size
FROM timescaledb_information.chunks
WHERE hypertable_name = 'sensor_data'
ORDER BY range_start DESC;

-- Drop specific chunk
SELECT drop_chunks('sensor_data', older_than => INTERVAL '30 days');

-- Manually create chunk
SELECT create_chunk('sensor_data', 
    older_than => NOW() - INTERVAL '1 day',
    newer_than => NOW()
);
```

### Continuous Aggregates

Continuous aggregates are materialized views optimized for time-series data.

```sql
-- Create continuous aggregate
CREATE MATERIALIZED VIEW sensor_data_hourly
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', time) AS hour,
    sensor_id,
    AVG(temperature) as avg_temp,
    MAX(temperature) as max_temp,
    MIN(temperature) as min_temp,
    AVG(humidity) as avg_humidity
FROM sensor_data
GROUP BY hour, sensor_id;

-- Add refresh policy
SELECT add_continuous_aggregate_policy('sensor_data_hourly',
    start_offset => INTERVAL '3 hours',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour'
);

-- Manual refresh
CALL refresh_continuous_aggregate('sensor_data_hourly', 
    NOW() - INTERVAL '1 week', 
    NOW()
);

-- Query continuous aggregate
SELECT * FROM sensor_data_hourly
WHERE hour >= NOW() - INTERVAL '24 hours'
ORDER BY hour DESC;
```

## CRUD Operations

### Insert Data

```sql
-- Insert single row
INSERT INTO sensor_data (time, sensor_id, temperature, humidity, location)
VALUES (NOW(), 1, 22.5, 45.0, 'Room A');

-- Insert multiple rows
INSERT INTO sensor_data (time, sensor_id, temperature, humidity, location)
VALUES 
    (NOW(), 1, 22.5, 45.0, 'Room A'),
    (NOW(), 2, 23.0, 47.5, 'Room B'),
    (NOW(), 3, 21.8, 44.2, 'Room C');

-- Insert with specific timestamp
INSERT INTO sensor_data (time, sensor_id, temperature, humidity)
VALUES ('2024-01-17 10:00:00', 1, 22.5, 45.0);

-- Batch insert using COPY
COPY sensor_data FROM '/path/to/data.csv' CSV HEADER;

-- Insert from SELECT
INSERT INTO sensor_data
SELECT * FROM sensor_data_staging
WHERE time >= NOW() - INTERVAL '1 hour';
```

### Query Data

```sql
-- Select recent data
SELECT * FROM sensor_data
WHERE time >= NOW() - INTERVAL '1 hour'
ORDER BY time DESC;

-- Aggregate by time buckets
SELECT
    time_bucket('5 minutes', time) AS five_min,
    sensor_id,
    AVG(temperature) as avg_temp,
    MAX(temperature) as max_temp
FROM sensor_data
WHERE time >= NOW() - INTERVAL '1 hour'
GROUP BY five_min, sensor_id
ORDER BY five_min DESC;

-- Get latest value per sensor
SELECT DISTINCT ON (sensor_id)
    sensor_id,
    time,
    temperature,
    humidity
FROM sensor_data
ORDER BY sensor_id, time DESC;

-- Time-weighted average
SELECT
    sensor_id,
    time_weight('Linear', time, temperature) as time_weighted_avg
FROM sensor_data
WHERE time >= NOW() - INTERVAL '1 day'
GROUP BY sensor_id;
```

### Update Data

```sql
-- Update recent data
UPDATE sensor_data
SET location = 'Room A-Updated'
WHERE sensor_id = 1 
  AND time >= NOW() - INTERVAL '1 hour';

-- Update with condition
UPDATE sensor_data
SET temperature = temperature * 1.1
WHERE time >= NOW() - INTERVAL '1 hour'
  AND sensor_id = 1;
```

### Delete Data

```sql
-- Delete old data
DELETE FROM sensor_data
WHERE time < NOW() - INTERVAL '30 days';

-- Delete by sensor
DELETE FROM sensor_data
WHERE sensor_id = 999;

-- Drop chunks (more efficient for time-based deletion)
SELECT drop_chunks('sensor_data', older_than => INTERVAL '30 days');
```

## Time-Series Functions

### time_bucket()

```sql
-- Bucket by 5 minutes
SELECT
    time_bucket('5 minutes', time) AS bucket,
    AVG(temperature) as avg_temp
FROM sensor_data
WHERE time >= NOW() - INTERVAL '1 hour'
GROUP BY bucket
ORDER BY bucket;

-- Bucket with offset
SELECT
    time_bucket('1 hour', time, INTERVAL '30 minutes') AS bucket,
    COUNT(*) as readings
FROM sensor_data
GROUP BY bucket;

-- Bucket by day
SELECT
    time_bucket('1 day', time) AS day,
    sensor_id,
    AVG(temperature) as daily_avg
FROM sensor_data
GROUP BY day, sensor_id
ORDER BY day DESC;
```

### first() and last()

```sql
-- Get first and last values
SELECT
    sensor_id,
    first(temperature, time) as first_temp,
    last(temperature, time) as last_temp
FROM sensor_data
WHERE time >= NOW() - INTERVAL '1 day'
GROUP BY sensor_id;

-- With time buckets
SELECT
    time_bucket('1 hour', time) AS hour,
    sensor_id,
    first(temperature, time) as hour_start_temp,
    last(temperature, time) as hour_end_temp
FROM sensor_data
WHERE time >= NOW() - INTERVAL '1 day'
GROUP BY hour, sensor_id
ORDER BY hour DESC;
```

### Interpolation

```sql
-- Linear interpolation
SELECT
    time_bucket_gapfill('5 minutes', time) AS bucket,
    sensor_id,
    interpolate(AVG(temperature)) as temp
FROM sensor_data
WHERE time >= NOW() - INTERVAL '1 hour'
  AND sensor_id = 1
GROUP BY bucket, sensor_id
ORDER BY bucket;

-- Locf (Last Observation Carried Forward)
SELECT
    time_bucket_gapfill('5 minutes', time) AS bucket,
    locf(AVG(temperature)) as temp
FROM sensor_data
WHERE time >= NOW() - INTERVAL '1 hour'
GROUP BY bucket;
```

### Statistical Functions

```sql
-- Histogram
SELECT
    histogram(temperature, 20.0, 30.0, 5) as temp_histogram
FROM sensor_data
WHERE time >= NOW() - INTERVAL '1 day';

-- Percentile approximation
SELECT
    sensor_id,
    approx_percentile(0.5, percentile_agg(temperature)) as median_temp,
    approx_percentile(0.95, percentile_agg(temperature)) as p95_temp
FROM sensor_data
WHERE time >= NOW() - INTERVAL '1 day'
GROUP BY sensor_id;
```

## Client Libraries

### Python (psycopg2/psycopg3)

```python
import psycopg2
from datetime import datetime, timedelta
import random

# Connect to TimescaleDB
conn = psycopg2.connect(
    host="localhost",
    database="iot_data",
    user="postgres",
    password="password"
)

cur = conn.cursor()

# Create hypertable
cur.execute("""
    CREATE TABLE IF NOT EXISTS sensor_data (
        time TIMESTAMPTZ NOT NULL,
        sensor_id INTEGER NOT NULL,
        temperature DOUBLE PRECISION,
        humidity DOUBLE PRECISION
    )
""")

cur.execute("SELECT create_hypertable('sensor_data', 'time', if_not_exists => TRUE)")
conn.commit()

# Insert data
timestamp = datetime.now()
cur.execute("""
    INSERT INTO sensor_data (time, sensor_id, temperature, humidity)
    VALUES (%s, %s, %s, %s)
""", (timestamp, 1, 22.5, 45.0))

# Batch insert
data = []
for i in range(1000):
    time = datetime.now() - timedelta(minutes=i)
    sensor_id = random.randint(1, 10)
    temp = random.uniform(20, 30)
    humidity = random.uniform(40, 60)
    data.append((time, sensor_id, temp, humidity))

cur.executemany("""
    INSERT INTO sensor_data (time, sensor_id, temperature, humidity)
    VALUES (%s, %s, %s, %s)
""", data)
conn.commit()

# Query with time_bucket
cur.execute("""
    SELECT
        time_bucket('5 minutes', time) AS bucket,
        sensor_id,
        AVG(temperature) as avg_temp,
        MAX(temperature) as max_temp
    FROM sensor_data
    WHERE time >= NOW() - INTERVAL '1 hour'
    GROUP BY bucket, sensor_id
    ORDER BY bucket DESC
    LIMIT 10
""")

for row in cur.fetchall():
    print(row)

# Query to pandas
import pandas as pd
df = pd.read_sql("""
    SELECT * FROM sensor_data
    WHERE time >= NOW() - INTERVAL '1 day'
    ORDER BY time DESC
""", conn)

print(df.head())

cur.close()
conn.close()
```

### Python (SQLAlchemy)

```python
from sqlalchemy import create_engine, Column, Integer, Float, DateTime, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Create engine
engine = create_engine('postgresql://postgres:password@localhost:5432/iot_data')
Base = declarative_base()

# Define model
class SensorData(Base):
    __tablename__ = 'sensor_data'
    
    time = Column(DateTime, primary_key=True)
    sensor_id = Column(Integer, primary_key=True)
    temperature = Column(Float)
    humidity = Column(Float)

# Create session
Session = sessionmaker(bind=engine)
session = Session()

# Insert data
reading = SensorData(
    time=datetime.now(),
    sensor_id=1,
    temperature=22.5,
    humidity=45.0
)
session.add(reading)
session.commit()

# Query with raw SQL
result = session.execute(text("""
    SELECT
        time_bucket('1 hour', time) AS hour,
        AVG(temperature) as avg_temp
    FROM sensor_data
    WHERE time >= NOW() - INTERVAL '24 hours'
    GROUP BY hour
    ORDER BY hour DESC
"""))

for row in result:
    print(row)

session.close()
```

### Node.js (pg)

```javascript
const { Client } = require('pg');

async function main() {
  // Connect to TimescaleDB
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'iot_data',
    user: 'postgres',
    password: 'password'
  });

  await client.connect();

  // Create hypertable
  await client.query(`
    CREATE TABLE IF NOT EXISTS sensor_data (
      time TIMESTAMPTZ NOT NULL,
      sensor_id INTEGER NOT NULL,
      temperature DOUBLE PRECISION,
      humidity DOUBLE PRECISION
    )
  `);

  await client.query(`
    SELECT create_hypertable('sensor_data', 'time', if_not_exists => TRUE)
  `);

  // Insert data
  await client.query(`
    INSERT INTO sensor_data (time, sensor_id, temperature, humidity)
    VALUES ($1, $2, $3, $4)
  `, [new Date(), 1, 22.5, 45.0]);

  // Batch insert
  const values = [];
  for (let i = 0; i < 100; i++) {
    const time = new Date(Date.now() - i * 60000);
    values.push(`('${time.toISOString()}', ${i % 10}, ${20 + Math.random() * 10}, ${40 + Math.random() * 20})`);
  }

  await client.query(`
    INSERT INTO sensor_data (time, sensor_id, temperature, humidity)
    VALUES ${values.join(', ')}
  `);

  // Query with time_bucket
  const result = await client.query(`
    SELECT
      time_bucket('5 minutes', time) AS bucket,
      sensor_id,
      AVG(temperature) as avg_temp
    FROM sensor_data
    WHERE time >= NOW() - INTERVAL '1 hour'
    GROUP BY bucket, sensor_id
    ORDER BY bucket DESC
    LIMIT 10
  `);

  console.log(result.rows);

  await client.end();
}

main().catch(console.error);
```

### Java (JDBC)

```java
import java.sql.*;
import java.time.LocalDateTime;
import java.util.Random;

public class TimescaleDBExample {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:postgresql://localhost:5432/iot_data";
        String user = "postgres";
        String password = "password";
        
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            // Create table and hypertable
            try (Statement stmt = conn.createStatement()) {
                stmt.execute(
                    "CREATE TABLE IF NOT EXISTS sensor_data (" +
                    "time TIMESTAMPTZ NOT NULL, " +
                    "sensor_id INTEGER NOT NULL, " +
                    "temperature DOUBLE PRECISION, " +
                    "humidity DOUBLE PRECISION)"
                );
                
                stmt.execute(
                    "SELECT create_hypertable('sensor_data', 'time', if_not_exists => TRUE)"
                );
            }
            
            // Insert data
            String insertSQL = "INSERT INTO sensor_data (time, sensor_id, temperature, humidity) VALUES (?, ?, ?, ?)";
            try (PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {
                pstmt.setTimestamp(1, Timestamp.valueOf(LocalDateTime.now()));
                pstmt.setInt(2, 1);
                pstmt.setDouble(3, 22.5);
                pstmt.setDouble(4, 45.0);
                pstmt.executeUpdate();
            }
            
            // Batch insert
            Random random = new Random();
            try (PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {
                for (int i = 0; i < 1000; i++) {
                    pstmt.setTimestamp(1, new Timestamp(System.currentTimeMillis() - i * 60000));
                    pstmt.setInt(2, i % 10);
                    pstmt.setDouble(3, 20 + random.nextDouble() * 10);
                    pstmt.setDouble(4, 40 + random.nextDouble() * 20);
                    pstmt.addBatch();
                }
                pstmt.executeBatch();
            }
            
            // Query with time_bucket
            String query = 
                "SELECT " +
                "  time_bucket('5 minutes', time) AS bucket, " +
                "  sensor_id, " +
                "  AVG(temperature) as avg_temp " +
                "FROM sensor_data " +
                "WHERE time >= NOW() - INTERVAL '1 hour' " +
                "GROUP BY bucket, sensor_id " +
                "ORDER BY bucket DESC " +
                "LIMIT 10";
            
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(query)) {
                
                while (rs.next()) {
                    System.out.printf("%s | %d | %.2f%n",
                        rs.getTimestamp("bucket"),
                        rs.getInt("sensor_id"),
                        rs.getDouble("avg_temp")
                    );
                }
            }
        }
    }
}
```

## Advanced Features

### Data Retention Policies

```sql
-- Add retention policy
SELECT add_retention_policy('sensor_data', INTERVAL '30 days');

-- Remove retention policy
SELECT remove_retention_policy('sensor_data');

-- View retention policies
SELECT * FROM timescaledb_information.jobs
WHERE proc_name = 'policy_retention';
```

### Compression

```sql
-- Enable compression
ALTER TABLE sensor_data SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'sensor_id',
    timescaledb.compress_orderby = 'time DESC'
);

-- Add compression policy
SELECT add_compression_policy('sensor_data', INTERVAL '7 days');

-- Manual compression
SELECT compress_chunk(chunk)
FROM timescaledb_information.chunks
WHERE hypertable_name = 'sensor_data'
  AND range_end < NOW() - INTERVAL '7 days';

-- View compression stats
SELECT
    pg_size_pretty(before_compression_total_bytes) as before,
    pg_size_pretty(after_compression_total_bytes) as after,
    ROUND(100 - (after_compression_total_bytes::numeric / before_compression_total_bytes::numeric * 100), 2) as savings_pct
FROM timescaledb_information.compression_settings
WHERE hypertable_name = 'sensor_data';
```

### Reordering

```sql
-- Add reorder policy (improves query performance)
SELECT add_reorder_policy('sensor_data', 'sensor_data_time_idx');

-- View reorder policies
SELECT * FROM timescaledb_information.jobs
WHERE proc_name = 'policy_reorder';
```

### Distributed Hypertables (Multi-Node)

```sql
-- Add data node
SELECT add_data_node('node1', host => 'node1.example.com');
SELECT add_data_node('node2', host => 'node2.example.com');

-- Create distributed hypertable
SELECT create_distributed_hypertable(
    'sensor_data',
    'time',
    partitioning_column => 'sensor_id',
    number_partitions => 4,
    replication_factor => 2
);
```

## Performance Optimization

### Indexing

```sql
-- Create index on frequently queried column
CREATE INDEX ON sensor_data (sensor_id, time DESC);

-- Create partial index
CREATE INDEX ON sensor_data (time DESC)
WHERE sensor_id < 100;

-- View indexes
SELECT * FROM pg_indexes
WHERE tablename = 'sensor_data';
```

### Query Optimization

```sql
-- Use EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT
    time_bucket('1 hour', time) AS hour,
    AVG(temperature)
FROM sensor_data
WHERE time >= NOW() - INTERVAL '7 days'
GROUP BY hour;

-- Optimize chunk interval
SELECT set_chunk_time_interval('sensor_data', INTERVAL '1 day');

-- Enable parallel queries
SET max_parallel_workers_per_gather = 4;
```

### Maintenance

```sql
-- Vacuum hypertable
VACUUM ANALYZE sensor_data;

-- Reindex
REINDEX TABLE sensor_data;

-- Update statistics
ANALYZE sensor_data;
```

## Monitoring

```sql
-- Hypertable info
SELECT * FROM timescaledb_information.hypertables;

-- Chunk info
SELECT * FROM timescaledb_information.chunks
WHERE hypertable_name = 'sensor_data';

-- Compression stats
SELECT * FROM timescaledb_information.compression_settings;

-- Job statistics
SELECT * FROM timescaledb_information.job_stats;

-- Database size
SELECT
    hypertable_name,
    pg_size_pretty(hypertable_size(format('%I.%I', hypertable_schema, hypertable_name)::regclass)) as size
FROM timescaledb_information.hypertables;
```

## Best Practices

### Data Modeling

1. **Choose appropriate chunk interval** - Balance between too many small chunks and too few large chunks
2. **Use time as first dimension** - Always partition primarily by time
3. **Index strategically** - Create indexes on frequently queried columns
4. **Normalize when needed** - Don't denormalize everything
5. **Plan for scale** - Consider compression and retention from the start

### Performance

1. **Use continuous aggregates** - For frequently queried aggregations
2. **Enable compression** - For historical data
3. **Batch inserts** - Insert multiple rows at once
4. **Use appropriate chunk intervals** - 1 day to 1 week typically
5. **Monitor chunk size** - Keep chunks under 25% of available memory

### Operations

1. **Set retention policies** - Automatically drop old data
2. **Monitor disk usage** - Watch for uncompressed data growth
3. **Regular maintenance** - VACUUM and ANALYZE periodically
4. **Backup regularly** - Use pg_dump or pg_basebackup
5. **Test queries** - Profile before deploying to production

## Backup and Restore

```bash
# Backup database
pg_dump -U postgres -h localhost iot_data > iot_data_backup.sql

# Backup with compression
pg_dump -U postgres -h localhost iot_data | gzip > iot_data_backup.sql.gz

# Restore database
psql -U postgres -h localhost iot_data < iot_data_backup.sql

# Backup specific table
pg_dump -U postgres -h localhost -t sensor_data iot_data > sensor_data_backup.sql

# Continuous archiving (WAL)
# Configure in postgresql.conf:
# wal_level = replica
# archive_mode = on
# archive_command = 'cp %p /path/to/archive/%f'
```

## Resources

### Official Documentation

- [TimescaleDB Documentation](https://docs.timescale.com/)
- [API Reference](https://docs.timescale.com/api/latest/)
- [Best Practices](https://docs.timescale.com/timescaledb/latest/how-to-guides/)

### Tools

- [psql](https://www.postgresql.org/docs/current/app-psql.html) - PostgreSQL client
- [pgAdmin](https://www.pgadmin.org/) - PostgreSQL GUI
- [Grafana](https://grafana.com/) - Visualization
- [TimescaleDB Toolkit](https://github.com/timescale/timescaledb-toolkit) - Analytics functions

### Learning Resources

- [Timescale Learn](https://www.timescale.com/learn) - Tutorials and guides
- [Blog](https://www.timescale.com/blog/)
- [YouTube Channel](https://www.youtube.com/c/TimescaleDB)
- [Timescale Forum](https://www.timescale.com/forum/)

### Community

- [GitHub Repository](https://github.com/timescale/timescaledb)
- [Slack Community](https://timescaledb.slack.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/timescaledb)
- [Community Forum](https://www.timescale.com/forum/)

---

**Related Technologies**: [PostgreSQL](../PostgreSQL/), [InfluxDB](../), [Prometheus](../../Cloud-DevOps/Prometheus/), [ClickHouse](../ClickHouse/)
