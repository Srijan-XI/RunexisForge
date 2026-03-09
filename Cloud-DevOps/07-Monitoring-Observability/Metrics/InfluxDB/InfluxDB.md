# InfluxDB

## Introduction

InfluxDB is a high-performance time-series database (TSDB) designed for storing and querying large volumes of timestamped data. Built from the ground up to handle metrics, events, and real-time analytics, InfluxDB is optimized for fast, high-availability storage and retrieval of time-series data in fields like DevOps monitoring, IoT sensor data, and real-time analytics.

## Why InfluxDB?

- **Purpose-Built for Time-Series**: Optimized data structures and query engines
- **High Write Throughput**: Handles millions of data points per second
- **SQL-Like Query Language**: Flux and InfluxQL for familiar syntax
- **Built-In Downsampling**: Continuous queries and retention policies
- **Horizontal Scalability**: Clustering support in Enterprise edition
- **Integrated Stack**: Telegraf (collection), InfluxDB (storage), Chronograf (visualization), Kapacitor (processing)
- **Compression**: Efficient time-series compression reduces storage costs
- **Schema-less Design**: No need to define schema upfront

## InfluxDB vs Other Time-Series Databases

| Feature | InfluxDB | Prometheus | TimescaleDB | OpenTSDB |
|---------|----------|------------|-------------|----------|
| Query Language | Flux, InfluxQL | PromQL | SQL | Custom |
| Storage Model | Custom TSM | Custom | PostgreSQL | HBase |
| Write Performance | Excellent | Good | Good | Excellent |
| Retention Policies | Built-in | Manual | Manual | Manual |
| Clustering | Enterprise | Federation | Native | Native |
| Data Model | Tags + Fields | Labels | Relational | Tags |
| Cardinality | High | Medium | High | Very High |
| Learning Curve | Medium | Medium | Low (SQL) | High |

## When to Use InfluxDB

✅ **Use InfluxDB when:**
- Collecting metrics from infrastructure, applications, or IoT devices
- Need high write throughput and fast queries
- Want automatic data downsampling and retention
- Building real-time monitoring dashboards
- Analyzing time-stamped sensor data
- Tracking business metrics over time
- Need a complete TICK stack solution (Telegraf, InfluxDB, Chronograf, Kapacitor)

❌ **Consider alternatives when:**
- Need distributed tracing (use Jaeger, Tempo)
- Require SQL with strong ACID guarantees (use TimescaleDB)
- Pull-based metrics collection preferred (use Prometheus)
- Budget constraints (Prometheus is fully open-source)

## Key Concepts

### Data Model

**Measurement**: Similar to a table in SQL
**Tags**: Indexed key-value pairs for metadata (e.g., `host=server1`, `region=us-east`)
**Fields**: Actual data values (e.g., `cpu_usage=75.2`, `memory_free=1024`)
**Timestamp**: Nanosecond precision timestamp (automatic if not specified)

**Example data point:**
```
cpu,host=server1,region=us-east usage_percent=75.2,cores=8 1609459200000000000
```

### Organization Hierarchy

```
Organization
  └── Buckets (databases in InfluxDB 2.x)
       └── Measurements
            ├── Tags (indexed)
            └── Fields (not indexed)
                 └── Timestamp
```

### Retention Policies

Define how long data is kept:
- **Duration**: How long to keep data (e.g., 7d, 30d, 90d, INF)
- **Replication**: Number of data copies (Enterprise only)
- **Shard Duration**: Time range covered by a shard group

### Continuous Queries (InfluxDB 1.x) / Tasks (InfluxDB 2.x)

Automatically downsample high-resolution data into aggregated summaries:
- Compute hourly/daily averages from minute-level data
- Reduce storage and improve query performance
- Essential for long-term data retention

## InfluxDB Versions

### InfluxDB 1.x (Stable, Widely Used)
- InfluxQL query language
- Retention policies and continuous queries
- Separate meta, data, and WAL storage
- Clustering in Enterprise edition only

### InfluxDB 2.x (Modern, Recommended)
- Unified API and UI
- Flux query language (more powerful than InfluxQL)
- Tasks replace continuous queries
- Integrated authentication and authorization
- Built-in Chronograf UI
- Organizations and buckets model

### InfluxDB 3.x (Cloud-Native, Preview)
- Built on Apache Arrow and DataFusion
- Columnar storage for better compression
- SQL and InfluxQL compatibility
- Designed for cloud scalability

## User Guide

## Installation

### Docker (InfluxDB 2.x)

```bash
docker run -d -p 8086:8086 \
  --name influxdb2 \
  -v influxdb2-data:/var/lib/influxdb2 \
  -v influxdb2-config:/etc/influxdb2 \
  influxdb:2.7
```

Access UI: `http://localhost:8086`

### Docker (InfluxDB 1.x)

```bash
docker run -d -p 8086:8086 \
  --name influxdb \
  -v influxdb-data:/var/lib/influxdb \
  influxdb:1.8
```

### Linux (InfluxDB 2.x)

```bash
# Ubuntu/Debian
wget https://dl.influxdata.com/influxdb/releases/influxdb2-2.7.1-amd64.deb
sudo dpkg -i influxdb2-2.7.1-amd64.deb
sudo systemctl start influxdb

# RHEL/CentOS
wget https://dl.influxdata.com/influxdb/releases/influxdb2-2.7.1.x86_64.rpm
sudo yum localinstall influxdb2-2.7.1.x86_64.rpm
sudo systemctl start influxdb
```

### Initial Setup (InfluxDB 2.x)

```bash
# Web UI setup
# Navigate to http://localhost:8086
# - Set username, password, organization, bucket
# - Save the API token

# CLI setup
influx setup \
  --username admin \
  --password SecurePass123! \
  --org myorg \
  --bucket mybucket \
  --retention 30d \
  --force
```

## Writing Data

### Using InfluxDB CLI (2.x)

```bash
# Write single point
influx write \
  --bucket mybucket \
  --org myorg \
  --token YOUR_TOKEN \
  'cpu,host=server1 usage=75.2'

# Write from file (line protocol)
influx write \
  --bucket mybucket \
  --org myorg \
  --token YOUR_TOKEN \
  --file data.txt
```

**data.txt example:**
```
cpu,host=server1,region=us-east usage=75.2,cores=8 1609459200000000000
mem,host=server1,region=us-east used=4096,free=12288 1609459200000000000
disk,host=server1,path=/data used=85.5,free=14.5 1609459200000000000
```

### Using HTTP API (2.x)

```bash
curl -X POST "http://localhost:8086/api/v2/write?org=myorg&bucket=mybucket" \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: text/plain; charset=utf-8" \
  --data-binary 'cpu,host=server1 usage=75.2'
```

### Using Python Client

```bash
pip install influxdb-client
```

```python
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS

# Initialize client
client = InfluxDBClient(
    url="http://localhost:8086",
    token="YOUR_TOKEN",
    org="myorg"
)

write_api = client.write_api(write_options=SYNCHRONOUS)

# Write single point
point = Point("cpu") \
    .tag("host", "server1") \
    .tag("region", "us-east") \
    .field("usage", 75.2) \
    .field("cores", 8)

write_api.write(bucket="mybucket", record=point)

# Write multiple points
points = [
    Point("cpu").tag("host", "server1").field("usage", 75.2),
    Point("cpu").tag("host", "server2").field("usage", 82.5),
    Point("mem").tag("host", "server1").field("used", 4096)
]

write_api.write(bucket="mybucket", record=points)

client.close()
```

### Using Telegraf (Recommended for Production)

```bash
# Install Telegraf
# Ubuntu/Debian
wget https://dl.influxdata.com/telegraf/releases/telegraf_1.28.0-1_amd64.deb
sudo dpkg -i telegraf_1.28.0-1_amd64.deb

# Generate default config
telegraf config > telegraf.conf
```

**telegraf.conf (excerpt):**
```toml
[[outputs.influxdb_v2]]
  urls = ["http://localhost:8086"]
  token = "YOUR_TOKEN"
  organization = "myorg"
  bucket = "mybucket"

[[inputs.cpu]]
  percpu = true
  totalcpu = true

[[inputs.mem]]
[[inputs.disk]]
  ignore_fs = ["tmpfs", "devtmpfs"]

[[inputs.net]]
[[inputs.docker]]
  endpoint = "unix:///var/run/docker.sock"
```

```bash
# Start Telegraf
sudo systemctl start telegraf
sudo systemctl enable telegraf
```

## Querying Data

### Flux Query Language (InfluxDB 2.x)

**Basic query:**
```flux
from(bucket: "mybucket")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "cpu")
  |> filter(fn: (r) => r._field == "usage")
  |> filter(fn: (r) => r.host == "server1")
```

**Aggregation query:**
```flux
from(bucket: "mybucket")
  |> range(start: -24h)
  |> filter(fn: (r) => r._measurement == "cpu")
  |> filter(fn: (r) => r._field == "usage")
  |> aggregateWindow(every: 1h, fn: mean)
```

**Multiple measurements:**
```flux
from(bucket: "mybucket")
  |> range(start: -1h)
  |> filter(fn: (r) => 
      r._measurement == "cpu" or r._measurement == "mem"
  )
  |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
```

**Join data from multiple sources:**
```flux
cpu = from(bucket: "mybucket")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "cpu")

mem = from(bucket: "mybucket")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "mem")

join(tables: {cpu: cpu, mem: mem}, on: ["_time", "host"])
```

### InfluxQL (InfluxDB 1.x & 2.x compatibility)

**Basic query:**
```sql
SELECT "usage" FROM "cpu" WHERE "host" = 'server1' AND time > now() - 1h
```

**Aggregation:**
```sql
SELECT MEAN("usage") FROM "cpu" 
WHERE time > now() - 24h 
GROUP BY time(1h), "host"
```

**Multiple fields:**
```sql
SELECT "usage", "cores" FROM "cpu" WHERE time > now() - 1h
```

### Using Python Client

```python
from influxdb_client import InfluxDBClient

client = InfluxDBClient(url="http://localhost:8086", token="YOUR_TOKEN", org="myorg")
query_api = client.query_api()

# Flux query
query = '''
from(bucket: "mybucket")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "cpu")
  |> filter(fn: (r) => r._field == "usage")
'''

tables = query_api.query(query)

for table in tables:
    for record in table.records:
        print(f"{record.get_time()}: {record.get_value()}")

client.close()
```

## Retention Policies and Downsampling

### Create Retention Policy (InfluxDB 1.x)

```sql
-- Keep raw data for 7 days
CREATE RETENTION POLICY "7d_raw" ON "mydb" DURATION 7d REPLICATION 1 DEFAULT

-- Keep aggregated data for 90 days
CREATE RETENTION POLICY "90d_aggregated" ON "mydb" DURATION 90d REPLICATION 1
```

### Continuous Query (InfluxDB 1.x)

```sql
CREATE CONTINUOUS QUERY "cq_cpu_1h" ON "mydb"
BEGIN
  SELECT mean("usage") AS "usage_mean"
  INTO "90d_aggregated"."cpu_1h"
  FROM "7d_raw"."cpu"
  GROUP BY time(1h), *
END
```

### Tasks (InfluxDB 2.x)

```flux
option task = {
  name: "downsample_cpu",
  every: 1h,
}

from(bucket: "mybucket")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "cpu")
  |> aggregateWindow(every: 1h, fn: mean)
  |> to(bucket: "mybucket_aggregated")
```

## Grafana Integration

### Add InfluxDB Data Source

1. Navigate to Configuration → Data Sources
2. Click "Add data source" → Select "InfluxDB"
3. Configure:
   - **Query Language**: Flux (for InfluxDB 2.x)
   - **URL**: `http://localhost:8086`
   - **Organization**: `myorg`
   - **Token**: `YOUR_TOKEN`
   - **Default Bucket**: `mybucket`
4. Click "Save & Test"

### Create Dashboard

**Example Flux query in Grafana:**
```flux
from(bucket: v.defaultBucket)
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r._measurement == "cpu")
  |> filter(fn: (r) => r._field == "usage")
  |> filter(fn: (r) => r.host =~ /^${host}$/)
  |> aggregateWindow(every: v.windowPeriod, fn: mean)
```

## Real-World Use Cases

### 1. Infrastructure Monitoring

**Scenario**: Monitor CPU, memory, disk, network across 100+ servers

**Solution**:
- Use Telegraf agents on each server
- Collect system metrics every 10s
- Downsample to 1m averages after 7 days
- Visualize in Grafana with alerting

**Telegraf config:**
```toml
[[inputs.cpu]]
[[inputs.mem]]
[[inputs.disk]]
[[inputs.diskio]]
[[inputs.net]]
[[inputs.system]]
```

### 2. IoT Sensor Data

**Scenario**: 10,000 IoT devices sending temperature/humidity every 1 minute

**Solution**:
- MQTT broker receives sensor data
- Telegraf consumes MQTT topics
- Write to InfluxDB with device tags
- Create alerts for out-of-range values

**Telegraf MQTT input:**
```toml
[[inputs.mqtt_consumer]]
  servers = ["tcp://mqtt-broker:1883"]
  topics = ["sensors/#"]
  data_format = "json"
  tag_keys = ["device_id", "location"]
```

### 3. Application Performance Monitoring

**Scenario**: Track API response times, error rates, throughput

**Solution**:
- Instrument application with InfluxDB client
- Record metrics on each request
- Use tags for endpoint, method, status_code
- Create percentile queries for SLA tracking

**Python instrumentation:**
```python
import time
from influxdb_client import InfluxDBClient, Point

def track_request(endpoint, method, status_code, duration):
    point = Point("api_request") \
        .tag("endpoint", endpoint) \
        .tag("method", method) \
        .tag("status", status_code) \
        .field("duration_ms", duration)
    
    write_api.write(bucket="mybucket", record=point)

@app.route('/api/users')
def get_users():
    start = time.time()
    # ... process request ...
    duration = (time.time() - start) * 1000
    track_request("/api/users", "GET", 200, duration)
    return response
```

### 4. Financial Market Data

**Scenario**: Store stock prices, trades, and market indicators in real-time

**Solution**:
- Stream market data via WebSocket
- Write tick data with symbol tags
- Downsample to OHLC (Open, High, Low, Close) candles
- Support backtesting queries

**Example schema:**
```
trades,symbol=AAPL,exchange=NASDAQ price=150.25,volume=1000 1609459200000000000
```

### 5. DevOps CI/CD Metrics

**Scenario**: Track build times, deployment frequency, test coverage

**Solution**:
- Jenkins/GitLab CI writes metrics to InfluxDB
- Track per-project, per-branch, per-environment
- Visualize DORA metrics (deployment frequency, lead time, MTTR, change failure rate)

**Jenkins pipeline:**
```groovy
post {
    always {
        sh """
        curl -X POST 'http://influxdb:8086/api/v2/write?org=myorg&bucket=mybucket' \
          -H 'Authorization: Token ${INFLUX_TOKEN}' \
          --data-binary 'build,project=${PROJECT},branch=${BRANCH} duration=${BUILD_DURATION},status=${BUILD_STATUS}'
        """
    }
}
```

## Performance Optimization

### Write Optimization

1. **Batch Writes**: Write 5,000-10,000 points per request
2. **Use Tags Wisely**: Keep tag cardinality under 100K
3. **Avoid High-Cardinality Tags**: Don't use UUIDs, user IDs as tags
4. **Pre-sort Data**: Write data in time order when possible
5. **Use Appropriate Precision**: Nanosecond precision only if needed

### Query Optimization

1. **Use Time Ranges**: Always specify `start` and `stop` in queries
2. **Filter Early**: Apply `filter()` before `aggregateWindow()`
3. **Limit Cardinality**: Filter by specific tags
4. **Use Downsampled Data**: Query aggregated buckets for historical data
5. **Index Tags, Not Fields**: Fields cannot be efficiently filtered

### Storage Optimization

1. **Retention Policies**: Automatically delete old data
2. **Downsampling**: Aggregate high-resolution to lower-resolution
3. **Selective Measurement**: Don't store unnecessary fields
4. **Shard Duration**: Optimize based on data retention (default is good for most)

## Production Deployment Patterns

### High Availability (Enterprise)

```yaml
# docker-compose.yml for InfluxDB cluster
version: '3'
services:
  influxdb-meta-1:
    image: influxdb:1.8-meta
    environment:
      INFLUXDB_META_ENABLED: 'true'
  
  influxdb-data-1:
    image: influxdb:1.8-data
    environment:
      INFLUXDB_META_JOIN: 'influxdb-meta-1:8091'
  
  influxdb-data-2:
    image: influxdb:1.8-data
    environment:
      INFLUXDB_META_JOIN: 'influxdb-meta-1:8091'
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: influxdb
spec:
  serviceName: influxdb
  replicas: 1
  selector:
    matchLabels:
      app: influxdb
  template:
    metadata:
      labels:
        app: influxdb
    spec:
      containers:
      - name: influxdb
        image: influxdb:2.7
        ports:
        - containerPort: 8086
        env:
        - name: DOCKER_INFLUXDB_INIT_MODE
          value: "setup"
        - name: DOCKER_INFLUXDB_INIT_USERNAME
          valueFrom:
            secretKeyRef:
              name: influxdb-auth
              key: username
        - name: DOCKER_INFLUXDB_INIT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: influxdb-auth
              key: password
        - name: DOCKER_INFLUXDB_INIT_ORG
          value: "myorg"
        - name: DOCKER_INFLUXDB_INIT_BUCKET
          value: "mybucket"
        volumeMounts:
        - name: influxdb-storage
          mountPath: /var/lib/influxdb2
  volumeClaimTemplates:
  - metadata:
      name: influxdb-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 100Gi
```

### Monitoring InfluxDB Itself

```toml
# Telegraf monitoring InfluxDB
[[inputs.influxdb]]
  urls = ["http://localhost:8086/metrics"]

[[inputs.prometheus]]
  urls = ["http://localhost:8086/metrics"]
```

Monitor:
- Write throughput (points/sec)
- Query performance
- Disk usage
- Memory usage
- Shard count

## Backup and Recovery

### Backup (InfluxDB 2.x)

```bash
# Full backup
influx backup /path/to/backup -t YOUR_TOKEN

# Backup specific bucket
influx backup /path/to/backup -t YOUR_TOKEN --bucket mybucket
```

### Restore (InfluxDB 2.x)

```bash
# Full restore
influx restore /path/to/backup

# Restore specific bucket
influx restore /path/to/backup --bucket mybucket
```

### Automated Backup Script

```bash
#!/bin/bash
BACKUP_DIR="/backups/influxdb"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="${BACKUP_DIR}/${DATE}"

# Create backup
influx backup "$BACKUP_PATH" -t "$INFLUX_TOKEN"

# Compress
tar -czf "${BACKUP_PATH}.tar.gz" -C "$BACKUP_DIR" "$DATE"
rm -rf "$BACKUP_PATH"

# Delete backups older than 30 days
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete
```

## Security Best Practices

1. **Authentication**: Always enable authentication
2. **HTTPS**: Use TLS for production deployments
3. **Token Management**: Rotate tokens regularly
4. **Least Privilege**: Grant minimal permissions to tokens
5. **Network Isolation**: Restrict access via firewall rules
6. **Audit Logs**: Enable and monitor audit logging (Enterprise)

### Enable HTTPS

```bash
# Generate self-signed certificate (for testing)
openssl req -x509 -nodes -newkey rsa:2048 \
  -keyout /etc/ssl/influxdb.key \
  -out /etc/ssl/influxdb.crt \
  -days 365

# influxdb.conf
[http]
  https-enabled = true
  https-certificate = "/etc/ssl/influxdb.crt"
  https-private-key = "/etc/ssl/influxdb.key"
```

## Troubleshooting

### High Memory Usage

**Symptom**: InfluxDB consuming excessive RAM

**Solutions**:
- Reduce `max-series-per-database` limit
- Decrease `max-values-per-tag`
- Lower tag cardinality
- Increase shard duration to reduce shard count

### Slow Queries

**Symptom**: Queries taking too long

**Solutions**:
- Add time range filters
- Reduce query time span
- Use downsampled data for historical queries
- Add indexes on commonly filtered tags
- Use `EXPLAIN` to analyze query plans (InfluxDB 2.x)

### Write Failures

**Symptom**: Points not being written

**Solutions**:
- Check disk space
- Verify authentication token
- Check precision mismatch
- Review error logs: `/var/log/influxdb/`

### High Cardinality

**Symptom**: Performance degradation over time

**Solutions**:
- Identify high-cardinality tags: `SHOW TAG KEY CARDINALITY`
- Convert problematic tags to fields
- Drop unused measurements/series
- Recreate database with better schema design

## Migration Guide

### From InfluxDB 1.x to 2.x

```bash
# Upgrade helper
influx upgrade \
  --username admin \
  --password mypassword \
  --org myorg \
  --bucket mybucket \
  --retention 30d \
  --v1-db-path /var/lib/influxdb
```

### From Prometheus to InfluxDB

Use Telegraf with Prometheus input:

```toml
[[inputs.prometheus]]
  urls = ["http://localhost:9090/metrics"]

[[outputs.influxdb_v2]]
  urls = ["http://localhost:8086"]
  token = "YOUR_TOKEN"
  organization = "myorg"
  bucket = "prometheus_metrics"
```

## Best Practices

1. **Schema Design**
   - Use tags for metadata you'll filter/group by
   - Use fields for actual measured values
   - Keep tag cardinality reasonable (<100K unique combinations)
   - Avoid high-cardinality tags (UUIDs, timestamps, random strings)

2. **Write Patterns**
   - Batch writes (5K-10K points per request)
   - Write points in chronological order
   - Use appropriate timestamp precision
   - Handle backpressure and retries in clients

3. **Query Patterns**
   - Always specify time ranges
   - Filter early in Flux pipelines
   - Use downsampled data for long time ranges
   - Limit result sets with `limit()`

4. **Retention & Downsampling**
   - Define retention policies based on business needs
   - Downsample high-resolution data automatically
   - Archive cold data to object storage if needed

5. **Monitoring**
   - Monitor InfluxDB's own metrics
   - Set up alerts for write/query failures
   - Track disk usage and plan capacity
   - Monitor cardinality growth

6. **Security**
   - Enable authentication
   - Use HTTPS in production
   - Rotate tokens regularly
   - Apply network firewalls

## Common Pitfalls

❌ **Using fields as tags**: Fields cannot be efficiently filtered
❌ **High tag cardinality**: Causes memory bloat and slow queries
❌ **No time range in queries**: Scans entire database
❌ **Storing strings as fields**: Use tags for strings you'll filter on
❌ **Not batching writes**: Individual writes waste network overhead
❌ **Ignoring retention policies**: Database grows indefinitely
❌ **Over-aggregation**: Losing too much detail in downsampling

## InfluxDB Ecosystem

### TICK Stack

- **Telegraf**: Metrics collection agent
- **InfluxDB**: Time-series database
- **Chronograf**: Visualization and dashboarding
- **Kapacitor**: Real-time streaming data processing and alerting

### Integrations

- **Grafana**: Advanced visualization
- **Kubernetes**: StatefulSet deployments
- **Apache Kafka**: Stream processing integration
- **Spark**: Batch analytics
- **Prometheus**: Metrics migration
- **MQTT**: IoT data ingestion

## Resources

- Official Documentation: https://docs.influxdata.com/
- InfluxDB University: https://university.influxdata.com/
- Community Forums: https://community.influxdata.com/
- GitHub: https://github.com/influxdata/influxdb
- Flux Language: https://docs.influxdata.com/flux/
- Telegraf Plugins: https://docs.influxdata.com/telegraf/latest/plugins/
- InfluxDB Cloud: https://www.influxdata.com/products/influxdb-cloud/

## Quick Reference

### CLI Commands (InfluxDB 2.x)

```bash
# Setup
influx setup

# Auth
influx auth create --org myorg --all-access
influx auth list

# Buckets
influx bucket create --name mybucket --org myorg --retention 30d
influx bucket list

# Write
influx write --bucket mybucket --precision s 'measurement,tag=value field=123'

# Query
influx query 'from(bucket:"mybucket") |> range(start:-1h)'

# Backup/Restore
influx backup /path/to/backup
influx restore /path/to/backup
```

### Line Protocol Format

```
measurement,tag1=value1,tag2=value2 field1=value1,field2=value2 timestamp
```

Example:
```
weather,location=us-midwest,season=summer temperature=82,humidity=65 1465839830100400200
```

---

*Last Updated: February 2026*
