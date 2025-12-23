# Redis Installation and Usage Guide

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
```

**Option 2: Windows Port (Memurai)**
- Download from https://www.memurai.com/
- Free for development
- Compatible with Redis API

**Option 3: Docker (Best for Windows)**
```powershell
# Install Docker Desktop, then:
docker run --name redis -p 6379:6379 -d redis:latest

# Test
docker exec -it redis redis-cli ping
```

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
```

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
```

**Fedora/RHEL/CentOS**
```bash
# Install Redis
sudo dnf install redis

# Start and enable
sudo systemctl start redis
sudo systemctl enable redis

# Test
redis-cli ping
```

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
```

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
```

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
```

Restart Redis:
```bash
sudo systemctl restart redis-server  # Linux
brew services restart redis  # macOS
```

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
```

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
```

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
```

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
```

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
```

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
```

---

## 🔍 Advanced Operations

### Pub/Sub (Publish/Subscribe)

**Subscriber (Terminal 1):**
```bash
redis-cli
SUBSCRIBE news updates
```

**Publisher (Terminal 2):**
```bash
redis-cli
PUBLISH news "Breaking news!"
PUBLISH updates "System update available"
```

**Pattern Subscription:**
```bash
# Subscribe to channels matching pattern
PSUBSCRIBE news:*

# Publish
PUBLISH news:sports "Team wins championship"
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

---

## 🔐 Security

### Enable Password Authentication

Edit `redis.conf`:
```
requirepass yourStrongPassword123!
```

Connect with password:
```bash
redis-cli -a yourStrongPassword123!

# Or authenticate after connecting
redis-cli
AUTH yourStrongPassword123!
```

### Rename Dangerous Commands

Edit `redis.conf`:
```
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command KEYS ""
rename-command CONFIG "CONFIG_abcd1234"
```

### Bind to Specific Interface

```
bind 127.0.0.1  # Local only
bind 0.0.0.0    # All interfaces (use with firewall!)
```

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
```

### View Logs

```bash
# Linux
sudo tail -f /var/log/redis/redis-server.log

# macOS
tail -f /usr/local/var/log/redis.log

# Docker
docker logs -f redis
```

### Common Issues

**Can't connect to Redis:**
```bash
# Check if running
ps aux | grep redis

# Check port
netstat -tuln | grep 6379

# Check firewall
sudo ufw status  # Linux
```

**Out of memory:**
```bash
# Check memory usage
INFO memory

# Set max memory in redis.conf
maxmemory 256mb
maxmemory-policy allkeys-lru
```

---

## 🔧 Redis GUI Tools

1. **RedisInsight** (Official, Free)
   - Download: https://redis.com/redis-enterprise/redis-insight/
   - Features: Visualization, profiling, CLI, cluster management

2. **Redis Commander** (Web-based)
   ```bash
   npm install -g redis-commander
   redis-commander
   ```

3. **Medis** (macOS only)
   - Modern GUI for macOS
   - Download: https://getmedis.com/

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

[← Back to Redis Introduction](Introduction.md) | [View SQL Questions →](../questions/)
