# Azure DevOps Pipelines — User Guide

## Setup

1. Create an Azure DevOps organization: https://dev.azure.com/
2. Create a project
3. Connect a code repository (Azure Repos, GitHub, Bitbucket)
4. Create a pipeline from Pipelines → New Pipeline

---

## Basic YAML pipeline (azure-pipelines.yml)

```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
- script: echo "Hello from Azure Pipelines"
  displayName: 'Say hello'

- script: |
    npm install
    npm test
  displayName: 'Install and test'
```

---

## Multi-stage pipeline

```yaml
trigger:
  - main

stages:
- stage: Build
  jobs:
  - job: BuildJob
    pool:
      vmImage: 'ubuntu-latest'
    steps:
    - script: npm install
    - script: npm run build
    - publish: $(System.DefaultWorkingDirectory)/dist
      artifact: webapp

- stage: Test
  dependsOn: Build
  jobs:
  - job: TestJob
    pool:
      vmImage: 'ubuntu-latest'
    steps:
    - download: current
      artifact: webapp
    - script: npm test

- stage: Deploy
  dependsOn: Test
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: DeployWeb
    environment: 'production'
    strategy:
      runOnce:
        deploy:
          steps:
          - script: echo "Deploying to production"
```

---

## Triggers

### Push trigger
```yaml
trigger:
  branches:
    include:
    - main
    - develop
  paths:
    exclude:
    - docs/*
```

### PR trigger
```yaml
pr:
  branches:
    include:
    - main
```

### Scheduled trigger
```yaml
schedules:
- cron: "0 0 * * *"
  displayName: Nightly build
  branches:
    include:
    - main
```

---

## Variables

```yaml
variables:
  buildConfiguration: 'Release'
  nodeVersion: '18.x'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: $(nodeVersion)

- script: dotnet build --configuration $(buildConfiguration)
```

---

## Tasks (pre-built steps)

```yaml
steps:
# Use Node.js
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'

# Run tests and publish results
- task: PublishTestResults@2
  inputs:
    testResultsFormat: 'JUnit'
    testResultsFiles: '**/test-results.xml'

# Publish build artifacts
- task: PublishBuildArtifacts@1
  inputs:
    pathToPublish: '$(Build.ArtifactStagingDirectory)'
    artifactName: 'drop'
```

---

## Deploy to Azure

```yaml
- task: AzureWebApp@1
  inputs:
    azureSubscription: 'MyAzureConnection'
    appName: 'my-web-app'
    package: '$(Pipeline.Workspace)/drop/*.zip'
```

---

## Environments and approvals

1. Create an environment: Pipelines → Environments → New
2. Add approvals/checks to the environment
3. Reference in deployment job:

```yaml
- deployment: DeployProd
  environment: 'production'
  strategy:
    runOnce:
      deploy:
        steps:
        - script: echo "Deploying to prod"
```

---

## Best practices
- Store pipelines in source control (YAML)
- Use stages to separate build/test/deploy
- Use environments for production approvals
- Leverage variable groups for secrets
- Cache dependencies to speed up builds

---

## References
- Docs: https://learn.microsoft.com/azure/devops/pipelines/
- YAML schema: https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/
