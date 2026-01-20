# Flux

## Introduction

Flux is a GitOps toolkit for keeping Kubernetes clusters in sync with configuration sources (like Git repositories) and automating updates.

## Why Flux?

- **GitOps**: declarative, Git-based cluster management
- **Automated reconciliation**: continuously syncs cluster state with Git
- **Image automation**: automatically update container images
- **Multi-tenancy**: manage multiple teams/apps in one cluster

## Key concepts

- **Source**: where Flux reads manifests (Git, Helm repos, S3)
- **Kustomization**: how Flux applies manifests to the cluster
- **HelmRelease**: declarative Helm chart deployments
- **ImageRepository/ImagePolicy**: automate image updates

## Flux vs ArgoCD

- Flux: toolkit/library approach, CLI-focused, lightweight
- ArgoCD: all-in-one with a rich UI

## When to use Flux

- Kubernetes-native GitOps
- Automating image updates in Git
- Helm-heavy workflows

## Where to go next

- User guide: `Cloud-DevOps/Flux/user-guide.md`
- Examples: `Cloud-DevOps/Flux/examples/`

---

## User Guide

## Installation

### Install Flux CLI

```bash
# macOS/Linux
curl -s https://fluxcd.io/install.sh | sudo bash

# Windows (via scoop)
scoop install flux
```bash

Verify:

```bash
flux --version
```bash

---

## Bootstrap Flux on a cluster

Flux needs to be installed in your cluster and configured to watch a Git repo.

```bash
# Export GitHub token
export GITHUB_TOKEN=<your-token>

# Bootstrap (installs Flux and creates repo structure)
flux bootstrap github \
  --owner=<your-github-username> \
  --repository=fleet-infra \
  --branch=main \
  --path=clusters/my-cluster \
  --personal
```bash

This:

1. Installs Flux in the cluster
2. Creates a GitHub repo (`fleet-infra`)
3. Commits Flux manifests to `clusters/my-cluster/`
4. Configures Flux to watch that repo

---

## Define a GitRepository source

```yaml
apiVersion: source.toolkit.fluxcd.io/v1
kind: GitRepository
metadata:
  name: myapp
  namespace: flux-system
spec:
  interval: 1m
  url: https://github.com/yourorg/yourapp
  ref:
    branch: main
```bash

Apply:

```bash
kubectl apply -f gitrepository.yaml
```bash

---

## Create a Kustomization (apply manifests)

```yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: myapp
  namespace: flux-system
spec:
  interval: 5m
  sourceRef:
    kind: GitRepository
    name: myapp
  path: ./k8s
  prune: true
  wait: true
```bash

Apply:

```bash
kubectl apply -f kustomization.yaml
```bash

Flux will now sync `./k8s` from the Git repo every 5 minutes.

---

## Deploy a Helm chart

```yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: bitnami
  namespace: flux-system
spec:
  interval: 1h
  url: https://charts.bitnami.com/bitnami
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: nginx
  namespace: default
spec:
  interval: 5m
  chart:
    spec:
      chart: nginx
      sourceRef:
        kind: HelmRepository
        name: bitnami
        namespace: flux-system
  values:
    replicaCount: 2
```bash

Apply both resources; Flux will install the Helm chart.

---

## Image automation (auto-update images)

### 1. Define an ImageRepository

```yaml
apiVersion: image.toolkit.fluxcd.io/v1beta1
kind: ImageRepository
metadata:
  name: myapp
  namespace: flux-system
spec:
  image: ghcr.io/yourorg/myapp
  interval: 1m
```bash

### 2. Define an ImagePolicy (semver, regex, etc.)

```yaml
apiVersion: image.toolkit.fluxcd.io/v1beta1
kind: ImagePolicy
metadata:
  name: myapp
  namespace: flux-system
spec:
  imageRepositoryRef:
    name: myapp
  policy:
    semver:
      range: '>=1.0.0'
```bash

### 3. Annotate your deployment

In your Git repo's deployment YAML:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  template:
    spec:
      containers:
      - name: myapp
        image: ghcr.io/yourorg/myapp:1.0.0 # {"$imagepolicy": "flux-system:myapp"}
```bash

### 4. Create an ImageUpdateAutomation

```yaml
apiVersion: image.toolkit.fluxcd.io/v1beta1
kind: ImageUpdateAutomation
metadata:
  name: myapp
  namespace: flux-system
spec:
  interval: 1m
  sourceRef:
    kind: GitRepository
    name: myapp
  git:
    commit:
      author:
        email: fluxcdbot@users.noreply.github.com
        name: fluxcdbot
  update:
    path: ./k8s
    strategy: Setters
```bash

Flux will now:

- Scan for new images
- Update the YAML in Git
- Commit + push
- Reconcile cluster

---

## Monitor Flux

```bash
# Check Flux components
flux check

# Get all Flux resources
flux get all

# Watch a Kustomization
flux get kustomizations --watch

# Reconcile immediately
flux reconcile kustomization myapp --with-source
```bash

---

## Suspend/resume

```bash
# Suspend a Kustomization (pause sync)
flux suspend kustomization myapp

# Resume
flux resume kustomization myapp
```bash

---

## Best practices

- Separate infrastructure (Flux itself) from apps
- Use multi-tenancy with namespaces and service accounts
- Pin image tags or use semver policies
- Store secrets with SOPS or sealed-secrets

## Real World Use Case
**Secure Multi-Tenancy**: You run a SaaS platform where each customer gets their own namespace. You need to ensure Customer A cannot deploy pods into Customer B's namespace. With Flux, you set up a central "Fleet Repo" managed by admins. Flux reads from this restricted repo and applies the namespaces and RBAC policies. Even if a customer tries to commit a "ClusterRoleBinding" to their app repo, Flux (running with restricted service account) will fail to apply it, or the admin repo will strictly override it.

---

## References

- Docs: <https://fluxcd.io/flux/>
- Guides: <https://fluxcd.io/flux/guides/>

