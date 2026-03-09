# Azure Monitor

## Introduction

### What is Azure Monitor?

Azure Monitor is a comprehensive monitoring solution for collecting, analyzing, and acting on telemetry data from Azure and on-premises environments. It provides full-stack observability including application performance monitoring (APM), infrastructure monitoring, log analytics, and intelligent alerting.

### Why Azure Monitor?

- End-to-end application monitoring
- Application Insights for APM
- Log Analytics for centralized logging
- Metrics and alerts
- Workbooks for visualization
- Integration with Azure services
- Distributed tracing
- Live metrics streaming
- Automated actions
- Cost monitoring

## Prerequisites

- Azure subscription
- Azure CLI or PowerShell
- Applications running on Azure
- Appropriate RBAC permissions
- Understanding of Azure resources

## Core Components

### Application Insights

Application performance monitoring and user analytics.

### Log Analytics

Centralized log collection and querying with KQL.

### Metrics

Time-series data from Azure resources.

### Alerts

Automated notifications and actions.

### Workbooks

Interactive reports and dashboards.

### Action Groups

Define notification and automation actions.

## Getting Started

### Azure CLI Setup

```bash
# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login
az login

# Install monitor extension
az extension add --name application-insights
az extension add --name log-analytics
```

## Application Insights

### Creating Application Insights

```bash
# Create resource
az monitor app-insights component create \
  --app myapp \
  --location eastus \
  --resource-group myresourcegroup \
  --application-type web

# Get instrumentation key
az monitor app-insights component show \
  --app myapp \
  --resource-group myresourcegroup \
  --query instrumentationKey
```

### Instrumentation

#### ASP.NET Core

```bash
dotnet add package Microsoft.ApplicationInsights.AspNetCore
```

```csharp
// Program.cs
using Microsoft.ApplicationInsights.AspNetCore.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add Application Insights
builder.Services.AddApplicationInsightsTelemetry(new ApplicationInsightsServiceOptions
{
    ConnectionString = "InstrumentationKey=your-key-here;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/"
});

builder.Services.AddControllers();
var app = builder.Build();

app.UseAuthorization();
app.MapControllers();
app.Run();
```

```json
// appsettings.json
{
  "ApplicationInsights": {
    "ConnectionString": "InstrumentationKey=your-key;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/"
  }
}
```

#### Node.js

```bash
npm install applicationinsights
```

```javascript
const appInsights = require('applicationinsights');

appInsights.setup('InstrumentationKey=your-key-here')
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
  .start();

const client = appInsights.defaultClient;

// Custom event
client.trackEvent({ name: 'UserLoggedIn', properties: { userId: '123' } });

// Custom metric
client.trackMetric({ name: 'QueueLength', value: 42 });

// Track dependency
client.trackDependency({
  target: 'https://api.example.com',
  name: 'GET /users',
  data: 'https://api.example.com/users',
  duration: 123,
  resultCode: 200,
  success: true,
  dependencyTypeName: 'HTTP'
});
```

#### Python

```bash
pip install opencensus-ext-azure
```

```python
from opencensus.ext.azure.log_exporter import AzureLogHandler
from opencensus.ext.azure import metrics_exporter
from opencensus.stats import aggregation as aggregation_module
from opencensus.stats import measure as measure_module
from opencensus.stats import stats as stats_module
from opencensus.stats import view as view_module
from opencensus.tags import tag_map as tag_map_module
import logging

# Configure logger
logger = logging.getLogger(__name__)
logger.addHandler(AzureLogHandler(connection_string='InstrumentationKey=your-key'))
logger.setLevel(logging.INFO)

# Log events
logger.info('User logged in', extra={'custom_dimensions': {'user_id': '123'}})

# Custom metrics
stats = stats_module.stats
view_manager = stats.view_manager
exporter = metrics_exporter.new_metrics_exporter(
    connection_string='InstrumentationKey=your-key'
)
view_manager.register_exporter(exporter)

# Define measure
request_measure = measure_module.MeasureInt(
    "requests",
    "number of requests",
    "requests"
)

# Track metric
mmap = stats.stats_recorder.new_measurement_map()
tmap = tag_map_module.TagMap()
mmap.measure_int_put(request_measure, 1)
mmap.record(tmap)
```

### Custom Telemetry

```csharp
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;

public class MyService
{
    private readonly TelemetryClient _telemetry;
    
    public MyService(TelemetryClient telemetry)
    {
        _telemetry = telemetry;
    }
    
    public void ProcessOrder(string orderId)
    {
        // Track custom event
        _telemetry.TrackEvent("OrderProcessed", 
            new Dictionary<string, string> { { "OrderId", orderId } },
            new Dictionary<string, double> { { "Amount", 99.99 } });
        
        // Track custom metric
        _telemetry.TrackMetric("OrderProcessingTime", 123.45);
        
        // Track dependency
        var dependency = new DependencyTelemetry
        {
            Name = "GetUserData",
            Target = "UserService",
            Data = "SELECT * FROM Users",
            Duration = TimeSpan.FromMilliseconds(234),
            Success = true
        };
        _telemetry.TrackDependency(dependency);
        
        // Track exception
        try
        {
            // Code that might fail
        }
        catch (Exception ex)
        {
            _telemetry.TrackException(ex);
            throw;
        }
    }
}
```

## Log Analytics

### Creating Workspace

```bash
# Create Log Analytics workspace
az monitor log-analytics workspace create \
  --resource-group myresourcegroup \
  --workspace-name myworkspace \
  --location eastus

# Get workspace ID
az monitor log-analytics workspace show \
  --resource-group myresourcegroup \
  --workspace-name myworkspace \
  --query customerId -o tsv
```

### KQL Queries

```kusto
// Find errors in last 24 hours
traces
| where timestamp > ago(24h)
| where severityLevel >= 3
| project timestamp, message, severityLevel
| order by timestamp desc
| take 100

// Request performance
requests
| where timestamp > ago(1h)
| summarize 
    Count=count(),
    AvgDuration=avg(duration),
    P95=percentile(duration, 95),
    P99=percentile(duration, 99)
    by name
| order by P99 desc

// Failed requests by URL
requests
| where success == false
| summarize Count=count() by url, resultCode
| order by Count desc

// Dependency failures
dependencies
| where success == false
| summarize FailureCount=count() by name, type
| order by FailureCount desc

// Exception analysis
exceptions
| where timestamp > ago(24h)
| summarize Count=count() by type, outerMessage
| order by Count desc

// User sessions
pageViews
| where timestamp > ago(7d)
| summarize SessionCount=dcount(session_Id) by bin(timestamp, 1d)
| render timechart

// Custom dimensions
customEvents
| where name == "OrderPlaced"
| extend OrderId = tostring(customDimensions.orderId)
| extend Amount = todouble(customMeasurements.amount)
| summarize TotalRevenue=sum(Amount), OrderCount=count() by bin(timestamp, 1h)
| render timechart
```

### Query via API

```python
from azure.monitor.query import LogsQueryClient
from azure.identity import DefaultAzureCredential
from datetime import timedelta

credential = DefaultAzureCredential()
client = LogsQueryClient(credential)

# Query logs
response = client.query_workspace(
    workspace_id="your-workspace-id",
    query="""
        requests
        | where timestamp > ago(1h)
        | summarize count() by bin(timestamp, 5m)
    """,
    timespan=timedelta(hours=1)
)

for table in response.tables:
    for row in table.rows:
        print(row)
```

## Metrics

### Viewing Metrics

```bash
# Get VM CPU metrics
az monitor metrics list \
  --resource /subscriptions/{sub-id}/resourceGroups/{rg}/providers/Microsoft.Compute/virtualMachines/{vm-name} \
  --metric "Percentage CPU" \
  --start-time 2026-01-18T00:00:00Z \
  --end-time 2026-01-18T23:59:59Z \
  --interval PT1M

# Get App Service metrics
az monitor metrics list \
  --resource /subscriptions/{sub-id}/resourceGroups/{rg}/providers/Microsoft.Web/sites/{app-name} \
  --metric "Http5xx" "ResponseTime" \
  --aggregation Average Count
```

### Custom Metrics

```csharp
using Azure.Monitor.OpenTelemetry.Exporter;
using OpenTelemetry;
using OpenTelemetry.Metrics;

// Setup OpenTelemetry with Azure Monitor
using var meterProvider = Sdk.CreateMeterProviderBuilder()
    .AddMeter("MyCompany.MyApp")
    .AddAzureMonitorMetricExporter(options =>
    {
        options.ConnectionString = "InstrumentationKey=your-key";
    })
    .Build();

// Create meter and counter
var meter = new Meter("MyCompany.MyApp", "1.0");
var orderCounter = meter.CreateCounter<long>("orders.processed");

// Record metric
orderCounter.Add(1, new KeyValuePair<string, object>("region", "us-east"));
```

## Alerts

### Metric Alerts

```bash
# Create metric alert
az monitor metrics alert create \
  --name high-cpu-alert \
  --resource-group myresourcegroup \
  --scopes /subscriptions/{sub-id}/resourceGroups/{rg}/providers/Microsoft.Compute/virtualMachines/{vm-name} \
  --condition "avg Percentage CPU > 80" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --action /subscriptions/{sub-id}/resourceGroups/{rg}/providers/microsoft.insights/actiongroups/{action-group}
```

### Log Alerts

```bash
# Create log query alert
az monitor scheduled-query create \
  --name failed-requests-alert \
  --resource-group myresourcegroup \
  --scopes /subscriptions/{sub-id}/resourceGroups/{rg}/providers/microsoft.insights/components/{app-name} \
  --condition "count 'Heartbeat | summarize AggregatedValue = count() by Computer' > 2" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --action /subscriptions/{sub-id}/resourceGroups/{rg}/providers/microsoft.insights/actiongroups/{action-group}
```

### Action Groups

```bash
# Create action group
az monitor action-group create \
  --name critical-alerts \
  --resource-group myresourcegroup \
  --short-name critical \
  --email-receiver \
    name=admin \
    email-address=admin@example.com \
  --webhook-receiver \
    name=slack \
    service-uri=https://hooks.slack.com/services/xxx/yyy/zzz
```

## Workbooks

### Creating Workbook

```json
{
  "version": "Notebook/1.0",
  "items": [
    {
      "type": 1,
      "content": {
        "json": "# Application Performance Dashboard"
      }
    },
    {
      "type": 3,
      "content": {
        "version": "KqlItem/1.0",
        "query": "requests\n| where timestamp > ago(24h)\n| summarize Count=count(), AvgDuration=avg(duration) by bin(timestamp, 1h)\n| render timechart",
        "size": 0,
        "title": "Request Rate and Duration",
        "queryType": 0,
        "resourceType": "microsoft.insights/components"
      }
    },
    {
      "type": 3,
      "content": {
        "version": "KqlItem/1.0",
        "query": "exceptions\n| where timestamp > ago(24h)\n| summarize Count=count() by type\n| render piechart",
        "size": 0,
        "title": "Exception Distribution",
        "queryType": 0,
        "resourceType": "microsoft.insights/components"
      }
    }
  ]
}
```

## Distributed Tracing

### Correlation

Application Insights automatically correlates telemetry across services using W3C Trace Context.

```csharp
// Request telemetry is automatically correlated
// with dependencies, exceptions, and custom events

// Access correlation context
using Microsoft.ApplicationInsights;

public class MyService
{
    private readonly TelemetryClient _telemetry;
    
    public MyService(TelemetryClient telemetry)
    {
        _telemetry = telemetry;
    }
    
    public async Task ProcessRequest(HttpContext context)
    {
        var operation = _telemetry.StartOperation<RequestTelemetry>("ProcessOrder");
        try
        {
            // All telemetry here is automatically correlated
            await CallExternalService();
            _telemetry.TrackEvent("OrderProcessed");
        }
        finally
        {
            _telemetry.StopOperation(operation);
        }
    }
}
```

## Live Metrics

```javascript
// Node.js - Enable live metrics
appInsights.setup('InstrumentationKey=your-key')
  .setSendLiveMetrics(true)
  .start();

// View live metrics in Azure Portal:
// Application Insights → Live Metrics
```

## Availability Tests

```bash
# Create availability test
az monitor app-insights web-test create \
  --resource-group myresourcegroup \
  --name ping-test \
  --location eastus \
  --app-insights-name myapp \
  --kind ping \
  --test-locations "us-ca-sjc-azr" "us-il-ch1-azr" \
  --test-frequency 300 \
  --test-timeout 30 \
  --enabled true \
  --web-test-properties '{"SyntheticMonitorId":"ping-test","Name":"Ping Test","Enabled":true,"Frequency":300,"Timeout":30,"Kind":"ping","Locations":[{"Id":"us-ca-sjc-azr"},{"Id":"us-il-ch1-azr"}],"Configuration":{"WebTest":"<WebTest><Items><Request Url=\"https://example.com\" /></Items></WebTest>"}}'
```

## Best Practices

### Sampling

```csharp
// Adaptive sampling (recommended)
using Microsoft.ApplicationInsights.AspNetCore.Extensions;

builder.Services.AddApplicationInsightsTelemetry(new ApplicationInsightsServiceOptions
{
    EnableAdaptiveSampling = true
});

// Fixed-rate sampling
using Microsoft.ApplicationInsights.Extensibility;

builder.Services.Configure<TelemetryConfiguration>(config =>
{
    var builder = config.DefaultTelemetrySink.TelemetryProcessorChainBuilder;
    builder.UseSampling(10); // 10% sampling
    builder.Build();
});
```

### Performance

- Use async methods
- Implement telemetry processors for filtering
- Configure appropriate sampling rates
- Batch telemetry when possible
- Use local buffering

### Cost Optimization

```bash
# Set data retention
az monitor app-insights component update \
  --app myapp \
  --resource-group myresourcegroup \
  --retention-time 30

# Configure daily cap
az monitor app-insights component update \
  --app myapp \
  --resource-group myresourcegroup \
  --cap 1  # 1 GB/day
```

## Terraform Integration

```hcl
# Application Insights
resource "azurerm_application_insights" "app" {
  name                = "myapp-insights"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "web"
  retention_in_days   = 30
  daily_data_cap_in_gb = 1
}

# Log Analytics Workspace
resource "azurerm_log_analytics_workspace" "workspace" {
  name                = "myworkspace"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

# Metric Alert
resource "azurerm_monitor_metric_alert" "cpu_alert" {
  name                = "high-cpu-alert"
  resource_group_name = azurerm_resource_group.rg.name
  scopes              = [azurerm_virtual_machine.vm.id]
  description         = "Alert when CPU exceeds 80%"
  
  criteria {
    metric_namespace = "Microsoft.Compute/virtualMachines"
    metric_name      = "Percentage CPU"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 80
  }
  
  action {
    action_group_id = azurerm_monitor_action_group.main.id
  }
}

# Action Group
resource "azurerm_monitor_action_group" "main" {
  name                = "critical-alerts"
  resource_group_name = azurerm_resource_group.rg.name
  short_name          = "critical"
  
  email_receiver {
    name          = "admin"
    email_address = "admin@example.com"
  }
  
  webhook_receiver {
    name        = "slack"
    service_uri = "https://hooks.slack.com/services/xxx"
  }
}
```

## Troubleshooting

### Missing Telemetry

```bash
# Verify connection string
# Check network connectivity
# Review sampling configuration
# Check instrumentation key

# Test connection
curl -X POST https://dc.services.visualstudio.com/v2/track \
  -H "Content-Type: application/json" \
  -d '{"name":"Microsoft.ApplicationInsights.Event","time":"2026-01-18T12:00:00.0000000Z","iKey":"your-key","data":{"baseType":"EventData","baseData":{"name":"TestEvent"}}}'
```

### Query Issues

```kusto
// Verify data exists
search *
| where timestamp > ago(1h)
| take 10

// Check data types
requests
| getschema
```

## Resources

- [Azure Monitor Documentation](https://docs.microsoft.com/azure/azure-monitor/)
- [Application Insights Documentation](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview)
- [KQL Reference](https://docs.microsoft.com/azure/data-explorer/kusto/query/)
- [Azure Monitor REST API](https://docs.microsoft.com/rest/api/monitor/)
- [Pricing Calculator](https://azure.microsoft.com/pricing/details/monitor/)

## Next Steps

- Enable Application Insights for all apps
- Create comprehensive dashboards
- Set up alerts for critical metrics
- Implement distributed tracing
- Configure availability tests
- Optimize costs with sampling
- Integrate with incident management
- Create custom workbooks
