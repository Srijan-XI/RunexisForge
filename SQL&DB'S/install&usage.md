# SQL Installation & Usage Guide

This guide provides quick links and overview for installing different database systems.

---

## 📚 Available Database Systems

### **Relational Databases (SQL)**

#### 1. **MySQL** 🐬

- **Installation Guide**: [MySQL Installation](MySQL/install&usage.md)
- **Introduction**: [MySQL Introduction](MySQL/Introduction.md)
- **Best For**: Web applications, WordPress, small to medium projects
- **License**: GPL / Commercial

#### 2. **PostgreSQL** 🐘

- **Installation Guide**: [PostgreSQL Installation](PostgreSQL/install&usage.md)
- **Introduction**: [PostgreSQL Introduction](PostgreSQL/Introduction.md)
- **Best For**: Complex queries, data integrity, enterprise applications
- **License**: PostgreSQL License (permissive)

### **NoSQL Databases**

#### 3. **MongoDB** 🍃

- **Installation Guide**: [MongoDB Installation](MongoDB/install&usage.md)
- **Introduction**: [MongoDB Introduction](MongoDB/Introduction.md)
- **Best For**: Flexible schema, rapid development, big data
- **License**: SSPL / Commercial

#### 4. **Redis** 🔴

- **Installation Guide**: [Redis Installation](Redis/install&usage.md)
- **Introduction**: [Redis Introduction](Redis/Introduction.md)
- **Best For**: Caching, session management, real-time analytics
- **License**: BSD

#### 5. **DynamoDB** ⚡

- **Introduction**: [DynamoDB Introduction](DynamoDB/Introduction.md)
- **Best For**: AWS serverless, auto-scaling, managed service
- **Type**: Fully managed AWS service (No local installation)

---

## 🚀 Quick Start Comparison

| Database | Installation Time | Difficulty | Use Case |
|----------|------------------|------------|----------|
| **MySQL** | 10-15 min | Easy | Web apps, general purpose |
| **PostgreSQL** | 15-20 min | Medium | Enterprise, analytics |
| **MongoDB** | 10-15 min | Easy | Flexible data, APIs |
| **Redis** | 5-10 min | Easy | Caching, sessions |
| **DynamoDB** | N/A (Cloud) | Easy | AWS serverless apps |

---

## 💻 Platform Support

| Database | Windows | macOS | Linux | Docker |
|----------|---------|-------|-------|--------|
| MySQL | ✅ | ✅ | ✅ | ✅ |
| PostgreSQL | ✅ | ✅ | ✅ | ✅ |
| MongoDB | ✅ | ✅ | ✅ | ✅ |
| Redis | ⚠️ (WSL) | ✅ | ✅ | ✅ |
| DynamoDB | ☁️ Cloud / Local emulator | ☁️ Cloud / Local emulator | ☁️ Cloud / Local emulator | ✅ |

---

## 🛠️ Installation Methods

### **Package Managers**

#### Windows

```powershell
# Using Chocolatey
choco install mysql
choco install postgresql
choco install mongodb
```bash

#### macOS

```bash
# Using Homebrew
brew install mysql
brew install postgresql
brew install mongodb-community
brew install redis
```bash

#### Linux (Ubuntu/Debian)

```bash
# APT package manager
sudo apt update
sudo apt install mysql-server
sudo apt install postgresql
sudo apt install mongodb
sudo apt install redis-server
```bash

### **Docker (All Platforms)**

```bash
# MySQL
docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql

# PostgreSQL
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# MongoDB
docker run --name mongodb -p 27017:27017 -d mongo

# Redis
docker run --name redis -p 6379:6379 -d redis
```bash

---

## 🎯 Choosing the Right Database

### **Decision Tree**

```bash
Do you need a relational database?
├─ YES
│  ├─ Need advanced features (JSON, arrays, geospatial)?
│  │  └─> PostgreSQL
│  └─ Simple, proven, web-focused?
│     └─> MySQL
│
└─ NO (Need NoSQL)
   ├─ Need caching/high-speed access?
   │  └─> Redis
   ├─ Flexible document storage?
   │  └─> MongoDB
   └─ AWS serverless application?
      └─> DynamoDB
```bash

---

## 📊 Feature Comparison

### **MySQL**

- ✅ Easy to learn and use
- ✅ Wide hosting support
- ✅ Large community
- ✅ Good performance
- ❌ Limited advanced features
- ❌ Less suitable for complex queries

### **PostgreSQL**

- ✅ ACID compliant
- ✅ Advanced features
- ✅ Excellent for analytics
- ✅ JSON support
- ❌ Steeper learning curve
- ❌ Fewer hosting options

### **MongoDB**

- ✅ Flexible schema
- ✅ Horizontal scaling
- ✅ Easy to start
- ✅ Good for unstructured data
- ❌ No ACID by default (newer versions improved)
- ❌ Memory intensive

### **Redis**

- ✅ Extremely fast
- ✅ Rich data structures
- ✅ Pub/sub support
- ✅ Perfect for caching
- ❌ In-memory (limited by RAM)
- ❌ Not a primary database

### **DynamoDB**

- ✅ Fully managed
- ✅ Auto-scaling
- ✅ High availability
- ✅ Serverless
- ❌ AWS vendor lock-in
- ❌ Complex pricing model

---

## 🔧 Common Tools

### **GUI Clients**

- **MySQL Workbench** - Official MySQL tool
- **pgAdmin** - PostgreSQL management
- **MongoDB Compass** - MongoDB GUI
- **Redis Insight** - Redis visualization
- **DBeaver** - Universal database tool
- **TablePlus** - Modern database GUI (paid)
- **DataGrip** - JetBrains database IDE (paid)

### **Command Line**

- `mysql` - MySQL CLI
- `psql` - PostgreSQL CLI
- `mongosh` - MongoDB Shell
- `redis-cli` - Redis CLI
- `aws dynamodb` - AWS DynamoDB CLI

### **Programming Language Drivers**

#### Python

```bash
pip install mysql-connector-python  # MySQL
pip install psycopg2-binary          # PostgreSQL
pip install pymongo                   # MongoDB
pip install redis                     # Redis
pip install boto3                     # DynamoDB
```bash

#### Node.js

```bash
npm install mysql2        # MySQL
npm install pg            # PostgreSQL
npm install mongodb       # MongoDB
npm install redis         # Redis
npm install @aws-sdk/client-dynamodb  # DynamoDB
```bash

#### Java

```xml
<!-- MySQL -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

<!-- PostgreSQL -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>

<!-- MongoDB -->
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongodb-driver-sync</artifactId>
</dependency>
```bash

---

## 📚 Learning Resources

### **Official Documentation**

- [MySQL Docs](https://dev.mysql.com/doc/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Redis Docs](https://redis.io/documentation)
- [DynamoDB Docs](https://docs.aws.amazon.com/dynamodb/)

### **Interactive Learning**

- [SQLBolt](https://sqlbolt.com/) - Interactive SQL tutorials
- [PostgreSQL Exercises](https://pgexercises.com/)
- [MongoDB University](https://university.mongodb.com/)
- [Redis University](https://university.redis.com/)
- [LeetCode Database Problems](https://leetcode.com/problemset/database/)

---

## 🎓 Practice Questions

Check the `questions/` folder for SQL practice exercises covering:

- Basic SELECT queries
- JOINs and relationships
- Aggregate functions
- Subqueries
- Database design
- Optimization techniques

---

## 🔐 Security Basics

### **Initial Setup Checklist**

- [ ] Change default passwords
- [ ] Create non-root users
- [ ] Configure firewall rules
- [ ] Enable SSL/TLS connections
- [ ] Set up regular backups
- [ ] Configure access controls
- [ ] Enable audit logging

### **Connection Security**

```bash
# MySQL - Secure connection
mysql -u user -p -h host --ssl-mode=REQUIRED

# PostgreSQL - Secure connection
psql "sslmode=require host=hostname dbname=mydb user=myuser"

# MongoDB - Secure connection
mongosh "mongodb://username:password@host:port/?tls=true"
```bash

---

## 🚀 Next Steps

1. **Choose Your Database**
   - Read the introduction for each database
   - Consider your project requirements
   - Think about scalability needs

2. **Follow Installation Guide**
   - Select your operating system
   - Follow step-by-step instructions
   - Verify installation

3. **Learn Basics**
   - Complete beginner tutorials
   - Practice with sample data
   - Try practice questions

4. **Build Projects**
   - Create simple CRUD application
   - Design database schema
   - Implement queries

5. **Explore Advanced Topics**
   - Performance optimization
   - Replication and clustering
   - Backup and recovery
   - Monitoring and maintenance

---

## 📞 Getting Help

- **Stack Overflow**: Tag questions with database name
- **Official Forums**: Each database has community forums
- **GitHub Issues**: Report bugs or feature requests
- **Documentation**: Always check official docs first

---

## 🔄 Updates and Maintenance

All databases receive regular updates. Check for:

- Security patches
- Performance improvements
- New features
- Bug fixes

Stay updated with:

```bash
# MySQL
sudo apt update && sudo apt upgrade mysql-server

# PostgreSQL
sudo apt update && sudo apt upgrade postgresql

# MongoDB
sudo apt update && sudo apt upgrade mongodb

# Redis
sudo apt update && sudo apt upgrade redis-server
```bash

---

**Ready to install? Choose your database and get started!** 🎯

[⬆ Back to SQL Introduction](Introduction.md)
