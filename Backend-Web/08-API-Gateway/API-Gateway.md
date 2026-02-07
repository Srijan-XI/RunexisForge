# API Gateway - Overview & Management

## Table of Contents
- [Introduction](#introduction)
- [Why API Gateway?](#why-api-gateway)
- [Core Concepts](#core-concepts)
- [Key Functions](#key-functions)
- [Architecture Patterns](#architecture-patterns)
- [Gateway Capabilities](#gateway-capabilities)
- [Security Features](#security-features)
- [Traffic Management](#traffic-management)
- [Observability](#observability)
- [Gateway Selection Guide](#gateway-selection-guide)
- [Deployment Patterns](#deployment-patterns)
- [Management Best Practices](#management-best-practices)
- [Common Use Cases](#common-use-cases)
- [API Gateway vs Other Patterns](#api-gateway-vs-other-patterns)
- [Resources](#resources)

---

## Introduction

An **API Gateway** is a server that acts as a unified entry point for all client requests to backend services. It sits between clients and microservices, handling cross-cutting concerns such as authentication, rate limiting, load balancing, and request routing.

### Key Characteristics

- **Single Entry Point**: Unified interface for all backend services
- **Request Routing**: Directs requests to appropriate microservices
- **Protocol Translation**: Converts between protocols (HTTP, gRPC, WebSocket)
- **Aggregation**: Combines multiple service calls into one response
- **Cross-Cutting Concerns**: Centralized auth, logging, rate limiting
- **Service Abstraction**: Hides internal service architecture from clients

### API Gateway Role

```
┌─────────────────────────────────────────────────────────┐
│                    External Clients                     │
│     (Web Apps, Mobile Apps, Third-Party Services)       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   API Gateway                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  • Authentication & Authorization                │   │
│  │  • Rate Limiting & Throttling                   │   │
│  │  • Request Routing & Load Balancing              │   │
│  │  • Protocol Translation                          │   │
│  │  • Request/Response Transformation               │   │
│  │  • Logging, Monitoring & Analytics               │   │
│  │  • Caching                                       │   │
│  │  • SSL/TLS Termination                           │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│               Backend Microservices                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ User     │  │ Order    │  │ Payment  │   ...       │
│  │ Service  │  │ Service  │  │ Service  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
```

---

## Why API Gateway?

### Benefits

✅ **Simplified Client Communication**
- Single endpoint for all services
- Consistent API interface
- Reduced client complexity
- Fewer network round trips

✅ **Centralized Cross-Cutting Concerns**
- Authentication/Authorization in one place
- Consistent rate limiting
- Unified logging and monitoring
- Single point for SSL/TLS

✅ **Service Abstraction**
- Hide internal microservices architecture
- Change backend without affecting clients
- Service versioning management
- Protocol independence

✅ **Enhanced Security**
- Single security perimeter
- DDoS protection
- IP whitelisting/blacklisting
- Request validation

✅ **Performance Optimization**
- Response caching
- Request/response compression
- Connection pooling
- Load balancing

✅ **Operational Benefits**
- Centralized monitoring
- A/B testing support
- Canary deployments
- Traffic shaping

### Problems API Gateway Solves

| Problem | Without Gateway | With Gateway |
|---------|----------------|--------------|
| **Multiple Service Calls** | Client makes 5+ API calls | Gateway aggregates into 1 call |
| **Cross-Origin Requests** | CORS issues on multiple domains | Single origin for all requests |
| **Authentication** | Each service implements auth | Centralized authentication |
| **Rate Limiting** | Inconsistent limits per service | Unified rate limiting policy |
| **Protocol Translation** | Client must support all protocols | Gateway translates protocols |
| **Monitoring** | Monitor 20+ services individually | Single gateway monitoring |

---

## Core Concepts

### 1. Routes

**Routes** define how incoming requests are mapped to backend services.

```yaml
# Example route configuration
routes:
  - name: user-api
    match:
      path: /api/users/*
      methods: [GET, POST, PUT, DELETE]
    backend:
      service: user-service
      port: 8080
    
  - name: order-api
    match:
      path: /api/orders/*
      headers:
        - x-api-version: v2
    backend:
      service: order-service-v2
      port: 8081
```

### 2. Upstreams

**Upstreams** define the backend services and how to load balance between them.

```yaml
upstreams:
  - name: user-service
    algorithm: round-robin
    targets:
      - host: user-service-1.internal
        port: 8080
        weight: 100
      - host: user-service-2.internal
        port: 8080
        weight: 100
    healthcheck:
      path: /health
      interval: 10s
      timeout: 5s
```

### 3. Plugins/Middleware

**Plugins** add functionality to routes (authentication, rate limiting, etc.).

```yaml
plugins:
  - name: jwt-auth
    enabled: true
    config:
      secret: ${JWT_SECRET}
  
  - name: rate-limit
    enabled: true
    config:
      requests_per_minute: 100
  
  - name: cors
    enabled: true
    config:
      allow_origins: 
        - https://example.com
```

### 4. Consumers

**Consumers** represent API users/applications with credentials and access policies.

```yaml
consumers:
  - name: mobile-app
    credentials:
      api_key: ${MOBILE_APP_API_KEY}
    rate_limits:
      requests_per_hour: 10000
  
  - name: partner-api
    credentials:
      oauth_client_id: ${PARTNER_CLIENT_ID}
    rate_limits:
      requests_per_hour: 50000
```

---

## Key Functions

### 1. Request Routing

```javascript
// Path-based routing
/api/users/*     → User Service
/api/orders/*    → Order Service
/api/payments/*  → Payment Service

// Header-based routing
X-API-Version: v1  → Legacy Service
X-API-Version: v2  → New Service

// Host-based routing
api.example.com    → Public API
partner.example.com → Partner API
internal.example.com → Internal API
```

### 2. Load Balancing

```
Client Request
      │
      ▼
┌─────────────┐
│ API Gateway │
└──────┬──────┘
       │ (Round Robin)
       ├──────────┬──────────┬──────────┐
       ▼          ▼          ▼          ▼
   Service-1  Service-2  Service-3  Service-4
   (25%)      (25%)      (25%)      (25%)
```

### 3. Authentication & Authorization

```javascript
// Gateway handles authentication
Client Request
  ↓
API Gateway
  ↓ Validate Token
  ↓ Check Permissions
  ↓ Add User Context to Request
  ↓
Backend Service (no auth logic needed)
```

### 4. Rate Limiting

```javascript
// Centralized rate limiting
API Gateway enforces:
- 100 requests/minute per IP
- 1000 requests/hour per API key
- 10 requests/minute for login endpoint
```

### 5. Request/Response Transformation

```javascript
// Transform request
Client sends: GET /users?page=1
Gateway transforms: GET /v2/users?offset=0&limit=20

// Transform response
Backend returns: { userId: 123, userName: "john" }
Gateway transforms: { id: 123, name: "john" }
```

### 6. Protocol Translation

```
HTTP/REST Client → API Gateway → gRPC Service
WebSocket Client → API Gateway → HTTP Service
GraphQL Client  → API Gateway → Multiple REST Services
```

---

## Architecture Patterns

### 1. Single Gateway (Monolithic)

```
All Clients → Single API Gateway → All Backend Services
```

**Pros:**
- Simple to manage
- Single endpoint
- Centralized control

**Cons:**
- Single point of failure
- Scaling limitations
- Can become bottleneck

### 2. Multiple Gateways (Per Client Type)

```
Web Clients    → Web Gateway    → Backend Services
Mobile Clients → Mobile Gateway → Backend Services
Partner APIs   → Partner Gateway → Backend Services
```

**Pros:**
- Optimized per client type
- Independent scaling
- Failure isolation

**Cons:**
- More complexity
- Duplicate configuration
- Higher operational cost

### 3. Backend for Frontend (BFF)

```
Web App     → Web BFF    ↘
Mobile App  → Mobile BFF  → Backend Services
IoT Devices → IoT BFF    ↗
```

**Pros:**
- Tailored responses per client
- Reduced over-fetching
- Client-specific optimization

**Cons:**
- More gateways to maintain
- Potential code duplication
- Team coordination needed

### 4. Federated Gateway (Microgateway per Service)

```
             Main Gateway
                  │
     ┌────────────┼────────────┐
     ▼            ▼            ▼
User Gateway  Order Gateway  Payment Gateway
     │            │            │
     ▼            ▼            ▼
User Service  Order Service  Payment Service
```

**Pros:**
- Service autonomy
- Isolated failures
- Independent deployment

**Cons:**
- Complex service discovery
- Increased latency
- Harder to implement cross-cutting concerns

---

## Gateway Capabilities

### Comparison of Popular Gateways

| Feature | Kong | Traefik | NGINX Plus | AWS API Gateway | Apigee |
|---------|------|---------|------------|-----------------|--------|
| **Open Source** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Cloud-Native** | ✅ | ✅ | ⚠️ | ✅ | ⚠️ |
| **Auto-Discovery** | ⚠️ | ✅ | ❌ | ❌ | ❌ |
| **Plugin System** | ✅ 100+ | ✅ Middleware | ✅ Modules | ⚠️ Limited | ✅ |
| **Protocol Support** | HTTP/gRPC/WS/TCP | HTTP/TCP/UDP | HTTP/TCP/UDP | HTTP/REST | HTTP/SOAP/REST |
| **Rate Limiting** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **OAuth/JWT** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **GraphQL** | ✅ Plugin | ❌ | ⚠️ | ❌ | ⚠️ |
| **Service Mesh** | Kong Mesh | Traefik Mesh | ❌ | App Mesh | Apigee hybrid |
| **Developer Portal** | ✅ Enterprise | ❌ | ❌ | ✅ | ✅ |
| **Analytics** | ✅ | ⚠️ Metrics | ✅ | ✅ | ✅ |
| **Deployment** | Self-hosted/Cloud | Self-hosted | Self-hosted | Managed | Managed/Hybrid |
| **Pricing** | Free + Enterprise | Free + Enterprise | $$$$ | Pay-per-use | $$$$$$ |

**See detailed comparisons:**
- [Kong API Gateway](Kong/Kong.md)
- [Traefik](Traefik/Traefik.md)

---

## Security Features

### 1. Authentication Methods

```yaml
# API Key Authentication
plugins:
  - api-key-auth:
      key_names: [x-api-key]
      hide_credentials: true

# JWT Authentication
plugins:
  - jwt-auth:
      uri_param_names: [jwt]
      cookie_names: [auth_token]
      claims_to_verify: [exp, nbf]

# OAuth 2.0
plugins:
  - oauth2:
      scopes: [read, write, admin]
      mandatory_scope: true
      
# Basic Auth
plugins:
  - basic-auth:
      hide_credentials: true
```

### 2. Authorization

```yaml
# Role-Based Access Control (RBAC)
acl:
  - consumer: mobile-app
    allowed_groups: [users, premium]
  
  - consumer: admin-panel
    allowed_groups: [admins]

# Scope-Based Authorization
authorization:
  - endpoint: /api/users
    required_scopes: [users:read]
  
  - endpoint: /api/admin/*
    required_scopes: [admin:full]
```

### 3. IP Filtering

```yaml
# IP Whitelist
ip-restriction:
  allow:
    - 192.168.1.0/24
    - 10.0.0.0/8
  
# IP Blacklist
ip-restriction:
  deny:
    - 203.0.113.0/24
```

### 4. Request Validation

```yaml
# Schema Validation
request-validator:
  body_schema:
    type: object
    required: [name, email]
    properties:
      name:
        type: string
        minLength: 1
      email:
        type: string
        format: email

# Size Limits
request-size-limiting:
  allowed_payload_size: 10  # MB
```

---

## Traffic Management

### 1. Load Balancing Algorithms

```yaml
# Round Robin
load_balancing:
  algorithm: round-robin

# Least Connections
load_balancing:
  algorithm: least-connections

# IP Hash (Sticky Sessions)
load_balancing:
  algorithm: ip-hash

# Weighted Round Robin
upstreams:
  targets:
    - url: http://server1:8080
      weight: 3
    - url: http://server2:8080
      weight: 1
```

### 2. Circuit Breaker

```yaml
circuit-breaker:
  failure_threshold: 5         # Failures before opening
  success_threshold: 2         # Successes to close
  timeout: 30s                 # Time before retry
  half_open_requests: 3        # Test requests in half-open
```

### 3. Retry Logic

```yaml
retry:
  attempts: 3
  per_try_timeout: 5s
  retry_on:
    - 5xx
    - gateway-error
    - connect-failure
  backoff:
    base_interval: 100ms
    max_interval: 10s
```

### 4. Timeouts

```yaml
timeouts:
  connect: 5s
  send: 60s
  read: 60s
  request: 120s  # Total request timeout
```

### 5. Canary Deployments

```yaml
# Traffic splitting
routes:
  - name: production
    service: app-v1
    weight: 90  # 90% traffic
  
  - name: canary
    service: app-v2
    weight: 10  # 10% traffic
```

---

## Observability

### 1. Logging

```yaml
# Access Logs
logging:
  access_log:
    enabled: true
    format: json
    fields:
      - timestamp
      - client_ip
      - method
      - path
      - status
      - response_time
      - user_agent

# Error Logs
logging:
  error_log:
    enabled: true
    level: warn
```

### 2. Metrics

```yaml
# Prometheus Metrics
metrics:
  prometheus:
    enabled: true
    endpoint: /metrics
    
# Key metrics exposed:
# - http_requests_total
# - http_request_duration_seconds
# - http_requests_in_flight
# - upstream_response_time
```

### 3. Distributed Tracing

```yaml
# Jaeger Integration
tracing:
  jaeger:
    enabled: true
    agent_host: jaeger-agent
    agent_port: 6831
    sampler_type: probabilistic
    sampler_param: 0.1  # 10% sampling

# Trace headers propagation
propagation:
  - x-request-id
  - x-b3-traceid
  - x-b3-spanid
```

### 4. Health Checks

```yaml
# Active Health Checks
healthcheck:
  active:
    enabled: true
    http_path: /health
    interval: 10s
    timeout: 5s
    healthy_threshold: 2
    unhealthy_threshold: 3

# Passive Health Checks
healthcheck:
  passive:
    enabled: true
    unhealthy:
      http_statuses: [500, 503]
      tcp_failures: 3
      timeouts: 3
```

---

## Gateway Selection Guide

### Choose Kong When:

✅ Need extensive plugin ecosystem  
✅ Enterprise features required (RBAC, dev portal)  
✅ High-performance requirements  
✅ Multi-protocol support needed  
✅ Existing NGINX expertise  

### Choose Traefik When:

✅ Running Kubernetes/Docker environments  
✅ Need automatic service discovery  
✅ Want built-in Let's Encrypt  
✅ Prefer simple configuration  
✅ Dynamic routing requirements  

### Choose NGINX Plus When:

✅ High-performance static proxying  
✅ Complex load balancing needs  
✅ Enterprise support required  
✅ Existing NGINX configurations  

### Choose AWS API Gateway When:

✅ Already on AWS ecosystem  
✅ Want fully managed solution  
✅ Serverless architecture (Lambda)  
✅ Pay-per-use model preferred  

### Choose Apigee When:

✅ Enterprise API management needed  
✅ Extensive analytics requirements  
✅ Developer portal essential  
✅ API monetization planned  

---

## Deployment Patterns

### 1. Container-Based Deployment

```yaml
# Docker Compose
version: '3.8'
services:
  gateway:
    image: kong:3.4
    ports:
      - "8000:8000"
      - "8443:8443"
    environment:
      KONG_DATABASE: postgres
      KONG_PG_HOST: db
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: kong
```

### 2. Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: gateway
  template:
    metadata:
      labels:
        app: gateway
    spec:
      containers:
        - name: gateway
          image: traefik:v3.0
          ports:
            - containerPort: 80
            - containerPort: 443
---
apiVersion: v1
kind: Service
metadata:
  name: api-gateway
spec:
  type: LoadBalancer
  selector:
    app: gateway
  ports:
    - port: 80
      targetPort: 80
    - port: 443
      targetPort: 443
```

### 3. High Availability Setup

```
          Load Balancer
               │
     ┌─────────┼─────────┐
     ▼         ▼         ▼
Gateway-1  Gateway-2  Gateway-3
     │         │         │
     └─────────┼─────────┘
               │
     ┌─────────┴─────────┐
     ▼                   ▼
Database (Primary)   Database (Replica)
```

---

## Management Best Practices

### 1. Configuration Management

✅ **Use Declarative Configuration**
```yaml
# Store configuration in Git
# Version control all changes
# Enable GitOps workflows

_format_version: "3.0"
services: [...]
routes: [...]
plugins: [...]
```

✅ **Environment-Specific Configs**
```bash
# Use environment variables
DATABASE_URL=${DB_URL}
API_KEY=${API_KEY}

# Separate configs per environment
config/
  ├── dev.yaml
  ├── staging.yaml
  └── prod.yaml
```

### 2. Security Hardening

✅ **Minimize Admin API Exposure**
```yaml
# Restrict admin API access
admin_listen: 127.0.0.1:8001  # Localhost only

# Use RBAC
rbac:
  enabled: true
  admin_role: admin
```

✅ **Enable TLS Everywhere**
```yaml
# Force HTTPS
force_ssl: true

# Minimum TLS version
min_tls_version: 1.2
```

### 3. Performance Optimization

✅ **Enable Caching**
```yaml
cache:
  strategy: memory
  ttl: 300  # 5 minutes
  negative_ttl: 60
```

✅ **Connection Pooling**
```yaml
upstream:
  keepalive: 100
  keepalive_timeout: 60s
```

### 4. Monitoring & Alerting

✅ **Define SLIs/SLOs**
```yaml
slo:
  availability: 99.9%
  latency_p95: 200ms
  error_rate: < 0.1%
```

✅ **Set Up Alerts**
```yaml
alerts:
  - name: high_error_rate
    condition: error_rate > 1%
    duration: 5m
    
  - name: high_latency
    condition: p95_latency > 500ms
    duration: 10m
```

### 5. Versioning & Rollback

✅ **Version All Changes**
```bash
# Tag configuration versions
git tag v1.2.3 -m "Add rate limiting to users endpoint"
```

✅ **Test Before Production**
```bash
# Staging environment first
deploy_to_staging()
run_integration_tests()
deploy_to_production()
```

---

## Common Use Cases

### 1. Microservices Architecture

```
Mobile/Web Clients
        │
        ▼
   API Gateway
        │
    ┌───┴────┬────────┬─────────┐
    ▼        ▼        ▼         ▼
  Users   Orders  Products  Payments
  Service Service  Service   Service
```

### 2. Legacy System Modernization

```
Modern Clients
       │
       ▼
  API Gateway ────┐
       │          │
   ┌───┴───┐      │
   ▼       ▼      ▼
New APIs  Legacy  
          APIs   (gradual migration)
```

### 3. Multi-Cloud API Management

```
Clients
   │
   ▼
API Gateway
   │
   ├──> AWS Services
   ├──> Azure Services
   └──> GCP Services
```

### 4. Partner API Management

```
Partners → Partner Gateway → Rate Limiting
                            → Authentication
                            → Analytics
                            → Internal Services
```

---

## API Gateway vs Other Patterns

### API Gateway vs Load Balancer

| Aspect | API Gateway | Load Balancer |
|--------|-------------|---------------|
| **Purpose** | API management | Traffic distribution |
| **Layer** | Application (L7) | Network (L4) or App (L7) |
| **Features** | Auth, rate limit, transform | Balance, health check |
| **Intelligence** | Request routing, aggregation | Simple distribution |
| **Use Case** | Microservices | Web servers |

### API Gateway vs Service Mesh

| Aspect | API Gateway | Service Mesh |
|--------|-------------|--------------|
| **Scope** | External traffic | Internal traffic |
| **Location** | Edge | Between services |
| **Purpose** | Entry point | Service-to-service |
| **Examples** | Kong, Apigee | Istio, Linkerd |
| **Deployment** | Centralized | Distributed (sidecars) |

### API Gateway vs Reverse Proxy

| Aspect | API Gateway | Reverse Proxy |
|--------|-------------|---------------|
| **Complexity** | High (many features) | Low (basic proxying) |
| **Management** | API-specific | General HTTP |
| **Features** | Auth, rate limit, analytics | Cache, SSL, basics |
| **Use Case** | API platform | Web application |

---

## Resources

### API Gateway Solutions
- **Kong**: [Kong API Gateway](Kong/Kong.md)
- **Traefik**: [Traefik](Traefik/Traefik.md)
- **NGINX**: https://www.nginx.com/products/nginx-api-gateway/
- **AWS API Gateway**: https://aws.amazon.com/api-gateway/
- **Azure API Management**: https://azure.microsoft.com/en-us/services/api-management/
- **Google Cloud API Gateway**: https://cloud.google.com/api-gateway

### Standards & Best Practices
- **OpenAPI Specification**: https://swagger.io/specification/
- **API Gateway Pattern**: https://microservices.io/patterns/apigateway.html
- **Backend for Frontend Pattern**: https://samnewman.io/patterns/architectural/bff/

### Books & Articles
- "Building Microservices" by Sam Newman
- "Microservices Patterns" by Chris Richardson
- "API Design Patterns" by JJ Geewax
- "The API Gateway" - Martin Fowler: https://martinfowler.com/articles/gateway.html

### Community
- **Kong Community**: https://discuss.konghq.com/
- **Traefik Community**: https://community.traefik.io/
- **API Gateway Subreddit**: https://reddit.com/r/apigateways

---

**Last Updated**: February 2026  
**Version**: 1.0
