# n8n — User Guide

## Installation options

### Option 1: Docker (recommended for self-hosting)

Create a folder and run n8n with persistent storage:

```bash
docker volume create n8n_data

docker run -it --rm \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```

Open: `http://localhost:5678`

#### Production notes
- Prefer a reverse proxy (TLS) for public access
- Store credentials securely and restrict access
- Back up the `n8n_data` volume

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

## Expressions and variables
- n8n supports expressions to reference prior node outputs.
- Start small: rename fields with **Set**, then reference them in later nodes.

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
- Project overview: https://n8n.io/
- Docs: https://docs.n8n.io/
- Dev.to article : https://dev.to/srijan-xi/n8ndocker-f5l
