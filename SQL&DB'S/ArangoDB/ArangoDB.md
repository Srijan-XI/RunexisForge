# ArangoDB

## Introduction

ArangoDB is a native multi-model database with flexible data models for documents, graphs, and key-value pairs. It provides a unified query language (AQL) that allows you to mix all three data models and supports joins and transactions across different data models.

### Key Features

- **Multi-Model Database**: Document, graph, and key-value in one engine
- **AQL (ArangoDB Query Language)**: Unified query language for all models
- **ACID Transactions**: Full ACID compliance across all data models
- **Horizontal Scalability**: Sharding and clustering built-in
- **Graph Database**: Native graph processing with traversals
- **Flexible Schema**: Schema-less JSON documents
- **High Performance**: In-memory and persistent storage options
- **Foxx Microservices**: Build data-centric microservices
- **Multi-Tenancy**: Multiple databases in single instance
- **SmartGraphs**: Efficient distributed graph processing

### Common Use Cases

- **Graph Analytics**: Social networks, recommendation engines, fraud detection
- **Document Store**: Content management, user profiles, catalogs
- **Real-Time Analytics**: Dashboard data, metrics aggregation
- **Identity and Access Management**: User relationships and permissions
- **Knowledge Graphs**: Semantic data, ontologies
- **Network Topology**: Infrastructure mapping, dependencies
- **Supply Chain**: Logistics, inventory management
- **IoT Data**: Sensor networks and relationships

## Installation & Setup

### Docker Installation

```bash
# Pull ArangoDB image
docker pull arangodb:latest

# Run ArangoDB container
docker run -d \
  --name arangodb \
  -p 8529:8529 \
  -e ARANGO_ROOT_PASSWORD=password \
  arangodb:latest

# Access web interface at http://localhost:8529
# Username: root, Password: password
```

### Docker Compose Setup

```yaml
version: '3.8'

services:
  arangodb:
    image: arangodb:latest
    container_name: arangodb
    environment:
      - ARANGO_ROOT_PASSWORD=password
    ports:
      - "8529:8529"
    volumes:
      - arangodb-data:/var/lib/arangodb3
      - arangodb-apps:/var/lib/arangodb3-apps
    networks:
      - arangodb-network

  # Cluster setup (3 agents, 3 dbservers, 3 coordinators)
  agent1:
    image: arangodb:latest
    environment:
      - ARANGO_NO_AUTH=1
    command: arangodb --agency.activate=true --agency.size=3 --agency.supervision=true --server.endpoint=tcp://0.0.0.0:8529
    networks:
      - arangodb-network

volumes:
  arangodb-data:
  arangodb-apps:

networks:
  arangodb-network:
    driver: bridge
```

### Linux Installation (Ubuntu/Debian)

```bash
# Add repository
curl -OL https://download.arangodb.com/arangodb39/DEBIAN/Release.key
sudo apt-key add - < Release.key

echo 'deb https://download.arangodb.com/arangodb39/DEBIAN/ /' | sudo tee /etc/apt/sources.list.d/arangodb.list

# Install ArangoDB
sudo apt-get update
sudo apt-get install arangodb3

# During installation, set root password

# Start service
sudo systemctl start arangodb3
sudo systemctl enable arangodb3

# Check status
sudo systemctl status arangodb3

# Access web interface at http://localhost:8529
```

### Configuration

**arangodb.conf**:
```ini
[server]
endpoint = tcp://0.0.0.0:8529

[database]
directory = /var/lib/arangodb3

[javascript]
app-path = /var/lib/arangodb3-apps

[log]
level = info
file = /var/log/arangodb3/arangodb.log
```

## Core Concepts

### Databases

```javascript
// Using arangosh (ArangoDB shell)

// Create database
db._createDatabase("ecommerce");

// Use database
db._useDatabase("ecommerce");

// List databases
db._databases();

// Drop database
db._dropDatabase("ecommerce");
```

### Collections

Collections are containers for documents (like tables in SQL).

```javascript
// Create document collection
db._create("users");

// Create edge collection (for graphs)
db._createEdgeCollection("follows");

// List collections
db._collections();

// Get collection
var users = db._collection("users");

// Drop collection
db._drop("users");

// Collection properties
users.properties();

// Rename collection
users.rename("customers");
```

### Documents

Documents are JSON objects stored in collections.

```javascript
// Insert document
db.users.save({
  _key: "user123",
  username: "johndoe",
  email: "john@example.com",
  age: 30,
  tags: ["premium", "verified"]
});

// Auto-generated _key
db.users.save({
  username: "janedoe",
  email: "jane@example.com"
});

// Get document by key
db.users.document("user123");

// Update document (replace)
db.users.replace("user123", {
  username: "johndoe",
  email: "newemail@example.com",
  age: 31
});

// Update document (partial)
db.users.update("user123", {
  age: 32,
  lastLogin: Date.now()
});

// Remove document
db.users.remove("user123");
```

### Graphs

Graphs consist of vertex collections and edge collections.

```javascript
// Create graph
var graph = require("@arangodb/general-graph");

var g = graph._create("social", [
  graph._relation("follows", "users", "users"),
  graph._relation("likes", "users", "posts")
]);

// Add vertex
g.users.save({
  _key: "alice",
  name: "Alice",
  age: 28
});

// Add edge
g.follows.save({
  _from: "users/alice",
  _to: "users/bob",
  since: "2024-01-01"
});

// Get graph
var social = graph._graph("social");

// List graphs
graph._list();

// Drop graph
graph._drop("social");
```

## AQL (ArangoDB Query Language)

### Basic Queries

```aql
// Return all documents
FOR user IN users
  RETURN user

// Filter documents
FOR user IN users
  FILTER user.age > 25
  RETURN user

// Return specific fields
FOR user IN users
  RETURN {
    username: user.username,
    email: user.email
  }

// Sort results
FOR user IN users
  SORT user.age DESC
  RETURN user

// Limit results
FOR user IN users
  LIMIT 10
  RETURN user

// Skip and limit (pagination)
FOR user IN users
  SORT user.username
  LIMIT 20, 10
  RETURN user
```

### Filtering

```aql
// Simple filter
FOR user IN users
  FILTER user.age >= 18 AND user.age <= 65
  RETURN user

// IN operator
FOR user IN users
  FILTER user.status IN ["active", "premium"]
  RETURN user

// LIKE operator
FOR user IN users
  FILTER user.username LIKE "john%"
  RETURN user

// Array contains
FOR user IN users
  FILTER "premium" IN user.tags
  RETURN user

// Null checks
FOR user IN users
  FILTER user.email != null
  RETURN user
```

### Joins

```aql
// Inner join
FOR user IN users
  FOR order IN orders
    FILTER order.userId == user._key
    RETURN {
      username: user.username,
      orderId: order._key,
      total: order.total
    }

// Left join
FOR user IN users
  LET userOrders = (
    FOR order IN orders
      FILTER order.userId == user._key
      RETURN order
  )
  RETURN {
    username: user.username,
    orders: userOrders
  }
```

### Aggregation

```aql
// Count
RETURN LENGTH(users)

// Count with filter
FOR user IN users
  FILTER user.active == true
  COLLECT WITH COUNT INTO count
  RETURN count

// Group by
FOR order IN orders
  COLLECT category = order.category
  INTO groups
  RETURN {
    category: category,
    count: LENGTH(groups)
  }

// Group with aggregation
FOR order IN orders
  COLLECT category = order.category
  AGGREGATE totalSales = SUM(order.total),
            avgOrder = AVG(order.total),
            maxOrder = MAX(order.total)
  RETURN {
    category,
    totalSales,
    avgOrder,
    maxOrder
  }
```

### Graph Traversal

```aql
// Traverse outbound (find who user follows)
FOR v IN 1..2 OUTBOUND 'users/alice' follows
  RETURN v

// Traverse inbound (find who follows user)
FOR v IN 1..1 INBOUND 'users/alice' follows
  RETURN v

// Any direction traversal
FOR v IN 1..3 ANY 'users/alice' follows
  RETURN v

// Traverse with filters
FOR v, e, p IN 1..2 OUTBOUND 'users/alice' follows
  FILTER e.since > "2024-01-01"
  RETURN {
    user: v.name,
    relationship: e,
    path: p
  }

// Shortest path
FOR v, e IN OUTBOUND SHORTEST_PATH 'users/alice' TO 'users/charlie' follows
  RETURN v.name

// K shortest paths
FOR path IN OUTBOUND K_SHORTEST_PATHS 'users/alice' TO 'users/charlie' follows
  LIMIT 3
  RETURN path
```

### Subqueries

```aql
// Subquery in LET
FOR user IN users
  LET orderCount = (
    FOR order IN orders
      FILTER order.userId == user._key
      RETURN 1
  )
  RETURN {
    username: user.username,
    totalOrders: LENGTH(orderCount)
  }

// Subquery in FILTER
FOR user IN users
  FILTER (
    FOR order IN orders
      FILTER order.userId == user._key AND order.status == "pending"
      LIMIT 1
      RETURN 1
  ) != []
  RETURN user
```

### Advanced Features

```aql
// COLLECT with multiple variables
FOR order IN orders
  COLLECT category = order.category, status = order.status
  INTO groups
  RETURN {
    category,
    status,
    count: LENGTH(groups)
  }

// COLLECT DISTINCT
FOR order IN orders
  COLLECT category = order.category
  RETURN category

// UPSERT (insert or update)
UPSERT { _key: "user123" }
  INSERT { _key: "user123", username: "johndoe", created: DATE_NOW() }
  UPDATE { lastSeen: DATE_NOW() }
  IN users

// REPLACE
FOR user IN users
  FILTER user.status == "inactive"
  REPLACE user WITH MERGE(user, { status: "archived" })
  IN users

// REMOVE with FILTER
FOR user IN users
  FILTER user.deletedAt != null AND user.deletedAt < DATE_SUBTRACT(DATE_NOW(), 30, "days")
  REMOVE user IN users
```

## Client Libraries

### Python (python-arango)

```python
from arango import ArangoClient

# Initialize client
client = ArangoClient(hosts='http://localhost:8529')

# Connect to system database
sys_db = client.db('_system', username='root', password='password')

# Create database
if not sys_db.has_database('ecommerce'):
    sys_db.create_database('ecommerce')

# Connect to database
db = client.db('ecommerce', username='root', password='password')

# Create collection
if not db.has_collection('users'):
    users = db.create_collection('users')
else:
    users = db.collection('users')

# Insert document
user = {
    '_key': 'user123',
    'username': 'johndoe',
    'email': 'john@example.com',
    'age': 30
}
users.insert(user)

# Get document
doc = users.get('user123')
print(doc)

# Update document
users.update({'_key': 'user123', 'age': 31})

# Replace document
users.replace({'_key': 'user123', 'username': 'johndoe', 'email': 'new@example.com'})

# AQL query
cursor = db.aql.execute(
    'FOR user IN users FILTER user.age > @age RETURN user',
    bind_vars={'age': 25}
)
for doc in cursor:
    print(doc)

# Delete document
users.delete('user123')

# Graph operations
if not db.has_graph('social'):
    graph = db.create_graph('social')
    graph.create_vertex_collection('users')
    graph.create_edge_definition(
        edge_collection='follows',
        from_vertex_collections=['users'],
        to_vertex_collections=['users']
    )
else:
    graph = db.graph('social')

# Add vertex
graph.vertex_collection('users').insert({
    '_key': 'alice',
    'name': 'Alice'
})

# Add edge
graph.edge_collection('follows').insert({
    '_from': 'users/alice',
    '_to': 'users/bob'
})

# Traverse graph
result = db.aql.execute('''
    FOR v IN 1..2 OUTBOUND 'users/alice' follows
    RETURN v.name
''')
```

### Node.js (arangojs)

```javascript
const { Database, aql } = require('arangojs');

async function main() {
  // Connect to database
  const db = new Database({
    url: 'http://localhost:8529',
    auth: { username: 'root', password: 'password' }
  });

  // Use database
  db.useDatabase('ecommerce');

  // Create collection
  const users = db.collection('users');
  if (!await users.exists()) {
    await users.create();
  }

  // Insert document
  await users.save({
    _key: 'user123',
    username: 'johndoe',
    email: 'john@example.com',
    age: 30
  });

  // Get document
  const doc = await users.document('user123');
  console.log(doc);

  // Update document
  await users.update('user123', { age: 31 });

  // Replace document
  await users.replace('user123', {
    username: 'johndoe',
    email: 'new@example.com'
  });

  // AQL query
  const cursor = await db.query(aql`
    FOR user IN ${users}
    FILTER user.age > 25
    RETURN user
  `);

  const result = await cursor.all();
  console.log(result);

  // Parameterized query
  const age = 25;
  const cursor2 = await db.query(aql`
    FOR user IN ${users}
    FILTER user.age > ${age}
    RETURN user
  `);

  // Delete document
  await users.remove('user123');

  // Graph operations
  const graph = db.graph('social');
  
  // Create graph if not exists
  if (!await graph.exists()) {
    await graph.create([
      {
        collection: 'follows',
        from: ['users'],
        to: ['users']
      }
    ]);
  }

  // Add vertex
  await graph.vertexCollection('users').save({
    _key: 'alice',
    name: 'Alice'
  });

  // Add edge
  await graph.edgeCollection('follows').save({
    _from: 'users/alice',
    _to: 'users/bob'
  });

  // Traverse
  const traversal = await db.query(aql`
    FOR v IN 1..2 OUTBOUND 'users/alice' follows
    RETURN v.name
  `);
}

main().catch(console.error);
```

### Java (arangodb-java-driver)

```java
import com.arangodb.*;
import com.arangodb.entity.*;
import com.arangodb.model.*;

public class ArangoDBExample {
    public static void main(String[] args) {
        // Connect to ArangoDB
        ArangoDB arangoDB = new ArangoDB.Builder()
            .host("localhost", 8529)
            .user("root")
            .password("password")
            .build();
        
        // Get/Create database
        ArangoDatabase db = arangoDB.db("ecommerce");
        if (!db.exists()) {
            db.create();
        }
        
        // Get/Create collection
        ArangoCollection users = db.collection("users");
        if (!users.exists()) {
            users.create();
        }
        
        // Insert document
        BaseDocument user = new BaseDocument();
        user.setKey("user123");
        user.addAttribute("username", "johndoe");
        user.addAttribute("email", "john@example.com");
        user.addAttribute("age", 30);
        
        users.insertDocument(user);
        
        // Get document
        BaseDocument result = users.getDocument("user123", BaseDocument.class);
        System.out.println(result);
        
        // Update document
        user.updateAttribute("age", 31);
        users.updateDocument("user123", user);
        
        // AQL query
        String query = "FOR user IN users FILTER user.age > @age RETURN user";
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("age", 25);
        
        ArangoCursor<BaseDocument> cursor = db.query(
            query,
            bindVars,
            null,
            BaseDocument.class
        );
        
        cursor.forEach(doc -> System.out.println(doc));
        
        // Delete document
        users.deleteDocument("user123");
        
        // Graph operations
        ArangoGraph graph = db.graph("social");
        
        if (!graph.exists()) {
            Collection<EdgeDefinition> edgeDefinitions = new ArrayList<>();
            EdgeDefinition edgeDef = new EdgeDefinition()
                .collection("follows")
                .from("users")
                .to("users");
            edgeDefinitions.add(edgeDef);
            
            graph.create(edgeDefinitions);
        }
        
        // Close connection
        arangoDB.shutdown();
    }
}
```

## Advanced Features

### Indexes

```javascript
// Hash index
db.users.ensureIndex({
  type: "hash",
  fields: ["email"],
  unique: true
});

// Skiplist index (for range queries)
db.users.ensureIndex({
  type: "skiplist",
  fields: ["age"]
});

// Persistent index (sorted, disk-based)
db.users.ensureIndex({
  type: "persistent",
  fields: ["username", "email"]
});

// Fulltext index
db.posts.ensureIndex({
  type: "fulltext",
  fields: ["content"],
  minLength: 3
});

// Geo index
db.locations.ensureIndex({
  type: "geo",
  fields: ["location"]
});

// TTL index (automatic document expiration)
db.sessions.ensureIndex({
  type: "ttl",
  fields: ["createdAt"],
  expireAfter: 3600
});

// List indexes
db.users.indexes();

// Drop index
db.users.dropIndex("idx_123456");
```

### Transactions

```javascript
// Single collection transaction
var trx = {
  collections: {
    write: ["accounts"]
  },
  action: function() {
    var db = require("@arangodb").db;
    var account1 = db.accounts.document("account1");
    var account2 = db.accounts.document("account2");
    
    db.accounts.update("account1", { balance: account1.balance - 100 });
    db.accounts.update("account2", { balance: account2.balance + 100 });
    
    return "Transfer complete";
  }
};

db._executeTransaction(trx);

// Multi-collection transaction
var trx2 = {
  collections: {
    write: ["users", "orders"],
    read: ["products"]
  },
  action: function(params) {
    var db = require("@arangodb").db;
    
    var user = db.users.document(params.userId);
    var product = db.products.document(params.productId);
    
    if (user.balance < product.price) {
      throw "Insufficient balance";
    }
    
    db.users.update(params.userId, { 
      balance: user.balance - product.price 
    });
    
    db.orders.save({
      userId: params.userId,
      productId: params.productId,
      price: product.price,
      timestamp: Date.now()
    });
    
    return "Order created";
  },
  params: {
    userId: "user123",
    productId: "prod456"
  }
};

db._executeTransaction(trx2);
```

### Foxx Microservices

```javascript
// manifest.json
{
  "name": "users-api",
  "version": "1.0.0",
  "main": "index.js"
}

// index.js
'use strict';
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();
const db = require('@arangodb').db;

// Get all users
router.get('/users', function (req, res) {
  const users = db._query(
    'FOR user IN users LIMIT 100 RETURN user'
  ).toArray();
  res.json(users);
});

// Create user
router.post('/users', function (req, res) {
  const user = req.body;
  const meta = db.users.save(user);
  res.json({ _key: meta._key });
});

// Get user by key
router.get('/users/:key', function (req, res) {
  const user = db.users.document(req.pathParams.key);
  res.json(user);
});

module.context.use(router);
```

### Analyzers (for full-text search)

```javascript
// Create text analyzer
var analyzers = require("@arangodb/analyzers");

analyzers.save("text_en", "text", {
  locale: "en.utf-8",
  stopwords: ["the", "a", "an"]
}, ["frequency", "norm", "position"]);

// Use analyzer in view
db._createView("products_view", "arangosearch", {
  links: {
    products: {
      fields: {
        name: { analyzers: ["text_en"] },
        description: { analyzers: ["text_en"] }
      }
    }
  }
});

// Search using view
db._query(`
  FOR doc IN products_view
  SEARCH ANALYZER(doc.name IN TOKENS("laptop computer", "text_en"), "text_en")
  RETURN doc
`);
```

## Performance Optimization

### Query Optimization

```aql
// Use indexes
FOR user IN users
  FILTER user.email == "john@example.com"  // Uses hash index on email
  RETURN user

// Avoid FILTER on unindexed fields
// Instead of:
FOR user IN users
  FILTER user.age > 25
  RETURN user

// Create index first:
db.users.ensureIndex({ type: "skiplist", fields: ["age"] });

// Use LIMIT early
FOR user IN users
  FILTER user.active == true
  LIMIT 10
  RETURN user

// Project only needed fields
FOR user IN users
  RETURN { username: user.username, email: user.email }
```

### Explain Queries

```aql
// Analyze query performance
db._explain(`
  FOR user IN users
  FILTER user.age > 25
  RETURN user
`);

// Profile query execution
db._profileQuery(`
  FOR user IN users
  FILTER user.age > 25
  RETURN user
`);
```

## Best Practices

### Data Modeling

1. **Choose appropriate model** - Use document for hierarchical data, graph for relationships
2. **Denormalize when needed** - Embed related data in documents
3. **Use edges for relationships** - Leverage graph capabilities
4. **Design for queries** - Structure data based on access patterns
5. **Use meaningful keys** - Makes debugging easier

### Performance

1. **Create appropriate indexes** - Based on query patterns
2. **Use persistent indexes** - For sorted queries
3. **Avoid full collection scans** - Use filters with indexes
4. **Batch operations** - Insert/update multiple documents at once
5. **Monitor query performance** - Use explain and profiler

### Operations

1. **Regular backups** - Use arangodump
2. **Monitor resources** - CPU, memory, disk usage
3. **Use clustering** - For high availability
4. **Version control Foxx services** - Track microservice changes
5. **Test queries** - Before production deployment

## Backup and Restore

```bash
# Backup database
arangodump \
  --server.endpoint tcp://localhost:8529 \
  --server.username root \
  --server.password password \
  --server.database ecommerce \
  --output-directory "/backup/ecommerce-$(date +%Y%m%d)"

# Restore database
arangorestore \
  --server.endpoint tcp://localhost:8529 \
  --server.username root \
  --server.password password \
  --server.database ecommerce \
  --input-directory "/backup/ecommerce-20240117"

# Backup with compression
arangodump \
  --server.endpoint tcp://localhost:8529 \
  --server.database ecommerce \
  --output-directory "/backup" \
  --compress-output true

# Backup specific collections
arangodump \
  --server.database ecommerce \
  --collection users \
  --collection orders \
  --output-directory "/backup/collections"
```

## Monitoring

### Web Interface

Access at `http://localhost:8529` for:
- Dashboard
- Query editor
- Graph viewer
- Collection browser
- Cluster status

### CLI Commands

```bash
# Server statistics
arangosh --server.endpoint tcp://localhost:8529 \
  --server.username root \
  --javascript.execute-string "db._engineStats()"

# Collection statistics
arangosh --server.database ecommerce \
  --javascript.execute-string "db.users.figures()"
```

## Resources

### Official Documentation

- [ArangoDB Documentation](https://www.arangodb.com/docs/)
- [AQL Tutorial](https://www.arangodb.com/docs/stable/aql/)
- [HTTP API](https://www.arangodb.com/docs/stable/http/)

### Tools

- [arangosh](https://www.arangodb.com/docs/stable/programs-arangosh.html) - ArangoDB shell
- [arangodump/arangorestore](https://www.arangodb.com/docs/stable/programs-arangodump.html) - Backup tools
- [ArangoDB Web Interface](http://localhost:8529) - Management UI

### Learning Resources

- [ArangoDB University](https://www.arangodb.com/arangodb-training-center/) - Free courses
- [Tutorials](https://www.arangodb.com/tutorials/)
- [Blog](https://www.arangodb.com/category/blog/)
- [YouTube Channel](https://www.youtube.com/c/ArangoDB)

### Community

- [GitHub Repository](https://github.com/arangodb/arangodb)
- [Community Slack](https://arangodb-community.slack.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/arangodb)
- [Community Forum](https://community.arangodb.com/)

---

**Related Technologies**: [Neo4j](../Neo4j/), [MongoDB](../MongoDB/), [OrientDB](../), [JanusGraph](../)
