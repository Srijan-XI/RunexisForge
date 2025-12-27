# Azure Usage Guide

## Setup

- Create an Azure account and subscription
- Install Azure CLI: <https://learn.microsoft.com/cli/azure/install-azure-cli>
- Login: `az login`

## Common CLI Tasks

```bash
# Resource group
az group create -n rg-demo -l eastus

# App Service (Linux)
az appservice plan create -n plan-demo -g rg-demo --sku B1 --is-linux
az webapp create -n app-demo -g rg-demo -p plan-demo --runtime "NODE:18LTS"

# Storage account
az storage account create -n demostore$RANDOM -g rg-demo -l eastus --sku Standard_LRS
```bash

## Kubernetes (AKS)

```bash
az aks create -g rg-demo -n aks-demo --node-count 2 --generate-ssh-keys
az aks get-credentials -g rg-demo -n aks-demo
kubectl get nodes
```bash

## Databases

```bash
az postgres flexible-server create -g rg-demo -n pg-demo -l eastus --tier Burstable --sku-name Standard_B1ms
```bash

## Identity

- Use Managed Identity with App Service/VM to access other resources
- Assign roles via `az role assignment create`

## Monitoring

- Enable Application Insights for apps
- Use Log Analytics workspaces for centralized logs/metrics

## Cost Control

- Set budgets and alerts in Cost Management
- Stop/delete unused resources; use auto-shutdown on dev VMs
