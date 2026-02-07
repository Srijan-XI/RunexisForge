# AquaSecurity

## Introduction

Aqua Security provides a platform for cloud-native application protection, including container scanning, runtime defense, and Kubernetes security posture.

## Key Capabilities

- Container image scanning for vulnerabilities and secrets
- Admission control for Kubernetes
- Runtime protection with eBPF/agents
- CSPM for cloud environments

## Resources

- Product: <https://www.aquasec.com>
- Open source tools (Trivy): <https://github.com/aquasecurity/trivy>

---

## User Guide

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

