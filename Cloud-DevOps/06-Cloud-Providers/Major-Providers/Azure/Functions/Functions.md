# Azure Functions

## Introduction

Azure Functions is a serverless compute service that enables you to run event-driven code without having to explicitly provision or manage infrastructure. Functions provide a fully managed compute platform with high reliability and security, allowing you to focus on the code that matters most to your business while Azure handles the rest.

### Key Features

- **Serverless Architecture**: No infrastructure management
- **Event-Driven**: Triggered by various Azure services and external sources
- **Multiple Languages**: C#, Java, JavaScript, TypeScript, Python, PowerShell
- **Flexible Hosting**: Consumption, Premium, and Dedicated plans
- **Durable Functions**: Stateful workflows in serverless environment
- **Integrated Security**: Managed identity and Key Vault integration
- **Built-in Scaling**: Automatic scaling based on demand
- **Developer Productivity**: Local development and debugging
- **Hybrid Deployment**: Run on-premises or in the cloud
- **Pay-per-Use**: Pay only for execution time

### Common Use Cases

- **API Backends**: RESTful APIs and webhooks
- **Data Processing**: ETL, file processing, data transformation
- **Scheduled Tasks**: Cron jobs and background processing
- **IoT**: Process IoT device data and telemetry
- **Real-time Stream Processing**: Process events from Event Hubs, IoT Hub
- **Automation**: DevOps automation, infrastructure automation
- **Integration**: Connect systems and services
- **Machine Learning**: ML inference and batch scoring

## Getting Started

### Prerequisites

```bash
# Install Azure Functions Core Tools
# Windows (via npm)
npm install -g azure-functions-core-tools@4 --unsafe-perm true

# macOS
brew tap azure/functions
brew install azure-functions-core-tools@4

# Linux
wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install azure-functions-core-tools-4

# Install Azure CLI
# Windows
winget install Microsoft.AzureCLI

# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Verify installation
func --version
az --version
```

### Create Function App

```bash
# Create resource group
az group create \
  --name myResourceGroup \
  --location eastus

# Create storage account (required for Functions)
az storage account create \
  --name myfunctionsstorage \
  --resource-group myResourceGroup \
  --location eastus \
  --sku Standard_LRS

# Create Function App (Consumption plan)
az functionapp create \
  --name myFunctionApp \
  --resource-group myResourceGroup \
  --consumption-plan-location eastus \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --storage-account myfunctionsstorage

# Create Function App (Premium plan)
az functionapp plan create \
  --name myPremiumPlan \
  --resource-group myResourceGroup \
  --location eastus \
  --sku EP1

az functionapp create \
  --name myPremiumFunctionApp \
  --resource-group myResourceGroup \
  --plan myPremiumPlan \
  --runtime python \
  --runtime-version 3.11 \
  --functions-version 4 \
  --storage-account myfunctionsstorage
```

## Local Development

### Create Function Project

```bash
# Create new project
mkdir my-functions && cd my-functions
func init --worker-runtime node --language javascript

# Create HTTP trigger function
func new --name HttpTrigger --template "HTTP trigger"

# Project structure:
# my-functions/
#   ├── .vscode/
#   ├── HttpTrigger/
#   │   ├── function.json
#   │   └── index.js
#   ├── host.json
#   ├── local.settings.json
#   └── package.json

# Run locally
func start

# Test function
curl http://localhost:7071/api/HttpTrigger?name=Azure
```

## HTTP Trigger Functions

### JavaScript/Node.js

```javascript
// HttpTrigger/index.js
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = req.query.name || (req.body && req.body.name);
    
    if (name) {
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                message: `Hello, ${name}!`,
                timestamp: new Date().toISOString()
            }
        };
    } else {
        context.res = {
            status: 400,
            body: {
                error: "Please pass a name on the query string or in the request body"
            }
        };
    }
};
```

```json
// HttpTrigger/function.json
{
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get", "post"],
      "route": "hello/{name?}"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

### Python

```python
# HttpTrigger/__init__.py
import logging
import json
import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return func.HttpResponse(
            json.dumps({
                'message': f'Hello, {name}!',
                'timestamp': func.datetime.utcnow().isoformat()
            }),
            status_code=200,
            mimetype='application/json'
        )
    else:
        return func.HttpResponse(
            json.dumps({'error': 'Please pass a name'}),
            status_code=400,
            mimetype='application/json'
        )
```

### C# (.NET)

```csharp
// HttpTrigger.cs
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

public static class HttpTrigger
{
    [FunctionName("HttpTrigger")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        string name = req.Query["name"];

        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        dynamic data = JsonConvert.DeserializeObject(requestBody);
        name = name ?? data?.name;

        if (!string.IsNullOrEmpty(name))
        {
            return new OkObjectResult(new { 
                message = $"Hello, {name}!",
                timestamp = DateTime.UtcNow
            });
        }
        else
        {
            return new BadRequestObjectResult(new { error = "Please pass a name" });
        }
    }
}
```

### Java

```java
// HttpTrigger.java
package com.example;

import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.annotation.*;
import java.util.*;

public class HttpTrigger {
    @FunctionName("HttpTrigger")
    public HttpResponseMessage run(
            @HttpTrigger(
                name = "req",
                methods = {HttpMethod.GET, HttpMethod.POST},
                authLevel = AuthorizationLevel.FUNCTION)
                HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        
        context.getLogger().info("Java HTTP trigger processed a request.");

        String name = request.getQueryParameters().get("name");
        
        if (name == null) {
            name = request.getBody().orElse(null);
        }

        if (name == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("Please pass a name")
                    .build();
        } else {
            return request.createResponseBuilder(HttpStatus.OK)
                    .body("Hello, " + name)
                    .build();
        }
    }
}
```

## Timer Trigger Functions

### Cron Expression

```javascript
// TimerTrigger/index.js
module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    
    context.log('Timer trigger function ran at:', timeStamp);
    
    // Perform scheduled task
    await performDailyCleanup();
};

async function performDailyCleanup() {
    // Your cleanup logic here
    console.log('Running daily cleanup...');
}
```

```json
// TimerTrigger/function.json
{
  "bindings": [
    {
      "name": "myTimer",
      "type": "timerTrigger",
      "direction": "in",
      "schedule": "0 0 2 * * *"
    }
  ]
}
```

**Cron Format**: `{second} {minute} {hour} {day} {month} {day-of-week}`

Examples:
- `0 */5 * * * *` - Every 5 minutes
- `0 0 * * * *` - Every hour
- `0 0 9 * * *` - Every day at 9 AM
- `0 0 0 * * MON` - Every Monday at midnight

### Python Timer

```python
# TimerTrigger/__init__.py
import datetime
import logging
import azure.functions as func

def main(mytimer: func.TimerRequest) -> None:
    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()

    if mytimer.past_due:
        logging.info('The timer is past due!')

    logging.info('Python timer trigger function ran at %s', utc_timestamp)
    
    # Perform scheduled task
    perform_backup()

def perform_backup():
    logging.info('Running backup...')
    # Your backup logic here
```

## Blob Storage Trigger

### Process Uploaded Files

```javascript
// BlobTrigger/index.js
const sharp = require('sharp');

module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");
    
    // Process image
    if (context.bindingData.name.match(/\.(jpg|jpeg|png)$/i)) {
        try {
            const thumbnail = await sharp(myBlob)
                .resize(200, 200, { fit: 'cover' })
                .toBuffer();
            
            context.bindings.outputBlob = thumbnail;
            context.log('Thumbnail created successfully');
        } catch (error) {
            context.log.error('Error processing image:', error);
            throw error;
        }
    }
};
```

```json
// BlobTrigger/function.json
{
  "bindings": [
    {
      "name": "myBlob",
      "type": "blobTrigger",
      "direction": "in",
      "path": "uploads/{name}",
      "connection": "AzureWebJobsStorage"
    },
    {
      "name": "outputBlob",
      "type": "blob",
      "direction": "out",
      "path": "thumbnails/{name}",
      "connection": "AzureWebJobsStorage"
    }
  ]
}
```

### Python Blob Processing

```python
# BlobTrigger/__init__.py
import logging
import azure.functions as func
from PIL import Image
import io

def main(myblob: func.InputStream, outputBlob: func.Out[bytes]):
    logging.info(f"Python blob trigger function processed blob \n"
                 f"Name: {myblob.name}\n"
                 f"Blob Size: {myblob.length} bytes")
    
    # Read image
    image_data = myblob.read()
    image = Image.open(io.BytesIO(image_data))
    
    # Create thumbnail
    image.thumbnail((200, 200))
    
    # Save to output
    output = io.BytesIO()
    image.save(output, format='JPEG')
    outputBlob.set(output.getvalue())
    
    logging.info('Thumbnail created successfully')
```

## Queue Storage Trigger

### Process Queue Messages

```javascript
// QueueTrigger/index.js
module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    
    try {
        // Process the message
        const result = await processOrder(myQueueItem);
        
        // Send email notification
        context.bindings.emailMessage = {
            to: myQueueItem.email,
            subject: 'Order Processed',
            body: `Your order ${myQueueItem.orderId} has been processed`
        };
        
        context.log('Order processed successfully:', result);
    } catch (error) {
        context.log.error('Error processing order:', error);
        // Message will be retried or moved to poison queue
        throw error;
    }
};

async function processOrder(order) {
    // Your order processing logic
    return { orderId: order.orderId, status: 'completed' };
}
```

```json
// QueueTrigger/function.json
{
  "bindings": [
    {
      "name": "myQueueItem",
      "type": "queueTrigger",
      "direction": "in",
      "queueName": "orders",
      "connection": "AzureWebJobsStorage"
    },
    {
      "name": "emailMessage",
      "type": "sendGrid",
      "direction": "out",
      "apiKey": "SendGridApiKey",
      "from": "orders@example.com"
    }
  ]
}
```

## Event Hub Trigger

### Stream Processing

```python
# EventHubTrigger/__init__.py
import logging
import json
import azure.functions as func

def main(events: func.EventHubEvent):
    for event in events:
        logging.info('Python EventHub trigger processed an event: %s',
                    event.get_body().decode('utf-8'))
        
        # Parse event data
        event_data = json.loads(event.get_body().decode('utf-8'))
        
        # Process telemetry data
        process_telemetry(event_data)

def process_telemetry(data):
    logging.info(f"Processing telemetry: {data}")
    
    # Analyze sensor data
    if data.get('temperature') > 80:
        logging.warning(f"High temperature alert: {data['temperature']}°C")
        send_alert(data)

def send_alert(data):
    logging.info(f"Sending alert for device: {data['deviceId']}")
    # Send notification logic
```

## Cosmos DB Trigger

### Change Feed Processing

```javascript
// CosmosDBTrigger/index.js
module.exports = async function (context, documents) {
    if (!!documents && documents.length > 0) {
        context.log('Document count:', documents.length);
        
        for (const doc of documents) {
            context.log('Processing document:', doc.id);
            
            // Audit log
            context.bindings.auditLog = {
                documentId: doc.id,
                operation: 'modified',
                timestamp: new Date().toISOString(),
                data: doc
            };
            
            // Send notification if needed
            if (doc.status === 'approved') {
                await sendNotification(doc);
            }
        }
    }
};

async function sendNotification(document) {
    console.log('Sending notification for:', document.id);
    // Notification logic
}
```

```json
// CosmosDBTrigger/function.json
{
  "bindings": [
    {
      "type": "cosmosDBTrigger",
      "name": "documents",
      "direction": "in",
      "leaseCollectionName": "leases",
      "connectionStringSetting": "CosmosDBConnection",
      "databaseName": "myDatabase",
      "collectionName": "myCollection",
      "createLeaseCollectionIfNotExists": true
    },
    {
      "type": "cosmosDB",
      "name": "auditLog",
      "databaseName": "myDatabase",
      "collectionName": "auditLogs",
      "createIfNotExists": true,
      "connectionStringSetting": "CosmosDBConnection",
      "direction": "out"
    }
  ]
}
```

## Durable Functions

### Orchestration

```javascript
// Orchestrator/index.js
const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const outputs = [];
    
    // Parallel execution
    const parallelTasks = [];
    parallelTasks.push(context.df.callActivity("ProcessPayment", context.df.getInput()));
    parallelTasks.push(context.df.callActivity("SendEmail", context.df.getInput()));
    parallelTasks.push(context.df.callActivity("UpdateInventory", context.df.getInput()));
    
    const results = yield context.df.Task.all(parallelTasks);
    outputs.push(...results);
    
    // Sequential execution
    const approval = yield context.df.callActivity("RequestApproval", context.df.getInput());
    
    if (approval.approved) {
        const shipment = yield context.df.callActivity("CreateShipment", context.df.getInput());
        outputs.push(shipment);
    }
    
    return outputs;
});
```

```javascript
// Activities/ProcessPayment.js
module.exports = async function (context) {
    const orderData = context.bindings.orderData;
    context.log('Processing payment for order:', orderData.orderId);
    
    // Payment processing logic
    return { 
        orderId: orderData.orderId, 
        paymentId: 'PAY-123',
        status: 'completed' 
    };
};
```

### Human Interaction Pattern

```javascript
// ApprovalOrchestrator/index.js
const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const input = context.df.getInput();
    
    // Request approval
    yield context.df.callActivity("SendApprovalRequest", input);
    
    // Wait for approval (with timeout)
    const approvalEvent = context.df.waitForExternalEvent("ApprovalEvent");
    const timeout = context.df.createTimer(context.df.currentUtcDateTime.getTime() + 24 * 60 * 60 * 1000);
    
    const winner = yield context.df.Task.any([approvalEvent, timeout]);
    
    if (winner === approvalEvent) {
        const approved = approvalEvent.result;
        if (approved) {
            yield context.df.callActivity("ProcessApproval", input);
            return "Approved and processed";
        } else {
            return "Rejected";
        }
    } else {
        return "Timeout - no response";
    }
});
```

## Bindings

### Input Bindings

```javascript
// Multiple input bindings
module.exports = async function (context, req) {
    // Blob input
    const fileContent = context.bindings.inputBlob;
    
    // Cosmos DB input
    const userData = context.bindings.userDocument;
    
    // Table Storage input
    const configData = context.bindings.configTable;
    
    context.res = {
        body: {
            file: fileContent.toString(),
            user: userData,
            config: configData
        }
    };
};
```

```json
{
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req"
    },
    {
      "type": "blob",
      "direction": "in",
      "name": "inputBlob",
      "path": "data/{filename}",
      "connection": "AzureWebJobsStorage"
    },
    {
      "type": "cosmosDB",
      "direction": "in",
      "name": "userDocument",
      "databaseName": "myDatabase",
      "collectionName": "users",
      "id": "{userId}",
      "partitionKey": "{userId}",
      "connectionStringSetting": "CosmosDBConnection"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

## Configuration

### Application Settings

```bash
# Add app settings
az functionapp config appsettings set \
  --name myFunctionApp \
  --resource-group myResourceGroup \
  --settings \
    "CosmosDBConnection=AccountEndpoint=https://xxx.documents.azure.com:443/;AccountKey=xxx" \
    "SendGridApiKey=SG.xxx" \
    "ENVIRONMENT=production"

# List app settings
az functionapp config appsettings list \
  --name myFunctionApp \
  --resource-group myResourceGroup
```

```javascript
// Access settings in code
const cosmosConnection = process.env.CosmosDBConnection;
const sendGridKey = process.env.SendGridApiKey;
const environment = process.env.ENVIRONMENT;
```

### Managed Identity

```bash
# Enable system-assigned managed identity
az functionapp identity assign \
  --name myFunctionApp \
  --resource-group myResourceGroup

# Grant access to Key Vault
PRINCIPAL_ID=$(az functionapp identity show \
  --name myFunctionApp \
  --resource-group myResourceGroup \
  --query principalId -o tsv)

az keyvault set-policy \
  --name myKeyVault \
  --object-id $PRINCIPAL_ID \
  --secret-permissions get list
```

```javascript
// Access Key Vault using managed identity
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const credential = new DefaultAzureCredential();
const vaultUrl = "https://myKeyVault.vault.azure.net";
const client = new SecretClient(vaultUrl, credential);

async function getSecret(secretName) {
    const secret = await client.getSecret(secretName);
    return secret.value;
}
```

## Deployment

### Deploy via Azure CLI

```bash
# Package function app
cd my-functions
npm install
func azure functionapp publish myFunctionApp

# Deploy with specific settings
func azure functionapp publish myFunctionApp \
  --build remote \
  --python
```

### GitHub Actions

```yaml
# .github/workflows/azure-functions.yml
name: Deploy Azure Function

on:
  push:
    branches: [main]

env:
  AZURE_FUNCTIONAPP_NAME: myFunctionApp
  AZURE_FUNCTIONAPP_PACKAGE_PATH: '.'
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
      
      - name: Deploy to Azure Functions
        uses: Azure/functions-action@v1
        with:
          app-name: ${{ env.AZURE_FUNCTIONAPP_NAME }}
          package: ${{ env.AZURE_FUNCTIONAPP_PACKAGE_PATH }}
          publish-profile: ${{ secrets.AZURE_FUNCTIONAPP_PUBLISH_PROFILE }}
```

## Monitoring & Diagnostics

### Application Insights

```bash
# Enable Application Insights
az monitor app-insights component create \
  --app myFunctionAppInsights \
  --location eastus \
  --resource-group myResourceGroup

# Link to Function App
INSTRUMENTATION_KEY=$(az monitor app-insights component show \
  --app myFunctionAppInsights \
  --resource-group myResourceGroup \
  --query instrumentationKey -o tsv)

az functionapp config appsettings set \
  --name myFunctionApp \
  --resource-group myResourceGroup \
  --settings "APPINSIGHTS_INSTRUMENTATIONKEY=$INSTRUMENTATION_KEY"
```

```javascript
// Custom telemetry
const appInsights = require('applicationinsights');
appInsights.setup().start();
const client = appInsights.defaultClient;

module.exports = async function (context, req) {
    // Track custom event
    client.trackEvent({ name: 'FunctionExecuted', properties: { userId: req.query.userId } });
    
    // Track custom metric
    client.trackMetric({ name: 'ProcessingTime', value: 123 });
    
    // Track dependency
    const startTime = Date.now();
    await callExternalAPI();
    client.trackDependency({
        target: 'https://api.example.com',
        name: 'GET /data',
        data: 'GET /data',
        duration: Date.now() - startTime,
        resultCode: 200,
        success: true
    });
};
```

## Best Practices

### Performance

1. **Minimize Cold Starts**: Use Premium plan or keep functions warm
2. **Connection Reuse**: Reuse HTTP connections and database connections
3. **Async Operations**: Use async/await properly
4. **Output Caching**: Cache expensive computations
5. **Right-Size Memory**: Match memory allocation to workload

### Security

1. **Managed Identity**: Use for Azure resource access
2. **Key Vault**: Store secrets securely
3. **Authorization Level**: Use appropriate auth levels
4. **Input Validation**: Validate all inputs
5. **Network Isolation**: Use VNet integration

### Reliability

1. **Idempotency**: Make functions idempotent
2. **Error Handling**: Implement proper error handling
3. **Retry Policies**: Configure appropriate retry policies
4. **Dead Letter Queues**: Handle poison messages
5. **Monitoring**: Set up comprehensive monitoring

## Pricing

### Consumption Plan
- **Execution**: $0.20 per million executions
- **Execution Time**: $0.000016/GB-s
- **Free Grant**: 1M executions + 400,000 GB-s/month

### Premium Plan (EP1)
- **~$168/month**: Always-ready instances, VNet connectivity
- No execution charges

### Dedicated Plan
- Based on App Service plan pricing
- Same as App Service pricing

## Troubleshooting

```bash
# View logs
func azure functionapp logstream myFunctionApp

# Check function status
az functionapp show \
  --name myFunctionApp \
  --resource-group myResourceGroup

# List functions
az functionapp function list \
  --name myFunctionApp \
  --resource-group myResourceGroup

# Get function keys
az functionapp function keys list \
  --name HttpTrigger \
  --function-app myFunctionApp \
  --resource-group myResourceGroup
```

## Resources

### Official Documentation
- [Azure Functions Documentation](https://docs.microsoft.com/azure/azure-functions/)
- [Functions Developer Guide](https://docs.microsoft.com/azure/azure-functions/functions-reference)
- [Durable Functions](https://docs.microsoft.com/azure/azure-functions/durable/)
- [Best Practices](https://docs.microsoft.com/azure/azure-functions/functions-best-practices)

### Tools
- [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Azure Portal](https://portal.azure.com/)

### Community
- [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-functions.html)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/azure-functions)
- [GitHub](https://github.com/Azure/Azure-Functions)

### Learning Resources
- [Azure Functions Learning Path](https://docs.microsoft.com/learn/paths/create-serverless-applications/)
- [Serverless September](https://azure.microsoft.com/resources/serverless-september/)
- [Code Samples](https://github.com/Azure-Samples/azure-functions-samples)

---

**Related Technologies**: [Azure App Service](../AppService/), [Azure Logic Apps](../LogicApps/), [Event Grid](../EventGrid/), [Cosmos DB](../CosmosDB/), [AWS Lambda](../../AWS/Lambda/)
