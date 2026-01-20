# GitLab - Complete DevOps Platform

## Table of Contents
- [Introduction](#introduction)
- [Why GitLab?](#why-gitlab)
- [Installation & Setup](#installation--setup)
- [Git Repository Management](#git-repository-management)
- [GitLab CI/CD](#gitlab-cicd)
- [GitLab Runners](#gitlab-runners)
- [Pipeline Configuration](#pipeline-configuration)
- [Advanced CI/CD Features](#advanced-cicd-features)
- [Container Registry](#container-registry)
- [Package Registry](#package-registry)
- [Security & Compliance](#security--compliance)
- [GitOps with GitLab](#gitops-with-gitlab)
- [Kubernetes Integration](#kubernetes-integration)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Comparison with Other Platforms](#comparison-with-other-platforms)

---

## Introduction

**GitLab** is a complete DevOps platform delivered as a single application. It provides Git repository management, CI/CD pipelines, issue tracking, code review, security scanning, and deployment tools - all integrated in one interface.

### Key Features
- **Source Code Management** - Git hosting with branch protection
- **CI/CD Pipelines** - Built-in continuous integration and deployment
- **Container Registry** - Docker image storage
- **Package Registry** - npm, Maven, NuGet, PyPI, and more
- **Security Scanning** - SAST, DAST, dependency scanning
- **Issue Tracking** - Agile project management
- **Code Review** - Merge requests with approvals
- **Wiki & Documentation** - Built-in documentation
- **Auto DevOps** - Automated CI/CD templates
- **Kubernetes Integration** - Deploy to K8s clusters

### GitLab Tiers
- **Free** - Core features for unlimited users
- **Premium** - Advanced CI/CD, code quality, compliance
- **Ultimate** - Security scanning, portfolio management

---

## Why GitLab?

### Advantages

✅ **All-in-One Platform**
- Single application for entire DevOps lifecycle
- No need to integrate multiple tools
- Unified user experience

✅ **Built-in CI/CD**
- Powerful pipeline engine
- Parallel and matrix builds
- Auto DevOps templates
- Multi-project pipelines

✅ **Self-Hosted Option**
- Full control over your data
- On-premises deployment
- Air-gapped installations supported

✅ **Scalability**
- Handles projects of any size
- Enterprise-grade performance
- High availability configurations

✅ **Security First**
- Security scanning built-in
- Compliance frameworks
- Audit logging
- Protected branches and tags

### Use Cases
- **Software Development** - Full SDLC management
- **CI/CD Automation** - Automated testing and deployment
- **Container Development** - Docker and Kubernetes workflows
- **Infrastructure as Code** - Terraform and Ansible pipelines
- **Security Testing** - Automated security scans
- **Multi-Team Collaboration** - Enterprise development

---

## Installation & Setup

### GitLab.com (SaaS)

```bash
# Sign up at https://gitlab.com
# Create a new project
# Clone repository
git clone https://gitlab.com/username/project.git
cd project
```

### Self-Managed Installation

#### Using Docker

```bash
# Create volumes
docker volume create gitlab-config
docker volume create gitlab-logs
docker volume create gitlab-data

# Run GitLab
docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume gitlab-config:/etc/gitlab \
  --volume gitlab-logs:/var/log/gitlab \
  --volume gitlab-data:/var/opt/gitlab \
  gitlab/gitlab-ee:latest

# Get initial root password
docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```

#### Docker Compose

**docker-compose.yml**
```yaml
version: '3.6'

services:
  gitlab:
    image: 'gitlab/gitlab-ee:latest'
    restart: always
    hostname: 'gitlab.example.com'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'https://gitlab.example.com'
        # Add any other gitlab.rb configuration here
        gitlab_rails['gitlab_shell_ssh_port'] = 2222
    ports:
      - '80:80'
      - '443:443'
      - '2222:22'
    volumes:
      - './config:/etc/gitlab'
      - './logs:/var/log/gitlab'
      - './data:/var/opt/gitlab'
    shm_size: '256m'
```

```bash
docker-compose up -d
```

#### Linux Package Installation

```bash
# Ubuntu/Debian
curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
sudo EXTERNAL_URL="https://gitlab.example.com" apt-get install gitlab-ee

# CentOS/RHEL
curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.rpm.sh | sudo bash
sudo EXTERNAL_URL="https://gitlab.example.com" yum install -y gitlab-ee

# Configure GitLab
sudo gitlab-ctl reconfigure
```

### Initial Configuration

```bash
# Edit configuration
sudo nano /etc/gitlab/gitlab.rb

# Example settings:
external_url 'https://gitlab.example.com'
gitlab_rails['gitlab_email_from'] = 'gitlab@example.com'
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.gmail.com"
gitlab_rails['smtp_port'] = 587

# Apply changes
sudo gitlab-ctl reconfigure

# Check status
sudo gitlab-ctl status
```

---

## Git Repository Management

### Creating Projects

```bash
# Via CLI
git init
git remote add origin https://gitlab.com/username/project.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Branch Protection

**Project Settings → Repository → Protected Branches**

```yaml
# Protected branch rules:
- Branch: main
  Allowed to merge: Maintainers
  Allowed to push: No one
  Allowed to force push: No
  Code owner approval: Required
```

### Merge Requests

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Create MR via Web UI or:
# Use GitLab CLI
glab mr create --title "Add new feature" --description "Description here"
```

### Code Owners

**.gitlab/CODEOWNERS**
```
# Default owners for everything in the repo
* @default-owner

# Backend code
/backend/** @backend-team

# Frontend code
/frontend/** @frontend-team

# Specific files
/README.md @docs-team
/docker-compose.yml @devops-team
```

---

## GitLab CI/CD

### Pipeline Basics

Pipelines are defined in `.gitlab-ci.yml` at the repository root.

**Key Concepts:**
- **Jobs** - Individual tasks (test, build, deploy)
- **Stages** - Groups of jobs that run sequentially
- **Runners** - Agents that execute jobs
- **Artifacts** - Files passed between jobs

### Simple Pipeline

**.gitlab-ci.yml**
```yaml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

# Global before script
before_script:
  - echo "Starting job..."

# Build job
build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

# Test job
test:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm install
    - npm test
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'

# Deploy job
deploy:
  stage: deploy
  script:
    - echo "Deploying application..."
    - ./deploy.sh
  only:
    - main
  environment:
    name: production
    url: https://example.com
```

### Multi-Language Pipeline

```yaml
stages:
  - build
  - test
  - package
  - deploy

# Node.js job
build:frontend:
  stage: build
  image: node:18
  script:
    - cd frontend
    - npm ci
    - npm run build
  artifacts:
    paths:
      - frontend/dist/

# Java job
build:backend:
  stage: build
  image: maven:3.8-openjdk-17
  script:
    - cd backend
    - mvn clean package
  artifacts:
    paths:
      - backend/target/*.jar

# Python tests
test:python:
  stage: test
  image: python:3.11
  script:
    - pip install -r requirements.txt
    - pytest tests/

# Go tests
test:go:
  stage: test
  image: golang:1.21
  script:
    - go test ./...
```

---

## GitLab Runners

### Types of Runners

1. **Shared Runners** - Provided by GitLab.com
2. **Group Runners** - Shared across group projects
3. **Project Runners** - Specific to one project

### Installing GitLab Runner

```bash
# Linux
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
sudo apt-get install gitlab-runner

# macOS
brew install gitlab-runner

# Windows
# Download from https://docs.gitlab.com/runner/install/windows.html
```

### Registering a Runner

```bash
# Register runner
sudo gitlab-runner register

# Prompts:
# GitLab URL: https://gitlab.com/
# Registration token: (from Project Settings → CI/CD → Runners)
# Description: my-runner
# Tags: docker,linux
# Executor: docker
# Default Docker image: alpine:latest

# Start runner
sudo gitlab-runner start

# Verify
sudo gitlab-runner verify
```

### Runner Configuration

**/etc/gitlab-runner/config.toml**
```toml
concurrent = 4
check_interval = 0

[[runners]]
  name = "docker-runner"
  url = "https://gitlab.com/"
  token = "TOKEN"
  executor = "docker"
  [runners.custom_build_dir]
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]
  [runners.docker]
    tls_verify = false
    image = "alpine:latest"
    privileged = true
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache", "/var/run/docker.sock:/var/run/docker.sock"]
    shm_size = 0
```

### Runner Executors

```yaml
# Docker executor
executor = "docker"

# Shell executor
executor = "shell"

# Kubernetes executor
executor = "kubernetes"

# SSH executor
executor = "ssh"

# VirtualBox executor
executor = "virtualbox"
```

---

## Pipeline Configuration

### Variables

```yaml
variables:
  # Global variables
  DATABASE_URL: "postgresql://localhost/db"
  CACHE_KEY: "${CI_COMMIT_REF_SLUG}"
  
  # FF variables
  FF_USE_FASTZIP: "true"

# Job-specific variables
deploy:
  variables:
    DEPLOY_ENV: "production"
  script:
    - echo "Deploying to $DEPLOY_ENV"
```

**Protected Variables:**
```yaml
# Set in Project Settings → CI/CD → Variables
# - Mark as "Protected" for protected branches only
# - Mark as "Masked" to hide in logs
```

### Caching

```yaml
variables:
  CACHE_FALLBACK_KEY: global-cache

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/
  policy: pull-push

# Pull-only cache
test:
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
    policy: pull
  script:
    - npm test
```

### Artifacts

```yaml
build:
  script:
    - npm run build
  artifacts:
    name: "build-${CI_COMMIT_REF_SLUG}"
    paths:
      - dist/
      - build/
    exclude:
      - dist/**/*.map
    expire_in: 1 week
    reports:
      junit: test-results.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

# Download artifacts from previous job
deploy:
  script:
    - ls dist/
  dependencies:
    - build
```

### Conditional Execution

```yaml
# Run only on specific branches
deploy:production:
  script:
    - ./deploy.sh
  only:
    - main
    - /^release-.*$/

# Except syntax
test:
  script:
    - npm test
  except:
    - tags

# Rules (recommended)
deploy:staging:
  script:
    - ./deploy-staging.sh
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: manual

# Changes detection
test:api:
  script:
    - npm run test:api
  rules:
    - changes:
        - api/**/*
        - package.json
```

### Parallel Jobs

```yaml
# Parallel execution
test:
  stage: test
  script:
    - npm test
  parallel: 5

# Matrix builds
test:matrix:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm test
  parallel:
    matrix:
      - NODE_VERSION: ['16', '18', '20']
        OS: ['ubuntu', 'alpine']
```

### Job Dependencies

```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - make build

test:unit:
  stage: test
  script:
    - make test
  needs: ["build"]  # Run immediately after build

test:integration:
  stage: test
  script:
    - make integration-test
  needs: ["build"]

deploy:
  stage: deploy
  script:
    - make deploy
  needs:
    - job: build
      artifacts: true
    - job: test:unit
    - job: test:integration
```

---

## Advanced CI/CD Features

### Multi-Project Pipelines

```yaml
# Trigger pipeline in another project
trigger:downstream:
  stage: deploy
  trigger:
    project: group/downstream-project
    branch: main
    strategy: depend

# Parent-child pipelines
generate:config:
  stage: build
  script:
    - ./generate-pipeline.sh > child-pipeline.yml
  artifacts:
    paths:
      - child-pipeline.yml

child:pipeline:
  stage: deploy
  trigger:
    include:
      - artifact: child-pipeline.yml
        job: generate:config
```

### Dynamic Pipelines

```yaml
# Include external files
include:
  - local: '/templates/.gitlab-ci-template.yml'
  - project: 'group/ci-templates'
    file: '/templates/deploy.yml'
    ref: main
  - remote: 'https://example.com/ci-template.yml'
  - template: Security/SAST.gitlab-ci.yml

# Extends
.deploy_template:
  script:
    - echo "Deploying..."
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'

deploy:production:
  extends: .deploy_template
  environment: production

deploy:staging:
  extends: .deploy_template
  environment: staging
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'
```

### Services

```yaml
# Database service for testing
test:with:database:
  image: node:18
  services:
    - postgres:14
    - redis:7
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: user
    POSTGRES_PASSWORD: password
    DATABASE_URL: "postgresql://user:password@postgres/testdb"
  script:
    - npm run test:integration
```

### Environments & Deployments

```yaml
deploy:review:
  stage: deploy
  script:
    - ./deploy.sh review-${CI_COMMIT_REF_SLUG}
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    url: https://$CI_COMMIT_REF_SLUG.example.com
    on_stop: stop:review
    auto_stop_in: 1 week

stop:review:
  stage: deploy
  script:
    - ./cleanup.sh review-${CI_COMMIT_REF_SLUG}
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  when: manual

deploy:production:
  stage: deploy
  script:
    - ./deploy.sh production
  environment:
    name: production
    url: https://example.com
    deployment_tier: production
  only:
    - main
```

### Release Management

```yaml
release:
  stage: deploy
  image: registry.gitlab.com/gitlab-org/release-cli:latest
  rules:
    - if: '$CI_COMMIT_TAG'
  script:
    - echo "Creating release for $CI_COMMIT_TAG"
  release:
    name: 'Release $CI_COMMIT_TAG'
    description: './CHANGELOG.md'
    tag_name: '$CI_COMMIT_TAG'
    assets:
      links:
        - name: 'Binary'
          url: 'https://example.com/releases/${CI_COMMIT_TAG}/binary'
```

---

## Container Registry

### Building and Pushing Images

```yaml
variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

build:docker:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $IMAGE_TAG .
    - docker tag $IMAGE_TAG $CI_REGISTRY_IMAGE:latest
    - docker push $IMAGE_TAG
    - docker push $CI_REGISTRY_IMAGE:latest

# Using Kaniko (no Docker daemon needed)
build:kaniko:
  stage: build
  image:
    name: gcr.io/kaniko-project/executor:latest
    entrypoint: [""]
  script:
    - mkdir -p /kaniko/.docker
    - echo "{\"auths\":{\"${CI_REGISTRY}\":{\"auth\":\"$(printf "%s:%s" "${CI_REGISTRY_USER}" "${CI_REGISTRY_PASSWORD}" | base64 | tr -d '\n')\"}}}" > /kaniko/.docker/config.json
    - /kaniko/executor
      --context "${CI_PROJECT_DIR}"
      --dockerfile "${CI_PROJECT_DIR}/Dockerfile"
      --destination "${CI_REGISTRY_IMAGE}:${CI_COMMIT_TAG}"
```

### Multi-Stage Builds

**Dockerfile**
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

```yaml
build:optimized:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  script:
    - docker build --target builder -t $CI_REGISTRY_IMAGE:builder .
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
```

---

## Package Registry

### NPM Packages

```yaml
# Publish to GitLab Package Registry
publish:npm:
  stage: deploy
  image: node:18
  script:
    - echo "@myorg:registry=https://gitlab.com/api/v4/projects/${CI_PROJECT_ID}/packages/npm/" > .npmrc
    - echo "//gitlab.com/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=${CI_JOB_TOKEN}" >> .npmrc
    - npm publish
  only:
    - tags
```

### Maven Packages

```xml
<!-- pom.xml -->
<distributionManagement>
  <repository>
    <id>gitlab-maven</id>
    <url>https://gitlab.com/api/v4/projects/PROJECT_ID/packages/maven</url>
  </repository>
</distributionManagement>
```

```yaml
publish:maven:
  stage: deploy
  image: maven:3.8-openjdk-17
  script:
    - mvn deploy -s ci_settings.xml
  only:
    - tags
```

### Docker Images

```bash
# Pull from registry
docker login registry.gitlab.com
docker pull registry.gitlab.com/group/project:latest

# Tag and push
docker tag myimage:latest registry.gitlab.com/group/project:v1.0.0
docker push registry.gitlab.com/group/project:v1.0.0
```

---

## Security & Compliance

### SAST (Static Application Security Testing)

```yaml
include:
  - template: Security/SAST.gitlab-ci.yml

variables:
  SAST_EXCLUDED_PATHS: "spec, test, tests, tmp"
```

### Dependency Scanning

```yaml
include:
  - template: Security/Dependency-Scanning.gitlab-ci.yml
```

### Container Scanning

```yaml
include:
  - template: Security/Container-Scanning.gitlab-ci.yml

container_scanning:
  variables:
    CS_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

### Secret Detection

```yaml
include:
  - template: Security/Secret-Detection.gitlab-ci.yml
```

### License Compliance

```yaml
include:
  - template: Security/License-Scanning.gitlab-ci.yml

license_scanning:
  variables:
    LICENSE_FINDER_CLI_OPTS: '--aggregate-paths=.'
```

---

## GitOps with GitLab

### GitLab Agent for Kubernetes

```bash
# Install agent in Kubernetes
helm repo add gitlab https://charts.gitlab.io
helm repo update

helm upgrade --install gitlab-agent gitlab/gitlab-agent \
    --namespace gitlab-agent \
    --create-namespace \
    --set config.token=YOUR_AGENT_TOKEN \
    --set config.kasAddress=wss://kas.gitlab.com
```

**.gitlab/agents/production/config.yaml**
```yaml
gitops:
  manifest_projects:
    - id: group/k8s-manifests
      paths:
        - glob: 'manifests/**/*.yaml'
      reconcile_timeout: 3600s
      dry_run_strategy: none
      prune: true
      prune_timeout: 3600s
      prune_propagation_policy: foreground
      inventory_policy: must_match

ci_access:
  projects:
    - id: group/app-project
      access_as:
        agent: {}
```

### Auto DevOps

```yaml
# Enable Auto DevOps in .gitlab-ci.yml
include:
  - template: Auto-DevOps.gitlab-ci.yml

variables:
  AUTO_DEVOPS_DOMAIN: example.com
  POSTGRES_ENABLED: "true"
  POSTGRES_VERSION: "14"
```

---

## Kubernetes Integration

### Deploying to Kubernetes

```yaml
deploy:k8s:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config set-cluster k8s --server="$KUBE_URL" --insecure-skip-tls-verify=true
    - kubectl config set-credentials admin --token="$KUBE_TOKEN"
    - kubectl config set-context default --cluster=k8s --user=admin
    - kubectl config use-context default
    - |
      cat <<EOF | kubectl apply -f -
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: myapp
      spec:
        replicas: 3
        selector:
          matchLabels:
            app: myapp
        template:
          metadata:
            labels:
              app: myapp
          spec:
            containers:
            - name: myapp
              image: ${CI_REGISTRY_IMAGE}:${CI_COMMIT_SHORT_SHA}
              ports:
              - containerPort: 8080
      EOF
```

### Helm Deployments

```yaml
deploy:helm:
  stage: deploy
  image: alpine/helm:latest
  script:
    - helm upgrade --install myapp ./helm/myapp \
        --set image.tag=${CI_COMMIT_SHORT_SHA} \
        --set ingress.host=myapp.example.com \
        --namespace production
```

---

## Best Practices

### 1. Pipeline Optimization

```yaml
# Use DAG for faster pipelines
test:unit:
  stage: test
  needs: []  # Run immediately

test:integration:
  stage: test
  needs: ["build"]

# Interruptible jobs
test:
  interruptible: true
  script:
    - npm test

# Retry failed jobs
flaky:test:
  retry:
    max: 2
    when:
      - script_failure
      - stuck_or_timeout_failure
```

### 2. Security

```yaml
# Use protected variables for secrets
# Never commit credentials

# Scan for secrets
include:
  - template: Security/Secret-Detection.gitlab-ci.yml

# Use masked variables
variables:
  API_KEY:
    value: "secret-key"
    masked: true
```

### 3. Efficiency

```yaml
# Cache dependencies
cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/

# Use slim images
test:
  image: node:18-alpine

# Parallel testing
test:
  parallel: 5
  script:
    - npm run test -- --shard=${CI_NODE_INDEX}/${CI_NODE_TOTAL}
```

### 4. Documentation

```yaml
# Document your pipeline
# .gitlab-ci.yml

# This pipeline:
# 1. Builds the application
# 2. Runs tests in parallel
# 3. Deploys to staging/production

stages:
  - build   # Compile and package
  - test    # Run all tests
  - deploy  # Deploy to environments
```

---

## Real-World Examples

### Full Stack Application

```yaml
stages:
  - build
  - test
  - package
  - deploy

variables:
  FRONTEND_IMAGE: $CI_REGISTRY_IMAGE/frontend
  BACKEND_IMAGE: $CI_REGISTRY_IMAGE/backend

# Frontend build
build:frontend:
  stage: build
  image: node:18
  script:
    - cd frontend
    - npm ci
    - npm run build
  artifacts:
    paths:
      - frontend/dist/
  cache:
    key: frontend-${CI_COMMIT_REF_SLUG}
    paths:
      - frontend/node_modules/

# Backend build
build:backend:
  stage: build
  image: maven:3.8-openjdk-17
  script:
    - cd backend
    - mvn clean package
  artifacts:
    paths:
      - backend/target/*.jar
  cache:
    key: backend-${CI_COMMIT_REF_SLUG}
    paths:
      - backend/.m2/

# Frontend tests
test:frontend:
  stage: test
  image: node:18
  script:
    - cd frontend
    - npm ci
    - npm run test:unit
    - npm run test:e2e
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'

# Backend tests
test:backend:
  stage: test
  image: maven:3.8-openjdk-17
  script:
    - cd backend
    - mvn test
  coverage: '/Total.*?([0-9]{1,3})%/'

# Docker images
package:frontend:
  stage: package
  image: docker:24
  services:
    - docker:24-dind
  script:
    - cd frontend
    - docker build -t $FRONTEND_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $FRONTEND_IMAGE:$CI_COMMIT_SHORT_SHA

package:backend:
  stage: package
  image: docker:24
  services:
    - docker:24-dind
  script:
    - cd backend
    - docker build -t $BACKEND_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $BACKEND_IMAGE:$CI_COMMIT_SHORT_SHA

# Deploy to staging
deploy:staging:
  stage: deploy
  image: alpine/helm:latest
  script:
    - helm upgrade --install myapp ./helm \
        --set frontend.image.tag=$CI_COMMIT_SHORT_SHA \
        --set backend.image.tag=$CI_COMMIT_SHORT_SHA \
        --namespace staging
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

# Deploy to production
deploy:production:
  stage: deploy
  image: alpine/helm:latest
  script:
    - helm upgrade --install myapp ./helm \
        --set frontend.image.tag=$CI_COMMIT_SHORT_SHA \
        --set backend.image.tag=$CI_COMMIT_SHORT_SHA \
        --namespace production
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - main
```

---

## Comparison with Other Platforms

### GitLab vs GitHub Actions

| Feature | GitLab CI/CD | GitHub Actions |
|---------|--------------|----------------|
| **Configuration** | `.gitlab-ci.yml` | `.github/workflows/*.yml` |
| **Runners** | Self-hosted or shared | Self-hosted or GitHub-hosted |
| **Pricing** | Unlimited CI minutes (self-hosted) | 2000 min/month (free tier) |
| **Integration** | Built-in | Marketplace actions |
| **Artifacts** | Built-in | Built-in |
| **Registry** | Integrated | GitHub Packages |

### GitLab vs Jenkins

| Feature | GitLab | Jenkins |
|---------|--------|---------|
| **Setup** | Integrated | Separate installation |
| **Configuration** | YAML | Jenkinsfile (Groovy) |
| **UI** | Modern | Traditional |
| **Plugins** | Limited | Extensive |
| **Learning Curve** | Easy | Moderate |

---

## Resources

### Official Documentation
- **Website:** https://about.gitlab.com
- **Documentation:** https://docs.gitlab.com
- **CI/CD Docs:** https://docs.gitlab.com/ee/ci/
- **GitLab Blog:** https://about.gitlab.com/blog/

### Learning
- **GitLab Learn:** https://about.gitlab.com/learn/
- **YouTube:** https://www.youtube.com/gitlab
- **CI/CD Templates:** https://gitlab.com/gitlab-org/gitlab/-/tree/master/lib/gitlab/ci/templates

### Community
- **Forum:** https://forum.gitlab.com
- **Discord:** https://discord.gg/gitlab
- **Twitter:** @gitlab

---

## Conclusion

GitLab provides a complete DevOps platform with powerful CI/CD capabilities, integrated security scanning, and seamless Kubernetes integration. Whether you're running on GitLab.com or self-hosted, it offers everything needed for modern software development.

**Key Takeaways:**
- 🚀 Complete DevOps platform in one application
- 🔄 Powerful CI/CD with flexible pipeline configuration
- 🐳 Built-in container and package registries
- 🔒 Security scanning and compliance tools
- ☸️ Native Kubernetes and GitOps support
- 📊 Comprehensive monitoring and analytics

Perfect for teams looking for an all-in-one DevOps solution!

