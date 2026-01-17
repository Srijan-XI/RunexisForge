# Payload CMS - TypeScript-First Headless CMS

## Table of Contents
- [Introduction](#introduction)
- [Why Payload?](#why-payload)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Collections & Globals](#collections--globals)
- [Field Types](#field-types)
- [Access Control](#access-control)
- [Hooks & Lifecycle](#hooks--lifecycle)
- [Authentication](#authentication)
- [Admin Panel](#admin-panel)
- [GraphQL & REST APIs](#graphql--rest-apis)
- [File Uploads](#file-uploads)
- [Localization](#localization)
- [Plugins](#plugins)
- [Deployment](#deployment)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Comparison with Other CMS](#comparison-with-other-cms)

---

## Introduction

**Payload CMS** is a modern, code-first headless CMS and application framework built with TypeScript, React, and Node.js. It's designed for developers who want a powerful CMS with full type safety and complete control over their data and APIs.

### Key Features
- **TypeScript-First** - Full type safety across frontend and backend
- **Code-First Configuration** - Define your CMS in code, not GUI
- **Local API** - Direct database access in your app
- **Auto-Generated APIs** - REST and GraphQL endpoints
- **Built-in Authentication** - JWT-based auth out of the box
- **Rich Admin Panel** - React-based customizable UI
- **Block-Based Content** - Flexible page builder
- **Granular Access Control** - Field and document-level permissions
- **Hooks & Plugins** - Extensible architecture
- **No Vendor Lock-in** - Own your data and code

### Architecture
```
┌─────────────────────┐
│   Admin Panel       │ ← React UI (customizable)
│   (React)           │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   Payload Core      │ ← TypeScript/Express
│   (Node.js)         │
│   ├── REST API      │
│   ├── GraphQL API   │
│   └── Local API     │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   Database          │ ← MongoDB or Postgres
│   (MongoDB/Postgres)│
└─────────────────────┘
```

---

## Why Payload?

### Advantages

✅ **Developer Experience**
- TypeScript types auto-generated from config
- IntelliSense and autocomplete everywhere
- Local API for server-side operations
- Hot reload in development

✅ **Flexibility**
- Code-first approach
- Complete customization possible
- No limitations on data modeling
- Extend with your own code

✅ **Modern Stack**
- Built with latest web technologies
- React for admin panel
- Express for API
- MongoDB or Postgres for data

✅ **Performance**
- Efficient database queries
- Server-side rendering support
- Optimized admin panel
- Built-in caching strategies

✅ **Content Management**
- Intuitive admin interface
- Block-based content editor
- Media library
- Draft/publish workflow

### Use Cases

- **Enterprise Websites** - Complex content structures
- **E-commerce** - Product catalogs and shopping carts
- **SaaS Applications** - User dashboards and data management
- **Mobile Backends** - API for iOS/Android apps
- **Multi-tenant Systems** - Isolated client data
- **Documentation Sites** - Technical content management
- **Headless WordPress Replacement** - Modern alternative

---

## Installation & Setup

### Prerequisites

```bash
# Node.js 14+ required
node --version

# MongoDB or PostgreSQL
# MongoDB: 4.4+
# PostgreSQL: 14+
```

### Quick Start

```bash
# Using npx (recommended)
npx create-payload-app@latest

# Follow prompts:
# - Project name
# - Database (MongoDB/Postgres)
# - Template (blank/website/e-commerce)

# Navigate to project
cd my-payload-app

# Start dev server
npm run dev

# Admin panel: http://localhost:3000/admin
```

### Manual Installation

```bash
# Create project
mkdir my-payload-app
cd my-payload-app
npm init -y

# Install Payload
npm install payload express dotenv

# Install TypeScript
npm install -D typescript @types/express @types/node

# Initialize TypeScript
npx tsc --init
```

### Project Structure

```
my-payload-app/
├── src/
│   ├── collections/          # Collection configs
│   │   ├── Users.ts
│   │   ├── Pages.ts
│   │   └── Media.ts
│   ├── globals/              # Global configs
│   │   └── Settings.ts
│   ├── payload.config.ts     # Main config
│   └── server.ts            # Express server
├── build/                    # Build output
├── media/                    # Uploaded files
├── .env                      # Environment variables
├── tsconfig.json
└── package.json
```

### Configuration

**src/payload.config.ts**
```typescript
import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Pages from './collections/Pages';
import Media from './collections/Media';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Pages,
    Media,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: {
    // MongoDB
    url: process.env.DATABASE_URI || 'mongodb://localhost/payload',
    
    // Or PostgreSQL
    // adapter: postgres({
    //   pool: {
    //     connectionString: process.env.DATABASE_URI,
    //   },
    // }),
  },
});
```

**src/server.ts**
```typescript
import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_KEY',
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

// Add your own express routes here

app.listen(3000, async () => {
  console.log('Server is running on http://localhost:3000');
});
```

**.env**
```env
DATABASE_URI=mongodb://localhost/payload
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```

### Starting the Server

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run serve
```

---

## Core Concepts

### 1. Collections

Collections are data structures (like database tables) that hold multiple documents.

Examples: Users, Posts, Products, Orders

### 2. Globals

Globals are single documents for site-wide settings.

Examples: Site Settings, Navigation, Footer

### 3. Fields

Fields define the structure of your data with specific types and validation.

### 4. Hooks

Lifecycle functions that run before/after operations.

### 5. Access Control

Functions that determine who can read/write data.

### 6. Local API

Direct database access for server-side operations.

---

## Collections & Globals

### Creating a Collection

**src/collections/Posts.ts**
```typescript
import { CollectionConfig } from 'payload/types';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 400,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
};

export default Posts;
```

### Creating a Global

**src/globals/Settings.ts**
```typescript
import { GlobalConfig } from 'payload/types';

const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Configuration',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'siteDescription',
      type: 'textarea',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
      ],
    },
    {
      name: 'mainNav',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};

export default Settings;
```

---

## Field Types

### Basic Fields

```typescript
// Text
{
  name: 'title',
  type: 'text',
  required: true,
  minLength: 3,
  maxLength: 100,
}

// Textarea
{
  name: 'description',
  type: 'textarea',
  required: false,
}

// Email
{
  name: 'email',
  type: 'email',
  required: true,
}

// Number
{
  name: 'price',
  type: 'number',
  min: 0,
  max: 999999,
  required: true,
}

// Checkbox
{
  name: 'featured',
  type: 'checkbox',
  defaultValue: false,
}

// Date
{
  name: 'publishDate',
  type: 'date',
  admin: {
    date: {
      pickerAppearance: 'dayAndTime',
    },
  },
}

// Select
{
  name: 'status',
  type: 'select',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
    { label: 'Archived', value: 'archived' },
  ],
  defaultValue: 'draft',
}

// Radio
{
  name: 'layout',
  type: 'radio',
  options: [
    { label: 'Full Width', value: 'full' },
    { label: 'Sidebar', value: 'sidebar' },
  ],
  defaultValue: 'full',
}
```

### Advanced Fields

```typescript
// Rich Text
{
  name: 'content',
  type: 'richText',
  admin: {
    elements: [
      'h2',
      'h3',
      'link',
      'ul',
      'ol',
      'upload',
    ],
  },
}

// Code
{
  name: 'customCSS',
  type: 'code',
  admin: {
    language: 'css',
  },
}

// JSON
{
  name: 'metadata',
  type: 'json',
}

// Array
{
  name: 'features',
  type: 'array',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

// Group
{
  name: 'seo',
  type: 'group',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 60,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
    },
    {
      name: 'metaImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

// Blocks (flexible content)
{
  name: 'layout',
  type: 'blocks',
  blocks: [
    {
      slug: 'hero',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      slug: 'content',
      fields: [
        {
          name: 'richText',
          type: 'richText',
        },
      ],
    },
  ],
}

// Tabs
{
  name: 'tabs',
  type: 'tabs',
  tabs: [
    {
      label: 'Content',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
      ],
    },
    {
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
      ],
    },
  ],
}
```

### Relationship Fields

```typescript
// Many-to-One
{
  name: 'author',
  type: 'relationship',
  relationTo: 'users',
  required: true,
}

// One-to-Many / Many-to-Many
{
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
  hasMany: true,
}

// Polymorphic
{
  name: 'relatedContent',
  type: 'relationship',
  relationTo: ['posts', 'pages'],
  hasMany: true,
}
```

### Upload Fields

```typescript
{
  name: 'featuredImage',
  type: 'upload',
  relationTo: 'media',
  required: false,
  filterOptions: {
    mimeType: { contains: 'image' },
  },
}
```

---

## Access Control

### Collection Access Control

```typescript
import { CollectionConfig } from 'payload/types';

const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    // Who can read documents
    read: ({ req: { user } }) => {
      // Public can read published posts
      if (!user) {
        return {
          status: { equals: 'published' },
        };
      }
      
      // Admins can read everything
      if (user.role === 'admin') {
        return true;
      }
      
      // Authors can read their own posts
      return {
        author: { equals: user.id },
      };
    },
    
    // Who can create documents
    create: ({ req: { user } }) => {
      // Must be logged in
      return Boolean(user);
    },
    
    // Who can update documents
    update: ({ req: { user } }) => {
      if (!user) return false;
      
      // Admins can update everything
      if (user.role === 'admin') return true;
      
      // Authors can update their own posts
      return {
        author: { equals: user.id },
      };
    },
    
    // Who can delete documents
    delete: ({ req: { user } }) => {
      if (!user) return false;
      
      // Only admins can delete
      return user.role === 'admin';
    },
  },
  fields: [
    // ... fields
  ],
};
```

### Field-Level Access Control

```typescript
{
  name: 'internalNotes',
  type: 'textarea',
  access: {
    read: ({ req: { user } }) => {
      // Only admins can read internal notes
      return user?.role === 'admin';
    },
    update: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
  },
}
```

### Dynamic Access Control

```typescript
{
  name: 'publishedDate',
  type: 'date',
  access: {
    update: ({ req: { user }, doc }) => {
      // Published posts can't change publish date
      if (doc?.status === 'published') {
        return user?.role === 'admin';
      }
      return true;
    },
  },
}
```

---

## Hooks & Lifecycle

### Collection Hooks

```typescript
import { CollectionConfig } from 'payload/types';

const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    // Before validate
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === 'create') {
          console.log('About to validate new post');
        }
        return data;
      },
    ],
    
    // Before change (create/update)
    beforeChange: [
      async ({ data, req, operation }) => {
        // Auto-set author on create
        if (operation === 'create' && req.user) {
          data.author = req.user.id;
        }
        
        // Generate slug from title
        if (data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        }
        
        return data;
      },
    ],
    
    // After change
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Send notification on publish
        if (
          operation === 'update' &&
          doc.status === 'published' &&
          previousDoc.status === 'draft'
        ) {
          // Send email notification
          await sendPublishNotification(doc);
        }
      },
    ],
    
    // Before read
    beforeRead: [
      ({ doc, req }) => {
        // Increment view count
        if (!req.user) {
          // Track anonymous views
        }
        return doc;
      },
    ],
    
    // After read
    afterRead: [
      ({ doc, req }) => {
        // Modify document before returning
        if (req.user?.role !== 'admin') {
          delete doc.internalNotes;
        }
        return doc;
      },
    ],
    
    // Before delete
    beforeDelete: [
      async ({ req, id }) => {
        // Clean up related data
        await cleanupRelatedData(id);
      },
    ],
    
    // After delete
    afterDelete: [
      async ({ doc }) => {
        console.log(`Post ${doc.id} was deleted`);
      },
    ],
  },
  fields: [
    // ... fields
  ],
};
```

### Field Hooks

```typescript
{
  name: 'slug',
  type: 'text',
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        // Auto-generate from title if not provided
        if (!value && data.title) {
          return data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-');
        }
        return value;
      },
    ],
  },
}
```

### Global Hooks

**src/payload.config.ts**
```typescript
import { buildConfig } from 'payload/config';

export default buildConfig({
  // ... other config
  hooks: {
    afterError: (err) => {
      // Log all errors
      console.error('Payload error:', err);
    },
  },
});
```

---

## Authentication

### User Collection

**src/collections/Users.ts**
```typescript
import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Enable authentication
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => {
      // Users can update themselves
      if (user) {
        return {
          id: { equals: user.id },
        };
      }
      return false;
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      access: {
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
};

export default Users;
```

### Authentication Operations

```typescript
// Login
const result = await payload.login({
  collection: 'users',
  data: {
    email: 'user@example.com',
    password: 'password123',
  },
});

// Response: { token, user, exp }

// Logout
await payload.logout({
  collection: 'users',
  req,
  res,
});

// Forgot password
await payload.forgotPassword({
  collection: 'users',
  data: {
    email: 'user@example.com',
  },
});

// Reset password
await payload.resetPassword({
  collection: 'users',
  data: {
    token: 'reset-token',
    password: 'newPassword123',
  },
});

// Verify email
await payload.verifyEmail({
  collection: 'users',
  token: 'verification-token',
});
```

### Custom Authentication Strategy

```typescript
const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: true, // Require email verification
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
    useAPIKey: true, // Enable API keys
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  },
  // ... rest of config
};
```

---

## Admin Panel

### Customization

**src/payload.config.ts**
```typescript
import { buildConfig } from 'payload/config';

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- My CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
    css: path.resolve(__dirname, 'custom.css'),
    components: {
      // Custom components
      beforeDashboard: [
        '/components/BeforeDashboard',
      ],
      afterNavLinks: [
        '/components/CustomNavLink',
      ],
    },
  },
  // ... rest of config
});
```

### Custom Components

**components/BeforeDashboard.tsx**
```tsx
import React from 'react';

const BeforeDashboard: React.FC = () => {
  return (
    <div className="custom-dashboard-widget">
      <h2>Welcome to Your CMS</h2>
      <p>Quick stats and analytics here</p>
    </div>
  );
};

export default BeforeDashboard;
```

### Custom Views

```typescript
{
  slug: 'posts',
  admin: {
    components: {
      views: {
        Edit: {
          Default: {
            Component: '/components/CustomEditView',
            actions: [
              '/components/PublishButton',
            ],
          },
        },
      },
    },
  },
}
```

### Admin Groups

```typescript
const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Content', // Group in sidebar
  },
  // ... rest of config
};

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'E-commerce',
  },
  // ... rest of config
};
```

---

## GraphQL & REST APIs

### REST API

```bash
# Get all documents
GET /api/posts

# Get single document
GET /api/posts/:id

# Create document
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Post",
  "content": "Content here",
  "status": "draft"
}

# Update document
PATCH /api/posts/:id
Authorization: Bearer <token>

{
  "status": "published"
}

# Delete document
DELETE /api/posts/:id
Authorization: Bearer <token>
```

### Query Parameters

```bash
# Where (filtering)
GET /api/posts?where[status][equals]=published
GET /api/posts?where[author][equals]=123
GET /api/posts?where[views][greater_than]=100

# Depth (populate relationships)
GET /api/posts?depth=2

# Limit
GET /api/posts?limit=10

# Page
GET /api/posts?page=2&limit=10

# Sort
GET /api/posts?sort=-createdAt
GET /api/posts?sort=title

# Select fields
GET /api/posts?select=title,slug,author
```

### GraphQL API

```graphql
# Query all posts
query {
  Posts {
    docs {
      id
      title
      content
      author {
        name
        email
      }
      categories {
        name
      }
    }
    totalDocs
    limit
    page
  }
}

# Query single post
query {
  Post(id: "123") {
    title
    content
    status
  }
}

# Create post
mutation {
  createPost(data: {
    title: "New Post"
    content: "Content here"
    status: draft
  }) {
    id
    title
  }
}

# Update post
mutation {
  updatePost(id: "123", data: {
    status: published
  }) {
    id
    status
  }
}

# Delete post
mutation {
  deletePost(id: "123") {
    id
  }
}
```

### Local API

```typescript
// In your server-side code
import payload from 'payload';

// Find documents
const posts = await payload.find({
  collection: 'posts',
  where: {
    status: {
      equals: 'published',
    },
  },
  limit: 10,
  sort: '-createdAt',
});

// Find by ID
const post = await payload.findByID({
  collection: 'posts',
  id: '123',
  depth: 2, // Populate relationships
});

// Create document
const newPost = await payload.create({
  collection: 'posts',
  data: {
    title: 'New Post',
    content: 'Content here',
    status: 'draft',
    author: req.user.id,
  },
});

// Update document
const updated = await payload.update({
  collection: 'posts',
  id: '123',
  data: {
    status: 'published',
  },
});

// Delete document
await payload.delete({
  collection: 'posts',
  id: '123',
});

// Find global
const settings = await payload.findGlobal({
  slug: 'settings',
});

// Update global
await payload.updateGlobal({
  slug: 'settings',
  data: {
    siteName: 'My Site',
  },
});
```

---

## File Uploads

### Media Collection

**src/collections/Media.ts**
```typescript
import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
};

export default Media;
```

### Cloud Storage (S3)

```bash
npm install @payloadcms/plugin-cloud-storage
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage
```

**src/payload.config.ts**
```typescript
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';

export default buildConfig({
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: s3Adapter({
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
              region: process.env.S3_REGION,
            },
            bucket: process.env.S3_BUCKET,
          }),
        },
      },
    }),
  ],
  // ... rest of config
});
```

---

## Localization

### Enable Localization

**src/payload.config.ts**
```typescript
export default buildConfig({
  localization: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
    fallback: true,
  },
  // ... rest of config
});
```

### Localized Fields

```typescript
{
  name: 'title',
  type: 'text',
  required: true,
  localized: true, // This field is localized
}

{
  name: 'content',
  type: 'richText',
  localized: true,
}
```

### Querying Localized Content

```bash
# REST API
GET /api/posts?locale=es
GET /api/posts?locale=all

# All locales in response
GET /api/posts/123?locale=all
```

```graphql
# GraphQL
query {
  Posts(locale: es) {
    docs {
      title
      content
    }
  }
}
```

```typescript
// Local API
const posts = await payload.find({
  collection: 'posts',
  locale: 'es',
});

// All locales
const post = await payload.findByID({
  collection: 'posts',
  id: '123',
  locale: 'all',
});
```

---

## Plugins

### Official Plugins

```bash
# Cloud Storage
npm install @payloadcms/plugin-cloud-storage

# SEO
npm install @payloadcms/plugin-seo

# Redirects
npm install @payloadcms/plugin-redirects

# Nested Docs
npm install @payloadcms/plugin-nested-docs

# Form Builder
npm install @payloadcms/plugin-form-builder
```

### Using Plugins

**src/payload.config.ts**
```typescript
import { seo } from '@payloadcms/plugin-seo';
import { nestedDocs } from '@payloadcms/plugin-nested-docs';

export default buildConfig({
  plugins: [
    seo({
      collections: ['posts', 'pages'],
      uploadsCollection: 'media',
    }),
    nestedDocs({
      collections: ['categories'],
    }),
  ],
  // ... rest of config
});
```

### Custom Plugin

**plugins/analytics.ts**
```typescript
import { Config, Plugin } from 'payload/config';

export const analyticsPlugin = (): Plugin => (config: Config): Config => {
  return {
    ...config,
    collections: config.collections?.map((collection) => {
      return {
        ...collection,
        hooks: {
          ...collection.hooks,
          afterChange: [
            ...(collection.hooks?.afterChange || []),
            async ({ doc, operation }) => {
              // Track analytics
              if (operation === 'create') {
                await trackEvent('document_created', {
                  collection: collection.slug,
                  id: doc.id,
                });
              }
            },
          ],
        },
      };
    }),
  };
};
```

---

## Deployment

### Environment Variables

**.env.production**
```env
# Server
PAYLOAD_SECRET=your-production-secret
PAYLOAD_PUBLIC_SERVER_URL=https://api.yourdomain.com

# Database
DATABASE_URI=mongodb+srv://user:pass@cluster.mongodb.net/prod

# Or PostgreSQL
# DATABASE_URI=postgresql://user:pass@host:5432/dbname

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key

# Storage
S3_ACCESS_KEY_ID=your-key
S3_SECRET_ACCESS_KEY=your-secret
S3_REGION=us-east-1
S3_BUCKET=your-bucket

# Node
NODE_ENV=production
```

### Build for Production

```bash
# Build
npm run build

# Start production server
npm run serve
```

### Docker Deployment

**Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source
COPY . .

# Build
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  payload:
    build: .
    ports:
      - '3000:3000'
    environment:
      PAYLOAD_SECRET: ${PAYLOAD_SECRET}
      DATABASE_URI: mongodb://mongo:27017/payload
      NODE_ENV: production
    depends_on:
      - mongo
    volumes:
      - ./media:/app/media

  mongo:
    image: mongo:6
    volumes:
      - mongo-data:/data/db
    ports:
      - '27017:27017'

volumes:
  mongo-data:
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "build/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/build/server.js"
    }
  ]
}
```

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

---

## Best Practices

### 1. Type Safety

```typescript
// Use generated types
import { Post } from '../payload-types';

// Type-safe queries
const posts = await payload.find<Post>({
  collection: 'posts',
  where: {
    status: { equals: 'published' },
  },
});

// TypeScript knows the shape
posts.docs.forEach((post) => {
  console.log(post.title); // Type-safe
});
```

### 2. Access Control

```typescript
// Use functions for dynamic access
access: {
  read: ({ req: { user } }) => {
    // Dynamic logic
    return user?.role === 'admin' || {
      status: { equals: 'published' },
    };
  },
}

// Field-level restrictions
{
  name: 'adminOnly',
  type: 'text',
  access: {
    read: ({ req: { user } }) => user?.role === 'admin',
  },
}
```

### 3. Hooks for Logic

```typescript
// Use hooks instead of middleware
hooks: {
  beforeChange: [
    async ({ data, req }) => {
      // Business logic here
      if (data.status === 'published' && !data.publishedAt) {
        data.publishedAt = new Date().toISOString();
      }
      return data;
    },
  ],
}
```

### 4. Validation

```typescript
{
  name: 'email',
  type: 'email',
  required: true,
  validate: (value) => {
    // Custom validation
    if (!value.includes('@company.com')) {
      return 'Must be a company email';
    }
    return true;
  },
}
```

### 5. Performance

```typescript
// Use depth wisely
const posts = await payload.find({
  collection: 'posts',
  depth: 1, // Only populate one level
  limit: 10,
});

// Select specific fields
const posts = await payload.find({
  collection: 'posts',
  select: {
    title: true,
    slug: true,
    author: true,
  },
});
```

---

## Real-World Examples

### 1. Blog Platform

**Complete Implementation:**

```typescript
// Collections/Posts.ts
const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true;
      return { status: { equals: 'published' } };
    },
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create') {
          data.author = req.user.id;
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
  ],
  versions: {
    drafts: true,
  },
};
```

### 2. E-commerce

**Products Collection:**

```typescript
const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'salePrice',
      type: 'number',
      min: 0,
    },
    {
      name: 'inventory',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'variants',
      type: 'array',
      fields: [
        {
          name: 'size',
          type: 'select',
          options: ['S', 'M', 'L', 'XL'],
        },
        {
          name: 'color',
          type: 'text',
        },
        {
          name: 'sku',
          type: 'text',
          required: true,
        },
        {
          name: 'inventory',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
};
```

### 3. Multi-tenant SaaS

```typescript
// Add tenant field to collections
const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false;
      return {
        tenant: { equals: user.tenant.id },
      };
    },
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (req.user) {
          data.tenant = req.user.tenant.id;
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      access: {
        update: () => false, // Can't change tenant
      },
    },
    // ... other fields
  ],
};
```

---

## Comparison with Other CMS

### Payload vs Strapi

| Feature | Payload | Strapi |
|---------|---------|--------|
| **Language** | TypeScript | JavaScript/TypeScript |
| **Configuration** | Code-first | GUI + code |
| **Type Safety** | Full TypeScript | Partial |
| **Local API** | Yes | No (ORM only) |
| **Database** | MongoDB, Postgres | Multiple SQL |
| **Admin Panel** | React (customizable) | React |
| **Learning Curve** | Moderate | Easy |

### Payload vs Contentful

| Feature | Payload | Contentful |
|---------|---------|------------|
| **Hosting** | Self-hosted | SaaS |
| **Cost** | Free (infra) | Freemium |
| **Flexibility** | Unlimited | Limited |
| **Data Ownership** | Full | Vendor |
| **Customization** | Complete | Limited |

### When to Choose Payload

✅ **Choose Payload if:**
- You want full TypeScript type safety
- Code-first approach is preferred
- You need complete control and customization
- Local API is important for your architecture
- You're building complex applications
- Self-hosting is acceptable

❌ **Consider alternatives if:**
- You prefer GUI-based configuration
- You need managed hosting
- Quick setup is critical
- Team prefers no-code solutions

---

## Resources

### Official
- **Website:** https://payloadcms.com
- **Documentation:** https://payloadcms.com/docs
- **GitHub:** https://github.com/payloadcms/payload
- **Discord:** https://discord.com/invite/payload

### Learning
- **Examples:** https://github.com/payloadcms/payload/tree/main/examples
- **Blog:** https://payloadcms.com/blog
- **YouTube:** Official tutorials

### Community
- **Discord Community:** Active support
- **GitHub Discussions:** Feature requests and Q&A

---

## Conclusion

Payload CMS combines the best of modern web development with powerful content management capabilities. Its TypeScript-first approach, code-based configuration, and flexible architecture make it ideal for developers who want complete control over their CMS while maintaining excellent developer experience.

**Key Takeaways:**
- 🎯 TypeScript-first with full type safety
- 🚀 Code-based configuration
- 🔧 Highly customizable and extensible
- 🔒 Granular access control
- 📦 Local API for server-side operations
- ⚡ Auto-generated REST & GraphQL APIs
- 🎨 Customizable React admin panel

Perfect for modern applications that demand flexibility, type safety, and developer control!
