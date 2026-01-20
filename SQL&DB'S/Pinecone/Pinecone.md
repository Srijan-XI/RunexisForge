# Pinecone

## Introduction

Pinecone is a fully managed vector database service designed for high-performance vector search at scale. It provides a simple API to store, search, and manage vectors for AI and machine learning applications without the complexity of infrastructure management.

### What is Pinecone?

Pinecone is a cloud-native vector database that makes it easy to build and deploy AI applications with semantic search, recommendation systems, and other vector-based features. It handles all the infrastructure, scaling, and optimization automatically.

### Key Features

- **Fully Managed**: No infrastructure to manage, automatic scaling
- **High Performance**: Sub-50ms query latency at billion-scale
- **Real-time Updates**: Instant vector updates and queries
- **Metadata Filtering**: Combine vector search with metadata filters
- **Hybrid Search**: Mix dense and sparse vectors
- **Multi-cloud**: Available on AWS, GCP, and Azure
- **High Availability**: 99.9% uptime SLA
- **ACID Compliance**: Strong consistency guarantees
- **Serverless**: Pay only for what you use
- **Namespaces**: Logical partitioning within indexes

### Use Cases

- **Semantic Search**: Search by meaning across documents, images, or audio
- **Recommendation Engines**: Personalized product or content recommendations
- **Question Answering**: Build RAG (Retrieval Augmented Generation) systems
- **Anomaly Detection**: Identify unusual patterns in high-dimensional data
- **Image/Video Search**: Find similar media content
- **Deduplication**: Identify duplicate or near-duplicate content
- **Personalization**: Create personalized user experiences
- **Chatbots**: Enhance conversational AI with context retrieval

### Pinecone vs Other Vector Databases

| Feature | Pinecone | Weaviate | Milvus | Qdrant |
|---------|----------|----------|--------|--------|
| **Deployment** | Fully managed | Self-hosted/Cloud | Self-hosted/Cloud | Self-hosted/Cloud |
| **Setup Complexity** | Minimal | Medium | High | Medium |
| **Scalability** | Automatic | Manual | Manual | Manual |
| **Multi-tenancy** | Namespaces | Native | Collections | Collections |
| **Pricing Model** | Usage-based | Self-hosted free | Self-hosted free | Self-hosted free |
| **Latency** | <50ms | ~50-100ms | ~50-100ms | ~50-100ms |

### Architecture Overview

**Pinecone Components:**
- **Pods**: Compute and storage units for vector search
- **Indexes**: Collections of vectors with a specific dimension
- **Namespaces**: Logical partitions within an index
- **Metadata**: Structured data attached to vectors
- **Replicas**: Copies of data for high availability

**Index Types:**
- **Pod-based Indexes**: Dedicated resources, predictable performance
- **Serverless Indexes**: Auto-scaling, pay-per-request

---

## Installation & Setup

### Prerequisites

- Pinecone account (sign up at https://www.pinecone.io)
- API Key from Pinecone console
- Python 3.7+ or Node.js 14+ (for SDK)
- Internet connection

### Getting Started

#### Step 1: Create a Pinecone Account

```bash
# Visit https://www.pinecone.io and sign up
# Navigate to API Keys section
# Copy your API key and environment
```

#### Step 2: Install Pinecone SDK

**Python:**
```bash
pip install pinecone-client
```

**JavaScript/TypeScript:**
```bash
npm install @pinecone-database/pinecone
```

**Go:**
```bash
go get github.com/pinecone-io/go-pinecone/pinecone
```

#### Step 3: Initialize Pinecone

**Python:**
```python
import pinecone

# Initialize with your API key
pinecone.init(
    api_key="YOUR_API_KEY",
    environment="YOUR_ENVIRONMENT"  # e.g., "us-west1-gcp"
)
```

**JavaScript:**
```javascript
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: 'YOUR_API_KEY',
  environment: 'YOUR_ENVIRONMENT'
});
```

#### Step 4: Create an Index

**Python:**
```python
# Create index with 1536 dimensions (OpenAI ada-002 size)
pinecone.create_index(
    name="my-index",
    dimension=1536,
    metric="cosine",
    spec=ServerlessSpec(
        cloud="aws",
        region="us-west-2"
    )
)

# Wait for index to be ready
import time
while not pinecone.describe_index("my-index").status['ready']:
    time.sleep(1)
```

**JavaScript:**
```javascript
await pinecone.createIndex({
  name: 'my-index',
  dimension: 1536,
  metric: 'cosine',
  spec: {
    serverless: {
      cloud: 'aws',
      region: 'us-west-2'
    }
  }
});
```

### Configuration Options

#### Index Configuration

```python
# Pod-based index (dedicated resources)
pinecone.create_index(
    name="pod-index",
    dimension=768,
    metric="euclidean",
    pods=2,
    replicas=2,
    pod_type="p1.x1",
    metadata_config={
        "indexed": ["category", "author"]
    }
)

# Serverless index (auto-scaling)
pinecone.create_index(
    name="serverless-index",
    dimension=1536,
    metric="dotproduct",
    spec=ServerlessSpec(
        cloud="gcp",
        region="us-central1"
    )
)
```

#### Metrics

- **cosine**: Cosine similarity (default, best for normalized vectors)
- **euclidean**: Euclidean distance
- **dotproduct**: Dot product similarity

### Environment Variables

```bash
# .env file
PINECONE_API_KEY=your-api-key-here
PINECONE_ENVIRONMENT=us-west1-gcp
PINECONE_INDEX_NAME=my-index
```

**Python with python-dotenv:**
```python
from dotenv import load_dotenv
import os
import pinecone

load_dotenv()

pinecone.init(
    api_key=os.getenv("PINECONE_API_KEY"),
    environment=os.getenv("PINECONE_ENVIRONMENT")
)
```

---

## User Guide

### Basic Operations

#### 1. Connect to Index

**Python:**
```python
import pinecone

pinecone.init(api_key="YOUR_API_KEY", environment="YOUR_ENV")
index = pinecone.Index("my-index")

# Get index stats
stats = index.describe_index_stats()
print(stats)
```

**JavaScript:**
```javascript
const index = pinecone.index('my-index');
const stats = await index.describeIndexStats();
console.log(stats);
```

#### 2. Insert Vectors (Upsert)

**Python - Single Vector:**
```python
index.upsert(vectors=[
    ("vec1", [0.1, 0.2, 0.3, ...], {"category": "tech", "author": "John"})
])
```

**Python - Batch Upsert:**
```python
vectors = [
    ("id1", [0.1, 0.2, ...], {"title": "Article 1", "category": "tech"}),
    ("id2", [0.3, 0.4, ...], {"title": "Article 2", "category": "science"}),
    ("id3", [0.5, 0.6, ...], {"title": "Article 3", "category": "tech"})
]

index.upsert(vectors=vectors, namespace="articles")
```

**Python - Async Upsert (Large Scale):**
```python
from pinecone import UpsertRequest

# Upsert in batches of 100
batch_size = 100
for i in range(0, len(vectors), batch_size):
    batch = vectors[i:i + batch_size]
    index.upsert(vectors=batch, namespace="articles", async_req=True)
```

**JavaScript:**
```javascript
await index.upsert([
  {
    id: 'vec1',
    values: [0.1, 0.2, 0.3, ...],
    metadata: { category: 'tech', author: 'John' }
  }
]);
```

#### 3. Query Vectors

**Python - Simple Query:**
```python
# Query by vector
results = index.query(
    vector=[0.1, 0.2, 0.3, ...],
    top_k=10,
    include_metadata=True
)

for match in results['matches']:
    print(f"ID: {match['id']}, Score: {match['score']}")
    print(f"Metadata: {match['metadata']}")
```

**Python - Query by ID:**
```python
# Find similar vectors to a stored vector
results = index.query(
    id="vec1",
    top_k=10,
    include_metadata=True,
    namespace="articles"
)
```

**Python - Query with Metadata Filter:**
```python
results = index.query(
    vector=[0.1, 0.2, 0.3, ...],
    top_k=5,
    filter={
        "category": {"$eq": "tech"},
        "year": {"$gte": 2020}
    },
    include_metadata=True
)
```

**JavaScript:**
```javascript
const queryResponse = await index.query({
  vector: [0.1, 0.2, 0.3, ...],
  topK: 10,
  includeMetadata: true,
  filter: { category: { $eq: 'tech' } }
});
```

#### 4. Fetch Vectors by ID

**Python:**
```python
# Fetch specific vectors
results = index.fetch(ids=["vec1", "vec2", "vec3"], namespace="articles")

for id, vector_data in results['vectors'].items():
    print(f"ID: {id}")
    print(f"Metadata: {vector_data['metadata']}")
```

#### 5. Update Vectors

**Python:**
```python
# Update vector values
index.upsert(vectors=[
    ("vec1", [0.2, 0.3, 0.4, ...], {"category": "updated"})
])

# Update only metadata
index.update(
    id="vec1",
    set_metadata={"category": "science", "updated": True},
    namespace="articles"
)
```

#### 6. Delete Vectors

**Python:**
```python
# Delete by ID
index.delete(ids=["vec1", "vec2"], namespace="articles")

# Delete by metadata filter
index.delete(
    filter={"category": {"$eq": "old"}},
    namespace="articles"
)

# Delete all vectors in namespace
index.delete(delete_all=True, namespace="articles")
```

### Advanced Features

#### Namespaces

```python
# Use namespaces for multi-tenancy or logical separation
index.upsert(vectors=vectors, namespace="tenant1")
index.upsert(vectors=vectors, namespace="tenant2")

# Query specific namespace
results = index.query(
    vector=query_vector,
    top_k=10,
    namespace="tenant1"
)

# Get stats per namespace
stats = index.describe_index_stats()
print(stats['namespaces'])
```

#### Metadata Filtering

```python
# Complex metadata filters
results = index.query(
    vector=query_vector,
    top_k=10,
    filter={
        "$and": [
            {"category": {"$eq": "tech"}},
            {"year": {"$gte": 2020}},
            {"score": {"$lte": 0.9}}
        ]
    }
)

# Supported operators: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin
```

#### Sparse-Dense Hybrid Search

```python
# Combine dense and sparse vectors
results = index.query(
    vector=[0.1, 0.2, ...],  # Dense vector
    sparse_vector={
        'indices': [10, 45, 99],
        'values': [0.5, 0.3, 0.2]
    },
    top_k=10,
    alpha=0.5  # Weight between dense (0) and sparse (1)
)
```

### Integration Examples

#### With OpenAI Embeddings

```python
import openai
import pinecone

openai.api_key = "YOUR_OPENAI_KEY"
pinecone.init(api_key="YOUR_PINECONE_KEY", environment="YOUR_ENV")
index = pinecone.Index("openai-index")

def embed_text(text):
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response['data'][0]['embedding']

# Store document
text = "Pinecone is a vector database"
vector = embed_text(text)
index.upsert(vectors=[
    ("doc1", vector, {"text": text, "type": "document"})
])

# Search
query = "What is Pinecone?"
query_vector = embed_text(query)
results = index.query(vector=query_vector, top_k=3, include_metadata=True)
```

#### RAG (Retrieval Augmented Generation)

```python
import openai
import pinecone

def rag_pipeline(question, index_name):
    # 1. Embed the question
    question_embedding = embed_text(question)
    
    # 2. Retrieve relevant context
    index = pinecone.Index(index_name)
    results = index.query(
        vector=question_embedding,
        top_k=3,
        include_metadata=True
    )
    
    # 3. Build context from results
    context = "\n".join([match['metadata']['text'] for match in results['matches']])
    
    # 4. Generate answer with GPT
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": f"Answer based on this context:\n{context}"},
            {"role": "user", "content": question}
        ]
    )
    
    return response.choices[0].message.content

# Use RAG
answer = rag_pipeline("What is a vector database?", "my-index")
print(answer)
```

#### With LangChain

```python
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import TextLoader

# Load and split documents
loader = TextLoader("document.txt")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
docs = text_splitter.split_documents(documents)

# Create embeddings and store in Pinecone
embeddings = OpenAIEmbeddings()
vectorstore = Pinecone.from_documents(
    docs,
    embeddings,
    index_name="langchain-index"
)

# Search
query = "What is the main topic?"
results = vectorstore.similarity_search(query, k=3)
```

### Monitoring and Analytics

```python
# Get index statistics
stats = index.describe_index_stats()
print(f"Total vectors: {stats['total_vector_count']}")
print(f"Dimension: {stats['dimension']}")
print(f"Index fullness: {stats['index_fullness']}")

# List all indexes
indexes = pinecone.list_indexes()
print(indexes)

# Describe index configuration
config = pinecone.describe_index("my-index")
print(config)
```

---

## Best Practices

### Performance Optimization

1. **Batch Operations**: Upsert in batches of 100-1000 for better throughput
2. **Async Operations**: Use async for non-blocking large-scale operations
3. **Namespaces**: Use for multi-tenancy to avoid creating multiple indexes
4. **Metadata Indexing**: Only index metadata fields you'll filter on

### Cost Optimization

1. **Serverless for Variable Loads**: Use serverless indexes for unpredictable traffic
2. **Right-size Pods**: Choose appropriate pod types based on workload
3. **Delete Unused Vectors**: Regularly clean up unused data
4. **Monitor Usage**: Track API calls and storage in console

### Data Management

1. **Unique IDs**: Use meaningful, collision-free IDs
2. **Metadata Design**: Keep metadata concise and structured
3. **Versioning**: Include version info in metadata for updates
4. **Backup Strategy**: Export important vectors periodically

### Security

1. **API Key Management**: Rotate keys regularly, use environment variables
2. **Network Security**: Use VPC peering in production (Enterprise)
3. **Access Control**: Implement application-level authorization
4. **Audit Logging**: Track all operations for compliance

---

## Troubleshooting

### Common Issues

**Rate Limiting:**
```python
from pinecone import RateLimitError
import time

try:
    index.upsert(vectors=large_batch)
except RateLimitError:
    time.sleep(1)
    index.upsert(vectors=large_batch)
```

**Dimension Mismatch:**
```python
# Ensure all vectors have same dimension as index
index_dim = pinecone.describe_index("my-index").dimension
assert len(vector) == index_dim, f"Vector dim {len(vector)} != index dim {index_dim}"
```

**Connection Errors:**
```python
import pinecone

try:
    pinecone.init(api_key=api_key, environment=environment)
    pinecone.list_indexes()
except Exception as e:
    print(f"Connection error: {e}")
    # Check API key and environment
```

**Query Performance:**
```python
# Use metadata filtering to reduce search space
results = index.query(
    vector=query_vector,
    top_k=10,
    filter={"category": "tech"},  # Pre-filter before vector search
    include_metadata=True
)
```

---

## Resources

### Official Documentation
- [Pinecone Documentation](https://docs.pinecone.io/)
- [API Reference](https://docs.pinecone.io/reference)
- [Python SDK](https://docs.pinecone.io/docs/python-client)

### Tutorials
- [Quickstart Guide](https://docs.pinecone.io/docs/quickstart)
- [Build a Semantic Search Engine](https://docs.pinecone.io/docs/semantic-search)
- [RAG Tutorial](https://docs.pinecone.io/docs/retrieval-augmented-generation)

### Community
- [Pinecone Community Forum](https://community.pinecone.io/)
- [GitHub Examples](https://github.com/pinecone-io/examples)
- [Discord Server](https://discord.gg/pinecone)

### Tools & Integrations
- [LangChain Integration](https://python.langchain.com/docs/integrations/vectorstores/pinecone)
- [LlamaIndex Integration](https://docs.llamaindex.ai/en/stable/examples/vector_stores/PineconeIndexDemo.html)
- [Haystack Integration](https://haystack.deepset.ai/integrations/pinecone)

### Pricing
- [Pricing Calculator](https://www.pinecone.io/pricing/)
- Free tier: 1 pod-based index or serverless with usage limits
- Pay-as-you-go and enterprise plans available

---

## Comparison Matrix

| Feature | Free Tier | Standard | Enterprise |
|---------|-----------|----------|------------|
| **Pods** | 1 | Unlimited | Unlimited |
| **Vectors** | Limited | Unlimited | Unlimited |
| **Namespaces** | Yes | Yes | Yes |
| **Metadata Filtering** | Yes | Yes | Yes |
| **Support** | Community | Email | Premium |
| **SLA** | None | 99.9% | 99.95% |
| **VPC** | No | No | Yes |

---

*Last Updated: January 2026*
