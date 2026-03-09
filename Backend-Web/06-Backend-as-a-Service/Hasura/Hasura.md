# Hasura

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Data Modeling](#data-modeling)
5. [GraphQL Queries](#graphql-queries)
6. [Permissions](#permissions)
7. [Actions](#actions)
8. [Deployment](#deployment)
9. [Best Practices](#best-practices)
10. [Resources](#resources)

---

## Introduction

Hasura is an open-source GraphQL engine that instantly provides a GraphQL API over your database. It enables rapid API development without writing backend code.

### Key Features
- **Instant GraphQL API**: From database tables
- **Real-time**: WebSocket subscriptions
- **Permissions**: Row-level and column-level
- **Actions**: Custom business logic
- **Event Triggers**: Webhook-based events
- **Remote Joins**: Combine data sources
- **Database Agnostic**: PostgreSQL, MySQL, SQL Server, BigQuery
- **Admin UI**: Manage everything visually

### Why Hasura?
- Fastest way to build GraphQL APIs
- No backend code for standard operations
- Strong security model
- Real-time capabilities
- Flexible custom logic
- Scales to production

---

## Installation

### Docker Compose
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: postgrespassword
    volumes:
      - db_data:/var/lib/postgresql/data

  hasura:
    image: hasura/graphql-engine:latest
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://postgres:postgrespassword@postgres:5432/postgres
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true"
      HASURA_GRAPHQL_ADMIN_SECRET: myadminsecret

volumes:
  db_data:
```

Run:
```bash
docker-compose up
# Access: http://localhost:8080
```

---

## Getting Started

### Connect Database
1. Open Hasura Console (http://localhost:8080)
2. Click "Data"
3. Select "PostgreSQL" or your database
4. Enter connection string

### Create Table
1. Go to "Data" → "SQL"
2. Execute:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Auto-generate GraphQL API
1. Go to "Data" → "users" table
2. Hasura automatically creates GraphQL operations

---

## Data Modeling

### Create Related Tables
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Hasura Relationships
1. Go to "Data" → "posts" table
2. Click "Relationships" tab
3. Create Foreign Key relationship
4. Hasura auto-detects and creates GraphQL relations

---

## GraphQL Queries

### Basic Queries
```graphql
# Get all users
query {
  users {
    id
    name
    email
    created_at
  }
}

# Get user with posts
query {
  users {
    id
    name
    posts {
      id
      title
      created_at
    }
  }
}

# Get post with author and comments
query {
  posts {
    id
    title
    user {
      id
      name
    }
    comments {
      id
      content
      user {
        name
      }
    }
  }
}
```

### Filters and Search
```graphql
# Filter users by name
query {
  users(where: {name: {_like: "%john%"}}) {
    id
    name
    email
  }
}

# Multiple conditions
query {
  posts(
    where: {
      _and: [
        {user_id: {_eq: 1}}
        {created_at: {_gte: "2024-01-01"}}
      ]
    }
  ) {
    id
    title
  }
}
```

### Sorting and Pagination
```graphql
# Sort by created_at descending, limit 10
query {
  posts(
    order_by: {created_at: desc}
    limit: 10
    offset: 0
  ) {
    id
    title
  }
}
```

### Mutations
```graphql
# Insert user
mutation {
  insert_users_one(object: {name: "Alice", email: "alice@example.com"}) {
    id
    name
    email
  }
}

# Update user
mutation {
  update_users_by_pk(pk_columns: {id: 1}, _set: {name: "Alice Updated"}) {
    id
    name
  }
}

# Delete user
mutation {
  delete_users_by_pk(id: 1) {
    id
    name
  }
}
```

### Subscriptions
```graphql
# Subscribe to new posts
subscription {
  posts(order_by: {created_at: desc}) {
    id
    title
    user {
      name
    }
  }
}
```

---

## Permissions

### Setup Roles
1. Go to "Settings" → "Roles and Permissions"
2. Create roles (e.g., user, admin, guest)

### Row-Level Security
```
Table: users
Role: user
Select: Custom check → id == X-Hasura-User-Id (session variable)
```

This ensures users can only see their own data.

### Column-Level Permissions
```
Table: users
Role: user
Select: Allow columns [id, name, email]
        Hide columns [password, admin]
```

---

## Actions

### Create Custom Logic
1. Go to "Actions"
2. Define GraphQL type
3. Implement handler endpoint

Example:
```graphql
type Query {
  signup(email: String!, password: String!): AuthOutput
}

type AuthOutput {
  token: String!
  user: User!
}
```

---

## Deployment

### Hasura Cloud
1. Go to [cloud.hasura.io](https://cloud.hasura.io)
2. Create project
3. Connect database
4. Deploy

### Self-hosted (Docker)
```bash
docker run -p 8080:8080 \
  -e HASURA_GRAPHQL_DATABASE_URL=<your-db-url> \
  -e HASURA_GRAPHQL_ADMIN_SECRET=<secret> \
  hasura/graphql-engine:latest
```

---

## Best Practices

### 1. Security
- Always set `HASURA_GRAPHQL_ADMIN_SECRET`
- Use environment variables
- Implement proper permissions
- Validate inputs

### 2. Database Design
- Create proper indexes
- Use foreign keys
- Normalize schema
- Plan scalability

### 3. Query Optimization
- Use pagination
- Limit nested queries
- Select only needed fields
- Use proper filtering

---

## Resources

- [Hasura Documentation](https://hasura.io/docs/)
- [Hasura Community](https://discord.gg/hasura)
- [GraphQL Tutorial](https://graphql.org/learn/)

---

## Summary

Hasura is the fastest way to build GraphQL APIs without writing backend code.

✅ Instant GraphQL APIs  
✅ Real-time subscriptions  
✅ Security first  
✅ Scales easily  
✅ Flexible custom logic  

**Perfect for rapid API development!**

