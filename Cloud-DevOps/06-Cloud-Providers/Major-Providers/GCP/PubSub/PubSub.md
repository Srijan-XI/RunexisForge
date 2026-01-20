# Google Cloud Pub/Sub

## Introduction

### What is Google Cloud Pub/Sub?

Google Cloud Pub/Sub is a fully managed, real-time messaging service that enables asynchronous communication between independent applications. It provides reliable, scalable message delivery with global reach and supports both push and pull message delivery.

### Why Google Cloud Pub/Sub?

- **Global scale**: Handle millions of messages per second
- **Guaranteed delivery**: At-least-once message delivery
- **Real-time**: Low latency message delivery
- **Fully managed**: No infrastructure to maintain
- **Integration**: Works with GCP ecosystem
- **Multiple protocols**: HTTP, gRPC
- **Flexible**: Push and pull delivery
- **Ordering**: Message ordering support
- **Filtering**: Subscription-level filtering

### Key Features

- **Topics**: Message channels
- **Subscriptions**: Message receivers
- **Push/Pull**: Flexible delivery modes
- **Message ordering**: Guaranteed ordering with ordering keys
- **Dead letter topics**: Handle undeliverable messages
- **Message retention**: Configurable retention period
- **Exactly-once delivery**: Optional exactly-once semantics
- **Snapshots**: Point-in-time message replay
- **Schemas**: Message validation

## Prerequisites

- Google Cloud Platform account
- gcloud CLI installed
- Project with Pub/Sub API enabled
- Service account with appropriate permissions
- Python/Node.js/Java SDK

## Installation

### gcloud CLI

```bash
# Install gcloud CLI
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize
gcloud init

# Enable Pub/Sub API
gcloud services enable pubsub.googleapis.com
```

### Python SDK

```bash
pip install google-cloud-pubsub
```

### Node.js SDK

```bash
npm install @google-cloud/pubsub
```

### Java SDK

```xml
<dependency>
    <groupId>com.google.cloud</groupId>
    <artifactId>google-cloud-pubsub</artifactId>
    <version>1.125.0</version>
</dependency>
```

## Setup

### Create Topic and Subscription (CLI)

```bash
# Set project
gcloud config set project PROJECT_ID

# Create topic
gcloud pubsub topics create my-topic

# Create subscription (pull)
gcloud pubsub subscriptions create my-subscription --topic=my-topic

# Create subscription (push)
gcloud pubsub subscriptions create my-push-subscription \
  --topic=my-topic \
  --push-endpoint=https://example.com/webhook

# List topics
gcloud pubsub topics list

# List subscriptions
gcloud pubsub subscriptions list
```

## Python - Publisher

### Basic Publishing

```python
from google.cloud import pubsub_v1
import json

# Create publisher client
publisher = pubsub_v1.PublisherClient()

# Topic path
project_id = "my-project"
topic_id = "my-topic"
topic_path = publisher.topic_path(project_id, topic_id)

# Publish message
data = json.dumps({
    "order_id": "12345",
    "product": "Laptop",
    "quantity": 1
}).encode("utf-8")

# Publish returns a future
future = publisher.publish(topic_path, data)
message_id = future.result()

print(f"Published message ID: {message_id}")
```

### Publishing with Attributes

```python
from google.cloud import pubsub_v1
import json

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path("my-project", "my-topic")

data = json.dumps({"event": "order_created", "order_id": "12345"}).encode("utf-8")

# Publish with attributes
future = publisher.publish(
    topic_path,
    data,
    event_type="order",
    priority="high",
    timestamp="2024-01-18T10:00:00Z"
)

message_id = future.result()
print(f"Published: {message_id}")
```

### Batch Publishing

```python
from google.cloud import pubsub_v1
from concurrent import futures
import json

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path("my-project", "my-topic")

# Publish multiple messages
publish_futures = []

for i in range(10):
    data = json.dumps({"message_number": i}).encode("utf-8")
    future = publisher.publish(topic_path, data)
    publish_futures.append(future)

# Wait for all publishes to complete
futures.wait(publish_futures, return_when=futures.ALL_COMPLETED)

print(f"Published {len(publish_futures)} messages")
```

### Publishing with Ordering Key

```python
from google.cloud import pubsub_v1

# Create publisher with ordering enabled
publisher = pubsub_v1.PublisherClient(
    publisher_options=pubsub_v1.types.PublisherOptions(
        enable_message_ordering=True
    )
)

topic_path = publisher.topic_path("my-project", "my-topic")

# Publish messages with same ordering key (will be delivered in order)
for i in range(5):
    data = f"Message {i}".encode("utf-8")
    future = publisher.publish(
        topic_path,
        data,
        ordering_key="order-123"  # Messages with same key delivered in order
    )
    print(f"Published: {future.result()}")
```

## Python - Subscriber

### Pull Subscription

```python
from google.cloud import pubsub_v1
import json

# Create subscriber client
subscriber = pubsub_v1.SubscriberClient()

# Subscription path
project_id = "my-project"
subscription_id = "my-subscription"
subscription_path = subscriber.subscription_path(project_id, subscription_id)

def callback(message):
    print(f"Received message ID: {message.message_id}")
    print(f"Data: {message.data.decode('utf-8')}")
    print(f"Attributes: {message.attributes}")
    
    # Acknowledge message
    message.ack()

# Subscribe
streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)
print(f"Listening for messages on {subscription_path}...")

try:
    # Keep running
    streaming_pull_future.result()
except KeyboardInterrupt:
    streaming_pull_future.cancel()
    subscriber.close()
```

### Synchronous Pull

```python
from google.cloud import pubsub_v1

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path("my-project", "my-subscription")

# Pull messages
response = subscriber.pull(
    request={
        "subscription": subscription_path,
        "max_messages": 10
    }
)

# Process messages
ack_ids = []
for received_message in response.received_messages:
    print(f"Received: {received_message.message.data.decode('utf-8')}")
    ack_ids.append(received_message.ack_id)

# Acknowledge messages
if ack_ids:
    subscriber.acknowledge(
        request={
            "subscription": subscription_path,
            "ack_ids": ack_ids
        }
    )
    print(f"Acknowledged {len(ack_ids)} messages")

subscriber.close()
```

### Error Handling

```python
from google.cloud import pubsub_v1
from google.api_core import retry
import time

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path("my-project", "my-subscription")

def callback(message):
    try:
        # Process message
        data = message.data.decode('utf-8')
        print(f"Processing: {data}")
        
        # Simulate processing
        process_message(data)
        
        # Acknowledge
        message.ack()
        
    except Exception as e:
        print(f"Error processing message: {e}")
        # Nack - message will be redelivered
        message.nack()

# Subscribe with custom flow control
flow_control = pubsub_v1.types.FlowControl(
    max_messages=100,
    max_bytes=10 * 1024 * 1024,  # 10 MB
)

streaming_pull_future = subscriber.subscribe(
    subscription_path,
    callback=callback,
    flow_control=flow_control
)

try:
    streaming_pull_future.result()
except KeyboardInterrupt:
    streaming_pull_future.cancel()
```

## Node.js Examples

### Publisher

```javascript
const {PubSub} = require('@google-cloud/pubsub');

const pubsub = new PubSub({projectId: 'my-project'});
const topicName = 'my-topic';

async function publishMessage() {
  const data = JSON.stringify({
    order_id: '12345',
    product: 'Laptop'
  });

  // Publish message
  const messageId = await pubsub
    .topic(topicName)
    .publishMessage({
      data: Buffer.from(data),
      attributes: {
        event_type: 'order',
        priority: 'high'
      }
    });

  console.log(`Message ${messageId} published`);
}

publishMessage();
```

### Subscriber

```javascript
const {PubSub} = require('@google-cloud/pubsub');

const pubsub = new PubSub({projectId: 'my-project'});
const subscriptionName = 'my-subscription';

async function subscribeMessages() {
  const subscription = pubsub.subscription(subscriptionName);

  // Message handler
  const messageHandler = (message) => {
    console.log(`Received message: ${message.id}`);
    console.log(`Data: ${message.data}`);
    console.log(`Attributes: ${JSON.stringify(message.attributes)}`);

    // Acknowledge message
    message.ack();
  };

  // Error handler
  const errorHandler = (error) => {
    console.error(`Error: ${error}`);
  };

  // Listen for messages
  subscription.on('message', messageHandler);
  subscription.on('error', errorHandler);

  console.log('Listening for messages...');
}

subscribeMessages();
```

### Batch Publishing

```javascript
const {PubSub} = require('@google-cloud/pubsub');

const pubsub = new PubSub({projectId: 'my-project'});
const topic = pubsub.topic('my-topic');

async function publishBatch() {
  const messages = [];
  
  for (let i = 0; i < 10; i++) {
    messages.push({
      data: Buffer.from(`Message ${i}`),
      attributes: {index: i.toString()}
    });
  }

  // Publish batch
  const messageIds = await topic.publishMessage(messages);
  console.log(`Published ${messageIds.length} messages`);
}

publishBatch();
```

## Java Example

```java
import com.google.cloud.pubsub.v1.Publisher;
import com.google.cloud.pubsub.v1.Subscriber;
import com.google.cloud.pubsub.v1.MessageReceiver;
import com.google.pubsub.v1.PubsubMessage;
import com.google.pubsub.v1.ProjectSubscriptionName;
import com.google.pubsub.v1.ProjectTopicName;
import com.google.protobuf.ByteString;
import com.google.api.core.ApiFuture;

public class PubSubExample {
    // Publisher
    public static void publishMessage(String projectId, String topicId) throws Exception {
        ProjectTopicName topicName = ProjectTopicName.of(projectId, topicId);
        Publisher publisher = Publisher.newBuilder(topicName).build();

        try {
            String message = "Hello, Pub/Sub!";
            ByteString data = ByteString.copyFromUtf8(message);
            
            PubsubMessage pubsubMessage = PubsubMessage.newBuilder()
                .setData(data)
                .putAttributes("event_type", "greeting")
                .build();

            ApiFuture<String> messageIdFuture = publisher.publish(pubsubMessage);
            String messageId = messageIdFuture.get();
            System.out.println("Published message ID: " + messageId);
        } finally {
            publisher.shutdown();
        }
    }

    // Subscriber
    public static void subscribeMessages(String projectId, String subscriptionId) {
        ProjectSubscriptionName subscriptionName = 
            ProjectSubscriptionName.of(projectId, subscriptionId);

        MessageReceiver receiver = (message, consumer) -> {
            System.out.println("Received: " + message.getData().toStringUtf8());
            System.out.println("Attributes: " + message.getAttributesMap());
            consumer.ack();
        };

        Subscriber subscriber = Subscriber.newBuilder(subscriptionName, receiver).build();
        subscriber.startAsync().awaitRunning();
        System.out.println("Listening for messages...");
    }

    public static void main(String[] args) throws Exception {
        publishMessage("my-project", "my-topic");
        subscribeMessages("my-project", "my-subscription");
    }
}
```

## Push Subscription

### Set up Push Endpoint

```python
# Flask app to receive push messages
from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    envelope = request.get_json()
    
    if 'message' not in envelope:
        return 'Bad Request', 400
    
    # Decode message
    message = envelope['message']
    data = json.loads(message['data'])
    attributes = message.get('attributes', {})
    
    print(f"Received push message: {data}")
    print(f"Attributes: {attributes}")
    
    # Return 200 to acknowledge
    return 'OK', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
```

### Create Push Subscription

```bash
gcloud pubsub subscriptions create my-push-sub \
  --topic=my-topic \
  --push-endpoint=https://example.com/webhook \
  --push-auth-service-account=SERVICE_ACCOUNT_EMAIL
```

## Dead Letter Topics

### Setup Dead Letter Topic

```python
from google.cloud import pubsub_v1

# Create subscriber client
subscriber = pubsub_v1.SubscriberClient()

# Paths
project_id = "my-project"
topic_id = "my-topic"
subscription_id = "my-subscription"
dead_letter_topic_id = "my-dead-letter-topic"

topic_path = subscriber.topic_path(project_id, topic_id)
subscription_path = subscriber.subscription_path(project_id, subscription_id)
dead_letter_topic_path = subscriber.topic_path(project_id, dead_letter_topic_id)

# Create subscription with dead letter policy
request = {
    "name": subscription_path,
    "topic": topic_path,
    "dead_letter_policy": {
        "dead_letter_topic": dead_letter_topic_path,
        "max_delivery_attempts": 5
    }
}

subscription = subscriber.create_subscription(request=request)
print(f"Created subscription with dead letter topic: {subscription.name}")
```

## Message Filtering

### Create Filtered Subscription

```python
from google.cloud import pubsub_v1

subscriber = pubsub_v1.SubscriberClient()

project_id = "my-project"
topic_id = "my-topic"
subscription_id = "filtered-subscription"

topic_path = subscriber.topic_path(project_id, topic_id)
subscription_path = subscriber.subscription_path(project_id, subscription_id)

# Create subscription with filter
# Only receive messages where attribute "event_type" = "order"
request = {
    "name": subscription_path,
    "topic": topic_path,
    "filter": 'attributes.event_type="order" AND attributes.priority="high"'
}

subscription = subscriber.create_subscription(request=request)
print(f"Created filtered subscription: {subscription.name}")
```

## Snapshots

### Create and Use Snapshot

```python
from google.cloud import pubsub_v1

subscriber = pubsub_v1.SubscriberClient()

project_id = "my-project"
subscription_id = "my-subscription"
snapshot_id = "my-snapshot"

subscription_path = subscriber.subscription_path(project_id, subscription_id)
snapshot_path = subscriber.snapshot_path(project_id, snapshot_id)

# Create snapshot
request = {
    "name": snapshot_path,
    "subscription": subscription_path
}
snapshot = subscriber.create_snapshot(request=request)
print(f"Created snapshot: {snapshot.name}")

# Seek to snapshot (replay messages)
request = {
    "subscription": subscription_path,
    "snapshot": snapshot_path
}
subscriber.seek(request=request)
print("Seeked to snapshot")
```

## Schemas

### Create Schema

```python
from google.cloud import pubsub_v1
from google.pubsub_v1.types import Schema

publisher = pubsub_v1.PublisherClient()
schema_client = pubsub_v1.SchemaServiceClient()

project_id = "my-project"
schema_id = "order-schema"
schema_path = schema_client.schema_path(project_id, schema_id)

# Avro schema definition
avro_schema = """{
  "type": "record",
  "name": "Order",
  "fields": [
    {"name": "order_id", "type": "string"},
    {"name": "product", "type": "string"},
    {"name": "quantity", "type": "int"}
  ]
}"""

# Create schema
schema = Schema(
    name=schema_path,
    type_=Schema.Type.AVRO,
    definition=avro_schema
)

result = schema_client.create_schema(
    parent=schema_client.common_project_path(project_id),
    schema=schema,
    schema_id=schema_id
)

print(f"Created schema: {result.name}")
```

## Exactly-Once Delivery

### Enable Exactly-Once

```python
from google.cloud import pubsub_v1

subscriber = pubsub_v1.SubscriberClient()

project_id = "my-project"
topic_id = "my-topic"
subscription_id = "exactly-once-subscription"

topic_path = subscriber.topic_path(project_id, topic_id)
subscription_path = subscriber.subscription_path(project_id, subscription_id)

# Create subscription with exactly-once delivery
request = {
    "name": subscription_path,
    "topic": topic_path,
    "enable_exactly_once_delivery": True
}

subscription = subscriber.create_subscription(request=request)
print(f"Created exactly-once subscription: {subscription.name}")
```

## Best Practices

### 1. Set Appropriate ACK Deadline

```python
# Extend ack deadline if processing takes longer
def callback(message):
    # Extend ack deadline to 60 seconds
    message.modify_ack_deadline(60)
    
    # Process message
    long_running_process(message.data)
    
    # Acknowledge
    message.ack()
```

### 2. Use Flow Control

```python
flow_control = pubsub_v1.types.FlowControl(
    max_messages=100,
    max_bytes=10 * 1024 * 1024,
    max_duration_per_lease_extension=600
)

subscriber.subscribe(subscription_path, callback=callback, flow_control=flow_control)
```

### 3. Handle Retries

```python
from google.api_core import retry

@retry.Retry()
def publish_with_retry():
    future = publisher.publish(topic_path, data)
    return future.result()
```

### 4. Use Batch Settings

```python
batch_settings = pubsub_v1.types.BatchSettings(
    max_messages=100,
    max_bytes=1 * 1024 * 1024,  # 1 MB
    max_latency=0.05  # 50 ms
)

publisher = pubsub_v1.PublisherClient(batch_settings=batch_settings)
```

### 5. Monitor Metrics

```python
# Check subscription metrics
from google.cloud import monitoring_v3

client = monitoring_v3.MetricServiceClient()
project_name = f"projects/{project_id}"

# Query metrics
results = client.list_time_series(
    name=project_name,
    filter='metric.type="pubsub.googleapis.com/subscription/num_undelivered_messages"',
    interval=interval,
    view=monitoring_v3.ListTimeSeriesRequest.TimeSeriesView.FULL
)
```

## Monitoring

### View Metrics (CLI)

```bash
# Get subscription details
gcloud pubsub subscriptions describe my-subscription

# List snapshots
gcloud pubsub snapshots list

# View topic metrics
gcloud pubsub topics describe my-topic
```

## Troubleshooting

### Message Not Received

```python
# Check subscription details
subscription = subscriber.get_subscription(
    request={"subscription": subscription_path}
)
print(f"Topic: {subscription.topic}")
print(f"ACK deadline: {subscription.ack_deadline_seconds}")
print(f"Message retention: {subscription.message_retention_duration}")
```

### High Undelivered Messages

```bash
# Increase parallel consumers
# Or optimize message processing time
# Or increase ack deadline
```

## Resources

- [Pub/Sub Documentation](https://cloud.google.com/pubsub/docs)
- [Python Client Library](https://cloud.google.com/python/docs/reference/pubsub/latest)
- [Node.js Client Library](https://cloud.google.com/nodejs/docs/reference/pubsub/latest)
- [Best Practices](https://cloud.google.com/pubsub/docs/publisher)

## Next Steps

- Create topic and subscription
- Publish messages
- Subscribe to messages
- Push subscriptions
- Message ordering
- Dead letter topics
- Filtering
- Schemas
- Exactly-once delivery
- Production deployment
