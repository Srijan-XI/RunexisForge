# Drone CI

## Introduction

### What is Drone CI?

Drone is a modern Continuous Integration and Continuous Delivery (CI/CD) platform built on container technology. Every build runs in an isolated Docker container, and Drone uses a simple YAML configuration file to define and execute build pipelines. It integrates seamlessly with popular source control management systems like GitHub, GitLab, Bitbucket, and Gitea.

### Why Drone CI?

- Container-native architecture
- Simple YAML configuration (.drone.yml)
- Docker-in-Docker support
- Self-hosted or cloud options
- Native integrations with Git platforms
- Plugin ecosystem
- Secrets management
- Multi-architecture support (x64, ARM)
- Autoscaling
- Built-in caching

### Key Features

- **Pipeline as Code**: Define pipelines in `.drone.yml`
- **Isolated Builds**: Each step runs in a separate container
- **Plugins**: Extensive plugin marketplace
- **Conditional Execution**: Skip steps based on conditions
- **Matrix Builds**: Test across multiple configurations
- **Secrets**: Secure credential management
- **Promotions**: Manual deployment gates
- **Cron Jobs**: Scheduled builds

## Prerequisites

- Docker installed
- Git repository (GitHub, GitLab, Bitbucket, Gitea)
- Basic Docker and CI/CD knowledge

## Installation

### Docker Compose Installation

```yaml
# docker-compose.yml
version: '3'

services:
  drone-server:
    image: drone/drone:2
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - drone-data:/data
    environment:
      - DRONE_GITHUB_CLIENT_ID=your_client_id
      - DRONE_GITHUB_CLIENT_SECRET=your_client_secret
      - DRONE_RPC_SECRET=super_secret_key
      - DRONE_SERVER_HOST=drone.example.com
      - DRONE_SERVER_PROTO=https
      - DRONE_USER_CREATE=username:octocat,admin:true
    restart: always

  drone-runner-docker:
    image: drone/drone-runner-docker:1
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - DRONE_RPC_PROTO=http
      - DRONE_RPC_HOST=drone-server
      - DRONE_RPC_SECRET=super_secret_key
      - DRONE_RUNNER_CAPACITY=2
      - DRONE_RUNNER_NAME=docker-runner
    restart: always
    depends_on:
      - drone-server

volumes:
  drone-data:
```

Start Drone:

```bash
docker-compose up -d
```

### Kubernetes Installation

```yaml
# drone-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: drone
  namespace: drone
spec:
  replicas: 1
  selector:
    matchLabels:
      app: drone
  template:
    metadata:
      labels:
        app: drone
    spec:
      containers:
      - name: drone
        image: drone/drone:2
        ports:
        - containerPort: 80
        - containerPort: 443
        env:
        - name: DRONE_GITHUB_CLIENT_ID
          value: "your_client_id"
        - name: DRONE_GITHUB_CLIENT_SECRET
          valueFrom:
            secretKeyRef:
              name: drone-secrets
              key: github-client-secret
        - name: DRONE_RPC_SECRET
          valueFrom:
            secretKeyRef:
              name: drone-secrets
              key: rpc-secret
        - name: DRONE_SERVER_HOST
          value: "drone.example.com"
        - name: DRONE_SERVER_PROTO
          value: "https"
        volumeMounts:
        - name: data
          mountPath: /data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: drone-pvc

---
apiVersion: v1
kind: Service
metadata:
  name: drone
  namespace: drone
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  - port: 443
    targetPort: 443
  selector:
    app: drone
```

### GitHub OAuth Setup

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://your-drone-url/login`
4. Note the Client ID and Client Secret

## Basic Configuration

### Simple Pipeline (.drone.yml)

```yaml
kind: pipeline
type: docker
name: default

steps:
- name: greeting
  image: alpine:3.18
  commands:
  - echo "Hello, Drone CI!"
  - date
  - uname -a

- name: build
  image: node:18
  commands:
  - npm install
  - npm run build

- name: test
  image: node:18
  commands:
  - npm test
```

### Multi-Step Pipeline

```yaml
kind: pipeline
type: docker
name: build-and-test

steps:
# Checkout is automatic

- name: install-dependencies
  image: node:18
  commands:
  - npm install

- name: lint
  image: node:18
  commands:
  - npm run lint

- name: test
  image: node:18
  commands:
  - npm test

- name: build
  image: node:18
  commands:
  - npm run build

- name: notify-success
  image: plugins/slack
  settings:
    webhook:
      from_secret: slack_webhook
    channel: builds
    template: >
      Build {{build.number}} succeeded for {{repo.name}}
  when:
    status:
    - success
```

## Working with Docker

### Build Docker Image

```yaml
kind: pipeline
type: docker
name: docker-build

steps:
- name: build
  image: plugins/docker
  settings:
    repo: myregistry/myapp
    tags:
    - latest
    - ${DRONE_COMMIT_SHA:0:8}
    username:
      from_secret: docker_username
    password:
      from_secret: docker_password
```

### Docker-in-Docker

```yaml
kind: pipeline
type: docker
name: dind

steps:
- name: docker-build
  image: docker:dind
  privileged: true
  commands:
  - docker build -t myapp:latest .
  - docker images
  volumes:
  - name: dockersock
    path: /var/run/docker.sock

volumes:
- name: dockersock
  host:
    path: /var/run/docker.sock
```

## Services

### Database Service

```yaml
kind: pipeline
type: docker
name: integration-tests

services:
- name: postgres
  image: postgres:15
  environment:
    POSTGRES_USER: testuser
    POSTGRES_PASSWORD: testpass
    POSTGRES_DB: testdb

- name: redis
  image: redis:7

steps:
- name: wait-for-services
  image: postgres:15
  commands:
  - sleep 5
  - until pg_isready -h postgres -U testuser; do sleep 1; done

- name: run-tests
  image: node:18
  environment:
    DATABASE_URL: postgres://testuser:testpass@postgres:5432/testdb
    REDIS_URL: redis://redis:6379
  commands:
  - npm install
  - npm run test:integration
```

## Conditional Execution

### Branch Conditions

```yaml
kind: pipeline
type: docker
name: conditional

steps:
- name: test
  image: node:18
  commands:
  - npm test

- name: deploy-staging
  image: plugins/ssh
  settings:
    host: staging.example.com
    username: deploy
    key:
      from_secret: ssh_key
    script:
    - cd /app
    - git pull
    - npm install
    - pm2 restart app
  when:
    branch:
    - develop
    event:
    - push

- name: deploy-production
  image: plugins/ssh
  settings:
    host: production.example.com
    username: deploy
    key:
      from_secret: ssh_key
    script:
    - cd /app
    - git pull
    - npm install
    - pm2 restart app
  when:
    branch:
    - main
    event:
    - push
    - promote
    target:
    - production
```

### Event-Based Conditions

```yaml
kind: pipeline
type: docker
name: events

steps:
- name: on-pull-request
  image: alpine:3.18
  commands:
  - echo "Running on pull request"
  when:
    event:
    - pull_request

- name: on-tag
  image: alpine:3.18
  commands:
  - echo "Running on tag: $DRONE_TAG"
  when:
    event:
    - tag

- name: on-cron
  image: alpine:3.18
  commands:
  - echo "Running on cron schedule"
  when:
    event:
    - cron
    cron:
    - nightly
```

## Secrets

### Add Secrets via CLI

```bash
# Install Drone CLI
curl -L https://github.com/harness/drone-cli/releases/latest/download/drone_linux_amd64.tar.gz | tar zx
sudo install -t /usr/local/bin drone

# Add secret
drone secret add \
  --repository myorg/myrepo \
  --name docker_password \
  --data secret_value

# Add secret from file
drone secret add \
  --repository myorg/myrepo \
  --name ssh_key \
  --data @~/.ssh/id_rsa
```

### Use Secrets in Pipeline

```yaml
kind: pipeline
type: docker
name: with-secrets

steps:
- name: deploy
  image: alpine:3.18
  environment:
    API_KEY:
      from_secret: api_key
    DB_PASSWORD:
      from_secret: database_password
  commands:
  - echo "Deploying with API key"
  - ./deploy.sh
```

## Matrix Builds

```yaml
kind: pipeline
type: docker
name: matrix-build

platform:
  os: linux
  arch: amd64

steps:
- name: test
  image: node:${NODE_VERSION}
  commands:
  - node --version
  - npm install
  - npm test

matrix:
  NODE_VERSION:
  - "16"
  - "18"
  - "20"

---
kind: pipeline
type: docker
name: multi-platform

platform:
  os: ${DRONE_OS}
  arch: ${DRONE_ARCH}

steps:
- name: build
  image: golang:1.21
  commands:
  - go build -o app
  - ./app --version

matrix:
  include:
  - DRONE_OS: linux
    DRONE_ARCH: amd64
  - DRONE_OS: linux
    DRONE_ARCH: arm64
  - DRONE_OS: windows
    DRONE_ARCH: amd64
```

## Plugins

### Popular Plugins

```yaml
kind: pipeline
type: docker
name: plugins-demo

steps:
# Slack notification
- name: slack
  image: plugins/slack
  settings:
    webhook:
      from_secret: slack_webhook
    channel: builds
    username: drone
    template: >
      {{#success build.status}}
        Build {{build.number}} succeeded!
      {{else}}
        Build {{build.number}} failed!
      {{/success}}

# Docker build and push
- name: docker
  image: plugins/docker
  settings:
    repo: myregistry/myapp
    tags:
    - latest
    - ${DRONE_TAG}
    username:
      from_secret: docker_username
    password:
      from_secret: docker_password

# S3 upload
- name: s3-upload
  image: plugins/s3
  settings:
    bucket: my-bucket
    access_key:
      from_secret: aws_access_key
    secret_key:
      from_secret: aws_secret_key
    source: build/**/*
    target: /releases/${DRONE_TAG}

# GitHub release
- name: github-release
  image: plugins/github-release
  settings:
    api_key:
      from_secret: github_token
    files:
    - dist/*
  when:
    event:
    - tag
```

## Cron Jobs

### Configure Cron in Drone UI

1. Navigate to repository settings
2. Go to Cron section
3. Add new cron job:
   - Name: `nightly`
   - Expression: `0 0 * * *` (midnight daily)
   - Branch: `main`

### Cron Pipeline

```yaml
kind: pipeline
type: docker
name: nightly-build

trigger:
  event:
  - cron
  cron:
  - nightly

steps:
- name: nightly-tests
  image: node:18
  commands:
  - npm install
  - npm run test:all
  - npm run test:e2e

- name: generate-report
  image: node:18
  commands:
  - npm run coverage
  - npm run report

- name: notify
  image: plugins/slack
  settings:
    webhook:
      from_secret: slack_webhook
    channel: nightly-builds
    template: >
      Nightly build completed.
      Status: {{build.status}}
```

## Promotions

### Promote Target

```yaml
kind: pipeline
type: docker
name: deploy

steps:
- name: deploy-to-environment
  image: plugins/ssh
  settings:
    host: ${DRONE_DEPLOY_TO}.example.com
    username: deploy
    key:
      from_secret: ssh_key
    script:
    - cd /app
    - git fetch
    - git checkout ${DRONE_COMMIT}
    - ./deploy.sh

trigger:
  event:
  - promote
  target:
  - staging
  - production
```

Promote via CLI:

```bash
# Promote build to staging
drone build promote myorg/myrepo 123 staging

# Promote to production
drone build promote myorg/myrepo 123 production
```

## Complete CI/CD Example

```yaml
kind: pipeline
type: docker
name: full-cicd

steps:
# Build application
- name: build
  image: node:18
  commands:
  - npm install
  - npm run build

# Run unit tests
- name: unit-tests
  image: node:18
  commands:
  - npm run test:unit

# Run integration tests with services
- name: integration-tests
  image: node:18
  environment:
    DATABASE_URL: postgres://test:test@postgres:5432/testdb
  commands:
  - npm run test:integration

# Lint code
- name: lint
  image: node:18
  commands:
  - npm run lint

# Build Docker image
- name: build-image
  image: plugins/docker
  settings:
    repo: myregistry/myapp
    tags:
    - ${DRONE_BRANCH}-${DRONE_COMMIT_SHA:0:8}
    - ${DRONE_BRANCH}
    username:
      from_secret: docker_username
    password:
      from_secret: docker_password
  when:
    branch:
    - main
    - develop

# Security scan
- name: security-scan
  image: aquasec/trivy
  commands:
  - trivy image myregistry/myapp:${DRONE_BRANCH}

# Deploy to staging
- name: deploy-staging
  image: plugins/ssh
  settings:
    host: staging.example.com
    username: deploy
    key:
      from_secret: ssh_key
    script:
    - docker pull myregistry/myapp:develop
    - docker-compose up -d
  when:
    branch:
    - develop
    event:
    - push

# Notify success
- name: notify-success
  image: plugins/slack
  settings:
    webhook:
      from_secret: slack_webhook
    template: >
      Build {{build.number}} succeeded!
      Branch: {{build.branch}}
      Commit: {{build.commit}}
  when:
    status:
    - success

# Notify failure
- name: notify-failure
  image: plugins/slack
  settings:
    webhook:
      from_secret: slack_webhook
    template: >
      Build {{build.number}} failed!
      Branch: {{build.branch}}
      Commit: {{build.commit}}
  when:
    status:
    - failure

services:
- name: postgres
  image: postgres:15
  environment:
    POSTGRES_USER: test
    POSTGRES_PASSWORD: test
    POSTGRES_DB: testdb

trigger:
  branch:
  - main
  - develop
  event:
  - push
  - pull_request
```

## CLI Commands

```bash
# Build commands
drone build ls myorg/myrepo
drone build info myorg/myrepo 123
drone build logs myorg/myrepo 123
drone build promote myorg/myrepo 123 production

# Repository commands
drone repo ls
drone repo info myorg/myrepo
drone repo sync

# Secret commands
drone secret add --repository myorg/myrepo --name secret_name --data value
drone secret ls myorg/myrepo
drone secret rm myorg/myrepo secret_name

# Cron commands
drone cron ls myorg/myrepo
drone cron add myorg/myrepo nightly "0 0 * * *" --branch main
drone cron rm myorg/myrepo nightly

# Sign configuration (for trusted repos)
drone sign myorg/myrepo
```

## Best Practices

1. **Keep pipelines simple**: Break complex workflows into multiple pipelines
2. **Use plugins**: Leverage community plugins instead of scripts
3. **Cache dependencies**: Use volumes for caching
4. **Secure secrets**: Never commit secrets to `.drone.yml`
5. **Use conditions**: Skip unnecessary steps
6. **Matrix builds**: Test across multiple versions
7. **Resource limits**: Set memory and CPU limits
8. **Clean up**: Remove old build artifacts
9. **Monitoring**: Track build metrics
10. **Documentation**: Comment complex pipeline steps

## Troubleshooting

### Debug Pipeline

```yaml
kind: pipeline
type: docker
name: debug

steps:
- name: debug-environment
  image: alpine:3.18
  commands:
  - echo "Branch: $DRONE_BRANCH"
  - echo "Commit: $DRONE_COMMIT"
  - echo "Event: $DRONE_EVENT"
  - env | sort

- name: debug-workspace
  image: alpine:3.18
  commands:
  - pwd
  - ls -la
  - find . -type f
```

### Common Issues

**Build not triggering**:
```bash
# Check webhook delivery in GitHub/GitLab settings
# Verify Drone server URL is accessible
# Check Drone logs: docker logs drone-server
```

**Secret not found**:
```bash
# List secrets
drone secret ls myorg/myrepo

# Verify secret name matches in .drone.yml
# Check repository access in Drone UI
```

## Resources

- [Drone Documentation](https://docs.drone.io/)
- [Drone Plugins](https://plugins.drone.io/)
- [GitHub Repository](https://github.com/harness/drone)
- [Community Forum](https://discourse.drone.io/)
- [Drone CLI](https://github.com/harness/drone-cli)

## Next Steps

- Install Drone server
- Connect Git repository
- Create first pipeline
- Add secrets
- Configure notifications
- Set up Docker builds
- Implement deployment
- Configure cron jobs
- Use plugins
- Deploy to production
