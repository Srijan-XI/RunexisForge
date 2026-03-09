# Apache Solr - Enterprise Search Platform

## Table of Contents
- [Introduction](#introduction)
- [Why Solr?](#why-solr)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Schema Design](#schema-design)
- [Indexing Documents](#indexing-documents)
- [Searching & Querying](#searching--querying)
- [Faceting & Filtering](#faceting--filtering)
- [Highlighting](#highlighting)
- [SolrCloud](#solrcloud)
- [Performance Tuning](#performance-tuning)
- [Security](#security)
- [Monitoring](#monitoring)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Introduction

**Apache Solr** is a highly reliable, scalable, fault-tolerant enterprise search platform built on Apache Lucene. It's designed for powerful full-text search, faceting, near real-time indexing, and high-volume web traffic.

### Key Features
- **Full-Text Search** - Advanced text search with ranking
- **Faceted Search** - Dynamic filtering and navigation
- **Hit Highlighting** - Highlight matching terms
- **Real-Time Indexing** - Near real-time document availability
- **Distributed Search** - SolrCloud for horizontal scaling
- **Rich Document Support** - PDF, Word, HTML extraction
- **Geospatial Search** - Location-based queries
- **RESTful API** - JSON/XML responses

### Architecture
- **Core** - Single index with schema and configuration
- **Collection** - Logical index spanning multiple cores (SolrCloud)
- **Shard** - Horizontal partition of data
- **Replica** - Copy of a shard
- **Zookeeper** - Distributed coordination (SolrCloud)

### Use Cases
- **E-Commerce** - Product search and faceting
- **Enterprise Search** - Internal document search
- **Log Analytics** - Structured log searching
- **Business Intelligence** - Data exploration
- **Content Management** - CMS search functionality
- **Customer Support** - Knowledge base search

---

## Why Solr?

### Advantages

✅ **Enterprise-Ready**
- Production-proven at scale
- Built-in admin UI
- Extensive documentation
- Strong community support

✅ **Rich Feature Set**
- Advanced faceting
- Spell checking
- Suggestions/autocomplete
- More Like This (MLT)
- Geospatial search

✅ **Flexible Schema**
- Dynamic fields
- Schema API
- Multi-valued fields
- Copy fields

✅ **Scalability**
- SolrCloud for distribution
- Automatic failover
- Load balancing
- Distributed queries

✅ **Data Import**
- Database import handler
- Rich document processing
- Custom transformers
- Scheduled imports

### Solr vs Elasticsearch

| Feature | Solr | Elasticsearch |
|---------|------|---------------|
| **Maturity** | Older, more established | Newer, more modern |
| **Admin UI** | Built-in, comprehensive | Kibana (separate) |
| **Faceting** | More advanced | Good |
| **Analytics** | Good | Better (aggregations) |
| **Community** | Strong | Larger |
| **Learning Curve** | Steeper | Moderate |
| **Use Case** | Traditional search | Real-time analytics |

---

## Installation & Setup

### Standalone Installation

```bash
# Download Solr
wget https://dlcdn.apache.org/solr/solr/9.4.0/solr-9.4.0.tgz

# Extract
tar xzf solr-9.4.0.tgz
cd solr-9.4.0

# Start Solr
bin/solr start

# Check status
bin/solr status

# Access Admin UI
# http://localhost:8983/solr/
```

### Docker

```bash
# Pull image
docker pull solr:9.4

# Run Solr
docker run -d \
  --name solr \
  -p 8983:8983 \
  solr:9.4

# Create core
docker exec -it solr solr create_core -c products

# Access
# http://localhost:8983/solr/
```

### Docker Compose

**docker-compose.yml**
```yaml
version: '3.8'

services:
  solr:
    image: solr:9.4
    container_name: solr
    ports:
      - "8983:8983"
    volumes:
      - solr-data:/var/solr
    command:
      - solr-precreate
      - products
    networks:
      - solr-network

volumes:
  solr-data:

networks:
  solr-network:
```

```bash
docker-compose up -d
```

### Creating a Core

```bash
# Create core
bin/solr create -c products

# Create with config
bin/solr create -c products -d sample_techproducts_configs

# Delete core
bin/solr delete -c products

# List cores
curl http://localhost:8983/solr/admin/cores?action=STATUS
```

---

## Core Concepts

### Core vs Collection

**Core** - Single Solr index (standalone mode)
```bash
# Create core
bin/solr create -c mycore
```

**Collection** - Distributed index (SolrCloud mode)
```bash
# Create collection
bin/solr create -c mycollection -shards 2 -replicationFactor 2
```

### Document Structure

```xml
<add>
  <doc>
    <field name="id">1</field>
    <field name="name">Laptop</field>
    <field name="price">999.99</field>
    <field name="category">Electronics</field>
    <field name="tags">computer</field>
    <field name="tags">portable</field>
  </doc>
</add>
```

```json
{
  "id": "1",
  "name": "Laptop",
  "price": 999.99,
  "category": "Electronics",
  "tags": ["computer", "portable"]
}
```

---

## Schema Design

### Managed Schema (schema.xml)

**server/solr/mycore/conf/managed-schema**
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<schema name="products" version="1.6">
  
  <!-- Unique Key -->
  <uniqueKey>id</uniqueKey>
  
  <!-- Fields -->
  <field name="id" type="string" indexed="true" stored="true" required="true"/>
  <field name="name" type="text_general" indexed="true" stored="true"/>
  <field name="price" type="pfloat" indexed="true" stored="true"/>
  <field name="category" type="string" indexed="true" stored="true"/>
  <field name="description" type="text_en" indexed="true" stored="true"/>
  <field name="tags" type="string" indexed="true" stored="true" multiValued="true"/>
  <field name="in_stock" type="boolean" indexed="true" stored="true"/>
  <field name="created_at" type="pdate" indexed="true" stored="true"/>
  
  <!-- Copy Fields -->
  <copyField source="name" dest="text"/>
  <copyField source="description" dest="text"/>
  
  <!-- Catch-all field -->
  <field name="text" type="text_general" indexed="true" stored="false" multiValued="true"/>
  
  <!-- Dynamic Fields -->
  <dynamicField name="*_s" type="string" indexed="true" stored="true"/>
  <dynamicField name="*_i" type="pint" indexed="true" stored="true"/>
  <dynamicField name="*_f" type="pfloat" indexed="true" stored="true"/>
  <dynamicField name="*_d" type="pdate" indexed="true" stored="true"/>
  <dynamicField name="*_t" type="text_general" indexed="true" stored="true"/>
  
  <!-- Field Types -->
  <fieldType name="string" class="solr.StrField" sortMissingLast="true"/>
  <fieldType name="boolean" class="solr.BoolField" sortMissingLast="true"/>
  <fieldType name="pint" class="solr.IntPointField"/>
  <fieldType name="pfloat" class="solr.FloatPointField"/>
  <fieldType name="plong" class="solr.LongPointField"/>
  <fieldType name="pdouble" class="solr.DoublePointField"/>
  <fieldType name="pdate" class="solr.DatePointField"/>
  
  <fieldType name="text_general" class="solr.TextField" positionIncrementGap="100">
    <analyzer type="index">
      <tokenizer class="solr.StandardTokenizerFactory"/>
      <filter class="solr.LowerCaseFilterFactory"/>
    </analyzer>
    <analyzer type="query">
      <tokenizer class="solr.StandardTokenizerFactory"/>
      <filter class="solr.LowerCaseFilterFactory"/>
    </analyzer>
  </fieldType>
  
  <fieldType name="text_en" class="solr.TextField" positionIncrementGap="100">
    <analyzer type="index">
      <tokenizer class="solr.StandardTokenizerFactory"/>
      <filter class="solr.LowerCaseFilterFactory"/>
      <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_en.txt"/>
      <filter class="solr.PorterStemFilterFactory"/>
    </analyzer>
    <analyzer type="query">
      <tokenizer class="solr.StandardTokenizerFactory"/>
      <filter class="solr.LowerCaseFilterFactory"/>
      <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_en.txt"/>
      <filter class="solr.PorterStemFilterFactory"/>
    </analyzer>
  </fieldType>
  
</schema>
```

### Schema API

```bash
# Add field
curl -X POST -H 'Content-type:application/json' \
  http://localhost:8983/solr/products/schema \
  -d '{
    "add-field": {
      "name":"brand",
      "type":"string",
      "stored":true
    }
  }'

# Add field type
curl -X POST -H 'Content-type:application/json' \
  http://localhost:8983/solr/products/schema \
  -d '{
    "add-field-type": {
      "name":"text_custom",
      "class":"solr.TextField",
      "analyzer":{
        "tokenizer":{"class":"solr.StandardTokenizerFactory"},
        "filters":[{"class":"solr.LowerCaseFilterFactory"}]
      }
    }
  }'

# Get schema
curl http://localhost:8983/solr/products/schema
```

---

## Indexing Documents

### Add Documents (JSON)

```bash
curl -X POST -H 'Content-Type: application/json' \
  'http://localhost:8983/solr/products/update?commit=true' \
  -d '[
    {
      "id": "1",
      "name": "Gaming Laptop",
      "price": 1299.99,
      "category": "Electronics",
      "tags": ["gaming", "computer", "laptop"]
    },
    {
      "id": "2",
      "name": "Wireless Mouse",
      "price": 29.99,
      "category": "Accessories",
      "tags": ["mouse", "wireless"]
    }
  ]'
```

### Add Documents (XML)

```bash
curl -X POST -H 'Content-Type: application/xml' \
  'http://localhost:8983/solr/products/update?commit=true' \
  -d '<add>
    <doc>
      <field name="id">3</field>
      <field name="name">Mechanical Keyboard</field>
      <field name="price">89.99</field>
    </doc>
  </add>'
```

### Update Document

```bash
# Atomic update
curl -X POST -H 'Content-Type: application/json' \
  'http://localhost:8983/solr/products/update?commit=true' \
  -d '[
    {
      "id": "1",
      "price": {"set": 1199.99}
    }
  ]'

# Partial update operations
# set - Set/replace field value
# add - Add value to multi-valued field
# remove - Remove value from multi-valued field
# inc - Increment numeric value
```

### Delete Documents

```bash
# Delete by ID
curl -X POST -H 'Content-Type: application/json' \
  'http://localhost:8983/solr/products/update?commit=true' \
  -d '{"delete": {"id": "1"}}'

# Delete by query
curl -X POST -H 'Content-Type: application/json' \
  'http://localhost:8983/solr/products/update?commit=true' \
  -d '{"delete": {"query": "category:Accessories"}}'

# Delete all
curl -X POST -H 'Content-Type: application/json' \
  'http://localhost:8983/solr/products/update?commit=true' \
  -d '{"delete": {"query": "*:*"}}'
```

### Commit and Optimize

```bash
# Soft commit (near real-time search)
curl 'http://localhost:8983/solr/products/update?softCommit=true'

# Hard commit (persistent)
curl 'http://localhost:8983/solr/products/update?commit=true'

# Optimize (merge segments)
curl 'http://localhost:8983/solr/products/update?optimize=true'
```

### Data Import Handler (DIH)

**conf/data-config.xml**
```xml
<dataConfig>
  <dataSource 
    type="JdbcDataSource"
    driver="com.mysql.jdbc.Driver"
    url="jdbc:mysql://localhost:3306/mydb"
    user="root"
    password="password"/>
  
  <document>
    <entity name="product"
      query="SELECT id, name, price FROM products"
      deltaImportQuery="SELECT id, name, price FROM products WHERE id='${dih.delta.id}'"
      deltaQuery="SELECT id FROM products WHERE updated_at > '${dih.last_index_time}'">
      
      <field column="id" name="id"/>
      <field column="name" name="name"/>
      <field column="price" name="price"/>
    </entity>
  </document>
</dataConfig>
```

```bash
# Full import
curl 'http://localhost:8983/solr/products/dataimport?command=full-import&clean=true&commit=true'

# Delta import (incremental)
curl 'http://localhost:8983/solr/products/dataimport?command=delta-import&commit=true'
```

---

## Searching & Querying

### Basic Search

```bash
# Search all
curl 'http://localhost:8983/solr/products/select?q=*:*'

# Search by field
curl 'http://localhost:8983/solr/products/select?q=name:laptop'

# Multiple terms
curl 'http://localhost:8983/solr/products/select?q=name:laptop AND category:Electronics'
```

### Query Parameters

```bash
# q - Query
# fq - Filter query (cached)
# fl - Fields to return
# rows - Number of results
# start - Offset for pagination
# sort - Sort order

curl 'http://localhost:8983/solr/products/select?q=laptop&fq=price:[0 TO 1000]&fl=id,name,price&rows=10&start=0&sort=price asc'
```

### Query Parsers

**Standard Query Parser**
```bash
curl 'http://localhost:8983/solr/products/select?q=name:laptop OR description:gaming'
```

**DisMax Query Parser**
```bash
curl 'http://localhost:8983/solr/products/select?defType=dismax&q=laptop gaming&qf=name^2 description&mm=2'
```

**eDisMax (Extended DisMax)**
```bash
curl 'http://localhost:8983/solr/products/select?defType=edismax&q=laptop&qf=name^3 description brand&pf=name^10&mm=75%25'
```

### Range Queries

```bash
# Inclusive range
curl 'http://localhost:8983/solr/products/select?q=price:[100 TO 500]'

# Exclusive range
curl 'http://localhost:8983/solr/products/select?q=price:{100 TO 500}'

# Open-ended
curl 'http://localhost:8983/solr/products/select?q=price:[1000 TO *]'

# Date range
curl 'http://localhost:8983/solr/products/select?q=created_at:[2024-01-01T00:00:00Z TO NOW]'
```

### Wildcard and Fuzzy

```bash
# Wildcard
curl 'http://localhost:8983/solr/products/select?q=name:lap*'

# Fuzzy search (edit distance)
curl 'http://localhost:8983/solr/products/select?q=name:laptap~2'

# Proximity search
curl 'http://localhost:8983/solr/products/select?q=description:"wireless mouse"~10'
```

### Boosting

```bash
# Term boosting
curl 'http://localhost:8983/solr/products/select?q=name:laptop^2 OR description:laptop'

# Function boosting
curl 'http://localhost:8983/solr/products/select?defType=edismax&q=laptop&boost=recip(ms(NOW,created_at),3.16e-11,1,1)'
```

---

## Faceting & Filtering

### Field Faceting

```bash
curl 'http://localhost:8983/solr/products/select?q=*:*&facet=true&facet.field=category&facet.field=brand'
```

**Response:**
```json
{
  "facet_counts": {
    "facet_fields": {
      "category": [
        "Electronics", 150,
        "Accessories", 75,
        "Clothing", 50
      ],
      "brand": [
        "Apple", 45,
        "Samsung", 38,
        "Sony", 30
      ]
    }
  }
}
```

### Range Faceting

```bash
curl 'http://localhost:8983/solr/products/select?q=*:*&facet=true&facet.range=price&facet.range.start=0&facet.range.end=2000&facet.range.gap=200'
```

### Query Faceting

```bash
curl 'http://localhost:8983/solr/products/select?q=*:*&facet=true&facet.query=price:[0 TO 100]&facet.query=price:[100 TO 500]&facet.query=price:[500 TO *]'
```

### Pivot Faceting

```bash
curl 'http://localhost:8983/solr/products/select?q=*:*&facet=true&facet.pivot=category,brand'
```

### JSON Facet API

```bash
curl -X POST 'http://localhost:8983/solr/products/select' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "*:*",
    "facet": {
      "categories": {
        "type": "terms",
        "field": "category",
        "limit": 10,
        "facet": {
          "avg_price": "avg(price)",
          "brands": {
            "type": "terms",
            "field": "brand"
          }
        }
      },
      "price_stats": {
        "type": "query",
        "q": "*:*",
        "facet": {
          "min": "min(price)",
          "max": "max(price)",
          "avg": "avg(price)"
        }
      }
    }
  }'
```

---

## Highlighting

### Basic Highlighting

```bash
curl 'http://localhost:8983/solr/products/select?q=laptop&hl=true&hl.fl=name,description'
```

**Response:**
```json
{
  "highlighting": {
    "1": {
      "name": ["Gaming <em>Laptop</em>"],
      "description": ["High-performance <em>laptop</em> for gaming"]
    }
  }
}
```

### Highlighting Options

```bash
curl 'http://localhost:8983/solr/products/select?
  q=laptop&
  hl=true&
  hl.fl=description&
  hl.simple.pre=<b>&
  hl.simple.post=</b>&
  hl.fragsize=100&
  hl.snippets=3'
```

---

## SolrCloud

### Setup

```bash
# Start Zookeeper
bin/solr zk start

# Start Solr in cloud mode
bin/solr start -c -p 8983 -z localhost:9983
bin/solr start -c -p 7574 -z localhost:9983

# Create collection
bin/solr create -c products -shards 2 -replicationFactor 2
```

### Collection API

```bash
# Create collection
curl 'http://localhost:8983/solr/admin/collections?action=CREATE&name=products&numShards=2&replicationFactor=2'

# Delete collection
curl 'http://localhost:8983/solr/admin/collections?action=DELETE&name=products'

# Add replica
curl 'http://localhost:8983/solr/admin/collections?action=ADDREPLICA&collection=products&shard=shard1'

# Split shard
curl 'http://localhost:8983/solr/admin/collections?action=SPLITSHARD&collection=products&shard=shard1'
```

### Zookeeper Configuration

```bash
# Upload config to Zookeeper
bin/solr zk upconfig -n myconfig -d server/solr/configsets/sample_techproducts_configs/conf -z localhost:9983

# Download config
bin/solr zk downconfig -n myconfig -d /path/to/local -z localhost:9983

# Link collection to config
curl 'http://localhost:8983/solr/admin/collections?action=CREATE&name=products&collection.configName=myconfig'
```

---

## Performance Tuning

### Caching

**solrconfig.xml**
```xml
<!-- Query Result Cache -->
<queryResultCache
  class="solr.CaffeineCache"
  size="512"
  initialSize="512"
  autowarmCount="128"/>

<!-- Document Cache -->
<documentCache
  class="solr.CaffeineCache"
  size="512"
  initialSize="512"
  autowarmCount="0"/>

<!-- Filter Cache -->
<filterCache
  class="solr.CaffeineCache"
  size="512"
  initialSize="512"
  autowarmCount="128"/>
```

### Commit Strategy

```xml
<!-- Auto commit -->
<autoCommit>
  <maxTime>15000</maxTime>
  <maxDocs>10000</maxDocs>
  <openSearcher>false</openSearcher>
</autoCommit>

<!-- Auto soft commit -->
<autoSoftCommit>
  <maxTime>1000</maxTime>
</autoSoftCommit>
```

### JVM Settings

```bash
# Set heap size (50-75% of RAM, max 32GB)
SOLR_HEAP="8g"

# GC settings
GC_TUNE="-XX:+UseG1GC -XX:MaxGCPauseMillis=200"
```

---

## Security

### Authentication

**security.json**
```json
{
  "authentication": {
    "blockUnknown": true,
    "class": "solr.BasicAuthPlugin",
    "credentials": {
      "admin": "IV0EHq1OnNrj6gvRCwvFwTrZ1+z1oBbnQdiVC3otuq0="
    }
  }
}
```

### Authorization

```json
{
  "authorization": {
    "class": "solr.RuleBasedAuthorizationPlugin",
    "permissions": [
      {
        "name": "read",
        "role": ["admin", "user"]
      },
      {
        "name": "update",
        "role": "admin"
      }
    ],
    "user-role": {
      "admin": ["admin"],
      "user": ["user"]
    }
  }
}
```

### SSL/TLS

```bash
# Generate keystore
keytool -genkeypair -alias solr-ssl -keyalg RSA -keysize 2048 -keystore solr-ssl.keystore.p12 -storetype PKCS12

# Enable SSL
SOLR_SSL_KEY_STORE=/path/to/solr-ssl.keystore.p12
SOLR_SSL_KEY_STORE_PASSWORD=secret
SOLR_SSL_TRUST_STORE=/path/to/solr-ssl.keystore.p12
SOLR_SSL_TRUST_STORE_PASSWORD=secret
SOLR_SSL_NEED_CLIENT_AUTH=false
SOLR_SSL_WANT_CLIENT_AUTH=false
```

---

## Monitoring

### Metrics API

```bash
# JVM metrics
curl 'http://localhost:8983/solr/admin/metrics?group=jvm'

# Core metrics
curl 'http://localhost:8983/solr/admin/metrics?group=core&prefix=QUERY'

# Cache statistics
curl 'http://localhost:8983/solr/admin/metrics?group=core&prefix=CACHE'
```

### Admin UI

Access: http://localhost:8983/solr/

Features:
- Core/Collection overview
- Query interface
- Schema browser
- Log viewer
- JVM metrics
- Thread dump

---

## Real-World Use Cases

### E-Commerce Search

```bash
# Product search with facets and highlighting
curl -X POST 'http://localhost:8983/solr/products/select' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "gaming laptop",
    "filter": [
      "price:[500 TO 2000]",
      "in_stock:true"
    ],
    "fields": ["id", "name", "price", "brand", "rating"],
    "facet": {
      "brands": {
        "type": "terms",
        "field": "brand",
        "limit": 10
      },
      "price_ranges": {
        "type": "range",
        "field": "price",
        "start": 0,
        "end": 3000,
        "gap": 500
      }
    },
    "params": {
      "defType": "edismax",
      "qf": "name^3 description brand",
      "pf": "name^10",
      "hl": "true",
      "hl.fl": "name,description"
    },
    "sort": "score desc, price asc",
    "limit": 20
  }'
```

---

## Best Practices

### Schema Design

```yaml
✅ DO:
- Use appropriate field types
- Enable docValues for sorting/faceting
- Use copyField for catch-all search
- Plan dynamic fields carefully
- Use stored=false for large text fields

❌ DON'T:
- Over-index (indexed=true everywhere)
- Use stored=true for all fields
- Create too many dynamic fields
- Change schema frequently in production
```

### Indexing

```yaml
✅ DO:
- Batch documents for bulk indexing
- Use soft commits for NRT
- Optimize after bulk loads
- Monitor segment count
- Use atomic updates when possible

❌ DON'T:
- Commit after each document
- Optimize during heavy indexing
- Index without schema planning
- Ignore segment merging
```

### Querying

```yaml
✅ DO:
- Use filter queries (fq) for caching
- Limit fields returned (fl)
- Use pagination properly
- Monitor cache hit rates
- Use appropriate query parser

❌ DON'T:
- Return all fields (fl=*)
- Deep pagination (start>10000)
- Complex queries without caching
- Wildcard at start of terms
```

---

## Troubleshooting

### Common Issues

```bash
# Check status
bin/solr status

# Check logs
tail -f server/logs/solr.log

# Health check
curl 'http://localhost:8983/solr/admin/ping'

# Core status
curl 'http://localhost:8983/solr/admin/cores?action=STATUS&core=products'

# Check memory
curl 'http://localhost:8983/solr/admin/metrics?group=jvm&prefix=memory'
```

### Performance Issues

```yaml
# Slow queries
- Check cache hit rates
- Review query complexity
- Analyze slow query logs
- Optimize schema (docValues)

# Memory issues
- Increase JVM heap
- Tune cache sizes
- Review field storage
- Monitor GC logs
```

---

## Resources

### Official
- **Website:** https://solr.apache.org
- **Documentation:** https://solr.apache.org/guide/
- **Download:** https://solr.apache.org/downloads.html
- **Wiki:** https://cwiki.apache.org/confluence/display/SOLR

### Community
- **Mailing Lists:** https://solr.apache.org/community.html#mailing-lists-irc
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/solr
- **Slack:** https://solr.apache.org/community.html#slack

### Learning
- **Solr Tutorial:** https://solr.apache.org/guide/solr/latest/getting-started/tutorial-films.html
- **Apache Solr Reference Guide:** https://solr.apache.org/guide/

---

## Conclusion

Apache Solr is a mature, feature-rich enterprise search platform built for scalability and reliability. Its extensive faceting capabilities, rich query language, and SolrCloud distribution make it ideal for e-commerce, enterprise search, and content management use cases.

**Key Takeaways:**
- 🔍 Powerful full-text search
- 📊 Advanced faceting and filtering
- 🎯 Rich document support
- 🌐 SolrCloud for horizontal scaling
- 🛠️ Built-in admin UI
- 🏢 Enterprise-ready features

Perfect for e-commerce, enterprise search, and content platforms!
