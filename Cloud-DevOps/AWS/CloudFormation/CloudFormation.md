# AWS CloudFormation

## Introduction

AWS CloudFormation is the native Infrastructure as Code (IaC) service for AWS. It allows you to model, provision, and manage AWS and third-party resources by treating infrastructure as code.

You define a **Template** (JSON or YAML), and CloudFormation creates a **Stack** of resources based on that template.

## Template Anatomy (YAML)

A basic template consists of:
1.  **Parameters**: Inputs (e.g., Instance Type).
2.  **Resources**: The actual AWS components (EC2, S3).
3.  **Outputs**: Return values (e.g., Load Balancer URL).

## Example `template.yaml`

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: A simple S3 Bucket

Parameters:
  BucketNameParam:
    Type: String
    Description: Name of the bucket

Resources:
  MyS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref BucketNameParam
      AccessControl: Private

Outputs:
  BucketARN:
    Value: !GetAtt MyS3Bucket.Arn
    Description: The ARN of the bucket
```

## Deployment

Using AWS CLI:
```bash
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name my-stack \
  --parameter-overrides BucketNameParam=my-unique-bucket-name
```

## Real World Use Case
**Disaster Recovery**: You have a template that defines your entire production network (VPC, Subnets, Gateways). If the `us-east-1` region goes down, you can execute the exact same template in `us-west-2` to spin up a replica of your infrastructure in minutes.
