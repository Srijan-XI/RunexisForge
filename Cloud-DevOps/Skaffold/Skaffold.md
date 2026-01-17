# Skaffold

## Introduction

Skaffold is a command line tool by Google that facilitates continuous development for Kubernetes applications. It handles the workflow for building, pushing, and deploying your application, allowing you to focus on writing code.

**The Loop**:
1.  Detect changes in source code.
2.  Build artifacts (Docker images).
3.  Push to repository.
4.  Deploy to cluster.

## Installation

*   **Linux**:
    ```bash
    curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
    sudo install skaffold /usr/local/bin/
    ```
*   **Windows**: `winget install Google.Skaffold`

## Usage (`skaffold.yaml`)

Run `skaffold init` to auto-generate config or write manually.

```yaml
apiVersion: skaffold/v2beta29
kind: Config
build:
  artifacts:
  - image: my-app-image
    context: .
deploy:
  kubectl:
    manifests:
    - k8s-pod.yaml
```

### Development Mode
```bash
skaffold dev
```
This runs the continuous loop. When you save a file in VS Code, Skaffold detects it, rebuilds the container, and updates the Pod in Minikube/K8s instantly. It also tails logs automatically.

## Real World Use Case
**Inner Loop Development**: Developers often complain that K8s is slow to test (Update code -> Build Docker -> Push -> Update YAML -> Apply). Skaffold automates this entire loop, making developing on K8s feel like developing locally with hot-reload.
