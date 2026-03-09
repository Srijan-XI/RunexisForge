# ActiveMQ

## Introduction

### What is ActiveMQ?

Apache ActiveMQ is a powerful, open-source message broker written in Java that supports multiple messaging protocols and patterns. It provides reliable, high-performance messaging for enterprise applications and microservices architectures. ActiveMQ Classic is the traditional version, while ActiveMQ Artemis is the next-generation broker.

### Why ActiveMQ?

- JMS 2.0 specification compliant
- Multiple protocol support (AMQP, MQTT, STOMP, OpenWire)
- Cross-language client support
- High availability and clustering
- Message persistence
- Enterprise integration patterns
- REST API
- Advanced routing
- Large community
- Production-proven

### Key Features

- **JMS Support**: Full JMS 1.1 and 2.0 compliance
- **Multi-Protocol**: AMQP, MQTT, STOMP, OpenWire, WebSocket
- **Message Groups**: Ordered message processing
- **Virtual Destinations**: Dynamic routing
- **Network of Brokers**: Distributed messaging
- **Master/Slave**: High availability
- **Message Selectors**: Filter messages on consumer side
- **Advisory Messages**: Monitor broker events

## Prerequisites

- Java 11+ (for ActiveMQ Artemis)
- Java 8+ (for ActiveMQ Classic)
- Understanding of messaging concepts
- Basic Java knowledge

## Installation

### ActiveMQ Classic

#### Using Docker

```bash
# Run ActiveMQ Classic
docker run -d --name activemq \
  -p 61616:61616 \
  -p 8161:8161 \
  apache/activemq-classic:latest

# Access Web Console at http://localhost:8161
# Default credentials: admin/admin
```

#### Manual Installation

```bash
# Download
wget https://archive.apache.org/dist/activemq/5.18.0/apache-activemq-5.18.0-bin.tar.gz

# Extract
tar -xzf apache-activemq-5.18.0-bin.tar.gz
cd apache-activemq-5.18.0

# Start broker
./bin/activemq start

# Stop broker
./bin/activemq stop

# Console
./bin/activemq console
```

### ActiveMQ Artemis

#### Using Docker

```bash
# Run ActiveMQ Artemis
docker run -d --name artemis \
  -p 61616:61616 \
  -p 8161:8161 \
  -e ARTEMIS_USERNAME=admin \
  -e ARTEMIS_PASSWORD=admin \
  apache/activemq-artemis:latest

# Access Console at http://localhost:8161/console
```

#### Manual Installation

```bash
# Download
wget https://archive.apache.org/dist/activemq/activemq-artemis/2.31.0/apache-artemis-2.31.0-bin.tar.gz

# Extract
tar -xzf apache-artemis-2.31.0-bin.tar.gz
cd apache-artemis-2.31.0

# Create broker instance
./bin/artemis create mybroker --user admin --password admin

# Start broker
cd mybroker
./bin/artemis run
```

## Basic Usage - Java (JMS)

### Maven Dependencies

```xml
<!-- ActiveMQ Classic -->
<dependency>
    <groupId>org.apache.activemq</groupId>
    <artifactId>activemq-client</artifactId>
    <version>5.18.0</version>
</dependency>

<!-- ActiveMQ Artemis -->
<dependency>
    <groupId>org.apache.activemq</groupId>
    <artifactId>artemis-jms-client</artifactId>
    <version>2.31.0</version>
</dependency>
```

### Producer (Message Sender)

```java
import javax.jms.*;
import org.apache.activemq.ActiveMQConnectionFactory;

public class Producer {
    public static void main(String[] args) throws JMSException {
        // Create connection factory
        ConnectionFactory factory = new ActiveMQConnectionFactory(
            "tcp://localhost:61616"
        );
        
        // Create connection
        Connection connection = factory.createConnection();
        connection.start();
        
        // Create session
        Session session = connection.createSession(
            false,
            Session.AUTO_ACKNOWLEDGE
        );
        
        // Create destination (queue)
        Destination destination = session.createQueue("TEST.QUEUE");
        
        // Create producer
        MessageProducer producer = session.createProducer(destination);
        producer.setDeliveryMode(DeliveryMode.PERSISTENT);
        
        // Create and send message
        TextMessage message = session.createTextMessage("Hello ActiveMQ!");
        producer.send(message);
        
        System.out.println("Sent: " + message.getText());
        
        // Cleanup
        session.close();
        connection.close();
    }
}
```

### Consumer (Message Receiver)

```java
import javax.jms.*;
import org.apache.activemq.ActiveMQConnectionFactory;

public class Consumer {
    public static void main(String[] args) throws JMSException {
        ConnectionFactory factory = new ActiveMQConnectionFactory(
            "tcp://localhost:61616"
        );
        
        Connection connection = factory.createConnection();
        connection.start();
        
        Session session = connection.createSession(
            false,
            Session.AUTO_ACKNOWLEDGE
        );
        
        Destination destination = session.createQueue("TEST.QUEUE");
        
        MessageConsumer consumer = session.createConsumer(destination);
        
        // Synchronous receive
        Message message = consumer.receive(5000);
        
        if (message instanceof TextMessage) {
            TextMessage textMessage = (TextMessage) message;
            System.out.println("Received: " + textMessage.getText());
        }
        
        session.close();
        connection.close();
    }
}
```

### Asynchronous Consumer

```java
import javax.jms.*;
import org.apache.activemq.ActiveMQConnectionFactory;

public class AsyncConsumer {
    public static void main(String[] args) throws JMSException {
        ConnectionFactory factory = new ActiveMQConnectionFactory(
            "tcp://localhost:61616"
        );
        
        Connection connection = factory.createConnection();
        connection.start();
        
        Session session = connection.createSession(
            false,
            Session.AUTO_ACKNOWLEDGE
        );
        
        Destination destination = session.createQueue("TEST.QUEUE");
        MessageConsumer consumer = session.createConsumer(destination);
        
        // Set message listener
        consumer.setMessageListener(new MessageListener() {
            public void onMessage(Message message) {
                try {
                    if (message instanceof TextMessage) {
                        TextMessage textMessage = (TextMessage) message;
                        System.out.println("Received: " + textMessage.getText());
                    }
                } catch (JMSException e) {
                    e.printStackTrace();
                }
            }
        });
        
        System.out.println("Waiting for messages...");
        
        // Keep application running
        try {
            Thread.sleep(60000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        session.close();
        connection.close();
    }
}
```

## Queue vs Topic

### Queue (Point-to-Point)

```java
// Producer
Destination queue = session.createQueue("ORDER.QUEUE");
MessageProducer producer = session.createProducer(queue);

TextMessage message = session.createTextMessage("Order #12345");
producer.send(message);

// Consumer
Destination queue = session.createQueue("ORDER.QUEUE");
MessageConsumer consumer = session.createConsumer(queue);
```

### Topic (Publish/Subscribe)

```java
// Publisher
Topic topic = session.createTopic("NEWS.TOPIC");
MessageProducer publisher = session.createProducer(topic);

TextMessage message = session.createTextMessage("Breaking News!");
publisher.send(message);

// Subscriber
Topic topic = session.createTopic("NEWS.TOPIC");
MessageConsumer subscriber = session.createConsumer(topic);
```

### Durable Subscription

```java
// Create durable subscriber
ConnectionFactory factory = new ActiveMQConnectionFactory("tcp://localhost:61616");
Connection connection = factory.createConnection();
connection.setClientID("DurableClient");
connection.start();

Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
Topic topic = session.createTopic("NEWS.TOPIC");

// Create durable subscriber
TopicSubscriber subscriber = session.createDurableSubscriber(topic, "MySub");

subscriber.setMessageListener(message -> {
    try {
        TextMessage textMessage = (TextMessage) message;
        System.out.println("Received: " + textMessage.getText());
    } catch (JMSException e) {
        e.printStackTrace();
    }
});

// Messages published while offline will be delivered when reconnected
```

## Message Types

### TextMessage

```java
TextMessage textMsg = session.createTextMessage("Hello World");
producer.send(textMsg);
```

### ObjectMessage

```java
// Serializable object
MyObject obj = new MyObject("data");
ObjectMessage objMsg = session.createObjectMessage(obj);
producer.send(objMsg);
```

### MapMessage

```java
MapMessage mapMsg = session.createMapMessage();
mapMsg.setString("name", "Alice");
mapMsg.setInt("age", 30);
mapMsg.setBoolean("active", true);
producer.send(mapMsg);

// Consumer
MapMessage received = (MapMessage) consumer.receive();
String name = received.getString("name");
int age = received.getInt("age");
```

### BytesMessage

```java
BytesMessage bytesMsg = session.createBytesMessage();
bytesMsg.writeBytes("Binary data".getBytes());
producer.send(bytesMsg);
```

### StreamMessage

```java
StreamMessage streamMsg = session.createStreamMessage();
streamMsg.writeString("Alice");
streamMsg.writeInt(30);
streamMsg.writeBoolean(true);
producer.send(streamMsg);
```

## Message Properties and Headers

### Setting Properties

```java
TextMessage message = session.createTextMessage("Important message");

// Custom properties
message.setStringProperty("priority", "high");
message.setIntProperty("version", 1);
message.setBooleanProperty("urgent", true);

// JMS headers
message.setJMSCorrelationID("12345");
message.setJMSReplyTo(session.createQueue("REPLY.QUEUE"));

producer.send(message);
```

### Message Selectors

```java
// Consumer with selector
String selector = "priority = 'high' AND urgent = true";
MessageConsumer consumer = session.createConsumer(destination, selector);

// Only receives messages matching the selector
```

## Request/Reply Pattern

### Requestor

```java
import javax.jms.*;
import org.apache.activemq.ActiveMQConnectionFactory;

public class Requestor {
    public static void main(String[] args) throws JMSException {
        ConnectionFactory factory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        Connection connection = factory.createConnection();
        connection.start();
        
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
        
        // Request queue
        Destination requestQueue = session.createQueue("REQUEST.QUEUE");
        
        // Temporary queue for replies
        TemporaryQueue replyQueue = session.createTemporaryQueue();
        
        MessageProducer producer = session.createProducer(requestQueue);
        MessageConsumer consumer = session.createConsumer(replyQueue);
        
        // Send request
        TextMessage request = session.createTextMessage("Calculate 10 + 5");
        request.setJMSReplyTo(replyQueue);
        request.setJMSCorrelationID(java.util.UUID.randomUUID().toString());
        
        producer.send(request);
        System.out.println("Sent request: " + request.getText());
        
        // Wait for reply
        Message reply = consumer.receive(5000);
        if (reply instanceof TextMessage) {
            TextMessage textReply = (TextMessage) reply;
            System.out.println("Received reply: " + textReply.getText());
        }
        
        connection.close();
    }
}
```

### Replier

```java
import javax.jms.*;
import org.apache.activemq.ActiveMQConnectionFactory;

public class Replier {
    public static void main(String[] args) throws JMSException, InterruptedException {
        ConnectionFactory factory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        Connection connection = factory.createConnection();
        connection.start();
        
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
        Destination requestQueue = session.createQueue("REQUEST.QUEUE");
        
        MessageConsumer consumer = session.createConsumer(requestQueue);
        MessageProducer producer = session.createProducer(null);
        
        consumer.setMessageListener(message -> {
            try {
                if (message instanceof TextMessage) {
                    TextMessage textMessage = (TextMessage) message;
                    System.out.println("Received request: " + textMessage.getText());
                    
                    // Process request
                    String result = "Result: 15";
                    
                    // Send reply
                    TextMessage reply = session.createTextMessage(result);
                    reply.setJMSCorrelationID(message.getJMSCorrelationID());
                    
                    producer.send(message.getJMSReplyTo(), reply);
                    System.out.println("Sent reply: " + result);
                }
            } catch (JMSException e) {
                e.printStackTrace();
            }
        });
        
        System.out.println("Replier waiting for requests...");
        Thread.sleep(60000);
        
        connection.close();
    }
}
```

## Python Client (using STOMP)

### Installation

```bash
pip install stomp.py
```

### Producer

```python
import stomp
import time

# Connect to broker
conn = stomp.Connection([('localhost', 61613)])
conn.connect('admin', 'admin', wait=True)

# Send message
conn.send(body='Hello from Python!', destination='/queue/TEST.QUEUE')

print("Message sent")

# Disconnect
conn.disconnect()
```

### Consumer

```python
import stomp
import time

class MyListener(stomp.ConnectionListener):
    def on_message(self, frame):
        print(f"Received: {frame.body}")

# Connect
conn = stomp.Connection([('localhost', 61613)])
conn.set_listener('', MyListener())
conn.connect('admin', 'admin', wait=True)

# Subscribe
conn.subscribe(destination='/queue/TEST.QUEUE', id=1, ack='auto')

print("Waiting for messages...")
time.sleep(60)

conn.disconnect()
```

## Node.js Client

### Installation

```bash
npm install stompit
```

### Producer

```javascript
// producer.js
const stompit = require('stompit');

const connectOptions = {
  'host': 'localhost',
  'port': 61613,
  'connectHeaders': {
    'host': '/',
    'login': 'admin',
    'passcode': 'admin'
  }
};

stompit.connect(connectOptions, (error, client) => {
  if (error) {
    console.log('Connection error: ' + error.message);
    return;
  }

  const frame = client.send({
    'destination': '/queue/TEST.QUEUE',
    'content-type': 'text/plain'
  });

  frame.write('Hello from Node.js!');
  frame.end();

  console.log('Message sent');
  
  client.disconnect();
});
```

### Consumer

```javascript
// consumer.js
const stompit = require('stompit');

const connectOptions = {
  'host': 'localhost',
  'port': 61613,
  'connectHeaders': {
    'host': '/',
    'login': 'admin',
    'passcode': 'admin'
  }
};

stompit.connect(connectOptions, (error, client) => {
  if (error) {
    console.log('Connection error: ' + error.message);
    return;
  }

  const subscribeHeaders = {
    'destination': '/queue/TEST.QUEUE',
    'ack': 'auto'
  };

  client.subscribe(subscribeHeaders, (error, message) => {
    if (error) {
      console.log('Subscribe error: ' + error.message);
      return;
    }

    message.readString('utf-8', (error, body) => {
      if (error) {
        console.log('Read error: ' + error.message);
        return;
      }

      console.log('Received: ' + body);
    });
  });

  console.log('Waiting for messages...');
});
```

## Advanced Features

### Message Groups

```java
// Producer - messages with same groupId processed by same consumer
for (int i = 0; i < 10; i++) {
    TextMessage message = session.createTextMessage("Message " + i);
    message.setStringProperty("JMSXGroupID", "Group1");
    message.setIntProperty("JMSXGroupSeq", i);
    producer.send(message);
}
```

### Exclusive Consumer

```java
// Only one consumer can consume from this queue
String selector = "JMSXConsumerExclusive = true";
MessageConsumer consumer = session.createConsumer(destination, selector);
```

### Virtual Destinations

```xml
<!-- activemq.xml -->
<destinationInterceptors>
  <virtualDestinationInterceptor>
    <virtualDestinations>
      <compositeTopic name="VirtualTopic.Orders">
        <forwardTo>
          <queue physicalName="Consumer.A.VirtualTopic.Orders"/>
          <queue physicalName="Consumer.B.VirtualTopic.Orders"/>
        </forwardTo>
      </compositeTopic>
    </virtualDestinations>
  </virtualDestinationInterceptor>
</destinationInterceptors>
```

### Dead Letter Queue

```xml
<!-- activemq.xml -->
<policyEntry queue=">" prioritizedMessages="true">
  <deadLetterStrategy>
    <individualDeadLetterStrategy queuePrefix="DLQ." />
  </deadLetterStrategy>
</policyEntry>
```

## Configuration

### activemq.xml (Classic)

```xml
<broker xmlns="http://activemq.apache.org/schema/core" brokerName="localhost" dataDirectory="${activemq.data}">

  <destinationPolicy>
    <policyMap>
      <policyEntries>
        <policyEntry queue=">" memoryLimit="10mb" producerFlowControl="true">
          <deadLetterStrategy>
            <individualDeadLetterStrategy queuePrefix="DLQ." useQueueForQueueMessages="true"/>
          </deadLetterStrategy>
        </policyEntry>
      </policyEntries>
    </policyMap>
  </destinationPolicy>

  <persistenceAdapter>
    <kahaDB directory="${activemq.data}/kahadb"/>
  </persistenceAdapter>

  <transportConnectors>
    <transportConnector name="openwire" uri="tcp://0.0.0.0:61616"/>
    <transportConnector name="amqp" uri="amqp://0.0.0.0:5672"/>
    <transportConnector name="stomp" uri="stomp://0.0.0.0:61613"/>
    <transportConnector name="mqtt" uri="mqtt://0.0.0.0:1883"/>
    <transportConnector name="ws" uri="ws://0.0.0.0:61614"/>
  </transportConnectors>

</broker>
```

### broker.xml (Artemis)

```xml
<configuration>
  <core>
    <name>0.0.0.0</name>

    <persistence-enabled>true</persistence-enabled>

    <addresses>
      <address name="TEST.QUEUE">
        <anycast>
          <queue name="TEST.QUEUE"/>
        </anycast>
      </address>
      
      <address name="NEWS.TOPIC">
        <multicast/>
      </address>
    </addresses>

    <acceptors>
      <acceptor name="artemis">tcp://0.0.0.0:61616</acceptor>
      <acceptor name="amqp">tcp://0.0.0.0:5672?protocols=AMQP</acceptor>
      <acceptor name="stomp">tcp://0.0.0.0:61613?protocols=STOMP</acceptor>
      <acceptor name="mqtt">tcp://0.0.0.0:1883?protocols=MQTT</acceptor>
    </acceptors>

  </core>
</configuration>
```

## Monitoring

### JMX Monitoring

```java
import javax.management.*;
import java.lang.management.ManagementFactory;

public class BrokerMonitor {
    public static void main(String[] args) throws Exception {
        MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();
        
        ObjectName queueName = new ObjectName(
            "org.apache.activemq:type=Broker,brokerName=localhost," +
            "destinationType=Queue,destinationName=TEST.QUEUE"
        );
        
        Long queueSize = (Long) mbs.getAttribute(queueName, "QueueSize");
        Long enqueueCount = (Long) mbs.getAttribute(queueName, "EnqueueCount");
        Long dequeueCount = (Long) mbs.getAttribute(queueName, "DequeueCount");
        
        System.out.println("Queue Size: " + queueSize);
        System.out.println("Enqueue Count: " + enqueueCount);
        System.out.println("Dequeue Count: " + dequeueCount);
    }
}
```

### REST API

```bash
# Get broker statistics
curl -u admin:admin http://localhost:8161/api/jolokia/read/org.apache.activemq:type=Broker,brokerName=localhost

# Get queue statistics
curl -u admin:admin http://localhost:8161/api/jolokia/read/org.apache.activemq:type=Broker,brokerName=localhost,destinationType=Queue,destinationName=TEST.QUEUE

# Purge queue
curl -u admin:admin -X POST http://localhost:8161/api/jolokia/exec/org.apache.activemq:type=Broker,brokerName=localhost,destinationType=Queue,destinationName=TEST.QUEUE/purge
```

## Best Practices

### 1. Use Persistent Messages for Important Data

```java
producer.setDeliveryMode(DeliveryMode.PERSISTENT);
```

### 2. Handle Exceptions Properly

```java
try {
    producer.send(message);
} catch (JMSException e) {
    // Log error, retry logic
    logger.error("Failed to send message", e);
}
```

### 3. Close Resources

```java
try (Connection connection = factory.createConnection();
     Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE)) {
    // Use connection and session
}
```

### 4. Use Message Selectors Wisely

```java
// Good - efficient filtering
String selector = "priority > 5 AND type = 'urgent'";

// Bad - brings all messages to client
// Filter in application instead
```

### 5. Set Timeouts

```java
// Receive with timeout
Message message = consumer.receive(5000);
```

## Troubleshooting

### Connection Issues

```java
// Add reconnection logic
ActiveMQConnectionFactory factory = new ActiveMQConnectionFactory(
    "failover:(tcp://localhost:61616,tcp://backup:61616)?randomize=false"
);
```

### Memory Issues

```xml
<!-- Set memory limits in activemq.xml -->
<policyEntry queue=">" memoryLimit="64mb"/>
```

### Slow Consumers

```xml
<!-- Enable slow consumer detection -->
<policyEntry queue=">" slowConsumerStrategy="abortConnection"/>
```

## Resources

- [ActiveMQ Documentation](https://activemq.apache.org/components/classic/)
- [Artemis Documentation](https://activemq.apache.org/components/artemis/)
- [JMS Specification](https://javaee.github.io/jms-spec/)
- [ActiveMQ GitHub](https://github.com/apache/activemq)

## Next Steps

- Install ActiveMQ
- Basic queue messaging
- Topic publish/subscribe
- Request/reply pattern
- Message selectors
- Durable subscriptions
- Clustering
- Monitoring
- Production deployment
- Performance tuning
