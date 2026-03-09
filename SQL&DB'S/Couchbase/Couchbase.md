# Couchbase

## Introduction

Couchbase is a distributed NoSQL cloud database designed for interactive applications. It combines the best of NoSQL (flexible JSON data model, easy scalability) with SQL-like querying (N1QL) and supports multiple data access patterns including key-value, document, full-text search, and analytics.

### Key Features

- **Flexible JSON Data Model**: Schema-less JSON document storage
- **Memory-First Architecture**: Built-in caching for sub-millisecond data operations
- **SQL++ (N1QL)**: SQL-like query language for JSON
- **Multi-Model**: Key-value, document, full-text search, eventing, analytics
- **High Performance**: Memory-first architecture with automatic caching
- **Easy Scalability**: Add nodes without downtime
- **Cross-Datacenter Replication (XDCR)**: Active-active geo-distribution
- **Full-Text Search**: Integrated full-text search capabilities
- **Mobile Sync**: Built-in mobile and edge synchronization (Sync Gateway)
- **ACID Transactions**: Multi-document ACID transactions
- **Indexing**: Global secondary indexes, full-text indexes

### Common Use Cases

- **User Profile Management**: Store and retrieve user profiles
- **Content Management**: Digital content and metadata
- **E-commerce**: Product catalogs, shopping carts, session store
- **Mobile Applications**: Offline-first mobile apps with sync
- **IoT Applications**: Sensor data collection and analytics
- **Real-Time Analytics**: Operational analytics on live data
- **Session Store**: High-performance session management
- **Caching Layer**: Distributed caching for applications

## Installation & Setup

### Docker Installation

```bash
# Pull Couchbase image
docker pull couchbase:latest

# Run Couchbase container
docker run -d \
  --name couchbase \
  -p 8091-8096:8091-8096 \
  -p 11210-11211:11210-11211 \
  couchbase:latest

# Access web console at http://localhost:8091
# Default credentials: Administrator / password
```

### Docker Compose Setup

```yaml
version: '3.8'

services:
  couchbase:
    image: couchbase:latest
    container_name: couchbase
    ports:
      - "8091-8096:8091-8096"
      - "11210-11211:11210-11211"
    volumes:
      - couchbase-data:/opt/couchbase/var
    environment:
      - CLUSTER_NAME=my-cluster
    networks:
      - couchbase-network

  # Multi-node cluster
  couchbase-node2:
    image: couchbase:latest
    container_name: couchbase-node2
    ports:
      - "9091-9096:8091-8096"
    volumes:
      - couchbase-data2:/opt/couchbase/var
    networks:
      - couchbase-network
    depends_on:
      - couchbase

volumes:
  couchbase-data:
  couchbase-data2:

networks:
  couchbase-network:
    driver: bridge
```

### Linux Installation (Ubuntu/Debian)

```bash
# Download and install
wget https://packages.couchbase.com/releases/7.6.0/couchbase-server-community_7.6.0-ubuntu22.04_amd64.deb
sudo dpkg -i couchbase-server-community_7.6.0-ubuntu22.04_amd64.deb

# Start Couchbase
sudo systemctl start couchbase-server
sudo systemctl enable couchbase-server

# Check status
sudo systemctl status couchbase-server

# Access web console
# http://localhost:8091
```

### Initial Cluster Setup

```bash
# Initialize cluster using CLI
couchbase-cli cluster-init \
  --cluster localhost:8091 \
  --cluster-username Administrator \
  --cluster-password password \
  --cluster-name MyCluster \
  --cluster-ramsize 2048 \
  --cluster-index-ramsize 512 \
  --cluster-fts-ramsize 512 \
  --cluster-eventing-ramsize 512 \
  --cluster-analytics-ramsize 1024 \
  --services data,index,query,fts,eventing,analytics

# Create bucket
couchbase-cli bucket-create \
  --cluster localhost:8091 \
  --username Administrator \
  --password password \
  --bucket mybucket \
  --bucket-type couchbase \
  --bucket-ramsize 1024 \
  --bucket-replica 1 \
  --enable-flush 1
```

## Core Concepts

### Buckets

Buckets are logical containers for documents, similar to databases in RDBMS.

```bash
# Create bucket via CLI
couchbase-cli bucket-create \
  -c localhost:8091 \
  -u Administrator \
  -p password \
  --bucket ecommerce \
  --bucket-type couchbase \
  --bucket-ramsize 512 \
  --bucket-replica 1

# List buckets
couchbase-cli bucket-list \
  -c localhost:8091 \
  -u Administrator \
  -p password

# Delete bucket
couchbase-cli bucket-delete \
  -c localhost:8091 \
  -u Administrator \
  -p password \
  --bucket ecommerce
```

### Scopes and Collections

Scopes and collections provide logical organization within buckets (like databases and tables).

```bash
# Create scope
couchbase-cli collection-manage \
  -c localhost:8091 \
  -u Administrator \
  -p password \
  --bucket ecommerce \
  --create-scope users_scope

# Create collection
couchbase-cli collection-manage \
  -c localhost:8091 \
  -u Administrator \
  -p password \
  --bucket ecommerce \
  --create-collection users_scope.profiles

# List scopes and collections
couchbase-cli collection-manage \
  -c localhost:8091 \
  -u Administrator \
  -p password \
  --bucket ecommerce \
  --list-scopes
```

### Documents

Documents are JSON objects stored with unique keys.

```json
// User document example
{
  "type": "user",
  "userId": "user123",
  "username": "johndoe",
  "email": "john@example.com",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "age": 30
  },
  "addresses": [
    {
      "type": "home",
      "street": "123 Main St",
      "city": "New York",
      "zipCode": "10001"
    }
  ],
  "createdAt": "2024-01-17T10:00:00Z"
}
```

### Data Types

Couchbase supports standard JSON data types:
- **String**: Text data
- **Number**: Integer or floating-point
- **Boolean**: true/false
- **Array**: Ordered list of values
- **Object**: Nested JSON objects
- **Null**: Null value

## CRUD Operations

### Using SDK (Python)

```python
from couchbase.cluster import Cluster
from couchbase.auth import PasswordAuthenticator
from couchbase.options import ClusterOptions
from datetime import timedelta
import uuid

# Connect to cluster
auth = PasswordAuthenticator('Administrator', 'password')
cluster = Cluster('couchbase://localhost', ClusterOptions(auth))

# Get bucket and collection
bucket = cluster.bucket('ecommerce')
collection = bucket.default_collection()

# Wait for bucket to be ready
bucket.wait_until_ready(timedelta(seconds=5))

# CREATE - Insert document
user_id = str(uuid.uuid4())
user_doc = {
    'type': 'user',
    'userId': user_id,
    'username': 'johndoe',
    'email': 'john@example.com',
    'profile': {
        'firstName': 'John',
        'lastName': 'Doe',
        'age': 30
    }
}

result = collection.insert(user_id, user_doc)
print(f"Document inserted with CAS: {result.cas}")

# READ - Get document
result = collection.get(user_id)
print(f"Document: {result.content_as[dict]}")

# UPDATE - Replace document
user_doc['email'] = 'newemail@example.com'
result = collection.replace(user_id, user_doc)

# UPDATE - Partial update using subdoc
collection.mutate_in(user_id, [
    SD.upsert('profile.age', 31),
    SD.upsert('lastUpdated', '2024-01-17T10:00:00Z')
])

# DELETE - Remove document
collection.remove(user_id)

# Upsert (insert or update)
collection.upsert(user_id, user_doc)
```

### Using N1QL (SQL++)

```sql
-- INSERT
INSERT INTO ecommerce (KEY, VALUE)
VALUES ('user::001', {
  'type': 'user',
  'userId': 'user001',
  'username': 'johndoe',
  'email': 'john@example.com',
  'profile': {
    'firstName': 'John',
    'lastName': 'Doe'
  }
});

-- SELECT
SELECT * FROM ecommerce 
WHERE type = 'user' 
  AND userId = 'user001';

-- SELECT with nested fields
SELECT u.username, u.email, u.profile.firstName 
FROM ecommerce u
WHERE u.type = 'user';

-- UPDATE
UPDATE ecommerce 
SET email = 'newemail@example.com',
    profile.age = 31
WHERE userId = 'user001';

-- DELETE
DELETE FROM ecommerce 
WHERE userId = 'user001';

-- UPSERT
UPSERT INTO ecommerce (KEY, VALUE)
VALUES ('user::002', {
  'type': 'user',
  'userId': 'user002',
  'username': 'janedoe'
});
```

## Querying with N1QL (SQL++)

### Basic Queries

```sql
-- Select all documents
SELECT * FROM ecommerce;

-- Select specific fields
SELECT username, email FROM ecommerce WHERE type = 'user';

-- WHERE clause
SELECT * FROM ecommerce 
WHERE type = 'user' 
  AND profile.age > 25;

-- IN operator
SELECT * FROM ecommerce 
WHERE userId IN ['user001', 'user002', 'user003'];

-- LIKE operator
SELECT * FROM ecommerce 
WHERE username LIKE 'john%';

-- IS NULL / IS NOT NULL
SELECT * FROM ecommerce 
WHERE email IS NOT NULL;

-- LIMIT and OFFSET
SELECT * FROM ecommerce 
WHERE type = 'user'
LIMIT 10 OFFSET 20;

-- ORDER BY
SELECT * FROM ecommerce 
WHERE type = 'user'
ORDER BY profile.age DESC;
```

### Array Operations

```sql
-- ANY operator (check if any array element matches)
SELECT * FROM ecommerce 
WHERE type = 'user'
  AND ANY addr IN addresses SATISFIES addr.city = 'New York' END;

-- EVERY operator (check if all array elements match)
SELECT * FROM ecommerce 
WHERE EVERY tag IN tags SATISFIES tag != 'deprecated' END;

-- ARRAY operator (transform arrays)
SELECT username,
  ARRAY addr.city FOR addr IN addresses END AS cities
FROM ecommerce
WHERE type = 'user';

-- Unnest arrays
SELECT u.username, addr.city, addr.zipCode
FROM ecommerce u
UNNEST u.addresses addr
WHERE u.type = 'user';
```

### Joins

```sql
-- INNER JOIN
SELECT u.username, o.orderId, o.total
FROM ecommerce u
JOIN ecommerce o ON KEYS o.userId
WHERE u.type = 'user' 
  AND o.type = 'order';

-- LEFT JOIN
SELECT u.username, o.orderId
FROM ecommerce u
LEFT JOIN ecommerce o ON KEYS ARRAY 'order::' || orderId FOR orderId IN u.orderIds END
WHERE u.type = 'user';

-- INDEX JOIN
SELECT u.username, o.total
FROM ecommerce u
JOIN ecommerce o ON u.userId = o.userId
WHERE u.type = 'user' 
  AND o.type = 'order';
```

### Aggregations

```sql
-- COUNT
SELECT COUNT(*) as total_users 
FROM ecommerce 
WHERE type = 'user';

-- SUM, AVG, MIN, MAX
SELECT 
  COUNT(*) as total_orders,
  SUM(total) as total_revenue,
  AVG(total) as avg_order_value,
  MIN(total) as min_order,
  MAX(total) as max_order
FROM ecommerce
WHERE type = 'order';

-- GROUP BY
SELECT category, COUNT(*) as count, AVG(price) as avg_price
FROM ecommerce
WHERE type = 'product'
GROUP BY category;

-- HAVING
SELECT category, COUNT(*) as count
FROM ecommerce
WHERE type = 'product'
GROUP BY category
HAVING COUNT(*) > 10;
```

### Subqueries

```sql
-- Subquery in WHERE
SELECT * FROM ecommerce
WHERE type = 'order'
  AND userId IN (
    SELECT RAW userId FROM ecommerce WHERE type = 'user' AND premium = true
  );

-- Subquery in SELECT
SELECT username,
  (SELECT COUNT(*) FROM ecommerce o WHERE o.userId = u.userId AND o.type = 'order') as order_count
FROM ecommerce u
WHERE u.type = 'user';
```

### Advanced Features

```sql
-- UNION
SELECT username FROM ecommerce WHERE type = 'user' AND active = true
UNION
SELECT username FROM ecommerce WHERE type = 'admin';

-- Common Table Expressions (CTE)
WITH active_users AS (
  SELECT * FROM ecommerce WHERE type = 'user' AND active = true
)
SELECT u.username, COUNT(o.*) as order_count
FROM active_users u
LEFT JOIN ecommerce o ON u.userId = o.userId AND o.type = 'order'
GROUP BY u.username;

-- Window functions
SELECT username, email, total,
  ROW_NUMBER() OVER (PARTITION BY category ORDER BY total DESC) as rank
FROM ecommerce
WHERE type = 'order';
```

## Indexing

### Primary Index

```sql
-- Create primary index
CREATE PRIMARY INDEX ON ecommerce;

-- Create primary index with name
CREATE PRIMARY INDEX idx_primary ON ecommerce;

-- Drop primary index
DROP PRIMARY INDEX ON ecommerce;
```

### Secondary Indexes

```sql
-- Create secondary index
CREATE INDEX idx_user_email ON ecommerce(email) WHERE type = 'user';

-- Create composite index
CREATE INDEX idx_user_age_city ON ecommerce(profile.age, profile.city)
WHERE type = 'user';

-- Create index on array
CREATE INDEX idx_tags ON ecommerce(DISTINCT ARRAY tag FOR tag IN tags END);

-- Create covering index
CREATE INDEX idx_user_covering ON ecommerce(userId, username, email)
WHERE type = 'user';

-- List indexes
SELECT * FROM system:indexes WHERE keyspace_id = 'ecommerce';

-- Drop index
DROP INDEX ecommerce.idx_user_email;
```

### Full-Text Search Indexes

```sql
-- Create FTS index via REST API or Web UI
-- Example using cbft-cli or Web Console
```

```bash
# Create FTS index using REST API
curl -X PUT http://localhost:8094/api/index/products-fts \
  -u Administrator:password \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "fulltext-index",
    "name": "products-fts",
    "sourceType": "couchbase",
    "sourceName": "ecommerce",
    "planParams": {
      "maxPartitionsPerPIndex": 1024
    },
    "params": {
      "mapping": {
        "default_mapping": {
          "enabled": true
        }
      }
    }
  }'
```

## Client Libraries

### Python SDK

```python
from couchbase.cluster import Cluster
from couchbase.auth import PasswordAuthenticator
from couchbase.options import ClusterOptions, QueryOptions
from datetime import timedelta

# Connect
auth = PasswordAuthenticator('Administrator', 'password')
cluster = Cluster('couchbase://localhost', ClusterOptions(auth))
bucket = cluster.bucket('ecommerce')
collection = bucket.default_collection()

# Key-value operations
doc = {'name': 'Product 1', 'price': 29.99}
collection.upsert('product::1', doc)

result = collection.get('product::1')
print(result.content_as[dict])

# N1QL query
query = """
    SELECT username, email 
    FROM ecommerce 
    WHERE type = 'user' 
    LIMIT 10
"""
result = cluster.query(query)
for row in result:
    print(row)

# Parameterized query
query = "SELECT * FROM ecommerce WHERE userId = $userId"
result = cluster.query(query, QueryOptions(named_parameters={'userId': 'user123'}))

# Sub-document operations
from couchbase.subdocument import MutateInSpec

collection.mutate_in('product::1', [
    MutateInSpec.upsert('stock', 100),
    MutateInSpec.increment('views', 1)
])

# Transactions
from couchbase.transactions import TransactionConfig

txn = cluster.transactions()
def txn_logic(ctx):
    doc1 = ctx.get(collection, 'account::1')
    doc2 = ctx.get(collection, 'account::2')
    
    balance1 = doc1.content_as[dict]['balance']
    balance2 = doc2.content_as[dict]['balance']
    
    doc1.content_as[dict]['balance'] = balance1 - 100
    doc2.content_as[dict]['balance'] = balance2 + 100
    
    ctx.replace(doc1, doc1.content_as[dict])
    ctx.replace(doc2, doc2.content_as[dict])

txn.run(txn_logic)
```

### Node.js SDK

```javascript
const couchbase = require('couchbase');

async function main() {
  // Connect to cluster
  const cluster = await couchbase.connect('couchbase://localhost', {
    username: 'Administrator',
    password: 'password',
  });

  const bucket = cluster.bucket('ecommerce');
  const collection = bucket.defaultCollection();

  // Insert document
  await collection.insert('user::123', {
    type: 'user',
    username: 'johndoe',
    email: 'john@example.com'
  });

  // Get document
  const result = await collection.get('user::123');
  console.log(result.content);

  // Update document
  await collection.replace('user::123', {
    type: 'user',
    username: 'johndoe',
    email: 'newemail@example.com'
  });

  // N1QL query
  const query = `
    SELECT username, email 
    FROM ecommerce 
    WHERE type = 'user'
  `;
  
  const queryResult = await cluster.query(query);
  queryResult.rows.forEach(row => {
    console.log(row);
  });

  // Parameterized query
  const paramQuery = await cluster.query(
    'SELECT * FROM ecommerce WHERE userId = $userId',
    { parameters: { userId: 'user123' } }
  );

  // Sub-document operations
  await collection.mutateIn('user::123', [
    couchbase.MutateInSpec.upsert('lastLogin', new Date().toISOString()),
    couchbase.MutateInSpec.increment('loginCount', 1)
  ]);

  // Delete document
  await collection.remove('user::123');
}

main().catch(console.error);
```

### Java SDK

```java
import com.couchbase.client.java.*;
import com.couchbase.client.java.json.*;
import com.couchbase.client.java.query.*;
import java.time.Duration;

public class CouchbaseExample {
    public static void main(String[] args) {
        // Connect to cluster
        Cluster cluster = Cluster.connect(
            "localhost",
            "Administrator",
            "password"
        );
        
        Bucket bucket = cluster.bucket("ecommerce");
        Collection collection = bucket.defaultCollection();
        
        bucket.waitUntilReady(Duration.ofSeconds(10));
        
        // Insert document
        JsonObject user = JsonObject.create()
            .put("type", "user")
            .put("username", "johndoe")
            .put("email", "john@example.com");
        
        collection.insert("user::123", user);
        
        // Get document
        GetResult result = collection.get("user::123");
        System.out.println(result.contentAsObject());
        
        // Update document
        user.put("email", "newemail@example.com");
        collection.replace("user::123", user);
        
        // N1QL query
        QueryResult queryResult = cluster.query(
            "SELECT * FROM ecommerce WHERE type = 'user' LIMIT 10"
        );
        
        for (JsonObject row : queryResult.rowsAsObject()) {
            System.out.println(row);
        }
        
        // Parameterized query
        QueryResult paramResult = cluster.query(
            "SELECT * FROM ecommerce WHERE userId = $userId",
            QueryOptions.queryOptions().parameters(
                JsonObject.create().put("userId", "user123")
            )
        );
        
        // Sub-document operations
        collection.mutateIn("user::123",
            Arrays.asList(
                MutateInSpec.upsert("lastLogin", Instant.now().toString()),
                MutateInSpec.increment("loginCount", 1)
            )
        );
        
        // Delete
        collection.remove("user::123");
        
        cluster.disconnect();
    }
}
```

## Advanced Features

### Full-Text Search

```python
# Python FTS example
from couchbase.search import SearchQuery, MatchQuery

# Perform full-text search
result = cluster.search_query(
    'products-fts',
    SearchQuery.create(MatchQuery('laptop')),
    SearchOptions(limit=10)
)

for row in result:
    print(row.id, row.score)
```

### Eventing

Eventing allows you to write server-side functions that react to data changes.

```javascript
// Example eventing function
function OnUpdate(doc, meta) {
  // Triggered when a document is created or updated
  if (doc.type === 'order' && doc.status === 'pending') {
    // Send to processing queue
    dst_bucket[meta.id] = {
      orderId: doc.orderId,
      processedAt: new Date().toISOString()
    };
  }
}

function OnDelete(meta) {
  // Triggered when a document is deleted
  log('Document deleted:', meta.id);
}
```

### Analytics

```sql
-- Create analytics collection
CREATE ANALYTICS COLLECTION ecommerce_analytics ON ecommerce;

-- Run analytics query
SELECT category, COUNT(*) as count, AVG(price) as avg_price
FROM ecommerce_analytics
WHERE type = 'product'
GROUP BY category;
```

### Cross-Datacenter Replication (XDCR)

```bash
# Create replication via CLI
couchbase-cli xdcr-setup \
  -c localhost:8091 \
  -u Administrator \
  -p password \
  --create \
  --xdcr-cluster-name remote-cluster \
  --xdcr-hostname remote-host:8091 \
  --xdcr-username Administrator \
  --xdcr-password password

# Start replication
couchbase-cli xdcr-replicate \
  -c localhost:8091 \
  -u Administrator \
  -p password \
  --create \
  --xdcr-cluster-name remote-cluster \
  --xdcr-from-bucket ecommerce \
  --xdcr-to-bucket ecommerce
```

## Performance Optimization

### Memory Management

```bash
# Set bucket memory quota
couchbase-cli bucket-edit \
  -c localhost:8091 \
  -u Administrator \
  -p password \
  --bucket ecommerce \
  --bucket-ramsize 2048
```

### Index Optimization

```sql
-- Use covering indexes
CREATE INDEX idx_covering ON ecommerce(userId, username, email, type)
WHERE type = 'user';

-- Use partial indexes
CREATE INDEX idx_active_users ON ecommerce(userId, username)
WHERE type = 'user' AND active = true;

-- Defer index building
CREATE INDEX idx_deferred ON ecommerce(field) WITH {"defer_build": true};
BUILD INDEX ON ecommerce(idx_deferred);
```

### Query Optimization

```sql
-- Use EXPLAIN to analyze queries
EXPLAIN SELECT * FROM ecommerce WHERE type = 'user' AND userId = 'user123';

-- Use prepared statements
PREPARE user_query FROM SELECT * FROM ecommerce WHERE userId = $userId;
EXECUTE user_query USING {"userId": "user123"};
```

## Best Practices

### Data Modeling

1. **Use meaningful document keys** - Include type prefix (e.g., `user::123`)
2. **Denormalize when appropriate** - Embed related data
3. **Use collections** - Organize documents logically
4. **Keep documents reasonably sized** - Aim for < 1MB
5. **Use subdocuments** - For partial updates

### Performance

1. **Create appropriate indexes** - Based on query patterns
2. **Use covering indexes** - Include all queried fields
3. **Leverage memory** - Configure adequate bucket quota
4. **Use bulk operations** - For batch inserts/updates
5. **Monitor cluster health** - Regular performance checks

### Operations

1. **Regular backups** - Use cbbackupmgr
2. **Monitor resource usage** - CPU, memory, disk
3. **Plan capacity** - Scale before hitting limits
4. **Use replication** - For high availability
5. **Keep cluster balanced** - Distribute data evenly

## Monitoring

### Using Web Console

Access at `http://localhost:8091` for:
- Cluster health
- Bucket statistics
- Query performance
- Index status
- Resource usage

### CLI Monitoring

```bash
# Cluster status
couchbase-cli server-info \
  -c localhost:8091 \
  -u Administrator \
  -p password

# Bucket stats
couchbase-cli bucket-stats \
  -c localhost:8091 \
  -u Administrator \
  -p password \
  --bucket ecommerce

# Node statistics
cbstats localhost:11210 all -u Administrator -p password
```

## Backup and Restore

```bash
# Backup
cbbackupmgr config \
  --archive /backup \
  --repo ecommerce-repo

cbbackupmgr backup \
  --archive /backup \
  --repo ecommerce-repo \
  --cluster localhost:8091 \
  --username Administrator \
  --password password

# Restore
cbbackupmgr restore \
  --archive /backup \
  --repo ecommerce-repo \
  --cluster localhost:8091 \
  --username Administrator \
  --password password \
  --bucket-source ecommerce \
  --bucket-target ecommerce
```

## Resources

### Official Documentation

- [Couchbase Documentation](https://docs.couchbase.com/)
- [N1QL Language Reference](https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/)
- [SDK Documentation](https://docs.couchbase.com/sdk-api/index.html)

### Tools

- [Couchbase Web Console](http://localhost:8091) - Management interface
- [cbq](https://docs.couchbase.com/server/current/tools/cbq-shell.html) - N1QL shell
- [cbbackupmgr](https://docs.couchbase.com/server/current/backup-restore/cbbackupmgr.html) - Backup tool
- [Sync Gateway](https://docs.couchbase.com/sync-gateway/current/) - Mobile sync

### Learning Resources

- [Couchbase Academy](https://learn.couchbase.com/) - Free courses
- [Couchbase Blog](https://blog.couchbase.com/)
- [Developer Portal](https://developer.couchbase.com/)
- [Tutorials](https://docs.couchbase.com/tutorials/)

### Community

- [Couchbase Forums](https://forums.couchbase.com/)
- [GitHub Repository](https://github.com/couchbase)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/couchbase)
- [Discord Community](https://discord.gg/couchbase)

---

**Related Technologies**: [MongoDB](../MongoDB/), [CouchDB](../), [Cassandra](../Cassandra/), [DynamoDB](../DynamoDB/)
