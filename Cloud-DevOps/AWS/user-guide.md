# AWS Usage Guide

## Setup

- Create AWS account; set up MFA
- Install AWS CLI: <https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html>
- Configure: `aws configure` (Access key, Secret, Region, Output)

## Common CLI Tasks

```bash
# S3 bucket
aws s3 mb s3://my-bucket-demo
aws s3 cp file.txt s3://my-bucket-demo/

# EC2 key pair and instance
aws ec2 create-key-pair --key-name demo-key --query 'KeyMaterial' --output text > demo-key.pem
aws ec2 run-instances --image-id ami-xxxx --instance-type t3.micro --key-name demo-key --security-group-ids sg-xxxx --subnet-id subnet-xxxx

# Lambda deploy (zip)
aws lambda create-function --function-name hello --runtime nodejs18.x --handler index.handler --role arn:aws:iam::123:role/lambda-role --zip-file fileb://function.zip
```bash

## Kubernetes (EKS)

- Use `eksctl create cluster --name demo --nodes 2`
- Update kubeconfig: `aws eks update-kubeconfig --name demo`

## Identity

- IAM roles for EC2/Lambda/EKS service accounts
- Least privilege policies; avoid long-lived root keys

## Monitoring

- CloudWatch metrics/logs; create alarms
- X-Ray for tracing

## Cost Control

- Budgets and alerts
- Use cost explorer; stop idle instances; S3 lifecycle to Glacier
