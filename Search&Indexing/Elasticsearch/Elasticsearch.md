# Elasticsearch - Distributed Search and Analytics Engine

## Table of Contents
- [Introduction](#introduction)
- [Why Elasticsearch?](#why-elasticsearch)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Index Management](#index-management)
- [Document Operations](#document-operations)
- [Search & Queries](#search--queries)
- [Aggregations](#aggregations)
- [Mappings & Analysis](#mappings--analysis)
- [Cluster Management](#cluster-management)
- [Performance Optimization](#performance-optimization)
- [Security](#security)
- [Monitoring & Observability](#monitoring--observability)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Introduction

**Elasticsearch** is a distributed, RESTful search and analytics engine built on Apache Lucene. It's designed for horizontal scalability, high availability, and real-time search capabilities across massive datasets.

### Key Features
- **Full-Text Search** - Advanced text search with relevance scoring
- **Distributed** - Horizontally scalable across nodes
- **Real-Time** - Near real-time indexing and search
- **RESTful API** - JSON-based HTTP API
- **Schema-Free** - Dynamic mapping of JSON documents
- **Multi-Tenancy** - Multiple indices and types
- **Analytics** - Aggregations and analytics on data
- **Geospatial** - Location-based search

### Architecture
- **Cluster** - Collection of nodes
- **Node** - Single Elasticsearch instance
- **Index** - Collection of documents
- **Shard** - Horizontal partition of an index
- **Replica** - Copy of a shard for redundancy

### Use Cases
- **Full-Text Search** - Website search, e-commerce
- **Log Analytics** - ELK Stack (Elasticsearch, Logstash, Kibana)
- **Application Monitoring** - APM, metrics
- **Security Analytics** - SIEM solutions
- **Business Analytics** - Data insights
- **Geospatial Search** - Location-based services

---

## Why Elasticsearch?

### Advantages

✅ **Speed**
- Near real-time search
- Distributed architecture
- In-memory caching
- Optimized for read operations

✅ **Scalability**
- Horizontal scaling
- Automatic shard distribution
- Petabyte-scale data handling

✅ **Flexibility**
- Schema-free JSON documents
- Dynamic mapping
- Multi-field support
- Custom analyzers

✅ **Rich Query DSL**
- Complex boolean queries
- Full-text search
- Fuzzy matching
- Geo queries

✅ **Ecosystem**
- Kibana for visualization
- Logstash for data ingestion
- Beats for data shipping
- X-Pack for security

### When to Use Elasticsearch
- Full-text search requirements
- Real-time data analytics
- Log and event data analysis
- Complex aggregations
- Geo-location search
- High-volume read operations

### When NOT to Use
- ACID transactions required
- Primary data store (use as secondary)
- Frequent updates/deletes
- Strong consistency needed

---

## Installation & Setup

### Docker (Recommended for Development)

```bash
# Single node
docker run -d \
  --name elasticsearch \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.11.0

# Verify
curl http://localhost:9200
```

### Docker Compose

**docker-compose.yml**
```yaml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
      - "9300:9300"
    volumes:
      - esdata:/usr/share/elasticsearch/data
    networks:
      - elastic

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch
    networks:
      - elastic

volumes:
  esdata:

networks:
  elastic:
```

```bash
docker-compose up -d
```

### Linux Installation

```bash
# Import GPG key
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg

# Add repository (Debian/Ubuntu)
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list

# Install
sudo apt-get update
sudo apt-get install elasticsearch

# Start service
sudo systemctl start elasticsearch
sudo systemctl enable elasticsearch

# Verify
curl -X GET "localhost:9200/"
```

### macOS Installation

```bash
# Homebrew
brew tap elastic/tap
brew install elastic/tap/elasticsearch-full

# Start
brew services start elastic/tap/elasticsearch-full

# Verify
curl http://localhost:9200
```

### Configuration

**/etc/elasticsearch/elasticsearch.yml**
```yaml
# Cluster name
cluster.name: my-cluster

# Node name
node.name: node-1

# Network
network.host: 0.0.0.0
http.port: 9200

# Discovery
discovery.seed_hosts: ["127.0.0.1"]
cluster.initial_master_nodes: ["node-1"]

# Paths
path.data: /var/lib/elasticsearch
path.logs: /var/log/elasticsearch

# Memory
bootstrap.memory_lock: true

# Security (X-Pack)
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
```

---

## Core Concepts

### Index

An index is a collection of documents with similar characteristics.

```bash
# Create index
curl -X PUT "localhost:9200/products"

# Create with settings
curl -X PUT "localhost:9200/products" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  }
}'

# List indices
curl -X GET "localhost:9200/_cat/indices?v"

# Delete index
curl -X DELETE "localhost:9200/products"
```

### Document

A document is a JSON object stored in an index.

```bash
# Index document (auto ID)
curl -X POST "localhost:9200/products/_doc" -H 'Content-Type: application/json' -d'
{
  "name": "Laptop",
  "price": 999.99,
  "category": "Electronics"
}'

# Index document (custom ID)
curl -X PUT "localhost:9200/products/_doc/1" -H 'Content-Type: application/json' -d'
{
  "name": "Phone",
  "price": 699.99,
  "category": "Electronics"
}'

# Get document
curl -X GET "localhost:9200/products/_doc/1"

# Update document
curl -X POST "localhost:9200/products/_update/1" -H 'Content-Type: application/json' -d'
{
  "doc": {
    "price": 649.99
  }
}'

# Delete document
curl -X DELETE "localhost:9200/products/_doc/1"
```

### Shards and Replicas

```
Index (products)
├── Primary Shard 0
│   └── Replica Shard 0
├── Primary Shard 1
│   └── Replica Shard 1
└── Primary Shard 2
    └── Replica Shard 2
```

---

## Index Management

### Index Settings

```json
PUT /products
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1,
    "refresh_interval": "1s",
    "max_result_window": 10000,
    "analysis": {
      "analyzer": {
        "custom_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "asciifolding"]
        }
      }
    }
  }
}
```

### Index Templates

```json
PUT /_index_template/logs_template
{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": {
      "number_of_shards": 1,
      "number_of_replicas": 1
    },
    "mappings": {
      "properties": {
        "timestamp": {
          "type": "date"
        },
        "message": {
          "type": "text"
        },
        "level": {
          "type": "keyword"
        }
      }
    }
  }
}
```

### Aliases

```bash
# Create alias
POST /_aliases
{
  "actions": [
    {
      "add": {
        "index": "products-v1",
        "alias": "products"
      }
    }
  ]
}

# Switch alias to new index (zero-downtime reindexing)
POST /_aliases
{
  "actions": [
    { "remove": { "index": "products-v1", "alias": "products" }},
    { "add": { "index": "products-v2", "alias": "products" }}
  ]
}
```

### Reindex

```json
POST /_reindex
{
  "source": {
    "index": "products-old"
  },
  "dest": {
    "index": "products-new"
  }
}
```

---

## Document Operations

### Bulk API

```json
POST /_bulk
{ "index": { "_index": "products", "_id": "1" }}
{ "name": "Laptop", "price": 999.99 }
{ "index": { "_index": "products", "_id": "2" }}
{ "name": "Mouse", "price": 29.99 }
{ "update": { "_index": "products", "_id": "1" }}
{ "doc": { "price": 899.99 }}
{ "delete": { "_index": "products", "_id": "2" }}
```

### Multi-Get

```json
GET /_mget
{
  "docs": [
    { "_index": "products", "_id": "1" },
    { "_index": "products", "_id": "2" }
  ]
}
```

### Update By Query

```json
POST /products/_update_by_query
{
  "script": {
    "source": "ctx._source.price *= 0.9",
    "lang": "painless"
  },
  "query": {
    "term": {
      "category": "Electronics"
    }
  }
}
```

### Delete By Query

```json
POST /products/_delete_by_query
{
  "query": {
    "range": {
      "price": {
        "lt": 10
      }
    }
  }
}
```

---

## Search & Queries

### Basic Search

```json
GET /products/_search
{
  "query": {
    "match_all": {}
  }
}
```

### Match Query

```json
GET /products/_search
{
  "query": {
    "match": {
      "name": "laptop computer"
    }
  }
}
```

### Term Query

```json
GET /products/_search
{
  "query": {
    "term": {
      "category.keyword": "Electronics"
    }
  }
}
```

### Boolean Query

```json
GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "laptop" }}
      ],
      "filter": [
        { "range": { "price": { "gte": 500, "lte": 1500 }}}
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

### Range Query

```json
GET /products/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 100,
        "lte": 500
      }
    }
  }
}
```

### Fuzzy Query

```json
GET /products/_search
{
  "query": {
    "fuzzy": {
      "name": {
        "value": "laptap",
        "fuzziness": "AUTO"
      }
    }
  }
}
```

### Wildcard and Prefix

```json
GET /products/_search
{
  "query": {
    "wildcard": {
      "name.keyword": "*phone*"
    }
  }
}

GET /products/_search
{
  "query": {
    "prefix": {
      "name.keyword": "lap"
    }
  }
}
```

### Multi-Match

```json
GET /products/_search
{
  "query": {
    "multi_match": {
      "query": "laptop gaming",
      "fields": ["name^3", "description", "category"]
    }
  }
}
```

### Nested Query

```json
GET /products/_search
{
  "query": {
    "nested": {
      "path": "reviews",
      "query": {
        "bool": {
          "must": [
            { "range": { "reviews.rating": { "gte": 4 }}},
            { "match": { "reviews.comment": "excellent" }}
          ]
        }
      }
    }
  }
}
```

### Geo Query

```json
GET /stores/_search
{
  "query": {
    "geo_distance": {
      "distance": "10km",
      "location": {
        "lat": 40.7128,
        "lon": -74.0060
      }
    }
  }
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
      "avg": {
        "field": "price"
      }
    },
    "max_price": {
      "max": {
        "field": "price"
      }
    },
    "min_price": {
      "min": {
        "field": "price"
      }
    },
    "sum_price": {
      "sum": {
        "field": "price"
      }
    },
    "stats_price": {
      "stats": {
        "field": "price"
      }
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
    "by_category": {
      "terms": {
        "field": "category.keyword",
        "size": 10
      },
      "aggs": {
        "avg_price": {
          "avg": {
            "field": "price"
          }
        }
      }
    }
  }
}
```

### Histogram

```json
GET /products/_search
{
  "size": 0,
  "aggs": {
    "price_ranges": {
      "histogram": {
        "field": "price",
        "interval": 100
      }
    }
  }
}
```

### Date Histogram

```json
GET /logs/_search
{
  "size": 0,
  "aggs": {
    "by_date": {
      "date_histogram": {
        "field": "timestamp",
        "calendar_interval": "day"
      }
    }
  }
}
```

---

## Mappings & Analysis

### Explicit Mapping

```json
PUT /products
{
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "price": {
        "type": "float"
      },
      "category": {
        "type": "keyword"
      },
      "tags": {
        "type": "keyword"
      },
      "description": {
        "type": "text",
        "analyzer": "english"
      },
      "created_at": {
        "type": "date"
      },
      "location": {
        "type": "geo_point"
      }
    }
  }
}
```

### Custom Analyzer

```json
PUT /articles
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "char_filter": ["html_strip"],
          "filter": ["lowercase", "stop", "snowball"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "analyzer": "my_analyzer"
      }
    }
  }
}
```

### Data Types

- **Text Types:** `text`, `keyword`
- **Numeric Types:** `long`, `integer`, `short`, `byte`, `double`, `float`
- **Date Type:** `date`
- **Boolean:** `boolean`
- **Binary:** `binary`
- **Range Types:** `integer_range`, `float_range`, `date_range`
- **Complex Types:** `object`, `nested`
- **Geo Types:** `geo_point`, `geo_shape`
- **Special Types:** `ip`, `completion`, `token_count`

---

## Cluster Management

### Cluster Health

```bash
GET /_cluster/health

GET /_cat/health?v

GET /_cat/nodes?v

GET /_cat/shards?v
```

### Node Roles

- **Master** - Cluster management
- **Data** - Store data and execute queries
- **Ingest** - Pre-process documents
- **Coordinating** - Route requests

### Cluster Settings

```json
PUT /_cluster/settings
{
  "persistent": {
    "cluster.routing.allocation.disk.watermark.low": "85%",
    "cluster.routing.allocation.disk.watermark.high": "90%"
  }
}
```

### Snapshot and Restore

```json
PUT /_snapshot/my_backup
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups/elasticsearch"
  }
}

PUT /_snapshot/my_backup/snapshot_1?wait_for_completion=true
{
  "indices": "products,logs",
  "include_global_state": false
}

POST /_snapshot/my_backup/snapshot_1/_restore
```

---

## Performance Optimization

### Indexing Performance

```yaml
# Bulk indexing
- Use bulk API
- Increase refresh_interval during bulk indexing
- Disable replicas during initial load
- Use auto-generated IDs
- Optimize _source field

# Settings for bulk indexing
PUT /my_index/_settings
{
  "index.refresh_interval": "30s",
  "index.number_of_replicas": 0
}
```

### Search Performance

```yaml
# Query optimization
- Use filters instead of queries when possible
- Avoid scripts in queries
- Use keyword fields for exact matching
- Limit result size
- Use search_after for pagination
- Enable request cache for aggregations

# Cache settings
PUT /my_index/_settings
{
  "index.queries.cache.enabled": true,
  "index.requests.cache.enable": true
}
```

### Shard Sizing

```yaml
# Best practices
- Shard size: 10-50 GB optimal
- Number of shards: Based on data size
- Replicas: At least 1 for HA
- Max shards per node: ~20 per GB of heap
```

---

## Security

### Authentication

```yaml
# Enable X-Pack Security
xpack.security.enabled: true

# Create users
bin/elasticsearch-users useradd john -p password123 -r superuser

# API key
POST /_security/api_key
{
  "name": "my-api-key",
  "role_descriptors": {
    "role-a": {
      "cluster": ["all"],
      "index": [
        {
          "names": ["index-a*"],
          "privileges": ["read"]
        }
      ]
    }
  }
}
```

### Role-Based Access Control

```json
POST /_security/role/read_only_role
{
  "indices": [
    {
      "names": ["products*"],
      "privileges": ["read"]
    }
  ]
}
```

### TLS/SSL

```yaml
# elasticsearch.yml
xpack.security.transport.ssl.enabled: true
xpack.security.transport.ssl.verification_mode: certificate
xpack.security.transport.ssl.keystore.path: elastic-certificates.p12
xpack.security.transport.ssl.truststore.path: elastic-certificates.p12
```

---

## Monitoring & Observability

### Monitoring APIs

```bash
# Cluster stats
GET /_cluster/stats

# Node stats
GET /_nodes/stats

# Index stats
GET /products/_stats

# Task management
GET /_tasks

# Hot threads
GET /_nodes/hot_threads
```

### Slow Logs

```json
PUT /products/_settings
{
  "index.search.slowlog.threshold.query.warn": "10s",
  "index.search.slowlog.threshold.query.info": "5s",
  "index.search.slowlog.threshold.query.debug": "2s",
  "index.indexing.slowlog.threshold.index.warn": "10s"
}
```

---

## Real-World Use Cases

### E-Commerce Product Search

```json
GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "gaming laptop",
            "fields": ["name^3", "description", "brand^2"]
          }
        }
      ],
      "filter": [
        { "range": { "price": { "lte": 2000 }}},
        { "term": { "in_stock": true }}
      ]
    }
  },
  "aggs": {
    "brands": {
      "terms": { "field": "brand.keyword" }
    },
    "price_ranges": {
      "range": {
        "field": "price",
        "ranges": [
          { "to": 500 },
          { "from": 500, "to": 1000 },
          { "from": 1000, "to": 2000 },
          { "from": 2000 }
        ]
      }
    }
  },
  "sort": [
    { "_score": "desc" },
    { "price": "asc" }
  ]
}
```

### Log Analytics

```json
GET /logs-*/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "message": "error" }}
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
    "errors_over_time": {
      "date_histogram": {
        "field": "timestamp",
        "calendar_interval": "5m"
      }
    },
    "top_errors": {
      "terms": {
        "field": "error_type.keyword",
        "size": 10
      }
    }
  }
}
```

---

## Best Practices

### Index Design

```yaml
✅ DO:
- Use index templates for time-series data
- Implement index lifecycle management (ILM)
- Use aliases for zero-downtime reindexing
- Keep shard size between 10-50 GB
- Plan for growth

❌ DON'T:
- Create too many small shards
- Use parent-child relationships (use nested instead)
- Store large binary data
- Over-shard your indices
```

### Query Optimization

```yaml
✅ DO:
- Use filter context when possible (cacheable)
- Limit result size
- Use search_after for deep pagination
- Profile queries to find bottlenecks
- Use keyword fields for exact matching

❌ DON'T:
- Use wildcard queries at the start of terms
- Fetch all fields if not needed
- Use scripts in queries unless necessary
- Use deep pagination with from/size
```

### Data Modeling

```yaml
✅ DO:
- Denormalize data for better search performance
- Use nested objects for arrays of objects
- Plan field mappings before indexing
- Use appropriate field types
- Consider multi-fields for different use cases

❌ DON'T:
- Normalize like relational databases
- Change mappings on existing indices
- Use dynamic mapping in production
- Store unanalyzed text in text fields
```

---

## Troubleshooting

### Common Issues

```bash
# Unassigned shards
GET /_cluster/allocation/explain

# Cluster is yellow/red
GET /_cluster/health?level=indices

# Slow queries
GET /products/_search
{
  "profile": true,
  "query": { ... }
}

# Memory issues
GET /_nodes/stats/jvm

# Disk space issues
GET /_cat/allocation?v
```

### Performance Tuning

```yaml
# JVM heap size (50% of RAM, max 32GB)
-Xms16g
-Xmx16g

# File descriptors (increase OS limit)
ulimit -n 65535

# Virtual memory
sysctl -w vm.max_map_count=262144
```

---

## Resources

### Official
- **Website:** https://www.elastic.co/elasticsearch/
- **Documentation:** https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html
- **Download:** https://www.elastic.co/downloads/elasticsearch
- **Discuss:** https://discuss.elastic.co

### Learning
- **Elastic Training:** https://www.elastic.co/training/
- **YouTube Channel:** https://www.youtube.com/c/OfficialElasticVideos
- **GitHub:** https://github.com/elastic/elasticsearch

### Community
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/elasticsearch
- **Reddit:** https://www.reddit.com/r/elasticsearch/

---

## Conclusion

Elasticsearch is a powerful, scalable search and analytics engine that excels at full-text search, real-time analytics, and handling massive datasets. Its distributed architecture, rich query DSL, and extensive ecosystem make it the go-to solution for search and analytics use cases.

**Key Takeaways:**
- 🔍 Powerful full-text search capabilities
- 📊 Real-time analytics and aggregations
- 🌐 Horizontally scalable architecture
- ⚡ Near real-time indexing and search
- 🛠️ Rich ecosystem (ELK/Elastic Stack)
- 🔒 Enterprise security features

Perfect for search, logging, analytics, and monitoring!
