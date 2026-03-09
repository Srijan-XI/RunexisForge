# OpenSearch - Community-Driven Search and Analytics

## Table of Contents
- [Introduction](#introduction)
- [Why OpenSearch?](#why-opensearch)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Index Management](#index-management)
- [Document Operations](#document-operations)
- [Search & Queries](#search--queries)
- [Aggregations](#aggregations)
- [OpenSearch Dashboards](#opensearch-dashboards)
- [Security](#security)
- [Performance Tuning](#performance-tuning)
- [Plugins](#plugins)
- [Migration from Elasticsearch](#migration-from-elasticsearch)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Introduction

**OpenSearch** is a community-driven, open-source search and analytics suite derived from Elasticsearch 7.10.2. Created by AWS in response to Elastic's license change, OpenSearch remains 100% open source under the Apache 2.0 license.

### Key Features
- **100% Open Source** - Apache 2.0 license
- **Elasticsearch Compatible** - Fork of ES 7.10.2
- **Full-Text Search** - Advanced search capabilities
- **Real-Time Analytics** - Log and event analysis
- **Distributed Architecture** - Horizontal scalability
- **Security** - Built-in security features
- **Machine Learning** - Anomaly detection
- **Observability** - Logs, metrics, traces

### Architecture
- **Cluster** - Collection of nodes
- **Node** - OpenSearch instance
- **Index** - Collection of documents
- **Shard** - Horizontal partition
- **Replica** - Shard redundancy

### OpenSearch vs Elasticsearch

| Feature | OpenSearch | Elasticsearch |
|---------|-----------|---------------|
| **License** | Apache 2.0 (fully open) | Elastic License (proprietary) |
| **Origin** | Fork of ES 7.10.2 | Original project |
| **Maintainer** | AWS + Community | Elastic |
| **Free Features** | Security, ML, Alerting | Basic features only |
| **Commercial** | AWS OpenSearch Service | Elastic Cloud |
| **Community** | Growing | Established |

---

## Why OpenSearch?

### Advantages

✅ **Truly Open Source**
- Apache 2.0 license
- No vendor lock-in
- Community-driven development

✅ **Feature-Rich**
- Security plugin included
- Alerting built-in
- Anomaly detection (ML)
- SQL/PPL query languages

✅ **AWS Integration**
- Managed service available
- CloudWatch integration
- AWS auth support

✅ **Elasticsearch Compatible**
- Easy migration from ES 7.x
- Similar API
- Familiar ecosystem

✅ **Active Development**
- Regular releases
- Community contributions
- Enterprise support available

### Use Cases
- **Log Analytics** - Application and system logs
- **Security Analytics** - SIEM solutions
- **Application Search** - Full-text search
- **Observability** - APM, metrics, traces
- **Business Analytics** - Data exploration
- **E-Commerce** - Product search

---

## Installation & Setup

### Docker (Quick Start)

```bash
# Single node
docker run -d \
  --name opensearch \
  -p 9200:9200 \
  -p 9600:9600 \
  -e "discovery.type=single-node" \
  -e "OPENSEARCH_INITIAL_ADMIN_PASSWORD=Admin@123" \
  -e "DISABLE_SECURITY_PLUGIN=true" \
  opensearchproject/opensearch:2.11.0

# Verify
curl http://localhost:9200
```

### Docker Compose

**docker-compose.yml**
```yaml
version: '3'

services:
  opensearch-node1:
    image: opensearchproject/opensearch:2.11.0
    container_name: opensearch-node1
    environment:
      - cluster.name=opensearch-cluster
      - node.name=opensearch-node1
      - discovery.seed_hosts=opensearch-node1,opensearch-node2
      - cluster.initial_cluster_manager_nodes=opensearch-node1,opensearch-node2
      - bootstrap.memory_lock=true
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m"
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=Admin@123
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - opensearch-data1:/usr/share/opensearch/data
    ports:
      - 9200:9200
      - 9600:9600
    networks:
      - opensearch-net

  opensearch-node2:
    image: opensearchproject/opensearch:2.11.0
    container_name: opensearch-node2
    environment:
      - cluster.name=opensearch-cluster
      - node.name=opensearch-node2
      - discovery.seed_hosts=opensearch-node1,opensearch-node2
      - cluster.initial_cluster_manager_nodes=opensearch-node1,opensearch-node2
      - bootstrap.memory_lock=true
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m"
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=Admin@123
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - opensearch-data2:/usr/share/opensearch/data
    networks:
      - opensearch-net

  opensearch-dashboards:
    image: opensearchproject/opensearch-dashboards:2.11.0
    container_name: opensearch-dashboards
    ports:
      - 5601:5601
    expose:
      - "5601"
    environment:
      OPENSEARCH_HOSTS: '["https://opensearch-node1:9200","https://opensearch-node2:9200"]'
    networks:
      - opensearch-net

volumes:
  opensearch-data1:
  opensearch-data2:

networks:
  opensearch-net:
```

```bash
docker-compose up -d
```

### Linux Installation

```bash
# Download
wget https://artifacts.opensearch.org/releases/bundle/opensearch/2.11.0/opensearch-2.11.0-linux-x64.tar.gz

# Extract
tar -xzf opensearch-2.11.0-linux-x64.tar.gz
cd opensearch-2.11.0

# Set initial admin password
export OPENSEARCH_INITIAL_ADMIN_PASSWORD=<strong-password>

# Start
./opensearch-tar-install.sh

# Verify
curl -XGET https://localhost:9200 -u 'admin:admin' --insecure
```

### Configuration

**config/opensearch.yml**
```yaml
# Cluster
cluster.name: my-opensearch-cluster
node.name: node-1

# Network
network.host: 0.0.0.0
http.port: 9200

# Discovery
discovery.seed_hosts: ["127.0.0.1"]
cluster.initial_cluster_manager_nodes: ["node-1"]

# Paths
path.data: /var/lib/opensearch
path.logs: /var/log/opensearch

# Memory
bootstrap.memory_lock: true

# Security
plugins.security.ssl.http.enabled: true
plugins.security.allow_default_init_securityindex: true
```

---

## Core Concepts

OpenSearch core concepts are similar to Elasticsearch:

### Index

```bash
# Create index
curl -X PUT "https://localhost:9200/products" \
  -u admin:admin --insecure

# Create with settings
curl -X PUT "https://localhost:9200/products" \
  -u admin:admin --insecure \
  -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_shards": 2,
    "number_of_replicas": 1
  }
}'
```

### Document Operations

```bash
# Index document
curl -X POST "https://localhost:9200/products/_doc" \
  -u admin:admin --insecure \
  -H 'Content-Type: application/json' -d'
{
  "name": "Laptop",
  "price": 999.99,
  "category": "Electronics"
}'

# Get document
curl -X GET "https://localhost:9200/products/_doc/1" \
  -u admin:admin --insecure

# Update
curl -X POST "https://localhost:9200/products/_update/1" \
  -u admin:admin --insecure \
  -H 'Content-Type: application/json' -d'
{
  "doc": {
    "price": 899.99
  }
}'
```

---

## Search & Queries

### Basic Search

```json
GET /products/_search
{
  "query": {
    "match": {
      "name": "laptop"
    }
  }
}
```

### Complex Boolean Query

```json
POST /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "laptop" }}
      ],
      "filter": [
        { "range": { "price": { "lte": 1500 }}}
      ],
      "should": [
        { "term": { "brand.keyword": "Apple" }}
      ],
      "must_not": [
        { "term": { "discontinued": true }}
      ]
    }
  }
}
```

### SQL Query Language

OpenSearch supports SQL queries:

```sql
POST /_plugins/_sql
{
  "query": "SELECT name, price FROM products WHERE price > 500 ORDER BY price DESC"
}
```

### PPL (Piped Processing Language)

```sql
POST /_plugins/_ppl
{
  "query": "source=products | where price > 500 | fields name, price | sort price desc"
}
```

---

## Aggregations

### Metrics Aggregations

```json
GET /products/_search
{
  "size": 0,
  "aggs": {
    "avg_price": {
      "avg": { "field": "price" }
    },
    "price_stats": {
      "stats": { "field": "price" }
    }
  }
}
```

### Bucket Aggregations

```json
GET /products/_search
{
  "size": 0,
  "aggs": {
    "categories": {
      "terms": {
        "field": "category.keyword"
      },
      "aggs": {
        "avg_price": {
          "avg": { "field": "price" }
        }
      }
    }
  }
}
```

---

## OpenSearch Dashboards

**OpenSearch Dashboards** (formerly Kibana) is the visualization tool for OpenSearch.

### Features
- **Discover** - Explore data
- **Visualize** - Create charts
- **Dashboards** - Build dashboards
- **Dev Tools** - Query console
- **Alerting** - Create monitors
- **Security** - User management

### Access

```
http://localhost:5601
```

Default credentials: `admin / Admin@123`

### Creating Index Pattern

1. Navigate to **Stack Management** → **Index Patterns**
2. Create pattern (e.g., `logs-*`)
3. Select timestamp field
4. Save

### Building Visualizations

1. Go to **Visualize**
2. Create new visualization
3. Select type (Line, Bar, Pie, etc.)
4. Configure metrics and buckets
5. Save

---

## Security

### Security Plugin

OpenSearch includes security features by default:

**Features:**
- Authentication (internal, LDAP, SAML, JWT)
- Authorization (role-based access control)
- Encryption (TLS/SSL)
- Audit logging
- Field-level security
- Document-level security

### User Management

```bash
# Create user
curl -X PUT "https://localhost:9200/_plugins/_security/api/internalusers/john" \
  -u admin:admin --insecure \
  -H 'Content-Type: application/json' -d'
{
  "password": "Password123!",
  "opendistro_security_roles": ["readall"]
}'

# Create role
curl -X PUT "https://localhost:9200/_plugins/_security/api/roles/read_only" \
  -u admin:admin --insecure \
  -H 'Content-Type: application/json' -d'
{
  "cluster_permissions": ["cluster_composite_ops_ro"],
  "index_permissions": [{
    "index_patterns": ["products*"],
    "allowed_actions": ["read"]
  }]
}'
```

### TLS/SSL Configuration

```yaml
# opensearch.yml
plugins.security.ssl.transport.pemcert_filepath: node.pem
plugins.security.ssl.transport.pemkey_filepath: node-key.pem
plugins.security.ssl.transport.pemtrustedcas_filepath: root-ca.pem
plugins.security.ssl.http.enabled: true
plugins.security.ssl.http.pemcert_filepath: node.pem
plugins.security.ssl.http.pemkey_filepath: node-key.pem
plugins.security.ssl.http.pemtrustedcas_filepath: root-ca.pem
```

---

## Performance Tuning

### JVM Heap Size

```bash
# Set heap to 50% of RAM (max 32GB)
export OPENSEARCH_JAVA_OPTS="-Xms16g -Xmx16g"
```

### Index Settings

```json
PUT /products/_settings
{
  "index": {
    "refresh_interval": "30s",
    "number_of_replicas": 1,
    "codec": "best_compression"
  }
}
```

### Caching

```json
PUT /products/_settings
{
  "index.queries.cache.enabled": true,
  "index.requests.cache.enable": true
}
```

---

## Plugins

### Built-in Plugins

- **Security** - Authentication, authorization, TLS
- **Alerting** - Monitors and notifications
- **Anomaly Detection** - ML-based anomaly detection
- **Index Management** - ISM policies, snapshots
- **SQL/PPL** - SQL and PPL query support
- **Performance Analyzer** - Performance metrics
- **Asynchronous Search** - Long-running searches
- **k-NN** - K-nearest neighbors for ML

### Anomaly Detection

```json
POST /_plugins/_anomaly_detection/detectors
{
  "name": "cpu-usage-detector",
  "description": "Detect CPU usage anomalies",
  "time_field": "timestamp",
  "indices": ["system-metrics*"],
  "feature_attributes": [
    {
      "feature_name": "cpu_usage",
      "feature_enabled": true,
      "aggregation_query": {
        "cpu_avg": {
          "avg": {
            "field": "cpu.usage"
          }
        }
      }
    }
  ],
  "detection_interval": {
    "period": {
      "interval": 5,
      "unit": "Minutes"
    }
  }
}
```

### Alerting

```json
POST /_plugins/_alerting/monitors
{
  "type": "monitor",
  "name": "High Error Rate",
  "enabled": true,
  "schedule": {
    "period": {
      "interval": 1,
      "unit": "MINUTES"
    }
  },
  "inputs": [{
    "search": {
      "indices": ["logs-*"],
      "query": {
        "query": {
          "bool": {
            "filter": [{
              "range": {
                "timestamp": {
                  "from": "{{period_end}}||-1h",
                  "to": "{{period_end}}"
                }
              }
            }]
          }
        },
        "aggs": {
          "error_count": {
            "value_count": {
              "field": "level.keyword"
            }
          }
        }
      }
    }
  }],
  "triggers": [{
    "name": "Error threshold",
    "severity": "1",
    "condition": {
      "script": {
        "source": "ctx.results[0].aggregations.error_count.value > 100"
      }
    },
    "actions": [{
      "name": "Send notification",
      "destination_id": "slack-channel",
      "message_template": {
        "source": "High error rate detected: {{ctx.results[0].aggregations.error_count.value}} errors"
      }
    }]
  }]
}
```

---

## Migration from Elasticsearch

### Compatibility

OpenSearch 1.x is compatible with Elasticsearch 7.10.2 APIs.

### Migration Steps

1. **Snapshot Elasticsearch data**
```bash
# Create snapshot repository
PUT /_snapshot/my_backup
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups/elasticsearch"
  }
}

# Create snapshot
PUT /_snapshot/my_backup/snapshot_1?wait_for_completion=true
```

2. **Restore to OpenSearch**
```bash
# Register snapshot repository in OpenSearch
PUT /_snapshot/my_backup
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups/elasticsearch"
  }
}

# Restore
POST /_snapshot/my_backup/snapshot_1/_restore
```

3. **Update client libraries**
```bash
# Python
pip install opensearch-py

# JavaScript
npm install @opensearch-project/opensearch
```

---

## Real-World Use Cases

### Log Analytics with OpenSearch

```json
PUT /_index_template/logs
{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": {
      "number_of_shards": 2,
      "number_of_replicas": 1
    },
    "mappings": {
      "properties": {
        "timestamp": { "type": "date" },
        "level": { "type": "keyword" },
        "message": { "type": "text" },
        "service": { "type": "keyword" },
        "host": { "type": "keyword" }
      }
    }
  }
}

GET /logs-*/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "level": "ERROR" }}
      ],
      "filter": [
        {
          "range": {
            "timestamp": {
              "gte": "now-1h"
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "errors_by_service": {
      "terms": {
        "field": "service.keyword"
      }
    }
  }
}
```

---

## Best Practices

### Index Management

```yaml
✅ DO:
- Use Index State Management (ISM) policies
- Implement rollover for time-series data
- Enable compression for older indices
- Use aliases for zero-downtime reindexing

❌ DON'T:
- Create too many small indices
- Store large binary data
- Ignore shard sizing
```

### Security

```yaml
✅ DO:
- Enable TLS/SSL
- Use strong passwords
- Implement RBAC
- Enable audit logging
- Use API keys for applications

❌ DON'T:
- Disable security plugin
- Use default passwords
- Grant unnecessary permissions
```

### Performance

```yaml
✅ DO:
- Use bulk API for indexing
- Enable caching
- Monitor JVM heap
- Use filters instead of queries
- Implement proper shard sizing

❌ DON'T:
- Index one document at a time
- Use wildcards at start of terms
- Deep pagination with from/size
- Over-shard indices
```

---

## Troubleshooting

### Common Issues

```bash
# Check cluster health
curl -X GET "https://localhost:9200/_cluster/health" -u admin:admin --insecure

# Check nodes
curl -X GET "https://localhost:9200/_cat/nodes?v" -u admin:admin --insecure

# Check indices
curl -X GET "https://localhost:9200/_cat/indices?v" -u admin:admin --insecure

# Check allocation
curl -X GET "https://localhost:9200/_cluster/allocation/explain" -u admin:admin --insecure
```

### Performance Analysis

```bash
# Node stats
GET /_nodes/stats

# Hot threads
GET /_nodes/hot_threads

# Task list
GET /_tasks
```

---

## Resources

### Official
- **Website:** https://opensearch.org
- **Documentation:** https://opensearch.org/docs/latest/
- **GitHub:** https://github.com/opensearch-project/OpenSearch
- **Downloads:** https://opensearch.org/downloads.html

### Community
- **Forum:** https://forum.opensearch.org
- **Slack:** https://opensearch.org/slack.html
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/opensearch

### AWS OpenSearch Service
- **Service:** https://aws.amazon.com/opensearch-service/
- **Documentation:** https://docs.aws.amazon.com/opensearch-service/

---

## Conclusion

OpenSearch is a powerful, truly open-source search and analytics engine that provides enterprise-grade features without licensing restrictions. As a community-driven fork of Elasticsearch, it offers familiar APIs while maintaining complete freedom and transparency.

**Key Takeaways:**
- 🆓 100% open source (Apache 2.0)
- 🔍 Full-text search and analytics
- 🔒 Built-in security features
- 🤖 Machine learning capabilities
- 📊 SQL/PPL query support
- 🌐 AWS integration and managed service

Perfect for organizations seeking open-source search and analytics!
