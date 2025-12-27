# ELK & OpenSearch — Introduction

ELK (Elasticsearch, Logstash, Kibana) is a popular stack for search and log analytics. OpenSearch is a community-driven fork of Elasticsearch/Kibana with similar APIs and features.

## Why ELK/OpenSearch?
- Full-text search and log analytics at scale
- Rich query DSL and aggregations
- Kibana/OpenSearch Dashboards for visualization
- Broad ecosystem of Beats/agents and ingest pipelines

## Key components
- **Elasticsearch / OpenSearch**: search and analytics engine
- **Logstash / Ingest Pipelines**: transform/route data
- **Kibana / OpenSearch Dashboards**: visualization and exploration
- **Beats/Agents**: lightweight shippers (Filebeat, Metricbeat, etc.)

## When to choose
- Need powerful search + analytics beyond log storage
- High-volume log ingestion where Lucene-based search helps

## Where to go next
- User guide: `ELK-OpenSearch/user-guide.md`
- Examples: docker-compose stack, Filebeat to ship logs
