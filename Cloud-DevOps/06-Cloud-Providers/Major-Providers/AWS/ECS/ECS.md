# AWS ECS (Elastic Container Service)

## Introduction

Amazon Elastic Container Service (ECS) is a fully managed container orchestration service that makes it easy to deploy, manage, and scale containerized applications. ECS supports Docker containers and allows you to run and scale containerized applications on AWS without managing your own container orchestration infrastructure.

### Key Features

- **Fully Managed**: No control plane to manage
- **Two Launch Types**: EC2 and Fargate (serverless)
- **Deep AWS Integration**: Native integration with AWS services
- **Service Discovery**: Built-in service discovery with Cloud Map
- **Load Balancing**: Integration with ALB, NLB, and Classic Load Balancers
- **Auto Scaling**: Task and service-level auto-scaling
- **Task Placement**: Flexible task placement strategies
- **Security**: IAM roles for tasks, encryption at rest and in transit
- **Monitoring**: CloudWatch integration for logs and metrics
- **Blue/Green Deployments**: Zero-downtime deployments with CodeDeploy

### Common Use Cases

- **Microservices**: Deploy and manage microservice architectures
- **Batch Processing**: Run batch jobs and ETL workloads
- **Web Applications**: Host scalable web applications
- **API Services**: Deploy RESTful and GraphQL APIs
- **Machine Learning**: Run ML inference workloads
- **Continuous Integration**: Build and test pipelines
- **Data Processing**: Stream and batch data processing
- **Gaming**: Game servers and game analytics

## Core Concepts

### Clusters
- Logical grouping of tasks or services
- Regional resource
- Can contain EC2 instances or Fargate tasks

### Task Definitions
- Blueprint for your application
- Defines container images, CPU, memory, networking
- Similar to Kubernetes Pod specification
- Supports multiple containers per task

### Tasks
- Instantiation of a task definition
- Can run as standalone tasks or as part of a service

### Services
- Maintains specified number of task instances
- Integrates with load balancers
- Handles task failures and replacements
- Supports auto-scaling

## Getting Started

### Prerequisites

```bash
# Install AWS CLI
# Windows (PowerShell as Administrator)
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

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

# Install ECS CLI (optional)
sudo curl -Lo /usr/local/bin/ecs-cli https://amazon-ecs-cli.s3.amazonaws.com/ecs-cli-linux-amd64-latest
sudo chmod +x /usr/local/bin/ecs-cli

# Verify installation
aws ecs --version
ecs-cli --version
```

### Create ECS Cluster

```bash
# Create Fargate cluster
aws ecs create-cluster --cluster-name my-cluster

# Create EC2 cluster (requires EC2 instances)
aws ecs create-cluster \
  --cluster-name my-ec2-cluster \
  --capacity-providers EC2 \
  --default-capacity-provider-strategy capacityProvider=EC2,weight=1
```

## Task Definitions

### Simple Task Definition (Fargate)

```json
{
  "family": "web-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "nginx",
      "image": "nginx:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/web-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "nginx"
        }
      }
    }
  ],
  "executionRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskRole"
}
```

```bash
# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# List task definitions
aws ecs list-task-definitions

# Describe task definition
aws ecs describe-task-definition --task-definition web-app
```

### Node.js Application Task Definition

```json
{
  "family": "nodejs-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "app",
      "image": "ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/nodejs-app:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "PORT",
          "value": "3000"
        }
      ],
      "secrets": [
        {
          "name": "DB_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:ACCOUNT_ID:secret:db-password"
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      },
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-create-group": "true",
          "awslogs-group": "/ecs/nodejs-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "app"
        }
      }
    }
  ],
  "executionRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskRole"
}
```

### Multi-Container Task Definition

```json
{
  "family": "app-with-sidecar",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "containerDefinitions": [
    {
      "name": "app",
      "image": "my-app:latest",
      "portMappings": [
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "dependsOn": [
        {
          "containerName": "envoy",
          "condition": "HEALTHY"
        }
      ],
      "essential": true
    },
    {
      "name": "envoy",
      "image": "envoyproxy/envoy:v1.25-latest",
      "portMappings": [
        {
          "containerPort": 9901,
          "protocol": "tcp"
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -s http://localhost:9901/ready | grep LIVE"],
        "interval": 5,
        "timeout": 2,
        "retries": 3
      },
      "essential": false
    },
    {
      "name": "log-router",
      "image": "fluent/fluent-bit:latest",
      "essential": false,
      "firelensConfiguration": {
        "type": "fluentbit"
      }
    }
  ]
}
```

## Services

### Create ECS Service (Fargate)

```bash
# Create service with load balancer
aws ecs create-service \
  --cluster my-cluster \
  --service-name web-service \
  --task-definition web-app:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:REGION:ACCOUNT:targetgroup/my-targets/xxx,containerName=nginx,containerPort=80"

# Update service
aws ecs update-service \
  --cluster my-cluster \
  --service web-service \
  --desired-count 4 \
  --task-definition web-app:2

# Delete service
aws ecs delete-service \
  --cluster my-cluster \
  --service web-service \
  --force
```

### Service Definition (JSON)

```json
{
  "serviceName": "api-service",
  "taskDefinition": "nodejs-app",
  "desiredCount": 3,
  "launchType": "FARGATE",
  "platformVersion": "LATEST",
  "networkConfiguration": {
    "awsvpcConfiguration": {
      "subnets": ["subnet-xxx", "subnet-yyy"],
      "securityGroups": ["sg-xxx"],
      "assignPublicIp": "DISABLED"
    }
  },
  "loadBalancers": [
    {
      "targetGroupArn": "arn:aws:elasticloadbalancing:us-east-1:ACCOUNT:targetgroup/api/xxx",
      "containerName": "app",
      "containerPort": 3000
    }
  ],
  "healthCheckGracePeriodSeconds": 60,
  "deploymentConfiguration": {
    "deploymentCircuitBreaker": {
      "enable": true,
      "rollback": true
    },
    "maximumPercent": 200,
    "minimumHealthyPercent": 100
  },
  "enableECSManagedTags": true,
  "propagateTags": "SERVICE"
}
```

## Fargate vs EC2 Launch Types

### Fargate (Serverless)

```bash
# Fargate task definition
{
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "256",
  "memory": "512"
}

# Create Fargate service
aws ecs create-service \
  --cluster my-cluster \
  --service-name fargate-service \
  --task-definition my-task:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx]}"
```

**Advantages**:
- No server management
- Pay per task
- Automatic scaling
- Better isolation

### EC2 Launch Type

```bash
# EC2 task definition
{
  "requiresCompatibilities": ["EC2"],
  "networkMode": "bridge",
  "cpu": 256,
  "memory": 512
}

# Create EC2 service
aws ecs create-service \
  --cluster my-ec2-cluster \
  --service-name ec2-service \
  --task-definition my-task:1 \
  --desired-count 2 \
  --launch-type EC2 \
  --placement-strategy "type=spread,field=instanceId"
```

**Advantages**:
- More control over instances
- Can be more cost-effective at scale
- GPU support
- Wider instance type selection

## Auto Scaling

### Service Auto Scaling

```bash
# Register scalable target
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/my-cluster/web-service \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 2 \
  --max-capacity 10

# Create scaling policy (target tracking)
aws application-autoscaling put-scaling-policy \
  --service-namespace ecs \
  --resource-id service/my-cluster/web-service \
  --scalable-dimension ecs:service:DesiredCount \
  --policy-name cpu-scaling \
  --policy-type TargetTrackingScaling \
  --target-tracking-scaling-policy-configuration file://scaling-policy.json
```

```json
// scaling-policy.json
{
  "TargetValue": 70.0,
  "PredefinedMetricSpecification": {
    "PredefinedMetricType": "ECSServiceAverageCPUUtilization"
  },
  "ScaleInCooldown": 60,
  "ScaleOutCooldown": 60
}
```

### Step Scaling Policy

```json
{
  "AdjustmentType": "PercentChangeInCapacity",
  "StepAdjustments": [
    {
      "MetricIntervalLowerBound": 0,
      "MetricIntervalUpperBound": 10,
      "ScalingAdjustment": 10
    },
    {
      "MetricIntervalLowerBound": 10,
      "ScalingAdjustment": 30
    }
  ],
  "MetricAggregationType": "Average"
}
```

## Networking

### VPC Configuration

```bash
# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16

# Create subnets
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.1.0/24 --availability-zone us-east-1a
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.2.0/24 --availability-zone us-east-1b

# Create security group
aws ec2 create-security-group \
  --group-name ecs-tasks \
  --description "Security group for ECS tasks" \
  --vpc-id vpc-xxx

# Add inbound rule
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxx \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0
```

### Service Discovery

```bash
# Create private DNS namespace
aws servicediscovery create-private-dns-namespace \
  --name myapp.local \
  --vpc vpc-xxx

# Create service
aws servicediscovery create-service \
  --name api \
  --dns-config "NamespaceId=ns-xxx,DnsRecords=[{Type=A,TTL=60}]" \
  --health-check-custom-config FailureThreshold=1

# Update ECS service with service discovery
aws ecs update-service \
  --cluster my-cluster \
  --service api-service \
  --service-registries "registryArn=arn:aws:servicediscovery:us-east-1:ACCOUNT:service/srv-xxx"
```

## Load Balancing

### Application Load Balancer

```bash
# Create target group
aws elbv2 create-target-group \
  --name ecs-targets \
  --protocol HTTP \
  --port 80 \
  --vpc-id vpc-xxx \
  --target-type ip \
  --health-check-path /health

# Create load balancer
aws elbv2 create-load-balancer \
  --name ecs-alb \
  --subnets subnet-xxx subnet-yyy \
  --security-groups sg-xxx

# Create listener
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:REGION:ACCOUNT:loadbalancer/app/ecs-alb/xxx \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:REGION:ACCOUNT:targetgroup/ecs-targets/xxx
```

### Network Load Balancer

```bash
# Create NLB target group
aws elbv2 create-target-group \
  --name ecs-nlb-targets \
  --protocol TCP \
  --port 8080 \
  --vpc-id vpc-xxx \
  --target-type ip

# Create NLB
aws elbv2 create-load-balancer \
  --name ecs-nlb \
  --type network \
  --subnets subnet-xxx subnet-yyy
```

## Container Images

### Dockerfile for ECS

```dockerfile
# Multi-stage build for Node.js
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs package.json ./

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "dist/index.js"]
```

### Push to ECR

```bash
# Create ECR repository
aws ecr create-repository --repository-name my-app

# Get login token
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Build image
docker build -t my-app:latest .

# Tag image
docker tag my-app:latest ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/my-app:latest

# Push image
docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
```

## Environment Variables & Secrets

### Environment Variables

```json
{
  "containerDefinitions": [
    {
      "name": "app",
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "LOG_LEVEL",
          "value": "info"
        }
      ]
    }
  ]
}
```

### Secrets from Secrets Manager

```json
{
  "containerDefinitions": [
    {
      "name": "app",
      "secrets": [
        {
          "name": "DB_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:ACCOUNT:secret:prod/db/password-xxx"
        },
        {
          "name": "API_KEY",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:ACCOUNT:secret:prod/api/key-xxx"
        }
      ]
    }
  ]
}
```

### Secrets from Parameter Store

```json
{
  "containerDefinitions": [
    {
      "name": "app",
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:ssm:us-east-1:ACCOUNT:parameter/prod/database/url"
        }
      ]
    }
  ]
}
```

## Logging & Monitoring

### CloudWatch Logs

```json
{
  "logConfiguration": {
    "logDriver": "awslogs",
    "options": {
      "awslogs-create-group": "true",
      "awslogs-group": "/ecs/my-app",
      "awslogs-region": "us-east-1",
      "awslogs-stream-prefix": "app"
    }
  }
}
```

### FireLens (FluentBit/Fluentd)

```json
{
  "containerDefinitions": [
    {
      "name": "log_router",
      "image": "amazon/aws-for-fluent-bit:latest",
      "essential": true,
      "firelensConfiguration": {
        "type": "fluentbit",
        "options": {
          "enable-ecs-log-metadata": "true"
        }
      }
    },
    {
      "name": "app",
      "logConfiguration": {
        "logDriver": "awsfirelens",
        "options": {
          "Name": "cloudwatch",
          "region": "us-east-1",
          "log_group_name": "/ecs/firelens",
          "auto_create_group": "true",
          "log_stream_prefix": "app-"
        }
      }
    }
  ]
}
```

### Container Insights

```bash
# Enable Container Insights
aws ecs update-cluster-settings \
  --cluster my-cluster \
  --settings name=containerInsights,value=enabled

# View metrics in CloudWatch
aws cloudwatch get-metric-statistics \
  --namespace AWS/ECS \
  --metric-name CPUUtilization \
  --dimensions Name=ServiceName,Value=web-service Name=ClusterName,Value=my-cluster \
  --start-time 2026-01-17T00:00:00Z \
  --end-time 2026-01-17T23:59:59Z \
  --period 3600 \
  --statistics Average
```

## CI/CD Integration

### GitHub Actions Deployment

```yaml
# .github/workflows/deploy-ecs.yml
name: Deploy to ECS

on:
  push:
    branches: [main]

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: my-app
  ECS_SERVICE: web-service
  ECS_CLUSTER: my-cluster
  ECS_TASK_DEFINITION: task-definition.json
  CONTAINER_NAME: app

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Login to ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build, tag, and push image
        id: build-image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          echo "image=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT
      
      - name: Fill in new image ID in task definition
        id: task-def
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: ${{ env.ECS_TASK_DEFINITION }}
          container-name: ${{ env.CONTAINER_NAME }}
          image: ${{ steps.build-image.outputs.image }}
      
      - name: Deploy to ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: ${{ steps.task-def.outputs.task-definition }}
          service: ${{ env.ECS_SERVICE }}
          cluster: ${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true
```

### AWS CodePipeline

```json
{
  "pipeline": {
    "name": "ecs-pipeline",
    "roleArn": "arn:aws:iam::ACCOUNT:role/CodePipelineServiceRole",
    "stages": [
      {
        "name": "Source",
        "actions": [
          {
            "name": "Source",
            "actionTypeId": {
              "category": "Source",
              "owner": "AWS",
              "provider": "CodeCommit",
              "version": "1"
            },
            "configuration": {
              "RepositoryName": "my-app",
              "BranchName": "main"
            },
            "outputArtifacts": [{"name": "SourceOutput"}]
          }
        ]
      },
      {
        "name": "Build",
        "actions": [
          {
            "name": "Build",
            "actionTypeId": {
              "category": "Build",
              "owner": "AWS",
              "provider": "CodeBuild",
              "version": "1"
            },
            "configuration": {
              "ProjectName": "my-app-build"
            },
            "inputArtifacts": [{"name": "SourceOutput"}],
            "outputArtifacts": [{"name": "BuildOutput"}]
          }
        ]
      },
      {
        "name": "Deploy",
        "actions": [
          {
            "name": "Deploy",
            "actionTypeId": {
              "category": "Deploy",
              "owner": "AWS",
              "provider": "ECS",
              "version": "1"
            },
            "configuration": {
              "ClusterName": "my-cluster",
              "ServiceName": "web-service",
              "FileName": "imagedefinitions.json"
            },
            "inputArtifacts": [{"name": "BuildOutput"}]
          }
        ]
      }
    ]
  }
}
```

## Blue/Green Deployments

```json
{
  "deploymentConfiguration": {
    "deploymentCircuitBreaker": {
      "enable": true,
      "rollback": true
    }
  },
  "deploymentController": {
    "type": "CODE_DEPLOY"
  }
}
```

```yaml
# AppSpec file for CodeDeploy
version: 0.0
Resources:
  - TargetService:
      Type: AWS::ECS::Service
      Properties:
        TaskDefinition: "arn:aws:ecs:us-east-1:ACCOUNT:task-definition/my-app:1"
        LoadBalancerInfo:
          ContainerName: "app"
          ContainerPort: 3000
        PlatformVersion: "LATEST"
        NetworkConfiguration:
          AwsvpcConfiguration:
            Subnets: ["subnet-xxx", "subnet-yyy"]
            SecurityGroups: ["sg-xxx"]
            AssignPublicIp: "DISABLED"
```

## Best Practices

### Task Definitions

1. **Use Latest Platform Version**: Keep Fargate platform updated
2. **Right-Size Resources**: Match CPU and memory to workload
3. **Health Checks**: Implement container health checks
4. **Logging**: Use structured logging
5. **Least Privilege**: Minimal IAM permissions

### Security

1. **Use Task IAM Roles**: Per-task permissions
2. **Secrets Management**: Use Secrets Manager/Parameter Store
3. **Private Subnets**: Run tasks in private subnets
4. **Image Scanning**: Scan ECR images for vulnerabilities
5. **Network Policies**: Use security groups effectively

### Performance

1. **Connection Pooling**: Reuse database connections
2. **Caching**: Implement application-level caching
3. **Auto Scaling**: Configure appropriate scaling policies
4. **Load Balancer**: Use target deregistration delay
5. **Task Placement**: Optimize placement strategies

## Pricing

### Fargate Pricing

- **vCPU**: $0.04048 per vCPU per hour
- **Memory**: $0.004445 per GB per hour
- **Storage**: $0.000111 per GB per hour (ephemeral)

**Example**:
```
Task: 0.5 vCPU, 1 GB memory
Running: 24 hours/day, 30 days/month

vCPU: 0.5 * $0.04048 * 720 hours = $14.57
Memory: 1 * $0.004445 * 720 hours = $3.20
Total: $17.77/month per task
```

### EC2 Pricing

- Based on EC2 instance pricing
- No additional ECS charges
- More cost-effective at scale

## Troubleshooting

### Common Issues

```bash
# Task fails to start
aws ecs describe-tasks \
  --cluster my-cluster \
  --tasks task-id

# Check stopped tasks
aws ecs list-tasks \
  --cluster my-cluster \
  --desired-status STOPPED

# View task logs
aws logs tail /ecs/my-app --follow

# Service not reaching steady state
aws ecs describe-services \
  --cluster my-cluster \
  --services web-service

# Check target health
aws elbv2 describe-target-health \
  --target-group-arn arn:aws:elasticloadbalancing:REGION:ACCOUNT:targetgroup/my-targets/xxx
```

## Resources

### Official Documentation

- [ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [ECS Developer Guide](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/)
- [Fargate Documentation](https://docs.aws.amazon.com/AmazonECS/latest/userguide/)
- [ECS Best Practices](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/)

### Tools & CLIs

- [AWS CLI](https://aws.amazon.com/cli/)
- [ECS CLI](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_CLI.html)
- [Copilot CLI](https://aws.github.io/copilot-cli/)
- [eksctl](https://eksctl.io/) (for EKS comparison)

### Community

- [AWS Forums](https://forums.aws.amazon.com/forum.jspa?forumID=187)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/amazon-ecs)
- [AWS re:Post](https://repost.aws/)
- [GitHub AWS Containers](https://github.com/aws-containers)

### Learning Resources

- [ECS Workshop](https://ecsworkshop.com/)
- [AWS Containers Blog](https://aws.amazon.com/blogs/containers/)
- [AWS Training](https://aws.amazon.com/training/)
- [ECS Samples](https://github.com/aws-samples/amazon-ecs-samples)

---

**Related Technologies**: [Docker](../../Docker/), [Kubernetes](../../Kubernetes/), [AWS Fargate](../Fargate/), [ECR](../ECR/), [Lambda](../Lambda/)
