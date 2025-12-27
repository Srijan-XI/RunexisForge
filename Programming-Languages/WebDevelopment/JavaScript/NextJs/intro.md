# Next.js - Introduction

## What is Next.js?

**Next.js** is a powerful, open-source React framework developed by Vercel that enables developers to build production-ready web applications with server-side rendering (SSR), static site generation (SSG), and hybrid rendering capabilities. It provides an excellent developer experience with built-in features like routing, optimization, and TypeScript support.

## Key Features

### 1. **Hybrid Rendering**

- **Server-Side Rendering (SSR)** - Render pages on each request
- **Static Site Generation (SSG)** - Pre-render pages at build time
- **Incremental Static Regeneration (ISR)** - Update static pages after deployment
- **Client-Side Rendering (CSR)** - Traditional React rendering
- Mix and match rendering strategies per page

### 2. **File-Based Routing**

- Automatic routing based on file system
- No need for route configuration
- Dynamic routes with brackets `[id].js`
- API routes built-in
- Nested and catch-all routes

### 3. **Built-in Optimizations**

- Automatic code splitting
- Image optimization with `<Image>` component
- Font optimization
- Script optimization
- Prefetching and lazy loading

### 4. **TypeScript Support**

- First-class TypeScript support
- Automatic TypeScript configuration
- Type checking for pages and APIs

### 5. **Developer Experience**

- Fast Refresh (instant feedback)
- Zero configuration
- Built-in CSS and Sass support
- CSS Modules and CSS-in-JS support
- Environment variables

## Architecture

```javascript
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│                 (User Request)                   │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│               Next.js Server                     │
│                                                  │
│  ┌────────────────────────────────────────┐    │
│  │         Routing Layer                   │    │
│  │  (File-based Router)                    │    │
│  └──────────────┬─────────────────────────┘    │
│                 │                                │
│  ┌──────────────▼─────────────────────────┐    │
│  │      Rendering Strategy Decision        │    │
│  │                                          │    │
│  │  ┌────────┐  ┌─────────┐  ┌─────────┐ │    │
│  │  │  SSR   │  │   SSG   │  │   ISR   │ │    │
│  │  └────────┘  └─────────┘  └─────────┘ │    │
│  └──────────────┬─────────────────────────┘    │
│                 │                                │
│  ┌──────────────▼─────────────────────────┐    │
│  │         React Rendering                 │    │
│  │      (Component Tree)                   │    │
│  └──────────────┬─────────────────────────┘    │
│                 │                                │
│  ┌──────────────▼─────────────────────────┐    │
│  │         HTML Generation                 │    │
│  │      (Hydration Ready)                  │    │
│  └────────────────────────────────────────┘    │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│            (Rendered Page + JS)                  │
│              (Hydration)                         │
└─────────────────────────────────────────────────┘
```javascript

## Rendering Strategies

### 1. Static Site Generation (SSG)

Pre-render pages at build time. Best for content that doesn't change often.

```javascript
// pages/blog/[id].js
export async function getStaticProps({ params }) {
    const post = await fetchPost(params.id);
    return {
        props: { post },
        revalidate: 60 // ISR: Regenerate every 60 seconds
    };
}

export async function getStaticPaths() {
    const posts = await fetchAllPosts();
    const paths = posts.map(post => ({ params: { id: post.id } }));
    return { paths, fallback: false };
}
```javascript

### 2. Server-Side Rendering (SSR)

Render pages on each request. Best for personalized or frequently updated content.

```javascript
// pages/dashboard.js
export async function getServerSideProps(context) {
    const user = await fetchUser(context.req);
    return {
        props: { user }
    };
}
```javascript

### 3. Client-Side Rendering (CSR)

Render on the client like traditional React apps.

```javascript
import { useState, useEffect } from 'react';

export default function Profile() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(setUser);
    }, []);
    
    return <div>{user?.name}</div>;
}
```javascript

### 4. Incremental Static Regeneration (ISR)

Update static pages after deployment without rebuilding entire site.

```javascript
export async function getStaticProps() {
    const data = await fetchData();
    return {
        props: { data },
        revalidate: 10 // Regenerate page every 10 seconds
    };
}
```javascript

## Installation

```bash
# Create a new Next.js app
npx create-next-app@latest my-app

# With TypeScript
npx create-next-app@latest my-app --typescript

# Navigate to project
cd my-app

# Start development server
npm run dev
```bash

## File Structure

```bash
my-app/
├── node_modules/
├── public/
│   ├── favicon.ico
│   └── images/
├── pages/
│   ├── api/
│   │   └── hello.js
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   └── about.js
├── styles/
│   ├── globals.css
│   └── Home.module.css
├── components/
│   └── Header.js
├── lib/
│   └── utils.js
├── .gitignore
├── package.json
├── next.config.js
└── README.md
```bash

## Routing

### Basic Routes

```bash
pages/index.js           → /
pages/about.js           → /about
pages/blog/index.js      → /blog
pages/blog/first-post.js → /blog/first-post
```bash

### Dynamic Routes

```javascript
// pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post() {
    const router = useRouter();
    const { id } = router.query;
    
    return <h1>Post: {id}</h1>;
}

// Matches: /posts/1, /posts/abc, etc.
```bash

### Catch-All Routes

```javascript
// pages/docs/[...slug].js
export default function Doc() {
    const router = useRouter();
    const { slug } = router.query;
    
    return <h1>Docs: {slug?.join('/')}</h1>;
}

// Matches: /docs/a, /docs/a/b, /docs/a/b/c, etc.
```bash

### API Routes

```javascript
// pages/api/users.js
export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ users: [] });
    } else if (req.method === 'POST') {
        res.status(201).json({ message: 'User created' });
    }
}
```bash

## Navigation

### Link Component

```javascript
import Link from 'next/link';

export default function Nav() {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/blog/first-post">First Post</Link>
        </nav>
    );
}
```bash

### Programmatic Navigation

```javascript
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    
    const handleLogin = () => {
        // After login logic
        router.push('/dashboard');
    };
    
    return <button onClick={handleLogin}>Login</button>;
}
```bash

## Image Optimization

```javascript
import Image from 'next/image';

export default function Avatar() {
    return (
        <Image
            src="/profile.jpg"
            alt="Profile"
            width={200}
            height={200}
            priority // Load immediately
            placeholder="blur" // Blur effect while loading
        />
    );
}
```bash

## Built-in Components

### 1. Head Component

Modify page metadata.

```javascript
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>My Next.js App</title>
                <meta name="description" content="Welcome to my app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>Content</main>
        </>
    );
}
```bash

### 2. Script Component

Load third-party scripts efficiently.

```javascript
import Script from 'next/script';

export default function Page() {
    return (
        <>
            <Script
                src="https://example.com/script.js"
                strategy="lazyOnload"
            />
            <div>Content</div>
        </>
    );
}
```bash

## Data Fetching

### getStaticProps (SSG)

Fetch data at build time.

```javascript
export default function Blog({ posts }) {
    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {
    const res = await fetch('https://api.example.com/posts');
    const posts = await res.json();
    
    return {
        props: { posts }
    };
}
```bash

### getServerSideProps (SSR)

Fetch data on each request.

```javascript
export default function Page({ data }) {
    return <div>{data.title}</div>;
}

export async function getServerSideProps(context) {
    const { req, res, query, params } = context;
    
    const data = await fetchData();
    
    return {
        props: { data }
    };
}
```bash

### SWR (Client-Side)

React Hooks library for data fetching.

```javascript
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

export default function Profile() {
    const { data, error, isLoading } = useSWR('/api/user', fetcher);
    
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    
    return <div>Hello {data.name}!</div>;
}
```bash

## Styling Options

### 1. CSS Modules

```javascript
// components/Button.module.css
.button {
    background: blue;
    color: white;
}

// components/Button.js
import styles from './Button.module.css';

export default function Button() {
    return <button className={styles.button}>Click me</button>;
}
```bash

### 2. Global Styles

```javascript
// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
```bash

### 3. CSS-in-JS (Styled JSX)

```javascript
export default function Home() {
    return (
        <>
            <div className="container">
                <h1>Hello World</h1>
            </div>
            
            <style jsx>{`
                .container {
                    padding: 20px;
                }
                h1 {
                    color: blue;
                }
            `}</style>
        </>
    );
}
```bash

### 4. Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```bash

```javascript
export default function Home() {
    return (
        <div className="bg-blue-500 text-white p-4">
            <h1 className="text-2xl font-bold">Hello World</h1>
        </div>
    );
}
```bash

## Environment Variables

```bash
# .env.local
DATABASE_URL=mongodb://localhost:27017
NEXT_PUBLIC_API_URL=https://api.example.com
```bash

```javascript
// Server-side only
const dbUrl = process.env.DATABASE_URL;

// Exposed to browser (NEXT_PUBLIC_ prefix)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```bash

## Middleware (Edge Functions)

```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    // Check authentication
    const token = request.cookies.get('token');
    
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*'
};
```bash

## Advantages

✅ **SEO Friendly** - Server-side rendering improves SEO  
✅ **Performance** - Automatic code splitting and optimization  
✅ **Developer Experience** - Hot reloading, TypeScript support  
✅ **Flexible Rendering** - Choose rendering strategy per page  
✅ **Built-in Routing** - File-based routing system  
✅ **API Routes** - Full-stack capabilities  
✅ **Image Optimization** - Automatic image optimization  
✅ **Zero Config** - Works out of the box  
✅ **Production Ready** - Battle-tested by major companies  
✅ **Great Documentation** - Comprehensive docs and examples

## Disadvantages

❌ **Build Times** - Can be slow for large sites (SSG)  
❌ **Learning Curve** - Need to understand rendering strategies  
❌ **Vendor Lock-in** - Best deployed on Vercel  
❌ **Dynamic Routing Complexity** - Complex for deeply nested routes  
❌ **SSR Costs** - Server-side rendering requires server resources

## Use Cases

1. **E-commerce Websites** - Product pages with SSG/ISR
2. **Blog and Content Sites** - SEO-optimized content
3. **Marketing Websites** - Landing pages with great performance
4. **Dashboard Applications** - User-specific data with SSR
5. **Documentation Sites** - Static content with search
6. **SaaS Applications** - Full-stack web applications
7. **Portfolio Websites** - Fast, optimized personal sites

## Popular Packages

| Package | Purpose |
|---------|---------|
| `next-auth` | Authentication |
| `next-i18next` | Internationalization |
| `next-seo` | SEO optimization |
| `swr` | Data fetching |
| `react-query` | Server state management |
| `next-pwa` | Progressive Web App |
| `@vercel/analytics` | Analytics |
| `next-themes` | Theme switching |

## Best Practices

1. **Use ISR** - For content that changes occasionally
2. **Optimize Images** - Always use Next.js Image component
3. **Code Splitting** - Use dynamic imports for large components
4. **Static First** - Prefer static generation when possible
5. **Environment Variables** - Use for configuration
6. **TypeScript** - Leverage type safety
7. **API Routes** - Build full-stack in one project
8. **SEO** - Add metadata to all pages
9. **Testing** - Write tests with Jest and React Testing Library
10. **Performance** - Monitor with Lighthouse and Web Vitals

## Who Uses Next.js?

Major companies using Next.js:

- **Netflix** - Marketing and landing pages
- **TikTok** - Web application
- **Twitch** - Creator dashboard
- **Nike** - E-commerce platform
- **Hulu** - Streaming service pages
- **GitHub** - Documentation site
- **Notion** - Marketing website
- **Auth0** - Documentation
- **Uber** - Developer portal
- **Starbucks** - Store locator

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```bash

### Other Platforms

- **AWS** - Amplify, EC2, Lambda
- **Google Cloud** - App Engine, Cloud Run
- **Azure** - App Service
- **Docker** - Containerized deployment
- **Node.js Server** - Self-hosted

## Resources

- **Official Website**: [nextjs.org](https://nextjs.org/)
- **Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub**: [github.com/vercel/next.js](https://github.com/vercel/next.js)
- **Examples**: [github.com/vercel/next.js/tree/canary/examples](https://github.com/vercel/next.js/tree/canary/examples)
- **Learn Next.js**: [nextjs.org/learn](https://nextjs.org/learn)

---

**Next.js** has revolutionized React development by providing a powerful framework that handles routing, rendering strategies, and optimization out of the box. It's the go-to choice for building modern, production-ready React applications with excellent performance and developer experience.
