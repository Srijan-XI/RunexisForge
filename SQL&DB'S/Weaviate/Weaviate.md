# Weaviate

## Introduction

Weaviate is an open-source vector database that stores both objects and vectors, allowing for combining vector search with structured filtering. It's designed for AI-native applications, machine learning workloads, and semantic search use cases.

### What is Weaviate?

Weaviate is a cloud-native, modular, real-time vector database built to scale your AI and ML applications. It uses machine learning models to vectorize and store data, enabling semantic search, recommendations, and other AI-powered features out of the box.

### Key Features

- **Vector Search**: Native support for vector similarity search using ANN algorithms
- **Hybrid Search**: Combine vector search with keyword-based search
- **Multi-modal Support**: Store and search text, images, and other data types
- **GraphQL API**: Query data using GraphQL
- **RESTful API**: Standard REST endpoints for CRUD operations
- **Modules System**: Extensible with vectorizers, readers, and generators
- **CRUD Operations**: Full support for create, read, update, delete
- **Filtering**: Combine vector search with powerful WHERE filters
- **Aggregations**: Perform complex aggregations on your data
- **Multi-tenancy**: Built-in support for isolated data partitions

### Use Cases

- **Semantic Search**: Find similar content based on meaning, not just keywords
- **Recommendation Systems**: Build personalized recommendation engines
- **Question Answering**: Create intelligent Q&A systems
- **Image Search**: Search images by visual similarity
- **Anomaly Detection**: Identify outliers in vector space
- **RAG Applications**: Retrieval-Augmented Generation for LLMs
- **Chatbots**: Power conversational AI with semantic understanding
- **E-commerce Search**: Improve product discovery with semantic search

### Weaviate vs Traditional Databases

| Feature | Weaviate | PostgreSQL + pgvector | Elasticsearch |
|---------|----------|----------------------|---------------|
| **Vector Search** | Native, optimized | Extension | Plugin |
| **Hybrid Search** | Built-in | Complex queries | Built-in |
| **Scalability** | Horizontal | Vertical | Horizontal |
| **ML Integration** | Native modules | External | Limited |
| **GraphQL** | Yes | Extensions | No |
| **Multi-tenancy** | Native | Manual | Limited |

### Architecture Overview

**Core Components:**
- **Storage Layer**: Efficient vector and object storage
- **Inverted Index**: For keyword-based filtering
- **HNSW Index**: Hierarchical Navigable Small World for ANN search
- **Modules**: Pluggable vectorizers and other extensions
- **Query Engine**: GraphQL and REST query processing

**Vectorization Modules:**
- text2vec-openai (OpenAI embeddings)
- text2vec-cohere (Cohere embeddings)
- text2vec-huggingface (Hugging Face models)
- text2vec-transformers (Local transformer models)
- img2vec-neural (Image vectorization)
- multi2vec-clip (Multi-modal embeddings)

---

## Installation & Setup

### Prerequisites

- Operating System: Linux, macOS, or Windows
- Docker (recommended) or Docker Compose
- Minimum RAM: 4GB (8GB+ recommended)
- Python 3.7+ (for client library)
- API Keys (for external vectorizers like OpenAI)

### Installation Methods

#### Method 1: Docker (Quickstart)

```bash
# Run Weaviate with default settings
docker run -d \
  --name weaviate \
  -p 8080:8080 \
  -e AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED=true \
  -e PERSISTENCE_DATA_PATH=/var/lib/weaviate \
  semitechnologies/weaviate:latest
```

#### Method 2: Docker Compose (Recommended)

```yaml
# docker-compose.yml
version: '3.8'

services:
  weaviate:
    image: semitechnologies/weaviate:latest
    container_name: weaviate
    ports:
      - "8080:8080"
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-openai'
      ENABLE_MODULES: 'text2vec-openai,generative-openai'
      OPENAI_APIKEY: ${OPENAI_API_KEY}
      CLUSTER_HOSTNAME: 'node1'
    volumes:
      - weaviate_data:/var/lib/weaviate
    restart: unless-stopped

volumes:
  weaviate_data:
```

```bash
# Start Weaviate
docker-compose up -d

# Check logs
docker-compose logs -f weaviate
```

#### Method 3: Docker Compose with Multiple Modules

```yaml
# docker-compose.yml with multiple vectorizers
version: '3.8'

services:
  weaviate:
    image: semitechnologies/weaviate:latest
    ports:
      - "8080:8080"
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-transformers'
      ENABLE_MODULES: 'text2vec-transformers,text2vec-openai,generative-openai,qna-transformers'
      TRANSFORMERS_INFERENCE_API: 'http://t2v-transformers:8080'
      OPENAI_APIKEY: ${OPENAI_API_KEY}
      CLUSTER_HOSTNAME: 'node1'
    volumes:
      - weaviate_data:/var/lib/weaviate
    restart: unless-stopped

  t2v-transformers:
    image: semitechnologies/transformers-inference:sentence-transformers-multi-qa-MiniLM-L6-cos-v1
    environment:
      ENABLE_CUDA: '0'

volumes:
  weaviate_data:
```

#### Method 4: Kubernetes (Helm)

```bash
# Add Weaviate Helm repository
helm repo add weaviate https://weaviate.github.io/weaviate-helm
helm repo update

# Install Weaviate
helm install weaviate weaviate/weaviate \
  --set replicas=3 \
  --set storage.size=100Gi \
  --set modules.text2vec-openai.enabled=true \
  --set modules.generative-openai.enabled=true
```

#### Method 5: Weaviate Cloud Services (WCS)

```bash
# Sign up at https://console.weaviate.cloud
# Create a cluster through the web interface
# Get connection details and API keys
```

### Client Installation

**Python:**
```bash
pip install weaviate-client
```

**JavaScript/TypeScript:**
```bash
npm install weaviate-ts-client
```

**Go:**
```bash
go get github.com/weaviate/weaviate-go-client/v4
```

**Java:**
```xml
<dependency>
    <groupId>io.weaviate</groupId>
    <artifactId>client</artifactId>
    <version>4.0.0</version>
</dependency>
```

### Verify Installation

```bash
# Check if Weaviate is running
curl http://localhost:8080/v1/meta

# Check available modules
curl http://localhost:8080/v1/modules

# Health check
curl http://localhost:8080/v1/.well-known/ready
```

**Python Verification:**
```python
import weaviate

client = weaviate.Client("http://localhost:8080")
print(client.is_ready())  # Should return True
```

---

## User Guide

### Getting Started

#### 1. Connect to Weaviate

**Python:**
```python
import weaviate

# Local instance
client = weaviate.Client("http://localhost:8080")

# With authentication
client = weaviate.Client(
    url="http://localhost:8080",
    auth_client_secret=weaviate.AuthApiKey(api_key="your-api-key")
)

# Weaviate Cloud Services
client = weaviate.Client(
    url="https://your-cluster.weaviate.network",
    auth_client_secret=weaviate.AuthApiKey(api_key="your-wcs-api-key"),
    additional_headers={"X-OpenAI-Api-Key": "your-openai-key"}
)
```

**JavaScript:**
```javascript
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});
```

#### 2. Define a Schema

**Python:**
```python
schema = {
    "classes": [{
        "class": "Article",
        "description": "A news article",
        "vectorizer": "text2vec-openai",
        "moduleConfig": {
            "text2vec-openai": {
                "model": "ada",
                "modelVersion": "002",
                "type": "text"
            }
        },
        "properties": [
            {
                "name": "title",
                "dataType": ["text"],
                "description": "Article title"
            },
            {
                "name": "content",
                "dataType": ["text"],
                "description": "Article content"
            },
            {
                "name": "author",
                "dataType": ["string"],
                "description": "Article author"
            },
            {
                "name": "publishDate",
                "dataType": ["date"],
                "description": "Publication date"
            },
            {
                "name": "category",
                "dataType": ["string"],
                "description": "Article category"
            }
        ]
    }]
}

client.schema.create(schema)
```

**JavaScript:**
```javascript
const classObj = {
  class: 'Article',
  vectorizer: 'text2vec-openai',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
    {
      name: 'content',
      dataType: ['text'],
    },
    {
      name: 'author',
      dataType: ['string'],
    },
  ],
};

await client.schema.classCreator().withClass(classObj).do();
```

#### 3. Import Data

**Python - Single Object:**
```python
data_object = {
    "title": "Introduction to Vector Databases",
    "content": "Vector databases are specialized systems designed to store and query high-dimensional vectors...",
    "author": "John Doe",
    "publishDate": "2024-01-15T10:00:00Z",
    "category": "Technology"
}

client.data_object.create(
    data_object=data_object,
    class_name="Article"
)
```

**Python - Batch Import:**
```python
# Batch import for better performance
client.batch.configure(batch_size=100)

with client.batch as batch:
    for article in articles:
        batch.add_data_object(
            data_object=article,
            class_name="Article"
        )
```

**Python - With Custom Vector:**
```python
client.data_object.create(
    data_object={"title": "Custom Vector Example"},
    class_name="Article",
    vector=[0.1, 0.2, 0.3, ...]  # Your pre-computed vector
)
```

#### 4. Query Data

**Vector Search (Semantic Search):**
```python
result = (
    client.query
    .get("Article", ["title", "content", "author"])
    .with_near_text({"concepts": ["artificial intelligence"]})
    .with_limit(5)
    .do()
)

for article in result["data"]["Get"]["Article"]:
    print(article["title"])
```

**Hybrid Search (Vector + Keyword):**
```python
result = (
    client.query
    .get("Article", ["title", "content"])
    .with_hybrid(
        query="machine learning",
        alpha=0.75  # 0 = pure keyword, 1 = pure vector
    )
    .with_limit(10)
    .do()
)
```

**Filtered Search:**
```python
result = (
    client.query
    .get("Article", ["title", "author"])
    .with_where({
        "path": ["category"],
        "operator": "Equal",
        "valueString": "Technology"
    })
    .with_near_text({"concepts": ["databases"]})
    .with_limit(5)
    .do()
)
```

**GraphQL Query:**
```graphql
{
  Get {
    Article(
      nearText: {
        concepts: ["vector database"]
      }
      limit: 5
      where: {
        path: ["category"]
        operator: Equal
        valueString: "Technology"
      }
    ) {
      title
      content
      author
      _additional {
        distance
        certainty
      }
    }
  }
}
```

### Advanced Features

#### Generative Search (RAG)

```python
# Use OpenAI to generate answers based on search results
result = (
    client.query
    .get("Article", ["title", "content"])
    .with_near_text({"concepts": ["climate change"]})
    .with_generate(
        single_prompt="Summarize the following in one sentence: {content}"
    )
    .with_limit(3)
    .do()
)

for article in result["data"]["Get"]["Article"]:
    print(f"Title: {article['title']}")
    print(f"Summary: {article['_additional']['generate']['singleResult']}")
```

#### Question Answering

```python
result = (
    client.query
    .get("Article", ["title", "content"])
    .with_ask({
        "question": "What are vector databases?",
        "properties": ["content"]
    })
    .with_limit(1)
    .do()
)

answer = result["data"]["Get"]["Article"][0]["_additional"]["answer"][0]
print(answer["result"])
```

#### Multi-tenancy

```python
# Create class with multi-tenancy enabled
schema = {
    "class": "Article",
    "multiTenancyConfig": {"enabled": True},
    "properties": [...]
}

client.schema.create_class(schema)

# Add tenant
client.schema.add_tenant("Article", {"name": "tenant1"})

# Add data for specific tenant
client.data_object.create(
    data_object=article,
    class_name="Article",
    tenant="tenant1"
)

# Query specific tenant
result = (
    client.query
    .get("Article", ["title"])
    .with_tenant("tenant1")
    .with_limit(10)
    .do()
)
```

#### Cross-references

```python
# Create reference between objects
client.data_object.reference.add(
    from_uuid="article-uuid",
    from_property_name="hasAuthor",
    to_uuid="author-uuid",
    from_class_name="Article",
    to_class_name="Author"
)

# Query with references
result = (
    client.query
    .get("Article", ["title", "hasAuthor {... on Author {name email}}"])
    .with_limit(10)
    .do()
)
```

#### Aggregations

```python
# Count by category
result = (
    client.query
    .aggregate("Article")
    .with_group_by_filter(["category"])
    .with_fields("groupedBy { value } meta { count }")
    .do()
)
```

### CRUD Operations

**Create:**
```python
uuid = client.data_object.create(
    data_object={"title": "New Article"},
    class_name="Article"
)
```

**Read:**
```python
article = client.data_object.get_by_id(
    uuid="article-uuid",
    class_name="Article"
)
```

**Update:**
```python
client.data_object.update(
    uuid="article-uuid",
    class_name="Article",
    data_object={"title": "Updated Title"}
)
```

**Delete:**
```python
client.data_object.delete(
    uuid="article-uuid",
    class_name="Article"
)
```

### Monitoring and Metrics

```python
# Get cluster statistics
stats = client.cluster.get_nodes_status()

# Get schema
schema = client.schema.get()

# Get specific class
class_info = client.schema.get("Article")
```

---

## Best Practices

### Schema Design

- Use appropriate vectorizers for your data type
- Define clear property names and descriptions
- Use cross-references for related entities
- Enable multi-tenancy for SaaS applications

### Performance Optimization

- Use batch operations for bulk imports
- Configure appropriate HNSW parameters
- Use filters before vector search when possible
- Implement connection pooling

### Data Management

- Regular backups of critical data
- Monitor vector index size
- Use appropriate data types
- Implement data validation

### Security

- Enable authentication in production
- Use API keys for external services
- Implement rate limiting
- Regular security updates
- Use TLS/SSL for connections

---

## Integration Examples

### With LangChain

```python
from langchain.vectorstores import Weaviate
from langchain.embeddings import OpenAIEmbeddings

vectorstore = Weaviate(
    client=client,
    index_name="Article",
    text_key="content",
    embedding=OpenAIEmbeddings()
)

# Add documents
vectorstore.add_texts(["Document 1", "Document 2"])

# Search
docs = vectorstore.similarity_search("query", k=5)
```

### With OpenAI

```python
import openai

# Search for context
results = client.query.get("Article", ["content"]).with_near_text(
    {"concepts": [user_query]}
).with_limit(3).do()

context = "\n".join([r["content"] for r in results["data"]["Get"]["Article"]])

# Generate response
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": f"Context: {context}"},
        {"role": "user", "content": user_query}
    ]
)
```

### With Streamlit

```python
import streamlit as st
import weaviate

st.title("Semantic Search App")

client = weaviate.Client("http://localhost:8080")

query = st.text_input("Enter your search query:")

if query:
    results = (
        client.query
        .get("Article", ["title", "content"])
        .with_near_text({"concepts": [query]})
        .with_limit(5)
        .do()
    )
    
    for article in results["data"]["Get"]["Article"]:
        st.subheader(article["title"])
        st.write(article["content"])
```

---

## Troubleshooting

### Common Issues

**Connection Errors:**
```python
# Check if Weaviate is running
try:
    client.is_ready()
except Exception as e:
    print(f"Connection error: {e}")
```

**Schema Conflicts:**
```python
# Delete and recreate schema
client.schema.delete_class("Article")
client.schema.create_class(schema)
```

**Memory Issues:**
```bash
# Increase Docker memory limits
docker update --memory=8g weaviate
```

### Performance Issues

```bash
# Check HNSW index parameters
curl http://localhost:8080/v1/schema/Article

# Optimize for your use case
# ef: 64-512 (higher = better recall, slower)
# efConstruction: 128-512 (higher = better index quality)
# maxConnections: 16-64 (higher = better recall, more memory)
```

---

## Resources

### Official Documentation
- [Weaviate Documentation](https://weaviate.io/developers/weaviate)
- [API Reference](https://weaviate.io/developers/weaviate/api)
- [Concepts](https://weaviate.io/developers/weaviate/concepts)

### Tutorials
- [Quickstart Guide](https://weaviate.io/developers/weaviate/quickstart)
- [Schema Tutorial](https://weaviate.io/developers/weaviate/tutorials/schema)
- [Import Data Tutorial](https://weaviate.io/developers/weaviate/tutorials/import)

### Community
- [GitHub Repository](https://github.com/weaviate/weaviate)
- [Slack Community](https://weaviate.io/slack)
- [Forum](https://forum.weaviate.io/)

### Tools
- [Weaviate Cloud Services](https://console.weaviate.cloud)
- [Python Client](https://github.com/weaviate/weaviate-python-client)
- [Awesome Weaviate](https://github.com/weaviate/awesome-weaviate)

---

*Last Updated: January 2026*
