# Grafana

## Introduction

Grafana is a visualization and dashboarding platform that connects to Prometheus, Loki, Tempo, Elasticsearch/OpenSearch, and many other data sources.

## Why Grafana?

- Unified dashboards for metrics, logs, traces
- Alerting and annotation support
- Wide data source plugins ecosystem
- Templating and variables for reusable dashboards

## Key concepts

- **Data source**: where metrics/logs/traces come from
- **Dashboard**: collection of panels
- **Panel**: visualization (graph, stat, table)
- **Variables**: dynamic filters for dashboards

## Where to go next

- User guide: `Grafana/user-guide.md`
- Examples: connect Prometheus/Loki, build a dashboard, set alerts

---

## User Guide

## Install / Run

**Docker (with anonymous access disabled by default):**

```bash
docker run -d -p 3000:3000 --name=grafana grafana/grafana:latest
```bash

Login: user `admin`, password `admin` (prompted to change).

## Add data sources

- Prometheus: URL `http://prometheus:9090`
- Loki: URL `http://loki:3100`
- Tempo/Jaeger/Zipkin: for traces
- Elasticsearch/OpenSearch: URL to cluster, index pattern

## Build a dashboard

1. Create dashboard → Add new panel
2. Choose data source (e.g., Prometheus)
3. Write a query (PromQL) and pick a visualization
4. Save the dashboard

**Example PromQL queries:**

- Request rate: `rate(http_requests_total[5m])`
- Error rate: `rate(http_requests_total{status="500"}[5m])`
- Latency p95: `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))`

## Alerts

- Use Alerting → Alert rules
- Evaluate PromQL expression; set conditions and contact points (email, Slack, PagerDuty)

## Annotations

- Add deployment events to timelines (from webhooks or manual)

## Best practices

- Use variables for env/service filtering
- Reuse dashboards via JSON export/import
- Limit heavy queries; use recording rules in Prometheus

## References

- <https://grafana.com/docs/grafana/latest/>

