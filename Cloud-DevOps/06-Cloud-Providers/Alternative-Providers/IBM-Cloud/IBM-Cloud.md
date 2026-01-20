# IBM Cloud

## Introduction

### What is IBM Cloud?

IBM Cloud is an enterprise-grade cloud computing platform offering Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). It combines IBM's enterprise heritage with modern cloud capabilities, featuring Watson AI, Quantum computing, blockchain services, and robust hybrid cloud solutions powered by Red Hat OpenShift.

### Why IBM Cloud?

- Watson AI and machine learning
- Red Hat OpenShift integration
- Quantum computing access
- Enterprise-grade security
- Hybrid and multicloud capabilities
- Blockchain platform
- Extensive compliance certifications
- Global data center network
- Cloud Foundry application platform
- Strong database offerings (Db2, Cloudant)

## Prerequisites

- IBM Cloud account (free tier available)
- Credit card (for paid services)
- Basic cloud computing knowledge
- CLI tools (optional but recommended)
- Understanding of containers/Kubernetes (for advanced features)

## Getting Started

### Create Account

1. Visit [cloud.ibm.com](https://cloud.ibm.com/)
2. Sign up for free account
3. Verify email
4. Add payment method (optional for free tier)
5. Access IBM Cloud Console

### Free Tier Resources

```
Compute:
- Cloud Foundry: 256 MB runtime memory
- Code Engine: 100K vCPU-seconds/month
- Functions: 5M executions/month

Container:
- Container Registry: 500 MB storage
- Kubernetes: Free cluster (1 worker node, 2 vCPU, 4GB RAM)

AI/Data:
- Watson Studio: Lite plan
- Watson Assistant: Lite plan
- Cloudant: Lite plan (1GB storage)

Storage:
- Cloud Object Storage: 25GB/month

Additional:
- Monitoring, Logging
- API Connect Lite
- App ID
```

## IBM Cloud CLI

### Installation

```bash
# Linux/macOS
curl -fsSL https://clis.cloud.ibm.com/install/linux | sh

# macOS (Homebrew)
brew install ibmcloud-cli

# Windows
# Download from: https://cloud.ibm.com/docs/cli
```

### Configuration

```bash
# Login
ibmcloud login

# Login with SSO
ibmcloud login --sso

# Login with API key
ibmcloud login --apikey @key_file.json

# Target region and resource group
ibmcloud target -r us-south
ibmcloud target -g Default

# Install plugins
ibmcloud plugin install container-service
ibmcloud plugin install container-registry
ibmcloud plugin install cloud-functions
ibmcloud plugin install code-engine
```

## Virtual Servers (VPC)

### Creating Virtual Server Instance

```bash
# Via CLI
ibmcloud is instance-create my-instance \
  <vpc-id> \
  us-south-1 \
  bx2-2x8 \
  <subnet-id> \
  --image <image-id> \
  --keys <ssh-key-id>

# List instances
ibmcloud is instances
```

### Via Console

```
1. VPC Infrastructure → Virtual server instances → Create
2. Choose location (region, zone)
3. Select image (Ubuntu, CentOS, Red Hat, Windows)
4. Choose profile (balanced, compute, memory)
5. Add SSH keys
6. Configure networking
7. Create
```

### Connecting to Instance

```bash
# SSH to Linux instance
ssh root@<floating-ip>

# Get floating IP
ibmcloud is instance-network-interface-floating-ip-add \
  <instance-id> \
  <network-interface-id> \
  <floating-ip-id>
```

## Cloud Foundry

### Push Application

```bash
# Login to Cloud Foundry
ibmcloud target --cf

# Push app
cd myapp
ibmcloud cf push myapp

# With manifest
# manifest.yml
---
applications:
- name: myapp
  memory: 256M
  instances: 2
  buildpack: python_buildpack
  command: python app.py

ibmcloud cf push
```

### Node.js Example

```javascript
// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from IBM Cloud!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

```json
// package.json
{
  "name": "myapp",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

```yaml
# manifest.yml
applications:
- name: myapp
  memory: 128M
  command: npm start
  buildpack: nodejs_buildpack
```

## Kubernetes Service (IKS)

### Creating Cluster

```bash
# Free cluster
ibmcloud ks cluster create classic \
  --name my-cluster

# Standard cluster
ibmcloud ks cluster create vpc-gen2 \
  --name my-cluster \
  --zone us-south-1 \
  --flavor bx2.4x16 \
  --workers 3

# Get cluster config
ibmcloud ks cluster config --cluster my-cluster

# Verify
kubectl get nodes
```

### Deploy Application

```bash
# Create deployment
kubectl create deployment nginx --image=nginx

# Expose service
kubectl expose deployment nginx --port=80 --type=LoadBalancer

# Get external IP
kubectl get service nginx
```

## Red Hat OpenShift

### Creating OpenShift Cluster

```bash
# Create cluster
ibmcloud oc cluster create vpc-gen2 \
  --name my-openshift \
  --zone us-south-1 \
  --flavor bx2.4x16 \
  --workers 3 \
  --version 4.14_openshift

# Get cluster credentials
ibmcloud oc cluster config --cluster my-openshift --admin

# Verify
oc get nodes
```

### Deploy Application

```bash
# Create new project
oc new-project myapp

# Deploy from Git
oc new-app https://github.com/sclorg/nodejs-ex

# Expose route
oc expose svc/nodejs-ex

# Get route
oc get route
```

## Code Engine

### Deploy Container

```bash
# Create project
ibmcloud ce project create --name myproject
ibmcloud ce project select --name myproject

# Deploy application
ibmcloud ce application create \
  --name myapp \
  --image icr.io/codeengine/hello \
  --port 8080

# Get URL
ibmcloud ce application get --name myapp

# Update application
ibmcloud ce application update \
  --name myapp \
  --image myregistry/myapp:v2
```

### Run Batch Jobs

```bash
# Create job
ibmcloud ce job create \
  --name myjob \
  --image icr.io/codeengine/job

# Run job
ibmcloud ce jobrun submit --job myjob

# View logs
ibmcloud ce jobrun logs --jobrun myjob-xxxxx
```

## Cloud Functions (Serverless)

### Creating Action

```bash
# Create action from file
ibmcloud fn action create hello hello.js

# hello.js
function main(params) {
  const name = params.name || 'World';
  return { message: `Hello, ${name}!` };
}

# Invoke action
ibmcloud fn action invoke hello --result

# With parameters
ibmcloud fn action invoke hello --result --param name "IBM Cloud"
```

### Python Example

```python
# hello.py
def main(params):
    name = params.get('name', 'World')
    return {'message': f'Hello, {name}!'}
```

```bash
ibmcloud fn action create hello-py hello.py --kind python:3.9
ibmcloud fn action invoke hello-py --result --param name "Python"
```

### API Gateway

```bash
# Create API
ibmcloud fn api create /api /hello get hello

# Get API URL
ibmcloud fn api list

# Test
curl https://<api-url>/api/hello
```

## Watson Services

### Watson Assistant

```bash
# Create instance
ibmcloud resource service-instance-create \
  my-assistant \
  conversation \
  lite \
  us-south

# Get credentials
ibmcloud resource service-key-create \
  my-assistant-key \
  Manager \
  --instance-name my-assistant
```

### Using Watson SDK

```python
from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

authenticator = IAMAuthenticator('your-api-key')
assistant = AssistantV2(
    version='2021-06-14',
    authenticator=authenticator
)
assistant.set_service_url('your-service-url')

# Create session
session = assistant.create_session(
    assistant_id='your-assistant-id'
).get_result()

# Send message
response = assistant.message(
    assistant_id='your-assistant-id',
    session_id=session['session_id'],
    input={'message_type': 'text', 'text': 'Hello'}
).get_result()

print(response['output']['generic'][0]['text'])
```

## Databases

### Cloudant (NoSQL)

```bash
# Create instance
ibmcloud resource service-instance-create \
  my-cloudant \
  cloudantnosqldb \
  lite \
  us-south

# Get URL and credentials
ibmcloud resource service-key my-cloudant-key

# Using Python
from cloudant.client import Cloudant

client = Cloudant.iam(
    'account_name',
    'api_key',
    url='https://account.cloudant.com',
    connect=True
)

# Create database
db = client.create_database('mydb')

# Insert document
doc = {'name': 'John', 'age': 30}
db.create_document(doc)

# Query
for doc in db:
    print(doc)
```

### Db2

```bash
# Create Db2 instance
ibmcloud resource service-instance-create \
  my-db2 \
  dashdb-for-transactions \
  lite \
  us-south

# Connect
db2 connect to BLUDB user <username> using <password>

# Create table
db2 "CREATE TABLE users (id INT, name VARCHAR(50))"

# Insert data
db2 "INSERT INTO users VALUES (1, 'John')"

# Query
db2 "SELECT * FROM users"
```

## Object Storage

### Creating Bucket

```bash
# Install plugin
ibmcloud plugin install cloud-object-storage

# Create instance
ibmcloud resource service-instance-create \
  my-cos \
  cloud-object-storage \
  lite \
  global

# Create bucket
ibmcloud cos bucket-create --bucket my-bucket --region us-south
```

### Upload/Download Files

```bash
# Upload file
ibmcloud cos upload \
  --bucket my-bucket \
  --key file.txt \
  --file /path/to/file.txt

# Download file
ibmcloud cos download \
  --bucket my-bucket \
  --key file.txt \
  --file downloaded.txt

# List objects
ibmcloud cos objects --bucket my-bucket
```

### Using Python SDK

```python
import ibm_boto3
from ibm_botocore.client import Config

cos = ibm_boto3.resource('s3',
    ibm_api_key_id='api_key',
    ibm_service_instance_id='instance_id',
    config=Config(signature_version='oauth'),
    endpoint_url='https://s3.us-south.cloud-object-storage.appdomain.cloud'
)

# Upload file
cos.Bucket('my-bucket').upload_file('/path/to/file.txt', 'file.txt')

# Download file
cos.Bucket('my-bucket').download_file('file.txt', 'downloaded.txt')

# List objects
for obj in cos.Bucket('my-bucket').objects.all():
    print(obj.key)
```

## Container Registry

### Pushing Images

```bash
# Login
ibmcloud cr login

# Create namespace
ibmcloud cr namespace-add my-namespace

# Tag image
docker tag myapp:latest us.icr.io/my-namespace/myapp:latest

# Push image
docker push us.icr.io/my-namespace/myapp:latest

# List images
ibmcloud cr images
```

## Monitoring & Logging

### IBM Cloud Monitoring

```bash
# Create monitoring instance
ibmcloud resource service-instance-create \
  my-monitoring \
  sysdig-monitor \
  lite \
  us-south

# Get access key
ibmcloud resource service-key my-monitoring-key
```

### Log Analysis

```bash
# Create logging instance
ibmcloud resource service-instance-create \
  my-logging \
  logdna \
  lite \
  us-south

# Configure logging agent
kubectl create secret generic logdna-agent-key \
  --from-literal=logdna-agent-key=<INGESTION_KEY>

kubectl create -f https://assets.us-south.logging.cloud.ibm.com/clients/logdna-agent-ds.yaml
```

## Terraform Integration

```hcl
terraform {
  required_providers {
    ibm = {
      source = "IBM-Cloud/ibm"
    }
  }
}

provider "ibm" {
  ibmcloud_api_key = var.ibmcloud_api_key
  region           = "us-south"
}

resource "ibm_is_vpc" "vpc" {
  name = "my-vpc"
}

resource "ibm_is_subnet" "subnet" {
  name            = "my-subnet"
  vpc             = ibm_is_vpc.vpc.id
  zone            = "us-south-1"
  ipv4_cidr_block = "10.240.0.0/24"
}

resource "ibm_is_instance" "instance" {
  name    = "my-instance"
  image   = "r006-14140f94-fcc4-11e9-96e7-a72723715315"
  profile = "bx2-2x8"
  vpc     = ibm_is_vpc.vpc.id
  zone    = "us-south-1"
  
  primary_network_interface {
    subnet = ibm_is_subnet.subnet.id
  }
  
  keys = [ibm_is_ssh_key.key.id]
}
```

## Security

### IAM Policies

```bash
# Create service ID
ibmcloud iam service-id-create my-service-id

# Create API key for service ID
ibmcloud iam service-api-key-create my-key my-service-id

# Assign access policy
ibmcloud iam service-policy-create my-service-id \
  --roles Viewer \
  --service-name cloud-object-storage
```

### Secrets Manager

```bash
# Create instance
ibmcloud resource service-instance-create \
  my-secrets \
  secrets-manager \
  trial \
  us-south

# Create secret
ibmcloud secrets-manager secret-create \
  --secret-type=arbitrary \
  --name="db-password" \
  --payload="MySecurePassword123"
```

## Best Practices

### Cost Management

- Use lite plans for development
- Monitor resource usage
- Set spending notifications
- Delete unused resources
- Use reserved capacity for production
- Implement auto-scaling

### Security

- Enable MFA for all accounts
- Use IAM policies with least privilege
- Rotate API keys regularly
- Enable activity tracking
- Use private endpoints
- Implement network ACLs
- Encrypt data at rest and in transit

### Performance

- Choose appropriate regions
- Use CDN for static content
- Implement caching strategies
- Optimize database queries
- Use load balancers
- Monitor application performance

## Troubleshooting

### Common Issues

```bash
# CLI not authenticated
ibmcloud login

# Resource not found
ibmcloud target -g <resource-group>

# Application won't start
ibmcloud cf logs <app-name> --recent

# Kubernetes pod issues
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

## Resources

- [IBM Cloud Docs](https://cloud.ibm.com/docs)
- [CLI Reference](https://cloud.ibm.com/docs/cli)
- [Terraform Provider](https://registry.terraform.io/providers/IBM-Cloud/ibm/latest/docs)
- [Developer Resources](https://developer.ibm.com/components/cloud/)
- [Code Patterns](https://developer.ibm.com/patterns/)
- [Community](https://community.ibm.com/community/user/cloud/home)

## Next Steps

- Deploy a Cloud Foundry application
- Create Kubernetes cluster
- Explore Watson AI services
- Set up OpenShift environment
- Implement serverless functions
- Configure monitoring and logging
- Build CI/CD pipelines
- Integrate with on-premises systems
