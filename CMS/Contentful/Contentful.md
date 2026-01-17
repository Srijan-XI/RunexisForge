# Contentful

## Overview
Contentful is a headless CMS that provides a content infrastructure for digital products. It's API-first, cloud-based, and designed for modern development workflows. Contentful separates content from presentation, allowing you to deliver content to any platform or device via powerful APIs.

**Key Features:**
- API-first architecture
- Content modeling with custom content types
- Multi-language support
- Rich text editing
- Media management with powerful DAM
- RESTful and GraphQL APIs
- Webhooks for real-time updates
- Content versioning and publishing workflow
- Role-based access control
- CDN-powered delivery

**Use Cases:**
- Websites and web applications
- Mobile apps (iOS, Android)
- Digital experiences across multiple channels
- E-commerce product catalogs
- Marketing campaign content
- Documentation sites
- Omnichannel content delivery

## Getting Started

### Create Account

1. Sign up at [https://www.contentful.com/sign-up/](https://www.contentful.com/sign-up/)
2. Create a new space (your content repository)
3. Get your API keys from Settings → API keys

### Installation

```bash
# Install Contentful CLI
npm install -g contentful-cli

# Login
contentful login

# Install SDK for your platform
npm install contentful
npm install contentful-management  # For content management
```

## Content Modeling

### Creating Content Types

Content types define the structure of your content.

**Example: Blog Post Content Type**

```javascript
// Via Web UI: Content model → Add content type

{
  "name": "Blog Post",
  "displayField": "title",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Symbol",
      "required": true,
      "validations": [
        { "size": { "min": 1, "max": 200 } }
      ]
    },
    {
      "id": "slug",
      "name": "Slug",
      "type": "Symbol",
      "required": true,
      "validations": [
        { "unique": true },
        { "regexp": { "pattern": "^[a-z0-9-]+$" } }
      ]
    },
    {
      "id": "excerpt",
      "name": "Excerpt",
      "type": "Text",
      "validations": [
        { "size": { "max": 500 } }
      ]
    },
    {
      "id": "body",
      "name": "Body",
      "type": "RichText",
      "required": true
    },
    {
      "id": "featuredImage",
      "name": "Featured Image",
      "type": "Link",
      "linkType": "Asset"
    },
    {
      "id": "author",
      "name": "Author",
      "type": "Link",
      "linkType": "Entry"
    },
    {
      "id": "categories",
      "name": "Categories",
      "type": "Array",
      "items": {
        "type": "Link",
        "linkType": "Entry"
      }
    },
    {
      "id": "publishDate",
      "name": "Publish Date",
      "type": "Date"
    },
    {
      "id": "featured",
      "name": "Featured",
      "type": "Boolean"
    }
  ]
}
```

### Programmatic Content Type Creation

```javascript
const contentful = require('contentful-management');

const client = contentful.createClient({
  accessToken: 'YOUR_MANAGEMENT_TOKEN'
});

async function createContentType() {
  const space = await client.getSpace('SPACE_ID');
  const environment = await space.getEnvironment('master');

  const contentType = await environment.createContentTypeWithId('blogPost', {
    name: 'Blog Post',
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        validations: [{ unique: true }]
      },
      {
        id: 'body',
        name: 'Body',
        type: 'RichText',
        required: true
      },
      {
        id: 'author',
        name: 'Author',
        type: 'Link',
        linkType: 'Entry',
        validations: [
          { linkContentType: ['author'] }
        ]
      }
    ]
  });

  await contentType.publish();
  console.log('Content type created and published');
}

createContentType();
```

## Content Delivery API

### JavaScript/Node.js SDK

```javascript
const contentful = require('contentful');

// Initialize client
const client = contentful.createClient({
  space: 'YOUR_SPACE_ID',
  accessToken: 'YOUR_DELIVERY_TOKEN'
});

// Get all entries
async function getAllEntries() {
  const entries = await client.getEntries();
  console.log(entries.items);
}

// Get entries by content type
async function getBlogPosts() {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: '-sys.createdAt',
    limit: 10
  });
  return entries.items;
}

// Get single entry
async function getPost(entryId) {
  const entry = await client.getEntry(entryId);
  return entry;
}

// Get entry by field
async function getPostBySlug(slug) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1
  });
  return entries.items[0];
}

// Search and filter
async function searchPosts(query) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    query: query  // Full-text search
  });
  return entries.items;
}

// Get with includes (resolve references)
async function getPostWithAuthor(entryId) {
  const entry = await client.getEntry(entryId, {
    include: 2  // Depth of reference resolution
  });
  return entry;
}

// Get assets
async function getAssets() {
  const assets = await client.getAssets();
  return assets.items;
}

// Get specific asset
async function getAsset(assetId) {
  const asset = await client.getAsset(assetId);
  return asset;
}

// Pagination
async function getPaginatedPosts(skip = 0, limit = 10) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    skip: skip,
    limit: limit
  });
  return {
    items: entries.items,
    total: entries.total,
    skip: entries.skip,
    limit: entries.limit
  };
}

// Filtering
async function getFilteredPosts() {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.featured': true,
    'fields.publishDate[gte]': '2024-01-01',
    select: 'fields.title,fields.slug,fields.excerpt'
  });
  return entries.items;
}
```

### REST API

```bash
# Get all entries
curl "https://cdn.contentful.com/spaces/SPACE_ID/environments/master/entries?access_token=DELIVERY_TOKEN"

# Get entries by content type
curl "https://cdn.contentful.com/spaces/SPACE_ID/environments/master/entries?content_type=blogPost&access_token=DELIVERY_TOKEN"

# Get single entry
curl "https://cdn.contentful.com/spaces/SPACE_ID/environments/master/entries/ENTRY_ID?access_token=DELIVERY_TOKEN"

# Search by field
curl "https://cdn.contentful.com/spaces/SPACE_ID/environments/master/entries?content_type=blogPost&fields.slug=my-post&access_token=DELIVERY_TOKEN"

# Get assets
curl "https://cdn.contentful.com/spaces/SPACE_ID/environments/master/assets?access_token=DELIVERY_TOKEN"
```

### GraphQL API

```javascript
const query = `
  query {
    blogPostCollection(limit: 10, order: sys_publishedAt_DESC) {
      items {
        sys {
          id
          publishedAt
        }
        title
        slug
        excerpt
        featuredImage {
          url
          width
          height
          title
        }
        author {
          name
          avatar {
            url
          }
        }
        categoriesCollection {
          items {
            name
            slug
          }
        }
      }
    }
  }
`;

async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/SPACE_ID/environments/master`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_DELIVERY_TOKEN`
      },
      body: JSON.stringify({ query, variables })
    }
  );

  const { data, errors } = await response.json();
  
  if (errors) {
    throw new Error(errors[0].message);
  }

  return data;
}

// Usage
fetchGraphQL(query)
  .then(data => console.log(data.blogPostCollection.items))
  .catch(error => console.error(error));
```

## Content Management API

### Creating and Updating Content

```javascript
const contentfulManagement = require('contentful-management');

const client = contentfulManagement.createClient({
  accessToken: 'YOUR_MANAGEMENT_TOKEN'
});

// Create entry
async function createBlogPost() {
  const space = await client.getSpace('SPACE_ID');
  const environment = await space.getEnvironment('master');

  const entry = await environment.createEntry('blogPost', {
    fields: {
      title: {
        'en-US': 'My New Blog Post'
      },
      slug: {
        'en-US': 'my-new-blog-post'
      },
      excerpt: {
        'en-US': 'This is a great post about Contentful.'
      },
      body: {
        'en-US': {
          nodeType: 'document',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'This is the blog post content.',
                  marks: []
                }
              ]
            }
          ]
        }
      },
      publishDate: {
        'en-US': '2024-01-15T00:00:00Z'
      },
      featured: {
        'en-US': true
      }
    }
  });

  // Publish entry
  await entry.publish();
  console.log('Entry created and published:', entry.sys.id);
}

// Update entry
async function updateBlogPost(entryId) {
  const space = await client.getSpace('SPACE_ID');
  const environment = await space.getEnvironment('master');
  
  const entry = await environment.getEntry(entryId);
  
  entry.fields.title['en-US'] = 'Updated Title';
  entry.fields.excerpt['en-US'] = 'Updated excerpt text.';
  
  const updatedEntry = await entry.update();
  await updatedEntry.publish();
  
  console.log('Entry updated and published');
}

// Upload asset
async function uploadAsset(filePath, title) {
  const fs = require('fs');
  const space = await client.getSpace('SPACE_ID');
  const environment = await space.getEnvironment('master');

  const asset = await environment.createAssetFromFiles({
    fields: {
      title: {
        'en-US': title
      },
      file: {
        'en-US': {
          contentType: 'image/jpeg',
          fileName: 'image.jpg',
          file: fs.readFileSync(filePath)
        }
      }
    }
  });

  const processedAsset = await asset.processForAllLocales();
  await processedAsset.publish();
  
  console.log('Asset uploaded:', processedAsset.sys.id);
  return processedAsset;
}

// Delete entry
async function deleteEntry(entryId) {
  const space = await client.getSpace('SPACE_ID');
  const environment = await space.getEnvironment('master');
  
  const entry = await environment.getEntry(entryId);
  
  if (entry.isPublished()) {
    await entry.unpublish();
  }
  
  await entry.delete();
  console.log('Entry deleted');
}
```

## Framework Integrations

### Next.js Integration

```javascript
// lib/contentful.js
import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

// pages/index.js
import { client } from '../lib/contentful';

export default function Home({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.sys.id}>
          <h2>{post.fields.title}</h2>
          <p>{post.fields.excerpt}</p>
          <a href={`/blog/${post.fields.slug}`}>Read more</a>
        </article>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.publishDate'
  });

  return {
    props: {
      posts: entries.items
    },
    revalidate: 60
  };
}

// pages/blog/[slug].js
import { client } from '../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.fields.title}</h1>
      {post.fields.featuredImage && (
        <img 
          src={post.fields.featuredImage.fields.file.url}
          alt={post.fields.featuredImage.fields.title}
        />
      )}
      <div>
        {documentToReactComponents(post.fields.body)}
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  const entries = await client.getEntries({
    content_type: 'blogPost'
  });

  const paths = entries.items.map(post => ({
    params: { slug: post.fields.slug }
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug,
    limit: 1
  });

  return {
    props: {
      post: entries.items[0]
    },
    revalidate: 60
  };
}
```

### React Integration

```javascript
import { useEffect, useState } from 'react';
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
});

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const entries = await client.getEntries({
          content_type: 'blogPost',
          order: '-fields.publishDate'
        });
        setPosts(entries.items);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map(post => (
        <article key={post.sys.id}>
          <h2>{post.fields.title}</h2>
          <p>{post.fields.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

export default BlogList;
```

### Gatsby Integration

```bash
npm install gatsby-source-contentful
```

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: 'cdn.contentful.com'
      }
    }
  ]
};

// src/pages/index.js
import { graphql } from 'gatsby';

export default function Home({ data }) {
  const posts = data.allContentfulBlogPost.nodes;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
      nodes {
        id
        title
        slug
        excerpt
        publishDate
        featuredImage {
          file {
            url
          }
        }
      }
    }
  }
`;
```

## Rich Text Rendering

### React

```bash
npm install @contentful/rich-text-react-renderer
```

```javascript
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="my-paragraph">{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => <h1 className="my-h1">{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2 className="my-h2">{children}</h2>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title } = node.data.target.fields;
      return <img src={file.url} alt={title} />;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const entry = node.data.target;
      // Render embedded entry
      return <div>{entry.fields.title}</div>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return <a href={node.data.uri} className="my-link">{children}</a>;
    }
  },
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  }
};

function RichTextContent({ content }) {
  return <div>{documentToReactComponents(content, options)}</div>;
}
```

## Webhooks

### Setup Webhook

```javascript
// Via Web UI: Settings → Webhooks → Add webhook

// Programmatically
async function createWebhook() {
  const space = await client.getSpace('SPACE_ID');

  const webhook = await space.createWebhook({
    name: 'My Webhook',
    url: 'https://example.com/webhook',
    topics: [
      'Entry.create',
      'Entry.publish',
      'Entry.unpublish',
      'Entry.delete',
      'Asset.create',
      'Asset.publish'
    ],
    headers: [
      {
        key: 'X-Custom-Header',
        value: 'custom-value'
      }
    ]
  });

  console.log('Webhook created:', webhook.sys.id);
}
```

### Handle Webhook (Express)

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const topic = req.headers['x-contentful-topic'];
  const payload = req.body;

  console.log('Webhook received:', topic);
  console.log('Entry ID:', payload.sys.id);

  switch (topic) {
    case 'ContentManagement.Entry.publish':
      // Handle entry published
      console.log('Entry published:', payload.fields);
      // Trigger rebuild, clear cache, etc.
      break;
      
    case 'ContentManagement.Entry.unpublish':
      // Handle entry unpublished
      console.log('Entry unpublished');
      break;
      
    case 'ContentManagement.Entry.delete':
      // Handle entry deleted
      console.log('Entry deleted');
      break;
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

## Localization

### Multi-Language Content

```javascript
// Create entry with multiple locales
async function createMultilingualEntry() {
  const space = await client.getSpace('SPACE_ID');
  const environment = await space.getEnvironment('master');

  const entry = await environment.createEntry('blogPost', {
    fields: {
      title: {
        'en-US': 'Hello World',
        'es': 'Hola Mundo',
        'fr': 'Bonjour le Monde'
      },
      slug: {
        'en-US': 'hello-world',
        'es': 'hola-mundo',
        'fr': 'bonjour-le-monde'
      },
      body: {
        'en-US': { /* Rich text */ },
        'es': { /* Rich text */ },
        'fr': { /* Rich text */ }
      }
    }
  });

  await entry.publish();
}

// Fetch content in specific locale
async function getLocalizedContent(locale) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    locale: locale
  });
  return entries.items;
}

// Get all locales
const englishPosts = await getLocalizedContent('en-US');
const spanishPosts = await getLocalizedContent('es');
```

## Best Practices

1. **Use Content Modeling wisely** - Plan your content structure before implementation
2. **Leverage references** - Link related content types instead of duplicating
3. **Use GraphQL for complex queries** - More efficient than REST for nested data
4. **Implement caching** - Cache API responses to reduce API calls
5. **Use webhooks** - Trigger builds and updates in real-time
6. **Version control** - Use environments for staging and production
7. **Optimize images** - Use Contentful's image API parameters
8. **Set up previews** - Use Preview API for draft content
9. **Monitor API usage** - Stay within rate limits
10. **Use SDK helpers** - Leverage built-in methods for common tasks

## Image Optimization

```javascript
// Resize image
const imageUrl = `${image.fields.file.url}?w=800&h=600&fit=fill`;

// Format conversion
const webpUrl = `${image.fields.file.url}?fm=webp&q=80`;

// Multiple parameters
const optimizedUrl = `${image.fields.file.url}?w=1200&h=800&fit=thumb&f=center&q=85&fm=jpg&fl=progressive`;
```

## Rate Limits

- **Content Delivery API**: 55 requests/second
- **Content Preview API**: 14 requests/second
- **Content Management API**: 7 requests/second per space
- **GraphQL**: 55 requests/second

## Resources

- [Contentful Official Site](https://www.contentful.com/)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [JavaScript SDK](https://github.com/contentful/contentful.js)
- [GraphQL API](https://www.contentful.com/developers/docs/references/graphql/)
- [Rich Text Renderer](https://github.com/contentful/rich-text)
- [Contentful CLI](https://github.com/contentful/contentful-cli)
- [Community Slack](https://www.contentful.com/slack/)
- [Starter Templates](https://www.contentful.com/starters/)

Contentful is ideal for teams that need a flexible, API-first CMS with excellent developer experience and the ability to deliver content to any platform or device.
