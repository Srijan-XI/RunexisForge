# Redis Streams

## Introduction

### What is Redis Streams?

Redis Streams is a data structure that acts as an append-only log, providing a powerful solution for building real-time data pipelines, event sourcing systems, and message brokers. Introduced in Redis 5.0, it offers both streaming and message queue capabilities with consumer groups and persistence.

### Why Redis Streams?

- **Append-only log**: Immutable event history
- **Consumer groups**: Multiple consumers with load balancing
- **Persistence**: Data survives restarts
- **Fast**: In-memory performance
- **Acknowledgments**: Track message processing
- **Time-based retrieval**: Query by timestamp
- **Fan-out**: Multiple consumer groups per stream
- **Blocking reads**: Efficient message waiting
- **Simple**: Familiar Redis commands

### Key Features

- **XADD**: Add entries to stream
- **XREAD**: Read messages
- **XGROUP**: Consumer groups
- **XACK**: Acknowledge messages
- **XPENDING**: Track pending messages
- **XCLAIM**: Reclaim abandoned messages
- **XINFO**: Stream metadata
- **Trimming**: Automatic stream size management
- **Range queries**: Read by ID or time

## Prerequisites

- Redis 5.0 or later
- Redis client library for your language
- Basic Redis knowledge

## Installation

### Docker

```bash
# Redis with Streams support
docker run -d --name redis -p 6379:6379 redis:latest

# Redis Stack (includes RedisInsight)
docker run -d --name redis-stack \
  -p 6379:6379 \
  -p 8001:8001 \
  redis/redis-stack:latest
```

### Linux Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install redis-server

# Start Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Verify
redis-cli ping
```

### macOS (Homebrew)

```bash
# Install
brew install redis

# Start
brew services start redis

# Verify
redis-cli ping
```

### Windows

```powershell
# Download from https://github.com/microsoftarchive/redis/releases
# Or use WSL2 with Linux installation
```

## Python - Basic Operations

### Installation

```bash
pip install redis
```

### Adding Entries (XADD)

```python
import redis
import json
import time

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Add entry to stream
# XADD returns auto-generated ID: timestamp-sequence
message_id = r.xadd(
    'orders',
    {
        'order_id': '12345',
        'product': 'Laptop',
        'quantity': '1',
        'price': '999.99'
    }
)

print(f"Added message: {message_id}")

# Add with specific ID (use carefully)
custom_id = r.xadd(
    'orders',
    {'order_id': '12346', 'product': 'Mouse'},
    id='1234567890000-0'
)

# Add with MAXLEN (trim stream)
r.xadd(
    'orders',
    {'order_id': '12347', 'product': 'Keyboard'},
    maxlen=1000,  # Keep only last 1000 entries
    approximate=True  # More efficient trimming
)
```

### Reading Entries (XREAD)

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Read from beginning
messages = r.xread({'orders': '0'}, count=10)

for stream_name, stream_messages in messages:
    for message_id, data in stream_messages:
        print(f"ID: {message_id}")
        print(f"Data: {data}")
        print()

# Read new messages only
messages = r.xread({'orders': '$'})

# Blocking read (wait for new messages)
messages = r.xread(
    {'orders': '$'},
    block=5000  # Block for 5 seconds
)

# Read from specific ID
messages = r.xread(
    {'orders': '1234567890000-0'},
    count=5
)
```

### Range Queries (XRANGE)

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Read all messages
messages = r.xrange('orders', min='-', max='+')

for message_id, data in messages:
    print(f"{message_id}: {data}")

# Read specific range
messages = r.xrange(
    'orders',
    min='1234567890000-0',
    max='1234567999999-0',
    count=100
)

# Read last 10 messages
messages = r.xrevrange('orders', max='+', min='-', count=10)
```

## Consumer Groups

### Create Consumer Group

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Create consumer group
try:
    r.xgroup_create(
        'orders',
        'order-processors',
        id='0',  # Start from beginning, use '$' for new messages only
        mkstream=True  # Create stream if doesn't exist
    )
    print("Consumer group created")
except redis.ResponseError as e:
    print(f"Group already exists: {e}")
```

### Consumer Group Reading (XREADGROUP)

```python
import redis
import time

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

consumer_name = 'worker-1'
group_name = 'order-processors'

# Read messages as consumer
while True:
    messages = r.xreadgroup(
        groupname=group_name,
        consumername=consumer_name,
        streams={'orders': '>'},  # '>' means new undelivered messages
        count=1,
        block=2000  # Block for 2 seconds
    )
    
    if not messages:
        print("No messages")
        continue
    
    for stream_name, stream_messages in messages:
        for message_id, data in stream_messages:
            print(f"Processing {message_id}: {data}")
            
            # Process message
            order_id = data.get('order_id')
            print(f"Processing order {order_id}")
            
            # Acknowledge message
            r.xack('orders', group_name, message_id)
            print(f"Acknowledged {message_id}")
```

### Multiple Consumers (Load Balancing)

```python
import redis
import threading
import time

def consumer_worker(worker_id):
    r = redis.Redis(host='localhost', port=6379, decode_responses=True)
    group_name = 'order-processors'
    consumer_name = f'worker-{worker_id}'
    
    while True:
        messages = r.xreadgroup(
            groupname=group_name,
            consumername=consumer_name,
            streams={'orders': '>'},
            count=1,
            block=2000
        )
        
        if messages:
            for stream_name, stream_messages in messages:
                for message_id, data in stream_messages:
                    print(f"[Worker {worker_id}] Processing {message_id}")
                    time.sleep(1)  # Simulate work
                    r.xack('orders', group_name, message_id)
                    print(f"[Worker {worker_id}] Done")

# Start 3 consumers
threads = []
for i in range(3):
    t = threading.Thread(target=consumer_worker, args=(i+1,))
    t.daemon = True
    t.start()
    threads.append(t)

# Keep running
time.sleep(30)
```

### Pending Messages (XPENDING)

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Get pending message summary
pending = r.xpending('orders', 'order-processors')
print(f"Pending messages: {pending}")

# Get detailed pending info
pending_details = r.xpending_range(
    'orders',
    'order-processors',
    min='-',
    max='+',
    count=10
)

for message_info in pending_details:
    print(f"Message ID: {message_info['message_id']}")
    print(f"Consumer: {message_info['consumer']}")
    print(f"Time since delivered: {message_info['time_since_delivered']} ms")
    print(f"Delivery count: {message_info['times_delivered']}")
    print()
```

### Claiming Messages (XCLAIM)

```python
import redis
import time

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Claim messages that have been pending too long
min_idle_time = 60000  # 60 seconds in milliseconds

# Get pending messages
pending = r.xpending_range(
    'orders',
    'order-processors',
    min='-',
    max='+',
    count=100
)

for msg in pending:
    if msg['time_since_delivered'] > min_idle_time:
        # Claim the message
        claimed = r.xclaim(
            'orders',
            'order-processors',
            'recovery-worker',
            min_idle_time,
            [msg['message_id']]
        )
        
        if claimed:
            message_id, data = claimed[0]
            print(f"Claimed: {message_id}")
            
            # Process and acknowledge
            # ... processing logic ...
            r.xack('orders', 'order-processors', message_id)
```

## Node.js Examples

### Installation

```bash
npm install redis
```

### Producer

```javascript
const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

client.on('error', (err) => console.error('Redis error:', err));

async function main() {
  await client.connect();
  
  // Add entries
  for (let i = 0; i < 5; i++) {
    const messageId = await client.xAdd('orders', '*', {
      order_id: `ORD-${i}`,
      product: 'Laptop',
      quantity: '1'
    });
    
    console.log(`Added: ${messageId}`);
  }
  
  await client.disconnect();
}

main();
```

### Consumer with Consumer Group

```javascript
const redis = require('redis');

const client = redis.createClient();

async function consumer(workerName) {
  await client.connect();
  
  const groupName = 'order-processors';
  
  // Create consumer group
  try {
    await client.xGroupCreate('orders', groupName, '0', {
      MKSTREAM: true
    });
  } catch (err) {
    console.log('Group exists');
  }
  
  console.log(`[${workerName}] Waiting for messages...`);
  
  while (true) {
    // Read messages
    const messages = await client.xReadGroup(
      groupName,
      workerName,
      {key: 'orders', id: '>'},
      {COUNT: 1, BLOCK: 2000}
    );
    
    if (!messages) {
      continue;
    }
    
    for (const stream of messages) {
      for (const message of stream.messages) {
        console.log(`[${workerName}] Processing:`, message);
        
        // Acknowledge
        await client.xAck('orders', groupName, message.id);
        console.log(`[${workerName}] Acknowledged`);
      }
    }
  }
}

consumer('worker-1');
```

## Java Example

```java
import redis.clients.jedis.Jedis;
import redis.clients.jedis.StreamEntryID;
import redis.clients.jedis.resps.StreamEntry;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RedisStreamsExample {
    
    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost", 6379);
        
        // Producer
        Map<String, String> message = new HashMap<>();
        message.put("order_id", "12345");
        message.put("product", "Laptop");
        message.put("quantity", "1");
        
        StreamEntryID id = jedis.xadd("orders", StreamEntryID.NEW_ENTRY, message);
        System.out.println("Added: " + id);
        
        // Consumer
        List<StreamEntry> entries = jedis.xrange("orders", "-", "+", 10);
        for (StreamEntry entry : entries) {
            System.out.println("ID: " + entry.getID());
            System.out.println("Fields: " + entry.getFields());
        }
        
        jedis.close();
    }
}
```

## Advanced Features

### Auto-trimming with MAXLEN

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Trim to exact length
r.xadd('events', {'event': 'user_login'}, maxlen=10000)

# Approximate trimming (more efficient)
r.xadd('events', {'event': 'user_logout'}, maxlen=10000, approximate=True)

# Trim by minimum ID
r.xtrim('events', minid='1234567890000-0')

# Manual trim
r.xtrim('events', maxlen=5000)
```

### Stream Information (XINFO)

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Stream info
info = r.xinfo_stream('orders')
print(f"Length: {info['length']}")
print(f"First entry: {info['first-entry']}")
print(f"Last entry: {info['last-entry']}")
print(f"Groups: {info['groups']}")

# Consumer group info
groups = r.xinfo_groups('orders')
for group in groups:
    print(f"Group: {group['name']}")
    print(f"Consumers: {group['consumers']}")
    print(f"Pending: {group['pending']}")

# Consumer info
consumers = r.xinfo_consumers('orders', 'order-processors')
for consumer in consumers:
    print(f"Consumer: {consumer['name']}")
    print(f"Pending: {consumer['pending']}")
```

### Dead Letter Queue Pattern

```python
import redis
import time

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

MAX_RETRIES = 3
DLQ_STREAM = 'orders:dlq'

def process_with_dlq():
    group = 'order-processors'
    consumer = 'worker-1'
    
    while True:
        messages = r.xreadgroup(
            groupname=group,
            consumername=consumer,
            streams={'orders': '>'},
            count=1,
            block=2000
        )
        
        if not messages:
            continue
        
        for stream_name, stream_messages in messages:
            for message_id, data in stream_messages:
                # Check delivery count
                pending = r.xpending_range(
                    'orders',
                    group,
                    min=message_id,
                    max=message_id,
                    count=1
                )
                
                if pending and pending[0]['times_delivered'] >= MAX_RETRIES:
                    # Move to DLQ
                    r.xadd(DLQ_STREAM, data)
                    r.xack('orders', group, message_id)
                    print(f"Moved to DLQ: {message_id}")
                    continue
                
                try:
                    # Process message
                    print(f"Processing: {message_id}")
                    process_order(data)
                    r.xack('orders', group, message_id)
                except Exception as e:
                    print(f"Error: {e}")
                    # Message will be redelivered

def process_order(data):
    # Simulate processing
    if data.get('product') == 'FAIL':
        raise Exception("Processing failed")
    time.sleep(0.1)

process_with_dlq()
```

## Best Practices

### 1. Use Consumer Groups for Reliability

```python
# Create consumer group starting from beginning
r.xgroup_create('orders', 'processors', id='0', mkstream=True)

# Always acknowledge messages
r.xack('orders', 'processors', message_id)
```

### 2. Handle Pending Messages

```python
# Regularly check and reclaim pending messages
def reclaim_abandoned():
    pending = r.xpending_range('orders', 'processors', '-', '+', 100)
    
    for msg in pending:
        if msg['time_since_delivered'] > 300000:  # 5 minutes
            r.xclaim('orders', 'processors', 'recovery-worker', 
                    300000, [msg['message_id']])
```

### 3. Implement Stream Trimming

```python
# Trim by time (keep last 7 days)
import time
cutoff_time = int((time.time() - 7 * 24 * 3600) * 1000)
r.xtrim('orders', minid=f'{cutoff_time}-0')

# Or by size
r.xtrim('orders', maxlen=1000000, approximate=True)
```

### 4. Use Blocking Reads

```python
# More efficient than polling
messages = r.xreadgroup(
    groupname='processors',
    consumername='worker-1',
    streams={'orders': '>'},
    block=5000  # Block up to 5 seconds
)
```

### 5. Monitor Stream Health

```python
def monitor_stream():
    info = r.xinfo_stream('orders')
    pending = r.xpending('orders', 'processors')
    
    if pending['pending'] > 1000:
        print("WARNING: Too many pending messages!")
    
    if info['length'] > 1000000:
        print("WARNING: Stream too large!")
```

## Monitoring

### Redis CLI

```bash
# Stream length
redis-cli XLEN orders

# Stream info
redis-cli XINFO STREAM orders

# Consumer groups
redis-cli XINFO GROUPS orders

# Consumers
redis-cli XINFO CONSUMERS orders order-processors

# Pending messages
redis-cli XPENDING orders order-processors

# Read messages
redis-cli XRANGE orders - + COUNT 10
```

### Python Monitoring

```python
def print_stream_stats(stream_name):
    info = r.xinfo_stream(stream_name)
    
    print(f"=== {stream_name} ===")
    print(f"Length: {info['length']}")
    print(f"Radix tree keys: {info['radix-tree-keys']}")
    print(f"Radix tree nodes: {info['radix-tree-nodes']}")
    print(f"Groups: {info['groups']}")
    
    # Consumer groups
    groups = r.xinfo_groups(stream_name)
    for group in groups:
        print(f"\nGroup: {group['name']}")
        print(f"  Pending: {group['pending']}")
        print(f"  Consumers: {group['consumers']}")
        
        # Consumers in group
        consumers = r.xinfo_consumers(stream_name, group['name'])
        for consumer in consumers:
            print(f"    {consumer['name']}: {consumer['pending']} pending")
```

## Troubleshooting

### Messages Not Being Consumed

```python
# Check if consumer group exists
groups = r.xinfo_groups('orders')
print(f"Groups: {[g['name'] for g in groups]}")

# Check for pending messages
pending = r.xpending('orders', 'processors')
print(f"Pending: {pending}")

# Check stream length
length = r.xlen('orders')
print(f"Stream length: {length}")
```

### Memory Issues

```bash
# Check Redis memory
redis-cli INFO memory

# Enable trimming
redis-cli XTRIM orders MAXLEN ~ 100000

# Set maxmemory policy in redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru
```

### Stuck Messages

```python
# Find old pending messages
pending = r.xpending_range('orders', 'processors', '-', '+', 100)

for msg in pending:
    age_ms = msg['time_since_delivered']
    if age_ms > 600000:  # 10 minutes
        print(f"Stuck message: {msg['message_id']}")
        print(f"Consumer: {msg['consumer']}")
        print(f"Age: {age_ms / 1000} seconds")
```

## Resources

- [Redis Streams Documentation](https://redis.io/docs/data-types/streams/)
- [redis-py Documentation](https://redis-py.readthedocs.io/)
- [Redis Streams Tutorial](https://redis.io/docs/data-types/streams-tutorial/)
- [Redis Stack](https://redis.io/docs/stack/)

## Next Steps

- Install Redis
- Basic XADD/XREAD
- Consumer groups
- Acknowledgments
- Pending message handling
- Stream trimming
- Monitoring
- Production deployment
