# Loki — User Guide

## Run Loki + Promtail (docker-compose)

**docker-compose.yaml:**
```yaml
version: '3'
services:
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml
  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log
      - ./promtail-config.yaml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml
```

**promtail-config.yaml:**
```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0
positions:
  filename: /tmp/positions.yaml
clients:
  - url: http://loki:3100/loki/api/v1/push
scrape_configs:
  - job_name: varlogs
    static_configs:
      - targets: [localhost]
        labels:
          job: varlogs
          __path__: /var/log/*.log
```

## Query with LogQL
- Recent logs for job:
  ```
  {job="varlogs"}
  ```
- Filter by substring:
  ```
  {job="varlogs"} |= "error"
  ```
- Count errors per level:
  ```
  sum by (level) (count_over_time({job="varlogs", level="error"}[5m]))
  ```

## Best practices
- Keep label cardinality low; avoid unique IDs as labels
- Use consistent labels (env, service, pod)
- Ship logs via Promtail, Fluent Bit, or Vector

## References
- https://grafana.com/oss/loki/
- LogQL: https://grafana.com/docs/loki/latest/logql/
