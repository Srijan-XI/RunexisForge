# New Relic

## Introduction

New Relic is a comprehensive observability platform that provides application performance monitoring (APM), infrastructure monitoring, logs, distributed tracing, and real user monitoring. It helps teams monitor, debug, and improve their entire software stack.

## Why New Relic?

- **Full-Stack Observability**: Monitor applications, infrastructure, logs, and user experience
- **AI-Powered Insights**: Proactive anomaly detection and root cause analysis
- **Distributed Tracing**: Track requests across microservices
- **Real User Monitoring (RUM)**: Understand actual user experience
- **Unified Platform**: Single pane of glass for all observability data
- **Language Support**: Agents for 10+ programming languages
- **Integrations**: 400+ integrations with popular tools and services
- **Custom Dashboards**: Flexible visualization and alerting

## Key Features

### Application Performance Monitoring (APM)
- Transaction tracing and performance metrics
- Error tracking and analysis
- Database query performance
- External service monitoring
- Code-level diagnostics

### Infrastructure Monitoring
- Server and container monitoring
- Cloud platform integration (AWS, Azure, GCP)
- Kubernetes monitoring
- Network performance monitoring
- Log correlation

### Distributed Tracing
- End-to-end request tracking
- Service dependency mapping
- Latency analysis
- Error propagation tracking

### Real User Monitoring
- Page load performance
- JavaScript errors
- AJAX requests
- User session tracking
- Core Web Vitals

### Synthetic Monitoring
- API endpoint monitoring
- Website availability checks
- Multi-location testing
- Scripted browser tests

## New Relic vs Competitors

| Feature | New Relic | Datadog | Dynatrace | AppDynamics |
|---------|-----------|---------|-----------|-------------|
| APM | ✅ Excellent | ✅ Excellent | ✅ Excellent | ✅ Excellent |
| Infrastructure | ✅ Strong | ✅ Excellent | ✅ Strong | ✅ Good |
| Log Management | ✅ Good | ✅ Excellent | ✅ Good | ✅ Limited |
| Distributed Tracing | ✅ Excellent | ✅ Good | ✅ Excellent | ✅ Good |
| RUM | ✅ Excellent | ✅ Good | ✅ Excellent | ✅ Good |
| Pricing Model | Usage-based | Host-based | Usage-based | License-based |
| Ease of Use | High | High | Medium | Medium |
| AI/ML Insights | ✅ Strong | ✅ Good | ✅ Excellent | ✅ Good |

## When to Use New Relic

✅ **Use New Relic when:**
- Need comprehensive full-stack observability
- Running microservices architectures
- Want unified platform for APM, infrastructure, and logs
- Need user experience monitoring
- Prefer consumption-based pricing
- Want AI-powered insights and anomaly detection
- Building cloud-native applications
- Need quick time-to-value with auto-instrumentation

❌ **Consider alternatives when:**
- Budget is extremely limited (consider open-source)
- Need highly specialized monitoring (specific use case)
- Already heavily invested in another ecosystem
- Simple application with basic monitoring needs

## User Guide

## Getting Started

### 1. Create Account

Sign up at: https://newrelic.com/signup

**Account Types:**
- **Free Tier**: 100 GB/month data ingest, 1 user
- **Standard**: $0.30/GB after free tier
- **Pro**: $0.50/GB with advanced features
- **Enterprise**: Custom pricing with SLAs

### 2. Get License Key

```bash
# Navigate to: Account Settings > API Keys
# Copy your License Key
NEW_RELIC_LICENSE_KEY=your-40-character-license-key
```

### 3. Choose Data Center Region

- **US**: api.newrelic.com
- **EU**: api.eu.newrelic.com

## APM Agent Installation

### Node.js Application

**Install agent:**

```bash
npm install newrelic --save
```

**Create newrelic.js configuration:**

```javascript
// newrelic.js
'use strict'

exports.config = {
  app_name: ['My Application'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info'
  },
  distributed_tracing: {
    enabled: true
  },
  application_logging: {
    enabled: true,
    forwarding: {
      enabled: true
    }
  }
}
```

**Require at app entry point:**

```javascript
// index.js or app.js - MUST BE FIRST!
require('newrelic');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

**Environment variables:**

```bash
NEW_RELIC_LICENSE_KEY=your-license-key
NEW_RELIC_APP_NAME='My Node App'
NEW_RELIC_LOG=stdout
NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
```

### Python Application

**Install agent:**

```bash
pip install newrelic
```

**Generate configuration:**

```bash
newrelic-admin generate-config YOUR-LICENSE-KEY newrelic.ini
```

**newrelic.ini:**

```ini
[newrelic]
app_name = My Python Application
license_key = YOUR-LICENSE-KEY
distributed_tracing.enabled = true
application_logging.enabled = true
application_logging.forwarding.enabled = true

[newrelic:production]
monitor_mode = true
log_level = info

[newrelic:development]
monitor_mode = false
```

**Run application:**

```bash
# Method 1: Admin script
NEW_RELIC_CONFIG_FILE=newrelic.ini newrelic-admin run-program python app.py

# Method 2: Programmatic
# In app.py (before other imports)
import newrelic.agent
newrelic.agent.initialize('newrelic.ini')

# Then your app code
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World'
```

**Decorator for custom transactions:**

```python
import newrelic.agent

@newrelic.agent.background_task()
def process_background_job():
    # Your code here
    pass

@newrelic.agent.function_trace()
def expensive_function():
    # Traced function
    pass
```

### Java Application

**Add agent JAR:**

```bash
curl -O https://download.newrelic.com/newrelic/java-agent/newrelic-agent/current/newrelic-java.zip
unzip newrelic-java.zip
```

**Configure newrelic.yml:**

```yaml
common: &default_settings
  license_key: 'YOUR-LICENSE-KEY'
  app_name: My Java Application
  
  distributed_tracing:
    enabled: true
  
  application_logging:
    enabled: true
    forwarding:
      enabled: true

production:
  <<: *default_settings
  
development:
  <<: *default_settings
  log_level: debug
```

**Run with agent:**

```bash
java -javaagent:/path/to/newrelic.jar -jar myapp.jar
```

**Spring Boot application.properties:**

```properties
newrelic.config.license_key=YOUR-LICENSE-KEY
newrelic.config.app_name=My Spring Boot App
newrelic.config.distributed_tracing.enabled=true
```

### Go Application

**Install agent:**

```bash
go get github.com/newrelic/go-agent/v3/newrelic
```

**Initialize in code:**

```go
package main

import (
    "fmt"
    "net/http"
    "os"
    
    "github.com/newrelic/go-agent/v3/newrelic"
)

func main() {
    app, err := newrelic.NewApplication(
        newrelic.ConfigAppName("My Go App"),
        newrelic.ConfigLicense(os.Getenv("NEW_RELIC_LICENSE_KEY")),
        newrelic.ConfigDistributedTracerEnabled(true),
    )
    if err != nil {
        fmt.Println("Error creating New Relic application:", err)
    }
    
    http.HandleFunc(newrelic.WrapHandleFunc(app, "/", handler))
    http.ListenAndServe(":8000", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello World")
}
```

**Manual transaction:**

```go
txn := app.StartTransaction("myTransaction")
defer txn.End()

// Your code here

// Add custom attributes
txn.AddAttribute("userId", "12345")
txn.AddAttribute("region", "US-WEST")
```

### .NET Application

**Install NuGet package:**

```bash
dotnet add package NewRelic.Agent
```

**appsettings.json:**

```json
{
  "NewRelic": {
    "AppName": "My .NET Application",
    "LicenseKey": "YOUR-LICENSE-KEY",
    "DistributedTracing": {
      "Enabled": true
    },
    "ApplicationLogging": {
      "Enabled": true
    }
  }
}
```

**Program.cs (ASP.NET Core):**

The agent auto-instruments ASP.NET Core applications. No code changes needed!

**Custom instrumentation:**

```csharp
using NewRelic.Api.Agent;

public class MyService
{
    [Transaction]
    public void ProcessOrder(Order order)
    {
        NewRelic.Api.Agent.NewRelic.AddCustomParameter("orderId", order.Id);
        
        // Your code
    }
    
    [Trace]
    public void SubOperation()
    {
        // This will appear as a segment in the transaction
    }
}
```

### Ruby Application

**Add to Gemfile:**

```ruby
gem 'newrelic_rpm'
```

**Install:**

```bash
bundle install
```

**Generate config:**

```bash
curl -O https://raw.githubusercontent.com/newrelic/newrelic-ruby-agent/main/newrelic.yml
```

**newrelic.yml:**

```yaml
common: &default_settings
  license_key: <%= ENV['NEW_RELIC_LICENSE_KEY'] %>
  app_name: My Ruby Application
  distributed_tracing:
    enabled: true
  application_logging:
    enabled: true

production:
  <<: *default_settings

development:
  <<: *default_settings
  monitor_mode: false
```

**Rails auto-instruments automatically!**

**Custom instrumentation:**

```ruby
require 'new_relic/agent/method_tracer'

class MyClass
  include NewRelic::Agent::MethodTracer
  
  def my_method
    # Your code
  end
  add_method_tracer :my_method
end

# Or use blocks
NewRelic::Agent.record_custom_event('OrderProcessed', {
  order_id: '12345',
  amount: 99.99
})
```

## Infrastructure Monitoring

### Install Infrastructure Agent

**Linux:**

```bash
# Add New Relic repository
curl -s https://download.newrelic.com/infrastructure_agent/gpg/newrelic-infra.gpg | sudo apt-key add -

# Ubuntu/Debian
sudo add-apt-repository "deb [arch=amd64] https://download.newrelic.com/infrastructure_agent/linux/apt focal main"
sudo apt-get update
sudo apt-get install newrelic-infra -y

# RHEL/CentOS
sudo tee /etc/yum.repos.d/newrelic-infra.repo << EOF
[newrelic-infra]
name=New Relic Infrastructure
baseurl=https://download.newrelic.com/infrastructure_agent/linux/yum/el/\$releasever/\$basearch
enabled=1
gpgcheck=1
gpgkey=https://download.newrelic.com/infrastructure_agent/gpg/newrelic-infra.gpg
EOF

sudo yum -q makecache -y --disablerepo='*' --enablerepo='newrelic-infra'
sudo yum install newrelic-infra -y
```

**Configuration:**

```bash
# /etc/newrelic-infra.yml
license_key: YOUR-LICENSE-KEY
display_name: My Production Server
verbose: 0

# Custom attributes
custom_attributes:
  environment: production
  role: web-server
  datacenter: us-east-1
```

**Start agent:**

```bash
sudo systemctl start newrelic-infra
sudo systemctl enable newrelic-infra
```

### Docker Container Monitoring

```bash
docker run \
  -d \
  --name newrelic-infra \
  --network=host \
  --cap-add=SYS_PTRACE \
  --privileged \
  -v "/:/host:ro" \
  -v "/var/run/docker.sock:/var/run/docker.sock" \
  -e NRIA_LICENSE_KEY=YOUR-LICENSE-KEY \
  newrelic/infrastructure:latest
```

### Kubernetes Monitoring

**Install with Helm:**

```bash
helm repo add newrelic https://helm-charts.newrelic.com
helm repo update

kubectl create namespace newrelic

helm install newrelic-bundle newrelic/nri-bundle \
  --set global.licenseKey=YOUR-LICENSE-KEY \
  --set global.cluster=my-cluster \
  --namespace=newrelic \
  --set infrastructure.enabled=true \
  --set prometheus.enabled=true \
  --set webhook.enabled=true \
  --set ksm.enabled=true \
  --set kubeEvents.enabled=true \
  --set logging.enabled=true
```

**Manifest example:**

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: newrelic
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: newrelic-infrastructure-config
  namespace: newrelic
data:
  newrelic-infra.yml: |
    custom_attributes:
      clusterName: my-k8s-cluster
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: newrelic-infra
  namespace: newrelic
spec:
  selector:
    matchLabels:
      name: newrelic-infra
  template:
    metadata:
      labels:
        name: newrelic-infra
    spec:
      serviceAccountName: newrelic-infra
      hostNetwork: true
      hostPID: true
      hostIPC: true
      containers:
      - name: newrelic-infra
        image: newrelic/infrastructure-k8s:latest
        securityContext:
          privileged: true
        env:
        - name: NRIA_LICENSE_KEY
          value: YOUR-LICENSE-KEY
        - name: NRIA_DISPLAY_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: CLUSTER_NAME
          value: my-cluster
        volumeMounts:
        - name: host-volume
          mountPath: /host
          readOnly: true
        - name: host-docker-socket
          mountPath: /var/run/docker.sock
      volumes:
      - name: host-volume
        hostPath:
          path: /
      - name: host-docker-socket
        hostPath:
          path: /var/run/docker.sock
```

## Custom Instrumentation

### Custom Metrics

**Node.js:**

```javascript
const newrelic = require('newrelic');

// Record a custom metric
newrelic.recordMetric('Custom/MyMetric', 42);

// Record custom event
newrelic.recordCustomEvent('PurchaseCompleted', {
  userId: '12345',
  itemId: 'SKU-789',
  amount: 99.99,
  currency: 'USD'
});

// Add custom attributes to transaction
newrelic.addCustomAttributes({
  userTier: 'premium',
  region: 'US-WEST'
});
```

**Python:**

```python
import newrelic.agent

# Record custom metric
newrelic.agent.record_custom_metric('Custom/QueueSize', 150)

# Record custom event
newrelic.agent.record_custom_event('VideoUploaded', {
    'video_id': 'vid_12345',
    'duration': 180,
    'resolution': '1080p'
})

# Add custom attributes
newrelic.agent.add_custom_attribute('subscription_type', 'pro')
```

**Java:**

```java
import com.newrelic.api.agent.NewRelic;

// Record metric
NewRelic.recordMetric("Custom/QueueDepth", 42.0f);

// Record custom event
Map<String, Object> eventAttributes = new HashMap<>();
eventAttributes.put("userId", "12345");
eventAttributes.put("action", "purchase");
NewRelic.getAgent().getInsights().recordCustomEvent("UserAction", eventAttributes);

// Add custom parameter
NewRelic.addCustomParameter("accountType", "premium");
```

### Custom Transactions

**Node.js:**

```javascript
const newrelic = require('newrelic');

async function backgroundJob() {
  return newrelic.startBackgroundTransaction('Background/ProcessQueue', async () => {
    // Your background job logic
    const result = await processQueue();
    
    newrelic.addCustomAttributes({
      itemsProcessed: result.count,
      duration: result.duration
    });
    
    return result;
  });
}
```

**Python:**

```python
import newrelic.agent

@newrelic.agent.background_task(name='process-images')
def process_images():
    # Your code
    pass

# Or manual
application = newrelic.agent.register_application(timeout=10)

with newrelic.agent.BackgroundTask(application, name='custom-task'):
    # Your code
    pass
```

## Log Management

### Forward Logs

**Using Infrastructure Agent:**

```yaml
# /etc/newrelic-infra/logging.d/app-logs.yml
logs:
  - name: app-log
    file: /var/log/myapp/application.log
    attributes:
      environment: production
      application: myapp
```

**Using Fluentd:**

```bash
# Install plugin
gem install fluent-plugin-newrelic
```

**fluent.conf:**

```conf
<match **>
  @type newrelic
  license_key YOUR-LICENSE-KEY
  base_uri https://log-api.newrelic.com/log/v1
</match>
```

**Using Logstash:**

```ruby
# logstash.conf
output {
  http {
    url => "https://log-api.newrelic.com/log/v1"
    http_method => "post"
    headers => {
      "X-License-Key" => "YOUR-LICENSE-KEY"
    }
    format => "json"
  }
}
```

### Application Logs in Context

**Node.js with Winston:**

```javascript
const winston = require('winston');
const newrelicFormatter = require('@newrelic/winston-enricher')(winston);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'my-app' }),
    newrelicFormatter()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

logger.info('User logged in', { userId: '12345' });
```

**Python with logging:**

```python
import logging
import newrelic.agent

# Logs are automatically enriched when application_logging is enabled
logger = logging.getLogger(__name__)
logger.info('Processing order', extra={'order_id': '12345'})
```

## Distributed Tracing

### Enable Distributed Tracing

Already enabled in modern agents by default. Verify in config:

**Node.js (newrelic.js):**

```javascript
exports.config = {
  distributed_tracing: {
    enabled: true
  },
  span_events: {
    enabled: true
  }
}
```

### Cross-Service Tracing

**Service A (Node.js) → Service B (Python):**

**Service A:**

```javascript
const newrelic = require('newrelic');
const axios = require('axios');

app.get('/api/order', async (req, res) => {
  // New Relic automatically adds trace headers
  const response = await axios.get('http://service-b:5000/process', {
    headers: newrelic.getTraceMetadata()
  });
  
  res.json(response.data);
});
```

**Service B:**

```python
import newrelic.agent

@app.route('/process')
@newrelic.agent.web_transaction()
def process():
    # Automatically picks up trace context from headers
    return {'status': 'processed'}
```

### Manual Span Creation

**Node.js:**

```javascript
const newrelic = require('newrelic');

newrelic.startSegment('customOperation', true, async () => {
  // Your expensive operation
  const result = await expensiveOperation();
  
  newrelic.addCustomSpanAttribute('result.count', result.count);
  
  return result;
});
```

**Python:**

```python
import newrelic.agent

@newrelic.agent.function_trace(name='expensive-operation')
def expensive_operation():
    # Your code
    pass
```

## Dashboards and Visualization

### Create Custom Dashboard

**Using UI:**
1. Navigate to Dashboards
2. Click "Create dashboard"
3. Add widgets using NRQL queries

**Using API:**

```bash
curl -X POST 'https://api.newrelic.com/graphql' \
  -H 'Content-Type: application/json' \
  -H 'API-Key: YOUR-USER-API-KEY' \
  -d '{
    "query": "mutation {
      dashboardCreate(
        accountId: YOUR-ACCOUNT-ID,
        dashboard: {
          name: \"My Custom Dashboard\",
          pages: [{
            name: \"Overview\",
            widgets: [{
              title: \"Response Time\",
              visualization: { id: \"viz.line\" },
              configuration: {
                nrqlQueries: [{
                  accountId: YOUR-ACCOUNT-ID,
                  query: \"SELECT average(duration) FROM Transaction TIMESERIES\"
                }]
              }
            }]
          }]
        }
      ) {
        entityResult {
          guid
        }
      }
    }"
  }'
```

### NRQL Queries

**Basic transaction query:**

```sql
SELECT average(duration), max(duration), count(*)
FROM Transaction
WHERE appName = 'My Application'
SINCE 1 hour ago
```

**Error rate:**

```sql
SELECT percentage(count(*), WHERE error IS true)
FROM Transaction
FACET appName
TIMESERIES
```

**Custom events:**

```sql
SELECT count(*)
FROM PurchaseCompleted
WHERE amount > 100
FACET currency
SINCE 1 day ago
```

**Infrastructure metrics:**

```sql
SELECT average(cpuPercent), average(memoryUsedPercent)
FROM SystemSample
FACET hostname
TIMESERIES AUTO
```

**Distributed tracing:**

```sql
SELECT count(*)
FROM Span
WHERE service.name = 'order-service'
FACET name
SINCE 1 hour ago
```

## Alerts and Notifications

### Create Alert Policy

**Via UI:**
1. Navigate to Alerts & AI
2. Create new alert policy
3. Add conditions
4. Configure notification channels

**Via API:**

```bash
# Create policy
curl -X POST 'https://api.newrelic.com/v2/alerts_policies.json' \
  -H 'X-Api-Key: YOUR-ADMIN-API-KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "policy": {
      "incident_preference": "PER_CONDITION",
      "name": "Production Alerts"
    }
  }'

# Create NRQL alert condition
curl -X POST 'https://api.newrelic.com/v2/alerts_nrql_conditions/policies/POLICY_ID.json' \
  -H 'X-Api-Key: YOUR-ADMIN-API-KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "nrql_condition": {
      "type": "static",
      "name": "High Error Rate",
      "enabled": true,
      "value_function": "single_value",
      "terms": [{
        "duration": "5",
        "operator": "above",
        "priority": "critical",
        "threshold": "5",
        "time_function": "all"
      }],
      "nrql": {
        "query": "SELECT percentage(count(*), WHERE error IS true) FROM Transaction"
      }
    }
  }'
```

### Notification Channels

**Slack:**

```bash
curl -X POST 'https://api.newrelic.com/v2/alerts_channels.json' \
  -H 'X-Api-Key: YOUR-ADMIN-API-KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "channel": {
      "name": "Slack Production",
      "type": "slack",
      "configuration": {
        "url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
        "channel": "#alerts"
      }
    }
  }'
```

**PagerDuty, Webhook, Email, etc.** - Similar API structure

### Applied Intelligence

**Anomaly Detection:**
- Automatically enabled on Pro/Enterprise
- Machine learning detects unusual patterns
- Baseline analysis for metrics

**Incident Intelligence:**
- Correlate related incidents
- Reduce alert noise
- Root cause suggestions

## Synthetic Monitoring

### Create Simple Browser Monitor

**Via UI:**
1. Navigate to Synthetic Monitoring
2. Create monitor → Simple browser
3. Enter URL and locations

**Via API:**

```bash
curl -X POST 'https://synthetics.newrelic.com/synthetics/api/v3/monitors' \
  -H 'X-Api-Key: YOUR-ADMIN-API-KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Homepage Monitor",
    "type": "SIMPLE",
    "frequency": 5,
    "uri": "https://www.example.com",
    "locations": ["AWS_US_EAST_1", "AWS_EU_WEST_1"],
    "status": "ENABLED"
  }'
```

### Scripted Browser Monitor

```javascript
// Scripted browser (Selenium WebDriver)
$browser.get("https://www.example.com");

// Wait for element
$browser.waitForAndFindElement($driver.By.id("login-button"), 10000);

// Click button
$browser.findElement($driver.By.id("login-button")).click();

// Fill form
$browser.findElement($driver.By.name("username")).sendKeys("testuser");
$browser.findElement($driver.By.name("password")).sendKeys("password123");

// Submit
$browser.findElement($driver.By.css("button[type='submit']")).click();

// Assert
$browser.waitForAndFindElement($driver.By.className("dashboard"), 10000)
  .then(function(element) {
    return element.getText();
  })
  .then(function(text) {
    console.log("Dashboard text:", text);
    assert.ok(text.includes("Welcome"), "Dashboard loaded successfully");
  });
```

### API Test Monitor

```javascript
// Scripted API test
var assert = require('assert');

$http.get('https://api.example.com/health', {
  headers: {
    'Authorization': 'Bearer ' + $secure.API_TOKEN
  }
}, function(err, response, body) {
  assert.equal(response.statusCode, 200, 'Expected HTTP 200');
  
  var data = JSON.parse(body);
  assert.equal(data.status, 'healthy', 'API should be healthy');
  
  console.log('Health check passed');
});
```

## Best Practices

### Configuration

- ✅ Use environment variables for sensitive data
- ✅ Enable distributed tracing from day one
- ✅ Configure appropriate log levels (info in prod)
- ✅ Set meaningful application names
- ✅ Use custom attributes for business context
- ✅ Configure sampling rates for high-volume apps
- ✅ Enable application logging forwarding

### Performance

- ✅ Monitor agent overhead (typically <3% CPU)
- ✅ Use asynchronous logging
- ✅ Implement custom instrumentation judiciously  
- ✅ Sample high-frequency transactions if needed
- ✅ Use span events for detailed traces
- ✅ Optimize NRQL queries for large datasets
- ✅ Set appropriate data retention policies

### Monitoring Strategy

- ✅ Define SLOs and SLIs before alerting
- ✅ Create meaningful dashboards (RED/USE methods)
- ✅ Set up alerts with proper thresholds
- ✅ Use Applied Intelligence to reduce noise
- ✅ Implement logs in context
- ✅ Monitor both symptoms and causes
- ✅ Track business metrics alongside technical metrics
- ✅ Regular review of alert policies

### Security

- ✅ Rotate API keys regularly
- ✅ Use separate accounts for dev/staging/prod
- ✅ Implement least-privilege access control
- ✅ Mask sensitive data in logs
- ✅ Use RBAC for team access
- ✅ Enable SSO for enterprise
- ✅ Audit user access regularly
- ✅ Use secure environment variables

## Terraform Integration

```hcl
# Provider configuration
terraform {
  required_providers {
    newrelic = {
      source  = "newrelic/newrelic"
      version = "~> 3.0"
    }
  }
}

provider "newrelic" {
  account_id = var.newrelic_account_id
  api_key    = var.newrelic_api_key
  region     = "US"
}

# Alert policy
resource "newrelic_alert_policy" "production" {
  name = "Production Alerts"
  incident_preference = "PER_CONDITION"
}

# NRQL alert condition
resource "newrelic_nrql_alert_condition" "high_error_rate" {
  policy_id   = newrelic_alert_policy.production.id
  name        = "High Error Rate"
  type        = "static"
  enabled     = true
  
  nrql {
    query = "SELECT percentage(count(*), WHERE error IS true) FROM Transaction WHERE appName = 'My App'"
  }
  
  critical {
    operator              = "above"
    threshold             = 5
    threshold_duration    = 300
    threshold_occurrences = "all"
  }
  
  warning {
    operator              = "above"
    threshold             = 3
    threshold_duration    = 300
    threshold_occurrences = "all"
  }
}

# Dashboard
resource "newrelic_one_dashboard" "app_dashboard" {
  name = "Application Dashboard"
  
  page {
    name = "Overview"
    
    widget_line {
      title  = "Response Time"
      row    = 1
      column = 1
      width  = 6
      height = 3
      
      nrql_query {
        query = "SELECT average(duration) FROM Transaction TIMESERIES"
      }
    }
    
    widget_billboard {
      title  = "Error Rate"
      row    = 1
      column = 7
      width  = 6
      height = 3
      
      nrql_query {
        query = "SELECT percentage(count(*), WHERE error IS true) FROM Transaction"
      }
      
      critical = 5
      warning  = 3
    }
  }
}

# Synthetic monitor
resource "newrelic_synthetics_monitor" "homepage" {
  name      = "Homepage Monitor"
  type      = "SIMPLE"
  frequency = 5
  status    = "ENABLED"
  locations = ["AWS_US_EAST_1", "AWS_EU_WEST_1"]
  
  uri                       = "https://www.example.com"
  validation_string         = "Welcome"
  verify_ssl                = true
  bypass_head_request       = false
  treat_redirect_as_failure = false
}
```

## Real-World Use Cases

### Microservices Architecture

```javascript
// Order Service
const newrelic = require('newrelic');
const express = require('express');
const axios = require('axios');

const app = express();

app.post('/api/orders', async (req, res) => {
  try {
    // Trace across services automatically
    const [user, inventory, payment] = await Promise.all([
      axios.get('http://user-service/users/' + req.body.userId),
      axios.post('http://inventory-service/reserve', req.body.items),
      axios.post('http://payment-service/charge', req.body.payment)
    ]);
    
    // Custom event for business metrics
    newrelic.recordCustomEvent('OrderPlaced', {
      orderId: order.id,
      userId: req.body.userId,
      amount: req.body.total,
      itemCount: req.body.items.length
    });
    
    res.json({ orderId: order.id });
  } catch (error) {
    newrelic.noticeError(error);
    res.status(500).json({ error: error.message });
  }
});
```

### Lambda Function Monitoring

```javascript
// AWS Lambda with New Relic layer
const newrelic = require('newrelic');

exports.handler = newrelic.setLambdaHandler(async (event, context) => {
  newrelic.addCustomAttributes({
    eventSource: event.source,
    accountId: event.accountId
  });
  
  try {
    const result = await processEvent(event);
    
    newrelic.recordCustomEvent('EventProcessed', {
      eventType: event.type,
      processingTime: result.duration
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    newrelic.noticeError(error);
    throw error;
  }
});
```

### SLI/SLO Tracking

```sql
-- Service Level Indicator: Availability
SELECT percentage(count(*), WHERE httpResponseCode != 500) AS 'Availability %'
FROM Transaction
WHERE appName = 'My Service'
SINCE 30 days ago

-- SLI: Latency (95th percentile < 200ms)
SELECT percentage(count(*), WHERE duration < 0.2) AS 'Latency SLI %'
FROM Transaction
WHERE appName = 'My Service'
SINCE 30 days ago

-- Error Budget
SELECT 100 - percentage(count(*), WHERE error IS true) AS 'Error Budget %'
FROM Transaction
SINCE 30 days ago
```

## Troubleshooting

### Agent Not Reporting

```bash
# Check agent status
NEW_RELIC_LOG=stdout NEW_RELIC_LOG_LEVEL=debug node app.js

# Verify license key
echo $NEW_RELIC_LICENSE_KEY

# Test connectivity
curl -H "X-License-Key: YOUR-LICENSE-KEY" \
  https://collector.newrelic.com/status/mongrel

# Check firewall (agent needs outbound HTTPS)
# collector.newrelic.com:443
# log-api.newrelic.com:443
```

### High Agent Overhead

```javascript
// Reduce sampling
exports.config = {
  transaction_tracer: {
    transaction_threshold: 'apdex_f',  // Only trace slow transactions
    record_sql: 'obfuscated',          // Reduce SQL trace
  },
  slow_sql: {
    enabled: false  // Disable if not needed
  }
}
```

### Missing Distributed Traces

```bash
# Ensure all services have DT enabled
# Check for clock skew between services
# Verify trace propagation headers

# Debug headers
console.log(req.headers['newrelic']);
console.log(req.headers['traceparent']);
```

## References

- **Documentation**: https://docs.newrelic.com/
- **APM Agents**: https://docs.newrelic.com/docs/apm/
- **Infrastructure**: https://docs.newrelic.com/docs/infrastructure/
- **Logs**: https://docs.newrelic.com/docs/logs/
- **Synthetics**: https://docs.newrelic.com/docs/synthetics/
- **API**: https://docs.newrelic.com/docs/apis/
- **Community**: https://discuss.newrelic.com/
- **GitHub**: https://github.com/newrelic

---

## See Also

- [Datadog Monitoring](../../Datadog/Datadog.md)
- [Dynatrace APM](../../Dynatrace/Dynatrace.md)
- [Prometheus Metrics](../../../Metrics/Prometheus/Prometheus.md)
- [Jaeger Distributed Tracing](../../../Tracing/Jaeger/Jaeger.md)
