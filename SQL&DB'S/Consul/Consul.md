# Consul

## Introduction

HashiCorp Consul is a service networking solution that provides service discovery, configuration, and segmentation functionality. It's a distributed, highly available system that connects and secures services across any runtime platform and public or private cloud.

### What is Consul?

Consul is a multi-cloud service networking platform that provides a full-featured control plane with service discovery, configuration, and service mesh capabilities. It enables organizations to discover, secure, and connect services across any runtime platform and cloud environment.

### Key Features

- **Service Discovery**: Automatic service registration and DNS/HTTP service discovery
- **Health Checking**: Active health monitoring of services and nodes
- **Service Mesh**: Layer 7 traffic management and security
- **Key/Value Store**: Distributed configuration and metadata storage
- **Multi-Datacenter**: Native support for multiple datacenters
- **Service Segmentation**: Intent-based network segmentation
- **Certificate Management**: Automatic TLS certificate generation and rotation
- **API Gateway**: Traffic management and API gateway capabilities
- **Network Infrastructure**: Support for VMs, containers, and serverless
- **Observability**: Metrics, logging, and tracing integration

### Use Cases

- **Service Discovery**: Dynamic service registration and discovery
- **Load Balancing**: Intelligent traffic routing and load balancing
- **Service Mesh**: Secure service-to-service communication
- **Configuration Management**: Centralized configuration storage
- **Feature Flags**: Dynamic feature toggling
- **Leader Election**: Distributed consensus and coordination
- **Health Monitoring**: Service health checks and monitoring
- **Multi-Cloud Networking**: Connect services across clouds
- **Zero Trust Security**: mTLS and identity-based access control
- **API Gateway**: Centralized API management

### Consul vs Other Service Mesh Solutions

| Feature | Consul | Istio | Linkerd | etcd | ZooKeeper |
|---------|--------|-------|---------|------|-----------|
| **Service Mesh** | Yes | Yes | Yes | No | No |
| **Service Discovery** | Native | Via K8s | Via K8s | Manual | Manual |
| **Multi-Platform** | Yes | K8s-focused | K8s-focused | Any | Any |
| **Key/Value Store** | Yes | No | No | Yes | Yes |
| **Health Checks** | Built-in | Via K8s | Via K8s | External | External |
| **Multi-Datacenter** | Native | Complex | Limited | Manual | Manual |
| **Language** | Go | Go/C++ | Rust | Go | Java |
| **Complexity** | Medium | High | Low | Low | Medium |

### Architecture Overview

**Consul Components:**

**Consul Agent:**
```
┌─────────────────────────────────────────────────┐
│              Consul Cluster                      │
│                                                  │
│  ┌──────────────┐      ┌──────────────┐        │
│  │ Server Agent │◄────►│ Server Agent │        │
│  │   (Leader)   │      │  (Follower)  │        │
│  └──────────────┘      └──────────────┘        │
│         ▲                      ▲                │
│         │                      │                │
│         ▼                      ▼                │
│  ┌──────────────┐      ┌──────────────┐        │
│  │ Client Agent │      │ Client Agent │        │
│  └──────────────┘      └──────────────┘        │
│         │                      │                │
└─────────┼──────────────────────┼────────────────┘
          │                      │
          ▼                      ▼
    ┌─────────┐            ┌─────────┐
    │Service A│            │Service B│
    └─────────┘            └─────────┘
```

**Server Agents:**
- Maintain cluster state using Raft consensus
- Handle queries and service registration
- Participate in leader election
- Store data replicated across cluster
- 3 or 5 servers recommended for production

**Client Agents:**
- Run on every node hosting services
- Forward requests to server agents
- Execute health checks
- Maintain local service catalog
- Lightweight and stateless

**Consensus Protocol:**
- Uses Raft algorithm for consistency
- Ensures strong consistency across cluster
- Automatic leader election
- Handles network partitions gracefully

---

## Installation & Setup

### Docker Installation

**Single Node Development:**
```bash
# Run Consul in development mode
docker run -d --name=consul \
  -p 8500:8500 \
  -p 8600:8600/udp \
  consul:latest agent -dev -ui -client=0.0.0.0

# Access UI
# http://localhost:8500
```

**Multi-Node Cluster (3 servers):**
```bash
# Server 1 (Bootstrap)
docker run -d --name=consul-server1 \
  --net=consul-network \
  -e CONSUL_BIND_INTERFACE=eth0 \
  consul:latest agent -server -bootstrap-expect=3 \
  -ui -client=0.0.0.0

# Server 2
docker run -d --name=consul-server2 \
  --net=consul-network \
  -e CONSUL_BIND_INTERFACE=eth0 \
  consul:latest agent -server \
  -retry-join=consul-server1

# Server 3
docker run -d --name=consul-server3 \
  --net=consul-network \
  -e CONSUL_BIND_INTERFACE=eth0 \
  consul:latest agent -server \
  -retry-join=consul-server1

# Client Agent
docker run -d --name=consul-client \
  --net=consul-network \
  -e CONSUL_BIND_INTERFACE=eth0 \
  consul:latest agent -retry-join=consul-server1
```

### Binary Installation (Linux)

```bash
# Download Consul
wget https://releases.hashicorp.com/consul/1.17.0/consul_1.17.0_linux_amd64.zip

# Extract
unzip consul_1.17.0_linux_amd64.zip

# Move to PATH
sudo mv consul /usr/local/bin/

# Verify installation
consul version

# Create Consul user
sudo useradd --system --home /etc/consul.d --shell /bin/false consul

# Create directories
sudo mkdir -p /opt/consul /etc/consul.d
sudo chown -R consul:consul /opt/consul /etc/consul.d
```

### Kubernetes Installation (Helm)

```bash
# Add HashiCorp Helm repository
helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo update

# Install Consul
helm install consul hashicorp/consul \
  --set global.name=consul \
  --set server.replicas=3 \
  --set ui.enabled=true \
  --set connectInject.enabled=true

# Verify installation
kubectl get pods -l app=consul

# Access UI with port-forward
kubectl port-forward service/consul-ui 8500:80
```

### Configuration File

**server.hcl:**
```hcl
# Server configuration
datacenter = "dc1"
data_dir = "/opt/consul"
log_level = "INFO"

# Server-specific settings
server = true
bootstrap_expect = 3

# Networking
bind_addr = "0.0.0.0"
client_addr = "0.0.0.0"
advertise_addr = "192.168.1.10"

# UI
ui_config {
  enabled = true
}

# Ports
ports {
  http = 8500
  https = 8501
  grpc = 8502
  dns = 8600
}

# Performance
performance {
  raft_multiplier = 1
}

# Security (optional)
acl {
  enabled = true
  default_policy = "deny"
  enable_token_persistence = true
}

# Encryption
encrypt = "your-gossip-encryption-key"
```

**client.hcl:**
```hcl
# Client configuration
datacenter = "dc1"
data_dir = "/opt/consul"
log_level = "INFO"

# Client mode
server = false

# Join servers
retry_join = ["192.168.1.10", "192.168.1.11", "192.168.1.12"]

# Networking
bind_addr = "0.0.0.0"
advertise_addr = "192.168.1.20"

# Enable specific features
enable_script_checks = false
```

---

## Service Discovery

### Service Registration

**Via Configuration File (services.json):**
```json
{
  "service": {
    "name": "web",
    "tags": ["production", "frontend"],
    "port": 8080,
    "check": {
      "http": "http://localhost:8080/health",
      "interval": "10s",
      "timeout": "2s"
    }
  }
}
```

**Via HTTP API:**
```bash
# Register service
curl -X PUT http://localhost:8500/v1/agent/service/register \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "api",
    "ID": "api-1",
    "Tags": ["production", "backend"],
    "Port": 3000,
    "Check": {
      "HTTP": "http://localhost:3000/health",
      "Interval": "10s"
    }
  }'

# Deregister service
curl -X PUT http://localhost:8500/v1/agent/service/deregister/api-1
```

**Via Go Client:**
```go
package main

import (
    "github.com/hashicorp/consul/api"
)

func main() {
    // Create client
    config := api.DefaultConfig()
    client, _ := api.NewClient(config)
    
    // Register service
    registration := &api.AgentServiceRegistration{
        Name: "database",
        ID:   "postgres-1",
        Tags: []string{"production", "primary"},
        Port: 5432,
        Check: &api.AgentServiceCheck{
            HTTP:     "http://localhost:5432/health",
            Interval: "10s",
            Timeout:  "2s",
        },
    }
    
    client.Agent().ServiceRegister(registration)
}
```

### Service Discovery

**DNS Interface:**
```bash
# Query service via DNS
dig @127.0.0.1 -p 8600 web.service.consul

# Query with tag
dig @127.0.0.1 -p 8600 production.web.service.consul SRV

# Response includes:
# - A records (IP addresses)
# - SRV records (IP + port)
```

**HTTP API:**
```bash
# List all services
curl http://localhost:8500/v1/catalog/services

# Get healthy instances of a service
curl http://localhost:8500/v1/health/service/web?passing

# Get service with specific tag
curl http://localhost:8500/v1/health/service/web?tag=production
```

**Prepared Queries:**
```bash
# Create prepared query for nearest service
curl -X POST http://localhost:8500/v1/query \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "nearest-web",
    "Service": {
      "Service": "web",
      "Failover": {
        "NearestN": 3
      }
    }
  }'

# Execute query
curl http://localhost:8500/v1/query/nearest-web/execute
```

---

## Health Checking

### Health Check Types

**HTTP Health Check:**
```json
{
  "check": {
    "id": "web-health",
    "name": "Web Application Health",
    "http": "http://localhost:8080/health",
    "method": "GET",
    "interval": "10s",
    "timeout": "2s"
  }
}
```

**TCP Health Check:**
```json
{
  "check": {
    "id": "database-health",
    "name": "Database TCP Check",
    "tcp": "localhost:5432",
    "interval": "10s",
    "timeout": "2s"
  }
}
```

**Script Health Check:**
```json
{
  "check": {
    "id": "disk-health",
    "name": "Disk Space Check",
    "args": ["/usr/local/bin/check_disk.sh"],
    "interval": "30s",
    "timeout": "5s"
  }
}
```

**TTL Health Check:**
```json
{
  "check": {
    "id": "app-heartbeat",
    "name": "Application Heartbeat",
    "ttl": "30s",
    "deregister_critical_service_after": "90s"
  }
}
```

**Docker Health Check:**
```json
{
  "check": {
    "id": "container-health",
    "name": "Docker Container Check",
    "docker_container_id": "abc123",
    "shell": "/bin/bash",
    "args": ["/app/health.sh"],
    "interval": "10s"
  }
}
```

### Check Management

```bash
# Register standalone health check
curl -X PUT http://localhost:8500/v1/agent/check/register \
  -d '{
    "ID": "mem-check",
    "Name": "Memory Usage",
    "Notes": "Check memory below 90%",
    "Args": ["/usr/local/bin/check_mem.sh"],
    "Interval": "30s"
  }'

# Update TTL check status
curl -X PUT http://localhost:8500/v1/agent/check/pass/app-heartbeat

# Deregister check
curl -X PUT http://localhost:8500/v1/agent/check/deregister/mem-check
```

---

## Key/Value Store

### Basic Operations

**CLI Operations:**
```bash
# Put value
consul kv put config/database/host postgres.example.com

# Get value
consul kv get config/database/host

# Get with details
consul kv get -detailed config/database/host

# Delete key
consul kv delete config/database/host

# List keys
consul kv get -keys config/

# Recursive get
consul kv get -recurse config/
```

**HTTP API:**
```bash
# Put key/value
curl -X PUT http://localhost:8500/v1/kv/config/api/key \
  -d 'my-secret-value'

# Get value
curl http://localhost:8500/v1/kv/config/api/key

# Get decoded value
curl http://localhost:8500/v1/kv/config/api/key?raw

# Delete key
curl -X DELETE http://localhost:8500/v1/kv/config/api/key

# List keys with prefix
curl http://localhost:8500/v1/kv/config/?keys

# Atomic operations with CAS (Check-And-Set)
curl -X PUT http://localhost:8500/v1/kv/counter?cas=0 -d '1'
```

### Advanced Features

**Watching for Changes:**
```bash
# Watch a key
consul watch -type=key -key=config/feature/flags \
  /usr/local/bin/reload-config.sh

# Watch a prefix
consul watch -type=keyprefix -prefix=config/ \
  /usr/local/bin/update-config.sh

# Watch a service
consul watch -type=service -service=web \
  /usr/local/bin/update-load-balancer.sh
```

**Transactions:**
```bash
# Atomic multi-key transaction
curl -X PUT http://localhost:8500/v1/txn \
  -H "Content-Type: application/json" \
  -d '[
    {
      "KV": {
        "Verb": "set",
        "Key": "config/version",
        "Value": "djI="
      }
    },
    {
      "KV": {
        "Verb": "cas",
        "Key": "config/active",
        "Value": "dHJ1ZQ==",
        "Index": 15
      }
    }
  ]'
```

**Sessions (Distributed Locks):**
```bash
# Create session
SESSION_ID=$(curl -X PUT http://localhost:8500/v1/session/create \
  -d '{"Name":"my-lock","TTL":"15s"}' | jq -r '.ID')

# Acquire lock
curl -X PUT "http://localhost:8500/v1/kv/locks/my-resource?acquire=$SESSION_ID" \
  -d 'lock-holder-id'

# Release lock
curl -X PUT "http://localhost:8500/v1/kv/locks/my-resource?release=$SESSION_ID"

# Destroy session
curl -X PUT "http://localhost:8500/v1/session/destroy/$SESSION_ID"
```

---

## Service Mesh (Consul Connect)

### Enable Service Mesh

**Server Configuration:**
```hcl
# Enable Connect
connect {
  enabled = true
}
```

**Register Service with Sidecar:**
```json
{
  "service": {
    "name": "web",
    "port": 8080,
    "connect": {
      "sidecar_service": {
        "proxy": {
          "upstreams": [
            {
              "destination_name": "database",
              "local_bind_port": 5432
            }
          ]
        }
      }
    }
  }
}
```

### Intentions (Service Authorization)

```bash
# Allow web to connect to database
consul intention create web database

# Deny api to connect to admin
consul intention create -deny api admin

# List intentions
consul intention list

# Check if connection allowed
consul intention check web database

# Delete intention
consul intention delete web database
```

**Layer 7 (L7) Intentions:**
```hcl
Kind = "service-intentions"
Name = "api"

Sources = [
  {
    Name = "web"
    Permissions = [
      {
        Action = "allow"
        HTTP {
          PathPrefix = "/public"
          Methods    = ["GET"]
        }
      },
      {
        Action = "deny"
        HTTP {
          PathPrefix = "/admin"
        }
      }
    ]
  }
]
```

### Traffic Management

**Service Router (Path-based Routing):**
```hcl
Kind = "service-router"
Name = "api"

Routes = [
  {
    Match {
      HTTP {
        PathPrefix = "/v2/"
      }
    }
    Destination {
      Service = "api-v2"
    }
  },
  {
    Match {
      HTTP {
        PathPrefix = "/v1/"
      }
    }
    Destination {
      Service = "api-v1"
    }
  }
]
```

**Service Splitter (Traffic Splitting):**
```hcl
Kind = "service-splitter"
Name = "web"

Splits = [
  {
    Weight         = 90
    ServiceSubset = "v1"
  },
  {
    Weight         = 10
    ServiceSubset = "v2"
  }
]
```

**Service Resolver (Load Balancing):**
```hcl
Kind = "service-resolver"
Name = "web"

LoadBalancer = {
  Policy = "least_request"
  LeastRequestConfig = {
    ChoiceCount = 2
  }
}

Subsets = {
  v1 = {
    Filter = "Service.Meta.version == v1"
  }
  v2 = {
    Filter = "Service.Meta.version == v2"
  }
}
```

---

## Multi-Datacenter Setup

### WAN Federation

**Primary Datacenter (DC1):**
```hcl
datacenter = "dc1"
primary_datacenter = "dc1"

server = true
bootstrap_expect = 3

connect {
  enabled = true
  enable_mesh_gateway_wan_federation = true
}
```

**Secondary Datacenter (DC2):**
```hcl
datacenter = "dc2"
primary_datacenter = "dc1"

server = true
bootstrap_expect = 3

retry_join_wan = ["dc1-server1:8302", "dc1-server2:8302"]

connect {
  enabled = true
  enable_mesh_gateway_wan_federation = true
}
```

**Mesh Gateway:**
```hcl
Kind = "mesh-gateway"
Name = "mesh-gateway"

Proxy {
  Config {
    envoy_gateway_bind_addresses {
      lan = "0.0.0.0:8443"
      wan = "0.0.0.0:8443"
    }
  }
}
```

### Cross-DC Service Discovery

```bash
# Query service in remote datacenter
consul catalog services -datacenter=dc2

# DNS query for remote datacenter
dig @127.0.0.1 -p 8600 web.service.dc2.consul

# Prepared query with failover to another DC
{
  "Name": "web-multi-dc",
  "Service": {
    "Service": "web",
    "Failover": {
      "Datacenters": ["dc2", "dc3"]
    }
  }
}
```

---

## Security & ACLs

### Enable ACL System

**Bootstrap ACL System:**
```bash
# Bootstrap ACL (get initial management token)
consul acl bootstrap

# Output:
# AccessorID:   xxxx
# SecretID:     yyyy  <- Management token
# Description:  Bootstrap Token
```

**Server Configuration:**
```hcl
acl {
  enabled = true
  default_policy = "deny"
  enable_token_persistence = true
  tokens {
    initial_management = "bootstrap-token-here"
    agent = "agent-token-here"
  }
}
```

### Create ACL Policies

**Service Read/Write Policy:**
```hcl
# web-service-policy.hcl
service "web" {
  policy = "write"
}

service "database" {
  policy = "read"
}

node_prefix "" {
  policy = "read"
}
```

**Key/Value Policy:**
```hcl
# kv-policy.hcl
key_prefix "config/web/" {
  policy = "write"
}

key_prefix "config/database/" {
  policy = "read"
}
```

### Create and Use Tokens

```bash
# Create policy
consul acl policy create \
  -name "web-service" \
  -rules @web-service-policy.hcl

# Create token with policy
consul acl token create \
  -description "Web service token" \
  -policy-name "web-service"

# Use token
export CONSUL_HTTP_TOKEN="token-secret-id"

# Or in API calls
curl -H "X-Consul-Token: token-secret-id" \
  http://localhost:8500/v1/kv/config/web/key
```

### TLS Encryption

**Generate Certificates:**
```bash
# Create CA
consul tls ca create

# Create server certificates
consul tls cert create -server -dc dc1

# Create client certificates
consul tls cert create -client
```

**Enable TLS:**
```hcl
# Server configuration
tls {
  defaults {
    ca_file = "/etc/consul.d/consul-agent-ca.pem"
    cert_file = "/etc/consul.d/dc1-server-consul-0.pem"
    key_file = "/etc/consul.d/dc1-server-consul-0-key.pem"
    
    verify_incoming = true
    verify_outgoing = true
  }
  
  https {
    ca_file = "/etc/consul.d/consul-agent-ca.pem"
  }
}
```

---

## Production Best Practices

### High Availability

```yaml
# Recommended setup:
- 3 or 5 server agents (odd number for quorum)
- Client agents on every node
- Separate servers across availability zones
- Use consistent hardware for servers
- Configure automated backups
- Monitor Raft performance metrics
```

### Backup and Restore

```bash
# Take snapshot
consul snapshot save backup.snap

# Restore snapshot
consul snapshot restore backup.snap

# Inspect snapshot
consul snapshot inspect backup.snap

# Automated backups (systemd timer)
[Unit]
Description=Consul Snapshot

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

### Monitoring

**Key Metrics to Monitor:**
```yaml
# Raft metrics
- consul.raft.leader
- consul.raft.commitTime
- consul.raft.apply

# Cluster health
- consul.health.service.query-tag
- consul.catalog.service.query

# Performance
- consul.kvs.apply
- consul.consul.rpc.query
- consul.runtime.alloc_bytes

# Client metrics
- consul.client.rpc
- consul.client.rpc.failed
```

**Prometheus Integration:**
```hcl
# Enable Prometheus metrics
telemetry {
  prometheus_retention_time = "24h"
  disable_hostname = true
}
```

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'consul'
    static_configs:
      - targets: ['localhost:8500']
    metrics_path: '/v1/agent/metrics'
    params:
      format: ['prometheus']
```

### Performance Tuning

```hcl
# Server configuration
performance {
  raft_multiplier = 1  # Lower = faster, less tolerant
  rpc_hold_timeout = "7s"
  leave_drain_time = "5s"
}

# Increase limits
limits {
  http_max_conns_per_client = 200
  rpc_max_conns_per_client = 100
  rpc_rate = -1  # Unlimited
  kv_max_value_size = 524288  # 512KB
}

# Autopilot (automatic dead server removal)
autopilot {
  cleanup_dead_servers = true
  last_contact_threshold = "200ms"
  max_trailing_logs = 250
  server_stabilization_time = "10s"
}
```

---

## Integration Examples

### Integration with Spring Boot

**pom.xml:**
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-config</artifactId>
</dependency>
```

**application.yml:**
```yaml
spring:
  application:
    name: user-service
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        enabled: true
        health-check-path: /actuator/health
        health-check-interval: 10s
        instance-id: ${spring.application.name}:${random.value}
      config:
        enabled: true
        prefix: config
        default-context: application
        profile-separator: ','
```

### Integration with Node.js

```javascript
const Consul = require('consul');

// Create client
const consul = new Consul({
  host: 'localhost',
  port: 8500
});

// Register service
consul.agent.service.register({
  name: 'api',
  id: 'api-1',
  tags: ['production'],
  port: 3000,
  check: {
    http: 'http://localhost:3000/health',
    interval: '10s'
  }
}, (err) => {
  if (err) throw err;
  console.log('Service registered');
});

// Service discovery
consul.catalog.service.nodes('database', (err, result) => {
  if (err) throw err;
  const services = result.map(s => ({
    address: s.ServiceAddress,
    port: s.ServicePort
  }));
  console.log('Database services:', services);
});

// Watch for changes
const watch = consul.watch({
  method: consul.health.service,
  options: { service: 'web', passing: true }
});

watch.on('change', (data) => {
  console.log('Service instances changed:', data);
});

watch.on('error', (err) => {
  console.error('Watch error:', err);
});
```

### Integration with Docker Compose

```yaml
version: '3.8'

services:
  consul-server:
    image: consul:latest
    command: agent -server -ui -bootstrap-expect=1 -client=0.0.0.0
    ports:
      - "8500:8500"
      - "8600:8600/udp"
    volumes:
      - consul-data:/consul/data
    environment:
      - CONSUL_BIND_INTERFACE=eth0

  web:
    image: myapp:latest
    depends_on:
      - consul-server
    environment:
      - CONSUL_HTTP_ADDR=consul-server:8500
    command: >
      sh -c "
        consul-template -consul-addr=consul-server:8500 \
          -template '/app/config.tpl:/app/config.json' \
          -once &&
        node server.js
      "

volumes:
  consul-data:
```

---

## Troubleshooting

### Common Issues

**Split Brain Detection:**
```bash
# Check for multiple leaders
consul operator raft list-peers

# Should show only ONE leader
# If multiple leaders exist, investigate network partitions
```

**Slow Queries:**
```bash
# Check Raft commit time
consul monitor | grep raft.commitTime

# Inspect server performance
consul operator raft list-peers -detailed

# Review metrics
curl http://localhost:8500/v1/agent/metrics
```

**Service Deregistration Issues:**
```bash
# Force deregister service
consul services deregister -id=stuck-service-id

# Or via API
curl -X PUT http://localhost:8500/v1/agent/service/deregister/stuck-service-id
```

### Debug Logging

```bash
# Enable debug logging
consul monitor -log-level=debug

# Or via configuration
log_level = "DEBUG"

# Specific subsystem logs
consul monitor -log-level=trace
```

### Network Connectivity

```bash
# Test DNS resolution
dig @localhost -p 8600 consul.service.consul

# Test HTTP API
curl http://localhost:8500/v1/status/leader

# Check cluster members
consul members

# Detailed member info
consul members -detailed
```

---

## Resources

### Official Documentation
- [Consul Official Documentation](https://www.consul.io/docs)
- [Consul API Reference](https://www.consul.io/api-docs)
- [Consul Tutorials](https://learn.hashicorp.com/consul)

### Learning Resources
- [Service Mesh Guide](https://www.consul.io/docs/connect)
- [Multi-Datacenter Guide](https://www.consul.io/docs/enterprise/federation)
- [Security Best Practices](https://www.consul.io/docs/security)

### Tools & Integrations
- [Consul Template](https://github.com/hashicorp/consul-template)
- [Envconsul](https://github.com/hashicorp/envconsul)
- [Spring Cloud Consul](https://spring.io/projects/spring-cloud-consul)

### Community
- [GitHub Repository](https://github.com/hashicorp/consul)
- [Discuss Forum](https://discuss.hashicorp.com/c/consul)
- [Community Portal](https://www.consul.io/community)

---

## Comparison Matrix

| Feature | Consul | Kubernetes | Eureka | ZooKeeper | etcd |
|---------|--------|-----------|---------|-----------|------|
| **Service Discovery** | ✅ Native | ✅ Native | ✅ Native | ❌ Manual | ❌ Manual |
| **Health Checks** | ✅ Built-in | ✅ Probes | ✅ Built-in | ❌ External | ❌ External |
| **Service Mesh** | ✅ Connect | ✅ + Istio | ❌ No | ❌ No | ❌ No |
| **KV Store** | ✅ Yes | ✅ ConfigMap | ❌ No | ✅ Yes | ✅ Yes |
| **Multi-DC** | ✅ Native | ❌ Complex | ❌ Manual | ✅ Limited | ❌ Manual |
| **UI** | ✅ Built-in | ✅ Dashboard | ❌ No | ❌ No | ❌ No |
| **DNS Interface** | ✅ Yes | ✅ CoreDNS | ❌ No | ❌ No | ❌ No |
| **Ease of Setup** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Scalability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

**Last Updated:** February 2026
