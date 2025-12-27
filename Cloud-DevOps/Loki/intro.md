# Loki — Introduction

Loki is a log aggregation system optimized for labels and cost efficiency. It pairs with Promtail for log shipping and Grafana for querying/visualization.

## Why Loki?
- Indexes only labels, not full log content → cheaper storage
- Natively integrates with Grafana; similar label model to Prometheus
- Multi-tenant, supports object storage backends

## Key components
- **Loki**: stores logs
- **Promtail**: ships logs and attaches labels
- **LogQL**: query language similar to PromQL

## Where to go next
- User guide: `Loki/user-guide.md`
- Examples: docker-compose with Promtail, LogQL queries
