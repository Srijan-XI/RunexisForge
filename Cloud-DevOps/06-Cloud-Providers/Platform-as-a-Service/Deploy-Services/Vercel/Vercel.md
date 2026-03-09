# Vercel

## Introduction

Vercel is a cloud platform for static sites and serverless functions that fits perfectly with modern frontend frameworks. It was created by the team behind Next.js and provides the best developer experience for deploying web applications with zero configuration, automatic HTTPS, instant cache invalidation, and global edge network.

### Key Features

- **Zero Configuration**: Deploy with a single command
- **Global Edge Network**: 70+ edge locations worldwide
- **Automatic HTTPS**: Free SSL certificates for all deployments
- **Preview Deployments**: Unique URL for every git push
- **Instant Rollbacks**: Revert to any previous deployment
- **Edge Functions**: Run code at the edge close to users
- **Image Optimization**: Automatic image resizing and optimization
- **Analytics**: Real-time performance insights
- **Framework Presets**: Optimized for Next.js, React, Vue, Svelte, etc.
- **Serverless Functions**: Deploy backend APIs alongside frontend

### Common Use Cases

- **Next.js Applications**: Full-stack React applications
- **Jamstack Sites**: Static sites with dynamic capabilities
- **Frontend Applications**: React, Vue, Angular, Svelte apps
- **API Routes**: Serverless API endpoints
- **Marketing Sites**: Landing pages and marketing websites
- **E-commerce**: Online stores with Shopify, Commerce.js
- **Portfolios**: Personal and professional portfolios
- **Documentation Sites**: Technical documentation

## Getting Started

### Install Vercel CLI

```bash
# Install globally via npm
npm install -g vercel

# Or via pnpm
pnpm add -g vercel

# Or via yarn
yarn global add vercel

# Login to Vercel
vercel login

# Verify installation
vercel --version
```

### Quick Deploy

```bash
# Deploy current directory
vercel

# Deploy with production settings
vercel --prod

# Deploy specific directory
vercel ./my-app

# Deploy and skip build step
vercel --prebuilt
```

## Next.js Deployment

### Create Next.js App

```bash
# Create new Next.js app
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app

# Run locally
npm run dev
```

```javascript
// app/page.js
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to Vercel</h1>
      <p className="text-lg">Deployed with zero configuration</p>
    </main>
  );
}
```

```javascript
// app/api/hello/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({
    message: 'Hello from Vercel API Route',
    timestamp: new Date().toISOString()
  });
}
```

### Deploy to Vercel

```bash
# Deploy from local
vercel

# Deploy to production
vercel --prod

# Or push to GitHub and connect via Vercel Dashboard
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/my-app.git
git push -u origin main
```

### Environment Variables

```bash
# .env.local (for local development)
DATABASE_URL=postgresql://localhost/mydb
API_KEY=your-api-key
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Add to Vercel
vercel env add DATABASE_URL
vercel env add API_KEY
vercel env add NEXT_PUBLIC_API_URL

# Pull environment variables
vercel env pull .env.local
```

```javascript
// Using environment variables
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
const publicApiUrl = process.env.NEXT_PUBLIC_API_URL; // Available in browser
```

## React Applications

### Create React App

```bash
# Create app
npx create-react-app my-react-app
cd my-react-app

# Add vercel.json for SPA routing
cat > vercel.json << 'EOF'
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
EOF
```

```javascript
// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>React on Vercel</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App;
```

### Deploy

```bash
# Deploy to Vercel
vercel

# Or use Vite for better performance
npm create vite@latest my-vite-app -- --template react
cd my-vite-app
vercel
```

## Vue.js Applications

### Create Vue App

```bash
# Create Vue 3 app with Vite
npm create vue@latest my-vue-app
cd my-vue-app
npm install
```

```vue
<!-- src/App.vue -->
<script setup>
import { ref, onMounted } from 'vue';

const message = ref('Loading...');

onMounted(async () => {
  try {
    const res = await fetch('/api/hello');
    const data = await res.json();
    message.value = data.message;
  } catch (error) {
    message.value = 'Error loading data';
  }
});
</script>

<template>
  <div class="app">
    <h1>Vue on Vercel</h1>
    <p>{{ message }}</p>
  </div>
</template>
```

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "framework": "vite"
}
```

## Svelte Applications

### Create Svelte App

```bash
# Create SvelteKit app
npm create svelte@latest my-svelte-app
cd my-svelte-app
npm install
```

```svelte
<!-- src/routes/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let data = null;
  
  onMount(async () => {
    const response = await fetch('/api/data');
    data = await response.json();
  });
</script>

<main>
  <h1>SvelteKit on Vercel</h1>
  {#if data}
    <pre>{JSON.stringify(data, null, 2)}</pre>
  {:else}
    <p>Loading...</p>
  {/if}
</main>
```

```javascript
// src/routes/api/data/+server.js
import { json } from '@sveltejs/kit';

export async function GET() {
  return json({
    message: 'Hello from SvelteKit API',
    timestamp: new Date().toISOString()
  });
}
```

## Serverless Functions

### Node.js Functions

```javascript
// api/hello.js
export default function handler(req, res) {
  res.status(200).json({
    message: 'Hello from Vercel Serverless Function',
    method: req.method,
    query: req.query
  });
}
```

```javascript
// api/users/[id].js - Dynamic route
export default function handler(req, res) {
  const { id } = req.query;
  
  res.status(200).json({
    userId: id,
    name: 'John Doe',
    email: 'john@example.com'
  });
}
```

### TypeScript Functions

```typescript
// api/typed.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ResponseData {
  message: string;
  timestamp: number;
}

export default function handler(
  req: VercelRequest,
  res: VercelResponse<ResponseData>
) {
  res.status(200).json({
    message: 'TypeScript function',
    timestamp: Date.now()
  });
}
```

### Python Functions

```python
# api/python-hello.py
from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        response = {
            'message': 'Hello from Python',
            'language': 'Python'
        }
        
        self.wfile.write(json.dumps(response).encode())
        return
```

```python
# requirements.txt (for dependencies)
requests==2.31.0
python-dotenv==1.0.0
```

### Go Functions

```go
// api/go-hello.go
package handler

import (
    "encoding/json"
    "net/http"
    "time"
)

type Response struct {
    Message   string    `json:"message"`
    Timestamp time.Time `json:"timestamp"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    
    response := Response{
        Message:   "Hello from Go",
        Timestamp: time.Now(),
    }
    
    json.NewEncoder(w).Encode(response)
}
```

## Edge Functions

### Edge Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get country from request
  const country = request.geo?.country || 'Unknown';
  
  // Add custom header
  const response = NextResponse.next();
  response.headers.set('x-user-country', country);
  
  // Redirect based on country
  if (country === 'US' && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/us', request.url));
  }
  
  return response;
}

export const config = {
  matcher: '/:path*'
};
```

### Edge API Routes

```typescript
// app/api/edge/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const geo = request.geo;
  
  return new Response(JSON.stringify({
    message: 'Hello from Edge',
    location: {
      country: geo?.country,
      region: geo?.region,
      city: geo?.city
    },
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=60'
    }
  });
}
```

## Database Integration

### Vercel Postgres

```bash
# Create database via Vercel dashboard or CLI
vercel postgres create my-database

# Connect existing project
vercel link

# Pull environment variables
vercel env pull .env.local
```

```typescript
// app/api/db/route.ts
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM users LIMIT 10`;
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { name, email } = await request.json();
  
  try {
    const result = await sql`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      RETURNING *
    `;
    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### Vercel KV (Redis)

```bash
# Create KV store
vercel kv create my-kv-store
```

```typescript
// app/api/cache/route.ts
import { kv } from '@vercel/kv';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  
  const value = await kv.get(key);
  return Response.json({ key, value });
}

export async function POST(request: Request) {
  const { key, value, ttl } = await request.json();
  
  if (ttl) {
    await kv.setex(key, ttl, value);
  } else {
    await kv.set(key, value);
  }
  
  return Response.json({ success: true });
}
```

### Vercel Blob Storage

```bash
# Install blob SDK
npm install @vercel/blob
```

```typescript
// app/api/upload/route.ts
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  
  const blob = await put(filename, request.body, {
    access: 'public',
  });
  
  return Response.json(blob);
}
```

```typescript
// app/api/files/route.ts
import { list } from '@vercel/blob';

export async function GET() {
  const { blobs } = await list();
  return Response.json(blobs);
}
```

## Image Optimization

### Next.js Image Component

```javascript
// app/page.js
import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <h1>Optimized Images</h1>
      
      {/* Automatically optimized */}
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        priority
      />
      
      {/* Remote images */}
      <Image
        src="https://example.com/image.jpg"
        alt="Remote image"
        width={800}
        height={400}
        quality={90}
      />
      
      {/* Responsive images */}
      <Image
        src="/responsive.jpg"
        alt="Responsive"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
```

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
};
```

## Configuration

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=60, stale-while-revalidate"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/blog/:slug",
      "destination": "/news/:slug"
    }
  ]
}
```

### Build Settings

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "vercel-build": "npm run build"
  }
}
```

## Preview Deployments

### Automatic Previews

```bash
# Every git push creates a preview
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Unique preview URL automatically generated:
# https://my-app-git-feature-new-feature-username.vercel.app
```

### Comment Integration

```javascript
// vercel.json - Enable PR comments
{
  "github": {
    "silent": false,
    "autoAlias": true
  }
}
```

### Preview Environment Variables

```bash
# Set environment variables for preview
vercel env add API_URL preview
vercel env add API_URL development
vercel env add API_URL production

# Different values per environment
```

## Custom Domains

### Add Domain

```bash
# Add domain via CLI
vercel domains add yourdomain.com

# Or via dashboard:
# Project Settings → Domains → Add Domain

# Configure DNS:
# A Record: @ → 76.76.21.21
# CNAME: www → cname.vercel-dns.com
```

### Domain Configuration

```bash
# List domains
vercel domains ls

# Remove domain
vercel domains rm yourdomain.com

# Transfer domain
vercel domains transfer yourdomain.com
```

### Wildcard Domains

```json
// vercel.json
{
  "alias": ["yourdomain.com", "www.yourdomain.com", "*.yourdomain.com"]
}
```

## Analytics & Monitoring

### Web Analytics

```javascript
// app/layout.js
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Speed Insights

```javascript
// app/layout.js
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Custom Metrics

```javascript
// lib/analytics.js
export function trackEvent(name, data) {
  if (window.va) {
    window.va('event', {
      name,
      data
    });
  }
}

// Usage
trackEvent('purchase', {
  amount: 99.99,
  currency: 'USD',
  item: 'Product XYZ'
});
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/vercel.yml
name: Vercel Production Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Vercel CLI
        run: npm install -g vercel
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          vercel pull --yes --environment=production --token=$VERCEL_TOKEN
          vercel build --prod --token=$VERCEL_TOKEN
          vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
```

### GitLab CI

```yaml
# .gitlab-ci.yml
deploy:
  image: node:18
  script:
    - npm install -g vercel
    - vercel pull --yes --environment=production --token=$VERCEL_TOKEN
    - vercel build --prod --token=$VERCEL_TOKEN
    - vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
  only:
    - main
```

## Security

### Content Security Policy

```javascript
// next.config.js
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ]
      }
    ];
  }
};
```

### Authentication

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*'
};
```

### Rate Limiting

```typescript
// lib/rate-limit.ts
import { kv } from '@vercel/kv';

export async function rateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60
) {
  const key = `rate-limit:${identifier}`;
  const count = await kv.incr(key);
  
  if (count === 1) {
    await kv.expire(key, window);
  }
  
  return {
    success: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
    reset: window
  };
}
```

## Best Practices

### Performance

1. **Use Edge Functions**: Deploy logic close to users
2. **Enable ISR**: Incremental Static Regeneration for dynamic content
3. **Optimize Images**: Use Next.js Image component
4. **Cache Strategically**: Set proper cache headers
5. **Code Splitting**: Lazy load components

### Development

1. **Environment Variables**: Use .env files properly
2. **Type Safety**: Use TypeScript
3. **Preview Deployments**: Test before production
4. **Monorepo Support**: Use Turborepo
5. **Error Handling**: Implement proper error boundaries

### Deployment

1. **Atomic Deployments**: All-or-nothing deploys
2. **Instant Rollback**: Quick recovery from issues
3. **Zero Downtime**: Seamless deployments
4. **Branch Previews**: Test every change
5. **Production Protection**: Enable deployment protection

## Pricing

### Hobby (Free)

- Unlimited deployments
- 100 GB bandwidth/month
- Serverless function execution
- Preview deployments
- Edge Functions
- Analytics (basic)

### Pro ($20/month)

- 1 TB bandwidth
- Advanced analytics
- Team collaboration
- Password protection
- Commercial use
- Priority support

### Enterprise (Custom)

- Custom bandwidth
- Advanced security
- SLA guarantees
- Dedicated support
- Enterprise SSO
- Audit logs

## Migration Guides

### From Netlify

```bash
# Export environment variables from Netlify
netlify env:list

# Import to Vercel
vercel env add VARIABLE_NAME

# Update build settings in vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### From AWS Amplify

```bash
# Amplify uses similar structure
# Update amplify.yml to vercel.json

# Vercel equivalent
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "react"
}
```

## Troubleshooting

### Build Errors

```bash
# Check build logs
vercel logs

# Run build locally
vercel build

# Clear cache and rebuild
vercel --force
```

### Function Timeout

```json
// vercel.json
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 60
    }
  }
}
```

### Large Bundle Size

```javascript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false
      };
    }
    return config;
  }
};
```

## Resources

### Official Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [API Reference](https://vercel.com/docs/rest-api)

### Tools & SDKs

- [Vercel CLI](https://vercel.com/cli)
- [@vercel/node](https://www.npmjs.com/package/@vercel/node)
- [@vercel/postgres](https://www.npmjs.com/package/@vercel/postgres)
- [@vercel/kv](https://www.npmjs.com/package/@vercel/kv)
- [@vercel/blob](https://www.npmjs.com/package/@vercel/blob)

### Community

- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Discord Server](https://vercel.com/discord)
- [GitHub Repository](https://github.com/vercel/vercel)
- [Twitter](https://twitter.com/vercel)

### Learning Resources

- [Vercel Guide](https://vercel.com/guides)
- [Next.js Learn](https://nextjs.org/learn)
- [Video Tutorials](https://www.youtube.com/c/VercelHQ)
- [Example Applications](https://github.com/vercel/next.js/tree/canary/examples)

---

**Related Technologies**: [Next.js](../../../Frontend-Frameworks/Next/), [React](../../../Frontend-Frameworks/React/), [Netlify](../Netlify/), [Railway](../Railway/), [Render](../Render/)
