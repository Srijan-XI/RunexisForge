# Kubernetes — User Guide

## 1) Install Tools (Windows)
Common options for local Kubernetes:
- Docker Desktop Kubernetes
- Minikube
- Kind (Kubernetes in Docker)

Install `kubectl` and verify:

```bash
kubectl version --client
```

## 2) Your First Apply
Apply the example manifest:

```bash
kubectl apply -f "Kubernetes/examples/nginx-deployment.yaml"
```

Check resources:

```bash
kubectl get pods
kubectl get deploy
```

## Examples & Practice
- Examples: `Kubernetes/examples/`
- Practice: `Kubernetes/questions/`
