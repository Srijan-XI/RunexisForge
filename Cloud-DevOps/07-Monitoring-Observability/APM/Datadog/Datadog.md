# Datadog

## Introduction

Datadog is a comprehensive cloud-scale monitoring and analytics platform that provides infrastructure monitoring, application performance monitoring (APM), log management, security monitoring, and real user monitoring. It excels at ingesting metrics, traces, and logs from hundreds of integrations to provide unified observability.

## Why Datadog?

- **Unified Platform**: Metrics, traces, logs, and security in one place
- **Extensive Integrations**: 650+ built-in integrations
- **Real-Time Monitoring**: Sub-second metric resolution
- **Advanced Analytics**: Machine learning-powered insights
- **Scalability**: Handles petabytes of data daily
- **Collaboration**: Team dashboards, shared views, and notebooks
- **Compliance**: SOC 2, HIPAA, ISO 27001 certified
- **Cloud-Native**: Deep AWS, Azure, GCP, Kubernetes integration

## Key Features

### Infrastructure Monitoring
- Host, container, and serverless monitoring
- Network performance monitoring
- Database monitoring (MySQL, PostgreSQL, MongoDB, etc.)
- Cloud cost monitoring
- Automated service discovery

### Application Performance Monitoring (APM)
- Distributed tracing
- Profiling (CPU, memory, I/O)
- Error tracking
- Deployment tracking
- Service dependency mapping
- Database query analysis

### Log Management
- Centralized log collection
- Real-time log search and analytics
- Log patterns and anomaly detection
- Archive to S3/Azure Storage
- Log-to-metric conversion

### Synthetic Monitoring
- API tests
- Browser tests
- Multi-location testing
- Private location support

### Real User Monitoring (RUM)
- Frontend performance tracking
- User session replay
- Error tracking
- Core Web Vitals
- Mobile app monitoring

### Security Monitoring
- Threat detection
- Compliance monitoring
- Cloud security posture management (CSPM)
- Cloud workload security (CWS)

## Datadog vs Competitors

| Feature | Datadog | New Relic | Dynatrace | Prometheus/Grafana |
|---------|---------|-----------|-----------|-------------------|
| Infrastructure | ✅ Excellent | ✅ Strong | ✅ Strong | ✅ Good |
| APM | ✅ Excellent | ✅ Excellent | ✅ Excellent | ❌ Limited |
| Log Management | ✅ Excellent | ✅ Good | ✅ Good | ✅ Good (Loki) |
| Integrations | ✅ 650+ | ✅ 400+ | ✅ 300+ | ✅ 200+ |
| Pricing Model | Host-based | Usage-based | Usage-based | Free (OSS) |
| Learning Curve | Medium | Low | Medium | High |
| Customization | High | Medium | Medium | Very High |
| Support | Excellent | Excellent | Excellent | Community |

## When to Use Datadog

✅ **Use Datadog when:**
- Need comprehensive infrastructure monitoring
- Running multi-cloud environments
- Want unified metrics, logs, and traces
- Need extensive third-party integrations
- Building cloud-native applications
- Require enterprise support and SLAs
- Want powerful visualization and dashboarding
- Need security and compliance monitoring

❌ **Consider alternatives when:**
- Budget is extremely limited (use Prometheus/Grafana)
- Simple application with basic needs
- Prefer consumption-based pricing (New Relic)
- Need highly automated root cause analysis (Dynatrace)
- Open-source requirement is critical

## User Guide

## Getting Started

### 1. Create Account

Sign up at: https://www.datadoghq.com/

**Regions:**
- US1: app.datadoghq.com
- US3: us3.datadoghq.com
- US5: us5.datadoghq.com
- EU: app.datadoghq.eu
- AP1: ap1.datadoghq.com

### 2. Get API and Application Keys

Navigate to: Organization Settings > API Keys

```bash
# API Key (for agent)
DD_API_KEY=your-32-character-api-key

# Application Key (for API access)
DD_APP_KEY=your-40-character-app-key
```

### 3. Pricing Tiers

- **Free Tier**: 5 hosts, 1-day retention
- **Pro**: $15/host/month - Full feature set
- **Enterprise**: $23/host/month - Advanced security, RBAC, SLAs

## Infrastructure Agent Installation

### Linux (Ubuntu/Debian)

```bash
# One-line install
DD_API_KEY=YOUR-API-KEY DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

# Or manual
echo "deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 7" | sudo tee /etc/apt/sources.list.d/datadog.list

sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch

sudo apt-get update
sudo apt-get install datadog-agent
```

### RHEL/CentOS

```bash
# One-line install
DD_API_KEY=YOUR-API-KEY DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

# Or configure yum
cat <<EOF > /etc/yum.repos.d/datadog.repo
[datadog]
name=Datadog, Inc.
baseurl=https://yum.datadoghq.com/stable/7/x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
EOF

sudo yum makecache
sudo yum install datadog-agent
```

### Configuration

```yaml
# /etc/datadog-agent/datadog.yaml
api_key: YOUR-API-KEY
site: datadoghq.com

# Hostname (optional, auto-detected)
hostname: my-server-01

# Tags for easy filtering
tags:
  - env:production
  - role:web-server
  - datacenter:us-east-1

# Enable logs collection
logs_enabled: true

# Enable APM
apm_config:
  enabled: true

# Enable process monitoring
process_config:
  enabled: "true"
```

### Start Agent

```bash
sudo systemctl start datadog-agent
sudo systemctl enable datadog-agent

# Check status
sudo datadog-agent status
```

## Docker Container Monitoring

### Docker Agent

```bash
docker run -d --name datadog-agent \
  --cgroupns host \
  --pid host \
  -e DD_API_KEY=YOUR-API-KEY \
  -e DD_SITE="datadoghq.com" \
  -e DD_LOGS_ENABLED=true \
  -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
  -e DD_APM_ENABLED=true \
  -e DD_APM_NON_LOCAL_TRAFFIC=true \
  -e DD_PROCESS_AGENT_ENABLED=true \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
  gcr.io/datadoghq/agent:7
```

### Docker Compose

```yaml
version: '3'
services:
  datadog:
    image: gcr.io/datadoghq/agent:7
    container_name: datadog-agent
    pid: host
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_SITE=datadoghq.com
      - DD_LOGS_ENABLED=true
      - DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
      - DD_APM_ENABLED=true
      - DD_APM_NON_LOCAL_TRAFFIC=true
      - DD_PROCESS_AGENT_ENABLED=true
      - DD_TAGS=env:production service:myapp
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /opt/datadog-agent/run:/opt/datadog-agent/run:rw
```

## Kubernetes Monitoring

### Helm Installation

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

kubectl create secret generic datadog-secret \
  --from-literal api-key=YOUR-API-KEY \
  --namespace datadog

helm install datadog-agent datadog/datadog \
  --namespace datadog \
  --set datadog.apiKey=YOUR-API-KEY \
  --set datadog.site='datadoghq.com' \
  --set datadog.logs.enabled=true \
  --set datadog.logs.containerCollectAll=true \
  --set datadog.apm.portEnabled=true \
  --set datadog.processAgent.enabled=true \
  --set datadog.networkMonitoring.enabled=true \
  --set datadog.clusterAgent.enabled=true \
  --set datadog.kubeStateMetricsCore.enabled=true
```

### Datadog Operator

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: datadog
---
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    site: datadoghq.com
    tags:
      - env:production
      - cluster:main
  
  features:
    apm:
      enabled: true
    logCollection:
      enabled: true
      containerCollectAll: true
    npm:
      enabled: true
    liveProcessCollection:
      enabled: true
    clusterChecks:
      enabled: true
  
  override:
    nodeAgent:
      tolerations:
        - operator: Exists
      resources:
        requests:
          memory: "256Mi"
          cpu: "100m"
        limits:
          memory: "512Mi"
          cpu: "200m"
```

## APM - Application Performance Monitoring

### Node.js Application

**Install tracer:**

```bash
npm install dd-trace --save
```

**Initialize (first line of entrypoint):**

```javascript
// app.js or index.js - MUST BE FIRST!
require('dd-trace').init({
  service: 'my-node-app',
  env: process.env.DD_ENV || 'production',
  version: '1.0.0',
  logInjection: true,
  profiling: true,
  runtimeMetrics: true
});

// Rest of your application
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

**Environment variables:**

```bash
DD_AGENT_HOST=localhost
DD_TRACE_AGENT_PORT=8126
DD_SERVICE=my-node-app
DD_ENV=production
DD_VERSION=1.0.0
DD_LOGS_INJECTION=true
DD_PROFILING_ENABLED=true
DD_RUNTIME_METRICS_ENABLED=true
```

**Custom spans:**

```javascript
const tracer = require('dd-trace');

async function processOrder(orderId) {
  const span = tracer.startSpan('order.process', {
    resource: `order:${orderId}`,
    tags: {
      'order.id': orderId,
      'order.type': 'online'
    }
  });
  
  try {
    const result = await doProcessing(orderId);
    span.setTag('order.amount', result.amount);
    return result;
  } catch (error) {
    span.setTag('error', true);
    span.setTag('error.message', error.message);
    throw error;
  } finally {
    span.finish();
  }
}
```

### Python Application

**Install tracer:**

```bash
pip install ddtrace
```

**Run with auto-instrumentation:**

```bash
DD_SERVICE=my-python-app \
DD_ENV=production \
DD_VERSION=1.0.0 \
DD_LOGS_INJECTION=true \
DD_PROFILING_ENABLED=true \
ddtrace-run python app.py
```

**Manual instrumentation:**

```python
from ddtrace import tracer, patch_all

# Auto-instrument supported libraries
patch_all()

# Flask example
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello World'

# Custom span
@tracer.wrap(service='payment-service', resource='charge')
def process_payment(amount):
    span = tracer.current_span()
    span.set_tag('payment.amount', amount)
    span.set_tag('payment.currency', 'USD')
    
    # Your code
    result = charge_customer(amount)
    
    return result

if __name__ == '__main__':
    app.run()
```

**Django configuration:**

```python
# settings.py
INSTALLED_APPS = [
    'ddtrace.contrib.django',
    # ... other apps
]

MIDDLEWARE = [
    'ddtrace.contrib.django.TraceMiddleware',
    # ... other middleware
]

# Configure tracer
from ddtrace import config
config.django['service_name'] = 'my-django-app'
config.django['instrument_databases'] = True
config.django['instrument_caches'] = True
```

### Java Application

**Add tracer dependency (Maven):**

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-java-agent</artifactId>
    <version>1.30.0</version>
</dependency>
```

**Download agent:**

```bash
wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
```

**Run with agent:**

```bash
java -javaagent:/path/to/dd-java-agent.jar \
  -Ddd.service=my-java-app \
  -Ddd.env=production \
  -Ddd.version=1.0.0 \
  -Ddd.logs.injection=true \
  -Ddd.profiling.enabled=true \
  -jar myapp.jar
```

**Custom instrumentation:**

```java
import datadog.trace.api.Trace;
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

public class OrderService {
    
    @Trace(operationName = "order.process", resourceName = "processOrder")
    public Order processOrder(String orderId) {
        Span span = GlobalTracer.get().activeSpan();
        span.setTag("order.id", orderId);
        span.setTag("order.type", "online");
        
        // Your logic
        Order order = fetchOrder(orderId);
        
        span.setTag("order.amount", order.getAmount());
        return order;
    }
}
```

### Go Application

**Install tracer:**

```bash
go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
```

**Initialize:**

```go
package main

import (
    "log"
    "net/http"
    
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
    httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
)

func main() {
    tracer.Start(
        tracer.WithService("my-go-app"),
        tracer.WithEnv("production"),
        tracer.WithServiceVersion("1.0.0"),
        tracer.WithRuntimeMetrics(),
        tracer.WithProfilerCodeHotspots(true),
        tracer.WithProfilerEndpoints(true),
    )
    defer tracer.Stop()
    
    mux := httptrace.NewServeMux()
    mux.HandleFunc("/", handler)
    
    http.ListenAndServe(":8080", mux)
}

func handler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Hello World"))
}
```

**Custom spans:**

```go
import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func processOrder(orderID string) error {
    span := tracer.StartSpan("order.process",
        tracer.ResourceName("processOrder"),
        tracer.Tag("order.id", orderID),
    )
    defer span.Finish()
    
    // Your logic
    if err := doSomething(); err != nil {
        span.SetTag("error", err)
        return err
    }
    
    span.SetTag("order.status", "completed")
    return nil
}
```

### Ruby Application

**Add to Gemfile:**

```ruby
gem 'ddtrace', '~> 1.0'
```

**Configure (config/initializers/datadog.rb):**

```ruby
require 'datadog/tracing'

Datadog.configure do |c|
  c.service = 'my-ruby-app'
  c.env = 'production'
  c.version = '1.0.0'
  
  # Enable runtime metrics
  c.runtime_metrics.enabled = true
  
  # Rails auto-instrumentation
  c.tracing.instrument :rails
  c.tracing.instrument :redis
  c.tracing.instrument :active_record
  c.tracing.instrument :http
end
```

**Custom tracing:**

```ruby
require 'datadog/tracing'

Datadog::Tracing.trace('order.process', resource: 'process_order') do |span|
  span.set_tag('order.id', order_id)
  span.set_tag('order.type', 'online')
  
  # Your code
  result = process_order_logic(order_id)
  
  span.set_tag('order.amount', result[:amount])
end
```

## Log Management

### Enable Log Collection

**Agent configuration:**

```yaml
# /etc/datadog-agent/datadog.yaml
logs_enabled: true
```

**File-based log collection:**

```yaml
# /etc/datadog-agent/conf.d/myapp.d/conf.yaml
logs:
  - type: file
    path: /var/log/myapp/*.log
    service: myapp
    source: custom
    tags:
      - env:production
```

**Docker logs:**

```bash
docker run -d \
  --label "com.datadoghq.ad.logs"='[{"source": "myapp", "service": "myapp"}]' \
  myapp:latest
```

**Kubernetes logs:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
  annotations:
    ad.datadoghq.com/myapp.logs: '[{"source":"myapp","service":"myapp"}]'
spec:
  containers:
  - name: myapp
    image: myapp:latest
```

### Structured Logging with Log Injection

**Node.js (Winston):**

```javascript
const winston = require('winston');
const tracer = require('dd-trace');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

// Log with trace context
logger.info('User logged in', {
  dd: {
    trace_id: tracer.scope().active()?.context()?.toTraceId(),
    span_id: tracer.scope().active()?.context()?.toSpanId()
  },
  userId: '12345'
});
```

**Python (logging):**

```python
import logging
from ddtrace import tracer

# Configure logging format
logging.basicConfig(
    format='%(asctime)s %(levelname)s [dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] %(message)s'
)

logger = logging.getLogger(__name__)

# With log injection enabled, trace context is automatic
logger.info('Processing order', extra={'order_id': '12345'})
```

### Log Pipelines and Processing

**Parsing logs:**

```
# Grok parser for custom format
rule %{date("yyyy-MM-dd HH:mm:ss"):timestamp} %{word:level} \[%{notSpace:service}\] %{data:message}

# JSON parser (automatic for JSON logs)
# Extracts all JSON fields automatically
```

**Remapping attributes:**

```
# Remap custom timestamp to official timestamp
@timestamp -> timestamp

# Standardize status codes
status_code -> http.status_code
```

**Enrichment:**

```
# Add tags based on conditions
if (status_code >= 500) {
  set_tag("severity", "critical");
}
```

## Metrics and Custom Metrics

### DogStatsD

**Send custom metrics:**

```javascript
// Node.js
const StatsD = require('hot-shots');
const dogstatsd = new StatsD({
  host: 'localhost',
  port: 8125
});

// Counter
dogstatsd.increment('page.views', 1, ['page:home', 'user:premium']);

// Gauge
dogstatsd.gauge('queue.size', 150, ['queue:orders']);

// Histogram
dogstatsd.histogram('request.duration', 0.245, ['endpoint:/api/users']);

// Distribution
dogstatsd.distribution('response.time', 0.123, ['service:api']);
```

**Python:**

```python
from datadog import initialize, statsd

options = {
    'statsd_host': 'localhost',
    'statsd_port': 8125
}

initialize(**options)

# Send metrics
statsd.increment('page.views', tags=['page:home'])
statsd.gauge('queue.size', 150, tags=['queue:orders'])
statsd.histogram('request.duration', 0.245, tags=['endpoint:/api/users'])
statsd.distribution('response.time', 0.123, tags=['service:api'])
```

**Go:**

```go
import "github.com/DataDog/datadog-go/v5/statsd"

client, _ := statsd.New("localhost:8125")
defer client.Close()

// Send metrics
client.Incr("page.views", []string{"page:home"}, 1)
client.Gauge("queue.size", 150, []string{"queue:orders"}, 1)
client.Histogram("request.duration", 0.245, []string{"endpoint:/api/users"}, 1)
client.Distribution("response.time", 0.123, []string{"service:api"}, 1)
```

### Metric Types

- **Count**: Total occurrences
- **Rate**: Occurrences per second
- **Gauge**: Point-in-time value
- **Histogram**: Statistical distribution (avg, median, 95th percentile)
- **Distribution**: Global statistical distribution across all hosts

## Dashboards and Visualization

### Create Dashboard via UI

1. Navigate to Dashboards
2. Click "New Dashboard"
3. Add widgets: timeseries, query value, topology map, etc.

### Dashboard as Code (Terraform)

```hcl
resource "datadog_dashboard" "app_dashboard" {
  title       = "Application Dashboard"
  description = "Production application metrics"
  layout_type = "ordered"
  
  widget {
    timeseries_definition {
      title = "Request Rate"
      request {
        q = "sum:trace.web.request.hits{service:myapp}.as_rate()"
        display_type = "line"
      }
    }
  }
  
  widget {
    query_value_definition {
      title = "Error Rate"
      request {
        q = "sum:trace.web.request.errors{service:myapp}.as_rate()"
        aggregator = "avg"
      }
      precision = 2
      autoscale = true
    }
  }
  
  widget {
    heatmap_definition {
      title = "Request Latency Distribution"
      request {
        q = "trace.web.request{service:myapp}"
      }
    }
  }
}
```

### Dashboard API

```bash
curl -X POST "https://api.datadoghq.com/api/v1/dashboard" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "title": "My Dashboard",
    "widgets": [{
      "definition": {
        "type": "timeseries",
        "requests": [{
          "q": "avg:system.cpu.user{*}"
        }],
        "title": "CPU Usage"
      }
    }],
    "layout_type": "ordered"
  }'
```

## Monitors and Alerts

### Create Monitor

**Metric Monitor:**

```bash
curl -X POST "https://api.datadoghq.com/api/v1/monitor" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "type": "metric alert",
    "query": "avg(last_5m):avg:system.cpu.user{*} > 90",
    "name": "High CPU Usage",
    "message": "CPU usage is above 90% @pagerduty-critical",
    "tags": ["env:production"],
    "options": {
      "thresholds": {
        "critical": 90,
        "warning": 75
      },
      "notify_no_data": true,
      "no_data_timeframe": 10
    }
  }'
```

**APM Monitor:**

```bash
curl -X POST "https://api.datadoghq.com/api/v1/monitor" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "type": "trace-analytics alert",
    "query": "trace.web.request.errors{service:myapp}.rollup(sum).last(5m) > 10",
    "name": "High Error Rate",
    "message": "Error rate is high for myapp @slack-alerts",
    "tags": ["service:myapp"],
    "options": {
      "thresholds": {
        "critical": 10,
        "warning": 5
      }
    }
  }'
```

**Terraform Monitor:**

```hcl
resource "datadog_monitor" "high_error_rate" {
  name    = "High Error Rate"
  type    = "metric alert"
  message = "Error rate is above threshold @pagerduty @slack-alerts"
  query   = "avg(last_5m):sum:trace.web.request.errors{service:myapp}.as_rate() > 0.05"
  
  monitor_thresholds {
    critical = 0.05
    warning  = 0.03
  }
  
  notify_no_data    = false
  renotify_interval = 30
  
  tags = ["service:myapp", "env:production"]
}
```

## Synthetic Monitoring

### API Test

```bash
curl -X POST "https://api.datadoghq.com/api/v1/synthetics/tests/api" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "name": "API Health Check",
    "type": "api",
    "subtype": "http",
    "config": {
      "request": {
        "method": "GET",
        "url": "https://api.example.com/health"
      },
      "assertions": [
        {
          "type": "statusCode",
          "operator": "is",
          "target": 200
        },
        {
          "type": "responseTime",
          "operator": "lessThan",
          "target": 1000
        },
        {
          "type": "body",
          "operator": "contains",
          "target": "healthy"
        }
      ]
    },
    "locations": ["aws:us-east-1", "aws:eu-west-1"],
    "options": {
      "tick_every": 300,
      "min_failure_duration": 0,
      "min_location_failed": 1
    },
    "message": "API health check failed @pagerduty",
    "tags": ["env:production"]
  }'
```

### Browser Test

```javascript
// Synthetic browser test script
describe('Login Flow', function() {
  it('should login successfully', async function() {
    await $webDriver.get('https://app.example.com/login');
    
    await $webDriver.findElement($selenium.By.id('username')).sendKeys('testuser');
    await $webDriver.findElement($selenium.By.id('password')).sendKeys('password123');
    await $webDriver.findElement($selenium.By.css('button[type="submit"]')).click();
    
    await $webDriver.wait($selenium.until.urlContains('/dashboard'), 10000);
    
    const title = await $webDriver.getTitle();
    assert.strictEqual(title, 'Dashboard');
  });
});
```

## Service Level Objectives (SLOs)

### Create SLO

**Availability SLO:**

```bash
curl -X POST "https://api.datadoghq.com/api/v1/slo" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "type": "metric",
    "name": "API Availability",
    "description": "99.9% of requests should succeed",
    "thresholds": [{
      "timeframe": "30d",
      "target": 99.9,
      "warning": 99.95
    }],
    "query": {
      "numerator": "sum:trace.web.request.hits{service:myapp,http.status_code:200}.as_count()",
      "denominator": "sum:trace.web.request.hits{service:myapp}.as_count()"
    },
    "tags": ["service:myapp", "env:production"]
  }'
```

**Latency SLO:**

```bash
{
  "type": "monitor",
  "name": "API Latency p99 < 500ms",
  "description": "99% of requests should complete in under 500ms",
  "monitor_ids": [123456789],
  "thresholds": [{
    "timeframe": "7d",
    "target": 99.0,
    "warning": 99.5
  }],
  "tags": ["service:myapp"]
}
```

## Best Practices

### Tagging Strategy

- ✅ Use consistent tag structure: `env:production`, `service:api`, `version:1.2.3`
- ✅ Apply tags at multiple levels (infrastructure, containers, traces)
- ✅ Use `team:` tag for ownership
- ✅ Tag by cost center for billing
- ✅ Limit to 3-5 primary tags for filtering
- ✅ Use tag standardization (lowercase, hyphens)

### Performance

- ✅ Sample high-volume traces (ingestion sampling)
- ✅ Use DogStatsD for custom metrics (batch sends)
- ✅ Implement log sampling for noisy applications
- ✅ Use index filters to control log retention costs
- ✅ Monitor agent CPU/memory usage
- ✅ Use distribution metrics for accurate percentiles

### Cost Optimization

- ✅ Set log retention policies appropriately
- ✅ Use exclusion filters for unnecessary logs
- ✅ Archive logs to S3/Azure for compliance
- ✅ Configure metric rollups for long-term storage
- ✅ Use APM sampling to control span ingestion
- ✅ Monitor usage dashboard regularly
- ✅ Set up anomaly detection for cost spikes

### Security

- ✅ Rotate API keys regularly
- ✅ Use RBAC to limit team access
- ✅ Scrub sensitive data from logs (email, SSN, credit cards)
- ✅ Enable audit logs
- ✅ Use IP allowlists for API access
- ✅ Implement SSO/SAML for enterprise
- ✅ Tag resources with compliance requirements

## Datadog API

### Common API Operations

**Get metrics:**

```bash
curl -X GET "https://api.datadoghq.com/api/v1/query?from=$(date -d '1 hour ago' +%s)&to=$(date +%s)&query=avg:system.cpu.user{*}" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

**Post events:**

```bash
curl -X POST "https://api.datadoghq.com/api/v1/events" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '{
    "title": "Deployment",
    "text": "Version 1.2.3 deployed to production",
    "tags": ["env:production", "version:1.2.3"]
  }'
```

**Submit metrics:**

```bash
curl -X POST "https://api.datadoghq.com/api/v1/series" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '{
    "series": [{
      "metric": "custom.business.revenue",
      "type": "gauge",
      "points": [
        ['"$(date +%s)"', 12345.67]
      ],
      "tags": ["currency:USD", "region:US"]
    }]
  }'
```

## Real-World Use Cases

### Microservices Observability

```javascript
// Order Service with full observability
const tracer = require('dd-trace').init({
  service: 'order-service',
  version: process.env.VERSION,
  logInjection: true
});
const { StatsD } = require('hot-shots');
const dogstatsd = new StatsD();

app.post('/api/orders', async (req, res) => {
  const span = tracer.startSpan('order.create');
  const startTime = Date.now();
  
  try {
    // Business metric
    dogstatsd.increment('orders.created', 1, [`user_tier:${req.user.tier}`]);
    
    // Distributed tracing across services
    const [user, inventory, payment] = await Promise.all([
      httpClient.get('user-service/users/' + req.body.userId),
      httpClient.post('inventory-service/reserve', req.body.items),
      httpClient.post('payment-service/charge', req.body.payment)
    ]);
    
    const order = await createOrder(req.body);
    
    // Revenue metric
    dogstatsd.gauge('revenue.total', req.body.total, [`currency:${req.body.currency}`]);
    
    logger.info('Order created', { orderId: order.id, amount: req.body.total });
    
    span.setTag('order.id', order.id);
    span.setTag('order.amount', req.body.total);
    
    res.json({ orderId: order.id });
  } catch (error) {
    span.setTag('error', true);
    dogstatsd.increment('orders.failed', 1);
    logger.error('Order creation failed', { error: error.message });
    res.status(500).json({ error: error.message });
  } finally {
    const duration = Date.now() - startTime;
    dogstatsd.histogram('order.creation.duration', duration);
    span.finish();
  }
});
```

### SLO Monitoring

```sql
-- Availability SLI
(sum:trace.web.request.hits{service:api,!http.status_code:5*}.as_count() / 
 sum:trace.web.request.hits{service:api}.as_count()) * 100

-- Latency SLI (p99 < 500ms)
percentile(trace.web.request.duration{service:api}, 99) < 0.5

-- Error Budget Burn Rate
(1 - availability_sli / availability_target) * 100
```

## Troubleshooting

### Agent Not Reporting

```bash
# Check agent status
sudo datadog-agent status

# Check connectivity
sudo datadog-agent diagnose

# Check logs
sudo tail -f /var/log/datadog/agent.log

# Restart agent
sudo systemctl restart datadog-agent
```

### Missing APM Traces

```bash
# Verify APM enabled
curl http://localhost:8126/info

# Check tracer logs
DD_TRACE_DEBUG=true node app.js

# Verify agent receiving traces
sudo datadog-agent status | grep -A 10 "APM Agent"
```

### High Agent CPU/Memory

```yaml
# Reduce checks frequency
min_collection_interval: 30

# Disable unnecessary integrations
# /etc/datadog-agent/conf.d/

# Adjust log collection
logs_config:
  use_compression: true
  compression_level: 6
```

## References

- **Documentation**: https://docs.datadoghq.com/
- **APM**: https://docs.datadoghq.com/tracing/
- **Logs**: https://docs.datadoghq.com/logs/
- **Infrastructure**: https://docs.datadoghq.com/infrastructure/
- **API**: https://docs.datadoghq.com/api/
- **Integrations**: https://docs.datadoghq.com/integrations/
- **Community**: https://datadoghq.slack.com/
- **GitHub**: https://github.com/DataDog

---

## See Also

- [New Relic APM](../New-Relic/New-Relic.md)
- [Dynatrace APM](../Dynatrace/Dynatrace.md)
- [Prometheus Metrics](../../Metrics/Prometheus/Prometheus.md)
- [Jaeger Distributed Tracing](../../Tracing/Jaeger/Jaeger.md)
