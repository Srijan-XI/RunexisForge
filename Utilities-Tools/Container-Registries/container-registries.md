# Container Registries - Managing Docker Images

## Table of Contents
- [Container Registries - Managing Docker Images](#container-registries---managing-docker-images)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [What is a Container Registry?](#what-is-a-container-registry)
    - [Why Use Container Registries?](#why-use-container-registries)
  - [Public Cloud Registries](#public-cloud-registries)
    - [Docker Hub](#docker-hub)
    - [GitHub Container Registry (GHCR)](#github-container-registry-ghcr)
    - [Quay.io](#quayio)
  - [Cloud Provider Registries](#cloud-provider-registries)
    - [Amazon ECR (Elastic Container Registry)](#amazon-ecr-elastic-container-registry)
  - [Google GCR](#google-gcr)
  - [Azure ACR](#azure-acr)
  - [GitHub Container Registry (GHCR)](#github-container-registry-ghcr-1)
  - [Best Practices](#best-practices)
  - [Resources](#resources)

---

## Introduction

### What is a Container Registry?

A **Container Registry** is a centralized repository for storing, managing, and distributing container images (primarily Docker images, but also OCI-compliant images). Just as GitHub stores your source code, a container registry stores your build artifacts—the packaged applications ready to run.

**Key Components**:
- **Repository**: A collection of related images (e.g., `myapp`)
- **Tag**: A version identifier (e.g., `v1.0.0`, `latest`, `dev`)
- **Image**: The actual container artifact (layers + metadata)
- **Manifest**: Metadata describing image layers and configuration

### Why Use Container Registries?

1. **Centralized Storage**: Single source of truth for container images
2. **Version Control**: Tag and track different versions of images
3. **Distribution**: Share images across teams, environments, and clouds
4. **Security**: Scan for vulnerabilities before deployment
5. **Access Control**: Manage who can push/pull images
6. **CI/CD Integration**: Automate build and deploy pipelines
7. **Performance**: Cache layers, geo-distribute images
8. **Compliance**: Audit trail of image usage and changes

**Registry Types**:
- **Public Registries**: Docker Hub, Quay.io (free for public images)
- **Cloud Provider Registries**: AWS ECR, Google Artifact Registry, Azure ACR
- **Self-Hosted**: Harbor, Artifactory, Nexus (full control, on-premises or private cloud)

---

## Public Cloud Registries

### Docker Hub

The default and most popular public container registry.

**Features**:
- **Public Repositories**: Free for unlimited public images
- **Official Images**: Curated by Docker and vendors (e.g., `node`, `python`, `nginx`, `postgres`)
- **Verified Publishers**: Trusted image sources
- **Automated Builds**: Build images from GitHub/Bitbucket repos
- **Webhooks**: Trigger actions on push
- **Image Scanning**: Vulnerability detection (paid plans)

**Pricing**:
- Free: 1 private repository, unlimited public repositories
- Pro: $5/month - Unlimited private repositories
- Team: $7/user/month - Team collaboration features
- Business: $25/user/month - SSO, audit logs

**Usage**:
```bash
# Login
docker login
# Enter username and password/access token

# Tag image (format: username/repository:tag)
docker tag my-app:latest myusername/my-app:1.0.0
docker tag my-app:latest myusername/my-app:latest

# Push to Docker Hub
docker push myusername/my-app:1.0.0
docker push myusername/my-app:latest

# Pull image
docker pull myusername/my-app:1.0.0

# Pull official image
docker pull nginx:latest
docker pull postgres:15-alpine

# Search images
docker search nginx
```

**Using Access Tokens (Recommended)**:
```bash
# Generate token at https://hub.docker.com/settings/security
echo "YOUR_ACCESS_TOKEN" | docker login -u myusername --password-stdin
```

**Docker Hub API**:
```bash
# Get repository tags
curl https://hub.docker.com/v2/repositories/library/nginx/tags/

# Get image details
curl https://hub.docker.com/v2/repositories/myusername/my-app/
```

**Limitations**:
- Pull rate limits: 100 pulls/6 hours (anonymous), 200 pulls/6 hours (free account)
- Build minutes limited on free tier
- No private scanning on free tier

---

### GitHub Container Registry (GHCR)

Seamlessly integrated with GitHub Packages and GitHub Actions.

**Features**:
- **Free**: Unlimited public images, 500MB private storage (free tier)
- **GitHub Integration**: Link images to source code repositories
- **Fine-Grained Permissions**: Inherit from GitHub repository permissions
- **Anonymous Pulls**: Public images don't require authentication
- **GitHub Actions**: Native integration for CI/CD

**Pricing**:
- Public images: Free
- Private storage: 500MB free, then $0.25/GB/month
- Data transfer: 1GB/month free, then $0.50/GB

**Usage**:
```bash
# Create Personal Access Token (PAT)
# GitHub → Settings → Developer settings → Personal access tokens
# Scopes needed: write:packages, read:packages, delete:packages

# Login (using PAT)
export CR_PAT=YOUR_TOKEN
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin

# Tag image (format: ghcr.io/OWNER/IMAGE:TAG)
docker tag my-app ghcr.io/myusername/my-app:latest
docker tag my-app ghcr.io/myusername/my-app:v1.0.0

# Push to GHCR
docker push ghcr.io/myusername/my-app:latest
docker push ghcr.io/myusername/my-app:v1.0.0

# Pull image
docker pull ghcr.io/myusername/my-app:latest

# Pull public image (no auth needed)
docker pull ghcr.io/someuser/public-image:latest
```

**In GitHub Actions**:
```yaml
name: Build and Push to GHCR

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:latest
            ghcr.io/${{ github.repository }}:${{ github.sha }}
```

**Link image to repository**:
```dockerfile
# Add labels to Dockerfile
LABEL org.opencontainers.image.source=https://github.com/username/repo
LABEL org.opencontainers.image.description="My amazing app"
LABEL org.opencontainers.image.licenses=MIT
```

### Quay.io

Red Hat's container registry with advanced security features.

**Features**:
- **Security Scanning**: Automatic vulnerability detection with Clair
- **Repository Mirroring**: Mirror external registries
- **Time Machine**: Restore deleted images
- **Robot Accounts**: Service accounts for automation
- **Team Management**: Granular access control
- **Build Triggers**: Automated builds from Git repos
- **Geo-Replication**: Distributed storage

**Pricing**:
- Free: Unlimited public repositories
- Quay.io: $12.50/month for private repositories
- Red Hat Quay (self-hosted): Enterprise pricing

**Usage**:
```bash
# Login
docker login quay.io
# Enter username and password

# Or use encrypted password
docker login quay.io -u="username" -p="password"

# Tag image
docker tag my-app quay.io/username/my-app:v1.0.0

# Push
docker push quay.io/username/my-app:v1.0.0

# Pull
docker pull quay.io/username/my-app:v1.0.0
```

**Robot Accounts** (For CI/CD):
```bash
# Create robot account in Quay.io UI
# Account Settings → Robot Accounts → Create Robot Account

# Login with robot account
docker login quay.io -u="username+robot_name" -p="robot_token"
```

**Repository Mirroring**:
```yaml
# Mirror Docker Hub repository to Quay
# In Quay.io UI:
# Repository Settings → Mirroring → Add Mirror
Source: docker.io/library/nginx
Destination: quay.io/myorg/nginx-mirror
Sync Interval: Daily
```

---

## Cloud Provider Registries

### Amazon ECR (Elastic Container Registry)

AWS's managed container registry. Highly integrated with ECS and EKS.

**Login (requires AWS CLI)**:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
```

**Usage**:
```bash
docker tag my-app:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-repo:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-repo:latest
```

---

## Google GCR

Google Container Registry (now evolving into **Artifact Registry**).

**Login (requires gcloud CLI)**:
```bash
gcloud auth configure-docker
```

**Usage**:
```bash
docker tag my-app gcr.io/my-project-id/my-app
docker push gcr.io/my-project-id/my-app
```

---

## Azure ACR

Azure Container Registry.

**Login (requires Azure CLI)**:
```bash
az acr login --name myregistry
```

**Usage**:
```bash
docker tag my-app myregistry.azurecr.io/my-app:v1
docker push myregistry.azurecr.io/my-app:v1
```

---

## GitHub Container Registry (GHCR)

Seamlessly integrated with GitHub Packages and Actions.

**Login**:
```bash
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```

**Usage**:
```bash
docker tag my-app ghcr.io/username/my-app:latest
docker push ghcr.io/username/my-app:latest
```

---

---

## Self-Hosted Enterprise Registries

### Harbor

Open-source enterprise-grade registry with advanced security and compliance features.

**Features**:
- **Multi-Tenancy**: Projects, users, RBAC
- **Vulnerability Scanning**: Trivy, Clair integration
- **Content Trust**: Image signing with Notary
- **Replication**: Policy-based multi-registry replication
- **Quota Management**: Storage limits per project  
- **Proxy Cache**: Cache upstream registries (Docker Hub, etc.)
- **Audit Logging**: Complete activity trails
- **Webhooks**: Event notifications

**Installation** (Docker Compose):
```bash
# Download latest release
wget https://github.com/goharbor/harbor/releases/download/v2.10.0/harbor-offline-installer-v2.10.0.tgz
tar xzvf harbor-offline-installer-v2.10.0.tgz
cd harbor

# Configure
cp harbor.yml.tmpl harbor.yml
# Edit harbor.yml:
# - Set hostname
# - Configure HTTPS certificates
# - Set admin password
# - Configure database password

# Install
sudo ./install.sh --with-trivy --with-chartmuseum

# Access at https://your-domain
# Default credentials: admin / Harbor12345
```

**Usage**:
```bash
# Login
docker login harbor.example.com

# Tag and push
docker tag my-app harbor.example.com/library/my-app:v1.0.0
docker push harbor.example.com/library/my-app:v1.0.0

# Pull
docker pull harbor.example.com/library/my-app:v1.0.0
```

**Replication** (Harbor to Harbor):
```yaml
# Create replication rule in Harbor UI:
Name: prod-to-dr
Source: Local registry
Destination: Remote registry (Harbor instance)
Trigger: Event Based
Filters:
  - Repository: library/**
  - Tag: v*
```

**Robot Accounts** (For CI/CD):
```bash
# Create in Harbor UI:
# Projects → Select Project → Robot Accounts → New Robot Account
# Name: ci-bot
# Expiration: 30 days
# Permissions: Push, Pull

# Use in CI
docker login harbor.example.com -u 'robot$ci-bot' -p 'TOKEN'
```

### JFrog Artifactory

Universal artifact repository supporting Docker and many other package formats.

**Features**:
- **Universal**: Docker, Maven, npm, PyPI, NuGet, Helm, etc.
- **High Availability**: Clustered deployment
- **Xray Integration**: Deep security and compliance scanning
- **Artifact Lifecycle**: Retention policies, promotion
- **Build Integration**: Maven, Gradle, npm, etc.
- **Metadata**: Rich artifact metadata and properties
- **Federation**: Multi-site replication

**Docker Registry Setup**:
```bash
# In Artifactory UI:
# Administration → Repositories → Local → New Local Repository
# Package Type: Docker
# Repository Key: docker-local

# For remote proxy (Docker Hub):
# Remote → New Remote Repository
# Package Type: Docker
# Repository Key: docker-hub-remote
# URL: https://registry-1.docker.io/
```

**Usage**:
```bash
# Login
docker login artifactory.example.com

# Tag and push to local registry
docker tag my-app artifactory.example.com/docker-local/my-app:v1.0.0
docker push artifactory.example.com/docker-local/my-app:v1.0.0

# Pull from cache (proxy)
docker pull artifactory.example.com/docker-hub-remote/nginx:latest
```

**Virtual Repository** (Aggregate multiple repos):
```yaml
# Create Virtual Repository:
Name: docker
Package Type: Docker
Repositories Included:
  - docker-local
  - docker-hub-remote
  - docker-dev

# Use virtual repository:
docker pull artifactory.example.com/docker/my-app:latest
```

### Sonatype Nexus Repository

Popular open-source repository manager supporting multiple formats.

**Features**:
- **Multi-Format**: Docker, Maven, npm, PyPI, NuGet, Helm
- **Repository Types**: Hosted, Proxy, Group
- **Security**: LDAP, SAML, vulnerability scanning (Pro)
- **Content Selectors**: Fine-grained access control
- **Cleanup Policies**: Automated artifact deletion
- **Blob Stores**: Flexible storage backends

**Installation** (Docker):
```bash
docker run -d -p 8081:8081 \
  -p 8082:8082 \
  -p 8083:8083 \
  --name nexus \
  -v nexus-data:/nexus-data \
  sonatype/nexus3
```

**Docker Registry Setup**:
```bash
# In Nexus UI (http://localhost:8081):
# Login: admin (password in /nexus-data/admin.password)
#
# Create Repository:
# Settings → Repositories → Create repository
# Recipe: docker (hosted)
# HTTP: 8082
# Enable Docker V1 API: Check
# Deployment Policy: Allow redeploy
```

**Usage**:
```bash
# Login (port 8082 for docker registry)
docker login localhost:8082

# Tag and push
docker tag my-app localhost:8082/my-app:v1.0.0
docker push localhost:8082/my-app:v1.0.0

# Pull
docker pull localhost:8082/my-app:v1.0.0
```

### GitLab Container Registry

Built-in container registry for GitLab projects.

**Features**:
- **GitLab Integration**: Tied to projects and CI/CD
- **Authentication**: GitLab users and deploy tokens
- **Cleanup Policies**: Automated tag expiration
- **Protected Tags**: Access control
- **Geo-Replication**: (GitLab Premium)

**Usage**:
```bash
# Login with personal access token
docker login registry.gitlab.com -u username -p TOKEN

# Or with deploy token
docker login registry.gitlab.com -u deploy-token-name -p DEPLOY_TOKEN

# Tag (format: registry.gitlab.com/namespace/project/image:tag)
docker tag my-app registry.gitlab.com/mygroup/myproject/my-app:v1.0.0

# Push
docker push registry.gitlab.com/mygroup/myproject/my-app:v1.0.0

# Pull  
docker pull registry.gitlab.com/mygroup/myproject/my-app:v1.0.0
```

**In GitLab CI**:
```yaml
build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_TAG .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_TAG
```

---

## Best Practices

1. **Don't use `latest` tag in production**
   - Use semantic versioning (v1.2.3)
   - Or commit SHA tags for traceability
   - Latest can change unexpectedly

2. **Scan for Vulnerabilities**
   - Enable automatic scanning in registry
   - Use Trivy, Grype, or Snyk locally
   - Block deployment of high-severity images

3. **Minimize Image Size**
   - Use multi-stage builds
   - Use Alpine or Distroless base images
   - Remove unnecessary files and dependencies
   - Combine RUN commands to reduce layers

4. **Implement Lifecycle Policies**
   - Auto-delete untagged images
   - Expire old versions (keep last N)
   - Remove dev/test images after period

5. **Use Immutable Tags** (When possible)
   - Prevent tag overwrites
   - Ensures reproducible deployments
   - Available in Harbor, ACR, Artifactory

6. **Leverage Multi-Stage Builds**
   ```dockerfile
   # Build stage
   FROM node:18 AS builder
   WORKDIR /app
   COPY package.json .
   RUN npm install
   COPY . .
   RUN npm run build
   
   # Production stage
   FROM node:18-alpine
   WORKDIR /app
   COPY --from=builder /app/dist ./dist
   COPY --from=builder /app/node_modules ./node_modules
   CMD ["node", "dist/server.js"]
   ```

7. **Tag Strategy**
   - **Production**: v1.2.3, v1.2, v1, stable
   - **Staging**: staging, staging-$CI_COMMIT_SHA
   - **Development**: develop, dev-$CI_COMMIT_SHA
   - **Feature branches**: feature-xyz, pr-123

8. **Authentication Best Practices**
   - Use service accounts/robot accounts for CI/CD
   - Rotate credentials regularly
   - Never commit credentials to source code
   - Use secrets management (Vault, AWS Secrets Manager)

9. **Monitoring and Alerts**
   - Monitor storage usage and costs
   - Alert on failed pushes/pulls
   - Track image pull metrics
   - Monitor vulnerability scan results

10. **Documentation**
    - Document tag naming conventions
    - Maintain image inventory
    - Document registry locations per environment
    - Keep runbooks for common tasks

---

## Security Best Practices

1. **Image Signing** (Content Trust)
   ```bash
   # Enable Docker Content Trust
   export DOCKER_CONTENT_TRUST=1
   
   # Push signed image
   docker push myregistry.com/my-app:v1.0.0
   # Requires signing key
   
   # Pull only signed images
   docker pull myregistry.com/my-app:v1.0.0
   ```

2. **Vulnerability Scanning**
   ```bash
   # Scan with Trivy
   trivy image my-app:latest
   
   # Scan with Grype
   grype my-app:latest
   
   # Scan with Snyk
   snyk container test my-app:latest
   ```

3. **Least Privilege Access**
   - Grant minimum necessary permissions
   - Use RBAC for team access
   - Separate read and write permissions
   - Audit access logs regularly

4 **Network Security**
   - Use private registries for sensitive images
   - Implement VPN or Private Link for access
   - Enable HTTPS/TLS for all connections
   - Use VPC endpoints (AWS, Azure) for private access

5. **Secrets Management**
   - Never include secrets in images
   - Use multi-stage builds to exclude sensitive files
   - Scan for leaked secrets (gitleaks, trufflehog)
   - Use .dockerignore to exclude sensitive files

6. **Base Image Security**
   - Use official images when possible
   - Keep base images updated
   - Use minimal images (Alpine, Distroless)
   - Scan base images for vulnerabilities

---

## Cost Optimization

1. **Storage Optimization**
   - Implement lifecycle policies
   - Delete unused images regularly
   - Use cleanup policies for old tags
   - Compress layers effectively

2. **Network Costs**
   - Use registry in same region as compute
   - Enable geo-replication selectively
   - Use proxy cache for upstream registries
   - Monitor data transfer costs

3. **Choose Right Tier**
   - Start with basic tier for dev/test
   - Premium tier only when geo-replication needed
   - Consider self-hosted for very large scale
   - Compare cloud provider pricing

4. **Image Size Reduction**
   ```bash
   # Check image size
   docker images my-app
   
   # Analyze layers
   dive my-app:latest
   
   # Use docker-slim to reduce size
   docker-slim build my-app:latest
   ```

---

## Troubleshooting

### Cannot pull image: unauthorized
```bash
# Verify login
docker login registry.example.com

# Check credentials
cat ~/.docker/config.json

# For cloud providers, renew login
aws ecr get-login-password | docker login...
az acr login --name myregistry
gcloud auth configure-docker
```

### Push denied: insufficient permissions
```bash
# Check IAM permissions (AWS)
aws ecr get-authorization-token

# Check service account (Azure)
az acr check-permissions --name myregistry

# Check roles in Harbor/Artifactory  
# UI → Users/Roles → Verify push permissions
```

### Image pull rate limit exceeded (Docker Hub)
```bash
# Login to increase rate limit
docker login

# Or use alternative registry
# Pull from quay.io, ghcr.io, or private mirror

# Set up registry mirror (Docker daemon.json)
{
  "registry-mirrors": ["https://mirror.gcr.io"]
}
```

### Cannot delete image: image is being used
```bash
# Stop containers using the image
docker ps -a --filter ancestor=my-app:latest
docker stop CONTAINER_ID
docker rm CONTAINER_ID

# Then delete image
docker rmi my-app:latest
```

### Self-signed certificate errors
```bash
# Trust certificate (Linux)
sudo cp registry.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates

# Or configure Docker to use insecure registry
# /etc/docker/daemon.json
{
  \"insecure-registries\": [\"registry.local:5000\"]
}

# Restart Docker
sudo systemctl restart docker
```

---

## Comparison

| Registry | Type | Pricing | Best For | Key Feature |
|:---------|:-----|:------|:---------|:------------|
| **Docker Hub** | Public | Free/Paid | Public images, small teams | Largest image library |
| **GHCR** | Public/Private | Free/Paid | GitHub projects | GitHub integration |
| **Quay.io** | Public/Private | Free/Paid | Security-focused | Advanced scanning |
| **AWS ECR** | Private | Pay-per-use | AWS workloads | AWS integration |
| **Google Artifact Registry** | Private | Pay-per-use | GCP workloads, multi-format | Universal artifacts |
| **Azure ACR** | Private | Tiered | Azure workloads | Geo-replication |
| **Harbor** | Self-hosted | Free (OSS) | Enterprise, on-prem | Full-featured OSS |
| **Artifactory** | Self-hosted | Commercial | Universal artifacts | Multi-format support |
| **Nexus** | Self-hosted | Free/Pro | Multi-format, budget | Open-source option |
| **GitLab Registry** | Integrated | Free with GitLab | GitLab users | CI/CD integration |

**Decision Matrix**:
- **Small project**: Docker Hub or GHCR
- **AWS-heavy**: AWS ECR
- **GCP-heavy**: Google Artifact Registry
- **Azure-heavy**: Azure ACR
- **Multi-cloud**: Harbor or Artifactory
- **Security-critical**: Quay.io or Harbor with all plugins
- **Cost-sensitive**: Nexus or Docker Registry OSS
- **Already using GitLab**: GitLab Container Registry

---

## Resources

### Official Documentation
- [Docker Hub](https://docs.docker.com/docker-hub/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Quay.io](https://docs.quay.io/)
- [Amazon ECR](https://aws.amazon.com/ecr/)
- [Google Artifact Registry](https://cloud.google.com/artifact-registry/docs)
- [Azure ACR](https://azure.microsoft.com/en-us/services/container-registry/)
- [Harbor](https://goharbor.io/docs/)
- [JFrog Artifactory](https://www.jfrog.com/confluence/display/JFROG/Docker+Registry)
- [Sonatype Nexus](https://help.sonatype.com/repomanager3/formats/docker-registry)
- [GitLab Container Registry](https://docs.gitlab.com/ee/user/packages/container_registry/)

### Tools
- [Trivy](https://github.com/aquasecurity/trivy) - Vulnerability scanner
- [Grype](https://github.com/anchore/grype) - Vulnerability scanner
- [Dive](https://github.com/wagoodman/dive) - Image layer analyzer
- [Skopeo](https://github.com/containers/skopeo) - Image operations without Docker
- [Crane](https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md) - Registry client

### Tutorials
- [Implementing a private Docker registry](https://docs.docker.com/registry/deploying/)
- [Setting up Harbor with HTTPS](https://goharbor.io/docs/2.10.0/install-config/)
- [ECR Lifecycle Policies](https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html)
- [Multi-region container registry setup](https://cloud.google.com/architecture/best-practices-to-optimize-performance-availability)
