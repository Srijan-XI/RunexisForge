# Alertmanager

## Introduction

### What is Alertmanager?

Alertmanager is the component of the Prometheus ecosystem that handles alerts sent by Prometheus servers. It takes care of deduplicating, grouping, and routing alerts to the correct receiver integrations such as email, PagerDuty, Slack, webhooks, and more. It also handles silencing and inhibition of alerts.

### Why Alertmanager?

- Alert deduplication
- Alert grouping
- Alert routing
- Silencing alerts
- Inhibition rules
- High availability clustering
- Multiple receiver integrations
- Template-based notifications
- Alert lifecycle management
- Time-based muting

## Prerequisites

- Prometheus server configured
- Basic understanding of Prometheus alerts
- YAML configuration knowledge
- Receiver endpoint credentials (SMTP, Slack, PagerDuty, etc.)

## Installation

### Binary Installation

```bash
# Download Alertmanager
wget https://github.com/prometheus/alertmanager/releases/download/v0.26.0/alertmanager-0.26.0.linux-amd64.tar.gz

# Extract
tar xvfz alertmanager-0.26.0.linux-amd64.tar.gz
cd alertmanager-0.26.0.linux-amd64

# Run Alertmanager
./alertmanager --config.file=alertmanager.yml
```

### Docker

```bash
# Run Alertmanager
docker run -d \
  -p 9093:9093 \
  -v /path/to/alertmanager.yml:/etc/alertmanager/alertmanager.yml \
  --name alertmanager \
  prom/alertmanager

# Access UI
http://localhost:9093
```

### Docker Compose

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/usr/share/prometheus/console_libraries'
      - '--web.console.templates=/usr/share/prometheus/consoles'
    
  alertmanager:
    image: prom/alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml
      - alertmanager-data:/alertmanager
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'
      - '--storage.path=/alertmanager'

volumes:
  alertmanager-data:
```

### Kubernetes

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: alertmanager-config
data:
  alertmanager.yml: |
    global:
      resolve_timeout: 5m
    route:
      receiver: 'default'
      group_wait: 10s
      group_interval: 10s
      repeat_interval: 12h
    receivers:
      - name: 'default'
        slack_configs:
          - api_url: 'YOUR_SLACK_WEBHOOK_URL'
            channel: '#alerts'
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: alertmanager
spec:
  replicas: 1
  selector:
    matchLabels:
      app: alertmanager
  template:
    metadata:
      labels:
        app: alertmanager
    spec:
      containers:
      - name: alertmanager
        image: prom/alertmanager:v0.26.0
        args:
          - '--config.file=/etc/alertmanager/alertmanager.yml'
          - '--storage.path=/alertmanager'
        ports:
        - containerPort: 9093
        volumeMounts:
        - name: config
          mountPath: /etc/alertmanager
      volumes:
      - name: config
        configMap:
          name: alertmanager-config
---
apiVersion: v1
kind: Service
metadata:
  name: alertmanager
spec:
  selector:
    app: alertmanager
  ports:
  - port: 9093
    targetPort: 9093
```

## Configuration

### Basic Configuration

```yaml
# alertmanager.yml
global:
  resolve_timeout: 5m
  smtp_smarthost: 'smtp.gmail.com:587'
  smtp_from: 'alertmanager@example.com'
  smtp_auth_username: 'alertmanager@example.com'
  smtp_auth_password: 'your-password'

route:
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  receiver: 'team-emails'
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty-critical'
      continue: true
    - match:
        severity: warning
      receiver: 'slack-warnings'

receivers:
  - name: 'team-emails'
    email_configs:
      - to: 'team@example.com'

  - name: 'pagerduty-critical'
    pagerduty_configs:
      - service_key: 'YOUR_PAGERDUTY_KEY'
        description: '{{ .GroupLabels.alertname }}'

  - name: 'slack-warnings'
    slack_configs:
      - api_url: 'YOUR_SLACK_WEBHOOK_URL'
        channel: '#alerts'
        title: 'Alert: {{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'instance']
```

## Routing

### Route Matching

```yaml
route:
  receiver: 'default'
  group_by: ['alertname']
  
  routes:
    # Critical alerts to PagerDuty
    - match:
        severity: critical
      receiver: 'pagerduty'
      group_wait: 10s
      repeat_interval: 5m
    
    # Database alerts to database team
    - match:
        team: database
      receiver: 'database-team'
      group_by: ['alertname', 'instance']
    
    # Match using regex
    - match_re:
        service: ^(api|web)$
      receiver: 'backend-team'
    
    # Nested routes
    - match:
        severity: warning
      receiver: 'slack-warnings'
      routes:
        - match:
            team: frontend
          receiver: 'frontend-slack'
        - match:
            team: backend
          receiver: 'backend-slack'
```

### Continue Flag

```yaml
route:
  receiver: 'default'
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty'
      continue: true  # Continue to evaluate other routes
    
    - match:
        severity: critical
      receiver: 'email-all'  # Also send email
```

## Receivers

### Email

```yaml
receivers:
  - name: 'email'
    email_configs:
      - to: 'team@example.com'
        from: 'alertmanager@example.com'
        smarthost: 'smtp.gmail.com:587'
        auth_username: 'alertmanager@example.com'
        auth_password: 'your-password'
        headers:
          Subject: 'Alert: {{ .GroupLabels.alertname }}'
        html: |
          <!DOCTYPE html>
          <html>
          <body>
            <h2>Alert: {{ .GroupLabels.alertname }}</h2>
            {{ range .Alerts }}
              <h3>{{ .Labels.instance }}</h3>
              <p>{{ .Annotations.description }}</p>
              <p>Started: {{ .StartsAt }}</p>
            {{ end }}
          </body>
          </html>
```

### Slack

```yaml
receivers:
  - name: 'slack'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL'
        channel: '#alerts'
        username: 'Alertmanager'
        icon_emoji: ':warning:'
        title: '{{ range .Alerts }}{{ .Labels.alertname }}{{ end }}'
        text: |
          {{ range .Alerts }}
          *Alert:* {{ .Labels.alertname }}
          *Severity:* {{ .Labels.severity }}
          *Instance:* {{ .Labels.instance }}
          *Description:* {{ .Annotations.description }}
          *Details:* {{ .Annotations.summary }}
          {{ end }}
        color: '{{ if eq .Status "firing" }}danger{{ else }}good{{ end }}'
        send_resolved: true
```

### PagerDuty

```yaml
receivers:
  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: 'YOUR_PAGERDUTY_INTEGRATION_KEY'
        description: '{{ .GroupLabels.alertname }}'
        details:
          firing: '{{ .Alerts.Firing | len }}'
          resolved: '{{ .Alerts.Resolved | len }}'
          instance: '{{ .GroupLabels.instance }}'
```

### Webhook

```yaml
receivers:
  - name: 'webhook'
    webhook_configs:
      - url: 'http://myapp.com/alerts'
        send_resolved: true
        http_config:
          basic_auth:
            username: 'alertmanager'
            password: 'secret'
```

### Microsoft Teams

```yaml
receivers:
  - name: 'teams'
    webhook_configs:
      - url: 'YOUR_TEAMS_WEBHOOK_URL'
        send_resolved: true
```

### OpsGenie

```yaml
receivers:
  - name: 'opsgenie'
    opsgenie_configs:
      - api_key: 'YOUR_OPSGENIE_API_KEY'
        description: '{{ .GroupLabels.alertname }}'
        message: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
        priority: '{{ if eq .Labels.severity "critical" }}P1{{ else }}P3{{ end }}'
```

## Grouping

```yaml
route:
  # Group by cluster and alertname
  group_by: ['cluster', 'alertname']
  
  # Wait 30 seconds before sending first notification
  group_wait: 30s
  
  # Wait 5 minutes before sending update if new alerts arrive
  group_interval: 5m
  
  # Resend notification every 3 hours if alert is still firing
  repeat_interval: 3h
```

## Silencing

### Via UI

```
1. Open http://localhost:9093
2. Click "Silences"
3. Click "New Silence"
4. Add matchers (e.g., alertname=HighMemory)
5. Set duration
6. Add comment
7. Create
```

### Via amtool CLI

```bash
# Install amtool
go install github.com/prometheus/alertmanager/cmd/amtool@latest

# Create silence
amtool silence add \
  alertname=HighMemory \
  instance=web-1 \
  --duration=2h \
  --comment="Planned maintenance"

# List silences
amtool silence query

# Expire silence
amtool silence expire <silence-id>

# Configure amtool
cat > ~/.config/amtool/config.yml << EOF
alertmanager.url: http://localhost:9093
EOF
```

### Via API

```bash
# Create silence
curl -X POST http://localhost:9093/api/v2/silences \
  -H 'Content-Type: application/json' \
  -d '{
    "matchers": [
      {
        "name": "alertname",
        "value": "HighMemory",
        "isRegex": false
      }
    ],
    "startsAt": "2026-01-18T12:00:00Z",
    "endsAt": "2026-01-18T14:00:00Z",
    "createdBy": "admin",
    "comment": "Planned maintenance"
  }'

# List silences
curl http://localhost:9093/api/v2/silences

# Delete silence
curl -X DELETE http://localhost:9093/api/v2/silence/<silence-id>
```

## Inhibition Rules

```yaml
inhibit_rules:
  # If critical alert is firing, don't send warnings for same instance
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'instance']
  
  # If instance is down, don't send other alerts for it
  - source_match:
      alertname: 'InstanceDown'
    target_match_re:
      alertname: '.*'
    equal: ['instance']
  
  # If service is down, inhibit endpoint alerts
  - source_match:
      service: 'web'
      severity: 'critical'
    target_match:
      service: 'web'
    equal: ['region']
```

## Templates

### Custom Email Template

```yaml
receivers:
  - name: 'email-custom'
    email_configs:
      - to: 'team@example.com'
        html: '{{ template "email.custom.html" . }}'

templates:
  - '/etc/alertmanager/templates/*.tmpl'
```

```html
<!-- /etc/alertmanager/templates/email.tmpl -->
{{ define "email.custom.html" }}
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .alert { padding: 10px; margin: 10px 0; }
    .critical { background-color: #ffcccc; }
    .warning { background-color: #ffffcc; }
  </style>
</head>
<body>
  <h1>Alerts Summary</h1>
  <p>Total Alerts: {{ .Alerts | len }}</p>
  
  {{ range .Alerts }}
  <div class="alert {{ .Labels.severity }}">
    <h3>{{ .Labels.alertname }}</h3>
    <p><strong>Instance:</strong> {{ .Labels.instance }}</p>
    <p><strong>Severity:</strong> {{ .Labels.severity }}</p>
    <p><strong>Description:</strong> {{ .Annotations.description }}</p>
    <p><strong>Started:</strong> {{ .StartsAt.Format "2006-01-02 15:04:05" }}</p>
    {{ if .EndsAt }}
    <p><strong>Ended:</strong> {{ .EndsAt.Format "2006-01-02 15:04:05" }}</p>
    {{ end }}
  </div>
  {{ end }}
</body>
</html>
{{ end }}
```

### Custom Slack Template

```yaml
receivers:
  - name: 'slack-custom'
    slack_configs:
      - api_url: 'YOUR_SLACK_WEBHOOK_URL'
        channel: '#alerts'
        title: '{{ template "slack.custom.title" . }}'
        text: '{{ template "slack.custom.text" . }}'

templates:
  - '/etc/alertmanager/templates/*.tmpl'
```

```go
{{ define "slack.custom.title" }}
[{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}] {{ .GroupLabels.alertname }}
{{ end }}

{{ define "slack.custom.text" }}
{{ range .Alerts }}
*Alert:* {{ .Labels.alertname }}
*Severity:* {{ .Labels.severity }}
*Instance:* {{ .Labels.instance }}
*Description:* {{ .Annotations.description }}
*Started:* {{ .StartsAt.Format "2006-01-02 15:04:05 MST" }}
{{ if .EndsAt }}*Resolved:* {{ .EndsAt.Format "2006-01-02 15:04:05 MST" }}{{ end }}
{{ end }}
{{ end }}
```

## High Availability

```yaml
# On alertmanager-1
./alertmanager \
  --config.file=alertmanager.yml \
  --cluster.listen-address=0.0.0.0:9094 \
  --cluster.peer=alertmanager-2:9094 \
  --cluster.peer=alertmanager-3:9094

# On alertmanager-2
./alertmanager \
  --config.file=alertmanager.yml \
  --cluster.listen-address=0.0.0.0:9094 \
  --cluster.peer=alertmanager-1:9094 \
  --cluster.peer=alertmanager-3:9094

# On alertmanager-3
./alertmanager \
  --config.file=alertmanager.yml \
  --cluster.listen-address=0.0.0.0:9094 \
  --cluster.peer=alertmanager-1:9094 \
  --cluster.peer=alertmanager-2:9094
```

## Integration with Prometheus

```yaml
# prometheus.yml
alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager-1:9093
            - alertmanager-2:9093
            - alertmanager-3:9093

rule_files:
  - 'alerts.yml'
```

```yaml
# alerts.yml
groups:
  - name: example
    interval: 30s
    rules:
      - alert: HighMemoryUsage
        expr: node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes < 0.1
        for: 5m
        labels:
          severity: warning
          team: ops
        annotations:
          summary: "High memory usage on {{ $labels.instance }}"
          description: "Memory usage is above 90% (current: {{ $value | humanizePercentage }})"
      
      - alert: InstanceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
          team: ops
        annotations:
          summary: "Instance {{ $labels.instance }} is down"
          description: "{{ $labels.instance }} has been down for more than 1 minute"
```

## API Usage

```bash
# Get alerts
curl http://localhost:9093/api/v2/alerts

# Get alert groups
curl http://localhost:9093/api/v2/alerts/groups

# Get status
curl http://localhost:9093/api/v2/status

# Reload configuration
curl -X POST http://localhost:9093/-/reload

# Health check
curl http://localhost:9093/-/healthy

# Readiness check
curl http://localhost:9093/-/ready
```

## Best Practices

### Configuration

- Use separate routes for different teams
- Implement proper grouping to reduce noise
- Set appropriate group_wait, group_interval, and repeat_interval
- Use inhibition rules to suppress dependent alerts
- Implement escalation policies
- Use templates for consistent formatting

### Alert Design

```yaml
# Good alert example
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
  for: 10m
  labels:
    severity: warning
    team: backend
    component: api
  annotations:
    summary: "High error rate on {{ $labels.instance }}"
    description: "Error rate is {{ $value | humanizePercentage }} (threshold: 5%)"
    runbook_url: "https://wiki.example.com/runbooks/high-error-rate"
```

### Receiver Selection

- Email: Low-priority alerts, summaries
- Slack/Teams: Team collaboration, warnings
- PagerDuty/OpsGenie: Critical alerts, on-call
- Webhook: Custom integrations, ticketing systems

### Maintenance

- Regularly review and update alert rules
- Remove obsolete silences
- Test receiver configurations
- Monitor Alertmanager metrics
- Implement proper access controls

## Monitoring Alertmanager

```yaml
# Prometheus scrape config
scrape_configs:
  - job_name: 'alertmanager'
    static_configs:
      - targets: ['localhost:9093']
```

### Key Metrics

```
# Alert stats
alertmanager_alerts
alertmanager_alerts_received_total
alertmanager_alerts_invalid_total

# Notification stats
alertmanager_notifications_total
alertmanager_notifications_failed_total

# Cluster stats
alertmanager_cluster_members
alertmanager_cluster_health_score
```

## Troubleshooting

### Alerts Not Received

```bash
# Check Alertmanager logs
docker logs alertmanager

# Verify configuration
amtool check-config alertmanager.yml

# Test alert
amtool alert add \
  alertname=TestAlert \
  severity=warning \
  --annotation=description="Test alert"

# Check API
curl http://localhost:9093/api/v2/alerts | jq
```

### Configuration Errors

```bash
# Validate configuration
./alertmanager --config.file=alertmanager.yml --config.check

# Reload configuration
kill -HUP $(pidof alertmanager)
# Or
curl -X POST http://localhost:9093/-/reload
```

## Resources

- [Alertmanager Documentation](https://prometheus.io/docs/alerting/latest/alertmanager/)
- [Configuration Reference](https://prometheus.io/docs/alerting/latest/configuration/)
- [Notification Template Reference](https://prometheus.io/docs/alerting/latest/notifications/)
- [GitHub Repository](https://github.com/prometheus/alertmanager)
- [amtool Documentation](https://github.com/prometheus/alertmanager#amtool)

## Next Steps

- Configure receivers for your team
- Implement proper routing rules
- Set up high availability cluster
- Create custom notification templates
- Implement inhibition rules
- Configure silencing workflows
- Monitor Alertmanager health
- Integrate with incident management
- Test disaster recovery procedures
