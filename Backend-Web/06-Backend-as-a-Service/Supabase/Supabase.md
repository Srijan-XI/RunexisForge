# Supabase

## Introduction

Supabase is an open-source Firebase alternative that provides all the backend services you need to build a product: Postgres database, authentication, instant APIs, edge functions, realtime subscriptions, and storage. Built on top of proven open-source tools, Supabase gives you the power of a full backend with the simplicity of a Backend-as-a-Service (BaaS) platform.

Unlike Firebase, which uses proprietary NoSQL databases, Supabase is built on PostgreSQL—one of the world's most reliable and feature-rich relational databases. This means you get the benefits of SQL, ACID transactions, complex queries, and a mature ecosystem, combined with modern developer experience.

## When to Use Supabase

Supabase is ideal for:
- **Relational Data Models**: When your data has complex relationships (users, posts, comments, likes)
- **Open Source Requirements**: Need full control and avoid vendor lock-in
- **SQL Power Users**: Developers who want to leverage PostgreSQL features
- **Realtime Applications**: Chat apps, collaborative tools, live dashboards
- **Rapid Prototyping**: Get from idea to production in hours, not weeks
- **Self-Hosting**: Want to run your infrastructure or meet compliance requirements

## Core Features

### 1. PostgreSQL Database
Full-powered PostgreSQL database with:
- **ACID Transactions**: Data integrity guaranteed
- **Complex Queries**: JOINs, subqueries, window functions
- **Advanced Data Types**: JSON, arrays, ranges, full-text search
- **Row Level Security (RLS)**: Database-level access control
- **Triggers & Functions**: Business logic at the database level
- **Extensions**: PostGIS, pg_cron, uuid-ossp, and more

### 2. Auto-Generated APIs
Instant RESTful and GraphQL APIs:
- **REST API**: Automatically generated from your schema
- **GraphQL API**: Query exactly what you need (via pg_graphql)
- **Realtime API**: WebSocket subscriptions to database changes
- **PostgREST**: Fast, standards-compliant API layer

### 3. Authentication
Built-in auth with multiple providers:
- **Email/Password**: Traditional authentication
- **Magic Links**: Passwordless email login
- **OAuth Providers**: Google, GitHub, GitLab, Bitbucket, Azure, Apple, Facebook, Twitter, Discord, Twitch, Spotify, and more
- **Phone Auth**: SMS-based authentication
- **SAML SSO**: Enterprise single sign-on (Enterprise plan)
- **Row Level Security**: Database-enforced user permissions

### 4. Storage
S3-compatible object storage:
- **File Uploads**: Images, videos, documents
- **Image Transformations**: Resize, crop, optimize on-the-fly
- **Access Control**: Public or private buckets with RLS
- **CDN Integration**: Fast global content delivery
- **Resumable Uploads**: Handle large files reliably

### 5. Edge Functions
Serverless TypeScript functions:
- **Deno Runtime**: Secure, modern JavaScript/TypeScript
- **Global Deployment**: Run close to your users
- **Event Triggers**: Database events, webhooks, scheduled jobs
- **Native Supabase Integration**: Direct access to database and auth

### 6. Realtime
Subscribe to database changes:
- **Database Changes**: Listen to inserts, updates, deletes
- **Broadcast**: Send messages between connected clients
- **Presence**: Track online users in realtime
- **Low Latency**: WebSocket-based communication

---

## Getting Started

### Installation

#### JavaScript/TypeScript
```bash
npm install @supabase/supabase-js
```

#### Python
```bash
pip install supabase
```

#### Flutter/Dart
```bash
flutter pub add supabase_flutter
```

#### Swift (iOS)
```bash
pod 'Supabase'
```

### Initialize Client

#### JavaScript/TypeScript
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xyzcompany.supabase.co'
const supabaseKey = 'your-anon-key'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
```

#### Python
```python
from supabase import create_client, Client

url: str = "https://xyzcompany.supabase.co"
key: str = "your-anon-key"
supabase: Client = create_client(url, key)
```

---

## Database Operations

### Create Table (SQL)
```sql
create table posts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text,
  author_id uuid references auth.users not null,
  published boolean default false
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Allow users to read published posts
create policy "Public posts are visible to everyone"
  on posts for select
  using ( published = true );

-- Allow users to insert their own posts
create policy "Users can create posts"
  on posts for insert
  with check ( auth.uid() = author_id );

-- Allow users to update their own posts
create policy "Users can update own posts"
  on posts for update
  using ( auth.uid() = author_id );
```

### CRUD Operations (JavaScript)

#### Insert Data
```javascript
const { data, error } = await supabase
  .from('posts')
  .insert([
    { 
      title: 'Hello World', 
      content: 'This is my first post',
      author_id: userId 
    }
  ])
  .select()

if (error) console.error('Error:', error)
else console.log('Created:', data)
```

#### Read Data
```javascript
// Get all posts
const { data: posts, error } = await supabase
  .from('posts')
  .select('*')

// Get with filters
const { data: publishedPosts, error } = await supabase
  .from('posts')
  .select('*')
  .eq('published', true)
  .order('created_at', { ascending: false })

// Get with relationships (JOIN)
const { data: postsWithAuthors, error } = await supabase
  .from('posts')
  .select(`
    *,
    author:author_id (
      id,
      email,
      username
    )
  `)
```

#### Update Data
```javascript
const { data, error } = await supabase
  .from('posts')
  .update({ published: true })
  .eq('id', postId)
  .select()
```

#### Delete Data
```javascript
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId)
```

### Advanced Queries

#### Full-Text Search
```javascript
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .textSearch('content', 'supabase & postgres')
```

#### Pagination
```javascript
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .range(0, 9) // First 10 items (0-9)

// Next page
const { data: nextPage, error } = await supabase
  .from('posts')
  .select('*')
  .range(10, 19) // Second 10 items (10-19)
```

#### Count
```javascript
const { count, error } = await supabase
  .from('posts')
  .select('*', { count: 'exact', head: true })
```

---

## Authentication

### Email/Password Sign Up
```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword123',
  options: {
    data: {
      username: 'johndoe',
      full_name: 'John Doe'
    }
  }
})
```

### Email/Password Sign In
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword123'
})

// Access user and session
const user = data.user
const session = data.session
```

### OAuth Sign In
```javascript
// Google
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://example.com/auth/callback'
  }
})

// GitHub
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github'
})
```

### Magic Link (Passwordless)
```javascript
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'https://example.com/welcome'
  }
})
```

### Phone Auth (SMS)
```javascript
const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+1234567890'
})

// Verify OTP
const { data, error } = await supabase.auth.verifyOtp({
  phone: '+1234567890',
  token: '123456',
  type: 'sms'
})
```

### Get Current User
```javascript
const { data: { user } } = await supabase.auth.getUser()
```

### Sign Out
```javascript
const { error } = await supabase.auth.signOut()
```

### Listen to Auth Changes
```javascript
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
  
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session.user)
  }
  if (event === 'SIGNED_OUT') {
    console.log('User signed out')
  }
})
```

---

## Storage

### Create Bucket
```javascript
const { data, error } = await supabase.storage.createBucket('avatars', {
  public: true,
  fileSizeLimit: 1024 * 1024 * 2, // 2MB
  allowedMimeTypes: ['image/png', 'image/jpeg']
})
```

### Upload File
```javascript
const file = event.target.files[0]

const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`user-${userId}/${file.name}`, file, {
    cacheControl: '3600',
    upsert: false
  })
```

### Download File
```javascript
const { data, error } = await supabase.storage
  .from('avatars')
  .download('user-123/avatar.png')
```

### Get Public URL
```javascript
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('user-123/avatar.png')

console.log(data.publicUrl)
```

### Image Transformation
```javascript
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('user-123/photo.jpg', {
    transform: {
      width: 200,
      height: 200,
      resize: 'cover'
    }
  })
```

### Delete File
```javascript
const { data, error } = await supabase.storage
  .from('avatars')
  .remove(['user-123/old-avatar.png'])
```

---

## Realtime

### Subscribe to Database Changes
```javascript
// Subscribe to all changes in posts table
const channel = supabase
  .channel('posts-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

// Subscribe to specific events
const insertChannel = supabase
  .channel('posts-insert')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('New post:', payload.new)
    }
  )
  .subscribe()

// Unsubscribe
channel.unsubscribe()
```

### Broadcast (Client-to-Client)
```javascript
// Send message
const channel = supabase.channel('room-1')

channel.on('broadcast', { event: 'message' }, (payload) => {
  console.log('Received:', payload)
})

channel.subscribe(async (status) => {
  if (status === 'SUBSCRIBED') {
    await channel.send({
      type: 'broadcast',
      event: 'message',
      payload: { text: 'Hello!' }
    })
  }
})
```

### Presence (Track Online Users)
```javascript
const channel = supabase.channel('room-1')

channel
  .on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState()
    console.log('Online users:', state)
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    console.log('User joined:', key, newPresences)
  })
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    console.log('User left:', key, leftPresences)
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({ user_id: userId, online: true })
    }
  })
```

---

## Edge Functions

### Create Edge Function
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize project
supabase init

# Create function
supabase functions new hello-world
```

### Function Example (TypeScript)
```typescript
// supabase/functions/hello-world/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { name } = await req.json()
  
  // Access Supabase client
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  )
  
  // Query database
  const { data, error } = await supabase
    .from('greetings')
    .select('*')
  
  return new Response(
    JSON.stringify({ message: `Hello ${name}!`, data }),
    { headers: { "Content-Type": "application/json" } }
  )
})
```

### Deploy Function
```bash
supabase functions deploy hello-world
```

### Invoke Function
```javascript
const { data, error } = await supabase.functions.invoke('hello-world', {
  body: { name: 'World' }
})

console.log(data)
```

---

## Row Level Security (RLS)

### Enable RLS
```sql
alter table posts enable row level security;
```

### Policy Examples

#### Public Read, Authenticated Write
```sql
-- Anyone can read
create policy "Posts are visible to everyone"
  on posts for select
  using ( true );

-- Only authenticated users can insert
create policy "Authenticated users can create posts"
  on posts for insert
  to authenticated
  with check ( true );
```

#### User-Specific Data
```sql
-- Users can only see their own data
create policy "Users can view own posts"
  on posts for select
  using ( auth.uid() = author_id );

-- Users can only update their own data
create policy "Users can update own posts"
  on posts for update
  using ( auth.uid() = author_id );

-- Users can only delete their own data
create policy "Users can delete own posts"
  on posts for delete
  using ( auth.uid() = author_id );
```

#### Complex Conditions
```sql
-- Users can see public posts or their own private posts
create policy "Users can view authorized posts"
  on posts for select
  using (
    published = true 
    OR auth.uid() = author_id
  );
```

#### Using Functions in Policies
```sql
-- Create custom function
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from user_roles
    where user_id = auth.uid()
    and role = 'admin'
  );
$$ language sql security definer;

-- Use in policy
create policy "Admins can do anything"
  on posts for all
  using ( is_admin() );
```

---

## Real-World Use Cases

### 1. Social Media App
**Features**: Users, posts, likes, comments, followers
```sql
-- Users table (extends auth.users)
create table profiles (
  id uuid references auth.users primary key,
  username text unique,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default now()
);

-- Posts
create table posts (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references profiles not null,
  content text not null,
  image_url text,
  created_at timestamp with time zone default now()
);

-- Likes
create table likes (
  post_id uuid references posts on delete cascade,
  user_id uuid references profiles on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (post_id, user_id)
);

-- Followers
create table followers (
  follower_id uuid references profiles on delete cascade,
  following_id uuid references profiles on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (follower_id, following_id)
);

-- Get posts with like counts and user's like status
create view posts_with_likes as
select 
  p.*,
  count(l.user_id) as like_count,
  exists(
    select 1 from likes 
    where post_id = p.id 
    and user_id = auth.uid()
  ) as liked_by_user
from posts p
left join likes l on p.id = l.post_id
group by p.id;
```

### 2. SaaS Application with Teams
**Features**: Organizations, team members, role-based access
```sql
-- Organizations
create table organizations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  created_at timestamp with time zone default now()
);

-- Organization members
create table organization_members (
  organization_id uuid references organizations on delete cascade,
  user_id uuid references auth.users on delete cascade,
  role text check (role in ('owner', 'admin', 'member')),
  created_at timestamp with time zone default now(),
  primary key (organization_id, user_id)
);

-- Projects (belongs to organization)
create table projects (
  id uuid default uuid_generate_v4() primary key,
  organization_id uuid references organizations not null,
  name text not null,
  created_at timestamp with time zone default now()
);

-- RLS for projects
create policy "Organization members can view projects"
  on projects for select
  using (
    exists (
      select 1 from organization_members
      where organization_id = projects.organization_id
      and user_id = auth.uid()
    )
  );
```

### 3. Real-Time Chat Application
```javascript
// Subscribe to new messages
const channel = supabase
  .channel('room-' + roomId)
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `room_id=eq.${roomId}`
    },
    (payload) => {
      setMessages(prev => [...prev, payload.new])
    }
  )
  .subscribe()

// Track typing indicator
await channel.track({ 
  user_id: userId,
  typing: true 
})
```

### 4. E-commerce Platform
```sql
-- Products
create table products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  inventory_count integer default 0,
  created_at timestamp with time zone default now()
);

-- Orders
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  status text check (status in ('pending', 'paid', 'shipped', 'delivered')),
  total decimal(10,2) not null,
  created_at timestamp with time zone default now()
);

-- Order items
create table order_items (
  order_id uuid references orders on delete cascade,
  product_id uuid references products,
  quantity integer not null,
  price decimal(10,2) not null,
  primary key (order_id, product_id)
);

-- Function to create order with transaction
create or replace function create_order(
  items json
) returns uuid as $$
declare
  new_order_id uuid;
  item json;
begin
  -- Create order
  insert into orders (user_id, status, total)
  values (
    auth.uid(),
    'pending',
    (select sum((item->>'price')::decimal * (item->>'quantity')::integer)
     from json_array_elements(items) as item)
  )
  returning id into new_order_id;
  
  -- Add order items and update inventory
  for item in select * from json_array_elements(items)
  loop
    insert into order_items (order_id, product_id, quantity, price)
    values (
      new_order_id,
      (item->>'product_id')::uuid,
      (item->>'quantity')::integer,
      (item->>'price')::decimal
    );
    
    update products
    set inventory_count = inventory_count - (item->>'quantity')::integer
    where id = (item->>'product_id')::uuid;
  end loop;
  
  return new_order_id;
end;
$$ language plpgsql security definer;
```

---

## Migration from Firebase

### Data Migration

**Firestore to Postgres:**
```javascript
// Export from Firestore
const snapshot = await firebase.firestore().collection('users').get()
const users = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}))

// Import to Supabase
const { data, error } = await supabase
  .from('users')
  .insert(users)
```

### Auth Migration
```javascript
// Create users in Supabase
for (const user of firebaseUsers) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: user.email,
    email_confirm: true,
    user_metadata: {
      migrated_from: 'firebase',
      firebase_uid: user.uid
    }
  })
}
```

### Storage Migration
```bash
# Use Supabase CLI to migrate files
supabase storage cp firebase://bucket/path supabase://bucket/path
```

---

## Best Practices

### Database Design
1. **Use Primary Keys**: Always define primary keys (preferably UUID)
2. **Add Indexes**: Index foreign keys and frequently queried columns
3. **Enable RLS**: Secure tables with Row Level Security
4. **Use Constraints**: Enforce data integrity with CHECK, UNIQUE, NOT NULL
5. **Normalize Data**: Follow normalization principles (avoid duplication)

### Performance Optimization
1. **Pagination**: Always paginate large result sets
2. **Selective Queries**: Only select needed columns
3. **Index Strategy**: Create indexes for common queries
4. **Connection Pooling**: Use connection pooler for serverless
5. **Materialized Views**: Pre-compute expensive queries

### Security
1. **Enable RLS**: Never trust client-side security alone
2. **Validate Input**: Use constraints and triggers
3. **Secure Secrets**: Store API keys in environment variables
4. **Rate Limiting**: Implement in Edge Functions
5. **Audit Logs**: Track sensitive operations

### Realtime
1. **Filter Server-Side**: Use RLS to filter realtime events
2. **Limit Subscriptions**: Don't subscribe to too many channels
3. **Unsubscribe**: Clean up subscriptions on component unmount
4. **Handle Reconnects**: Implement reconnection logic

---

## Supabase vs Firebase

| Feature | Supabase | Firebase |
|---------|----------|----------|
| **Database** | PostgreSQL (SQL) | Firestore (NoSQL) |
| **Open Source** | Yes ✅ | No ❌ |
| **Self-Hosting** | Yes ✅ | No ❌ |
| **Complex Queries** | Excellent (SQL) | Limited |
| **Realtime** | Database changes | Document changes |
| **Auth Providers** | 15+ | 10+ |
| **Pricing** | More cost-effective | Can get expensive |
| **Learning Curve** | Moderate (SQL knowledge helpful) | Easy |
| **Vendor Lock-in** | Low | High |
| **Ecosystem** | Growing | Mature |

**Choose Supabase for:**
- Relational data models
- Complex queries and JOINs
- Open-source requirements
- SQL expertise
- Cost-sensitive projects

**Choose Firebase for:**
- Document-based data
- Google ecosystem integration
- Simpler mental model
- Mobile-first development

---

## Pricing (2026)

### Free Tier
- **Database**: 500 MB
- **Storage**: 1 GB
- **Bandwidth**: 2 GB
- **Edge Functions**: 500K invocations
- **Auth Users**: Unlimited
- **Realtime**: 200 concurrent connections

### Pro Tier ($25/month)
- **Database**: 8 GB (then $0.125/GB)
- **Storage**: 100 GB (then $0.021/GB)
- **Bandwidth**: 50 GB (then $0.09/GB)
- **Edge Functions**: 2M invocations (then $2/1M)
- **Daily Backups**: 7 days
- **Email Support**

### Team Tier ($599/month)
- **Everything in Pro**
- **Daily Backups**: 14 days
- **Priority Email Support**
- **SOC 2 Report**

### Enterprise (Custom)
- **Dedicated Infrastructure**
- **SLA Guarantees**
- **Custom Contracts**
- **Priority Support**
- **SAML SSO**

---

## Self-Hosting

### Docker Compose Setup
```bash
# Clone Supabase
git clone --depth 1 https://github.com/supabase/supabase

# Navigate to docker folder
cd supabase/docker

# Copy env file
cp .env.example .env

# Start Supabase
docker compose up -d

# Access:
# Studio: http://localhost:3000
# API: http://localhost:8000
# DB: postgresql://postgres:postgres@localhost:5432/postgres
```

### Update Self-Hosted Instance
```bash
# Pull latest images
docker compose pull

# Restart services
docker compose up -d
```

---

## CLI Usage

### Install CLI
```bash
npm install -g supabase
```

### Common Commands
```bash
# Login
supabase login

# Initialize project
supabase init

# Start local development
supabase start

# Create migration
supabase migration new create_posts_table

# Apply migrations
supabase db push

# Generate TypeScript types
supabase gen types typescript --local > types/supabase.ts

# Deploy edge function
supabase functions deploy my-function

# Link to remote project
supabase link --project-ref your-project-ref

# Pull remote schema
supabase db pull
```

---

## Resources

### Official Resources
- **Website**: <https://supabase.com>
- **Documentation**: <https://supabase.com/docs>
- **GitHub**: <https://github.com/supabase/supabase>
- **Blog**: <https://supabase.com/blog>
- **YouTube**: <https://youtube.com/c/supabase>

### Community
- **Discord**: <https://discord.supabase.com>
- **Twitter**: <https://twitter.com/supabase>
- **Dev.to**: <https://dev.to/supabase>

### Learning
- **PostgreSQL Tutorial**: <https://supabase.com/docs/guides/database>
- **Video Courses**: Official YouTube channel
- **Examples**: <https://github.com/supabase/supabase/tree/master/examples>

---

## Summary

Supabase is the open-source Firebase alternative that gives you the power of PostgreSQL with modern developer experience.

✅ **Open source and self-hostable**  
✅ **PostgreSQL database (SQL power)**  
✅ **Built-in authentication**  
✅ **Realtime subscriptions**  
✅ **Auto-generated APIs**  
✅ **Edge functions (Deno)**  
✅ **Row Level Security**  
✅ **Cost-effective pricing**  

**Perfect for developers who want SQL power with BaaS simplicity!**
