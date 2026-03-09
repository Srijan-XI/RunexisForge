# Meilisearch - Lightning Fast Search Engine

## Table of Contents
- [Introduction](#introduction)
- [Why Meilisearch?](#why-meilisearch)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Index Management](#index-management)
- [Document Operations](#document-operations)
- [Searching](#searching)
- [Filtering & Faceting](#filtering--faceting)
- [Ranking & Relevancy](#ranking--relevancy)
- [Typo Tolerance](#typo-tolerance)
- [Synonyms & Stop Words](#synonyms--stop-words)
- [Multi-Tenancy](#multi-tenancy)
- [API Keys & Security](#api-keys--security)
- [SDKs & Integration](#sdks--integration)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Introduction

**Meilisearch** is an open-source, lightning-fast, and highly relevant search engine designed for instant search experiences. It's built in Rust for performance and provides a delightful developer experience with minimal configuration.

### Key Features
- **⚡ Instant Search** - Sub-50ms response times
- **🔍 Typo Tolerant** - Handles misspellings automatically
- **📊 Faceted Search** - Filter and refine results
- **🌍 Multi-Language** - Support for 30+ languages
- **🎨 Customizable Ranking** - Fine-tune relevancy
- **🔒 Secure** - Built-in API key management
- **🚀 Easy to Deploy** - Single binary, Docker, or cloud
- **💾 Lightweight** - Low resource footprint

### Architecture
- **Index** - Collection of documents
- **Document** - JSON object with unique ID
- **Primary Key** - Unique identifier field
- **Settings** - Index configuration
- **Tasks** - Asynchronous operations

### Use Cases
- **E-Commerce** - Product search
- **SaaS Applications** - In-app search
- **Documentation** - Technical docs search
- **Content Platforms** - Article/blog search
- **Mobile Apps** - Fast autocomplete
- **Knowledge Bases** - Internal search

---

## Why Meilisearch?

### Advantages

✅ **Developer-Friendly**
- Simple RESTful API
- Minimal configuration
- Great documentation
- Quick setup (< 5 minutes)

✅ **Performance**
- Sub-50ms search responses
- Optimized for small to medium datasets
- Efficient memory usage
- Built in Rust

✅ **User Experience**
- Typo tolerance out of the box
- Instant results as you type
- Relevant ranking by default
- Highlighting

✅ **Features**
- Faceted search
- Filtering
- Sorting
- Synonyms
- Geo-search
- Multi-tenancy

### Meilisearch vs Competitors

| Feature | Meilisearch | Elasticsearch | Algolia |
|---------|-------------|---------------|---------|
| **Setup** | Very easy | Complex | Hosted only |
| **Speed** | Very fast | Fast | Very fast |
| **Typo Tolerance** | ✅ Built-in | Requires config | ✅ Built-in |
| **Pricing** | Free (open-source) | Free/Paid | Paid only |
| **Deployment** | Self-hosted/Cloud | Self-hosted/Cloud | Hosted |
| **Best For** | Small-medium data | Large data | Any size |
| **Learning Curve** | Easy | Steep | Easy |

---

## Installation & Setup

### Binary Installation

```bash
# Linux/macOS
curl -L https://install.meilisearch.com | sh

# Start Meilisearch
./meilisearch

# Access
# http://localhost:7700
```

### Docker

```bash
# Run Meilisearch
docker run -d \
  --name meilisearch \
  -p 7700:7700 \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:latest

# With master key
docker run -d \
  --name meilisearch \
  -p 7700:7700 \
  -e MEILI_MASTER_KEY=<your-master-key> \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:latest
```

### Docker Compose

**docker-compose.yml**
```yaml
version: '3.8'

services:
  meilisearch:
    image: getmeili/meilisearch:v1.5
    container_name: meilisearch
    ports:
      - "7700:7700"
    environment:
      - MEILI_MASTER_KEY=your-master-key-change-this
      - MEILI_ENV=production
      - MEILI_DB_PATH=/meili_data/data.ms
      - MEILI_HTTP_ADDR=0.0.0.0:7700
    volumes:
      - ./meili_data:/meili_data
    restart: unless-stopped
```

```bash
docker-compose up -d
```

### Cloud Deployment

**Meilisearch Cloud**
```
https://cloud.meilisearch.com
```

Features:
- Managed hosting
- Auto-scaling
- Automatic backups
- Monitoring

---

## Core Concepts

### Index

An index is where documents are stored and searched.

```bash
# Create index
curl -X POST 'http://localhost:7700/indexes' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "uid": "products",
    "primaryKey": "id"
  }'

# List indexes
curl 'http://localhost:7700/indexes'

# Get index
curl 'http://localhost:7700/indexes/products'

# Delete index
curl -X DELETE 'http://localhost:7700/indexes/products'
```

### Documents

Documents are JSON objects stored in an index.

```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance gaming laptop",
  "price": 1299.99,
  "category": "Electronics",
  "brand": "TechCorp",
  "in_stock": true
}
```

---

## Index Management

### Index Settings

```bash
# Update settings
curl -X PATCH 'http://localhost:7700/indexes/products/settings' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "searchableAttributes": [
      "name",
      "description",
      "brand"
    ],
    "filterableAttributes": [
      "category",
      "brand",
      "price",
      "in_stock"
    ],
    "sortableAttributes": [
      "price",
      "name"
    ],
    "rankingRules": [
      "words",
      "typo",
      "proximity",
      "attribute",
      "sort",
      "exactness"
    ],
    "stopWords": ["the", "a", "an"],
    "synonyms": {
      "laptop": ["notebook", "computer"],
      "phone": ["smartphone", "mobile"]
    }
  }'

# Get settings
curl 'http://localhost:7700/indexes/products/settings'
```

### Displayed Attributes

```bash
# Configure displayed attributes
curl -X PUT 'http://localhost:7700/indexes/products/settings/displayed-attributes' \
  -H 'Content-Type: application/json' \
  --data-binary '["id", "name", "price", "category"]'
```

### Distinct Attribute

```bash
# Set distinct attribute (deduplicate results)
curl -X PUT 'http://localhost:7700/indexes/products/settings/distinct-attribute' \
  -H 'Content-Type: application/json' \
  --data-binary '"product_id"'
```

---

## Document Operations

### Add Documents

```bash
# Add single document
curl -X POST 'http://localhost:7700/indexes/products/documents' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "id": 1,
    "name": "Gaming Laptop",
    "price": 1299.99,
    "category": "Electronics"
  }'

# Add multiple documents
curl -X POST 'http://localhost:7700/indexes/products/documents' \
  -H 'Content-Type: application/json' \
  --data-binary '[
    {
      "id": 1,
      "name": "Gaming Laptop",
      "price": 1299.99
    },
    {
      "id": 2,
      "name": "Wireless Mouse",
      "price": 29.99
    }
  ]'

# Add from file
curl -X POST 'http://localhost:7700/indexes/products/documents' \
  -H 'Content-Type: application/json' \
  --data-binary @products.json
```

### Update Documents

```bash
# Update (partial update)
curl -X PUT 'http://localhost:7700/indexes/products/documents' \
  -H 'Content-Type: application/json' \
  --data-binary '[
    {
      "id": 1,
      "price": 1199.99
    }
  ]'
```

### Get Documents

```bash
# Get all documents
curl 'http://localhost:7700/indexes/products/documents'

# Get specific document
curl 'http://localhost:7700/indexes/products/documents/1'

# Get with parameters
curl 'http://localhost:7700/indexes/products/documents?limit=20&offset=0'
```

### Delete Documents

```bash
# Delete single document
curl -X DELETE 'http://localhost:7700/indexes/products/documents/1'

# Delete multiple documents
curl -X POST 'http://localhost:7700/indexes/products/documents/delete-batch' \
  -H 'Content-Type: application/json' \
  --data-binary '[1, 2, 3]'

# Delete all documents
curl -X DELETE 'http://localhost:7700/indexes/products/documents'
```

---

## Searching

### Basic Search

```bash
# Simple search
curl -X POST 'http://localhost:7700/indexes/products/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "laptop"
  }'

# Search with parameters
curl -X POST 'http://localhost:7700/indexes/products/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "gaming laptop",
    "limit": 20,
    "offset": 0,
    "attributesToRetrieve": ["id", "name", "price"],
    "attributesToHighlight": ["name", "description"]
  }'
```

### Response Example

```json
{
  "hits": [
    {
      "id": 1,
      "name": "Gaming Laptop",
      "price": 1299.99,
      "_formatted": {
        "name": "<em>Gaming</em> <em>Laptop</em>",
        "description": "High-performance <em>gaming</em> <em>laptop</em>"
      }
    }
  ],
  "query": "gaming laptop",
  "processingTimeMs": 2,
  "limit": 20,
  "offset": 0,
  "estimatedTotalHits": 1
}
```

---

## Filtering & Faceting

### Filtering

```bash
curl -X POST 'http://localhost:7700/indexes/products/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "laptop",
    "filter": "price < 1000 AND in_stock = true"
  }'

# Multiple conditions
curl -X POST 'http://localhost:7700/indexes/products/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "",
    "filter": [
      "category = Electronics",
      ["brand = Apple", "brand = Samsung"],
      "price 500 TO 1500"
    ]
  }'
```

### Faceting

```bash
curl -X POST 'http://localhost:7700/indexes/products/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "laptop",
    "facets": ["category", "brand", "price"]
  }'
```

**Response:**
```json
{
  "hits": [...],
  "facetDistribution": {
    "category": {
      "Electronics": 45,
      "Accessories": 12
    },
    "brand": {
      "Apple": 15,
      "Dell": 20,
      "HP": 10
    }
  }
}
```

---

## Ranking & Relevancy

### Ranking Rules

Meilisearch uses these ranking rules (in order):

1. **Words** - Number of matching query words
2. **Typo** - Number of typos
3. **Proximity** - Word proximity in document
4. **Attribute** - Attribute order in searchableAttributes
5. **Sort** - Custom sorting
6. **Exactness** - Exact matches vs prefix matches

### Custom Ranking

```bash
curl -X PUT 'http://localhost:7700/indexes/products/settings/ranking-rules' \
  -H 'Content-Type: application/json' \
  --data-binary '[
    "words",
    "typo",
    "proximity",
    "attribute",
    "sort",
    "exactness",
    "desc(popularity)",
    "asc(price)"
  ]'
```

### Sorting

```bash
curl -X POST 'http://localhost:7700/indexes/products/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "laptop",
    "sort": ["price:asc", "name:desc"]
  }'
```

---

## Typo Tolerance

Meilisearch handles typos automatically:

```bash
# "laptap" will match "laptop"
curl -X POST 'http://localhost:7700/indexes/products/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "laptap"
  }'
```

### Configure Typo Tolerance

```bash
curl -X PATCH 'http://localhost:7700/indexes/products/settings/typo-tolerance' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "enabled": true,
    "minWordSizeForTypos": {
      "oneTypo": 5,
      "twoTypos": 9
    },
    "disableOnWords": ["apple", "samsung"],
    "disableOnAttributes": ["brand"]
  }'
```

---

## Synonyms & Stop Words

### Synonyms

```bash
curl -X PUT 'http://localhost:7700/indexes/products/settings/synonyms' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "laptop": ["notebook", "computer", "portable computer"],
    "phone": ["smartphone", "mobile", "cell phone"],
    "tv": ["television", "tele"]
  }'
```

### Stop Words

```bash
curl -X PUT 'http://localhost:7700/indexes/products/settings/stop-words' \
  -H 'Content-Type: application/json' \
  --data-binary '["the", "a", "an", "of", "to"]'
```

---

## Multi-Tenancy

### Tenant Separation

```bash
# Create index per tenant
curl -X POST 'http://localhost:7700/indexes' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "uid": "tenant_123_products",
    "primaryKey": "id"
  }'

# Or use filtering
curl -X POST 'http://localhost:7700/indexes/products/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "laptop",
    "filter": "tenant_id = 123"
  }'
```

---

## API Keys & Security

### Master Key

```bash
# Set master key on startup
./meilisearch --master-key="your-master-key"

# Or via environment variable
export MEILI_MASTER_KEY="your-master-key"
./meilisearch
```

### API Keys

```bash
# Create API key
curl -X POST 'http://localhost:7700/keys' \
  -H 'Authorization: Bearer your-master-key' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "description": "Search key for products",
    "actions": ["search"],
    "indexes": ["products"],
    "expiresAt": "2025-12-31T23:59:59Z"
  }'

# List API keys
curl 'http://localhost:7700/keys' \
  -H 'Authorization: Bearer your-master-key'

# Delete API key
curl -X DELETE 'http://localhost:7700/keys/key-uid' \
  -H 'Authorization: Bearer your-master-key'
```

### Using API Keys

```bash
curl -X POST 'http://localhost:7700/indexes/products/search' \
  -H 'Authorization: Bearer your-api-key' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "laptop"
  }'
```

---

## SDKs & Integration

### JavaScript/TypeScript

```bash
npm install meilisearch
```

```javascript
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: 'your-api-key',
});

// Add documents
await client.index('products').addDocuments([
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Mouse', price: 29.99 },
]);

// Search
const results = await client.index('products').search('laptop', {
  filter: 'price < 1000',
  limit: 20,
});

console.log(results.hits);
```

### Python

```bash
pip install meilisearch
```

```python
import meilisearch

client = meilisearch.Client('http://localhost:7700', 'your-api-key')

# Add documents
index = client.index('products')
index.add_documents([
    {'id': 1, 'name': 'Laptop', 'price': 999.99},
    {'id': 2, 'name': 'Mouse', 'price': 29.99},
])

# Search
results = index.search('laptop', {
    'filter': 'price < 1000',
    'limit': 20
})

print(results['hits'])
```

### React Integration

```bash
npm install react-instantsearch @meilisearch/instant-meilisearch
```

```jsx
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
  'http://localhost:7700',
  'your-api-key'
);

function App() {
  return (
    <InstantSearch indexName="products" searchClient={searchClient}>
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
}
```

---

## Real-World Use Cases

### E-Commerce Product Search

```bash
# Setup
curl -X PATCH 'http://localhost:7700/indexes/products/settings' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "searchableAttributes": ["name", "description", "brand", "category"],
    "filterableAttributes": ["category", "brand", "price", "in_stock", "rating"],
    "sortableAttributes": ["price", "rating", "name"],
    "rankingRules": [
      "words",
      "typo",
      "proximity",
      "attribute",
      "sort",
      "exactness",
      "desc(rating)",
      "asc(price)"
    ]
  }'

# Search with filters and sorting
curl -X POST 'http://localhost:7700/indexes/products/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "laptop",
    "filter": "category = Electronics AND in_stock = true AND price < 1500",
    "facets": ["brand", "category", "price"],
    "sort": ["rating:desc"],
    "limit": 20
  }'
```

---

## Best Practices

### Index Design

```yaml
✅ DO:
- Keep documents under 10,000 per index for best performance
- Use descriptive index names
- Set filterable/sortable attributes appropriately
- Configure ranking rules based on use case

❌ DON'T:
- Store large binary data
- Index unnecessary attributes
- Over-use stop words
- Ignore typo tolerance settings
```

### Performance

```yaml
✅ DO:
- Use pagination (limit/offset)
- Filter before searching when possible
- Configure appropriate cache size
- Monitor RAM usage

❌ DON'T:
- Return all documents (use reasonable limits)
- Store very large documents
- Index files (extract text first)
```

### Security

```yaml
✅ DO:
- Always use master key in production
- Create specific API keys for different clients
- Set expiration dates on API keys
- Use HTTPS in production

❌ DON'T:
- Expose master key to clients
- Share API keys between applications
- Use default settings in production
```

---

## Troubleshooting

### Common Issues

```bash
# Check Meilisearch status
curl 'http://localhost:7700/health'

# Get stats
curl 'http://localhost:7700/stats'

# Check tasks
curl 'http://localhost:7700/tasks'

# Get version
curl 'http://localhost:7700/version'
```

### Logs

```bash
# Run with logging
RUST_LOG=debug ./meilisearch

# Docker logs
docker logs meilisearch -f
```

---

## Resources

### Official
- **Website:** https://www.meilisearch.com
- **Documentation:** https://www.meilisearch.com/docs
- **GitHub:** https://github.com/meilisearch/meilisearch
- **Cloud:** https://cloud.meilisearch.com

### Community
- **Discord:** https://discord.meilisearch.com
- **GitHub Discussions:** https://github.com/meilisearch/meilisearch/discussions
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/meilisearch

### Learning
- **Playground:** https://www.meilisearch.com/demos
- **Blog:** https://blog.meilisearch.com

---

## Conclusion

Meilisearch is a powerful, developer-friendly search engine that delivers instant, typo-tolerant search with minimal configuration. Its focus on speed, relevance, and ease of use makes it perfect for applications requiring fast, user-friendly search experiences.

**Key Takeaways:**
- ⚡ Lightning-fast search responses
- 🔍 Built-in typo tolerance
- 🎯 Excellent out-of-box relevancy
- 🚀 Easy setup and deployment
- 💰 Open-source and free
- 🔒 Built-in security features

Perfect for e-commerce, SaaS apps, and content platforms!
