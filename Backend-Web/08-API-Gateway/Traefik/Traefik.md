# Traefik - Modern HTTP Reverse Proxy and Load Balancer

## Table of Contents
- [Introduction](#introduction)
- [Why Traefik?](#why-traefik)
- [Core Concepts](#core-concepts)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Routing & Services](#routing--services)
- [Middleware System](#middleware-system)
- [TLS & Certificates](#tls--certificates)
- [Load Balancing](#load-balancing)
- [Observability](#observability)
- [Kubernetes Integration](#kubernetes-integration)
- [Traefik vs Other Solutions](#traefik-vs-other-solutions)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

Traefik is a modern, cloud-native **HTTP reverse proxy and load balancer** designed to make deploying microservices easy. It automatically discovers services and configures routing dynamically, eliminating the need for manual configuration updates when services change.

### Key Characteristics

- **Cloud-Native**: Built for Docker, Kubernetes, and cloud platforms
- **Dynamic Configuration**: Auto-discovery and configuration
- **Let's Encrypt Integration**: Automatic SSL/TLS certificates
- **Edge Router**: Routes traffic to your services
- **Multi-Protocol**: HTTP, HTTPS, TCP, UDP, gRPC, WebSocket
- **Open Source**: Apache 2.0 license (Traefik Proxy)

### Traefik Editions

| Edition | Description | Use Case |
|---------|-------------|----------|
| **Traefik Proxy** | Open-source reverse proxy | Small to large deployments |
| **Traefik Enterprise** | Commercial with advanced features | Enterprise production |
| **Traefik Hub** | API Gateway & Management | API-first organizations |

---

## Why Traefik?

### Benefits

✅ **Auto-Discovery**
- Automatic service detection
- Dynamic configuration updates
- No config reloads needed
- Built-in service providers (Docker, K8s, Consul)

✅ **Developer-Friendly**
- Simple configuration
- Docker labels / K8s annotations
- Real-time dashboard
- Hot reload without downtime

✅ **Production-Ready**
- Let's Encrypt automation
- Circuit breakers
- Rate limiting
- Health checks
- Metrics and tracing

✅ **Cloud-Native**
- Kubernetes Ingress Controller
- Docker Swarm support
- Consul/etcd integration
- Multi-cloud compatible

✅ **Performance**
- Written in Go
- Low resource footprint
- High throughput
- Efficient connection pooling

### Use Cases

- **Microservices Gateway**: Route traffic to containerized services
- **Kubernetes Ingress**: Native K8s ingress controller
- **Reverse Proxy**: Frontend for web applications
- **Load Balancer**: Distribute traffic across instances
- **API Gateway**: Manage and route API traffic
- **Edge Router**: Entry point for all external traffic

---

## Core Concepts

### EntryPoints

**EntryPoints** are the network entry points into Traefik (ports):

```yaml
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"
  metrics:
    address: ":8082"
```

### Routers

**Routers** connect incoming requests to services:

```yaml
http:
  routers:
    my-router:
      rule: "Host(`example.com`) && Path(`/api`)"
      service: my-service
      entryPoints:
        - websecure
      middlewares:
        - auth
```

### Services

**Services** define how to reach the actual backends:

```yaml
http:
  services:
    my-service:
      loadBalancer:
        servers:
          - url: "http://192.168.0.10:8080"
          - url: "http://192.168.0.11:8080"
```

### Middlewares

**Middlewares** modify requests/responses:

```yaml
http:
  middlewares:
    my-auth:
      basicAuth:
        users:
          - "user:$apr1$..."
    
    my-compress:
      compress: {}
    
    my-ratelimit:
      rateLimit:
        average: 100
        burst: 50
```

### Providers

**Providers** are infrastructure sources:
- **File**: Static YAML/TOML configuration
- **Docker**: Docker container labels
- **Kubernetes**: K8s Ingress/IngressRoute
- **Consul/Etcd**: Key-value stores
- **HTTP**: REST API configuration

---

## Architecture

### Traefik Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    External Clients                      │
│         (Web Browsers, Mobile Apps, APIs)                │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                  EntryPoints                             │
│         (Port 80, 443, custom ports)                     │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                   Routers                                │
│   (Match: Host, Path, Headers, Methods)                  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                 Middlewares                              │
│  (Auth, Rate Limit, Headers, Retry, Circuit Breaker)     │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                  Services                                │
│         (Load Balancing, Health Checks)                  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│              Backend Services                            │
│    (Docker Containers, K8s Pods, VMs)                    │
└──────────────────────────────────────────────────────────┘
         ▲
         │ Service Discovery
         │
┌────────┴─────────────────────────────────────────────────┐
│                  Providers                               │
│  (Docker, Kubernetes, Consul, File, etc.)                │
└──────────────────────────────────────────────────────────┘
```

### Request Flow

1. **Client Request**: Request arrives at EntryPoint (e.g., port 80/443)
2. **Router Matching**: Traefik matches request to router rules
3. **Middleware Processing**: Request passes through middleware chain
4. **Service Selection**: Router forwards to configured service
5. **Load Balancing**: Service distributes to backend server
6. **Response Processing**: Response flows back through middlewares
7. **Client Response**: Final response sent to client

---

## Key Features

### 1. Automatic Service Discovery

**Docker Provider:**
```yaml
# docker-compose.yml
services:
  whoami:
    image: traefik/whoami
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.whoami.rule=Host(`whoami.localhost`)"
      - "traefik.http.routers.whoami.entrypoints=web"
```

**Kubernetes Provider:**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
spec:
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myapp-service
                port:
                  number: 80
```

### 2. Let's Encrypt Automation

```yaml
# Automatic HTTPS certificates
entryPoints:
  websecure:
    address: ":443"
    http:
      tls:
        certResolver: letsencrypt

certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@example.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web
```

### 3. Middleware Chain

```yaml
http:
  routers:
    myapp:
      rule: "Host(`example.com`)"
      middlewares:
        - compress
        - auth
        - ratelimit
      service: myapp-service

  middlewares:
    compress:
      compress: {}
    
    auth:
      basicAuth:
        users:
          - "admin:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/"
    
    ratelimit:
      rateLimit:
        average: 100
        period: 1s
        burst: 50
```

### 4. Circuit Breaker

```yaml
http:
  middlewares:
    circuit-breaker:
      circuitBreaker:
        expression: "ResponseCodeRatio(500, 600, 0, 600) > 0.30"
        checkPeriod: 10s
        fallbackDuration: 30s
```

---

## Installation & Setup

### Docker Installation

```bash
# Create network
docker network create traefik-network

# Run Traefik
docker run -d \
  --name traefik \
  --network traefik-network \
  -p 80:80 \
  -p 443:443 \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v $(pwd)/traefik.yml:/etc/traefik/traefik.yml \
  -v $(pwd)/letsencrypt:/letsencrypt \
  traefik:v3.0
```

### Docker Compose

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v3.0
    container_name: traefik
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    networks:
      - traefik
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"  # Dashboard
    environment:
      - CF_API_EMAIL=${CF_API_EMAIL}
      - CF_API_KEY=${CF_API_KEY}
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik/traefik.yml:/traefik.yml:ro
      - ./traefik/acme.json:/acme.json
      - ./traefik/config.yml:/config.yml:ro
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.traefik.entrypoints=https"
      - "traefik.http.routers.traefik.rule=Host(`traefik.example.com`)"
      - "traefik.http.routers.traefik.service=api@internal"

networks:
  traefik:
    external: true
```

### Kubernetes (Helm)

```bash
# Add Traefik Helm repository
helm repo add traefik https://traefik.github.io/charts
helm repo update

# Install Traefik
helm install traefik traefik/traefik \
  --namespace traefik \
  --create-namespace \
  --set ingressClass.enabled=true \
  --set ingressClass.isDefaultClass=true

# Verify installation
kubectl get pods -n traefik
```

### Binary Installation

```bash
# Download Traefik binary
wget https://github.com/traefik/traefik/releases/download/v3.0.0/traefik_v3.0.0_linux_amd64.tar.gz
tar -xzf traefik_v3.0.0_linux_amd64.tar.gz

# Move to /usr/local/bin
sudo mv traefik /usr/local/bin/
sudo chmod +x /usr/local/bin/traefik

# Create config directory
sudo mkdir -p /etc/traefik
sudo touch /etc/traefik/traefik.yml

# Run Traefik
traefik --configFile=/etc/traefik/traefik.yml
```

---

## Configuration

### Static Configuration (traefik.yml)

```yaml
# Global configuration
global:
  checkNewVersion: true
  sendAnonymousUsage: false

# Entry points
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  
  websecure:
    address: ":443"
    http:
      tls:
        certResolver: letsencrypt

# API and Dashboard
api:
  dashboard: true
  insecure: false  # Don't expose on :8080 in production

# Providers
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: traefik-network
  
  file:
    directory: /etc/traefik/dynamic
    watch: true

# Certificate resolvers
certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@example.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web
      # OR use DNS challenge
      # dnsChallenge:
      #   provider: cloudflare
      #   delayBeforeCheck: 30s

# Logging
log:
  level: INFO
  filePath: /var/log/traefik/traefik.log
  format: json

# Access logs
accessLog:
  filePath: /var/log/traefik/access.log
  format: json
  bufferingSize: 100

# Metrics
metrics:
  prometheus:
    entryPoint: metrics
    addEntryPointsLabels: true
    addServicesLabels: true
```

### Dynamic Configuration (config.yml)

```yaml
http:
  routers:
    # HTTP to HTTPS redirect
    http-catchall:
      rule: "hostregexp(`{host:.+}`)"
      entryPoints:
        - web
      middlewares:
        - redirect-to-https
      service: noop@internal

  middlewares:
    # HTTPS redirect middleware
    redirect-to-https:
      redirectScheme:
        scheme: https
        permanent: true
    
    # Security headers
    security-headers:
      headers:
        frameDeny: true
        sslRedirect: true
        browserXssFilter: true
        contentTypeNosniff: true
        forceSTSHeader: true
        stsIncludeSubdomains: true
        stsPreload: true
        stsSeconds: 31536000
        customFrameOptionsValue: "SAMEORIGIN"
    
    # Rate limiting
    rate-limit:
      rateLimit:
        average: 100
        burst: 50
        period: 1s
    
    # Compression
    compression:
      compress: {}
    
    # Basic auth
    auth:
      basicAuth:
        users:
          - "admin:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/"

# TLS configuration
tls:
  options:
    default:
      minVersion: VersionTLS12
      cipherSuites:
        - TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
        - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
        - TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305
```

---

## Routing & Services

### Host-Based Routing

```yaml
# Docker labels
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.app1.rule=Host(`app1.example.com`)"
  - "traefik.http.routers.app1.entrypoints=websecure"
  - "traefik.http.routers.app1.tls.certresolver=letsencrypt"
```

### Path-Based Routing

```yaml
# Route based on path
labels:
  - "traefik.http.routers.api.rule=Host(`example.com`) && PathPrefix(`/api`)"
  - "traefik.http.routers.web.rule=Host(`example.com`) && PathPrefix(`/`)"
```

### Header-Based Routing

```yaml
# Route based on headers
http:
  routers:
    api-v1:
      rule: "Host(`api.example.com`) && Headers(`X-API-Version`, `v1`)"
      service: api-v1-service
    
    api-v2:
      rule: "Host(`api.example.com`) && Headers(`X-API-Version`, `v2`)"
      service: api-v2-service
```

### Method-Based Routing

```yaml
# Route based on HTTP method
http:
  routers:
    read-only:
      rule: "Host(`api.example.com`) && Method(`GET`, `HEAD`)"
      service: read-service
    
    write-ops:
      rule: "Host(`api.example.com`) && Method(`POST`, `PUT`, `DELETE`)"
      service: write-service
      middlewares:
        - auth
```

### Priority Routing

```yaml
# Higher priority = matched first
http:
  routers:
    specific:
      rule: "Host(`example.com`) && Path(`/api/special`)"
      priority: 100
      service: special-service
    
    general:
      rule: "Host(`example.com`) && PathPrefix(`/api`)"
      priority: 10
      service: api-service
```

---

## Middleware System

### Authentication Middlewares

**Basic Auth:**
```yaml
http:
  middlewares:
    basic-auth:
      basicAuth:
        users:
          - "user1:$apr1$..."
          - "user2:$apr1$..."
        # OR use file
        # usersFile: "/path/to/.htpasswd"
```

**Digest Auth:**
```yaml
http:
  middlewares:
    digest-auth:
      digestAuth:
        users:
          - "user1:realm:hash"
        realm: "MyRealm"
```

**Forward Auth:**
```yaml
http:
  middlewares:
    oauth:
      forwardAuth:
        address: "https://auth.example.com/verify"
        authResponseHeaders:
          - "X-Forwarded-User"
```

### Security Middlewares

**Headers:**
```yaml
http:
  middlewares:
    secure-headers:
      headers:
        accessControlAllowMethods:
          - GET
          - POST
        accessControlAllowOriginList:
          - https://example.com
        accessControlMaxAge: 100
        addVaryHeader: true
        browserXssFilter: true
        contentTypeNosniff: true
        frameDeny: true
        sslRedirect: true
        customResponseHeaders:
          X-Custom-Header: "value"
```

**IP Allow/Deny:**
```yaml
http:
  middlewares:
    ip-whitelist:
      ipWhiteList:
        sourceRange:
          - 192.168.1.0/24
          - 10.0.0.0/8
```

**Rate Limiting:**
```yaml
http:
  middlewares:
    rate-limit:
      rateLimit:
        average: 100      # requests per second
        burst: 50         # burst size
        period: 1s        # time period
        sourceCriterion:
          ipStrategy:
            depth: 1      # X-Forwarded-For depth
```

### Transformation Middlewares

**Add Prefix:**
```yaml
http:
  middlewares:
    add-prefix:
      addPrefix:
        prefix: "/api"
```

**Strip Prefix:**
```yaml
http:
  middlewares:
    strip-api:
      stripPrefix:
        prefixes:
          - "/api"
          - "/v1"
```

**Replace Path:**
```yaml
http:
  middlewares:
    replace-path:
      replacePath:
        path: "/new/path"
```

**Redirect:**
```yaml
http:
  middlewares:
    redirect:
      redirectRegex:
        regex: "^http://(.+)"
        replacement: "https://${1}"
        permanent: true
```

### Resilience Middlewares

**Retry:**
```yaml
http:
  middlewares:
    retry:
      retry:
        attempts: 3
        initialInterval: 100ms
```

**Circuit Breaker:**
```yaml
http:
  middlewares:
    circuit-breaker:
      circuitBreaker:
        expression: "NetworkErrorRatio() > 0.30"
        checkPeriod: 10s
        fallbackDuration: 30s
```

---

## TLS & Certificates

### Let's Encrypt HTTP Challenge

```yaml
certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@example.com
      storage: /acme.json
      httpChallenge:
        entryPoint: web
```

### Let's Encrypt DNS Challenge

```yaml
certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@example.com
      storage: /acme.json
      dnsChallenge:
        provider: cloudflare
        delayBeforeCheck: 30s
        resolvers:
          - 1.1.1.1:53
          - 8.8.8.8:53
```

**Supported DNS Providers:**
- Cloudflare, Route53, Azure DNS, Google Cloud DNS
- DigitalOcean, Namecheap, GoDaddy
- 70+ providers supported

### Custom Certificates

```yaml
tls:
  certificates:
    - certFile: /path/to/cert.crt
      keyFile: /path/to/cert.key
    - certFile: /path/to/another-cert.crt
      keyFile: /path/to/another-key.key
      stores:
        - default
```

### TLS Options

```yaml
tls:
  options:
    modern:
      minVersion: VersionTLS13
    
    default:
      minVersion: VersionTLS12
      cipherSuites:
        - TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
        - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
      sniStrict: true
```

---

## Load Balancing

### Round Robin (Default)

```yaml
http:
  services:
    my-service:
      loadBalancer:
        servers:
          - url: "http://backend1:8080"
          - url: "http://backend2:8080"
          - url: "http://backend3:8080"
```

### Weighted Round Robin

```yaml
http:
  services:
    my-service:
      weighted:
        services:
          - name: service1
            weight: 3
          - name: service2
            weight: 1
```

### Sticky Sessions

```yaml
http:
  services:
    my-service:
      loadBalancer:
        servers:
          - url: "http://backend1:8080"
          - url: "http://backend2:8080"
        sticky:
          cookie:
            name: sticky_session
            secure: true
            httpOnly: true
```

### Health Checks

```yaml
http:
  services:
    my-service:
      loadBalancer:
        servers:
          - url: "http://backend1:8080"
          - url: "http://backend2:8080"
        healthCheck:
          path: /health
          interval: 10s
          timeout: 3s
          scheme: http
          followRedirects: true
          headers:
            X-Health-Check: "true"
```

---

## Observability

### Dashboard

```yaml
api:
  dashboard: true
  insecure: false  # Require auth for dashboard
```

Access at: `http://traefik.example.com/dashboard/`

### Prometheus Metrics

```yaml
metrics:
  prometheus:
    entryPoint: metrics
    addEntryPointsLabels: true
    addRoutersLabels: true
    addServicesLabels: true
    buckets:
      - 0.1
      - 0.3
      - 1.2
      - 5.0
```

**Scrape Configuration:**
```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'traefik'
    static_configs:
      - targets: ['traefik:8082']
```

### Access Logs

```yaml
accessLog:
  filePath: /var/log/traefik/access.log
  format: json
  bufferingSize: 100
  filters:
    statusCodes:
      - 200
      - 300-302
    retryAttempts: true
    minDuration: 10ms
  fields:
    defaultMode: keep
    headers:
      defaultMode: drop
      names:
        User-Agent: keep
        Authorization: drop
```

### Distributed Tracing

**Jaeger:**
```yaml
tracing:
  jaeger:
    samplingServerURL: http://jaeger:5778/sampling
    localAgentHostPort: jaeger:6831
```

**Zipkin:**
```yaml
tracing:
  zipkin:
    httpEndpoint: http://zipkin:9411/api/v2/spans
    sameSpan: true
    id128Bit: true
```

---

## Kubernetes Integration

### IngressRoute (CRD)

```yaml
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: myapp
  namespace: default
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`myapp.example.com`)
      kind: Rule
      services:
        - name: myapp-service
          port: 80
      middlewares:
        - name: compress
        - name: ratelimit
  tls:
    certResolver: letsencrypt
```

### Middleware (CRD)

```yaml
apiVersion: traefik.io/v1alpha1
kind: Middleware
metadata:
  name: ratelimit
spec:
  rateLimit:
    average: 100
    burst: 50

---
apiVersion: traefik.io/v1alpha1
kind: Middleware
metadata:
  name: compress
spec:
  compress: {}
```

### TCP/UDP Routing

```yaml
apiVersion: traefik.io/v1alpha1
kind: IngressRouteTCP
metadata:
  name: postgres
spec:
  entryPoints:
    - postgres
  routes:
    - match: HostSNI(`*`)
      services:
        - name: postgres-service
          port: 5432
```

---

## Traefik vs Other Solutions

| Feature | Traefik | Kong | NGINX | HAProxy | Envoy |
|---------|---------|------|-------|---------|-------|
| **Auto-Discovery** | ✅ Native | ⚠️ Limited | ❌ | ❌ | ✅ |
| **Let's Encrypt** | ✅ Built-in | ⚠️ Plugin | ❌ | ❌ | ⚠️ Via cert-manager |
| **Dashboard** | ✅ Native | ✅ Enterprise | ⚠️ Plus only | ⚠️ Stats page | ⚠️ External UI |
| **Config Reload** | ✅ Hot reload | ✅ | ❌ Restart needed | ⚠️ Graceful reload | ✅ |
| **Kubernetes** | ✅ Native CRDs | ✅ Ingress | ✅ Ingress | ⚠️ Third-party | ✅ |
| **Docker** | ✅ Labels | ✅ | ❌ | ❌ | ⚠️ |
| **Learning Curve** | Low | Medium | Medium | Medium | High |
| **Performance** | Very Good | Excellent | Excellent | Excellent | Excellent |
| **License** | Apache 2.0 | Apache 2.0 | Open Core | GPL/Commercial | Apache 2.0 |

**Choose Traefik when:**
- Building cloud-native applications
- Need automatic service discovery
- Want easy Let's Encrypt integration
- Deploying on Docker/Kubernetes
- Prefer simple, declarative config
- Need fast iteration and hot reload

---

## Real-World Use Cases

### 1. Multi-Service Docker Application

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v3.0
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    command:
      - --providers.docker=true
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443

  frontend:
    image: myapp/frontend
    labels:
      - "traefik.http.routers.frontend.rule=Host(`example.com`)"
  
  api:
    image: myapp/api
    labels:
      - "traefik.http.routers.api.rule=Host(`example.com`) && PathPrefix(`/api`)"
      - "traefik.http.middlewares.api-strip.stripprefix.prefixes=/api"
      - "traefik.http.routers.api.middlewares=api-strip"
```

### 2. Blue-Green Deployment

```yaml
http:
  routers:
    app-router:
      rule: "Host(`app.example.com`)"
      service: app-weighted
  
  services:
    app-weighted:
      weighted:
        services:
          - name: app-blue
            weight: 90  # 90% to blue
          - name: app-green
            weight: 10  # 10% to green (canary)
    
    app-blue:
      loadBalancer:
        servers:
          - url: "http://app-blue:8080"
    
    app-green:
      loadBalancer:
        servers:
          - url: "http://app-green:8080"
```

### 3. Multi-Tenant Platform

```yaml
# Tenant 1
http:
  routers:
    tenant1:
      rule: "Host(`tenant1.example.com`)"
      service: tenant1-service
      middlewares:
        - tenant1-ratelimit
  
  middlewares:
    tenant1-ratelimit:
      rateLimit:
        average: 1000  # Premium tier

# Tenant 2
  routers:
    tenant2:
      rule: "Host(`tenant2.example.com`)"
      service: tenant2-service
      middlewares:
        - tenant2-ratelimit
  
  middlewares:
    tenant2-ratelimit:
      rateLimit:
        average: 100  # Free tier
```

---

## Best Practices

### 1. Security

✅ **Use HTTPS Everywhere**
```yaml
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"
```

✅ **Secure Dashboard**
```yaml
# Don't use insecure mode in production
api:
  dashboard: true
  insecure: false

# Protect with middleware
labels:
  - "traefik.http.routers.dashboard.middlewares=auth@file"
```

✅ **Limit Admin API Access**
```yaml
# Bind to localhost only
api:
  insecure: false
```

### 2. Performance

✅ **Enable Compression**
```yaml
http:
  middlewares:
    compress:
      compress:
        excludedContentTypes:
          - text/event-stream
```

✅ **Use Connection Pooling**
```yaml
http:
  serversTransports:
    default:
      maxIdleConnsPerHost: 100
```

### 3. Reliability

✅ **Configure Health Checks**
```yaml
http:
  services:
    myservice:
      loadBalancer:
        healthCheck:
          path: /health
          interval: 10s
          timeout: 3s
```

✅ **Use Circuit Breakers**
```yaml
http:
  middlewares:
    cb:
      circuitBreaker:
        expression: "NetworkErrorRatio() > 0.30"
```

### 4. Monitoring

✅ **Enable Metrics**
```yaml
metrics:
  prometheus:
    entryPoint: metrics
```

✅ **Configure Access Logs**
```yaml
accessLog:
  format: json
  fields:
    defaultMode: keep
```

---

## Resources

### Official Documentation
- **Traefik Docs**: https://doc.traefik.io/traefik/
- **Getting Started**: https://doc.traefik.io/traefik/getting-started/quick-start/
- **Configuration Reference**: https://doc.traefik.io/traefik/reference/static-configuration/file/

### Tools
- **Traefik Pilot**: Cloud-native networking platform
- **Traefik Hub**: API Gateway and management
- **Traefik Plugin Catalog**: https://plugins.traefik.io/

### Community
- **GitHub**: https://github.com/traefik/traefik
- **Community Forum**: https://community.traefik.io/
- **Slack**: https://traefik.io/slack
- **Blog**: https://traefik.io/blog/

### Tutorials
- **Traefik with Docker**: https://doc.traefik.io/traefik/providers/docker/
- **Traefik on Kubernetes**: https://doc.traefik.io/traefik/providers/kubernetes-ingress/
- **Let's Encrypt Setup**: https://doc.traefik.io/traefik/https/acme/

### Example Repositories
- **Traefik Examples**: https://github.com/traefik/traefik/tree/master/docs/content/user-guides
- **Docker Compose Examples**: https://github.com/traefik/traefik/tree/master/docs/content/user-guides/docker-compose

---

**Last Updated**: February 2026  
**Traefik Version**: 3.0+
