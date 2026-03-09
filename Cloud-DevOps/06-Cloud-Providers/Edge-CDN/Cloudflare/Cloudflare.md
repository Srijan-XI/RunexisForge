# Cloudflare

## Introduction

### What is Cloudflare?

Cloudflare is a global cloud platform that provides Content Delivery Network (CDN), DDoS protection, DNS services, SSL/TLS encryption, and edge computing capabilities. It acts as a reverse proxy between visitors and your website, improving performance, security, and reliability while offering serverless computing through Cloudflare Workers.

### Why Cloudflare?

- Global CDN with 300+ data centers
- DDoS protection and web application firewall (WAF)
- Free SSL/TLS certificates
- Fast and secure DNS (1.1.1.1)
- Edge computing with Workers
- Static site hosting with Pages
- R2 object storage (S3-compatible)
- Zero Trust security
- Bot management
- Rate limiting and caching

## Prerequisites

- Domain name (for most features)
- Website or application to protect/accelerate
- Basic understanding of DNS
- Command line familiarity (for advanced features)

## Getting Started

### Sign Up

1. Visit [cloudflare.com](https://cloudflare.com)
2. Create free account
3. Add your website
4. Update nameservers at your domain registrar
5. Wait for DNS propagation (usually < 24 hours)

### Plans

- **Free**: Basic CDN, SSL, DDoS protection
- **Pro**: $20/month - Advanced performance and security
- **Business**: $200/month - Enterprise features
- **Enterprise**: Custom pricing - Full suite with SLA

## DNS Management

### Adding DNS Records

```bash
# Via Dashboard
1. Go to DNS tab
2. Click "Add record"
3. Select type (A, AAAA, CNAME, MX, TXT, etc.)
4. Enter name and value
5. Toggle proxy status (orange = proxied, gray = DNS only)

# Via API
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "A",
    "name": "example.com",
    "content": "192.0.2.1",
    "ttl": 3600,
    "proxied": true
  }'
```

### DNS Record Types

```
A       - IPv4 address
AAAA    - IPv6 address
CNAME   - Canonical name (alias)
MX      - Mail exchange
TXT     - Text records (SPF, DKIM, verification)
SRV     - Service records
CAA     - Certificate authority authorization
```

## SSL/TLS Configuration

### SSL Modes

```
Off              - No encryption (not recommended)
Flexible         - Cloudflare to visitor encrypted, origin unencrypted
Full             - End-to-end encryption, self-signed cert OK
Full (Strict)    - End-to-end, valid cert required
```

### Custom Certificates

```bash
# Upload custom certificate
1. SSL/TLS → Edge Certificates
2. Upload Custom Certificate
3. Provide certificate, private key, and chain

# Generate origin certificate
1. SSL/TLS → Origin Server
2. Create Certificate
3. Install on origin server
```

## Cloudflare Workers

### What are Workers?

Serverless JavaScript/TypeScript functions running on Cloudflare's edge network with sub-millisecond cold starts.

### Creating a Worker

```javascript
// hello-world worker
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello World!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
```

### Advanced Worker Examples

#### API Proxy

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Proxy to backend API
    const apiUrl = `https://api.example.com${url.pathname}`;
    const response = await fetch(apiUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    
    // Add CORS headers
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    
    return newResponse;
  },
};
```

#### Authentication Middleware

```javascript
export default {
  async fetch(request, env, ctx) {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || authHeader !== `Bearer ${env.API_KEY}`) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    // Continue to origin
    return fetch(request);
  },
};
```

#### KV Storage

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    
    if (request.method === 'GET') {
      const value = await env.MY_KV.get(key);
      return new Response(value || 'Not found', {
        status: value ? 200 : 404,
      });
    }
    
    if (request.method === 'POST') {
      const value = await request.text();
      await env.MY_KV.put(key, value);
      return new Response('Stored successfully');
    }
    
    return new Response('Method not allowed', { status: 405 });
  },
};
```

### Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Create new project
wrangler init my-worker

# Develop locally
wrangler dev

# Deploy
wrangler deploy

# Tail logs
wrangler tail
```

### Worker Configuration

```toml
# wrangler.toml
name = "my-worker"
main = "src/index.js"
compatibility_date = "2024-01-01"

[env.production]
vars = { ENVIRONMENT = "production" }
kv_namespaces = [
  { binding = "MY_KV", id = "abc123" }
]

[env.staging]
vars = { ENVIRONMENT = "staging" }
kv_namespaces = [
  { binding = "MY_KV", id = "def456" }
]
```

## Cloudflare Pages

### Static Site Deployment

```bash
# Deploy via Git integration
1. Go to Pages dashboard
2. Connect GitHub/GitLab repository
3. Configure build settings
4. Deploy automatically on push

# Deploy via CLI
wrangler pages deploy ./dist
```

### Build Configuration

```toml
# Framework presets available:
- Next.js
- React (Create React App)
- Vue
- Nuxt
- Svelte
- Hugo
- Jekyll
- Gatsby

# Custom build
Build command: npm run build
Build output: /dist
Root directory: /
```

### Functions (Pages Functions)

```javascript
// functions/api/hello.js
export async function onRequest(context) {
  return new Response('Hello from Pages Functions!');
}

// functions/api/data.js
export async function onRequestGet(context) {
  const data = await context.env.DB.get('key');
  return Response.json({ data });
}

export async function onRequestPost(context) {
  const body = await context.request.json();
  await context.env.DB.put('key', JSON.stringify(body));
  return Response.json({ success: true });
}
```

## R2 Object Storage

### S3-Compatible Storage

```javascript
// Using Workers with R2
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    
    if (request.method === 'GET') {
      const object = await env.MY_BUCKET.get(key);
      if (!object) {
        return new Response('Not found', { status: 404 });
      }
      return new Response(object.body);
    }
    
    if (request.method === 'PUT') {
      await env.MY_BUCKET.put(key, request.body);
      return new Response('Uploaded successfully');
    }
    
    return new Response('Method not allowed', { status: 405 });
  },
};
```

### Using AWS SDK

```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

await s3.send(new PutObjectCommand({
  Bucket: 'my-bucket',
  Key: 'file.txt',
  Body: 'Hello R2!',
}));
```

## Caching

### Cache Rules

```javascript
// Cache API in Worker
export default {
  async fetch(request, env, ctx) {
    const cache = caches.default;
    
    // Try cache first
    let response = await cache.match(request);
    
    if (!response) {
      // Fetch from origin
      response = await fetch(request);
      
      // Cache for 1 hour
      response = new Response(response.body, response);
      response.headers.set('Cache-Control', 'public, max-age=3600');
      
      ctx.waitUntil(cache.put(request, response.clone()));
    }
    
    return response;
  },
};
```

### Page Rules

```
Cache Everything
Edge Cache TTL: 2 hours
Browser Cache TTL: 4 hours
Cache Level: Standard/Aggressive
Bypass Cache on Cookie
```

## Security Features

### Web Application Firewall (WAF)

```bash
# Managed rulesets
- Cloudflare Managed Ruleset
- OWASP ModSecurity Core Rule Set
- Cloudflare Sensitive Data Detection

# Custom rules
1. Security → WAF → Custom rules
2. Create rule with expression:
   (http.request.uri.path contains "/admin" and ip.src ne 203.0.113.0)
```

### Rate Limiting

```javascript
// Worker rate limiting
export default {
  async fetch(request, env, ctx) {
    const ip = request.headers.get('CF-Connecting-IP');
    const key = `rate_limit:${ip}`;
    
    const count = await env.KV.get(key);
    
    if (count && parseInt(count) > 100) {
      return new Response('Rate limit exceeded', { status: 429 });
    }
    
    await env.KV.put(key, (parseInt(count) || 0) + 1, {
      expirationTtl: 60, // 1 minute
    });
    
    return fetch(request);
  },
};
```

### Bot Management

```
Configure under Security → Bots
- Definitely automated: Block/Challenge
- Likely automated: Managed Challenge
- Verified bots: Allow (Google, Bing, etc.)
```

## Zero Trust

### Access Control

```bash
# Cloudflare Access
1. Zero Trust → Access → Applications
2. Create application
3. Set domain (e.g., admin.example.com)
4. Configure authentication (Google, GitHub, SAML)
5. Create access policies

# Example policy
Name: Admin Only
Action: Allow
Include: Emails ending in @company.com
```

### Tunnel (Cloudflared)

```bash
# Install cloudflared
brew install cloudflare/cloudflare/cloudflared

# Login
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create my-tunnel

# Configure
# config.yml
tunnel: <TUNNEL-ID>
credentials-file: /path/to/<TUNNEL-ID>.json

ingress:
  - hostname: app.example.com
    service: http://localhost:3000
  - service: http_status:404

# Run tunnel
cloudflared tunnel run my-tunnel

# Install as service
cloudflared service install
```

## Analytics

### Web Analytics

```html
<!-- Add to website -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

### Worker Analytics

```javascript
// Track custom metrics
export default {
  async fetch(request, env, ctx) {
    const start = Date.now();
    
    const response = await fetch(request);
    
    const duration = Date.now() - start;
    console.log(`Request took ${duration}ms`);
    
    return response;
  },
};
```

## Load Balancing

### Creating Load Balancer

```bash
1. Traffic → Load Balancing
2. Create Load Balancer
3. Add origin pools
4. Configure health checks
5. Set traffic steering (Random, Hash, Geo, etc.)
```

## Stream (Video Platform)

```bash
# Upload video
curl -X POST \
  https://api.cloudflare.com/client/v4/accounts/{account_id}/stream \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F file=@/path/to/video.mp4
```

```html
<!-- Embed video -->
<stream src="VIDEO_UID" controls></stream>
<script src="https://embed.cloudflarestream.com/embed/sdk.latest.js"></script>
```

## Email Routing

```bash
1. Email → Email Routing
2. Enable Email Routing
3. Add destination addresses
4. Create routing rules
5. Verify DNS records
```

## API Usage

### Authentication

```bash
# API Token (recommended)
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer YOUR_API_TOKEN"

# API Key (legacy)
curl -X GET "https://api.cloudflare.com/client/v4/zones" \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: YOUR_API_KEY"
```

### Common API Operations

```bash
# List zones
curl "https://api.cloudflare.com/client/v4/zones" \
  -H "Authorization: Bearer YOUR_API_TOKEN"

# Purge cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'

# Update SSL mode
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/ssl" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"full"}'
```

## Best Practices

### Performance

- Enable Auto Minify (HTML, CSS, JS)
- Use Brotli compression
- Enable HTTP/2 and HTTP/3
- Configure optimal caching rules
- Use Argo Smart Routing for dynamic content
- Implement Early Hints

### Security

- Always use "Full (Strict)" SSL mode
- Enable DNSSEC
- Configure WAF rules
- Implement rate limiting
- Use Bot Management
- Enable HSTS headers
- Configure CSP headers

### Reliability

- Set up health checks
- Use multiple origin servers
- Configure load balancing
- Implement failover logic
- Monitor analytics

## Troubleshooting

### Common Issues

```bash
# 520/521/522 errors
- Check origin server is running
- Verify firewall allows Cloudflare IPs
- Check SSL certificate validity

# 525 SSL handshake failed
- Verify origin certificate
- Check SSL/TLS mode
- Ensure cipher compatibility

# Cache not working
- Check cache rules
- Verify cache headers from origin
- Use Page Rules to force caching

# Worker not running
- Check route pattern
- Verify deployment
- Check worker logs with wrangler tail
```

## Resources

- [Cloudflare Docs](https://developers.cloudflare.com/)
- [Workers Docs](https://developers.cloudflare.com/workers/)
- [API Docs](https://developers.cloudflare.com/api/)
- [Community Forum](https://community.cloudflare.com/)
- [Discord](https://discord.cloudflare.com/)
- [Status Page](https://www.cloudflarestatus.com/)

## Next Steps

- Set up your first Worker
- Deploy a Pages site
- Configure WAF rules
- Implement Zero Trust Access
- Explore R2 storage
- Set up load balancing
- Monitor analytics
