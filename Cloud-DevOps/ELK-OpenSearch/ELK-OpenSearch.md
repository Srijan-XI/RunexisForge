# ELK-OpenSearch

## Introduction

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

---

## User Guide

## Quick start (docker-compose)

**docker-compose.yaml (OpenSearch + Dashboards):**

```yaml
version: '3'
services:
  opensearch:
    image: opensearchproject/opensearch:2
    environment:
      - discovery.type=single-node
      - plugins.security.disabled=true
    ports:
      - "9200:9200"
      - "9600:9600"
  dashboards:
    image: opensearchproject/opensearch-dashboards:2
    environment:
      - OPENSEARCH_HOSTS=["https://opensearch:9200"]
      - OPENSEARCH_SSL_VERIFICATIONMODE=none
    ports:
      - "5601:5601"
    depends_on:
      - opensearch
```bash

Bring it up:

```bash
docker compose up -d
```bash

## Ship logs with Filebeat

**filebeat.yml:**

```yaml
filebeat.inputs:
  - type: filestream
    id: app-logs
    paths:
      - /var/log/app/*.log
output.elasticsearch:
  hosts: ["http://localhost:9200"]
  username: "admin"
  password: "admin"
setup.kibana:
  host: "http://localhost:5601"
```bash

Start Filebeat:

```bash
filebeat run -e -c filebeat.yml
```bash

## Queries (OpenSearch DSL)

**Term query:**

```json
{
  "query": {
    "term": { "level": "error" }
  }
}
```bash

**Aggregation (count per level):**

```json
{
  "size": 0,
  "aggs": {
    "by_level": {
      "terms": { "field": "level.keyword" }
    }
  }
}
```bash

## Best practices

- Use index lifecycle management (ILM/ISM) for retention
- Keep mappings consistent; avoid dynamic explosion
- Prefer structured logs (JSON)
- Secure with TLS and auth in production

## References

- ELK: <https://www.elastic.co/elastic-stack>
- OpenSearch: <https://opensearch.org/docs/latest/>
- Beats: <https://www.elastic.co/beats/>
- OpenSearch Dashboards: <https://opensearch.org/docs/latest/dashboards/>

