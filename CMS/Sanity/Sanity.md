# Sanity

## Overview
Sanity is a platform for structured content that comes with an open-source editing environment called Sanity Studio. It's designed as a headless CMS with real-time collaboration, a powerful query language (GROQ), and customizable editing experiences. Sanity treats content as data that can be queried, transformed, and delivered to any platform.

**Key Features:**
- Real-time collaborative editing
- Customizable React-based Studio
- GROQ query language
- GraphQL support
- Structured content with schemas
- Asset management with Sanity Images
- Real-time APIs
- Portable Text for rich content
- Version history and drafts
- Webhooks and

 serverless functions

**Use Cases:**
- Websites and web applications
- Mobile applications
- E-commerce platforms
- Marketing sites
- Documentation platforms
- Multi-channel publishing
- Real-time collaborative editing

## Getting Started

### Installation

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Create new project
sanity init

# Follow prompts:
# - Create new project
# - Choose dataset configuration
# - Select project template (blog, e-commerce, clean)
# - Choose project output path

# Start development server
cd my-sanity-project
sanity start

# Studio will be available at http://localhost:3333
```

### Project Structure

```
my-sanity-project/
├── schemas/
│   ├── schema.js          # Schema definition
│   ├── post.js            # Post schema
│   ├── author.js          # Author schema
│   └── category.js        # Category schema
├── plugins/
├── parts/
├── static/
├── sanity.json            # Project configuration
├── package.json
└── .gitignore
```

## Schema Definition

### Basic Schema

```javascript
// schemas/schema.js
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import post from './post';
import author from './author';
import category from './category';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    post,
    author,
    category
  ])
});
```

### Post Schema

```javascript
// schemas/post.js
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(10).max(200)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true  // Enable image cropping
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          options: {
            isHighlighted: true
          }
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }
      ]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.max(200)
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'  // Rich text with Portable Text
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author && `by ${author}`
      };
    }
  },
  orderings: [
    {
      title: 'Publishing date (new to old)',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
};
```

### Author Schema

```javascript
// schemas/author.js
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: []
        }
      ]
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.email()
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'string', title: 'Twitter Handle' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn Profile' },
        { name: 'github', type: 'string', title: 'GitHub Username' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
};
```

### Block Content (Rich Text)

```javascript
// schemas/blockContent.js
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' }
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean'
              }
            ]
          },
          {
            title: 'Internal link',
            name: 'internalLink',
            type: 'object',
            fields: [
              {
                title: 'Reference',
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'post' },
                  { type: 'page' }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        }
      ]
    },
    {
      type: 'code',
      options: {
        language: 'javascript',
        languageAlternatives: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' }
        ]
      }
    }
  ]
};
```

## Querying Data with GROQ

### Basic Queries

```javascript
// Get all posts
const query = `*[_type == "post"]`;

// Get post by slug
const query = `*[_type == "post" && slug.current == "my-post"][0]`;

// Get posts with author and categories
const query = `*[_type == "post"]{
  _id,
  title,
  slug,
  publishedAt,
  author->{
    name,
    image
  },
  categories[]->{
    title,
    slug
  }
}`;

// Filter and sort
const query = `*[_type == "post" && featured == true] | order(publishedAt desc)`;

// Limit results
const query = `*[_type == "post"] | order(publishedAt desc) [0...10]`;

// Search
const query = `*[_type == "post" && title match "*search*"]`;
```

### Advanced GROQ Queries

```javascript
// Pagination
const query = `{
  "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end],
  "total": count(*[_type == "post"])
}`;

// Get related posts
const query = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "related": *[_type == "post" && references(^.categories[]._ref) && _id != ^._id][0...3]{
    title,
    slug
  }
}`;

// Conditional fields
const query = `*[_type == "post"]{
  title,
  slug,
  featured,
  featured == true => {
    "featuredText": "This is a featured post"
  }
}`;

// Count and group
const query = `{
  "totalPosts": count(*[_type == "post"]),
  "publishedPosts": count(*[_type == "post" && defined(publishedAt)]),
  "draftPosts": count(*[_type == "post" && !defined(publishedAt)])
}`;
```

## JavaScript Client

### Installation

```bash
npm install @sanity/client
npm install @sanity/image-url  # For image URLs
```

### Client Setup

```javascript
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: 'your-project-id',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true  // false for fresh data
});

// Image URL builder
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

// Fetch data
async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc)`;
  const posts = await client.fetch(query);
  return posts;
}

// Get single post
async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    body,
    author->{
      name,
      image
    },
    categories[]->{
      title,
      slug
    }
  }`;
  
  const post = await client.fetch(query, { slug });
  return post;
}

// Create document
async function createPost(data) {
  const doc = {
    _type: 'post',
    title: data.title,
    slug: {
      _type: 'slug',
      current: data.slug
    },
    body: data.body,
    publishedAt: new Date().toISOString()
  };
  
  const result = await client.create(doc);
  return result;
}

// Update document
async function updatePost(id, updates) {
  const result = await client
    .patch(id)
    .set(updates)
    .commit();
  return result;
}

// Delete document
async function deletePost(id) {
  const result = await client.delete(id);
  return result;
}

// Listen for changes (real-time)
const query = `*[_type == "post"]`;
const subscription = client.listen(query).subscribe(update => {
  console.log('Document updated:', update);
});

// Unsubscribe
subscription.unsubscribe();
```

### Image URLs

```javascript
// Basic image URL
const imageUrl = urlFor(post.mainImage).url();

// With transformations
const optimizedUrl = urlFor(post.mainImage)
  .width(800)
  .height(600)
  .fit('crop')
  .crop('center')
  .format('webp')
  .quality(80)
  .url();

// Responsive images
const srcSet = [400, 800, 1200].map(width => 
  `${urlFor(post.mainImage).width(width).url()} ${width}w`
).join(', ');
```

## Next.js Integration

```javascript
// lib/sanity.js
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// pages/index.js
import { client } from '../lib/sanity';

export default function Home({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <a href={`/blog/${post.slug.current}`}>Read more</a>
        </article>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage
    }
  `);

  return {
    props: { posts },
    revalidate: 60
  };
}

// pages/blog/[slug].js
import { client, urlFor } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      {post.mainImage && (
        <img 
          src={urlFor(post.mainImage).width(1200).url()}
          alt={post.mainImage.alt}
        />
      )}
      <div className="prose">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(`
    *[_type == "post" && defined(slug.current)][].slug.current
  `);

  return {
    paths: paths.map(slug => ({ params: { slug } })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      body,
      author->{
        name,
        image
      }
    }
  `, { slug: params.slug });

  return {
    props: { post },
    revalidate: 60
  };
}
```

## Portable Text Rendering

```bash
npm install @portabletext/react
```

```javascript
import { PortableText } from '@portabletext/react';

const components = {
  types: {
    image: ({ value }) => (
      <img 
        src={urlFor(value).width(800).url()}
        alt={value.alt || ' '}
      />
    ),
    code: ({ value }) => (
      <pre data-language={value.language}>
        <code>{value.code}</code>
      </pre>
    )
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} target={value.blank ? '_blank' : undefined}>
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }) => {
      return <a href={`/${value.reference.slug.current}`}>{children}</a>;
    }
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-4">{children}</ol>
  }
};

function Article({ content }) {
  return <PortableText value={content} components={components} />;
}
```

## Custom Studio Components

### Custom Input Component

```javascript
// components/ColorPicker.js
import React from 'react';
import { FormField } from '@sanity/base/components';
import { TextInput } from '@sanity/ui';
import PatchEvent, { set } from '@sanity/form-builder/PatchEvent';

const ColorPicker = React.forwardRef((props, ref) => {
  const { type, value, onChange } = props;

  const handleChange = React.useCallback(
    (event) => {
      onChange(PatchEvent.from(set(event.target.value)));
    },
    [onChange]
  );

  return (
    <FormField description={type.description} title={type.title}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="color"
          value={value || '#000000'}
          onChange={handleChange}
          ref={ref}
        />
        <TextInput
          value={value || ''}
          onChange={handleChange}
        />
      </div>
    </FormField>
  );
});

export default ColorPicker;

// In schema:
{
  name: 'brandColor',
  title: 'Brand Color',
  type: 'string',
  inputComponent: ColorPicker
}
```

### Custom Desk Structure

```javascript
// deskStructure.js
import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .child(
          S.list()
            .title('Posts')
            .items([
              S.listItem()
                .title('Published')
                .child(
                  S.documentList()
                    .title('Published Posts')
                    .filter('_type == "post" && defined(publishedAt)')
                ),
              S.listItem()
                .title('Drafts')
                .child(
                  S.documentList()
                    .title('Draft Posts')
                    .filter('_type == "post" && !defined(publishedAt)')
                ),
              S.listItem()
                .title('Featured')
                .child(
                  S.documentList()
                    .title('Featured Posts')
                    .filter('_type == "post" && featured == true')
                )
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        listItem => !['post'].includes(listItem.getId())
      )
    ]);
```

## Deployment

### Deploy Studio to Sanity

```bash
# Build studio
sanity build

# Deploy to Sanity's hosting
sanity deploy

# Custom studio hostname (e.g., mystudio.sanity.studio)
```

### Deploy to Vercel/Netlify

```bash
# Build static files
sanity build

# Deploy dist/ folder to your hosting provider
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token  # For server-side operations
```

## Webhooks

```bash
# Configure in Sanity dashboard
# Settings → API → Webhooks → Create webhook

# Example webhook handler (Next.js API route)
```

```javascript
// pages/api/revalidate.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { _type, slug } = req.body;

    if (_type === 'post' && slug?.current) {
      await res.revalidate(`/blog/${slug.current}`);
      await res.revalidate('/');
    }

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
```

## Best Practices

1. **Use references** - Link documents instead of duplicating data
2. **Implement proper validation** - Use schema validation rules
3. **Optimize images** - Use Sanity's image pipeline
4. **Use CDN in production** - Set `useCdn: true`
5. **Version your API** - Specify `apiVersion` in client
6. **Structure your schemas** - Organize schemas logically
7. **Use GROQ projections** - Only fetch needed fields
8. **Implement caching** - Cache queries on your frontend
9. **Use real-time listeners** - For collaborative features
10. **Deploy preview environments** - Use different datasets

## Resources

- [Sanity Official Site](https://www.sanity.io/)
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Reference](https://www.sanity.io/docs/groq)
- [Schema Types](https://www.sanity.io/docs/schema-types)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- [Sanity Exchange](https://www.sanity.io/exchange)
- [Community Slack](https://slack.sanity.io/)
- [Sanity UI](https://www.sanity.io/ui)

Sanity is ideal for teams that need real-time collaboration, highly customizable editing experiences, and the flexibility to model content exactly as needed for their use cases.
