# Loki

## Introduction

Loki is a horizontally scalable, highly available, multi-tenant log aggregation system inspired by Prometheus. Unlike other logging systems that index the full text of log lines, Loki indexes only the metadata (labels) about your logs, making it extremely cost-effective and performant. Created by Grafana Labs, Loki is designed to be used alongside Prometheus and Grafana for a complete observability stack.

## Why Loki?

- **Cost-Effective**: Indexes only metadata (labels), not full log content, reducing storage costs by 10x compared to Elasticsearch
- **Prometheus-Like Labels**: Uses the same label-based indexing as Prometheus for consistency
- **Native Grafana Integration**: Built by Grafana Labs, seamlessly integrates with Grafana
- **Multi-Tenancy**: Built-in support for isolating logs by tenant
- **Scalable**: Horizontally scalable architecture with object storage backends (S3, GCS, Azure Blob)
- **Simple to Operate**: Fewer moving parts than ELK stack
- **LogQL**: Powerful query language similar to PromQL
- **Distributed Tracing**: Correlate logs with traces via trace IDs
- **Cloud-Native**: Kubernetes-native design with Helm charts and operators

## Loki vs Alternatives

| Feature | Loki | Elasticsearch | Splunk | CloudWatch Logs | Graylog |
|---------|------|---------------|--------|-----------------|---------|
| Indexing | Labels only | Full-text | Full-text | Limited | Full-text |
| Storage Cost | Very Low | High | Very High | Medium | Medium |
| Query Language | LogQL | Query DSL | SPL | CloudWatch Insights | Graylog Query |
| Grafana Integration | Native | Plugin | Plugin | Plugin | Plugin |
| Scalability | Excellent | Excellent | Excellent | Managed | Good |
| Learning Curve | Medium | High | High | Low | Medium |
| Open Source | Yes | Yes (basic) | No | No | Yes |
| Multi-Tenancy | Built-in | Requires config | Built-in | AWS Accounts | Limited |
| Retention | Object storage | Disk/snapshot | Disk | Configurable | Disk |

## When to Use Loki

✅ **Use Loki when:**
- Already using Prometheus and Grafana
- Cost-effective log storage is a priority
- Need structured logging with labels
- Working with Kubernetes environments
- Want simple, lightweight log aggregation
- Need to correlate logs with metrics and traces
- Multi-tenant SaaS application
- Limited query patterns (tail logs, filter by labels)

❌ **Consider alternatives when:**
- Need full-text search capabilities (Elasticsearch)
- Require complex log analytics and ML (Splunk)
- Need SIEM features (Graylog, Splunk)
- Unstructured logs without labels
- Require real-time alerting on log content (use Loki + Prometheus for alerting)

## Key Concepts

### Architecture Components

1. **Distributor**: Receives log streams and forwards to ingesters
2. **Ingester**: Writes logs to long-term storage and returns log queries
3. **Querier**: Handles LogQL queries
4. **Query Frontend**: Optional component for query parallelization and caching
5. **Compactor**: Compacts index and deletes out-of-retention logs
6. **Ruler**: Evaluates LogQL queries and generates alerts

### Data Model

Loki uses a **label-based** indexing system:

**Stream**: Unique combination of labels
```
{job="api-server", environment="production", level="error"}
```

**Log Entry**: Timestamp + log line
```
2024-02-07T10:30:45Z User login failed: invalid credentials
```

### Labels

Labels are key-value pairs that define a log stream:

**Good labels** (low cardinality):
- `job`, `namespace`, `service`, `environment`, `level`, `host`

**Bad labels** (high cardinality - don't use):
- `user_id`, `request_id`, `trace_id`, `timestamp`, `session_id`

**Best practice**: Keep total unique label combinations under 100k.

### Log Shippers

Components that send logs to Loki:

- **Promtail**: Official Loki log shipper (recommended)
- **Fluentd**: Popular log forwarder with Loki plugin
- **Fluent Bit**: Lightweight version of Fluentd
- **Logstash**: ELK component with Loki output plugin
- **Docker Driver**: Send Docker logs directly to Loki
- **Lambda Promtail**: Ship AWS Lambda logs to Loki

## User Guide

## Installation

### Docker Compose (Loki + Promtail + Grafana)

**docker-compose.yml:**
```yaml
version: '3'

services:
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - loki-data:/loki
      - ./loki-config.yaml:/etc/loki/local-config.yaml
    command: -config.file=/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - ./promtail-config.yaml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml
    depends_on:
      - loki

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana-datasources.yml:/etc/grafana/provisioning/datasources/loki.yml
    depends_on:
      - loki

volumes:
  loki-data:
  grafana-data:
```

**loki-config.yaml:**
```yaml
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb-shipper
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

limits_config:
  retention_period: 744h  # 31 days
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h

chunk_store_config:
  max_look_back_period: 0s

table_manager:
  retention_deletes_enabled: true
  retention_period: 744h

ruler:
  storage:
    type: local
    local:
      directory: /loki/rules
  rule_path: /loki/rules-temp
  alertmanager_url: http://alertmanager:9093
  ring:
    kvstore:
      store: inmemory
  enable_api: true
```

**promtail-config.yaml:**
```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  # System logs
  - job_name: system
    static_configs:
      - targets:
          - localhost
        labels:
          job: varlogs
          __path__: /var/log/*.log

  # Docker containers
  - job_name: docker
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      - source_labels: ['__meta_docker_container_name']
        regex: '/(.*)'
        target_label: 'container'
      - source_labels: ['__meta_docker_container_log_stream']
        target_label: 'stream'
      - source_labels: ['__meta_docker_container_label_com_docker_compose_service']
        target_label: 'service'

  # Kubernetes pods
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_node_name]
        target_label: node_name
      - source_labels: [__meta_kubernetes_namespace]
        target_label: namespace
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: pod
      - source_labels: [__meta_kubernetes_pod_container_name]
        target_label: container
      - replacement: /var/log/pods/*$1/*.log
        separator: /
        source_labels:
          - __meta_kubernetes_pod_uid
          - __meta_kubernetes_pod_container_name
        target_label: __path__
```

**grafana-datasources.yml:**
```yaml
apiVersion: 1

datasources:
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    isDefault: true
    editable: true
    jsonData:
      maxLines: 1000
      derivedFields:
        - datasourceUid: tempo
          matcherRegex: "traceID=(\\w+)"
          name: TraceID
          url: "$${__value.raw}"
```

### Kubernetes (Helm)

```bash
# Add Grafana Helm repository
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Loki Stack (Loki + Promtail + Grafana)
helm install loki grafana/loki-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.enabled=true \
  --set prometheus.enabled=true \
  --set promtail.enabled=true

# Install Loki in distributed mode (production)
helm install loki grafana/loki-distributed \
  --namespace monitoring \
  --set loki.storage.type=s3 \
  --set loki.storage.bucketNames.chunks=loki-chunks \
  --set loki.storage.bucketNames.ruler=loki-ruler \
  --set loki.storage.s3.region=us-east-1

# Port forward Loki
kubectl port-forward -n monitoring svc/loki 3100:3100

# Port forward Grafana
kubectl port-forward -n monitoring svc/loki-grafana 3000:80
```

### S3 Backend Configuration

**loki-config.yaml (with S3):**
```yaml
auth_enabled: false

server:
  http_listen_port: 3100

common:
  path_prefix: /loki
  replication_factor: 3
  storage:
    s3:
      s3: s3://us-east-1/loki-chunks
      endpoint: s3.amazonaws.com
      region: us-east-1
      access_key_id: ${AWS_ACCESS_KEY_ID}
      secret_access_key: ${AWS_SECRET_ACCESS_KEY}

schema_config:
  configs:
    - from: 2020-10-24
      store: aws
      object_store: s3
      schema: v11
      index:
        prefix: loki_index_
        period: 24h

limits_config:
  retention_period: 744h
  ingestion_rate_mb: 10
  ingestion_burst_size_mb: 20
  max_label_name_length: 1024
  max_label_value_length: 2048
  max_label_names_per_series: 30
```

## LogQL Query Language

### Basic Queries

```logql
# All logs from a job
{job="api-server"}

# Multiple label filters
{job="api-server", environment="production"}

# Regex label matching
{job=~"api-server|web-server"}
{environment!~"dev|test"}

# Log line filtering
{job="api-server"} |= "error"
{job="api-server"} != "debug"
{job="api-server"} |~ "error|failed"
{job="api-server"} !~ "info|debug"
```

### Log Pipeline Expressions

```logql
# JSON parsing
{job="app"} | json

# Extract specific JSON fields
{job="app"} | json | level="error", user_id!=""

# Line format (template)
{job="app"} | json | line_format "{{.level}}: {{.message}}"

# Label formatting
{job="app"} | json | label_format level="{{.severity}}"

# Pattern parsing
{job="nginx"} | pattern `<_> - <user> [<_>] "<method> <path> <_>" <status> <_>`

# Regex parsing
{job="app"} | regexp `level=(?P<level>\\w+)`

# Filter after parsing
{job="app"} | json | level="error" | unwrap duration | __error__=""
```

### Aggregations

```logql
# Count logs per second
rate({job="api-server"} [5m])

# Count specific log lines
rate({job="api-server"} |= "error" [5m])

# Sum of log lines
sum(rate({job="api-server"} [5m]))

# Sum by label
sum by (environment) (rate({job="api-server"} [5m]))

# Average
avg_over_time({job="api-server"} | json | unwrap latency [5m])

# Quantiles
quantile_over_time(0.95, {job="api-server"} | json | unwrap duration [5m])

# Count unique values
count_over_time({job="api-server"} | json | unwrap user_id [5m])
```

### Advanced Queries

```logql
# Top 10 error messages
topk(10, sum by (message) (count_over_time({level="error"} [1h])))

# Error rate percentage
sum(rate({job="api"} |= "error" [5m])) / sum(rate({job="api"} [5m])) * 100

# P95 request duration
quantile_over_time(0.95, {job="api"} | json | unwrap duration [5m])

# Logs with high latency
{job="api"} | json | latency > 1000

# Multi-line log parsing
{job="app"} 
  | json 
  | level="error" 
  | line_format "{{.timestamp}} [{{.level}}] {{.message}}"

# Combine with metrics
sum by (status) (
  rate({job="nginx"} | json | __error__="" [5m])
)
```

### Comparison with PromQL

**Count HTTP errors (PromQL):**
```promql
sum(rate(http_requests_total{status=~"5.."}[5m]))
```

**Count HTTP errors (LogQL):**
```logql
sum(rate({job="nginx"} |~ "status=5\\d\\d" [5m]))
```

## Real-World Use Cases

### 1. Application Error Tracking

**Scenario**: Track errors across microservices

**Promtail config:**
```yaml
scrape_configs:
  - job_name: applications
    static_configs:
      - targets:
          - localhost
        labels:
          job: app
          environment: production
          __path__: /var/log/app/*.log
    pipeline_stages:
      - json:
          expressions:
            level: level
            message: message
            trace_id: trace_id
            service: service
      - labels:
          level:
          service:
      - output:
          source: message
```

**Grafana queries:**
```logql
# All errors
{job="app", level="error"}

# Error rate by service
sum by (service) (rate({job="app", level="error"} [5m]))

# Top error messages
topk(10, sum by (message) (count_over_time({level="error"} [1h])))

# Errors with trace IDs
{job="app", level="error"} | json | trace_id!=""
```

### 2. Nginx Access Log Analysis

**Promtail pipeline:**
```yaml
scrape_configs:
  - job_name: nginx
    static_configs:
      - targets:
          - localhost
        labels:
          job: nginx
          __path__: /var/log/nginx/access.log
    pipeline_stages:
      - regex:
          expression: '^(?P<remote_addr>\S+) - (?P<remote_user>\S+) \[(?P<time_local>.*?)\] "(?P<method>\S+) (?P<path>\S+) (?P<protocol>\S+)" (?P<status>\d+) (?P<body_bytes_sent>\d+) "(?P<http_referer>.*?)" "(?P<http_user_agent>.*?)"'
      - labels:
          method:
          status:
      - timestamp:
          source: time_local
          format: '02/Jan/2006:15:04:05 -0700'
```

**Queries:**
```logql
# Request rate by method
sum by (method) (rate({job="nginx"} [5m]))

# 4xx/5xx error rate
sum(rate({job="nginx", status=~"4..|5.."} [5m]))

# Top requested paths
topk(10, sum by (path) (count_over_time({job="nginx"} [1h])))

# Average response size
avg_over_time({job="nginx"} | regexp `(?P<bytes>\d+)` | unwrap bytes [5m])
```

### 3. Kubernetes Pod Logs

**Promtail Kubernetes config:**
```yaml
scrape_configs:
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      # Add namespace label
      - source_labels: [__meta_kubernetes_namespace]
        target_label: namespace
      
      # Add pod name label
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: pod
      
      # Add container name label
      - source_labels: [__meta_kubernetes_pod_container_name]
        target_label: container
      
      # Add app label
      - source_labels: [__meta_kubernetes_pod_label_app]
        target_label: app
      
      # Set log path
      - replacement: /var/log/pods/*$1/*.log
        separator: /
        source_labels:
          - __meta_kubernetes_pod_uid
          - __meta_kubernetes_pod_container_name
        target_label: __path__
    
    pipeline_stages:
      # Parse JSON logs
      - json:
          expressions:
            log: log
            stream: stream
            time: time
      
      # Extract timestamp
      - timestamp:
          source: time
          format: RFC3339Nano
      
      # Output log line
      - output:
          source: log
```

**Queries:**
```logql
# Logs from specific namespace
{namespace="production"}

# Logs from specific pod
{pod="api-server-abc123"}

# Errors in production
{namespace="production"} |= "error"

# Pod restart logs
{namespace="production"} |~ "Container .* has been restarted"

# OOMKilled pods
{namespace="production"} |~ "OOMKilled"
```

### 4. AWS Lambda Logs via CloudWatch

**Lambda Promtail (from S3):**
```yaml
# Use lambda-promtail to ship CloudWatch logs to Loki
# Deploy: https://github.com/grafana/loki/tree/main/tools/lambda-promtail

Environment:
  WRITE_ADDRESS: https://loki.example.com/loki/api/v1/push
  USERNAME: loki
  PASSWORD: ${LOKI_PASSWORD}
  BEARER_TOKEN: ""
  EXTRA_LABELS: "environment:production"
```

**Queries:**
```logql
# All Lambda logs
{job="lambda", function_name=~".+"}

# Cold start logs
{job="lambda"} |~ "INIT_START|START RequestId"

# Function errors
{job="lambda"} |= "ERROR"

# Duration by function
avg_over_time({job="lambda"} | regexp `Duration: (?P<duration>\d+\.\d+) ms` | unwrap duration [5m])
```

### 5. Security & Audit Logs

**Scenario**: Track authentication failures and security events

**Promtail config:**
```yaml
scrape_configs:
  - job_name: auth
    static_configs:
      - targets:
          - localhost
        labels:
          job: auth
          __path__: /var/log/auth.log
    pipeline_stages:
      - regex:
          expression: '^(?P<timestamp>\w+\s+\d+\s+\d+:\d+:\d+) (?P<host>\S+) (?P<app>\S+)\[(?P<pid>\d+)\]: (?P<message>.*)$'
      - labels:
          app:
          host:
```

**Queries:**
```logql
# Failed SSH attempts
{job="auth"} |= "Failed password"

# Successful logins
{job="auth"} |= "Accepted password"

# Failed login attempts by user
topk(10, sum by (user) (count_over_time({job="auth"} |= "Failed password" | regexp `user (?P<user>\S+)` [24h])))

# Sudo commands
{job="auth"} |= "sudo"
```

## Alerting (Loki Ruler)

### Alert Rules

**loki-rules.yaml:**
```yaml
groups:
  - name: app-alerts
    interval: 1m
    rules:
      # High error rate
      - alert: HighErrorRate
        expr: |
          sum by (service) (rate({job="app", level="error"} [5m])) > 1
        for: 5m
        labels:
          severity: warning
          team: backend
        annotations:
          summary: "High error rate in {{ $labels.service }}"
          description: "Service {{ $labels.service }} is logging {{ $value }} errors/sec"

      # Application crash
      - alert: ApplicationCrashed
        expr: |
          count_over_time({job="app"} |= "panic" [5m]) > 0
        labels:
          severity: critical
        annotations:
          summary: "Application panic detected"
          description: "Panic detected in application logs"

      # No logs received
      - alert: NoLogsReceived
        expr: |
          sum(rate({job="app"} [5m])) == 0
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "No logs from {{ $labels.job }}"
          description: "No logs received from job {{ $labels.job }} for 10 minutes"

      # High 5xx errors
      - alert: High5xxErrors
        expr: |
          (
            sum(rate({job="nginx", status=~"5.."} [5m]))
            / sum(rate({job="nginx"} [5m]))
          ) * 100 > 5
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High 5xx error rate"
          description: "5xx error rate is {{ $value }}%"
```

### Recording Rules

```yaml
groups:
  - name: logs-recording-rules
    interval: 1m
    rules:
      # Pre-compute error rate
      - record: job:log_errors:rate5m
        expr: sum by (job) (rate({level="error"} [5m]))

      # Pre-compute request rate from logs
      - record: job:log_requests:rate5m
        expr: sum by (job, method) (rate({job="nginx"} [5m]))
```

## Grafana Integration

### Explore Logs

1. Open Grafana → Explore
2. Select Loki data source
3. Write LogQL query: `{job="api-server"} |= "error"`
4. Click "Run query"
5. Use Log Browser to tail logs in real-time

### Create Log Dashboard

**Panel 1: Log stream**
- Visualization: Logs
- Query: `{namespace="production", app="api"}`

**Panel 2: Log rate**
- Visualization: Time series
- Query: `sum(rate({namespace="production"} [1m]))`

**Panel 3: Error rate**
- Visualization: Stat
- Query: `sum(rate({level="error"} [5m]))`

**Panel 4: Top error messages**
- Visualization: Table
- Query: `topk(10, sum by (message) (count_over_time({level="error"} [1h])))`

### Log to Trace Correlation

**Configure derived fields in Grafana:**
```yaml
datasources:
  - name: Loki
    type: loki
    jsonData:
      derivedFields:
        - datasourceUid: tempo
          matcherRegex: "traceID=(\\w+)"
          name: TraceID
          url: "$${__value.raw}"
```

Click on trace ID in logs → Jump to Tempo trace view

## Performance Optimization

### 1. Label Cardinality

**Problem**: Too many unique label combinations

**Solution**:
- Limit labels to 5-10 per stream
- Avoid user IDs, trace IDs in labels
- Use structured logging and extract values at query time

**Bad:**
```yaml
labels:
  user_id: "12345"  # High cardinality
  request_id: "abc-def-123"  # High cardinality
```

**Good:**
```yaml
labels:
  service: "api"
  environment: "prod"
  level: "error"
```

### 2. Query Optimization

**Slow query:**
```logql
{job="app"} |~ "user_id=12345"  # Scans all logs
```

**Fast query:**
```logql
{job="app", level="error"} |= "user_id=12345"  # Filter by labels first
```

**Best practices:**
- Filter by labels first
- Use `|=` (exact match) instead of `|~` (regex) when possible
- Limit time range
- Use `--limit` flag

### 3. Retention Policies

**Configure retention:**
```yaml
limits_config:
  retention_period: 720h  # 30 days

table_manager:
  retention_deletes_enabled: true
  retention_period: 720h
```

**Per-tenant retention:**
```yaml
limits_config:
  retention_period: 720h
  per_tenant_override_config: /etc/loki/overrides.yaml
```

**overrides.yaml:**
```yaml
overrides:
  tenant1:
    retention_period: 168h  # 7 days
  tenant2:
    retention_period: 2160h  # 90 days
```

## Troubleshooting

### Logs Not Appearing

**Check Promtail:**
```bash
# Check Promtail status
curl http://localhost:9080/ready

# Check targets
curl http://localhost:9080/targets

# Check metrics
curl http://localhost:9080/metrics | grep promtail_
```

**Check Loki:**
```bash
# Check Loki health
curl http://localhost:3100/ready

# Check ingestion
curl http://localhost:3100/metrics | grep loki_ingester

# Query Loki directly
curl -G -s "http://localhost:3100/loki/api/v1/query_range" \
  --data-urlencode 'query={job="app"}' \
  --data-urlencode 'start=1609459200' \
  --data-urlencode 'end=1609545600'
```

### High Memory Usage

**Solutions:**
- Reduce retention period
- Limit label cardinality
- Increase chunk idle period
- Use object storage instead of local disk

### Slow Queries

**Solutions:**
- Add more label filters
- Reduce time range
- Use `--limit` parameter
- Enable query frontend for caching
- Use recording rules for common queries

## Best Practices

1. **Label Selection**
   - Use low-cardinality labels (<100 values)
   - Common labels: `job`, `namespace`, `service`, `level`, `environment`
   - Avoid: `user_id`, `request_id`, `trace_id`, `timestamp`

2. **Structured Logging**
   - Use JSON format for application logs
   - Include consistent fields: `timestamp`, `level`, `message`, `service`
   - Extract fields at query time, not as labels

3. **Promtail Configuration**
   - Use pipeline stages to parse and structure logs
   - Drop unnecessary logs to reduce costs
   - Use relabeling to normalize labels

4. **Query Patterns**
   - Always include at least one label filter
   - Use `|=` for simple string matching
   - Use `|~` only when regex is necessary
   - Limit query time range

5. **Retention**
   - Set appropriate retention based on compliance needs
   - Archive old logs to S3/GCS if needed
   - Use compaction to reduce storage costs

6. **Monitoring**
   - Monitor Loki itself with Prometheus
   - Track ingestion rate, query performance
   - Set up alerts for failed ingestion

## Resources

- **Official Documentation**: https://grafana.com/docs/loki/latest/
- **LogQL Guide**: https://grafana.com/docs/loki/latest/logql/
- **Grafana Labs Blog**: https://grafana.com/blog/
- **Community**: https://community.grafana.com/
- **GitHub**: https://github.com/grafana/loki
- **Examples**: https://github.com/grafana/loki/tree/main/production

## Quick Reference

### LogQL Operators

**Filter expressions:**
- `|=`: Log line contains string
- `!=`: Log line doesn't contain string
- `|~`: Log line matches regex
- `!~`: Log line doesn't match regex

**Parser expressions:**
- `| json`: Parse JSON logs
- `| logfmt`: Parse logfmt logs
- `| regexp`: Parse with regex
- `| pattern`: Parse with pattern expression

**Aggregation functions:**
- `rate()`, `count_over_time()`, `sum()`, `avg()`, `min()`, `max()`
- `quantile_over_time()`, `stddev_over_time()`
- `topk()`, `bottomk()`

---

*Last Updated: February 2026*
