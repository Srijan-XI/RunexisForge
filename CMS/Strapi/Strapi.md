# Strapi - Headless CMS

## Table of Contents
- [Introduction](#introduction)
- [Why Strapi?](#why-strapi)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Content Types](#content-types)
- [API Generation](#api-generation)
- [Authentication & Permissions](#authentication--permissions)
- [Plugin System](#plugin-system)
- [Customization](#customization)
- [Database Configuration](#database-configuration)
- [Deployment](#deployment)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Comparison with Other CMS](#comparison-with-other-cms)

---

## Introduction

**Strapi** is an open-source, Node.js-based headless CMS that gives developers the freedom to choose their favorite tools and frameworks while allowing editors to easily manage their content. It's designed to build powerful APIs quickly with a modern admin panel.

### Key Features
- **100% JavaScript/TypeScript** - Built on Node.js
- **Customizable Admin Panel** - Modern React-based UI
- **RESTful & GraphQL APIs** - Auto-generated from your content types
- **Plugin System** - Extensible architecture
- **Self-hosted** - Full control over your data
- **Role-Based Access Control** - Granular permissions
- **Internationalization (i18n)** - Multi-language support
- **Media Library** - Built-in asset management
- **Webhooks** - Real-time event notifications

### Architecture
```
┌─────────────────┐
│  Admin Panel    │ ← React-based UI
│  (React)        │
└────────┬────────┘
         │
┌────────▼────────┐
│   Strapi Core   │ ← Node.js/Koa
│   (Node.js)     │
└────────┬────────┘
         │
┌────────▼────────┐
│    Database     │ ← PostgreSQL, MySQL, SQLite
│   (SQL/NoSQL)   │
└─────────────────┘
```

---

## Why Strapi?

### Advantages
✅ **Developer-Friendly**
- Built with modern JavaScript/TypeScript
- Extensive customization options
- Clean and intuitive API

✅ **Content Management**
- User-friendly admin interface
- Visual content-type builder
- Media library with upload capabilities

✅ **Flexibility**
- Use any frontend framework
- Deploy anywhere
- Choose your database

✅ **Performance**
- Fast API generation
- Efficient query handling
- Caching support

✅ **Community & Ecosystem**
- Active open-source community
- Rich plugin marketplace
- Extensive documentation

### Use Cases
- **Content Websites** - Blogs, news sites, documentation
- **E-commerce** - Product catalogs, inventory management
- **Mobile Apps** - Backend for iOS/Android apps
- **IoT Applications** - Device management and data collection
- **Multi-channel Publishing** - Content distribution across platforms

---

## Installation & Setup

### Prerequisites
```bash
# Node.js 14.x or higher
node --version

# npm 6.x or higher
npm --version
```

### Quick Start

#### Using npx (Recommended)
```bash
# Create new Strapi project
npx create-strapi-app@latest my-project

# Choose installation type
# - Quickstart (SQLite)
# - Custom (choose database)
```

#### Using npm
```bash
# Install Strapi globally
npm install -g create-strapi-app

# Create project
create-strapi-app my-project
```

#### Using Yarn
```bash
yarn create strapi-app my-project
```

### Custom Installation

```bash
# With specific database
npx create-strapi-app my-project \
  --dbclient=postgres \
  --dbhost=localhost \
  --dbport=5432 \
  --dbname=strapi \
  --dbusername=strapi \
  --dbpassword=strapi
```

### TypeScript Setup

```bash
# Create TypeScript project
npx create-strapi-app@latest my-project --typescript

# Or add TypeScript to existing project
npm install --save-dev typescript @types/node
```

### Project Structure

```
my-project/
├── .cache/                 # Build cache
├── .tmp/                   # Temporary files
├── build/                  # Admin panel build
├── config/                 # Configuration files
│   ├── admin.js
│   ├── api.js
│   ├── database.js
│   ├── middlewares.js
│   ├── plugins.js
│   └── server.js
├── database/
│   └── migrations/
├── public/                 # Public assets
│   └── uploads/           # Media library
├── src/
│   ├── admin/             # Admin customization
│   ├── api/               # API definitions
│   │   └── [content-type]/
│   │       ├── controllers/
│   │       ├── routes/
│   │       ├── services/
│   │       └── content-types/
│   ├── extensions/        # Plugin extensions
│   ├── middlewares/       # Custom middlewares
│   └── index.js          # Main entry point
├── .env                   # Environment variables
├── package.json
└── README.md
```

### Starting the Server

```bash
# Development mode
npm run develop

# Production mode
npm run build
npm run start

# The admin panel will be available at:
# http://localhost:1337/admin
```

---

## Core Concepts

### 1. Content Types

**Collection Types** - Multiple entries (e.g., Articles, Products)
**Single Types** - Single entry (e.g., Homepage, About page)

### 2. Components

Reusable data structures that can be used across different content types.

### 3. Dynamic Zones

Flexible content sections that allow editors to compose pages with various components.

### 4. Relations

Define relationships between content types (One-to-One, One-to-Many, Many-to-Many).

### 5. Lifecycle Hooks

Execute custom logic before or after database operations.

---

## Content Types

### Creating Content Types

#### Via Admin Panel
1. Navigate to **Content-Type Builder**
2. Click **Create new collection type**
3. Enter name (e.g., "Article")
4. Add fields (text, rich text, media, etc.)
5. Save and restart server

#### Via CLI
```bash
# Generate content type
npm run strapi generate

# Select: api
# Select: Content type
# Enter name: article
```

### Content Type Schema

**src/api/article/content-types/article/schema.json**
```json
{
  "kind": "collectionType",
  "collectionName": "articles",
  "info": {
    "singularName": "article",
    "pluralName": "articles",
    "displayName": "Article",
    "description": "A simple article content type"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 255
    },
    "slug": {
      "type": "uid",
      "targetField": "title"
    },
    "content": {
      "type": "richtext"
    },
    "excerpt": {
      "type": "text",
      "maxLength": 500
    },
    "coverImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::author.author",
      "inversedBy": "articles"
    },
    "categories": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::category.category",
      "inversedBy": "articles"
    },
    "publishedAt": {
      "type": "datetime"
    },
    "seo": {
      "type": "component",
      "repeatable": false,
      "component": "shared.seo"
    }
  }
}
```

### Field Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Short text | Title, name |
| `text` | Long text | Description |
| `richtext` | Formatted text | Article body |
| `email` | Email address | user@example.com |
| `password` | Encrypted password | ******** |
| `number` | Integer/decimal | 42, 3.14 |
| `enumeration` | Predefined values | status: draft/published |
| `boolean` | True/false | isActive |
| `date` | Date only | 2024-01-15 |
| `datetime` | Date and time | 2024-01-15T10:30:00 |
| `time` | Time only | 10:30:00 |
| `json` | JSON data | {...} |
| `media` | Files/images | Upload |
| `relation` | Relationship | Author → Articles |
| `component` | Reusable structure | SEO component |
| `dynamiczone` | Flexible content | Page builder |
| `uid` | Unique identifier | slug |

### Components

**src/components/shared/seo.json**
```json
{
  "collectionName": "components_shared_seos",
  "info": {
    "displayName": "SEO",
    "description": "SEO metadata component"
  },
  "options": {},
  "attributes": {
    "metaTitle": {
      "type": "string",
      "maxLength": 60
    },
    "metaDescription": {
      "type": "string",
      "maxLength": 160
    },
    "metaImage": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "keywords": {
      "type": "text"
    },
    "canonicalURL": {
      "type": "string"
    }
  }
}
```

### Dynamic Zones

```json
{
  "attributes": {
    "blocks": {
      "type": "dynamiczone",
      "components": [
        "blocks.hero",
        "blocks.features",
        "blocks.testimonials",
        "blocks.cta"
      ]
    }
  }
}
```

---

## API Generation

Strapi automatically generates REST and GraphQL APIs for your content types.

### REST API

#### Endpoints

```bash
# Collection Type: Article
GET    /api/articles              # Find all
GET    /api/articles/:id          # Find one
POST   /api/articles              # Create
PUT    /api/articles/:id          # Update
DELETE /api/articles/:id          # Delete
```

#### Query Parameters

```bash
# Pagination
GET /api/articles?pagination[page]=1&pagination[pageSize]=10

# Sorting
GET /api/articles?sort=createdAt:desc

# Filtering
GET /api/articles?filters[title][$contains]=Strapi

# Population (relations)
GET /api/articles?populate=author,categories

# Deep population
GET /api/articles?populate[author][populate]=avatar

# Fields selection
GET /api/articles?fields=title,slug,publishedAt

# Complex query
GET /api/articles?
  filters[publishedAt][$notNull]=true&
  populate=*&
  sort=publishedAt:desc&
  pagination[limit]=5
```

### GraphQL API

#### Enable GraphQL Plugin

```bash
npm install @strapi/plugin-graphql
```

**config/plugins.js**
```javascript
module.exports = {
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
    },
  },
};
```

#### GraphQL Queries

```graphql
# Find all articles
query Articles {
  articles {
    data {
      id
      attributes {
        title
        slug
        content
        publishedAt
        author {
          data {
            attributes {
              name
              email
            }
          }
        }
        categories {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}

# Find one article
query Article($id: ID!) {
  article(id: $id) {
    data {
      id
      attributes {
        title
        content
        coverImage {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
      }
    }
  }
}

# Create article
mutation CreateArticle($data: ArticleInput!) {
  createArticle(data: $data) {
    data {
      id
      attributes {
        title
      }
    }
  }
}
```

### Custom Routes

**src/api/article/routes/custom-routes.js**
```javascript
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/featured',
      handler: 'article.findFeatured',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/articles/:id/publish',
      handler: 'article.publish',
      config: {
        policies: ['is-owner'],
      },
    },
  ],
};
```

---

## Authentication & Permissions

### User Roles

1. **Authenticated** - Logged-in users
2. **Public** - Anonymous users
3. **Custom Roles** - Define your own

### JWT Authentication

#### Register User

```bash
POST /api/auth/local/register
Content-Type: application/json

{
  "username": "john",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login

```bash
POST /api/auth/local
Content-Type: application/json

{
  "identifier": "john@example.com",
  "password": "SecurePass123"
}

# Response
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john",
    "email": "john@example.com"
  }
}
```

#### Authenticated Request

```bash
GET /api/articles
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Role-Based Access Control (RBAC)

Configure via Admin Panel:
1. **Settings** → **Users & Permissions plugin** → **Roles**
2. Select role (Public, Authenticated, or custom)
3. Configure permissions for each content type

### Custom Policies

**src/policies/is-owner.js**
```javascript
module.exports = async (policyContext, config, { strapi }) => {
  const { id } = policyContext.params;
  const userId = policyContext.state.user.id;

  const entity = await strapi.entityService.findOne(
    'api::article.article',
    id,
    { populate: 'author' }
  );

  if (!entity || entity.author.id !== userId) {
    return false;
  }

  return true;
};
```

### API Tokens

Generate API tokens in Admin Panel:
1. **Settings** → **API Tokens**
2. Create new token with specific permissions
3. Use in requests:

```bash
GET /api/articles
Authorization: Bearer your-api-token-here
```

---

## Plugin System

### Installing Plugins

```bash
# Install from npm
npm install @strapi/plugin-seo

# Enable in config
```

**config/plugins.js**
```javascript
module.exports = {
  seo: {
    enabled: true,
  },
};
```

### Popular Plugins

| Plugin | Purpose |
|--------|---------|
| `@strapi/plugin-graphql` | GraphQL API |
| `@strapi/plugin-i18n` | Internationalization |
| `@strapi/plugin-documentation` | API documentation |
| `@strapi/plugin-seo` | SEO optimization |
| `strapi-plugin-sitemap` | XML sitemap |
| `strapi-plugin-slugify` | Auto-generate slugs |
| `strapi-plugin-email` | Email service |

### Creating Custom Plugin

```bash
# Generate plugin
npm run strapi generate

# Select: plugin
# Enter name: my-plugin
```

**src/plugins/my-plugin/server/index.js**
```javascript
module.exports = {
  register({ strapi }) {
    // Register routes, services, etc.
  },
  
  bootstrap({ strapi }) {
    // Bootstrap logic
  },
  
  destroy({ strapi }) {
    // Cleanup logic
  },
};
```

---

## Customization

### Custom Controllers

**src/api/article/controllers/article.js**
```javascript
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  // Override default find
  async find(ctx) {
    // Custom logic
    const { data, meta } = await super.find(ctx);
    
    // Modify response
    return { data, meta };
  },
  
  // Custom action
  async findFeatured(ctx) {
    const entities = await strapi.entityService.findMany(
      'api::article.article',
      {
        filters: { featured: true },
        populate: ['author', 'categories'],
        sort: { publishedAt: 'desc' },
        limit: 5,
      }
    );
    
    return this.transformResponse(entities);
  },
  
  // Publish article
  async publish(ctx) {
    const { id } = ctx.params;
    
    const entity = await strapi.entityService.update(
      'api::article.article',
      id,
      {
        data: {
          publishedAt: new Date(),
        },
      }
    );
    
    return this.transformResponse(entity);
  },
}));
```

### Custom Services

**src/api/article/services/article.js**
```javascript
const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article.article', ({ strapi }) => ({
  async findBySlug(slug) {
    return await strapi.entityService.findMany('api::article.article', {
      filters: { slug },
      populate: '*',
    });
  },
  
  async incrementViews(id) {
    const article = await strapi.entityService.findOne(
      'api::article.article',
      id
    );
    
    return await strapi.entityService.update(
      'api::article.article',
      id,
      {
        data: {
          views: (article.views || 0) + 1,
        },
      }
    );
  },
}));
```

### Lifecycle Hooks

**src/api/article/content-types/article/lifecycles.js**
```javascript
module.exports = {
  // Before create
  async beforeCreate(event) {
    const { data } = event.params;
    
    // Auto-generate slug
    if (data.title && !data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
  },
  
  // After create
  async afterCreate(event) {
    const { result } = event;
    
    // Send notification
    await strapi.plugins['email'].services.email.send({
      to: 'admin@example.com',
      subject: 'New article created',
      text: `Article "${result.title}" was created`,
    });
  },
  
  // Before update
  async beforeUpdate(event) {
    const { data } = event.params;
    
    // Update modified timestamp
    data.modifiedAt = new Date();
  },
  
  // After delete
  async afterDelete(event) {
    const { result } = event;
    
    // Clean up related data
    console.log(`Article ${result.id} was deleted`);
  },
};
```

### Middleware

**src/middlewares/custom-logger.js**
```javascript
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const start = Date.now();
    
    await next();
    
    const duration = Date.now() - start;
    strapi.log.info(`${ctx.method} ${ctx.url} - ${duration}ms`);
  };
};
```

**config/middlewares.js**
```javascript
module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'global::custom-logger',
    config: {},
  },
];
```

---

## Database Configuration

### Supported Databases

- SQLite (default, development)
- PostgreSQL (recommended for production)
- MySQL/MariaDB
- MongoDB (via mongoose connector)

### PostgreSQL Configuration

**.env**
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false
```

**config/database.js**
```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
    pool: {
      min: 2,
      max: 10,
    },
  },
});
```

### MySQL Configuration

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

---

## Deployment

### Environment Variables

**.env.production**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=randomsalt
ADMIN_JWT_SECRET=randomsecret
JWT_SECRET=randomsecret

DATABASE_CLIENT=postgres
DATABASE_HOST=prod-db.example.com
DATABASE_PORT=5432
DATABASE_NAME=strapi_prod
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=SecurePassword123
DATABASE_SSL=true

NODE_ENV=production
```

### Build for Production

```bash
# Build admin panel
npm run build

# Start production server
NODE_ENV=production npm start
```

### Docker Deployment

**Dockerfile**
```dockerfile
FROM node:18-alpine

# Install dependencies
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app files
COPY . .

# Build admin panel
RUN npm run build

# Expose port
EXPOSE 1337

# Start server
CMD ["npm", "start"]
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  strapi:
    build: .
    ports:
      - '1337:1337'
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: strapi
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: strapi
      NODE_ENV: production
    volumes:
      - ./public/uploads:/app/public/uploads
    depends_on:
      - postgres

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: strapi
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: strapi
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create my-strapi-app

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set APP_KEYS=$(openssl rand -base64 32)
heroku config:set API_TOKEN_SALT=$(openssl rand -base64 32)
heroku config:set ADMIN_JWT_SECRET=$(openssl rand -base64 32)
heroku config:set JWT_SECRET=$(openssl rand -base64 32)

# Deploy
git push heroku main
```

### Deploy to DigitalOcean

```bash
# Build Docker image
docker build -t strapi-app .

# Tag image
docker tag strapi-app registry.digitalocean.com/myregistry/strapi-app

# Push to registry
docker push registry.digitalocean.com/myregistry/strapi-app

# Deploy using App Platform or Kubernetes
```

### Deploy to AWS (EC2)

```bash
# SSH to EC2 instance
ssh -i key.pem ubuntu@ec2-instance

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/username/strapi-app.git
cd strapi-app

# Install dependencies
npm ci

# Build admin panel
npm run build

# Install PM2
sudo npm install -g pm2

# Start with PM2
pm2 start npm --name "strapi" -- start
pm2 save
pm2 startup
```

---

## Best Practices

### 1. Security

```javascript
// Use environment variables
const apiKey = process.env.API_KEY;

// Enable CORS properly
// config/middlewares.js
module.exports = {
  cors: {
    enabled: true,
    origin: ['https://yourdomain.com'],
  },
};

// Rate limiting
// config/middlewares.js
module.exports = {
  rateLimit: {
    enabled: true,
    config: {
      interval: { min: 5 },
      max: 100,
    },
  },
};
```

### 2. Performance

```javascript
// Use database indexes
// In schema.json
{
  "attributes": {
    "slug": {
      "type": "string",
      "unique": true  // Creates index
    }
  }
}

// Implement caching
// Custom controller
const cache = new Map();

async find(ctx) {
  const cacheKey = JSON.stringify(ctx.query);
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const result = await super.find(ctx);
  cache.set(cacheKey, result);
  
  return result;
}
```

### 3. Content Organization

- Use components for reusable structures
- Implement SEO components
- Create meaningful relationships
- Use dynamic zones for flexible content

### 4. API Design

```javascript
// Populate relations selectively
GET /api/articles?populate[0]=author&populate[1]=categories

// Use field selection to reduce payload
GET /api/articles?fields[0]=title&fields[1]=slug

// Implement pagination
GET /api/articles?pagination[page]=1&pagination[pageSize]=25
```

### 5. Testing

```javascript
// Jest test example
const request = require('supertest');

describe('Article API', () => {
  it('should return articles', async () => {
    const response = await request(strapi.server.httpServer)
      .get('/api/articles')
      .expect(200);
      
    expect(response.body.data).toBeDefined();
  });
});
```

---

## Real-World Examples

### 1. Blog Platform

**Content Types:**
- Article (title, content, author, categories)
- Author (name, bio, avatar)
- Category (name, description)

**Features:**
- Draft/publish workflow
- SEO metadata
- Comments system
- Newsletter integration

### 2. E-commerce Backend

**Content Types:**
- Product (name, description, price, images, inventory)
- Category (name, description)
- Order (user, items, total, status)
- Customer (name, email, address)

**Implementation:**

```javascript
// Custom controller for cart
// src/api/cart/controllers/cart.js
module.exports = {
  async addToCart(ctx) {
    const { productId, quantity } = ctx.request.body;
    const userId = ctx.state.user.id;
    
    const cart = await strapi.service('api::cart.cart')
      .addItem(userId, productId, quantity);
    
    return cart;
  },
  
  async checkout(ctx) {
    const userId = ctx.state.user.id;
    
    const order = await strapi.service('api::order.order')
      .createFromCart(userId);
    
    // Process payment
    // Send confirmation email
    
    return order;
  },
};
```

### 3. Mobile App Backend

**Features:**
- User authentication
- Push notifications
- Real-time updates via webhooks
- File uploads

**Push Notification Integration:**

```javascript
// src/api/article/content-types/article/lifecycles.js
const admin = require('firebase-admin');

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    
    // Send push notification
    await admin.messaging().send({
      topic: 'new-articles',
      notification: {
        title: result.title,
        body: result.excerpt,
      },
      data: {
        articleId: String(result.id),
      },
    });
  },
};
```

### 4. Multi-tenant SaaS

**Implementation:**

```javascript
// Custom middleware for tenant isolation
// src/middlewares/tenant.js
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const tenantId = ctx.get('X-Tenant-ID');
    
    if (!tenantId) {
      return ctx.unauthorized('Tenant ID required');
    }
    
    // Add tenant filter to all queries
    ctx.state.tenant = tenantId;
    
    await next();
  };
};

// Service with tenant filtering
async find(params) {
  return await strapi.entityService.findMany('api::article.article', {
    ...params,
    filters: {
      ...params.filters,
      tenant: ctx.state.tenant,
    },
  });
}
```

### 5. News Portal

**Advanced Features:**

```javascript
// Scheduled publishing
// src/api/article/services/scheduler.js
const cron = require('node-cron');

module.exports = {
  init() {
    // Run every minute
    cron.schedule('* * * * *', async () => {
      const now = new Date();
      
      // Find scheduled articles
      const articles = await strapi.entityService.findMany(
        'api::article.article',
        {
          filters: {
            publishedAt: { $null: true },
            scheduledFor: { $lte: now },
          },
        }
      );
      
      // Publish them
      for (const article of articles) {
        await strapi.entityService.update(
          'api::article.article',
          article.id,
          {
            data: {
              publishedAt: now,
            },
          }
        );
      }
    });
  },
};
```

---

## Comparison with Other CMS

### Strapi vs WordPress

| Feature | Strapi | WordPress |
|---------|--------|-----------|
| **Type** | Headless CMS | Traditional CMS |
| **Language** | JavaScript/TypeScript | PHP |
| **Admin** | React-based | PHP-based |
| **API** | RESTful & GraphQL | REST (with plugins) |
| **Customization** | Highly customizable | Plugin-dependent |
| **Learning Curve** | Moderate | Easy |
| **Performance** | High | Moderate |
| **Hosting** | Self-hosted/Cloud | Everywhere |

### Strapi vs Contentful

| Feature | Strapi | Contentful |
|---------|--------|------------|
| **Type** | Open-source | SaaS |
| **Hosting** | Self-hosted | Cloud only |
| **Cost** | Free (hosting costs) | Freemium |
| **Customization** | Full control | Limited |
| **Data Control** | Full ownership | Vendor lock-in |
| **Setup** | Manual | Instant |

### Strapi vs Sanity

| Feature | Strapi | Sanity |
|---------|--------|--------|
| **Content Model** | SQL-based | Graph-based |
| **Real-time** | Via webhooks | Native |
| **Customization** | JavaScript | JavaScript (React) |
| **Pricing** | Free (self-hosted) | Freemium |
| **Admin UI** | Auto-generated | Custom Studio |

### When to Choose Strapi

✅ **Choose Strapi if:**
- You want full control over your backend
- You prefer self-hosting
- You need extensive customization
- You're comfortable with Node.js
- You want to avoid vendor lock-in
- Cost is a concern (no licensing fees)

❌ **Consider alternatives if:**
- You need instant setup without infrastructure management
- You prefer managed services
- You don't have DevOps resources
- You need enterprise support guarantees

---

## Resources

### Official Documentation
- **Website:** https://strapi.io
- **Documentation:** https://docs.strapi.io
- **GitHub:** https://github.com/strapi/strapi
- **Community Forum:** https://forum.strapi.io

### Learning Resources
- **Strapi Blog:** https://strapi.io/blog
- **YouTube Channel:** https://www.youtube.com/c/Strapi
- **Tutorials:** https://strapi.io/tutorials

### Plugins & Integrations
- **Market:** https://market.strapi.io
- **Awesome Strapi:** https://github.com/strapi/awesome-strapi

### Community
- **Discord:** https://discord.strapi.io
- **Twitter:** @strapijs
- **StackOverflow:** [strapi] tag

---

## Conclusion

Strapi is a powerful, flexible headless CMS that gives developers complete control over their content infrastructure. With its modern architecture, extensive customization options, and active community, it's an excellent choice for projects ranging from simple blogs to complex enterprise applications.

**Key Takeaways:**
- 🚀 Fast API development with auto-generation
- 🎨 Beautiful, customizable admin panel
- 🔧 Highly extensible plugin system
- 🔒 Robust authentication and permissions
- 📦 Self-hosted with full data ownership
- 🌐 Works with any frontend framework

Start building your next project with Strapi and experience the power of modern headless CMS architecture!
