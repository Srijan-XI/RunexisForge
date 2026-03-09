# Google Cloud Run

## Introduction

Google Cloud Run is a fully managed serverless platform that enables you to run containerized applications without worrying about infrastructure. It automatically scales your containers from zero to thousands of instances based on incoming requests, and you only pay for the compute resources you consume during request handling.

### Key Features

- **Serverless Containers**: Deploy any containerized application
- **Automatic Scaling**: Scale from 0 to N based on traffic
- **Pay-per-Use**: Billed only for request processing time
- **Custom Domains**: Map custom domains with automatic SSL
- **Global Deployment**: Deploy to multiple regions worldwide
- **Built on Knative**: Open-source Kubernetes-based platform
- **Language Agnostic**: Any language, any library, any binary
- **Fast Deployments**: Deploy in seconds
- **Integrated Monitoring**: Built-in Cloud Monitoring and Logging
- **VPC Support**: Connect to VPC networks and private services

### Common Use Cases

- **Web Applications**: RESTful APIs, web services, microservices
- **Backend Services**: Mobile and web backends
- **Data Processing**: Webhooks, event processing, ETL
- **Scheduled Tasks**: Cron jobs with Cloud Scheduler
- **Real-time Processing**: Stream processing, event handling
- **AI/ML Inference**: Serve machine learning models
- **Legacy Modernization**: Containerize and deploy legacy apps
- **Hybrid Deployments**: Run on GCP and on-premises

## Getting Started

### Prerequisites

```bash
# Install Google Cloud SDK
# Windows
# Download from: https://cloud.google.com/sdk/docs/install

# macOS
brew install --cask google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize gcloud
gcloud init

# Authenticate
gcloud auth login

# Set project
gcloud config set project PROJECT_ID

# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Install Docker
# macOS
brew install docker

# Verify installation
gcloud --version
docker --version
```

### Quick Start - Deploy Sample App

```bash
# Clone sample app
git clone https://github.com/GoogleCloudPlatform/cloud-run-hello.git
cd cloud-run-hello

# Deploy directly (Cloud Run builds the container)
gcloud run deploy hello-service \
  --source . \
  --region us-central1 \
  --allow-unauthenticated

# Get service URL
gcloud run services describe hello-service \
  --region us-central1 \
  --format 'value(status.url)'
```

## Container Development

### Node.js Application

```javascript
// server.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Cloud Run!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  res.status(201).json({
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    createdAt: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

```dockerfile
# Dockerfile
FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Use PORT environment variable
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
```

```json
// package.json
{
  "name": "cloudrun-nodejs-app",
  "version": "1.0.0",
  "description": "Node.js app for Cloud Run",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### Python Application

```python
# main.py
import os
from flask import Flask, jsonify, request
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({
        'message': 'Hello from Cloud Run!',
        'timestamp': datetime.utcnow().isoformat(),
        'environment': os.environ.get('ENVIRONMENT', 'development')
    })

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'}), 200

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    return jsonify({
        'id': os.urandom(8).hex(),
        'name': data.get('name'),
        'email': data.get('email'),
        'createdAt': datetime.utcnow().isoformat()
    }), 201

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
```

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=8080
EXPOSE 8080

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
```

```txt
# requirements.txt
Flask==3.0.0
gunicorn==21.2.0
```

### Go Application

```go
// main.go
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "time"
)

type Response struct {
    Message     string    `json:"message"`
    Timestamp   time.Time `json:"timestamp"`
    Environment string    `json:"environment"`
}

type User struct {
    ID        string    `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"createdAt"`
}

func main() {
    http.HandleFunc("/", handleRoot)
    http.HandleFunc("/health", handleHealth)
    http.HandleFunc("/api/users", handleUsers)

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("Server listening on port %s", port)
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatal(err)
    }
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
    response := Response{
        Message:     "Hello from Cloud Run!",
        Timestamp:   time.Now(),
        Environment: getEnv("ENVIRONMENT", "development"),
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"status": "healthy"})
}

func handleUsers(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    var reqBody struct {
        Name  string `json:"name"`
        Email string `json:"email"`
    }

    if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    user := User{
        ID:        fmt.Sprintf("%d", time.Now().UnixNano()),
        Name:      reqBody.Name,
        Email:     reqBody.Email,
        CreatedAt: time.Now(),
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}

func getEnv(key, fallback string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return fallback
}
```

```dockerfile
# Dockerfile
FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates

WORKDIR /root/
COPY --from=builder /app/main .

ENV PORT=8080
EXPOSE 8080

CMD ["./main"]
```

## Deployment

### Build and Deploy with Docker

```bash
# Set environment variables
export PROJECT_ID=$(gcloud config get-value project)
export REGION=us-central1
export SERVICE_NAME=my-service

# Build container
docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME:v1 .

# Test locally
docker run -p 8080:8080 -e PORT=8080 gcr.io/$PROJECT_ID/$SERVICE_NAME:v1

# Push to Container Registry
docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:v1

# Deploy to Cloud Run
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:v1 \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated

# Deploy with environment variables
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:v1 \
  --region $REGION \
  --set-env-vars "ENVIRONMENT=production,API_KEY=secret123" \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 100 \
  --concurrency 80
```

### Build from Source

```bash
# Deploy from source (Cloud Run builds automatically)
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --allow-unauthenticated

# Specify buildpacks
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --buildpack google.nodejs.runtime
```

### Deploy with Artifact Registry

```bash
# Enable Artifact Registry API
gcloud services enable artifactregistry.googleapis.com

# Create repository
gcloud artifacts repositories create my-repo \
  --repository-format=docker \
  --location=$REGION \
  --description="Docker repository"

# Configure Docker authentication
gcloud auth configure-docker $REGION-docker.pkg.dev

# Build and push
docker build -t $REGION-docker.pkg.dev/$PROJECT_ID/my-repo/$SERVICE_NAME:v1 .
docker push $REGION-docker.pkg.dev/$PROJECT_ID/my-repo/$SERVICE_NAME:v1

# Deploy
gcloud run deploy $SERVICE_NAME \
  --image $REGION-docker.pkg.dev/$PROJECT_ID/my-repo/$SERVICE_NAME:v1 \
  --region $REGION
```

## Configuration

### Environment Variables & Secrets

```bash
# Set environment variables
gcloud run services update $SERVICE_NAME \
  --region $REGION \
  --set-env-vars "DATABASE_URL=postgres://...,REDIS_URL=redis://..."

# Use secrets from Secret Manager
gcloud run services update $SERVICE_NAME \
  --region $REGION \
  --set-secrets "API_KEY=api-key-secret:latest,DB_PASSWORD=db-password:1"

# Update from YAML
gcloud run services replace service.yaml
```

```yaml
# service.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: my-service
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: '100'
        autoscaling.knative.dev/minScale: '1'
    spec:
      containerConcurrency: 80
      timeoutSeconds: 300
      containers:
      - image: gcr.io/PROJECT_ID/my-service:v1
        ports:
        - containerPort: 8080
        env:
        - name: ENVIRONMENT
          value: production
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: api-key-secret
              key: latest
        resources:
          limits:
            memory: 512Mi
            cpu: '1'
```

### Scaling Configuration

```bash
# Set minimum and maximum instances
gcloud run services update $SERVICE_NAME \
  --region $REGION \
  --min-instances 1 \
  --max-instances 100

# Set CPU allocation (always allocated or only during requests)
gcloud run services update $SERVICE_NAME \
  --region $REGION \
  --cpu-throttling  # CPU allocated only during requests (default)

gcloud run services update $SERVICE_NAME \
  --region $REGION \
  --no-cpu-throttling  # CPU always allocated

# Set concurrency (requests per instance)
gcloud run services update $SERVICE_NAME \
  --region $REGION \
  --concurrency 80
```

## Cloud SQL Integration

### Connect to Cloud SQL

```bash
# Deploy with Cloud SQL connection
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:v1 \
  --region $REGION \
  --add-cloudsql-instances PROJECT_ID:REGION:INSTANCE_NAME \
  --set-env-vars "DB_HOST=/cloudsql/PROJECT_ID:REGION:INSTANCE_NAME,DB_USER=myuser,DB_NAME=mydb" \
  --set-secrets "DB_PASSWORD=db-password:latest"
```

### Node.js with Cloud SQL

```javascript
// database.js
const { Sequelize } = require('sequelize');
const pg = require('pg');

const socketPath = process.env.DB_SOCKET_PATH || '/cloudsql';
const instanceName = process.env.INSTANCE_CONNECTION_NAME;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: instanceName ? `${socketPath}/${instanceName}` : process.env.DB_HOST,
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: instanceName ? {
      socketPath: `${socketPath}/${instanceName}`
    } : {},
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
```

### Python with Cloud SQL

```python
# database.py
import os
import sqlalchemy
from sqlalchemy.pool import NullPool

def init_connection_pool():
    # Check if running in Cloud Run
    db_socket_dir = os.environ.get("DB_SOCKET_PATH", "/cloudsql")
    instance_connection_name = os.environ.get("INSTANCE_CONNECTION_NAME")
    
    if instance_connection_name:
        # Unix socket connection for Cloud SQL
        db_config = {
            "pool_size": 5,
            "max_overflow": 2,
            "pool_timeout": 30,
            "pool_recycle": 1800,
        }
        pool = sqlalchemy.create_engine(
            sqlalchemy.engine.url.URL.create(
                drivername="postgresql+pg8000",
                username=os.environ.get("DB_USER"),
                password=os.environ.get("DB_PASSWORD"),
                database=os.environ.get("DB_NAME"),
                query={
                    "unix_sock": f"{db_socket_dir}/{instance_connection_name}/.s.PGSQL.5432"
                }
            ),
            **db_config
        )
    else:
        # TCP connection for local development
        pool = sqlalchemy.create_engine(
            f"postgresql+pg8000://{os.environ.get('DB_USER')}:{os.environ.get('DB_PASSWORD')}@{os.environ.get('DB_HOST')}/{os.environ.get('DB_NAME')}",
            poolclass=NullPool
        )
    
    return pool

db = init_connection_pool()
```

## Custom Domains & HTTPS

```bash
# Map custom domain
gcloud run domain-mappings create \
  --service $SERVICE_NAME \
  --domain api.example.com \
  --region $REGION

# List domain mappings
gcloud run domain-mappings list --region $REGION

# Describe domain mapping (get DNS records)
gcloud run domain-mappings describe \
  --domain api.example.com \
  --region $REGION

# Delete domain mapping
gcloud run domain-mappings delete \
  --domain api.example.com \
  --region $REGION
```

## Authentication & Authorization

### Require Authentication

```bash
# Deploy with authentication required
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:v1 \
  --region $REGION \
  --no-allow-unauthenticated

# Allow specific service account
gcloud run services add-iam-policy-binding $SERVICE_NAME \
  --region $REGION \
  --member "serviceAccount:my-service@PROJECT_ID.iam.gserviceaccount.com" \
  --role "roles/run.invoker"

# Allow all authenticated users
gcloud run services add-iam-policy-binding $SERVICE_NAME \
  --region $REGION \
  --member "allAuthenticatedUsers" \
  --role "roles/run.invoker"
```

### Call Authenticated Service

```javascript
// Node.js - Call authenticated Cloud Run service
const { GoogleAuth } = require('google-auth-library');

async function callAuthenticatedService(url) {
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(url);
    
    const response = await client.request({
        url: url,
        method: 'GET'
    });
    
    return response.data;
}

// Usage
const serviceUrl = 'https://my-service-xxxx-uc.a.run.app';
callAuthenticatedService(serviceUrl)
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

```python
# Python - Call authenticated Cloud Run service
from google.auth.transport.requests import Request
from google.oauth2 import id_token
import requests

def call_authenticated_service(url):
    auth_req = Request()
    id_token_value = id_token.fetch_id_token(auth_req, url)
    
    headers = {'Authorization': f'Bearer {id_token_value}'}
    response = requests.get(url, headers=headers)
    
    return response.json()

# Usage
service_url = 'https://my-service-xxxx-uc.a.run.app'
data = call_authenticated_service(service_url)
print(data)
```

## VPC Connector

```bash
# Create VPC connector
gcloud compute networks vpc-access connectors create my-connector \
  --region $REGION \
  --network default \
  --range 10.8.0.0/28

# Deploy with VPC connector
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:v1 \
  --region $REGION \
  --vpc-connector my-connector \
  --vpc-egress all-traffic  # or private-ranges-only
```

## Scheduled Jobs (Cron)

```bash
# Create Cloud Scheduler job
gcloud scheduler jobs create http my-scheduled-job \
  --location $REGION \
  --schedule "0 2 * * *" \
  --uri "https://my-service-xxxx-uc.a.run.app/api/cleanup" \
  --http-method POST \
  --oidc-service-account-email my-service@PROJECT_ID.iam.gserviceaccount.com \
  --oidc-token-audience "https://my-service-xxxx-uc.a.run.app"

# List jobs
gcloud scheduler jobs list --location $REGION

# Run job manually
gcloud scheduler jobs run my-scheduled-job --location $REGION
```

## CI/CD with GitHub Actions

```yaml
# .github/workflows/deploy-cloudrun.yml
name: Deploy to Cloud Run

on:
  push:
    branches: [main]

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  SERVICE_NAME: my-service
  REGION: us-central1

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v1
        with:
          workload_identity_provider: ${{ secrets.WIF_PROVIDER }}
          service_account: ${{ secrets.WIF_SERVICE_ACCOUNT }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v1

      - name: Configure Docker
        run: gcloud auth configure-docker

      - name: Build container
        run: |
          docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA .
          docker tag gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA gcr.io/$PROJECT_ID/$SERVICE_NAME:latest

      - name: Push container
        run: |
          docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA
          docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:latest

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy $SERVICE_NAME \
            --image gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA \
            --region $REGION \
            --platform managed \
            --allow-unauthenticated \
            --set-env-vars "COMMIT_SHA=$GITHUB_SHA"

      - name: Get service URL
        run: |
          SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
            --region $REGION \
            --format 'value(status.url)')
          echo "Service URL: $SERVICE_URL"
```

## Monitoring & Logging

### Cloud Logging

```javascript
// Node.js - Structured logging
const { Logging } = require('@google-cloud/logging');
const logging = new Logging();
const log = logging.log('my-service-log');

function writeLog(severity, message, data) {
    const metadata = {
        severity: severity,
        resource: { type: 'cloud_run_revision' }
    };

    const entry = log.entry(metadata, {
        message: message,
        ...data
    });

    log.write(entry);
}

// Usage
app.use((req, res, next) => {
    writeLog('INFO', 'Request received', {
        method: req.method,
        path: req.path,
        ip: req.ip
    });
    next();
});
```

```python
# Python - Structured logging
import google.cloud.logging
import logging

client = google.cloud.logging.Client()
client.setup_logging()

# Use standard logging
logging.info('Application started', extra={
    'environment': os.environ.get('ENVIRONMENT'),
    'version': '1.0.0'
})

logging.error('Error occurred', extra={
    'error_type': 'DatabaseError',
    'user_id': 'user123'
})
```

### View Logs

```bash
# View recent logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=$SERVICE_NAME" \
  --limit 50 \
  --format json

# Tail logs in real-time
gcloud alpha run services logs tail $SERVICE_NAME --region $REGION

# Filter logs
gcloud logging read "resource.type=cloud_run_revision AND severity>=ERROR" \
  --limit 20
```

## Best Practices

### Performance

1. **Optimize Cold Starts**: Keep container images small, use slim base images
2. **Minimum Instances**: Set min-instances for critical services
3. **Connection Pooling**: Reuse database and HTTP connections
4. **Async Processing**: Use background tasks for long operations
5. **Caching**: Implement caching for expensive operations

### Cost Optimization

1. **Right-size Resources**: Match CPU and memory to workload
2. **CPU Allocation**: Use CPU throttling for request-only workloads
3. **Scale to Zero**: Let idle services scale to zero
4. **Request Bundling**: Batch operations when possible
5. **Monitor Usage**: Track request metrics and adjust limits

### Security

1. **Least Privilege**: Use service accounts with minimal permissions
2. **Secret Manager**: Store secrets securely, never in code
3. **VPC Connector**: Isolate backend services in VPC
4. **Authentication**: Require authentication for internal services
5. **HTTPS Only**: Always use HTTPS with custom domains

### Reliability

1. **Health Checks**: Implement /health endpoints
2. **Graceful Shutdown**: Handle SIGTERM signals properly
3. **Timeouts**: Set appropriate timeout values
4. **Error Handling**: Implement comprehensive error handling
5. **Monitoring**: Set up alerts for errors and latency

## Pricing

### Compute Resources
- **CPU**: $0.00002400 per vCPU-second
- **Memory**: $0.00000250 per GiB-second
- **Requests**: $0.40 per million requests

### Free Tier (per month)
- **2 million requests**
- **360,000 vCPU-seconds**
- **180,000 GiB-seconds**
- **1 GB network egress** (North America)

### Example Cost
- Service: 1 million requests/month
- Resources: 1 vCPU, 512 MiB memory
- Request time: 200ms average
- **Monthly cost**: ~$10-15

## Troubleshooting

```bash
# Check service status
gcloud run services describe $SERVICE_NAME --region $REGION

# List revisions
gcloud run revisions list --service $SERVICE_NAME --region $REGION

# View service logs
gcloud logging read "resource.type=cloud_run_revision" --limit 100

# Test service locally
docker run -p 8080:8080 -e PORT=8080 gcr.io/$PROJECT_ID/$SERVICE_NAME:v1

# Check IAM permissions
gcloud run services get-iam-policy $SERVICE_NAME --region $REGION

# Delete service
gcloud run services delete $SERVICE_NAME --region $REGION
```

## Resources

### Official Documentation
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Quickstart Guides](https://cloud.google.com/run/docs/quickstarts)
- [Best Practices](https://cloud.google.com/run/docs/best-practices)
- [Container Contract](https://cloud.google.com/run/docs/container-contract)

### Tools
- [gcloud CLI](https://cloud.google.com/sdk/gcloud/reference/run)
- [Cloud Console](https://console.cloud.google.com/run)
- [Local Development](https://cloud.google.com/run/docs/testing/local)

### Samples
- [Code Samples](https://github.com/GoogleCloudPlatform/cloud-run-samples)
- [Button](https://github.com/GoogleCloudPlatform/cloud-run-button)
- [Awesome Cloud Run](https://github.com/steren/awesome-cloudrun)

### Community
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-cloud-run)
- [Issue Tracker](https://issuetracker.google.com/issues?q=componentid:190802)
- [Release Notes](https://cloud.google.com/run/docs/release-notes)

### Learning Resources
- [Cloud Run Learning Path](https://cloud.google.com/training/application-development#cloud-run)
- [Codelabs](https://codelabs.developers.google.com/?cat=Cloud+Run)
- [Videos](https://www.youtube.com/results?search_query=google+cloud+run)

---

**Related Technologies**: [Kubernetes](../../Kubernetes/), [Docker](../../Docker/), [Cloud Functions](../CloudFunctions/), [AWS Lambda](../../AWS/Lambda/), [Azure Container Instances](../../Azure/ContainerInstances/)
