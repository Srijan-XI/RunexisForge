# Apache Pulsar

## Introduction

### What is Apache Pulsar?

Apache Pulsar is a cloud-native, distributed messaging and streaming platform originally created at Yahoo and now part of the Apache Software Foundation. It provides multi-tenancy, geo-replication, and combines messaging, storage, and lightweight serverless computing in a unified platform.

### Why Apache Pulsar?

- Multi-tenancy built-in
- Geo-replication out of the box
- Infinite topic retention
- Unified messaging and streaming
- Tiered storage (hot/cold data)
- Pulsar Functions (serverless computing)
- Schema registry integrated
- Strong ordering guarantees
- Horizontal scalability
- Cloud-native architecture

## Prerequisites

- Java 11+ installed
- Basic understanding of messaging systems
- Understanding of pub/sub patterns
- Linux/Unix environment
- 8GB+ RAM for production

## Installation

### Standalone Mode

```bash
# Download Pulsar
wget https://archive.apache.org/dist/pulsar/pulsar-3.1.2/apache-pulsar-3.1.2-bin.tar.gz

# Extract
tar xvfz apache-pulsar-3.1.2-bin.tar.gz
cd apache-pulsar-3.1.2

# Start Pulsar standalone
bin/pulsar standalone
```

### Docker

```bash
# Run Pulsar standalone
docker run -it \
  -p 6650:6650 \
  -p 8080:8080 \
  apachepulsar/pulsar:3.1.2 \
  bin/pulsar standalone
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  zookeeper:
    image: apachepulsar/pulsar:3.1.2
    container_name: zookeeper
    restart: on-failure
    command: >
      bash -c "bin/apply-config-from-env.sh conf/zookeeper.conf && \
               bin/generate-zookeeper-config.sh conf/zookeeper.conf && \
               exec bin/pulsar zookeeper"
    environment:
      PULSAR_MEM: "-Xms256m -Xmx256m"

  bookie:
    image: apachepulsar/pulsar:3.1.2
    container_name: bookie
    restart: on-failure
    depends_on:
      - zookeeper
    command: >
      bash -c "bin/apply-config-from-env.sh conf/bookkeeper.conf && \
               exec bin/pulsar bookie"
    environment:
      PULSAR_MEM: "-Xms512m -Xmx512m"

  broker:
    image: apachepulsar/pulsar:3.1.2
    container_name: broker
    restart: on-failure
    depends_on:
      - zookeeper
      - bookie
    ports:
      - "6650:6650"
      - "8080:8080"
    command: >
      bash -c "bin/apply-config-from-env.sh conf/broker.conf && \
               exec bin/pulsar broker"
    environment:
      PULSAR_MEM: "-Xms512m -Xmx512m"
```

```bash
docker-compose up -d
```

### Kubernetes (Helm)

```bash
# Add Pulsar Helm repo
helm repo add apache https://pulsar.apache.org/charts
helm repo update

# Install Pulsar
helm install pulsar apache/pulsar \
  --namespace pulsar \
  --create-namespace \
  --values values.yaml
```

## Core Concepts

### Tenants and Namespaces

```bash
# Create tenant
bin/pulsar-admin tenants create my-tenant \
  --admin-roles my-admin-role \
  --allowed-clusters standalone

# Create namespace
bin/pulsar-admin namespaces create my-tenant/my-namespace

# Set retention policy
bin/pulsar-admin namespaces set-retention \
  my-tenant/my-namespace \
  --size 10G \
  --time 3d

# List namespaces
bin/pulsar-admin namespaces list my-tenant
```

### Topics

```bash
# Create topic
bin/pulsar-admin topics create \
  persistent://my-tenant/my-namespace/my-topic

# Create partitioned topic
bin/pulsar-admin topics create-partitioned-topic \
  persistent://my-tenant/my-namespace/my-partitioned-topic \
  --partitions 4

# List topics
bin/pulsar-admin topics list my-tenant/my-namespace

# Get topic stats
bin/pulsar-admin topics stats \
  persistent://my-tenant/my-namespace/my-topic

# Delete topic
bin/pulsar-admin topics delete \
  persistent://my-tenant/my-namespace/my-topic
```

## Producers

### Python Producer

```bash
pip install pulsar-client
```

```python
import pulsar

# Create client
client = pulsar.Client('pulsar://localhost:6650')

# Create producer
producer = client.create_producer(
    'persistent://public/default/my-topic',
    producer_name='my-producer',
    send_timeout_millis=30000,
    compression_type=pulsar.CompressionType.LZ4,
    batching_enabled=True,
    batching_max_messages=1000
)

# Send messages
for i in range(100):
    message_data = f'Message {i}'.encode('utf-8')
    
    # Send synchronously
    msg_id = producer.send(
        message_data,
        properties={'key': str(i)},
        event_timestamp=time.time_ns()
    )
    print(f'Published message ID: {msg_id}')

# Send asynchronously
def callback(res, msg_id):
    print(f'Message published: {msg_id}')

producer.send_async(
    b'Async message',
    callback=callback
)

# Flush and close
producer.flush()
producer.close()
client.close()
```

### Java Producer

```java
import org.apache.pulsar.client.api.*;

public class PulsarProducerExample {
    public static void main(String[] args) throws Exception {
        PulsarClient client = PulsarClient.builder()
                .serviceUrl("pulsar://localhost:6650")
                .build();
        
        Producer<byte[]> producer = client.newProducer()
                .topic("persistent://public/default/my-topic")
                .producerName("my-producer")
                .compressionType(CompressionType.LZ4)
                .sendTimeout(30, TimeUnit.SECONDS)
                .create();
        
        for (int i = 0; i < 100; i++) {
            String message = "Message " + i;
            
            MessageId msgId = producer.newMessage()
                    .key("key-" + i)
                    .value(message.getBytes())
                    .property("index", String.valueOf(i))
                    .send();
            
            System.out.println("Published message: " + msgId);
        }
        
        producer.close();
        client.close();
    }
}
```

### Node.js Producer

```bash
npm install pulsar-client
```

```javascript
const Pulsar = require('pulsar-client');

(async () => {
  const client = new Pulsar.Client({
    serviceUrl: 'pulsar://localhost:6650',
  });

  const producer = await client.createProducer({
    topic: 'persistent://public/default/my-topic',
    compressionType: 'LZ4',
    batchingEnabled: true,
  });

  for (let i = 0; i < 100; i++) {
    const msg = {
      data: Buffer.from(`Message ${i}`),
      properties: { key: i.toString() },
    };

    producer.send(msg);
  }

  await producer.flush();
  await producer.close();
  await client.close();
})();
```

## Consumers

### Python Consumer

```python
import pulsar

client = pulsar.Client('pulsar://localhost:6650')

# Create consumer
consumer = client.subscribe(
    'persistent://public/default/my-topic',
    subscription_name='my-subscription',
    consumer_type=pulsar.ConsumerType.Shared,
    receiver_queue_size=1000,
    max_total_receiver_queue_size_across_partitions=50000
)

# Receive messages
while True:
    msg = consumer.receive()
    try:
        print(f"Received: {msg.data().decode('utf-8')}")
        print(f"Message ID: {msg.message_id()}")
        print(f"Properties: {msg.properties()}")
        
        # Acknowledge
        consumer.acknowledge(msg)
    except Exception as e:
        print(f"Error: {e}")
        consumer.negative_acknowledge(msg)

consumer.close()
client.close()
```

### Subscription Types

```python
import pulsar

client = pulsar.Client('pulsar://localhost:6650')

# Exclusive (default) - Only one consumer
exclusive_consumer = client.subscribe(
    'my-topic',
    'exclusive-sub',
    consumer_type=pulsar.ConsumerType.Exclusive
)

# Shared - Multiple consumers, round-robin
shared_consumer = client.subscribe(
    'my-topic',
    'shared-sub',
    consumer_type=pulsar.ConsumerType.Shared
)

# Failover - One active, others standby
failover_consumer = client.subscribe(
    'my-topic',
    'failover-sub',
    consumer_type=pulsar.ConsumerType.Failover
)

# Key_Shared - Partitioned by key
key_shared_consumer = client.subscribe(
    'my-topic',
    'key-shared-sub',
    consumer_type=pulsar.ConsumerType.KeyShared
)
```

### Reader API

```python
import pulsar

client = pulsar.Client('pulsar://localhost:6650')

# Create reader (no subscription)
reader = client.create_reader(
    'persistent://public/default/my-topic',
    pulsar.MessageId.earliest  # Or specific MessageId
)

while True:
    msg = reader.read_next()
    print(f"Read: {msg.data()}")

reader.close()
```

## Schemas

### Avro Schema

```python
import pulsar
from pulsar.schema import *

class User(Record):
    name = String()
    age = Integer()
    email = String()

client = pulsar.Client('pulsar://localhost:6650')

# Producer with schema
producer = client.create_producer(
    'user-topic',
    schema=AvroSchema(User)
)

user = User(name='John Doe', age=30, email='john@example.com')
producer.send(user)

# Consumer with schema
consumer = client.subscribe(
    'user-topic',
    'user-sub',
    schema=AvroSchema(User)
)

msg = consumer.receive()
user = msg.value()
print(f"User: {user.name}, Age: {user.age}")
```

### JSON Schema

```python
import pulsar
from pulsar.schema import *

class Product(Record):
    id = Integer()
    name = String()
    price = Double()

producer = client.create_producer(
    'product-topic',
    schema=JsonSchema(Product)
)

product = Product(id=1, name='Laptop', price=999.99)
producer.send(product)
```

## Pulsar Functions

### Python Function

```python
# word_count.py
from pulsar import Function

class WordCount(Function):
    def process(self, input, context):
        words = input.split()
        for word in words:
            context.publish(
                'word-count-output',
                word,
                properties={'count': '1'}
            )
        return f"Processed {len(words)} words"
```

```bash
# Deploy function
bin/pulsar-admin functions create \
  --py word_count.py \
  --classname word_count.WordCount \
  --inputs persistent://public/default/input-topic \
  --output persistent://public/default/output-topic \
  --name word-count-function

# Trigger function
bin/pulsar-admin functions trigger \
  --name word-count-function \
  --trigger-value "hello world pulsar"

# Get function stats
bin/pulsar-admin functions stats --name word-count-function
```

### Java Function

```java
import org.apache.pulsar.functions.api.Context;
import org.apache.pulsar.functions.api.Function;

public class ExclamationFunction implements Function<String, String> {
    @Override
    public String process(String input, Context context) {
        return input + "!";
    }
}
```

```bash
# Package and deploy
mvn clean package

bin/pulsar-admin functions create \
  --jar target/my-functions.jar \
  --classname com.example.ExclamationFunction \
  --inputs input-topic \
  --output output-topic \
  --name exclamation-function
```

## Geo-Replication

### Configure Clusters

```bash
# Create clusters
bin/pulsar-admin clusters create \
  --url http://broker1.example.com:8080 \
  --broker-url pulsar://broker1.example.com:6650 \
  cluster-1

bin/pulsar-admin clusters create \
  --url http://broker2.example.com:8080 \
  --broker-url pulsar://broker2.example.com:6650 \
  cluster-2

# Create tenant with multiple clusters
bin/pulsar-admin tenants create my-tenant \
  --allowed-clusters cluster-1,cluster-2

# Enable replication
bin/pulsar-admin namespaces set-clusters \
  my-tenant/my-namespace \
  --clusters cluster-1,cluster-2
```

## Tiered Storage

### Configure S3 Tiered Storage

```conf
# broker.conf
managedLedgerOffloadDriver=aws-s3
offloadersDirectory=./offloaders
s3ManagedLedgerOffloadRegion=us-west-2
s3ManagedLedgerOffloadBucket=pulsar-tiered-storage
s3ManagedLedgerOffloadServiceEndpoint=https://s3.us-west-2.amazonaws.com
```

```bash
# Set offload threshold
bin/pulsar-admin namespaces set-offload-threshold \
  my-tenant/my-namespace \
  --size 10G

# Manual offload
bin/pulsar-admin topics offload \
  persistent://my-tenant/my-namespace/my-topic \
  --size-threshold 10G
```

## Monitoring

### Prometheus Metrics

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'pulsar'
    static_configs:
      - targets: ['localhost:8080']
```

### Key Metrics

```bash
# Get broker stats
curl http://localhost:8080/metrics/

# Topic metrics
bin/pulsar-admin topics stats \
  persistent://public/default/my-topic

# Subscription stats
bin/pulsar-admin topics stats-internal \
  persistent://public/default/my-topic
```

## Administration

### Manage Subscriptions

```bash
# List subscriptions
bin/pulsar-admin topics subscriptions \
  persistent://public/default/my-topic

# Create subscription
bin/pulsar-admin topics create-subscription \
  persistent://public/default/my-topic \
  --subscription my-sub

# Reset cursor
bin/pulsar-admin topics reset-cursor \
  persistent://public/default/my-topic \
  --subscription my-sub \
  --time 1h

# Skip messages
bin/pulsar-admin topics skip \
  persistent://public/default/my-topic \
  --subscription my-sub \
  --count 100

# Clear backlog
bin/pulsar-admin topics clear-backlog \
  persistent://public/default/my-topic \
  --subscription my-sub
```

## Performance Tuning

### Producer Configuration

```python
producer = client.create_producer(
    'my-topic',
    # Batching
    batching_enabled=True,
    batching_max_messages=1000,
    batching_max_publish_delay_ms=10,
    
    # Compression
    compression_type=pulsar.CompressionType.ZSTD,
    
    # Routing
    message_routing_mode=pulsar.PartitionsRoutingMode.RoundRobinPartition,
    
    # Memory
    max_pending_messages=1000,
    max_pending_messages_across_partitions=50000,
    
    # Chunking for large messages
    chunking_enabled=True
)
```

### Consumer Configuration

```python
consumer = client.subscribe(
    'my-topic',
    'my-sub',
    # Prefetch
    receiver_queue_size=1000,
    
    # Acknowledgment
    ack_timeout_millis=30000,
    negative_ack_redelivery_delay_ms=60000,
    
    # Dead letter queue
    dead_letter_policy=pulsar.ConsumerDeadLetterPolicy(
        max_redeliver_count=10,
        dead_letter_topic='my-topic-dlq'
    )
)
```

## Best Practices

### Message Ordering

```python
# Ensure ordering with keys
producer = client.create_producer(
    'my-topic',
    message_routing_mode=pulsar.PartitionsRoutingMode.SinglePartition
)

# Send with key
producer.send(
    content=b'Message',
    partition_key='user-123'  # Same key = same partition = ordered
)
```

### Error Handling

```python
import pulsar

client = pulsar.Client('pulsar://localhost:6650')
producer = client.create_producer('my-topic')

try:
    msg_id = producer.send(
        b'Hello Pulsar',
        send_timeout_millis=5000
    )
    print(f'Message sent: {msg_id}')
except pulsar.Timeout:
    print('Send timeout')
except Exception as e:
    print(f'Error: {e}')
finally:
    producer.close()
    client.close()
```

## Troubleshooting

### Consumer Lag

```bash
# Check subscription backlog
bin/pulsar-admin topics stats \
  persistent://public/default/my-topic | grep backlog

# Reset to earliest
bin/pulsar-admin topics reset-cursor \
  persistent://public/default/my-topic \
  --subscription my-sub \
  --time -1
```

### Connection Issues

```python
# Configure retries
client = pulsar.Client(
    'pulsar://localhost:6650',
    connection_timeout_ms=10000,
    operation_timeout_seconds=30,
    retry_count=3
)
```

## Resources

- [Apache Pulsar Documentation](https://pulsar.apache.org/docs/)
- [Pulsar GitHub Repository](https://github.com/apache/pulsar)
- [Pulsar Community](https://pulsar.apache.org/community/)
- [Pulsar Summit](https://pulsar-summit.org/)
- [DataStax Luna Streaming](https://www.datastax.com/products/luna-streaming)

## Next Steps

- Set up Pulsar cluster
- Create producers and consumers
- Implement Pulsar Functions
- Configure geo-replication
- Set up tiered storage
- Implement schemas
- Configure monitoring
- Optimize performance
- Deploy to production
- Build event-driven architecture
