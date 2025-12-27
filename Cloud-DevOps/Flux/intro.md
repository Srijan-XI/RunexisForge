# Flux — Introduction

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
