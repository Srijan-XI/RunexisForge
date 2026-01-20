# VictoriaMetrics

## Introduction

VictoriaMetrics is a fast, cost-effective, and scalable monitoring solution and time-series database. It's designed to be a drop-in replacement for Prometheus with better performance and lower resource consumption.

### What is VictoriaMetrics?

VictoriaMetrics is a high-performance, open-source time-series database optimized for monitoring and observability workloads. It can store and query billions of time-series with exceptional speed while using minimal resources.

### Key Features

- **High Performance**: Handles millions of metrics per second on a single node
- **Resource Efficient**: Uses 7x less RAM and disk space compared to Prometheus
- **Prometheus Compatible**: Drop-in replacement with full PromQL support
- **Horizontal Scalability**: Cluster version scales to billions of time series
- **Long-term Storage**: Efficient storage for years of historical data
- **Multi-tenancy**: Built-in support for multiple isolated tenants
- **Downsampling**: Automatic data reduction for long-term storage
- **Query Optimization**: MetricsQL extends PromQL with additional functions

### Use Cases

- **Infrastructure Monitoring**: Monitor servers, containers, and cloud resources
- **Application Performance Monitoring (APM)**: Track application metrics at scale
- **IoT Data Storage**: Store sensor data from millions of devices
- **Business Analytics**: Store and analyze business KPIs
- **Log-based Metrics**: Extract metrics from logs for analysis

### VictoriaMetrics vs Prometheus

| Feature | VictoriaMetrics | Prometheus |
|---------|-----------------|------------|
| **Storage Efficiency** | 7x better compression | Standard |
| **Query Performance** | 2-5x faster | Baseline |
| **RAM Usage** | 7x less | Higher |
| **Multi-tenancy** | Native support | Requires federation |
| **Clustering** | Built-in | Limited |
| **Long-term Storage** | Native | Requires remote storage |

### Architecture Components

**Single-node Version:**
- All-in-one binary for small to medium deployments
- Handles up to millions of active time series

**Cluster Version:**
- **vmstorage**: Storage nodes for data persistence
- **vminsert**: Insert nodes for data ingestion
- **vmselect**: Query nodes for data retrieval
- **vmagent**: Prometheus-compatible scraper

**Additional Components:**
- **vmalert**: Alerting and recording rules
- **vmauth**: Authentication and authorization proxy
- **vmbackup/vmrestore**: Backup and restore tools

---

## Installation & Setup

### Prerequisites

- Operating System: Linux, macOS, or Windows
- Minimum RAM: 512MB (for testing), 4GB+ (for production)
- Disk Space: Depends on retention and data volume
- Network: HTTP/HTTPS access for scraping

### Installation Methods

#### Method 1: Binary Download (Recommended)

**Linux/macOS:**

```bash
# Download latest release
VERSION=$(curl -s https://api.github.com/repos/VictoriaMetrics/VictoriaMetrics/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")')
wget https://github.com/VictoriaMetrics/VictoriaMetrics/releases/download/${VERSION}/victoria-metrics-linux-amd64-${VERSION}.tar.gz

# Extract
tar -xvf victoria-metrics-linux-amd64-${VERSION}.tar.gz

# Make executable
chmod +x victoria-metrics-prod

# Run
./victoria-metrics-prod
```

**Windows:**

```powershell
# Download from GitHub releases
Invoke-WebRequest -Uri "https://github.com/VictoriaMetrics/VictoriaMetrics/releases/latest/download/victoria-metrics-windows-amd64.zip" -OutFile "victoria-metrics.zip"

# Extract
Expand-Archive -Path victoria-metrics.zip -DestinationPath .

# Run
.\victoria-metrics-prod.exe
```

#### Method 2: Docker

```bash
# Pull image
docker pull victoriametrics/victoria-metrics:latest

# Run single-node
docker run -d \
  --name victoriametrics \
  -p 8428:8428 \
  -v victoria-metrics-data:/victoria-metrics-data \
  victoriametrics/victoria-metrics:latest
```

#### Method 3: Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  victoriametrics:
    image: victoriametrics/victoria-metrics:latest
    container_name: victoriametrics
    ports:
      - "8428:8428"
    volumes:
      - vmdata:/victoria-metrics-data
    command:
      - '--storageDataPath=/victoria-metrics-data'
      - '--httpListenAddr=:8428'
      - '--retentionPeriod=12' # 12 months retention
    restart: unless-stopped

  vmagent:
    image: victoriametrics/vmagent:latest
    container_name: vmagent
    ports:
      - "8429:8429"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--promscrape.config=/etc/prometheus/prometheus.yml'
      - '--remoteWrite.url=http://victoriametrics:8428/api/v1/write'
    restart: unless-stopped

volumes:
  vmdata:
```

#### Method 4: Kubernetes (Helm)

```bash
# Add VictoriaMetrics Helm repository
helm repo add vm https://victoriametrics.github.io/helm-charts/
helm repo update

# Install single-node
helm install victoria-metrics vm/victoria-metrics-single \
  --set server.persistentVolume.enabled=true \
  --set server.retentionPeriod=12

# Install cluster version
helm install victoria-metrics vm/victoria-metrics-cluster \
  --set vmselect.replicaCount=2 \
  --set vminsert.replicaCount=2 \
  --set vmstorage.replicaCount=2
```

### Configuration

#### Basic Configuration File

```yaml
# victoriametrics.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'victoriametrics'
    static_configs:
      - targets: ['localhost:8428']

  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']
```

#### Command-line Flags

```bash
./victoria-metrics-prod \
  -storageDataPath=/var/lib/victoria-metrics \
  -retentionPeriod=12 \
  -httpListenAddr=:8428 \
  -memory.allowedPercent=60 \
  -search.maxQueryDuration=30s
```

### Verify Installation

```bash
# Check if VictoriaMetrics is running
curl http://localhost:8428/health

# View metrics
curl http://localhost:8428/metrics

# Check version
curl http://localhost:8428/api/v1/status/buildinfo
```

---

## User Guide

### Basic Operations

#### Data Ingestion

**1. Prometheus Remote Write**

```yaml
# prometheus.yml
remote_write:
  - url: http://localhost:8428/api/v1/write
```

**2. Importing Data**

```bash
# Import Prometheus data
curl -d 'measurement,tag1=value1 field1=123' \
  http://localhost:8428/api/v1/import/prometheus

# Import CSV
curl -d @data.csv http://localhost:8428/api/v1/import/csv
```

**3. Using vmagent**

```bash
# Run vmagent to scrape and forward
./vmagent-prod \
  -promscrape.config=prometheus.yml \
  -remoteWrite.url=http://localhost:8428/api/v1/write
```

#### Querying Data

**PromQL Queries:**

```bash
# Instant query
curl 'http://localhost:8428/api/v1/query?query=up'

# Range query
curl 'http://localhost:8428/api/v1/query_range?query=rate(http_requests_total[5m])&start=2024-01-01T00:00:00Z&end=2024-01-01T23:59:59Z&step=1h'
```

**MetricsQL Extensions:**

```promql
# Rollup functions
rate(metric[5m])
increase(metric[1h])
avg_over_time(metric[10m])

# Aggregate functions
sum(metric) by (label)
topk(10, metric)

# MetricsQL-specific
rollup_rate(metric[5m])
rollup_scrape_interval(metric)
```

#### Web UI

```bash
# Access built-in UI
http://localhost:8428/vmui

# Access Grafana
# Add VictoriaMetrics as Prometheus data source
# URL: http://localhost:8428
```

### Advanced Features

#### Multi-tenancy

```bash
# Write to specific tenant
curl -d 'metric{label="value"} 123' \
  'http://localhost:8428/insert/0/prometheus/api/v1/write'

# Query from specific tenant
curl 'http://localhost:8428/select/0/prometheus/api/v1/query?query=metric'
```

#### Downsampling

```bash
# Configure automatic downsampling
./victoria-metrics-prod \
  -downsampling.period=30d:5m,90d:1h,365d:6h
```

#### Backup and Restore

```bash
# Create backup
vmbackup -storageDataPath=/victoria-metrics-data \
  -snapshot.createURL=http://localhost:8428/snapshot/create \
  -dst=fs:///backup/victoria-metrics

# Restore backup
vmrestore -src=fs:///backup/victoria-metrics \
  -storageDataPath=/victoria-metrics-data
```

#### Alerting with vmalert

```yaml
# alerts.yml
groups:
  - name: example
    interval: 30s
    rules:
      - alert: HighErrorRate
        expr: rate(http_errors_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
```

```bash
# Run vmalert
./vmalert-prod \
  -datasource.url=http://localhost:8428 \
  -notifier.url=http://localhost:9093 \
  -rule=alerts.yml
```

### Performance Optimization

#### Memory Optimization

```bash
# Limit memory usage
./victoria-metrics-prod \
  -memory.allowedPercent=60 \
  -memory.allowedBytes=4GB
```

#### Query Optimization

```bash
# Set query limits
./victoria-metrics-prod \
  -search.maxQueryDuration=60s \
  -search.maxUniqueTimeseries=1000000 \
  -search.maxSeries=100000
```

#### Storage Optimization

```bash
# Configure data retention
./victoria-metrics-prod \
  -retentionPeriod=12 \
  -storage.minFreeDiskSpaceBytes=10GB
```

### Integration Examples

#### Integration with Grafana

```yaml
# Grafana datasource configuration
apiVersion: 1
datasources:
  - name: VictoriaMetrics
    type: prometheus
    access: proxy
    url: http://victoriametrics:8428
    isDefault: true
```

#### Integration with Prometheus

```yaml
# Prometheus configuration
remote_write:
  - url: http://victoriametrics:8428/api/v1/write
    queue_config:
      max_samples_per_send: 10000
      capacity: 500000
      max_shards: 30
```

#### Kubernetes Service Monitor

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: example-app
spec:
  selector:
    matchLabels:
      app: example-app
  endpoints:
    - port: metrics
      interval: 30s
      path: /metrics
```

### Monitoring VictoriaMetrics

```promql
# Ingestion rate
sum(rate(vm_rows_inserted_total[5m]))

# Active time series
vm_cache_entries{type="storage/active_timeseries"}

# Memory usage
process_resident_memory_bytes

# Slow queries
sum(rate(vm_slow_queries_total[5m]))
```

---

## Best Practices

### Data Retention Strategy

- Use appropriate retention periods based on use case
- Implement downsampling for long-term data
- Monitor disk usage regularly

### Query Optimization

- Use recording rules for expensive queries
- Limit query time ranges when possible
- Use metric relabeling to reduce cardinality

### Resource Planning

- Allocate 60-70% of system RAM to VictoriaMetrics
- Use SSD storage for better performance
- Plan for 2x growth in metric volume

### High Availability

- Deploy cluster mode for critical workloads
- Use replication factor of 2 or 3
- Implement automated backups

### Security

- Enable authentication with vmauth
- Use TLS for data in transit
- Implement network segmentation
- Regular security updates

---

## Troubleshooting

### Common Issues

**High Memory Usage:**
```bash
# Check memory metrics
curl http://localhost:8428/metrics | grep process_resident_memory

# Reduce cache size
./victoria-metrics-prod -memory.allowedPercent=50
```

**Slow Queries:**
```bash
# Check slow query log
curl http://localhost:8428/api/v1/status/top_queries

# Optimize with recording rules
```

**Data Loss:**
```bash
# Verify data retention
curl http://localhost:8428/api/v1/status/tsdb

# Check disk space
df -h
```

### Health Checks

```bash
# Overall health
curl http://localhost:8428/health

# Metrics endpoint
curl http://localhost:8428/metrics

# Build info
curl http://localhost:8428/api/v1/status/buildinfo
```

---

## Resources

### Official Documentation
- [VictoriaMetrics Docs](https://docs.victoriametrics.com/)
- [GitHub Repository](https://github.com/VictoriaMetrics/VictoriaMetrics)
- [MetricsQL Guide](https://docs.victoriametrics.com/MetricsQL.html)

### Tutorials
- [Quick Start Guide](https://docs.victoriametrics.com/Quick-Start.html)
- [Cluster Setup](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html)
- [Migration from Prometheus](https://docs.victoriametrics.com/#how-to-import-data-in-prometheus-exposition-format)

### Community
- [Slack Community](https://slack.victoriametrics.com/)
- [GitHub Discussions](https://github.com/VictoriaMetrics/VictoriaMetrics/discussions)
- [Blog](https://victoriametrics.com/blog/)

### Tools & Integrations
- [Helm Charts](https://github.com/VictoriaMetrics/helm-charts)
- [Operator for Kubernetes](https://github.com/VictoriaMetrics/operator)
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/?search=victoriametrics)

---

## Comparison with Other Time-Series Databases

| Feature | VictoriaMetrics | Prometheus | InfluxDB | TimescaleDB |
|---------|----------------|------------|----------|-------------|
| **Storage Efficiency** | Excellent | Good | Good | Good |
| **Query Language** | MetricsQL | PromQL | InfluxQL | SQL |
| **Clustering** | Native | Limited | Enterprise | Native |
| **Multi-tenancy** | Yes | No | Enterprise | Yes |
| **Downsampling** | Automatic | Manual | Yes | Yes |
| **Cardinality** | Very High | High | Medium | High |

---

## Version History

- **v1.93.x** (2024): Enhanced MetricsQL, improved performance
- **v1.90.x** (2023): Multi-tenancy improvements
- **v1.80.x** (2023): Cluster enhancements
- **v1.70.x** (2022): Downsampling features

---

*Last Updated: January 2026*
