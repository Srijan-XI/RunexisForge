# Amazon DynamoDB - Serverless NoSQL Database

## 🚀 What is DynamoDB?

**Amazon DynamoDB** is a fully managed, serverless NoSQL database service provided by AWS that delivers single-digit millisecond performance at any scale. It's designed for applications that need consistent, low-latency data access at any scale.

**Key Features:**
- **Fully Managed**: No servers to provision, patch, or manage
- **Serverless**: Pay only for what you use
- **Automatic Scaling**: Handles trillions of requests per day
- **High Performance**: Single-digit millisecond latency
- **Built-in Security**: Encryption at rest and in transit
- **Global Tables**: Multi-region, active-active replication
- **Point-in-Time Recovery**: Restore data to any point in the last 35 days
- **DynamoDB Streams**: Capture table activity for real-time processing
- **ACID Transactions**: Support for complex business logic
- **Integration**: Seamless integration with AWS services (Lambda, S3, etc.)

---

## ✅ Advantages of DynamoDB

| Advantage | Description |
|-----------|-------------|
| **Fully Managed** | No database administration, patching, or hardware provisioning |
| **Automatic Scaling** | Scales up and down based on traffic automatically |
| **High Performance** | Consistent single-digit millisecond latency at any scale |
| **Serverless** | No capacity planning, pay-per-request pricing available |
| **High Availability** | 99.99% SLA with multi-AZ replication |
| **Global Tables** | Multi-region replication for global applications |
| **Built-in Security** | IAM integration, encryption, VPC endpoints |
| **DynamoDB Streams** | Real-time change data capture for event-driven architectures |
| **Backup and Restore** | On-demand and continuous backups with point-in-time recovery |
| **Flexible Schema** | No fixed schema, supports varied data structures |

---

## ❌ Disadvantages of DynamoDB

| Disadvantage | Description |
|-------------|-------------|
| **AWS Lock-in** | Proprietary service tied to AWS ecosystem |
| **Limited Queries** | No joins, limited aggregation, requires careful data modeling |
| **Query Costs** | Scanning large tables can be expensive |
| **Learning Curve** | Different from traditional databases, requires NoSQL expertise |
| **Item Size Limit** | Maximum item size is 400 KB |
| **Local Development** | DynamoDB Local has limitations compared to production |
| **Complex Pricing** | Multiple pricing factors (read/write units, storage, backups) |
| **No Built-in Analytics** | Requires integration with other AWS services for complex analytics |
| **Attribute Limits** | Maximum of 100 attributes per Global Secondary Index |
| **Transaction Limits** | Transactions limited to 100 items or 4 MB |

---

## 🎯 When to Use DynamoDB

### Ideal Use Cases

1. **Serverless Applications**
   - AWS Lambda functions
   - API Gateway backends
   - Event-driven architectures

2. **Mobile and Web Applications**
   - User profiles and preferences
   - Session management
   - Gaming leaderboards
   - Shopping carts

3. **IoT Applications**
   - Device telemetry data
   - Time-series data
   - Sensor data ingestion

4. **Real-Time Applications**
   - Real-time bidding platforms
   - Live dashboards
   - Messaging systems
   - Recommendation engines

5. **High-Traffic Applications**
   - Ad tech platforms
   - E-commerce catalogs
   - Content management systems
   - Social media feeds

6. **Gaming**
   - Player profiles and game state
   - Leaderboards
   - In-game item stores
   - Matchmaking systems

---

## 📊 DynamoDB vs Other Databases

| Feature | DynamoDB | MongoDB | Cassandra | MySQL |
|---------|----------|---------|-----------|-------|
| **Type** | NoSQL Key-Value/Document | NoSQL Document | NoSQL Wide-Column | Relational SQL |
| **Management** | Fully Managed (AWS) | Self-managed or Atlas | Self-managed | Self-managed or RDS |
| **Scaling** | Automatic | Manual/Auto (Atlas) | Manual | Manual/Auto (RDS) |
| **Query Language** | PartiQL, API | MongoDB Query Language | CQL (Cassandra Query Language) | SQL |
| **Transactions** | Yes (ACID) | Yes (ACID) | Limited | Yes (ACID) |
| **Schema** | Flexible | Flexible | Flexible | Fixed |
| **Global Distribution** | Yes (Global Tables) | Yes (Atlas) | Yes (multi-datacenter) | Limited |
| **Performance** | Sub-10ms | Fast | Fast | Moderate |
| **Cost** | Pay-per-use | Infrastructure + License | Infrastructure | Infrastructure |
| **AWS Integration** | Native | Third-party | Third-party | Third-party |

---

## 🏢 Companies Using DynamoDB

- **Amazon**: E-commerce, Prime Video, Alexa
- **Netflix**: Content metadata, viewing history
- **Lyft**: Ride history, driver data
- **Airbnb**: Booking data, user profiles
- **Duolingo**: User progress, lesson data
- **Redfin**: Real estate listings
- **Samsung**: SmartThings IoT platform
- **Snap Inc.**: User data, stories metadata

---

## 🔑 DynamoDB Core Concepts

### 1. Tables
- Collection of data
- No fixed schema
- Identified by partition key (and optional sort key)

### 2. Items
- Individual records in a table (like rows)
- Maximum size: 400 KB
- Uniquely identified by primary key

### 3. Attributes
- Data fields (like columns)
- Flexible, not all items need same attributes
- Support various data types (string, number, binary, list, map, set)

### 4. Primary Key

**Partition Key (Simple Primary Key):**
```
Table: Users
Partition Key: UserID
```

**Composite Primary Key (Partition + Sort Key):**
```
Table: Orders
Partition Key: CustomerID
Sort Key: OrderDate
```

### 5. Secondary Indexes

**Global Secondary Index (GSI):**
- Different partition and sort key than base table
- Query data using alternate key
- Allows queries across partitions

**Local Secondary Index (LSI):**
- Same partition key as base table
- Different sort key
- Must be created at table creation time

### 6. Capacity Modes

**Provisioned Mode:**
- Specify read/write capacity units
- Predictable traffic
- Lower cost for steady workloads
- Auto-scaling available

**On-Demand Mode:**
- Pay-per-request pricing
- Unpredictable traffic
- Instant scaling
- No capacity planning

---

## 📈 Data Modeling Example

### User Profile Table

**Single-Table Design Pattern:**

```
Table: AppData

PK (Partition Key) | SK (Sort Key)      | Attributes
-------------------|--------------------|-----------
USER#12345        | PROFILE#12345      | name, email, age
USER#12345        | ORDER#001          | orderDate, total, items
USER#12345        | ORDER#002          | orderDate, total, items
USER#67890        | PROFILE#67890      | name, email, age
PRODUCT#ABC       | METADATA           | name, price, stock
PRODUCT#ABC       | REVIEW#001         | rating, comment, date
```

**Benefits of Single-Table Design:**
- Retrieve related data in single query
- Reduce number of requests
- Lower cost
- Better performance

---

## 🔄 DynamoDB Operations

### Basic Operations

1. **PutItem**: Create or replace an item
2. **GetItem**: Retrieve a single item by primary key
3. **UpdateItem**: Modify attributes of an existing item
4. **DeleteItem**: Remove an item from the table
5. **Query**: Retrieve items using partition key (and optional sort key condition)
6. **Scan**: Read all items in a table (expensive!)
7. **BatchGetItem**: Retrieve multiple items (up to 100)
8. **BatchWriteItem**: Create or delete multiple items (up to 25)

### Advanced Operations

1. **TransactWriteItems**: Atomic write operations across multiple items
2. **TransactGetItems**: Atomic read operations across multiple items
3. **ConditionExpression**: Conditional updates/deletes
4. **UpdateExpression**: Specify which attributes to update

---

## 🔮 When NOT to Use DynamoDB

1. **Complex Queries and Joins**
   - Use PostgreSQL or MySQL for complex SQL queries

2. **Ad-Hoc Reporting**
   - Use data warehouses (Redshift, BigQuery)

3. **Large Items (> 400 KB)**
   - Store large objects in S3, reference in DynamoDB

4. **Full-Text Search**
   - Use Elasticsearch or CloudSearch

5. **OLAP (Analytical) Workloads**
   - Use column-store databases (Redshift, Snowflake)

6. **Budget Constraints**
   - Self-hosted databases might be cheaper for low-scale applications

---

## 💰 Pricing Overview

### On-Demand Pricing (Simplified)
- **Write**: $1.25 per million write requests
- **Read**: $0.25 per million read requests
- **Storage**: $0.25 per GB per month

### Provisioned Pricing
- **Write Capacity Unit (WCU)**: $0.00065 per hour
- **Read Capacity Unit (RCU)**: $0.00013 per hour
- **Storage**: $0.25 per GB per month

**Capacity Units:**
- 1 WCU = 1 write per second (item up to 1 KB)
- 1 RCU = 1 strongly consistent read per second (item up to 4 KB)
- 1 RCU = 2 eventually consistent reads per second

---

## 🧩 DynamoDB Streams

**Real-time change data capture:**
- Captures item-level modifications
- Time-ordered sequence of changes
- Retained for 24 hours
- Trigger AWS Lambda for event-driven processing

**Use Cases:**
- Real-time analytics
- Data replication
- Notifications
- Audit logging
- Cross-region replication

---

## 🌍 Global Tables

**Multi-region, active-active replication:**
- Write to any region
- Automatic replication
- Low-latency access worldwide
- Conflict resolution (last-writer-wins)

**Use Cases:**
- Global applications
- Disaster recovery
- Low-latency for worldwide users

---

## 🔐 Security Features

1. **IAM Policies**: Fine-grained access control
2. **Encryption at Rest**: AWS KMS encryption
3. **Encryption in Transit**: TLS/SSL
4. **VPC Endpoints**: Private access from VPC
5. **CloudTrail Integration**: Audit logging
6. **Fine-Grained Access Control**: Row/column-level permissions

---

## 📚 Learn More

- [Official DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)
- [DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
- [AWS DynamoDB Free Tier](https://aws.amazon.com/dynamodb/pricing/)

---

## 🆓 Free Tier

**AWS Free Tier Includes:**
- 25 GB of storage
- 25 write capacity units (WCU)
- 25 read capacity units (RCU)
- Enough for ~200 million requests per month

---

**Next**: Work with DynamoDB through AWS Console, SDKs, or AWS CLI!

[View SQL Questions →](../questions/)
