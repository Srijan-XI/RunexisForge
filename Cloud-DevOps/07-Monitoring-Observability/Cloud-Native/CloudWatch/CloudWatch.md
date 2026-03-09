# AWS CloudWatch

## Introduction

### What is CloudWatch?

Amazon CloudWatch is AWS's comprehensive monitoring and observability service for cloud resources and applications running on AWS. It provides data and actionable insights to monitor applications, respond to system-wide performance changes, optimize resource utilization, and get a unified view of operational health.

### Why CloudWatch?

- Unified monitoring for AWS resources
- Real-time metrics and logs
- Custom metrics support
- Automated alarms and actions
- Dashboard visualization
- Log analytics and insights
- Application performance monitoring
- Container and Lambda monitoring
- Anomaly detection
- Cross-account observability

## Prerequisites

- AWS account
- IAM permissions for CloudWatch
- AWS CLI installed (optional)
- Applications running on AWS
- Understanding of AWS services

## Core Components

### CloudWatch Metrics

Pre-defined and custom metrics for monitoring.

### CloudWatch Logs

Centralized log collection and analysis.

### CloudWatch Alarms

Automated actions based on metric thresholds.

### CloudWatch Dashboards

Visual representation of metrics and logs.

### CloudWatch Events/EventBridge

Event-driven automation.

### CloudWatch Insights

Log and metric query and analysis.

## Getting Started

### AWS CLI Setup

```bash
# Install AWS CLI
pip install awscli

# Configure credentials
aws configure

# Test connection
aws cloudwatch list-metrics --namespace AWS/EC2
```

## CloudWatch Metrics

### Default AWS Metrics

```bash
# EC2 metrics (free, 5-minute intervals)
- CPUUtilization
- DiskReadOps
- NetworkIn
- NetworkOut
- StatusCheckFailed

# Enable detailed monitoring (1-minute, paid)
aws ec2 monitor-instances --instance-ids i-1234567890abcdef0

# RDS metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/RDS \
  --metric-name DatabaseConnections \
  --dimensions Name=DBInstanceIdentifier,Value=mydb \
  --start-time 2026-01-18T00:00:00Z \
  --end-time 2026-01-18T23:59:59Z \
  --period 3600 \
  --statistics Average
```

### Custom Metrics

```bash
# Put metric data via CLI
aws cloudwatch put-metric-data \
  --namespace MyApp \
  --metric-name PageViews \
  --value 1 \
  --timestamp 2026-01-18T12:00:00Z \
  --dimensions Instance=i-1234567890abcdef0,Environment=production

# With multiple dimensions
aws cloudwatch put-metric-data \
  --namespace MyApp \
  --metric-name ResponseTime \
  --value 125 \
  --unit Milliseconds \
  --dimensions Endpoint=/api/users,Method=GET,Region=us-east-1
```

### Using AWS SDK

#### Python (boto3)

```python
import boto3
from datetime import datetime

cloudwatch = boto3.client('cloudwatch')

# Put custom metric
cloudwatch.put_metric_data(
    Namespace='MyApplication',
    MetricData=[
        {
            'MetricName': 'OrdersProcessed',
            'Value': 100,
            'Unit': 'Count',
            'Timestamp': datetime.utcnow(),
            'Dimensions': [
                {
                    'Name': 'Environment',
                    'Value': 'production'
                },
                {
                    'Name': 'Region',
                    'Value': 'us-east-1'
                }
            ]
        }
    ]
)

# Get metric statistics
response = cloudwatch.get_metric_statistics(
    Namespace='AWS/EC2',
    MetricName='CPUUtilization',
    Dimensions=[
        {
            'Name': 'InstanceId',
            'Value': 'i-1234567890abcdef0'
        }
    ],
    StartTime=datetime(2026, 1, 18, 0, 0, 0),
    EndTime=datetime(2026, 1, 18, 23, 59, 59),
    Period=300,  # 5 minutes
    Statistics=['Average', 'Maximum']
)

for datapoint in response['Datapoints']:
    print(f"{datapoint['Timestamp']}: {datapoint['Average']}")
```

#### Node.js

```javascript
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch({ region: 'us-east-1' });

// Put custom metric
const params = {
  Namespace: 'MyApplication',
  MetricData: [
    {
      MetricName: 'RequestCount',
      Value: 1,
      Unit: 'Count',
      Timestamp: new Date(),
      Dimensions: [
        {
          Name: 'Service',
          Value: 'API'
        }
      ]
    }
  ]
};

cloudwatch.putMetricData(params, (err, data) => {
  if (err) console.error(err);
  else console.log('Metric sent successfully');
});

// Get metrics
const getParams = {
  Namespace: 'AWS/Lambda',
  MetricName: 'Duration',
  Dimensions: [
    {
      Name: 'FunctionName',
      Value: 'my-function'
    }
  ],
  StartTime: new Date(Date.now() - 3600000), // 1 hour ago
  EndTime: new Date(),
  Period: 300,
  Statistics: ['Average', 'Maximum']
};

cloudwatch.getMetricStatistics(getParams, (err, data) => {
  if (err) console.error(err);
  else console.log(data.Datapoints);
});
```

## CloudWatch Logs

### Log Groups and Streams

```bash
# Create log group
aws logs create-log-group --log-group-name /aws/myapp/production

# Create log stream
aws logs create-log-stream \
  --log-group-name /aws/myapp/production \
  --log-stream-name instance-i-1234567890abcdef0

# Put log events
aws logs put-log-events \
  --log-group-name /aws/myapp/production \
  --log-stream-name instance-i-1234567890abcdef0 \
  --log-events \
    timestamp=1609459200000,message="Application started" \
    timestamp=1609459201000,message="Processing request"
```

### CloudWatch Agent

```bash
# Install CloudWatch agent on EC2
wget https://s3.amazonaws.com/amazoncloudwatch-agent/linux/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb

# Create configuration
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard

# Example configuration
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/app.log",
            "log_group_name": "/aws/myapp/production",
            "log_stream_name": "{instance_id}",
            "timezone": "UTC"
          }
        ]
      }
    }
  },
  "metrics": {
    "namespace": "MyApp",
    "metrics_collected": {
      "mem": {
        "measurement": [
          {
            "name": "mem_used_percent",
            "rename": "MemoryUtilization",
            "unit": "Percent"
          }
        ],
        "metrics_collection_interval": 60
      },
      "disk": {
        "measurement": [
          {
            "name": "used_percent",
            "rename": "DiskUtilization",
            "unit": "Percent"
          }
        ],
        "metrics_collection_interval": 60,
        "resources": ["*"]
      }
    }
  }
}

# Start agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a fetch-config \
  -m ec2 \
  -s \
  -c file:/opt/aws/amazon-cloudwatch-agent/etc/config.json
```

### Log Insights Queries

```sql
-- Find errors in last hour
fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 100

-- Count errors by type
fields @message
| filter @message like /ERROR/
| parse @message /ERROR: (?<errorType>.*?) -/
| stats count() by errorType

-- Average response time
fields @timestamp, responseTime
| filter @type = "RequestLog"
| stats avg(responseTime) as avgResponse by bin(5m)

-- P99 latency
fields @timestamp, duration
| filter @type = "RequestLog"
| stats pct(duration, 99) as p99 by bin(1m)

-- Parse JSON logs
fields @timestamp, @message
| parse @message '{"user": "*", "action": "*"}' as user, action
| stats count() by action
```

### Using Logs SDK

```python
import boto3
import time

logs = boto3.client('logs')

# Query logs
response = logs.start_query(
    logGroupName='/aws/lambda/my-function',
    startTime=int((time.time() - 3600) * 1000),  # 1 hour ago
    endTime=int(time.time() * 1000),
    queryString='''
        fields @timestamp, @message
        | filter @message like /ERROR/
        | sort @timestamp desc
        | limit 20
    '''
)

query_id = response['queryId']

# Wait for query to complete
while True:
    result = logs.get_query_results(queryId=query_id)
    if result['status'] == 'Complete':
        break
    time.sleep(1)

# Print results
for record in result['results']:
    print({field['field']: field['value'] for field in record})
```

## CloudWatch Alarms

### Creating Alarms

```bash
# CPU alarm
aws cloudwatch put-metric-alarm \
  --alarm-name high-cpu-alarm \
  --alarm-description "Alert when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=InstanceId,Value=i-1234567890abcdef0 \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-topic

# Custom metric alarm
aws cloudwatch put-metric-alarm \
  --alarm-name high-error-rate \
  --metric-name ErrorRate \
  --namespace MyApp \
  --statistic Sum \
  --period 60 \
  --evaluation-periods 1 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold \
  --treat-missing-data notBreaching
```

### Composite Alarms

```bash
# Create composite alarm (AND logic)
aws cloudwatch put-composite-alarm \
  --alarm-name critical-system-alarm \
  --alarm-description "Critical when CPU and memory are both high" \
  --actions-enabled \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:critical-alerts \
  --alarm-rule "ALARM(high-cpu-alarm) AND ALARM(high-memory-alarm)"
```

### Alarm Actions

```python
import boto3

cloudwatch = boto3.client('cloudwatch')
sns = boto3.client('sns')

# Create SNS topic
topic = sns.create_topic(Name='cloudwatch-alarms')
topic_arn = topic['TopicArn']

# Subscribe email
sns.subscribe(
    TopicArn=topic_arn,
    Protocol='email',
    Endpoint='admin@example.com'
)

# Create alarm with SNS action
cloudwatch.put_metric_alarm(
    AlarmName='database-connections-high',
    ComparisonOperator='GreaterThanThreshold',
    EvaluationPeriods=2,
    MetricName='DatabaseConnections',
    Namespace='AWS/RDS',
    Period=300,
    Statistic='Average',
    Threshold=80.0,
    ActionsEnabled=True,
    AlarmActions=[topic_arn],
    AlarmDescription='Alert when DB connections > 80',
    Dimensions=[
        {
            'Name': 'DBInstanceIdentifier',
            'Value': 'mydb'
        }
    ]
)
```

## CloudWatch Dashboards

### Creating Dashboard

```json
{
  "widgets": [
    {
      "type": "metric",
      "properties": {
        "metrics": [
          [ "AWS/EC2", "CPUUtilization", { "stat": "Average" } ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "title": "EC2 CPU Utilization"
      }
    },
    {
      "type": "log",
      "properties": {
        "query": "SOURCE '/aws/lambda/my-function' | fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc",
        "region": "us-east-1",
        "title": "Recent Errors"
      }
    }
  ]
}
```

```bash
# Create dashboard
aws cloudwatch put-dashboard \
  --dashboard-name MyAppDashboard \
  --dashboard-body file://dashboard.json

# Get dashboard
aws cloudwatch get-dashboard --dashboard-name MyAppDashboard
```

### Using SDK

```python
import boto3
import json

cloudwatch = boto3.client('cloudwatch')

dashboard_body = {
    "widgets": [
        {
            "type": "metric",
            "properties": {
                "metrics": [
                    ["MyApp", "RequestCount", {"stat": "Sum"}],
                    [".", "ErrorCount", {"stat": "Sum"}]
                ],
                "period": 300,
                "stat": "Sum",
                "region": "us-east-1",
                "title": "Application Metrics",
                "yAxis": {
                    "left": {
                        "label": "Count"
                    }
                }
            }
        }
    ]
}

cloudwatch.put_dashboard(
    DashboardName='MyApplicationDashboard',
    DashboardBody=json.dumps(dashboard_body)
)
```

## Container Insights

### Enable for ECS

```bash
# Enable Container Insights for cluster
aws ecs update-cluster-settings \
  --cluster my-cluster \
  --settings name=containerInsights,value=enabled

# View metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/ECS \
  --metric-name CPUUtilization \
  --dimensions Name=ClusterName,Value=my-cluster \
  --start-time 2026-01-18T00:00:00Z \
  --end-time 2026-01-18T23:59:59Z \
  --period 300 \
  --statistics Average
```

### Enable for EKS

```bash
# Deploy CloudWatch agent
kubectl apply -f https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/quickstart/cwagent-fluentd-quickstart.yaml

# View pod metrics
aws cloudwatch get-metric-statistics \
  --namespace ContainerInsights \
  --metric-name pod_cpu_utilization \
  --dimensions Name=ClusterName,Value=my-cluster \
  --start-time 2026-01-18T00:00:00Z \
  --end-time 2026-01-18T23:59:59Z \
  --period 300 \
  --statistics Average
```

## Lambda Insights

```python
# Enable Lambda Insights
# Add layer ARN to Lambda function
# For us-east-1: arn:aws:lambda:us-east-1:580247275435:layer:LambdaInsightsExtension:14

import boto3

lambda_client = boto3.client('lambda')

lambda_client.update_function_configuration(
    FunctionName='my-function',
    Layers=[
        'arn:aws:lambda:us-east-1:580247275435:layer:LambdaInsightsExtension:14'
    ]
)

# Add permissions to execution role
# CloudWatchLambdaInsightsExecutionRolePolicy
```

## Application Insights

```bash
# Create application
aws applicationinsights create-application \
  --resource-group-name my-app-resources \
  --auto-config-enabled

# View observations (issues detected)
aws applicationinsights list-problems \
  --resource-group-name my-app-resources
```

## Anomaly Detection

```bash
# Create anomaly detector
aws cloudwatch put-anomaly-detector \
  --namespace AWS/EC2 \
  --metric-name CPUUtilization \
  --dimensions Name=InstanceId,Value=i-1234567890abcdef0 \
  --stat Average

# Create alarm based on anomaly
aws cloudwatch put-metric-alarm \
  --alarm-name cpu-anomaly-alarm \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold-metric-id e1 \
  --comparison-operator LessThanLowerOrGreaterThanUpperThreshold \
  --metrics '[
    {
      "Id": "m1",
      "ReturnData": true,
      "MetricStat": {
        "Metric": {
          "Namespace": "AWS/EC2",
          "MetricName": "CPUUtilization",
          "Dimensions": [{"Name": "InstanceId", "Value": "i-1234567890abcdef0"}]
        },
        "Period": 300,
        "Stat": "Average"
      }
    },
    {
      "Id": "e1",
      "Expression": "ANOMALY_DETECTION_BAND(m1, 2)",
      "Label": "CPUUtilization (expected)"
    }
  ]'
```

## Best Practices

### Metrics

- Use custom metrics for application-specific monitoring
- Set appropriate metric resolution (standard vs high-resolution)
- Use dimensions effectively for filtering
- Implement metric math for derived metrics
- Monitor costs with metric usage

### Logs

- Use structured logging (JSON)
- Implement log retention policies
- Use metric filters to create alarms from logs
- Encrypt sensitive log data
- Use log groups strategically

### Alarms

- Set appropriate thresholds
- Use multiple evaluation periods to reduce false positives
- Implement composite alarms for complex scenarios
- Test alarm actions regularly
- Document alarm responses

### Cost Optimization

```bash
# Set log retention
aws logs put-retention-policy \
  --log-group-name /aws/myapp/production \
  --retention-in-days 7

# Delete old log groups
aws logs delete-log-group --log-group-name /aws/old-app

# Use metric filters instead of log streaming
# Implement sampling for high-volume metrics
```

## Terraform Integration

```hcl
# Metric alarm
resource "aws_cloudwatch_metric_alarm" "cpu_alarm" {
  alarm_name          = "high-cpu-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric monitors ec2 cpu utilization"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    InstanceId = aws_instance.web.id
  }
}

# Log group
resource "aws_cloudwatch_log_group" "app_logs" {
  name              = "/aws/myapp/production"
  retention_in_days = 7
}

# Dashboard
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "my-app-dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type = "metric"
        properties = {
          metrics = [
            ["AWS/EC2", "CPUUtilization"]
          ]
          period = 300
          stat   = "Average"
          region = "us-east-1"
          title  = "EC2 CPU"
        }
      }
    ]
  })
}
```

## Troubleshooting

### Missing Metrics

```bash
# Verify IAM permissions
# Check CloudWatch agent status
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a query -m ec2 -c default

# Check agent logs
tail -f /opt/aws/amazon-cloudwatch-agent/logs/amazon-cloudwatch-agent.log
```

### Alarm Not Triggering

```bash
# Verify alarm state
aws cloudwatch describe-alarms --alarm-names high-cpu-alarm

# Check metric data
aws cloudwatch get-metric-statistics \
  --namespace AWS/EC2 \
  --metric-name CPUUtilization \
  --dimensions Name=InstanceId,Value=i-1234567890abcdef0 \
  --start-time 2026-01-18T00:00:00Z \
  --end-time 2026-01-18T23:59:59Z \
  --period 300 \
  --statistics Average

# Verify SNS subscription
aws sns list-subscriptions-by-topic --topic-arn <topic-arn>
```

## Resources

- [CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)
- [CloudWatch API Reference](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/)
- [CloudWatch Agent Guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html)
- [Logs Insights Query Syntax](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html)
- [AWS CLI CloudWatch](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/)

## Next Steps

- Deploy CloudWatch agent on EC2 instances
- Create custom dashboards
- Set up comprehensive alarms
- Implement log aggregation
- Enable Container Insights
- Configure anomaly detection
- Integrate with incident management
- Implement cost monitoring
