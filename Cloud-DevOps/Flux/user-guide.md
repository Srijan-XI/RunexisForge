# Flux — User Guide

## Installation

### Install Flux CLI

```bash
# macOS/Linux
curl -s https://fluxcd.io/install.sh | sudo bash

# Windows (via scoop)
scoop install flux
```

Verify:
```bash
flux --version
```

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
```

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
```

Apply:
```bash
kubectl apply -f gitrepository.yaml
```

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
```

Apply:
```bash
kubectl apply -f kustomization.yaml
```

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
```

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
```

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
```

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
```

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
```

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
```

---

## Suspend/resume

```bash
# Suspend a Kustomization (pause sync)
flux suspend kustomization myapp

# Resume
flux resume kustomization myapp
```

---

## Best practices
- Separate infrastructure (Flux itself) from apps
- Use multi-tenancy with namespaces and service accounts
- Pin image tags or use semver policies
- Store secrets with SOPS or sealed-secrets

---

## References
- Docs: https://fluxcd.io/flux/
- Guides: https://fluxcd.io/flux/guides/
