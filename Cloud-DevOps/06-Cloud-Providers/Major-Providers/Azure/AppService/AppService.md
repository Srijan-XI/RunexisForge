# Azure App Service

## Introduction

Azure App Service is a fully managed platform-as-a-service (PaaS) for building, deploying, and scaling web apps, mobile backends, and RESTful APIs. It supports multiple programming languages and frameworks, provides built-in auto-scaling, continuous deployment, and enterprise-grade security features.

### Key Features

- **Fully Managed Platform**: No infrastructure management required
- **Multiple Languages**: .NET, Java, Node.js, Python, PHP, Ruby
- **Auto-Scaling**: Vertical and horizontal scaling
- **Deployment Slots**: Staging environments with zero-downtime deployments
- **Continuous Deployment**: Integration with GitHub, Azure DevOps, Bitbucket
- **Built-in Authentication**: Azure AD, Facebook, Google, Twitter
- **Custom Domains & SSL**: Free SSL certificates
- **Hybrid Connectivity**: VNet integration and Hybrid Connections
- **High Availability**: 99.95% SLA
- **DevOps Integration**: CI/CD pipelines and deployment automation

### Common Use Cases

- **Web Applications**: ASP.NET, Node.js, Python web apps
- **REST APIs**: Backend APIs for mobile and web apps
- **Mobile Backends**: Authentication, data storage, push notifications
- **Microservices**: Containerized microservices
- **E-commerce**: Online stores and shopping platforms
- **SaaS Applications**: Multi-tenant software solutions
- **Internal Applications**: Line-of-business applications
- **Static Sites**: Static website hosting

## Getting Started

### Prerequisites

```bash
# Install Azure CLI
# Windows (PowerShell as Administrator)
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi
Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'

# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Set subscription
az account set --subscription "Your-Subscription-Name"

# Verify installation
az --version
```

### Create App Service

```bash
# Create resource group
az group create \
  --name myResourceGroup \
  --location eastus

# Create App Service plan
az appservice plan create \
  --name myAppServicePlan \
  --resource-group myResourceGroup \
  --sku B1 \
  --is-linux

# Create web app (Node.js)
az webapp create \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --runtime "NODE:18-lts"

# Get web app URL
az webapp show \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --query defaultHostName \
  --output tsv
```

## Deploying Applications

### Node.js Application

```bash
# Create simple Node.js app
mkdir my-node-app && cd my-node-app
npm init -y
npm install express

# Create server
cat > index.js << 'EOF'
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello from Azure App Service!',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
EOF

# Update package.json
cat > package.json << 'EOF'
{
  "name": "my-node-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

# Deploy using ZIP
zip -r app.zip .
az webapp deploy \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --src-path app.zip \
  --type zip

# Or deploy using Git
git init
git add .
git commit -m "Initial commit"
az webapp deployment source config-local-git \
  --name myNodeApp \
  --resource-group myResourceGroup
git remote add azure <git-url>
git push azure main
```

### Python (Flask) Application

```python
# app.py
from flask import Flask, jsonify
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        'message': 'Hello from Azure App Service!',
        'timestamp': datetime.utcnow().isoformat(),
        'python_version': os.sys.version
    })

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8000)))
```

```txt
# requirements.txt
Flask==3.0.0
gunicorn==21.2.0
```

```bash
# Create web app for Python
az webapp create \
  --name myPythonApp \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --runtime "PYTHON:3.11"

# Deploy
zip -r app.zip .
az webapp deploy \
  --name myPythonApp \
  --resource-group myResourceGroup \
  --src-path app.zip \
  --type zip

# Configure startup command
az webapp config set \
  --name myPythonApp \
  --resource-group myResourceGroup \
  --startup-file "gunicorn --bind=0.0.0.0:8000 app:app"
```

### .NET Application

```bash
# Create ASP.NET Core app
dotnet new webapp -o MyWebApp
cd MyWebApp

# Publish
dotnet publish -c Release -o ./publish

# Deploy
cd publish
zip -r ../app.zip .
cd ..
az webapp deploy \
  --name myDotNetApp \
  --resource-group myResourceGroup \
  --src-path app.zip \
  --type zip
```

### Java (Spring Boot) Application

```bash
# Create web app for Java
az webapp create \
  --name myJavaApp \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --runtime "JAVA:17-java17"

# Build Spring Boot app
mvn clean package

# Deploy JAR
az webapp deploy \
  --name myJavaApp \
  --resource-group myResourceGroup \
  --src-path target/myapp-1.0.0.jar \
  --type jar
```

## Container Deployment

### Docker Container

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and push to Azure Container Registry
az acr create \
  --name myContainerRegistry \
  --resource-group myResourceGroup \
  --sku Basic

# Login to ACR
az acr login --name myContainerRegistry

# Build and push image
docker build -t myContainerRegistry.azurecr.io/myapp:latest .
docker push myContainerRegistry.azurecr.io/myapp:latest

# Create web app from container
az webapp create \
  --name myContainerApp \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --deployment-container-image-name myContainerRegistry.azurecr.io/myapp:latest

# Configure container registry credentials
az webapp config container set \
  --name myContainerApp \
  --resource-group myResourceGroup \
  --docker-custom-image-name myContainerRegistry.azurecr.io/myapp:latest \
  --docker-registry-server-url https://myContainerRegistry.azurecr.io \
  --docker-registry-server-user <username> \
  --docker-registry-server-password <password>
```

### Multi-Container (Docker Compose)

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    image: myContainerRegistry.azurecr.io/webapp:latest
    ports:
      - "80:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - redis
  
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

```bash
# Deploy multi-container app
az webapp create \
  --name myMultiContainerApp \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --multicontainer-config-type compose \
  --multicontainer-config-file docker-compose.yml
```

## Deployment Slots

### Create Staging Slot

```bash
# Create deployment slot
az webapp deployment slot create \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --slot staging

# Deploy to staging slot
az webapp deploy \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --slot staging \
  --src-path app.zip \
  --type zip

# Test staging slot
# URL: https://myNodeApp-staging.azurewebsites.net

# Swap staging to production (zero-downtime)
az webapp deployment slot swap \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --slot staging \
  --target-slot production

# Auto-swap configuration
az webapp deployment slot auto-swap \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --slot staging \
  --auto-swap-slot production
```

## Scaling

### Vertical Scaling (Scale Up)

```bash
# List available pricing tiers
az appservice plan show \
  --name myAppServicePlan \
  --resource-group myResourceGroup

# Scale up to Standard S1
az appservice plan update \
  --name myAppServicePlan \
  --resource-group myResourceGroup \
  --sku S1

# Scale up to Premium P1V2
az appservice plan update \
  --name myAppServicePlan \
  --resource-group myResourceGroup \
  --sku P1V2
```

### Horizontal Scaling (Scale Out)

```bash
# Manual scaling
az appservice plan update \
  --name myAppServicePlan \
  --resource-group myResourceGroup \
  --number-of-workers 3

# Auto-scaling based on CPU
az monitor autoscale create \
  --resource-group myResourceGroup \
  --resource myAppServicePlan \
  --resource-type Microsoft.Web/serverfarms \
  --name autoscale-cpu \
  --min-count 2 \
  --max-count 10 \
  --count 2

# Add CPU scale-out rule
az monitor autoscale rule create \
  --resource-group myResourceGroup \
  --autoscale-name autoscale-cpu \
  --condition "Percentage CPU > 70 avg 5m" \
  --scale out 2

# Add CPU scale-in rule
az monitor autoscale rule create \
  --resource-group myResourceGroup \
  --autoscale-name autoscale-cpu \
  --condition "Percentage CPU < 30 avg 5m" \
  --scale in 1
```

## Configuration

### App Settings (Environment Variables)

```bash
# Add app settings
az webapp config appsettings set \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --settings \
    NODE_ENV=production \
    API_URL=https://api.example.com \
    LOG_LEVEL=info

# List app settings
az webapp config appsettings list \
  --name myNodeApp \
  --resource-group myResourceGroup

# Delete app setting
az webapp config appsettings delete \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --setting-names LOG_LEVEL
```

```javascript
// Access in Node.js
const apiUrl = process.env.API_URL;
const logLevel = process.env.LOG_LEVEL || 'debug';
```

### Connection Strings

```bash
# Add connection string
az webapp config connection-string set \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --connection-string-type SQLAzure \
  --settings DefaultConnection="Server=tcp:myserver.database.windows.net;Database=mydb;User ID=admin;Password=xxx"

# Access in .NET
string connString = Configuration.GetConnectionString("DefaultConnection");
```

### Key Vault Integration

```bash
# Create Key Vault
az keyvault create \
  --name myKeyVault \
  --resource-group myResourceGroup \
  --location eastus

# Add secret
az keyvault secret set \
  --vault-name myKeyVault \
  --name DatabasePassword \
  --value "MySecurePassword123!"

# Enable managed identity for web app
az webapp identity assign \
  --name myNodeApp \
  --resource-group myResourceGroup

# Grant access to Key Vault
PRINCIPAL_ID=$(az webapp identity show --name myNodeApp --resource-group myResourceGroup --query principalId -o tsv)

az keyvault set-policy \
  --name myKeyVault \
  --object-id $PRINCIPAL_ID \
  --secret-permissions get list

# Reference secret in app settings
az webapp config appsettings set \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --settings DB_PASSWORD="@Microsoft.KeyVault(SecretUri=https://myKeyVault.vault.azure.net/secrets/DatabasePassword/)"
```

## Custom Domains & SSL

### Add Custom Domain

```bash
# Add custom domain
az webapp config hostname add \
  --webapp-name myNodeApp \
  --resource-group myResourceGroup \
  --hostname www.example.com

# Verify domain ownership (add TXT record)
# Name: asuid.www.example.com
# Value: <verification-id>

# Add DNS records
# CNAME: www.example.com -> myNodeApp.azurewebsites.net
# A: example.com -> <app-service-ip>
```

### SSL Certificate

```bash
# Create managed certificate (free)
az webapp config ssl create \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --hostname www.example.com

# Bind SSL certificate
az webapp config ssl bind \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --certificate-thumbprint <thumbprint> \
  --ssl-type SNI

# Enforce HTTPS
az webapp update \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --https-only true
```

## Authentication & Authorization

### Enable Azure AD Authentication

```bash
# Enable Azure AD auth
az webapp auth update \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --enabled true \
  --action LoginWithAzureActiveDirectory \
  --aad-client-id <client-id> \
  --aad-client-secret <client-secret> \
  --aad-tenant-id <tenant-id>
```

### Social Authentication

```bash
# Enable Google authentication
az webapp auth update \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --enabled true \
  --action LoginWithGoogle \
  --google-client-id <client-id> \
  --google-client-secret <client-secret>
```

## Monitoring & Diagnostics

### Application Insights

```bash
# Create Application Insights
az monitor app-insights component create \
  --app myAppInsights \
  --location eastus \
  --resource-group myResourceGroup \
  --application-type web

# Get instrumentation key
INSTRUMENTATION_KEY=$(az monitor app-insights component show \
  --app myAppInsights \
  --resource-group myResourceGroup \
  --query instrumentationKey -o tsv)

# Configure web app
az webapp config appsettings set \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=$INSTRUMENTATION_KEY
```

```javascript
// Node.js with Application Insights
const appInsights = require('applicationinsights');
appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .start();

const client = appInsights.defaultClient;

// Track custom event
client.trackEvent({ name: 'UserLogin', properties: { userId: '123' } });

// Track custom metric
client.trackMetric({ name: 'OrderValue', value: 99.99 });
```

### Diagnostic Logs

```bash
# Enable application logging
az webapp log config \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --application-logging filesystem \
  --level information

# Enable web server logging
az webapp log config \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --web-server-logging filesystem

# Stream logs
az webapp log tail \
  --name myNodeApp \
  --resource-group myResourceGroup

# Download logs
az webapp log download \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --log-file logs.zip
```

## Networking

### VNet Integration

```bash
# Create Virtual Network
az network vnet create \
  --name myVNet \
  --resource-group myResourceGroup \
  --address-prefix 10.0.0.0/16 \
  --subnet-name appSubnet \
  --subnet-prefix 10.0.1.0/24

# Enable VNet integration
az webapp vnet-integration add \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --vnet myVNet \
  --subnet appSubnet

# Access private resources
# Now your app can access resources in the VNet
```

### Hybrid Connections

```bash
# Create hybrid connection
az relay hyco create \
  --resource-group myResourceGroup \
  --namespace-name myRelay \
  --name myHybridConnection \
  --requires-client-authorization true

# Add hybrid connection to web app
az webapp hybrid-connection add \
  --name myNodeApp \
  --resource-group myResourceGroup \
  --namespace myRelay \
  --hybrid-connection myHybridConnection
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/azure-webapp.yml
name: Deploy to Azure App Service

on:
  push:
    branches: [main]

env:
  AZURE_WEBAPP_NAME: myNodeApp
  NODE_VERSION: '18.x'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build --if-present
      
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

### Azure DevOps

```yaml
# azure-pipelines.yml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

variables:
  azureSubscription: 'Azure-Subscription'
  webAppName: 'myNodeApp'
  nodeVersion: '18.x'

stages:
  - stage: Build
    jobs:
      - job: BuildJob
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(nodeVersion)
          
          - script: |
              npm ci
              npm run build
            displayName: 'Install and Build'
          
          - task: ArchiveFiles@2
            inputs:
              rootFolderOrFile: '$(System.DefaultWorkingDirectory)'
              includeRootFolder: false
              archiveType: 'zip'
              archiveFile: '$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip'
          
          - publish: $(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip
            artifact: drop

  - stage: Deploy
    dependsOn: Build
    jobs:
      - deployment: DeployWeb
        environment: 'production'
        strategy:
          runOnce:
            deploy:
              steps:
                - task: AzureWebApp@1
                  inputs:
                    azureSubscription: $(azureSubscription)
                    appName: $(webAppName)
                    package: $(Pipeline.Workspace)/drop/$(Build.BuildId).zip
```

## Backup & Restore

### Configure Backup

```bash
# Create storage account
az storage account create \
  --name mybackupstorage \
  --resource-group myResourceGroup \
  --location eastus \
  --sku Standard_LRS

# Get storage key
STORAGE_KEY=$(az storage account keys list \
  --account-name mybackupstorage \
  --resource-group myResourceGroup \
  --query '[0].value' -o tsv)

# Create container
az storage container create \
  --name backups \
  --account-name mybackupstorage \
  --account-key $STORAGE_KEY

# Configure backup
az webapp config backup update \
  --resource-group myResourceGroup \
  --webapp-name myNodeApp \
  --container-url "https://mybackupstorage.blob.core.windows.net/backups?<SAS-token>" \
  --frequency 1d \
  --retain-one true \
  --retention 30

# Manual backup
az webapp config backup create \
  --resource-group myResourceGroup \
  --webapp-name myNodeApp \
  --container-url "https://mybackupstorage.blob.core.windows.net/backups?<SAS-token>" \
  --backup-name manual-backup-$(date +%Y%m%d)
```

## Best Practices

### Performance

1. **Use CDN**: Serve static content via Azure CDN
2. **Enable Caching**: Implement application-level caching
3. **Connection Pooling**: Reuse database connections
4. **Auto-Scaling**: Configure appropriate scaling rules
5. **App Service Plan**: Right-size your plan

### Security

1. **Managed Identity**: Use for Azure resource access
2. **Key Vault**: Store secrets securely
3. **HTTPS Only**: Enforce HTTPS
4. **VNet Integration**: Isolate backend resources
5. **Least Privilege**: Minimal RBAC permissions

### Deployment

1. **Deployment Slots**: Test before production
2. **Health Checks**: Configure health endpoints
3. **Zero Downtime**: Use slot swapping
4. **CI/CD**: Automate deployments
5. **Rollback Plan**: Test rollback procedures

## Pricing

### Free Tier (F1)
- 1 GB RAM, 1 GB storage
- 60 CPU minutes/day
- No custom domains or SSL
- **Free**

### Basic (B1)
- 1.75 GB RAM, 10 GB storage
- Custom domains & SSL
- Manual scaling (up to 3 instances)
- **~$13/month**

### Standard (S1)
- 1.75 GB RAM, 50 GB storage
- Auto-scaling (up to 10 instances)
- Deployment slots (5)
- **~$70/month**

### Premium V3 (P1V3)
- 8 GB RAM, 250 GB storage
- Auto-scaling (up to 30 instances)
- VNet integration
- **~$214/month**

## Troubleshooting

### Common Issues

```bash
# App not starting
# Check logs
az webapp log tail --name myNodeApp --resource-group myResourceGroup

# Check application settings
az webapp config appsettings list --name myNodeApp --resource-group myResourceGroup

# High CPU/Memory
# Check metrics
az monitor metrics list \
  --resource /subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Web/sites/myNodeApp \
  --metric "CpuPercentage" \
  --start-time 2026-01-17T00:00:00Z \
  --end-time 2026-01-17T23:59:59Z

# Deployment failures
# Check deployment logs
az webapp log deployment list --name myNodeApp --resource-group myResourceGroup
```

## Resources

### Official Documentation

- [App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [App Service Plans](https://docs.microsoft.com/azure/app-service/overview-hosting-plans)
- [Deployment Best Practices](https://docs.microsoft.com/azure/app-service/deploy-best-practices)
- [Security Best Practices](https://docs.microsoft.com/azure/app-service/security-recommendations)

### Tools & CLIs

- [Azure CLI](https://docs.microsoft.com/cli/azure/)
- [Azure Portal](https://portal.azure.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure App Service Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)

### Community

- [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-app-service.html)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/azure-app-service)
- [Azure DevOps](https://dev.azure.com/)
- [GitHub](https://github.com/Azure/app-service-linux-docs)

### Learning Resources

- [App Service Learning Path](https://docs.microsoft.com/learn/paths/deploy-a-website-with-azure-app-service/)
- [Azure Training](https://docs.microsoft.com/learn/azure/)
- [App Service Samples](https://github.com/Azure-Samples?q=app-service)
- [Azure Blog](https://azure.microsoft.com/blog/topics/app-service/)

---

**Related Technologies**: [Azure Functions](../Functions/), [Azure Container Apps](../ContainerApps/), [Azure Kubernetes Service](../AKS/), [Azure DevOps](../DevOps/), [Docker](../../Docker/)
