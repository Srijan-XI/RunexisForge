# Prometheus — Introduction

Prometheus is a pull-based time-series database and monitoring system focused on reliability and multi-dimensional metrics.

## Why Prometheus?

- Pull model with service discovery
- Powerful PromQL for aggregations and alerts
- Exporter ecosystem (Node Exporter, cAdvisor, Blackbox, etc.)
- Works well with Kubernetes; pairs with Alertmanager and Grafana

## Key concepts

- **Scrape**: Prometheus pulls `/metrics`
- **Exporter**: exposes metrics for a system/app
- **Target**: scrape endpoint
- **Job/Instance**: grouping of targets
- **Labels**: key/value dimensions on metrics

## Where to go next

- User guide: `Prometheus/user-guide.md`
- Examples: basic scrape config, alerts, K8s service discovery
