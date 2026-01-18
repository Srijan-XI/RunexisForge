# RabbitMQ

## Introduction

### What is RabbitMQ?

RabbitMQ is a robust, open-source message broker that implements the Advanced Message Queuing Protocol (AMQP). It acts as an intermediary for messaging between applications, enabling asynchronous communication by routing messages from producers to consumers through exchanges and queues.

### Why RabbitMQ?

- Industry-standard AMQP protocol
- Multiple messaging patterns
- High reliability and availability
- Clustering and federation support
- Flexible routing
- Multi-protocol support
- Management UI
- Plugin ecosystem
- Wide language support
- Enterprise-ready features

### Key Features

- **Exchanges**: Route messages to queues
- **Queues**: Store messages until consumed
- **Bindings**: Link exchanges to queues
- **Dead Letter Exchanges**: Handle failed messages
- **Priority queues**: Message prioritization
- **TTL**: Message time-to-live
- **Publisher confirms**: Reliable publishing
- **Clustering**: High availability
- **Federation**: Connect brokers across regions

## Prerequisites

- Understanding of message queuing concepts
- Basic networking knowledge
- Familiarity with AMQP protocol (helpful)
- Docker (for containerized deployment)

## Installation

### Using Docker

```bash
# Run RabbitMQ with management plugin
docker run -d --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management

# Access management UI at http://localhost:15672
# Default credentials: guest/guest
```

### Ubuntu/Debian

```bash
# Add repository
curl -s https://packagecloud.io/install/repositories/rabbitmq/rabbitmq-server/script.deb.sh | sudo bash

# Install Erlang
sudo apt-get install erlang

# Install RabbitMQ
sudo apt-get install rabbitmq-server

# Start service
sudo systemctl start rabbitmq-server
sudo systemctl enable rabbitmq-server

# Enable management plugin
sudo rabbitmq-plugins enable rabbitmq_management
```

### macOS

```bash
# Using Homebrew
brew update
brew install rabbitmq

# Start RabbitMQ
brew services start rabbitmq

# Enable management plugin
rabbitmq-plugins enable rabbitmq_management
```

### Windows

```bash
# Download and install from https://www.rabbitmq.com/download.html
# Or use Chocolatey
choco install rabbitmq

# Enable management plugin
rabbitmq-plugins enable rabbitmq_management
```

## Core Concepts

### Exchanges

Exchanges receive messages from producers and route them to queues:

- **Direct**: Routes to queues with exact routing key match
- **Fanout**: Routes to all bound queues (broadcast)
- **Topic**: Routes based on pattern matching
- **Headers**: Routes based on message headers

### Queues

Queues store messages until they are consumed by consumers.

### Bindings

Bindings are rules that exchanges use to route messages to queues.

### Routing Keys

Labels that the exchange uses to decide how to route messages.

## Basic Usage - Python

### Installation

```bash
pip install pika
```

### Producer (Publisher)

```python
# producer.py
import pika

# Connect to RabbitMQ
connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare a queue
channel.queue_declare(queue='hello')

# Publish a message
channel.basic_publish(
    exchange='',
    routing_key='hello',
    body='Hello World!'
)

print(" [x] Sent 'Hello World!'")

connection.close()
```

### Consumer

```python
# consumer.py
import pika

def callback(ch, method, properties, body):
    print(f" [x] Received {body.decode()}")

# Connect to RabbitMQ
connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare queue (idempotent)
channel.queue_declare(queue='hello')

# Set up consumer
channel.basic_consume(
    queue='hello',
    on_message_callback=callback,
    auto_ack=True
)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
```

Run:
```bash
# Terminal 1 - Consumer
python consumer.py

# Terminal 2 - Producer
python producer.py
```

## Exchange Types

### Direct Exchange

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare direct exchange
channel.exchange_declare(exchange='logs_direct', exchange_type='direct')

# Declare queues
channel.queue_declare(queue='info_queue')
channel.queue_declare(queue='error_queue')

# Bind queues to exchange
channel.queue_bind(exchange='logs_direct', queue='info_queue', routing_key='info')
channel.queue_bind(exchange='logs_direct', queue='error_queue', routing_key='error')

# Publish messages
channel.basic_publish(
    exchange='logs_direct',
    routing_key='info',
    body='Info message'
)

channel.basic_publish(
    exchange='logs_direct',
    routing_key='error',
    body='Error message'
)

connection.close()
```

### Fanout Exchange (Pub/Sub)

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare fanout exchange
channel.exchange_declare(exchange='logs', exchange_type='fanout')

# Publish message (broadcasts to all bound queues)
channel.basic_publish(
    exchange='logs',
    routing_key='',  # Ignored for fanout
    body='Broadcast message'
)

print(" [x] Sent broadcast message")
connection.close()
```

Consumer for fanout:

```python
import pika

def callback(ch, method, properties, body):
    print(f" [x] {body.decode()}")

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.exchange_declare(exchange='logs', exchange_type='fanout')

# Create exclusive queue (auto-deleted when consumer disconnects)
result = channel.queue_declare(queue='', exclusive=True)
queue_name = result.method.queue

# Bind to exchange
channel.queue_bind(exchange='logs', queue=queue_name)

print(' [*] Waiting for logs. To exit press CTRL+C')

channel.basic_consume(
    queue=queue_name,
    on_message_callback=callback,
    auto_ack=True
)

channel.start_consuming()
```

### Topic Exchange (Pattern Matching)

```python
import pika
import sys

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare topic exchange
channel.exchange_declare(exchange='logs_topic', exchange_type='topic')

# Publish with routing keys
routing_keys = [
    'auth.info',
    'auth.error',
    'payment.info',
    'payment.error'
]

for key in routing_keys:
    message = f'Message with routing key: {key}'
    channel.basic_publish(
        exchange='logs_topic',
        routing_key=key,
        body=message
    )
    print(f" [x] Sent {key}:{message}")

connection.close()
```

Topic consumer:

```python
import pika
import sys

def callback(ch, method, properties, body):
    print(f" [x] {method.routing_key}:{body.decode()}")

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.exchange_declare(exchange='logs_topic', exchange_type='topic')

result = channel.queue_declare(queue='', exclusive=True)
queue_name = result.method.queue

# Bind with patterns
# * matches exactly one word
# # matches zero or more words
binding_keys = ['auth.*', '*.error']  # Receive all auth messages and all errors

for binding_key in binding_keys:
    channel.queue_bind(
        exchange='logs_topic',
        queue=queue_name,
        routing_key=binding_key
    )

print(f' [*] Waiting for logs matching {binding_keys}')

channel.basic_consume(
    queue=queue_name,
    on_message_callback=callback,
    auto_ack=True
)

channel.start_consuming()
```

## Work Queues (Task Distribution)

### Producer (Task Creator)

```python
import pika
import sys

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.queue_declare(queue='task_queue', durable=True)

message = ' '.join(sys.argv[1:]) or "Hello World!"

channel.basic_publish(
    exchange='',
    routing_key='task_queue',
    body=message,
    properties=pika.BasicProperties(
        delivery_mode=2,  # Make message persistent
    )
)

print(f" [x] Sent {message}")
connection.close()
```

### Worker (Task Processor)

```python
import pika
import time

def callback(ch, method, properties, body):
    print(f" [x] Received {body.decode()}")
    time.sleep(body.count(b'.'))  # Simulate work
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.queue_declare(queue='task_queue', durable=True)
print(' [*] Waiting for messages. To exit press CTRL+C')

# Fair dispatch - don't give more than 1 message to a worker at a time
channel.basic_qos(prefetch_count=1)

channel.basic_consume(queue='task_queue', on_message_callback=callback)

channel.start_consuming()
```

## Message Properties

### Setting Properties

```python
import pika
from datetime import datetime

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.queue_declare(queue='messages')

properties = pika.BasicProperties(
    delivery_mode=2,  # Persistent
    content_type='application/json',
    content_encoding='utf-8',
    priority=5,
    correlation_id='12345',
    reply_to='response_queue',
    expiration='60000',  # TTL in milliseconds
    message_id='msg-001',
    timestamp=int(datetime.now().timestamp()),
    type='notification',
    user_id='service-user',
    app_id='my-app',
    headers={'source': 'api', 'version': '1.0'}
)

channel.basic_publish(
    exchange='',
    routing_key='messages',
    body='Message with properties',
    properties=properties
)

connection.close()
```

## Advanced Features

### Publisher Confirms

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Enable publisher confirms
channel.confirm_delivery()

channel.queue_declare(queue='reliable')

try:
    channel.basic_publish(
        exchange='',
        routing_key='reliable',
        body='Reliable message',
        mandatory=True
    )
    print(" [x] Message delivered")
except pika.exceptions.UnroutableError:
    print(" [!] Message could not be routed")
except pika.exceptions.NackError:
    print(" [!] Message was nacked")

connection.close()
```

### Dead Letter Exchange (DLX)

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare DLX
channel.exchange_declare(exchange='dlx', exchange_type='direct')

# Declare dead letter queue
channel.queue_declare(queue='dead_letters')
channel.queue_bind(exchange='dlx', queue='dead_letters', routing_key='failed')

# Declare main queue with DLX
channel.queue_declare(
    queue='main_queue',
    arguments={
        'x-dead-letter-exchange': 'dlx',
        'x-dead-letter-routing-key': 'failed',
        'x-message-ttl': 10000  # 10 seconds TTL
    }
)

# Publish message
channel.basic_publish(
    exchange='',
    routing_key='main_queue',
    body='Message that will expire'
)

print(" [x] Sent message that will be dead-lettered after 10s")
connection.close()
```

### Priority Queue

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare priority queue
channel.queue_declare(
    queue='priority_queue',
    arguments={'x-max-priority': 10}
)

# Publish messages with different priorities
for i in range(5):
    priority = i * 2
    channel.basic_publish(
        exchange='',
        routing_key='priority_queue',
        body=f'Message with priority {priority}',
        properties=pika.BasicProperties(priority=priority)
    )

connection.close()
```

## Node.js Examples

### Installation

```bash
npm install amqplib
```

### Producer

```javascript
// producer.js
const amqp = require('amqplib');

async function sendMessage() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    const queue = 'hello';
    const message = 'Hello World!';
    
    await channel.assertQueue(queue, { durable: false });
    
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(" [x] Sent '%s'", message);
    
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error(error);
  }
}

sendMessage();
```

### Consumer

```javascript
// consumer.js
const amqp = require('amqplib');

async function receiveMessages() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    const queue = 'hello';
    
    await channel.assertQueue(queue, { durable: false });
    
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(" [x] Received '%s'", msg.content.toString());
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

receiveMessages();
```

### RPC Pattern

Server:

```javascript
// rpc_server.js
const amqp = require('amqplib');

async function fibonacci(n) {
  if (n === 0 || n === 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

async function startRPCServer() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  const queue = 'rpc_queue';
  
  await channel.assertQueue(queue, { durable: false });
  channel.prefetch(1);
  
  console.log(' [x] Awaiting RPC requests');
  
  channel.consume(queue, async (msg) => {
    const n = parseInt(msg.content.toString());
    console.log(" [.] fib(%d)", n);
    
    const result = await fibonacci(n);
    
    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(result.toString()),
      { correlationId: msg.properties.correlationId }
    );
    
    channel.ack(msg);
  });
}

startRPCServer();
```

Client:

```javascript
// rpc_client.js
const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

async function fibonacci(n) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  const queue = 'rpc_queue';
  const replyQueue = await channel.assertQueue('', { exclusive: true });
  const correlationId = uuidv4();
  
  return new Promise((resolve, reject) => {
    channel.consume(replyQueue.queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        resolve(parseInt(msg.content.toString()));
        setTimeout(() => connection.close(), 500);
      }
    }, { noAck: true });
    
    channel.sendToQueue(queue, Buffer.from(n.toString()), {
      correlationId: correlationId,
      replyTo: replyQueue.queue
    });
  });
}

fibonacci(30).then((result) => {
  console.log(' [.] Got %d', result);
});
```

## Java Example

```java
// Producer.java
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Producer {
    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            String message = "Hello World!";
            
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            System.out.println(" [x] Sent '" + message + "'");
        }
    }
}

// Consumer.java
import com.rabbitmq.client.*;

public class Consumer {
    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [x] Received '" + message + "'");
        };
        
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });
    }
}
```

## Management & Monitoring

### Management API

```bash
# List queues
curl -u guest:guest http://localhost:15672/api/queues

# Get queue details
curl -u guest:guest http://localhost:15672/api/queues/%2F/hello

# List exchanges
curl -u guest:guest http://localhost:15672/api/exchanges

# Publish message via API
curl -u guest:guest -H "content-type:application/json" \
  -X POST http://localhost:15672/api/exchanges/%2F/amq.default/publish \
  -d'{"properties":{},"routing_key":"hello","payload":"test message","payload_encoding":"string"}'
```

### CLI Commands

```bash
# List queues
rabbitmqctl list_queues

# List exchanges
rabbitmqctl list_exchanges

# List bindings
rabbitmqctl list_bindings

# Purge queue
rabbitmqctl purge_queue hello

# Delete queue
rabbitmqctl delete_queue hello

# List users
rabbitmqctl list_users

# Add user
rabbitmqctl add_user myuser mypassword

# Set permissions
rabbitmqctl set_permissions -p / myuser ".*" ".*" ".*"

# List connections
rabbitmqctl list_connections

# Close connection
rabbitmqctl close_connection "<connection_name>" "reason"
```

## Configuration

### rabbitmq.conf

```ini
# Network
listeners.tcp.default = 5672
management.tcp.port = 15672

# Memory
vm_memory_high_watermark.relative = 0.6

# Disk
disk_free_limit.absolute = 50GB

# Logging
log.file.level = info
log.console = true
log.console.level = info

# Clustering
cluster_formation.peer_discovery_backend = rabbit_peer_discovery_classic_config
cluster_formation.classic_config.nodes.1 = rabbit@node1
cluster_formation.classic_config.nodes.2 = rabbit@node2
```

## Best Practices

### 1. Use Durable Queues and Persistent Messages

```python
# Durable queue
channel.queue_declare(queue='important', durable=True)

# Persistent message
channel.basic_publish(
    exchange='',
    routing_key='important',
    body=message,
    properties=pika.BasicProperties(delivery_mode=2)
)
```

### 2. Acknowledge Messages Properly

```python
def callback(ch, method, properties, body):
    try:
        process_message(body)
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)
```

### 3. Use Prefetch for Fair Dispatch

```python
channel.basic_qos(prefetch_count=1)
```

### 4. Handle Connection Failures

```python
import pika
from pika.exceptions import AMQPConnectionError
import time

def get_connection():
    while True:
        try:
            return pika.BlockingConnection(
                pika.ConnectionParameters('localhost')
            )
        except AMQPConnectionError:
            print("Connection failed, retrying...")
            time.sleep(5)
```

### 5. Use Publisher Confirms for Reliability

```python
channel.confirm_delivery()
try:
    channel.basic_publish(exchange='', routing_key='queue', body='msg')
except Exception as e:
    # Handle failure
    pass
```

## Troubleshooting

### Connection Issues

```python
# Test connection
import pika

try:
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host='localhost',
            port=5672,
            connection_attempts=3,
            retry_delay=2
        )
    )
    print("Connected successfully")
    connection.close()
except Exception as e:
    print(f"Connection failed: {e}")
```

### Memory Issues

```bash
# Check memory usage
rabbitmqctl status | grep memory

# Set memory threshold
rabbitmqctl set_vm_memory_high_watermark 0.5
```

### Queue Buildup

```bash
# Check queue depth
rabbitmqctl list_queues name messages

# Purge queue if needed
rabbitmqctl purge_queue queue_name
```

## Resources

- [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html)
- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html)
- [AMQP Specification](https://www.amqp.org/)
- [RabbitMQ GitHub](https://github.com/rabbitmq/rabbitmq-server)

## Next Steps

- Install RabbitMQ
- Basic producer/consumer
- Explore exchange types
- Work queues
- RPC pattern
- Publisher confirms
- Clustering
- Monitoring
- Production deployment
- Performance tuning
