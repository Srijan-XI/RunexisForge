# Render

## Introduction

Render is a unified cloud platform that makes it easy to build and run all your apps and websites. It provides auto-scaling infrastructure, managed databases, cron jobs, and more with zero DevOps. Render combines the simplicity of platforms like Heroku with the flexibility of AWS.

### Key Features

- **Auto Deploy from Git**: Automatic deploys from GitHub and GitLab
- **Managed Databases**: PostgreSQL, Redis with automatic backups
- **Free SSL Certificates**: Automatic HTTPS for all services
- **Auto-Scaling**: Scale based on traffic automatically
- **Zero Downtime Deploys**: Blue-green deployment by default
- **Docker Support**: Deploy any language or framework
- **Background Workers**: Run asynchronous jobs and tasks
- **Cron Jobs**: Scheduled tasks with simple configuration
- **DDoS Protection**: Built-in security features
- **Global CDN**: Fast content delivery worldwide

### Common Use Cases

- **Web Applications**: Full-stack apps with frontend and backend
- **API Services**: RESTful and GraphQL APIs
- **Static Sites**: Jamstack sites and SPAs
- **Background Jobs**: Workers and queue processors
- **Scheduled Tasks**: Cron jobs and periodic scripts
- **Databases**: Managed PostgreSQL and Redis
- **Private Services**: Internal services without public access
- **Monorepos**: Deploy multiple services from one repository

## Getting Started

### Sign Up

1. Visit [render.com](https://render.com)
2. Sign up with GitHub, GitLab, or email
3. Connect your Git provider
4. Create your first service

### Install Render CLI (Optional)

```bash
# Install via npm
npm install -g render-cli

# Or download binary
# Visit: https://render.com/docs/cli

# Login
render login

# Verify installation
render --version
```

## Web Services

### Deploying a Node.js App

```bash
# Create Express app
mkdir my-app && cd my-app
npm init -y
npm install express

# Create server
cat > index.js << 'EOF'
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Render!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
EOF

# Update package.json
cat > package.json << 'EOF'
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/my-app.git
git push -u origin main
```

**In Render Dashboard**:
1. Click "New +" → "Web Service"
2. Connect your repository
3. Configure:
   - **Name**: my-app
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Click "Create Web Service"

### Python/Flask Application

```python
# app.py
from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify(message='Hello from Render!')

@app.route('/health')
def health():
    return jsonify(status='healthy')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
```

```txt
# requirements.txt
Flask==3.0.0
gunicorn==21.2.0
```

**Render Configuration**:
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`

### Docker Deployment

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

```yaml
# render.yaml
services:
  - type: web
    name: my-docker-app
    env: docker
    dockerfilePath: ./Dockerfile
    envVars:
      - key: NODE_ENV
        value: production
```

### Go Application

```go
// main.go
package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
)

func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "3000"
    }

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello from Render!")
    })

    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        fmt.Fprintf(w, `{"status": "healthy"}`)
    })

    log.Printf("Server starting on port %s", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}
```

**Render Configuration**:
- **Build Command**: `go build -o main .`
- **Start Command**: `./main`

## Static Sites

### React Application

```bash
# Create React app
npx create-react-app my-react-app
cd my-react-app

# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push
```

**Render Configuration**:
- **Build Command**: `npm run build`
- **Publish Directory**: `build`

### Next.js Static Export

```bash
# Create Next.js app
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app

# Configure for static export
# next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true
  }
}
```

**Render Configuration**:
- **Build Command**: `npm run build`
- **Publish Directory**: `out`

### Vue.js Application

```bash
# Create Vue app
npm create vue@latest my-vue-app
cd my-vue-app
npm install
```

**Render Configuration**:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

## Databases

### PostgreSQL

**Create Database in Render**:
1. Click "New +" → "PostgreSQL"
2. Configure:
   - **Name**: my-postgres
   - **Database**: mydb
   - **User**: admin
   - **Region**: Choose closest
   - **Plan**: Free or paid tier
3. Click "Create Database"

**Connection Details**:
```bash
# Internal Database URL (from services in same region)
postgresql://user:password@hostname:5432/database

# External Database URL (from anywhere)
postgresql://user:password@hostname:5432/database
```

**Using in Node.js**:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

module.exports = { query, pool };
```

**Migrations with Prisma**:
```bash
# Install Prisma
npm install prisma @prisma/client

# Initialize Prisma
npx prisma init

# Create schema
# prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}

# Run migrations
npx prisma migrate dev --name init

# In Render build command
npm install && npx prisma generate && npx prisma migrate deploy
```

### Redis

**Create Redis in Render**:
1. Click "New +" → "Redis"
2. Configure:
   - **Name**: my-redis
   - **Plan**: Free or paid tier
3. Click "Create Redis"

**Using in Node.js**:
```javascript
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

async function cacheGet(key) {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
}

async function cacheSet(key, value, ttl = 3600) {
  await redis.setex(key, ttl, JSON.stringify(value));
}

module.exports = { redis, cacheGet, cacheSet };
```

## Background Workers

```yaml
# render.yaml
services:
  - type: web
    name: api
    env: node
    buildCommand: npm install
    startCommand: npm start
    
  - type: worker
    name: worker
    env: node
    buildCommand: npm install
    startCommand: npm run worker
```

**Worker Implementation**:
```javascript
// worker.js
const Bull = require('bull');
const redis = require('redis');

const emailQueue = new Bull('email', process.env.REDIS_URL);

// Process jobs
emailQueue.process(async (job) => {
  const { email, subject, body } = job.data;
  console.log(`Sending email to ${email}`);
  
  // Send email logic here
  await sendEmail(email, subject, body);
  
  return { success: true };
});

// Add job from API
async function queueEmail(email, subject, body) {
  await emailQueue.add({
    email,
    subject,
    body
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
}

console.log('Worker started...');
```

## Cron Jobs

```yaml
# render.yaml
services:
  - type: cron
    name: daily-cleanup
    env: node
    schedule: "0 0 * * *"  # Every day at midnight
    buildCommand: npm install
    startCommand: node scripts/cleanup.js
```

**Cron Script**:
```javascript
// scripts/cleanup.js
const { pool } = require('../db');

async function cleanup() {
  console.log('Starting cleanup...');
  
  // Delete old records
  const result = await pool.query(`
    DELETE FROM logs 
    WHERE created_at < NOW() - INTERVAL '30 days'
  `);
  
  console.log(`Deleted ${result.rowCount} old records`);
  
  // Close connection
  await pool.end();
  process.exit(0);
}

cleanup().catch(err => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});
```

## Infrastructure as Code

### render.yaml

```yaml
# Complete render.yaml example
services:
  # Web Service
  - type: web
    name: api
    env: node
    region: oregon
    plan: starter
    buildCommand: npm ci
    startCommand: npm start
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: postgres-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          name: redis-cache
          type: redis
          property: connectionString
    autoDeploy: true
    
  # Static Site
  - type: web
    name: frontend
    env: static
    buildCommand: npm run build
    staticPublishPath: ./build
    headers:
      - path: /*
        name: X-Frame-Options
        value: DENY
      - path: /*
        name: X-Content-Type-Options
        value: nosniff
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    
  # Background Worker
  - type: worker
    name: email-worker
    env: node
    buildCommand: npm ci
    startCommand: npm run worker
    envVars:
      - key: NODE_ENV
        value: production
    
  # Cron Job
  - type: cron
    name: backup-job
    env: node
    schedule: "0 2 * * *"  # 2 AM daily
    buildCommand: npm ci
    startCommand: node scripts/backup.js

databases:
  - name: postgres-db
    databaseName: myapp
    user: admin
    plan: starter
    
  - name: redis-cache
    plan: starter
```

## Environment Variables

### Setting Variables

**Via Dashboard**:
1. Go to service settings
2. Click "Environment" tab
3. Add key-value pairs
4. Save changes (triggers redeploy)

**Via render.yaml**:
```yaml
services:
  - type: web
    name: api
    envVars:
      - key: API_KEY
        sync: false  # Don't sync from file
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: my-database
          property: connectionString
```

### Secret Management

```bash
# Create .env file (DO NOT commit)
echo ".env" >> .gitignore

# Set secrets in Render dashboard
# Or use Render API
curl -X POST "https://api.render.com/v1/services/srv-xxx/env-vars" \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "API_SECRET",
    "value": "secret-value"
  }'
```

## Custom Domains & SSL

### Add Custom Domain

```bash
# In Render Dashboard:
# 1. Go to your service
# 2. Click "Settings" → "Custom Domain"
# 3. Add domain: yourdomain.com

# Configure DNS:
# CNAME: www.yourdomain.com → your-app.onrender.com
# A Record: yourdomain.com → Render IP

# SSL certificate provisioned automatically
```

### Force HTTPS

```javascript
// Express middleware
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

## Monitoring & Logs

### View Logs

**Via Dashboard**:
- Go to service → "Logs" tab
- Filter by severity
- Search logs
- Download logs

**Via CLI**:
```bash
# Stream logs
render logs --service my-service --follow

# Get recent logs
render logs --service my-service --tail 100
```

### Metrics

Built-in metrics:
- **CPU Usage**: Track CPU utilization
- **Memory Usage**: Monitor memory consumption
- **Request Count**: HTTP request rates
- **Response Times**: Latency metrics
- **Error Rates**: 4xx and 5xx errors

### Health Checks

```javascript
// Comprehensive health check
app.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'healthy'
  };
  
  try {
    // Check database
    await pool.query('SELECT 1');
    health.database = 'connected';
    
    // Check Redis
    await redis.ping();
    health.redis = 'connected';
    
    res.status(200).json(health);
  } catch (error) {
    health.status = 'unhealthy';
    health.error = error.message;
    res.status(503).json(health);
  }
});
```

## Auto-Scaling

```yaml
# render.yaml
services:
  - type: web
    name: api
    autoscaling:
      enabled: true
      min: 1
      max: 10
      targetCPUPercent: 70
      targetMemoryPercent: 80
```

## Private Services

```yaml
# render.yaml
services:
  - type: private-service
    name: internal-api
    env: node
    buildCommand: npm ci
    startCommand: npm start
    # Not publicly accessible
    # Only accessible from other Render services
```

**Accessing Private Service**:
```javascript
// From another Render service in same region
const INTERNAL_API_URL = process.env.INTERNAL_API_URL;

async function callInternalAPI() {
  const response = await fetch(`${INTERNAL_API_URL}/internal/data`);
  return response.json();
}
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Render
        env:
          RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
          RENDER_SERVICE_ID: ${{ secrets.RENDER_SERVICE_ID }}
        run: |
          curl -X POST "https://api.render.com/v1/services/$RENDER_SERVICE_ID/deploys" \
            -H "Authorization: Bearer $RENDER_API_KEY" \
            -H "Content-Type: application/json"
```

### Deploy Hooks

```bash
# Get deploy hook URL from Render dashboard
# Settings → Deploy Hook

# Trigger deployment
curl -X POST "https://api.render.com/deploy/srv-xxx?key=yyy"
```

## Best Practices

### Application Design

1. **Health Endpoints**: Implement `/health` for monitoring
2. **Graceful Shutdown**: Handle SIGTERM properly
3. **Connection Pooling**: Reuse database connections
4. **Error Handling**: Log errors appropriately
5. **Environment-Based Config**: Use env vars

### Database Management

1. **Connection Limits**: Configure max connections
2. **Query Optimization**: Use indexes effectively
3. **Backups**: Enable automatic backups
4. **Migrations**: Use migration tools
5. **Monitoring**: Track slow queries

### Performance

1. **Caching**: Implement Redis caching
2. **Asset Optimization**: Minify and compress
3. **CDN Usage**: Serve static files via CDN
4. **Keep-Alive**: Enable HTTP keep-alive
5. **Response Compression**: Use gzip

### Security

1. **Environment Secrets**: Never commit secrets
2. **HTTPS Only**: Force HTTPS redirects
3. **CORS Configuration**: Set proper CORS headers
4. **Rate Limiting**: Implement rate limiting
5. **Input Validation**: Validate all inputs

## Pricing

### Free Tier

- **Web Services**: 750 hours/month
- **PostgreSQL**: 90 days data retention
- **Redis**: 25 MB storage
- **Bandwidth**: 100 GB/month
- **Build Minutes**: Shared

### Paid Plans

**Starter ($7/month)**:
- Always-on instances
- Faster builds
- More resources

**Standard ($25+/month)**:
- Horizontal scaling
- Higher resource limits
- Priority support

**Pro ($85+/month)**:
- Dedicated resources
- Advanced features
- SLA guarantees

## Migration Guides

### From Heroku

```bash
# Export Heroku config
heroku config -s > .env

# Create render.yaml from Procfile
# Procfile:
# web: npm start
# worker: npm run worker

# Equivalent render.yaml:
services:
  - type: web
    name: app
    env: node
    buildCommand: npm install
    startCommand: npm start
  - type: worker
    name: worker
    env: node
    buildCommand: npm install
    startCommand: npm run worker
```

### From Netlify/Vercel

```yaml
# For static sites
services:
  - type: web
    name: frontend
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

## Troubleshooting

### Build Failures

```bash
# Check build logs in dashboard
# Common issues:
# - Missing dependencies
# - Build command errors
# - Environment variable issues

# Debug locally
render shell my-service
```

### Deployment Issues

```bash
# View deployment logs
render logs --deployment dep-xxx

# Check service status
render status my-service

# Force redeploy
render deploy my-service
```

### Database Connection

```javascript
// Test database connection
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err ? err.stack : res.rows[0]);
  pool.end();
});
```

## Resources

### Official Documentation

- [Render Documentation](https://render.com/docs)
- [Render Blog](https://render.com/blog)
- [API Documentation](https://api-docs.render.com/)
- [Status Page](https://status.render.com/)

### Tools

- [Render CLI](https://render.com/docs/cli)
- [Render Dashboard](https://dashboard.render.com/)
- [Render API](https://api-docs.render.com/)

### Community

- [Community Forum](https://community.render.com/)
- [Discord Server](https://render.com/discord)
- [GitHub Discussions](https://github.com/render-examples)
- [Twitter](https://twitter.com/render)

### Learning Resources

- [Render Guides](https://render.com/docs/guides)
- [Example Applications](https://github.com/render-examples)
- [Video Tutorials](https://www.youtube.com/c/Render)
- [Blog Tutorials](https://render.com/blog)

---

**Related Technologies**: [Railway](../Railway/), [Vercel](../Vercel/), [Netlify](../Netlify/), [Heroku](../), [Docker](../../Docker/), [PostgreSQL](../../../SQL&DB'S/PostgreSQL/)
