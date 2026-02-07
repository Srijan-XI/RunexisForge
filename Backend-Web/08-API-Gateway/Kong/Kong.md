# Kong API Gateway

## Table of Contents
- [Introduction](#introduction)
- [Why Kong?](#why-kong)
- [Core Concepts](#core-concepts)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Plugin System](#plugin-system)
- [Authentication & Security](#authentication--security)
- [Rate Limiting & Traffic Control](#rate-limiting--traffic-control)
- [Service Mesh Integration](#service-mesh-integration)
- [Monitoring & Observability](#monitoring--observability)
- [Kong vs Other Gateways](#kong-vs-other-gateways)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

Kong is a cloud-native, platform-agnostic, scalable **API Gateway** built on top of NGINX. It acts as a middleware between clients and backend services, providing a centralized layer for managing, securing, and monitoring API traffic.

### Key Characteristics

- **Open Source**: Core features available under Apache 2.0 license
- **Cloud-Native**: Designed for Kubernetes and microservices
- **Plugin-Based**: Extensible architecture with 100+ plugins
- **High Performance**: Built on NGINX/OpenResty (LuaJIT)
- **Database Options**: PostgreSQL, Cassandra, or DB-less (declarative)
- **Multi-Protocol**: HTTP/HTTPS, gRPC, WebSocket, TCP/TLS

### Kong Editions

| Edition | Description | Use Case |
|---------|-------------|----------|
| **Kong Gateway (OSS)** | Open-source core | Small to medium deployments |
| **Kong Enterprise** | Commercial with advanced features | Enterprise production |
| **Kong Konnect** | Fully managed SaaS platform | Cloud-native organizations |

---

## Why Kong?

### Benefits

✅ **Performance**
- Built on NGINX for high throughput
- Low latency (sub-millisecond overhead)
- Handles 100,000+ requests per second
- Efficient resource utilization

✅ **Scalability**
- Horizontal scaling (stateless)
- Clustering support
- Cloud-native architecture
- Auto-scaling capabilities

✅ **Extensibility**
- 100+ official plugins
- Custom plugin development (Lua, Go, Python)
- OpenAPI specification support
- Webhook and serverless integration

✅ **Developer Experience**
- RESTful Admin API
- Declarative configuration (YAML)
- SDKs and CLI tools
- Comprehensive documentation

✅ **Enterprise Ready**
- RBAC and workspace isolation
- Multi-team management
- Audit logging
- Compliance support (PCI-DSS, HIPAA)

### Use Cases

- **API Management**: Centralized API control and governance
- **Microservices Gateway**: Service-to-service communication
- **Authentication Hub**: Centralized auth (OAuth, JWT, OIDC)
- **Rate Limiting**: Traffic control and protection
- **Protocol Translation**: HTTP to gRPC, REST to GraphQL
- **Multi-Cloud**: Unified gateway across cloud providers

---

## Core Concepts

### Services

A **Service** represents a backend API or microservice that Kong will proxy to.

```yaml
services:
  - name: user-service
    url: http://users-api.internal:8080
    protocol: http
    retries: 5
    connect_timeout: 60000
    read_timeout: 60000
```

### Routes

A **Route** defines how requests are forwarded to services based on:
- Hostname
- Path
- HTTP method
- Headers

```yaml
routes:
  - name: user-routes
    service: user-service
    paths:
      - /api/users
    methods:
      - GET
      - POST
    strip_path: true
```

### Plugins

**Plugins** extend Kong functionality for:
- Authentication
- Security
- Traffic control
- Logging & monitoring
- Transformations

```yaml
plugins:
  - name: rate-limiting
    service: user-service
    config:
      minute: 100
      hour: 1000
      policy: local
```

### Consumers

**Consumers** represent API users/applications:

```yaml
consumers:
  - username: mobile-app
    custom_id: app-12345
```

### Upstreams & Targets

**Upstreams** manage load balancing across multiple backend instances:

```yaml
upstreams:
  - name: user-service-upstream
    targets:
      - target: 10.0.1.10:8080
        weight: 100
      - target: 10.0.1.11:8080
        weight: 100
    healthchecks:
      active:
        healthy:
          interval: 5
          successes: 2
```

---

## Architecture

### Kong Gateway Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Client Layer                       │
│         (Mobile Apps, Web Apps, Third Parties)          │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                    Kong Gateway                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Routing Layer (NGINX/OpenResty)                 │   │
│  ├──────────────────────────────────────────────────┤   │
│  │  Plugin Layer (Auth, Rate Limit, Transform)      │   │
│  ├──────────────────────────────────────────────────┤   │
│  │  Load Balancing & Health Checks                  │   │
│  └──────────────────────────────────────────────────┘   │
└────────┬────────────────────────────┬───────────────────┘
         │                            │
         ▼                            ▼
┌─────────────────┐          ┌─────────────────┐
│  Configuration  │          │   Admin API     │
│    Database     │          │   (Management)  │
│ (Postgres/     │          └─────────────────┘
│  Cassandra)     │
└─────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│               Backend Services Layer                     │
│    (Microservices, APIs, Legacy Systems)                │
└─────────────────────────────────────────────────────────┘
```

### Request Flow

1. **Client Request**: Client sends HTTP/gRPC request
2. **Routing**: Kong matches request to configured route
3. **Plugin Execution**: Runs plugins in configured order
4. **Load Balancing**: Selects healthy upstream target
5. **Proxy**: Forwards request to backend service
6. **Response Handling**: Processes response through plugins
7. **Client Response**: Returns transformed response to client

### Deployment Modes

**Database Mode (Traditional)**
```
Kong Gateway <---> PostgreSQL/Cassandra
```
- Configuration stored in database
- Dynamic updates via Admin API
- Clustering support

**DB-less Mode (Declarative)**
```
Kong Gateway <--- YAML Configuration File
```
- No database required
- Declarative config (GitOps friendly)
- Faster startup, lower complexity
- Configuration updates require reload

**Hybrid Mode (Control Plane / Data Plane)**
```
Control Plane (CP) <---> Database
        │
        ▼ (Config Push)
Data Plane (DP) ... Data Plane (DP)
```
- Separation of management and runtime
- Scale data planes independently
- Improved security (no DB on edge)

---

## Key Features

### 1. Traffic Management

**Load Balancing Algorithms:**
- Round-robin
- Least connections
- Consistent hashing
- IP hash
- Weighted round-robin

**Circuit Breaking:**
```yaml
plugins:
  - name: circuit-breaker
    config:
      window_size: 10
      failure_threshold: 5
      recovery_timeout: 30
```

**Request/Response Transformation:**
```yaml
plugins:
  - name: request-transformer
    config:
      add:
        headers:
          - "X-Request-ID: $(uuid)"
      remove:
        headers:
          - "X-Internal-Token"
```

### 2. Security Features

**IP Restriction:**
```yaml
plugins:
  - name: ip-restriction
    config:
      allow:
        - 10.0.0.0/8
        - 192.168.0.0/16
```

**CORS Support:**
```yaml
plugins:
  - name: cors
    config:
      origins:
        - https://example.com
      methods:
        - GET
        - POST
      headers:
        - Authorization
      max_age: 3600
```

**Bot Detection:**
```yaml
plugins:
  - name: bot-detection
    config:
      deny:
        - "^.*curl.*$"
        - "^.*python.*$"
```

### 3. Caching

**Proxy Caching:**
```yaml
plugins:
  - name: proxy-cache
    config:
      strategy: memory
      content_type:
        - application/json
      cache_ttl: 300
      cache_control: true
```

### 4. Service Discovery

**DNS-Based Discovery:**
```yaml
upstreams:
  - name: my-service
    targets:
      - target: my-service.default.svc.cluster.local:80
```

**Kubernetes Service Discovery:**
- Automatic service registration
- Native Kubernetes integration
- Dynamic endpoint updates

---

## Installation & Setup

### Docker Installation

```bash
# Create Docker network
docker network create kong-net

# Start PostgreSQL
docker run -d --name kong-database \
  --network=kong-net \
  -e "POSTGRES_USER=kong" \
  -e "POSTGRES_DB=kong" \
  -e "POSTGRES_PASSWORD=kongpass" \
  postgres:13

# Run database migrations
docker run --rm --network=kong-net \
  -e "KONG_DATABASE=postgres" \
  -e "KONG_PG_HOST=kong-database" \
  -e "KONG_PG_PASSWORD=kongpass" \
  kong/kong-gateway:3.4 kong migrations bootstrap

# Start Kong Gateway
docker run -d --name kong-gateway \
  --network=kong-net \
  -e "KONG_DATABASE=postgres" \
  -e "KONG_PG_HOST=kong-database" \
  -e "KONG_PG_PASSWORD=kongpass" \
  -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
  -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
  -e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
  -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
  -e "KONG_ADMIN_LISTEN=0.0.0.0:8001" \
  -e "KONG_ADMIN_GUI_URL=http://localhost:8002" \
  -p 8000:8000 \
  -p 8443:8443 \
  -p 8001:8001 \
  -p 8444:8444 \
  -p 8002:8002 \
  kong/kong-gateway:3.4

# Verify installation
curl -i http://localhost:8001/
```

### Kubernetes Installation (Helm)

```bash
# Add Kong Helm repository
helm repo add kong https://charts.konghq.com
helm repo update

# Install Kong with Ingress Controller
helm install kong kong/kong \
  --namespace kong \
  --create-namespace \
  --set ingressController.enabled=true \
  --set ingressController.installCRDs=false \
  --set admin.enabled=true \
  --set admin.http.enabled=true
```

### DB-less Mode Setup

```bash
# Create declarative configuration
cat > kong.yml <<EOF
_format_version: "3.0"

services:
  - name: example-service
    url: http://httpbin.org
    routes:
      - name: example-route
        paths:
          - /example

plugins:
  - name: rate-limiting
    config:
      minute: 5
      policy: local
EOF

# Start Kong in DB-less mode
docker run -d --name kong \
  -e "KONG_DATABASE=off" \
  -e "KONG_DECLARATIVE_CONFIG=/kong/declarative/kong.yml" \
  -v $(pwd)/kong.yml:/kong/declarative/kong.yml \
  -p 8000:8000 \
  -p 8001:8001 \
  kong/kong-gateway:3.4
```

---

## Configuration

### Creating a Service

**Using Admin API:**
```bash
curl -i -X POST http://localhost:8001/services \
  --data name=example-service \
  --data url=http://httpbin.org
```

**Using Declarative Config:**
```yaml
services:
  - name: example-service
    url: http://httpbin.org
    protocol: http
    port: 80
    path: /
    retries: 5
    connect_timeout: 60000
    write_timeout: 60000
    read_timeout: 60000
```

### Creating a Route

**Admin API:**
```bash
curl -i -X POST http://localhost:8001/services/example-service/routes \
  --data 'paths[]=/example' \
  --data name=example-route
```

**Declarative Config:**
```yaml
routes:
  - name: example-route
    service: example-service
    paths:
      - /example
    methods:
      - GET
      - POST
    protocols:
      - http
      - https
```

### Environment Variables

```bash
# Database Configuration
KONG_DATABASE=postgres
KONG_PG_HOST=localhost
KONG_PG_PORT=5432
KONG_PG_DATABASE=kong
KONG_PG_USER=kong
KONG_PG_PASSWORD=kong

# Proxy Configuration
KONG_PROXY_LISTEN=0.0.0.0:8000, 0.0.0.0:8443 ssl
KONG_ADMIN_LISTEN=0.0.0.0:8001

# Logging
KONG_LOG_LEVEL=notice
KONG_PROXY_ACCESS_LOG=/dev/stdout
KONG_ADMIN_ACCESS_LOG=/dev/stdout

# Performance
KONG_NGINX_WORKER_PROCESSES=auto
KONG_NGINX_EVENTS_WORKER_CONNECTIONS=4096
```

---

## Plugin System

### Popular Plugins

#### Authentication Plugins
- **Key Auth**: API key authentication
- **JWT**: JSON Web Token validation
- **OAuth 2.0**: OAuth 2.0 authorization
- **LDAP**: LDAP authentication
- **Basic Auth**: HTTP basic authentication
- **OIDC**: OpenID Connect (Enterprise)

#### Security Plugins
- **IP Restriction**: Allow/deny by IP
- **ACL**: Access Control Lists
- **CORS**: Cross-Origin Resource Sharing
- **Bot Detection**: Block malicious bots
- **Request Size Limiting**: Limit request body size

#### Traffic Control
- **Rate Limiting**: Request rate limiting
- **Response Rate Limiting**: Rate limit by response
- **Request Termination**: Block requests conditionally
- **Proxy Cache**: Response caching

#### Transformations
- **Request Transformer**: Modify request
- **Response Transformer**: Modify response
- **Correlation ID**: Add tracking IDs

#### Logging & Monitoring
- **File Log**: Log to file
- **HTTP Log**: Send logs to HTTP endpoint
- **Datadog**: Datadog integration
- **Prometheus**: Metrics for Prometheus
- **StatsD**: StatsD metrics
- **Zipkin/Jaeger**: Distributed tracing

### Enabling Plugins

**Globally:**
```bash
curl -X POST http://localhost:8001/plugins \
  --data name=rate-limiting \
  --data config.minute=100
```

**On a Service:**
```bash
curl -X POST http://localhost:8001/services/example-service/plugins \
  --data name=key-auth
```

**On a Route:**
```bash
curl -X POST http://localhost:8001/routes/example-route/plugins \
  --data name=cors \
  --data config.origins=https://example.com
```

### Custom Plugin Development

**Plugin Structure (Lua):**
```lua
-- schema.lua
local typedefs = require "kong.db.schema.typedefs"

return {
  name = "my-custom-plugin",
  fields = {
    { config = {
        type = "record",
        fields = {
          { message = { type = "string", default = "Hello" } }
        }
      }
    }
  }
}

-- handler.lua
local MyHandler = {
  VERSION = "1.0.0",
  PRIORITY = 1000,
}

function MyHandler:access(conf)
  kong.response.set_header("X-Custom-Message", conf.message)
end

return MyHandler
```

---

## Authentication & Security

### JWT Authentication

```yaml
# Enable JWT plugin
plugins:
  - name: jwt
    config:
      key_claim_name: kid
      secret_is_base64: false

# Create consumer with JWT credential
consumers:
  - username: user1
    jwt_credentials:
      - key: "my-key-id"
        secret: "my-shared-secret"
```

**Testing:**
```bash
# Generate JWT token
JWT_TOKEN=$(jwt encode --secret "my-shared-secret" \
  '{"iss":"my-key-id","exp":9999999999}')

# Make authenticated request
curl -H "Authorization: Bearer $JWT_TOKEN" \
  http://localhost:8000/protected
```

### OAuth 2.0 Integration

```yaml
plugins:
  - name: oauth2
    config:
      scopes:
        - read
        - write
      mandatory_scope: true
      enable_client_credentials: true
      enable_authorization_code: true
```

### mTLS (Mutual TLS)

```yaml
plugins:
  - name: mtls-auth
    config:
      ca_certificates:
        - cert1-id
        - cert2-id
```

---

## Rate Limiting & Traffic Control

### Rate Limiting Plugin

```yaml
plugins:
  - name: rate-limiting
    config:
      minute: 100
      hour: 10000
      policy: redis
      redis:
        host: redis.example.com
        port: 6379
        database: 0
      fault_tolerant: true
      hide_client_headers: false
```

**Rate Limiting Policies:**
- **local**: In-memory (single node)
- **cluster**: Distributed (requires database)
- **redis**: Redis-backed (recommended for multi-node)

### Advanced Rate Limiting (Enterprise)

```yaml
plugins:
  - name: rate-limiting-advanced
    config:
      limit:
        - 100
      window_size:
        - 60
      identifier: consumer
      sync_rate: 10
      namespace: my-namespace
      strategy: cluster
      dictionary_name: kong_rate_limiting_counters
```

### Response Rate Limiting

```yaml
plugins:
  - name: response-ratelimiting
    config:
      limits:
        video:
          minute: 10
        audio:
          minute: 20
```

---

## Service Mesh Integration

### Kong Mesh (Enterprise)

Kong Mesh is a full-featured service mesh built on Envoy and Kuma:

- **Traffic Management**: Advanced routing, load balancing
- **Security**: mTLS, encryption, zero-trust networking
- **Observability**: Distributed tracing, metrics, logs
- **Multi-Cloud**: Unified mesh across clouds and zones

**Architecture:**
```
┌─────────────────────────────────────────┐
│           Control Plane                 │
│  (Kong Mesh / Kuma)                     │
└──────────┬──────────────────────────────┘
           │
           ▼ (Configuration)
┌─────────────────────────────────────────┐
│         Data Plane Proxies              │
│  (Envoy Sidecars with Services)         │
└─────────────────────────────────────────┘
```

### Kubernetes Ingress Controller

Kong can act as a Kubernetes Ingress Controller:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    konghq.com/protocols: https
    konghq.com/https-redirect-status-code: "301"
spec:
  ingressClassName: kong
  rules:
    - host: example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 80
```

---

## Monitoring & Observability

### Prometheus Integration

```yaml
plugins:
  - name: prometheus
    config:
      per_consumer: true
```

**Metrics Endpoint:**
```bash
curl http://localhost:8001/metrics
```

**Key Metrics:**
- `kong_http_requests_total`: Total HTTP requests
- `kong_request_latency_ms`: Request latencies
- `kong_bandwidth_bytes`: Bandwidth usage
- `kong_datastore_reachable`: Database health

### Logging Plugins

**HTTP Log:**
```yaml
plugins:
  - name: http-log
    config:
      http_endpoint: https://logs.example.com/kong
      method: POST
      content_type: application/json
```

**File Log:**
```yaml
plugins:
  - name: file-log
    config:
      path: /var/log/kong/access.log
      reopen: true
```

**Datadog:**
```yaml
plugins:
  - name: datadog
    config:
      host: datadog-agent
      port: 8125
      metrics:
        - request_count
        - latency
        - request_size
        - response_size
```

### Distributed Tracing

**Zipkin:**
```yaml
plugins:
  - name: zipkin
    config:
      http_endpoint: http://zipkin:9411/api/v2/spans
      sample_ratio: 0.1
```

**Jaeger:**
```yaml
plugins:
  - name: opentelemetry
    config:
      endpoint: http://jaeger:4318/v1/traces
```

---

## Kong vs Other Gateways

| Feature | Kong | Traefik | NGINX Plus | AWS API Gateway | Apigee |
|---------|------|---------|------------|-----------------|--------|
| **License** | Apache 2.0 | MIT | Commercial | Proprietary | Commercial |
| **Performance** | Excellent | Very Good | Excellent | Good | Good |
| **Plugin System** | 100+ plugins | Middleware | Modules | Limited | Extensions |
| **Kubernetes** | Native support | Native support | Add-on | External | External |
| **Service Mesh** | Kong Mesh | Traefik Mesh | None | App Mesh | Apigee hybrid |
| **DB-less Mode** | ✅ | ✅ (default) | ✅ | N/A | ❌ |
| **Multi-Protocol** | HTTP/gRPC/WS/TCP | HTTP/TCP/UDP | HTTP/TCP/UDP | HTTP/REST | HTTP/SOAP |
| **Custom Plugins** | Lua/Go/Python | Go | C/JS | Lambda | Java/Node.js |
| **Pricing** | Free + Enterprise | Free + Enterprise | $$$$ | Pay-per-use | $$$$$$ |
| **Learning Curve** | Medium | Low | Medium-High | Low | High |

**Choose Kong when:**
- Need high-performance API gateway
- Want extensive plugin ecosystem
- Building cloud-native microservices
- Require enterprise-grade features
- Need multi-protocol support

---

## Real-World Use Cases

### 1. Microservices API Gateway

```yaml
services:
  - name: user-service
    url: http://users.internal:8080
    routes:
      - paths: [/api/users]
    plugins:
      - name: jwt
      - name: rate-limiting
        config:
          minute: 1000

  - name: order-service
    url: http://orders.internal:8080
    routes:
      - paths: [/api/orders]
    plugins:
      - name: jwt
      - name: acl
        config:
          allow: [premium-users]
```

### 2. Multi-Tenant SaaS Platform

```yaml
# Workspace isolation (Enterprise)
workspaces:
  - name: tenant-a
  - name: tenant-b

# Per-tenant rate limiting
plugins:
  - name: rate-limiting-advanced
    config:
      identifier: consumer
      limit: [1000]
      window_size: [60]
      namespace: ${workspace}
```

### 3. Legacy System Modernization

```yaml
# Gradual migration with traffic splitting
services:
  - name: legacy-api
    url: http://legacy.internal:8080
  
  - name: new-api
    url: http://new-api.k8s.local:8080

routes:
  - name: api-route
    paths: [/api]
    plugins:
      - name: canary
        config:
          start: 0.0        # 0% to new service
          duration: 3600    # Gradual increase over 1 hour
          steps: 10
          upstream_fallback: true
```

### 4. External API Monetization

```yaml
# Different tiers for API consumers
consumers:
  - username: free-tier
    plugins:
      - name: rate-limiting
        config:
          minute: 100
  
  - username: premium-tier
    plugins:
      - name: rate-limiting
        config:
          minute: 10000
      - name: request-transformer
        config:
          add:
            headers:
              - "X-Priority: high"
```

---

## Best Practices

### 1. Configuration Management

✅ **Use Declarative Configuration (DB-less)**
```yaml
# Store in Git for version control
_format_version: "3.0"
_transform: true

services: [...]
routes: [...]
plugins: [...]
```

✅ **Environment-Specific Configs**
```bash
# Use environment variables
  url: ${SERVICE_URL}
  config:
    minute: ${RATE_LIMIT}
```

### 2. Security

✅ **Minimize Admin API Exposure**
```bash
KONG_ADMIN_LISTEN=127.0.0.1:8001  # Localhost only
```

✅ **Use RBAC (Enterprise)**
```yaml
rbac_roles:
  - name: api-admin
    permissions:
      - resource: services
        actions: [read, create, update, delete]
```

✅ **Enable Request Validation**
```yaml
plugins:
  - name: request-validator
    config:
      allowed_content_types:
        - application/json
      body_schema: >
        {
          "type": "object",
          "properties": {
            "name": {"type": "string"}
          }
        }
```

### 3. Performance

✅ **Use Caching**
```yaml
plugins:
  - name: proxy-cache
    config:
      strategy: memory
      cache_ttl: 300
```

✅ **Enable Compression**
```yaml
plugins:
  - name: response-transformer
    config:
      add:
        headers:
          - "Content-Encoding: gzip"
```

✅ **Optimize Worker Processes**
```bash
KONG_NGINX_WORKER_PROCESSES=auto
KONG_NGINX_WORKER_CONNECTIONS=4096
```

### 4. Monitoring

✅ **Enable Comprehensive Logging**
```yaml
plugins:
  - name: prometheus
  - name: http-log
  - name: file-log
```

✅ **Set Up Health Checks**
```yaml
upstreams:
  - name: my-service
    healthchecks:
      active:
        healthy:
          interval: 5
          successes: 2
        unhealthy:
          interval: 5
          failures: 3
```

### 5. High Availability

✅ **Deploy Multiple Instances**
```bash
# Run 3+ Kong nodes behind load balancer
kubectl scale deployment kong --replicas=3
```

✅ **Redis for Rate Limiting**
```yaml
plugins:
  - name: rate-limiting
    config:
      policy: redis
      redis:
        sentinel_addresses:
          - redis-sentinel-1:26379
          - redis-sentinel-2:26379
```

---

## Resources

### Official Documentation
- **Kong Gateway Docs**: https://docs.konghq.com/gateway/latest/
- **Plugin Hub**: https://docs.konghq.com/hub/
- **Admin API Reference**: https://docs.konghq.com/gateway/latest/admin-api/
- **Configuration Reference**: https://docs.konghq.com/gateway/latest/reference/configuration/

### Tools & SDKs
- **decK**: Declarative configuration tool - https://github.com/Kong/deck
- **Kong CLI**: Command-line interface
- **Insomnia**: API client with Kong support - https://insomnia.rest/
- **Kong Ingress Controller**: https://github.com/Kong/kubernetes-ingress-controller

### Community
- **Kong GitHub**: https://github.com/Kong/kong
- **Kong Nation**: https://discuss.konghq.com/
- **Kong Blog**: https://konghq.com/blog
- **Kong University**: https://education.konghq.com/

### Tutorials
- **Kong Getting Started**: https://docs.konghq.com/gateway/latest/get-started/
- **Kong on Kubernetes**: https://docs.konghq.com/kubernetes-ingress-controller/
- **Custom Plugin Development**: https://docs.konghq.com/gateway/latest/plugin-development/

### Books & Courses
- "Microservices with Kong" - Kong Documentation
- Kong Gateway Fundamentals (Kong University)
- API Gateway Patterns with Kong

---

**Last Updated**: February 2026  
**Kong Version**: 3.4+
