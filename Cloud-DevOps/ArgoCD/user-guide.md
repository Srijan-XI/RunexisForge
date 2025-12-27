# ArgoCD — User Guide

## Installation

### Install on Kubernetes

```bash
# Create namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Expose the UI (for local testing)
kubectl port-forward svc/argocd-server -n argocd 8080:443
```bash

Access UI: <https://localhost:8080>

### Get initial admin password

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```bash

Login: `admin` / `<password from above>`

---

## Install ArgoCD CLI

### Linux/macOS

```bash
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
```bash

### Windows

```powershell
# Download from https://github.com/argoproj/argo-cd/releases/latest
# Add to PATH
```bash

Login via CLI:

```bash
argocd login localhost:8080
argocd account update-password
```bash

---

## Create an application

### Via UI

1. Applications → New App
2. Fill in:
   - **App Name**: myapp
   - **Project**: default
   - **Sync Policy**: Manual or Automatic
   - **Repository URL**: <https://github.com/yourorg/yourapp>
   - **Path**: k8s/ (folder with manifests)
   - **Cluster URL**: <https://kubernetes.default.svc>
   - **Namespace**: default

### Via CLI

```bash
argocd app create myapp \
  --repo https://github.com/yourorg/yourapp \
  --path k8s \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace default
```bash

### Via YAML (declarative)

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/yourorg/yourapp
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```bash

Apply:

```bash
kubectl apply -f application.yaml
```bash

---

## Sync an application

```bash
# Manual sync
argocd app sync myapp

# Enable auto-sync
argocd app set myapp --sync-policy automated

# Watch sync status
argocd app wait myapp
```bash

---

## Rollback

```bash
# View history
argocd app history myapp

# Rollback to a specific revision
argocd app rollback myapp 1
```bash

---

## Multi-cluster setup

```bash
# Add another cluster
argocd cluster add <context-name>

# List clusters
argocd cluster list

# Deploy to specific cluster
argocd app create myapp \
  --dest-server https://my-other-cluster-api
```bash

---

## GitOps workflow

1. Push Kubernetes manifests to Git
2. ArgoCD detects changes
3. ArgoCD syncs cluster to match Git
4. Monitor health in ArgoCD UI

**Benefits:**

- Audit trail (Git history)
- Easy rollback (revert commit)
- Declarative deployments

---

## Best practices

- Use auto-sync + self-heal for production
- Store Application manifests in Git (App of Apps pattern)
- Restrict access with RBAC
- Monitor health and sync status

---

## References

- Docs: <https://argo-cd.readthedocs.io/>
- Getting started: <https://argo-cd.readthedocs.io/en/stable/getting_started/>
