# Spinnaker

## Introduction

Spinnaker is an open-source, multi-cloud **Continuous Delivery (CD)** platform originally created by Netflix. It provides advanced deployment strategies like Canary, Red/Black (Blue/Green), and Rolling Updates across various providers (AWS EC2, Kubernetes, Google Cloud).

While tools like ArgoCD focus on Kubernetes GitOps, Spinnaker focuses on the **Workflow** of deployment (e.g., "Deploy to Staging -> Run Integration Test -> Wait for Manager Approval -> Deploy to Prod").

## Key Concepts
*   **Pipeline**: The core workflow (Sequence of Stages).
*   **Stage**: An action (Deploy, Resize group, Manual Judgment).
*   **Application**: A collection of pipelines and infrastructure.

## Usage (Pipeline API)
Spinnaker is typically configured via UI, but pipelines can be defined as JSON.

### Deployment Strategies
1.  **Highlander**: Access a new server group, ensure it's healthy, then destroy the old one.
2.  **Red/Black**: Deploy new group, keep old group but disable traffic (fast rollback).

## Real World Use Case
**Multi-Cloud Deployment**: A media company runs its frontend on Kubernetes (GKE) but its heavy video transcoding on AWS EC2. Spinnaker manages a single "Deploy" pipeline that pushes the Docker image to GKE and updates the EC2 Autoscaling Group in AWS simultaneously, ensuring version consistency across clouds.
