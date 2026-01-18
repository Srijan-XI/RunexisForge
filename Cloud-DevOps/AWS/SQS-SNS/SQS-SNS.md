# AWS SQS & SNS

## Introduction

### What are SQS and SNS?

Amazon Simple Queue Service (SQS) and Amazon Simple Notification Service (SNS) are fully managed messaging services provided by AWS. SQS is a message queue service for decoupling application components, while SNS is a pub/sub messaging service for sending notifications to subscribers.

### Why SQS & SNS?

- **Fully managed**: No infrastructure to maintain
- **Scalable**: Handles millions of messages
- **Reliable**: Message durability and redundancy
- **Secure**: IAM integration, encryption
- **Cost-effective**: Pay per use
- **Integration**: Works with AWS ecosystem
- **Serverless**: Ideal for Lambda triggers
- **Simple**: Easy to get started

### Key Features

**SQS:**
- Standard and FIFO queues
- Dead-letter queues
- Visibility timeout
- Long polling
- Message deduplication
- At-least-once delivery (Standard)
- Exactly-once delivery (FIFO)

**SNS:**
- Topics and subscriptions
- Multiple protocols (HTTP/S, Email, SMS, Lambda, SQS)
- Message filtering
- Message fanout
- Mobile push notifications
- FIFO topics

## Prerequisites

- AWS Account
- AWS CLI configured
- IAM permissions for SQS/SNS
- SDK for your language (boto3, AWS SDK)
- Basic understanding of messaging patterns

## Installation

### AWS CLI

```bash
# Install AWS CLI
pip install awscli

# Configure credentials
aws configure
```

### Python SDK (boto3)

```bash
pip install boto3
```

### Node.js SDK

```bash
npm install @aws-sdk/client-sqs @aws-sdk/client-sns
```

### Java SDK

```xml
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>sqs</artifactId>
    <version>2.20.0</version>
</dependency>
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>sns</artifactId>
    <version>2.20.0</version>
</dependency>
```

## Amazon SQS

### Creating a Queue (CLI)

```bash
# Create standard queue
aws sqs create-queue --queue-name my-queue

# Create FIFO queue
aws sqs create-queue \
  --queue-name my-fifo-queue.fifo \
  --attributes FifoQueue=true,ContentBasedDeduplication=true

# Get queue URL
aws sqs get-queue-url --queue-name my-queue
```

### Python - SQS Producer

```python
import boto3
import json

# Create SQS client
sqs = boto3.client('sqs', region_name='us-east-1')

# Get queue URL
queue_url = 'https://sqs.us-east-1.amazonaws.com/123456789012/my-queue'

# Send message
response = sqs.send_message(
    QueueUrl=queue_url,
    MessageBody=json.dumps({
        'order_id': '12345',
        'product': 'Laptop',
        'quantity': 1
    }),
    MessageAttributes={
        'Priority': {
            'StringValue': 'High',
            'DataType': 'String'
        },
        'Timestamp': {
            'StringValue': '2024-01-18T10:00:00Z',
            'DataType': 'String'
        }
    }
)

print(f"Message sent. ID: {response['MessageId']}")
```

### Python - SQS Consumer

```python
import boto3
import json

sqs = boto3.client('sqs', region_name='us-east-1')
queue_url = 'https://sqs.us-east-1.amazonaws.com/123456789012/my-queue'

# Receive messages
while True:
    response = sqs.receive_message(
        QueueUrl=queue_url,
        MaxNumberOfMessages=10,
        WaitTimeSeconds=20,  # Long polling
        MessageAttributeNames=['All'],
        AttributeNames=['All']
    )
    
    if 'Messages' not in response:
        print("No messages")
        continue
    
    for message in response['Messages']:
        # Process message
        body = json.loads(message['Body'])
        print(f"Received: {body}")
        
        # Get message attributes
        if 'MessageAttributes' in message:
            priority = message['MessageAttributes'].get('Priority', {}).get('StringValue')
            print(f"Priority: {priority}")
        
        # Delete message after processing
        sqs.delete_message(
            QueueUrl=queue_url,
            ReceiptHandle=message['ReceiptHandle']
        )
        print("Message deleted")
```

### Python - Batch Operations

```python
import boto3
import json

sqs = boto3.client('sqs', region_name='us-east-1')
queue_url = 'https://sqs.us-east-1.amazonaws.com/123456789012/my-queue'

# Send batch
entries = []
for i in range(10):
    entries.append({
        'Id': str(i),
        'MessageBody': json.dumps({'order_id': f'order-{i}'}),
        'MessageAttributes': {
            'Index': {
                'StringValue': str(i),
                'DataType': 'Number'
            }
        }
    })

response = sqs.send_message_batch(
    QueueUrl=queue_url,
    Entries=entries
)

print(f"Sent {len(response['Successful'])} messages")
if 'Failed' in response:
    print(f"Failed: {len(response['Failed'])} messages")

# Delete batch
receipt_handles = []
response = sqs.receive_message(
    QueueUrl=queue_url,
    MaxNumberOfMessages=10
)

if 'Messages' in response:
    delete_entries = [
        {
            'Id': str(i),
            'ReceiptHandle': msg['ReceiptHandle']
        }
        for i, msg in enumerate(response['Messages'])
    ]
    
    sqs.delete_message_batch(
        QueueUrl=queue_url,
        Entries=delete_entries
    )
```

### FIFO Queue

```python
import boto3
import json
from datetime import datetime

sqs = boto3.client('sqs', region_name='us-east-1')
fifo_queue_url = 'https://sqs.us-east-1.amazonaws.com/123456789012/my-fifo-queue.fifo'

# Send message to FIFO queue
response = sqs.send_message(
    QueueUrl=fifo_queue_url,
    MessageBody=json.dumps({'order_id': '12345'}),
    MessageGroupId='order-processing',  # Required for FIFO
    MessageDeduplicationId=f'order-12345-{datetime.now().isoformat()}'  # Required if ContentBasedDeduplication=false
)

print(f"FIFO Message sent. ID: {response['MessageId']}")
```

### Dead Letter Queue

```python
import boto3

sqs = boto3.client('sqs', region_name='us-east-1')

# Create DLQ
dlq_response = sqs.create_queue(QueueName='my-dlq')
dlq_url = dlq_response['QueueUrl']

# Get DLQ ARN
dlq_attributes = sqs.get_queue_attributes(
    QueueUrl=dlq_url,
    AttributeNames=['QueueArn']
)
dlq_arn = dlq_attributes['Attributes']['QueueArn']

# Create main queue with DLQ
main_queue_response = sqs.create_queue(
    QueueName='my-main-queue',
    Attributes={
        'RedrivePolicy': json.dumps({
            'deadLetterTargetArn': dlq_arn,
            'maxReceiveCount': '3'  # After 3 failed attempts, move to DLQ
        })
    }
)

print(f"Queue created with DLQ: {main_queue_response['QueueUrl']}")
```

## Amazon SNS

### Creating a Topic (CLI)

```bash
# Create standard topic
aws sns create-topic --name my-topic

# Create FIFO topic
aws sns create-topic \
  --name my-fifo-topic.fifo \
  --attributes FifoTopic=true,ContentBasedDeduplication=true

# List topics
aws sns list-topics
```

### Python - SNS Publisher

```python
import boto3
import json

sns = boto3.client('sns', region_name='us-east-1')

# Topic ARN
topic_arn = 'arn:aws:sns:us-east-1:123456789012:my-topic'

# Publish message
response = sns.publish(
    TopicArn=topic_arn,
    Message=json.dumps({
        'event': 'order_created',
        'order_id': '12345',
        'amount': 99.99
    }),
    Subject='New Order Notification',
    MessageAttributes={
        'event_type': {
            'DataType': 'String',
            'StringValue': 'order'
        },
        'priority': {
            'DataType': 'String',
            'StringValue': 'high'
        }
    }
)

print(f"Message published. ID: {response['MessageId']}")
```

### Python - Email Subscription

```python
import boto3

sns = boto3.client('sns', region_name='us-east-1')
topic_arn = 'arn:aws:sns:us-east-1:123456789012:my-topic'

# Subscribe email
response = sns.subscribe(
    TopicArn=topic_arn,
    Protocol='email',
    Endpoint='user@example.com'
)

print(f"Subscription ARN: {response['SubscriptionArn']}")
# User will receive confirmation email
```

### Python - HTTP/HTTPS Subscription

```python
# Subscribe HTTP endpoint
response = sns.subscribe(
    TopicArn=topic_arn,
    Protocol='https',
    Endpoint='https://api.example.com/webhook'
)

# Endpoint will receive confirmation request
# Need to confirm by visiting SubscribeURL
```

### Python - Lambda Subscription

```python
# Subscribe Lambda function
lambda_arn = 'arn:aws:lambda:us-east-1:123456789012:function:my-function'

response = sns.subscribe(
    TopicArn=topic_arn,
    Protocol='lambda',
    Endpoint=lambda_arn
)

# Grant SNS permission to invoke Lambda
lambda_client = boto3.client('lambda')
lambda_client.add_permission(
    FunctionName='my-function',
    StatementId='AllowSNSInvoke',
    Action='lambda:InvokeFunction',
    Principal='sns.amazonaws.com',
    SourceArn=topic_arn
)
```

### Message Filtering

```python
import boto3
import json

sns = boto3.client('sns', region_name='us-east-1')

# Create subscription with filter policy
response = sns.subscribe(
    TopicArn=topic_arn,
    Protocol='sqs',
    Endpoint='arn:aws:sqs:us-east-1:123456789012:order-queue'
)

subscription_arn = response['SubscriptionArn']

# Set filter policy
filter_policy = {
    'event_type': ['order'],
    'priority': ['high', 'urgent']
}

sns.set_subscription_attributes(
    SubscriptionArn=subscription_arn,
    AttributeName='FilterPolicy',
    AttributeValue=json.dumps(filter_policy)
)

print("Filter policy set")
```

## SNS + SQS Integration (Fan-out Pattern)

### Setup

```python
import boto3
import json

sns = boto3.client('sns', region_name='us-east-1')
sqs = boto3.client('sqs', region_name='us-east-1')

# Create SNS topic
topic_response = sns.create_topic(Name='order-events')
topic_arn = topic_response['TopicArn']

# Create SQS queues
inventory_queue = sqs.create_queue(QueueName='inventory-queue')
billing_queue = sqs.create_queue(QueueName='billing-queue')
shipping_queue = sqs.create_queue(QueueName='shipping-queue')

# Get queue ARNs
def get_queue_arn(queue_url):
    attrs = sqs.get_queue_attributes(
        QueueUrl=queue_url,
        AttributeNames=['QueueArn']
    )
    return attrs['Attributes']['QueueArn']

inventory_arn = get_queue_arn(inventory_queue['QueueUrl'])
billing_arn = get_queue_arn(billing_queue['QueueUrl'])
shipping_arn = get_queue_arn(shipping_queue['QueueUrl'])

# Subscribe queues to topic
for queue_arn in [inventory_arn, billing_arn, shipping_arn]:
    sns.subscribe(
        TopicArn=topic_arn,
        Protocol='sqs',
        Endpoint=queue_arn
    )

# Set queue policies to allow SNS to send messages
def set_queue_policy(queue_url, queue_arn, topic_arn):
    policy = {
        'Version': '2012-10-17',
        'Statement': [{
            'Effect': 'Allow',
            'Principal': {'Service': 'sns.amazonaws.com'},
            'Action': 'sqs:SendMessage',
            'Resource': queue_arn,
            'Condition': {
                'ArnEquals': {'aws:SourceArn': topic_arn}
            }
        }]
    }
    
    sqs.set_queue_attributes(
        QueueUrl=queue_url,
        Attributes={'Policy': json.dumps(policy)}
    )

set_queue_policy(inventory_queue['QueueUrl'], inventory_arn, topic_arn)
set_queue_policy(billing_queue['QueueUrl'], billing_arn, topic_arn)
set_queue_policy(shipping_queue['QueueUrl'], shipping_arn, topic_arn)

print("Fan-out pattern configured")

# Publish to SNS - all queues receive message
sns.publish(
    TopicArn=topic_arn,
    Message=json.dumps({
        'order_id': '12345',
        'event': 'order_created'
    })
)
```

## Node.js Examples

### SQS Producer

```javascript
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

const client = new SQSClient({ region: 'us-east-1' });

async function sendMessage() {
  const params = {
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/my-queue',
    MessageBody: JSON.stringify({
      order_id: '12345',
      product: 'Laptop'
    }),
    MessageAttributes: {
      Priority: {
        DataType: 'String',
        StringValue: 'High'
      }
    }
  };

  try {
    const command = new SendMessageCommand(params);
    const response = await client.send(command);
    console.log('Message sent:', response.MessageId);
  } catch (error) {
    console.error('Error:', error);
  }
}

sendMessage();
```

### SQS Consumer

```javascript
const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');

const client = new SQSClient({ region: 'us-east-1' });
const queueUrl = 'https://sqs.us-east-1.amazonaws.com/123456789012/my-queue';

async function pollMessages() {
  while (true) {
    try {
      const command = new ReceiveMessageCommand({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20,
        MessageAttributeNames: ['All']
      });

      const response = await client.send(command);

      if (response.Messages) {
        for (const message of response.Messages) {
          console.log('Received:', JSON.parse(message.Body));

          // Delete message
          const deleteCommand = new DeleteMessageCommand({
            QueueUrl: queueUrl,
            ReceiptHandle: message.ReceiptHandle
          });
          await client.send(deleteCommand);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

pollMessages();
```

### SNS Publisher

```javascript
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const client = new SNSClient({ region: 'us-east-1' });

async function publishMessage() {
  const params = {
    TopicArn: 'arn:aws:sns:us-east-1:123456789012:my-topic',
    Message: JSON.stringify({
      event: 'order_created',
      order_id: '12345'
    }),
    Subject: 'New Order',
    MessageAttributes: {
      event_type: {
        DataType: 'String',
        StringValue: 'order'
      }
    }
  };

  try {
    const command = new PublishCommand(params);
    const response = await client.send(command);
    console.log('Published:', response.MessageId);
  } catch (error) {
    console.error('Error:', error);
  }
}

publishMessage();
```

## Lambda Integration

### Lambda Function (Python)

```python
import json
import boto3

sqs = boto3.client('sqs')
queue_url = 'https://sqs.us-east-1.amazonaws.com/123456789012/output-queue'

def lambda_handler(event, context):
    # Process SNS message
    for record in event['Records']:
        if 'Sns' in record:
            sns_message = json.loads(record['Sns']['Message'])
            print(f"Processing SNS message: {sns_message}")
            
            # Process and forward to SQS
            sqs.send_message(
                QueueUrl=queue_url,
                MessageBody=json.dumps({
                    'processed': True,
                    'original': sns_message
                })
            )
    
    # Process SQS message
    for record in event['Records']:
        if 'body' in record:
            message = json.loads(record['body'])
            print(f"Processing SQS message: {message}")
    
    return {
        'statusCode': 200,
        'body': json.dumps('Messages processed')
    }
```

## Best Practices

### 1. Use Long Polling

```python
# Reduces API calls and costs
response = sqs.receive_message(
    QueueUrl=queue_url,
    WaitTimeSeconds=20  # Long polling
)
```

### 2. Handle Visibility Timeout

```python
# Extend visibility timeout if processing takes longer
sqs.change_message_visibility(
    QueueUrl=queue_url,
    ReceiptHandle=receipt_handle,
    VisibilityTimeout=300  # 5 minutes
)
```

### 3. Use Dead Letter Queues

```python
# Configure DLQ for failed messages
Attributes={
    'RedrivePolicy': json.dumps({
        'deadLetterTargetArn': dlq_arn,
        'maxReceiveCount': '3'
    })
}
```

### 4. Implement Exponential Backoff

```python
import time

def process_with_retry(message, max_retries=3):
    for attempt in range(max_retries):
        try:
            process_message(message)
            return
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            wait_time = 2 ** attempt
            time.sleep(wait_time)
```

### 5. Use Message Attributes for Filtering

```python
# Publisher
MessageAttributes={
    'event_type': {'DataType': 'String', 'StringValue': 'order'},
    'priority': {'DataType': 'String', 'StringValue': 'high'}
}

# Subscriber filter
filter_policy = {
    'event_type': ['order'],
    'priority': ['high', 'urgent']
}
```

## Monitoring

### CloudWatch Metrics

```python
import boto3

cloudwatch = boto3.client('cloudwatch', region_name='us-east-1')

# Get SQS metrics
response = cloudwatch.get_metric_statistics(
    Namespace='AWS/SQS',
    MetricName='ApproximateNumberOfMessagesVisible',
    Dimensions=[
        {'Name': 'QueueName', 'Value': 'my-queue'}
    ],
    StartTime=datetime.now() - timedelta(hours=1),
    EndTime=datetime.now(),
    Period=300,
    Statistics=['Average', 'Sum']
)

print(response['Datapoints'])
```

### CloudWatch Alarms

```python
# Create alarm for queue depth
cloudwatch.put_metric_alarm(
    AlarmName='high-queue-depth',
    ComparisonOperator='GreaterThanThreshold',
    EvaluationPeriods=2,
    MetricName='ApproximateNumberOfMessagesVisible',
    Namespace='AWS/SQS',
    Period=300,
    Statistic='Average',
    Threshold=1000,
    ActionsEnabled=True,
    AlarmActions=['arn:aws:sns:us-east-1:123456789012:alerts'],
    Dimensions=[
        {'Name': 'QueueName', 'Value': 'my-queue'}
    ]
)
```

## Cost Optimization

### 1. Batch Operations

```python
# Send batch (cheaper than individual)
sqs.send_message_batch(QueueUrl=queue_url, Entries=entries)
```

### 2. Long Polling

```python
# Reduces empty receives
WaitTimeSeconds=20
```

### 3. SNS Filtering

```python
# Reduce unnecessary SQS messages
FilterPolicy={'event_type': ['important_events_only']}
```

## Troubleshooting

### Message Not Received

```python
# Check queue attributes
response = sqs.get_queue_attributes(
    QueueUrl=queue_url,
    AttributeNames=['All']
)
print(response['Attributes'])
```

### SNS Delivery Failures

```python
# Check delivery status
response = sns.get_subscription_attributes(
    SubscriptionArn=subscription_arn
)
print(response['Attributes'])
```

## Resources

- [SQS Documentation](https://docs.aws.amazon.com/sqs/)
- [SNS Documentation](https://docs.aws.amazon.com/sns/)
- [AWS SDK Documentation](https://aws.amazon.com/tools/)
- [Best Practices](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-best-practices.html)

## Next Steps

- Create SQS queue
- Send/receive messages
- Set up SNS topic
- Subscribe endpoints
- SNS + SQS fan-out
- Lambda integration
- Dead letter queues
- Monitoring setup
- Cost optimization
- Production deployment
