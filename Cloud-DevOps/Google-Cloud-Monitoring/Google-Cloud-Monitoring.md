# Google Cloud Monitoring (Cloud Operations)

## Introduction

### What is Google Cloud Monitoring?

Google Cloud Monitoring, part of Google Cloud Operations Suite (formerly Stackdriver), is a comprehensive monitoring, logging, and diagnostics platform for applications running on Google Cloud Platform (GCP) and beyond. It provides insights into the performance, availability, and health of cloud-powered applications.

### Why Google Cloud Monitoring?

- Unified monitoring for GCP services
- Cloud Logging for centralized logs
- Cloud Trace for distributed tracing
- Cloud Profiler for performance analysis
- Error Reporting for automatic error detection
- Uptime monitoring
- Custom metrics and alerts
- Integration with open-source tools (Prometheus, OpenTelemetry)
- Multi-cloud and hybrid monitoring
- Machine learning-based insights

## Prerequisites

- Google Cloud Platform account
- Project with billing enabled
- gcloud CLI installed
- Appropriate IAM permissions
- Applications running on GCP

## Core Components

### Cloud Monitoring

Metrics collection, visualization, and alerting.

### Cloud Logging

Centralized log management and analysis.

### Cloud Trace

Distributed tracing for latency analysis.

### Cloud Profiler

Continuous CPU and memory profiling.

### Error Reporting

Automatic error detection and aggregation.

### Cloud Debugger

Production debugging without stopping applications.

## Getting Started

### gcloud CLI Setup

```bash
# Install gcloud CLI
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize and authenticate
gcloud init
gcloud auth login
gcloud auth application-default login

# Set project
gcloud config set project PROJECT_ID
```

## Cloud Monitoring

### Viewing Metrics

```bash
# List metric descriptors
gcloud monitoring metric-descriptors list \
  --filter="metric.type:compute.googleapis.com"

# Read time series data
gcloud monitoring time-series list \
  --filter='metric.type="compute.googleapis.com/instance/cpu/utilization"' \
  --format=json
```

### Custom Metrics

#### Using Python Client Library

```python
from google.cloud import monitoring_v3
import time

client = monitoring_v3.MetricServiceClient()
project_name = f"projects/{PROJECT_ID}"

# Create custom metric descriptor
descriptor = monitoring_v3.MetricDescriptor()
descriptor.type = "custom.googleapis.com/my_metric"
descriptor.metric_kind = monitoring_v3.MetricDescriptor.MetricKind.GAUGE
descriptor.value_type = monitoring_v3.MetricDescriptor.ValueType.DOUBLE
descriptor.description = "My custom metric"

descriptor = client.create_metric_descriptor(
    name=project_name, metric_descriptor=descriptor
)

# Write time series data
series = monitoring_v3.TimeSeries()
series.metric.type = "custom.googleapis.com/my_metric"
series.resource.type = "gce_instance"
series.resource.labels["instance_id"] = "1234567890"
series.resource.labels["zone"] = "us-central1-a"

now = time.time()
seconds = int(now)
nanos = int((now - seconds) * 10 ** 9)
interval = monitoring_v3.TimeInterval(
    {"end_time": {"seconds": seconds, "nanos": nanos}}
)
point = monitoring_v3.Point(
    {"interval": interval, "value": {"double_value": 42.5}}
)
series.points = [point]

client.create_time_series(name=project_name, time_series=[series])
```

#### Using Node.js

```javascript
const monitoring = require('@google-cloud/monitoring');
const client = new monitoring.MetricServiceClient();

async function writeCustomMetric() {
  const projectId = await client.getProjectId();
  const projectName = client.projectPath(projectId);

  // Create time series
  const timeSeriesData = {
    metric: {
      type: 'custom.googleapis.com/my_metric',
      labels: {
        environment: 'production',
      },
    },
    resource: {
      type: 'gce_instance',
      labels: {
        instance_id: '1234567890',
        zone: 'us-central1-a',
      },
    },
    points: [
      {
        interval: {
          endTime: {
            seconds: Date.now() / 1000,
          },
        },
        value: {
          doubleValue: 123.45,
        },
      },
    ],
  };

  const request = {
    name: projectName,
    timeSeries: [timeSeriesData],
  };

  await client.createTimeSeries(request);
  console.log('Metric written successfully');
}

writeCustomMetric();
```

### Dashboards

```bash
# Create dashboard via JSON
cat > dashboard.json << 'EOF'
{
  "displayName": "My Dashboard",
  "gridLayout": {
    "widgets": [
      {
        "title": "CPU Utilization",
        "xyChart": {
          "dataSets": [{
            "timeSeriesQuery": {
              "timeSeriesFilter": {
                "filter": "metric.type=\"compute.googleapis.com/instance/cpu/utilization\"",
                "aggregation": {
                  "alignmentPeriod": "60s",
                  "perSeriesAligner": "ALIGN_MEAN"
                }
              }
            }
          }],
          "timeshiftDuration": "0s",
          "yAxis": {
            "label": "y1Axis",
            "scale": "LINEAR"
          }
        }
      }
    ]
  }
}
EOF

gcloud monitoring dashboards create --config-from-file=dashboard.json
```

## Cloud Logging

### Writing Logs

```python
from google.cloud import logging
import json

# Initialize client
client = logging.Client()
logger = client.logger('my-application')

# Write simple log
logger.log_text('This is a simple log message')

# Write structured log
logger.log_struct({
    'message': 'User logged in',
    'user_id': '12345',
    'ip_address': '192.168.1.1'
}, severity='INFO')

# Write with labels
logger.log_text(
    'Error occurred',
    severity='ERROR',
    labels={'environment': 'production'}
)
```

```javascript
const {Logging} = require('@google-cloud/logging');
const logging = new Logging();
const log = logging.log('my-application');

// Simple log
const metadata = {
  severity: 'INFO',
  resource: {type: 'global'},
};

const entry = log.entry(metadata, 'User logged in');
await log.write(entry);

// Structured log
const structuredEntry = log.entry(metadata, {
  message: 'Order processed',
  orderId: '12345',
  amount: 99.99,
});
await log.write(structuredEntry);
```

### Querying Logs

```bash
# View recent logs
gcloud logging read \
  "resource.type=gce_instance AND severity>=ERROR" \
  --limit 50 \
  --format json

# Query with time range
gcloud logging read \
  "resource.type=gce_instance" \
  --freshness=1h

# Advanced query
gcloud logging read '
  resource.type="k8s_container"
  AND resource.labels.namespace_name="production"
  AND jsonPayload.level="error"
  AND timestamp>="2026-01-18T00:00:00Z"
' --limit 100
```

### Log-based Metrics

```bash
# Create log-based metric
gcloud logging metrics create error_count \
  --description="Count of error messages" \
  --log-filter='severity>=ERROR'

# Create distribution metric
gcloud logging metrics create request_latency \
  --description="Request latency distribution" \
  --log-filter='resource.type="http_load_balancer"' \
  --value-extractor='EXTRACT(jsonPayload.latency)' \
  --metric-kind=DELTA \
  --value-type=DISTRIBUTION
```

## Cloud Trace

### Automatic Tracing (App Engine, Cloud Run, GKE)

Automatic for App Engine, Cloud Run. For GKE:

```yaml
# Enable Cloud Trace in GKE
apiVersion: v1
kind: ConfigMap
metadata:
  name: cloud-trace-config
  namespace: kube-system
data:
  GOOGLE_APPLICATION_CREDENTIALS: /var/secrets/google/key.json
```

### Manual Instrumentation

```python
from google.cloud import trace_v1
from google.cloud.trace_v1 import TraceServiceClient
import time

# Initialize client
client = TraceServiceClient()
project_id = "my-project"

# Create trace
trace_id = "test-trace-" + str(int(time.time()))
span = {
    "span_id": "1",
    "name": "my-span",
    "start_time": {"seconds": int(time.time())},
    "end_time": {"seconds": int(time.time()) + 1},
}

trace = {
    "project_id": project_id,
    "trace_id": trace_id,
    "spans": [span],
}

client.patch_traces(project_id=project_id, traces={"traces": [trace]})
```

### OpenTelemetry Integration

```python
from opentelemetry import trace
from opentelemetry.exporter.cloud_trace import CloudTraceSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Setup tracer
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

# Configure Cloud Trace exporter
cloud_trace_exporter = CloudTraceSpanExporter()
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(cloud_trace_exporter)
)

# Create spans
with tracer.start_as_current_span("my-operation"):
    # Your code here
    with tracer.start_as_current_span("sub-operation"):
        # Nested operation
        pass
```

## Alerts

### Creating Alert Policies

```bash
# Create alert policy
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="High CPU Alert" \
  --condition-display-name="CPU > 80%" \
  --condition-threshold-value=0.8 \
  --condition-threshold-duration=300s \
  --condition-filter='
    resource.type="gce_instance" AND
    metric.type="compute.googleapis.com/instance/cpu/utilization"
  ' \
  --condition-comparison=COMPARISON_GT \
  --condition-aggregation-per-series-aligner=ALIGN_MEAN \
  --condition-aggregation-alignment-period=60s
```

### Using Python API

```python
from google.cloud import monitoring_v3

client = monitoring_v3.AlertPolicyServiceClient()
project_name = f"projects/{PROJECT_ID}"

# Create notification channel
notification_client = monitoring_v3.NotificationChannelServiceClient()
channel = monitoring_v3.NotificationChannel(
    type_="email",
    labels={"email_address": "admin@example.com"},
    display_name="Admin Email",
)
channel = notification_client.create_notification_channel(
    name=project_name, notification_channel=channel
)

# Create alert policy
alert_policy = monitoring_v3.AlertPolicy(
    display_name="High CPU Alert",
    conditions=[
        monitoring_v3.AlertPolicy.Condition(
            display_name="CPU > 80%",
            condition_threshold=monitoring_v3.AlertPolicy.Condition.MetricThreshold(
                filter='resource.type="gce_instance" AND metric.type="compute.googleapis.com/instance/cpu/utilization"',
                aggregations=[
                    monitoring_v3.Aggregation(
                        alignment_period={"seconds": 60},
                        per_series_aligner=monitoring_v3.Aggregation.Aligner.ALIGN_MEAN,
                    )
                ],
                comparison=monitoring_v3.ComparisonType.COMPARISON_GT,
                threshold_value=0.8,
                duration={"seconds": 300},
            ),
        )
    ],
    notification_channels=[channel.name],
    combiner=monitoring_v3.AlertPolicy.ConditionCombinerType.AND,
)

policy = client.create_alert_policy(
    name=project_name, alert_policy=alert_policy
)
```

## Cloud Profiler

### Enabling Profiler

```python
import googlecloudprofiler

# Initialize profiler
googlecloudprofiler.start(
    service='my-service',
    service_version='1.0.0',
    verbose=3,
)

# Your application code runs here
```

```javascript
require('@google-cloud/profiler').start({
  serviceContext: {
    service: 'my-service',
    version: '1.0.0',
  },
});
```

## Error Reporting

### Reporting Errors

```python
from google.cloud import error_reporting

client = error_reporting.Client()

try:
    # Code that might raise an exception
    raise ValueError("Something went wrong")
except Exception as e:
    client.report_exception()
```

```javascript
const {ErrorReporting} = require('@google-cloud/error-reporting');
const errors = new ErrorReporting();

try {
  throw new Error('Something went wrong');
} catch (err) {
  errors.report(err);
}
```

## Uptime Checks

```bash
# Create uptime check
gcloud monitoring uptime create my-check \
  --display-name="Website Uptime" \
  --resource-type=uptime-url \
  --host=example.com \
  --path=/ \
  --check-interval=60s \
  --timeout=10s
```

## Service Monitoring

```python
from google.cloud import monitoring_v3

client = monitoring_v3.ServiceMonitoringServiceClient()
project_id = "my-project"

# Create service
service = monitoring_v3.Service(
    display_name="My Service",
    custom=monitoring_v3.Service.Custom(),
)

created_service = client.create_service(
    parent=f"projects/{project_id}",
    service=service,
)

# Create SLO (Service Level Objective)
slo = monitoring_v3.ServiceLevelObjective(
    display_name="99.9% Availability",
    goal=0.999,
    rolling_period={"seconds": 86400},  # 1 day
    service_level_indicator=monitoring_v3.ServiceLevelIndicator(
        request_based=monitoring_v3.RequestBasedSli(
            good_total_ratio=monitoring_v3.TimeSeriesRatio(
                good_service_filter='metric.type="serviceruntime.googleapis.com/api/request_count" AND metric.label.response_code_class="2xx"',
                total_service_filter='metric.type="serviceruntime.googleapis.com/api/request_count"',
            )
        )
    ),
)

created_slo = client.create_service_level_objective(
    parent=created_service.name,
    service_level_objective=slo,
)
```

## Monitoring Agent (Legacy)

```bash
# Install monitoring agent on Compute Engine
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# Configure agent
sudo vi /etc/google-cloud-ops-agent/config.yaml
```

```yaml
# config.yaml
logging:
  receivers:
    syslog:
      type: files
      include_paths:
        - /var/log/syslog
        - /var/log/messages
  service:
    pipelines:
      default_pipeline:
        receivers: [syslog]

metrics:
  receivers:
    hostmetrics:
      type: hostmetrics
      collection_interval: 60s
  service:
    pipelines:
      default_pipeline:
        receivers: [hostmetrics]
```

## Best Practices

### Logging

- Use structured logging (JSON)
- Include correlation IDs
- Set appropriate severity levels
- Implement log sampling for high-volume logs
- Use log exclusions to reduce costs
- Set retention policies

### Metrics

- Use appropriate metric types (gauge, delta, cumulative)
- Add meaningful labels
- Avoid high-cardinality labels
- Use aggregation to reduce time series
- Monitor quota usage

### Alerting

- Set meaningful alert names and descriptions
- Use multiple evaluation periods
- Implement notification channels redundancy
- Document runbooks in alert descriptions
- Test alerts regularly
- Use log-based alerts for specific conditions

### Cost Optimization

```bash
# Exclude logs from ingestion
gcloud logging sinks create my-exclusion \
  --log-filter='resource.type="gce_instance" AND severity<ERROR' \
  --destination=logging.googleapis.com/projects/PROJECT_ID/exclusions/my-exclusion

# Set log retention
gcloud logging buckets update _Default \
  --location=global \
  --retention-days=30
```

## Terraform Integration

```hcl
# Log-based metric
resource "google_logging_metric" "error_count" {
  name   = "error_count"
  filter = "severity>=ERROR"
  
  metric_descriptor {
    metric_kind = "DELTA"
    value_type  = "INT64"
    unit        = "1"
  }
}

# Alert policy
resource "google_monitoring_alert_policy" "high_cpu" {
  display_name = "High CPU Alert"
  combiner     = "OR"
  
  conditions {
    display_name = "CPU > 80%"
    
    condition_threshold {
      filter          = "resource.type=\"gce_instance\" AND metric.type=\"compute.googleapis.com/instance/cpu/utilization\""
      duration        = "300s"
      comparison      = "COMPARISON_GT"
      threshold_value = 0.8
      
      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_MEAN"
      }
    }
  }
  
  notification_channels = [google_monitoring_notification_channel.email.id]
}

# Notification channel
resource "google_monitoring_notification_channel" "email" {
  display_name = "Admin Email"
  type         = "email"
  
  labels = {
    email_address = "admin@example.com"
  }
}

# Uptime check
resource "google_monitoring_uptime_check_config" "https" {
  display_name = "HTTPS Uptime Check"
  timeout      = "10s"
  period       = "60s"
  
  http_check {
    path         = "/"
    port         = "443"
    use_ssl      = true
    validate_ssl = true
  }
  
  monitored_resource {
    type = "uptime_url"
    labels = {
      project_id = "my-project"
      host       = "example.com"
    }
  }
}
```

## Troubleshooting

### Missing Metrics

```bash
# Verify API is enabled
gcloud services list --enabled | grep monitoring

# Enable if needed
gcloud services enable monitoring.googleapis.com

# Check IAM permissions
gcloud projects get-iam-policy PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.role:roles/monitoring.metricWriter"
```

### Logs Not Appearing

```bash
# Verify Logging API
gcloud services enable logging.googleapis.com

# Check log router
gcloud logging sinks list

# Test log write
gcloud logging write test-log "Test message" --severity=INFO
```

## Resources

- [Cloud Monitoring Documentation](https://cloud.google.com/monitoring/docs)
- [Cloud Logging Documentation](https://cloud.google.com/logging/docs)
- [Cloud Trace Documentation](https://cloud.google.com/trace/docs)
- [Operations Suite Pricing](https://cloud.google.com/stackdriver/pricing)
- [Client Libraries](https://cloud.google.com/monitoring/docs/reference/libraries)

## Next Steps

- Enable monitoring for all GCP resources
- Create custom dashboards
- Set up comprehensive alerting
- Implement distributed tracing
- Configure log-based metrics
- Enable Cloud Profiler
- Set up SLOs and SLIs
- Integrate with incident management
- Optimize logging costs
