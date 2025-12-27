# Helm — User Guide

## Installation

### Linux/macOS
```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### Windows
```powershell
winget install Helm.Helm
```

Verify:
```bash
helm version
```

---

## Add a chart repository

```bash
# Add the official stable charts repo
helm repo add stable https://charts.helm.sh/stable

# Add Bitnami charts
helm repo add bitnami https://charts.bitnami.com/bitnami

# Update local repo cache
helm repo update
```

---

## Search and install a chart

```bash
# Search for a chart
helm search repo nginx

# Install a chart
helm install my-nginx bitnami/nginx

# List installed releases
helm list
```

---

## Customize installation with values

```bash
# Show default values for a chart
helm show values bitnami/nginx

# Create a custom values file
cat > my-values.yaml <<EOF
replicaCount: 3
service:
  type: LoadBalancer
EOF

# Install with custom values
helm install my-nginx bitnami/nginx -f my-values.yaml

# Or pass values inline
helm install my-nginx bitnami/nginx --set replicaCount=3
```

---

## Upgrade and rollback

```bash
# Upgrade a release
helm upgrade my-nginx bitnami/nginx -f my-values.yaml

# View release history
helm history my-nginx

# Rollback to a previous revision
helm rollback my-nginx 1
```

---

## Uninstall a release

```bash
helm uninstall my-nginx
```

---

## Create your own chart

```bash
# Create a new chart scaffold
helm create mychart

# Directory structure:
# mychart/
#   Chart.yaml         # Chart metadata
#   values.yaml        # Default values
#   templates/         # Kubernetes templates
#     deployment.yaml
#     service.yaml
#     ...

# Test template rendering
helm template mychart ./mychart

# Package the chart
helm package mychart

# Install from local chart
helm install my-app ./mychart
```

---

## Chart structure essentials

**Chart.yaml**
```yaml
apiVersion: v2
name: mychart
version: 1.0.0
appVersion: "1.0"
description: My application
```

**values.yaml**
```yaml
replicaCount: 2
image:
  repository: nginx
  tag: "latest"
```

**templates/deployment.yaml** (example)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
      - name: app
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
```

---

## Best practices
- Pin chart versions in production
- Use `helm lint` to validate charts
- Store custom values in version control
- Use `--dry-run` to preview changes before applying

---

## References
- Docs: https://helm.sh/docs/
- Chart Hub: https://artifacthub.io/
