# Railway

## Introduction

Railway is a modern deployment platform that simplifies building, deploying, and scaling applications. It provides infrastructure as code with a focus on developer experience, offering instant deployments from Git, automatic HTTPS, databases, and more - all without complex configuration.

### Key Features

- **Instant Deployments**: Deploy from GitHub, GitLab, or local code
- **Infrastructure from Code**: Automatic service detection and configuration
- **Built-in Databases**: PostgreSQL, MySQL, MongoDB, Redis with one click
- **Automatic HTTPS**: SSL certificates provisioned automatically
- **Environment Variables**: Secure configuration management
- **Preview Environments**: Automatic PR deployments
- **Usage-Based Pricing**: Pay only for what you use
- **CLI & API**: Programmatic deployment and management
- **Template Library**: Pre-configured starters for popular stacks
- **Observability**: Built-in logs, metrics, and monitoring

### Common Use Cases

- **Full-Stack Applications**: Deploy frontend and backend together
- **Microservices**: Run multiple services with shared resources
- **API Backends**: Host RESTful and GraphQL APIs
- **Database Hosting**: Managed database instances
- **Cron Jobs**: Scheduled tasks and workers
- **Monorepos**: Deploy multiple services from one repository
- **Static Sites**: Host frontend applications
- **Container Deployments**: Custom Docker images

## Getting Started

### Sign Up and Install CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Or with Homebrew (macOS)
brew install railway

# Login to Railway
railway login

# Verify installation
railway --version
```

### Create Your First Project

```bash
# Initialize new project
railway init

# Link to existing project
railway link

# Deploy from current directory
railway up

# Check deployment status
railway status
```

### Web Dashboard

1. Visit [railway.app](https://railway.app)
2. Sign up with GitHub, GitLab, or email
3. Create new project
4. Connect repository or deploy from template

## Project Configuration

### railway.json

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### railway.toml

```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
healthcheckPath = "/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

## Deploying Applications

### Node.js/Express Application

```bash
# Create Express app
mkdir my-api && cd my-api
npm init -y
npm install express

# Create server
cat > index.js << 'EOF'
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Railway!' });
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
  "name": "my-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

# Deploy to Railway
railway init
railway up
```

### Python/Flask Application

```bash
# Create Flask app
mkdir my-flask-app && cd my-flask-app

# Create app.py
cat > app.py << 'EOF'
from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify(message='Hello from Railway!')

@app.route('/health')
def health():
    return jsonify(status='healthy')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
EOF

# Create requirements.txt
cat > requirements.txt << 'EOF'
Flask==3.0.0
gunicorn==21.2.0
EOF

# Create Procfile
echo "web: gunicorn app:app" > Procfile

# Deploy
railway init
railway up
```

### Next.js Application

```bash
# Create Next.js app
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Deploy to Railway
railway init
railway up

# Or link to GitHub and auto-deploy
railway link
```

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

```bash
# Deploy with Docker
railway up --dockerfile
```

## Database Services

### PostgreSQL

```bash
# Add PostgreSQL database
railway add --database postgres

# Get connection string
railway variables

# Connect via CLI
railway connect postgres
```

**Using in Node.js**:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function query(text, params) {
  const res = await pool.query(text, params);
  return res.rows;
}

module.exports = { query };
```

### MySQL

```bash
# Add MySQL database
railway add --database mysql

# Connection details available in env vars
# MYSQL_URL, MYSQLHOST, MYSQLPORT, etc.
```

### MongoDB

```bash
# Add MongoDB database
railway add --database mongo

# Use MONGO_URL environment variable
```

**Using in Node.js**:
```javascript
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL);

async function connect() {
  await client.connect();
  return client.db('myapp');
}

module.exports = { connect };
```

### Redis

```bash
# Add Redis instance
railway add --database redis

# Use REDIS_URL environment variable
```

**Using in Node.js**:
```javascript
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

async function setCache(key, value, ttl = 3600) {
  await redis.setex(key, ttl, JSON.stringify(value));
}

async function getCache(key) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

module.exports = { setCache, getCache, redis };
```

## Environment Variables

### Setting Variables

```bash
# Set environment variable
railway variables set API_KEY=your-api-key

# Set multiple variables
railway variables set \
  NODE_ENV=production \
  API_URL=https://api.example.com \
  MAX_CONNECTIONS=100

# Load from .env file
railway variables set --from .env
```

### Accessing Variables

```javascript
// Node.js
const apiKey = process.env.API_KEY;
const nodeEnv = process.env.NODE_ENV;
```

```python
# Python
import os

api_key = os.environ.get('API_KEY')
node_env = os.environ.get('NODE_ENV', 'development')
```

### Railway-Provided Variables

```bash
# Available automatically
RAILWAY_ENVIRONMENT
RAILWAY_ENVIRONMENT_NAME
RAILWAY_PROJECT_ID
RAILWAY_PROJECT_NAME
RAILWAY_SERVICE_ID
RAILWAY_SERVICE_NAME
RAILWAY_DEPLOYMENT_ID
RAILWAY_GIT_COMMIT_SHA
RAILWAY_GIT_BRANCH
PORT  # Port your service should listen on
```

## CLI Commands

### Project Management

```bash
# List projects
railway list

# Switch project
railway link [project-id]

# Delete project
railway delete

# View project info
railway status
```

### Deployment

```bash
# Deploy current directory
railway up

# Deploy specific service
railway up --service backend

# Deploy with detached mode
railway up --detach

# Redeploy latest deployment
railway redeploy
```

### Logs & Debugging

```bash
# View logs
railway logs

# Follow logs (live)
railway logs --follow

# Filter by service
railway logs --service api

# View build logs
railway logs --build
```

### Database Operations

```bash
# Connect to database
railway connect postgres

# Run SQL query
railway run psql -c "SELECT * FROM users;"

# Export database
railway run pg_dump > backup.sql

# Import database
railway run psql < backup.sql
```

### Environment & Variables

```bash
# List variables
railway variables

# Set variable
railway variables set KEY=value

# Delete variable
railway variables delete KEY

# Export variables to .env
railway variables > .env
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Railway
        run: npm install -g @railway/cli
      
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: railway up --service backend
```

### GitLab CI/CD

```yaml
deploy:
  stage: deploy
  image: node:18
  script:
    - npm install -g @railway/cli
    - railway up --service backend
  only:
    - main
  variables:
    RAILWAY_TOKEN: $RAILWAY_TOKEN
```

### Manual Deployment with Token

```bash
# Generate token in Railway dashboard
# Settings → Tokens → Create Token

# Deploy using token
RAILWAY_TOKEN=your-token railway up
```

## Advanced Configuration

### Health Checks

```javascript
// Express health check
app.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  res.send(healthcheck);
});
```

**railway.toml**:
```toml
[deploy]
healthcheckPath = "/health"
healthcheckTimeout = 100
```

### Custom Build Commands

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build && npm run db:migrate"
  },
  "deploy": {
    "startCommand": "npm run start:prod"
  }
}
```

### Monorepo Configuration

```toml
# apps/backend/railway.toml
[build]
builder = "NIXPACKS"
buildCommand = "cd ../../ && npm run build:backend"

[deploy]
startCommand = "npm run start:backend"

# apps/frontend/railway.toml
[build]
builder = "NIXPACKS"
buildCommand = "cd ../../ && npm run build:frontend"

[deploy]
startCommand = "npm run start:frontend"
```

### Cron Jobs

```javascript
// cron-job.js
const cron = require('node-cron');

// Run every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running scheduled task');
  await performTask();
});

async function performTask() {
  // Your task logic
}
```

**railway.toml**:
```toml
[deploy]
startCommand = "node cron-job.js"
restartPolicyType = "ALWAYS"
```

## Templates & Starters

### Popular Templates

```bash
# Deploy from template
railway init --template

# Popular templates:
# - Next.js + PostgreSQL
# - Express + MongoDB
# - Django + PostgreSQL
# - FastAPI + PostgreSQL
# - Strapi CMS
# - Ghost Blog
# - n8n Workflow Automation
# - Supabase
```

### Custom Template

Create `railway-template.json`:
```json
{
  "name": "My Full Stack App",
  "description": "Node.js API + React Frontend + PostgreSQL",
  "services": [
    {
      "name": "backend",
      "source": {
        "repo": "username/my-backend",
        "branch": "main"
      },
      "env": {
        "NODE_ENV": "production"
      }
    },
    {
      "name": "frontend",
      "source": {
        "repo": "username/my-frontend",
        "branch": "main"
      }
    },
    {
      "name": "database",
      "type": "postgres"
    }
  ]
}
```

## Networking & Domains

### Custom Domains

```bash
# Add custom domain
railway domain

# Configure DNS:
# CNAME: your-domain.com → your-app.up.railway.app
# A Record: your-domain.com → Railway IP

# Verify domain
railway domain verify your-domain.com
```

### Service-to-Service Communication

```javascript
// Backend service
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  res.json({ data: 'Hello from backend' });
});

// Access via private network
const BACKEND_URL = process.env.BACKEND_PRIVATE_URL || 'http://backend:3000';
```

### Public vs Private URLs

```bash
# Public URL (HTTPS)
https://your-service.up.railway.app

# Private URL (internal network)
http://service-name.railway.internal:PORT
```

## Monitoring & Observability

### Metrics

```bash
# View metrics in dashboard
# - CPU usage
# - Memory usage
# - Network traffic
# - Response times
# - Error rates
```

### Logging

```javascript
// Structured logging
const logger = {
  info: (message, meta = {}) => {
    console.log(JSON.stringify({ level: 'info', message, ...meta }));
  },
  error: (message, error) => {
    console.error(JSON.stringify({ 
      level: 'error', 
      message, 
      error: error.message,
      stack: error.stack 
    }));
  }
};

logger.info('Server started', { port: 3000 });
```

### Alerts

Configure in Railway dashboard:
- Deployment failures
- High resource usage
- Health check failures
- Custom metric thresholds

## Best Practices

### Application Design

1. **Use Environment Variables**: Never hardcode secrets
2. **Health Checks**: Implement health endpoints
3. **Graceful Shutdown**: Handle SIGTERM signals
4. **Logging**: Use structured logging
5. **Error Handling**: Proper error responses

### Database Management

1. **Connection Pooling**: Reuse database connections
2. **Migrations**: Use migration tools (Prisma, TypeORM, Alembic)
3. **Backups**: Regular database backups
4. **Indexes**: Optimize database queries
5. **Connection Limits**: Configure max connections

### Performance

1. **Caching**: Use Redis for frequently accessed data
2. **CDN**: Use CDN for static assets
3. **Compression**: Enable gzip compression
4. **Optimize Build**: Minimize build size
5. **Resource Limits**: Configure appropriate resources

### Security

1. **HTTPS Only**: Force HTTPS redirects
2. **CORS**: Configure CORS properly
3. **Rate Limiting**: Implement rate limiting
4. **Input Validation**: Validate all inputs
5. **Security Headers**: Set security headers

## Pricing & Limits

### Free Tier

- $5 free credit per month
- 500 execution hours
- Shared CPU and memory
- Community support

### Pro Plan

- $20/month base fee
- Usage-based pricing beyond free tier
- Priority support
- Higher resource limits
- Team collaboration

### Resource Pricing

- **CPU**: $0.000463/vCPU-minute
- **Memory**: $0.000231/GB-minute
- **Network**: $0.10/GB egress

## Migration Guides

### From Heroku

```bash
# Export Heroku config
heroku config -s > .env

# Create Railway project
railway init

# Import environment variables
railway variables set --from .env

# Update database connection
# Heroku: DATABASE_URL
# Railway: DATABASE_URL (same format)

# Deploy
railway up
```

### From Vercel

```bash
# Export Vercel env
vercel env pull .env.local

# Create Railway project
railway init

# Import variables
railway variables set --from .env.local

# Deploy
railway up
```

## Troubleshooting

### Common Issues

**Build Failures**:
```bash
# Check build logs
railway logs --build

# Verify build command
railway status

# Clear cache
railway build --no-cache
```

**Connection Issues**:
```bash
# Verify environment variables
railway variables

# Check service status
railway status

# Test database connection
railway run node -e "console.log(process.env.DATABASE_URL)"
```

**Memory Issues**:
```toml
# Increase memory limit in railway.toml
[deploy]
memoryLimit = 2048  # MB
```

## Resources

### Official Documentation

- [Railway Documentation](https://docs.railway.app/)
- [Railway Blog](https://blog.railway.app/)
- [Railway Templates](https://railway.app/templates)
- [API Documentation](https://docs.railway.app/reference/api)

### Tools

- [Railway CLI](https://docs.railway.app/develop/cli)
- [Railway Dashboard](https://railway.app/dashboard)
- [Railway Status](https://status.railway.app/)

### Community

- [Discord Community](https://discord.gg/railway)
- [GitHub Discussions](https://github.com/railwayapp/railway/discussions)
- [Twitter](https://twitter.com/Railway)
- [YouTube Channel](https://www.youtube.com/@railwayapp)

### Learning Resources

- [Railway Guides](https://docs.railway.app/guides)
- [Video Tutorials](https://www.youtube.com/@railwayapp)
- [Community Examples](https://github.com/railwayapp-templates)
- [Blog Posts](https://blog.railway.app/)

---

**Related Technologies**: [Vercel](../Vercel/), [Netlify](../Netlify/), [Render](../Render/), [Heroku](../), [Docker](../Docker/), [Kubernetes](../Kubernetes/)
