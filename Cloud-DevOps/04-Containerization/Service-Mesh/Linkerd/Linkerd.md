# Linkerd

## Introduction

Linkerd is a lightweight, widely-used **Service Mesh** for Kubernetes. It focuses on simplicity, minimalism, and performance ("Ultralight"). Unlike Istio, which is feature-dense and complex, Linkerd aims to do the essentials (Security, Reliability, Observability) with zero config.

## Architecture
Similar to Istio, it uses sidecar proxies. However, Linkerd uses its own **micro-proxy** written in **Rust**, making it extremely fast and light on memory.

## Installation

1.  Install CLI:
    ```bash
    curl -sL https://run.linkerd.io/install | sh
    ```
2.  Validate Cluster:
    ```bash
    linkerd check --pre
    ```
3.  Install Control Plane:
    ```bash
    linkerd install | kubectl apply -f -
    ```

## Usage (Dashboard)
Linkerd comes with a powerful dashboard to see success rates and latencies instantly.
```bash
linkerd viz dashboard
```

To add Linkerd to an app, just annotate it (or the namespace):
```yaml
metadata:
  annotations:
    linkerd.io/inject: enabled
```

## Real World Use Case
**Debugging Latency**: A user reports that the checkout page is slow. Without logs, it's hard to know why. Linkerd's dashboard immediately shows that `CheckoutService` is calling `PaymentService`, and `PaymentService` is responding with 500ms latency but 100% success. You effectively identified the bottleneck in seconds.
