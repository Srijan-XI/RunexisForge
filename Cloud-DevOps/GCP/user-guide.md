# GCP Usage Guide

## Setup

- Create a project in the Console
- Install gcloud SDK: <https://cloud.google.com/sdk/docs/install>
- Initialize: `gcloud init`

## Common CLI Tasks

```bash
# Set project
gcloud config set project my-project

# Compute Engine VM
gcloud compute instances create demo-vm --zone us-central1-a --machine-type e2-micro --image-family debian-12 --image-project debian-cloud

# Cloud Storage bucket
gcloud storage buckets create gs://my-bucket-demo --location=US

# Cloud Run deploy (container)
gcloud run deploy demo --image gcr.io/my-project/demo:latest --region us-central1 --platform managed --allow-unauthenticated
```bash

## Kubernetes (GKE)

```bash
gcloud container clusters create demo-gke --zone us-central1-a --num-nodes 2
gcloud container clusters get-credentials demo-gke --zone us-central1-a
kubectl get nodes
```bash

## Identity

- Prefer Service Accounts for workloads
- Grant minimal IAM roles; audit via Cloud Audit Logs

## Monitoring

- Cloud Logging and Cloud Monitoring (Stackdriver)
- Set alerts on metrics

## Cost Control

- Set budgets/alerts
- Use committed use discounts; shut down idle resources
