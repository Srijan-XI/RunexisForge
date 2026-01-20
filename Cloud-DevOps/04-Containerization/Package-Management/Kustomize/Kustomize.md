# Kustomize

## Introduction

Kustomize is a standalone tool to customize Kubernetes objects through a `kustomization.yaml` file. It allows you to create template-free, declarative infrastructure.

Key philosophy: **Base** and **Overlays**.
*   **Base**: The common configuration (e.g., standard deployment).
*   **Overlays**: Specific patches for environments (Production: 3 replicas, Dev: 1 replica).

## Installation

Built into `kubectl` (v1.14+). You can define it using `kubectl -k`.

## Usage Structure

```text
/
├── base
│   ├── deployment.yaml
│   └── kustomization.yaml
└── overlays
    ├── dev
    │   └── kustomization.yaml
    └── prod
        ├── kustomization.yaml
        └── patch-replicas.yaml
```

### Example: Production Overlay (`overlays/prod/kustomization.yaml`)

```yaml
resources:
- ../../base

# Prefix all resources to avoid collision
namePrefix: prod-

# Patch the replica count to 3
patches:
- path: patch-replicas.yaml
```

### Deploying
```bash
kubectl apply -k overlays/prod
```

## Real World Use Case
**Environment Branching**: You have a `Deployment.yaml` for your app.
*   **Dev**: Needs standard CPU limits.
*   **Prod**: Needs higher CPU limits + Environmental Variable `ENV=PROD` + specialized Load Balancer annotations.
Instead of maintaining two huge duplicate files (`dev.yaml` and `prod.yaml`), Kustomize lets you keep one `base.yaml` and just apply small patches for the differences.
