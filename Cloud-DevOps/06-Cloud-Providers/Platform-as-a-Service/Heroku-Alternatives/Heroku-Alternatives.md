# Heroku Alternatives - Modern Deployment Platforms

## Introduction

### Why Heroku Alternatives?

After Heroku eliminated its free tier in November 2022 and shifted focus to enterprise customers, developers sought modern, cost-effective alternatives for deploying applications. This guide covers the most popular Heroku replacements: Railway, Render, Fly.io, and others, helping you choose the best platform for your needs.

### Comparison Overview

| Platform | Free Tier | Pricing Start | Best For | Edge Computing |
|----------|-----------|---------------|----------|----------------|
| Railway | $5 credit/month | Pay-as-you-go | Simplicity, monorepos | No |
| Render | Free tier available | $7/month | Full-stack apps, static sites | No |
| Fly.io | 3 VMs free | $1.94/month | Global edge, Docker | Yes |
| Vercel | Generous free | $20/month | Frontend, Next.js | Yes |
| Netlify | Generous free | $19/month | Static sites, JAMstack | Yes |
| DigitalOcean App Platform | $5/month | $5/month | Simplicity, containers | No |

## Railway

### What is Railway?

Railway is a modern deployment platform with infrastructure-as-code simplicity, supporting any language, framework, or database with automatic HTTPS and simple configuration.

### Getting Started

```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to existing project
railway link

# Deploy
railway up
```

### Deploying Node.js Application

```bash
# Create project
mkdir myapp && cd myapp
npm init -y
npm install express

# app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Railway!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

# Deploy
railway init
railway up
```

### Database Setup

```bash
# Add PostgreSQL
railway add postgres

# Add Redis
railway add redis

# Add MongoDB
railway add mongodb

# Environment variables automatically set:
# DATABASE_URL, REDIS_URL, MONGO_URL
```

### Configuration

```toml
# railway.toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
healthcheckPath = "/"
restartPolicyType = "on-failure"

[[services]]
name = "web"

[[services]]
name = "worker"
startCommand = "npm run worker"
```

### Pricing

```
Free Tier: $5 credit/month
- Covers small apps
- No credit card required

Pro Plan: $20/month
- $20 included usage
- Pay only for what you use
```

## Render

### What is Render?

Render is a unified cloud platform for building and running apps and websites with free SSL, global CDN, and automatic deploys from Git.

### Service Types

- **Web Services**: Deploy web apps
- **Static Sites**: Host static sites
- **Cron Jobs**: Scheduled tasks
- **Background Workers**: Queue processors
- **Private Services**: Internal microservices
- **Databases**: PostgreSQL, Redis

### Deploying Web Service

```yaml
# render.yaml
services:
  - type: web
    name: myapp
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

### Via Dashboard

```
1. New → Web Service
2. Connect GitHub/GitLab repository
3. Configure:
   - Name: myapp
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
4. Select free plan
5. Create Web Service
```

### Database

```
1. New → PostgreSQL
2. Name: mydb
3. Select plan (Free: 90 days, then $7/month)
4. Create Database

# Use connection string in app
DATABASE_URL=postgresql://user:pass@host/db
```

### Static Site

```yaml
# render.yaml
services:
  - type: web
    name: my-static-site
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### Background Workers

```yaml
services:
  - type: worker
    name: queue-worker
    env: node
    buildCommand: npm install
    startCommand: npm run worker
```

### Pricing

```
Free Tier:
- Web services: Free (with limitations)
- Static sites: Free
- 100 GB bandwidth/month

Starter: $7/month per service
- 512 MB RAM
- Shared CPU

Standard: $25/month per service
- 2 GB RAM
- 1 CPU
```

## Fly.io

### What is Fly.io?

Fly.io runs Docker containers globally on edge servers close to users, with automatic scaling and built-in global Anycast load balancing.

### Installation

```bash
# Install flyctl
# macOS/Linux
curl -L https://fly.io/install.sh | sh

# Windows
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"

# Login
flyctl auth login
```

### Deploy Application

```bash
# Initialize Fly app
flyctl launch

# Review fly.toml
# fly.toml
app = "myapp"
primary_region = "iad"

[build]

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256

# Deploy
flyctl deploy

# Open app
flyctl open
```

### Dockerfile Example

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

### Multi-Region Deployment

```bash
# Add regions
flyctl regions add lax sea fra

# List regions
flyctl regions list

# Scale to multiple machines
flyctl scale count 3
```

### PostgreSQL on Fly

```bash
# Create Postgres cluster
flyctl postgres create --name mydb

# Attach to app
flyctl postgres attach mydb

# Connect
flyctl postgres connect -a mydb
```

### Secrets Management

```bash
# Set secrets
flyctl secrets set DATABASE_URL=postgres://...
flyctl secrets set API_KEY=secret123

# List secrets
flyctl secrets list
```

### Pricing

```
Free Tier:
- 3 shared-cpu-1x VMs (256MB RAM)
- 3GB persistent volume storage
- 160GB outbound data transfer

Pay-as-you-go:
- Shared CPU: $0.0000022/second (~$5.70/month)
- Dedicated CPU: $0.0000079/second (~$20.50/month)
```

## Vercel

### What is Vercel?

Vercel specializes in frontend deployments with excellent Next.js integration, edge functions, and global CDN.

### Deploy from CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Configuration

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "DATABASE_URL": "@database-url"
  }
}
```

### Edge Functions

```javascript
// api/hello.js
export default function handler(request) {
  return new Response(
    JSON.stringify({ message: 'Hello from the edge!' }),
    {
      headers: { 'content-type': 'application/json' },
    }
  );
}

export const config = {
  runtime: 'edge',
};
```

### Pricing

```
Hobby: Free
- Unlimited deployments
- 100 GB bandwidth
- Serverless functions

Pro: $20/month
- 1 TB bandwidth
- Advanced analytics
- Team collaboration
```

## Netlify

### What is Netlify?

Netlify is a platform for modern web projects with continuous deployment, serverless functions, and form handling.

### Deploy from Git

```
1. Connect GitHub repository
2. Configure build settings:
   - Build command: npm run build
   - Publish directory: dist
3. Deploy site
```

### Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

### Serverless Functions

```javascript
// netlify/functions/hello.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify!' }),
  };
};
```

### Forms

```html
<!-- HTML form with Netlify handling -->
<form name="contact" method="POST" data-netlify="true">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

### Pricing

```
Starter: Free
- 100 GB bandwidth
- 300 build minutes
- Forms: 100 submissions

Pro: $19/month
- 1 TB bandwidth
- 25K forms submissions
```

## DigitalOcean App Platform

### What is App Platform?

Simplified platform from DigitalOcean for deploying apps directly from source code or containers.

### Deploy from GitHub

```yaml
# .do/app.yaml
name: myapp
services:
- name: web
  github:
    repo: username/repo
    branch: main
    deploy_on_push: true
  run_command: npm start
  environment_slug: node-js
  instance_size_slug: basic-xxs
  instance_count: 1
  http_port: 3000
  envs:
  - key: NODE_ENV
    value: production

databases:
- name: db
  engine: PG
  production: false
```

### Pricing

```
Basic: $5/month
- 512 MB RAM
- 1 vCPU

Professional: $12/month
- 1 GB RAM
- 1 vCPU
```

## Migration Guide

### From Heroku to Railway

```bash
# 1. Export Heroku config
heroku config -s > .env

# 2. Initialize Railway
railway init

# 3. Import environment variables
cat .env | railway vars set

# 4. Add database (if needed)
railway add postgres

# 5. Deploy
railway up
```

### From Heroku to Render

```bash
# 1. Create render.yaml
cat > render.yaml << EOF
services:
  - type: web
    name: myapp
    env: node
    buildCommand: npm install
    startCommand: npm start
EOF

# 2. Connect repository in Render dashboard
# 3. Add environment variables
# 4. Deploy
```

### From Heroku to Fly.io

```bash
# 1. Install flyctl
curl -L https://fly.io/install.sh | sh

# 2. Launch app
flyctl launch

# 3. Import Heroku config
heroku config -s | flyctl secrets import

# 4. Deploy
flyctl deploy
```

## Best Practices

### Choose the Right Platform

- **Railway**: Simple apps, quick deployments
- **Render**: Full-stack apps with databases
- **Fly.io**: Global edge, low latency
- **Vercel**: Frontend, Next.js apps
- **Netlify**: Static sites, JAMstack

### Cost Optimization

- Start with free tiers
- Monitor resource usage
- Scale appropriately
- Use serverless where possible
- Implement caching
- Optimize build times

### Security

- Use environment variables for secrets
- Enable HTTPS (automatic on most platforms)
- Implement rate limiting
- Regular dependency updates
- Monitor logs and alerts

## Resources

- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Fly.io Docs](https://fly.io/docs/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [DigitalOcean App Platform](https://docs.digitalocean.com/products/app-platform/)

## Next Steps

- Try different platforms with free tiers
- Migrate a simple app
- Set up CI/CD pipelines
- Configure custom domains
- Implement monitoring
- Explore platform-specific features
- Join community forums
