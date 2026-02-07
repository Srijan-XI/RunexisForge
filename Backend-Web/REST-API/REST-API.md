# REST API

## Introduction

REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP methods to perform CRUD operations on resources, treating everything as a resource identified by URIs.

## Why REST?

- **Simplicity**: Uses standard HTTP methods and status codes
- **Stateless**: Each request contains all information needed to process it
- **Cacheable**: Responses can be cached to improve performance
- **Scalability**: Stateless nature makes it easy to scale horizontally
- **Language-agnostic**: Any language supporting HTTP can consume REST APIs
- **Well-understood**: Widely adopted with extensive tooling and documentation

## Key Concepts

### Resources

Resources are the fundamental building blocks of REST. Everything is a resource (users, products, orders, etc.) identified by a URI.

```
/users          # Collection of users
/users/123      # Specific user with ID 123
/users/123/orders  # Orders belonging to user 123
```

### HTTP Methods (Verbs)

- **GET**: Retrieve a resource or collection (idempotent, safe)
- **POST**: Create a new resource (not idempotent)
- **PUT**: Replace an entire resource (idempotent)
- **PATCH**: Partially update a resource (idempotent)
- **DELETE**: Remove a resource (idempotent)
- **HEAD**: Get headers only (like GET without body)
- **OPTIONS**: Get supported methods for a resource

### HTTP Status Codes

**2xx Success:**
- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `202 Accepted`: Request accepted for processing (async)
- `204 No Content`: Success but no content to return

**3xx Redirection:**
- `301 Moved Permanently`: Resource has new permanent URI
- `302 Found`: Temporary redirect
- `304 Not Modified`: Cached version is still valid

**4xx Client Errors:**
- `400 Bad Request`: Malformed request
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Authenticated but no permission
- `404 Not Found`: Resource doesn't exist
- `405 Method Not Allowed`: HTTP method not supported
- `409 Conflict`: Resource conflict (e.g., duplicate)
- `422 Unprocessable Entity`: Validation failed
- `429 Too Many Requests`: Rate limit exceeded

**5xx Server Errors:**
- `500 Internal Server Error`: Generic server error
- `502 Bad Gateway`: Invalid response from upstream server
- `503 Service Unavailable`: Server temporarily unavailable
- `504 Gateway Timeout`: Upstream server timeout

### Statelessness

Each request must contain all information needed to process it. Server doesn't store client context between requests.

### Uniform Interface

- Resource identification in requests (URIs)
- Resource manipulation through representations (JSON, XML)
- Self-descriptive messages (content-type headers)
- HATEOAS (Hypermedia as the Engine of Application State)

## REST vs Other Patterns

| Feature | REST | GraphQL | gRPC | SOAP |
|---------|------|---------|------|------|
| Protocol | HTTP | HTTP | HTTP/2 | HTTP/HTTPS |
| Data Format | JSON, XML | JSON | Protobuf | XML |
| Endpoints | Multiple | Single | Multiple | Single |
| Versioning | URL/Header | Schema evolution | Protobuf versions | WSDL versions |
| Caching | Built-in HTTP | Manual | Manual | Manual |
| Learning Curve | Low | Medium | Medium-High | High |
| Performance | Good | Good | Excellent | Moderate |
| Browser Support | Excellent | Excellent | Limited | Good |

## When to Use REST

✅ **Use REST when:**
- Building public APIs consumed by third parties
- Need browser-friendly APIs
- Cache-ability is important
- Simple CRUD operations are primary use case
- Team familiarity with HTTP/REST patterns
- Need good tooling and documentation support

❌ **Consider alternatives when:**
- Need real-time bidirectional communication (use WebSockets/gRPC)
- Mobile clients need flexible data fetching (use GraphQL)
- High-performance internal microservices (use gRPC)
- Complex transactions with strict contracts (use SOAP/gRPC)

## User Guide

## URL Design Best Practices

### Resource Naming

**Use nouns, not verbs:**

```
✅ GET /users
✅ POST /users
✅ GET /users/123

❌ GET /getUsers
❌ POST /createUser
❌ GET /getUserById/123
```

**Use plural nouns for collections:**

```
✅ /users
✅ /products
✅ /orders

❌ /user
❌ /product
❌ /order
```

**Use hierarchical structure for relationships:**

```
✅ /users/123/orders
✅ /posts/456/comments
✅ /organizations/789/teams/10/members

❌ /getUserOrders?userId=123
❌ /getCommentsByPost?postId=456
```

**Use hyphens for readability:**

```
✅ /user-profiles
✅ /product-categories

❌ /user_profiles
❌ /productCategories
```

**Avoid deep nesting (max 2-3 levels):**

```
✅ /users/123/orders
✅ /posts/456/comments/789

❌ /organizations/1/departments/2/teams/3/members/4/tasks/5
```

### Query Parameters

Use for filtering, sorting, pagination, and searching:

```
GET /users?role=admin
GET /products?category=electronics&inStock=true
GET /posts?sort=-createdAt&page=2&limit=20
GET /users?search=john&fields=id,name,email
```

## CRUD Operations Examples

### Node.js/Express

```javascript
const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET /users - List all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id - Get single user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /users - Create user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Replace user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  
  users[index] = { id, name, email };
  res.json(users[index]);
});

// PATCH /users/:id - Partial update
app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  Object.assign(user, req.body);
  res.json(user);
});

// DELETE /users/:id - Delete user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  
  users.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Python/FastAPI

```python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class User(BaseModel):
    id: int
    name: str
    email: str

class UserCreate(BaseModel):
    name: str
    email: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None

users = [
    User(id=1, name="Alice", email="alice@example.com"),
    User(id=2, name="Bob", email="bob@example.com")
]

# GET /users - List all users
@app.get("/users", response_model=List[User])
def get_users():
    return users

# GET /users/{user_id} - Get single user
@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int):
    user = next((u for u in users if u.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# POST /users - Create user
@app.post("/users", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate):
    new_user = User(
        id=max([u.id for u in users], default=0) + 1,
        name=user.name,
        email=user.email
    )
    users.append(new_user)
    return new_user

# PUT /users/{user_id} - Replace user
@app.put("/users/{user_id}", response_model=User)
def replace_user(user_id: int, user: UserCreate):
    index = next((i for i, u in enumerate(users) if u.id == user_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = User(id=user_id, name=user.name, email=user.email)
    users[index] = updated_user
    return updated_user

# PATCH /users/{user_id} - Partial update
@app.patch("/users/{user_id}", response_model=User)
def update_user(user_id: int, user: UserUpdate):
    existing_user = next((u for u in users if u.id == user_id), None)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(existing_user, field, value)
    
    return existing_user

# DELETE /users/{user_id} - Delete user
@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int):
    index = next((i for i, u in enumerate(users) if u.id == user_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    users.pop(index)
    return None
```

### Go/Gin

```go
package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name" binding:"required"`
	Email string `json:"email" binding:"required,email"`
}

var users = []User{
	{ID: 1, Name: "Alice", Email: "alice@example.com"},
	{ID: 2, Name: "Bob", Email: "bob@example.com"},
}

func main() {
	r := gin.Default()

	// GET /users - List all users
	r.GET("/users", func(c *gin.Context) {
		c.JSON(http.StatusOK, users)
	})

	// GET /users/:id - Get single user
	r.GET("/users/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		for _, user := range users {
			if user.ID == id {
				c.JSON(http.StatusOK, user)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
	})

	// POST /users - Create user
	r.POST("/users", func(c *gin.Context) {
		var newUser User
		if err := c.ShouldBindJSON(&newUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		newUser.ID = len(users) + 1
		users = append(users, newUser)
		c.JSON(http.StatusCreated, newUser)
	})

	// PUT /users/:id - Replace user
	r.PUT("/users/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		var updatedUser User
		if err := c.ShouldBindJSON(&updatedUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		for i, user := range users {
			if user.ID == id {
				updatedUser.ID = id
				users[i] = updatedUser
				c.JSON(http.StatusOK, updatedUser)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
	})

	// DELETE /users/:id - Delete user
	r.DELETE("/users/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		for i, user := range users {
			if user.ID == id {
				users = append(users[:i], users[i+1:]...)
				c.Status(http.StatusNoContent)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
	})

	r.Run(":3000")
}
```

## Request and Response Structure

### Request Structure

```http
POST /api/v1/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Accept: application/json
User-Agent: MyApp/1.0

{
  "name": "Charlie",
  "email": "charlie@example.com",
  "role": "admin"
}
```

### Response Structure

**Success Response:**

```json
{
  "data": {
    "id": 3,
    "name": "Charlie",
    "email": "charlie@example.com",
    "role": "admin",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email format is invalid"
      },
      {
        "field": "name",
        "message": "Name is required"
      }
    ]
  }
}
```

**Collection Response:**

```json
{
  "data": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "totalPages": 5
  },
  "links": {
    "self": "/api/v1/users?page=1",
    "next": "/api/v1/users?page=2",
    "last": "/api/v1/users?page=5"
  }
}
```

## Pagination

### Offset-based Pagination

```
GET /users?page=2&limit=20
GET /users?offset=40&limit=20
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

**Implementation (Express):**

```javascript
app.get('/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  
  const paginatedUsers = users.slice(offset, offset + limit);
  
  res.json({
    data: paginatedUsers,
    pagination: {
      page,
      limit,
      total: users.length,
      totalPages: Math.ceil(users.length / limit)
    }
  });
});
```

### Cursor-based Pagination

More suitable for real-time data and infinite scrolling.

```
GET /posts?after=eyJpZCI6MTIzfQ==&limit=20
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6MTQzfQ==",
    "hasMore": true
  }
}
```

**Implementation (Express):**

```javascript
app.get('/posts', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const after = req.query.after ? 
    JSON.parse(Buffer.from(req.query.after, 'base64').toString()) : 
    null;
  
  let filteredPosts = posts;
  if (after) {
    const index = posts.findIndex(p => p.id === after.id);
    filteredPosts = posts.slice(index + 1);
  }
  
  const paginatedPosts = filteredPosts.slice(0, limit);
  const hasMore = filteredPosts.length > limit;
  
  res.json({
    data: paginatedPosts,
    pagination: {
      nextCursor: hasMore ? 
        Buffer.from(JSON.stringify({ id: paginatedPosts[limit - 1].id }))
          .toString('base64') : 
        null,
      hasMore
    }
  });
});
```

## Filtering and Sorting

### Filtering

```
GET /products?category=electronics&minPrice=100&maxPrice=500
GET /users?role=admin&active=true
GET /posts?author=123&status=published
```

**Implementation:**

```javascript
app.get('/products', (req, res) => {
  let filtered = products;
  
  if (req.query.category) {
    filtered = filtered.filter(p => p.category === req.query.category);
  }
  if (req.query.minPrice) {
    filtered = filtered.filter(p => p.price >= parseFloat(req.query.minPrice));
  }
  if (req.query.maxPrice) {
    filtered = filtered.filter(p => p.price <= parseFloat(req.query.maxPrice));
  }
  
  res.json(filtered);
});
```

### Sorting

```
GET /users?sort=name              # Ascending
GET /users?sort=-createdAt        # Descending (- prefix)
GET /products?sort=price,-rating  # Multiple fields
```

**Implementation:**

```javascript
app.get('/users', (req, res) => {
  let sorted = [...users];
  
  if (req.query.sort) {
    const sortFields = req.query.sort.split(',');
    
    sorted.sort((a, b) => {
      for (const field of sortFields) {
        const desc = field.startsWith('-');
        const key = desc ? field.slice(1) : field;
        
        if (a[key] < b[key]) return desc ? 1 : -1;
        if (a[key] > b[key]) return desc ? -1 : 1;
      }
      return 0;
    });
  }
  
  res.json(sorted);
});
```

## Field Selection (Sparse Fieldsets)

Allow clients to request specific fields:

```
GET /users?fields=id,name,email
GET /products/123?fields=name,price
```

**Implementation:**

```javascript
app.get('/users', (req, res) => {
  let result = users;
  
  if (req.query.fields) {
    const fields = req.query.fields.split(',');
    result = users.map(user => {
      const filtered = {};
      fields.forEach(field => {
        if (user.hasOwnProperty(field)) {
          filtered[field] = user[field];
        }
      });
      return filtered;
    });
  }
  
  res.json(result);
});
```

## Search

```
GET /users?q=john
GET /products?search=laptop&searchFields=name,description
```

**Implementation:**

```javascript
app.get('/users', (req, res) => {
  let result = users;
  
  if (req.query.q) {
    const query = req.query.q.toLowerCase();
    result = users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }
  
  res.json(result);
});
```

## Versioning Strategies

### URL Versioning

```
GET /v1/users
GET /v2/users
```

**Pros:** Clear, easy to route, cache-friendly  
**Cons:** URL pollution, violates REST principles

```javascript
const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get('/users', (req, res) => {
  res.json({ version: 'v1', users });
});

v2Router.get('/users', (req, res) => {
  res.json({ version: 'v2', users, newField: true });
});

app.use('/v1', v1Router);
app.use('/v2', v2Router);
```

### Header Versioning

```http
GET /users HTTP/1.1
Accept: application/vnd.myapi.v1+json
```

**Pros:** Clean URLs, RESTful  
**Cons:** Harder to test in browser

```javascript
app.get('/users', (req, res) => {
  const accept = req.get('Accept');
  
  if (accept && accept.includes('v2')) {
    res.json({ version: 'v2', users, newField: true });
  } else {
    res.json({ version: 'v1', users });
  }
});
```

### Query Parameter Versioning

```
GET /users?version=2
GET /users?api-version=2
```

**Pros:** Simple, easy to test  
**Cons:** Can be ignored by clients

```javascript
app.get('/users', (req, res) => {
  const version = req.query.version || '1';
  
  if (version === '2') {
    res.json({ version: 'v2', users, newField: true });
  } else {
    res.json({ version: 'v1', users });
  }
});
```

## Authentication and Authorization

### API Keys

```http
GET /users HTTP/1.1
X-API-Key: your-api-key-here
```

```javascript
function apiKeyAuth(req, res, next) {
  const apiKey = req.get('X-API-Key');
  
  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  next();
}

app.use('/api', apiKeyAuth);
```

### Bearer Token (JWT)

```http
GET /users HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

```javascript
const jwt = require('jsonwebtoken');

function jwtAuth(req, res, next) {
  const authHeader = req.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.use('/api', jwtAuth);
```

### Role-based Access Control

```javascript
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

app.delete('/users/:id', requireRole('admin'), (req, res) => {
  // Only admins can delete users
  // ...
});
```

## Rate Limiting

### Fixed Window

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests, please try again later',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

app.use('/api', limiter);
```

**Response Headers:**

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642345678
```

### Token Bucket (More sophisticated)

```javascript
const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 1, // per 1 second
});

async function rateLimitMiddleware(req, res, next) {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (err) {
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: Math.round(err.msBeforeNext / 1000)
    });
  }
}

app.use('/api', rateLimitMiddleware);
```

## Error Handling

### Consistent Error Format

```javascript
class APIError extends Error {
  constructor(statusCode, message, code, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

// Error handler middleware
app.use((err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details })
      }
    });
  }
  
  // Unexpected errors
  console.error(err);
  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred'
    }
  });
});

// Usage
app.post('/users', (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    throw new APIError(400, 'Validation failed', 'VALIDATION_ERROR', [
      { field: 'name', message: 'Name is required' },
      { field: 'email', message: 'Email is required' }
    ]);
  }
  
  // ...
});
```

### Validation with Middleware

```javascript
const { body, validationResult } = require('express-validator');

app.post('/users',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be positive')
  ],
  (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: errors.array()
        }
      });
    }
    
    // Process valid request
    // ...
  }
);
```

## HATEOAS (Hypermedia)

HATEOAS allows clients to navigate the API dynamically through links:

```json
{
  "data": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com"
  },
  "links": {
    "self": "/users/1",
    "orders": "/users/1/orders",
    "edit": "/users/1",
    "delete": "/users/1"
  }
}
```

**Implementation:**

```javascript
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({
    data: user,
    links: {
      self: `/users/${user.id}`,
      orders: `/users/${user.id}/orders`,
      edit: `/users/${user.id}`,
      delete: `/users/${user.id}`
    }
  });
});
```

## Caching

### ETag

```javascript
const crypto = require('crypto');

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const etag = crypto.createHash('md5').update(JSON.stringify(user)).digest('hex');
  
  if (req.get('If-None-Match') === etag) {
    return res.status(304).send();
  }
  
  res.set('ETag', etag);
  res.set('Cache-Control', 'private, max-age=300');
  res.json(user);
});
```

### Last-Modified

```javascript
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const lastModified = new Date(user.updatedAt);
  const ifModifiedSince = req.get('If-Modified-Since');
  
  if (ifModifiedSince && new Date(ifModifiedSince) >= lastModified) {
    return res.status(304).send();
  }
  
  res.set('Last-Modified', lastModified.toUTCString());
  res.set('Cache-Control', 'private, max-age=300');
  res.json(user);
});
```

## Content Negotiation

```javascript
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.format({
    'application/json': () => {
      res.json(user);
    },
    'application/xml': () => {
      res.send(`
        <user>
          <id>${user.id}</id>
          <name>${user.name}</name>
          <email>${user.email}</email>
        </user>
      `);
    },
    'text/plain': () => {
      res.send(`User: ${user.name} (${user.email})`);
    },
    'default': () => {
      res.status(406).send('Not Acceptable');
    }
  });
});
```

## CORS (Cross-Origin Resource Sharing)

```javascript
const cors = require('cors');

// Allow all origins (development)
app.use(cors());

// Restrict to specific origins (production)
app.use(cors({
  origin: ['https://example.com', 'https://app.example.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Manual CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  
  next();
});
```

## Bulk Operations

### Batch Requests

```http
POST /batch HTTP/1.1

{
  "requests": [
    { "method": "GET", "url": "/users/1" },
    { "method": "GET", "url": "/users/2" },
    { "method": "POST", "url": "/users", "body": { "name": "Charlie" } }
  ]
}
```

**Response:**

```json
{
  "responses": [
    { "status": 200, "body": { "id": 1, "name": "Alice" } },
    { "status": 200, "body": { "id": 2, "name": "Bob" } },
    { "status": 201, "body": { "id": 3, "name": "Charlie" } }
  ]
}
```

### Bulk Updates/Deletes

```http
PATCH /users/bulk HTTP/1.1

{
  "updates": [
    { "id": 1, "active": false },
    { "id": 2, "active": false }
  ]
}
```

```http
DELETE /users/bulk HTTP/1.1

{
  "ids": [1, 2, 3, 4, 5]
}
```

## Async Operations (Long-running Tasks)

```javascript
const jobs = {};

app.post('/reports/generate', (req, res) => {
  const jobId = generateUUID();
  
  jobs[jobId] = { status: 'processing', progress: 0 };
  
  // Start async task
  generateReport(req.body).then(result => {
    jobs[jobId] = { status: 'completed', result };
  }).catch(err => {
    jobs[jobId] = { status: 'failed', error: err.message };
  });
  
  res.status(202).json({
    jobId,
    status: 'processing',
    statusUrl: `/jobs/${jobId}`
  });
});

app.get('/jobs/:id', (req, res) => {
  const job = jobs[req.params.id];
  
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  
  res.json(job);
});
```

## Best Practices

### Security

- ✅ Use HTTPS in production
- ✅ Implement authentication and authorization
- ✅ Validate and sanitize all inputs
- ✅ Use rate limiting to prevent abuse
- ✅ Don't expose sensitive data in responses
- ✅ Use security headers (helmet.js)
- ✅ Implement CORS properly
- ✅ Keep dependencies updated

### Performance

- ✅ Implement caching (ETag, Cache-Control)
- ✅ Use compression (gzip, br)
- ✅ Implement pagination for large datasets
- ✅ Use database indexing
- ✅ Optimize N+1 queries
- ✅ Use CDN for static assets
- ✅ Monitor and log performance metrics

### API Design

- ✅ Use consistent naming conventions
- ✅ Version your API from the start
- ✅ Provide clear error messages
- ✅ Document your API properly
- ✅ Use standard HTTP methods and status codes
- ✅ Keep URLs simple and intuitive
- ✅ Support filtering, sorting, pagination
- ✅ Make responses predictable and consistent

### Documentation

- ✅ Provide interactive API documentation (Swagger/OpenAPI)
- ✅ Include code examples in multiple languages
- ✅ Document all error codes and responses
- ✅ Provide getting started guides
- ✅ Keep documentation in sync with code
- ✅ Include authentication instructions
- ✅ Provide SDKs for popular languages

### Monitoring

- ✅ Log all requests and responses
- ✅ Monitor API performance and uptime
- ✅ Track error rates and types
- ✅ Set up alerts for anomalies
- ✅ Use distributed tracing for microservices
- ✅ Monitor rate limit usage
- ✅ Track API usage metrics

## Testing

### Unit Testing (Jest)

```javascript
const request = require('supertest');
const app = require('./app');

describe('GET /users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /users', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com' })
      .expect(201);
    
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test User');
  });
  
  it('should return 400 for invalid data', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test' })
      .expect(400);
    
    expect(res.body).toHaveProperty('error');
  });
});
```

### Integration Testing

```javascript
describe('User workflow', () => {
  let userId;
  
  it('should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);
    
    userId = res.body.id;
  });
  
  it('should get the created user', async () => {
    const res = await request(app)
      .get(`/users/${userId}`)
      .expect(200);
    
    expect(res.body.name).toBe('Alice');
  });
  
  it('should update the user', async () => {
    const res = await request(app)
      .patch(`/users/${userId}`)
      .send({ name: 'Alice Updated' })
      .expect(200);
    
    expect(res.body.name).toBe('Alice Updated');
  });
  
  it('should delete the user', async () => {
    await request(app)
      .delete(`/users/${userId}`)
      .expect(204);
    
    await request(app)
      .get(`/users/${userId}`)
      .expect(404);
  });
});
```

## Tools and Libraries

### Node.js/Express
- **express**: Web framework
- **express-validator**: Request validation
- **helmet**: Security headers
- **cors**: CORS middleware
- **compression**: Response compression
- **express-rate-limit**: Rate limiting
- **jsonwebtoken**: JWT auth
- **swagger-ui-express**: API documentation

### Python/FastAPI
- **FastAPI**: Modern web framework
- **Pydantic**: Data validation
- **uvicorn**: ASGI server
- **python-jose**: JWT implementation
- **slowapi**: Rate limiting
- **fastapi-cache**: Caching layer

### Go
- **gin**: Web framework
- **gorilla/mux**: HTTP router
- **go-swagger**: OpenAPI tools
- **jwt-go**: JWT library

### Testing
- **Postman**: API testing and documentation
- **Insomnia**: REST client
- **httpie**: Command-line HTTP client
- **curl**: Universal HTTP client

## Real-World Examples

### E-commerce API

```javascript
// Products
GET /products?category=electronics&minPrice=100&maxPrice=500&sort=-rating
GET /products/123
POST /products (admin only)

// Cart
POST /cart/items
GET /cart
PATCH /cart/items/456
DELETE /cart/items/456

// Orders
POST /orders
GET /orders
GET /orders/789
PATCH /orders/789/status (admin only)

// Users
POST /auth/register
POST /auth/login
GET /users/me
PATCH /users/me
```

### Social Media API

```javascript
// Posts
GET /posts?sort=-createdAt&limit=20&after=cursor123
POST /posts
GET /posts/123
DELETE /posts/123

// Comments
GET /posts/123/comments
POST /posts/123/comments
DELETE /comments/456

// Likes
POST /posts/123/like
DELETE /posts/123/like

// Follow
POST /users/123/follow
DELETE /users/123/follow
GET /users/123/followers
GET /users/123/following
```

## References

- **REST Architecture**: [Roy Fielding's Dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- **HTTP Specifications**: [MDN HTTP Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- **Best Practices**: [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)
- **OpenAPI**: [OpenAPI Specification](https://swagger.io/specification/)
- **Testing**: [REST API Testing Guide](https://www.postman.com/api-platform/api-testing/)

---

## See Also

- [OpenAPI/Swagger Documentation](../OpenAPI-Swagger/OpenAPI-Swagger.md)
- [JSON:API Specification](../JSON-API/JSON-API.md)
- [GraphQL Alternative](../GraphQL/GraphQL.md)
- [gRPC for Performance](../gRPC/gRPC.md)
