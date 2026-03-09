# Netlify

## Introduction

Netlify is a modern web development platform that automates the deployment and hosting of static websites and serverless functions. It provides a complete workflow from local development to global production, with built-in CI/CD, instant rollbacks, split testing, and serverless functions - all optimized for the Jamstack architecture.

### Key Features

- **Continuous Deployment**: Automatic builds from Git repositories
- **Global CDN**: Edge network with instant cache invalidation
- **Atomic Deploys**: All-or-nothing deployments
- **Instant Rollbacks**: One-click rollback to any deployment
- **Branch Deploys**: Deploy every branch automatically
- **Split Testing**: A/B testing at the CDN level
- **Forms**: Built-in form handling without backend code
- **Identity**: User authentication and management
- **Functions**: Serverless Lambda functions
- **Edge Functions**: Code execution at the edge
- **Large Media**: Git LFS for large file management
- **Analytics**: Server-side analytics

### Common Use Cases

- **Jamstack Sites**: Static sites with dynamic capabilities
- **React/Vue/Angular Apps**: Modern frontend frameworks
- **Static Site Generators**: Gatsby, Hugo, Jekyll, Eleventy
- **E-commerce**: Online stores with Shopify, Snipcart
- **Marketing Sites**: Landing pages and campaigns
- **Documentation**: Technical documentation sites
- **Blogs**: Personal and professional blogs
- **Portfolios**: Creative portfolios

## Getting Started

### Install Netlify CLI

```bash
# Install via npm
npm install -g netlify-cli

# Or via yarn
yarn global add netlify-cli

# Login to Netlify
netlify login

# Verify installation
netlify --version
```

### Quick Deploy

```bash
# Initialize new site
netlify init

# Deploy site manually
netlify deploy

# Deploy to production
netlify deploy --prod

# Deploy specific directory
netlify deploy --dir=dist --prod
```

## Static Site Deployment

### React Application

```bash
# Create React app
npx create-react-app my-react-app
cd my-react-app

# Create netlify.toml
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

# Deploy
netlify init
netlify deploy --prod
```

```javascript
// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Call Netlify function
    fetch('/.netlify/functions/hello')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>React on Netlify</h1>
      {data && <p>{data.message}</p>}
    </div>
  );
}

export default App;
```

### Vue.js Application

```bash
# Create Vue app
npm create vue@latest my-vue-app
cd my-vue-app
npm install
```

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

```vue
<!-- src/App.vue -->
<script setup>
import { ref, onMounted } from 'vue';

const message = ref('Loading...');

onMounted(async () => {
  try {
    const res = await fetch('/.netlify/functions/api');
    const data = await res.json();
    message.value = data.message;
  } catch (error) {
    message.value = 'Error loading data';
  }
});
</script>

<template>
  <div class="app">
    <h1>Vue on Netlify</h1>
    <p>{{ message }}</p>
  </div>
</template>
```

### Next.js Application

```bash
# Create Next.js app
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app

# Install Netlify plugin
npm install -D @netlify/plugin-nextjs
```

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

```javascript
// app/page.js
export default function Home() {
  return (
    <main>
      <h1>Next.js on Netlify</h1>
      <p>Deployed with Edge Functions support</p>
    </main>
  );
}
```

### Gatsby Site

```bash
# Create Gatsby site
npm init gatsby
cd my-gatsby-site
```

```toml
# netlify.toml
[build]
  command = "gatsby build"
  publish = "public"

[build.environment]
  NODE_VERSION = "18"
  
[[plugins]]
  package = "netlify-plugin-gatsby-cache"
```

## Serverless Functions

### JavaScript Functions

```javascript
// netlify/functions/hello.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Hello from Netlify Functions!',
      timestamp: new Date().toISOString()
    })
  };
};
```

```javascript
// netlify/functions/users.js
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

exports.handler = async (event, context) => {
  // Parse request
  const { httpMethod, body } = event;
  
  try {
    await client.connect();
    const db = client.db('myapp');
    const users = db.collection('users');
    
    // GET - List users
    if (httpMethod === 'GET') {
      const allUsers = await users.find({}).toArray();
      return {
        statusCode: 200,
        body: JSON.stringify(allUsers)
      };
    }
    
    // POST - Create user
    if (httpMethod === 'POST') {
      const data = JSON.parse(body);
      const result = await users.insertOne(data);
      return {
        statusCode: 201,
        body: JSON.stringify(result)
      };
    }
    
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### TypeScript Functions

```typescript
// netlify/functions/typed.ts
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

interface ResponseData {
  message: string;
  timestamp: string;
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const data: ResponseData = {
    message: 'TypeScript function',
    timestamp: new Date().toISOString()
  };
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };
};

export { handler };
```

```json
// package.json
{
  "devDependencies": {
    "@netlify/functions": "^2.4.0",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0"
  }
}
```

### Background Functions

```javascript
// netlify/functions/process-upload.js
exports.handler = async (event, context) => {
  // Long-running task
  const data = JSON.parse(event.body);
  
  console.log('Starting background processing...');
  
  // Simulate heavy processing
  await processLargeFile(data.fileUrl);
  
  // Send notification when complete
  await sendNotification(data.email);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Processing complete' })
  };
};

// Configure as background function in netlify.toml
```

```toml
# netlify.toml
[functions]
  directory = "netlify/functions"
  
[functions."process-upload"]
  included_files = ["data/**"]
  
[[functions."process-upload".background]]
  enabled = true
```

## Edge Functions

### Edge Function Basics

```typescript
// netlify/edge-functions/geo.ts
import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const { geo } = context;
  
  return new Response(JSON.stringify({
    country: geo.country?.code,
    city: geo.city,
    region: geo.subdivision?.code,
    timezone: geo.timezone
  }), {
    headers: {
      'content-type': 'application/json'
    }
  });
};

export const config = { path: "/api/geo" };
```

### Transform HTML

```typescript
// netlify/edge-functions/personalize.ts
import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const response = await context.next();
  const text = await response.text();
  
  // Personalize content based on location
  const country = context.geo.country?.code || 'US';
  const personalized = text.replace(
    '{{country}}',
    country
  );
  
  return new Response(personalized, {
    headers: response.headers
  });
};

export const config = { path: "/" };
```

### A/B Testing at Edge

```typescript
// netlify/edge-functions/ab-test.ts
import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // Get or set variant
  let variant = context.cookies.get('ab_variant');
  
  if (!variant) {
    variant = Math.random() < 0.5 ? 'A' : 'B';
    context.cookies.set({
      name: 'ab_variant',
      value: variant,
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
  }
  
  // Rewrite to variant path
  if (variant === 'B') {
    url.pathname = `/variants/b${url.pathname}`;
    return context.rewrite(url);
  }
  
  return context.next();
};
```

## Forms

### HTML Forms

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Contact Form</title>
</head>
<body>
  <h1>Contact Us</h1>
  
  <!-- Netlify handles form submission automatically -->
  <form name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact">
    
    <label>
      Name:
      <input type="text" name="name" required>
    </label>
    
    <label>
      Email:
      <input type="email" name="email" required>
    </label>
    
    <label>
      Message:
      <textarea name="message" required></textarea>
    </label>
    
    <button type="submit">Send</button>
  </form>
</body>
</html>
```

### React Forms

```javascript
// components/ContactForm.js
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const data = new FormData(form);
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      
      alert('Form submitted successfully!');
    } catch (error) {
      alert('Error submitting form');
    }
  };

  return (
    <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={e => setFormData({...formData, name: e.target.value})}
        required
      />
      
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={e => setFormData({...formData, email: e.target.value})}
        required
      />
      
      <textarea
        name="message"
        value={formData.message}
        onChange={e => setFormData({...formData, message: e.target.value})}
        required
      />
      
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
```

### Form Notifications

```toml
# netlify.toml
[[plugins]]
  package = "netlify-plugin-form-submissions"

[plugins.inputs]
  to = "admin@example.com"
  subject = "New form submission"
```

## Identity & Authentication

### Setup Netlify Identity

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

# Enable Identity
[build.environment]
  NETLIFY_USE_IDENTITY = "true"
```

```javascript
// netlify/functions/protected.js
const { NetlifyJwtVerifier } = require('@serverless-jwt/netlify');

const verifyJwt = NetlifyJwtVerifier({
  issuer: process.env.URL
});

exports.handler = verifyJwt(async (event, context) => {
  const { user } = context.identityContext;
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${user.email}`,
      roles: user.app_metadata.roles
    })
  };
});
```

### Identity Widget

```html
<!-- index.html -->
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

<div data-netlify-identity-menu></div>
<div data-netlify-identity-button>Login with Netlify Identity</div>

<script>
  // Handle login events
  netlifyIdentity.on('login', user => {
    console.log('User logged in:', user);
  });
  
  netlifyIdentity.on('logout', () => {
    console.log('User logged out');
  });
</script>
```

### React Identity Integration

```javascript
// hooks/useNetlifyIdentity.js
import { useEffect, useState } from 'react';

export function useNetlifyIdentity() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const netlifyIdentity = window.netlifyIdentity;
    
    netlifyIdentity.on('login', user => setUser(user));
    netlifyIdentity.on('logout', () => setUser(null));
    
    // Initialize
    netlifyIdentity.init();
    setUser(netlifyIdentity.currentUser());
    
    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);
  
  const login = () => window.netlifyIdentity.open();
  const logout = () => window.netlifyIdentity.logout();
  
  return { user, login, logout };
}
```

## Environment Variables

### Setting Variables

```bash
# Via CLI
netlify env:set API_KEY "your-api-key"
netlify env:set DATABASE_URL "postgresql://..."

# List variables
netlify env:list

# Import from .env file
netlify env:import .env
```

### Context-Specific Variables

```toml
# netlify.toml
[context.production.environment]
  NODE_ENV = "production"
  API_URL = "https://api.production.com"

[context.deploy-preview.environment]
  NODE_ENV = "staging"
  API_URL = "https://api.staging.com"

[context.branch-deploy.environment]
  NODE_ENV = "development"
  API_URL = "https://api.dev.com"
```

### Using in Functions

```javascript
// netlify/functions/api.js
exports.handler = async (event, context) => {
  const apiKey = process.env.API_KEY;
  const dbUrl = process.env.DATABASE_URL;
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      environment: process.env.CONTEXT,
      hasApiKey: !!apiKey
    })
  };
};
```

## Build Configuration

### netlify.toml

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"
  edge_functions = "netlify/edge-functions"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

# Redirects and rewrites
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false

# Headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Context-specific builds
[context.production]
  command = "npm run build:prod"

[context.deploy-preview]
  command = "npm run build:preview"

[context.branch-deploy]
  command = "npm run build:dev"
```

### Build Plugins

```toml
# netlify.toml
[[plugins]]
  package = "@netlify/plugin-lighthouse"
  
  [plugins.inputs.thresholds]
    performance = 0.9
    accessibility = 0.9
    best-practices = 0.9
    seo = 0.9

[[plugins]]
  package = "netlify-plugin-cache"
  
  [plugins.inputs]
    paths = ["node_modules", ".cache"]

[[plugins]]
  package = "netlify-plugin-checklinks"
  
  [plugins.inputs]
    skipPatterns = ["admin", "private"]
```

## Split Testing

```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/variant-a/:splat"
  status = 200
  force = true
  conditions = {Cookie = ["ab_test=a"]}

[[redirects]]
  from = "/*"
  to = "/variant-b/:splat"
  status = 200
  force = true
  conditions = {Cookie = ["ab_test=b"]}
```

## Deploy Previews

### Branch Deploys

```toml
# netlify.toml
[context.branch-deploy]
  command = "npm run build:preview"

[context."feature/*"]
  command = "npm run build:feature"
```

### Deploy Notifications

```toml
# netlify.toml
[[notifications]]
  type = "slack"
  event = "deploy-succeeded"
  channel = "#deploys"

[[notifications]]
  type = "email"
  event = "deploy-failed"
  recipients = ["dev@example.com"]
```

## Custom Domains

### Add Domain

```bash
# Via CLI
netlify domains:add yourdomain.com

# Configure DNS
# A Record: @ → 75.2.60.5
# CNAME: www → your-site.netlify.app
```

### Domain Configuration

```toml
# netlify.toml
[[redirects]]
  from = "https://yourdomain.com/*"
  to = "https://www.yourdomain.com/:splat"
  status = 301
  force = true
```

## Analytics

### Enable Analytics

```html
<!-- Netlify Analytics automatically tracks:
- Page views
- Unique visitors
- Top pages
- Traffic sources
- Bandwidth usage
-->

<!-- No code required - enable in Netlify dashboard -->
```

### Custom Events

```javascript
// Track custom events
if (window.netlifyIdentity) {
  window.netlifyIdentity.on('login', () => {
    // Custom analytics event
    console.log('User logged in');
  });
}
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/netlify.yml
name: Netlify Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './dist'
          production-deploy: ${{ github.ref == 'refs/heads/main' }}
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### GitLab CI

```yaml
# .gitlab-ci.yml
deploy:
  image: node:18
  script:
    - npm install -g netlify-cli
    - npm ci
    - npm run build
    - netlify deploy --prod --dir=dist --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
  only:
    - main
```

## Best Practices

### Performance

1. **Optimize Assets**: Compress images and minify code
2. **Cache Headers**: Set appropriate cache-control headers
3. **Code Splitting**: Split JavaScript bundles
4. **Preload Critical Resources**: Use `<link rel="preload">`
5. **Use CDN**: Leverage global edge network

### Security

1. **Environment Secrets**: Never commit secrets to Git
2. **CSP Headers**: Implement Content Security Policy
3. **HTTPS Only**: Force HTTPS redirects
4. **Rate Limiting**: Implement rate limiting in functions
5. **Input Validation**: Validate all form inputs

### Development

1. **Branch Deploys**: Test changes before production
2. **Deploy Previews**: Review PRs with live previews
3. **Atomic Deploys**: All-or-nothing deployments
4. **Instant Rollback**: Quick recovery from issues
5. **Build Plugins**: Automate quality checks

## Pricing

### Starter (Free)

- 100 GB bandwidth/month
- 300 build minutes/month
- 125,000 function invocations
- Instant rollbacks
- Forms (100 submissions/month)
- Identity (1,000 users)

### Pro ($19/month)

- 400 GB bandwidth
- 1,000 build minutes
- 2 million function invocations
- Background functions
- Analytics
- Form notifications

### Business ($99/month)

- 1 TB bandwidth
- 2,500 build minutes
- 10 million function invocations
- Advanced security
- Role-based access
- SSO/SAML

## Migration Guides

### From Vercel

```bash
# Export environment variables
vercel env pull .env

# Import to Netlify
netlify env:import .env

# Update configuration
# vercel.json → netlify.toml
```

### From GitHub Pages

```toml
# netlify.toml
[build]
  command = "jekyll build"
  publish = "_site"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Troubleshooting

### Build Failures

```bash
# View build logs
netlify build --debug

# Test build locally
netlify build

# Clear cache
netlify build --clear-cache
```

### Function Errors

```javascript
// Add error logging
exports.handler = async (event, context) => {
  try {
    // Your function code
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### Deploy Context

```bash
# Check deploy context
echo $CONTEXT  # production, deploy-preview, branch-deploy

# Debug environment
netlify env:list
```

## Resources

### Official Documentation

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify CLI Reference](https://cli.netlify.com/)
- [Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Edge Functions](https://docs.netlify.com/edge-functions/overview/)

### Tools & SDKs

- [Netlify CLI](https://www.npmjs.com/package/netlify-cli)
- [@netlify/functions](https://www.npmjs.com/package/@netlify/functions)
- [Netlify SDK](https://sdk.netlify.com/)
- [Build Plugins](https://docs.netlify.com/integrations/build-plugins/)

### Community

- [Netlify Community](https://answers.netlify.com/)
- [GitHub Discussions](https://github.com/netlify/cli/discussions)
- [Discord Server](https://discord.gg/netlify)
- [Twitter](https://twitter.com/netlify)

### Learning Resources

- [Netlify Blog](https://www.netlify.com/blog/)
- [Jamstack Resources](https://jamstack.org/)
- [Video Tutorials](https://www.youtube.com/c/Netlify)
- [Netlify Explorers](https://explorers.netlify.com/)

---

**Related Technologies**: [Vercel](../Vercel/), [Render](../Render/), [Railway](../Railway/), [React](../../../Frontend-Frameworks/React/), [Vue](../../../Frontend-Frameworks/Vue/)
