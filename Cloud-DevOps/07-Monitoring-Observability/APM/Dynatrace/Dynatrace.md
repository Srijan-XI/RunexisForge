# Dynatrace

## Introduction

Dynatrace is an AI-powered, full-stack observability platform that provides automated application performance monitoring, infrastructure monitoring, digital experience monitoring, and AIOps capabilities. It uses OneAgent technology for automatic instrumentation and Davis AI for intelligent problem detection and root cause analysis.

## Why Dynatrace?

- **Automatic Instrumentation**: OneAgent auto-discovers and instruments everything
- **Davis AI**: AI-powered root cause analysis and anomaly detection
- **Full-Stack Visibility**: From user experience to infrastructure
- **Zero Configuration**: No manual setup or tagging required
- **Automated Baselining**: AI learns normal behavior automatically
- **Real User Monitoring**: Actual user experience tracking
- **Cloud-Native**: Kubernetes, service mesh, serverless support
- **Business Analytics**: Link technical metrics to business outcomes

## Key Features

### OneAgent Technology
- Single agent for all monitoring
- Automatic code injection
- Zero configuration required
- Continuous auto-discovery
- Minimal performance overhead (<1% CPU)

### Davis AI (Artificial Intelligence)
- Anomaly detection
- Root cause analysis
- Predictive alerting
- Problem correlation
- Impact analysis
- Self-healing automation

### Application Performance Monitoring
- Distributed tracing
- Service flow analysis
- Database monitoring
- Code-level visibility
- Error analysis
- Response time breakdown

### Real User Monitoring (RUM)
- User session tracking
- Apdex scoring
- User action analysis
- Conversion funneling
- Core Web Vitals
- Mobile app monitoring

### Infrastructure Monitoring
- Host monitoring
- Container and Kubernetes
- Cloud platforms (AWS, Azure, GCP)
- Network monitoring
- Process monitoring

### Synthetic Monitoring
- Browser monitors
- HTTP monitors
- Global locations
- Third-party testing

## Dynatrace vs Competitors

| Feature | Dynatrace | New Relic | Datadog | AppDynamics |
|---------|-----------|-----------|---------|-------------|
| Auto-Discovery | ✅ Excellent | ✅ Good | ✅ Good | ✅ Good |
| AI/ML | ✅ Davis AI (Best) | ✅ Good | ✅ Good | ✅ Good |
| Configuration | ✅ Zero-config | ✅ Low | ✅ Medium | ✅ Medium |
| Full-Stack | ✅ Excellent | ✅ Strong | ✅ Strong | ✅ Strong |
| Root Cause Analysis | ✅ Automated | ➕ Manual | ➕ Manual | ✅ Good |
| Learning Curve | Low | Low | Medium | Medium |
| Pricing | 💰 High | 💰 Medium | 💰 Medium | 💰 High |
| Setup Time | Minutes | Hours | Hours | Hours |

## When to Use Dynatrace

✅ **Use Dynatrace when:**
- Need automatic discovery and instrumentation
- Want AI-powered root cause analysis
- Running complex microservices environments
- Need zero-configuration monitoring
- Have large-scale deployments
- Want unified full-stack observability
- Need enterprise support and SLAs
- Budget supports premium pricing
- Want fastest time-to-value

❌ **Consider alternatives when:**
- Budget is extremely limited
- Need highly customizable dashboards (Datadog better)
- Prefer open-source solutions
- Simple application with basic needs
- Want granular control over instrumentation

## User Guide

## Getting Started

### 1. Sign Up for Dynatrace

**SaaS Options:**
- Free trial: 15 days full features
- Sign up: https://www.dynatrace.com/trial/

**Deployment Options:**
- **SaaS**: Dynatrace-managed (recommended)
- **Managed**: Self-hosted control plane
- **ActiveGate**: Proxy for private networks

**Regions:**
- US: `https://{environment-id}.live.dynatrace.com`
- EU: `https://{environment-id}.dynatrace.com`
- AP: `https://{environment-id}.dynatrace-managed.com`

### 2. Get Environment ID and Token

Navigate to: Deploy Dynatrace > Start installation

```bash
# Environment ID
ENVIRONMENT_ID=abc12345

# PaaS Token (for OneAgent deployment)
PAAS_TOKEN=dt0c01.ABC123...

# API Token (for API access)
API_TOKEN=dt0c01.XYZ789...
```

### 3. Pricing Tiers

- **Full-Stack Monitoring**: $69/host/month (8 GB included)
- **Infrastructure Monitoring**: $21/host/month
- **Application Security**: $10/host/month
- **Digital Experience Monitoring**: $0.00225/session
- **Additional Data**: $8/GB/month

## OneAgent Installation

### Linux

**Automated installer:**

```bash
# Download installer
wget -O Dynatrace-OneAgent-Linux.sh \
  "https://{environment-id}.live.dynatrace.com/api/v1/deployment/installer/agent/unix/default/latest?arch=x86&flavor=default" \
  --header="Authorization: Api-Token {PAAS_TOKEN}"

# Make executable
chmod +x Dynatrace-OneAgent-Linux.sh

# Install
sudo /bin/sh Dynatrace-OneAgent-Linux.sh \
  --set-app-log-content-access=true \
  --set-infra-only=false \
  --set-host-group={HOST_GROUP} \
  --set-host-tag={KEY}={VALUE}
```

**Verify installation:**

```bash
# Check OneAgent status
sudo systemctl status oneagent

# View OneAgent logs
sudo journalctl -u oneagent
```

**Uninstall:**

```bash
sudo /opt/dynatrace/oneagent/agent/uninstall.sh
```

### Docker

**Run as privileged container:**

```bash
docker run -d \
  --name dynatrace-oneagent \
  --privileged \
  --pid=host \
  --network=host \
  --ipc=host \
  -v /:/mnt/root \
  -e ONEAGENT_INSTALLER_SCRIPT_URL="https://{environment-id}.live.dynatrace.com/api/v1/deployment/installer/agent/unix/default/latest?arch=x86&flavor=default" \
  -e ONEAGENT_INSTALLER_DOWNLOAD_TOKEN="{PAAS_TOKEN}" \
  dynatrace/oneagent
```

### Kubernetes

**Operator installation (recommended):**

```bash
# Add Dynatrace Helm repo
helm repo add dynatrace https://raw.githubusercontent.com/Dynatrace/helm-charts/master/repos/stable

# Create namespace
kubectl create namespace dynatrace

# Create secret with tokens
kubectl -n dynatrace create secret generic dynakube \
  --from-literal="apiToken={API_TOKEN}" \
  --from-literal="paasToken={PAAS_TOKEN}"

# Install Dynatrace Operator
helm install dynatrace-operator dynatrace/dynatrace-operator \
  --namespace dynatrace \
  --create-namespace \
  --set platform="kubernetes"

# Create DynaKube custom resource
kubectl apply -f - <<EOF
apiVersion: dynatrace.com/v1beta1
kind: DynaKube
metadata:
  name: dynakube
  namespace: dynatrace
spec:
  apiUrl: https://{environment-id}.live.dynatrace.com/api
  
  oneAgent:
    classicFullStack:
      tolerations:
        - effect: NoSchedule
          key: node-role.kubernetes.io/master
          operator: Exists
      env:
        - name: ONEAGENT_ENABLE_VOLUME_STORAGE
          value: "true"
  
  activeGate:
    capabilities:
      - routing
      - kubernetes-monitoring
      - dynatrace-api
```

**Verify deployment:**

```bash
kubectl -n dynatrace get pods
kubectl -n dynatrace logs -l app.kubernetes.io/name=dynatrace-operator
```

### Cloud Platforms

**AWS Elastic Beanstalk:**

```bash
# Add to .ebextensions/dynatrace.config
files:
  "/tmp/dynatrace-install.sh":
    mode: "000755"
    owner: root
    group: root
    content: |
      #!/bin/bash
      wget -O /tmp/Dynatrace-OneAgent-Linux.sh \
        "https://{environment-id}.live.dynatrace.com/api/v1/deployment/installer/agent/unix/default/latest" \
        --header="Authorization: Api-Token {PAAS_TOKEN}"
      /bin/sh /tmp/Dynatrace-OneAgent-Linux.sh

commands:
  01_install_dynatrace:
    command: /tmp/dynatrace-install.sh
```

**Azure App Service:**

1. Navigate to Application Insights blade
2. Select "Dynatrace extension"
3. Enter environment ID and token

**Google Cloud Run:**

```dockerfile
# Add to Dockerfile
RUN wget -O /tmp/Dynatrace-OneAgent-Linux.sh \
  "https://{environment-id}.live.dynatrace.com/api/v1/deployment/installer/agent/unix/paas-sh/latest?flavor=default&arch=x86" \
  --header="Authorization: Api-Token {PAAS_TOKEN}" && \
  /bin/sh /tmp/Dynatrace-OneAgent-Linux.sh

ENV LD_PRELOAD=/opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so
```

## Application Monitoring

### Java Application

**Automatic instrumentation (no code changes!):**

OneAgent automatically detects and instruments Java applications.

**Custom instrumentation (optional):**

```xml
<!-- Add Maven dependency -->
<dependency>
    <groupId>com.dynatrace.oneagent.sdk.java</groupId>
    <artifactId>oneagent-sdk</artifactId>
    <version>1.8.0</version>
</dependency>
```

```java
import com.dynatrace.oneagent.sdk.OneAgentSDK;
import com.dynatrace.oneagent.sdk.api.IncomingRemoteCallTracer;

public class OrderService {
    private static final OneAgentSDK oneAgentSdk = OneAgentSDKFactory.createInstance();
    
    public void processOrder(String orderId) {
        // Custom service tracing
        TracerBuilder tracerBuilder = oneAgentSdk.traceIncomingRemoteCall(
            "processOrder", "OrderService", "RPC");
        
        try (IncomingRemoteCallTracer tracer = tracerBuilder.start()) {
            tracer.setProtocolName("Custom-RPC");
            
            // Your business logic
            Order order = fetchOrder(orderId);
            
            // Add custom request attribute
            oneAgentSdk.addCustomRequestAttribute("order.id", orderId);
            oneAgentSdk.addCustomRequestAttribute("order.amount", order.getAmount());
            
            processPayment(order);
        }
    }
}
```

### Node.js Application

**Automatic instrumentation:**

No code changes needed! OneAgent auto-instruments Node.js.

**Custom instrumentation:**

```javascript
const oneagent = require('@dynatrace/oneagent-sdk');

oneagent.init();

// Custom tracing
function processOrder(orderId) {
  const tracer = oneagent.traceIncomingRemoteCall(
    'processOrder',
    'OrderService',
    'RPC'
  );
  
  tracer.setProtocolName('Custom-RPC');
  tracer.start();
  
  try {
    // Your logic
    const order = fetchOrder(orderId);
    
    tracer.addRequestAttribute('order.id', orderId);
    tracer.addRequestAttribute('order.amount', order.amount);
    
    return order;
  } catch (error) {
    tracer.error(error);
    throw error;
  } finally {
    tracer.end();
  }
}

// Custom metrics
oneagent.addCustomRequestAttribute('user.tier', 'premium');
```

### Python Application

**Automatic instrumentation:**

OneAgent auto-instruments Python (Django, Flask, FastAPI).

**Custom instrumentation:**

```python
from oneagent import initialize, sdk

# Initialize OneAgent SDK
initialize()
sdk_instance = sdk.get_instance()

def process_order(order_id):
    # Custom tracing
    tracer = sdk_instance.trace_incoming_remote_call(
        'processOrder',
        'OrderService',
        'RPC'
    )
    tracer.set_protocol_name('Custom-RPC')
    tracer.start()
    
    try:
        order = fetch_order(order_id)
        
        # Add custom attributes
        sdk_instance.add_custom_request_attribute('order.id', order_id)
        sdk_instance.add_custom_request_attribute('order.amount', order['amount'])
        
        return order
    except Exception as e:
        tracer.error(e)
        raise
    finally:
        tracer.end()
```

### .NET Application

**Automatic instrumentation:**

OneAgent auto-instruments .NET Framework and .NET Core.

**Custom instrumentation:**

```csharp
using Dynatrace.OneAgent.Sdk.Api;
using Dynatrace.OneAgent.Sdk.Api.Infos;

public class OrderService
{
    private static IOneAgentSDK oneAgentSdk = OneAgentSDKFactory.CreateInstance();
    
    public void ProcessOrder(string orderId)
    {
        // Custom tracing
        IIncomingRemoteCallTracer tracer = oneAgentSdk.TraceIncomingRemoteCall(
            "processOrder", "OrderService", "RPC");
        
        tracer.SetProtocolName("Custom-RPC");
        tracer.Start();
        
        try
        {
            var order = FetchOrder(orderId);
            
            // Custom request attributes
            oneAgentSdk.AddCustomRequestAttribute("order.id", orderId);
            oneAgentSdk.AddCustomRequestAttribute("order.amount", order.Amount);
            
            ProcessPayment(order);
        }
        catch (Exception ex)
        {
            tracer.Error(ex);
            throw;
        }
        finally
        {
            tracer.End();
        }
    }
}
```

### Go Application

**Automatic instrumentation limitations:**

Go requires manual instrumentation due to static linking.

```go
import (
    "github.com/dynatrace-oss/dynatrace-go-api/pkg/dynatrace"
)

func main() {
    // Initialize Dynatrace
    dt := dynatrace.NewClient(
        dynatrace.WithEnvironmentURL("https://{environment-id}.live.dynatrace.com"),
        dynatrace.WithAPIToken("{API_TOKEN}"),
    )
    
    // Your application code
}

func processOrder(orderID string) error {
    // Custom tracing via API
    // Use OpenTelemetry integration (recommended)
}
```

## Request Attributes

### Capture Request Attributes

**Configure in UI:**
1. Settings > Server-side service monitoring > Request attributes
2. Click "Define a new request attribute"

**Common sources:**
- HTTP headers
- Query parameters
- POST parameters
- Request body (JSON path)
- Session attributes
- Java method parameters

**Example:**

```
Name: User ID
Data source: Java method parameter
Class: com.example.UserService
Method: getUserDetails
Argument: 0 (first parameter)
```

## Management Zones

### Create Management Zone

**Via UI:**
1. Settings > Preferences > Management zones
2. Create new zone with rules

**Example rules:**
```
- Host tag equals: environment:production
- Process group tag equals: service:order-service
- Service technology equals: Java
```

**Use cases:**
- Separate environments (dev, staging, prod)
- Team boundaries
- Application boundaries
- Cost allocation

## Custom Metrics

### Send Custom Metrics via API

```bash
curl -X POST \
  "https://{environment-id}.live.dynatrace.com/api/v2/metrics/ingest" \
  -H "Authorization: Api-Token {API_TOKEN}" \
  -H "Content-Type: text/plain" \
  -d "custom.orders.placed,environment=production,region=us-east count,123
      custom.revenue.total,currency=USD gauge,45678.90"
```

**Metrics format:**

```
metric.key,dimension1=value1,dimension2=value2 metric.type,metric.value timestamp
```

**Node.js client:**

```javascript
const axios = require('axios');

async function sendMetric(metricKey, value, dimensions = {}) {
  const dimensionStr = Object.entries(dimensions)
    .map(([k, v]) => `${k}=${v}`)
    .join(',');
    
  const payload = `${metricKey},${dimensionStr} gauge,${value}`;
  
  await axios.post(
    `https://{environment-id}.live.dynatrace.com/api/v2/metrics/ingest`,
    payload,
    {
      headers: {
        'Authorization': `Api-Token {API_TOKEN}`,
        'Content-Type': 'text/plain'
      }
    }
  );
}

// Usage
await sendMetric('custom.queue.size', 150, { 
  queue: 'orders', 
  environment: 'production' 
});
```

## Dashboards

### Create Dashboard

**Via UI:**
1. Navigate to Dashboards
2. Create new dashboard
3. Add tiles (charts, metrics)

**Dashboard as Code (JSON):**

```json
{
  "dashboardMetadata": {
    "name": "Application Performance",
    "shared": true,
    "owner": "admin",
    "tags": ["production"]
  },
  "tiles": [
    {
      "name": "Response Time",
      "tileType": "DATA_EXPLORER",
      "configured": true,
      "bounds": {
        "top": 0,
        "left": 0,
        "width": 304,
        "height": 152
      },
      "tileFilter": {},
      "customName": "Response time",
      "queries": [
        {
          "id": "A",
          "metric": "builtin:service.response.time",
          "spaceAggregation": "AVG",
          "timeAggregation": "DEFAULT",
          "splitBy": ["dt.entity.service"]
        }
      ],
      "visualConfig": {
        "type": "GRAPH_CHART",
        "global": {
          "theme": "DEFAULT"
        }
      }
    }
  ]
}
```

**Upload dashboard:**

```bash
curl -X POST \
  "https://{environment-id}.live.dynatrace.com/api/config/v1/dashboards" \
  -H "Authorization: Api-Token {API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @dashboard.json
```

## Alerting and Problem Detection

### Davis AI Problem Detection

**Automatic detection:**
- Response time degradation
- Error rate increases
- Resource saturation
- Anomaly detection
- Impact analysis

**Configure sensitivity:**
1. Settings > Anomaly detection
2. Adjust sensitivity (low, medium, high)
3. Set custom thresholds

### Custom Alerting

**Metric events:**

```bash
curl -X POST \
  "https://{environment-id}.live.dynatrace.com/api/config/v1/anomalyDetection/metricEvents" \
  -H "Authorization: Api-Token {API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "name": "High CPU Usage",
    "description": "CPU usage above 80%",
    "metricId": "builtin:host.cpu.usage",
    "monitoringStrategy": {
      "type": "STATIC_THRESHOLD",
      "threshold": 80,
      "alertCondition": "ABOVE",
      "samples": 5,
      "violatingSamples": 3,
      "dealertingSamples": 5
    },
    "alertingScope": [
      {
        "filterType": "HOST_GROUP",
        "hostGroupId": "{HOST_GROUP_ID}"
      }
    ]
  }'
```

### Notification Integrations

**Webhook:**

```bash
curl -X POST \
  "https://{environment-id}.live.dynatrace.com/api/config/v1/notifications" \
  -H "Authorization: Api-Token {API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "WEBHOOK",
    "name": "Slack Notifications",
    "active": true,
    "url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
    "headers": [
      {
        "name": "Content-Type",
        "value": "application/json"
      }
    ],
    "payload": "{\"text\": \"{ProblemTitle}\"}"
  }'
```

**PagerDuty, ServiceNow, Jira, etc.** - Built-in integrations available

## Synthetic Monitoring

### Browser Monitor

**Via UI:**
1. Synthetic > Create synthetic monitor
2. Select "Browser monitor"
3. Record or script

**Scripted monitor:**

```javascript
api.url("https://www.example.com")
   .click(".login-button")
   .type("#username", "testuser")
   .type("#password", "password123")
   .click("button[type='submit']")
   .waitForNavigation()
   .expect.title().toEqual("Dashboard");
```

**HTTP Monitor:**

```bash
curl -X POST \
  "https://{environment-id}.live.dynatrace.com/api/v1/synthetic/monitors" \
  -H "Authorization: Api-Token {API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "HTTP",
    "name": "API Health Check",
    "frequencyMin": 5,
    "enabled": true,
    "locations": ["GEOLOCATION-XXXXXXXXX"],
    "script": {
      "requests": [
        {
          "description": "Check API health",
          "url": "https://api.example.com/health",
          "method": "GET",
          "validation": {
            "rules": [
              {
                "type": "httpStatusesList",
                "passIfFound": true,
                "value": "200"
              }
            ]
          }
        }
      ]
    }
  }'
```

## Service Level Objectives (SLOs)

### Create SLO

```bash
curl -X POST \
  "https://{environment-id}.live.dynatrace.com/api/v2/slo" \
  -H "Authorization: Api-Token {API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Availability",
    "description": "99.9% of requests should succeed",
    "enabled": true,
    "metricExpression": "(100)*(builtin:service.errors.server.successCount:splitBy())/(builtin:service.requestCount.server:splitBy())",
    "target": 99.9,
    "warning": 99.95,
    "timeframe": "-1w",
    "filter": "type(SERVICE),tag(production)",
    "evaluationType": "AGGREGATE"
  }'
```

## Best Practices

### OneAgent Deployment

- ✅ Use latest OneAgent version
- ✅ Enable automatic updates
- ✅ Deploy to all hosts/containers
- ✅ Use host groups for organization
- ✅ Tag hosts appropriately
- ✅ Monitor OneAgent health
- ✅ Test in non-prod first

### Monitoring Strategy

- ✅ Leverage Davis AI for problems
- ✅ Create management zones per team/app
- ✅ Use request attributes for business context
- ✅ Set up SLOs for critical services
- ✅ Configure custom alerting for edge cases
- ✅ Regular dashboard reviews
- ✅ Track trends over time

### Performance

- ✅ OneAgent overhead typically <1% CPU
- ✅ Adjust capture rules if needed
- ✅ Use data retention policies
- ✅ Archive old sessions
- ✅ Monitor environment consumption
- ✅ Optimize synthetic monitors frequency

### Integration

- ✅ Integrate with CI/CD pipelines
- ✅ Use deployment markers
- ✅ Connect to ITSM tools
- ✅ Implement auto-remediation via API
- ✅ Export data to data lakes
- ✅ Use Dynatrace extensions for custom tech

## Dynatrace API

### Common Operations

**Get problems:**

```bash
curl -X GET \
  "https://{environment-id}.live.dynatrace.com/api/v2/problems?from=now-2h&to=now" \
  -H "Authorization: Api-Token {API_TOKEN}"
```

**Get entities:**

```bash
curl -X GET \
  "https://{environment-id}.live.dynatrace.com/api/v2/entities?entitySelector=type(SERVICE)" \
  -H "Authorization: Api-Token {API_TOKEN}"
```

**Send deployment event:**

```bash
curl -X POST \
  "https://{environment-id}.live.dynatrace.com/api/v1/events" \
  -H "Authorization: Api-Token {API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "CUSTOM_DEPLOYMENT",
    "source": "Jenkins",
    "deploymentName": "Release 1.2.3",
    "deploymentVersion": "1.2.3",
    "deploymentProject": "MyApp",
    "attachRules": {
      "tagRule": [
        {
          "meTypes": ["SERVICE"],
          "tags": [
            {
              "context": "ENVIRONMENT",
              "key": "application",
              "value": "myapp"
            }
          ]
        }
      ]
    }
  }'
```

## Real-World Use Cases

### E-Commerce Platform

**Automatic discovery of:**
- Frontend services (React, Angular)
- Backend APIs (Node.js, Java)
- Databases (PostgreSQL, MongoDB)
- Third-party services (payment gateways)
- User sessions and conversion rates

**Davis AI detected:**
- Payment gateway latency increase
- Impact: 15% of checkout flows
- Root cause: Database query slow down
- Recommended action: Optimize query

### Microservices Troubleshooting

**Problem scenario:**
- Alert: Order service response time up 300%
- Davis AI analysis:
  - Root cause: Inventory service database connection pool exhausted
  - Contributing factors: Traffic spike from marketing campaign
  - Impact: 25% of users affected
  - Timeline: Started 15 minutes ago

**Resolution:**
- Increase connection pool size
- Scale inventory service
- Problem auto-closed when metrics normalized

## Terraform Integration

```hcl
terraform {
  required_providers {
    dynatrace = {
      source  = "dynatrace-oss/dynatrace"
      version = "~> 1.0"
    }
  }
}

provider "dynatrace" {
  dt_env_url   = "https://{environment-id}.live.dynatrace.com"
  dt_api_token = var.dynatrace_api_token
}

# Management Zone
resource "dynatrace_management_zone_v2" "production" {
  name = "Production Environment"
  rules {
    rule {
      type               = "ME"
      enabled            = true
      propagation_types  = ["SERVICE_TO_HOST_LIKE", "SERVICE_TO_PROCESS_GROUP_LIKE"]
      conditions {
        condition {
          key {
            attribute = "HOST_GROUP_NAME"
          }
          string {
            operator = "EQUALS"
            value    = "production"
          }
        }
      }
    }
  }
}

# Custom Metric Event
resource "dynatrace_metric_events" "high_cpu" {
  name        = "High CPU Usage"
  enabled     = true
  description = "Alerts when CPU usage exceeds 80%"
  
  query_definition {
    metric_selector = "builtin:host.cpu.usage:splitBy()"
    type            = "STATIC_THRESHOLD"
    threshold       = 80
    alert_condition = "ABOVE"
    samples         = 5
    violating_samples = 3
  }
}
```

## Troubleshooting

### OneAgent Not Reporting

```bash
# Check OneAgent status
sudo systemctl status oneagent

# View logs
sudo journalctl -u oneagent -f

# Check connectivity
curl -I https://{environment-id}.live.dynatrace.com

# Verify host in UI
# Settings > Deployment status > OneAgent
```

### Missing Service Detection

- Verify OneAgent installed on host
- Check supported technologies
- Restart application after OneAgent install
- Review deep monitoring settings
- Check firewall/network rules

### High Data Consumption

- Review capture settings
- Adjust session replay settings
- Configure data retention
- Optimize synthetic monitor frequency
- Use exclusion rules

## References

- **Documentation**: https://www.dynatrace.com/support/help/
- **Dynatrace University**: https://university.dynatrace.com/
- **API Documentation**: https://www.dynatrace.com/support/help/dynatrace-api/
- **Community**: https://community.dynatrace.com/
- **GitHub**: https://github.com/Dynatrace
- **Blog**: https://www.dynatrace.com/news/blog/

---

## See Also

- [New Relic APM](../New-Relic/New-Relic.md)
- [Datadog Monitoring](../Datadog/Datadog.md)
- [AppDynamics APM](../AppDynamics/AppDynamics.md)
- [OpenTelemetry](../../Tracing/OpenTelemetry/OpenTelemetry.md)
