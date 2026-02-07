# Prometheus

## Introduction

Prometheus is an open-source systems monitoring and alerting toolkit originally built at SoundCloud. Since its inception in 2012, it has become the de facto standard for cloud-native monitoring, particularly in Kubernetes environments. Prometheus uses a pull-based model to collect metrics and provides a powerful query language (PromQL) for analyzing time-series data.

## Why Prometheus?

- **Pull-Based Architecture**: Scrapes metrics from instrumented jobs via HTTP
- **Multi-Dimensional Data Model**: Time-series identified by metric name and key/value pairs (labels)
- **Powerful Query Language**: PromQL enables flexible aggregations and analytics
- **No External Dependencies**: Single binary, no distributed storage dependency
- **Service Discovery**: Automatic target discovery for Kubernetes, Consul, EC2, etc.
- **Rich Ecosystem**: Extensive exporter library (node, database, application exporters)
- **Native Kubernetes Integration**: First-class citizen in cloud-native ecosystem
- **Alert Management**: Integrated with Alertmanager for sophisticated alerting
- **Grafana Integration**: De facto visualization platform for Prometheus data
- **CNCF Graduated Project**: Production-ready, enterprise-grade, community-backed

## Prometheus vs Alternatives

| Feature | Prometheus | InfluxDB | Graphite | Datadog | VictoriaMetrics |
|---------|------------|----------|----------|---------|-----------------|
| Architecture | Pull | Push | Push | Agent (push) | Pull/Push |
| Query Language | PromQL | Flux/InfluxQL | Functions | Custom | PromQL |
| Storage | Local TSDB | TSM Engine | Whisper | Proprietary | Custom |
| Scalability | Federation | Clustering | Limited | Cloud-scale | High |
| Service Discovery | Native | Manual | Manual | Agent-based | Native |
| Alerting | Built-in | Kapacitor | External | Built-in | Built-in |
| Cost | Free | Free/Paid | Free | Paid | Free |
| Kubernetes | Excellent | Good | Poor | Good | Excellent |
| Learning Curve | Medium | Medium | Low | Low | Medium |
| Cardinality | Medium | High | Low | High | Very High |

## When to Use Prometheus

✅ **Use Prometheus when:**
- Monitoring Kubernetes or containerized environments
- Need multi-dimensional metrics with labels
- Building cloud-native infrastructure
- Require service discovery for dynamic environments
- Want open-source with no vendor lock-in
- Need powerful query capabilities (PromQL)
- Short-term metrics storage (<1 year)
- Microservices architecture
- Integration with Grafana for visualization

❌ **Consider alternatives when:**
- Need distributed/clustered storage out of the box (use Thanos, Cortex, or VictoriaMetrics)
- Push-based metrics collection required (use InfluxDB)
- Long-term storage without additional components (>1 year)
- Managed SaaS solution preferred (use Datadog, New Relic)
- Need APM/distributed tracing (combine with Jaeger/Tempo)

## Key Concepts

### Data Model

**Metric**: Time-series identified by metric name and labels
```
<metric_name>{<label_name>=<label_value>, ...}
```

**Example:**
```promql
http_requests_total{method="POST", handler="/api/users", status="200"}
```

### Metric Types

1. **Counter**: Cumulative metric that only increases (or resets to zero)
   - Use case: Total requests, errors, completed tasks
   - Example: `http_requests_total`, `errors_total`

2. **Gauge**: Metric that can go up and down
   - Use case: Memory usage, temperature, queue size
   - Example: `memory_usage_bytes`, `active_connections`

3. **Histogram**: Samples observations and counts them in configurable buckets
   - Use case: Request durations, response sizes
   - Example: `http_request_duration_seconds`
   - Exports: `_bucket`, `_sum`, `_count`

4. **Summary**: Similar to histogram but calculates quantiles
   - Use case: Request latencies
   - Example: `http_request_duration_seconds{quantile="0.95"}`
   - Exports: quantiles, `_sum`, `_count`

### Jobs and Instances

- **Job**: Collection of instances with the same purpose (e.g., API servers)
- **Instance**: Individual target endpoint (e.g., single server)
- **Target**: Scrape endpoint URL

### Labels

Key-value pairs that enable multi-dimensional queries:
```promql
http_requests_total{
  job="api-server",
  instance="10.0.0.1:8080",
  method="GET",
  status="200",
  environment="production"
}
```

**Best practices:**
- Keep cardinality reasonable (<10-100 values per label)
- Avoid high-cardinality labels (user IDs, timestamps, random strings)
- Use consistent label names across metrics

## Architecture

### Components

1. **Prometheus Server**: Scrapes and stores time-series data
2. **Exporters**: Expose metrics from systems/applications
3. **Pushgateway**: Accepts metrics pushed by short-lived jobs
4. **Alertmanager**: Handles alerts (deduplication, grouping, routing)
5. **Service Discovery**: Discovers scrape targets dynamically

### Data Flow

```
[ Application ] --expose--> [ /metrics endpoint ]
                                    ↑
                                    | scrape (pull)
                                    |
                            [ Prometheus Server ]
                                    |
                                    ├──> [ Local Storage (TSDB) ]
                                    ├──> [ Alertmanager ] --notify--> [ Slack/Email/PagerDuty ]
                                    └──> [ Grafana ] (visualization)
```

## User Guide

## Installation

### Docker

```bash
# Quick start
docker run -d -p 9090:9090 \
  --name prometheus \
  -v $PWD/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus:latest

# With persistent storage
docker run -d -p 9090:9090 \
  --name prometheus \
  -v $PWD/prometheus.yml:/etc/prometheus/prometheus.yml \
  -v prometheus-data:/prometheus \
  prom/prometheus:latest \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/prometheus \
  --storage.tsdb.retention.time=15d
```

### Docker Compose (with Exporters)

**docker-compose.yml:**
```yaml
version: '3'
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - ./alerts.yml:/etc/prometheus/alerts.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=15d'
      - '--web.enable-lifecycle'

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro

  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml

volumes:
  prometheus-data:
```

### Linux Installation

**Ubuntu/Debian:**
```bash
# Download
wget https://github.com/prometheus/prometheus/releases/download/v2.45.0/prometheus-2.45.0.linux-amd64.tar.gz
tar xvfz prometheus-2.45.0.linux-amd64.tar.gz
cd prometheus-2.45.0.linux-amd64

# Create user
sudo groupadd --system prometheus
sudo useradd -s /sbin/nologin --system -g prometheus prometheus

# Create directories
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus

# Copy files
sudo cp prometheus promtool /usr/local/bin/
sudo cp -r consoles console_libraries /etc/prometheus/
sudo cp prometheus.yml /etc/prometheus/

# Set ownership
sudo chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus
sudo chown prometheus:prometheus /usr/local/bin/prometheus /usr/local/bin/promtool
```

**Systemd Service:**
```ini
# /etc/systemd/system/prometheus.service
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/var/lib/prometheus/ \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries \
  --storage.tsdb.retention.time=15d \
  --web.enable-lifecycle

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
```

### Kubernetes (Helm)

```bash
# Add Prometheus community Helm repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install kube-prometheus-stack (Prometheus + Grafana + Exporters + Alertmanager)
helm install kube-prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set prometheus.prometheusSpec.retention=30d \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=50Gi

# Access Prometheus UI
kubectl port-forward -n monitoring svc/kube-prometheus-kube-prome-prometheus 9090:9090

# Access Grafana
kubectl port-forward -n monitoring svc/kube-prometheus-grafana 3000:80
```

**Get Grafana admin password:**
```bash
kubectl get secret -n monitoring kube-prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --decode
```

## Configuration

### Minimal prometheus.yml

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']
```

### Comprehensive prometheus.yml

```yaml
global:
  scrape_interval: 15s
  scrape_timeout: 10s
  evaluation_interval: 15s
  external_labels:
    cluster: 'prod-cluster'
    region: 'us-east-1'

# Alerting configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - 'alertmanager:9093'

# Load alert rules
rule_files:
  - '/etc/prometheus/alerts.yml'
  - '/etc/prometheus/recording_rules.yml'

# Scrape configurations
scrape_configs:
  # Prometheus itself
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node Exporter (system metrics)
  - job_name: 'node-exporter'
    static_configs:
      - targets:
          - 'node1:9100'
          - 'node2:9100'
        labels:
          environment: 'production'
          datacenter: 'dc1'

  # Application metrics
  - job_name: 'api-server'
    static_configs:
      - targets: ['api1:8080', 'api2:8080']
        labels:
          service: 'api'
          environment: 'production'

  # Kubernetes service discovery
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
        target_label: __address__
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)
      - source_labels: [__meta_kubernetes_namespace]
        target_label: kubernetes_namespace
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: kubernetes_pod_name

  # Blackbox exporter (endpoint probes)
  - job_name: 'blackbox'
    metrics_path: /probe
    params:
      module: [http_2xx]
    static_configs:
      - targets:
          - https://example.com
          - https://api.example.com/health
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: blackbox-exporter:9115
```

## Instrumenting Applications

### Python (Flask)

```bash
pip install prometheus-client flask
```

```python
from flask import Flask, Response
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CollectorRegistry
import time

app = Flask(__name__)

# Metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint', 'status'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration', ['method', 'endpoint'])
ACTIVE_CONNECTIONS = Gauge('active_connections', 'Number of active connections')
APP_INFO = Gauge('app_info', 'Application info', ['version', 'environment'])

# Set app info
APP_INFO.labels(version='1.2.3', environment='production').set(1)

@app.before_request
def before_request():
    ACTIVE_CONNECTIONS.inc()
    request.start_time = time.time()

@app.after_request
def after_request(response):
    ACTIVE_CONNECTIONS.dec()
    
    duration = time.time() - request.start_time
    REQUEST_DURATION.labels(
        method=request.method,
        endpoint=request.endpoint or 'unknown'
    ).observe(duration)
    
    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=request.endpoint or 'unknown',
        status=response.status_code
    ).inc()
    
    return response

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/metrics')
def metrics():
    return Response(generate_latest(), mimetype='text/plain')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
```

### Go

```go
package main

import (
    "net/http"
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promauto"
    "github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
    httpRequestsTotal = promauto.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total",
            Help: "Total HTTP requests",
        },
        []string{"method", "endpoint", "status"},
    )
    
    httpRequestDuration = promauto.NewHistogramVec(
        prometheus.HistogramOpts{
            Name:    "http_request_duration_seconds",
            Help:    "HTTP request duration",
            Buckets: prometheus.DefBuckets,
        },
        []string{"method", "endpoint"},
    )
)

func handler(w http.ResponseWriter, r *http.Request) {
    timer := prometheus.NewTimer(httpRequestDuration.WithLabelValues(r.Method, r.URL.Path))
    defer timer.ObserveDuration()
    
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Hello, World!"))
    
    httpRequestsTotal.WithLabelValues(r.Method, r.URL.Path, "200").Inc()
}

func main() {
    http.HandleFunc("/", handler)
    http.Handle("/metrics", promhttp.Handler())
    http.ListenAndServe(":8080", nil)
}
```

### Java (Spring Boot)

**pom.xml:**
```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**application.properties:**
```properties
management.endpoints.web.exposure.include=prometheus,health,info
management.metrics.export.prometheus.enabled=true
```

**Custom metrics:**
```java
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

@Service
public class MetricsService {
    private final Counter orderCounter;
    
    public MetricsService(MeterRegistry registry) {
        this.orderCounter = Counter.builder("orders_total")
            .description("Total orders")
            .tag("type", "purchase")
            .register(registry);
    }
    
    public void recordOrder() {
        orderCounter.increment();
    }
}
```

### Node.js (Express)

```bash
npm install prom-client express
```

```javascript
const express = require('express');
const client = require('prom-client');

const app = express();

// Metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'route', 'status'],
    registers: [register]
});

const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration',
    labelNames: ['method', 'route'],
    registers: [register]
});

// Middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        httpRequestDuration.labels(req.method, req.route?.path || req.path).observe(duration);
        httpRequestsTotal.labels(req.method, req.route?.path || req.path, res.statusCode).inc();
    });
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.listen(8080, () => console.log('Server running on port 8080'));
```

## PromQL (Prometheus Query Language)

### Basic Queries

```promql
# Instant vector (single value per time series at query time)
http_requests_total

# Filter by labels
http_requests_total{job="api-server", method="GET"}

# Regex matching
http_requests_total{status=~"5.."}  # 5xx errors
http_requests_total{endpoint!~"/health|/metrics"}  # exclude endpoints

# Range vector (values over time range)
http_requests_total[5m]  # last 5 minutes
```

### Aggregation Operators

```promql
# Sum across all dimensions
sum(http_requests_total)

# Sum by specific labels
sum by (job, instance) (http_requests_total)

# Average
avg(cpu_usage_percent)

# Min/Max
max(memory_usage_bytes)
min(disk_free_bytes)

# Count
count(up == 1)  # count of healthy targets

# Quantile
quantile(0.95, http_request_duration_seconds)
```

### Rate and Increase

```promql
# Rate (per-second average)
rate(http_requests_total[5m])

# Increase (total increase over time range)
increase(http_requests_total[1h])

# irate (instant rate, more sensitive to spikes)
irate(http_requests_total[5m])
```

### Mathematical Operations

```promql
# Error rate percentage
rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) * 100

# Available memory percentage
(node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100

# Request rate per instance
sum by (instance) (rate(http_requests_total[5m]))
```

### Histogram Quantiles

```promql
# P95 latency
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))

# P99 latency by endpoint
histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, endpoint))
```

### Useful Functions

```promql
# Predict linear increase
predict_linear(disk_usage_bytes[1h], 3600)  # predict in 1 hour

# Absolute value
abs(delta(temperature[5m]))

# Round
round(cpu_usage_percent, 0.1)

# Sort
topk(5, rate(http_requests_total[5m]))  # top 5 by request rate
bottomk(3, disk_free_bytes)  # bottom 3 by free space

# Time-based
hour()  # current hour (0-23)
day_of_week()  # day of week (0=Sunday, 6=Saturday)
```

## Alerting

### Alert Rules

**alerts.yml:**
```yaml
groups:
  - name: example-alerts
    interval: 30s
    rules:
      # High error rate
      - alert: HighErrorRate
        expr: |
          (
            sum by (job) (rate(http_requests_total{status=~"5.."}[5m]))
            /
            sum by (job) (rate(http_requests_total[5m]))
          ) * 100 > 5
        for: 5m
        labels:
          severity: warning
          team: backend
        annotations:
          summary: "High error rate on {{ $labels.job }}"
          description: "Error rate is {{ $value | humanizePercentage }} on job {{ $labels.job }}"

      # Instance down
      - alert: InstanceDown
        expr: up == 0
        for: 2m
        labels:
          severity: critical
          team: platform
        annotations:
          summary: "Instance {{ $labels.instance }} down"
          description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 2 minutes"

      # High CPU usage
      - alert: HighCPUUsage
        expr: 100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
          description: "CPU usage is {{ $value | humanize }}% on {{ $labels.instance }}"

      # Low disk space
      - alert: LowDiskSpace
        expr: |
          (
            (node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"})
            * 100
          ) < 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Low disk space on {{ $labels.instance }}"
          description: "Only {{ $value | humanize }}% disk space remaining on {{ $labels.instance }}"

      # High memory usage
      - alert: HighMemoryUsage
        expr: |
          (
            (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes)
            / node_memory_MemTotal_bytes
          ) * 100 > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage on {{ $labels.instance }}"
          description: "Memory usage is {{ $value | humanize }}% on {{ $labels.instance }}"
```

### Alertmanager Configuration

**alertmanager.yml:**
```yaml
global:
  resolve_timeout: 5m
  slack_api_url: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL'

route:
  receiver: 'default'
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  
  routes:
    # Critical alerts to PagerDuty
    - match:
        severity: critical
      receiver: pagerduty
      continue: true

    # Warning alerts to Slack
    - match:
        severity: warning
      receiver: slack-warnings

    # Team-specific routing
    - match:
        team: backend
      receiver: backend-team-slack

receivers:
  - name: 'default'
    slack_configs:
      - channel: '#alerts'
        title: '{{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'

  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: 'YOUR_PAGERDUTY_SERVICE_KEY'
        description: '{{ .GroupLabels.alertname }}'

  - name: 'slack-warnings'
    slack_configs:
      - channel: '#warnings'
        title: '[WARN] {{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'

  - name: 'backend-team-slack'
    slack_configs:
      - channel: '#backend-alerts'

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'instance']
```

## Recording Rules

Pre-compute expensive queries:

**recording_rules.yml:**
```yaml
groups:
  - name: performance_rules
    interval: 30s
    rules:
      # Precompute request rate
      - record: job:http_requests:rate5m
        expr: sum by (job) (rate(http_requests_total[5m]))

      # Precompute error rate
      - record: job:http_errors:rate5m
        expr: sum by (job) (rate(http_requests_total{status=~"5.."}[5m]))

      # Precompute error percentage
      - record: job:http_errors:percentage
        expr: |
          (
            job:http_errors:rate5m
            / job:http_requests:rate5m
          ) * 100

      # Precompute P95 latency
      - record: job:http_request_duration:p95
        expr: |
          histogram_quantile(0.95,
            sum by (job, le) (rate(http_request_duration_seconds_bucket[5m]))
          )

      # CPU usage by instance
      - record: instance:cpu_usage:percent
        expr: |
          100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

**Usage:**
```promql
# Use recording rule instead of complex query
job:http_errors:percentage

# Much faster than computing on the fly
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```

## Exporters

### Node Exporter (System Metrics)

```bash
# Docker
docker run -d \
  --name node-exporter \
  -p 9100:9100 \
  -v "/proc:/host/proc:ro" \
  -v "/sys:/host/sys:ro" \
  -v "/:/rootfs:ro" \
  prom/node-exporter:latest \
  --path.procfs=/host/proc \
  --path.sysfs=/host/sys \
  --collector.filesystem.mount-points-exclude="^/(sys|proc|dev|host|etc)($$|/)"
```

**Key metrics:**
- CPU: `node_cpu_seconds_total`
- Memory: `node_memory_*`
- Disk: `node_filesystem_*`, `node_disk_*`
- Network: `node_network_*`
- Load: `node_load1`, `node_load5`, `node_load15`

### Blackbox Exporter (Endpoint Probing)

```yaml
# blackbox.yml
modules:
  http_2xx:
    prober: http
    timeout: 5s
    http:
      valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]
      valid_status_codes: [200]
      method: GET
      fail_if_not_ssl: true

  tcp_connect:
    prober: tcp
    timeout: 5s

  icmp:
    prober: icmp
    timeout: 5s
```

```bash
docker run -d \
  --name blackbox-exporter \
  -p 9115:9115 \
  -v /path/to/blackbox.yml:/etc/blackbox_exporter/config.yml \
  prom/blackbox-exporter:latest
```

### Popular Exporters

- **MySQL**: `mysqld_exporter`
- **PostgreSQL**: `postgres_exporter`
- **Redis**: `redis_exporter`
- **MongoDB**: `mongodb_exporter`
- **Elasticsearch**: `elasticsearch_exporter`
- **NGINX**: `nginx-prometheus-exporter`
- **HAProxy**: `haproxy_exporter`
- **Docker**: `cAdvisor`
- **Kubernetes**: `kube-state-metrics`

## Real-World Use Cases

### 1. Kubernetes Cluster Monitoring

**Prometheus scrape config for Kubernetes:**
```yaml
scrape_configs:
  # API server metrics
  - job_name: 'kubernetes-apiservers'
    kubernetes_sd_configs:
      - role: endpoints
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

  # Kubelet metrics
  - job_name: 'kubernetes-nodes'
    kubernetes_sd_configs:
      - role: node

  # Container metrics
  - job_name: 'kubernetes-cadvisor'
    kubernetes_sd_configs:
      - role: node
    metrics_path: /metrics/cadvisor

  # Service endpoints
  - job_name: 'kubernetes-service-endpoints'
    kubernetes_sd_configs:
      - role: endpoints

  # Pod metrics
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
```

**Key queries:**
```promql
# Pod CPU usage
sum(rate(container_cpu_usage_seconds_total{namespace="production"}[5m])) by (pod)

# Pod memory usage
sum(container_memory_working_set_bytes{namespace="production"}) by (pod)

# Pod restart count
kube_pod_container_status_restarts_total

# Available nodes
count(kube_node_info)
```

### 2. Application SLO Tracking

**SLI/SLO example:**
```promql
# Availability SLI (uptime percentage)
(
  sum(up{job="api-server"})
  / count(up{job="api-server"})
) * 100

# Latency SLI (P95 < 200ms)
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket{job="api"}[5m])) by (le)
) < 0.2

# Error budget (99.9% availability = 43 minutes downtime/month)
# Remaining error budget
(1 - (1 - 0.999)) - (
  sum(rate(http_requests_total{status=~"5.."}[30d]))
  / sum(rate(http_requests_total[30d]))
)
```

### 3. Database Performance Monitoring

**PostgreSQL:**
```promql
# Active connections
pg_stat_database_numbackends

# Transaction rate
rate(pg_stat_database_xact_commit[5m]) + rate(pg_stat_database_xact_rollback[5m])

# Cache hit ratio
sum(pg_stat_database_blks_hit) / (sum(pg_stat_database_blks_hit) + sum(pg_stat_database_blks_read)) * 100

# Slow queries
pg_stat_statements_mean_time_seconds{datname="mydb"} > 1
```

## Production Patterns

### High Availability

**Federation** (hierarchical Prometheus):**
```yaml
# Global Prometheus scrapes regional Prometheus servers
scrape_configs:
  - job_name: 'federate'
    scrape_interval: 15s
    honor_labels: true
    metrics_path: '/federate'
    params:
      'match[]':
        - '{job="api-server"}'
        - '{__name__=~"job:.*"}'
    static_configs:
      - targets:
          - 'prometheus-us-east:9090'
          - 'prometheus-eu-west:9090'
```

**Thanos** (long-term storage & global view):**
- Sidecar: Upload blocks to object storage (S3, GCS)
- Store Gateway: Query historical data from object storage
- Querier: Unified query across multiple Prometheus servers
- Compactor: Downsample and compact blocks

### Remote Storage

**Prometheus → InfluxDB:**
```yaml
remote_write:
  - url: "http://influxdb:8086/api/v1/prom/write?db=prometheus"

remote_read:
  - url: "http://influxdb:8086/api/v1/prom/read?db=prometheus"
```

**Prometheus → Cortex/Thanos:**
```yaml
remote_write:
  - url: "http://cortex:9009/api/v1/push"
```

### Resource Optimization

**Retention policy:**
```bash
--storage.tsdb.retention.time=15d
--storage.tsdb.retention.size=50GB
```

**Reduce cardinality:**
```yaml
# Drop high-cardinality labels
metric_relabel_configs:
  - source_labels: [__name__]
    regex: 'http_request_duration_.*'
    action: drop
  - regex: 'user_id'
    action: labeldrop
```

## Troubleshooting

### High Memory Usage

**Symptoms**: OOMKilled, slow queries

**Solutions**:
- Reduce retention: `--storage.tsdb.retention.time=7d`
- Limit cardinality: Drop unnecessary labels
- Increase resources
- Use recording rules to pre-aggregate
- Enable remote storage

### Slow Queries

**Solutions**:
- Use recording rules
- Limit query time range
- Increase query timeout: `--query.timeout=2m`
- Optimize PromQL (use `rate()` instead of `increase()` for queries)

### Missing Metrics

**Check**:
- Target health: `http://prometheus:9090/targets`
- Scrape errors in logs
- Network connectivity
- Service discovery configuration
- Firewall rules

## Best Practices

1. **Metric Naming**
   - Use `_total` suffix for counters
   - Use base units (seconds, bytes, not milliseconds, MB)
   - Use consistent naming across services

2. **Label Usage**
   - Keep cardinality low (<10-100 values)
   - Avoid high-cardinality labels (user IDs, UUIDs)
   - Use consistent label names

3. **Recording Rules**
   - Pre-compute expensive queries
   - Use hierarchical aggregation
   - Name with `level:metric:operations` format

4. **Alerting**
   - Alert on symptoms, not causes
   - Set appropriate `for` duration
   - Use severity labels (critical, warning, info)
   - Write actionable annotations

5. **Retention**
   - 15-30 days local storage
   - Use remote storage for long-term

6. **Monitoring**
   - Monitor Prometheus itself
   - Set up meta-monitoring (Prometheus monitoring Prometheus)
   - Track scrape duration, sample count, TSDB size

## Resources

- **Official Documentation**: https://prometheus.io/docs/
- **PromQL Guide**: https://prometheus.io/docs/prometheus/latest/querying/basics/
- **Exporters**: https://prometheus.io/docs/instrumenting/exporters/
- **Alerting**: https://prometheus.io/docs/alerting/latest/overview/
- **Best Practices**: https://prometheus.io/docs/practices/naming/
- **Community**: https://prometheus.io/community/
- **CNCF**: https://www.cncf.io/projects/prometheus/

---

*Last Updated: February 2026*
