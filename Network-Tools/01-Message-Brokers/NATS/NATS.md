# NATS

## Introduction

### What is NATS?

NATS is a simple, secure, and high-performance open-source messaging system for cloud-native applications, IoT messaging, and microservices architectures. It provides both traditional messaging patterns and modern streaming capabilities through NATS JetStream.

### Why NATS?

- **Lightweight**: Small memory and CPU footprint
- **High performance**: Millions of messages per second
- **Simple**: Easy to deploy and use
- **Secure**: TLS encryption and authentication
- **Resilient**: Automatic reconnection
- **Cloud-native**: Built for distributed systems
- **Multi-language**: Clients for 40+ languages
- **JetStream**: Built-in persistence and streaming

### Key Features

- **Publish/Subscribe**: Basic messaging pattern
- **Request/Reply**: Synchronous communication
- **Queue Groups**: Load balancing
- **Wildcards**: Flexible subject matching
- **JetStream**: Persistence and replay
- **Key-Value Store**: Distributed KV storage
- **Object Store**: Distributed object storage
- **Leaf Nodes**: Hub-and-spoke topology
- **Clustering**: High availability

## Prerequisites

- NATS server installed
- Client library for your language
- Basic understanding of pub/sub messaging

## Installation

### Docker

```bash
# Core NATS (no persistence)
docker run -d --name nats -p 4222:4222 -p 8222:8222 nats:latest

# NATS with JetStream enabled
docker run -d --name nats-js \
  -p 4222:4222 \
  -p 8222:8222 \
  -p 6222:6222 \
  nats:latest -js

# With monitoring
docker run -d --name nats-js \
  -p 4222:4222 \
  -p 8222:8222 \
  nats:latest -js -m 8222
```

### Linux Installation

```bash
# Download NATS server
curl -L https://github.com/nats-io/nats-server/releases/download/v2.10.7/nats-server-v2.10.7-linux-amd64.zip -o nats-server.zip

# Extract
unzip nats-server.zip

# Run
./nats-server-v2.10.7-linux-amd64/nats-server -js
```

### macOS (Homebrew)

```bash
# Install
brew install nats-server

# Run with JetStream
nats-server -js
```

### Windows

```powershell
# Download from https://github.com/nats-io/nats-server/releases
# Extract and run
.\nats-server.exe -js
```

### NATS CLI

```bash
# Install NATS CLI
curl -L https://github.com/nats-io/natscli/releases/download/v0.1.1/nats-0.1.1-linux-amd64.zip -o nats-cli.zip
unzip nats-cli.zip

# Or with Homebrew
brew install nats-io/nats-tools/nats

# Test connection
nats context select
```

## Python - Core NATS

### Installation

```bash
pip install nats-py
```

### Basic Publisher

```python
import asyncio
from nats.aio.client import Client as NATS

async def main():
    # Create connection
    nc = NATS()
    
    # Connect to NATS server
    await nc.connect("nats://localhost:4222")
    
    # Publish message
    await nc.publish("updates", b"Hello, NATS!")
    
    print("Message published")
    
    # Close connection
    await nc.close()

if __name__ == '__main__':
    asyncio.run(main())
```

### Basic Subscriber

```python
import asyncio
from nats.aio.client import Client as NATS

async def main():
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    # Message handler
    async def message_handler(msg):
        subject = msg.subject
        data = msg.data.decode()
        print(f"Received on '{subject}': {data}")
    
    # Subscribe
    await nc.subscribe("updates", cb=message_handler)
    
    print("Subscribed to 'updates'. Waiting for messages...")
    
    # Keep running
    try:
        await asyncio.sleep(60)
    finally:
        await nc.close()

if __name__ == '__main__':
    asyncio.run(main())
```

### Request/Reply Pattern

```python
import asyncio
from nats.aio.client import Client as NATS

# Responder
async def responder():
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    async def request_handler(msg):
        # Process request
        request_data = msg.data.decode()
        print(f"Received request: {request_data}")
        
        # Send response
        response = f"Processed: {request_data}"
        await nc.publish(msg.reply, response.encode())
    
    # Subscribe to requests
    await nc.subscribe("help", cb=request_handler)
    print("Responder ready. Waiting for requests...")
    
    await asyncio.sleep(60)
    await nc.close()

# Requester
async def requester():
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    # Send request and wait for response
    response = await nc.request("help", b"Need assistance", timeout=1.0)
    print(f"Response: {response.data.decode()}")
    
    await nc.close()

# Run both
async def main():
    # Start responder in background
    asyncio.create_task(responder())
    
    # Wait a bit for responder to start
    await asyncio.sleep(0.5)
    
    # Send request
    await requester()
    
    await asyncio.sleep(2)

if __name__ == '__main__':
    asyncio.run(main())
```

### Queue Groups (Load Balancing)

```python
import asyncio
from nats.aio.client import Client as NATS

async def worker(name):
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    async def message_handler(msg):
        print(f"[Worker {name}] Processing: {msg.data.decode()}")
        await asyncio.sleep(1)  # Simulate work
        print(f"[Worker {name}] Done")
    
    # Subscribe to queue group
    # Messages are load-balanced across workers in the same group
    await nc.subscribe("tasks", queue="workers", cb=message_handler)
    
    print(f"Worker {name} ready")
    await asyncio.sleep(30)
    await nc.close()

async def publisher():
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    # Publish 10 tasks
    for i in range(10):
        await nc.publish("tasks", f"Task {i}".encode())
        print(f"Published Task {i}")
        await asyncio.sleep(0.1)
    
    await nc.close()

async def main():
    # Start 3 workers
    asyncio.create_task(worker("A"))
    asyncio.create_task(worker("B"))
    asyncio.create_task(worker("C"))
    
    await asyncio.sleep(1)
    
    # Publish tasks
    await publisher()
    
    await asyncio.sleep(10)

if __name__ == '__main__':
    asyncio.run(main())
```

### Wildcards

```python
import asyncio
from nats.aio.client import Client as NATS

async def main():
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    async def handler(msg):
        print(f"Received on '{msg.subject}': {msg.data.decode()}")
    
    # Subscribe with wildcards
    # * matches one token
    # > matches one or more tokens
    
    # Match: time.us.east, time.us.west
    await nc.subscribe("time.us.*", cb=handler)
    
    # Match: time.us.east, time.us.west.atlanta
    await nc.subscribe("time.us.>", cb=handler)
    
    # Match: time.eu.london
    await nc.subscribe("time.*.london", cb=handler)
    
    # Publish test messages
    await nc.publish("time.us.east", b"12:00")
    await nc.publish("time.us.west", b"09:00")
    await nc.publish("time.eu.london", b"17:00")
    await nc.publish("time.us.west.atlanta", b"12:00")
    
    await asyncio.sleep(1)
    await nc.close()

if __name__ == '__main__':
    asyncio.run(main())
```

## Python - JetStream

### JetStream Publisher

```python
import asyncio
from nats.aio.client import Client as NATS
import json

async def main():
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    # Create JetStream context
    js = nc.jetstream()
    
    # Create stream (if not exists)
    try:
        await js.add_stream(
            name="ORDERS",
            subjects=["orders.>"],
            retention="limits",  # or "interest", "workqueue"
            max_age=24 * 3600,   # 24 hours in seconds
            storage="file"       # or "memory"
        )
    except Exception as e:
        print(f"Stream exists or error: {e}")
    
    # Publish messages
    for i in range(5):
        data = json.dumps({
            "order_id": f"ORD-{i}",
            "product": "Laptop",
            "quantity": 1
        }).encode()
        
        # Publish and get ack
        ack = await js.publish("orders.created", data)
        print(f"Published order {i}, stream sequence: {ack.seq}")
    
    await nc.close()

if __name__ == '__main__':
    asyncio.run(main())
```

### JetStream Consumer

```python
import asyncio
from nats.aio.client import Client as NATS
import json

async def main():
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    js = nc.jetstream()
    
    # Create durable consumer
    try:
        await js.add_consumer(
            stream="ORDERS",
            durable_name="order-processor",
            ack_policy="explicit",
            deliver_policy="all",  # or "new", "last", "by_start_sequence"
            max_deliver=3
        )
    except Exception as e:
        print(f"Consumer exists or error: {e}")
    
    # Subscribe
    psub = await js.pull_subscribe(
        "orders.>",
        durable="order-processor"
    )
    
    print("Waiting for messages...")
    
    # Process messages
    for _ in range(10):
        try:
            msgs = await psub.fetch(1, timeout=1)
            for msg in msgs:
                data = json.loads(msg.data.decode())
                print(f"Processing order: {data}")
                
                # Acknowledge
                await msg.ack()
        except Exception as e:
            print(f"No messages or error: {e}")
            break
    
    await nc.close()

if __name__ == '__main__':
    asyncio.run(main())
```

### Push Consumer

```python
import asyncio
from nats.aio.client import Client as NATS

async def main():
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    js = nc.jetstream()
    
    async def message_handler(msg):
        print(f"Received: {msg.data.decode()}")
        await msg.ack()
    
    # Subscribe with push consumer
    await js.subscribe(
        "orders.>",
        cb=message_handler,
        durable="order-push-processor",
        stream="ORDERS"
    )
    
    print("Subscribed. Waiting for messages...")
    await asyncio.sleep(30)
    await nc.close()

if __name__ == '__main__':
    asyncio.run(main())
```

## Node.js Examples

### Installation

```bash
npm install nats
```

### Basic Pub/Sub

```javascript
const {connect, StringCodec} = require('nats');

const sc = StringCodec();

async function main() {
  // Connect
  const nc = await connect({servers: 'nats://localhost:4222'});
  
  // Subscribe
  const sub = nc.subscribe('updates');
  (async () => {
    for await (const msg of sub) {
      console.log(`Received: ${sc.decode(msg.data)}`);
    }
  })();
  
  // Publish
  nc.publish('updates', sc.encode('Hello NATS!'));
  
  // Wait then close
  await new Promise(resolve => setTimeout(resolve, 1000));
  await nc.close();
}

main();
```

### Request/Reply

```javascript
const {connect, StringCodec} = require('nats');

const sc = StringCodec();

async function main() {
  const nc = await connect({servers: 'nats://localhost:4222'});
  
  // Responder
  const sub = nc.subscribe('help');
  (async () => {
    for await (const msg of sub) {
      console.log(`Request: ${sc.decode(msg.data)}`);
      msg.respond(sc.encode('Here to help!'));
    }
  })();
  
  // Requester
  const response = await nc.request('help', sc.encode('Need assistance'));
  console.log(`Response: ${sc.decode(response.data)}`);
  
  await nc.close();
}

main();
```

### JetStream

```javascript
const {connect, StringCodec, AckPolicy} = require('nats');

const sc = StringCodec();

async function main() {
  const nc = await connect({servers: 'nats://localhost:4222'});
  const js = nc.jetstream();
  
  // Create stream
  const jsm = await nc.jetstreamManager();
  try {
    await jsm.streams.add({
      name: 'EVENTS',
      subjects: ['events.>']
    });
  } catch (err) {
    console.log('Stream exists');
  }
  
  // Publish
  const ack = await js.publish('events.user.login', sc.encode('User logged in'));
  console.log(`Published, seq: ${ack.seq}`);
  
  // Consumer
  const consumer = await js.consumers.get('EVENTS', 'event-processor');
  const messages = await consumer.consume();
  
  for await (const msg of messages) {
    console.log(`Received: ${sc.decode(msg.data)}`);
    msg.ack();
    break;
  }
  
  await nc.close();
}

main();
```

## Go Example

```go
package main

import (
    "fmt"
    "log"
    "time"
    
    "github.com/nats-io/nats.go"
)

func main() {
    // Connect
    nc, err := nats.Connect("nats://localhost:4222")
    if err != nil {
        log.Fatal(err)
    }
    defer nc.Close()
    
    // Subscribe
    nc.Subscribe("updates", func(msg *nats.Msg) {
        fmt.Printf("Received: %s\n", string(msg.Data))
    })
    
    // Publish
    nc.Publish("updates", []byte("Hello from Go!"))
    
    // Request/Reply
    response, err := nc.Request("help", []byte("Need help"), time.Second)
    if err != nil {
        log.Println(err)
    } else {
        fmt.Printf("Response: %s\n", string(response.Data))
    }
    
    time.Sleep(time.Second)
}
```

## Key-Value Store (JetStream)

### Python KV Example

```python
import asyncio
from nats.aio.client import Client as NATS

async def main():
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    js = nc.jetstream()
    
    # Create KV bucket
    kv = await js.create_key_value(bucket="myconfig")
    
    # Put values
    await kv.put("database.host", b"localhost")
    await kv.put("database.port", b"5432")
    await kv.put("database.name", b"myapp")
    
    # Get value
    entry = await kv.get("database.host")
    print(f"Host: {entry.value.decode()}")
    
    # Update
    await kv.put("database.host", b"prod-db-01")
    
    # Delete
    await kv.delete("database.name")
    
    # List keys
    keys = await kv.keys()
    print(f"Keys: {keys}")
    
    # Watch for changes
    watcher = await kv.watch("database.>")
    async for entry in watcher:
        if entry:
            print(f"Change: {entry.key} = {entry.value.decode()}")
    
    await nc.close()

if __name__ == '__main__':
    asyncio.run(main())
```

## Object Store (JetStream)

### Python Object Store

```python
import asyncio
from nats.aio.client import Client as NATS

async def main():
    nc = NATS()
    await nc.connect("nats://localhost:4222")
    
    js = nc.jetstream()
    
    # Create object store
    obj_store = await js.create_object_store(bucket="myfiles")
    
    # Put object
    data = b"This is my file content"
    await obj_store.put("myfile.txt", data)
    
    # Get object
    result = await obj_store.get("myfile.txt")
    print(f"Content: {result.data.decode()}")
    
    # List objects
    objects = await obj_store.list()
    for obj in objects:
        print(f"Object: {obj.name}, Size: {obj.size}")
    
    # Delete object
    await obj_store.delete("myfile.txt")
    
    await nc.close()

if __name__ == '__main__':
    asyncio.run(main())
```

## Configuration

### Server Configuration File

```conf
# nats-server.conf

# Client port
port: 4222

# HTTP monitoring port
http_port: 8222

# Clustering port
cluster {
  port: 6222
}

# JetStream
jetstream {
  store_dir: "/data/jetstream"
  max_memory_store: 1GB
  max_file_store: 10GB
}

# Authentication
authorization {
  users = [
    {user: "admin", password: "secret"}
  ]
}

# TLS
tls {
  cert_file: "/path/to/cert.pem"
  key_file: "/path/to/key.pem"
}

# Logging
log_file: "/var/log/nats-server.log"
debug: false
trace: false
```

### Run with Config

```bash
nats-server -c nats-server.conf
```

## Clustering

### Cluster Configuration

```conf
# Node 1: node1.conf
port: 4222
cluster {
  name: my-cluster
  listen: localhost:6222
  routes: [
    nats://localhost:6222
    nats://localhost:6223
    nats://localhost:6224
  ]
}

# Node 2: node2.conf
port: 4223
cluster {
  name: my-cluster
  listen: localhost:6223
  routes: [
    nats://localhost:6222
    nats://localhost:6223
    nats://localhost:6224
  ]
}

# Node 3: node3.conf
port: 4224
cluster {
  name: my-cluster
  listen: localhost:6224
  routes: [
    nats://localhost:6222
    nats://localhost:6223
    nats://localhost:6224
  ]
}
```

### Start Cluster

```bash
# Terminal 1
nats-server -c node1.conf

# Terminal 2
nats-server -c node2.conf

# Terminal 3
nats-server -c node3.conf
```

## Monitoring

### HTTP Monitoring

```bash
# Access monitoring endpoint
curl http://localhost:8222/varz

# Connection info
curl http://localhost:8222/connz

# Subscription info
curl http://localhost:8222/subsz

# JetStream info
curl http://localhost:8222/jsz
```

### NATS CLI Monitoring

```bash
# Server info
nats server info

# List streams
nats stream ls

# Stream info
nats stream info ORDERS

# List consumers
nats consumer ls ORDERS

# Server ping
nats server ping
```

## Best Practices

### 1. Use Appropriate Delivery Semantics

```python
# At-most-once: Core NATS (fast, no persistence)
# At-least-once: JetStream with ack
# Exactly-once: Application-level deduplication
```

### 2. Handle Reconnections

```python
async def disconnected_cb():
    print("Disconnected from NATS")

async def reconnected_cb():
    print("Reconnected to NATS")

nc = await NATS().connect(
    "nats://localhost:4222",
    disconnected_cb=disconnected_cb,
    reconnected_cb=reconnected_cb,
    max_reconnect_attempts=-1  # Infinite
)
```

### 3. Use Durable Consumers for Reliability

```python
# Durable consumer survives client restarts
await js.add_consumer(
    stream="ORDERS",
    durable_name="order-processor"
)
```

### 4. Set Max Deliver for Failed Messages

```python
await js.add_consumer(
    stream="ORDERS",
    durable_name="processor",
    max_deliver=3  # Retry up to 3 times
)
```

### 5. Use Subjects Wisely

```python
# Good: Hierarchical subjects
"orders.created.electronics"
"orders.shipped.books"

# Bad: Flat subjects
"order_created_electronics"
```

## Troubleshooting

### Connection Issues

```python
# Add timeout and error handling
try:
    nc = await NATS().connect(
        servers=["nats://localhost:4222"],
        connect_timeout=5,
        max_reconnect_attempts=3
    )
except Exception as e:
    print(f"Failed to connect: {e}")
```

### Stream Not Found

```bash
# Check if stream exists
nats stream ls

# View stream details
nats stream info ORDERS
```

### Consumer Not Processing

```bash
# Check consumer lag
nats consumer info ORDERS order-processor

# View pending messages
nats consumer next ORDERS order-processor
```

## Resources

- [NATS Documentation](https://docs.nats.io/)
- [NATS.py GitHub](https://github.com/nats-io/nats.py)
- [NATS.js GitHub](https://github.com/nats-io/nats.js)
- [JetStream Guide](https://docs.nats.io/nats-concepts/jetstream)

## Next Steps

- Deploy NATS server
- Core NATS messaging
- Request/reply patterns
- Queue groups
- JetStream streams
- Durable consumers
- Key-value store
- Object store
- Clustering
- Production deployment
