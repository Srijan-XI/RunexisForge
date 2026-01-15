# Container Registries - Managing Docker Images

## Table of Contents
- [Introduction](#introduction)
- [Docker Hub](#docker-hub)
- [Amazon ECR (Elastic Container Registry)](#amazon-ecr)
- [Google GCR / Artifact Registry](#google-gcr)
- [Azure ACR (Container Registry)](#azure-acr)
- [GitHub Container Registry (GHCR)](#ghcr)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

A **Container Registry** is a place to store and distribute container images (usually Docker images). Just as GitHub stores your code, a registry stores your build artifacts.

---

## Docker Hub

The default registry for Docker.
-   **Public**: Free for public repositories.
-   **Official Images**: Maintained by Docker/Vendors (e.g., `node`, `python`, `nginx`).

**Usage**:
```bash
# Login
docker login

# Tag image
docker tag my-app:latest myusername/my-app:1.0

# Push
docker push myusername/my-app:1.0
```

---

## Amazon ECR

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

## Best Practices

1.  **Don't use `latest` tag in production**: Use specific version tags (v1.0.1) or SHA hashes for reproducibility.
2.  **Scan for Vulnerabilities**: Use tools like Trivy or the registry's built-in scanner.
3.  **Minimize Image Size**: Use multi-stage builds and Alpine/Distroless base images.
4.  **Lifecycle Policy**: Configure rules to auto-delete old, unused images to save costs.

---

## Resources

-   [Docker Hub](https://hub.docker.com/)
-   [Amazon ECR Docs](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)
-   [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
