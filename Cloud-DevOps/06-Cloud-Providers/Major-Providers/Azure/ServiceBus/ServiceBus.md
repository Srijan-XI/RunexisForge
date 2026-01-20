# Azure Service Bus

## Introduction

### What is Azure Service Bus?

Azure Service Bus is a fully managed enterprise message broker with message queues and publish-subscribe topics. It provides reliable cloud messaging as a service and supports advanced messaging patterns including sessions, transactions, dead-lettering, and scheduled delivery.

### Why Azure Service Bus?

- **Enterprise-grade**: Built for mission-critical workloads
- **Advanced features**: Sessions, transactions, duplicate detection
- **Reliable**: Message durability and ordering guarantees
- **Scalable**: Auto-scaling capabilities
- **Integration**: Works with Azure ecosystem
- **Protocol support**: AMQP, HTTPS
- **Security**: Azure AD, managed identities
- **Flexible**: Queues and topics/subscriptions

### Key Features

- **Queues**: Point-to-point messaging
- **Topics/Subscriptions**: Publish/subscribe pattern
- **Sessions**: Ordered message processing
- **Message deferral**: Postpone message processing
- **Dead-letter queues**: Handle undeliverable messages
- **Duplicate detection**: Automatic deduplication
- **Transactions**: Atomic operations
- **Auto-forwarding**: Chain queues/topics
- **Message TTL**: Time-to-live configuration

## Prerequisites

- Azure Account
- Azure CLI installed
- Python/Node.js/Java SDK
- Understanding of messaging patterns
- Azure subscription

## Installation

### Azure CLI

```bash
# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login
az login

# Install Service Bus extension
az extension add --name servicebus
```

### Python SDK

```bash
pip install azure-servicebus azure-identity
```

### Node.js SDK

```bash
npm install @azure/service-bus @azure/identity
```

### Java SDK

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-messaging-servicebus</artifactId>
    <version>7.14.0</version>
</dependency>
```

## Setup

### Create Namespace (CLI)

```bash
# Create resource group
az group create --name my-rg --location eastus

# Create Service Bus namespace
az servicebus namespace create \
  --resource-group my-rg \
  --name my-servicebus-ns \
  --location eastus \
  --sku Standard

# Create queue
az servicebus queue create \
  --resource-group my-rg \
  --namespace-name my-servicebus-ns \
  --name my-queue

# Create topic
az servicebus topic create \
  --resource-group my-rg \
  --namespace-name my-servicebus-ns \
  --name my-topic

# Create subscription
az servicebus topic subscription create \
  --resource-group my-rg \
  --namespace-name my-servicebus-ns \
  --topic-name my-topic \
  --name my-subscription

# Get connection string
az servicebus namespace authorization-rule keys list \
  --resource-group my-rg \
  --namespace-name my-servicebus-ns \
  --name RootManageSharedAccessKey \
  --query primaryConnectionString \
  --output tsv
```

## Queues - Python

### Send Messages

```python
from azure.servicebus import ServiceBusClient, ServiceBusMessage
import os

# Connection string
conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
queue_name = "my-queue"

# Create client
servicebus_client = ServiceBusClient.from_connection_string(conn_str)

# Create sender
sender = servicebus_client.get_queue_sender(queue_name=queue_name)

with sender:
    # Send single message
    message = ServiceBusMessage("Hello, Azure Service Bus!")
    sender.send_messages(message)
    print("Sent single message")
    
    # Send batch
    messages = [
        ServiceBusMessage(f"Message {i}")
        for i in range(10)
    ]
    sender.send_messages(messages)
    print("Sent batch of messages")

servicebus_client.close()
```

### Receive Messages

```python
from azure.servicebus import ServiceBusClient
import os

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
queue_name = "my-queue"

servicebus_client = ServiceBusClient.from_connection_string(conn_str)

# Create receiver
receiver = servicebus_client.get_queue_receiver(queue_name=queue_name)

with receiver:
    # Receive messages
    received_msgs = receiver.receive_messages(max_message_count=10, max_wait_time=5)
    
    for msg in received_msgs:
        print(f"Received: {str(msg)}")
        # Complete the message (remove from queue)
        receiver.complete_message(msg)

servicebus_client.close()
```

### Continuous Receiver

```python
from azure.servicebus import ServiceBusClient
import os

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
queue_name = "my-queue"

servicebus_client = ServiceBusClient.from_connection_string(conn_str)

with servicebus_client:
    receiver = servicebus_client.get_queue_receiver(queue_name=queue_name)
    
    with receiver:
        while True:
            received_msgs = receiver.receive_messages(max_message_count=10, max_wait_time=5)
            
            if not received_msgs:
                print("No messages received")
                continue
            
            for msg in received_msgs:
                try:
                    print(f"Processing: {str(msg)}")
                    # Process message
                    process_message(msg)
                    # Complete message
                    receiver.complete_message(msg)
                except Exception as e:
                    print(f"Error: {e}")
                    # Dead-letter the message
                    receiver.dead_letter_message(msg, reason="ProcessingError")
```

## Message Properties

### Sending with Properties

```python
from azure.servicebus import ServiceBusClient, ServiceBusMessage
import os
from datetime import datetime, timedelta

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
queue_name = "my-queue"

servicebus_client = ServiceBusClient.from_connection_string(conn_str)

with servicebus_client:
    sender = servicebus_client.get_queue_sender(queue_name=queue_name)
    
    with sender:
        message = ServiceBusMessage("Order data")
        
        # Set properties
        message.application_properties = {
            "order_id": "12345",
            "priority": "high",
            "customer_type": "premium"
        }
        
        # Set message ID
        message.message_id = "msg-001"
        
        # Set correlation ID
        message.correlation_id = "corr-001"
        
        # Set content type
        message.content_type = "application/json"
        
        # Set time to live
        message.time_to_live = timedelta(hours=1)
        
        # Schedule message for future delivery
        scheduled_time = datetime.utcnow() + timedelta(minutes=5)
        message.scheduled_enqueue_time_utc = scheduled_time
        
        sender.send_messages(message)
        print("Message sent with properties")
```

## Topics and Subscriptions

### Send to Topic

```python
from azure.servicebus import ServiceBusClient, ServiceBusMessage
import json
import os

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
topic_name = "my-topic"

servicebus_client = ServiceBusClient.from_connection_string(conn_str)

with servicebus_client:
    sender = servicebus_client.get_topic_sender(topic_name=topic_name)
    
    with sender:
        # Send order event
        order_event = {
            "event_type": "order_created",
            "order_id": "12345",
            "amount": 99.99,
            "customer_id": "cust-001"
        }
        
        message = ServiceBusMessage(json.dumps(order_event))
        message.application_properties = {
            "event_type": "order",
            "priority": "high"
        }
        
        sender.send_messages(message)
        print("Published to topic")
```

### Receive from Subscription

```python
from azure.servicebus import ServiceBusClient
import os

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
topic_name = "my-topic"
subscription_name = "my-subscription"

servicebus_client = ServiceBusClient.from_connection_string(conn_str)

with servicebus_client:
    receiver = servicebus_client.get_subscription_receiver(
        topic_name=topic_name,
        subscription_name=subscription_name
    )
    
    with receiver:
        received_msgs = receiver.receive_messages(max_message_count=10, max_wait_time=5)
        
        for msg in received_msgs:
            print(f"Received from subscription: {str(msg)}")
            receiver.complete_message(msg)
```

## Subscription Filters

### Create SQL Filter

```bash
# Create subscription with SQL filter
az servicebus topic subscription create \
  --resource-group my-rg \
  --namespace-name my-servicebus-ns \
  --topic-name my-topic \
  --name high-priority-sub

# Add SQL filter rule
az servicebus topic subscription rule create \
  --resource-group my-rg \
  --namespace-name my-servicebus-ns \
  --topic-name my-topic \
  --subscription-name high-priority-sub \
  --name HighPriorityRule \
  --filter-sql-expression "priority = 'high'"
```

### Python - Create Filter

```python
from azure.servicebus.management import ServiceBusAdministrationClient, SqlRuleFilter
import os

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']

admin_client = ServiceBusAdministrationClient.from_connection_string(conn_str)

# Create subscription with filter
topic_name = "my-topic"
subscription_name = "premium-customers"

# Create subscription
admin_client.create_subscription(
    topic_name=topic_name,
    subscription_name=subscription_name
)

# Create SQL filter
rule_name = "PremiumCustomerRule"
sql_filter = SqlRuleFilter("customer_type = 'premium' AND priority = 'high'")

admin_client.create_rule(
    topic_name=topic_name,
    subscription_name=subscription_name,
    rule_name=rule_name,
    filter=sql_filter
)

print("Filter created")
admin_client.close()
```

## Sessions

### Send Session Messages

```python
from azure.servicebus import ServiceBusClient, ServiceBusMessage
import os

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
queue_name = "session-queue"  # Must be session-enabled

servicebus_client = ServiceBusClient.from_connection_string(conn_str)

with servicebus_client:
    sender = servicebus_client.get_queue_sender(queue_name=queue_name)
    
    with sender:
        # Send messages with same session ID (will be processed in order)
        session_id = "session-001"
        
        for i in range(5):
            message = ServiceBusMessage(f"Session message {i}")
            message.session_id = session_id
            sender.send_messages(message)
        
        print(f"Sent session messages for {session_id}")
```

### Receive Session Messages

```python
from azure.servicebus import ServiceBusClient
import os

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
queue_name = "session-queue"

servicebus_client = ServiceBusClient.from_connection_string(conn_str)

with servicebus_client:
    # Receive from specific session
    receiver = servicebus_client.get_queue_receiver(
        queue_name=queue_name,
        session_id="session-001"
    )
    
    with receiver:
        # Get session state
        session_state = receiver.get_session_state()
        print(f"Session state: {session_state}")
        
        # Receive messages
        received_msgs = receiver.receive_messages(max_message_count=10, max_wait_time=5)
        
        for msg in received_msgs:
            print(f"Received: {str(msg)}")
            receiver.complete_message(msg)
        
        # Set session state
        receiver.set_session_state("processed")
```

## Dead Letter Queue

### Handle Dead Letters

```python
from azure.servicebus import ServiceBusClient
import os

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
queue_name = "my-queue"

servicebus_client = ServiceBusClient.from_connection_string(conn_str)

with servicebus_client:
    # Access dead letter queue
    dlq_receiver = servicebus_client.get_queue_receiver(
        queue_name=queue_name,
        sub_queue="deadletter"
    )
    
    with dlq_receiver:
        dlq_msgs = dlq_receiver.receive_messages(max_message_count=10, max_wait_time=5)
        
        for msg in dlq_msgs:
            print(f"Dead letter message: {str(msg)}")
            print(f"Reason: {msg.application_properties.get('DeadLetterReason')}")
            print(f"Error: {msg.application_properties.get('DeadLetterErrorDescription')}")
            
            # Optionally resubmit or delete
            dlq_receiver.complete_message(msg)
```

## Node.js Examples

### Send Messages

```javascript
const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const queueName = "my-queue";

async function sendMessages() {
  const sbClient = new ServiceBusClient(connectionString);
  const sender = sbClient.createSender(queueName);

  try {
    // Send single message
    await sender.sendMessages({
      body: "Hello, Azure Service Bus!",
      applicationProperties: {
        priority: "high"
      }
    });

    // Send batch
    const messages = [];
    for (let i = 0; i < 10; i++) {
      messages.push({ body: `Message ${i}` });
    }
    await sender.sendMessages(messages);

    console.log("Messages sent");
  } finally {
    await sender.close();
    await sbClient.close();
  }
}

sendMessages();
```

### Receive Messages

```javascript
const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const queueName = "my-queue";

async function receiveMessages() {
  const sbClient = new ServiceBusClient(connectionString);
  const receiver = sbClient.createReceiver(queueName);

  const messageHandler = async (messageReceived) => {
    console.log(`Received: ${messageReceived.body}`);
    await receiver.completeMessage(messageReceived);
  };

  const errorHandler = async (error) => {
    console.error("Error:", error);
  };

  receiver.subscribe({
    processMessage: messageHandler,
    processError: errorHandler
  });

  console.log("Listening for messages...");
  
  // Keep running
  await new Promise((resolve) => setTimeout(resolve, 60000));
  
  await receiver.close();
  await sbClient.close();
}

receiveMessages();
```

### Topic/Subscription

```javascript
const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const topicName = "my-topic";
const subscriptionName = "my-subscription";

// Publisher
async function publishToTopic() {
  const sbClient = new ServiceBusClient(connectionString);
  const sender = sbClient.createSender(topicName);

  try {
    await sender.sendMessages({
      body: JSON.stringify({ event: "order_created", orderId: "12345" }),
      contentType: "application/json",
      applicationProperties: {
        event_type: "order",
        priority: "high"
      }
    });

    console.log("Published to topic");
  } finally {
    await sender.close();
    await sbClient.close();
  }
}

// Subscriber
async function subscribeToTopic() {
  const sbClient = new ServiceBusClient(connectionString);
  const receiver = sbClient.createReceiver(topicName, subscriptionName);

  const messageHandler = async (message) => {
    console.log(`Received: ${message.body}`);
    await receiver.completeMessage(message);
  };

  receiver.subscribe({
    processMessage: messageHandler,
    processError: async (error) => console.error(error)
  });

  console.log("Subscribed to topic");
}
```

## Java Example

```java
import com.azure.messaging.servicebus.*;

public class ServiceBusExample {
    static String connectionString = System.getenv("SERVICE_BUS_CONNECTION_STRING");
    static String queueName = "my-queue";

    // Send messages
    public static void sendMessage() {
        ServiceBusClientBuilder builder = new ServiceBusClientBuilder()
            .connectionString(connectionString);
        
        ServiceBusSenderClient sender = builder
            .sender()
            .queueName(queueName)
            .buildClient();
        
        ServiceBusMessage message = new ServiceBusMessage("Hello from Java!");
        message.getApplicationProperties().put("priority", "high");
        
        sender.sendMessage(message);
        System.out.println("Message sent");
        
        sender.close();
    }

    // Receive messages
    public static void receiveMessages() {
        ServiceBusClientBuilder builder = new ServiceBusClientBuilder()
            .connectionString(connectionString);
        
        ServiceBusReceiverClient receiver = builder
            .receiver()
            .queueName(queueName)
            .buildClient();
        
        receiver.receiveMessages(10).forEach(message -> {
            System.out.println("Received: " + message.getBody());
            receiver.complete(message);
        });
        
        receiver.close();
    }

    public static void main(String[] args) {
        sendMessage();
        receiveMessages();
    }
}
```

## Transactions

```python
from azure.servicebus import ServiceBusClient, ServiceBusMessage
import os

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
queue_name = "my-queue"

servicebus_client = ServiceBusClient.from_connection_string(conn_str)

with servicebus_client:
    sender = servicebus_client.get_queue_sender(queue_name=queue_name)
    
    with sender:
        # Start transaction
        with sender.create_transaction() as transaction:
            message1 = ServiceBusMessage("Message 1")
            message2 = ServiceBusMessage("Message 2")
            
            # Both messages sent atomically
            sender.send_messages(message1, transaction=transaction)
            sender.send_messages(message2, transaction=transaction)
        
        print("Transaction committed")
```

## Best Practices

### 1. Use Managed Identity

```python
from azure.identity import DefaultAzureCredential
from azure.servicebus import ServiceBusClient

# Use managed identity instead of connection string
credential = DefaultAzureCredential()
fully_qualified_namespace = "my-servicebus-ns.servicebus.windows.net"

servicebus_client = ServiceBusClient(
    fully_qualified_namespace=fully_qualified_namespace,
    credential=credential
)
```

### 2. Handle Errors Gracefully

```python
from azure.servicebus import ServiceBusClient
from azure.core.exceptions import ServiceBusError

with servicebus_client:
    receiver = servicebus_client.get_queue_receiver(queue_name=queue_name)
    
    with receiver:
        for msg in receiver.receive_messages(max_message_count=10, max_wait_time=5):
            try:
                process_message(msg)
                receiver.complete_message(msg)
            except Exception as e:
                print(f"Error processing: {e}")
                receiver.dead_letter_message(
                    msg,
                    reason="ProcessingError",
                    error_description=str(e)
                )
```

### 3. Use Batching

```python
# Send batch for efficiency
messages = [ServiceBusMessage(f"Message {i}") for i in range(100)]
sender.send_messages(messages)
```

### 4. Configure Dead Letter Queue

```bash
# Set max delivery count
az servicebus queue update \
  --resource-group my-rg \
  --namespace-name my-servicebus-ns \
  --name my-queue \
  --max-delivery-count 5
```

## Monitoring

### Azure Portal Metrics

- Active messages
- Incoming messages
- Outgoing messages
- Dead-letter messages
- Size

### Python - Get Metrics

```python
from azure.servicebus.management import ServiceBusAdministrationClient
import os

conn_str = os.environ['SERVICE_BUS_CONNECTION_STRING']
admin_client = ServiceBusAdministrationClient.from_connection_string(conn_str)

# Get queue runtime properties
queue_runtime = admin_client.get_queue_runtime_properties("my-queue")

print(f"Active messages: {queue_runtime.active_message_count}")
print(f"Dead letter messages: {queue_runtime.dead_letter_message_count}")
print(f"Size (bytes): {queue_runtime.size_in_bytes}")

admin_client.close()
```

## Resources

- [Azure Service Bus Documentation](https://docs.microsoft.com/azure/service-bus-messaging/)
- [Python SDK](https://docs.microsoft.com/python/api/overview/azure/servicebus)
- [Node.js SDK](https://docs.microsoft.com/javascript/api/overview/azure/service-bus)
- [Best Practices](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-performance-improvements)

## Next Steps

- Create namespace
- Send/receive queue messages
- Topics and subscriptions
- Filters and rules
- Sessions
- Dead letter handling
- Managed identity
- Monitoring
- Production deployment
- Performance tuning
