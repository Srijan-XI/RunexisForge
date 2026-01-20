# Kubernetes

## Introduction

## Overview

Kubernetes (K8s) is an open-source container orchestration platform used to automate the deployment, scaling, and management of containerized applications. Originally developed by Google, it provides primitives like Pods, Deployments, Services, and Ingress to run apps reliably across clusters.

### Development History
Kubernetes was founded by Joe Beda, Brendan Burns, and Craig McLuckie at Google. It evolved from Google's internal cluster management systems, **Borg** and **Omega**, which Google had used for over a decade to manage massive-scale workloads (search, Gmail).
*   **2014**: Google open-sourced the project.
*   **2015**: Kubernetes v1.0 was released, and Google partnered with the Linux Foundation to form the **Cloud Native Computing Foundation (CNCF)**, with Kubernetes as its seed project.
*   **Today**: It is the de-facto standard for container orchestration, supported by every major cloud provider (AWS EKS, Azure AKS, Google GKE).

## Why Kubernetes?

- Declarative deployments (desired state)
- Self-healing (restarts, rescheduling)
- Scaling (manual or autoscaling)
- Service discovery and load balancing
- Bin packing (efficient resource usage)

## Real-World Problems Solved
Kubernetes isn't just a hosting tool; it solves specific, painful infrastructure problems:

### 1. The "It Works on My Machine" & Environment Parity
**Problem**: Apps behave differently in Dev, QA, and Prod due to OS/library variations.
**Solution**: K8s standardizes the runtime. If a container runs in a Pod on a developer's machine (Minikube), it runs the exact same way on a massive production cluster.

### 2. The Scaling Nightmare (Black Friday Effect)
**Problem**: Sudden traffic spikes crash servers. Manual provisioning is too slow.
**Solution**: **Horizontal Pod Autoscaling (HPA)** detects high CPU/Memory usage and automatically spins up new replicas. **Cluster Autoscaler** adds more physical nodes if the cluster gets full.

### 3. Downtime During Updates
**Problem**: Updating an app usually meant a maintenance window where the service was unavailable.
**Solution**: **Rolling Updates**. K8s slowly replaces old instances with new ones. If the new version fails health checks, K8s automates a **Rollback**, preventing bad code from taking down production.

### 4. Service Discovery Complexity
**Problem**: Microservices need to find each other (Service A needs to talk to Service B). Hardcoding IPs is brittle.
**Solution**: K8s Services provide a stable DNS name (e.g., `http://my-database`). Pods can come and go, changing IPs, but the Service name remains constant.

## How Users Implement It
In the real world, users rarely interact with raw servers. The implementation flow looks like this:

1.  **Infrastructure as Code (IaC)**: Users define the "Desired State" in YAML files (Manifests).
    *   *"I want 3 copies of this app, exposed on port 80."*
2.  **Control Loop**: The user applies this manifest (`kubectl apply`). The K8s **Control Plane** observes the current state (0 copies) and compares it to the desired state (3 copies).
3.  **Reconciliation**: The Control Plane commands the Worker Nodes to pull the Docker image and start the containers until 3 are running.
4.  **Continuous Management**: If a server crashes and 1 Pod dies, K8s notices the deviation (2 copies vs 3 desired) and immediately starts a replacement on a healthy node.

### Implementation Patterns
*   **Helm Charts**: Package managers for K8s (like apt/yum). Users install complex stacks (Prometheus, Postgres) with one command: `helm install my-db`.
*   **GitOps (ArgoCD / Flux)**: Instead of running `kubectl` manually, developers push YAML changes to Git. An agent (ArgoCD) inside the cluster syncs the cluster state with the Git repo automatically.
*   **Operators**: Specialized software extensions that manage complex stateful applications (like databases) by encoding operational knowledge into code.

## Core Concepts

- **Cluster**: Control plane + worker nodes
- **Pod**: Smallest deployable unit (one or more containers)
- **Deployment**: Manages ReplicaSets for stateless apps
- **Service**: Stable networking endpoint for Pods
- **ConfigMap/Secret**: Configuration and sensitive data
- **Namespace**: Logical isolation

## Resources

- Docs: <https://kubernetes.io/docs/>

---

## User Guide

## 1) Install Tools (Windows)

Common options for local Kubernetes:

- Docker Desktop Kubernetes
- Minikube
- Kind (Kubernetes in Docker)

Install `kubectl` and verify:

```bash
kubectl version --client
```bash

## 2) Your First Apply

Apply the example manifest:

```bash
kubectl apply -f "Kubernetes/examples/nginx-deployment.yaml"
```bash

Check resources:

```bash
kubectl get pods
kubectl get deploy
```bash

## Examples & Practice

- Examples: `Kubernetes/examples/`
- Practice: `Kubernetes/questions/`

