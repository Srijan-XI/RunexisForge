# Typesense - Fast, Typo-Tolerant Search Engine

## Table of Contents
- [Introduction](#introduction)
- [Why Typesense?](#why-typesense)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Schema & Collections](#schema--collections)
- [Document Operations](#document-operations)
- [Searching](#searching)
- [Filtering & Faceting](#filtering--faceting)
- [Sorting & Ranking](#sorting--ranking)
- [Typo Tolerance](#typo-tolerance)
- [Geo Search](#geo-search)
- [Vector Search](#vector-search)
- [High Availability](#high-availability)
- [API Keys & Security](#api-keys--security)
- [SDKs & Integration](#sdks--integration)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Introduction

**Typesense** is an open-source, typo-tolerant search engine optimized for instant search experiences. Built in C++ for blazing-fast performance, Typesense is designed to be easy to use while providing powerful search capabilities.

### Key Features
- **⚡ Lightning Fast** - Written in C++ for maximum performance
- **🔍 Typo Tolerance** - Automatic handling of typos
- **🎯 Tunable Ranking** - Customize search relevance
- **📍 Geo Search** - Location-based search
- **🔢 Faceting** - Dynamic filtering
- **🌐 Multi-Language** - Support for all languages
- **🔒 Secure** - API key-based authentication
- **🚀 Easy to Deploy** - Single binary, Docker-ready
- **🤖 Vector Search** - Semantic/ML-powered search

### Architecture
- **Collection** - Group of related documents
- **Document** - JSON object with fields
- **Schema** - Collection structure definition
- **Field** - Document attribute with type
- **Replica** - Highly available cluster nodes

### Use Cases
- **E-Commerce** - Product catalogs
- **SaaS Applications** - In-app search
- **Job Boards** - Job search
- **Real Estate** - Property listings
- **Documentation** - Knowledge bases
- **Mobile Apps** - Autocomplete

---

## Why Typesense?

### Advantages

✅ **Performance**
- Written in C++ for speed
- In-memory indexing
- Sub-50ms search latency
- Optimized for autocomplete

✅ **Developer Experience**
- Simple RESTful API
- Clear documentation
- Multiple SDKs
- Minimal configuration

✅ **Features**
- Built-in typo tolerance
- Faceted search
- Geo search
- Vector search (semantic)
- Synonyms
- Curation & merchandising

✅ **Deployment**
- Self-hosted or cloud
- High availability cluster
- Automatic replication
- Rolling updates

### Typesense vs Alternatives

| Feature | Typesense | Elasticsearch | Algolia | Meilisearch |
|---------|-----------|---------------|---------|-------------|
| **Language** | C++ | Java | Proprietary | Rust |
| **Performance** | Very fast | Fast | Very fast | Very fast |
| **Setup** | Easy | Complex | Hosted only | Easy |
| **Typo Tolerance** | ✅ Built-in | Requires config | ✅ Built-in | ✅ Built-in |
| **Geo Search** | ✅ | ✅ | ✅ | ⚠️ Limited |
| **Vector Search** | ✅ | ✅ Plugin | ✅ | ❌ |
| **Pricing** | Free/Cloud | Free/Paid | Paid | Free/Cloud |
| **Best For** | Medium data | Large data | Any size | Small-medium data |

---

## Installation & Setup

### Binary Installation

```bash
# Linux
wget https://dl.typesense.org/releases/latest/typesense-server-latest-linux-amd64.tar.gz
tar -xzf typesense-server-latest-linux-amd64.tar.gz
./typesense-server --data-dir=/tmp/typesense-data --api-key=xyz

# macOS
brew install typesense/tap/typesense-server
typesense-server --data-dir=/tmp/typesense-data --api-key=xyz
```

### Docker

```bash
docker run -d \
  --name typesense \
  -p 8108:8108 \
  -v $(pwd)/typesense-data:/data \
  typesense/typesense:26.0 \
  --data-dir /data \
  --api-key=xyz123 \
  --enable-cors
```

### Docker Compose

**docker-compose.yml**
```yaml
version: '3.8'

services:
  typesense:
    image: typesense/typesense:26.0
    container_name: typesense
    ports:
      - "8108:8108"
    volumes:
      - ./typesense-data:/data
    command: '--data-dir /data --api-key=${TYPESENSE_API_KEY} --enable-cors'
    environment:
      - TYPESENSE_API_KEY=xyz123
    restart: unless-stopped
```

```bash
docker-compose up -d
```

### Typesense Cloud

```
https://cloud.typesense.org
```

Features:
- Managed hosting
- Auto-scaling
- High availability
- Automatic backups
- 24/7 support

---

## Core Concepts

### Schema-Based Collections

Unlike Meilisearch, Typesense requires explicit schema definition:

```bash
# Create collection with schema
curl -X POST 'http://localhost:8108/collections' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "products",
    "fields": [
      {"name": "id", "type": "string"},
      {"name": "name", "type": "string"},
      {"name": "description", "type": "string"},
      {"name": "price", "type": "float"},
      {"name": "category", "type": "string", "facet": true},
      {"name": "brand", "type": "string", "facet": true},
      {"name": "rating", "type": "float"},
      {"name": "in_stock", "type": "bool", "facet": true},
      {"name": "created_at", "type": "int64"}
    ],
    "default_sorting_field": "rating"
  }'
```

### Field Types

- **string** - Text field
- **int32** - 32-bit integer
- **int64** - 64-bit integer
- **float** - Floating point
- **bool** - Boolean
- **geopoint** - [lat, lon] array
- **string[]** - Array of strings
- **int32[]** - Array of integers
- **object** - Nested object
- **object[]** - Array of objects
- **auto** - Auto-detect type

---

## Schema & Collections

### Create Collection

```bash
curl -X POST 'http://localhost:8108/collections' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "products",
    "fields": [
      {"name": "id", "type": "string"},
      {"name": "name", "type": "string"},
      {"name": "price", "type": "float"},
      {"name": "tags", "type": "string[]", "facet": true},
      {"name": "location", "type": "geopoint"}
    ],
    "default_sorting_field": "price"
  }'
```

### Update Schema

```bash
# Add new field
curl -X PATCH 'http://localhost:8108/collections/products' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "fields": [
      {"name": "discount", "type": "float", "drop": false}
    ]
  }'
```

### List Collections

```bash
curl 'http://localhost:8108/collections' \
  -H 'X-TYPESENSE-API-KEY: xyz123'
```

### Delete Collection

```bash
curl -X DELETE 'http://localhost:8108/collections/products' \
  -H 'X-TYPESENSE-API-KEY: xyz123'
```

---

## Document Operations

### Index Documents

```bash
# Single document
curl -X POST 'http://localhost:8108/collections/products/documents' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "1",
    "name": "Gaming Laptop",
    "description": "High-performance laptop for gaming",
    "price": 1299.99,
    "category": "Electronics",
    "brand": "TechCorp",
    "rating": 4.5,
    "in_stock": true,
    "created_at": 1704067200
  }'

# Multiple documents (JSONL format)
curl -X POST 'http://localhost:8108/collections/products/documents/import' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: text/plain' \
  --data-binary '
{"id":"1","name":"Gaming Laptop","price":1299.99}
{"id":"2","name":"Wireless Mouse","price":29.99}
{"id":"3","name":"Mechanical Keyboard","price":89.99}'
```

### Update Documents

```bash
# Update (upsert)
curl -X POST 'http://localhost:8108/collections/products/documents/1' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "price": 1199.99
  }'

# Update by query
curl -X PATCH 'http://localhost:8108/collections/products/documents?filter_by=category:Electronics' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "in_stock": false
  }'
```

### Retrieve Documents

```bash
# Get by ID
curl 'http://localhost:8108/collections/products/documents/1' \
  -H 'X-TYPESENSE-API-KEY: xyz123'

# Export all
curl 'http://localhost:8108/collections/products/documents/export' \
  -H 'X-TYPESENSE-API-KEY: xyz123'
```

### Delete Documents

```bash
# Delete by ID
curl -X DELETE 'http://localhost:8108/collections/products/documents/1' \
  -H 'X-TYPESENSE-API-KEY: xyz123'

# Delete by query
curl -X DELETE 'http://localhost:8108/collections/products/documents?filter_by=price:<50' \
  -H 'X-TYPESENSE-API-KEY: xyz123'
```

---

## Searching

### Basic Search

```bash
curl 'http://localhost:8108/collections/products/documents/search?q=laptop&query_by=name,description' \
  -H 'X-TYPESENSE-API-KEY: xyz123'
```

### Advanced Search

```bash
curl -G 'http://localhost:8108/collections/products/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=gaming laptop' \
  --data-urlencode 'query_by=name,description' \
  --data-urlencode 'filter_by=price:<1500 && in_stock:true' \
  --data-urlencode 'sort_by=rating:desc,price:asc' \
  --data-urlencode 'facet_by=category,brand' \
  --data-urlencode 'max_facet_values=20' \
  --data-urlencode 'page=1' \
  --data-urlencode 'per_page=20'
```

### Prefix Search (Autocomplete)

```bash
curl 'http://localhost:8108/collections/products/documents/search?q=lap&query_by=name&prefix=true' \
  -H 'X-TYPESENSE-API-KEY: xyz123'
```

### Phrase Search

```bash
curl 'http://localhost:8108/collections/products/documents/search?q="gaming laptop"&query_by=name' \
  -H 'X-TYPESENSE-API-KEY: xyz123'
```

### Weighted Search Fields

```bash
# Give name 2x weight, description 1x
curl 'http://localhost:8108/collections/products/documents/search?q=laptop&query_by=name,description&query_by_weights=2,1' \
  -H 'X-TYPESENSE-API-KEY: xyz123'
```

---

## Filtering & Faceting

### Filtering

```bash
# Simple filter
filter_by=price:<1000

# Multiple conditions (AND)
filter_by=price:<1000 && in_stock:true

# OR conditions
filter_by=category:=Electronics || category:=Accessories

# Range filter
filter_by=price:[500..1500]

# IN filter
filter_by=brand:[Apple, Samsung, Dell]

# NOT filter
filter_by=category:!=Discontinued
```

### Faceting

```bash
curl -G 'http://localhost:8108/collections/products/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=*' \
  --data-urlencode 'query_by=name' \
  --data-urlencode 'facet_by=category,brand,price' \
  --data-urlencode 'max_facet_values=10'
```

**Response:**
```json
{
  "facet_counts": [
    {
      "field_name": "category",
      "counts": [
        {"value": "Electronics", "count": 45},
        {"value": "Accessories", "count": 23}
      ]
    },
    {
      "field_name": "brand",
      "counts": [
        {"value": "Apple", "count": 15},
        {"value": "Samsung", "count": 12}
      ]
    }
  ],
  "hits": [...]
}
```

---

## Sorting & Ranking

### Sorting

```bash
# Single field
sort_by=price:asc

# Multiple fields
sort_by=rating:desc,price:asc

# Text match score + custom field
sort_by=_text_match:desc,rating:desc
```

### Custom Ranking

```bash
# Boost recent documents
curl -G 'http://localhost:8108/collections/products/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=laptop' \
  --data-urlencode 'query_by=name' \
  --data-urlencode 'sort_by=_text_match:desc,created_at:desc'
```

### Pinning Results

```bash
# Pin specific documents at top
curl -G 'http://localhost:8108/collections/products/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=laptop' \
  --data-urlencode 'query_by=name' \
  --data-urlencode 'pinned_hits=123:1,456:2'  # doc_id:position
```

### Hiding Results

```bash
# Hide specific documents
curl -G 'http://localhost:8108/collections/products/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=laptop' \
  --data-urlencode 'query_by=name' \
  --data-urlencode 'hidden_hits=789,101'
```

---

## Typo Tolerance

Typesense automatically handles typos:

```bash
# "laptap" will match "laptop"
curl 'http://localhost:8108/collections/products/documents/search?q=laptap&query_by=name' \
  -H 'X-TYPESENSE-API-KEY: xyz123'
```

### Configure Typo Tolerance

```bash
# Number of typos tolerated (0, 1, 2)
curl -G 'http://localhost:8108/collections/products/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=laptap' \
  --data-urlencode 'query_by=name' \
  --data-urlencode 'num_typos=2'

# Per-field typo tolerance
curl -G 'http://localhost:8108/collections/products/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=laptap' \
  --data-urlencode 'query_by=name,description' \
  --data-urlencode 'num_typos=2,1'
```

---

## Geo Search

### Index Location Data

```bash
curl -X POST 'http://localhost:8108/collections/locations/documents' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "1",
    "name": "Coffee Shop",
    "location": [37.7749, -122.4194]  # [lat, lon]
  }'
```

### Geo Radius Search

```bash
# Within 5km radius
curl -G 'http://localhost:8108/collections/locations/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=*' \
  --data-urlencode 'query_by=name' \
  --data-urlencode 'filter_by=location:(37.7749, -122.4194, 5 km)'
```

### Geo Polygon Search

```bash
# Within polygon
curl -G 'http://localhost:8108/collections/locations/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=*' \
  --data-urlencode 'query_by=name' \
  --data-urlencode 'filter_by=location:(37.7749,-122.4194, 37.7849,-122.4094, 37.7649,-122.4094)'
```

### Sort by Distance

```bash
curl -G 'http://localhost:8108/collections/locations/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=coffee' \
  --data-urlencode 'query_by=name' \
  --data-urlencode 'sort_by=location(37.7749, -122.4194):asc'
```

---

## Vector Search

### Create Collection with Vector Field

```bash
curl -X POST 'http://localhost:8108/collections' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "documents",
    "fields": [
      {"name": "id", "type": "string"},
      {"name": "content", "type": "string"},
      {"name": "embedding", "type": "float[]", "num_dim": 384}
    ]
  }'
```

### Index with Embeddings

```bash
curl -X POST 'http://localhost:8108/collections/documents/documents' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "1",
    "content": "Machine learning tutorial",
    "embedding": [0.234, 0.876, ..., 0.432]  # 384-dim vector
  }'
```

### Vector Search

```bash
curl -G 'http://localhost:8108/collections/documents/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=*' \
  --data-urlencode 'vector_query=embedding:([0.234, 0.876, ..., 0.432], k:10)'
```

---

## High Availability

### Multi-Node Cluster

**Node 1:**
```bash
./typesense-server \
  --data-dir=/data \
  --api-key=xyz123 \
  --peering-address=node1.example.com:8107 \
  --nodes=node1.example.com:8107,node2.example.com:8107,node3.example.com:8107
```

**Node 2:**
```bash
./typesense-server \
  --data-dir=/data \
  --api-key=xyz123 \
  --peering-address=node2.example.com:8107 \
  --nodes=node1.example.com:8107,node2.example.com:8107,node3.example.com:8107
```

**Node 3:**
```bash
./typesense-server \
  --data-dir=/data \
  --api-key=xyz123 \
  --peering-address=node3.example.com:8107 \
  --nodes=node1.example.com:8107,node2.example.com:8107,node3.example.com:8107
```

---

## API Keys & Security

### Scoped API Keys

```bash
# Search-only key
curl -X POST 'http://localhost:8108/keys' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Search-only key",
    "actions": ["documents:search"],
    "collections": ["products"]
  }'

# Admin key with expiration
curl -X POST 'http://localhost:8108/keys' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Admin key",
    "actions": ["*"],
    "collections": ["*"],
    "expires_at": 1735689600
  }'
```

### Embedded Search Parameters

```bash
# Create key with embedded filters (client can't change)
curl -X POST 'http://localhost:8108/keys' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "User-specific key",
    "actions": ["documents:search"],
    "collections": ["products"],
    "embedded_params": {
      "filter_by": "user_id:123"
    }
  }'
```

---

## SDKs & Integration

### JavaScript

```bash
npm install typesense
```

```javascript
const Typesense = require('typesense');

const client = new Typesense.Client({
  nodes: [{
    host: 'localhost',
    port: '8108',
    protocol: 'http'
  }],
  apiKey: 'xyz123',
  connectionTimeoutSeconds: 2
});

// Search
const results = await client
  .collections('products')
  .documents()
  .search({
    q: 'laptop',
    query_by: 'name,description',
    filter_by: 'price:<1000',
    sort_by: 'rating:desc'
  });

console.log(results.hits);
```

### Python

```bash
pip install typesense
```

```python
import typesense

client = typesense.Client({
    'api_key': 'xyz123',
    'nodes': [{
        'host': 'localhost',
        'port': '8108',
        'protocol': 'http'
    }],
    'connection_timeout_seconds': 2
})

# Search
results = client.collections['products'].documents.search({
    'q': 'laptop',
    'query_by': 'name,description',
    'filter_by': 'price:<1000',
    'sort_by': 'rating:desc'
})

print(results['hits'])
```

---

## Real-World Use Cases

### E-Commerce with Geo Search

```bash
# Create collection
curl -X POST 'http://localhost:8108/collections' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  -d '{
    "name": "stores",
    "fields": [
      {"name": "id", "type": "string"},
      {"name": "name", "type": "string"},
      {"name": "products", "type": "string[]"},
      {"name": "location", "type": "geopoint"},
      {"name": "rating", "type": "float"}
    ],
    "default_sorting_field": "rating"
  }'

# Search nearby stores with specific product
curl -G 'http://localhost:8108/collections/stores/documents/search' \
  -H 'X-TYPESENSE-API-KEY: xyz123' \
  --data-urlencode 'q=*' \
  --data-urlencode 'query_by=name' \
  --data-urlencode 'filter_by=products:=laptop && location:(37.7749, -122.4194, 10 km)' \
  --data-urlencode 'sort_by=location(37.7749, -122.4194):asc,rating:desc'
```

---

## Best Practices

```yaml
✅ DO:
- Define schema explicitly
- Use appropriate field types
- Index only searchable fields
- Leverage faceting for filters
- Use typo tolerance wisely
- Implement pagination
- Create scoped API keys
- Monitor cluster health

❌ DON'T:
- Store large binary data
- Over-index unnecessary fields
- Use wildcard queries without filters
- Expose admin API keys
- Ignore schema design
- Deep pagination (>1000 pages)
```

---

## Troubleshooting

```bash
# Check server health
curl 'http://localhost:8108/health' \
  -H 'X-TYPESENSE-API-KEY: xyz123'

# Get metrics
curl 'http://localhost:8108/metrics.json' \
  -H 'X-TYPESENSE-API-KEY: xyz123'

# Debug mode
./typesense-server --log-level=DEBUG
```

---

## Resources

### Official
- **Website:** https://typesense.org
- **Documentation:** https://typesense.org/docs/
- **GitHub:** https://github.com/typesense/typesense
- **Cloud:** https://cloud.typesense.org

### Community
- **Slack:** https://join.slack.com/t/typesense-community/shared_invite/...
- **GitHub Discussions:** https://github.com/typesense/typesense/discussions

---

## Conclusion

Typesense is a powerful, developer-friendly search engine that combines speed, typo tolerance, and rich features in an easy-to-use package. Built in C++ for maximum performance, it's perfect for building instant search experiences.

**Key Takeaways:**
- ⚡ Blazing-fast C++ implementation
- 🔍 Built-in typo tolerance
- 📍 Geo search capabilities
- 🤖 Vector search support
- 🎯 Tunable ranking
- 🚀 Easy deployment
- 💰 Open-source with cloud option

Perfect for e-commerce, SaaS, and location-based applications!
