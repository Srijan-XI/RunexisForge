# JSON:API

## Introduction

JSON:API is a specification for building APIs in JSON. It provides conventions for structuring request and response documents, relationships between resources, error handling, and more.

## Why JSON:API?

- **Standardization**: Consistent structure across all endpoints
- **Reduce Bikeshedding**: No debates about response structure
- **Client Libraries**: Pre-built clients handle pagination, caching, relationships
- **Relationships**: Built-in support for resource relationships
- **Sparse Fieldsets**: Request only needed fields
- **Filtering & Sorting**: Standardized query parameters
- **Compound Documents**: Include related resources in single request
- **Pagination**: Consistent pagination across endpoints

## Key Concepts

### Resource Objects

Primary data structure in JSON:API. Every resource must have:
- `type`: Resource type (e.g., "articles", "users")
- `id`: Unique identifier (string)
- `attributes`: Resource data (excluding type, id, relationships)
- `relationships`: Links to related resources (optional)
- `links`: URLs for the resource (optional)
- `meta`: Non-standard metadata (optional)

### Document Structure

JSON:API documents always have a top-level structure:
- `data`: Primary data (resource object, array, or null)
- `errors`: Array of error objects (exclusive with `data`)
- `meta`: Metadata about the document
- `jsonapi`: JSON:API version information
- `links`: Links related to primary data
- `included`: Related resources (compound documents)

### Relationships

Resources can have relationships to other resources:
- **To-One**: Single related resource
- **To-Many**: Multiple related resources
- **Resource Linkage**: Identifies related resources by type and id

## JSON:API vs REST

| Feature | Standard REST | JSON:API |
|---------|---------------|----------|
| Structure | Flexible, varies by API | Strictly defined |
| Relationships | Ad-hoc, varies | Standardized format |
| Included Resources | Custom implementation | Built-in with `include` |
| Sparse Fieldsets | Custom implementation | Built-in with `fields` |
| Pagination | Various approaches | Standardized |
| Filtering | Custom query params | Standardized `filter` |
| Error Format | Varies | Consistent structure |
| Client Libraries | Limited | Extensive ecosystem |

## When to Use JSON:API

✅ **Use JSON:API when:**
- Building complex applications with many relationships
- Want consistent API structure across endpoints
- Need to reduce over-fetching/under-fetching
- Want to leverage existing client libraries
- Team values convention over configuration
- Building APIs consumed by multiple clients
- Need sophisticated filtering, sorting, pagination

❌ **Consider alternatives when:**
- Building simple CRUD APIs (plain REST may suffice)
- Need maximum flexibility in response structure
- Performance is critical (GraphQL might be better)
- Team unfamiliar with JSON:API and unwilling to learn
- Building internal APIs with simple requirements

## User Guide

## Basic Response Format

### Single Resource

```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON:API Guide",
      "body": "This is a comprehensive guide...",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "9" }
      },
      "comments": {
        "data": [
          { "type": "comments", "id": "5" },
          { "type": "comments", "id": "12" }
        ]
      }
    },
    "links": {
      "self": "https://api.example.com/articles/1"
    }
  }
}
```

### Resource Collection

```json
{
  "data": [
    {
      "type": "articles",
      "id": "1",
      "attributes": {
        "title": "JSON:API Guide",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    },
    {
      "type": "articles",
      "id": "2",
      "attributes": {
        "title": "REST API Basics",
        "createdAt": "2024-01-16T14:20:00Z"
      }
    }
  ],
  "meta": {
    "total": 42
  },
  "links": {
    "self": "https://api.example.com/articles",
    "next": "https://api.example.com/articles?page[offset]=20",
    "last": "https://api.example.com/articles?page[offset]=40"
  }
}
```

### Empty Collection

```json
{
  "data": [],
  "meta": {
    "total": 0
  }
}
```

### Null Resource

```json
{
  "data": null
}
```

## Fetching Resources

### GET Single Resource

```http
GET /articles/1 HTTP/1.1
Accept: application/vnd.api+json
```

**Response:**

```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON:API Guide",
      "body": "This is a comprehensive guide about JSON:API...",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-20T09:15:00Z"
    },
    "relationships": {
      "author": {
        "links": {
          "self": "/articles/1/relationships/author",
          "related": "/articles/1/author"
        },
        "data": { "type": "people", "id": "9" }
      },
      "tags": {
        "links": {
          "self": "/articles/1/relationships/tags",
          "related": "/articles/1/tags"
        }
      }
    },
    "links": {
      "self": "/articles/1"
    }
  }
}
```

### GET Collection

```http
GET /articles HTTP/1.1
Accept: application/vnd.api+json
```

**Response:**

```json
{
  "data": [
    {
      "type": "articles",
      "id": "1",
      "attributes": {
        "title": "JSON:API Guide",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    },
    {
      "type": "articles",
      "id": "2",
      "attributes": {
        "title": "REST API Basics",
        "createdAt": "2024-01-16T14:20:00Z"
      }
    }
  ],
  "links": {
    "self": "/articles",
    "next": "/articles?page[offset]=20",
    "last": "/articles?page[offset]=100"
  }
}
```

## Creating Resources

```http
POST /articles HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "articles",
    "attributes": {
      "title": "New Article",
      "body": "Article content here..."
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "9" }
      }
    }
  }
}
```

**Response (201 Created):**

```json
{
  "data": {
    "type": "articles",
    "id": "3",
    "attributes": {
      "title": "New Article",
      "body": "Article content here...",
      "createdAt": "2024-01-21T11:00:00Z"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "9" }
      }
    },
    "links": {
      "self": "/articles/3"
    }
  }
}
```

## Updating Resources

### Full Update (All Attributes)

```http
PATCH /articles/1 HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "Updated Title",
      "body": "Updated content..."
    }
  }
}
```

### Partial Update

```http
PATCH /articles/1 HTTP/1.1
Content-Type: application/vnd.api+json

{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "Updated Title Only"
    }
  }
}
```

**Response (200 OK):**

```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "Updated Title Only",
      "body": "Original content remains...",
      "updatedAt": "2024-01-22T14:30:00Z"
    }
  }
}
```

## Deleting Resources

```http
DELETE /articles/1 HTTP/1.1
Accept: application/vnd.api+json
```

**Response (204 No Content):**

No response body.

**Or (200 OK with meta):**

```json
{
  "meta": {
    "message": "Article deleted successfully"
  }
}
```

## Relationships

### To-One Relationship

```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "relationships": {
      "author": {
        "links": {
          "self": "/articles/1/relationships/author",
          "related": "/articles/1/author"
        },
        "data": { "type": "people", "id": "9" }
      }
    }
  }
}
```

### To-Many Relationship

```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "relationships": {
      "tags": {
        "links": {
          "self": "/articles/1/relationships/tags",
          "related": "/articles/1/tags"
        },
        "data": [
          { "type": "tags", "id": "2" },
          { "type": "tags", "id": "5" }
        ]
      }
    }
  }
}
```

### Fetching Related Resources

```http
GET /articles/1/author HTTP/1.1
```

**Response:**

```json
{
  "data": {
    "type": "people",
    "id": "9",
    "attributes": {
      "name": "Alice Johnson",
      "email": "alice@example.com"
    }
  }
}
```

### Updating Relationships

**Replace to-one relationship:**

```http
PATCH /articles/1/relationships/author HTTP/1.1
Content-Type: application/vnd.api+json

{
  "data": { "type": "people", "id": "10" }
}
```

**Add to to-many relationship:**

```http
POST /articles/1/relationships/tags HTTP/1.1
Content-Type: application/vnd.api+json

{
  "data": [
    { "type": "tags", "id": "7" }
  ]
}
```

**Remove from to-many relationship:**

```http
DELETE /articles/1/relationships/tags HTTP/1.1
Content-Type: application/vnd.api+json

{
  "data": [
    { "type": "tags", "id": "5" }
  ]
}
```

**Replace to-many relationship:**

```http
PATCH /articles/1/relationships/tags HTTP/1.1
Content-Type: application/vnd.api+json

{
  "data": [
    { "type": "tags", "id": "2" },
    { "type": "tags", "id": "7" }
  ]
}
```

## Compound Documents (Include)

Fetch article with related author and comments in single request:

```http
GET /articles/1?include=author,comments HTTP/1.1
```

**Response:**

```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON:API Guide"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "9" }
      },
      "comments": {
        "data": [
          { "type": "comments", "id": "5" },
          { "type": "comments", "id": "12" }
        ]
      }
    }
  },
  "included": [
    {
      "type": "people",
      "id": "9",
      "attributes": {
        "name": "Alice Johnson",
        "email": "alice@example.com"
      }
    },
    {
      "type": "comments",
      "id": "5",
      "attributes": {
        "body": "Great article!",
        "createdAt": "2024-01-16T10:00:00Z"
      }
    },
    {
      "type": "comments",
      "id": "12",
      "attributes": {
        "body": "Very helpful, thanks!",
        "createdAt": "2024-01-17T14:30:00Z"
      }
    }
  ]
}
```

**Nested includes:**

```http
GET /articles/1?include=author,comments.author HTTP/1.1
```

This includes the article's author AND each comment's author.

## Sparse Fieldsets

Request only specific fields:

```http
GET /articles?fields[articles]=title,createdAt HTTP/1.1
```

**Response:**

```json
{
  "data": [
    {
      "type": "articles",
      "id": "1",
      "attributes": {
        "title": "JSON:API Guide",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    }
  ]
}
```

**Multiple resource types:**

```http
GET /articles/1?include=author&fields[articles]=title&fields[people]=name HTTP/1.1
```

## Filtering

```http
GET /articles?filter[status]=published HTTP/1.1
GET /articles?filter[author]=9 HTTP/1.1
GET /articles?filter[createdAt][gte]=2024-01-01 HTTP/1.1
```

**Multiple filters:**

```http
GET /articles?filter[status]=published&filter[category]=tech HTTP/1.1
```

## Sorting

```http
GET /articles?sort=createdAt HTTP/1.1          # Ascending
GET /articles?sort=-createdAt HTTP/1.1         # Descending (- prefix)
GET /articles?sort=-createdAt,title HTTP/1.1   # Multiple fields
```

## Pagination

### Offset-based

```http
GET /articles?page[offset]=20&page[limit]=10 HTTP/1.1
```

**Response:**

```json
{
  "data": [...],
  "links": {
    "self": "/articles?page[offset]=20&page[limit]=10",
    "first": "/articles?page[offset]=0&page[limit]=10",
    "prev": "/articles?page[offset]=10&page[limit]=10",
    "next": "/articles?page[offset]=30&page[limit]=10",
    "last": "/articles?page[offset]=90&page[limit]=10"
  },
  "meta": {
    "total": 100
  }
}
```

### Page-based

```http
GET /articles?page[number]=3&page[size]=10 HTTP/1.1
```

### Cursor-based

```http
GET /articles?page[cursor]=eyJpZCI6MTIzfQ== HTTP/1.1
```

## Error Handling

### Error Response Format

```json
{
  "errors": [
    {
      "id": "error-uuid-123",
      "status": "422",
      "code": "VALIDATION_ERROR",
      "title": "Validation Failed",
      "detail": "Title must be at least 5 characters long",
      "source": {
        "pointer": "/data/attributes/title"
      },
      "meta": {
        "timestamp": "2024-01-22T10:30:00Z"
      }
    }
  ]
}
```

### Multiple Errors

```json
{
  "errors": [
    {
      "status": "400",
      "code": "REQUIRED_FIELD",
      "title": "Missing required field",
      "detail": "Title is required",
      "source": { "pointer": "/data/attributes/title" }
    },
    {
      "status": "400",
      "code": "INVALID_EMAIL",
      "title": "Invalid email format",
      "detail": "Email must be a valid email address",
      "source": { "pointer": "/data/attributes/email" }
    }
  ]
}
```

### Error Object Fields

- `id`: Unique identifier for this error occurrence
- `status`: HTTP status code as string
- `code`: Application-specific error code
- `title`: Short, human-readable summary
- `detail`: Detailed explanation
- `source`: Where the error occurred
  - `pointer`: JSON Pointer to the problem
  - `parameter`: Query parameter that caused error
- `meta`: Additional metadata
- `links`: Links to more info about the error

## Implementation

### Node.js/Express with jsonapi-serializer

```bash
npm install jsonapi-serializer
```

```javascript
const express = require('express');
const { Serializer, Deserializer, Error } = require('jsonapi-serializer');

const app = express();
app.use(express.json({ type: 'application/vnd.api+json' }));

// Set content type for all responses
app.use((req, res, next) => {
  res.type('application/vnd.api+json');
  next();
});

// Define serializers
const ArticleSerializer = new Serializer('articles', {
  attributes: ['title', 'body', 'createdAt', 'updatedAt', 'author', 'tags'],
  author: {
    ref: 'id',
    attributes: ['name', 'email']
  },
  tags: {
    ref: 'id',
    attributes: ['name']
  },
  keyForAttribute: 'camelCase',
  pluralizeType: true,
  typeForAttribute: (attribute) => {
    if (attribute === 'author') return 'people';
    return attribute;
  }
});

// GET /articles
app.get('/articles', async (req, res) => {
  const articles = await getArticles(); // Your DB query
  
  const serialized = ArticleSerializer.serialize(articles);
  
  // Add pagination links
  serialized.links = {
    self: '/articles',
    next: '/articles?page[offset]=20'
  };
  
  res.json(serialized);
});

// GET /articles/:id
app.get('/articles/:id', async (req, res) => {
  const article = await getArticle(req.params.id);
  
  if (!article) {
    return res.status(404).json({
      errors: [{
        status: '404',
        title: 'Not Found',
        detail: 'Article not found'
      }]
    });
  }
  
  const serialized = ArticleSerializer.serialize(article);
  res.json(serialized);
});

// POST /articles
app.post('/articles', async (req, res) => {
  const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });
  
  try {
    const articleData = await deserializer.deserialize(req.body);
    const article = await createArticle(articleData);
    
    const serialized = ArticleSerializer.serialize(article);
    res.status(201).json(serialized);
  } catch (err) {
    res.status(400).json({
      errors: [{
        status: '400',
        title: 'Invalid Request',
        detail: err.message
      }]
    });
  }
});

// PATCH /articles/:id
app.patch('/articles/:id', async (req, res) => {
  const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });
  
  try {
    const articleData = await deserializer.deserialize(req.body);
    const article = await updateArticle(req.params.id, articleData);
    
    if (!article) {
      return res.status(404).json({
        errors: [{
          status: '404',
          title: 'Not Found',
          detail: 'Article not found'
        }]
      });
    }
    
    const serialized = ArticleSerializer.serialize(article);
    res.json(serialized);
  } catch (err) {
    res.status(400).json({
      errors: [{
        status: '400',
        title: 'Invalid Request',
        detail: err.message
      }]
    });
  }
});

// DELETE /articles/:id
app.delete('/articles/:id', async (req, res) => {
  const deleted = await deleteArticle(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({
      errors: [{
        status: '404',
        title: 'Not Found',
        detail: 'Article not found'
      }]
    });
  }
  
  res.status(204).send();
});

app.listen(3000);
```

### Python/FastAPI with fastapi-jsonapi

```bash
pip install fastapi-jsonapi sqlalchemy
```

```python
from fastapi import FastAPI
from fastapi_jsonapi import RoutersJSONAPI
from fastapi_jsonapi.schema import JSONAPISchema
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI()

# Define schemas
class ArticleAttributesSchema(BaseModel):
    title: str
    body: str
    created_at: datetime
    updated_at: Optional[datetime]

class ArticleSchema(JSONAPISchema):
    class Config:
        type_ = "articles"
    
    id: str
    attributes: ArticleAttributesSchema

class PersonAttributesSchema(BaseModel):
    name: str
    email: str

class PersonSchema(JSONAPISchema):
    class Config:
        type_ = "people"
    
    id: str
    attributes: PersonAttributesSchema

# Create routers
articles_router = RoutersJSONAPI(
    resource_type="articles",
    schema=ArticleSchema,
    # ... database setup
)

app.include_router(articles_router, prefix="/articles")
```

### Ruby on Rails with jsonapi-resources

```ruby
# Gemfile
gem 'jsonapi-resources'

# Article resource
class ArticleResource < JSONAPI::Resource
  attributes :title, :body, :created_at, :updated_at
  
  has_one :author, class_name: 'Person'
  has_many :tags
end

# Routes
Rails.application.routes.draw do
  jsonapi_resources :articles
end
```

## Filtering Implementation (Express)

```javascript
app.get('/articles', async (req, res) => {
  const filters = {};
  
  // Parse filter parameters
  Object.keys(req.query).forEach(key => {
    if (key.startsWith('filter[')) {
      const field = key.match(/filter\[([^\]]+)\]/)[1];
      filters[field] = req.query[key];
    }
  });
  
  // Build query
  let query = Article.query();
  
  if (filters.status) {
    query = query.where('status', filters.status);
  }
  if (filters.author) {
    query = query.where('author_id', filters.author);
  }
  if (filters.search) {
    query = query.where(builder => {
      builder.where('title', 'like', `%${filters.search}%`)
            .orWhere('body', 'like', `%${filters.search}%`);
    });
  }
  
  const articles = await query.fetch();
  const serialized = ArticleSerializer.serialize(articles);
  
  res.json(serialized);
});
```

## Sorting Implementation (Express)

```javascript
app.get('/articles', async (req, res) => {
  let query = Article.query();
  
  if (req.query.sort) {
    const sortFields = req.query.sort.split(',');
    
    sortFields.forEach(field => {
      if (field.startsWith('-')) {
        query = query.orderBy(field.slice(1), 'desc');
      } else {
        query = query.orderBy(field, 'asc');
      }
    });
  }
  
  const articles = await query.fetch();
  const serialized = ArticleSerializer.serialize(articles);
  
  res.json(serialized);
});
```

## Pagination Implementation (Express)

```javascript
app.get('/articles', async (req, res) => {
  const page = parseInt(req.query['page[number]']) || 1;
  const size = parseInt(req.query['page[size]']) || 20;
  const offset = (page - 1) * size;
  
  const [articles, total] = await Promise.all([
    Article.query().offset(offset).limit(size).fetch(),
    Article.query().count()
  ]);
  
  const serialized = ArticleSerializer.serialize(articles);
  
  const totalPages = Math.ceil(total / size);
  
  serialized.links = {
    self: `/articles?page[number]=${page}&page[size]=${size}`,
    first: `/articles?page[number]=1&page[size]=${size}`,
    last: `/articles?page[number]=${totalPages}&page[size]=${size}`
  };
  
  if (page > 1) {
    serialized.links.prev = `/articles?page[number]=${page - 1}&page[size]=${size}`;
  }
  if (page < totalPages) {
    serialized.links.next = `/articles?page[number]=${page + 1}&page[size]=${size}`;
  }
  
  serialized.meta = {
    total,
    page,
    size,
    totalPages
  };
  
  res.json(serialized);
});
```

## Include Implementation (Express)

```javascript
app.get('/articles/:id', async (req, res) => {
  let query = Article.query().findById(req.params.id);
  
  if (req.query.include) {
    const includes = req.query.include.split(',');
    
    includes.forEach(include => {
      if (include === 'author') {
        query = query.withGraphFetched('author');
      } else if (include === 'tags') {
        query = query.withGraphFetched('tags');
      } else if (include === 'comments.author') {
        query = query.withGraphFetched('comments.author');
      }
    });
  }
  
  const article = await query;
  
  if (!article) {
    return res.status(404).json({
      errors: [{
        status: '404',
        title: 'Not Found',
        detail: 'Article not found'
      }]
    });
  }
  
  const serialized = ArticleSerializer.serialize(article);
  res.json(serialized);
});
```

## Best Practices

### API Design

- ✅ Use plural resource names (articles, not article)
- ✅ Use kebab-case for multi-word types (blog-posts)
- ✅ Always include `self` links in resources
- ✅ Provide relationship links for discoverability
- ✅ Use appropriate HTTP methods (GET, POST, PATCH, DELETE)
- ✅ Return 201 with Location header for created resources
- ✅ Return 204 for successful deletes
- ✅ Implement proper error responses

### Performance

- ✅ Implement pagination on all collections
- ✅ Support sparse fieldsets to reduce payload size
- ✅ Use compound documents to reduce round trips
- ✅ Implement proper database indexing
- ✅ Cache responses where appropriate
- ✅ Use ETag/Last-Modified for caching
- ✅ Avoid N+1 queries with includes

### Security

- ✅ Validate content-type header
- ✅ Implement authentication/authorization
- ✅ Validate resource types and IDs
- ✅ Sanitize filter/sort parameters
- ✅ Limit include depth to prevent abuse
- ✅ Rate limit API requests
- ✅ Use HTTPS in production

### Documentation

- ✅ Document all resource types
- ✅ List available relationships
- ✅ Document filter options
- ✅ Specify sort options
- ✅ Document pagination approach
- ✅ List all possible error codes
- ✅ Provide example requests/responses

## Client Libraries

### JavaScript/TypeScript
- **jsonapi-client**: Full-featured client
- **devour-client**: Simple JSON:API client
- **kitsu**: Anime/manga focused, general-purpose

### Python
- **jsonapi-client**: Generic client
- **django-rest-framework-json-api**: Django integration

### Ruby
- **jsonapi-rb**: Client and server libraries
- **active_model_serializers**: Rails serialization

### PHP
- **neomerx/json-api**: Encoder/decoder
- **tobscure/json-api**: Server implementation

### Go
- **google/jsonapi**: Marshaling/unmarshaling

## Tools and Resources

### Validation
- **jsonapi-validator**: Validate responses against spec
- **jsonapi.org/implementations**: Official implementations list

### Testing
- **Postman**: Collection testing
- **Insomnia**: REST client with JSON:API support

### Documentation
- **JSON:API Spec**: https://jsonapi.org/format/
- **Examples**: https://jsonapi.org/examples/

## Real-World Example: Blog API

Complete blog API with articles, authors, tags, and comments:

```javascript
// Articles
GET /articles
GET /articles/1
POST /articles
PATCH /articles/1
DELETE /articles/1

// Relationships
GET /articles/1/author
GET /articles/1/tags
GET /articles/1/comments
PATCH /articles/1/relationships/author
POST /articles/1/relationships/tags
DELETE /articles/1/relationships/tags

// Authors
GET /people
GET /people/9
GET /people/9/articles

// Complex queries
GET /articles?include=author,tags,comments.author
GET /articles?filter[status]=published&filter[author]=9
GET /articles?sort=-createdAt&page[size]=10
GET /articles?fields[articles]=title,createdAt&fields[people]=name
```

## References

- **JSON:API Specification**: https://jsonapi.org/
- **Format Documentation**: https://jsonapi.org/format/
- **Examples**: https://jsonapi.org/examples/
- **Implementations**: https://jsonapi.org/implementations/
- **FAQ**: https://jsonapi.org/faq/
- **Extensions**: https://jsonapi.org/extensions/

---

## See Also

- [REST API Fundamentals](../REST-API/REST-API.md)
- [OpenAPI/Swagger Documentation](../OpenAPI-Swagger/OpenAPI-Swagger.md)
- [GraphQL Alternative](../GraphQL/GraphQL.md)

