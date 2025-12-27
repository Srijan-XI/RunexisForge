# Prometheus — User Guide

## Install / Run

**Docker (quick start):**

```bash
docker run --rm -p 9090:9090 \
  -v $PWD/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus:latest
```bash

**Minimal `prometheus.yml`:**

```yaml
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'self'
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'app'
    static_configs:
      - targets: ['host.docker.internal:8000']
```bash

## Expose app metrics

**Python (Flask) example:**

```bash
pip install prometheus-client flask
```bash

```python
from flask import Flask
from prometheus_client import Counter, generate_latest

app = Flask(__name__)
requests_total = Counter('requests_total', 'Total requests')

@app.route('/')
def hello():
    requests_total.inc()
    return 'hello'

@app.route('/metrics')
def metrics():
    return generate_latest(), 200, {'Content-Type': 'text/plain'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
```bash

## Alerting (Alertmanager)

**Rule file `alerts.yml`:**

```yaml
groups:
- name: app
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status="500"}[5m]) > 1
    for: 2m
    labels:
      severity: critical
    annotations:
      summary: High 500 error rate
```bash

Add to `prometheus.yml`:

```yaml
alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']
rule_files:
  - alerts.yml
```bash

## Service discovery (Kubernetes)

Prometheus Helm chart sets up K8s discovery automatically:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install kube-prom prometheus-community/kube-prometheus-stack
```bash

## Best practices

- Use labels consistently (env, service, instance)
- Keep scrape intervals reasonable (15–30s)
- Record rules for expensive queries
- Use retention settings to control disk usage

## References

- <https://prometheus.io/docs/>
- Exporters: <https://prometheus.io/docs/instrumenting/exporters/>
- PromQL: <https://prometheus.io/docs/prometheus/latest/querying/basics/>
