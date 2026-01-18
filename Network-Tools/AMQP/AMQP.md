# AMQP (Advanced Message Queuing Protocol)

## Introduction

### What is AMQP?

AMQP (Advanced Message Queuing Protocol) is an open standard application layer protocol for message-oriented middleware. It provides interoperability between different messaging systems and enables reliable, secure, and flexible message delivery. RabbitMQ is the most popular implementation of AMQP.

### Why AMQP?

- Open standard protocol
- Language and platform independent
- Reliable message delivery
- Flexible routing (exchanges, queues, bindings)
- Message acknowledgments
- Publisher confirms
- Dead letter exchanges
- Message TTL and expiration
- Priority queues
- Strong security features

## Prerequisites

- Basic understanding of messaging patterns
- Understanding of pub/sub and point-to-point messaging
- Network fundamentals
- (Optional) RabbitMQ installed

## Installation

### RabbitMQ (Primary AMQP Implementation)

#### Ubuntu/Debian

```bash
# Add RabbitMQ repository
curl -fsSL https://github.com/rabbitmq/signing-keys/releases/download/2.0/rabbitmq-release-signing-key.asc | sudo apt-key add -
sudo apt-add-repository 'deb https://dl.bintray.com/rabbitmq/debian bionic main'

# Install RabbitMQ
sudo apt update
sudo apt install rabbitmq-server

# Start service
sudo systemctl start rabbitmq-server
sudo systemctl enable rabbitmq-server

# Check status
sudo systemctl status rabbitmq-server
```

#### macOS

```bash
# Install via Homebrew
brew install rabbitmq

# Start RabbitMQ
brew services start rabbitmq

# Or run manually
/opt/homebrew/opt/rabbitmq/sbin/rabbitmq-server
```

#### Docker

```bash
# Run RabbitMQ with management plugin
docker run -d --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=admin \
  rabbitmq:3-management

# Access management UI at http://localhost:15672
# Username: admin, Password: admin
```

### Enable Management Plugin

```bash
# Enable management UI
sudo rabbitmq-plugins enable rabbitmq_management

# Access at http://localhost:15672
# Default credentials: guest/guest
```

## Core Concepts

### Exchanges, Queues, and Bindings

```
Publisher → Exchange → Binding → Queue → Consumer
```

**Exchange Types:**
1. **Direct** - Exact routing key match
2. **Topic** - Pattern-based routing (wildcards)
3. **Fanout** - Broadcast to all queues
4. **Headers** - Route based on headers

## Python Client (pika)

### Installation

```bash
pip install pika
```

### Simple Publisher (Direct Exchange)

```python
import pika
import json

# Connect to RabbitMQ
connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare exchange
channel.exchange_declare(
    exchange='direct_exchange',
    exchange_type='direct',
    durable=True
)

# Declare queue
channel.queue_declare(
    queue='task_queue',
    durable=True
)

# Bind queue to exchange
channel.queue_bind(
    exchange='direct_exchange',
    queue='task_queue',
    routing_key='task'
)

# Publish message
message = json.dumps({
    'task_id': 1,
    'data': 'Process this data'
})

channel.basic_publish(
    exchange='direct_exchange',
    routing_key='task',
    body=message,
    properties=pika.BasicProperties(
        delivery_mode=2,  # Make message persistent
        content_type='application/json',
        priority=5
    )
)

print(f"Sent: {message}")

connection.close()
```

### Simple Consumer

```python
import pika
import json

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.queue_declare(queue='task_queue', durable=True)

def callback(ch, method, properties, body):
    message = json.loads(body)
    print(f"Received: {message}")
    
    # Process message
    # ...
    
    # Acknowledge message
    ch.basic_ack(delivery_tag=method.delivery_tag)

# Set QoS - prefetch only 1 message at a time
channel.basic_qos(prefetch_count=1)

# Start consuming
channel.basic_consume(
    queue='task_queue',
    on_message_callback=callback,
    auto_ack=False  # Manual acknowledgment
)

print('Waiting for messages...')
channel.start_consuming()
```

### Topic Exchange

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare topic exchange
channel.exchange_declare(
    exchange='logs_topic',
    exchange_type='topic',
    durable=True
)

# Publish with routing key patterns
routing_keys = [
    'app.error.critical',
    'app.warning.high',
    'app.info.general',
    'system.error.disk'
]

for routing_key in routing_keys:
    message = f'Log message for {routing_key}'
    channel.basic_publish(
        exchange='logs_topic',
        routing_key=routing_key,
        body=message
    )
    print(f"Sent {routing_key}: {message}")

connection.close()
```

### Topic Consumer with Wildcards

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.exchange_declare(
    exchange='logs_topic',
    exchange_type='topic'
)

# Create queue
result = channel.queue_declare('', exclusive=True)
queue_name = result.method.queue

# Bind with patterns
binding_keys = [
    'app.error.*',      # All app errors
    'system.#',         # All system messages
    '*.*.critical'      # All critical messages
]

for binding_key in binding_keys:
    channel.queue_bind(
        exchange='logs_topic',
        queue=queue_name,
        routing_key=binding_key
    )

def callback(ch, method, properties, body):
    print(f"[{method.routing_key}] {body.decode()}")

channel.basic_consume(
    queue=queue_name,
    on_message_callback=callback,
    auto_ack=True
)

print('Waiting for logs...')
channel.start_consuming()
```

### Fanout Exchange

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare fanout exchange
channel.exchange_declare(
    exchange='notifications',
    exchange_type='fanout',
    durable=True
)

# Publish (routing key ignored for fanout)
channel.basic_publish(
    exchange='notifications',
    routing_key='',  # Ignored
    body='Important notification for all subscribers'
)

connection.close()
```

## Node.js Client (amqplib)

### Installation

```bash
npm install amqplib
```

### Publisher

```javascript
const amqp = require('amqplib');

async function publishMessage() {
  try {
    // Connect
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    // Declare exchange
    await channel.assertExchange('direct_exchange', 'direct', {
      durable: true
    });
    
    // Declare queue
    await channel.assertQueue('task_queue', {
      durable: true
    });
    
    // Bind
    await channel.bindQueue('task_queue', 'direct_exchange', 'task');
    
    // Publish
    const message = JSON.stringify({
      task_id: 1,
      data: 'Process this data'
    });
    
    channel.publish(
      'direct_exchange',
      'task',
      Buffer.from(message),
      {
        persistent: true,
        contentType: 'application/json',
        priority: 5
      }
    );
    
    console.log('Sent:', message);
    
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error:', error);
  }
}

publishMessage();
```

### Consumer

```javascript
const amqp = require('amqplib');

async function consumeMessages() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    await channel.assertQueue('task_queue', { durable: true });
    
    // Set prefetch
    channel.prefetch(1);
    
    console.log('Waiting for messages...');
    
    channel.consume('task_queue', (msg) => {
      if (msg !== null) {
        const content = JSON.loads(msg.content.toString());
        console.log('Received:', content);
        
        // Process message
        setTimeout(() => {
          console.log('Done processing');
          channel.ack(msg);
        }, 1000);
      }
    }, {
      noAck: false  // Manual ack
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

consumeMessages();
```

## Java Client

```java
import com.rabbitmq.client.*;

public class AMQPProducer {
    private static final String EXCHANGE_NAME = "direct_exchange";
    private static final String QUEUE_NAME = "task_queue";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            // Declare exchange
            channel.exchangeDeclare(EXCHANGE_NAME, "direct", true);
            
            // Declare queue
            channel.queueDeclare(QUEUE_NAME, true, false, false, null);
            
            // Bind queue to exchange
            channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "task");
            
            // Publish message
            String message = "Hello AMQP";
            AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
                    .deliveryMode(2) // Persistent
                    .contentType("text/plain")
                    .priority(5)
                    .build();
            
            channel.basicPublish(EXCHANGE_NAME, "task", props, message.getBytes());
            
            System.out.println("Sent: " + message);
        }
    }
}
```

```java
import com.rabbitmq.client.*;

public class AMQPConsumer {
    private static final String QUEUE_NAME = "task_queue";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);
        channel.basicQos(1); // Prefetch count
        
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("Received: " + message);
            
            try {
                // Process message
                Thread.sleep(1000);
            } finally {
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            }
        };
        
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {});
    }
}
```

## Advanced Features

### Dead Letter Exchange

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Declare dead letter exchange
channel.exchange_declare(
    exchange='dlx_exchange',
    exchange_type='direct',
    durable=True
)

# Declare DLQ
channel.queue_declare(
    queue='dead_letter_queue',
    durable=True
)

channel.queue_bind(
    exchange='dlx_exchange',
    queue='dead_letter_queue',
    routing_key='failed'
)

# Declare main queue with DLX
channel.queue_declare(
    queue='main_queue',
    durable=True,
    arguments={
        'x-dead-letter-exchange': 'dlx_exchange',
        'x-dead-letter-routing-key': 'failed',
        'x-message-ttl': 60000  # 60 seconds
    }
)

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
    arguments={
        'x-max-priority': 10  # Max priority level
    }
)

# Publish with priority
for priority in range(10, 0, -1):
    channel.basic_publish(
        exchange='',
        routing_key='priority_queue',
        body=f'Message with priority {priority}',
        properties=pika.BasicProperties(priority=priority)
    )

connection.close()
```

### Publisher Confirms

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Enable publisher confirms
channel.confirm_delivery()

channel.queue_declare(queue='confirmed_queue')

try:
    channel.basic_publish(
        exchange='',
        routing_key='confirmed_queue',
        body='Important message',
        mandatory=True
    )
    print('Message confirmed by broker')
except pika.exceptions.UnroutableError:
    print('Message was returned')

connection.close()
```

### Message TTL and Expiration

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

# Queue-level TTL
channel.queue_declare(
    queue='ttl_queue',
    arguments={
        'x-message-ttl': 60000  # 60 seconds
    }
)

# Message-level expiration
channel.basic_publish(
    exchange='',
    routing_key='ttl_queue',
    body='Expires in 30 seconds',
    properties=pika.BasicProperties(expiration='30000')
)

connection.close()
```

## Security

### User Management

```bash
# Add user
sudo rabbitmqctl add_user myuser mypassword

# Set permissions
sudo rabbitmqctl set_permissions -p / myuser ".*" ".*" ".*"

# Set admin tag
sudo rabbitmqctl set_user_tags myuser administrator

# List users
sudo rabbitmqctl list_users

# Delete user
sudo rabbitmqctl delete_user myuser
```

### TLS/SSL Configuration

```python
import pika
import ssl

# SSL context
ssl_context = ssl.create_default_context(
    cafile="/path/to/ca_certificate.pem"
)
ssl_context.load_cert_chain(
    "/path/to/client_certificate.pem",
    "/path/to/client_key.pem"
)

# Connect with SSL
connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        host='localhost',
        port=5671,
        credentials=pika.PlainCredentials('username', 'password'),
        ssl_options=pika.SSLOptions(ssl_context)
    )
)
```

## Monitoring and Management

### Management API

```bash
# Get overview
curl -u admin:admin http://localhost:15672/api/overview

# List queues
curl -u admin:admin http://localhost:15672/api/queues

# Get queue details
curl -u admin:admin http://localhost:15672/api/queues/%2F/task_queue

# Declare queue via API
curl -u admin:admin -X PUT \
  -H "content-type:application/json" \
  -d '{"durable":true}' \
  http://localhost:15672/api/queues/%2F/my_queue
```

### Monitoring with Python

```python
import pika
import requests

# RabbitMQ Management API
def get_queue_depth(queue_name):
    url = f'http://localhost:15672/api/queues/%2F/{queue_name}'
    response = requests.get(url, auth=('admin', 'admin'))
    data = response.json()
    return data.get('messages', 0)

depth = get_queue_depth('task_queue')
print(f'Queue depth: {depth}')
```

## Performance Tuning

### Connection Pooling

```python
import pika
from pika.adapters import BlockingConnection

class ConnectionPool:
    def __init__(self, size=10):
        self.connections = []
        self.size = size
        
        for _ in range(size):
            conn = BlockingConnection(
                pika.ConnectionParameters('localhost')
            )
            self.connections.append(conn)
    
    def get_connection(self):
        # Return connection (implement proper pooling)
        return self.connections[0]
    
    def close_all(self):
        for conn in self.connections:
            conn.close()
```

### Publisher Configuration

```python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        host='localhost',
        # Tuning parameters
        heartbeat=600,
        blocked_connection_timeout=300,
        channel_max=100,
        frame_max=131072,
        connection_attempts=3,
        retry_delay=2
    )
)
```

## Best Practices

### Message Design

```python
import json
import pika

# Good - structured message
message = {
    'id': '12345',
    'type': 'order',
    'data': {
        'customer_id': 1,
        'items': [1, 2, 3],
        'total': 99.99
    },
    'timestamp': '2026-01-18T12:00:00Z'
}

channel.basic_publish(
    exchange='orders',
    routing_key='new_order',
    body=json.dumps(message),
    properties=pika.BasicProperties(
        content_type='application/json',
        delivery_mode=2
    )
)
```

### Error Handling

```python
import pika
import time

def robust_publisher():
    while True:
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters('localhost')
            )
            channel = connection.channel()
            
            channel.basic_publish(
                exchange='',
                routing_key='queue',
                body='message'
            )
            
            connection.close()
            break
        except pika.exceptions.AMQPConnectionError:
            print('Connection failed, retrying...')
            time.sleep(5)
```

## Troubleshooting

### Check Broker Status

```bash
# Broker status
sudo rabbitmqctl status

# List queues
sudo rabbitmqctl list_queues name messages consumers

# List exchanges
sudo rabbitmqctl list_exchanges

# List bindings
sudo rabbitmqctl list_bindings
```

### Purge Queue

```bash
# Purge all messages from queue
sudo rabbitmqctl purge_queue task_queue

# Or via Python
channel.queue_purge('task_queue')
```

## Resources

- [AMQP Specification](https://www.amqp.org/)
- [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html)
- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html)
- [Pika Documentation](https://pika.readthedocs.io/)
- [amqplib Documentation](https://www.squaremobius.net/amqp.node/)

## Next Steps

- Install RabbitMQ
- Create exchanges and queues
- Implement producers and consumers
- Configure exchange types
- Set up dead letter exchanges
- Implement security (TLS/SSL)
- Configure monitoring
- Optimize performance
- Handle failover scenarios
- Deploy to production
