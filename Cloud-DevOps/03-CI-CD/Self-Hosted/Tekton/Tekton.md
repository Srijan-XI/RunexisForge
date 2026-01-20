# Tekton

## Introduction

### What is Tekton?

Tekton is a powerful and flexible open-source framework for creating CI/CD systems. It runs natively on Kubernetes and provides Kubernetes-style resources for declaring CI/CD pipelines. Tekton is part of the CD Foundation and serves as the standardized, cloud-native CI/CD platform.

### Why Tekton?

- Cloud-native and Kubernetes-native
- Vendor-neutral and open source
- Declarative pipeline definitions
- Reusable tasks and pipelines
- Built-in CI/CD primitives
- Event-driven triggers
- Strong isolation and security
- Scalable on Kubernetes
- Extensive catalog of reusable components
- Integration with existing tools

### Key Components

- **Tasks**: Reusable steps that perform specific actions
- **Pipelines**: Orchestrate multiple tasks
- **TaskRuns**: Execute a specific task
- **PipelineRuns**: Execute a specific pipeline
- **Triggers**: Event-driven pipeline execution
- **Results**: Output values from tasks
- **Workspaces**: Shared storage between tasks

## Prerequisites

- Kubernetes cluster (1.24+)
- kubectl configured
- Basic Kubernetes knowledge
- Understanding of CI/CD concepts

## Installation

### Install Tekton Pipelines

```bash
# Install latest Tekton Pipelines
kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml

# Verify installation
kubectl get pods --namespace tekton-pipelines

# Wait for pods to be ready
kubectl wait --for=condition=Ready pods --all -n tekton-pipelines --timeout=300s
```

### Install Tekton CLI (tkn)

```bash
# Linux
curl -LO https://github.com/tektoncd/cli/releases/latest/download/tkn_Linux_x86_64.tar.gz
sudo tar xvzf tkn_Linux_x86_64.tar.gz -C /usr/local/bin/ tkn

# macOS
brew install tektoncd-cli

# Windows (Chocolatey)
choco install tektoncd-cli

# Verify
tkn version
```

### Install Tekton Dashboard (Optional)

```bash
# Install dashboard
kubectl apply --filename https://storage.googleapis.com/tekton-releases/dashboard/latest/release.yaml

# Access dashboard
kubectl proxy
# Open: http://localhost:8001/api/v1/namespaces/tekton-pipelines/services/tekton-dashboard:http/proxy/

# Or port-forward
kubectl --namespace tekton-pipelines port-forward svc/tekton-dashboard 9097:9097
# Open: http://localhost:9097
```

### Install Tekton Triggers (Optional)

```bash
# Install triggers for event-driven pipelines
kubectl apply --filename https://storage.googleapis.com/tekton-releases/triggers/latest/release.yaml

# Verify
kubectl get pods --namespace tekton-pipelines | grep trigger
```

## Core Concepts

### Task Structure

```yaml
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: example-task
spec:
  params:
  - name: param1
    type: string
    description: Description of parameter
  steps:
  - name: step1
    image: ubuntu
    script: |
      #!/bin/bash
      echo "Hello from step 1"
```

### Pipeline Structure

```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: example-pipeline
spec:
  params:
  - name: param1
    type: string
  tasks:
  - name: task1
    taskRef:
      name: example-task
    params:
    - name: param1
      value: $(params.param1)
```

## Basic Examples

### Simple Task

```yaml
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: hello-world
spec:
  steps:
  - name: echo
    image: alpine:3.18
    script: |
      #!/bin/sh
      echo "Hello World from Tekton!"
      date
      echo "Task completed"
```

Apply and run:

```bash
# Apply task
kubectl apply -f hello-world-task.yaml

# Create TaskRun
tkn task start hello-world --showlog

# Or create TaskRun YAML
cat <<EOF | kubectl apply -f -
apiVersion: tekton.dev/v1beta1
kind: TaskRun
metadata:
  name: hello-world-run
spec:
  taskRef:
    name: hello-world
EOF

# View logs
tkn taskrun logs hello-world-run -f
```

### Task with Parameters

```yaml
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: greet-user
spec:
  params:
  - name: username
    type: string
    description: Username to greet
    default: "Guest"
  - name: greeting
    type: string
    description: Greeting message
    default: "Hello"
  
  steps:
  - name: greet
    image: alpine:3.18
    script: |
      #!/bin/sh
      echo "$(params.greeting), $(params.username)!"
      echo "Current time: $(date)"
```

Run with parameters:

```bash
tkn task start greet-user \
  -p username="Alice" \
  -p greeting="Welcome" \
  --showlog
```

### Task with Results

```yaml
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: generate-build-id
spec:
  results:
  - name: build-id
    description: Generated build ID
  - name: timestamp
    description: Build timestamp
  
  steps:
  - name: generate
    image: alpine:3.18
    script: |
      #!/bin/sh
      BUILD_ID="build-$(date +%Y%m%d-%H%M%S)-$(shuf -i 1000-9999 -n 1)"
      TIMESTAMP=$(date -Iseconds)
      
      echo "Generated Build ID: $BUILD_ID"
      echo -n "$BUILD_ID" > $(results.build-id.path)
      echo -n "$TIMESTAMP" > $(results.timestamp.path)
```

## Pipelines

### Basic Pipeline

```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: simple-pipeline
spec:
  params:
  - name: message
    type: string
    default: "Hello from pipeline"
  
  tasks:
  - name: first-task
    taskRef:
      name: greet-user
    params:
    - name: username
      value: "Pipeline User"
    - name: greeting
      value: $(params.message)
  
  - name: second-task
    runAfter:
    - first-task
    taskRef:
      name: hello-world
```

Run pipeline:

```bash
# Start pipeline
tkn pipeline start simple-pipeline \
  -p message="Welcome to Tekton" \
  --showlog

# Or create PipelineRun
cat <<EOF | kubectl apply -f -
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  name: simple-pipeline-run
spec:
  pipelineRef:
    name: simple-pipeline
  params:
  - name: message
    value: "Hello from PipelineRun"
EOF

# View logs
tkn pipelinerun logs simple-pipeline-run -f
```

### CI/CD Pipeline Example

```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: build-and-deploy
spec:
  params:
  - name: repo-url
    type: string
    description: Git repository URL
  - name: branch
    type: string
    default: main
  - name: image-name
    type: string
    description: Container image name
  
  workspaces:
  - name: shared-workspace
    description: Workspace for source code
  
  tasks:
  # Clone repository
  - name: fetch-source
    taskRef:
      name: git-clone
      kind: ClusterTask
    workspaces:
    - name: output
      workspace: shared-workspace
    params:
    - name: url
      value: $(params.repo-url)
    - name: revision
      value: $(params.branch)
  
  # Run tests
  - name: run-tests
    runAfter:
    - fetch-source
    taskRef:
      name: npm-test
    workspaces:
    - name: source
      workspace: shared-workspace
  
  # Build container image
  - name: build-image
    runAfter:
    - run-tests
    taskRef:
      name: kaniko
      kind: ClusterTask
    workspaces:
    - name: source
      workspace: shared-workspace
    params:
    - name: IMAGE
      value: $(params.image-name):$(tasks.fetch-source.results.commit)
  
  # Deploy to Kubernetes
  - name: deploy
    runAfter:
    - build-image
    taskRef:
      name: kubectl-deploy
    params:
    - name: image
      value: $(params.image-name):$(tasks.fetch-source.results.commit)
```

### Custom Tasks for Pipeline

```yaml
# npm-test task
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: npm-test
spec:
  workspaces:
  - name: source
    description: Source code workspace
  
  steps:
  - name: install
    image: node:18
    workingDir: $(workspaces.source.path)
    script: |
      #!/bin/bash
      npm install
  
  - name: test
    image: node:18
    workingDir: $(workspaces.source.path)
    script: |
      #!/bin/bash
      npm test

---
# kubectl-deploy task
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: kubectl-deploy
spec:
  params:
  - name: image
    type: string
  
  steps:
  - name: deploy
    image: bitnami/kubectl:latest
    script: |
      #!/bin/bash
      kubectl set image deployment/myapp myapp=$(params.image)
      kubectl rollout status deployment/myapp
```

## Workspaces

### PersistentVolumeClaim Workspace

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: build-workspace-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi

---
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  name: pipeline-with-workspace
spec:
  pipelineRef:
    name: build-and-deploy
  params:
  - name: repo-url
    value: "https://github.com/myorg/myapp.git"
  - name: image-name
    value: "myregistry/myapp"
  workspaces:
  - name: shared-workspace
    persistentVolumeClaim:
      claimName: build-workspace-pvc
```

### EmptyDir Workspace

```yaml
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  name: pipeline-emptydir
spec:
  pipelineRef:
    name: build-and-deploy
  params:
  - name: repo-url
    value: "https://github.com/myorg/myapp.git"
  - name: image-name
    value: "myregistry/myapp"
  workspaces:
  - name: shared-workspace
    emptyDir: {}
```

## Triggers

### EventListener

```yaml
apiVersion: triggers.tekton.dev/v1beta1
kind: EventListener
metadata:
  name: github-listener
spec:
  serviceAccountName: tekton-triggers-sa
  triggers:
  - name: github-push
    bindings:
    - ref: github-push-binding
    template:
      ref: github-push-template
```

### TriggerBinding

```yaml
apiVersion: triggers.tekton.dev/v1beta1
kind: TriggerBinding
metadata:
  name: github-push-binding
spec:
  params:
  - name: gitrepositoryurl
    value: $(body.repository.clone_url)
  - name: gitrevision
    value: $(body.head_commit.id)
  - name: gitbranch
    value: $(body.ref)
```

### TriggerTemplate

```yaml
apiVersion: triggers.tekton.dev/v1beta1
kind: TriggerTemplate
metadata:
  name: github-push-template
spec:
  params:
  - name: gitrepositoryurl
    description: Git repository URL
  - name: gitrevision
    description: Git commit ID
  - name: gitbranch
    description: Git branch
  
  resourcetemplates:
  - apiVersion: tekton.dev/v1beta1
    kind: PipelineRun
    metadata:
      generateName: github-push-run-
    spec:
      pipelineRef:
        name: build-and-deploy
      params:
      - name: repo-url
        value: $(tt.params.gitrepositoryurl)
      - name: branch
        value: $(tt.params.gitbranch)
      - name: image-name
        value: "myregistry/myapp"
      workspaces:
      - name: shared-workspace
        emptyDir: {}
```

### Expose EventListener

```bash
# Create service account with permissions
kubectl create serviceaccount tekton-triggers-sa

# Create ingress or use port-forward
kubectl port-forward svc/el-github-listener 8080:8080

# Webhook URL: http://localhost:8080
```

## Tekton Catalog

### Use ClusterTask from Catalog

```bash
# Install git-clone task
kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/git-clone/0.9/git-clone.yaml

# Install kaniko task
kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/kaniko/0.6/kaniko.yaml

# List available clustertasks
tkn clustertask list
```

### Use in Pipeline

```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: catalog-pipeline
spec:
  workspaces:
  - name: shared-data
  
  tasks:
  - name: fetch-repo
    taskRef:
      name: git-clone
      kind: ClusterTask
    workspaces:
    - name: output
      workspace: shared-data
    params:
    - name: url
      value: https://github.com/myorg/myapp
    - name: revision
      value: main
  
  - name: build-image
    runAfter:
    - fetch-repo
    taskRef:
      name: kaniko
      kind: ClusterTask
    workspaces:
    - name: source
      workspace: shared-data
    params:
    - name: IMAGE
      value: myregistry/myapp:latest
```

## CLI Commands

```bash
# Tasks
tkn task list
tkn task describe <task-name>
tkn task start <task-name> -p param=value --showlog
tkn task delete <task-name>

# TaskRuns
tkn taskrun list
tkn taskrun logs <taskrun-name> -f
tkn taskrun describe <taskrun-name>
tkn taskrun delete <taskrun-name>

# Pipelines
tkn pipeline list
tkn pipeline describe <pipeline-name>
tkn pipeline start <pipeline-name> -p param=value --showlog
tkn pipeline delete <pipeline-name>

# PipelineRuns
tkn pipelinerun list
tkn pipelinerun logs <pipelinerun-name> -f
tkn pipelinerun describe <pipelinerun-name>
tkn pipelinerun cancel <pipelinerun-name>
tkn pipelinerun delete <pipelinerun-name>

# ClusterTasks
tkn clustertask list
tkn clustertask describe <clustertask-name>

# Triggers
tkn eventlistener list
tkn eventlistener describe <eventlistener-name>
```

## Advanced Features

### When Expressions

```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: conditional-pipeline
spec:
  params:
  - name: environment
    type: string
  
  tasks:
  - name: test
    taskRef:
      name: run-tests
  
  - name: deploy-staging
    runAfter:
    - test
    when:
    - input: $(params.environment)
      operator: in
      values: ["staging", "production"]
    taskRef:
      name: deploy
    params:
    - name: target
      value: staging
  
  - name: deploy-production
    runAfter:
    - deploy-staging
    when:
    - input: $(params.environment)
      operator: in
      values: ["production"]
    taskRef:
      name: deploy
    params:
    - name: target
      value: production
```

### Matrix (Fan-out)

```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: matrix-pipeline
spec:
  tasks:
  - name: test-matrix
    matrix:
      params:
      - name: platform
        value:
        - linux
        - windows
        - macos
      - name: version
        value:
        - "18"
        - "20"
    taskRef:
      name: run-test
```

### Timeout and Retry

```yaml
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: task-with-timeout
spec:
  steps:
  - name: step-with-timeout
    image: alpine:3.18
    timeout: 5m
    onError: continue
    script: |
      #!/bin/sh
      echo "Running with timeout"
      sleep 10

---
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  name: run-with-timeout
spec:
  pipelineRef:
    name: my-pipeline
  timeouts:
    pipeline: "1h"
    tasks: "30m"
```

## Security

### Service Account

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-bot
  namespace: default

---
apiVersion: v1
kind: Secret
metadata:
  name: docker-credentials
  annotations:
    tekton.dev/docker-0: https://index.docker.io/v1/
type: kubernetes.io/basic-auth
stringData:
  username: myusername
  password: mypassword

---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-bot
secrets:
- name: docker-credentials
```

### Use in PipelineRun

```yaml
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  name: secure-pipeline-run
spec:
  serviceAccountName: build-bot
  pipelineRef:
    name: build-and-deploy
  params:
  - name: repo-url
    value: https://github.com/myorg/myapp
  - name: image-name
    value: myregistry/myapp
  workspaces:
  - name: shared-workspace
    emptyDir: {}
```

## Monitoring

### View Pipeline Status

```bash
# Watch pipeline run
tkn pipelinerun list
tkn pipelinerun describe <pipelinerun-name>

# Get logs in real-time
tkn pipelinerun logs <pipelinerun-name> -f

# Get logs for specific task
tkn pipelinerun logs <pipelinerun-name> -t <task-name> -f
```

### Metrics

```bash
# Tekton exposes metrics on port 9090
kubectl port-forward -n tekton-pipelines deployment/tekton-pipelines-controller 9090:9090

# Access metrics
curl http://localhost:9090/metrics
```

## Best Practices

1. **Reuse Tasks**: Use Tekton Catalog tasks
2. **Parameterize**: Make tasks and pipelines configurable
3. **Workspaces**: Use workspaces for sharing data
4. **Results**: Pass data between tasks using results
5. **Security**: Use service accounts and secrets
6. **Resource Limits**: Set CPU/memory limits
7. **Timeouts**: Define timeouts for long-running tasks
8. **Naming**: Use meaningful names for tasks and pipelines
9. **Labels**: Add labels for organization
10. **Documentation**: Document parameters and usage

## Troubleshooting

### Debug Failed TaskRun

```bash
# Get TaskRun details
tkn taskrun describe <taskrun-name>

# Get logs
tkn taskrun logs <taskrun-name> -f

# Get pod details
kubectl get pods -l tekton.dev/taskRun=<taskrun-name>
kubectl describe pod <pod-name>
kubectl logs <pod-name> -c step-<step-name>
```

### Common Issues

**ImagePullBackOff**:
```bash
# Check pod events
kubectl describe pod <pod-name>
# Verify image name and credentials
```

**Workspace Issues**:
```bash
# Check PVC
kubectl get pvc
kubectl describe pvc <pvc-name>
```

## Resources

- [Tekton Documentation](https://tekton.dev/docs/)
- [Tekton GitHub](https://github.com/tektoncd)
- [Tekton Catalog](https://hub.tekton.dev/)
- [Tekton CLI](https://github.com/tektoncd/cli)
- [Tekton Community](https://github.com/tektoncd/community)

## Next Steps

- Install Tekton on Kubernetes
- Create first task
- Build a pipeline
- Use Tekton Catalog tasks
- Set up triggers
- Implement CI/CD pipeline
- Configure webhooks
- Add security with service accounts
- Monitor pipeline execution
- Deploy to production
