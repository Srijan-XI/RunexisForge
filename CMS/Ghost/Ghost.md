# Ghost

## Overview
Ghost is a modern, open-source headless CMS built on Node.js, designed specifically for professional publishing. It's focused on simplicity, speed, and providing an excellent writing experience. Ghost offers both traditional and headless CMS capabilities with a powerful API for building custom frontends.

**Key Features:**
- Node.js-based platform
- Built-in membership and subscription features
- Native newsletter functionality
- SEO optimized out of the box
- Markdown-based editor
- Powerful REST and Content APIs
- Multi-language support
- Custom themes with Handlebars
- Built-in CDN integration
- Modern admin interface

**Use Cases:**
- Professional blogs and publications
- Membership sites
- Newsletter platforms
- Marketing websites
- Content-driven businesses
- Headless CMS for modern frameworks

## Installation

### Requirements
- Node.js 18 LTS or higher
- MySQL 8+ or MariaDB 10.6+
- Min 1GB RAM, 2GB+ recommended
- Ubuntu 20.04/22.04 (production)
- Nginx or Apache (production)

### Local Development

#### Using Ghost-CLI (macOS/Linux)

```bash
# Install Ghost-CLI globally
npm install ghost-cli@latest -g

# Create directory for Ghost
mkdir ghost-local
cd ghost-local

# Install Ghost in development mode
ghost install local

# Ghost will be available at http://localhost:2368
# Admin at http://localhost:2368/ghost
```

#### Using Docker

```yaml
# docker-compose.yml
version: '3.8'

services:
  ghost:
    image: ghost:latest
    restart: always
    ports:
      - "2368:2368"
    environment:
      # Base URL
      url: http://localhost:2368
      
      # Database
      database__client: mysql
      database__connection__host: db
      database__connection__user: ghost
      database__connection__password: ghostpassword
      database__connection__database: ghost
      
      # Mail (optional)
      mail__transport: SMTP
      mail__options__service: Mailgun
      mail__options__auth__user: your-email@example.com
      mail__options__auth__pass: your-password
    volumes:
      - ghost_content:/var/lib/ghost/content
    depends_on:
      - db

  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: ghost
      MYSQL_USER: ghost
      MYSQL_PASSWORD: ghostpassword
    volumes:
      - db_data:/var/lib/mysql

volumes:
  ghost_content:
  db_data:
```

```bash
# Start Ghost
docker-compose up -d

# Visit http://localhost:2368
# Admin at http://localhost:2368/ghost
```

### Production Installation (Ubuntu)

```bash
# Update packages
sudo apt-get update
sudo apt-get upgrade

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt-get install mysql-server
sudo mysql_secure_installation

# Create Ghost database
sudo mysql
CREATE DATABASE ghost_production;
CREATE USER 'ghost'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON ghost_production.* TO 'ghost'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Install Nginx
sudo apt-get install nginx

# Install Ghost-CLI
sudo npm install ghost-cli@latest -g

# Create directory
sudo mkdir -p /var/www/ghost
sudo chown $USER:$USER /var/www/ghost
cd /var/www/ghost

# Install Ghost
ghost install

# Follow prompts:
# - Enter your blog URL
# - Enter your MySQL hostname (localhost)
# - Enter your MySQL username (ghost)
# - Enter your MySQL password
# - Enter your Ghost database name (ghost_production)
# - Do you want to set up Nginx? Yes
# - Do you want to set up SSL? Yes (if domain configured)
# - Do you want to set up systemd? Yes
# - Do you want to start Ghost? Yes
```

## Configuration

### config.production.json

```json
{
  "url": "https://yourdomain.com",
  "server": {
    "port": 2368,
    "host": "127.0.0.1"
  },
  "database": {
    "client": "mysql",
    "connection": {
      "host": "localhost",
      "port": 3306,
      "user": "ghost",
      "password": "your_password",
      "database": "ghost_production"
    }
  },
  "mail": {
    "transport": "SMTP",
    "options": {
      "service": "Mailgun",
      "host": "smtp.mailgun.org",
      "port": 465,
      "secure": true,
      "auth": {
        "user": "postmaster@yourdomain.com",
        "pass": "your-mailgun-password"
      }
    }
  },
  "logging": {
    "level": "info",
    "rotation": {
      "enabled": true
    },
    "transports": ["file", "stdout"]
  },
  "process": "systemd",
  "paths": {
    "contentPath": "/var/www/ghost/content"
  },
  "privacy": {
    "useTinfoil": true
  },
  "useMinFiles": true,
  "caching": {
    "frontend": {
      "maxAge": 0
    }
  },
  "imageOptimization": {
    "resize": true
  },
  "storage": {
    "active": "local-file-store",
    "local-file-store": {}
  }
}
```

### Custom Mail Configuration

```json
{
  "mail": {
    "transport": "SMTP",
    "options": {
      "service": "Gmail",
      "auth": {
        "user": "your-email@gmail.com",
        "pass": "app-specific-password"
      }
    }
  }
}
```

## Theme Development

### Theme Structure

```
my-theme/
├── package.json          # Theme metadata
├── index.hbs             # Home page template
├── post.hbs              # Single post template
├── page.hbs              # Page template
├── tag.hbs               # Tag archive template
├── author.hbs            # Author archive template
├── default.hbs           # Default wrapper template
├── partials/
│   ├── header.hbs
│   ├── footer.hbs
│   ├── navigation.hbs
│   └── loop.hbs
├── assets/
│   ├── css/
│   │   └── screen.css
│   ├── js/
│   │   └── index.js
│   └── images/
└── locales/
    └── en.json
```

### package.json

```json
{
  "name": "my-ghost-theme",
  "description": "A custom Ghost theme",
  "version": "1.0.0",
  "engines": {
    "ghost": ">=5.0.0"
  },
  "license": "MIT",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "keywords": [
    "ghost",
    "theme",
    "ghost-theme"
  ],
  "config": {
    "posts_per_page": 10,
    "image_sizes": {
      "xs": {
        "width": 150
      },
      "s": {
        "width": 400
      },
      "m": {
        "width": 750
      },
      "l": {
        "width": 960
      },
      "xl": {
        "width": 1200
      }
    },
    "card_assets": true,
    "custom": {
      "navigation_layout": {
        "type": "select",
        "options": ["Logo on cover", "Logo in the middle", "Stacked"],
        "default": "Logo on cover"
      },
      "title_font": {
        "type": "select",
        "options": ["Modern sans-serif", "Elegant serif"],
        "default": "Modern sans-serif"
      },
      "show_publication_cover": {
        "type": "boolean",
        "default": true
      }
    }
  }
}
```

### default.hbs (Main Template)

```handlebars
<!DOCTYPE html>
<html lang="{{@site.locale}}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{meta_title}}</title>
    
    <link rel="stylesheet" href="{{asset "css/screen.css"}}">
    
    {{!-- Ghost outputs important meta tags and scripts --}}
    {{ghost_head}}
</head>
<body class="{{body_class}}">
    
    {{!-- Header --}}
    {{> header}}
    
    {{!-- Main content block --}}
    {{{body}}}
    
    {{!-- Footer --}}
    {{> footer}}
    
    {{!-- Scripts --}}
    <script src="{{asset "js/index.js"}}"></script>
    
    {{!-- Ghost outputs important scripts --}}
    {{ghost_foot}}
</body>
</html>
```

### partials/header.hbs

```handlebars
<header class="site-header">
    <div class="container">
        {{#if @site.logo}}
            <a class="site-logo" href="{{@site.url}}">
                <img src="{{@site.logo}}" alt="{{@site.title}}">
            </a>
        {{else}}
            <h1 class="site-title">
                <a href="{{@site.url}}">{{@site.title}}</a>
            </h1>
        {{/if}}
        
        {{#if @site.description}}
            <p class="site-description">{{@site.description}}</p>
        {{/if}}
        
        {{> navigation}}
    </div>
</header>
```

### partials/navigation.hbs

```handlebars
{{#if @site.navigation}}
    <nav class="site-nav">
        <ul class="nav-list">
            {{#foreach @site.navigation}}
                <li class="nav-item {{#if current}}nav-current{{/if}}">
                    <a href="{{url absolute="true"}}">{{label}}</a>
                </li>
            {{/foreach}}
        </ul>
    </nav>
{{/if}}
```

### index.hbs (Home Page)

```handlebars
{{!< default}}

<div class="site-main">
    <div class="container">
        {{#if posts}}
            <div class="post-feed">
                {{#foreach posts}}
                    <article class="post-card {{post_class}}">
                        {{#if feature_image}}
                            <a class="post-card-image-link" href="{{url}}">
                                <img class="post-card-image"
                                     srcset="{{img_url feature_image size="s"}} 300w,
                                             {{img_url feature_image size="m"}} 600w,
                                             {{img_url feature_image size="l"}} 1000w"
                                     sizes="(max-width: 767px) 100vw, 50vw"
                                     src="{{img_url feature_image size="m"}}"
                                     alt="{{title}}"
                                     loading="lazy">
                            </a>
                        {{/if}}
                        
                        <div class="post-card-content">
                            <h2 class="post-card-title">
                                <a href="{{url}}">{{title}}</a>
                            </h2>
                            
                            <div class="post-card-excerpt">
                                {{excerpt words="30"}}
                            </div>
                            
                            <footer class="post-card-meta">
                                <time datetime="{{date format="YYYY-MM-DD"}}">
                                    {{date format="D MMMM YYYY"}}
                                </time>
                                <span class="reading-time">
                                    {{reading_time minute=(t "1 min read") minutes=(t "% min read")}}
                                </span>
                            </footer>
                        </div>
                    </article>
                {{/foreach}}
            </div>
            
            {{pagination}}
        {{else}}
            <p>No posts found.</p>
        {{/if}}
    </div>
</div>
```

### post.hbs (Single Post)

```handlebars
{{!< default}}

<article class="post {{post_class}}">
    <header class="post-header">
        {{#if primary_tag}}
            <a class="post-tag" href="{{primary_tag.url}}">{{primary_tag.name}}</a>
        {{/if}}
        
        <h1 class="post-title">{{title}}</h1>
        
        {{#if custom_excerpt}}
            <p class="post-excerpt">{{custom_excerpt}}</p>
        {{/if}}
        
        <div class="post-meta">
            <div class="post-meta-authors">
                {{#foreach authors}}
                    {{#if profile_image}}
                        <img class="author-avatar" src="{{profile_image}}" alt="{{name}}">
                    {{/if}}
                    <a href="{{url}}">{{name}}</a>
                {{/foreach}}
            </div>
            
            <time datetime="{{date format="YYYY-MM-DD"}}">
                {{date format="D MMMM YYYY"}}
            </time>
            
            <span class="reading-time">
                {{reading_time minute=(t "1 min read") minutes=(t "% min read")}}
            </span>
        </div>
    </header>
    
    {{#if feature_image}}
        <figure class="post-feature-image">
            <img srcset="{{img_url feature_image size="s"}} 300w,
                         {{img_url feature_image size="m"}} 600w,
                         {{img_url feature_image size="l"}} 1000w,
                         {{img_url feature_image size="xl"}} 2000w"
                 sizes="(max-width: 767px) 100vw, 800px"
                 src="{{img_url feature_image size="l"}}"
                 alt="{{title}}">
        </figure>
    {{/if}}
    
    <section class="post-content">
        {{content}}
    </section>
    
    <footer class="post-footer">
        {{#if tags}}
            <div class="post-tags">
                {{#foreach tags}}
                    <a href="{{url}}" class="tag">{{name}}</a>
                {{/foreach}}
            </div>
        {{/if}}
        
        {{!-- Author bio --}}
        {{#foreach authors}}
            <div class="author-card">
                {{#if profile_image}}
                    <img class="author-avatar" src="{{profile_image}}" alt="{{name}}">
                {{/if}}
                <div class="author-info">
                    <h4 class="author-name">{{name}}</h4>
                    {{#if bio}}
                        <p class="author-bio">{{bio}}</p>
                    {{/if}}
                </div>
            </div>
        {{/foreach}}
    </footer>
    
    {{!-- Comments --}}
    {{comments}}
</article>

{{!-- Related posts --}}
{{#get "posts" filter="tags:{{primary_tag.slug}}+id:-{{id}}" limit="3" as |related|}}
    {{#if related}}
        <aside class="related-posts">
            <h3>You might also like</h3>
            <div class="post-feed">
                {{#foreach related}}
                    {{> "loop"}}
                {{/foreach}}
            </div>
        </aside>
    {{/if}}
{{/get}}
```

## Content API

### JavaScript/Node.js Client

```bash
npm install @tryghost/content-api
```

```javascript
const GhostContentAPI = require('@tryghost/content-api');

// Initialize API
const api = new GhostContentAPI({
  url: 'https://yourdomain.com',
  key: 'your_content_api_key',
  version: 'v5.0'
});

// Get all posts
async function getPosts() {
  try {
    const posts = await api.posts.browse({
      limit: 10,
      include: 'tags,authors'
    });
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}

// Get single post by slug
async function getPost(slug) {
  try {
    const post = await api.posts.read(
      { slug: slug },
      { include: 'tags,authors' }
    );
    console.log(post);
  } catch (error) {
    console.error(error);
  }
}

// Get posts by tag
async function getPostsByTag(tagSlug) {
  try {
    const posts = await api.posts.browse({
      filter: `tag:${tagSlug}`,
      limit: 10,
      include: 'tags,authors'
    });
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}

// Get pages
async function getPages() {
  try {
    const pages = await api.pages.browse({
      limit: 'all'
    });
    console.log(pages);
  } catch (error) {
    console.error(error);
  }
}

// Get tags
async function getTags() {
  try {
    const tags = await api.tags.browse({
      limit: 'all'
    });
    console.log(tags);
  } catch (error) {
    console.error(error);
  }
}

// Get authors
async function getAuthors() {
  try {
    const authors = await api.authors.browse({
      limit: 'all'
    });
    console.log(authors);
  } catch (error) {
    console.error(error);
  }
}

// Search posts
async function searchPosts(query) {
  try {
    const posts = await api.posts.browse({
      filter: `title:~'${query}'+excerpt:~'${query}'`,
      limit: 10
    });
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}
```

### REST API Endpoints

```bash
# Get posts
curl "https://yourdomain.com/ghost/api/content/posts/?key=YOUR_KEY"

# Get single post
curl "https://yourdomain.com/ghost/api/content/posts/slug/my-post/?key=YOUR_KEY"

# Get posts with tags and authors
curl "https://yourdomain.com/ghost/api/content/posts/?key=YOUR_KEY&include=tags,authors"

# Get posts by tag
curl "https://yourdomain.com/ghost/api/content/posts/?key=YOUR_KEY&filter=tag:news"

# Get pages
curl "https://yourdomain.com/ghost/api/content/pages/?key=YOUR_KEY"

# Get tags
curl "https://yourdomain.com/ghost/api/content/tags/?key=YOUR_KEY"

# Get authors
curl "https://yourdomain.com/ghost/api/content/authors/?key=YOUR_KEY"
```

### Next.js Integration

```javascript
// lib/ghost.js
import GhostContentAPI from '@tryghost/content-api';

export const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: 'v5.0'
});

// pages/index.js
import { api } from '../lib/ghost';

export default function Home({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <a href={`/post/${post.slug}`}>Read more</a>
        </article>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const posts = await api.posts.browse({
    limit: 10,
    include: 'tags,authors'
  });

  return {
    props: { posts },
    revalidate: 60 // Revalidate every 60 seconds
  };
}

// pages/post/[slug].js
import { api } from '../../lib/ghost';

export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}

export async function getStaticPaths() {
  const posts = await api.posts.browse({ limit: 'all' });
  const paths = posts.map(post => ({ params: { slug: post.slug } }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await api.posts.read(
    { slug: params.slug },
    { include: 'tags,authors' }
  );

  return {
    props: { post },
    revalidate: 60
  };
}
```

## Admin API

### Creating Posts Programmatically

```javascript
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Generate admin API token
const key = 'YOUR_ADMIN_API_KEY';
const [id, secret] = key.split(':');

const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
  keyid: id,
  algorithm: 'HS256',
  expiresIn: '5m',
  audience: '/admin/'
});

// Create post
async function createPost() {
  try {
    const response = await axios.post(
      'https://yourdomain.com/ghost/api/admin/posts/',
      {
        posts: [{
          title: 'My New Post',
          html: '<p>Post content here</p>',
          status: 'draft',
          tags: [{ name: 'News' }],
          authors: [{ id: 'author_id' }]
        }]
      },
      {
        headers: {
          'Authorization': `Ghost ${token}`,
          'Content-Type': 'application/json',
          'Accept-Version': 'v5.0'
        }
      }
    );
    console.log('Post created:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

createPost();
```

## Members & Subscriptions

### Enable Members in config

```json
{
  "members": {
    "enabled": true
  }
}
```

### Membership Tiers

```handlebars
{{!-- Check if member --}}
{{#if @member}}
    <p>Welcome back, {{@member.name}}!</p>
{{else}}
    <a href="#/portal/signup">Join us</a>
{{/if}}

{{!-- Paid members only content --}}
{{#if @member.paid}}
    <div class="premium-content">
        Premium content here
    </div>
{{/if}}

{{!-- Free members only --}}
{{#unless @member.paid}}
    <div class="upgrade-cta">
        <a href="#/portal/account">Upgrade to Premium</a>
    </div>
{{/unless}}
```

## Ghost CLI Commands

```bash
# Installation
ghost install        # Production install
ghost install local  # Development install

# Management
ghost start          # Start Ghost
ghost stop           # Stop Ghost
ghost restart        # Restart Ghost
ghost status         # Check status

# Updates
ghost update         # Update Ghost
ghost update --force # Force update

# Configuration
ghost config         # View config
ghost config url     # Set URL
ghost setup          # Run setup wizard

# Database
ghost backup         # Create backup
ghost import         # Import content
ghost export         # Export content

# Logs
ghost log            # View logs
ghost log -f         # Follow logs
ghost log -n 50      # Last 50 lines

# System
ghost doctor         # System check
ghost buster         # Clear cache

# SSL
ghost setup ssl      # Setup SSL with Let's Encrypt
ghost setup ssl-renew # Renew SSL certificate

# Nginx
ghost setup nginx    # Configure Nginx
```

## Performance Optimization

### Enable Caching

```json
{
  "caching": {
    "frontend": {
      "maxAge": 31536000
    },
    "301": {
      "maxAge": 31536000
    },
    "customRedirects": {
      "maxAge": 31536000
    }
  }
}
```

### Image Optimization

```json
{
  "imageOptimization": {
    "resize": true,
    "srcsets": true
  }
}
```

### CDN Integration

```json
{
  "storage": {
    "active": "s3",
    "s3": {
      "accessKeyId": "YOUR_ACCESS_KEY",
      "secretAccessKey": "YOUR_SECRET",
      "region": "us-east-1",
      "bucket": "your-bucket",
      "assetHost": "https://cdn.yourdomain.com",
      "pathPrefix": "ghost"
    }
  }
}
```

## Best Practices

1. **Use Content API for headless implementations**
2. **Enable members for subscription features**
3. **Optimize images before uploading**
4. **Use custom themes for branding**
5. **Regular backups with `ghost backup`**
6. **Keep Ghost updated with `ghost update`**
7. **Use CDN for static assets**
8. **Monitor logs with `ghost log`**
9. **Enable SSL for security**
10. **Use Ghost(Pro) for managed hosting**

## Resources

- [Ghost Official Site](https://ghost.org/)
- [Ghost Documentation](https://ghost.org/docs/)
- [Theme Documentation](https://ghost.org/docs/themes/)
- [API Documentation](https://ghost.org/docs/content-api/)
- [Ghost Forum](https://forum.ghost.org/)
- [Ghost GitHub](https://github.com/TryGhost/Ghost)
- [Ghost Marketplace](https://ghost.org/marketplace/)
- [Handlebars Helpers](https://ghost.org/docs/themes/helpers/)

Ghost is ideal for professional publishers who want a modern, fast, and focused publishing platform with excellent API support for headless CMS use cases.
