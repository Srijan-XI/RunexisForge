# Istio

## Introduction

Istio is an open-source **Service Mesh** that transparently layers onto existing distributed applications. It provides a standardized way to automate, secure, and monitor the communication between microservices.

Key capabilities:
*   **Traffic Management**: Circuit breaking, canary rollouts, A/B testing.
*   **Security**: Automatic mTLS (Mutual TLS) between services.
*   **Observability**: Tracing, logging, and metrics without code changes.

## Architecture
Istio deploys a **Sidecar Proxy** (Envoy) next to each of your microservices. These proxies handle all network traffic, while the **Control Plane** (Istiod) manages configuration.

## Installation (istioctl)

1.  Download:
    ```bash
    curl -L https://istio.io/downloadIstio | sh -
    ```
2.  Install to Cluster:
    ```bash
    istioctl install --set profile=demo -y
    ```
3.  Enable Injection (auto-add sidecars):
    ```bash
    kubectl label namespace default istio-injection=enabled
    ```

## Usage (Traffic Shifting)

Example `VirtualService` to split traffic 90/10 between v1 and v2:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
  - reviews
  http:
  - route:
    - destination:
        host: reviews
        subset: v1
      weight: 90
    - destination:
        host: reviews
        subset: v2
      weight: 10
```

## Real World Use Case
**Zero-Trust Security**: In a legacy banking app, services talked to each other over value HTTP. If a hacker got into the network, they could sniff traffic. Installing Istio instantly upgraded all internal communication to **mTLS (Encrypted)** without rewriting a single line of Java/Node.js code.
