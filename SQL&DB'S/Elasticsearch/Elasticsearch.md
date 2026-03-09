# Elasticsearch

## Introduction

Elasticsearch is a distributed, RESTful search and analytics engine built on Apache Lucene. It's designed for horizontal scalability, maximum reliability, and easy management. Elasticsearch excels at full-text search, structured search, analytics, and all combinations of these use cases.

### Key Features

- **Full-Text Search**: Advanced text analysis and relevance scoring
- **Distributed Architecture**: Automatically distributes data and query load across nodes
- **Near Real-Time**: Index and search data with minimal latency
- **Schema-Free JSON**: Index JSON documents without explicit schema definition
- **RESTful API**: Simple HTTP-based API for all operations
- **Aggregations**: Powerful analytics and data summarization capabilities
- **Multi-Tenancy**: Support for multiple indices with different configurations
- **Scalability**: Horizontal scaling by adding more nodes
- **High Availability**: Automatic replication and failover

### Common Use Cases

- **Application Search**: Add search capabilities to applications
- **Log and Event Analytics**: Centralized logging (ELK Stack)
- **Security Analytics**: Security information and event management (SIEM)
- **Business Analytics**: Real-time analytics and visualizations
- **Infrastructure Monitoring**: Metrics and performance monitoring
- **Geospatial Search**: Location-based queries and analysis
- **E-commerce Search**: Product catalogs and recommendations

## Installation & Setup

### Docker Installation

```bash
# Pull Elasticsearch image
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.11.0

# Run single-node cluster
docker run -d \
  --name elasticsearch \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.11.0

# Verify installation
curl http://localhost:9200
```

### Docker Compose Setup

```yaml
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    container_name: elasticsearch
    environment:
      - node.name=es-node01
      - cluster.name=es-cluster
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
      - 9300:9300
    networks:
      - elastic

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    container_name: kibana
    ports:
      - 5601:5601
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    networks:
      - elastic
    depends_on:
      - elasticsearch

volumes:
  esdata:
    driver: local

networks:
  elastic:
    driver: bridge
```

### Linux Installation (Ubuntu/Debian)

```bash
# Install prerequisites
sudo apt-get update
sudo apt-get install -y apt-transport-https

# Import Elasticsearch GPG key
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg

# Add repository
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list

# Install Elasticsearch
sudo apt-get update
sudo apt-get install elasticsearch

# Configure Elasticsearch
sudo nano /etc/elasticsearch/elasticsearch.yml

# Start service
sudo systemctl daemon-reload
sudo systemctl enable elasticsearch
sudo systemctl start elasticsearch

# Check status
sudo systemctl status elasticsearch
```

### Configuration Basics

**elasticsearch.yml**:
```yaml
# Cluster
cluster.name: my-application
node.name: node-1

# Network
network.host: 0.0.0.0
http.port: 9200

# Discovery
discovery.seed_hosts: ["host1", "host2"]
cluster.initial_master_nodes: ["node-1", "node-2"]

# Memory
bootstrap.memory_lock: true

# Paths
path.data: /var/lib/elasticsearch
path.logs: /var/log/elasticsearch
```

## Core Concepts

### Index

An index is a collection of documents with similar characteristics. It's analogous to a database in relational databases.

```bash
# Create index
curl -X PUT "localhost:9200/products"

# Create index with settings
curl -X PUT "localhost:9200/products" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2
  }
}
'
```

### Document

A document is a basic unit of information that can be indexed, represented in JSON format.

```bash
# Index a document
curl -X POST "localhost:9200/products/_doc/1" -H 'Content-Type: application/json' -d'
{
  "name": "Laptop",
  "brand": "TechCorp",
  "price": 999.99,
  "category": "Electronics"
}
'
```

### Mapping

Mapping defines how documents and fields are stored and indexed.

```bash
# Define mapping
curl -X PUT "localhost:9200/products" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "brand": { "type": "keyword" },
      "price": { "type": "double" },
      "category": { "type": "keyword" },
      "description": { "type": "text" },
      "created_at": { "type": "date" },
      "in_stock": { "type": "boolean" },
      "location": { "type": "geo_point" }
    }
  }
}
'
```

### Shards and Replicas

- **Primary Shard**: Original shard containing data
- **Replica Shard**: Copy of primary shard for redundancy

```bash
# Configure shards
curl -X PUT "localhost:9200/products" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_shards": 5,
    "number_of_replicas": 1
  }
}
'
```

## CRUD Operations

### Create/Index Documents

```bash
# Index with auto-generated ID
curl -X POST "localhost:9200/products/_doc" -H 'Content-Type: application/json' -d'
{
  "name": "Wireless Mouse",
  "price": 29.99
}
'

# Index with specific ID
curl -X PUT "localhost:9200/products/_doc/1" -H 'Content-Type: application/json' -d'
{
  "name": "Laptop",
  "price": 999.99
}
'

# Bulk indexing
curl -X POST "localhost:9200/_bulk" -H 'Content-Type: application/json' -d'
{ "index": { "_index": "products", "_id": "1" } }
{ "name": "Product 1", "price": 10.99 }
{ "index": { "_index": "products", "_id": "2" } }
{ "name": "Product 2", "price": 20.99 }
'
```

### Read/Retrieve Documents

```bash
# Get document by ID
curl -X GET "localhost:9200/products/_doc/1"

# Get multiple documents
curl -X GET "localhost:9200/products/_mget" -H 'Content-Type: application/json' -d'
{
  "ids": ["1", "2", "3"]
}
'

# Check if document exists
curl -I "localhost:9200/products/_doc/1"
```

### Update Documents

```bash
# Update document
curl -X POST "localhost:9200/products/_update/1" -H 'Content-Type: application/json' -d'
{
  "doc": {
    "price": 899.99
  }
}
'

# Update with script
curl -X POST "localhost:9200/products/_update/1" -H 'Content-Type: application/json' -d'
{
  "script": {
    "source": "ctx._source.price *= params.multiplier",
    "params": {
      "multiplier": 0.9
    }
  }
}
'

# Upsert
curl -X POST "localhost:9200/products/_update/1" -H 'Content-Type: application/json' -d'
{
  "doc": {
    "price": 999.99
  },
  "doc_as_upsert": true
}
'
```

### Delete Documents

```bash
# Delete document
curl -X DELETE "localhost:9200/products/_doc/1"

# Delete by query
curl -X POST "localhost:9200/products/_delete_by_query" -H 'Content-Type: application/json' -d'
{
  "query": {
    "match": {
      "category": "obsolete"
    }
  }
}
'
```

## Search Queries

### Basic Search

```bash
# Search all documents
curl -X GET "localhost:9200/products/_search"

# Match query
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "match": {
      "name": "laptop"
    }
  }
}
'

# Multi-match query
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "multi_match": {
      "query": "wireless",
      "fields": ["name", "description"]
    }
  }
}
'
```

### Term-Level Queries

```bash
# Term query (exact match)
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "term": {
      "brand": "TechCorp"
    }
  }
}
'

# Terms query (multiple values)
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "terms": {
      "category": ["Electronics", "Computers"]
    }
  }
}
'

# Range query
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "range": {
      "price": {
        "gte": 100,
        "lte": 1000
      }
    }
  }
}
'
```

### Boolean Queries

```bash
# Boolean query
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "laptop" } }
      ],
      "filter": [
        { "range": { "price": { "gte": 500 } } }
      ],
      "must_not": [
        { "term": { "brand": "BrandX" } }
      ],
      "should": [
        { "term": { "category": "Premium" } }
      ]
    }
  }
}
'
```

### Full-Text Search

```bash
# Match phrase query
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "match_phrase": {
      "description": "high performance laptop"
    }
  }
}
'

# Fuzzy query (typo tolerance)
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "fuzzy": {
      "name": {
        "value": "lapto",
        "fuzziness": "AUTO"
      }
    }
  }
}
'

# Wildcard query
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "wildcard": {
      "name": "*book*"
    }
  }
}
'
```

## Aggregations

### Metric Aggregations

```bash
# Average
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "aggs": {
    "avg_price": {
      "avg": { "field": "price" }
    }
  }
}
'

# Statistics
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "aggs": {
    "price_stats": {
      "stats": { "field": "price" }
    }
  }
}
'

# Percentiles
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "aggs": {
    "price_percentiles": {
      "percentiles": { 
        "field": "price",
        "percents": [25, 50, 75, 95, 99]
      }
    }
  }
}
'
```

### Bucket Aggregations

```bash
# Terms aggregation
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "aggs": {
    "categories": {
      "terms": { 
        "field": "category",
        "size": 10
      }
    }
  }
}
'

# Histogram
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
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
'

# Date histogram
curl -X GET "localhost:9200/logs/_search" -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "aggs": {
    "sales_over_time": {
      "date_histogram": {
        "field": "timestamp",
        "calendar_interval": "day"
      }
    }
  }
}
'
```

### Nested Aggregations

```bash
# Nested aggregation
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "aggs": {
    "categories": {
      "terms": { "field": "category" },
      "aggs": {
        "avg_price": {
          "avg": { "field": "price" }
        }
      }
    }
  }
}
'
```

## Client Libraries

### Python (elasticsearch-py)

```python
from elasticsearch import Elasticsearch

# Connect to Elasticsearch
es = Elasticsearch(['http://localhost:9200'])

# Index a document
doc = {
    'name': 'Laptop',
    'brand': 'TechCorp',
    'price': 999.99,
    'category': 'Electronics'
}
es.index(index='products', id=1, document=doc)

# Search
query = {
    'query': {
        'match': {
            'name': 'laptop'
        }
    }
}
result = es.search(index='products', body=query)

# Print results
for hit in result['hits']['hits']:
    print(hit['_source'])

# Aggregation
agg_query = {
    'size': 0,
    'aggs': {
        'avg_price': {
            'avg': {'field': 'price'}
        }
    }
}
result = es.search(index='products', body=agg_query)
print(result['aggregations']['avg_price']['value'])
```

### Node.js (@elastic/elasticsearch)

```javascript
const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200' });

// Index a document
async function indexDocument() {
  await client.index({
    index: 'products',
    id: '1',
    document: {
      name: 'Laptop',
      brand: 'TechCorp',
      price: 999.99,
      category: 'Electronics'
    }
  });
}

// Search
async function search() {
  const result = await client.search({
    index: 'products',
    query: {
      match: { name: 'laptop' }
    }
  });
  
  console.log(result.hits.hits);
}

// Aggregation
async function aggregate() {
  const result = await client.search({
    index: 'products',
    size: 0,
    aggs: {
      avg_price: {
        avg: { field: 'price' }
      }
    }
  });
  
  console.log(result.aggregations.avg_price.value);
}

// Run functions
indexDocument();
search();
aggregate();
```

### Java (Elasticsearch Java Client)

```java
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.*;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;

public class ElasticsearchExample {
    public static void main(String[] args) throws Exception {
        // Create client
        RestClient restClient = RestClient.builder(
            new HttpHost("localhost", 9200)
        ).build();
        
        ElasticsearchClient client = new ElasticsearchClient(
            new RestClientTransport(
                restClient,
                new JacksonJsonpMapper()
            )
        );
        
        // Index document
        Product product = new Product("Laptop", "TechCorp", 999.99);
        IndexResponse response = client.index(i -> i
            .index("products")
            .id("1")
            .document(product)
        );
        
        // Search
        SearchResponse<Product> searchResponse = client.search(s -> s
            .index("products")
            .query(q -> q
                .match(m -> m
                    .field("name")
                    .query("laptop")
                )
            ),
            Product.class
        );
        
        searchResponse.hits().hits().forEach(hit -> {
            System.out.println(hit.source());
        });
        
        restClient.close();
    }
}

class Product {
    private String name;
    private String brand;
    private double price;
    
    public Product(String name, String brand, double price) {
        this.name = name;
        this.brand = brand;
        this.price = price;
    }
    
    // Getters and setters
}
```

## Advanced Features

### Analyzers

```bash
# Custom analyzer
curl -X PUT "localhost:9200/products" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "custom_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "stop", "snowball"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "description": {
        "type": "text",
        "analyzer": "custom_analyzer"
      }
    }
  }
}
'

# Test analyzer
curl -X POST "localhost:9200/products/_analyze" -H 'Content-Type: application/json' -d'
{
  "analyzer": "custom_analyzer",
  "text": "The quick brown foxes jumped over the lazy dogs"
}
'
```

### Highlighting

```bash
# Highlight search results
curl -X GET "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "match": { "description": "laptop" }
  },
  "highlight": {
    "fields": {
      "description": {}
    }
  }
}
'
```

### Suggestions

```bash
# Completion suggester
curl -X PUT "localhost:9200/products" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "suggest": {
        "type": "completion"
      }
    }
  }
}
'

# Get suggestions
curl -X POST "localhost:9200/products/_search" -H 'Content-Type: application/json' -d'
{
  "suggest": {
    "product-suggest": {
      "prefix": "lap",
      "completion": {
        "field": "suggest"
      }
    }
  }
}
'
```

### Geospatial Queries

```bash
# Geo-point mapping
curl -X PUT "localhost:9200/locations" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "location": {
        "type": "geo_point"
      }
    }
  }
}
'

# Geo-distance query
curl -X GET "localhost:9200/locations/_search" -H 'Content-Type: application/json' -d'
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
'
```

## Index Management

### Index Templates

```bash
# Create index template
curl -X PUT "localhost:9200/_index_template/logs_template" -H 'Content-Type: application/json' -d'
{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": {
      "number_of_shards": 1
    },
    "mappings": {
      "properties": {
        "timestamp": { "type": "date" },
        "message": { "type": "text" }
      }
    }
  }
}
'
```

### Aliases

```bash
# Create alias
curl -X POST "localhost:9200/_aliases" -H 'Content-Type: application/json' -d'
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
'

# Switch alias
curl -X POST "localhost:9200/_aliases" -H 'Content-Type: application/json' -d'
{
  "actions": [
    { "remove": { "index": "products-v1", "alias": "products" } },
    { "add": { "index": "products-v2", "alias": "products" } }
  ]
}
'
```

### Reindex

```bash
# Reindex data
curl -X POST "localhost:9200/_reindex" -H 'Content-Type: application/json' -d'
{
  "source": {
    "index": "products-old"
  },
  "dest": {
    "index": "products-new"
  }
}
'
```

### Snapshots

```bash
# Register repository
curl -X PUT "localhost:9200/_snapshot/my_backup" -H 'Content-Type: application/json' -d'
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups/my_backup"
  }
}
'

# Create snapshot
curl -X PUT "localhost:9200/_snapshot/my_backup/snapshot_1?wait_for_completion=true"

# Restore snapshot
curl -X POST "localhost:9200/_snapshot/my_backup/snapshot_1/_restore"
```

## Performance Optimization

### Index Settings

```bash
# Optimize for indexing
curl -X PUT "localhost:9200/products/_settings" -H 'Content-Type: application/json' -d'
{
  "index": {
    "refresh_interval": "30s",
    "number_of_replicas": 0
  }
}
'

# After indexing, optimize for search
curl -X PUT "localhost:9200/products/_settings" -H 'Content-Type: application/json' -d'
{
  "index": {
    "refresh_interval": "1s",
    "number_of_replicas": 1
  }
}
'
```

### Force Merge

```bash
# Force merge
curl -X POST "localhost:9200/products/_forcemerge?max_num_segments=1"
```

### Caching

```bash
# Use request cache
curl -X GET "localhost:9200/products/_search?request_cache=true" -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "aggs": {
    "categories": {
      "terms": { "field": "category" }
    }
  }
}
'
```

## Monitoring

### Cluster Health

```bash
# Check cluster health
curl -X GET "localhost:9200/_cluster/health?pretty"

# Node stats
curl -X GET "localhost:9200/_nodes/stats?pretty"

# Index stats
curl -X GET "localhost:9200/products/_stats?pretty"
```

### Cat APIs

```bash
# Cat indices
curl -X GET "localhost:9200/_cat/indices?v"

# Cat nodes
curl -X GET "localhost:9200/_cat/nodes?v"

# Cat shards
curl -X GET "localhost:9200/_cat/shards?v"

# Cat health
curl -X GET "localhost:9200/_cat/health?v"
```

## Security

### X-Pack Security

```yaml
# Enable security in elasticsearch.yml
xpack.security.enabled: true
xpack.security.enrollment.enabled: true
```

```bash
# Create users
bin/elasticsearch-users useradd myuser -p mypassword -r superuser

# Reset password
bin/elasticsearch-reset-password -u elastic

# Authenticate
curl -u elastic:password -X GET "localhost:9200/_cluster/health"
```

### API Keys

```bash
# Create API key
curl -X POST "localhost:9200/_security/api_key" -u elastic:password -H 'Content-Type: application/json' -d'
{
  "name": "my-api-key",
  "role_descriptors": {
    "role-a": {
      "cluster": ["all"],
      "index": [
        {
          "names": ["*"],
          "privileges": ["all"]
        }
      ]
    }
  }
}
'
```

## Best Practices

### Data Modeling

1. **Denormalize data** - Store related data together in documents
2. **Use appropriate field types** - Match data types to your use case
3. **Avoid deep nesting** - Keep document structure relatively flat
4. **Use keyword for exact matching** - Reserve text for full-text search

### Indexing

1. **Bulk operations** - Use bulk API for multiple documents
2. **Disable refresh during bulk indexing** - Set `refresh_interval: -1`
3. **Use routing** - Control document distribution across shards
4. **Optimize shard size** - Target 10-50GB per shard

### Searching

1. **Filter before query** - Use filter context for exact matches
2. **Use pagination** - Implement scroll or search_after for large result sets
3. **Limit field retrieval** - Use `_source` filtering
4. **Cache queries** - Leverage request cache for aggregations

### Cluster Management

1. **Monitor cluster health** - Regularly check cluster status
2. **Plan shard allocation** - Balance shards across nodes
3. **Use replicas** - Configure at least 1 replica for high availability
4. **Regular snapshots** - Backup data frequently

## Resources

### Official Documentation

- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Elasticsearch API Reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html)
- [Elastic Stack](https://www.elastic.co/elastic-stack/)

### Tools & Integrations

- [Kibana](https://www.elastic.co/kibana/) - Visualization and analytics
- [Logstash](https://www.elastic.co/logstash/) - Data processing pipeline
- [Beats](https://www.elastic.co/beats/) - Lightweight data shippers
- [Elasticsearch Service](https://www.elastic.co/cloud/) - Managed Elasticsearch

### Learning Resources

- [Elastic Certified Engineer](https://www.elastic.co/training/certification)
- [Elasticsearch: The Definitive Guide](https://www.elastic.co/guide/en/elasticsearch/guide/current/index.html)
- [Elastic Blog](https://www.elastic.co/blog/)
- [Discuss Forums](https://discuss.elastic.co/)

### Community

- [GitHub Repository](https://github.com/elastic/elasticsearch)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/elasticsearch)
- [Reddit r/elasticsearch](https://www.reddit.com/r/elasticsearch/)

---

**Related Technologies**: [Logstash](../../Cloud-DevOps/ELK-OpenSearch/), [Kibana](../../Cloud-DevOps/ELK-OpenSearch/), [OpenSearch](../../Search&Indexing/), [Apache Solr](../../Search&Indexing/)
