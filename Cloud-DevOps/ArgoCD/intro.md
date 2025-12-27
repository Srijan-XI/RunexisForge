# ArgoCD — Introduction

ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It automatically syncs your cluster state with configurations stored in Git.

## Why ArgoCD?

- **GitOps**: Git as the single source of truth for deployments
- **Automated sync**: keeps cluster state in sync with Git
- **Rollback**: revert to any previous Git commit
- **Multi-cluster**: manage multiple Kubernetes clusters from one UI

## Key concepts

- **Application**: a deployment of your code (points to a Git repo + K8s cluster)
- **Sync**: apply changes from Git to the cluster
- **Auto-sync**: automatically deploy when Git changes
- **Health**: monitors resource health (Healthy, Progressing, Degraded)

## When to use ArgoCD

- Adopting GitOps workflows
- Managing Kubernetes deployments declaratively
- Multi-environment or multi-cluster setups

## Where to go next

- User guide: `Cloud-DevOps/ArgoCD/user-guide.md`
- Examples: `Cloud-DevOps/ArgoCD/examples/`
