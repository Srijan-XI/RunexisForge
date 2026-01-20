# Trino (formerly Presto SQL)

## Introduction

Trino is a distributed SQL query engine designed to query large datasets across multiple data sources. Originally created at Facebook as Presto, it was rebranded to Trino in 2020. It's optimized for interactive analytics and can query data where it lives, without requiring data movement.

### What is Trino?

Trino is an open-source, massively parallel processing (MPP) SQL query engine that allows you to run fast, interactive analytic queries against data sources of all sizes, from gigabytes to petabytes. It's designed for federated queries across heterogeneous data sources.

### Key Features

- **Federated Queries**: Query multiple data sources in a single SQL query
- **MPP Architecture**: Massively parallel processing for fast analytics
- **ANSI SQL Support**: Standard SQL with advanced features
- **No ETL Required**: Query data in place without moving it
- **High Performance**: Sub-second to minute-level query response times
- **Connectors**: 50+ connectors to various data sources
- **In-Memory Processing**: Fast query execution with distributed memory
- **Horizontal Scalability**: Add nodes to increase capacity
- **Cost-Based Optimizer**: Intelligent query planning
- **Security**: LDAP, Kerberos, OAuth 2.0 authentication

### Use Cases

- **Data Lake Analytics**: Query data lakes (S3, HDFS, Azure Data Lake)
- **Cross-Database Queries**: Join data from MySQL, PostgreSQL, MongoDB
- **Real-time Analytics**: Interactive dashboards and BI tools
- **Data Migration**: Move data between systems using SQL
- **Ad-hoc Analysis**: Exploratory data analysis without ETL
- **Federated Reporting**: Combine data from multiple sources
- **Machine Learning Prep**: Query and prepare data for ML pipelines
- **Log Analytics**: Query and analyze log data at scale

### Trino vs Other Query Engines

| Feature | Trino | Apache Spark SQL | Amazon Athena | BigQuery |
|---------|-------|------------------|---------------|----------|
| **Deployment** | Self-hosted | Self-hosted | Managed | Managed |
| **Query Speed** | Sub-second to minutes | Minutes | Seconds to minutes | Sub-second |
| **Data Movement** | None (federated) | Optional | None | None |
| **Connectors** | 50+ | 20+ | 30+ | Limited |
| **Cost** | Infrastructure only | Infrastructure only | Pay per query | Pay per query |
| **Use Case** | Interactive analytics | Batch + streaming | Ad-hoc queries | Data warehouse |

### Architecture Overview

**Trino Components:**

**Coordinator:**
- Query planning and orchestration
- Metadata management
- Client connection handling
- Resource management

**Workers:**
- Execute query tasks
- Process data in parallel
- Cache data in memory
- Return results to coordinator

**Connectors:**
- Interface to data sources
- Metadata retrieval
- Data reading/writing
- Pushdown optimizations

**Catalog:**
- Configuration for data sources
- Schema and table metadata
- Connection properties

---

## Installation & Setup

### Prerequisites

- Java 11 or higher (64-bit)
- Linux, macOS, or Windows (recommended: Linux)
- Minimum 16GB RAM (64GB+ for production)
- Python 2.7+ (for launcher script)
- Network access to data sources

### Installation Methods

#### Method 1: Binary Installation (Recommended)

```bash
# Download Trino server
wget https://repo1.maven.org/maven2/io/trino/trino-server/435/trino-server-435.tar.gz

# Extract
tar -xzf trino-server-435.tar.gz
cd trino-server-435

# Create data directory
mkdir -p /var/trino/data

# Create configuration directory
mkdir -p etc/catalog
```

**Configure Node Properties** (`etc/node.properties`):
```properties
node.environment=production
node.id=ffffffff-ffff-ffff-ffff-ffffffffffff
node.data-dir=/var/trino/data
```

**Configure JVM** (`etc/jvm.config`):
```properties
-server
-Xmx16G
-XX:InitialRAMPercentage=80
-XX:MaxRAMPercentage=80
-XX:G1HeapRegionSize=32M
-XX:+ExplicitGCInvokesConcurrent
-XX:+HeapDumpOnOutOfMemoryError
-XX:+ExitOnOutOfMemoryError
-XX:-OmitStackTraceInFastThrow
-XX:ReservedCodeCacheSize=512M
-XX:PerMethodRecompilationCutoff=10000
-XX:PerBytecodeRecompilationCutoff=10000
-Djdk.attach.allowAttachSelf=true
-Djdk.nio.maxCachedBufferSize=2000000
```

**Configure Coordinator** (`etc/config.properties`):
```properties
coordinator=true
node-scheduler.include-coordinator=false
http-server.http.port=8080
discovery.uri=http://localhost:8080
```

**Configure Worker** (`etc/config.properties` for worker nodes):
```properties
coordinator=false
http-server.http.port=8080
discovery.uri=http://coordinator.example.com:8080
```

#### Method 2: Docker

```bash
# Run Trino server
docker run -d \
  --name trino \
  -p 8080:8080 \
  trinodb/trino:latest

# Run with custom configuration
docker run -d \
  --name trino \
  -p 8080:8080 \
  -v $(pwd)/etc:/etc/trino \
  trinodb/trino:latest
```

#### Method 3: Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  trino-coordinator:
    image: trinodb/trino:latest
    container_name: trino-coordinator
    ports:
      - "8080:8080"
    volumes:
      - ./etc/coordinator:/etc/trino
      - ./catalog:/etc/trino/catalog
    environment:
      - TRINO_ENVIRONMENT=production

  trino-worker-1:
    image: trinodb/trino:latest
    container_name: trino-worker-1
    volumes:
      - ./etc/worker:/etc/trino
      - ./catalog:/etc/trino/catalog
    environment:
      - TRINO_ENVIRONMENT=production

  trino-worker-2:
    image: trinodb/trino:latest
    container_name: trino-worker-2
    volumes:
      - ./etc/worker:/etc/trino
      - ./catalog:/etc/trino/catalog
    environment:
      - TRINO_ENVIRONMENT=production
```

```bash
# Start cluster
docker-compose up -d
```

#### Method 4: Kubernetes (Helm)

```bash
# Add Trino Helm repository
helm repo add trino https://trinodb.github.io/charts
helm repo update

# Install Trino
helm install trino trino/trino \
  --set server.workers=3 \
  --set server.coordinator.jvm.maxHeapSize=8G \
  --set server.worker.jvm.maxHeapSize=8G

# Custom values
cat > values.yaml <<EOF
server:
  workers: 5
  coordinator:
    jvm:
      maxHeapSize: "16G"
    resources:
      requests:
        memory: "16Gi"
        cpu: "4"
  worker:
    jvm:
      maxHeapSize: "32G"
    resources:
      requests:
        memory: "32Gi"
        cpu: "8"
EOF

helm install trino trino/trino -f values.yaml
```

### Configure Data Source Connectors

**MySQL Connector** (`etc/catalog/mysql.properties`):
```properties
connector.name=mysql
connection-url=jdbc:mysql://mysql.example.com:3306
connection-user=trino
connection-password=password
```

**PostgreSQL Connector** (`etc/catalog/postgresql.properties`):
```properties
connector.name=postgresql
connection-url=jdbc:postgresql://postgres.example.com:5432/database
connection-user=trino
connection-password=password
```

**Hive/S3 Connector** (`etc/catalog/hive.properties`):
```properties
connector.name=hive
hive.metastore.uri=thrift://metastore.example.com:9083
hive.s3.aws-access-key=YOUR_ACCESS_KEY
hive.s3.aws-secret-key=YOUR_SECRET_KEY
hive.s3.endpoint=s3.amazonaws.com
```

**MongoDB Connector** (`etc/catalog/mongodb.properties`):
```properties
connector.name=mongodb
mongodb.connection-url=mongodb://mongo.example.com:27017
```

### Start Trino Server

```bash
# Start in background
bin/launcher start

# Start in foreground (for debugging)
bin/launcher run

# Check status
bin/launcher status

# Stop server
bin/launcher stop
```

### Install Trino CLI

```bash
# Download CLI
wget https://repo1.maven.org/maven2/io/trino/trino-cli/435/trino-cli-435-executable.jar

# Make executable
chmod +x trino-cli-435-executable.jar
mv trino-cli-435-executable.jar /usr/local/bin/trino

# Connect to Trino
trino --server http://localhost:8080 --catalog mysql --schema default
```

### Verify Installation

```bash
# Access Web UI
http://localhost:8080

# Test CLI connection
trino --server localhost:8080 --execute "SELECT 1"

# Show catalogs
trino --server localhost:8080 --execute "SHOW CATALOGS"
```

---

## User Guide

### Getting Started

#### 1. Connect to Trino

**Using Trino CLI:**
```bash
# Connect to server
trino --server http://localhost:8080

# Connect with catalog and schema
trino --server http://localhost:8080 --catalog mysql --schema production

# Connect with authentication
trino --server https://trino.example.com --user username --password
```

**Using Python:**
```python
from trino.dbapi import connect

conn = connect(
    host='localhost',
    port=8080,
    user='admin',
    catalog='mysql',
    schema='production'
)

cursor = conn.cursor()
cursor.execute("SELECT * FROM users LIMIT 10")
rows = cursor.fetchall()
```

**Using JDBC (Java):**
```java
import java.sql.*;

String url = "jdbc:trino://localhost:8080/mysql/production";
Connection conn = DriverManager.getConnection(url, "admin", "");
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM users");
```

#### 2. Basic Queries

**Simple SELECT:**
```sql
SELECT * FROM mysql.production.users LIMIT 10;

SELECT 
    id, 
    name, 
    email 
FROM mysql.production.users 
WHERE active = true;
```

**Aggregations:**
```sql
SELECT 
    country,
    COUNT(*) as user_count,
    AVG(age) as avg_age
FROM mysql.production.users
GROUP BY country
ORDER BY user_count DESC;
```

**Joins:**
```sql
SELECT 
    u.name,
    o.order_id,
    o.total
FROM mysql.production.users u
JOIN postgresql.sales.orders o ON u.id = o.user_id
WHERE o.created_at >= DATE '2024-01-01';
```

#### 3. Federated Queries

**Query Multiple Data Sources:**
```sql
-- Join MySQL and MongoDB
SELECT 
    u.name,
    u.email,
    l.timestamp,
    l.action
FROM mysql.production.users u
JOIN mongodb.logs.user_logs l ON CAST(u.id AS VARCHAR) = l.user_id
WHERE l.timestamp >= CURRENT_TIMESTAMP - INTERVAL '24' HOUR
LIMIT 100;
```

**Cross-Database Analytics:**
```sql
-- Combine data from 3 sources
WITH mysql_users AS (
    SELECT id, name, country FROM mysql.production.users
),
mongo_events AS (
    SELECT user_id, COUNT(*) as event_count
    FROM mongodb.analytics.events
    WHERE date >= DATE '2024-01-01'
    GROUP BY user_id
),
postgres_orders AS (
    SELECT user_id, SUM(total) as total_spent
    FROM postgresql.sales.orders
    WHERE created_at >= DATE '2024-01-01'
    GROUP BY user_id
)
SELECT 
    u.name,
    u.country,
    COALESCE(e.event_count, 0) as events,
    COALESCE(o.total_spent, 0) as revenue
FROM mysql_users u
LEFT JOIN mongo_events e ON CAST(u.id AS VARCHAR) = e.user_id
LEFT JOIN postgres_orders o ON u.id = o.user_id
ORDER BY revenue DESC;
```

#### 4. Data Lake Queries

**Query S3/Hive:**
```sql
-- Query Parquet files in S3
SELECT 
    year,
    month,
    country,
    SUM(revenue) as total_revenue
FROM hive.data_lake.sales
WHERE year = 2024
GROUP BY year, month, country
ORDER BY total_revenue DESC;
```

**Create External Table:**
```sql
CREATE TABLE hive.default.events (
    event_id VARCHAR,
    user_id VARCHAR,
    event_type VARCHAR,
    timestamp TIMESTAMP
)
WITH (
    external_location = 's3://my-bucket/events/',
    format = 'PARQUET'
);
```

### Advanced Features

#### Window Functions

```sql
SELECT 
    user_id,
    order_date,
    total,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date DESC) as order_rank,
    SUM(total) OVER (PARTITION BY user_id) as user_total,
    AVG(total) OVER (PARTITION BY user_id) as user_avg
FROM postgresql.sales.orders;
```

#### Complex Aggregations

```sql
-- Array aggregation
SELECT 
    user_id,
    ARRAY_AGG(product_id) as purchased_products,
    COUNT(DISTINCT product_id) as unique_products
FROM mysql.production.purchases
GROUP BY user_id;

-- Map aggregation
SELECT 
    country,
    MAP_AGG(city, user_count) as city_distribution
FROM (
    SELECT country, city, COUNT(*) as user_count
    FROM mysql.production.users
    GROUP BY country, city
) t
GROUP BY country;
```

#### JSON Functions

```sql
SELECT 
    id,
    JSON_EXTRACT(metadata, '$.name') as name,
    JSON_EXTRACT_SCALAR(metadata, '$.age') as age,
    JSON_ARRAY_LENGTH(JSON_EXTRACT(metadata, '$.tags')) as tag_count
FROM mongodb.app.documents;
```

#### Temporal Queries

```sql
-- Time-based analysis
SELECT 
    DATE_TRUNC('hour', timestamp) as hour,
    COUNT(*) as event_count,
    COUNT(DISTINCT user_id) as unique_users
FROM hive.logs.events
WHERE timestamp >= CURRENT_TIMESTAMP - INTERVAL '7' DAY
GROUP BY DATE_TRUNC('hour', timestamp)
ORDER BY hour DESC;
```

### Data Management

#### Create Table (CTAS)

```sql
-- Create table from query
CREATE TABLE hive.analytics.user_summary AS
SELECT 
    u.id,
    u.name,
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent
FROM mysql.production.users u
LEFT JOIN postgresql.sales.orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
```

#### Insert Data

```sql
-- Insert from SELECT
INSERT INTO hive.analytics.daily_stats
SELECT 
    CURRENT_DATE as date,
    catalog_name,
    schema_name,
    COUNT(*) as query_count
FROM system.runtime.queries
WHERE created >= CURRENT_DATE
GROUP BY catalog_name, schema_name;
```

#### Partitioned Tables

```sql
-- Create partitioned table
CREATE TABLE hive.default.events (
    event_id VARCHAR,
    user_id VARCHAR,
    event_type VARCHAR,
    timestamp TIMESTAMP
)
WITH (
    partitioned_by = ARRAY['year', 'month'],
    format = 'PARQUET'
);

-- Query specific partition
SELECT * 
FROM hive.default.events
WHERE year = 2024 AND month = 1;
```

### Performance Optimization

#### Explain Plans

```sql
-- View query execution plan
EXPLAIN SELECT * FROM mysql.production.users WHERE country = 'USA';

-- Analyze query
EXPLAIN ANALYZE 
SELECT 
    country,
    COUNT(*) as user_count
FROM mysql.production.users
GROUP BY country;
```

#### Query Optimization

```sql
-- Use LIMIT for exploration
SELECT * FROM large_table LIMIT 100;

-- Pushdown filters
SELECT * FROM hive.data.events
WHERE date = '2024-01-01'  -- Partition pruning
  AND user_id IN (SELECT id FROM mysql.users WHERE premium = true);

-- Optimize joins
SELECT /*+ BROADCAST */ *
FROM small_table s
JOIN large_table l ON s.id = l.id;
```

### Integration Examples

#### BI Tool Integration (Metabase)

```yaml
# Metabase connection
Database type: Presto
Host: localhost
Port: 8080
Database name: mysql
Username: admin
```

#### Python Data Analysis

```python
import pandas as pd
from trino.dbapi import connect

conn = connect(
    host='localhost',
    port=8080,
    user='admin',
    catalog='mysql',
    schema='production'
)

# Query to DataFrame
df = pd.read_sql("""
    SELECT 
        country,
        COUNT(*) as users
    FROM users
    GROUP BY country
""", conn)

print(df.head())
```

#### Apache Superset

```python
# SQLAlchemy URI for Superset
trino://admin@localhost:8080/mysql
```

#### dbt (Data Build Tool)

```yaml
# profiles.yml
trino:
  target: prod
  outputs:
    prod:
      type: trino
      method: none
      user: admin
      host: localhost
      port: 8080
      catalog: hive
      schema: analytics
```

### Monitoring and Management

```sql
-- View running queries
SELECT 
    query_id,
    state,
    user,
    query,
    started
FROM system.runtime.queries
WHERE state = 'RUNNING'
ORDER BY started DESC;

-- Kill query
CALL system.runtime.kill_query('20240120_123456_00001_abc12');

-- View cluster nodes
SELECT * FROM system.runtime.nodes;

-- View memory usage
SELECT 
    node_id,
    pool,
    reserved_bytes,
    max_bytes
FROM system.runtime.memory_pool_info;
```

---

## Best Practices

### Query Optimization

1. **Use Partition Pruning**: Filter on partition columns
2. **Limit Result Sets**: Use LIMIT for exploration
3. **Avoid SELECT ***: Specify only needed columns
4. **Use Appropriate Joins**: Choose BROADCAST for small tables

### Connector Configuration

1. **Connection Pooling**: Configure proper pool sizes
2. **Pushdown**: Enable predicate and projection pushdown
3. **Parallelism**: Tune splits per node
4. **Caching**: Use metadata and data caching

### Resource Management

1. **Memory**: Allocate 70-80% of system RAM to JVM
2. **CPU**: Match worker count to available cores
3. **Disk**: Use fast SSD for spill storage
4. **Network**: 10Gbps network for large clusters

### Security

1. **Authentication**: Enable LDAP, Kerberos, or OAuth
2. **Authorization**: Implement fine-grained access control
3. **TLS/SSL**: Encrypt data in transit
4. **Audit Logging**: Track query execution

---

## Troubleshooting

### Common Issues

**Out of Memory:**
```bash
# Increase heap size in jvm.config
-Xmx32G

# Enable spilling to disk
spill-enabled=true
spiller-spill-path=/var/trino/spill
```

**Slow Queries:**
```sql
-- Check execution plan
EXPLAIN ANALYZE SELECT ...;

-- Monitor query progress
SELECT * FROM system.runtime.tasks WHERE query_id = 'xxx';
```

**Connection Errors:**
```bash
# Check server is running
curl http://localhost:8080/v1/info

# Verify connector configuration
cat etc/catalog/mysql.properties
```

---

## Resources

### Official Documentation
- [Trino Documentation](https://trino.io/docs/current/)
- [SQL Reference](https://trino.io/docs/current/sql.html)
- [Connectors](https://trino.io/docs/current/connector.html)

### Tutorials
- [Getting Started](https://trino.io/docs/current/installation/deployment.html)
- [Query Optimization](https://trino.io/docs/current/admin/tuning.html)
- [Use Cases](https://trino.io/docs/current/use-cases.html)

### Community
- [Trino Slack](https://trino.io/slack.html)
- [GitHub Repository](https://github.com/trinodb/trino)
- [Community Forum](https://github.com/trinodb/trino/discussions)

### Tools
- [Trino CLI](https://trino.io/docs/current/client/cli.html)
- [Trino Gateway](https://github.com/trinodb/trino-gateway)
- [Trino Helm Charts](https://github.com/trinodb/charts)

---

*Last Updated: January 2026*
