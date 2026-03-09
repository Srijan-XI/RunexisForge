# ClickHouse

## Introduction

ClickHouse is an open-source column-oriented database management system (DBMS) designed for online analytical processing (OLAP). It provides real-time query processing capabilities and can handle petabyte-scale data with exceptional performance, making it ideal for analytics, business intelligence, and data warehousing.

### Key Features

- **Column-Oriented Storage**: Optimized for analytical queries
- **Real-Time Query Processing**: Sub-second query responses on billions of rows
- **SQL Support**: Familiar SQL syntax with extensions
- **Vectorized Query Execution**: SIMD instructions for performance
- **Data Compression**: Efficient compression algorithms
- **Distributed Architecture**: Horizontal scaling with sharding and replication
- **High Insert Performance**: Millions of rows per second
- **Approximate Query Processing**: For faster results
- **Integration**: Works with Kafka, S3, PostgreSQL, MySQL, and more
- **Materialized Views**: Pre-aggregated data for faster queries

### Common Use Cases

- **Web and App Analytics**: User behavior, clickstream analysis
- **Real-Time Dashboards**: Business intelligence, metrics tracking
- **Log Analytics**: Application and system logs
- **Time-Series Data**: IoT sensors, metrics, monitoring
- **E-commerce Analytics**: Sales analysis, inventory tracking
- **Ad-Tech**: Real-time bidding, campaign analytics
- **Financial Analytics**: Trading data, risk analysis
- **Telecommunications**: CDR analysis, network monitoring

## Installation & Setup

### Docker Installation

```bash
# Pull ClickHouse image
docker pull clickhouse/clickhouse-server:latest

# Run ClickHouse server
docker run -d \
  --name clickhouse \
  -p 8123:8123 \
  -p 9000:9000 \
  --ulimit nofile=262144:262144 \
  clickhouse/clickhouse-server:latest

# Access client
docker exec -it clickhouse clickhouse-client

# HTTP interface
curl 'http://localhost:8123/' --data 'SELECT 1'
```

### Docker Compose Setup

```yaml
version: '3.8'

services:
  clickhouse:
    image: clickhouse/clickhouse-server:latest
    container_name: clickhouse
    hostname: clickhouse
    ports:
      - "8123:8123"  # HTTP interface
      - "9000:9000"  # Native protocol
      - "9009:9009"  # Interserver HTTP
    volumes:
      - clickhouse-data:/var/lib/clickhouse
      - clickhouse-logs:/var/log/clickhouse-server
      - ./config:/etc/clickhouse-server/config.d
    ulimits:
      nofile:
        soft: 262144
        hard: 262144
    networks:
      - clickhouse-network

  # ClickHouse client (optional)
  clickhouse-client:
    image: clickhouse/clickhouse-server:latest
    container_name: clickhouse-client
    entrypoint: clickhouse-client --host clickhouse
    depends_on:
      - clickhouse
    networks:
      - clickhouse-network

volumes:
  clickhouse-data:
  clickhouse-logs:

networks:
  clickhouse-network:
    driver: bridge
```

### Linux Installation (Ubuntu/Debian)

```bash
# Add repository
sudo apt-get install -y apt-transport-https ca-certificates dirmngr
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 8919F6BD2B48D754

echo "deb https://packages.clickhouse.com/deb stable main" | sudo tee /etc/apt/sources.list.d/clickhouse.list

# Install ClickHouse
sudo apt-get update
sudo apt-get install -y clickhouse-server clickhouse-client

# Start service
sudo systemctl start clickhouse-server
sudo systemctl enable clickhouse-server

# Check status
sudo systemctl status clickhouse-server

# Connect to server
clickhouse-client

# Check connection
clickhouse-client --query "SELECT version()"
```

### Configuration

**config.xml** (basic settings):
```xml
<clickhouse>
    <listen_host>0.0.0.0</listen_host>
    
    <http_port>8123</http_port>
    <tcp_port>9000</tcp_port>
    <interserver_http_port>9009</interserver_http_port>
    
    <max_connections>4096</max_connections>
    <max_concurrent_queries>100</max_concurrent_queries>
    
    <path>/var/lib/clickhouse/</path>
    <tmp_path>/var/lib/clickhouse/tmp/</tmp_path>
    
    <users_config>users.xml</users_config>
</clickhouse>
```

**users.xml**:
```xml
<clickhouse>
    <users>
        <default>
            <password></password>
            <networks>
                <ip>::/0</ip>
            </networks>
            <profile>default</profile>
            <quota>default</quota>
        </default>
    </users>
</clickhouse>
```

## Core Concepts

### Databases

```sql
-- Create database
CREATE DATABASE ecommerce;

-- Use database
USE ecommerce;

-- List databases
SHOW DATABASES;

-- Drop database
DROP DATABASE ecommerce;
```

### Tables and Engines

ClickHouse supports multiple table engines for different use cases.

#### MergeTree (Primary Engine)

```sql
-- Create MergeTree table
CREATE TABLE events (
    event_date Date,
    event_time DateTime,
    user_id UInt64,
    event_type String,
    page_url String,
    country String,
    city String,
    browser String,
    os String,
    device String
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(event_date)
ORDER BY (event_date, user_id, event_time)
SETTINGS index_granularity = 8192;
```

#### ReplacingMergeTree (Deduplication)

```sql
-- Create ReplacingMergeTree table
CREATE TABLE user_profiles (
    user_id UInt64,
    username String,
    email String,
    updated_at DateTime
) ENGINE = ReplacingMergeTree(updated_at)
ORDER BY user_id;
```

#### SummingMergeTree (Aggregation)

```sql
-- Create SummingMergeTree table
CREATE TABLE daily_stats (
    date Date,
    user_id UInt64,
    page_views UInt64,
    clicks UInt64,
    revenue Decimal(10, 2)
) ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (date, user_id);
```

#### Distributed Table

```sql
-- Create distributed table
CREATE TABLE events_distributed AS events
ENGINE = Distributed(cluster_name, ecommerce, events, rand());
```

### Data Types

```sql
-- Numeric types
CREATE TABLE numeric_example (
    int8_col Int8,
    int16_col Int16,
    int32_col Int32,
    int64_col Int64,
    uint8_col UInt8,
    uint16_col UInt16,
    uint32_col UInt32,
    uint64_col UInt64,
    float32_col Float32,
    float64_col Float64,
    decimal_col Decimal(18, 2)
) ENGINE = MergeTree() ORDER BY int32_col;

-- String types
CREATE TABLE string_example (
    string_col String,
    fixedstring_col FixedString(10)
) ENGINE = MergeTree() ORDER BY string_col;

-- Date and DateTime types
CREATE TABLE datetime_example (
    date_col Date,
    datetime_col DateTime,
    datetime64_col DateTime64(3)
) ENGINE = MergeTree() ORDER BY date_col;

-- Array types
CREATE TABLE array_example (
    id UInt64,
    tags Array(String),
    numbers Array(Int32)
) ENGINE = MergeTree() ORDER BY id;

-- Nullable types
CREATE TABLE nullable_example (
    id UInt64,
    nullable_string Nullable(String),
    nullable_int Nullable(Int32)
) ENGINE = MergeTree() ORDER BY id;

-- Enum types
CREATE TABLE enum_example (
    id UInt64,
    status Enum8('pending' = 1, 'active' = 2, 'inactive' = 3)
) ENGINE = MergeTree() ORDER BY id;
```

## Data Operations

### Insert Data

```sql
-- Insert single row
INSERT INTO events VALUES 
    ('2024-01-17', '2024-01-17 10:30:00', 12345, 'page_view', '/products', 'USA', 'New York', 'Chrome', 'Windows', 'Desktop');

-- Insert multiple rows
INSERT INTO events VALUES
    ('2024-01-17', '2024-01-17 10:31:00', 12346, 'click', '/cart', 'USA', 'Los Angeles', 'Firefox', 'macOS', 'Desktop'),
    ('2024-01-17', '2024-01-17 10:32:00', 12347, 'purchase', '/checkout', 'UK', 'London', 'Safari', 'iOS', 'Mobile');

-- Insert from SELECT
INSERT INTO events
SELECT * FROM events_staging
WHERE event_date = today();

-- Insert with column names
INSERT INTO events (event_date, event_time, user_id, event_type)
VALUES ('2024-01-17', '2024-01-17 10:33:00', 12348, 'page_view');
```

### Query Data

```sql
-- Select all
SELECT * FROM events LIMIT 10;

-- Select specific columns
SELECT event_date, user_id, event_type, page_url
FROM events
LIMIT 100;

-- WHERE clause
SELECT * FROM events
WHERE event_date = '2024-01-17'
  AND country = 'USA'
LIMIT 100;

-- ORDER BY
SELECT user_id, COUNT(*) as event_count
FROM events
GROUP BY user_id
ORDER BY event_count DESC
LIMIT 10;

-- DISTINCT
SELECT DISTINCT country FROM events;

-- WITH clause (CTE)
WITH top_users AS (
    SELECT user_id, COUNT(*) as cnt
    FROM events
    WHERE event_date >= today() - 7
    GROUP BY user_id
    ORDER BY cnt DESC
    LIMIT 100
)
SELECT * FROM top_users;
```

### Aggregations

```sql
-- Count
SELECT COUNT(*) FROM events;

-- Group by
SELECT 
    country,
    COUNT(*) as total_events,
    COUNT(DISTINCT user_id) as unique_users
FROM events
WHERE event_date = today()
GROUP BY country
ORDER BY total_events DESC;

-- Multiple aggregations
SELECT 
    event_date,
    COUNT(*) as events,
    COUNT(DISTINCT user_id) as users,
    AVG(user_id) as avg_user_id,
    MIN(event_time) as first_event,
    MAX(event_time) as last_event
FROM events
GROUP BY event_date
ORDER BY event_date;

-- HAVING clause
SELECT 
    country,
    COUNT(*) as event_count
FROM events
GROUP BY country
HAVING event_count > 1000
ORDER BY event_count DESC;
```

### Update and Delete

```sql
-- Lightweight DELETE (creates a mask)
DELETE FROM events
WHERE event_date < '2024-01-01';

-- ALTER DELETE (synchronous, heavier)
ALTER TABLE events DELETE
WHERE event_date < '2024-01-01';

-- UPDATE (creates new parts)
ALTER TABLE events UPDATE
    country = 'United States'
WHERE country = 'USA';

-- TRUNCATE table
TRUNCATE TABLE events;

-- DROP table
DROP TABLE events;
```

## Advanced Queries

### Join Operations

```sql
-- INNER JOIN
SELECT 
    e.user_id,
    e.event_type,
    u.username,
    u.email
FROM events e
INNER JOIN users u ON e.user_id = u.user_id
WHERE e.event_date = today()
LIMIT 100;

-- LEFT JOIN
SELECT 
    u.user_id,
    u.username,
    COUNT(e.event_type) as event_count
FROM users u
LEFT JOIN events e ON u.user_id = e.user_id
    AND e.event_date = today()
GROUP BY u.user_id, u.username;

-- ARRAY JOIN
SELECT 
    id,
    tag
FROM array_example
ARRAY JOIN tags AS tag;
```

### Window Functions

```sql
-- ROW_NUMBER
SELECT 
    user_id,
    event_time,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_time) as event_num
FROM events
WHERE event_date = today();

-- RANK and DENSE_RANK
SELECT 
    country,
    COUNT(*) as events,
    RANK() OVER (ORDER BY COUNT(*) DESC) as rank,
    DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) as dense_rank
FROM events
GROUP BY country;

-- LAG and LEAD
SELECT 
    user_id,
    event_time,
    LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time) as prev_event_time,
    LEAD(event_time) OVER (PARTITION BY user_id ORDER BY event_time) as next_event_time
FROM events;
```

### Subqueries

```sql
-- Subquery in WHERE
SELECT * FROM events
WHERE user_id IN (
    SELECT user_id 
    FROM users 
    WHERE premium = 1
);

-- Subquery in FROM
SELECT 
    country,
    AVG(daily_events) as avg_daily_events
FROM (
    SELECT 
        country,
        event_date,
        COUNT(*) as daily_events
    FROM events
    GROUP BY country, event_date
)
GROUP BY country;

-- Scalar subquery
SELECT 
    event_date,
    COUNT(*) as events,
    (SELECT COUNT(*) FROM events) as total_events,
    COUNT(*) / (SELECT COUNT(*) FROM events) * 100 as percentage
FROM events
GROUP BY event_date;
```

## Client Libraries

### Python (clickhouse-driver)

```python
from clickhouse_driver import Client

# Connect to ClickHouse
client = Client('localhost')

# Execute query
result = client.execute('SELECT version()')
print(result)

# Create table
client.execute('''
    CREATE TABLE IF NOT EXISTS events (
        event_date Date,
        event_time DateTime,
        user_id UInt64,
        event_type String,
        page_url String
    ) ENGINE = MergeTree()
    ORDER BY (event_date, user_id)
''')

# Insert data
data = [
    ('2024-01-17', '2024-01-17 10:00:00', 1, 'page_view', '/home'),
    ('2024-01-17', '2024-01-17 10:01:00', 2, 'click', '/products'),
    ('2024-01-17', '2024-01-17 10:02:00', 3, 'purchase', '/checkout'),
]

client.execute('INSERT INTO events VALUES', data)

# Query data
result = client.execute('SELECT * FROM events LIMIT 10')
for row in result:
    print(row)

# Query with parameters
result = client.execute(
    'SELECT * FROM events WHERE event_date = %(date)s',
    {'date': '2024-01-17'}
)

# Batch insert
from datetime import datetime

rows = []
for i in range(10000):
    rows.append(('2024-01-17', datetime.now(), i, 'event', f'/page{i}'))

client.execute('INSERT INTO events VALUES', rows)

# Query with pandas
import pandas as pd
df = client.query_dataframe('SELECT * FROM events LIMIT 100')
print(df.head())
```

### Python (clickhouse-connect)

```python
import clickhouse_connect

# Connect
client = clickhouse_connect.get_client(host='localhost', port=8123)

# Query
result = client.query('SELECT version()')
print(result.result_set)

# Insert data
data = [
    ['2024-01-17', '2024-01-17 10:00:00', 1, 'page_view', '/home'],
    ['2024-01-17', '2024-01-17 10:01:00', 2, 'click', '/products'],
]

client.insert('events', data, 
              column_names=['event_date', 'event_time', 'user_id', 'event_type', 'page_url'])

# Query to pandas DataFrame
df = client.query_df('SELECT * FROM events LIMIT 100')
print(df)

# Insert from pandas DataFrame
import pandas as pd
df_new = pd.DataFrame({
    'event_date': ['2024-01-17'] * 5,
    'event_time': [datetime.now()] * 5,
    'user_id': range(5),
    'event_type': ['view'] * 5,
    'page_url': [f'/page{i}' for i in range(5)]
})

client.insert_df('events', df_new)
```

### Node.js (@clickhouse/client)

```javascript
const { createClient } = require('@clickhouse/client');

async function main() {
  // Create client
  const client = createClient({
    host: 'http://localhost:8123',
  });

  // Ping
  const pingResult = await client.ping();
  console.log('Ping:', pingResult);

  // Create table
  await client.exec({
    query: `
      CREATE TABLE IF NOT EXISTS events (
        event_date Date,
        event_time DateTime,
        user_id UInt64,
        event_type String,
        page_url String
      ) ENGINE = MergeTree()
      ORDER BY (event_date, user_id)
    `,
  });

  // Insert data
  await client.insert({
    table: 'events',
    values: [
      { event_date: '2024-01-17', event_time: '2024-01-17 10:00:00', user_id: 1, event_type: 'page_view', page_url: '/home' },
      { event_date: '2024-01-17', event_time: '2024-01-17 10:01:00', user_id: 2, event_type: 'click', page_url: '/products' },
    ],
    format: 'JSONEachRow',
  });

  // Query data
  const resultSet = await client.query({
    query: 'SELECT * FROM events LIMIT 10',
    format: 'JSONEachRow',
  });

  const data = await resultSet.json();
  console.log(data);

  // Parameterized query
  const result = await client.query({
    query: 'SELECT * FROM events WHERE event_date = {date:Date}',
    query_params: {
      date: '2024-01-17',
    },
  });

  // Stream query results
  const stream = await client.query({
    query: 'SELECT * FROM events',
    format: 'JSONEachRow',
  });

  const readable = stream.stream();
  readable.on('data', (rows) => {
    console.log(rows);
  });

  await client.close();
}

main().catch(console.error);
```

### Java (clickhouse-jdbc)

```java
import com.clickhouse.jdbc.ClickHouseDataSource;
import java.sql.*;
import java.util.Properties;

public class ClickHouseExample {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:clickhouse://localhost:8123/default";
        Properties properties = new Properties();
        
        ClickHouseDataSource dataSource = new ClickHouseDataSource(url, properties);
        
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            
            // Create table
            stmt.execute(
                "CREATE TABLE IF NOT EXISTS events (" +
                "event_date Date, " +
                "event_time DateTime, " +
                "user_id UInt64, " +
                "event_type String, " +
                "page_url String" +
                ") ENGINE = MergeTree() ORDER BY (event_date, user_id)"
            );
            
            // Insert data
            PreparedStatement pstmt = conn.prepareStatement(
                "INSERT INTO events VALUES (?, ?, ?, ?, ?)"
            );
            
            pstmt.setDate(1, Date.valueOf("2024-01-17"));
            pstmt.setTimestamp(2, Timestamp.valueOf("2024-01-17 10:00:00"));
            pstmt.setLong(3, 1);
            pstmt.setString(4, "page_view");
            pstmt.setString(5, "/home");
            pstmt.addBatch();
            
            pstmt.setDate(1, Date.valueOf("2024-01-17"));
            pstmt.setTimestamp(2, Timestamp.valueOf("2024-01-17 10:01:00"));
            pstmt.setLong(3, 2);
            pstmt.setString(4, "click");
            pstmt.setString(5, "/products");
            pstmt.addBatch();
            
            pstmt.executeBatch();
            
            // Query data
            ResultSet rs = stmt.executeQuery("SELECT * FROM events LIMIT 10");
            
            while (rs.next()) {
                System.out.printf("%s %s %d %s %s%n",
                    rs.getDate("event_date"),
                    rs.getTimestamp("event_time"),
                    rs.getLong("user_id"),
                    rs.getString("event_type"),
                    rs.getString("page_url")
                );
            }
        }
    }
}
```

## Advanced Features

### Materialized Views

```sql
-- Create materialized view for pre-aggregated data
CREATE MATERIALIZED VIEW daily_stats_mv
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (date, country)
AS SELECT
    toDate(event_time) as date,
    country,
    COUNT(*) as event_count,
    COUNT(DISTINCT user_id) as unique_users
FROM events
GROUP BY date, country;

-- Query materialized view
SELECT * FROM daily_stats_mv
WHERE date = today();

-- Refresh materialized view (automatic on insert)
```

### Dictionaries

```sql
-- Create dictionary from table
CREATE DICTIONARY user_dict (
    user_id UInt64,
    username String,
    email String
)
PRIMARY KEY user_id
SOURCE(CLICKHOUSE(TABLE 'users'))
LAYOUT(FLAT())
LIFETIME(3600);

-- Use dictionary in query
SELECT 
    event_type,
    dictGet('user_dict', 'username', user_id) as username
FROM events
LIMIT 10;
```

### TTL (Time To Live)

```sql
-- Create table with TTL
CREATE TABLE logs (
    log_time DateTime,
    message String,
    level String
) ENGINE = MergeTree()
ORDER BY log_time
TTL log_time + INTERVAL 30 DAY;

-- Add TTL to existing table
ALTER TABLE logs MODIFY TTL log_time + INTERVAL 30 DAY;

-- Column-level TTL
CREATE TABLE users (
    user_id UInt64,
    email String TTL created_at + INTERVAL 1 YEAR,
    created_at DateTime
) ENGINE = MergeTree()
ORDER BY user_id;
```

### Sampling

```sql
-- Create table with sampling
CREATE TABLE events_sampled (
    event_date Date,
    user_id UInt64,
    event_type String
) ENGINE = MergeTree()
ORDER BY (event_date, user_id)
SAMPLE BY user_id;

-- Query with sampling (10% sample)
SELECT COUNT(*) 
FROM events_sampled 
SAMPLE 0.1;

-- Fixed sample size
SELECT COUNT(*) 
FROM events_sampled 
SAMPLE 10000;
```

## Performance Optimization

### Partitioning

```sql
-- Partition by month
CREATE TABLE events_partitioned (
    event_date Date,
    user_id UInt64,
    event_type String
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(event_date)
ORDER BY (event_date, user_id);

-- Drop old partitions
ALTER TABLE events_partitioned 
DROP PARTITION '202312';
```

### Indexes

```sql
-- Primary key (ORDER BY)
CREATE TABLE events (
    event_date Date,
    user_id UInt64,
    event_type String
) ENGINE = MergeTree()
ORDER BY (event_date, user_id);  -- Primary key index

-- Skip index
ALTER TABLE events 
ADD INDEX idx_event_type event_type TYPE bloom_filter GRANULARITY 1;

-- MinMax index
ALTER TABLE events 
ADD INDEX idx_date_minmax event_date TYPE minmax GRANULARITY 3;
```

### Query Optimization

```sql
-- Use PREWHERE for filtering (faster than WHERE)
SELECT * FROM events
PREWHERE event_date = '2024-01-17'
WHERE country = 'USA';

-- Use FINAL for deduplication (expensive)
SELECT * FROM user_profiles FINAL
WHERE user_id = 12345;

-- Optimize table
OPTIMIZE TABLE events FINAL;
```

## Monitoring

```sql
-- System tables
SELECT * FROM system.databases;
SELECT * FROM system.tables;
SELECT * FROM system.columns WHERE table = 'events';
SELECT * FROM system.parts WHERE table = 'events';

-- Query log
SELECT * FROM system.query_log
WHERE type = 'QueryFinish'
ORDER BY event_time DESC
LIMIT 10;

-- Current queries
SELECT * FROM system.processes;

-- Metrics
SELECT * FROM system.metrics;
SELECT * FROM system.events;
SELECT * FROM system.asynchronous_metrics;
```

## Best Practices

### Data Modeling

1. **Choose appropriate ORDER BY** - Based on query patterns
2. **Use partitioning** - For time-series data
3. **Denormalize data** - Avoid joins when possible
4. **Use appropriate data types** - Smaller types = better performance
5. **Design for immutability** - Optimized for append-only workloads

### Performance

1. **Use PREWHERE** - For efficient filtering
2. **Batch inserts** - Insert multiple rows at once
3. **Use materialized views** - For pre-aggregated data
4. **Avoid SELECT *** - Query only needed columns
5. **Monitor query performance** - Use system.query_log

### Operations

1. **Regular backups** - Use clickhouse-backup
2. **Monitor disk space** - ClickHouse uses lots of disk
3. **Use appropriate replication** - For high availability
4. **Optimize tables periodically** - Merge parts
5. **Clean old data** - Use TTL or manual deletion

## Resources

### Official Documentation

- [ClickHouse Documentation](https://clickhouse.com/docs/)
- [SQL Reference](https://clickhouse.com/docs/en/sql-reference/)
- [Operations Guide](https://clickhouse.com/docs/en/operations/)

### Tools

- [clickhouse-client](https://clickhouse.com/docs/en/interfaces/cli/) - Command-line client
- [TabIX](https://tabix.io/) - Web UI for ClickHouse
- [DBeaver](https://dbeaver.io/) - Universal database tool
- [clickhouse-backup](https://github.com/AlexAkulov/clickhouse-backup) - Backup tool

### Learning Resources

- [ClickHouse Academy](https://learn.clickhouse.com/) - Free courses
- [Blog](https://clickhouse.com/blog)
- [YouTube Channel](https://www.youtube.com/c/ClickHouseDB)
- [Tutorials](https://clickhouse.com/docs/en/getting-started/tutorial/)

### Community

- [GitHub Repository](https://github.com/ClickHouse/ClickHouse)
- [Slack Community](https://clickhouse.com/slack)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/clickhouse)
- [Community Forum](https://github.com/ClickHouse/ClickHouse/discussions)

---

**Related Technologies**: [Apache Druid](../), [TimescaleDB](../TimescaleDB/), [PostgreSQL](../PostgreSQL/), [Apache Pinot](../)
