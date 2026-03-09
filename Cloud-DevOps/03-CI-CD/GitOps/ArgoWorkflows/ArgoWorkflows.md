# Argo Workflows

## Introduction

### What is Argo Workflows?

Argo Workflows is an open-source container-native workflow engine for orchestrating parallel jobs on Kubernetes. It is implemented as a Kubernetes CRD (Custom Resource Definition) and allows you to define workflows where each step is a container. Argo Workflows makes it easy to orchestrate complex job dependencies, run CI/CD pipelines, and execute machine learning pipelines.

### Why Argo Workflows?

- Native Kubernetes integration
- DAG (Directed Acyclic Graph) workflow support
- Container-native architecture
- Parallel execution and fan-out/fan-in patterns
- Artifact management
- Conditional execution
- Retry and timeout strategies
- Template reusability
- UI for visualization
- Event-driven workflows
- Cron workflows for scheduling

### Key Features

- **DAG workflows**: Define complex dependencies
- **Steps workflows**: Sequential and parallel steps
- **Script templates**: Run inline scripts
- **Container templates**: Execute containers
- **Resource templates**: Create Kubernetes resources
- **Suspend templates**: Manual approval gates
- **Artifact passing**: Share data between steps
- **Parameters**: Dynamic workflow configuration

## Prerequisites

- Kubernetes cluster (1.19+)
- kubectl configured
- Basic Kubernetes knowledge
- Understanding of containers

## Installation

### Quick Start (Latest Version)

```bash
# Install Argo Workflows
kubectl create namespace argo
kubectl apply -n argo -f https://github.com/argoproj/argo-workflows/releases/latest/download/install.yaml

# Verify installation
kubectl get pods -n argo

# Patch service to use LoadBalancer (optional)
kubectl patch svc argo-server -n argo -p '{"spec": {"type": "LoadBalancer"}}'

# Or use port-forward
kubectl -n argo port-forward deployment/argo-server 2746:2746
```

### Install Argo CLI

```bash
# Linux
curl -sLO https://github.com/argoproj/argo-workflows/releases/latest/download/argo-linux-amd64.gz
gunzip argo-linux-amd64.gz
chmod +x argo-linux-amd64
sudo mv argo-linux-amd64 /usr/local/bin/argo

# macOS
brew install argo

# Windows (PowerShell)
Invoke-WebRequest -Uri "https://github.com/argoproj/argo-workflows/releases/latest/download/argo-windows-amd64.gz" -OutFile "argo.gz"
# Extract and add to PATH

# Verify
argo version
```

### Access UI

```bash
# Port-forward to access UI
kubectl -n argo port-forward deployment/argo-server 2746:2746

# Open browser
# https://localhost:2746
```

## Core Concepts

### Workflow Structure

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: hello-world-
spec:
  entrypoint: whalesay
  templates:
  - name: whalesay
    container:
      image: docker/whalesay
      command: [cowsay]
      args: ["hello world"]
```

### Workflow Components

1. **Workflow**: Top-level resource
2. **Templates**: Reusable definitions
3. **Steps**: Sequential/parallel execution
4. **DAG**: Directed Acyclic Graph
5. **Artifacts**: Input/output data
6. **Parameters**: Dynamic values

## Basic Examples

### Simple Container Workflow

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: simple-container-
spec:
  entrypoint: main
  templates:
  - name: main
    container:
      image: alpine:3.18
      command: [sh, -c]
      args:
        - |
          echo "Hello from Argo Workflows"
          date
          uname -a
```

Submit workflow:

```bash
argo submit simple-workflow.yaml -n argo --watch
```

### Parameters Example

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: parameters-
spec:
  entrypoint: main
  arguments:
    parameters:
    - name: message
      value: "Hello World"
    - name: count
      value: "5"
  
  templates:
  - name: main
    inputs:
      parameters:
      - name: message
      - name: count
    container:
      image: alpine:3.18
      command: [sh, -c]
      args:
        - |
          for i in $(seq 1 {{inputs.parameters.count}}); do
            echo "{{inputs.parameters.message}} - Iteration $i"
          done
```

Submit with custom parameters:

```bash
argo submit params.yaml -p message="Custom Message" -p count=3 -n argo --watch
```

### Sequential Steps

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: steps-
spec:
  entrypoint: main
  templates:
  - name: main
    steps:
    - - name: step1
        template: print-message
        arguments:
          parameters:
          - name: message
            value: "Step 1"
    
    - - name: step2
        template: print-message
        arguments:
          parameters:
          - name: message
            value: "Step 2"
    
    - - name: step3
        template: print-message
        arguments:
          parameters:
          - name: message
            value: "Step 3"
  
  - name: print-message
    inputs:
      parameters:
      - name: message
    container:
      image: alpine:3.18
      command: [echo]
      args: ["{{inputs.parameters.message}}"]
```

### Parallel Execution

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: parallel-
spec:
  entrypoint: main
  templates:
  - name: main
    steps:
    # All these run in parallel
    - - name: task-a
        template: run-task
        arguments:
          parameters:
          - name: task-name
            value: "Task A"
      
      - name: task-b
        template: run-task
        arguments:
          parameters:
          - name: task-name
            value: "Task B"
      
      - name: task-c
        template: run-task
        arguments:
          parameters:
          - name: task-name
            value: "Task C"
    
    # This runs after all parallel tasks complete
    - - name: final-task
        template: run-task
        arguments:
          parameters:
          - name: task-name
            value: "Final Task"
  
  - name: run-task
    inputs:
      parameters:
      - name: task-name
    container:
      image: alpine:3.18
      command: [sh, -c]
      args:
        - |
          echo "Running {{inputs.parameters.task-name}}"
          sleep 5
          echo "Completed {{inputs.parameters.task-name}}"
```

## DAG Workflows

### Basic DAG

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: dag-
spec:
  entrypoint: main
  templates:
  - name: main
    dag:
      tasks:
      - name: A
        template: echo
        arguments:
          parameters:
          - name: message
            value: "Task A"
      
      - name: B
        dependencies: [A]
        template: echo
        arguments:
          parameters:
          - name: message
            value: "Task B (depends on A)"
      
      - name: C
        dependencies: [A]
        template: echo
        arguments:
          parameters:
          - name: message
            value: "Task C (depends on A)"
      
      - name: D
        dependencies: [B, C]
        template: echo
        arguments:
          parameters:
          - name: message
            value: "Task D (depends on B and C)"
  
  - name: echo
    inputs:
      parameters:
      - name: message
    container:
      image: alpine:3.18
      command: [echo]
      args: ["{{inputs.parameters.message}}"]
```

### CI/CD Pipeline DAG

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: ci-cd-pipeline-
spec:
  entrypoint: main
  arguments:
    parameters:
    - name: repo
      value: "https://github.com/myorg/myapp.git"
    - name: branch
      value: "main"
  
  templates:
  - name: main
    dag:
      tasks:
      - name: checkout
        template: git-clone
        arguments:
          parameters:
          - name: repo
            value: "{{workflow.parameters.repo}}"
          - name: branch
            value: "{{workflow.parameters.branch}}"
      
      - name: build
        dependencies: [checkout]
        template: docker-build
      
      - name: test-unit
        dependencies: [build]
        template: run-tests
        arguments:
          parameters:
          - name: test-type
            value: "unit"
      
      - name: test-integration
        dependencies: [build]
        template: run-tests
        arguments:
          parameters:
          - name: test-type
            value: "integration"
      
      - name: security-scan
        dependencies: [build]
        template: security-scan
      
      - name: deploy
        dependencies: [test-unit, test-integration, security-scan]
        template: deploy-app
  
  - name: git-clone
    inputs:
      parameters:
      - name: repo
      - name: branch
    container:
      image: alpine/git
      command: [sh, -c]
      args:
        - |
          git clone --branch {{inputs.parameters.branch}} {{inputs.parameters.repo}} /work
      volumeMounts:
      - name: work
        mountPath: /work
  
  - name: docker-build
    container:
      image: gcr.io/kaniko-project/executor:latest
      command: [/kaniko/executor]
      args:
        - --context=/work
        - --destination=myregistry/myapp:latest
        - --cache=true
      volumeMounts:
      - name: work
        mountPath: /work
  
  - name: run-tests
    inputs:
      parameters:
      - name: test-type
    container:
      image: myapp:latest
      command: [sh, -c]
      args:
        - |
          echo "Running {{inputs.parameters.test-type}} tests"
          npm run test:{{inputs.parameters.test-type}}
  
  - name: security-scan
    container:
      image: aquasec/trivy:latest
      command: [trivy]
      args:
        - image
        - myregistry/myapp:latest
  
  - name: deploy-app
    container:
      image: bitnami/kubectl:latest
      command: [kubectl]
      args:
        - apply
        - -f
        - /work/k8s/deployment.yaml
      volumeMounts:
      - name: work
        mountPath: /work

  volumeClaimTemplates:
  - metadata:
      name: work
    spec:
      accessModes: [ReadWriteOnce]
      resources:
        requests:
          storage: 1Gi
```

## Artifacts

### Artifact Passing Between Steps

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: artifacts-
spec:
  entrypoint: main
  templates:
  - name: main
    steps:
    - - name: generate
        template: generate-artifact
    
    - - name: consume
        template: consume-artifact
        arguments:
          artifacts:
          - name: data
            from: "{{steps.generate.outputs.artifacts.result}}"
  
  - name: generate-artifact
    container:
      image: alpine:3.18
      command: [sh, -c]
      args:
        - |
          echo "Generated data" > /tmp/result.txt
          date >> /tmp/result.txt
    outputs:
      artifacts:
      - name: result
        path: /tmp/result.txt
  
  - name: consume-artifact
    inputs:
      artifacts:
      - name: data
        path: /tmp/data.txt
    container:
      image: alpine:3.18
      command: [sh, -c]
      args:
        - |
          echo "Reading artifact:"
          cat /tmp/data.txt
```

### S3 Artifact Repository

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: s3-artifacts-
spec:
  entrypoint: main
  artifactRepositoryRef:
    configMap: artifact-repositories
    key: default-s3-artifact-repository
  
  templates:
  - name: main
    container:
      image: alpine:3.18
      command: [sh, -c]
      args:
        - |
          echo "Build artifacts" > /tmp/build.tar.gz
    outputs:
      artifacts:
      - name: build-output
        path: /tmp/build.tar.gz
        s3:
          endpoint: s3.amazonaws.com
          bucket: my-bucket
          key: "artifacts/{{workflow.name}}/build.tar.gz"
          accessKeySecret:
            name: my-s3-credentials
            key: accessKey
          secretKeySecret:
            name: my-s3-credentials
            key: secretKey
```

## Script Templates

### Python Script

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: python-script-
spec:
  entrypoint: main
  templates:
  - name: main
    script:
      image: python:3.11
      command: [python]
      source: |
        import json
        import sys
        
        data = {
            "message": "Hello from Python",
            "workflow": "{{workflow.name}}",
            "status": "success"
        }
        
        print(json.dumps(data, indent=2))
        
        # Write output parameter
        with open('/tmp/result.txt', 'w') as f:
            f.write(data['message'])
    outputs:
      parameters:
      - name: result
        valueFrom:
          path: /tmp/result.txt
```

### Bash Script with Parameters

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: bash-script-
spec:
  entrypoint: main
  arguments:
    parameters:
    - name: environment
      value: "production"
  
  templates:
  - name: main
    inputs:
      parameters:
      - name: environment
    script:
      image: ubuntu:22.04
      command: [bash]
      source: |
        #!/bin/bash
        set -e
        
        ENV="{{inputs.parameters.environment}}"
        
        echo "Deploying to $ENV"
        
        if [ "$ENV" == "production" ]; then
          echo "Running production deployment"
          # Production steps
        else
          echo "Running staging deployment"
          # Staging steps
        fi
        
        echo "Deployment completed"
```

## Conditional Execution

### When Condition

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: conditional-
spec:
  entrypoint: main
  arguments:
    parameters:
    - name: run-tests
      value: "true"
  
  templates:
  - name: main
    steps:
    - - name: build
        template: build-app
    
    - - name: test
        template: run-tests
        when: "{{workflow.parameters.run-tests}} == true"
    
    - - name: deploy
        template: deploy-app
  
  - name: build-app
    container:
      image: alpine:3.18
      command: [echo, "Building..."]
  
  - name: run-tests
    container:
      image: alpine:3.18
      command: [echo, "Running tests..."]
  
  - name: deploy-app
    container:
      image: alpine:3.18
      command: [echo, "Deploying..."]
```

## Retry and Timeout

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: retry-timeout-
spec:
  entrypoint: main
  templates:
  - name: main
    retryStrategy:
      limit: 3
      retryPolicy: "Always"
      backoff:
        duration: "1s"
        factor: 2
        maxDuration: "1m"
    
    activeDeadlineSeconds: 300  # 5 minute timeout
    
    container:
      image: alpine:3.18
      command: [sh, -c]
      args:
        - |
          # Simulate random failure
          if [ $((RANDOM % 2)) -eq 0 ]; then
            echo "Task succeeded"
            exit 0
          else
            echo "Task failed, will retry"
            exit 1
          fi
```

## Cron Workflows

```yaml
apiVersion: argoproj.io/v1alpha1
kind: CronWorkflow
metadata:
  name: nightly-backup
  namespace: argo
spec:
  schedule: "0 2 * * *"  # Every day at 2 AM
  timezone: "America/New_York"
  concurrencyPolicy: "Forbid"
  startingDeadlineSeconds: 0
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 3
  
  workflowSpec:
    entrypoint: backup
    templates:
    - name: backup
      steps:
      - - name: database-backup
          template: backup-db
      
      - - name: upload-to-s3
          template: upload-backup
    
    - name: backup-db
      container:
        image: postgres:15
        command: [sh, -c]
        args:
          - |
            pg_dump -h $DB_HOST -U $DB_USER $DB_NAME > /tmp/backup.sql
            echo "Backup created"
        env:
        - name: DB_HOST
          value: "postgres.default.svc"
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: db-creds
              key: username
        - name: DB_NAME
          value: "myapp"
      outputs:
        artifacts:
        - name: backup
          path: /tmp/backup.sql
    
    - name: upload-backup
      container:
        image: amazon/aws-cli
        command: [sh, -c]
        args:
          - |
            aws s3 cp /tmp/backup.sql s3://backups/$(date +%Y%m%d).sql
```

## CLI Commands

```bash
# Submit workflow
argo submit workflow.yaml -n argo

# Submit and watch
argo submit workflow.yaml -n argo --watch

# Submit with parameters
argo submit workflow.yaml -n argo -p param1=value1 -p param2=value2

# List workflows
argo list -n argo

# Get workflow status
argo get workflow-name -n argo

# Get workflow logs
argo logs workflow-name -n argo

# Get logs for specific step
argo logs workflow-name -n argo -c step-name

# Delete workflow
argo delete workflow-name -n argo

# Resubmit workflow
argo resubmit workflow-name -n argo

# Retry workflow
argo retry workflow-name -n argo

# Stop workflow
argo stop workflow-name -n argo

# Terminate workflow
argo terminate workflow-name -n argo

# Suspend workflow
argo suspend workflow-name -n argo

# Resume workflow
argo resume workflow-name -n argo

# Archive workflows
argo archive list -n argo

# Get archived workflow
argo archive get workflow-uid -n argo
```

## Best Practices

1. **Use Templates**: Create reusable templates
2. **Resource Limits**: Set CPU/memory limits
3. **Timeouts**: Use activeDeadlineSeconds
4. **Retries**: Implement retry strategies
5. **Artifacts**: Use artifact repositories (S3, GCS)
6. **Parameters**: Make workflows configurable
7. **Secrets**: Use Kubernetes secrets for sensitive data
8. **Labels**: Add labels for organization
9. **Monitoring**: Monitor workflow metrics
10. **Clean Up**: Set TTL for completed workflows

## Security

### RBAC Configuration

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: workflow-runner
  namespace: argo

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: workflow-role
  namespace: argo
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/log
  verbs:
  - get
  - watch
  - patch
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - get

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: workflow-rolebinding
  namespace: argo
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: workflow-role
subjects:
- kind: ServiceAccount
  name: workflow-runner
  namespace: argo
```

## Troubleshooting

### Debug Failed Workflow

```bash
# Get workflow details
argo get failed-workflow -n argo

# Get logs
argo logs failed-workflow -n argo

# Describe workflow
kubectl describe workflow failed-workflow -n argo

# Get pod details
kubectl get pods -n argo | grep failed-workflow
kubectl describe pod <pod-name> -n argo
kubectl logs <pod-name> -n argo
```

### Common Issues

**Workflow Pending**:
```bash
# Check pod status
kubectl get pods -n argo
# Check events
kubectl get events -n argo --sort-by='.lastTimestamp'
```

**Permission Errors**:
```bash
# Verify service account
kubectl get sa -n argo
kubectl describe sa workflow-controller -n argo
```

## Resources

- [Argo Workflows Documentation](https://argoproj.github.io/argo-workflows/)
- [GitHub Repository](https://github.com/argoproj/argo-workflows)
- [Examples](https://github.com/argoproj/argo-workflows/tree/master/examples)
- [Workflow Templates Catalog](https://github.com/argoproj-labs/argo-workflows-catalog)
- [Community](https://argoproj.github.io/community/)

## Next Steps

- Install Argo Workflows
- Create first workflow
- Implement DAG workflow
- Set up artifact repository
- Configure cron workflows
- Integrate with CI/CD
- Set up monitoring
- Implement retry strategies
- Create workflow templates
- Deploy to production
