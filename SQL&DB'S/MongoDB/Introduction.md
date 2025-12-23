# MongoDB Introduction

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
```

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
```

---

## 📚 Learning Resources

- [Official Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/) - Free courses
- [MongoDB Manual](https://docs.mongodb.com/manual/)

---

**Ready to install?** [→ Installation Guide](install&usage.md)

[⬆ Back to SQL Overview](../Introduction.md)
