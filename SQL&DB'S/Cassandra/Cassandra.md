# Apache Cassandra

## Introduction

Apache Cassandra is a highly scalable, distributed NoSQL database designed to handle large amounts of data across many commodity servers with no single point of failure. It provides high availability with no downtime and excellent performance for write-heavy workloads.

### Key Features

- **Distributed Architecture**: Masterless peer-to-peer architecture
- **Linear Scalability**: Add nodes to increase throughput proportionally
- **High Availability**: No single point of failure with replication
- **Fault Tolerance**: Automatic data replication across multiple nodes
- **Tunable Consistency**: Choose between consistency and availability
- **Write Performance**: Optimized for high write throughput
- **Column-Family Data Model**: Flexible schema design
- **Multi-Datacenter Replication**: Built-in support for geographic distribution
- **CQL (Cassandra Query Language)**: SQL-like query language
- **Elastic Scalability**: Scale up or down without downtime

### Common Use Cases

- **IoT and Time-Series Data**: Sensor data, metrics, logs
- **Messaging and Social Media**: Activity feeds, messaging platforms
- **Product Catalogs**: E-commerce product information
- **Fraud Detection**: Real-time fraud analysis
- **Recommendation Engines**: User preferences and recommendations
- **Personalization**: User profiles and preferences
- **Event Logging**: Application and system logs
- **Content Management**: Media metadata and content

## Installation & Setup

### Docker Installation

```bash
# Pull Cassandra image
docker pull cassandra:latest

# Run Cassandra container
docker run -d \
  --name cassandra \
  -p 9042:9042 \
  -e CASSANDRA_CLUSTER_NAME=MyCluster \
  -e CASSANDRA_ENDPOINT_SNITCH=GossipingPropertyFileSnitch \
  -v cassandra-data:/var/lib/cassandra \
  cassandra:latest

# Check status
docker exec -it cassandra nodetool status

# Access CQL shell
docker exec -it cassandra cqlsh
```

### Docker Compose Setup

```yaml
version: '3.8'

services:
  cassandra1:
    image: cassandra:latest
    container_name: cassandra1
    hostname: cassandra1
    environment:
      - CASSANDRA_CLUSTER_NAME=MyCluster
      - CASSANDRA_DC=datacenter1
      - CASSANDRA_RACK=rack1
      - CASSANDRA_ENDPOINT_SNITCH=GossipingPropertyFileSnitch
    ports:
      - "9042:9042"
    volumes:
      - cassandra1-data:/var/lib/cassandra
    networks:
      - cassandra-network

  cassandra2:
    image: cassandra:latest
    container_name: cassandra2
    hostname: cassandra2
    environment:
      - CASSANDRA_CLUSTER_NAME=MyCluster
      - CASSANDRA_DC=datacenter1
      - CASSANDRA_RACK=rack1
      - CASSANDRA_ENDPOINT_SNITCH=GossipingPropertyFileSnitch
      - CASSANDRA_SEEDS=cassandra1
    depends_on:
      - cassandra1
    volumes:
      - cassandra2-data:/var/lib/cassandra
    networks:
      - cassandra-network

  cassandra3:
    image: cassandra:latest
    container_name: cassandra3
    hostname: cassandra3
    environment:
      - CASSANDRA_CLUSTER_NAME=MyCluster
      - CASSANDRA_DC=datacenter1
      - CASSANDRA_RACK=rack1
      - CASSANDRA_ENDPOINT_SNITCH=GossipingPropertyFileSnitch
      - CASSANDRA_SEEDS=cassandra1
    depends_on:
      - cassandra1
    volumes:
      - cassandra3-data:/var/lib/cassandra
    networks:
      - cassandra-network

volumes:
  cassandra1-data:
  cassandra2-data:
  cassandra3-data:

networks:
  cassandra-network:
    driver: bridge
```

### Linux Installation (Ubuntu/Debian)

```bash
# Install Java (Cassandra requires Java)
sudo apt-get update
sudo apt-get install -y openjdk-11-jdk

# Add Cassandra repository
wget -q -O - https://downloads.apache.org/cassandra/KEYS | sudo apt-key add -
echo "deb https://downloads.apache.org/cassandra/debian 41x main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list

# Install Cassandra
sudo apt-get update
sudo apt-get install cassandra

# Start Cassandra
sudo systemctl start cassandra
sudo systemctl enable cassandra

# Check status
sudo systemctl status cassandra
nodetool status

# Access CQL shell
cqlsh
```

### Configuration

**cassandra.yaml** (key settings):
```yaml
# Cluster name
cluster_name: 'MyCluster'

# Data directories
data_file_directories:
  - /var/lib/cassandra/data

# Commit log directory
commitlog_directory: /var/lib/cassandra/commitlog

# Listen address
listen_address: localhost

# RPC address
rpc_address: localhost

# Seed providers
seed_provider:
  - class_name: org.apache.cassandra.locator.SimpleSeedProvider
    parameters:
      - seeds: "127.0.0.1,192.168.1.2,192.168.1.3"

# Endpoint snitch
endpoint_snitch: SimpleSnitch

# Number of tokens
num_tokens: 256
```

## Core Concepts

### Keyspace

A keyspace is the outermost container for data, similar to a database in RDBMS.

```cql
-- Create keyspace
CREATE KEYSPACE ecommerce
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 3
};

-- Create keyspace with NetworkTopologyStrategy
CREATE KEYSPACE ecommerce
WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'datacenter1': 3,
  'datacenter2': 2
};

-- Use keyspace
USE ecommerce;

-- Describe keyspace
DESCRIBE KEYSPACE ecommerce;

-- Drop keyspace
DROP KEYSPACE ecommerce;
```

### Table

Tables store data in a column-family structure.

```cql
-- Create table
CREATE TABLE users (
  user_id UUID PRIMARY KEY,
  username TEXT,
  email TEXT,
  created_at TIMESTAMP,
  last_login TIMESTAMP
);

-- Create table with composite primary key
CREATE TABLE user_activities (
  user_id UUID,
  activity_date DATE,
  activity_type TEXT,
  description TEXT,
  PRIMARY KEY ((user_id), activity_date, activity_type)
) WITH CLUSTERING ORDER BY (activity_date DESC, activity_type ASC);

-- Describe table
DESCRIBE TABLE users;

-- Alter table
ALTER TABLE users ADD phone TEXT;

-- Drop table
DROP TABLE users;
```

### Primary Key

Cassandra's primary key consists of:
- **Partition Key**: Determines data distribution across nodes
- **Clustering Columns**: Determines sort order within a partition

```cql
-- Simple primary key
CREATE TABLE products (
  product_id UUID PRIMARY KEY,
  name TEXT,
  price DECIMAL
);

-- Composite partition key
CREATE TABLE sales (
  store_id UUID,
  region TEXT,
  sale_date DATE,
  amount DECIMAL,
  PRIMARY KEY ((store_id, region), sale_date)
);

-- Multiple clustering columns
CREATE TABLE sensor_data (
  sensor_id UUID,
  year INT,
  month INT,
  day INT,
  hour INT,
  temperature FLOAT,
  PRIMARY KEY ((sensor_id, year), month, day, hour)
) WITH CLUSTERING ORDER BY (month DESC, day DESC, hour DESC);
```

### Data Types

```cql
-- Numeric types
CREATE TABLE numeric_example (
  id UUID PRIMARY KEY,
  int_col INT,
  bigint_col BIGINT,
  float_col FLOAT,
  double_col DOUBLE,
  decimal_col DECIMAL
);

-- Text types
CREATE TABLE text_example (
  id UUID PRIMARY KEY,
  text_col TEXT,
  varchar_col VARCHAR,
  ascii_col ASCII
);

-- Date and time types
CREATE TABLE datetime_example (
  id UUID PRIMARY KEY,
  timestamp_col TIMESTAMP,
  date_col DATE,
  time_col TIME,
  duration_col DURATION
);

-- Collection types
CREATE TABLE collection_example (
  id UUID PRIMARY KEY,
  list_col LIST<TEXT>,
  set_col SET<TEXT>,
  map_col MAP<TEXT, INT>
);

-- UUID types
CREATE TABLE uuid_example (
  id UUID PRIMARY KEY,
  timeuuid_col TIMEUUID
);
```

### Replication Strategy

```cql
-- SimpleStrategy (for single datacenter)
CREATE KEYSPACE test_keyspace
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 3
};

-- NetworkTopologyStrategy (for multiple datacenters)
CREATE KEYSPACE prod_keyspace
WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'DC1': 3,
  'DC2': 2,
  'DC3': 1
};

-- Update replication
ALTER KEYSPACE test_keyspace
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 5
};
```

## CRUD Operations

### Insert Data

```cql
-- Insert single record
INSERT INTO users (user_id, username, email, created_at)
VALUES (uuid(), 'john_doe', 'john@example.com', toTimestamp(now()));

-- Insert with TTL (time-to-live)
INSERT INTO users (user_id, username, email)
VALUES (uuid(), 'temp_user', 'temp@example.com')
USING TTL 86400; -- expires in 24 hours

-- Insert JSON
INSERT INTO users JSON '{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "username": "jane_doe",
  "email": "jane@example.com"
}';

-- Batch insert
BEGIN BATCH
  INSERT INTO users (user_id, username, email) VALUES (uuid(), 'user1', 'user1@example.com');
  INSERT INTO users (user_id, username, email) VALUES (uuid(), 'user2', 'user2@example.com');
  INSERT INTO users (user_id, username, email) VALUES (uuid(), 'user3', 'user3@example.com');
APPLY BATCH;
```

### Select Data

```cql
-- Select all
SELECT * FROM users;

-- Select specific columns
SELECT user_id, username, email FROM users;

-- Select with WHERE clause
SELECT * FROM users WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;

-- Select with partition key
SELECT * FROM user_activities WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;

-- Select with clustering column
SELECT * FROM user_activities 
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000 
  AND activity_date > '2024-01-01';

-- Select with LIMIT
SELECT * FROM users LIMIT 10;

-- Select with ORDER BY (only on clustering columns)
SELECT * FROM user_activities 
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000
ORDER BY activity_date DESC;

-- Select with ALLOW FILTERING (use sparingly)
SELECT * FROM users WHERE email = 'john@example.com' ALLOW FILTERING;

-- Select count
SELECT COUNT(*) FROM users;

-- Select JSON
SELECT JSON * FROM users;
```

### Update Data

```cql
-- Update record
UPDATE users 
SET email = 'newemail@example.com', last_login = toTimestamp(now())
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;

-- Update with TTL
UPDATE users USING TTL 3600
SET email = 'temp@example.com'
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;

-- Update collection (add to set)
UPDATE users 
SET tags = tags + {'premium', 'verified'}
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;

-- Update collection (remove from set)
UPDATE users 
SET tags = tags - {'trial'}
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;

-- Update map
UPDATE users 
SET preferences['theme'] = 'dark'
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;

-- Conditional update (lightweight transaction)
UPDATE users 
SET email = 'new@example.com'
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000
IF email = 'old@example.com';
```

### Delete Data

```cql
-- Delete entire row
DELETE FROM users 
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;

-- Delete specific columns
DELETE email, phone FROM users 
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;

-- Delete from collection
DELETE tags['premium'] FROM users 
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;

-- Conditional delete
DELETE FROM users 
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000
IF EXISTS;

-- Delete with timestamp
DELETE FROM users 
USING TIMESTAMP 1609459200000000
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000;
```

## Client Libraries

### Python (cassandra-driver)

```python
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import uuid
from datetime import datetime

# Connect to cluster
cluster = Cluster(['127.0.0.1'])
session = cluster.connect()

# Create keyspace
session.execute("""
    CREATE KEYSPACE IF NOT EXISTS ecommerce
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3}
""")

# Use keyspace
session.set_keyspace('ecommerce')

# Create table
session.execute("""
    CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY,
        username TEXT,
        email TEXT,
        created_at TIMESTAMP
    )
""")

# Insert data
user_id = uuid.uuid4()
session.execute("""
    INSERT INTO users (user_id, username, email, created_at)
    VALUES (%s, %s, %s, %s)
""", (user_id, 'john_doe', 'john@example.com', datetime.now()))

# Prepared statements (better performance)
prepared = session.prepare("""
    INSERT INTO users (user_id, username, email, created_at)
    VALUES (?, ?, ?, ?)
""")
session.execute(prepared, (uuid.uuid4(), 'jane_doe', 'jane@example.com', datetime.now()))

# Query data
rows = session.execute("SELECT * FROM users")
for row in rows:
    print(f"User: {row.username}, Email: {row.email}")

# Parameterized query
user = session.execute(
    "SELECT * FROM users WHERE user_id = %s",
    (user_id,)
).one()

# Update
session.execute("""
    UPDATE users SET email = %s WHERE user_id = %s
""", ('newemail@example.com', user_id))

# Delete
session.execute("DELETE FROM users WHERE user_id = %s", (user_id,))

# Batch operations
from cassandra.query import BatchStatement

batch = BatchStatement()
batch.add(prepared, (uuid.uuid4(), 'user1', 'user1@example.com', datetime.now()))
batch.add(prepared, (uuid.uuid4(), 'user2', 'user2@example.com', datetime.now()))
session.execute(batch)

# Close connection
cluster.shutdown()
```

### Node.js (cassandra-driver)

```javascript
const cassandra = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');

// Connect to cluster
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'ecommerce'
});

async function run() {
  await client.connect();
  
  // Create keyspace
  await client.execute(`
    CREATE KEYSPACE IF NOT EXISTS ecommerce
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3}
  `);
  
  // Create table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      user_id UUID PRIMARY KEY,
      username TEXT,
      email TEXT,
      created_at TIMESTAMP
    )
  `);
  
  // Insert data
  const userId = uuidv4();
  await client.execute(
    'INSERT INTO users (user_id, username, email, created_at) VALUES (?, ?, ?, ?)',
    [userId, 'john_doe', 'john@example.com', new Date()],
    { prepare: true }
  );
  
  // Query data
  const result = await client.execute('SELECT * FROM users');
  result.rows.forEach(row => {
    console.log(`User: ${row.username}, Email: ${row.email}`);
  });
  
  // Parameterized query
  const user = await client.execute(
    'SELECT * FROM users WHERE user_id = ?',
    [userId],
    { prepare: true }
  );
  
  // Update
  await client.execute(
    'UPDATE users SET email = ? WHERE user_id = ?',
    ['newemail@example.com', userId],
    { prepare: true }
  );
  
  // Delete
  await client.execute(
    'DELETE FROM users WHERE user_id = ?',
    [userId],
    { prepare: true }
  );
  
  // Batch operations
  const queries = [
    { query: 'INSERT INTO users (user_id, username, email) VALUES (?, ?, ?)',
      params: [uuidv4(), 'user1', 'user1@example.com'] },
    { query: 'INSERT INTO users (user_id, username, email) VALUES (?, ?, ?)',
      params: [uuidv4(), 'user2', 'user2@example.com'] }
  ];
  
  await client.batch(queries, { prepare: true });
  
  await client.shutdown();
}

run().catch(console.error);
```

### Java (DataStax Java Driver)

```java
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.*;
import com.datastax.oss.driver.api.core.uuid.Uuids;
import java.net.InetSocketAddress;
import java.time.Instant;
import java.util.UUID;

public class CassandraExample {
    public static void main(String[] args) {
        // Connect to cluster
        try (CqlSession session = CqlSession.builder()
                .addContactPoint(new InetSocketAddress("127.0.0.1", 9042))
                .withLocalDatacenter("datacenter1")
                .withKeyspace("ecommerce")
                .build()) {
            
            // Create keyspace
            session.execute(
                "CREATE KEYSPACE IF NOT EXISTS ecommerce " +
                "WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3}"
            );
            
            // Create table
            session.execute(
                "CREATE TABLE IF NOT EXISTS users (" +
                "user_id UUID PRIMARY KEY, " +
                "username TEXT, " +
                "email TEXT, " +
                "created_at TIMESTAMP)"
            );
            
            // Insert data
            UUID userId = Uuids.timeBased();
            PreparedStatement prepared = session.prepare(
                "INSERT INTO users (user_id, username, email, created_at) VALUES (?, ?, ?, ?)"
            );
            
            BoundStatement bound = prepared.bind(
                userId,
                "john_doe",
                "john@example.com",
                Instant.now()
            );
            session.execute(bound);
            
            // Query data
            ResultSet rs = session.execute("SELECT * FROM users");
            for (Row row : rs) {
                System.out.printf("User: %s, Email: %s%n",
                    row.getString("username"),
                    row.getString("email"));
            }
            
            // Parameterized query
            PreparedStatement selectStmt = session.prepare(
                "SELECT * FROM users WHERE user_id = ?"
            );
            Row user = session.execute(selectStmt.bind(userId)).one();
            
            // Update
            session.execute(
                session.prepare("UPDATE users SET email = ? WHERE user_id = ?")
                    .bind("newemail@example.com", userId)
            );
            
            // Delete
            session.execute(
                session.prepare("DELETE FROM users WHERE user_id = ?")
                    .bind(userId)
            );
            
            // Batch operations
            BatchStatement batch = BatchStatement.newInstance(
                BatchType.LOGGED,
                prepared.bind(Uuids.timeBased(), "user1", "user1@example.com", Instant.now()),
                prepared.bind(Uuids.timeBased(), "user2", "user2@example.com", Instant.now())
            );
            session.execute(batch);
        }
    }
}
```

## Advanced Features

### Secondary Indexes

```cql
-- Create secondary index
CREATE INDEX ON users (email);
CREATE INDEX ON users (username);

-- Create index on collection
CREATE INDEX ON users (KEYS(preferences));
CREATE INDEX ON users (VALUES(preferences));

-- Drop index
DROP INDEX users_email_idx;

-- Query using index
SELECT * FROM users WHERE email = 'john@example.com';
```

### Materialized Views

```cql
-- Create materialized view
CREATE MATERIALIZED VIEW users_by_email AS
  SELECT user_id, username, email, created_at
  FROM users
  WHERE email IS NOT NULL AND user_id IS NOT NULL
  PRIMARY KEY (email, user_id);

-- Query materialized view
SELECT * FROM users_by_email WHERE email = 'john@example.com';

-- Drop materialized view
DROP MATERIALIZED VIEW users_by_email;
```

### User-Defined Types (UDT)

```cql
-- Create UDT
CREATE TYPE address (
  street TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT
);

-- Use UDT in table
CREATE TABLE customers (
  customer_id UUID PRIMARY KEY,
  name TEXT,
  shipping_address FROZEN<address>,
  billing_address FROZEN<address>
);

-- Insert with UDT
INSERT INTO customers (customer_id, name, shipping_address)
VALUES (
  uuid(),
  'John Doe',
  {street: '123 Main St', city: 'New York', state: 'NY', zip_code: '10001', country: 'USA'}
);

-- Query UDT
SELECT name, shipping_address.city, shipping_address.state 
FROM customers;
```

### User-Defined Functions (UDF)

```cql
-- Create UDF
CREATE FUNCTION avgState(state tuple<int, bigint>, val int)
  CALLED ON NULL INPUT
  RETURNS tuple<int, bigint>
  LANGUAGE java AS
    'if (val != null) {
       state.setInt(0, state.getInt(0) + 1);
       state.setLong(1, state.getLong(1) + val.intValue());
     }
     return state;';

-- Create aggregate function
CREATE AGGREGATE average(int)
  SFUNC avgState
  STYPE tuple<int, bigint>
  FINALFUNC avgFinal
  INITCOND (0, 0);
```

### Counters

```cql
-- Create counter table
CREATE TABLE page_views (
  page_id UUID PRIMARY KEY,
  view_count COUNTER
);

-- Increment counter
UPDATE page_views SET view_count = view_count + 1 
WHERE page_id = 123e4567-e89b-12d3-a456-426614174000;

-- Decrement counter
UPDATE page_views SET view_count = view_count - 1 
WHERE page_id = 123e4567-e89b-12d3-a456-426614174000;

-- Query counter
SELECT * FROM page_views WHERE page_id = 123e4567-e89b-12d3-a456-426614174000;
```

## Performance Optimization

### Data Modeling Best Practices

1. **Query-First Design**: Design tables based on queries, not data
2. **Denormalization**: Duplicate data to avoid joins
3. **Partition Key Selection**: Choose keys that distribute data evenly
4. **Clustering Column Order**: Order by query patterns
5. **Avoid Large Partitions**: Keep partitions under 100MB

### Compaction Strategies

```cql
-- SizeTieredCompactionStrategy (default, good for writes)
ALTER TABLE users WITH compaction = {
  'class': 'SizeTieredCompactionStrategy',
  'min_threshold': 4,
  'max_threshold': 32
};

-- LeveledCompactionStrategy (good for reads)
ALTER TABLE users WITH compaction = {
  'class': 'LeveledCompactionStrategy',
  'sstable_size_in_mb': 160
};

-- TimeWindowCompactionStrategy (good for time-series)
ALTER TABLE sensor_data WITH compaction = {
  'class': 'TimeWindowCompactionStrategy',
  'compaction_window_size': 1,
  'compaction_window_unit': 'DAYS'
};
```

### Read/Write Tuning

```cql
-- Table options
ALTER TABLE users WITH 
  read_repair_chance = 0.1
  AND dclocal_read_repair_chance = 0.2
  AND gc_grace_seconds = 864000
  AND bloom_filter_fp_chance = 0.01
  AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
  AND comment = 'User data table'
  AND compression = {'sstable_compression': 'LZ4Compressor'}
  AND default_time_to_live = 0;
```

### Consistency Levels

```python
from cassandra.query import SimpleStatement, ConsistencyLevel

# Strong consistency (read)
stmt = SimpleStatement("SELECT * FROM users WHERE user_id = %s")
stmt.consistency_level = ConsistencyLevel.QUORUM
session.execute(stmt, (user_id,))

# Write with consistency
stmt = SimpleStatement(
    "INSERT INTO users (user_id, username) VALUES (%s, %s)"
)
stmt.consistency_level = ConsistencyLevel.ONE
session.execute(stmt, (user_id, username))
```

## Cluster Operations

### Node Management

```bash
# Check cluster status
nodetool status

# Check node info
nodetool info

# Repair node
nodetool repair

# Cleanup after scaling
nodetool cleanup

# Flush memtables to disk
nodetool flush

# Compact SSTables
nodetool compact

# Decommission node
nodetool decommission

# Remove dead node
nodetool removenode <node-id>
```

### Backup and Restore

```bash
# Create snapshot
nodetool snapshot -t backup_20240117

# List snapshots
nodetool listsnapshots

# Clear snapshot
nodetool clearsnapshot -t backup_20240117

# Incremental backup (enable in cassandra.yaml)
# incremental_backups: true

# Restore from snapshot
# 1. Stop Cassandra
# 2. Clear commit log and data directories
# 3. Copy snapshot files to data directory
# 4. Start Cassandra
```

### Monitoring

```bash
# Table statistics
nodetool tablestats keyspace_name.table_name

# Thread pool statistics
nodetool tpstats

# Histogram statistics
nodetool tablehistograms keyspace_name table_name

# Get endpoints
nodetool getendpoints keyspace_name table_name partition_key

# Describe cluster
nodetool describecluster
```

## Best Practices

### Data Modeling

1. **One query, one table** - Design tables for specific queries
2. **Distribute data evenly** - Choose good partition keys
3. **Keep partitions small** - Avoid unbounded growth
4. **Minimize partitions per query** - Query fewer partitions
5. **Use appropriate clustering order** - Match query patterns

### Performance

1. **Use prepared statements** - Reduce parsing overhead
2. **Batch wisely** - Only batch updates to same partition
3. **Choose appropriate consistency** - Balance consistency and performance
4. **Monitor compaction** - Ensure compactions keep up with writes
5. **Size SSTables appropriately** - Balance based on workload

### Operations

1. **Regular repairs** - Run nodetool repair regularly
2. **Monitor disk space** - Ensure adequate space for compaction
3. **Backup regularly** - Take snapshots before major changes
4. **Gradual deployment** - Roll out changes incrementally
5. **Monitor metrics** - Track key performance indicators

## Security

### Authentication

```yaml
# cassandra.yaml
authenticator: PasswordAuthenticator
authorizer: CassandraAuthorizer
```

```cql
-- Create user
CREATE USER john WITH PASSWORD 'password123' SUPERUSER;

-- Create regular user
CREATE USER app_user WITH PASSWORD 'app_pass' NOSUPERUSER;

-- Grant permissions
GRANT SELECT ON KEYSPACE ecommerce TO app_user;
GRANT MODIFY ON ecommerce.users TO app_user;

-- Revoke permissions
REVOKE SELECT ON KEYSPACE ecommerce FROM app_user;

-- List users
LIST USERS;

-- Alter user
ALTER USER john WITH PASSWORD 'newpassword';

-- Drop user
DROP USER john;
```

### SSL/TLS Encryption

```yaml
# cassandra.yaml - Client to node encryption
client_encryption_options:
  enabled: true
  keystore: /path/to/keystore
  keystore_password: password

# Node to node encryption
server_encryption_options:
  internode_encryption: all
  keystore: /path/to/keystore
  keystore_password: password
```

## Resources

### Official Documentation

- [Apache Cassandra Documentation](https://cassandra.apache.org/doc/latest/)
- [CQL Reference](https://cassandra.apache.org/doc/latest/cql/)
- [DataStax Documentation](https://docs.datastax.com/)

### Tools

- [cqlsh](https://cassandra.apache.org/doc/latest/tools/cqlsh.html) - CQL shell
- [nodetool](https://cassandra.apache.org/doc/latest/tools/nodetool/nodetool.html) - Cluster management
- [DataStax DevCenter](https://www.datastax.com/) - IDE for Cassandra
- [Cassandra Reaper](http://cassandra-reaper.io/) - Automated repair

### Learning Resources

- [Cassandra: The Definitive Guide](https://www.oreilly.com/library/view/cassandra-the-definitive/9781491933657/)
- [DataStax Academy](https://academy.datastax.com/) - Free training
- [Planet Cassandra](https://planetcassandra.org/) - Community hub
- [Cassandra Summit](https://events.datastax.com/)

### Community

- [GitHub Repository](https://github.com/apache/cassandra)
- [JIRA Issue Tracker](https://issues.apache.org/jira/browse/CASSANDRA)
- [Mailing Lists](https://cassandra.apache.org/community/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/cassandra)

---

**Related Technologies**: [ScyllaDB](../), [DynamoDB](../DynamoDB/), [MongoDB](../MongoDB/), [HBase](../)