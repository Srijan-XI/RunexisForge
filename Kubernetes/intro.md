# Kubernetes — Introduction

## Overview
Kubernetes (K8s) is a container orchestration platform used to deploy, scale, and manage containerized applications. It provides primitives like Pods, Deployments, Services, and Ingress to run apps reliably across clusters.

## Why Kubernetes?
- Declarative deployments (desired state)
- Self-healing (restarts, rescheduling)
- Scaling (manual or autoscaling)
- Service discovery and load balancing

## Core Concepts
- **Cluster**: Control plane + worker nodes
- **Pod**: Smallest deployable unit (one or more containers)
- **Deployment**: Manages ReplicaSets for stateless apps
- **Service**: Stable networking endpoint for Pods
- **ConfigMap/Secret**: Configuration and sensitive data
- **Namespace**: Logical isolation

## Resources
- Docs: https://kubernetes.io/docs/
