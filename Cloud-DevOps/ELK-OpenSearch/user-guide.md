# ELK & OpenSearch — User Guide

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
```

Bring it up:
```bash
docker compose up -d
```

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
```

Start Filebeat:
```bash
filebeat run -e -c filebeat.yml
```

## Queries (OpenSearch DSL)

**Term query:**
```json
{
  "query": {
    "term": { "level": "error" }
  }
}
```

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
```

## Best practices
- Use index lifecycle management (ILM/ISM) for retention
- Keep mappings consistent; avoid dynamic explosion
- Prefer structured logs (JSON)
- Secure with TLS and auth in production

## References
- ELK: https://www.elastic.co/elastic-stack
- OpenSearch: https://opensearch.org/docs/latest/
- Beats: https://www.elastic.co/beats/
- OpenSearch Dashboards: https://opensearch.org/docs/latest/dashboards/
