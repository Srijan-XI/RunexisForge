# Directus - Open Data Platform

## Table of Contents
- [Introduction](#introduction)
- [Why Directus?](#why-directus)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Data Studio](#data-studio)
- [API & SDK](#api--sdk)
- [Data Model](#data-model)
- [Access Control](#access-control)
- [Flows & Automation](#flows--automation)
- [Extensions](#extensions)
- [File Management](#file-management)
- [Deployment](#deployment)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Comparison with Other Platforms](#comparison-with-other-platforms)

---

## Introduction

**Directus** is an open-source data platform that wraps any SQL database with a dynamic API and provides an intuitive admin app for managing content. Unlike traditional CMS platforms, Directus is database-first, meaning it works with your existing database schema.

### Key Features
- **Database-First** - Wrap any existing SQL database
- **API Automatic** - Auto-generated REST & GraphQL APIs
- **No Vendor Lock-in** - Pure SQL, no proprietary formats
- **Real-time** - WebSocket support for live updates
- **Headless** - Use any frontend framework
- **Extensible** - Custom extensions and hooks
- **Multi-tenant** - Support for multiple projects
- **Internationalization** - Built-in i18n support
- **File Management** - Advanced asset handling
- **Granular Permissions** - Fine-grained access control

### Architecture
```
┌────────────────────┐
│   Data Studio      │ ← Vue.js admin app
│   (Admin UI)       │
└─────────┬──────────┘
          │
┌─────────▼──────────┐
│   Directus API     │ ← Node.js/Express
│   (REST/GraphQL)   │
└─────────┬──────────┘
          │
┌─────────▼──────────┐
│  SQL Database      │ ← PostgreSQL, MySQL, etc.
│  (Your Data)       │
└────────────────────┘
```

---

## Why Directus?

### Advantages

✅ **Database Freedom**
- Works with existing databases
- Pure SQL with no abstractions
- No proprietary data formats
- Easy migration and portability

✅ **Developer Experience**
- Auto-generated APIs
- Powerful SDKs for multiple languages
- Comprehensive documentation
- TypeScript support

✅ **Content Management**
- Intuitive Data Studio interface
- WYSIWYG editor
- Advanced filtering and search
- Batch operations

✅ **Flexibility**
- Use with any frontend
- Extensible architecture
- Custom workflows
- Real-time capabilities

✅ **Enterprise Ready**
- Role-based access control
- Audit logging
- SSO integration
- High performance

### Use Cases

- **Content Management** - Websites, blogs, documentation
- **Application Backend** - Mobile and web apps
- **Data Platform** - Dashboard and analytics tools
- **Digital Asset Management** - Media libraries
- **Internal Tools** - Admin panels, CRM systems
- **IoT & Device Management** - Sensor data collection
- **Multi-tenant Applications** - SaaS platforms

---

## Installation & Setup

### Prerequisites

```bash
# Node.js 18+ required
node --version

# Supported databases:
# - PostgreSQL 10+
# - MySQL 5.7.8+ / MariaDB 10.2.7+
# - SQLite 3
# - MS SQL Server
# - CockroachDB 21.3+
# - OracleDB 19+
```

### Quick Start with Docker

```bash
# Create docker-compose.yml
version: '3'
services:
  directus:
    image: directus/directus:latest
    ports:
      - 8055:8055
    volumes:
      - ./database:/directus/database
      - ./uploads:/directus/uploads
      - ./extensions:/directus/extensions
    environment:
      KEY: 'replace-with-random-value'
      SECRET: 'replace-with-random-value'
      ADMIN_EMAIL: 'admin@example.com'
      ADMIN_PASSWORD: 'd1r3ctu5'
      DB_CLIENT: 'sqlite3'
      DB_FILENAME: '/directus/database/data.db'
      WEBSOCKETS_ENABLED: true

# Start Directus
docker-compose up -d

# Access at http://localhost:8055
```

### NPM Installation

```bash
# Install globally
npm install -g directus

# Create new project
npx create-directus-project my-project

# Choose database
# Enter configuration

# Navigate to project
cd my-project

# Start Directus
npx directus start
```

### Environment Configuration

**.env**
```env
####################################
# General
####################################

PORT=8055
PUBLIC_URL="http://localhost:8055"

####################################
# Database
####################################

DB_CLIENT="postgres"
DB_HOST="localhost"
DB_PORT="5432"
DB_DATABASE="directus"
DB_USER="directus"
DB_PASSWORD="directus"

####################################
# Security
####################################

KEY="replace-with-random-32-char-string"
SECRET="replace-with-random-secret-string"

ACCESS_TOKEN_TTL="15m"
REFRESH_TOKEN_TTL="7d"
REFRESH_TOKEN_COOKIE_SECURE="false"
REFRESH_TOKEN_COOKIE_SAME_SITE="lax"

####################################
# Admin Account
####################################

ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="d1r3ctu5"

####################################
# CORS
####################################

CORS_ENABLED="true"
CORS_ORIGIN="true"
CORS_CREDENTIALS="true"

####################################
# Rate Limiting
####################################

RATE_LIMITER_ENABLED="true"
RATE_LIMITER_POINTS="50"
RATE_LIMITER_DURATION="1"

####################################
# File Storage
####################################

STORAGE_LOCATIONS="local"
STORAGE_LOCAL_ROOT="./uploads"

####################################
# Email
####################################

EMAIL_FROM="directus@example.com"
EMAIL_TRANSPORT="smtp"
EMAIL_SMTP_HOST="smtp.example.com"
EMAIL_SMTP_PORT="587"
EMAIL_SMTP_USER="user@example.com"
EMAIL_SMTP_PASSWORD="password"

####################################
# WebSockets
####################################

WEBSOCKETS_ENABLED="true"

####################################
# Cache
####################################

CACHE_ENABLED="true"
CACHE_STORE="memory"
CACHE_TTL="10m"
```

### Project Structure

```
my-project/
├── database/              # SQLite database (if used)
├── extensions/            # Custom extensions
│   ├── displays/
│   ├── interfaces/
│   ├── layouts/
│   ├── modules/
│   ├── panels/
│   ├── hooks/
│   └── endpoints/
├── uploads/              # File storage
├── .env                  # Environment variables
└── package.json
```

### Starting Directus

```bash
# Development mode
npx directus start

# Production mode
NODE_ENV=production npx directus start

# With PM2
pm2 start "npx directus start" --name directus

# Bootstrap database
npx directus bootstrap

# Database migrations
npx directus database migrate:latest
npx directus database migrate:up
npx directus database migrate:down
```

---

## Core Concepts

### 1. Collections

Collections are database tables. Directus automatically generates CRUD APIs for each collection.

**Types:**
- **Standard Collections** - Regular database tables
- **System Collections** - Built-in Directus tables (prefixed with `directus_`)
- **Junction Collections** - Many-to-many relationship tables

### 2. Items

Items are rows in a collection (database records).

### 3. Fields

Fields are columns in a collection with specific data types and display interfaces.

### 4. Relationships

Connect data across collections:
- **Many-to-One (M2O)** - e.g., Article → Author
- **One-to-Many (O2M)** - e.g., Author → Articles
- **Many-to-Many (M2M)** - e.g., Articles ↔ Tags
- **Many-to-Any (M2A)** - Polymorphic relationships

### 5. Roles & Permissions

Control access to collections, fields, and items with granular permissions.

### 6. Flows

Automate workflows with trigger-based actions.

---

## Data Studio

### Dashboard

The Data Studio is the admin interface for managing content.

**Features:**
- Content browsing and editing
- Visual data modeling
- User management
- Access control configuration
- Insights and analytics
- File library

### Creating Collections

#### Via Data Studio
1. Navigate to **Settings** → **Data Model**
2. Click **Create Collection**
3. Enter collection name (e.g., `articles`)
4. Configure options:
   - Singleton (single record)
   - Archive/Trash
   - Accountability (track changes)
   - Sort field
5. Add fields

#### Via API
```javascript
// POST /collections
{
  "collection": "articles",
  "meta": {
    "icon": "article",
    "note": "Blog articles collection"
  },
  "schema": {
    "name": "articles"
  },
  "fields": [
    {
      "field": "id",
      "type": "integer",
      "schema": {
        "is_primary_key": true,
        "has_auto_increment": true
      }
    },
    {
      "field": "title",
      "type": "string",
      "schema": {
        "max_length": 255
      },
      "meta": {
        "required": true
      }
    }
  ]
}
```

### Field Types

| Type | Description | Interface |
|------|-------------|-----------|
| `string` | Text | Input, Textarea, WYSIWYG |
| `text` | Long text | Textarea, Markdown, Code |
| `boolean` | True/false | Toggle, Checkbox |
| `integer` | Whole number | Input |
| `float` | Decimal | Input |
| `decimal` | Precise decimal | Input |
| `timestamp` | Date & time | Datetime |
| `date` | Date only | Date |
| `time` | Time only | Time |
| `json` | JSON data | JSON, Code |
| `uuid` | UUID | Input |
| `hash` | Hashed value | Input (password) |
| `csv` | CSV data | Tags |
| `geometry` | Spatial data | Map |

### Layouts

Different ways to view collection data:
- **Table** - Spreadsheet view
- **Cards** - Card grid
- **Calendar** - Timeline view
- **Kanban** - Board view
- **Map** - Geospatial view

### Interfaces

How fields are displayed and edited:
- **Input** - Text input
- **Textarea** - Multi-line text
- **WYSIWYG** - Rich text editor
- **Markdown** - Markdown editor
- **Code** - Syntax-highlighted code
- **Dropdown** - Select from options
- **Toggle** - Boolean switch
- **Slider** - Numeric slider
- **File** - File upload
- **Repeater** - Repeating fields
- **M2O** - Relation selector

---

## API & SDK

### REST API

Directus automatically generates a complete REST API.

#### Authentication

```bash
# Login
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "d1r3ctu5"
}

# Response
{
  "data": {
    "access_token": "eyJhbG...",
    "refresh_token": "abc123...",
    "expires": 900000
  }
}
```

#### CRUD Operations

```bash
# Create item
POST /items/articles
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Hello World",
  "content": "This is my first article",
  "status": "published"
}

# Read items
GET /items/articles
Authorization: Bearer <token>

# Read single item
GET /items/articles/1
Authorization: Bearer <token>

# Update item
PATCH /items/articles/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title"
}

# Delete item
DELETE /items/articles/1
Authorization: Bearer <token>
```

#### Query Parameters

```bash
# Fields selection
GET /items/articles?fields=id,title,author.name

# Filtering
GET /items/articles?filter[status][_eq]=published
GET /items/articles?filter[views][_gte]=100

# Sorting
GET /items/articles?sort=-published_date,title

# Pagination
GET /items/articles?limit=10&offset=20
GET /items/articles?page=3&limit=25

# Search
GET /items/articles?search=directus

# Deep filtering (relations)
GET /items/articles?filter[author][name][_contains]=John

# Aggregation
GET /items/articles?aggregate[count]=*
GET /items/articles?aggregate[avg]=views

# Grouping
GET /items/articles?groupBy[]=author&aggregate[count]=*
```

### GraphQL API

```bash
# Enable GraphQL (enabled by default)
GET /graphql
POST /graphql
```

#### GraphQL Queries

```graphql
# Query items
query {
  articles(filter: { status: { _eq: "published" } }) {
    id
    title
    content
    author {
      id
      name
      email
    }
    categories {
      id
      name
    }
  }
}

# Single item
query {
  articles_by_id(id: 1) {
    id
    title
    content
  }
}

# With variables
query GetArticle($id: ID!) {
  articles_by_id(id: $id) {
    id
    title
    content
  }
}

# Mutations
mutation {
  create_articles_item(data: {
    title: "New Article"
    content: "Content here"
    status: "published"
  }) {
    id
    title
  }
}

# Update
mutation {
  update_articles_item(id: 1, data: {
    title: "Updated Title"
  }) {
    id
    title
  }
}

# Delete
mutation {
  delete_articles_item(id: 1) {
    id
  }
}
```

### JavaScript SDK

```bash
npm install @directus/sdk
```

**Basic Usage**

```javascript
import { createDirectus, rest, authentication } from '@directus/sdk';

// Initialize client
const client = createDirectus('http://localhost:8055')
  .with(authentication())
  .with(rest());

// Login
await client.login('admin@example.com', 'd1r3ctu5');

// Read items
const articles = await client.request(
  readItems('articles', {
    fields: ['*', 'author.*'],
    filter: {
      status: {
        _eq: 'published'
      }
    },
    sort: ['-published_date']
  })
);

// Create item
const newArticle = await client.request(
  createItem('articles', {
    title: 'Hello Directus',
    content: 'My first article',
    status: 'draft'
  })
);

// Update item
await client.request(
  updateItem('articles', 1, {
    status: 'published'
  })
);

// Delete item
await client.request(deleteItem('articles', 1));
```

**TypeScript Support**

```typescript
import { createDirectus, rest } from '@directus/sdk';

interface Article {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
  published_date: string;
  author: Author;
}

interface Author {
  id: number;
  name: string;
  email: string;
}

interface Schema {
  articles: Article[];
  authors: Author[];
}

const client = createDirectus<Schema>('http://localhost:8055')
  .with(rest());

// Type-safe queries
const articles = await client.request(
  readItems('articles', {
    fields: ['id', 'title', 'author.name']
  })
);
// articles is typed as Pick<Article, 'id' | 'title'>[]
```

### Real-time / WebSockets

```javascript
import { createDirectus, realtime } from '@directus/sdk';

const client = createDirectus('http://localhost:8055')
  .with(realtime());

// Subscribe to collection
const { subscription } = await client.subscribe('articles', {
  event: 'create',
  query: {
    fields: ['*']
  }
});

for await (const item of subscription) {
  console.log('New article created:', item);
}

// Unsubscribe
subscription.return();
```

---

## Data Model

### Defining Schema

#### M2O Relationship (Many-to-One)

```javascript
// Article → Author
// Many articles belong to one author

// Add author field to articles
{
  "field": "author",
  "type": "integer",
  "meta": {
    "interface": "select-dropdown-m2o",
    "display": "related-values",
    "display_options": {
      "template": "{{name}}"
    }
  },
  "schema": {
    "foreign_key_table": "authors",
    "foreign_key_column": "id"
  }
}
```

#### O2M Relationship (One-to-Many)

```javascript
// Author → Articles
// One author has many articles

// Add articles field to authors (virtual field)
{
  "field": "articles",
  "type": "alias",
  "meta": {
    "interface": "list-o2m",
    "special": ["o2m"],
    "options": {
      "collection": "articles",
      "field": "author"
    }
  }
}
```

#### M2M Relationship (Many-to-Many)

```javascript
// Articles ↔ Tags
// Many articles can have many tags

// Junction collection: articles_tags
{
  "collection": "articles_tags",
  "fields": [
    {
      "field": "id",
      "type": "integer",
      "schema": { "is_primary_key": true }
    },
    {
      "field": "articles_id",
      "type": "integer",
      "schema": {
        "foreign_key_table": "articles",
        "foreign_key_column": "id"
      }
    },
    {
      "field": "tags_id",
      "type": "integer",
      "schema": {
        "foreign_key_table": "tags",
        "foreign_key_column": "id"
      }
    }
  ]
}

// Add tags field to articles
{
  "field": "tags",
  "type": "alias",
  "meta": {
    "interface": "list-m2m",
    "special": ["m2m"],
    "options": {
      "junction_collection": "articles_tags",
      "junction_field": "articles_id",
      "junction_related": "tags_id"
    }
  }
}
```

### Validation Rules

```javascript
// Field validation
{
  "field": "email",
  "type": "string",
  "meta": {
    "validation": {
      "_and": [
        {
          "email": {
            "_submitted": true
          }
        },
        {
          "_regex": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        }
      ]
    },
    "validation_message": "Please enter a valid email address"
  }
}
```

### Computed Fields

**Display Templates**

```javascript
// Format: {{field_name}}
// Example: "{{first_name}} {{last_name}}"

{
  "field": "full_name",
  "type": "alias",
  "meta": {
    "interface": "presentation-notice",
    "special": ["alias", "no-data"],
    "options": {
      "template": "{{first_name}} {{last_name}}"
    }
  }
}
```

---

## Access Control

### Roles & Permissions

#### Creating Roles

1. Navigate to **Settings** → **Access Control** → **Roles**
2. Click **Create Role**
3. Enter role name and description
4. Configure permissions

#### Permission Levels

- **All Access** - Full CRUD permissions
- **No Access** - No permissions
- **Custom** - Granular control

#### Granular Permissions

```javascript
// Per collection permissions
{
  "collection": "articles",
  "permissions": {
    "create": "full",
    "read": "mine",
    "update": "mine",
    "delete": "none"
  },
  "fields": ["*"],
  "validation": {
    "status": {
      "_eq": "draft"
    }
  }
}
```

#### Field Permissions

```javascript
// Restrict fields per role
{
  "collection": "users",
  "permissions": {
    "read": "full"
  },
  "fields": ["id", "email", "first_name", "last_name"],
  // password field excluded
}
```

#### Conditional Permissions

```javascript
// Users can only read their own items
{
  "permissions": {
    "read": "full"
  },
  "validation": {
    "user_created": {
      "_eq": "$CURRENT_USER"
    }
  }
}

// Users can read published items or their own drafts
{
  "permissions": {
    "read": "full"
  },
  "validation": {
    "_or": [
      {
        "status": {
          "_eq": "published"
        }
      },
      {
        "_and": [
          {
            "status": {
              "_eq": "draft"
            }
          },
          {
            "user_created": {
              "_eq": "$CURRENT_USER"
            }
          }
        ]
      }
    ]
  }
}
```

### Public Access

```javascript
// Allow public read access
// Configure Public role permissions
{
  "role": "public",
  "collection": "articles",
  "permissions": {
    "read": "full"
  },
  "fields": ["id", "title", "content", "published_date"],
  "validation": {
    "status": {
      "_eq": "published"
    }
  }
}
```

---

## Flows & Automation

Flows are automation workflows triggered by events.

### Trigger Types

- **Event Hook** - Database events (create, update, delete)
- **Webhook** - External HTTP requests
- **Schedule** - Cron-based scheduling
- **Manual** - User-initiated

### Operations

- **Condition** - Branching logic
- **Transform** - Modify data
- **Log to Console** - Debug output
- **Send Email** - Email notifications
- **Send Notification** - In-app notifications
- **Sleep** - Delay execution
- **Request Webhook** - HTTP requests
- **Run Script** - Custom JavaScript
- **Trigger Flow** - Chain flows

### Example Flow

**Send email when article is published**

```yaml
Trigger: Event Hook
  - Collection: articles
  - Action: items.update

Condition:
  - Field: status
  - Operator: equals
  - Value: published

Operation: Send Email
  - To: {{$trigger.payload.author.email}}
  - Subject: Your article "{{$trigger.payload.title}}" is published
  - Body: Congratulations! Your article is now live.
```

### Custom Operations (Script)

```javascript
// Flow operation: Run Script
module.exports = async function({ data, accountability }) {
  const { title, content } = data;
  
  // Generate summary
  const summary = content.substring(0, 200) + '...';
  
  // Update item
  await this.services.ItemsService('articles')
    .updateOne(data.id, {
      summary: summary
    });
  
  return { success: true };
};
```

---

## Extensions

Directus is highly extensible with custom components.

### Extension Types

1. **Interfaces** - Custom field inputs
2. **Displays** - Custom field displays
3. **Layouts** - Custom collection views
4. **Modules** - Custom navigation items
5. **Panels** - Dashboard widgets
6. **Hooks** - Server-side event handlers
7. **Endpoints** - Custom API routes

### Creating Extensions

```bash
# Install CLI
npm install -g @directus/extensions-sdk

# Create extension
npx create-directus-extension

# Choose type (interface, display, etc.)
# Enter name
```

### Custom Interface Example

**extensions/interfaces/my-input/index.js**
```javascript
import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
  id: 'my-input',
  name: 'My Input',
  icon: 'box',
  description: 'Custom input interface',
  component: InterfaceComponent,
  options: null,
  types: ['string'],
});
```

**extensions/interfaces/my-input/interface.vue**
```vue
<template>
  <input 
    :value="value" 
    @input="$emit('input', $event.target.value)"
    class="my-custom-input"
  />
</template>

<script>
export default {
  props: {
    value: String,
  },
};
</script>

<style scoped>
.my-custom-input {
  border: 2px solid #6644FF;
  border-radius: 4px;
  padding: 8px;
}
</style>
```

### Custom Hook Example

**extensions/hooks/audit-log/index.js**
```javascript
export default ({ filter, action }) => {
  filter('items.create', async (input, { collection }, { schema }) => {
    console.log(`Creating item in ${collection}:`, input);
    return input;
  });
  
  action('items.update', async ({ payload, keys }, { collection }) => {
    console.log(`Updated ${keys.length} items in ${collection}`);
    
    // Log to audit table
    await database('audit_log').insert({
      collection: collection,
      action: 'update',
      item_ids: keys,
      timestamp: new Date()
    });
  });
};
```

### Custom Endpoint Example

**extensions/endpoints/custom-api/index.js**
```javascript
export default (router, { services, exceptions }) => {
  const { ItemsService } = services;
  const { ServiceUnavailableException } = exceptions;
  
  router.get('/stats', async (req, res, next) => {
    try {
      const articlesService = new ItemsService('articles', {
        schema: req.schema,
        accountability: req.accountability
      });
      
      const total = await articlesService.readByQuery({
        aggregate: { count: '*' }
      });
      
      const published = await articlesService.readByQuery({
        filter: { status: { _eq: 'published' } },
        aggregate: { count: '*' }
      });
      
      res.json({
        total: total[0].count,
        published: published[0].count
      });
    } catch (error) {
      next(error);
    }
  });
};
```

---

## File Management

### File Upload

```bash
# Upload file
POST /files
Authorization: Bearer <token>
Content-Type: multipart/form-data

file=@image.jpg
folder=<folder_uuid>
title=My Image
```

### File Transformations

```bash
# Get transformed image
GET /assets/<file_id>?width=300&height=200&fit=cover

# Parameters:
# - width, height: dimensions
# - fit: cover, contain, inside, outside
# - quality: 1-100
# - format: jpg, png, webp, tiff
```

### Custom Storage Adapters

**.env**
```env
# AWS S3
STORAGE_LOCATIONS="s3"
STORAGE_S3_DRIVER="s3"
STORAGE_S3_KEY="aws-access-key"
STORAGE_S3_SECRET="aws-secret-key"
STORAGE_S3_BUCKET="my-bucket"
STORAGE_S3_REGION="us-east-1"

# Azure Blob Storage
STORAGE_LOCATIONS="azure"
STORAGE_AZURE_DRIVER="azure"
STORAGE_AZURE_CONTAINER_NAME="directus"
STORAGE_AZURE_ACCOUNT_NAME="account"
STORAGE_AZURE_ACCOUNT_KEY="key"

# Google Cloud Storage
STORAGE_LOCATIONS="gcs"
STORAGE_GCS_DRIVER="gcs"
STORAGE_GCS_BUCKET="my-bucket"
STORAGE_GCS_KEY_FILENAME="./service-account.json"
```

---

## Deployment

### Environment Variables

**.env.production**
```env
NODE_ENV="production"
PORT=8055
PUBLIC_URL="https://api.example.com"

DB_CLIENT="postgres"
DB_HOST="prod-db.example.com"
DB_PORT=5432
DB_DATABASE="directus"
DB_USER="directus"
DB_PASSWORD="SecurePassword123"
DB_SSL="true"

KEY="replace-with-32-char-key"
SECRET="replace-with-secret"

CACHE_ENABLED="true"
CACHE_STORE="redis"
REDIS="redis://localhost:6379"

RATE_LIMITER_ENABLED="true"
RATE_LIMITER_STORE="redis"
RATE_LIMITER_REDIS="redis://localhost:6379"
```

### Docker Deployment

**docker-compose.yml**
```yaml
version: '3'

services:
  directus:
    image: directus/directus:latest
    ports:
      - 8055:8055
    volumes:
      - ./uploads:/directus/uploads
      - ./extensions:/directus/extensions
    environment:
      KEY: 'your-random-key'
      SECRET: 'your-random-secret'
      
      DB_CLIENT: 'postgres'
      DB_HOST: 'postgres'
      DB_PORT: '5432'
      DB_DATABASE: 'directus'
      DB_USER: 'directus'
      DB_PASSWORD: 'directus'
      
      CACHE_ENABLED: 'true'
      CACHE_STORE: 'redis'
      REDIS: 'redis://redis:6379'
      
      ADMIN_EMAIL: 'admin@example.com'
      ADMIN_PASSWORD: 'd1r3ctu5'
      
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: directus
      POSTGRES_USER: directus
      POSTGRES_PASSWORD: directus

  redis:
    image: redis:7-alpine

volumes:
  postgres-data:
```

### Kubernetes Deployment

**directus-deployment.yaml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: directus
spec:
  replicas: 3
  selector:
    matchLabels:
      app: directus
  template:
    metadata:
      labels:
        app: directus
    spec:
      containers:
      - name: directus
        image: directus/directus:latest
        ports:
        - containerPort: 8055
        env:
        - name: DB_CLIENT
          value: "postgres"
        - name: DB_HOST
          value: "postgres-service"
        - name: DB_PORT
          value: "5432"
        - name: DB_DATABASE
          valueFrom:
            secretKeyRef:
              name: directus-secrets
              key: db-name
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: directus-secrets
              key: db-user
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: directus-secrets
              key: db-password
        - name: KEY
          valueFrom:
            secretKeyRef:
              name: directus-secrets
              key: key
        - name: SECRET
          valueFrom:
            secretKeyRef:
              name: directus-secrets
              key: secret
        volumeMounts:
        - name: uploads
          mountPath: /directus/uploads
      volumes:
      - name: uploads
        persistentVolumeClaim:
          claimName: directus-uploads-pvc
```

### PM2 Deployment

```bash
# Install PM2
npm install -g pm2

# Start Directus
pm2 start "npx directus start" --name directus

# Save configuration
pm2 save

# Setup startup script
pm2 startup

# Monitor
pm2 monit

# Logs
pm2 logs directus
```

---

## Best Practices

### 1. Database Design

```sql
-- Use proper indexes
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_author ON articles(author_id);

-- Use foreign keys
ALTER TABLE articles 
ADD CONSTRAINT fk_author 
FOREIGN KEY (author_id) REFERENCES authors(id);
```

### 2. API Optimization

```javascript
// Use field selection
const articles = await client.request(
  readItems('articles', {
    fields: ['id', 'title'], // Only needed fields
    limit: 10
  })
);

// Implement caching
// .env
CACHE_ENABLED=true
CACHE_TTL=10m
CACHE_STORE=redis
```

### 3. Security

```javascript
// Use environment variables
// Never hardcode credentials

// Implement rate limiting
// .env
RATE_LIMITER_ENABLED=true
RATE_LIMITER_POINTS=50
RATE_LIMITER_DURATION=1

// Use strong secrets
KEY=<32-character-random-string>
SECRET=<random-secret>

// Enable CORS properly
CORS_ENABLED=true
CORS_ORIGIN=https://yourdomain.com
```

### 4. Performance

```javascript
// Use pagination
GET /items/articles?limit=25&page=1

// Implement deep population carefully
GET /items/articles?fields=*,author.id,author.name
// Avoid: ?fields=*.*.*

// Use aggregation for counts
GET /items/articles?aggregate[count]=*
```

### 5. Content Versioning

```javascript
// Enable accountability
{
  "collection": "articles",
  "accountability": "all"
}

// Track versions
{
  "meta": {
    "versioning": true
  }
}
```

---

## Real-World Examples

### 1. Blog Platform

**Collections:**
- Articles (title, content, author, status, published_date)
- Authors (name, bio, avatar)
- Categories (name, slug)
- Comments (article, user, content, status)

**Implementation:**

```javascript
// Fetch published articles with author
const articles = await client.request(
  readItems('articles', {
    filter: {
      status: { _eq: 'published' }
    },
    fields: [
      '*',
      'author.name',
      'author.avatar',
      'categories.name'
    ],
    sort: ['-published_date'],
    limit: 10
  })
);

// Create comment
await client.request(
  createItem('comments', {
    article: articleId,
    user: userId,
    content: commentText,
    status: 'pending'
  })
);
```

### 2. E-commerce Backend

**Collections:**
- Products (name, description, price, inventory, images)
- Categories (name, description, parent)
- Orders (customer, items, total, status)
- Customers (email, name, address)

**Flow Example - Low Stock Alert:**

```yaml
Trigger: Event Hook
  - Collection: orders
  - Action: items.create

Operation: Run Script
  - Check inventory for ordered products
  - If stock < threshold, send email alert
```

### 3. Mobile App Backend

**Features:**
- User authentication
- Push notifications via flows
- File uploads
- Real-time updates

```javascript
// Real-time subscription
const { subscription } = await client.subscribe('messages', {
  event: 'create',
  query: {
    filter: {
      recipient: { _eq: userId }
    }
  }
});

for await (const message of subscription) {
  // Show notification
  showNotification(message);
}
```

### 4. Multi-tenant SaaS

**Implementation:**

```javascript
// Add tenant field to all collections
{
  "field": "tenant_id",
  "type": "uuid",
  "meta": {
    "hidden": true
  }
}

// Custom hook to enforce tenant isolation
filter('items.read', async (input, { collection }, context) => {
  const tenantId = context.accountability.user.tenant_id;
  
  if (!input.filter) input.filter = {};
  input.filter.tenant_id = { _eq: tenantId };
  
  return input;
});
```

---

## Comparison with Other Platforms

### Directus vs Strapi

| Feature | Directus | Strapi |
|---------|----------|--------|
| **Type** | Data Platform | Headless CMS |
| **Database** | Any SQL (wraps existing) | ORM abstraction |
| **Data Format** | Pure SQL | Custom format |
| **Admin UI** | Vue.js | React |
| **Learning Curve** | Moderate | Moderate |
| **Flexibility** | Very high | High |
| **Vendor Lock-in** | None | Moderate |

### Directus vs Contentful

| Feature | Directus | Contentful |
|---------|----------|------------|
| **Hosting** | Self-hosted | SaaS only |
| **Cost** | Free (infrastructure) | Freemium |
| **Data Control** | Full ownership | Vendor-controlled |
| **Customization** | Unlimited | Limited |
| **Real-time** | Built-in | Via webhooks |

### When to Choose Directus

✅ **Choose Directus if:**
- You have an existing database
- You want zero vendor lock-in
- You need full data control
- You require extensive customization
- Real-time features are important
- Cost optimization is crucial

❌ **Consider alternatives if:**
- You need instant managed hosting
- You prefer not managing infrastructure
- You want opinionated content modeling
- Enterprise support is critical

---

## Resources

### Official Documentation
- **Website:** https://directus.io
- **Documentation:** https://docs.directus.io
- **GitHub:** https://github.com/directus/directus
- **Community:** https://directus.chat

### Learning Resources
- **Blog:** https://directus.io/blog
- **YouTube:** https://youtube.com/@DirectusVideos
- **Guides:** https://docs.directus.io/guides

### Tools & Extensions
- **Extension SDK:** https://docs.directus.io/extensions
- **Awesome Directus:** Community resources

### Community
- **Discord:** https://directus.chat
- **GitHub Discussions:** https://github.com/directus/directus/discussions
- **Twitter:** @directus

---

## Conclusion

Directus is a powerful open data platform that provides the perfect balance between flexibility and ease of use. By wrapping your SQL database with a dynamic API and intuitive admin interface, it enables teams to build modern applications without sacrificing data ownership or portability.

**Key Takeaways:**
- 🗄️ Database-first approach with zero vendor lock-in
- 🚀 Auto-generated REST & GraphQL APIs
- 🎨 Beautiful Data Studio for content management
- 🔧 Highly extensible with custom extensions
- 🔒 Granular access control and permissions
- ⚡ Real-time capabilities built-in
- 🌍 Works with any frontend framework

Whether you're building a content website, mobile app backend, or enterprise data platform, Directus provides the tools you need to manage your data effectively while maintaining complete control and flexibility.
