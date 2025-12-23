# Aqua Security Usage Guide (Trivy)

## Install Trivy (CLI)
```bash
# macOS
brew install trivy
# Debian/Ubuntu
sudo apt install trivy
# Docker
docker run --rm aquasec/trivy:latest --version
```

## Scan a Container Image
```bash
trivy image nginx:latest
```

## Scan File System/Repo
```bash
trivy fs .
```

## Scan SBOM
```bash
trivy sbom --format cyclonedx --output sbom.json .
```

## Kubernetes Cluster Scan
```bash
trivy k8s --report summary cluster
```

## CI/CD Integration
- Use Trivy GitHub Action: `aquasecurity/trivy-action`
- Fail builds on high/critical vulns via `--exit-code 1 --severity HIGH,CRITICAL`
