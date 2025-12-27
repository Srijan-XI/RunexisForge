# Aqua Security Usage Guide (Trivy)

## Install Trivy (CLI)

```bash
# macOS
brew install trivy
# Debian/Ubuntu
sudo apt install trivy
# Docker
docker run --rm aquasec/trivy:latest --version
```bash

## Scan a Container Image

```bash
trivy image nginx:latest
```bash

## Scan File System/Repo

```bash
trivy fs .
```bash

## Scan SBOM

```bash
trivy sbom --format cyclonedx --output sbom.json .
```text

## Kubernetes Cluster Scan

```bash
trivy k8s --report summary cluster
```text

## CI/CD Integration

- Use Trivy GitHub Action: `aquasecurity/trivy-action`
- Fail builds on high/critical vulns via `--exit-code 1 --severity HIGH,CRITICAL`
