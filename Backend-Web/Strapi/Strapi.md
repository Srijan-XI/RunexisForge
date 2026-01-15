# Strapi

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Content Types](#content-types)
5. [API Access](#api-access)
6. [Plugins](#plugins)
7. [Deployment](#deployment)
8. [Best Practices](#best-practices)
9. [Resources](#resources)

---

## Introduction

Strapi is a leading open-source headless CMS that enables developers to build APIs quickly and manage content independently of presentation.

### Key Features
- **Headless**: Content via APIs, not tied to presentation
- **No-code**: Admin panel for content management
- **Customizable**: Build custom content types
- **RESTful & GraphQL**: Multiple API options
- **Plugins**: Extend functionality
- **Webhooks**: Trigger events
- **Permissions**: Role-based access control
- **Multi-database**: MySQL, PostgreSQL, SQLite, MongoDB

### Why Strapi?
- Fastest way to build APIs
- Great for content-heavy sites
- Decoupled content from frontend
- Excellent developer experience
- Strong community
- Self-hosted option available

---

## Installation

### Quick Start
```bash
# Using Strapi CLI
npm create strapi-app@latest my-project -- --quickstart

# Or with database
npm create strapi-app@latest my-project -- --template=postgres
```

### Manual Setup
```bash
mkdir my-strapi-project
cd my-strapi-project
npm init -y
npm install @strapi/strapi
npm run develop
```

Access admin panel: `http://localhost:1337/admin`

---

## Getting Started

### Create First Content Type
1. Go to Admin Panel
2. Click "Content-type Builder"
3. Create new content type (e.g., "Article")
4. Add fields:
   - `title` (String, required)
   - `slug` (UID, from title)
   - `content` (Rich text)
   - `author` (String)
   - `publishedAt` (Date)

### Create Entry
1. Go to "Articles" collection
2. Click "Create new entry"
3. Fill in fields
4. Click "Save" and "Publish"

### Access via API
```bash
curl http://localhost:1337/api/articles
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Hello Strapi",
        "slug": "hello-strapi",
        "content": "...",
        "publishedAt": "2024-01-15T10:00:00.000Z"
      }
    }
  ]
}
```

---

## Content Types

### Create Content Type
```bash
# Via CLI
strapi generate
# Then select content-type
```

### Field Types Available
- String, Text, Rich Text
- Number, Integer, Float, Decimal
- Boolean
- Date, DateTime, Time
- Email, Phone
- JSON
- Enumeration
- Relations (Many-to-one, One-to-many, Many-to-many)
- Media (Images, Files)

### Example: Blog Post with Relations
```
BlogPost
├── title (String, required)
├── content (Rich text)
├── author (Relation → Author)
├── category (Relation → Category)
├── tags (Relation → Tag, many-to-many)
├── featured (Boolean)
├── publishedAt (DateTime)
└── createdAt (Timestamp)
```

---

## API Access

### REST API
```bash
# Get all articles
GET http://localhost:1337/api/articles

# Get single article
GET http://localhost:1337/api/articles/1

# Create article
POST http://localhost:1337/api/articles
Content-Type: application/json

{
  "data": {
    "title": "New Article",
    "slug": "new-article",
    "content": "..."
  }
}

# Update article
PUT http://localhost:1337/api/articles/1
Content-Type: application/json

{
  "data": {
    "title": "Updated Title"
  }
}

# Delete article
DELETE http://localhost:1337/api/articles/1
```

### Query Parameters
```bash
# Pagination
GET /api/articles?pagination[page]=1&pagination[pageSize]=10

# Sorting
GET /api/articles?sort[0]=createdAt:desc

# Filtering
GET /api/articles?filters[featured][$eq]=true

# Population (Relations)
GET /api/articles?populate=*

# Fields selection
GET /api/articles?fields[0]=title&fields[1]=slug
```

### GraphQL API
```bash
POST http://localhost:1337/graphql

query {
  articles {
    data {
      id
      attributes {
        title
        slug
        content
        author {
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
```

---

## Plugins

### Using Plugins
```bash
# Install plugin
npm install @strapi/plugin-seo

# Verify in admin panel
```

### Popular Plugins
- **SEO**: SEO optimization
- **Documentation**: Generate API docs
- **Search**: Full-text search
- **Email**: Email notifications
- **Backup**: Automated backups
- **Import/Export**: Data migration

### Create Custom Plugin
```bash
strapi generate
# Select plugin
```

---

## Deployment

### Heroku
```bash
# Create Procfile
echo "release: npm run build && npm run migrate" > Procfile
echo "web: npm run start" >> Procfile

# Deploy
git push heroku main
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 1337

CMD ["npm", "start"]
```

### Railway, Render, etc.
Most modern platforms have one-click Strapi deployment

---

## Best Practices

### 1. Security
```bash
# Set strong JWT secret
ADMIN_JWT_SECRET=your-strong-secret
API_TOKEN_SALT=your-salt
```

### 2. Permissions
- Use Roles and Permissions in Admin
- Create API tokens for external apps
- Restrict public access as needed

### 3. Content Strategy
- Plan content types before creation
- Use consistent naming conventions
- Document your schema
- Version your API endpoints

### 4. Database
```bash
# Use production database
DATABASE_FILENAME=./data/strapi.db

# Or PostgreSQL
DATABASE_URL=postgresql://user:pass@host:5432/strapi
```

---

## Resources

### Official
- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Community](https://strapi.io/discord)

### Tutorials
- [YouTube Channel](https://www.youtube.com/strapi)
- [Community Projects](https://strapi.io/ecosystem)

---

## Summary

Strapi is the perfect solution for headless CMS needs.

✅ Fast API generation  
✅ Powerful admin panel  
✅ Flexible content modeling  
✅ Multiple API types  
✅ Easy deployment  
✅ Strong community  

**Ideal for content-driven applications and decoupled architectures!**

