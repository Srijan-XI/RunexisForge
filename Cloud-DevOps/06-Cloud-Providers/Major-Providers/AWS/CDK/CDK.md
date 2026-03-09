# AWS Cloud Development Kit (CDK)

## Introduction

The AWS Cloud Development Kit (AWS CDK) is an open-source software development framework to define your cloud application resources using familiar programming languages (TypeScript, Python, Java, etc.).

It compiles your imperative code into **CloudFormation Templates** (declarative JSON/YAML) which are then deployed to AWS.

## Installation

Requires Node.js installed.

```bash
npm install -g aws-cdk
```

## Usage (TypeScript)

1.  **Initialize App**:
    ```bash
    mkdir my-cdk-app && cd my-cdk-app
    cdk init app --language typescript
    ```
2.  **Define Resources (`lib/my-cdk-app-stack.ts`)**:
    ```typescript
    import * as cdk from 'aws-cdk-lib';
    import * as s3 from 'aws-cdk-lib/aws-s3';

    export class MyCdkAppStack extends cdk.Stack {
      constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Define an S3 bucket
        new s3.Bucket(this, 'MyFirstBucket', {
          versioned: true,
          removalPolicy: cdk.RemovalPolicy.DESTROY
        });
      }
    }
    ```
3.  **Deploy**:
    ```bash
    cdk bootstrap  # Run once per account/region
    cdk deploy
    ```

## Real World Use Case
**Construct Libraries**: A security team creates a "SecureS3Bucket" class in CDK that enforces encryption, logging, and public access blocks. Developers inherit from this class instead of the raw S3 class, ensuring every bucket created in the company complies with security policy automatically.
