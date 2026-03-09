# Consul

## Introduction

HashiCorp Consul is a service networking solution that enables teams to manage secure network connectivity between services and across on-premise and multi-cloud environments and runtimes.

Primarily, it is used for:
1.  **Service Discovery**: Services finding each other.
2.  **Service Mesh**: Secure Service-to-Service communication (mTLS).
3.  **Key/Value Store**: Distributed configuration.

## Installation

*   **Linux**:
    ```bash
    sudo apt-get install consul
    ```
*   **Helm (K8s)**:
    ```bash
    helm install consul hashicorp/consul --set global.name=consul
    ```

## Usage (Dev Mode)

Start a local agent:
```bash
consul agent -dev
```
UI available at: `http://localhost:8500`

### Service Discovery Example
Define a service `web.json`:
```json
{
  "service": {
    "name": "web",
    "tags": ["rails"],
    "port": 80
  }
}
```
Register it:
```bash
consul services register web.json
```
Query it via DNS:
```bash
dig @127.0.0.1 -p 8600 web.service.consul
```

## Real World Use Case
**Dynamic Load Balancing**: Instead of hardcoding IP addresses in an Nginx load balancer, Nginx runs a "Consul Template" watcher. When you add a new API server instance, it registers with Consul. The watcher sees the change, rewrites the `nginx.conf` and reloads Nginx automatically.
