# MinIO

## Introduction

MinIO is a high-performance, S3-compatible object storage system designed for cloud-native applications, AI/ML workloads, and data lakes. It's open-source, Kubernetes-native, and can run anywhere from edge devices to multi-cloud environments.

### What is MinIO?

MinIO is a software-defined object storage system that provides Amazon S3 compatible APIs. It's designed to be simple, fast, and scalable, making it ideal for storing unstructured data like photos, videos, log files, backups, and container images at scale.

### Key Features

- **S3 Compatible**: 100% compatible with Amazon S3 APIs
- **High Performance**: Read/write speeds up to 183 GB/s per server
- **Kubernetes Native**: First-class Kubernetes support with Operator
- **Erasure Coding**: Data protection with configurable redundancy
- **Encryption**: Server-side and client-side encryption support
- **Multi-Cloud**: Run anywhere - on-premises, cloud, or edge
- **Versioning**: Object versioning and retention policies
- **Replication**: Multi-site active-active replication
- **IAM Integration**: AWS IAM-compatible access management
- **Open Source**: Apache License 2.0

### Use Cases

- **Data Lakes**: Store and analyze massive datasets
- **AI/ML Workloads**: Training data and model storage
- **Backup and Archive**: Ransomware-proof immutable backups
- **Container Registry**: Store Docker and OCI images
- **Media Streaming**: Video and audio content delivery
- **Database Backups**: PostgreSQL, MySQL, MongoDB backups
- **Log Storage**: Centralized log aggregation
- **Development/Testing**: S3-compatible local storage

### MinIO vs Other Object Storage

| Feature | MinIO | AWS S3 | Ceph | Swift |
|---------|-------|---------|------|-------|
| **S3 Compatibility** | 100% | Native | Partial | Limited |
| **Performance** | Excellent | Good | Good | Moderate |
| **Deployment** | Anywhere | AWS only | Self-hosted | Self-hosted |
| **Cost** | Free | Pay-per-use | Free | Free |
| **Kubernetes** | Native | N/A | Good | Limited |
| **License** | Apache 2.0 | Proprietary | LGPL | Apache 2.0 |

### Architecture Overview

**MinIO Components:**

**Server:**
- Object storage engine
- S3 API endpoint
- Metadata management
- Erasure coding engine

**Console:**
- Web-based UI
- Monitoring and management
- User and policy management
- Bucket configuration

**Client (mc):**
- Command-line tool
- Bucket management
- File operations
- Administration

**Deployment Modes:**
- **Standalone**: Single server, single drive
- **Distributed**: Multiple servers, erasure coding
- **Multi-Site**: Geo-distributed replication

---

## Installation & Setup

### Prerequisites

- Operating System: Linux, macOS, Windows, or Kubernetes
- Minimum RAM: 4GB (8GB+ for production)
- Disk Space: Depends on storage needs
- Network: Low latency between nodes (for distributed mode)
- Ports: 9000 (API), 9001 (Console)

### Installation Methods

#### Method 1: Binary Installation

**Linux:**
```bash
# Download MinIO server
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio

# Move to path
sudo mv minio /usr/local/bin/

# Create data directory
mkdir -p /mnt/data

# Start MinIO (standalone)
export MINIO_ROOT_USER=minioadmin
export MINIO_ROOT_PASSWORD=minioadmin123
minio server /mnt/data --console-address ":9001"
```

**macOS:**
```bash
# Install with Homebrew
brew install minio/stable/minio

# Start MinIO
export MINIO_ROOT_USER=minioadmin
export MINIO_ROOT_PASSWORD=minioadmin123
minio server /Users/username/minio-data --console-address ":9001"
```

**Windows:**
```powershell
# Download MinIO
Invoke-WebRequest -Uri "https://dl.min.io/server/minio/release/windows-amd64/minio.exe" -OutFile "C:\minio\minio.exe"

# Set credentials
$env:MINIO_ROOT_USER="minioadmin"
$env:MINIO_ROOT_PASSWORD="minioadmin123"

# Start MinIO
C:\minio\minio.exe server C:\minio\data --console-address ":9001"
```

#### Method 2: Docker

```bash
# Run standalone MinIO
docker run -d \
  --name minio \
  -p 9000:9000 \
  -p 9001:9001 \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin123" \
  -v /mnt/data:/data \
  quay.io/minio/minio server /data --console-address ":9001"

# Access Console
http://localhost:9001
```

#### Method 3: Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  minio:
    image: quay.io/minio/minio:latest
    container_name: minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin123
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3
    restart: unless-stopped

volumes:
  minio_data:
```

```bash
# Start MinIO
docker-compose up -d

# View logs
docker-compose logs -f minio
```

#### Method 4: Distributed Mode (4+ Nodes)

```bash
# On each server (replace with actual IPs)
export MINIO_ROOT_USER=minioadmin
export MINIO_ROOT_PASSWORD=minioadmin123

# Start distributed MinIO (4 nodes, 4 drives per node)
minio server \
  http://server1/mnt/disk{1...4} \
  http://server2/mnt/disk{1...4} \
  http://server3/mnt/disk{1...4} \
  http://server4/mnt/disk{1...4} \
  --console-address ":9001"
```

#### Method 5: Kubernetes with Operator

```bash
# Install MinIO Operator
kubectl apply -k "github.com/minio/operator"

# Create MinIO Tenant
cat <<EOF | kubectl apply -f -
apiVersion: minio.min.io/v2
kind: Tenant
metadata:
  name: minio
  namespace: default
spec:
  image: quay.io/minio/minio:latest
  pools:
    - servers: 4
      volumesPerServer: 4
      volumeClaimTemplate:
        spec:
          accessModes:
            - ReadWriteOnce
          resources:
            requests:
              storage: 100Gi
  mountPath: /export
  requestAutoCert: false
  s3:
    bucketDNS: false
  certConfig:
    commonName: ""
    organizationName: []
    dnsNames: []
  env:
    - name: MINIO_BROWSER
      value: "on"
  console:
    replicas: 2
EOF
```

#### Method 6: Helm Chart

```bash
# Add MinIO Helm repository
helm repo add minio https://charts.min.io/
helm repo update

# Install MinIO
helm install minio minio/minio \
  --set rootUser=minioadmin \
  --set rootPassword=minioadmin123 \
  --set persistence.size=100Gi

# Custom values
cat > values.yaml <<EOF
replicas: 4
persistence:
  enabled: true
  size: 100Gi
  storageClass: fast-ssd
mode: distributed
resources:
  requests:
    memory: 8Gi
    cpu: 4
EOF

helm install minio minio/minio -f values.yaml
```

### Install MinIO Client (mc)

```bash
# Linux
wget https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x mc
sudo mv mc /usr/local/bin/

# macOS
brew install minio/stable/mc

# Configure alias
mc alias set myminio http://localhost:9000 minioadmin minioadmin123

# Test connection
mc admin info myminio
```

### Verify Installation

```bash
# Check server status
curl http://localhost:9000/minio/health/live

# Access Web Console
http://localhost:9001

# List buckets (using mc)
mc ls myminio
```

---

## User Guide

### Getting Started

#### 1. Access MinIO Console

Navigate to `http://localhost:9001` and login with:
- **Username**: minioadmin
- **Password**: minioadmin123

#### 2. Create Buckets

**Using Web Console:**
1. Click "Create Bucket"
2. Enter bucket name (e.g., "my-bucket")
3. Configure settings
4. Click "Create"

**Using MinIO Client (mc):**
```bash
# Create bucket
mc mb myminio/my-bucket

# List buckets
mc ls myminio

# Remove bucket
mc rb myminio/my-bucket
```

**Using AWS CLI:**
```bash
# Configure AWS CLI for MinIO
aws configure --profile minio
# AWS Access Key ID: minioadmin
# AWS Secret Access Key: minioadmin123
# Default region: us-east-1

# Create bucket
aws s3 mb s3://my-bucket --endpoint-url http://localhost:9000 --profile minio

# List buckets
aws s3 ls --endpoint-url http://localhost:9000 --profile minio
```

#### 3. Upload and Download Files

**Using mc:**
```bash
# Upload file
mc cp myfile.txt myminio/my-bucket/

# Upload directory
mc cp --recursive /path/to/dir myminio/my-bucket/

# Download file
mc cp myminio/my-bucket/myfile.txt ./

# Download recursively
mc mirror myminio/my-bucket /local/backup/
```

**Using AWS CLI:**
```bash
# Upload file
aws s3 cp file.txt s3://my-bucket/ --endpoint-url http://localhost:9000

# Upload directory
aws s3 sync /local/dir s3://my-bucket/ --endpoint-url http://localhost:9000

# Download file
aws s3 cp s3://my-bucket/file.txt ./ --endpoint-url http://localhost:9000

# List objects
aws s3 ls s3://my-bucket/ --endpoint-url http://localhost:9000
```

**Using Python (boto3):**
```python
import boto3

# Configure client
s3 = boto3.client(
    's3',
    endpoint_url='http://localhost:9000',
    aws_access_key_id='minioadmin',
    aws_secret_access_key='minioadmin123'
)

# Create bucket
s3.create_bucket(Bucket='my-bucket')

# Upload file
s3.upload_file('local-file.txt', 'my-bucket', 'remote-file.txt')

# Download file
s3.download_file('my-bucket', 'remote-file.txt', 'downloaded-file.txt')

# List objects
response = s3.list_objects_v2(Bucket='my-bucket')
for obj in response.get('Contents', []):
    print(obj['Key'])
```

### Advanced Features

#### Versioning

```bash
# Enable versioning
mc version enable myminio/my-bucket

# List versions
mc ls --versions myminio/my-bucket/file.txt

# Restore specific version
mc cp --version-id VERSION_ID myminio/my-bucket/file.txt ./
```

#### Lifecycle Policies

```bash
# Create lifecycle policy JSON
cat > lifecycle.json <<EOF
{
  "Rules": [
    {
      "ID": "DeleteOldVersions",
      "Status": "Enabled",
      "Filter": {},
      "NoncurrentVersionExpiration": {
        "NoncurrentDays": 30
      }
    },
    {
      "ID": "TransitionToArchive",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "archive/"
      },
      "Transitions": [
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        }
      ]
    }
  ]
}
EOF

# Apply lifecycle policy
mc ilm import myminio/my-bucket < lifecycle.json

# View lifecycle policy
mc ilm list myminio/my-bucket
```

#### Replication

```bash
# Enable versioning (required for replication)
mc version enable myminio/source-bucket
mc version enable myminio/target-bucket

# Configure replication
mc replicate add myminio/source-bucket \
  --remote-bucket http://minioadmin:minioadmin123@remote-minio:9000/target-bucket \
  --replicate "delete,delete-marker"

# Check replication status
mc replicate status myminio/source-bucket
```

#### Encryption

**Server-Side Encryption (SSE-S3):**
```bash
# Enable default encryption
mc encrypt set sse-s3 myminio/my-bucket

# Upload with encryption
aws s3 cp file.txt s3://my-bucket/ \
  --server-side-encryption AES256 \
  --endpoint-url http://localhost:9000
```

**Client-Side Encryption:**
```python
import boto3
from boto3.s3.transfer import TransferConfig

s3 = boto3.client('s3', endpoint_url='http://localhost:9000',
                  aws_access_key_id='minioadmin',
                  aws_secret_access_key='minioadmin123')

# Upload with SSE-C
s3.put_object(
    Bucket='my-bucket',
    Key='encrypted-file.txt',
    Body=b'Secret data',
    SSECustomerAlgorithm='AES256',
    SSECustomerKey='32-byte-encryption-key-here!!!'
)
```

#### Access Policies

```bash
# Set public download policy
mc anonymous set download myminio/my-bucket

# Set custom policy
cat > policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"AWS": ["*"]},
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::my-bucket/public/*"]
    }
  ]
}
EOF

mc anonymous set-json policy.json myminio/my-bucket
```

#### User Management

```bash
# Create user
mc admin user add myminio newuser newpassword

# Create policy
cat > readonly.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::my-bucket/*"]
    }
  ]
}
EOF

# Add policy
mc admin policy add myminio readonly readonly.json

# Attach policy to user
mc admin policy set myminio readonly user=newuser

# List users
mc admin user list myminio
```

### Integration Examples

#### Backup PostgreSQL to MinIO

```bash
#!/bin/bash
# Backup script
BACKUP_FILE="backup-$(date +%Y%m%d-%H%M%S).sql.gz"

# Create backup
pg_dump -h localhost -U postgres mydb | gzip > /tmp/$BACKUP_FILE

# Upload to MinIO
mc cp /tmp/$BACKUP_FILE myminio/backups/postgres/

# Cleanup
rm /tmp/$BACKUP_FILE
```

#### Docker Registry with MinIO

```yaml
# docker-compose.yml for registry
version: '3.8'

services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    environment:
      REGISTRY_STORAGE: s3
      REGISTRY_STORAGE_S3_ACCESSKEY: minioadmin
      REGISTRY_STORAGE_S3_SECRETKEY: minioadmin123
      REGISTRY_STORAGE_S3_REGION: us-east-1
      REGISTRY_STORAGE_S3_BUCKET: docker-registry
      REGISTRY_STORAGE_S3_REGIONENDPOINT: http://minio:9000
      REGISTRY_STORAGE_S3_SECURE: false
```

#### Velero Backup with MinIO

```bash
# Install Velero with MinIO
velero install \
  --provider aws \
  --plugins velero/velero-plugin-for-aws:v1.8.0 \
  --bucket velero-backups \
  --secret-file ./credentials-velero \
  --use-volume-snapshots=false \
  --backup-location-config region=minio,s3ForcePathStyle="true",s3Url=http://minio.default:9000
```

#### MLflow with MinIO

```python
import mlflow
import os

# Configure MLflow to use MinIO
os.environ['MLFLOW_S3_ENDPOINT_URL'] = 'http://localhost:9000'
os.environ['AWS_ACCESS_KEY_ID'] = 'minioadmin'
os.environ['AWS_SECRET_ACCESS_KEY'] = 'minioadmin123'

# Log artifacts
with mlflow.start_run():
    mlflow.log_artifact('model.pkl', 's3://mlflow-artifacts/')
```

### Monitoring

```bash
# Server info
mc admin info myminio

# Disk usage
mc du myminio/my-bucket

# Server logs
mc admin logs myminio

# Prometheus metrics
curl http://localhost:9000/minio/v2/metrics/cluster
```

---

## Best Practices

### Performance Optimization

1. **Use Distributed Mode**: For production workloads
2. **NVMe/SSD Storage**: For best performance
3. **Network**: 10Gbps or higher between nodes
4. **Erasure Coding**: Balance between redundancy and capacity

### Data Protection

1. **Enable Versioning**: Protect against accidental deletion
2. **Replication**: Multi-site for disaster recovery
3. **Lifecycle Policies**: Automate data management
4. **Backup**: Regular backups to separate location

### Security

1. **Strong Credentials**: Change default admin password
2. **TLS/SSL**: Enable encryption in transit
3. **IAM Policies**: Principle of least privilege
4. **Audit Logging**: Track all access

### Cost Optimization

1. **Lifecycle Rules**: Move old data to cheaper tiers
2. **Compression**: Enable for compressible data
3. **Erasure Coding**: Optimize storage efficiency
4. **Monitoring**: Track usage and costs

---

## Troubleshooting

### Common Issues

**Connection Refused:**
```bash
# Check if MinIO is running
ps aux | grep minio

# Check port availability
netstat -tulpn | grep 9000
```

**Disk Space Full:**
```bash
# Check disk usage
df -h

# Clean up old versions
mc ilm add myminio/my-bucket --expire-delete-marker
```

**Slow Performance:**
```bash
# Check network latency
mc admin speedtest myminio

# Monitor resources
mc admin top myminio
```

---

## Resources

### Official Documentation
- [MinIO Documentation](https://min.io/docs/minio/linux/index.html)
- [MinIO Client Guide](https://min.io/docs/minio/linux/reference/minio-mc.html)
- [Kubernetes Operator](https://min.io/docs/minio/kubernetes/upstream/index.html)

### Tutorials
- [Getting Started](https://min.io/docs/minio/linux/operations/installation.html)
- [Distributed Setup](https://min.io/docs/minio/linux/operations/install-deploy-manage/deploy-minio-multi-node-multi-drive.html)
- [Security Hardening](https://min.io/docs/minio/linux/operations/network-encryption.html)

### Community
- [MinIO Slack](https://slack.min.io/)
- [GitHub Repository](https://github.com/minio/minio)
- [Community Forum](https://github.com/minio/minio/discussions)

### Tools
- [MinIO Console](https://github.com/minio/console)
- [MinIO Client (mc)](https://github.com/minio/mc)
- [MinIO SDKs](https://min.io/docs/minio/linux/developers/minio-drivers.html)

---

*Last Updated: January 2026*
