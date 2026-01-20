# DigitalOcean

## Introduction

DigitalOcean offers simple cloud infrastructure for developers, including virtual machines, managed databases, Kubernetes, and object storage.

## Core Services

- Droplets (VMs)
- Managed Databases (PostgreSQL, MySQL, Redis)
- Kubernetes (DOKS)
- Spaces (S3-compatible object storage)
- App Platform for PaaS deployments

## Resources

- Docs: <https://docs.digitalocean.com>
- Control Panel: <https://cloud.digitalocean.com>

---

## User Guide

## Setup

- Create account and add SSH keys in the Control Panel
- Install `doctl`: <https://docs.digitalocean.com/reference/doctl/how-to/install/>
- Authenticate: `doctl auth init`

## Droplets

```bash
doctl compute droplet create demo \
  --region nyc3 --image ubuntu-22-04-x64 --size s-1vcpu-1gb \
  --ssh-keys <fingerprint>
```bash

List: `doctl compute droplet list`

## Kubernetes (DOKS)

```bash
doctl kubernetes cluster create demo --region nyc3 --node-pool "name=pool;size=s-2vcpu-2gb;count=2"
doctl kubernetes cluster kubeconfig save demo
kubectl get nodes
```bash

## Spaces

- Create via Control Panel
- S3-compatible endpoint, use `aws s3 --endpoint-url https://<region>.digitaloceanspaces.com ...`

## App Platform

- Deploy from GitHub; supports web services, workers, static sites

## Databases

- Provision managed Postgres/MySQL/Redis; use connection strings from the panel

## Cost Tips

- Destroy unused droplets/volumes
- Use backups/snapshots only as needed

