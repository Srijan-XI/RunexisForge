# Jaeger

## Introduction

Jaeger is an open-source, end-to-end distributed tracing system originally developed by Uber Technologies and now a Cloud Native Computing Foundation (CNCF) graduated project. It helps monitor and troubleshoot microservices-based architectures by tracking requests as they flow through distributed systems.

## Why Jaeger?

- **Open Source**: Free, community-driven CNCF project
- **OpenTelemetry Native**: Full compatibility with OpenTelemetry
- **Distributed Context Propagation**: Track requests across services
- **Root Cause Analysis**: Identify performance bottlenecks
- **Dependency Analysis**: Service dependency visualization
- **Performance Optimization**: Latency analysis and optimization
- **Cloud-Native**: Kubernetes-ready with Helm charts
- **Multiple Storage Backends**: Cassandra, Elasticsearch, Kafka, Badger

## Key Features

### Distributed Tracing
- End-to-end request tracking
- Service dependency graph
- Span-level detail
- Context propagation
- Baggage items
- Trace sampling

### Performance Monitoring
- Latency analysis
- Service performance metrics
- Database query tracking
- External service calls
- Error tracking

### Service Dependency Analysis
- Automatic service discovery
- Dependency graph visualization
- Traffic flow analysis
- Service health monitoring

### Adaptive Sampling
- Head-based sampling
- Tail-based sampling
- Probabilistic sampling
- Rate limiting sampling
- Per-operation sampling

## Jaeger Architecture

### Components

**Jaeger Client:**
- Language-specific SDKs
- Span creation and reporting
- Context propagation
- Sampling decisions

**Jaeger Agent:**
- Listens for spans (UDP)
- Batches spans
- Forwards to collectors
- Runs as sidecar/daemon

**Jaeger Collector:**
- Receives spans from agents
- Validates and indexes
- Stores in backend
- Supports multiple protocols

**Jaeger Query:**
- UI for trace visualization
- REST API for queries
- Trace search
- Service analytics

**Storage Backend:**
- Cassandra (production)
- Elasticsearch (production)
- Kafka (buffering)
- Badger (single-node)
- Memory (testing)

## Jaeger vs Competitors

| Feature | Jaeger | Zipkin | Tempo | Lightstep | New Relic |
|---------|--------|--------|-------|-----------|-----------|
| Open Source | ✅ CNCF | ✅ Apache | ✅ Grafana | ❌ Commercial | ❌ Commercial |
| OpenTelemetry | ✅ Native | ✅ Yes | ✅ Native | ✅ Yes | ✅ Yes |
| Storage Options | ✅ Multiple | ✅ Multiple | ✅ Object storage | ☁️ Cloud | ☁️ Cloud |
| Sampling | ✅ Adaptive | ✅ Basic | ✅ Good | ✅ Excellent | ✅ Excellent |
| Scalability | ✅ High | ✅ Good | ✅ Excellent | ✅ Excellent | ✅ Excellent |
| Learning Curve | Medium | Low | Medium | Low | Low |
| Cost | Free | Free | Free | 💰 High | 💰 Medium |
| UI | Good | Basic | Requires Grafana | Excellent | Excellent |

## When to Use Jaeger

✅ **Use Jaeger when:**
- Need open-source distributed tracing
- Building microservices architecture
- Want OpenTelemetry compatibility
- Need cost-effective tracing solution
- Require on-premises deployment
- Want flexible storage backends
- Need detailed trace analysis
- Already using Kubernetes

❌ **Consider alternatives when:**
- Need all-in-one APM solution (New Relic, Datadog)
- Want simplest setup (Zipkin)
- Need minimal storage (Tempo with object storage)
- Require vendor support and SLAs
- Want AI-powered insights (Dynatrace, Lightstep)

## User Guide

## Getting Started

### Quick Start with Docker

**All-in-one (development only):**

```bash
docker run -d --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 9411:9411 \
  jaegertracing/all-in-one:latest
```

**Port mapping:**
- `5775/udp`: Zipkin compact Thrift (deprecated)
- `6831/udp`: Jaeger Thrift compact
- `6832/udp`: Jaeger Thrift binary
- `5778`: Config server
- `16686`: Jaeger UI
- `14250`: gRPC
- `14268`: HTTP Thrift
- `14269`: Admin port
- `4317`: OTLP gRPC
- `4318`: OTLP HTTP
- `9411`: Zipkin compatible

**Access UI:**

Navigate to: `http://localhost:16686`

### Docker Compose (Production-like)

```yaml
version: '3.8'

services:
  jaeger-collector:
    image: jaegertracing/jaeger-collector:latest
    environment:
      - SPAN_STORAGE_TYPE=elasticsearch
      - ES_SERVER_URLS=http://elasticsearch:9200
    ports:
      - "14250:14250"  # gRPC
      - "14268:14268"  # HTTP Thrift
      - "4317:4317"    # OTLP gRPC
      - "4318:4318"    # OTLP HTTP
    depends_on:
      - elasticsearch
    restart: unless-stopped

  jaeger-query:
    image: jaegertracing/jaeger-query:latest
    environment:
      - SPAN_STORAGE_TYPE=elasticsearch
      - ES_SERVER_URLS=http://elasticsearch:9200
    ports:
      - "16686:16686"  # UI
    depends_on:
      - elasticsearch
    restart: unless-stopped

  jaeger-agent:
    image: jaegertracing/jaeger-agent:latest
    command:
      - "--reporter.grpc.host-port=jaeger-collector:14250"
    ports:
      - "6831:6831/udp"  # Thrift compact
      - "6832:6832/udp"  # Thrift binary
      - "5778:5778"      # Config
    depends_on:
      - jaeger-collector
    restart: unless-stopped

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - es-data:/usr/share/elasticsearch/data
    restart: unless-stopped

volumes:
  es-data:
```

### Kubernetes Deployment

**Using Jaeger Operator:**

```bash
# Install cert-manager (prerequisite)
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Install Jaeger Operator
kubectl create namespace observability
kubectl apply -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.51.0/jaeger-operator.yaml -n observability
```

**Create Jaeger instance:**

```yaml
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger-production
  namespace: observability
spec:
  strategy: production
  
  storage:
    type: elasticsearch
    options:
      es:
        server-urls: http://elasticsearch:9200
        index-prefix: jaeger
    
    esIndexCleaner:
      enabled: true
      numberOfDays: 7
      schedule: "55 23 * * *"
  
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
    hosts:
      - jaeger.example.com
  
  collector:
    maxReplicas: 5
    resources:
      limits:
        cpu: 500m
        memory: 512Mi
      requests:
        cpu: 200m
        memory: 256Mi
  
  query:
    replicas: 2
    resources:
      limits:
        cpu: 500m
        memory: 512Mi
  
  agent:
    strategy: DaemonSet
    resources:
      limits:
        cpu: 200m
        memory: 128Mi
```

**Using Helm:**

```bash
helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
helm repo update

helm install jaeger jaegertracing/jaeger \
  --namespace observability \
  --create-namespace \
  --set provisionDataStore.cassandra=false \
  --set storage.type=elasticsearch \
  --set storage.elasticsearch.host=elasticsearch \
  --set storage.elasticsearch.port=9200 \
  --set agent.enabled=true \
  --set collector.enabled=true \
  --set query.enabled=true
```

## Application Instrumentation

### OpenTelemetry (Recommended)

**Node.js:**

```bash
npm install @opentelemetry/api \
  @opentelemetry/sdk-node \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/exporter-jaeger
```

**tracing.js:**

```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Configure Jaeger exporter
const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
});

// Initialize SDK
const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    environment: 'production',
  }),
  traceExporter: jaegerExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
```

**app.js:**

```javascript
// MUST BE FIRST!
require('./tracing');

const express = require('express');
const { trace } = require('@opentelemetry/api');

const app = express();

app.get('/api/users', async (req, res) => {
  const tracer = trace.getTracer('my-service');
  
  // Create custom span
  const span = tracer.startSpan('fetch-users');
  span.setAttribute('user.count', 100);
  
  try {
    const users = await fetchUsers();
    span.setStatus({ code: 0 }); // OK
    res.json(users);
  } catch (error) {
    span.recordException(error);
    span.setStatus({ code: 2, message: error.message }); // ERROR
    res.status(500).json({ error: error.message });
  } finally {
    span.end();
  }
});

app.listen(3000);
```

**Python:**

```bash
pip install opentelemetry-api \
  opentelemetry-sdk \
  opentelemetry-instrumentation \
  opentelemetry-exporter-jaeger
```

**tracing.py:**

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.semconv.resource import ResourceAttributes
from opentelemetry.instrumentation.flask import FlaskInstrumentor

# Configure resource
resource = Resource(attributes={
    ResourceAttributes.SERVICE_NAME: "my-python-service",
    ResourceAttributes.SERVICE_VERSION: "1.0.0",
    "environment": "production"
})

# Configure tracer provider
trace.set_tracer_provider(TracerProvider(resource=resource))

# Configure Jaeger exporter
jaeger_exporter = JaegerExporter(
    agent_host_name="localhost",
    agent_port=6831,
)

# Add span processor
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(jaeger_exporter)
)

# Auto-instrument Flask
from flask import Flask
app = Flask(__name__)
FlaskInstrumentor().instrument_app(app)

tracer = trace.get_tracer(__name__)

@app.route('/api/orders')
def get_orders():
    with tracer.start_as_current_span("fetch-orders") as span:
        span.set_attribute("order.limit", 100)
        
        try:
            orders = fetch_orders()
            span.set_attribute("order.count", len(orders))
            return orders
        except Exception as e:
            span.record_exception(e)
            span.set_status(trace.Status(trace.StatusCode.ERROR))
            raise

if __name__ == '__main__':
    app.run(port=5000)
```

**Java (Spring Boot):**

```xml
<!-- pom.xml -->
<dependencies>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-api</artifactId>
        <version>1.32.0</version>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk</artifactId>
        <version>1.32.0</version>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-jaeger</artifactId>
        <version>1.32.0</version>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry.instrumentation</groupId>
        <artifactId>opentelemetry-spring-boot-starter</artifactId>
        <version>1.32.0-alpha</version>
    </dependency>
</dependencies>
```

**application.properties:**

```properties
otel.service.name=my-java-service
otel.traces.exporter=jaeger
otel.exporter.jaeger.endpoint=http://localhost:14250
otel.metrics.exporter=none
```

**Custom spans:**

```java
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Scope;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class OrderService {
    
    @Autowired
    private Tracer tracer;
    
    public Order processOrder(String orderId) {
        Span span = tracer.spanBuilder("process-order")
            .setAttribute("order.id", orderId)
            .startSpan();
        
        try (Scope scope = span.makeCurrent()) {
            Order order = fetchOrder(orderId);
            span.setAttribute("order.amount", order.getAmount());
            
            return order;
        } catch (Exception e) {
            span.recordException(e);
            span.setStatus(StatusCode.ERROR, e.getMessage());
            throw e;
        } finally {
            span.end();
        }
    }
}
```

**Go:**

```bash
go get go.opentelemetry.io/otel
go get go.opentelemetry.io/otel/exporters/jaeger
go get go.opentelemetry.io/otel/sdk
```

```go
package main

import (
    "context"
    "log"
    
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/jaeger"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
    semconv "go.opentelemetry.io/otel/semconv/v1.17.0"
)

func initTracer() (*sdktrace.TracerProvider, error) {
    // Create Jaeger exporter
    exp, err := jaeger.New(jaeger.WithCollectorEndpoint(
        jaeger.WithEndpoint("http://localhost:14268/api/traces"),
    ))
    if err != nil {
        return nil, err
    }
    
    // Create tracer provider
    tp := sdktrace.NewTracerProvider(
        sdktrace.WithBatcher(exp),
        sdktrace.WithResource(resource.NewWithAttributes(
            semconv.SchemaURL,
            semconv.ServiceName("my-go-service"),
            semconv.ServiceVersion("1.0.0"),
        )),
    )
    
    otel.SetTracerProvider(tp)
    return tp, nil
}

func main() {
    tp, err := initTracer()
    if err != nil {
        log.Fatal(err)
    }
    defer tp.Shutdown(context.Background())
    
    tracer := otel.Tracer("my-service")
    
    ctx, span := tracer.Start(context.Background(), "main-operation")
    defer span.End()
    
    span.SetAttributes(
        semconv.HTTPMethodKey.String("GET"),
        semconv.HTTPURLKey.String("/api/users"),
    )
    
    // Your application logic
    processRequest(ctx)
}

func processRequest(ctx context.Context) {
    tracer := otel.Tracer("my-service")
    _, span := tracer.Start(ctx, "process-request")
    defer span.End()
    
    span.SetAttributes(
        semconv.DBSystemKey.String("postgresql"),
        semconv.DBStatementKey.String("SELECT * FROM users"),
    )
    
    // Database operation
}
```

## Context Propagation

### Cross-Service Tracing

**Service A (Node.js):**

```javascript
const axios = require('axios');
const { trace, propagation } = require('@opentelemetry/api');

app.get('/api/order', async (req, res) => {
  const tracer = trace.getTracer('order-service');
  const span = tracer.startSpan('create-order');
  
  try {
    // Create carrier for context propagation
    const carrier = {};
    propagation.inject(trace.setSpan(context.active(), span), carrier);
    
    // Call downstream service with trace context
    const response = await axios.post('http://payment-service:8080/process', {
      amount: 99.99
    }, {
      headers: carrier  // Propagate trace context
    });
    
    res.json({ orderId: response.data.orderId });
  } finally {
    span.end();
  }
});
```

**Service B (Python):**

```python
from flask import Flask, request
from opentelemetry import trace
from opentelemetry.propagate import extract

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_payment():
    # Extract trace context from headers
    context = extract(request.headers)
    
    tracer = trace.get_tracer(__name__)
    with tracer.start_as_current_span("process-payment", context=context) as span:
        amount = request.json['amount']
        span.set_attribute("payment.amount", amount)
        
        # Process payment
        result = charge_customer(amount)
        return {"orderId": result['order_id']}
```

## Sampling Strategies

### Probabilistic Sampling

```javascript
// Sample 10% of traces
const { TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-base');

const sdk = new NodeSDK({
  sampler: new TraceIdRatioBasedSampler(0.1), // 10%
  // ... other config
});
```

### Adaptive Sampling

**Remote sampling configuration:**

```json
{
  "service_strategies": [
    {
      "service": "order-service",
      "type": "probabilistic",
      "param": 0.5
    },
    {
      "service": "payment-service",
      "type": "ratelimiting",
      "param": 100
    }
  ],
  "default_strategy": {
    "type": "probabilistic",
    "param": 0.1
  }
}
```

**Configure in application:**

```javascript
const { JaegerPropagator } = require('@opentelemetry/propagator-jaeger');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
  // Remote sampling
  serviceName: 'my-service',
});
```

## Jaeger UI

### Search Traces

**Search criteria:**
- Service name
- Operation name
- Tags (key=value)
- Duration (min/max)
- Time range
- Limit results

**Example searches:**
```
service=order-service operation=POST:/api/orders
service=payment-service error=true
http.status_code=500
duration>=1s
```

### Trace View

**Timeline view:**
- Spans in chronological order
- Service dependencies
- Span duration bars
- Error highlighting

**Trace details:**
- Operation name
- Duration
- Tags
- Logs
- Process information

### Service Dependencies

**System Architecture view:**
- Service graph
- Request rates
- Error rates
- Latency percentiles

## Storage Backends

### Cassandra

**Docker Compose:**

```yaml
cassandra:
  image: cassandra:4.1
  environment:
    - CASSANDRA_DC=dc1
    - CASSANDRA_RACK=rack1
  ports:
    - "9042:9042"
  volumes:
    - cassandra-data:/var/lib/cassandra

jaeger-collector:
  environment:
    - SPAN_STORAGE_TYPE=cassandra
    - CASSANDRA_SERVERS=cassandra:9042
    - CASSANDRA_KEYSPACE=jaeger_v1_dc1
```

**Initialize schema:**

```bash
docker exec -it cassandra cqlsh
```

```sql
CREATE KEYSPACE IF NOT EXISTS jaeger_v1_dc1 
  WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};
```

### Elasticsearch

```yaml
jaeger-collector:
  environment:
    - SPAN_STORAGE_TYPE=elasticsearch
    - ES_SERVER_URLS=http://elasticsearch:9200
    - ES_INDEX_PREFIX=jaeger
    - ES_TAGS_AS_FIELDS_ALL=true
```

**Index lifecycle:**

```bash
# Set retention policy
curl -X PUT "http://elasticsearch:9200/_ilm/policy/jaeger-ilm-policy" \
  -H 'Content-Type: application/json' \
  -d '{
    "policy": {
      "phases": {
        "delete": {
          "min_age": "7d",
          "actions": {
            "delete": {}
          }
        }
      }
    }
  }'
```

### Kafka (Streaming)

**Use Kafka for buffering:**

```yaml
jaeger-ingester:
  image: jaegertracing/jaeger-ingester:latest
  environment:
    - SPAN_STORAGE_TYPE=elasticsearch
    - ES_SERVER_URLS=http://elasticsearch:9200
    - KAFKA_BROKERS=kafka:9092
    - KAFKA_TOPIC=jaeger-spans

jaeger-collector:
  environment:
    - SPAN_STORAGE_TYPE=kafka
    - KAFKA_BROKERS=kafka:9092
    - KAFKA_TOPIC=jaeger-spans
```

## Advanced Features

### Baggage Items

**Propagate metadata across services:**

```javascript
const { trace, baggage } = require('@opentelemetry/api');

// Set baggage
const bag = baggage.active().setEntry("user.id", { value: "12345" });
const ctx = baggage.setActive(context.active(), bag);

// Propagate to next span
trace.getTracer('my-service').startSpan('operation', {}, ctx);

// Retrieve in downstream service
const userId = baggage.active().getEntry("user.id")?.value;
```

### Span Logs

```javascript
span.addEvent('cache-miss', {
  'cache.key': 'user:12345',
  'cache.type': 'redis'
});

span.addEvent('database-query', {
  'db.statement': 'SELECT * FROM users WHERE id = ?',
  'db.rows_affected': 1
});
```

### Custom Tags

```javascript
span.setAttribute('http.method', 'POST');
span.setAttribute('http.url', '/api/orders');
span.setAttribute('http.status_code', 200);
span.setAttribute('user.tier', 'premium');
span.setAttribute('order.amount', 99.99);
```

## Monitoring and Operations

### Jaeger Metrics

```bash
# Collector metrics
curl http://localhost:14269/metrics

# Query  metrics
curl http://localhost:16687/metrics
```

**Key metrics:**
- `jaeger_collector_spans_received_total`
- `jaeger_collector_spans_saved_total`
- `jaeger_collector_queue_length`
- `jaeger_query_requests_total`
- `jaeger_query_latency_bucket`

### Health Checks

```bash
# Collector health
curl http://localhost:14269/

# Query health
curl http://localhost:16687/
```

### Performance Tuning

**Collector configuration:**

```yaml
# collector.yaml
collector:
  queue-size: 5000
  num-workers: 100
  
  otlp:
    grpc:
      max-connection-age: 60s
      max-connection-age-grace: 5s
```

**Sampling configuration:**

```yaml
sampling:
  strategies:
    - service: high-volume-service
      type: probabilistic
      param: 0.1  # 10%
    
    - service: critical-service
      type: ratelimiting
      param: 1000  # 1000 traces/sec
```

## Best Practices

### Instrumentation

- ✅ Use OpenTelemetry for instrumentation
- ✅ Add meaningful span names
- ✅ Include relevant attributes/tags
- ✅ Trace database queries
- ✅ Trace external API calls
- ✅ Use baggage sparingly (performance impact)
- ✅ Log important events within spans

### Sampling

- ✅ Start with 10% sampling in production
- ✅ Always sample errors and slow requests
- ✅ Use adaptive sampling for high-volume services
- ✅ Monitor sampling ratios
- ✅ Adjust based on traffic patterns
- ✅ Consider cost vs. visibility trade-offs

### Storage

- ✅ Use Elasticsearch or Cassandra for production
- ✅ Set appropriate retention policies (7-30 days)
- ✅ Monitor storage usage
- ✅ Implement index lifecycle management
- ✅ Use Kafka for buffering in high-throughput scenarios
- ✅ Backup critical traces

### Operations

- ✅ Monitor Jaeger component health
- ✅ Set up alerting for collector/query issues
- ✅ Use Jaeger agent as sidecar in Kubernetes
- ✅ Deploy collectors with horizontal scaling
- ✅ Implement proper network policies
- ✅ Secure UI with authentication

## Security

### Authentication

**OAuth2 Proxy:**

```yaml
oauth2-proxy:
  image: quay.io/oauth2-proxy/oauth2-proxy:latest
  command:
    - --provider=oidc
    - --email-domain=*
    - --upstream=http://jaeger-query:16686
    - --http-address=0.0.0.0:4180
  environment:
    - OAUTH2_PROXY_CLIENT_ID=${CLIENT_ID}
    - OAUTH2_PROXY_CLIENT_SECRET=${CLIENT_SECRET}
  ports:
    - "4180:4180"
```

### TLS/SSL

```yaml
jaeger-collector:
  environment:
    - COLLECTOR_OTLP_GRPC_TLS_ENABLED=true
    - COLLECTOR_OTLP_GRPC_TLS_CERT=/certs/cert.pem
    - COLLECTOR_OTLP_GRPC_TLS_KEY=/certs/key.pem
  volumes:
    - ./certs:/certs:ro
```

## Troubleshooting

### No Traces Appearing

```bash
# Check collector logs
docker logs jaeger-collector

# Verify spans reaching collector
curl -X POST http://localhost:14268/api/traces \
  -H 'Content-Type: application/json' \
  -d '{"data":[{"traceId":"test","spanId":"test"}]}'

# Check storage backend
curl http://elasticsearch:9200/jaeger-*/_count
```

### High Latency

- Increase collector workers
- Add more collector replicas
- Optimize storage backend
- Review sampling configuration
- Check network latency

### Missing Service Dependencies

- Ensure proper context propagation
- Verify W3C Trace Context headers
- Check instrumentation coverage
- Review sampling rates

## Real-World Example

**Microservices E-Commerce:**

```javascript
// API Gateway
app.post('/checkout', async (req, res) => {
  const tracer = trace.getTracer('api-gateway');
  const span = tracer.startSpan('checkout-flow');
  
  span.setAttribute('user.id', req.user.id);
  span.setAttribute('cart.items', req.body.items.length);
  
  try {
    // 1. Validate inventory
    await callService('inventory-service', '/validate', req.body.items);
    
    // 2. Process payment
    const payment = await callService('payment-service', '/charge', {
      amount: req.body.total,
      userId: req.user.id
    });
    
    // 3. Create order
    const order = await callService('order-service', '/create', {
      userId: req.user.id,
      items: req.body.items,
      paymentId: payment.id
    });
    
    // 4. Send notification
    await callService('notification-service', '/send', {
      userId: req.user.id,
      orderId: order.id
    });
    
    span.setStatus({ code: 0 });
    res.json({ orderId: order.id });
  } catch (error) {
    span.recordException(error);
    span.setStatus({ code: 2, message: error.message });
    res.status(500).json({ error: error.message });
  } finally {
    span.end();
  }
});
```

**Trace visualization shows:**
- Total checkout duration
- Time spent in each service
- Service dependencies
- Bottlenecks (slow payment processing)
- Errors and their source

## References

- **Documentation**: https://www.jaegertracing.io/docs/
- **GitHub**: https://github.com/jaegertracing/jaeger
- **CNCF**: https://www.cncf.io/projects/jaeger/
- **OpenTelemetry**: https://opentelemetry.io/
- **Slack**: https://cloud-native.slack.com/ (#jaeger)
- **Tutorials**: https://www.jaegertracing.io/docs/latest/getting-started/

---

## See Also

- [OpenTelemetry](../OpenTelemetry/OpenTelemetry.md)
- [Zipkin Tracing](../Zipkin/Zipkin.md)
- [Datadog APM](../../APM/Datadog/Datadog.md)
- [New Relic Distributed Tracing](../../APM/New-Relic/New-Relic.md)
- [Prometheus Metrics](../../Metrics/Prometheus/Prometheus.md)
