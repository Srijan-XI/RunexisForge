# AWS Lambda

## Introduction

AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. You pay only for the compute time you consume - there is no charge when your code is not running. With Lambda, you can run code for virtually any type of application or backend service with zero administration.

### Key Features

- **Zero Server Management**: No infrastructure to provision or manage
- **Automatic Scaling**: Scales automatically from a few requests to thousands
- **Pay-per-Use**: Charged only for compute time consumed
- **Event-Driven**: Triggered by AWS services or custom events
- **Multiple Languages**: Supports Node.js, Python, Java, Go, .NET, Ruby
- **Built-in Fault Tolerance**: High availability across multiple AZs
- **Integrated Security**: IAM roles and VPC integration
- **Container Support**: Deploy functions as container images
- **Layers**: Share code and dependencies across functions
- **Extensions**: Extend Lambda with monitoring and security tools

### Common Use Cases

- **API Backends**: RESTful APIs with API Gateway
- **Data Processing**: Real-time file processing, ETL jobs
- **Stream Processing**: Process Kinesis and DynamoDB streams
- **Scheduled Tasks**: Cron jobs and scheduled automation
- **IoT Backends**: Process IoT device data
- **Webhooks**: Handle webhook events from SaaS platforms
- **Microservices**: Build serverless microservices
- **AI/ML Inference**: Run ML model predictions

## Getting Started

### Prerequisites

```bash
# Install AWS CLI
# Windows (via MSI)
# Download from: https://awscli.amazonaws.com/AWSCLIV2.msi

# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI
aws configure
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region: us-east-1
# Default output format: json

# Verify installation
aws --version
```

### Install SAM CLI

```bash
# AWS Serverless Application Model (SAM) CLI
# macOS
brew install aws-sam-cli

# Windows (via MSI)
# Download from: https://github.com/aws/aws-sam-cli/releases/latest

# Linux
pip install aws-sam-cli

# Verify installation
sam --version
```

## Creating Lambda Functions

### Node.js Function

```javascript
// index.js
exports.handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      timestamp: new Date().toISOString(),
      requestId: context.requestId
    })
  };
  
  return response;
};
```

```bash
# Package function
zip function.zip index.js

# Create function
aws lambda create-function \
  --function-name my-function \
  --runtime nodejs18.x \
  --role arn:aws:iam::ACCOUNT_ID:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://function.zip

# Invoke function
aws lambda invoke \
  --function-name my-function \
  --payload '{"key": "value"}' \
  response.json

# View response
cat response.json
```

### Python Function

```python
# lambda_function.py
import json
import logging
from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info(f'Event: {json.dumps(event)}')
    
    # Process event
    body = {
        'message': 'Hello from Python Lambda!',
        'timestamp': datetime.utcnow().isoformat(),
        'event': event,
        'context': {
            'request_id': context.request_id,
            'function_name': context.function_name,
            'memory_limit': context.memory_limit_in_mb
        }
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps(body)
    }
```

```bash
# Package with dependencies
pip install requests -t package/
cp lambda_function.py package/
cd package && zip -r ../function.zip . && cd ..

# Create function
aws lambda create-function \
  --function-name python-function \
  --runtime python3.11 \
  --role arn:aws:iam::ACCOUNT_ID:role/lambda-role \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://function.zip
```

### Java Function

```java
// Handler.java
package com.example;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;

public class Handler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    
    private static final Gson gson = new Gson();
    
    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent event, Context context) {
        context.getLogger().log("Event: " + gson.toJson(event));
        
        Map<String, Object> body = new HashMap<>();
        body.put("message", "Hello from Java Lambda!");
        body.put("timestamp", System.currentTimeMillis());
        body.put("requestId", context.getRequestId());
        
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        response.setBody(gson.toJson(body));
        
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        response.setHeaders(headers);
        
        return response;
    }
}
```

```xml
<!-- pom.xml -->
<dependencies>
    <dependency>
        <groupId>com.amazonaws</groupId>
        <artifactId>aws-lambda-java-core</artifactId>
        <version>1.2.2</version>
    </dependency>
    <dependency>
        <groupId>com.amazonaws</groupId>
        <artifactId>aws-lambda-java-events</artifactId>
        <version>3.11.0</version>
    </dependency>
    <dependency>
        <groupId>com.google.code.gson</groupId>
        <artifactId>gson</artifactId>
        <version>2.10.1</version>
    </dependency>
</dependencies>
```

### Go Function

```go
// main.go
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "time"
    
    "github.com/aws/aws-lambda-go/events"
    "github.com/aws/aws-lambda-go/lambda"
)

type Response struct {
    Message   string                 `json:"message"`
    Timestamp string                 `json:"timestamp"`
    Event     map[string]interface{} `json:"event"`
}

func handler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
    fmt.Printf("Processing request: %+v\n", event)
    
    response := Response{
        Message:   "Hello from Go Lambda!",
        Timestamp: time.Now().Format(time.RFC3339),
        Event:     map[string]interface{}{"path": event.Path, "method": event.HTTPMethod},
    }
    
    body, err := json.Marshal(response)
    if err != nil {
        return events.APIGatewayProxyResponse{}, err
    }
    
    return events.APIGatewayProxyResponse{
        StatusCode: 200,
        Headers: map[string]string{
            "Content-Type": "application/json",
        },
        Body: string(body),
    }, nil
}

func main() {
    lambda.Start(handler)
}
```

```bash
# Build for Linux
GOOS=linux GOARCH=amd64 go build -o main main.go
zip function.zip main

# Create function
aws lambda create-function \
  --function-name go-function \
  --runtime provided.al2 \
  --role arn:aws:iam::ACCOUNT_ID:role/lambda-role \
  --handler main \
  --zip-file fileb://function.zip
```

## Event Sources

### API Gateway Integration

```bash
# Create REST API
aws apigateway create-rest-api \
  --name my-api \
  --endpoint-configuration types=REGIONAL

# Get API ID and root resource ID
API_ID=$(aws apigateway get-rest-apis --query "items[?name=='my-api'].id" --output text)
ROOT_ID=$(aws apigateway get-resources --rest-api-id $API_ID --query 'items[0].id' --output text)

# Create resource
RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ROOT_ID \
  --path-part users \
  --query 'id' --output text)

# Create method
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method GET \
  --authorization-type NONE

# Integrate with Lambda
aws apigateway put-integration \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method GET \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:REGION:lambda:path/2015-03-31/functions/FUNCTION_ARN/invocations

# Deploy API
aws apigateway create-deployment \
  --rest-api-id $API_ID \
  --stage-name prod
```

### S3 Event Trigger

```bash
# Add permission for S3 to invoke Lambda
aws lambda add-permission \
  --function-name my-function \
  --statement-id s3-trigger \
  --action lambda:InvokeFunction \
  --principal s3.amazonaws.com \
  --source-arn arn:aws:s3:::my-bucket

# Configure S3 event notification
aws s3api put-bucket-notification-configuration \
  --bucket my-bucket \
  --notification-configuration file://notification.json
```

```json
// notification.json
{
  "LambdaFunctionConfigurations": [
    {
      "Id": "ImageUpload",
      "LambdaFunctionArn": "arn:aws:lambda:REGION:ACCOUNT:function:my-function",
      "Events": ["s3:ObjectCreated:*"],
      "Filter": {
        "Key": {
          "FilterRules": [
            {
              "Name": "prefix",
              "Value": "uploads/"
            },
            {
              "Name": "suffix",
              "Value": ".jpg"
            }
          ]
        }
      }
    }
  ]
}
```

```python
# S3 event handler
import json
import boto3
from urllib.parse import unquote_plus

s3 = boto3.client('s3')

def lambda_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = unquote_plus(record['s3']['object']['key'])
        
        print(f'Processing file: {bucket}/{key}')
        
        # Download file
        s3.download_file(bucket, key, f'/tmp/{key}')
        
        # Process file
        # ...
        
        # Upload result
        s3.upload_file(f'/tmp/processed-{key}', bucket, f'processed/{key}')
    
    return {'statusCode': 200}
```

### DynamoDB Streams

```python
# DynamoDB stream handler
import json

def lambda_handler(event, context):
    for record in event['Records']:
        event_name = record['eventName']
        
        if event_name == 'INSERT':
            new_image = record['dynamodb']['NewImage']
            print(f'New item: {json.dumps(new_image)}')
        
        elif event_name == 'MODIFY':
            old_image = record['dynamodb']['OldImage']
            new_image = record['dynamodb']['NewImage']
            print(f'Modified: {old_image} -> {new_image}')
        
        elif event_name == 'REMOVE':
            old_image = record['dynamodb']['OldImage']
            print(f'Deleted: {json.dumps(old_image)}')
    
    return {'statusCode': 200}
```

### EventBridge (CloudWatch Events)

```bash
# Create rule for scheduled execution
aws events put-rule \
  --name daily-backup \
  --schedule-expression "cron(0 2 * * ? *)"

# Add Lambda target
aws events put-targets \
  --rule daily-backup \
  --targets "Id"="1","Arn"="arn:aws:lambda:REGION:ACCOUNT:function:backup-function"

# Add permission
aws lambda add-permission \
  --function-name backup-function \
  --statement-id eventbridge-trigger \
  --action lambda:InvokeFunction \
  --principal events.amazonaws.com \
  --source-arn arn:aws:events:REGION:ACCOUNT:rule/daily-backup
```

### SQS Queue

```python
# SQS event handler
import json

def lambda_handler(event, context):
    for record in event['Records']:
        body = json.loads(record['body'])
        message_id = record['messageId']
        
        print(f'Processing message {message_id}: {body}')
        
        # Process message
        try:
            process_message(body)
        except Exception as e:
            print(f'Error processing message: {e}')
            # Message will be returned to queue or sent to DLQ
            raise
    
    return {'statusCode': 200}

def process_message(message):
    # Your processing logic
    pass
```

## Container Images

### Dockerfile

```dockerfile
FROM public.ecr.aws/lambda/python:3.11

# Copy requirements
COPY requirements.txt ${LAMBDA_TASK_ROOT}
RUN pip install -r requirements.txt

# Copy function code
COPY app.py ${LAMBDA_TASK_ROOT}

# Set handler
CMD ["app.lambda_handler"]
```

```python
# app.py
import json

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Hello from container Lambda!'
        })
    }
```

```bash
# Build image
docker build -t my-lambda:latest .

# Test locally
docker run -p 9000:8080 my-lambda:latest

# Invoke locally
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" \
  -d '{"key": "value"}'

# Push to ECR
aws ecr create-repository --repository-name my-lambda
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin ACCOUNT.dkr.ecr.us-east-1.amazonaws.com

docker tag my-lambda:latest ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/my-lambda:latest
docker push ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/my-lambda:latest

# Create Lambda function from image
aws lambda create-function \
  --function-name container-function \
  --package-type Image \
  --code ImageUri=ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/my-lambda:latest \
  --role arn:aws:iam::ACCOUNT:role/lambda-role
```

## Lambda Layers

### Creating a Layer

```bash
# Create layer structure
mkdir -p layer/python/lib/python3.11/site-packages
pip install requests -t layer/python/lib/python3.11/site-packages/

# Package layer
cd layer && zip -r ../layer.zip . && cd ..

# Publish layer
aws lambda publish-layer-version \
  --layer-name common-dependencies \
  --zip-file fileb://layer.zip \
  --compatible-runtimes python3.11 \
  --description "Common Python dependencies"

# Attach layer to function
aws lambda update-function-configuration \
  --function-name my-function \
  --layers arn:aws:lambda:REGION:ACCOUNT:layer:common-dependencies:1
```

### Using Layers

```python
# lambda_function.py
# requests is available from the layer
import requests

def lambda_handler(event, context):
    response = requests.get('https://api.example.com/data')
    return {
        'statusCode': 200,
        'body': response.text
    }
```

## Environment Variables & Secrets

### Environment Variables

```bash
# Set environment variables
aws lambda update-function-configuration \
  --function-name my-function \
  --environment Variables="{DB_HOST=localhost,DB_PORT=5432,API_KEY=secret}"
```

```python
# Access environment variables
import os

def lambda_handler(event, context):
    db_host = os.environ['DB_HOST']
    api_key = os.environ.get('API_KEY')
    
    return {'statusCode': 200}
```

### AWS Secrets Manager

```python
import boto3
import json
from botocore.exceptions import ClientError

secrets_client = boto3.client('secretsmanager')

def get_secret(secret_name):
    try:
        response = secrets_client.get_secret_value(SecretId=secret_name)
        return json.loads(response['SecretString'])
    except ClientError as e:
        raise e

def lambda_handler(event, context):
    # Get database credentials
    db_secret = get_secret('prod/database/credentials')
    
    # Use credentials
    username = db_secret['username']
    password = db_secret['password']
    
    return {'statusCode': 200}
```

## SAM (Serverless Application Model)

### SAM Template

```yaml
# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    Timeout: 30
    Runtime: python3.11
    Environment:
      Variables:
        ENVIRONMENT: production

Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: hello_world/
      Handler: app.lambda_handler
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref UsersTable
  
  UsersTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: users
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH

Outputs:
  HelloWorldApi:
    Description: "API Gateway endpoint URL"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello/"
```

```bash
# Build SAM application
sam build

# Test locally
sam local invoke HelloWorldFunction -e events/event.json

# Start local API
sam local start-api

# Deploy
sam deploy --guided

# View logs
sam logs -n HelloWorldFunction --tail
```

## VPC Configuration

```bash
# Create Lambda in VPC
aws lambda update-function-configuration \
  --function-name my-function \
  --vpc-config SubnetIds=subnet-xxx,subnet-yyy,SecurityGroupIds=sg-xxx
```

```python
# Access RDS database in VPC
import pymysql

def lambda_handler(event, context):
    connection = pymysql.connect(
        host=os.environ['DB_HOST'],
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASSWORD'],
        database=os.environ['DB_NAME']
    )
    
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users")
            result = cursor.fetchall()
            return {'statusCode': 200, 'body': json.dumps(result)}
    finally:
        connection.close()
```

## Error Handling & Retries

### Custom Error Handling

```python
class ValidationError(Exception):
    pass

def lambda_handler(event, context):
    try:
        # Validate input
        if 'name' not in event:
            raise ValidationError('Name is required')
        
        # Process request
        result = process_data(event)
        
        return {
            'statusCode': 200,
            'body': json.dumps(result)
        }
    
    except ValidationError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
    
    except Exception as e:
        # Log error
        print(f'Error: {e}')
        
        # Return error response
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'})
        }
```

### Dead Letter Queue

```bash
# Create DLQ
aws sqs create-queue --queue-name lambda-dlq

# Configure DLQ for Lambda
aws lambda update-function-configuration \
  --function-name my-function \
  --dead-letter-config TargetArn=arn:aws:sqs:REGION:ACCOUNT:lambda-dlq
```

### Retry Configuration

```bash
# Configure retry attempts
aws lambda put-function-event-invoke-config \
  --function-name my-function \
  --maximum-retry-attempts 1 \
  --maximum-event-age-in-seconds 3600
```

## Performance Optimization

### Memory & CPU

```bash
# Increase memory (CPU scales with memory)
aws lambda update-function-configuration \
  --function-name my-function \
  --memory-size 1024

# Enable ephemeral storage
aws lambda update-function-configuration \
  --function-name my-function \
  --ephemeral-storage Size=2048
```

### Provisioned Concurrency

```bash
# Enable provisioned concurrency
aws lambda put-provisioned-concurrency-config \
  --function-name my-function \
  --provisioned-concurrent-executions 5 \
  --qualifier ALIAS_OR_VERSION
```

### Connection Pooling

```python
# Reuse connections across invocations
import pymysql

# Initialize outside handler
connection = None

def get_connection():
    global connection
    if connection is None or not connection.open:
        connection = pymysql.connect(
            host=os.environ['DB_HOST'],
            user=os.environ['DB_USER'],
            password=os.environ['DB_PASSWORD']
        )
    return connection

def lambda_handler(event, context):
    conn = get_connection()
    # Use connection
    return {'statusCode': 200}
```

## Monitoring & Logging

### CloudWatch Logs

```python
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info('Processing request', extra={
        'request_id': context.request_id,
        'event': event
    })
    
    # Your code
    
    logger.info('Request processed successfully')
    return {'statusCode': 200}
```

### X-Ray Tracing

```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all

patch_all()

@xray_recorder.capture('process_data')
def process_data(data):
    # Your processing logic
    return data

def lambda_handler(event, context):
    result = process_data(event)
    return {'statusCode': 200, 'body': json.dumps(result)}
```

### Custom Metrics

```python
import boto3

cloudwatch = boto3.client('cloudwatch')

def lambda_handler(event, context):
    # Process event
    items_processed = process_items(event)
    
    # Send custom metric
    cloudwatch.put_metric_data(
        Namespace='MyApp',
        MetricData=[
            {
                'MetricName': 'ItemsProcessed',
                'Value': items_processed,
                'Unit': 'Count'
            }
        ]
    )
    
    return {'statusCode': 200}
```

## Best Practices

### Function Design

1. **Keep Functions Small**: Single responsibility principle
2. **Minimize Cold Starts**: Keep deployment packages small
3. **Reuse Connections**: Initialize outside handler
4. **Use Environment Variables**: Configuration management
5. **Implement Idempotency**: Handle duplicate events

### Security

1. **Least Privilege IAM**: Minimal required permissions
2. **Encrypt Environment Variables**: Use AWS KMS
3. **Use VPC When Needed**: Secure access to private resources
4. **Validate Input**: Never trust user input
5. **Rotate Secrets**: Use Secrets Manager rotation

### Performance

1. **Right-Size Memory**: Balance cost and performance
2. **Use Provisioned Concurrency**: Eliminate cold starts
3. **Optimize Dependencies**: Include only what's needed
4. **Enable X-Ray**: Identify bottlenecks
5. **Cache Data**: Use /tmp for temporary storage

## Pricing

### Compute Pricing

- **Requests**: $0.20 per 1M requests
- **Duration**: $0.0000166667 per GB-second
- **Free Tier**: 1M requests + 400,000 GB-seconds/month

### Example Calculation

```
Function: 128 MB memory, 100ms average duration
Monthly invocations: 10 million

Requests: 10M - 1M (free) = 9M * $0.20/1M = $1.80
Duration: (9M * 0.1s * 128MB/1024) - 400,000 free = 712,500 GB-s
         712,500 * $0.0000166667 = $11.88

Total: $1.80 + $11.88 = $13.68/month
```

## Troubleshooting

### Common Issues

```python
# Timeout errors
# Increase timeout in configuration
aws lambda update-function-configuration \
  --function-name my-function \
  --timeout 300

# Memory errors
# Increase memory allocation
aws lambda update-function-configuration \
  --function-name my-function \
  --memory-size 512

# Permission errors
# Check IAM role permissions
aws lambda get-function --function-name my-function

# Cold start optimization
# Use provisioned concurrency or keep packages small
```

## Resources

### Official Documentation

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/)
- [SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)

### Tools & SDKs

- [AWS CLI](https://aws.amazon.com/cli/)
- [AWS SAM CLI](https://aws.amazon.com/serverless/sam/)
- [Serverless Framework](https://www.serverless.com/)
- [AWS SDK](https://aws.amazon.com/tools/)

### Community

- [AWS Forums](https://forums.aws.amazon.com/forum.jspa?forumID=186)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/aws-lambda)
- [AWS re:Post](https://repost.aws/)
- [GitHub AWS Labs](https://github.com/awslabs)

### Learning Resources

- [AWS Lambda Workshop](https://aws.amazon.com/lambda/resources/)
- [Serverless Land](https://serverlessland.com/)
- [AWS Training](https://aws.amazon.com/training/)
- [AWS Lambda Examples](https://github.com/aws-samples/aws-lambda-examples)

---

**Related Technologies**: [API Gateway](../APIGateway/), [DynamoDB](../DynamoDB/), [S3](../S3/), [EventBridge](../EventBridge/), [CloudWatch](../CloudWatch/)
