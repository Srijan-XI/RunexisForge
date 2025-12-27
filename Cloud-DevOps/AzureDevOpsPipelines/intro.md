# Azure DevOps Pipelines — Introduction

Azure DevOps Pipelines is Microsoft's CI/CD platform for building, testing, and deploying code to any platform and cloud.

## Why Azure Pipelines?

- **Multi-platform**: build on Linux, Windows, macOS
- **Cloud-agnostic**: deploy to Azure, AWS, GCP, on-prem
- **YAML-based**: define pipelines as code
- **Integrated**: tight integration with Azure DevOps repos, boards, artifacts

## Key concepts

- **Pipeline**: automated workflow (build, test, deploy)
- **Stage**: a major division of a pipeline (e.g., Build, Test, Deploy)
- **Job**: a sequence of steps that run on an agent
- **Step**: a single task (e.g., run a script, publish artifacts)
- **Agent**: the machine that executes pipeline jobs
- **Trigger**: what starts the pipeline (push, PR, schedule)

## When to use Azure Pipelines

- Teams already using Azure DevOps or Azure
- Multi-stage deployments (dev → staging → prod)
- Hybrid or multi-cloud CI/CD

## Where to go next

- User guide: `Cloud-DevOps/AzureDevOpsPipelines/user-guide.md`
- Examples: `Cloud-DevOps/AzureDevOpsPipelines/examples/`
