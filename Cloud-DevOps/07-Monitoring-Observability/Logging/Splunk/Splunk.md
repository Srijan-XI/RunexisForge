# Splunk

## Introduction

Splunk is an enterprise platform for searching, monitoring, and analyzing machine-generated big data through a web-style interface. It helps organizations gain operational intelligence, security insights, and business analytics from any source of data at any scale.

## Why Splunk?

- **Universal Data Collection**: Ingest any data from any source
- **Real-Time Search**: Query petabytes of data in seconds
- **Machine Learning**: Built-in ML algorithms for anomaly detection
- **Security Operations**: SIEM capabilities with Splunk Enterprise Security
- **Scalability**: Handles massive data volumes (petabytes daily)
- **Ecosystem**: 2000+ apps and integrations
- **Compliance**: Meets SOC 2, HIPAA, PCI-DSS requirements
- **On-Premises or Cloud**: Flexible deployment options

## Key Features

### Data Ingestion
- Universal Forwarders
- Heavy Forwarders
- HTTP Event Collector (HEC)
- Syslog ingestion
- Database inputs
- Cloud API integrations
- File monitoring

### Search and Investigation
- Splunk Processing Language (SPL)
- Real-time and historical searches
- Field extraction
- Lookups and enrichment
- Statistics and transformations
- Subsearches and joins

### Dashboards and Visualization
- Interactive dashboards
- Real-time charts and graphs
- Custom visualizations
- Dashboard Studio
- Mobile-responsive layouts

### Alerting and Monitoring
- Scheduled searches
- Real-time alerts
- Throttling and suppression
- Alert actions (email, webhook, scripts)
- Integration with PagerDuty, Slack, etc.

### Machine Learning
- Outlier detection
- Predictive analytics
- Forecasting
- Clustering
- Natural language processing

## Splunk Products

| Product | Purpose | Use Case |
|---------|---------|----------|
| **Splunk Enterprise** | Core platform | Log management, monitoring |
| **Splunk Cloud** | SaaS platform | Cloud-native, managed service |
| **Splunk Enterprise Security** | SIEM | Security operations, threat detection |
| **Splunk IT Service Intelligence (ITSI)** | AIOps | Service monitoring, KPI tracking |
| **Splunk Observability Cloud** | APM & Infrastructure | Full-stack observability |
| **Splunk Phantom** | SOAR | Security orchestration, automation |

## Splunk vs Competitors

| Feature | Splunk | ELK Stack | Datadog | New Relic |
|---------|--------|-----------|---------|-----------|
| Data Ingestion | ✅ Any source | ✅ Strong | ✅ Good | ✅ Good |
| Search Power | ✅ Excellent | ✅ Good | ✅ Limited | ✅ Limited |
| Scalability | ✅ Petabyte+ | ✅ Good | ✅ Good | ✅ Good |
| Machine Learning | ✅ Built-in | ➕ Add-on | ✅ Good | ✅ Good |
| Security (SIEM) | ✅ Excellent | ✅ Good | ❌ Limited | ❌ Limited |
| Pricing | 💰 High | Free (OSS) | 💰 Medium | 💰 Medium |
| Learning Curve | High | High | Medium | Low |
| On-Premises | ✅ Yes | ✅ Yes | ❌ No | ❌ No |

## When to Use Splunk

✅ **Use Splunk when:**
- Need enterprise-grade log management
- Require powerful search across massive datasets
- Security operations and SIEM capabilities critical
- On-premises deployment required
- Compliance requirements demand data sovereignty
- Need advanced analytics and machine learning
- Have complex data sources and formats
- Budget supports enterprise pricing

❌ **Consider alternatives when:**
- Budget is limited (use ELK stack)
- Simple application monitoring (Datadog, New Relic)
- Cloud-only deployment desired
- Primarily need APM (not log-focused)
- Smaller data volumes (<1 TB/day)

## User Guide

## Getting Started

### Installation Options

**Splunk Enterprise (On-Premises):**
1. Download from: https://www.splunk.com/download
2. Free trial: 60 days, 500 MB/day
3. Free license: 500 MB/day forever

**Splunk Cloud:**
- SaaS offering
- Managed infrastructure
- Automatic updates

### Install Splunk Enterprise (Linux)

```bash
# Download
wget -O splunk-9.1.0-linux-x86_64.tgz \
  'https://download.splunk.com/products/splunk/releases/9.1.0/linux/splunk-9.1.0-1c86ca0bacc3-Linux-x86_64.tgz'

# Extract
tar xvzf splunk-9.1.0-linux-x86_64.tgz -C /opt

# Start Splunk (first time)
cd /opt/splunk/bin
sudo ./splunk start --accept-license

# Create admin credentials when prompted
# Username: admin
# Password: <your-secure-password>

# Enable boot start
sudo ./splunk enable boot-start
```

### Install Splunk Enterprise (Docker)

```bash
docker run -d \
  -p 8000:8000 \
  -p 8088:8088 \
  -p 9997:9997 \
  -e SPLUNK_START_ARGS='--accept-license' \
  -e SPLUNK_PASSWORD='<password>' \
  -e SPLUNK_HEC_TOKEN='<your-hec-token>' \
  --name splunk \
  splunk/splunk:latest
```

### Docker Compose

```yaml
version: '3.8'
services:
  splunk:
    image: splunk/splunk:latest
    container_name: splunk
    environment:
      - SPLUNK_START_ARGS=--accept-license
      - SPLUNK_PASSWORD=ChangeMe123!
      - SPLUNK_HEC_TOKEN=my-hec-token-12345
    ports:
      - "8000:8000"   # Web UI
      - "8088:8088"   # HTTP Event Collector
      - "9997:9997"   # Splunk forwarder
      - "514:514"     # Syslog TCP
      - "514:514/udp" # Syslog UDP
    volumes:
      - splunk-etc:/opt/splunk/etc
      - splunk-var:/opt/splunk/var

volumes:
  splunk-etc:
  splunk-var:
```

### Access Web UI

Navigate to: `http://localhost:8000`
- Username: `admin`
- Password: <password you set>

## Data Input Methods

### 1. Universal Forwarder

**Install Universal Forwarder:**

```bash
# Linux
wget -O splunkforwarder-9.1.0-linux-x86_64.tgz \
  'https://download.splunk.com/products/universalforwarder/releases/9.1.0/linux/splunkforwarder-9.1.0-1c86ca0bacc3-Linux-x86_64.tgz'

tar xvzf splunkforwarder-9.1.0-linux-x86_64.tgz -C /opt

cd /opt/splunkforwarder/bin
sudo ./splunk start --accept-license

# Set deployment server (optional)
sudo ./splunk set deploy-poll <deployment-server>:8089
```

**Configure Forwarder (inputs.conf):**

```ini
# /opt/splunkforwarder/etc/system/local/inputs.conf

[monitor:///var/log/myapp/*.log]
disabled = false
index = main
sourcetype = myapp:log
host = production-server-01

[monitor:///var/log/nginx/access.log]
disabled = false
index = web
sourcetype = nginx:access

[monitor:///var/log/nginx/error.log]
disabled = false
index = web
sourcetype = nginx:error
```

**Configure Output (outputs.conf):**

```ini
# /opt/splunkforwarder/etc/system/local/outputs.conf

[tcpout]
defaultGroup = primary_indexers

[tcpout:primary_indexers]
server = splunk-indexer:9997
compressed = true
```

**Restart forwarder:**

```bash
sudo /opt/splunkforwarder/bin/splunk restart
```

### 2. HTTP Event Collector (HEC)

**Enable HEC in Splunk:**
1. Settings > Data inputs > HTTP Event Collector
2. Click "New Token"
3. Set source, index, sourcetype
4. Copy token

**Send events via HTTP:**

```bash
# Simple event
curl -k https://splunk-server:8088/services/collector/event \
  -H "Authorization: Splunk your-hec-token" \
  -d '{
    "event": "Hello World",
    "sourcetype": "manual",
    "source": "curl",
    "host": "myhost"
  }'

# Structured event
curl -k https://splunk-server:8088/services/collector/event \
  -H "Authorization: Splunk your-hec-token" \
  -d '{
    "time": 1638360000,
    "event": {
      "message": "User login",
      "user_id": "12345",
      "ip": "192.168.1.100",
      "status": "success"
    },
    "sourcetype": "app:login",
    "index": "main"
  }'
```

**Node.js HEC Client:**

```javascript
const splunk = require('splunk-logging');

const Logger = new splunk.Logger({
  token: 'your-hec-token',
  url: 'https://splunk-server:8088'
});

// Configure metadata
const payload = {
  message: {
    level: 'info',
    event: 'User logged in',
    userId: '12345',
    timestamp: new Date().toISOString()
  },
  severity: 'info',
  metadata: {
    source: 'myapp',
    sourcetype: 'application-logs',
    index: 'main',
    host: 'production-server'
  }
};

Logger.send(payload, function(err, resp, body) {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Logged to Splunk');
  }
});
```

**Python HEC Client:**

```python
import requests
import json
import time

SPLUNK_HEC_URL = "https://splunk-server:8088/services/collector/event"
SPLUNK_HEC_TOKEN = "your-hec-token"

def send_to_splunk(event_data):
    headers = {
        "Authorization": f"Splunk {SPLUNK_HEC_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "time": int(time.time()),
        "event": event_data,
        "sourcetype": "python:app",
        "index": "main"
    }
    
    response = requests.post(
        SPLUNK_HEC_URL,
        headers=headers,
        data=json.dumps(payload),
        verify=False
    )
    
    return response.status_code == 200

# Usage
send_to_splunk({
    "level": "info",
    "message": "Processing completed",
    "user_id": "12345",
    "duration_ms": 245
})
```

### 3. Syslog Input

**Configure Syslog Input:**

```bash
# Via CLI
/opt/splunk/bin/splunk add tcp 514 -sourcetype syslog -index main

# Or via UI: Settings > Data inputs > TCP > New Local TCP
```

**inputs.conf:**

```ini
[tcp://514]
connection_host = dns
sourcetype = syslog
index = main

[udp://514]
connection_host = dns
sourcetype = syslog
index = main
```

### 4. File Monitoring

**inputs.conf:**

```ini
[monitor:///var/log/application.log]
disabled = false
index = main
sourcetype = app:log
# Recursive monitoring
recursive = false
# Only monitor files matching pattern
whitelist = \.log$
# Ignore files matching pattern
blacklist = \.gz$
```

### 5. Database Input (DB Connect)

**Install Splunk DB Connect app from Splunkbase**

**Configure database connection:**

```sql
-- Example query
SELECT 
  order_id,
  customer_id,
  order_total,
  order_date
FROM orders
WHERE order_date > ?
```

**Schedule query execution:**
- Interval: */5 * * * * (every 5 minutes)
- Rising column: order_date
- Index: database

## Splunk Processing Language (SPL)

### Basic Search

```spl
# Search all events
index=main

# Search specific sourcetype
index=main sourcetype=access_combined

# Search with time range
index=main earliest=-24h latest=now

# Search with wildcards
index=main error OR fail* OR exception

# Field search
index=main status=500 user="john@example.com"

# Boolean operators
index=main (status=500 OR status=503) AND method=POST
```

### Field Extraction

```spl
# Automatic field extraction (KV pairs)
index=main | kv

# Regex extraction
index=main | rex field=_raw "user_id=(?<user_id>\d+)"

# Multiple extractions
index=main 
| rex field=_raw "status=(?<status>\d+)"
| rex field=_raw "duration=(?<duration>\d+)"

# Parse JSON
index=main sourcetype=json | spath
```

### Statistics and Aggregations

```spl
# Count events
index=main | stats count

# Count by field
index=main | stats count by status

# Multiple aggregations
index=main 
| stats count, avg(response_time), max(response_time) by host

# Percentiles
index=main 
| stats perc50(response_time), perc95(response_time), perc99(response_time)

# Distinct count
index=main | stats dc(user_id) as unique_users

# Values (unique list)
index=main | stats values(user_id) as user_list
```

### Timecharts

```spl
# Events over time
index=main | timechart count

# Average response time over time
index=main | timechart avg(response_time) by host

# Span (bucket size)
index=main | timechart span=1h count by status

# Multi-series
index=main 
| timechart span=5m avg(cpu_usage) by server
```

### Filtering and Transforming

```spl
# Where clause
index=main | where response_time > 1000

# Search command
index=main | search status=500

# Eval (create/modify fields)
index=main 
| eval response_time_s = response_time / 1000
| eval is_slow = if(response_time > 1000, "slow", "fast")

# Convert field type
index=main | eval response_time = tonumber(response_time)

# String operations
index=main 
| eval upper_method = upper(method)
| eval contains_error = if(like(_raw, "%error%"), 1, 0)
```

### Sorting and Limiting

```spl
# Sort ascending
index=main | stats count by host | sort count

# Sort descending
index=main | stats count by host | sort -count

# Limit results
index=main | head 100

# Tail (last events)
index=main | tail 20

# Top values
index=main | top limit=10 user_id
```

### Lookups and Enrichment

```spl
# Lookup from CSV
index=main 
| lookup user_info.csv user_id OUTPUT username, email

# Automatic lookup (configured in props.conf)
index=main
# user info automatically added

# Outputlookup (create lookup table)
index=main 
| stats count by ip 
| outputlookup ip_counts.csv
```

### Subsearches

```spl
# Find IPs with errors, then find all events from those IPs
index=main 
[ search index=main error 
  | stats count by ip 
  | fields ip ]

# Find top users by request count, then get their details
index=main 
| stats count by user_id 
| sort -count 
| head 10
| join user_id [search index=users | fields user_id, username, email]
```

### Advanced Searches

```spl
# Transaction (group related events)
index=main 
| transaction session_id maxspan=30m
| where duration > 10

# Detect anomalies
index=main 
| timechart span=1h avg(response_time) as avg_response
| predict avg_response as predicted
| eval anomaly = if(abs(avg_response - predicted) > 100, 1, 0)

# Rare events
index=main | rare limit=20 error_message

# Geostats (map visualization)
index=main 
| iplocation src_ip
| geostats count by Country
```

## Dashboards

### Create Dashboard via UI

1. Search > Save As > Dashboard Panel
2. Edit Dashboard > Add Panel
3. Configure visualization type
4. Set refresh interval

### Dashboard XML

```xml
<dashboard>
  <label>Application Monitoring</label>
  <description>Real-time application metrics</description>
  
  <row>
    <panel>
      <title>Request Rate</title>
      <chart>
        <search>
          <query>index=main sourcetype=access_combined | timechart span=1m count</query>
          <earliest>-60m@m</earliest>
          <latest>now</latest>
          <refresh>30s</refresh>
        </search>
        <option name="charting.chart">line</option>
        <option name="charting.axisLabelsX.majorLabelStyle.rotation">0</option>
      </chart>
    </panel>
    
    <panel>
      <title>Error Rate</title>
      <single>
        <search>
          <query>
            index=main status>=500 
            | stats count as errors 
            | appendcols [search index=main | stats count as total] 
            | eval error_rate = round((errors/total) * 100, 2)
            | fields error_rate
          </query>
          <earliest>-5m@m</earliest>
          <latest>now</latest>
          <refresh>1m</refresh>
        </search>
        <option name="rangeColors">["0x65A637","0xF7BC38","0xF58F39","0xD93F3C"]</option>
        <option name="rangeValues">[0,1,5,10]</option>
        <option name="underLabel">Error %</option>
      </single>
    </panel>
  </row>
  
  <row>
    <panel>
      <title>Top URLs by Requests</title>
      <table>
        <search>
          <query>
            index=main sourcetype=access_combined 
            | stats count, avg(response_time) as avg_time by uri 
            | sort -count 
            | head 10
          </query>
          <earliest>-1h@h</earliest>
          <latest>now</latest>
        </search>
      </table>
    </panel>
  </row>
</dashboard>
```

### Dashboard Studio (New)

```json
{
  "dataSources": {
    "ds_requests": {
      "type": "ds.search",
      "options": {
        "query": "index=main | timechart count",
        "queryParameters": {
          "earliest": "-60m@m",
          "latest": "now"
        }
      }
    }
  },
  "visualizations": {
    "viz_line_chart": {
      "type": "viz.line",
      "dataSources": {
        "primary": "ds_requests"
      },
      "options": {
        "yAxisTitleText": "Request Count"
      }
    }
  },
  "layout": {
    "type": "absolute",
    "options": {
      "width": 1440,
      "height": 960
    },
    "structure": [
      {
        "item": "viz_line_chart",
        "type": "block",
        "position": {
          "x": 0,
          "y": 0,
          "w": 1200,
          "h": 400
        }
      }
    ]
  }
}
```

## Alerts

### Create Alert via UI

1. Save search as Alert
2. Set trigger condition
3. Configure alert actions

### Alert Configuration (savedsearches.conf)

```ini
[High Error Rate Alert]
search = index=main status>=500 | stats count as errors | where errors > 100
cron_schedule = */5 * * * *
enableSched = 1
dispatch.earliest_time = -5m
dispatch.latest_time = now

# Alert trigger
alert.expires = 24h
alert.severity = 3
alert.suppress = 1
alert.suppress.period = 10m
alert.track = 1

# Actions
action.email = 1
action.email.to = ops-team@example.com
action.email.subject = Splunk Alert: High Error Rate
action.email.message.alert = High error rate detected: $result.errors$ errors in last 5 minutes

action.webhook = 1
action.webhook.param.url = https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### Throttling

```ini
# Suppress duplicate alerts
alert.suppress = 1
alert.suppress.period = 1h
alert.suppress.fields = host,error_type
```

### Advanced Alert Actions

**Custom webhook:**

```bash
# webhook.py script
import sys
import json
import requests

# Read alert results from stdin
results = json.loads(sys.stdin.read())

# Send to external system
for result in results:
    payload = {
        "alert_name": result.get("alert_name"),
        "host": result.get("host"),
        "error_count": result.get("error_count")
    }
    
    requests.post(
        "https://api.example.com/alerts",
        json=payload,
        headers={"Authorization": "Bearer token"}
    )
```

## Machine Learning Toolkit

### Install MLTK App

Download from Splunkbase: Machine Learning Toolkit

### Anomaly Detection

```spl
# Detect CPU anomalies
index=main sourcetype=cpu 
| timechart span=5m avg(cpu_percent) as cpu 
| predict cpu algorithm=LLP future_timespan=10 
| eval anomaly = if(abs(cpu - prediction(cpu)) > 20, 1, 0)
| where anomaly=1
```

### Clustering

```spl
# Cluster similar error messages
index=main error 
| fields error_message 
| fit KMeans error_message k=5
```

### Forecasting

```spl
# Forecast disk usage
index=main sourcetype=disk_usage 
| timechart span=1d avg(disk_used_percent) as usage 
| predict usage algorithm=LLP5 future_timespan=30 
| fields _time, usage, prediction(usage), upper95(prediction(usage)), lower95(prediction(usage))
```

### Outlier Detection

```spl
# Detect unusual request patterns
index=main 
| stats count by user_id 
| fit DensityFunction count into user_request_model
| apply user_request_model 
| where IsOutlier > 0
```

## Best Practices

### Data Management

- ✅ Use appropriate indexes for different data types
- ✅ Set retention policies per index
- ✅ Configure data model acceleration
- ✅ Use summary indexing for expensive searches
- ✅ Archive old data to cheaper storage
- ✅ Monitor license usage regularly
- ✅ Implement data routing (Heavy Forwarders)

### Search Optimization

- ✅ Always specify time range
- ✅ Use index and sourcetype in search base
- ✅ Filter early, transform late
- ✅ Use tstats for accelerated searches
- ✅ Avoid wildcards at start of search terms
- ✅ Use statistical commands instead of transaction when possible
- ✅ Cache frequently used searches

### Performance

- ✅ Distribute search load across search heads
- ✅ Use indexer clustering for high availability
- ✅ Configure search head clustering for scale
- ✅ Implement SmartStore for S3/cloud storage
- ✅ Monitor resource usage (CPU, memory, disk I/O)
- ✅ Tune search quotas and concurrency
- ✅ Use search job pooling

### Security

- ✅ Enable SSL/TLS for all communications
- ✅ Implement role-based access control (RBAC)
- ✅ Use LDAP/SAML for authentication
- ✅ Encrypt data at rest
- ✅ Mask sensitive fields (PII)
- ✅ Audit configuration changes
- ✅ Restrict network access (firewall rules)
- ✅ Regular security updates

## Splunk Architecture

### Components

**Indexer:**
- Processes and stores data
- Handles search requests
- Serves search results

**Search Head:**
- User interface
- Distributes searches to indexers
- Merges and presents results

**Forwarder:**
- Universal Forwarder (lightweight)
- Heavy Forwarder (parsing, filtering)

**Deployment Server:**
- Manages forwarder configurations
- Distributes apps and configurations

**License Master:**
- Tracks license usage
- Enforces quotas

### Clustering

**Indexer Cluster:**
```
Search Factor (SF): Number of searchable copies
Replication Factor (RF): Total copies of data
Recommended: SF=2, RF=3
```

**Search Head Cluster:**
```
3+ search heads
Shared configurations
Load balancing
```

## Real-World Use Cases

### Application Monitoring

```spl
# Real-time request monitoring
index=web sourcetype=access_combined 
| stats count as requests, 
        avg(response_time) as avg_time,
        perc95(response_time) as p95_time,
        sum(eval(if(status>=500, 1, 0))) as errors 
  by uri
| eval error_rate = round((errors/requests)*100, 2)
| where error_rate > 1
| sort -error_rate
```

### Security Monitoring (Failed Logins)

```spl
# Detect brute force attacks
index=auth action=failed 
| stats count as failed_attempts by src_ip, user 
| where failed_attempts > 10
| sort -failed_attempts
```

### Infrastructure Monitoring

```spl
# CPU usage alert
index=os sourcetype=cpu 
| stats avg(cpu_percent) as avg_cpu by host 
| where avg_cpu > 80
| eval severity = case(avg_cpu > 95, "critical", avg_cpu > 80, "warning")
```

### Business Analytics

```spl
# Revenue tracking
index=orders 
| stats sum(order_total) as revenue, count as order_count by product_category 
| eval avg_order_value = round(revenue / order_count, 2)
| sort -revenue
```

## Splunk Apps

Popular apps from Splunkbase:

- **Splunk App for Infrastructure**: Pre-built dashboards
- **Machine Learning Toolkit**: AI/ML capabilities
- **Python for Scientific Computing**: Advanced analytics
- **Splunk DB Connect**: Database integration
- **Splunk Add-on for AWS**: AWS services monitoring
- **Splunk Add-on for Microsoft Cloud Services**: Azure monitoring

## Troubleshooting

### Search Performance Issues

```spl
# Check search job inspector
# Click "Job" > "Inspect Job"

# Identify slow searches
index=_audit action=search 
| stats avg(total_run_time) as avg_time, count by search 
| where avg_time > 30 
| sort -avg_time

# Check indexer performance
index=_introspection component=Hostwide 
| stats avg(data.cpu_system_pct) as avg_cpu by host
```

### Forwarder Not Sending Data

```bash
# Check forwarder status
/opt/splunkforwarder/bin/splunk list forward-server

# Test connectivity
/opt/splunkforwarder/bin/splunk show splunkd-port
telnet <splunk-server> 9997

# Check internal logs
index=_internal source=*splunkd.log* host=<forwarder-host> ERROR
```

### License Usage Issues

```spl
# Check license usage
index=_internal source=*license_usage.log* 
| stats sum(b) as bytes by idx 
| eval GB = round(bytes/1024/1024/1024, 2) 
| sort -GB
```

## References

- **Documentation**: https://docs.splunk.com/
- **Splunk Education**: https://education.splunk.com/
- **Splunkbase (Apps)**: https://splunkbase.splunk.com/
- **Splunk Answers**: https://community.splunk.com/
- **GitHub**: https://github.com/splunk
- **Quick Reference**: https://www.splunk.com/pdfs/solution-guides/splunk-quick-reference-guide.pdf

---

## See Also

- [ELK Stack](../ELK-OpenSearch/ELK-OpenSearch.md)
- [Loki Logging](../Loki/Loki.md)
- [Datadog Logs](../../APM/Datadog/Datadog.md)
- [New Relic Logs](../../APM/New-Relic/New-Relic.md)
