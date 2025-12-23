# Terraform — Introduction

## Overview
Terraform is an Infrastructure as Code (IaC) tool that lets you define cloud and on-prem infrastructure using declarative configuration files. Terraform builds an execution plan and applies changes safely using a state file.

## Why Terraform?
- Declarative infrastructure
- Repeatable environments (dev/stage/prod)
- Plan/apply workflow for safe changes
- Works with many providers (AWS, Azure, GCP, Kubernetes, etc.)

## Core Concepts
- **Provider**: Plugin that talks to an API (e.g., AWS, Azure)
- **Resource**: A managed object (VM, network, bucket)
- **Module**: Reusable set of Terraform configs
- **State**: Tracks deployed resources

## Resources
- Docs: https://developer.hashicorp.com/terraform/docs
