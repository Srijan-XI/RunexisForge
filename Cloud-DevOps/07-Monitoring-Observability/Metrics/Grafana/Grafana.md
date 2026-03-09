# Grafana

## Introduction

Grafana is an open-source visualization and observability platform that enables you to query, visualize, alert on, and explore your metrics, logs, and traces from multiple data sources. With its powerful and elegant dashboarding capabilities, Grafana has become the de facto standard for monitoring dashboards across industries.

## Why Grafana?

- **Universal Data Source Support**: Connect to 150+ data sources including Prometheus, Loki, InfluxDB, Elasticsearch, MySQL, PostgreSQL, CloudWatch, Azure Monitor, and more
- **Unified Observability**: Visualize metrics, logs, and traces in a single pane of glass
- **Rich Visualizations**: 20+ built-in panel types (graphs, heatmaps, tables, gauges, stat panels, etc.)
- **Advanced Alerting**: Unified alerting system with multi-dimensional routing and silencing
- **Templating & Variables**: Create dynamic, reusable dashboards with template variables
- **Annotations**: Correlate events with metric changes
- **Plugins Ecosystem**: Extensive community and commercial plugins
- **Enterprise Features**: RBAC, reporting, enterprise data sources, and support
- **Grafana Cloud**: Fully managed SaaS offering

## Grafana vs Alternatives

| Feature | Grafana | Kibana | Chronograf | Datadog UI |
|---------|---------|--------|------------|------------|
| Data Sources | 150+ | Elasticsearch | InfluxDB | Datadog |
| Metrics | ✅ Excellent | ❌ Limited | ✅ Good | ✅ Excellent |
| Logs | ✅ Excellent | ✅ Excellent | ❌ Basic | ✅ Excellent |
| Traces | ✅ Good | ❌ Limited | ❌ None | ✅ Excellent |
| Dashboards | ✅ Excellent | ✅ Good | ✅ Good | ✅ Excellent |
| Alerting | ✅ Excellent | ✅ Good | ✅ Basic | ✅ Excellent |
| Open Source | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| Learning Curve | Medium | Medium | Low | Low |
| Customization | Very High | Medium | Low | Medium |
| Cost | Free/Enterprise | Free/Elastic | Free | Paid |

## When to Use Grafana

✅ **Use Grafana when:**
- Need to visualize data from multiple sources in one dashboard
- Building custom monitoring solutions
- Want open-source with enterprise options
- Require flexible, reusable dashboard templates
- Need powerful alerting with multiple notification channels
- Integrating metrics, logs, and traces
- Working with Prometheus, Loki, or InfluxDB
- Budget constraints (free and powerful)

❌ **Consider alternatives when:**
- Only using Elasticsearch (Kibana is more integrated)
- Only using Datadog (native UI may suffice)
- Need ultra-simple setup with no customization
- Require built-in data collection (Grafana only visualizes)

## Key Concepts

### Data Sources

External systems that Grafana queries for data:
- **Metrics**: Prometheus, InfluxDB, Graphite, CloudWatch
- **Logs**: Loki, Elasticsearch, Splunk
- **Traces**: Tempo, Jaeger, Zipkin
- **Databases**: MySQL, PostgreSQL, MSSQL
- **Cloud**: Azure Monitor, Google Cloud Monitoring, AWS CloudWatch
- **Custom**: JSON API, CSV, TestData

### Dashboards

Collection of panels organized into rows:
- **Panels**: Individual visualizations (graphs, tables, stats)
- **Rows**: Collapsible groups of panels
- **Variables**: Dynamic filters applied across panels
- **Annotations**: Event markers on time-series graphs
- **Links**: Navigation between dashboards
- **Tags**: Categorize and search dashboards

### Panels

Individual visualization components:
- **Time Series**: Line, bar, area charts
- **Stat**: Single value with sparkline
- **Gauge**: Progress indicator
- **Bar Gauge**: Horizontal/vertical bars
- **Table**: Tabular data view
- **Heatmap**: Density visualization
- **Logs**: Log stream viewer
- **Node Graph**: Dependency graph
- **Geomap**: Geographic visualization

### Variables

Dynamic placeholders for filter values:
- **Query**: Populated from data source query
- **Custom**: Manually defined list
- **Constant**: Single fixed value
- **Data Source**: Select from configured data sources
- **Interval**: Time interval selector
- **Ad hoc**: Dynamic filters from data

### Alerting

Unified alerting framework (Grafana 8+):
- **Alert Rules**: Conditions that trigger alerts
- **Labels & Matchers**: Route alerts to specific channels
- **Contact Points**: Notification destinations (email, Slack, PagerDuty, webhook)
- **Notification Policies**: Routing tree for alert delivery
- **Silences**: Temporarily mute alerts
- **Mute Timings**: Scheduled quiet periods

## User Guide

## Installation

### Docker

```bash
# Latest stable version
docker run -d -p 3000:3000 --name=grafana grafana/grafana:latest

# With persistent storage
docker run -d \
  -p 3000:3000 \
  --name=grafana \
  -v grafana-storage:/var/lib/grafana \
  grafana/grafana:latest

# With custom configuration
docker run -d \
  -p 3000:3000 \
  --name=grafana \
  -v /path/to/grafana.ini:/etc/grafana/grafana.ini \
  -v grafana-storage:/var/lib/grafana \
  grafana/grafana:latest
```

Access at: `http://localhost:3000`  
Default credentials: `admin` / `admin` (you'll be prompted to change)

### Docker Compose (with Prometheus & Loki)

**docker-compose.yml:**
```yaml
version: '3'
services:
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana-storage:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    depends_on:
      - prometheus
      - loki

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-storage:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'

  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml

volumes:
  grafana-storage:
  prometheus-storage:
```

### Linux Installation

**Ubuntu/Debian:**
```bash
sudo apt-get install -y software-properties-common
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install grafana

sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

**RHEL/CentOS:**
```bash
cat <<EOF | sudo tee /etc/yum.repos.d/grafana.repo
[grafana]
name=grafana
baseurl=https://packages.grafana.com/oss/rpm
repo_gpgcheck=1
enabled=1
gpgcheck=1
gpgkey=https://packages.grafana.com/gpg.key
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
EOF

sudo yum install grafana
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

### Kubernetes (Helm)

```bash
# Add Grafana Helm repository
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install
helm install grafana grafana/grafana \
  --set persistence.enabled=true \
  --set persistence.size=10Gi \
  --set adminPassword=admin123

# Get admin password
kubectl get secret grafana -o jsonpath="{.data.admin-password}" | base64 --decode

# Port forward
kubectl port-forward service/grafana 3000:80
```

## Data Source Configuration

### Prometheus

**UI Configuration:**
1. Configuration → Data Sources → Add data source
2. Select "Prometheus"
3. Configure:
   - **HTTP URL**: `http://prometheus:9090` or `http://localhost:9090`
   - **Access**: Server (default) or Browser
   - **Scrape interval**: 15s (default)
4. Click "Save & Test"

**Provisioning (YAML):**
```yaml
# /etc/grafana/provisioning/datasources/prometheus.yml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: true
```

### Loki

**UI Configuration:**
1. Configuration → Data Sources → Add data source
2. Select "Loki"
3. Configure:
   - **HTTP URL**: `http://loki:3100`
   - **Derived fields**: Extract trace IDs from logs
4. Click "Save & Test"

**Provisioning (YAML):**
```yaml
# /etc/grafana/provisioning/datasources/loki.yml
apiVersion: 1
datasources:
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    jsonData:
      derivedFields:
        - datasourceUid: tempo
          matcherRegex: "traceID=(\\w+)"
          name: TraceID
          url: "$${__value.raw}"
```

### InfluxDB

**InfluxDB 2.x with Flux:**
```yaml
apiVersion: 1
datasources:
  - name: InfluxDB
    type: influxdb
    access: proxy
    url: http://influxdb:8086
    jsonData:
      version: Flux
      organization: myorg
      defaultBucket: mybucket
      tlsSkipVerify: false
    secureJsonData:
      token: YOUR_INFLUX_TOKEN
```

### Tempo (Traces)

```yaml
apiVersion: 1
datasources:
  - name: Tempo
    type: tempo
    access: proxy
    url: http://tempo:3200
    jsonData:
      tracesToLogs:
        datasourceUid: loki
        tags: ['job', 'instance', 'pod', 'namespace']
        filterByTraceID: true
        filterBySpanID: false
```

### Elasticsearch

```yaml
apiVersion: 1
datasources:
  - name: Elasticsearch
    type: elasticsearch
    access: proxy
    url: http://elasticsearch:9200
    database: "logs-*"
    jsonData:
      esVersion: 8
      timeField: "@timestamp"
      logMessageField: message
      logLevelField: level
```

## Building Dashboards

### Create Dashboard

1. Click **"+"** → **"Dashboard"** → **"Add new panel"**
2. Select data source (e.g., Prometheus)
3. Write query (e.g., PromQL)
4. Choose visualization type
5. Configure panel options (title, description, units, thresholds)
6. Save dashboard

### Example Prometheus Panel

**Query (PromQL):**
```promql
# CPU usage per instance
100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Request rate
rate(http_requests_total[5m])

# Error rate percentage
rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) * 100

# P95 latency
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, job))

# Memory usage
node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100
```

### Example Loki Panel (Logs)

**LogQL queries:**
```logql
# All logs from job
{job="varlogs"}

# Filter by keyword
{job="varlogs"} |= "error"

# JSON parsing
{job="app"} | json | level="error"

# Rate of errors
sum(rate({job="app"} |= "error" [5m]))

# Top 10 error messages
topk(10, sum by (msg) (count_over_time({job="app", level="error"} [1h])))
```

### Template Variables

**Create variable:**
1. Dashboard settings (gear icon) → Variables → Add variable
2. Configure:
   - **Name**: `environment`
   - **Type**: Query
   - **Data source**: Prometheus
   - **Query**: `label_values(environment)`
   - **Multi-value**: Enabled
   - **Include All**: Enabled

**Use in query:**
```promql
rate(http_requests_total{environment=~"$environment"}[5m])
```

**Common variable queries:**

```promql
# Get all environments
label_values(environment)

# Get all services in selected environment
label_values(http_requests_total{environment="$environment"}, service)

# Get all instances for selected service
label_values(http_requests_total{service="$service"}, instance)
```

### Panel Transformations

Transform query results before visualization:

1. **Merge**: Combine multiple queries
2. **Filter by name**: Include/exclude series
3. **Organize fields**: Rename, reorder, hide columns
4. **Reduce**: Calculate min/max/mean/sum
5. **Calculate field**: Add computed columns
6. **Concatenate fields**: Merge field values
7. **Sort by**: Order results

**Example transformation:**
- Query returns: `cpu_user`, `cpu_system`, `cpu_idle`
- Transform → Calculate field → Formula: `cpu_user + cpu_system`
- Result: New field `total_cpu_used`

## Advanced Alerting

### Create Alert Rule (Grafana 8+)

1. **Contact Points** (Notification channels):
   - Alerting → Contact points → New contact point
   - Choose type: Email, Slack, PagerDuty, Webhook, etc.

**Slack example:**
```yaml
name: team-slack
type: slack
settings:
  url: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
  recipient: "#alerts"
  mentionChannel: here
```

2. **Create Alert Rule**:
   - Dashboard → Panel → Alert tab → Create alert rule
   - Or: Alerting → Alert rules → New alert rule

**Example alert rule:**
```yaml
# CPU usage > 80% for 5 minutes
Alert condition: 
  Query A: avg(cpu_usage{environment="prod"})
  Reduce: Last
  Math: A > 80

Evaluate every: 1m
For: 5m

Labels:
  severity: warning
  team: platform

Annotations:
  summary: High CPU on {{ $labels.instance }}
  description: CPU is {{ $value }}% on instance {{ $labels.instance }}
```

3. **Notification Policies**:
   - Route alerts based on labels
   - Group alerts to reduce noise
   - Set repeat intervals

**Example notification policy:**
```yaml
- Match:
    severity: critical
  Contact point: pagerduty
  Group by: [alertname, instance]
  Group wait: 30s
  Group interval: 5m
  Repeat interval: 12h

- Match:
    severity: warning
  Contact point: team-slack
  Group by: [alertname]
  Repeat interval: 4h
```

### Multi-Dimensional Alerting Example

```promql
# Alert on high error rate per service per environment
(
  sum by (service, environment) (rate(http_requests_total{status=~"5.."}[5m]))
  /
  sum by (service, environment) (rate(http_requests_total[5m]))
) * 100 > 1
```

This creates separate alerts for each `service` + `environment` combination.

### Silences

Temporarily mute alerts:

1. Alerting → Silences → New silence
2. Configure matchers:
   - `alertname=HighErrorRate`
   - `environment=staging`
3. Set duration: 2 hours
4. Add comment: "Planned deployment"

## Annotations

Mark events on time-series graphs:

### Manual Annotations

1. Dashboard → Settings → Annotations → Add annotation query
2. Configure:
   - **Name**: Deployments
   - **Data source**: Select data source
   - **Query**: (depends on data source)

### Annotation from Prometheus

Store deployment events in Prometheus:
```bash
# Push deployment event
echo "deployment{service=\"api\",version=\"v1.2.3\"} 1" | \
  curl --data-binary @- http://pushgateway:9091/metrics/job/deployments
```

**Annotation query:**
```promql
ALERTS{alertname="Deployment"}
```

### Annotation from Loki

```logql
{job="deployments"} |= "deployed"
```

### Annotation from HTTP API

**Create annotation via API:**
```bash
curl -X POST http://admin:admin@localhost:3000/api/annotations \
  -H "Content-Type: application/json" \
  -d '{
    "dashboardId": 1,
    "time": 1609459200000,
    "timeEnd": 1609459260000,
    "tags": ["deployment", "api"],
    "text": "Deployed v1.2.3"
  }'
```

## Real-World Use Cases

### 1. Kubernetes Monitoring Dashboard

**Data sources**: Prometheus (metrics), Loki (logs)

**Key panels:**
- Cluster CPU/Memory usage
- Pod status (Running, Pending, Failed)
- Node resource utilization
- Persistent volume usage
- Network I/O per namespace
- Top CPU/Memory pods
- Container logs panel

**Variables:**
- `$namespace` - Filter by namespace
- `$deployment` - Filter by deployment
- `$pod` - Filter by pod

**Sample queries:**
```promql
# CPU by namespace
sum(rate(container_cpu_usage_seconds_total{namespace="$namespace"}[5m])) by (pod)

# Memory by pod
sum(container_memory_working_set_bytes{namespace="$namespace", pod="$pod"})

# Pod restart count
kube_pod_container_status_restarts_total{namespace="$namespace"}
```

### 2. Application Performance Dashboard

**Metrics tracked:**
- Request rate (requests/second)
- Error rate (%)
- Latency (p50, p95, p99)
- Database query time
- Cache hit rate
- Active connections

**RED methodology (Rate, Errors, Duration):**
```promql
# Rate
sum(rate(http_requests_total[5m])) by (endpoint)

# Errors
sum(rate(http_requests_total{status=~"5.."}[5m])) by (endpoint) / 
sum(rate(http_requests_total[5m])) by (endpoint)

# Duration (p95)
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, endpoint)
)
```

**Golden Signals (Latency, Traffic, Errors, Saturation):**
- Latency: Response time histograms
- Traffic: Request rate
- Errors: Error rate %
- Saturation: CPU, memory, disk usage

### 3. Infrastructure Monitoring

**Node Exporter metrics:**
```promql
# CPU usage
100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory usage
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / 
node_memory_MemTotal_bytes * 100

# Disk usage
(node_filesystem_size_bytes - node_filesystem_avail_bytes) / 
node_filesystem_size_bytes * 100

# Network traffic
rate(node_network_receive_bytes_total[5m])
rate(node_network_transmit_bytes_total[5m])

# Load average
node_load1
node_load5
node_load15
```

### 4. Database Monitoring (PostgreSQL)

**Using postgres_exporter:**
```promql
# Active connections
pg_stat_database_numbackends

# Transaction rate
rate(pg_stat_database_xact_commit[5m]) + rate(pg_stat_database_xact_rollback[5m])

# Cache hit ratio
sum(pg_stat_database_blks_hit) / (sum(pg_stat_database_blks_hit) + sum(pg_stat_database_blks_read)) * 100

# Slow queries (from logs in Loki)
{job="postgres"} |= "duration" | regexp "duration: (?P<duration>\\d+\\.\\d+) ms"
```

### 5. Business Metrics Dashboard

**Track KPIs:**
- User signups per day
- Revenue per hour
- Conversion rate %
- Active users
- Feature adoption rate

**Custom application metrics:**
```python
from prometheus_client import Counter, Histogram, Gauge

user_signups = Counter('user_signups_total', 'Total user signups')
revenue = Counter('revenue_total', 'Total revenue in USD')
active_users = Gauge('active_users', 'Currently active users')
purchase_value = Histogram('purchase_value', 'Purchase value distribution')
```

**Grafana queries:**
```promql
# Signups per hour
sum(increase(user_signups_total[1h]))

# Revenue trend
sum(increase(revenue_total[1h]))

# Average purchase value
histogram_quantile(0.5, sum(rate(purchase_value_bucket[1h])) by (le))
```

## Dashboard Best Practices

1. **Organization**
   - Group related panels in rows
   - Use consistent colors across dashboards
   - Order panels by importance (top-left most critical)
   - Use stat panels for key metrics at the top

2. **Variables**
   - Create variables for common filters (environment, service, instance)
   - Enable multi-select and "All" option where appropriate
   - Chain variables (environment → service → instance)

3. **Naming**
   - Use clear, descriptive panel titles
   - Include units in titles (%, ms, requests/s)
   - Add descriptions explaining complex queries

4. **Performance**
   - Limit time range for heavy queries
   - Use recording rules in Prometheus for expensive queries
   - Set appropriate refresh rates (default 30s-1m)
   - Avoid too many panels in one dashboard (<20)

5. **Thresholds**
   - Set green/yellow/red thresholds on stat panels
   - Use threshold alerts to highlight issues
   - Make thresholds visible in graphs

6. **Reusability**
   - Export dashboards as JSON
   - Use provisioning for version control
   - Create dashboard templates for common use cases
   - Tag dashboards for easy discovery

## Provisioning

Automate Grafana configuration through code:

### Directory Structure

```
/etc/grafana/provisioning/
├── datasources/
│   ├── prometheus.yml
│   └── loki.yml
├── dashboards/
│   ├── dashboards.yml
│   └── k8s-dashboard.json
├── notifiers/
│   └── slack.yml
└── alerting/
    ├── alert-rules.yml
    └── contact-points.yml
```

### Dashboard Provisioning

**/etc/grafana/provisioning/dashboards/dashboards.yml:**
```yaml
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    editable: true
    updateIntervalSeconds: 10
    allowUiUpdates: true
    options:
      path: /etc/grafana/provisioning/dashboards
```

Export dashboard JSON:
1. Dashboard → Share → Export → Save to file
2. Place in `/etc/grafana/provisioning/dashboards/`

## Plugins

### Install Plugin

```bash
# Docker
docker run -d \
  -p 3000:3000 \
  --name=grafana \
  -e "GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-piechart-panel" \
  grafana/grafana:latest

# CLI
grafana-cli plugins install grafana-clock-panel
systemctl restart grafana-server
```

### Popular Plugins

**Visualization:**
- `grafana-clock-panel` - Clock widget
- `grafana-piechart-panel` - Pie/donut charts
- `grafana-worldmap-panel` - Geographic data
- `marcusolsson-treemap-panel` - Treemap visualization
- `volkovlabs-echarts-panel` - Apache ECharts integration

**Data Sources:**
- `grafana-googlesheets-datasource` - Google Sheets
- `grafana-github-datasource` - GitHub API
- `grafana-mongodb-datasource` - MongoDB
- `redis-datasource` - Redis

**Apps:**
- `grafana-oncall-app` - On-call management
- `kentik-app` - Network monitoring

## Grafana Cloud

Fully managed Grafana platform:

**Features:**
- Hosted Grafana, Prometheus, Loki, Tempo
- Synthetic monitoring
- Incident management (OnCall)
- Machine learning insights
- Free tier: 10k metrics, 50GB logs, 14-day retention
- Integrated with AWS, Azure, GCP

## Security

### Authentication

**Enable OAuth (GitHub example):**
```ini
[auth.github]
enabled = true
allow_sign_up = true
client_id = YOUR_GITHUB_CLIENT_ID
client_secret = YOUR_GITHUB_CLIENT_SECRET
scopes = user:email,read:org
auth_url = https://github.com/login/oauth/authorize
token_url = https://github.com/login/oauth/access_token
api_url = https://api.github.com/user
allowed_organizations = your-org
```

**LDAP:**
```ini
[auth.ldap]
enabled = true
config_file = /etc/grafana/ldap.toml
```

### RBAC (Enterprise)

Role-Based Access Control for fine-grained permissions:
- Viewer: Read-only access
- Editor: Create/edit dashboards
- Admin: Full administrative access
- Custom roles: Define specific permissions

### API Tokens

```bash
# Create service account token
curl -X POST http://admin:admin@localhost:3000/api/auth/keys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "automation-token",
    "role": "Editor",
    "secondsToLive": 31536000
  }'
```

### Enable HTTPS

```ini
[server]
protocol = https
cert_file = /etc/grafana/grafana.crt
cert_key = /etc/grafana/grafana.key
```

## Troubleshooting

### High Memory Usage

**Symptoms**: Grafana consuming excessive RAM

**Solutions**:
- Reduce dashboard query frequency
- Limit time range in panels
- Reduce number of series returned
- Use query caching
- Increase `GF_DATABASE_QUERY_RETRIES`

### Slow Dashboards

**Solutions**:
- Use Prometheus recording rules
- Downsample data in InfluxDB
- Reduce panel query complexity
- Enable query caching in data sources
- Limit concurrent queries

### Data Source Connection Issues

**Check**:
- Network connectivity: `ping prometheus`
- URL configuration: correct scheme (http/https)
- Authentication credentials
- Firewall rules
- Data source logs: `/var/log/grafana/grafana.log`

## Performance Optimization

1. **Query Optimization**
   - Use recording rules for complex queries
   - Limit time ranges
   - Use appropriate aggregation intervals

2. **Dashboard Optimization**
   - Limit panels per dashboard (<20)
   - Set appropriate refresh intervals
   - Use shared crosshair sparingly

3. **Caching**
   - Enable data source query caching
   - Use browser caching for static assets
   - Implement reverse proxy with caching (nginx)

4. **Database**
   - Use PostgreSQL instead of SQLite for production
   - Regular database maintenance

## Resources

- **Official Documentation**: https://grafana.com/docs/grafana/latest/
- **Community Dashboards**: https://grafana.com/grafana/dashboards/
- **Community Forums**: https://community.grafana.com/
- **GitHub**: https://github.com/grafana/grafana
- **Play Environment**: https://play.grafana.org/
- **Grafana Labs Blog**: https://grafana.com/blog/
- **Grafana University**: https://university.grafana.com/

## Quick Reference

### Useful Keyboard Shortcuts

- `d k`: Open dashboard
- `s`: Open search
- `e`: Expand/collapse row
- `v`: Toggle view mode
- `Ctrl+S`: Save dashboard
- `Ctrl+H`: Hide controls

### Common Configuration Locations

- **Config file**: `/etc/grafana/grafana.ini`
- **Database**: `/var/lib/grafana/grafana.db`
- **Logs**: `/var/log/grafana/`
- **Provisioning**: `/etc/grafana/provisioning/`
- **Plugins**: `/var/lib/grafana/plugins/`

---

*Last Updated: February 2026*
