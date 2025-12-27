# Helm — Introduction

Helm is the package manager for Kubernetes. It helps you define, install, and upgrade complex Kubernetes applications.

## Why Helm?
- **Templating**: reuse Kubernetes manifests with variables
- **Packaging**: bundle related resources into a single "chart"
- **Versioning**: track and rollback application releases
- **Sharing**: publish/consume charts from public or private repositories

## Key concepts
- **Chart**: a package containing Kubernetes resource templates
- **Release**: an instance of a chart installed in a cluster
- **Repository**: a collection of published charts
- **Values**: configuration variables for templates

## When to use Helm
- Deploying applications with multiple Kubernetes resources
- Sharing repeatable deployment patterns
- Managing application lifecycle (install, upgrade, rollback)

## Where to go next
- User guide: `Cloud-DevOps/Helm/user-guide.md`
- Examples: `Cloud-DevOps/Helm/examples/`
