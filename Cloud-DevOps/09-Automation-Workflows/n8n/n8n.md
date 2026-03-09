# n8n

## Introduction

n8n (Nodemation) is a strict "fair-code" workflow automation tool that allows you to interconnect every app with an API in the world with each other to share and manipulate data without a single line of code. It is an easily extendable, developer-friendly platform that can be self-hosted or used via the cloud.

Unlike other automation tools, n8n is node-based, meaning you visualize flows as a graph of nodes affecting data as it passes through.

## When to use n8n

n8n is ideal for:
-   **Complex Logic**: When simple "if this then that" isn't enough, and you need loops, complex branching, or custom JavaScript execution.
-   **Data Syncing**: Moving data between CRMs, Databases, and Marketing tools.
-   **Cost Efficiency**: Self-hosting allows for unlimited workflows and executions without per-task pricing (unlike Zapier).
-   **Privacy**: Keeping sensitive data on your own infrastructure.

## Architecture & Data Structure

n8n is built on Node.js and uses a unique data structure for passing information between nodes.

### The Data Flow (JSON)
Data in n8n is passed as an array of objects. Each item in the array represents a single distinct item (e.g., a row in a database, a received email).
Each node receives an array of items, processes them, and outputs a new array of items.

**Structure:**
```json
[
  {
    "json": {
      "field1": "value1",
      "field2": "value2"
    },
    "binary": {
      "image": {
        "data": "...",
        "mimeType": "image/png"
      }
    }
  }
]
```
*   **json**: Contains the actual data payload.
*   **binary**: Contains binary files (images, PDFs) if applicable.

## Key concepts

- **Workflow**: A canvas where nodes are connected to define a process.
- **Node**: The building block.
    -   **Trigger Nodes**: Start the workflow (e.g., On Webhook call, Every minute, On new Email).
    -   **Regular Nodes**: Perform actions (e.g., HTTP Request, Read Webpage, Database Create).
-   **Connections (Lines)**: Determine the path the data takes.
-   **Credentials**: Securely stored authentication details (API Keys, OAuth tokens) separate from the workflow logic.
-   **Expressions**: Use JavaScript-like syntax `{{ $json.field }}` to reference data from previous nodes dynamically.

### Advanced Features

#### 1. Code Node (JavaScript)
When built-in nodes aren't enough, the **Code Node** lets you write raw JavaScript (TypeScript support available). You can manipulate the input items array directly.
```javascript
// Example: Add a timestamp to every item
for (const item of items) {
  item.json.timestamp = new Date().toISOString();
}
return items;
```

#### 2. Sub-workflows
You can create modular workflows by having one workflow call another using the **Execute Workflow** node. This is great for reusable logic (e.g., "Send Error Notification" workflow).

#### 3. Error Workflows
You can define a specific workflow to run whenever *another* workflow crashes. This is critical for production reliability.

## Where to go next

- See the user guide: `Cloud-DevOps/n8n/user-guide.md`
- Try an example: `Cloud-DevOps/n8n/examples/`

---

## User Guide

## Installation options

### Option 1: Docker (recommended for self-hosting)

Create a folder and run n8n with persistent storage:

```bash
docker volume create n8n_data

docker run -it --rm \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```bash

Open: `http://localhost:5678`

#### Production notes

- Prefer a reverse proxy (Nginx/Traefik) with SSL (Let's Encrypt) for public access.
- Store sensitive credentials using environment variables where possible.
- **Scaling (Queue Mode)**: For high-load environments, n8n supports a worker mode using Redis. You run one main process to handle webhooks/UI and multiple worker processes to execute workflows.
- Back up the `n8n_data` volume regularly.

### Option 2: n8n.cloud

- Hosted option for quick start (no infrastructure)
- Good for learning and lightweight production usage

### Option 3: Desktop app

- Convenient for local learning (varies by platform)

---

## Your first workflow (Webhook → HTTP Request)

1. Create a **Webhook** trigger node
2. Add an **HTTP Request** node (call an API)
3. Connect Webhook → HTTP Request
4. Click **Test workflow**

### Tips

- Use **Set** node to shape data
- Use **IF** node to branch logic
- Use **Merge** node to combine inputs

---

## Expressions and Variables

n8n uses a simplified syntax for expressions, accessible via the UI or directly in text fields.
-   **JSON Data**: `{{ $json.myField }}`
-   **Previous Node Data**: `{{ $('Node Name').item.json.myField }}`
-   **Environment Variables**: `{{ $env.MY_VAR }}`
-   **Date/Time**: `{{ $now }}` (Luxon datetime object)

You can perform logic inside expressions: `{{ $json.count > 10 ? 'High' : 'Low' }}`.

### n8n vs. Zapier vs. Make

| Feature | n8n | Zapier | Make (Integromat) |
| :--- | :--- | :--- | :--- |
| **Hosting** | Self-hosted or Cloud | Cloud only | Cloud only |
| **Pricing** | Free (Self-hosted) / Monthly | Per Task | Per Operation |
| **Complexity** | High (Developer focused) | Low (User focused) | Medium |
| **Code** | First-class Citizen (JS) | Limited (Python/JS steps) | Limited expressions |
| **Real-time** | Yes (Webhooks) | Yes | Yes |

---

## Error handling

- Prefer explicit checks (IF node) before calling external APIs
- Add retries/backoff where supported
- Use a dedicated error route/workflow for alerts

---

## Security basics

- Never hardcode secrets in nodes; use **Credentials**
- If exposing Webhooks publicly, protect them (token, allowlist, auth)
- Run behind HTTPS when accessible over the internet

---

## Real-World Use Cases

### 1. Customer Onboarding Automation
**Scenario**: Automatically welcome new customers and set up their account
```
Webhook (New customer signup) 
  → Google Sheets (Add to tracking sheet)
  → SendGrid (Send welcome email)
  → Slack (Notify sales team)
  → CRM (Create contact record)
```

### 2. Social Media Management
**Scenario**: Cross-post content across multiple platforms
```
RSS Trigger (New blog post)
  → OpenAI (Generate social copy variations)
  → Twitter (Post tweet)
  → LinkedIn (Post update)
  → Facebook (Post to page)
  → Airtable (Track post performance)
```

### 3. Data Backup & Sync
**Scenario**: Periodic backup of critical business data
```
Schedule Trigger (Daily at 2 AM)
  → Postgres (Fetch new records)
  → Transform Data (Format for storage)
  → AWS S3 (Upload backup)
  → Discord (Send completion notification)
```

### 4. Lead Scoring System
**Scenario**: Score leads based on activity and enrich data
```
Webhook (New lead from website)
  → Clearbit (Enrich company data)
  → Code Node (Calculate lead score)
  → IF Node (Score > 70?)
    → Yes: Salesforce (Create hot lead)
    → No: Mailchimp (Add to nurture campaign)
```

### 5. E-commerce Order Processing
**Scenario**: Handle order fulfillment workflow
```
Shopify Trigger (New order)
  → Inventory Database (Check stock)
  → IF Node (In stock?)
    → Yes: ShipStation (Create shipment)
           → Twilio (Send SMS to customer)
    → No: Email (Notify warehouse)
          → Delay (Wait 24 hours)
          → Retry check
```

---

## Advanced Workflow Patterns

### Pattern 1: Fan-Out/Fan-In
Execute multiple operations in parallel, then merge results:
```
Start Node
  → Split in Batches
    → Branch 1: API Call A
    → Branch 2: API Call B  
    → Branch 3: API Call C
  → Merge Node
  → Process combined results
```

### Pattern 2: Retry with Exponential Backoff
Handle flaky API calls gracefully:
```javascript
// Code Node example
let retries = 0;
const maxRetries = 3;

while (retries < maxRetries) {
  try {
    const response = await $http.request({
      method: 'GET',
      url: 'https://api.example.com/data'
    });
    return [{ json: response }];
  } catch (error) {
    retries++;
    if (retries === maxRetries) throw error;
    await new Promise(r => setTimeout(r, 1000 * Math.pow(2, retries)));
  }
}
```

### Pattern 3: Rate Limiting
Control API request rate to avoid hitting limits:
```
Loop Over Items
  → HTTP Request (API Call)
  → Wait (500ms between calls)
```

### Pattern 4: Conditional Routing
Route data based on complex conditions:
```
Start
  → Switch Node
    → Case 1: priority === 'high' → Immediate processing
    → Case 2: priority === 'medium' → Queue for later
    → Case 3: priority === 'low' → Batch processing
    → Default: Error handling
```

---

## Production Best Practices

### Workflow Organization
- **Naming Convention**: Use clear, descriptive names (e.g., "CRM-Contact-Sync-Hourly")
- **Documentation**: Add sticky notes explaining complex logic
- **Version Control**: Export workflows as JSON and store in Git
- **Tags**: Use workflow tags for categorization

### Performance Optimization
1. **Batch Processing**: Process items in batches instead of one-by-one
2. **Caching**: Store frequently accessed data in workflow static data
3. **Lazy Loading**: Only fetch data when needed
4. **Parallel Execution**: Use SplitInBatches for concurrent operations

### Monitoring & Alerting
```
Error Workflow:
  → Parse Error Details
  → IF (Critical Error?)
    → PagerDuty (Page on-call engineer)
    → Slack (Post in #critical-alerts)
  → ELSE
    → Email (Send to dev team)
    → Database (Log error for analysis)
```

### Security Hardening
- **Environment Variables**: Store all secrets in ENV vars, not credentials
- **Webhook Security**: Implement HMAC signature validation
- **IP Allowlisting**: Restrict access to n8n instance
- **OAuth over API Keys**: Prefer OAuth when available
- **Audit Logging**: Enable execution logging for compliance

### Backup Strategy
```bash
# Automated backup script
#!/bin/bash
docker exec n8n n8n export:workflow --all --output=/backup/workflows-$(date +%Y%m%d).json
docker exec n8n n8n export:credentials --all --output=/backup/credentials-$(date +%Y%m%d).json
```

---

## Integration Showcase

### Database Integrations
- **PostgreSQL/MySQL**: Direct SQL queries and stored procedures
- **MongoDB**: Document operations with aggregations
- **Redis**: Caching and pub/sub operations
- **Airtable**: No-code database with API access

### Communication Platforms
- **Slack**: Messages, reactions, file uploads
- **Discord**: Webhooks, bot commands
- **Microsoft Teams**: Adaptive cards, notifications
- **Telegram**: Bot interactions, inline keyboards

### Marketing & CRM
- **HubSpot**: Contact management, deal tracking
- **Salesforce**: Full CRM operations
- **Mailchimp**: List management, campaign automation
- **SendGrid**: Transactional emails with templates

### AI & ML Services
- **OpenAI**: GPT-4 text generation, embeddings
- **Google Vertex AI**: Custom model predictions
- **Hugging Face**: NLP tasks, image generation
- **Anthropic Claude**: Advanced reasoning tasks

---

## Custom Node Development

Build your own nodes for proprietary APIs:

### Basic Node Structure
```typescript
// MyCustomNode.node.ts
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MyCustomNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'My Custom Node',
    name: 'myCustomNode',
    group: ['transform'],
    version: 1,
    description: 'Custom node for my API',
    defaults: {
      name: 'My Custom Node',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'API Key',
        name: 'apiKey',
        type: 'string',
        default: '',
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData = [];
    
    for (let i = 0; i < items.length; i++) {
      const apiKey = this.getNodeParameter('apiKey', i) as string;
      
      // Your custom logic here
      const response = await yourApiCall(apiKey);
      
      returnData.push({ json: response });
    }
    
    return [returnData];
  }
}
```

---

## Troubleshooting Common Issues

### Issue 1: "Workflow exceeds execution time"
**Solution**: 
- Break into smaller sub-workflows
- Use Queue Mode for long-running tasks
- Implement checkpointing for resumable workflows

### Issue 2: "Memory errors with large datasets"
**Solution**:
- Use pagination to process in chunks
- Enable streaming mode for binary data
- Increase container memory limits

### Issue 3: "Credentials not working"
**Solution**:
- Re-authenticate OAuth connections
- Check credential permissions/scopes
- Verify API endpoint URLs haven't changed

### Issue 4: "Webhook not triggering"
**Solution**:
- Confirm webhook is in "production" mode
- Check webhook URL is publicly accessible
- Review source system webhook logs

---

## n8n vs Competitors Deep Dive

### n8n vs Zapier

**When to choose n8n:**
- Need unlimited executions without per-task billing
- Require custom JavaScript logic
- Want self-hosted/on-premise deployment
- Building complex workflows with loops and branching
- Need full data privacy

**When to choose Zapier:**
- Non-technical users need simple automation
- Prefer zero infrastructure management
- Need pre-built templates for common workflows
- Want largest app ecosystem (5000+ apps)

### n8n vs Airflow

**When to choose n8n:**
- Building business process automation
- Need visual workflow editor
- Want easy integration with SaaS tools
- Prefer lower learning curve

**When to choose Airflow:**
- Data engineering/ETL pipelines
- Need Python-based DAG definitions
- Require complex task dependencies
- Building data infrastructure

### n8n vs Power Automate

**When to choose n8n:**
- Open-source requirement
- Self-hosting capability
- Cross-platform (not just Microsoft ecosystem)
- More affordable at scale

**When to choose Power Automate:**
- Heavy Microsoft 365 integration
- Enterprise already on Microsoft stack
- Need desktop automation (RPA)
- Compliance with Microsoft ecosystem

---

## Advanced Configuration

### Queue Mode Setup (Production Scaling)
```yaml
# docker-compose.yml for Queue Mode
version: '3.8'

services:
  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

  n8n-main:
    image: n8nio/n8n
    environment:
      - EXECUTIONS_MODE=queue
      - QUEUE_BULL_REDIS_HOST=redis
      - QUEUE_HEALTH_CHECK_ACTIVE=true
    ports:
      - "5678:5678"
    depends_on:
      - redis

  n8n-worker-1:
    image: n8nio/n8n
    command: worker
    environment:
      - EXECUTIONS_MODE=queue
      - QUEUE_BULL_REDIS_HOST=redis
    depends_on:
      - redis

  n8n-worker-2:
    image: n8nio/n8n
    command: worker
    environment:
      - EXECUTIONS_MODE=queue
      - QUEUE_BULL_REDIS_HOST=redis
    depends_on:
      - redis
```

### Environment Variables Reference
```bash
# Execution settings
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=securepassword

# Database (PostgreSQL recommended for production)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=password

# Timezone
GENERIC_TIMEZONE=America/New_York

# Webhook URL
WEBHOOK_URL=https://n8n.example.com/

# Execution limits
EXECUTIONS_TIMEOUT=300
EXECUTIONS_TIMEOUT_MAX=600
```

---

## Community & Resources

### Official Resources
- **Documentation**: <https://docs.n8n.io/>
- **Community Forum**: <https://community.n8n.io/>
- **YouTube Channel**: <https://www.youtube.com/c/n8n-io>
- **GitHub**: <https://github.com/n8n-io/n8n>

### Learning Resources
- **n8n Templates**: <https://n8n.io/workflows>
- **Workflow Library**: Browse 1000+ community workflows
- **Discord Community**: Active support and discussions
- **Blog**: <https://n8n.io/blog/>

### Third-Party Tutorials
- Dev.to article: <https://dev.to/srijan-xi/n8ndocker-f5l>
- Medium guides on n8n automation patterns
- YouTube tutorials for specific integrations

---

## Migration Guide

### From Zapier to n8n
1. Export Zapier workflow as JSON (if available)
2. Map Zapier triggers to n8n trigger nodes
3. Convert Zapier actions to n8n nodes
4. Test with sample data
5. Set up error handling
6. Deploy and monitor

### From Integromat/Make to n8n
1. Screenshot existing workflows
2. Rebuild trigger logic
3. Map routers to IF/Switch nodes
4. Convert data structures
5. Test edge cases

---

## Performance Benchmarks

### Execution Speed (avg)
- Simple HTTP request: 50-100ms
- Database query: 100-200ms
- Complex workflow (10+ nodes): 500ms-2s
- AI/LLM operations: 2-30s depending on model

### Scalability
- Single instance: 100-500 workflows/hour
- Queue mode (3 workers): 1000-5000 workflows/hour
- Enterprise setup (10+ workers): 10,000+ workflows/hour

---

## References

- Project overview: <https://n8n.io/>
- Docs: <https://docs.n8n.io/>
- Dev.to article : <https://dev.to/srijan-xi/n8ndocker-f5l>
- GitHub Repository: <https://github.com/n8n-io/n8n>
- Community Forum: <https://community.n8n.io/>
- Workflow Templates: <https://n8n.io/workflows>

