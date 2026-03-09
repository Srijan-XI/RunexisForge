# MongoDB

## Introduction

## 📘 What is MongoDB?

**MongoDB** is a leading NoSQL document-oriented database that stores data in flexible, JSON-like documents. Unlike traditional relational databases, MongoDB uses a flexible schema design, making it ideal for modern applications.

### Key Information

- **Created**: 2007 by 10gen (now MongoDB Inc.)
- **License**: SSPL (Server Side Public License) / Commercial
- **Written In**: C++, JavaScript
- **Latest Version**: MongoDB 7.x
- **Default Port**: 27017
- **Data Format**: BSON (Binary JSON)

---

## 🌟 Key Features

### **Document Model**

- Stores data as JSON-like documents (BSON)
- Embedded documents and arrays
- Dynamic schema - no predefined structure
- Rich query language

### **Scalability**

- Horizontal scaling through sharding
- Automatic load balancing
- Replica sets for high availability
- Built-in replication

### **Performance**

- In-memory storage engine option
- Indexes on any field
- Aggregation framework
- GridFS for large files

### **Developer Experience**

- Intuitive document model
- No complex JOINs needed
- Easy to learn and use
- Native drivers for all major languages

---

## ⚖️ Advantages

1. **✅ Flexible Schema** - No rigid table structure
2. **✅ JSON-Like Documents** - Natural data representation
3. **✅ Horizontal Scaling** - Sharding support built-in
4. **✅ High Performance** - Fast reads and writes
5. **✅ Rich Query Language** - Powerful aggregation pipeline
6. **✅ Easy to Learn** - Simple concepts for developers
7. **✅ Replication** - Automatic failover with replica sets
8. **✅ Geospatial Queries** - Built-in location support
9. **✅ GridFS** - Store large files efficiently
10. **✅ Full-Text Search** - Native search capabilities

---

## ⚠️ Disadvantages

1. **❌ No ACID Transactions** (older versions, improved in 4.0+)
2. **❌ Memory Intensive** - Requires significant RAM
3. **❌ Data Duplication** - Denormalization increases storage
4. **❌ Join Operations** - Limited and less efficient than SQL
5. **❌ Learning Curve** - Different from SQL mindset
6. **❌ License Concerns** - SSPL may restrict some uses
7. **❌ Consistency** - Eventual consistency by default
8. **❌ Storage Overhead** - BSON format uses more space

---

## 🎯 Use Cases

### **Perfect For:**

- Content management systems
- Mobile applications
- Real-time analytics
- Internet of Things (IoT)
- Catalogs and inventories
- User profiles and personalization
- Logging and event data
- Gaming leaderboards

### **Not Ideal For:**

- Complex transactions requiring ACID
- Systems with complex relationships
- Applications requiring strict data integrity
- Financial systems (use PostgreSQL/MySQL)

### **Used By:**

- Facebook, Google, Adobe, eBay
- Forbes, The New York Times
- Uber, Lyft, Delivery Hero

---

## 📊 Document Structure

### **Example Document**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "gaming", "coding"],
  "createdAt": ISODate("2024-01-15T10:30:00Z")
}
```go

---

## 🗂️ Collections vs Tables

| MongoDB | Relational DB |
|---------|---------------|
| Database | Database |
| Collection | Table |
| Document | Row |
| Field | Column |
| Embedded Document | JOIN |
| _id | Primary Key |

---

## 🛠️ MongoDB Tools

- **MongoDB Compass** - Official GUI
- **mongosh** - Modern shell
- **MongoDB Atlas** - Cloud-hosted service
- **Robo 3T** - Free GUI client
- **Studio 3T** - Advanced GUI (paid)

---

## 🔄 MongoDB vs SQL

```javascript
// MongoDB
db.users.insertOne({
  name: "John",
  age: 30,
  city: "NYC"
})

// vs SQL
INSERT INTO users (name, age, city) 
VALUES ('John', 30, 'NYC');

// MongoDB Query
db.users.find({ age: { $gt: 25 } })

// vs SQL
SELECT * FROM users WHERE age > 25;
```go

---

## 📚 Learning Resources

- [Official Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/) - Free courses
- [MongoDB Manual](https://docs.mongodb.com/manual/)

---

**Ready to install?** [→ Installation Guide](#user-guide)

[⬆ Back to SQL Overview](../SQL&DB'S.md#introduction)

---

## User Guide

## 💻 Installation

### Windows

**Official Installer (Recommended)**

1. Download from <https://www.mongodb.com/try/download/community>
2. Run `.msi` installer
3. Choose "Complete" installation
4. Install MongoDB Compass (GUI tool)
5. Configure as Windows Service (automatic startup)
6. Verify: `mongod --version`

**Chocolatey**

```powershell
choco install mongodb
```bash

### macOS

**Homebrew (Recommended)**

```bash
# Add MongoDB tap
brew tap mongodb/brew

# Install MongoDB Community Edition
brew install mongodb-community@7.0

# Start MongoDB service
brew services start mongodb-community@7.0

# Verify
mongod --version
```bash

### Linux

**Ubuntu/Debian**

```bash
# Import MongoDB GPG key
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Add repository
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install
sudo apt update
sudo apt install -y mongodb-org

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongod --version
```bash

**Fedora/RHEL**

```bash
# Create repo file
sudo tee /etc/yum.repos.d/mongodb-org-7.0.repo <<EOF
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/\$releasever/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://pgp.mongodb.com/server-7.0.asc
EOF

# Install
sudo dnf install -y mongodb-org

# Start
sudo systemctl start mongod
sudo systemctl enable mongod
```bash

### Docker

```bash
# Pull and run MongoDB
docker run --name mongodb \
  -p 27017:27017 \
  -d mongo:latest

# With authentication
docker run --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -p 27017:27017 \
  -d mongo:latest

# With persistent storage
docker run --name mongodb \
  -v mongodb-data:/data/db \
  -p 27017:27017 \
  -d mongo:latest
```bash

---

## ⚙️ Initial Setup

### Connect to MongoDB

```bash
# Connect to local MongoDB
mongosh

# Connect with authentication
mongosh -u admin -p password --authenticationDatabase admin

# Connect to remote server
mongosh "mongodb://hostname:27017"

# Connect to MongoDB Atlas
mongosh "mongodb+srv://cluster.mongodb.net/myDatabase" --username user
```bash

### Create Database and User

```javascript
// Switch to admin database
use admin

// Create admin user
db.createUser({
  user: "admin",
  pwd: "securePassword",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})

// Create database-specific user
use myapp
db.createUser({
  user: "appuser",
  pwd: "password",
  roles: [ { role: "readWrite", db: "myapp" } ]
})
```bash

---

## 🎯 Basic Usage

### Database Operations

```javascript
// Show all databases
show dbs

// Create/switch to database
use mydb

// Show current database
db

// Drop database
db.dropDatabase()
```bash

### Collection Operations

```javascript
// Create collection
db.createCollection("users")

// Show collections
show collections

// Drop collection
db.users.drop()

// Rename collection
db.users.renameCollection("customers")
```bash

### CRUD Operations

#### Insert Documents

```javascript
// Insert one document
db.users.insertOne({
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  createdAt: new Date()
})

// Insert multiple documents
db.users.insertMany([
  { name: "Alice", age: 25, email: "alice@example.com" },
  { name: "Bob", age: 35, email: "bob@example.com" },
  { name: "Charlie", age: 28, email: "charlie@example.com" }
])
```bash

#### Find Documents

```javascript
// Find all documents
db.users.find()

// Find with pretty print
db.users.find().pretty()

// Find one document
db.users.findOne()

// Find with filter
db.users.find({ age: 30 })

// Find with comparison operators
db.users.find({ age: { $gt: 25 } })  // Greater than 25
db.users.find({ age: { $lt: 35 } })  // Less than 35
db.users.find({ age: { $gte: 25, $lte: 35 } })  // Between 25 and 35

// Find with multiple conditions
db.users.find({ age: { $gt: 25 }, name: "John Doe" })

// Find with OR condition
db.users.find({ $or: [ { age: 30 }, { age: 35 } ] })

// Find with projection (select specific fields)
db.users.find({}, { name: 1, email: 1, _id: 0 })

// Find with limit and sort
db.users.find().limit(5).sort({ age: -1 })

// Find with skip (pagination)
db.users.find().skip(10).limit(5)
```bash

#### Update Documents

```javascript
// Update one document
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 31, email: "john.new@example.com" } }
)

// Update multiple documents
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: "young" } }
)

// Increment value
db.users.updateOne(
  { name: "John Doe" },
  { $inc: { age: 1 } }
)

// Add to array
db.users.updateOne(
  { name: "John Doe" },
  { $push: { hobbies: "reading" } }
)

// Remove from array
db.users.updateOne(
  { name: "John Doe" },
  { $pull: { hobbies: "reading" } }
)

// Upsert (update or insert)
db.users.updateOne(
  { name: "David" },
  { $set: { age: 40, email: "david@example.com" } },
  { upsert: true }
)
```bash

#### Delete Documents

```javascript
// Delete one document
db.users.deleteOne({ name: "John Doe" })

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 25 } })

// Delete all documents
db.users.deleteMany({})
```bash

---

## 🔍 Advanced Queries

### Aggregation Pipeline

```javascript
// Group and count
db.users.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } }
])

// Match, group, and sort
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customer_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
])

// Lookup (join)
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_info"
    }
  }
])
```bash

### Indexes

```javascript
// Create index
db.users.createIndex({ email: 1 })

// Create compound index
db.users.createIndex({ name: 1, age: -1 })

// Create unique index
db.users.createIndex({ email: 1 }, { unique: true })

// Create text index
db.articles.createIndex({ content: "text" })

// Show indexes
db.users.getIndexes()

// Drop index
db.users.dropIndex("email_1")
```bash

### Text Search

```javascript
// Create text index
db.articles.createIndex({ title: "text", content: "text" })

// Search
db.articles.find({ $text: { $search: "mongodb tutorial" } })

// Search with score
db.articles.find(
  { $text: { $search: "mongodb" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```bash

---

## 📊 Backup and Restore

### Backup

```bash
# Backup entire database
mongodump --db=mydb --out=/backup/

# Backup specific collection
mongodump --db=mydb --collection=users --out=/backup/

# Backup with authentication
mongodump --username=admin --password=pass --authenticationDatabase=admin --out=/backup/

# Compressed backup
mongodump --archive=backup.gz --gzip
```bash

### Restore

```bash
# Restore database
mongorestore --db=mydb /backup/mydb/

# Restore specific collection
mongorestore --db=mydb --collection=users /backup/mydb/users.bson

# Restore with authentication
mongorestore --username=admin --password=pass --authenticationDatabase=admin /backup/

# Restore from archive
mongorestore --archive=backup.gz --gzip
```bash

---

## 🔧 MongoDB Compass

### Features

- Visual query builder
- Schema visualization
- Index management
- Real-time performance monitoring
- Import/export data
- Aggregation pipeline builder

### Installation

- Included with MongoDB installer on Windows
- Download from <https://www.mongodb.com/products/compass>
- Available for Windows, macOS, Linux

---

## 🐛 Troubleshooting

### Service Issues

```bash
# Check MongoDB status
sudo systemctl status mongod  # Linux
brew services list | grep mongodb  # macOS

# Start MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS

# Check logs
# Linux: /var/log/mongodb/mongod.log
# macOS: /usr/local/var/log/mongodb/mongo.log
```bash

### Connection Issues

```javascript
// Test connection
mongosh --eval "db.adminCommand('ping')"

// Check port
// Default: 27017
```bash

### Performance Issues

```javascript
// Check current operations
db.currentOp()

// Kill slow operation
db.killOp(operationId)

// Get database statistics
db.stats()

// Get collection statistics
db.users.stats()
```bash

---

## 🔐 Security

### Enable Authentication

Edit `/etc/mongod.conf` (Linux) or `/usr/local/etc/mongod.conf` (macOS):

```yaml
security:
  authorization: enabled
```bash

Restart MongoDB:

```bash
sudo systemctl restart mongod  # Linux
brew services restart mongodb-community  # macOS
```bash

---

## 📚 MongoDB Atlas (Cloud)

**Free Tier Available!**

1. Sign up at <https://www.mongodb.com/cloud/atlas>
2. Create cluster (512MB free)
3. Create database user
4. Whitelist IP address
5. Get connection string
6. Connect: `mongosh "mongodb+srv://cluster.mongodb.net/myDatabase" --username user`

---

## 🎓 Next Steps

1. Learn aggregation pipeline
2. Understand sharding and replication
3. Practice with indexes
4. Explore MongoDB Atlas
5. Try the questions in `/SQL/questions/`

---

**MongoDB is ready!** 🍃

[← Back to MongoDB Introduction](MongoDB.md#introduction) | [View SQL Questions →](../questions/)


