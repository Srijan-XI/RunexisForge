# Redis

## Introduction

## 🚀 What is Redis?

**Redis** (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, message broker, and streaming engine. Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams.

**Key Features:**

- **In-Memory Storage**: Extremely fast read/write operations
- **Persistence Options**: Data can be persisted to disk
- **Rich Data Structures**: More than just key-value pairs
- **Atomic Operations**: All operations are atomic
- **Pub/Sub Messaging**: Built-in publish/subscribe functionality
- **Lua Scripting**: Execute server-side scripts
- **Replication**: Master-slave replication
- **High Availability**: Automatic failover with Redis Sentinel
- **Clustering**: Horizontal scaling across multiple nodes

---

## ✅ Advantages of Redis

| Advantage | Description |
|-----------|-------------|
| **Blazing Fast** | Sub-millisecond latency, handles millions of requests per second |
| **Versatile Data Structures** | Strings, lists, sets, hashes, sorted sets, bitmaps, streams, etc. |
| **Simple to Use** | Easy to learn commands and straightforward API |
| **Persistence** | Optional RDB snapshots and AOF logs for data durability |
| **Atomic Operations** | All operations are atomic, ensuring data consistency |
| **Pub/Sub Support** | Built-in message broker functionality |
| **Replication & Clustering** | Horizontal scalability and high availability |
| **Lua Scripting** | Complex operations can be performed server-side |
| **Geospatial Support** | Store and query geographic data efficiently |
| **Flexible Expiration** | TTL (Time To Live) for automatic key expiration |

---

## ❌ Disadvantages of Redis

| Disadvantage | Description |
|-------------|-------------|
| **Memory Limitations** | Dataset must fit in RAM, can be expensive for large data |
| **Single-Threaded** | One command at a time (though I/O is multiplexed) |
| **Limited Query Capabilities** | No complex queries like SQL JOINs |
| **No Built-in Sharding** | Requires Redis Cluster or manual sharding for horizontal scaling |
| **Complexity with Persistence** | Balancing speed vs. durability can be tricky |
| **Data Structure Limitations** | Limited to predefined data structures |
| **Learning Curve for Advanced Features** | Clustering, Sentinel, and Lua scripting require expertise |
| **Not Suitable for Complex Transactions** | Limited transaction support compared to traditional RDBMS |
| **Replication Lag** | Asynchronous replication can cause temporary inconsistencies |
| **Backup Challenges** | Full backups can impact performance on large datasets |

---

## 🎯 When to Use Redis

### Ideal Use Cases

1. **Caching**
   - Session storage
   - API response caching
   - Database query caching
   - Full-page caching

2. **Real-Time Analytics**
   - Leaderboards and counters
   - Rate limiting
   - Real-time statistics
   - Page view counters

3. **Pub/Sub Messaging**
   - Chat applications
   - Notification systems
   - Event streaming
   - Real-time updates

4. **Queue Management**
   - Job queues (with libraries like Celery, Bull)
   - Task scheduling
   - Background processing

5. **Geospatial Applications**
   - Location-based services
   - Proximity searches
   - Ride-sharing apps

6. **Session Management**
   - Web session storage
   - User authentication tokens
   - Shopping cart data

7. **Real-Time Dashboards**
   - Live metrics
   - Monitoring systems
   - IoT data streams

---

## 📊 Redis vs Other Databases

| Feature | Redis | Memcached | MongoDB |
|---------|-------|-----------|---------|
| **Type** | In-Memory Key-Value Store | In-Memory Key-Value Store | NoSQL Document Store |
| **Data Structures** | Rich (strings, lists, sets, hashes, etc.) | Simple (strings only) | JSON documents |
| **Persistence** | Optional (RDB, AOF) | None | Yes |
| **Replication** | Yes | No | Yes |
| **Clustering** | Yes (Redis Cluster) | Yes (client-side) | Yes (built-in) |
| **Pub/Sub** | Yes | No | Limited |
| **Transactions** | Limited | No | Yes (ACID) |
| **Use Case** | Caching, real-time data, messaging | Simple caching | Complex queries, document storage |
| **Speed** | Ultra-fast (in-memory) | Ultra-fast (in-memory) | Fast (disk-based) |
| **Data Limit** | RAM size | RAM size | Disk size |

---

## 🏢 Companies Using Redis

- **Twitter**: Timeline caching, rate limiting
- **GitHub**: Job queuing, session storage
- **StackOverflow**: Caching, real-time notifications
- **Instagram**: Session storage, feed caching
- **Pinterest**: Follower graphs, caching
- **Uber**: Geospatial queries, real-time tracking
- **Airbnb**: Session management, caching
- **Slack**: Real-time messaging, presence detection

---

## 🧩 Redis Data Structures

### 1. Strings

Simple key-value pairs

```sql
SET name "John"
GET name
```sql

### 2. Lists

Ordered collections of strings

```sql
LPUSH queue "task1"
RPOP queue
```sql

### 3. Sets

Unordered collections of unique strings

```sql
SADD tags "redis" "database" "nosql"
SMEMBERS tags
```sql

### 4. Sorted Sets

Sets with scores for ranking

```sql
ZADD leaderboard 100 "player1"
ZRANGE leaderboard 0 -1 WITHSCORES
```sql

### 5. Hashes

Maps between string fields and values

```sql
HSET user:1 name "John" age 30
HGETALL user:1
```sql

### 6. Streams

Append-only log data structure

```sql
XADD mystream * field1 value1 field2 value2
XREAD STREAMS mystream 0
```sql

### 7. Geospatial Indexes

Location-based queries

```sql
GEOADD locations 13.361389 38.115556 "Palermo"
GEORADIUS locations 15 37 200 km
```sql

---

## 🔧 Redis Persistence

### RDB (Redis Database Backup)

- Point-in-time snapshots at specified intervals
- Compact single-file representation
- Fast restarts with large datasets

### AOF (Append Only File)

- Logs every write operation
- More durable than RDB
- Larger file size, slower restarts

### Hybrid Approach

- Combine RDB and AOF for best of both worlds

---

## 📈 Performance Characteristics

| Operation | Time Complexity |
|-----------|----------------|
| `SET` / `GET` | O(1) |
| `LPUSH` / `RPUSH` | O(1) |
| `LPOP` / `RPOP` | O(1) |
| `SADD` / `SREM` | O(1) |
| `ZADD` / `ZREM` | O(log N) |
| `HSET` / `HGET` | O(1) |
| `KEYS` (avoid in production!) | O(N) |
| `SCAN` (safe alternative) | O(1) per call |

---

## 🚦 Redis Use Case Example

### Session Storage for Web Application

**Problem**: Traditional session storage in databases is slow and doesn't scale well.

**Redis Solution**:

```sql
# Store session
SETEX session:abc123 3600 '{"userId": 42, "username": "john", "role": "admin"}'

# Retrieve session
GET session:abc123

# Extend session
EXPIRE session:abc123 3600

# Delete session (logout)
DEL session:abc123
```sql

**Benefits**:

- Sub-millisecond response time
- Automatic expiration (no cleanup jobs needed)
- Horizontally scalable with Redis Cluster
- Persistent across application restarts (with AOF)

---

## 🔮 When NOT to Use Redis

1. **Primary Database for Complex Queries**
   - Use PostgreSQL, MySQL, or MongoDB instead

2. **Large Datasets That Don't Fit in RAM**
   - Consider disk-based databases

3. **Complex Transactions**
   - Use traditional RDBMS with ACID guarantees

4. **Long-Term Data Archival**
   - Use dedicated archival systems

5. **Complex Relationships**
   - Use graph databases (Neo4j) or RDBMS

---

## 📚 Learn More

- [Official Redis Documentation](https://redis.io/docs/)
- [Redis Commands Reference](https://redis.io/commands/)
- [Redis University (Free Courses)](https://university.redis.com/)
- [Redis Best Practices](https://redis.io/topics/best-practices)

---

**Next**: [Installation and Usage Guide →](#user-guide)

---

## User Guide

## 💻 Installation

### Windows

**Official Installer (Recommended for Dev)**

Redis doesn't officially support Windows, but you can use WSL2 or unofficial ports.

**Option 1: WSL2 (Recommended)**

```powershell
# Install WSL2
wsl --install

# Inside WSL2 terminal
sudo apt update
sudo apt install redis-server

# Start Redis
sudo service redis-server start

# Test
redis-cli ping
```sql

**Option 2: Windows Port (Memurai)**

- Download from <https://www.memurai.com/>
- Free for development
- Compatible with Redis API

**Option 3: Docker (Best for Windows)**

```powershell
# Install Docker Desktop, then:
docker run --name redis -p 6379:6379 -d redis:latest

# Test
docker exec -it redis redis-cli ping
```bash

### macOS

**Homebrew (Recommended)**

```bash
# Install Redis
brew install redis

# Start Redis as a service
brew services start redis

# Or start manually
redis-server /usr/local/etc/redis.conf

# Test
redis-cli ping
# Output: PONG
```text

### Linux

**Ubuntu/Debian**

```bash
# Update packages
sudo apt update

# Install Redis
sudo apt install redis-server

# Configure Redis to run as systemd service
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Test
redis-cli ping
# Output: PONG

# Check status
sudo systemctl status redis-server
```text

**Fedora/RHEL/CentOS**

```bash
# Install Redis
sudo dnf install redis

# Start and enable
sudo systemctl start redis
sudo systemctl enable redis

# Test
redis-cli ping
```text

**From Source (All Linux)**

```bash
# Install dependencies
sudo apt install build-essential tcl  # Debian/Ubuntu
sudo dnf groupinstall "Development Tools"  # Fedora/RHEL

# Download and compile
wget https://download.redis.io/redis-stable.tar.gz
tar -xzvf redis-stable.tar.gz
cd redis-stable
make
sudo make install

# Start Redis
redis-server

# Or as background process
redis-server --daemonize yes
```text

### Docker (Cross-Platform)

```bash
# Run Redis
docker run --name redis -p 6379:6379 -d redis:latest

# Run with persistent storage
docker run --name redis \
  -v redis-data:/data \
  -p 6379:6379 \
  -d redis:latest redis-server --appendonly yes

# Run with custom config
docker run --name redis \
  -v /path/to/redis.conf:/usr/local/etc/redis/redis.conf \
  -p 6379:6379 \
  -d redis:latest redis-server /usr/local/etc/redis/redis.conf

# Connect to Redis CLI
docker exec -it redis redis-cli
```text

---

## ⚙️ Initial Setup

### Basic Configuration

Edit Redis configuration file:

- **Linux**: `/etc/redis/redis.conf`
- **macOS**: `/usr/local/etc/redis.conf`

```bash
# Bind to all interfaces (default: 127.0.0.1)
bind 0.0.0.0

# Set password
requirepass yourStrongPassword

# Change port (default: 6379)
port 6379

# Enable persistence
save 900 1        # Save after 900 sec if 1 key changed
save 300 10       # Save after 300 sec if 10 keys changed
save 60 10000     # Save after 60 sec if 10000 keys changed

# Enable AOF (Append Only File)
appendonly yes
appendfilename "appendonly.aof"

# Set max memory
maxmemory 256mb
maxmemory-policy allkeys-lru  # Eviction policy
```text

Restart Redis:

```bash
sudo systemctl restart redis-server  # Linux
brew services restart redis  # macOS
```text

### Connect to Redis

```bash
# Connect locally
redis-cli

# Connect with password
redis-cli -a yourPassword

# Connect to remote server
redis-cli -h hostname -p 6379 -a password

# Test connection
127.0.0.1:6379> PING
PONG
```text

---

## 🎯 Basic Usage

### String Operations

```bash
# Set a key
SET name "John Doe"
# Output: OK

# Get a key
GET name
# Output: "John Doe"

# Set with expiration (seconds)
SETEX session:123 3600 "user_data"

# Set multiple keys
MSET key1 "value1" key2 "value2" key3 "value3"

# Get multiple keys
MGET key1 key2 key3

# Increment
SET counter 10
INCR counter
# Output: (integer) 11

# Increment by amount
INCRBY counter 5
# Output: (integer) 16

# Check if key exists
EXISTS name
# Output: (integer) 1

# Delete key
DEL name
# Output: (integer) 1

# Set expiration on existing key
EXPIRE counter 60

# Check time to live
TTL counter
# Output: (integer) 60

# Remove expiration
PERSIST counter
```text

### List Operations

```bash
# Push to left (head)
LPUSH tasks "task1" "task2" "task3"

# Push to right (tail)
RPUSH tasks "task4"

# Get all elements
LRANGE tasks 0 -1

# Get length
LLEN tasks

# Pop from left
LPOP tasks

# Pop from right
RPOP tasks

# Get element at index
LINDEX tasks 0

# Set element at index
LSET tasks 0 "updated_task"

# Remove elements
LREM tasks 1 "task1"  # Remove first occurrence
```text

### Set Operations

```bash
# Add members to set
SADD tags "redis" "database" "nosql" "cache"

# Get all members
SMEMBERS tags

# Check if member exists
SISMEMBER tags "redis"
# Output: (integer) 1

# Remove member
SREM tags "cache"

# Get number of members
SCARD tags

# Set operations
SADD set1 "a" "b" "c"
SADD set2 "b" "c" "d"

# Intersection
SINTER set1 set2
# Output: "b" "c"

# Union
SUNION set1 set2
# Output: "a" "b" "c" "d"

# Difference
SDIFF set1 set2
# Output: "a"

# Random member
SRANDMEMBER tags
```text

### Hash Operations

```bash
# Set hash fields
HSET user:1 name "John" age 30 email "john@example.com"

# Get specific field
HGET user:1 name
# Output: "John"

# Get all fields and values
HGETALL user:1

# Get multiple fields
HMGET user:1 name age

# Check if field exists
HEXISTS user:1 email
# Output: (integer) 1

# Delete field
HDEL user:1 age

# Increment field value
HINCRBY user:1 age 1

# Get all field names
HKEYS user:1

# Get all values
HVALS user:1

# Get number of fields
HLEN user:1
```text

### Sorted Set Operations

```bash
# Add members with scores
ZADD leaderboard 100 "player1" 95 "player2" 87 "player3"

# Get members by rank (ascending)
ZRANGE leaderboard 0 -1 WITHSCORES

# Get members by rank (descending)
ZREVRANGE leaderboard 0 -1 WITHSCORES

# Get score of member
ZSCORE leaderboard "player1"
# Output: "100"

# Increment score
ZINCRBY leaderboard 5 "player1"

# Get rank (ascending)
ZRANK leaderboard "player1"

# Get rank (descending)
ZREVRANK leaderboard "player1"

# Get members by score range
ZRANGEBYSCORE leaderboard 90 100

# Remove member
ZREM leaderboard "player3"

# Get count
ZCARD leaderboard
```text

---

## 🔍 Advanced Operations

### Pub/Sub (Publish/Subscribe)

**Subscriber (Terminal 1):**

```bash
redis-cli
SUBSCRIBE news updates
```bash

**Publisher (Terminal 2):**

```bash
redis-cli
PUBLISH news "Breaking news!"
PUBLISH updates "System update available"
```bash

**Pattern Subscription:**

```bash
# Subscribe to channels matching pattern
PSUBSCRIBE news:*

# Publish
PUBLISH news:sports "Team wins championship"
```bash

### Transactions

```bash
# Start transaction
MULTI

# Queue commands
SET key1 "value1"
SET key2 "value2"
INCR counter

# Execute all
EXEC

# Or discard
DISCARD
```bash

### Lua Scripting

```bash
# Simple script
EVAL "return redis.call('SET', KEYS[1], ARGV[1])" 1 mykey "myvalue"

# Complex script
EVAL "
  local current = redis.call('GET', KEYS[1])
  if tonumber(current) < tonumber(ARGV[1]) then
    return redis.call('SET', KEYS[1], ARGV[1])
  end
  return 0
" 1 counter 100
```bash

### Geospatial Operations

```bash
# Add locations
GEOADD cities 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"

# Get distance
GEODIST cities "Palermo" "Catania" km
# Output: "166.2742"

# Find locations within radius
GEORADIUS cities 15 37 200 km WITHDIST

# Get coordinates
GEOPOS cities "Palermo"
```bash

### Streams (Redis 5.0+)

```bash
# Add entry to stream
XADD mystream * sensor-id 1234 temperature 19.8

# Read entries
XREAD STREAMS mystream 0

# Read with count limit
XREAD COUNT 2 STREAMS mystream 0

# Read newest entries
XREAD BLOCK 0 STREAMS mystream $

# Create consumer group
XGROUP CREATE mystream mygroup 0

# Read as consumer
XREADGROUP GROUP mygroup consumer1 STREAMS mystream >
```bash

---

## 📊 Monitoring and Management

### Server Information

```bash
# Get server info
INFO

# Get specific section
INFO server
INFO memory
INFO stats

# Monitor commands in real-time
MONITOR

# Get statistics
INFO stats

# Get client list
CLIENT LIST

# Kill client
CLIENT KILL ip:port
```bash

### Performance

```bash
# Get slow queries
SLOWLOG GET 10

# Reset slow log
SLOWLOG RESET

# Get memory usage of key
MEMORY USAGE mykey

# Get database size
DBSIZE

# Flush database
FLUSHDB  # Current database
FLUSHALL  # All databases
```bash

### Backup and Restore

```bash
# Create backup (RDB snapshot)
SAVE  # Blocking
BGSAVE  # Background

# Get last save time
LASTSAVE

# Backup location
# Linux: /var/lib/redis/dump.rdb
# macOS: /usr/local/var/db/redis/dump.rdb

# Restore: Stop Redis, replace dump.rdb, start Redis
```bash

---

## 🔐 Security

### Enable Password Authentication

Edit `redis.conf`:

```bash
requirepass yourStrongPassword123!
```bash

Connect with password:

```bash
redis-cli -a yourStrongPassword123!

# Or authenticate after connecting
redis-cli
AUTH yourStrongPassword123!
```bash

### Rename Dangerous Commands

Edit `redis.conf`:

```bash
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command KEYS ""
rename-command CONFIG "CONFIG_abcd1234"
```bash

### Bind to Specific Interface

```bash
bind 127.0.0.1  # Local only
bind 0.0.0.0    # All interfaces (use with firewall!)
```bash

---

## 🐛 Troubleshooting

### Check if Redis is Running

```bash
# Linux
sudo systemctl status redis-server

# macOS
brew services list | grep redis

# All platforms
redis-cli ping
```bash

### View Logs

```bash
# Linux
sudo tail -f /var/log/redis/redis-server.log

# macOS
tail -f /usr/local/var/log/redis.log

# Docker
docker logs -f redis
```bash

### Common Issues

**Can't connect to Redis:**

```bash
# Check if running
ps aux | grep redis

# Check port
netstat -tuln | grep 6379

# Check firewall
sudo ufw status  # Linux
```bash

**Out of memory:**

```bash
# Check memory usage
INFO memory

# Set max memory in redis.conf
maxmemory 256mb
maxmemory-policy allkeys-lru
```bash

---

## 🔧 Redis GUI Tools

1. **RedisInsight** (Official, Free)
   - Download: <https://redis.com/redis-enterprise/redis-insight/>
   - Features: Visualization, profiling, CLI, cluster management

2. **Redis Commander** (Web-based)

   ```bash
   npm install -g redis-commander
   redis-commander
   ```

3. **Medis** (macOS only)
   - Modern GUI for macOS
   - Download: <https://getmedis.com/>

---

## 📈 Performance Tips

1. **Use pipelining** for bulk operations
2. **Avoid `KEYS` command** in production (use `SCAN` instead)
3. **Use connection pooling** in applications
4. **Enable persistence** based on durability needs
5. **Set appropriate `maxmemory` and eviction policies**
6. **Use Redis Cluster** for horizontal scaling
7. **Monitor slow queries** with `SLOWLOG`

---

## 🎓 Next Steps

1. Learn Redis data structure patterns
2. Implement caching in your application
3. Explore Redis Cluster for scaling
4. Try Redis Sentinel for high availability
5. Practice with the questions in `/SQL/questions/`

---

**Redis is ready!** ⚡

[← Back to Redis Introduction](Redis.md#introduction) | [View SQL Questions →](../questions/)


