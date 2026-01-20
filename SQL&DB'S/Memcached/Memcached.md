# Memcached

## Introduction

Memcached is a high-performance, distributed memory caching system designed to speed up dynamic web applications by alleviating database load. It's a simple, yet powerful in-memory key-value store used by some of the largest websites in the world.

### What is Memcached?

Memcached is an open-source, high-performance, distributed memory object caching system. It stores data and objects in RAM to reduce the number of times an external data source (such as a database or API) must be read, dramatically improving the speed and performance of data-intensive applications.

### Key Features

- **High Performance**: Sub-millisecond response times
- **Simple Protocol**: Text and binary protocol support
- **Distributed**: Sharding across multiple servers
- **LRU Eviction**: Automatic removal of least recently used items
- **Multi-threaded**: Efficient CPU utilization
- **Language Agnostic**: Client libraries for all major languages
- **Lightweight**: Minimal resource overhead
- **Scalable**: Horizontal scaling by adding nodes
- **No Persistence**: Pure in-memory cache (ephemeral)
- **Mature**: Battle-tested since 2003

### Use Cases

- **Database Query Caching**: Reduce database load
- **Session Storage**: Web session management
- **API Response Caching**: Cache expensive API calls
- **Fragment Caching**: Cache rendered page fragments
- **Object Caching**: Store serialized objects
- **Rate Limiting**: Track request counts
- **Temporary Data Storage**: Short-lived data
- **Distributed Counters**: Shared counters across servers

### Memcached vs Redis vs Other Caches

| Feature | Memcached | Redis | Varnish |
|---------|-----------|-------|---------|
| **Data Types** | String only | Rich types | HTTP cache |
| **Persistence** | No | Yes (optional) | No |
| **Replication** | No | Yes | No |
| **Multi-threading** | Yes | No (single-threaded) | Yes |
| **Use Case** | Simple caching | Complex data | HTTP reverse proxy |
| **Memory Model** | Slab allocation | Dynamic | Page cache |
| **Complexity** | Simple | Feature-rich | HTTP-focused |

### Architecture Overview

**Memcached Components:**

**Server:**
- Multi-threaded event loop
- Slab allocator for memory management
- Hash table for key lookup
- LRU (Least Recently Used) eviction

**Protocol:**
- Text protocol (human-readable)
- Binary protocol (more efficient)
- Simple commands: GET, SET, DELETE, etc.

**Client:**
- Consistent hashing for key distribution
- Connection pooling
- Automatic failover (client-side)

**Memory Management:**
- Slab classes for different object sizes
- Pre-allocated memory chunks
- No memory fragmentation

---

## Installation & Setup

### Prerequisites

- Operating System: Linux, macOS, Windows
- Minimum RAM: 64MB (configurable)
- GCC compiler (for building from source)
- libevent library
- Network connectivity

### Installation Methods

#### Method 1: Package Manager

**Ubuntu/Debian:**
```bash
# Install Memcached
sudo apt-get update
sudo apt-get install memcached libmemcached-tools

# Start service
sudo systemctl start memcached
sudo systemctl enable memcached

# Check status
sudo systemctl status memcached
```

**CentOS/RHEL:**
```bash
# Install Memcached
sudo yum install memcached libmemcached

# Start service
sudo systemctl start memcached
sudo systemctl enable memcached
```

**macOS:**
```bash
# Install with Homebrew
brew install memcached

# Start service
brew services start memcached

# Or run manually
memcached -m 64 -p 11211 -d
```

#### Method 2: Docker

```bash
# Run Memcached container
docker run -d \
  --name memcached \
  -p 11211:11211 \
  memcached:latest \
  memcached -m 64

# Run with custom memory
docker run -d \
  --name memcached \
  -p 11211:11211 \
  memcached:latest \
  memcached -m 256 -c 1024
```

#### Method 3: Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  memcached:
    image: memcached:latest
    container_name: memcached
    ports:
      - "11211:11211"
    command: memcached -m 256 -c 1024
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "nc", "-z", "localhost", "11211"]
      interval: 30s
      timeout: 10s
      retries: 3
```

```bash
# Start Memcached
docker-compose up -d

# View stats
docker exec memcached sh -c "echo stats | nc localhost 11211"
```

#### Method 4: Build from Source

```bash
# Install dependencies
sudo apt-get install libevent-dev build-essential

# Download source
wget http://memcached.org/files/memcached-1.6.22.tar.gz
tar -xzf memcached-1.6.22.tar.gz
cd memcached-1.6.22

# Configure and build
./configure
make
sudo make install

# Run
memcached -d -m 256 -p 11211 -u memcache
```

### Configuration

**Config File** (`/etc/memcached.conf`):
```conf
# Memory allocation (MB)
-m 256

# Port
-p 11211

# Listen on all interfaces
-l 0.0.0.0

# Max connections
-c 1024

# Run as user
-u memcache

# Verbose logging
-v

# Max item size (1MB default, can increase)
-I 1m
```

**Start with systemd:**
```bash
# Edit service file
sudo systemctl edit memcached

# Add configuration
[Service]
ExecStart=
ExecStart=/usr/bin/memcached -m 256 -p 11211 -u memcache -l 0.0.0.0

# Reload and restart
sudo systemctl daemon-reload
sudo systemctl restart memcached
```

### Verify Installation

```bash
# Check if Memcached is running
ps aux | grep memcached

# Test connection
telnet localhost 11211

# Or use netcat
echo "stats" | nc localhost 11211

# Set and get a key
echo -e "set testkey 0 0 5\r\nhello\r" | nc localhost 11211
echo -e "get testkey\r" | nc localhost 11211
```

---

## User Guide

### Basic Operations

#### 1. Connect to Memcached

**Telnet (Testing):**
```bash
telnet localhost 11211

# Commands in telnet session:
set mykey 0 0 5
hello
get mykey
quit
```

**Python:**
```bash
pip install pymemcache
```

```python
from pymemcache.client import base

# Connect to Memcached
client = base.Client(('localhost', 11211))

# Set key
client.set('mykey', 'hello')

# Get key
value = client.get('mykey')
print(value.decode('utf-8'))
```

**PHP:**
```php
<?php
$memcached = new Memcached();
$memcached->addServer('localhost', 11211);

// Set key
$memcached->set('mykey', 'hello', 3600);

// Get key
$value = $memcached->get('mykey');
echo $value;
?>
```

**Node.js:**
```bash
npm install memcached
```

```javascript
const Memcached = require('memcached');
const memcached = new Memcached('localhost:11211');

// Set key
memcached.set('mykey', 'hello', 3600, (err) => {
  if (err) console.error(err);
});

// Get key
memcached.get('mykey', (err, data) => {
  if (err) console.error(err);
  console.log(data);
});
```

#### 2. Set and Get Keys

```python
from pymemcache.client import base

client = base.Client(('localhost', 11211))

# Set key with expiration (seconds)
client.set('user:123', 'John Doe', expire=3600)

# Set multiple keys
client.set_many({
    'user:123': 'John Doe',
    'user:124': 'Jane Smith',
    'user:125': 'Bob Johnson'
}, expire=3600)

# Get key
user = client.get('user:123')

# Get multiple keys
users = client.get_many(['user:123', 'user:124', 'user:125'])
```

#### 3. Update and Delete Keys

```python
# Update existing key
client.set('counter', 100)
client.replace('counter', 200)  # Only updates if key exists

# Delete key
client.delete('user:123')

# Delete multiple keys
client.delete_many(['user:123', 'user:124'])
```

#### 4. Increment and Decrement

```python
# Set initial counter
client.set('page_views', 0)

# Increment
client.incr('page_views', 1)  # Increment by 1
client.incr('page_views', 5)  # Increment by 5

# Decrement
client.decr('page_views', 1)  # Decrement by 1

# Get value
count = client.get('page_views')
```

### Advanced Features

#### CAS (Check and Set)

```python
# CAS for atomic updates
key = 'inventory:item123'

# Get with CAS token
value, cas = client.gets(key)

# Update only if value hasn't changed
try:
    client.cas(key, new_value, cas)
except MemcacheClientError:
    print("Value was modified by another process")
```

#### Touch (Update Expiration)

```python
# Extend expiration without fetching value
client.touch('session:abc123', 3600)  # Extend for 1 hour
```

#### Stats and Monitoring

```python
# Get server stats
stats = client.stats()

for key, value in stats.items():
    print(f"{key}: {value}")

# Important stats:
# - curr_items: Current number of items
# - total_items: Total items stored since startup
# - bytes: Memory used
# - get_hits: Successful gets
# - get_misses: Failed gets
# - evictions: Items removed due to memory pressure
```

### Integration Examples

#### Database Query Caching

```python
import pymemcache
import mysql.connector

memcache = pymemcache.Client(('localhost', 11211))
db = mysql.connector.connect(
    host="localhost",
    user="user",
    password="password",
    database="mydb"
)

def get_user(user_id):
    cache_key = f"user:{user_id}"
    
    # Try cache first
    cached = memcache.get(cache_key)
    if cached:
        return cached
    
    # Cache miss - query database
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    
    # Store in cache for 1 hour
    if user:
        memcache.set(cache_key, user, expire=3600)
    
    return user
```

#### Session Storage (Flask)

```python
from flask import Flask, session
from flask_session import Session
import pymemcache

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'memcached'
app.config['SESSION_MEMCACHED'] = pymemcache.Client(('localhost', 11211))
Session(app)

@app.route('/login')
def login():
    session['user_id'] = 123
    session['username'] = 'john'
    return 'Logged in'

@app.route('/profile')
def profile():
    user_id = session.get('user_id')
    return f'User ID: {user_id}'
```

#### API Response Caching

```python
import pymemcache
import requests
import hashlib
import json

memcache = pymemcache.Client(('localhost', 11211))

def cached_api_call(url, params=None, expire=300):
    # Create cache key from URL and params
    cache_key = hashlib.md5(
        f"{url}:{json.dumps(params)}".encode()
    ).hexdigest()
    
    # Check cache
    cached = memcache.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # Make API call
    response = requests.get(url, params=params)
    data = response.json()
    
    # Cache response
    memcache.set(cache_key, json.dumps(data), expire=expire)
    
    return data

# Usage
data = cached_api_call('https://api.example.com/users', {'limit': 10})
```

#### Rate Limiting

```python
import pymemcache
from datetime import datetime

memcache = pymemcache.Client(('localhost', 11211))

def rate_limit(user_id, limit=100, window=60):
    """
    Rate limiting: max 'limit' requests per 'window' seconds
    """
    key = f"rate_limit:{user_id}:{datetime.now().minute}"
    
    # Increment counter
    try:
        count = memcache.incr(key, 1)
    except:
        # Key doesn't exist, create it
        memcache.set(key, 1, expire=window)
        count = 1
    
    if count > limit:
        return False  # Rate limit exceeded
    
    return True  # Request allowed

# Usage
if rate_limit(user_id=123):
    # Process request
    pass
else:
    # Return error
    pass
```

#### Distributed Locking

```python
import pymemcache
import time
import uuid

memcache = pymemcache.Client(('localhost', 11211))

class DistributedLock:
    def __init__(self, lock_name, timeout=10):
        self.lock_name = f"lock:{lock_name}"
        self.timeout = timeout
        self.token = str(uuid.uuid4())
    
    def acquire(self):
        """Try to acquire lock"""
        return memcache.add(self.lock_name, self.token, expire=self.timeout)
    
    def release(self):
        """Release lock"""
        # Only delete if we own the lock
        current = memcache.get(self.lock_name)
        if current == self.token:
            memcache.delete(self.lock_name)

# Usage
lock = DistributedLock('critical_section')

if lock.acquire():
    try:
        # Critical section
        print("Doing work...")
        time.sleep(2)
    finally:
        lock.release()
else:
    print("Could not acquire lock")
```

### Multiple Memcached Servers (Sharding)

```python
from pymemcache.client.hash import HashClient

# Define server pool
servers = [
    ('server1', 11211),
    ('server2', 11211),
    ('server3', 11211)
]

# Create hash client (consistent hashing)
client = HashClient(servers)

# Use normally - keys are automatically distributed
client.set('key1', 'value1')
client.set('key2', 'value2')
client.set('key3', 'value3')

# Get from appropriate server
value = client.get('key1')
```

### Monitoring and Maintenance

```python
# Get detailed stats
stats = memcache.stats()

# Important metrics to monitor:
print(f"Hit Rate: {stats['get_hits'] / (stats['get_hits'] + stats['get_misses']) * 100}%")
print(f"Memory Used: {stats['bytes']} bytes")
print(f"Current Items: {stats['curr_items']}")
print(f"Evictions: {stats['evictions']}")

# Flush all data (use with caution!)
memcache.flush_all()
```

---

## Best Practices

### Memory Management

1. **Right-size Memory**: Allocate enough memory to avoid evictions
2. **Monitor Evictions**: High evictions = need more memory
3. **Appropriate TTLs**: Set realistic expiration times
4. **Avoid Large Objects**: Keep values under 1MB

### Key Design

1. **Namespacing**: Use prefixes (e.g., `user:123`, `post:456`)
2. **Avoid Hot Keys**: Distribute load across multiple keys
3. **Key Length**: Keep keys short but meaningful
4. **Consistent Naming**: Use standard naming conventions

### Performance

1. **Connection Pooling**: Reuse connections
2. **Batch Operations**: Use `get_many`, `set_many`
3. **Binary Protocol**: Use for better performance
4. **Local Caching**: Implement client-side cache

### Security

1. **Network Isolation**: Don't expose to public internet
2. **Firewall Rules**: Restrict access to trusted IPs
3. **VPN/Private Network**: Use for inter-server communication
4. **SASL Authentication**: Enable authentication if needed

---

## Troubleshooting

### Common Issues

**High Evictions:**
```bash
# Check stats
echo "stats" | nc localhost 11211 | grep evictions

# Solution: Increase memory or reduce TTL
memcached -m 512  # Increase to 512MB
```

**Connection Refused:**
```bash
# Check if running
sudo systemctl status memcached

# Check firewall
sudo ufw status

# Check listening port
netstat -tulpn | grep 11211
```

**Slow Performance:**
```bash
# Check hit rate
echo "stats" | nc localhost 11211 | grep -E "get_hits|get_misses"

# Monitor connections
echo "stats" | nc localhost 11211 | grep curr_connections

# Increase max connections if needed
memcached -c 2048
```

**Memory Leak:**
```bash
# Check memory usage
echo "stats" | nc localhost 11211 | grep bytes

# Flush if needed (WARNING: deletes all data)
echo "flush_all" | nc localhost 11211
```

---

## Resources

### Official Documentation
- [Memcached Website](https://memcached.org/)
- [Memcached Wiki](https://github.com/memcached/memcached/wiki)
- [Protocol Documentation](https://github.com/memcached/memcached/blob/master/doc/protocol.txt)

### Client Libraries
- [Python - pymemcache](https://github.com/pinterest/pymemcache)
- [PHP - Memcached](https://www.php.net/manual/en/book.memcached.php)
- [Node.js - node-memcached](https://github.com/3rd-Eden/memcached)
- [Java - spymemcached](https://github.com/couchbase/spymemcached)

### Tools
- [memcached-tool](https://github.com/memcached/memcached/blob/master/scripts/memcached-tool) - Stats and management
- [libmemcached-tools](https://libmemcached.org/) - Command-line tools
- [mc-monitor](https://github.com/jkruis/mc-monitor) - Monitoring tool

### Tutorials
- [Memcached Tutorial](https://www.tutorialspoint.com/memcached/index.htm)
- [DigitalOcean Guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-memcached-on-ubuntu-20-04)

### Community
- [GitHub Repository](https://github.com/memcached/memcached)
- [Google Group](https://groups.google.com/g/memcached)

---

*Last Updated: January 2026*
