# AsyncAPI - Event-Driven API Specification

## Table of Contents
- [Introduction](#introduction)
- [Why AsyncAPI?](#why-asyncapi)
- [Core Concepts](#core-concepts)
- [Specification Structure](#specification-structure)
- [Supported Protocols](#supported-protocols)
- [Message Patterns](#message-patterns)
- [Tools & Ecosystem](#tools--ecosystem)
- [Code Generation](#code-generation)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Comparison with OpenAPI](#comparison-with-openapi)
- [Resources](#resources)

---

## Introduction

AsyncAPI is an open-source specification for defining and documenting event-driven, asynchronous APIs. Similar to how OpenAPI (Swagger) describes REST APIs, AsyncAPI provides a standard way to describe message-driven APIs including WebSockets, MQTT, AMQP, Kafka, and more.

### Key Features
- **Protocol Agnostic**: Support for multiple protocols (Kafka, MQTT, AMQP, WebSocket, etc.)
- **Message-Driven**: Focus on asynchronous, event-driven architectures
- **Code Generation**: Generate code, documentation, and tests from specifications
- **Schema Validation**: JSON Schema-based message validation
- **Documentation**: Auto-generate interactive documentation
- **Versioning**: Built-in API versioning support
- **Machine Readable**: JSON/YAML format for tooling integration
- **Community Driven**: Open-source with active community

---

## Why AsyncAPI?

### Benefits

1. **Standardization**
   - Common specification for async APIs
   - Reduces ambiguity in API contracts
   - Enables better collaboration between teams
   - Industry-standard approach

2. **Documentation**
   - Auto-generated interactive docs
   - Always up-to-date with code
   - Clear message structure and flows
   - Protocol-specific details

3. **Developer Experience**
   - Code generation for multiple languages
   - Type-safe message handling
   - Reduced boilerplate
   - Quick prototyping

4. **Integration**
   - CI/CD pipeline integration
   - API gateways and brokers
   - Monitoring and observability tools
   - Testing frameworks

### Use Cases
- Event-driven microservices
- Real-time data streaming
- IoT device communication
- WebSocket APIs
- Message queue systems
- Pub/Sub architectures
- Event sourcing systems

---

## Core Concepts

### AsyncAPI Document Structure

```yaml
asyncapi: '3.0.0'
info:
  title: User Service API
  version: '1.0.0'
  description: Asynchronous API for user-related events

servers:
  production:
    host: kafka.example.com:9092
    protocol: kafka
    description: Production Kafka cluster

channels:
  user/created:
    address: user.created
    messages:
      UserCreated:
        $ref: '#/components/messages/UserCreated'

operations:
  onUserCreated:
    action: receive
    channel:
      $ref: '#/channels/user~1created'

components:
  messages:
    UserCreated:
      payload:
        type: object
        properties:
          userId:
            type: string
          email:
            type: string
          createdAt:
            type: string
            format: date-time
```

### Key Concepts

#### Channels
Addressable components where messages flow (topics, queues, routing keys)

#### Messages
Data structures that flow through channels

#### Operations
Actions that can be performed (send, receive, publish, subscribe)

#### Servers
Connection details for message brokers/protocols

---

## Specification Structure

### Basic Structure

```yaml
asyncapi: '3.0.0'

info:
  title: My API
  version: '1.0.0'
  description: API description
  contact:
    name: API Support
    email: support@example.com
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0

servers:
  development:
    host: localhost:9092
    protocol: kafka
    description: Development server

channels:
  channel-name:
    address: topic.name
    messages:
      MessageName:
        $ref: '#/components/messages/MessageName'

operations:
  operationId:
    action: send
    channel:
      $ref: '#/channels/channel-name'

components:
  messages:
    MessageName:
      payload:
        type: object
```

### Info Object

```yaml
info:
  title: Order Processing API
  version: '2.1.0'
  description: |
    This API handles order processing events including:
    - Order creation
    - Payment processing
    - Fulfillment notifications
  
  termsOfService: https://example.com/terms
  
  contact:
    name: API Team
    url: https://example.com/support
    email: api@example.com
  
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
  
  tags:
    - name: orders
      description: Order-related events
    - name: payments
      description: Payment events
```

### Servers Object

```yaml
servers:
  production:
    host: kafka.prod.example.com:9092
    protocol: kafka
    description: Production Kafka cluster
    security:
      - saslScram: []
    bindings:
      kafka:
        schemaRegistryUrl: https://schema-registry.prod.example.com
  
  staging:
    host: kafka.staging.example.com:9092
    protocol: kafka
    description: Staging environment
  
  websocket:
    host: ws.example.com
    protocol: wss
    description: WebSocket server
    pathname: /events
```

### Channels & Messages

```yaml
channels:
  order/created:
    address: orders.created.v1
    description: Channel for order creation events
    messages:
      OrderCreated:
        $ref: '#/components/messages/OrderCreated'
    
  order/updated:
    address: orders.updated.v1
    messages:
      OrderUpdated:
        $ref: '#/components/messages/OrderUpdated'

components:
  messages:
    OrderCreated:
      name: OrderCreated
      title: Order Created Event
      summary: Published when a new order is created
      contentType: application/json
      payload:
        $ref: '#/components/schemas/OrderCreatedPayload'
      examples:
        - name: Basic Order
          payload:
            orderId: "12345"
            customerId: "user-001"
            total: 99.99
            status: "pending"
    
    OrderUpdated:
      payload:
        type: object
        properties:
          orderId:
            type: string
          status:
            type: string
            enum: [pending, processing, completed, cancelled]
          updatedAt:
            type: string
            format: date-time
```

---

## Supported Protocols

### Kafka

```yaml
servers:
  kafka:
    host: kafka.example.com:9092
    protocol: kafka
    description: Kafka message broker
    bindings:
      kafka:
        schemaRegistryUrl: https://schema-registry.example.com
        schemaRegistryVendor: confluent

channels:
  user-events:
    address: user.events
    bindings:
      kafka:
        topic: user-events
        partitions: 3
        replicas: 2
```

### MQTT

```yaml
servers:
  mqtt:
    host: mqtt.example.com:1883
    protocol: mqtt
    description: MQTT broker
    bindings:
      mqtt:
        clientId: user-service
        cleanSession: true

channels:
  sensor/temperature:
    address: sensors/temperature
    bindings:
      mqtt:
        qos: 1
        retain: false
```

### AMQP (RabbitMQ)

```yaml
servers:
  rabbitmq:
    host: rabbitmq.example.com:5672
    protocol: amqp
    description: RabbitMQ message broker

channels:
  orders:
    address: orders.queue
    bindings:
      amqp:
        is: queue
        queue:
          name: orders
          durable: true
          exclusive: false
          autoDelete: false
```

### WebSocket

```yaml
servers:
  websocket:
    host: ws.example.com
    protocol: wss
    pathname: /stream
    description: WebSocket connection

channels:
  events:
    address: /events
    messages:
      Event:
        $ref: '#/components/messages/Event'
```

### HTTP Streaming (SSE)

```yaml
servers:
  sse:
    host: api.example.com
    protocol: sse
    pathname: /events

channels:
  notifications:
    address: /notifications
    messages:
      Notification:
        $ref: '#/components/messages/Notification'
```

---

## Message Patterns

### Publish/Subscribe

```yaml
channels:
  news/published:
    address: news.published
    description: News article publication events
    
operations:
  publishNews:
    action: send
    channel:
      $ref: '#/channels/news~1published'
    messages:
      - $ref: '#/components/messages/NewsPublished'
  
  subscribeToNews:
    action: receive
    channel:
      $ref: '#/channels/news~1published'
```

### Request/Reply

```yaml
channels:
  user/query:
    address: user.query
    messages:
      UserQuery:
        $ref: '#/components/messages/UserQuery'
  
  user/response:
    address: user.response
    messages:
      UserResponse:
        $ref: '#/components/messages/UserResponse'

operations:
  queryUser:
    action: send
    channel:
      $ref: '#/channels/user~1query'
    reply:
      channel:
        $ref: '#/channels/user~1response'
```

### Event Streaming

```yaml
channels:
  orders/stream:
    address: orders.stream
    description: Real-time order event stream
    messages:
      OrderEvent:
        oneOf:
          - $ref: '#/components/messages/OrderCreated'
          - $ref: '#/components/messages/OrderUpdated'
          - $ref: '#/components/messages/OrderCancelled'
```

---

## Tools & Ecosystem

### AsyncAPI Generator

Generate code and documentation from AsyncAPI specs:

```bash
# Install AsyncAPI Generator
npm install -g @asyncapi/generator

# Generate HTML documentation
asyncapi generate fromTemplate asyncapi.yaml @asyncapi/html-template -o ./docs

# Generate Node.js code
asyncapi generate fromTemplate asyncapi.yaml @asyncapi/nodejs-template -o ./src

# Generate Java Spring code
asyncapi generate fromTemplate asyncapi.yaml @asyncapi/java-spring-template -o ./src

# Generate Markdown documentation
asyncapi generate fromTemplate asyncapi.yaml @asyncapi/markdown-template -o ./docs
```

### AsyncAPI Studio

Online editor for creating AsyncAPI specifications:

```
https://studio.asyncapi.com
```

### AsyncAPI CLI

```bash
# Install CLI
npm install -g @asyncapi/cli

# Validate specification
asyncapi validate asyncapi.yaml

# Bundle multiple files
asyncapi bundle asyncapi.yaml -o bundled.yaml

# Convert between versions
asyncapi convert asyncapi-v2.yaml -t 3.0.0 -o asyncapi-v3.yaml

# Diff between specs
asyncapi diff old.yaml new.yaml
```

### AsyncAPI Modelina

Generate data models from AsyncAPI specs:

```bash
# Install Modelina
npm install -g @asyncapi/modelina

# Generate TypeScript models
asyncapi generate models typescript asyncapi.yaml

# Generate Python models
asyncapi generate models python asyncapi.yaml

# Generate Java models
asyncapi generate models java asyncapi.yaml
```

---

## Code Generation

### Node.js Example

AsyncAPI spec:
```yaml
asyncapi: '3.0.0'
info:
  title: User Service
  version: '1.0.0'

servers:
  kafka:
    host: localhost:9092
    protocol: kafka

channels:
  user/created:
    address: user.created
    messages:
      UserCreated:
        payload:
          type: object
          properties:
            userId:
              type: string
            email:
              type: string
```

Generated TypeScript code:
```typescript
// Generated types
interface UserCreatedPayload {
  userId: string;
  email: string;
}

// Generated publisher
class UserService {
  async publishUserCreated(payload: UserCreatedPayload): Promise<void> {
    await this.kafka.send({
      topic: 'user.created',
      messages: [{ value: JSON.stringify(payload) }]
    });
  }
  
  async subscribeToUserCreated(
    handler: (payload: UserCreatedPayload) => Promise<void>
  ): Promise<void> {
    await this.kafka.subscribe({ topic: 'user.created' });
    
    await this.kafka.run({
      eachMessage: async ({ message }) => {
        const payload = JSON.parse(message.value.toString());
        await handler(payload);
      }
    });
  }
}
```

### Python Example

```python
# Generated from AsyncAPI spec
from dataclasses import dataclass
from typing import Protocol
from datetime import datetime

@dataclass
class UserCreatedPayload:
    user_id: str
    email: str
    created_at: datetime

class UserEventPublisher(Protocol):
    async def publish_user_created(self, payload: UserCreatedPayload) -> None:
        """Publish user created event to user.created topic"""
        pass

class UserEventSubscriber(Protocol):
    async def on_user_created(self, payload: UserCreatedPayload) -> None:
        """Handle user created event from user.created topic"""
        pass
```

---

## Best Practices

### 1. Use Semantic Versioning

```yaml
info:
  version: '2.1.0'  # MAJOR.MINOR.PATCH
  
channels:
  user/created/v2:  # Include version in channel names
    address: user.created.v2
```

### 2. Define Clear Message Schemas

```yaml
components:
  schemas:
    OrderCreatedPayload:
      type: object
      required:
        - orderId
        - customerId
        - total
      properties:
        orderId:
          type: string
          description: Unique order identifier
          example: "ORD-12345"
        customerId:
          type: string
          description: Customer identifier
        total:
          type: number
          format: double
          minimum: 0
          description: Order total amount
        items:
          type: array
          items:
            $ref: '#/components/schemas/OrderItem'
```

### 3. Use Message Headers

```yaml
components:
  messages:
    OrderCreated:
      headers:
        type: object
        properties:
          correlationId:
            type: string
            description: Correlation ID for tracing
          timestamp:
            type: string
            format: date-time
          eventType:
            type: string
            const: order.created
      payload:
        $ref: '#/components/schemas/OrderCreatedPayload'
```

### 4. Document Examples

```yaml
components:
  messages:
    UserCreated:
      payload:
        $ref: '#/components/schemas/User'
      examples:
        - name: New User Registration
          summary: Example of new user registration event
          payload:
            userId: "user-123"
            email: "john.doe@example.com"
            name: "John Doe"
            createdAt: "2026-01-20T10:00:00Z"
```

### 5. Use References for Reusability

```yaml
components:
  schemas:
    Timestamp:
      type: string
      format: date-time
    
    EventMetadata:
      type: object
      properties:
        eventId:
          type: string
        timestamp:
          $ref: '#/components/schemas/Timestamp'
        source:
          type: string
  
  messages:
    OrderCreated:
      payload:
        allOf:
          - $ref: '#/components/schemas/EventMetadata'
          - type: object
            properties:
              orderId:
                type: string
```

### 6. Security Definitions

```yaml
servers:
  production:
    host: kafka.example.com:9092
    protocol: kafka-secure
    security:
      - saslScram: []

components:
  securitySchemes:
    saslScram:
      type: scramSha256
      description: SASL/SCRAM authentication
    
    apiKey:
      type: apiKey
      in: user
      description: API key authentication
```

---

## Real-World Examples

### E-Commerce Order Processing

```yaml
asyncapi: '3.0.0'

info:
  title: E-Commerce Order Processing API
  version: '1.0.0'
  description: Event-driven API for order processing workflow

servers:
  kafka:
    host: kafka.example.com:9092
    protocol: kafka
    description: Production Kafka cluster

channels:
  orders/created:
    address: orders.created
    description: Published when a new order is created
    messages:
      OrderCreated:
        $ref: '#/components/messages/OrderCreated'
  
  orders/payment-processed:
    address: orders.payment.processed
    messages:
      PaymentProcessed:
        $ref: '#/components/messages/PaymentProcessed'
  
  orders/shipped:
    address: orders.shipped
    messages:
      OrderShipped:
        $ref: '#/components/messages/OrderShipped'

operations:
  onOrderCreated:
    action: receive
    channel:
      $ref: '#/channels/orders~1created'
  
  publishPaymentProcessed:
    action: send
    channel:
      $ref: '#/channels/orders~1payment-processed'

components:
  messages:
    OrderCreated:
      contentType: application/json
      payload:
        type: object
        required: [orderId, customerId, items, total]
        properties:
          orderId:
            type: string
          customerId:
            type: string
          items:
            type: array
            items:
              type: object
              properties:
                productId:
                  type: string
                quantity:
                  type: integer
                price:
                  type: number
          total:
            type: number
          createdAt:
            type: string
            format: date-time
    
    PaymentProcessed:
      payload:
        type: object
        properties:
          orderId:
            type: string
          paymentId:
            type: string
          amount:
            type: number
          status:
            type: string
            enum: [success, failed]
          processedAt:
            type: string
            format: date-time
    
    OrderShipped:
      payload:
        type: object
        properties:
          orderId:
            type: string
          trackingNumber:
            type: string
          carrier:
            type: string
          shippedAt:
            type: string
            format: date-time
```

### IoT Sensor Data Stream

```yaml
asyncapi: '3.0.0'

info:
  title: IoT Sensor Data API
  version: '1.0.0'

servers:
  mqtt:
    host: mqtt.iot.example.com:8883
    protocol: mqtts
    description: Secure MQTT broker

channels:
  sensors/temperature:
    address: sensors/{sensorId}/temperature
    description: Temperature sensor readings
    parameters:
      sensorId:
        description: Unique sensor identifier
        schema:
          type: string
    messages:
      TemperatureReading:
        payload:
          type: object
          properties:
            sensorId:
              type: string
            temperature:
              type: number
              description: Temperature in Celsius
            humidity:
              type: number
            timestamp:
              type: string
              format: date-time
  
  sensors/motion:
    address: sensors/{sensorId}/motion
    parameters:
      sensorId:
        schema:
          type: string
    messages:
      MotionDetected:
        payload:
          type: object
          properties:
            sensorId:
              type: string
            detected:
              type: boolean
            confidence:
              type: number
              minimum: 0
              maximum: 1
            timestamp:
              type: string
              format: date-time
```

### Real-Time Notification System

```yaml
asyncapi: '3.0.0'

info:
  title: Notification Service API
  version: '2.0.0'

servers:
  websocket:
    host: ws.example.com
    protocol: wss
    pathname: /notifications

channels:
  user/notifications:
    address: users/{userId}/notifications
    parameters:
      userId:
        description: User identifier
        schema:
          type: string
    messages:
      Notification:
        oneOf:
          - $ref: '#/components/messages/EmailNotification'
          - $ref: '#/components/messages/PushNotification'
          - $ref: '#/components/messages/SMSNotification'

components:
  messages:
    EmailNotification:
      payload:
        type: object
        properties:
          type:
            type: string
            const: email
          subject:
            type: string
          body:
            type: string
          recipient:
            type: string
    
    PushNotification:
      payload:
        type: object
        properties:
          type:
            type: string
            const: push
          title:
            type: string
          message:
            type: string
          data:
            type: object
    
    SMSNotification:
      payload:
        type: object
        properties:
          type:
            type: string
            const: sms
          phoneNumber:
            type: string
          message:
            type: string
```

---

## Comparison with OpenAPI

| Feature | AsyncAPI | OpenAPI |
|---------|----------|---------|
| **Purpose** | Async/Event-driven APIs | REST/HTTP APIs |
| **Communication** | Asynchronous | Synchronous |
| **Protocols** | Kafka, MQTT, AMQP, WebSocket | HTTP/HTTPS |
| **Pattern** | Pub/Sub, Event streaming | Request/Response |
| **Message Flow** | Bidirectional | Client to Server |
| **Real-time** | Native support | Limited (WebSocket) |
| **Code Generation** | Publishers, Subscribers | Clients, Servers |
| **Use Cases** | Events, Streaming, IoT | CRUD, REST APIs |

### When to Use AsyncAPI

- ✅ Event-driven microservices
- ✅ Real-time data streaming
- ✅ Message queue systems
- ✅ IoT device communication
- ✅ WebSocket APIs
- ✅ Pub/Sub architectures

### When to Use OpenAPI

- ✅ REST APIs
- ✅ CRUD operations
- ✅ Request/Response patterns
- ✅ Traditional web services
- ✅ API gateways
- ✅ Synchronous operations

---

## Resources

### Official Documentation
- [AsyncAPI Specification](https://www.asyncapi.com/docs/reference/specification/latest)
- [AsyncAPI GitHub](https://github.com/asyncapi/spec)
- [AsyncAPI Initiative](https://www.asyncapi.com/)

### Tools
- [AsyncAPI Studio](https://studio.asyncapi.com/) - Online editor
- [AsyncAPI Generator](https://github.com/asyncapi/generator) - Code generation
- [AsyncAPI Modelina](https://github.com/asyncapi/modelina) - Model generation
- [AsyncAPI CLI](https://github.com/asyncapi/cli) - Command-line tools

### Templates & Examples
- [Template Repository](https://github.com/asyncapi/template)
- [Example Specifications](https://github.com/asyncapi/spec/tree/master/examples)
- [Community Templates](https://github.com/asyncapi/templates)

### Learning Resources
- [AsyncAPI Documentation](https://www.asyncapi.com/docs)
- [AsyncAPI Blog](https://www.asyncapi.com/blog)
- [AsyncAPI YouTube Channel](https://www.youtube.com/asyncapi)

### Community
- [AsyncAPI Slack](https://www.asyncapi.com/slack-invite)
- [GitHub Discussions](https://github.com/asyncapi/spec/discussions)
- [Twitter @AsyncAPISpec](https://twitter.com/AsyncAPISpec)

### Protocol-Specific Resources
- [Kafka Documentation](https://kafka.apache.org/documentation/)
- [MQTT Specification](https://mqtt.org/)
- [AMQP Specification](https://www.amqp.org/)
- [WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455)

---

**Last Updated**: January 2026  
**AsyncAPI Version**: 3.0.0
