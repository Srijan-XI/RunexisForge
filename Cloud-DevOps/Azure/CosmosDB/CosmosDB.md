# Azure Cosmos DB

## Introduction

Azure Cosmos DB is a fully managed, globally distributed, multi-model database service designed for building highly responsive and highly available applications at planetary scale. It provides turnkey global distribution, elastic scaling of throughput and storage, single-digit millisecond latencies, and comprehensive SLAs covering throughput, latency, availability, and consistency.

### Key Features

- **Global Distribution**: Turnkey multi-region replication across 50+ Azure regions
- **Multi-Model**: Support for document, key-value, graph, column-family, and table data
- **Multiple APIs**: SQL, MongoDB, Cassandra, Gremlin, Table
- **Elastic Scalability**: Independently scale throughput and storage
- **Low Latency**: Single-digit millisecond read/write latency at P99
- **Five Consistency Levels**: Strong, bounded staleness, session, consistent prefix, eventual
- **Comprehensive SLAs**: 99.999% availability for multi-region accounts
- **Automatic Indexing**: All data automatically indexed
- **Change Feed**: Real-time event processing
- **Serverless Option**: Pay-per-request pricing model

### Common Use Cases

- **Web and Mobile Apps**: Session store, user profiles, catalogs
- **Gaming**: Leaderboards, player profiles, game state
- **IoT and Telemetry**: Time-series data, device management
- **Retail and E-commerce**: Product catalogs, shopping carts, inventory
- **Personalization**: Recommendation engines, user preferences
- **Global Applications**: Multi-region write applications
- **Real-time Analytics**: Change feed processing, dashboards
- **Content Management**: Document storage, metadata

## Getting Started

### Prerequisites

```bash
# Install Azure CLI
# Windows
winget install Microsoft.AzureCLI

# macOS
brew install azure-cli

# Login to Azure
az login

# Install Azure Cosmos DB Emulator (for local development)
# Download from: https://aka.ms/cosmosdb-emulator
```

### Create Cosmos DB Account

```bash
# Create resource group
az group create \
  --name myResourceGroup \
  --location eastus

# Create Cosmos DB account (SQL API)
az cosmosdb create \
  --name mycosmosaccount \
  --resource-group myResourceGroup \
  --locations regionName=eastus failoverPriority=0 isZoneRedundant=False \
  --default-consistency-level Session \
  --enable-automatic-failover true

# Create with multiple regions
az cosmosdb create \
  --name mycosmosaccount-global \
  --resource-group myResourceGroup \
  --locations regionName=eastus failoverPriority=0 isZoneRedundant=False \
  --locations regionName=westus failoverPriority=1 isZoneRedundant=False \
  --locations regionName=westeurope failoverPriority=2 isZoneRedundant=False \
  --enable-multiple-write-locations true

# Create database
az cosmosdb sql database create \
  --account-name mycosmosaccount \
  --resource-group myResourceGroup \
  --name myDatabase

# Create container with partition key
az cosmosdb sql container create \
  --account-name mycosmosaccount \
  --resource-group myResourceGroup \
  --database-name myDatabase \
  --name myContainer \
  --partition-key-path "/userId" \
  --throughput 400

# Get connection string
az cosmosdb keys list \
  --name mycosmosaccount \
  --resource-group myResourceGroup \
  --type connection-strings
```

## SQL API (Core API)

### Node.js SDK

```javascript
// npm install @azure/cosmos

const { CosmosClient } = require("@azure/cosmos");

// Initialize client
const endpoint = "https://mycosmosaccount.documents.azure.com:443/";
const key = "your-primary-key";
const client = new CosmosClient({ endpoint, key });

// Database and container references
const database = client.database("myDatabase");
const container = database.container("myContainer");

// Create item
async function createItem() {
    const newItem = {
        id: "1",
        userId: "user123",
        name: "John Doe",
        email: "john@example.com",
        address: {
            street: "123 Main St",
            city: "Seattle",
            zipCode: "98101"
        },
        orders: [
            { orderId: "order1", total: 99.99 },
            { orderId: "order2", total: 149.99 }
        ],
        timestamp: new Date().toISOString()
    };

    const { resource } = await container.items.create(newItem);
    console.log("Created item:", resource);
}

// Read item
async function readItem(id, partitionKey) {
    const { resource } = await container.item(id, partitionKey).read();
    console.log("Read item:", resource);
    return resource;
}

// Query items
async function queryItems() {
    const querySpec = {
        query: "SELECT * FROM c WHERE c.userId = @userId AND c.timestamp > @timestamp",
        parameters: [
            { name: "@userId", value: "user123" },
            { name: "@timestamp", value: "2026-01-01T00:00:00Z" }
        ]
    };

    const { resources } = await container.items.query(querySpec).fetchAll();
    console.log("Query results:", resources);
    return resources;
}

// Update item
async function updateItem(id, partitionKey) {
    const { resource: item } = await container.item(id, partitionKey).read();
    item.email = "newemail@example.com";
    item.lastModified = new Date().toISOString();
    
    const { resource: updated } = await container.item(id, partitionKey).replace(item);
    console.log("Updated item:", updated);
}

// Patch item (partial update)
async function patchItem(id, partitionKey) {
    const operations = [
        { op: "add", path: "/premium", value: true },
        { op: "replace", path: "/email", value: "updated@example.com" },
        { op: "remove", path: "/address/street" }
    ];

    const { resource } = await container.item(id, partitionKey).patch(operations);
    console.log("Patched item:", resource);
}

// Delete item
async function deleteItem(id, partitionKey) {
    await container.item(id, partitionKey).delete();
    console.log("Deleted item");
}

// Bulk operations
async function bulkOperations() {
    const operations = [
        {
            operationType: "Create",
            resourceBody: { id: "2", userId: "user456", name: "Jane Smith" }
        },
        {
            operationType: "Upsert",
            resourceBody: { id: "3", userId: "user789", name: "Bob Johnson" }
        },
        {
            operationType: "Delete",
            id: "1",
            partitionKey: "user123"
        }
    ];

    const response = await container.items.bulk(operations);
    console.log("Bulk operation results:", response);
}
```

### Python SDK

```python
# pip install azure-cosmos

from azure.cosmos import CosmosClient, PartitionKey, exceptions
import os

# Initialize client
endpoint = "https://mycosmosaccount.documents.azure.com:443/"
key = "your-primary-key"
client = CosmosClient(endpoint, key)

# Get database and container
database = client.get_database_client("myDatabase")
container = database.get_container_client("myContainer")

# Create item
def create_item():
    item = {
        "id": "1",
        "userId": "user123",
        "name": "John Doe",
        "email": "john@example.com",
        "address": {
            "street": "123 Main St",
            "city": "Seattle",
            "zipCode": "98101"
        },
        "orders": [
            {"orderId": "order1", "total": 99.99},
            {"orderId": "order2", "total": 149.99}
        ]
    }
    
    created_item = container.create_item(body=item)
    print(f"Created item: {created_item}")
    return created_item

# Read item
def read_item(item_id, partition_key):
    item = container.read_item(item=item_id, partition_key=partition_key)
    print(f"Read item: {item}")
    return item

# Query items
def query_items():
    query = "SELECT * FROM c WHERE c.userId = @userId"
    parameters = [{"name": "@userId", "value": "user123"}]
    
    items = list(container.query_items(
        query=query,
        parameters=parameters,
        enable_cross_partition_query=False
    ))
    
    print(f"Query results: {items}")
    return items

# Update item
def update_item(item_id, partition_key):
    item = container.read_item(item=item_id, partition_key=partition_key)
    item["email"] = "newemail@example.com"
    
    updated_item = container.replace_item(item=item_id, body=item)
    print(f"Updated item: {updated_item}")
    return updated_item

# Upsert item
def upsert_item():
    item = {
        "id": "2",
        "userId": "user456",
        "name": "Jane Smith",
        "email": "jane@example.com"
    }
    
    upserted_item = container.upsert_item(body=item)
    print(f"Upserted item: {upserted_item}")
    return upserted_item

# Delete item
def delete_item(item_id, partition_key):
    container.delete_item(item=item_id, partition_key=partition_key)
    print("Deleted item")

# Batch operations
def batch_operations():
    batch_operations = [
        ("create", ({"id": "3", "userId": "user789", "name": "Bob"},)),
        ("upsert", ({"id": "4", "userId": "user101", "name": "Alice"},)),
        ("delete", ("1", "user123"))
    ]
    
    # Note: Transactional batch requires all items in same partition
    # Use bulk executor for cross-partition operations
```

### Java SDK

```java
// Maven dependency
// <dependency>
//   <groupId>com.azure</groupId>
//   <artifactId>azure-cosmos</artifactId>
//   <version>4.50.0</version>
// </dependency>

import com.azure.cosmos.*;
import com.azure.cosmos.models.*;

public class CosmosDBExample {
    private static final String ENDPOINT = "https://mycosmosaccount.documents.azure.com:443/";
    private static final String KEY = "your-primary-key";
    
    public static void main(String[] args) {
        // Create client
        CosmosClient client = new CosmosClientBuilder()
            .endpoint(ENDPOINT)
            .key(KEY)
            .consistencyLevel(ConsistencyLevel.SESSION)
            .buildClient();
        
        CosmosDatabase database = client.getDatabase("myDatabase");
        CosmosContainer container = database.getContainer("myContainer");
        
        // Create item
        User user = new User("1", "user123", "John Doe", "john@example.com");
        CosmosItemResponse<User> response = container.createItem(user);
        System.out.println("Created item: " + response.getItem());
        
        // Read item
        CosmosItemResponse<User> readResponse = container.readItem(
            "1",
            new PartitionKey("user123"),
            User.class
        );
        System.out.println("Read item: " + readResponse.getItem());
        
        // Query items
        String query = "SELECT * FROM c WHERE c.userId = @userId";
        CosmosQueryRequestOptions options = new CosmosQueryRequestOptions();
        options.setPartitionKey(new PartitionKey("user123"));
        
        CosmosPagedIterable<User> results = container.queryItems(
            query,
            options,
            User.class
        );
        
        results.forEach(item -> System.out.println("Query result: " + item));
        
        // Update item
        user.setEmail("newemail@example.com");
        container.replaceItem(user, "1", new PartitionKey("user123"), new CosmosItemRequestOptions());
        
        // Delete item
        container.deleteItem("1", new PartitionKey("user123"), new CosmosItemRequestOptions());
        
        client.close();
    }
}

class User {
    private String id;
    private String userId;
    private String name;
    private String email;
    
    public User(String id, String userId, String name, String email) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
    
    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

## MongoDB API

### Create MongoDB Account

```bash
# Create Cosmos DB account with MongoDB API
az cosmosdb create \
  --name mycosmosaccount-mongo \
  --resource-group myResourceGroup \
  --kind MongoDB \
  --server-version 4.2 \
  --default-consistency-level Session

# Get connection string
az cosmosdb keys list \
  --name mycosmosaccount-mongo \
  --resource-group myResourceGroup \
  --type connection-strings \
  --query "connectionStrings[0].connectionString" -o tsv
```

### Node.js with MongoDB Driver

```javascript
// npm install mongodb

const { MongoClient } = require("mongodb");

const connectionString = "mongodb://mycosmosaccount-mongo:key@mycosmosaccount-mongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mycosmosaccount-mongo@";

async function main() {
    const client = new MongoClient(connectionString);
    
    try {
        await client.connect();
        const db = client.db("myDatabase");
        const collection = db.collection("users");
        
        // Insert document
        const insertResult = await collection.insertOne({
            userId: "user123",
            name: "John Doe",
            email: "john@example.com",
            address: {
                city: "Seattle",
                zipCode: "98101"
            }
        });
        console.log("Inserted document:", insertResult.insertedId);
        
        // Find documents
        const findResult = await collection.find({ userId: "user123" }).toArray();
        console.log("Found documents:", findResult);
        
        // Update document
        const updateResult = await collection.updateOne(
            { userId: "user123" },
            { $set: { email: "newemail@example.com" } }
        );
        console.log("Updated documents:", updateResult.modifiedCount);
        
        // Aggregation
        const pipeline = [
            { $match: { "address.city": "Seattle" } },
            { $group: { _id: "$address.city", count: { $sum: 1 } } }
        ];
        const aggResult = await collection.aggregate(pipeline).toArray();
        console.log("Aggregation result:", aggResult);
        
        // Delete document
        const deleteResult = await collection.deleteOne({ userId: "user123" });
        console.log("Deleted documents:", deleteResult.deletedCount);
        
    } finally {
        await client.close();
    }
}

main().catch(console.error);
```

### Python with PyMongo

```python
# pip install pymongo

from pymongo import MongoClient
import os

connection_string = "mongodb://mycosmosaccount-mongo:key@mycosmosaccount-mongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false"

client = MongoClient(connection_string)
db = client["myDatabase"]
collection = db["users"]

# Insert document
result = collection.insert_one({
    "userId": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
        "city": "Seattle",
        "zipCode": "98101"
    }
})
print(f"Inserted document: {result.inserted_id}")

# Find documents
users = collection.find({"userId": "user123"})
for user in users:
    print(f"Found user: {user}")

# Update document
result = collection.update_one(
    {"userId": "user123"},
    {"$set": {"email": "newemail@example.com"}}
)
print(f"Modified count: {result.modified_count}")

# Delete document
result = collection.delete_one({"userId": "user123"})
print(f"Deleted count: {result.deleted_count}")

client.close()
```

## Cassandra API

### Create Cassandra Account

```bash
# Create Cosmos DB account with Cassandra API
az cosmosdb create \
  --name mycosmosaccount-cassandra \
  --resource-group myResourceGroup \
  --capabilities EnableCassandra \
  --default-consistency-level Session

# Create keyspace
az cosmosdb cassandra keyspace create \
  --account-name mycosmosaccount-cassandra \
  --resource-group myResourceGroup \
  --name mykeyspace

# Create table
az cosmosdb cassandra table create \
  --account-name mycosmosaccount-cassandra \
  --resource-group myResourceGroup \
  --keyspace-name mykeyspace \
  --name users \
  --schema "columns=[{name:user_id,type:text},{name:name,type:text},{name:email,type:text}]" \
  --partition-key-path user_id
```

### Python with Cassandra Driver

```python
# pip install cassandra-driver

from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider

# Connection
auth_provider = PlainTextAuthProvider(
    username='mycosmosaccount-cassandra',
    password='your-primary-key'
)

cluster = Cluster(
    contact_points=['mycosmosaccount-cassandra.cassandra.cosmos.azure.com'],
    port=10350,
    auth_provider=auth_provider,
    ssl_options={'ssl_version': 2}
)

session = cluster.connect('mykeyspace')

# Create table
session.execute("""
    CREATE TABLE IF NOT EXISTS users (
        user_id text PRIMARY KEY,
        name text,
        email text,
        created_at timestamp
    )
""")

# Insert data
session.execute("""
    INSERT INTO users (user_id, name, email, created_at)
    VALUES (%s, %s, %s, toTimestamp(now()))
""", ('user123', 'John Doe', 'john@example.com'))

# Query data
rows = session.execute("SELECT * FROM users WHERE user_id = %s", ('user123',))
for row in rows:
    print(f"User: {row.name}, Email: {row.email}")

# Update data
session.execute("""
    UPDATE users SET email = %s WHERE user_id = %s
""", ('newemail@example.com', 'user123'))

# Delete data
session.execute("DELETE FROM users WHERE user_id = %s", ('user123',))

cluster.shutdown()
```

## Gremlin API (Graph)

### Create Gremlin Account

```bash
# Create Cosmos DB account with Gremlin API
az cosmosdb create \
  --name mycosmosaccount-gremlin \
  --resource-group myResourceGroup \
  --capabilities EnableGremlin

# Create database
az cosmosdb gremlin database create \
  --account-name mycosmosaccount-gremlin \
  --resource-group myResourceGroup \
  --name socialgraph

# Create graph
az cosmosdb gremlin graph create \
  --account-name mycosmosaccount-gremlin \
  --resource-group myResourceGroup \
  --database-name socialgraph \
  --name people \
  --partition-key-path "/country" \
  --throughput 400
```

### Python with Gremlin

```python
# pip install gremlinpython

from gremlin_python.driver import client, serializer

# Connection
gremlin_client = client.Client(
    'wss://mycosmosaccount-gremlin.gremlin.cosmos.azure.com:443/',
    'g',
    username="/dbs/socialgraph/colls/people",
    password="your-primary-key",
    message_serializer=serializer.GraphSONSerializersV2d0()
)

# Add vertices
callback = gremlin_client.submitAsync(
    "g.addV('person').property('id', 'john').property('name', 'John Doe').property('country', 'USA')"
)
result = callback.result()

callback = gremlin_client.submitAsync(
    "g.addV('person').property('id', 'jane').property('name', 'Jane Smith').property('country', 'USA')"
)
result = callback.result()

# Add edge
callback = gremlin_client.submitAsync(
    "g.V('john').addE('knows').to(g.V('jane'))"
)
result = callback.result()

# Query graph
callback = gremlin_client.submitAsync(
    "g.V('john').out('knows').values('name')"
)
results = callback.result()
for result in results:
    print(f"John knows: {result}")

# Traversal queries
callback = gremlin_client.submitAsync(
    "g.V().hasLabel('person').has('country', 'USA').count()"
)
count = callback.result()
print(f"People in USA: {count}")

gremlin_client.close()
```

## Consistency Levels

```javascript
// Set consistency level per request
const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({
    endpoint: "https://mycosmosaccount.documents.azure.com:443/",
    key: "your-primary-key"
});

const database = client.database("myDatabase");
const container = database.container("myContainer");

// Strong consistency
const { resource: strongRead } = await container.item("1", "user123").read({
    consistencyLevel: "Strong"
});

// Session consistency (default)
const { resource: sessionRead } = await container.item("1", "user123").read({
    consistencyLevel: "Session"
});

// Eventual consistency
const { resource: eventualRead } = await container.item("1", "user123").read({
    consistencyLevel: "Eventual"
});

// Bounded staleness
const { resource: boundedRead } = await container.item("1", "user123").read({
    consistencyLevel: "BoundedStaleness"
});

// Consistent prefix
const { resource: prefixRead } = await container.item("1", "user123").read({
    consistencyLevel: "ConsistentPrefix"
});
```

## Change Feed

### Process Change Feed

```javascript
const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({ endpoint, key });
const database = client.database("myDatabase");
const container = database.container("myContainer");
const leaseContainer = database.container("leases");

async function processChangeFeed() {
    const changeFeedIterator = container.items.getChangeFeedIterator({
        startFromBeginning: true
    });

    while (changeFeedIterator.hasMoreResults) {
        const response = await changeFeedIterator.readNext();
        
        if (response.statusCode === 304) {
            // No changes
            await new Promise(resolve => setTimeout(resolve, 5000));
            continue;
        }

        for (const item of response.result) {
            console.log("Changed item:", item);
            
            // Process change
            await processItem(item);
        }
    }
}

async function processItem(item) {
    // Your processing logic
    console.log(`Processing item: ${item.id}`);
}

// Using Change Feed Processor
const { ChangeFeedProcessor } = require("@azure/cosmos");

const processor = new ChangeFeedProcessor({
    hostName: "myHost",
    container: container,
    leaseContainer: leaseContainer,
    onRead: async (context, items) => {
        for (const item of items) {
            console.log("Change detected:", item);
            await processItem(item);
        }
    },
    onError: async (error) => {
        console.error("Error processing changes:", error);
    }
});

await processor.start();
```

## Throughput & Scaling

### Provisioned Throughput

```bash
# Create container with autoscale
az cosmosdb sql container create \
  --account-name mycosmosaccount \
  --resource-group myResourceGroup \
  --database-name myDatabase \
  --name myContainer \
  --partition-key-path "/userId" \
  --max-throughput 4000

# Update throughput
az cosmosdb sql container throughput update \
  --account-name mycosmosaccount \
  --resource-group myResourceGroup \
  --database-name myDatabase \
  --name myContainer \
  --throughput 1000

# Enable autoscale
az cosmosdb sql container throughput migrate \
  --account-name mycosmosaccount \
  --resource-group myResourceGroup \
  --database-name myDatabase \
  --name myContainer \
  --throughput-type autoscale
```

### Serverless

```bash
# Create serverless account
az cosmosdb create \
  --name mycosmosaccount-serverless \
  --resource-group myResourceGroup \
  --capabilities EnableServerless \
  --locations regionName=eastus
```

## Monitoring & Diagnostics

### Application Insights Integration

```javascript
const { CosmosClient } = require("@azure/cosmos");
const appInsights = require("applicationinsights");

appInsights.setup("instrumentation-key").start();
const telemetryClient = appInsights.defaultClient;

const client = new CosmosClient({ endpoint, key });
const container = client.database("myDatabase").container("myContainer");

async function monitoredOperation() {
    const startTime = Date.now();
    
    try {
        const { resource, requestCharge } = await container.items.create({
            id: "1",
            userId: "user123",
            name: "John Doe"
        });
        
        // Track RU consumption
        telemetryClient.trackMetric({
            name: "CosmosDB_RequestUnits",
            value: requestCharge
        });
        
        // Track latency
        telemetryClient.trackMetric({
            name: "CosmosDB_Latency",
            value: Date.now() - startTime
        });
        
        return resource;
    } catch (error) {
        telemetryClient.trackException({ exception: error });
        throw error;
    }
}
```

## Best Practices

### Partition Key Design

1. **High Cardinality**: Choose a partition key with many unique values
2. **Even Distribution**: Ensure even distribution of data and requests
3. **Query Patterns**: Align partition key with common query patterns
4. **Avoid Hot Partitions**: Don't use timestamp or sequential IDs
5. **Synthetic Keys**: Combine multiple properties if needed

### Performance Optimization

1. **Index Tuning**: Customize indexing policy for your workload
2. **Query Optimization**: Use partition key in queries
3. **Connection Pooling**: Reuse client instances
4. **Bulk Operations**: Use bulk APIs for batch operations
5. **Direct Mode**: Use direct connectivity mode for lowest latency

### Cost Optimization

1. **Right-size Throughput**: Monitor and adjust RU/s based on usage
2. **Use Autoscale**: Let Cosmos DB scale automatically
3. **Serverless for Variable**: Use serverless for unpredictable workloads
4. **Optimize Queries**: Reduce RU consumption per query
5. **TTL for Cleanup**: Automatically delete old data

### Security

1. **Managed Identity**: Use for Azure service authentication
2. **Key Vault**: Store connection strings securely
3. **Private Endpoints**: Use for network isolation
4. **RBAC**: Implement role-based access control
5. **Encryption**: Data encrypted at rest and in transit

## Pricing

### Provisioned Throughput
- **Standard**: $0.008 per 100 RU/s per hour
- **Autoscale**: $0.012 per 100 RU/s per hour (max)
- **Storage**: $0.25 per GB per month
- **Multi-region**: Additional cost per region

### Serverless
- **Request Units**: $0.25 per million RUs
- **Storage**: $0.25 per GB per month
- Best for: Variable, unpredictable workloads

### Free Tier
- **1000 RU/s** provisioned throughput
- **25 GB** storage
- First 400 RU/s and 5 GB always free

## Troubleshooting

```bash
# Check account status
az cosmosdb show \
  --name mycosmosaccount \
  --resource-group myResourceGroup

# List connection strings
az cosmosdb keys list \
  --name mycosmosaccount \
  --resource-group myResourceGroup \
  --type connection-strings

# Monitor metrics
az monitor metrics list \
  --resource "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.DocumentDB/databaseAccounts/mycosmosaccount" \
  --metric "TotalRequests" \
  --start-time 2026-01-17T00:00:00Z \
  --end-time 2026-01-17T23:59:59Z

# Enable diagnostic logs
az monitor diagnostic-settings create \
  --name myDiagnostics \
  --resource mycosmosaccount \
  --resource-group myResourceGroup \
  --resource-type "Microsoft.DocumentDB/databaseAccounts" \
  --logs '[{"category":"DataPlaneRequests","enabled":true}]' \
  --workspace myLogAnalyticsWorkspace
```

## Resources

### Official Documentation
- [Azure Cosmos DB Documentation](https://docs.microsoft.com/azure/cosmos-db/)
- [SQL API](https://docs.microsoft.com/azure/cosmos-db/sql/)
- [MongoDB API](https://docs.microsoft.com/azure/cosmos-db/mongodb/)
- [Cassandra API](https://docs.microsoft.com/azure/cosmos-db/cassandra/)
- [Gremlin API](https://docs.microsoft.com/azure/cosmos-db/gremlin/)
- [Best Practices](https://docs.microsoft.com/azure/cosmos-db/best-practices)

### SDKs
- [.NET SDK](https://github.com/Azure/azure-cosmos-dotnet-v3)
- [Java SDK](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/cosmos)
- [Node.js SDK](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cosmosdb)
- [Python SDK](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/cosmos)

### Tools
- [Azure Portal](https://portal.azure.com/)
- [Cosmos DB Emulator](https://docs.microsoft.com/azure/cosmos-db/local-emulator)
- [Data Explorer](https://cosmos.azure.com/)
- [Capacity Calculator](https://cosmos.azure.com/capacitycalculator/)

### Community
- [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-cosmos-db.html)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/azure-cosmosdb)
- [GitHub](https://github.com/Azure/azure-cosmos-db)

### Learning Resources
- [Cosmos DB Learning Path](https://docs.microsoft.com/learn/paths/work-with-nosql-data-in-azure-cosmos-db/)
- [Architecture Patterns](https://docs.microsoft.com/azure/architecture/browse/?products=azure-cosmos-db)
- [Code Samples](https://github.com/Azure-Samples?q=cosmos)

---

**Related Technologies**: [MongoDB](../../SQL&DB'S/MongoDB/), [Cassandra](../../SQL&DB'S/Cassandra/), [Azure Functions](../Functions/), [Event Hubs](../EventHubs/), [Azure App Service](../AppService/)
