# Zipkin

## Introduction

### What is Zipkin?

Zipkin is an open-source distributed tracing system that helps gather timing data needed to troubleshoot latency problems in microservices architectures. Originally developed by Twitter, it provides insights into the flow of requests across multiple services, helping identify bottlenecks and performance issues.

### Why Zipkin?

- Distributed request tracing
- Performance bottleneck identification
- Service dependency visualization
- Latency analysis
- Root cause analysis for failures
- Microservices observability
- Language-agnostic tracing
- Open-source and extensible
- Compatible with OpenTelemetry
- Multiple storage backends

## Prerequisites

- Java 8+ (for running Zipkin server)
- Understanding of microservices architecture
- Basic knowledge of distributed systems
- Docker (optional, for containerized deployment)
- Application instrumentation libraries

## Installation

### Using Docker (Recommended)

```bash
# Run Zipkin server
docker run -d -p 9411:9411 openzipkin/zipkin

# With in-memory storage (default)
docker run -d -p 9411:9411 openzipkin/zipkin

# With MySQL storage
docker run -d -p 9411:9411 \
  -e STORAGE_TYPE=mysql \
  -e MYSQL_HOST=mysql-host \
  -e MYSQL_USER=zipkin \
  -e MYSQL_PASS=zipkin \
  openzipkin/zipkin

# With Elasticsearch storage
docker run -d -p 9411:9411 \
  -e STORAGE_TYPE=elasticsearch \
  -e ES_HOSTS=http://elasticsearch:9200 \
  openzipkin/zipkin
```

### Using JAR

```bash
# Download latest release
curl -sSL https://zipkin.io/quickstart.sh | bash -s

# Run Zipkin
java -jar zipkin.jar

# With custom port
java -jar zipkin.jar --server.port=9412

# Access UI
http://localhost:9411
```

### Docker Compose

```yaml
version: '3.8'

services:
  zipkin:
    image: openzipkin/zipkin
    container_name: zipkin
    ports:
      - "9411:9411"
    environment:
      - STORAGE_TYPE=elasticsearch
      - ES_HOSTS=elasticsearch:9200
    depends_on:
      - elasticsearch

  elasticsearch:
    image: elasticsearch:8.11.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
```

## Core Concepts

### Trace

A trace represents the entire journey of a request through a distributed system.

### Span

A span represents a single unit of work in a trace with:
- **Trace ID**: Unique identifier for the entire trace
- **Span ID**: Unique identifier for the span
- **Parent Span ID**: Links to parent span
- **Name**: Operation name
- **Timestamp**: Start time
- **Duration**: Time taken
- **Tags**: Key-value metadata
- **Annotations**: Timestamped events

### Span Types

```
Client Span (CS/CR):
  - CS: Client Send
  - CR: Client Receive

Server Span (SR/SS):
  - SR: Server Receive
  - SS: Server Send
```

## Instrumentation

### Java (Spring Boot)

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
    <version>2.2.8.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
```

```yaml
# application.yml
spring:
  application:
    name: my-service
  zipkin:
    base-url: http://localhost:9411
  sleuth:
    sampler:
      probability: 1.0  # 100% sampling (use 0.1 for 10% in production)
```

```java
// Example controller
@RestController
public class UserController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @GetMapping("/user/{id}")
    public User getUser(@PathVariable String id) {
        // Automatically traced
        return restTemplate.getForObject(
            "http://user-service/api/users/" + id,
            User.class
        );
    }
}

// Custom spans
@Service
public class UserService {
    
    @Autowired
    private Tracer tracer;
    
    public void processUser(String userId) {
        Span span = tracer.nextSpan().name("process-user").start();
        try (Tracer.SpanInScope ws = tracer.withSpanInScope(span)) {
            span.tag("user.id", userId);
            // Business logic
            doComplexProcessing(userId);
        } catch (Exception e) {
            span.tag("error", e.getMessage());
            throw e;
        } finally {
            span.finish();
        }
    }
}
```

### Node.js (Express)

```bash
npm install zipkin zipkin-instrumentation-express \
  zipkin-transport-http zipkin-context-cls
```

```javascript
const {
  Tracer,
  BatchRecorder,
  jsonEncoder: { JSON_V2 }
} = require('zipkin');
const { HttpLogger } = require('zipkin-transport-http');
const CLSContext = require('zipkin-context-cls');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

const express = require('express');
const app = express();

// Setup Zipkin
const ctxImpl = new CLSContext('zipkin');
const recorder = new BatchRecorder({
  logger: new HttpLogger({
    endpoint: 'http://localhost:9411/api/v2/spans',
    jsonEncoder: JSON_V2
  })
});

const tracer = new Tracer({ ctxImpl, recorder, localServiceName: 'my-service' });

// Add Zipkin middleware
app.use(zipkinMiddleware({ tracer }));

app.get('/api/users/:id', (req, res) => {
  // Automatically traced
  res.json({ id: req.params.id, name: 'John Doe' });
});

// Custom span
const axios = require('axios');
const wrapAxios = require('zipkin-instrumentation-axiosjs');

const zipkinAxios = wrapAxios(axios, { tracer, serviceName: 'my-service' });

app.get('/api/order/:id', async (req, res) => {
  try {
    const response = await zipkinAxios.get(`http://order-service/orders/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

### Python (Flask)

```bash
pip install py_zipkin requests
```

```python
from flask import Flask, request
from py_zipkin.zipkin import zipkin_span, create_http_headers_for_new_span
import requests

app = Flask(__name__)

ZIPKIN_URL = 'http://localhost:9411/api/v2/spans'

def http_transport(encoded_span):
    requests.post(
        ZIPKIN_URL,
        data=encoded_span,
        headers={'Content-Type': 'application/json'}
    )

@app.route('/api/users/<user_id>')
def get_user(user_id):
    with zipkin_span(
        service_name='user-service',
        span_name='get_user',
        transport_handler=http_transport,
        port=5000,
        sample_rate=100.0
    ) as span:
        span.update_binary_annotations({'user.id': user_id})
        
        # Call another service
        headers = create_http_headers_for_new_span()
        response = requests.get(
            f'http://account-service/accounts/{user_id}',
            headers=headers
        )
        
        return response.json()

if __name__ == '__main__':
    app.run(port=5000)
```

### Go

```bash
go get github.com/openzipkin/zipkin-go
go get github.com/openzipkin/zipkin-go/middleware/http
```

```go
package main

import (
    "log"
    "net/http"
    
    "github.com/openzipkin/zipkin-go"
    zipkinhttp "github.com/openzipkin/zipkin-go/middleware/http"
    "github.com/openzipkin/zipkin-go/reporter/httpreporter"
)

func main() {
    // Setup reporter
    reporter := httpreporter.NewReporter("http://localhost:9411/api/v2/spans")
    defer reporter.Close()
    
    // Setup endpoint
    endpoint, _ := zipkin.NewEndpoint("my-service", "localhost:8080")
    
    // Create tracer
    tracer, _ := zipkin.NewTracer(reporter, zipkin.WithLocalEndpoint(endpoint))
    
    // Create middleware
    middleware := zipkinhttp.NewServerMiddleware(
        tracer,
        zipkinhttp.TagResponseSize(true),
    )
    
    // Setup routes
    mux := http.NewServeMux()
    mux.HandleFunc("/api/users", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("User list"))
    })
    
    // Wrap with Zipkin middleware
    handler := middleware(mux)
    
    log.Fatal(http.ListenAndServe(":8080", handler))
}

// Custom span
func getUserDetails(ctx context.Context, tracer *zipkin.Tracer, userID string) {
    span := tracer.StartSpan("get-user-details")
    defer span.Finish()
    
    span.Tag("user.id", userID)
    
    // Business logic
    // ...
}
```

## Storage Backends

### In-Memory (Default)

```bash
# No configuration needed
docker run -d -p 9411:9411 openzipkin/zipkin
```

### MySQL

```bash
# Create database
mysql -u root -p
CREATE DATABASE zipkin;

# Run Zipkin with MySQL
docker run -d -p 9411:9411 \
  -e STORAGE_TYPE=mysql \
  -e MYSQL_HOST=localhost \
  -e MYSQL_TCP_PORT=3306 \
  -e MYSQL_DB=zipkin \
  -e MYSQL_USER=zipkin \
  -e MYSQL_PASS=zipkin \
  openzipkin/zipkin
```

### Elasticsearch

```bash
docker run -d -p 9411:9411 \
  -e STORAGE_TYPE=elasticsearch \
  -e ES_HOSTS=http://elasticsearch:9200 \
  -e ES_INDEX=zipkin \
  -e ES_INDEX_REPLICAS=0 \
  openzipkin/zipkin
```

### Cassandra

```bash
docker run -d -p 9411:9411 \
  -e STORAGE_TYPE=cassandra3 \
  -e CASSANDRA_CONTACT_POINTS=cassandra:9042 \
  -e CASSANDRA_LOCAL_DC=datacenter1 \
  openzipkin/zipkin
```

## Zipkin UI

### Searching Traces

```
1. Open http://localhost:9411
2. Search filters:
   - Service Name
   - Span Name
   - Tags (key=value)
   - Duration (min/max)
   - Limit (number of traces)
3. Click "Run Query"
```

### Trace View

```
Timeline View:
- Shows all spans in chronological order
- Color-coded by service
- Hover for details
- Click to expand

Dependencies:
- Service dependency graph
- Shows call relationships
- Link weights indicate call frequency
```

## API Usage

### Submit Spans

```bash
# JSON v2 format
curl -X POST http://localhost:9411/api/v2/spans \
  -H 'Content-Type: application/json' \
  -d '[{
    "traceId": "1234567890abcdef",
    "id": "abcdef1234567890",
    "name": "get-user",
    "timestamp": 1609459200000000,
    "duration": 100000,
    "localEndpoint": {
      "serviceName": "user-service",
      "ipv4": "192.168.1.10"
    },
    "tags": {
      "http.method": "GET",
      "http.path": "/api/users/123"
    }
  }]'
```

### Query Traces

```bash
# Get trace by ID
curl http://localhost:9411/api/v2/trace/1234567890abcdef

# Search traces
curl 'http://localhost:9411/api/v2/traces?serviceName=user-service&limit=10'

# Get service names
curl http://localhost:9411/api/v2/services

# Get span names
curl http://localhost:9411/api/v2/spans?serviceName=user-service

# Get dependencies
curl http://localhost:9411/api/v2/dependencies
```

## Sampling

### Probability Sampling

```java
// Spring Boot
spring:
  sleuth:
    sampler:
      probability: 0.1  # 10% of requests
```

```javascript
// Node.js
const sampler = new Sampler({
  sampler: new CountingSampler(0.1) // 10%
});
```

### Rate Limiting Sampling

```java
// Custom sampler - max 100 traces/second
@Bean
public Sampler rateLimitingSampler() {
    return new RateLimitingSampler(100);
}
```

## Integration with Other Tools

### Prometheus Integration

```yaml
# Expose Zipkin metrics
services:
  zipkin:
    image: openzipkin/zipkin
    ports:
      - "9411:9411"
      - "9412:9412"  # Prometheus metrics
    environment:
      - METRICS_PROMETHEUS_ENABLED=true
```

### Grafana Integration

```json
// Zipkin datasource in Grafana
{
  "name": "Zipkin",
  "type": "zipkin",
  "url": "http://localhost:9411",
  "access": "proxy"
}
```

### OpenTelemetry Integration

```bash
# Zipkin accepts OpenTelemetry data
docker run -d -p 9411:9411 \
  -e COLLECTOR_OTLP_ENABLED=true \
  openzipkin/zipkin
```

## Best Practices

### Instrumentation

- Use automatic instrumentation where available
- Add custom spans for critical operations
- Include meaningful tags (user ID, transaction ID, etc.)
- Avoid high-cardinality tags
- Set appropriate span names
- Handle errors properly with error tags

### Sampling

```java
// Production sampling strategy
@Bean
public Sampler sampler() {
    return new CompositeTracer(
        new ErrorTracer(),           // Always sample errors
        new ProbabilityTracer(0.01)  // 1% of successful requests
    );
}
```

### Performance

- Use appropriate sampling rates
- Batch span reporting
- Configure adequate storage
- Monitor Zipkin itself
- Use async reporting
- Implement circuit breakers

### Tags and Annotations

```java
// Good tags
span.tag("user.id", userId);
span.tag("http.method", "GET");
span.tag("http.status_code", "200");
span.tag("db.statement", query);
span.tag("error", "true");

// Avoid high-cardinality tags
// Bad: span.tag("timestamp", System.currentTimeMillis());
// Bad: span.tag("uuid", UUID.randomUUID().toString());
```

## Troubleshooting

### No Traces Appearing

```bash
# Check Zipkin is running
curl http://localhost:9411/health

# Check application can reach Zipkin
curl -X POST http://localhost:9411/api/v2/spans \
  -H 'Content-Type: application/json' \
  -d '[]'

# Verify sampling rate (set to 1.0 for testing)

# Check application logs for Zipkin errors
```

### Storage Issues

```bash
# Check storage backend connectivity
# MySQL
mysql -h localhost -u zipkin -p

# Elasticsearch
curl http://localhost:9200/_cluster/health

# Check Zipkin logs
docker logs zipkin
```

### Performance Issues

```bash
# Increase JVM memory
java -Xmx2g -jar zipkin.jar

# Use Elasticsearch for large-scale deployments
# Configure index settings
# Implement data retention policies
```

## Production Deployment

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zipkin
spec:
  replicas: 2
  selector:
    matchLabels:
      app: zipkin
  template:
    metadata:
      labels:
        app: zipkin
    spec:
      containers:
      - name: zipkin
        image: openzipkin/zipkin
        ports:
        - containerPort: 9411
        env:
        - name: STORAGE_TYPE
          value: elasticsearch
        - name: ES_HOSTS
          value: http://elasticsearch:9200
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
---
apiVersion: v1
kind: Service
metadata:
  name: zipkin
spec:
  selector:
    app: zipkin
  ports:
  - port: 9411
    targetPort: 9411
  type: LoadBalancer
```

### Data Retention

```bash
# Elasticsearch - delete old indices
curl -X DELETE http://localhost:9200/zipkin-*-2025-01-*

# MySQL - clean old data
DELETE FROM zipkin_spans WHERE ts < UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 7 DAY)) * 1000000;
```

## Resources

- [Zipkin Official Site](https://zipkin.io/)
- [Documentation](https://zipkin.io/pages/documentation.html)
- [GitHub Repository](https://github.com/openzipkin/zipkin)
- [Instrumentation Libraries](https://zipkin.io/pages/tracers_instrumentation.html)
- [API Documentation](https://zipkin.io/zipkin-api/)
- [Gitter Chat](https://gitter.im/openzipkin/zipkin)

## Next Steps

- Instrument your applications
- Set up production-grade storage
- Configure appropriate sampling
- Integrate with alerting systems
- Create dashboards in Grafana
- Implement trace-based monitoring
- Explore service dependencies
- Set up automated analysis
