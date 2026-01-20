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

## References

- Project overview: <https://n8n.io/>
- Docs: <https://docs.n8n.io/>
- Dev.to article : <https://dev.to/srijan-xi/n8ndocker-f5l>

