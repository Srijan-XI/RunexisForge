# GraphQL

## Introduction

GraphQL is a query language for APIs that lets clients request exactly the data they need. It's an alternative to REST APIs.

## Why GraphQL?

- **Client-driven queries**: fetch only what you need, no over/under-fetching
- **Single endpoint**: one URL for all queries/mutations
- **Strongly typed**: schema defines all types and operations
- **Introspection**: clients can discover the API schema

## Key concepts

- **Schema**: defines types, queries, mutations, subscriptions
- **Query**: read data
- **Mutation**: write/update data
- **Subscription**: real-time updates (WebSocket)
- **Resolver**: function that fetches data for a field

## GraphQL vs REST

- GraphQL: flexible queries, one endpoint, typed schema
- REST: multiple endpoints, fixed responses, simpler caching

## When to use GraphQL

- Mobile/web apps that need flexible data fetching
- Aggregating data from multiple sources
- Real-time features (subscriptions)

## Where to go next

- Guide: `Backend-Web/GraphQL/GraphQL.md`
- Examples: `Backend-Web/GraphQL/examples/`

## User Guide

## Installation

### Node.js (Apollo Server)

```bash
npm install @apollo/server graphql
```bash

### Python (Strawberry or Graphene)

```bash
pip install strawberry-graphql
# or
pip install graphene
```bash

---

## Define a schema

**Node.js (Apollo Server):**

```javascript
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    book(title: String!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`;

const books = [
  { title: '1984', author: 'George Orwell' },
  { title: 'Brave New World', author: 'Aldous Huxley' },
];

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => books.find(b => b.title === args.title),
  },
  Mutation: {
    addBook: (parent, args) => {
      const newBook = { title: args.title, author: args.author };
      books.push(newBook);
      return newBook;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`GraphQL server ready at ${url}`);
});
```bash

---

## Query examples

**Fetch all books:**

```graphql
query {
  books {
    title
    author
  }
}
```bash

**Fetch a specific book:**

```graphql
query {
  book(title: "1984") {
    title
    author
  }
}
```bash

**Add a book (mutation):**

```graphql
mutation {
  addBook(title: "Fahrenheit 451", author: "Ray Bradbury") {
    title
    author
  }
}
```bash

---

## Nested queries (relations)

**Schema:**

```graphql
type Author {
  id: ID!
  name: String!
  books: [Book]
}

type Book {
  id: ID!
  title: String!
  author: Author
}

type Query {
  authors: [Author]
  author(id: ID!): Author
}
```bash

**Resolvers:**

```javascript
const resolvers = {
  Query: {
    authors: () => authorsData,
    author: (parent, args) => authorsData.find(a => a.id === args.id),
  },
  Author: {
    books: (parent) => booksData.filter(b => b.authorId === parent.id),
  },
  Book: {
    author: (parent) => authorsData.find(a => a.id === parent.authorId),
  },
};
```bash

**Query:**

```graphql
query {
  authors {
    name
    books {
      title
    }
  }
}
```bash

---

## Variables

Instead of hardcoding values in queries:

```graphql
query GetBook($title: String!) {
  book(title: $title) {
    title
    author
  }
}
```bash

Variables (sent separately):

```json
{
  "title": "1984"
}
```bash

---

## Fragments (reusable fields)

```graphql
fragment BookFields on Book {
  title
  author
}

query {
  books {
    ...BookFields
  }
}
```bash

---

## Subscriptions (real-time)

**Schema:**

```graphql
type Subscription {
  bookAdded: Book
}
```bash

**Resolver (with PubSub):**

```javascript
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Mutation: {
    addBook: (parent, args) => {
      const newBook = { title: args.title, author: args.author };
      books.push(newBook);
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
      return newBook;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};
```bash

**Client subscription:**

```graphql
subscription {
  bookAdded {
    title
    author
  }
}
```bash

---

## Error handling

**Throw errors in resolvers:**

```javascript
const { GraphQLError } = require('graphql');

const resolvers = {
  Query: {
    book: (parent, args) => {
      const book = books.find(b => b.title === args.title);
      if (!book) {
        throw new GraphQLError('Book not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      return book;
    },
  },
};
```bash

**Client receives:**

```json
{
  "errors": [
    {
      "message": "Book not found",
      "extensions": { "code": "NOT_FOUND" }
    }
  ]
}
```bash

---

## Authentication

**Add context to resolvers:**

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUserFromToken(token);
    return { user };
  },
});
```bash

**Check auth in resolvers:**

```javascript
const resolvers = {
  Query: {
    me: (parent, args, context) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }
      return context.user;
    },
  },
};
```bash

---

## N+1 problem (use DataLoader)

```bash
npm install dataloader
```bash

**Create a DataLoader:**

```javascript
const DataLoader = require('dataloader');

const authorLoader = new DataLoader(async (ids) => {
  const authors = await fetchAuthorsByIds(ids);
  return ids.map(id => authors.find(a => a.id === id));
});

const resolvers = {
  Book: {
    author: (parent, args, { authorLoader }) => {
      return authorLoader.load(parent.authorId);
    },
  },
};
```bash

---

## Best practices

- Use DataLoader to batch/cache database queries
- Implement pagination (cursor-based or offset)
- Add rate limiting and query depth limits
- Use fragments to avoid duplication
- Enable introspection only in dev

---

## Advanced Schema Design

### Interfaces

Define common fields for multiple types:

```graphql
interface Node {
  id: ID!
  createdAt: DateTime!
}

type Article implements Node {
  id: ID!
  createdAt: DateTime!
  title: String!
  body: String!
  author: User!
}

type Comment implements Node {
  id: ID!
  createdAt: DateTime!
  text: String!
  author: User!
}

type Query {
  node(id: ID!): Node
}
```

**Resolvers:**

```javascript
const resolvers = {
  Node: {
    __resolveType(obj) {
      if (obj.title) return 'Article';
      if (obj.text) return 'Comment';
      return null;
    },
  },
  Query: {
    node: (parent, { id }) => {
      // Return article or comment based on id
      return findNodeById(id);
    },
  },
};
```

### Union Types

Return one of several types:

```graphql
union SearchResult = Article | Comment | User

type Query {
  search(query: String!): [SearchResult]
}
```

**Resolvers:**

```javascript
const resolvers = {
  SearchResult: {
    __resolveType(obj) {
      if (obj.title) return 'Article';
      if (obj.text) return 'Comment';
      if (obj.email) return 'User';
      return null;
    },
  },
  Query: {
    search: (parent, { query }) => {
      return performSearch(query); // Returns mixed types
    },
  },
};
```

**Query:**

```graphql
query {
  search(query: "GraphQL") {
    __typename
    ... on Article {
      title
      author { name }
    }
    ... on Comment {
      text
    }
    ... on User {
      name
      email
    }
  }
}
```

### Custom Scalars

```javascript
const { GraphQLScalarType, Kind } = require('graphql');

const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'ISO-8601 date-time string',
  serialize(value) {
    return value.toISOString(); // Send to client
  },
  parseValue(value) {
    return new Date(value); // From client variable
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // From query literal
    }
    return null;
  },
});

const typeDefs = `#graphql
  scalar DateTime
  
  type Article {
    id: ID!
    title: String!
    publishedAt: DateTime
  }
`;

const resolvers = {
  DateTime: DateTimeScalar,
};
```

### Input Types

Reusable input structures for mutations:

```graphql
input CreateArticleInput {
  title: String!
  body: String!
  tags: [String!]
  publishedAt: DateTime
}

input UpdateArticleInput {
  title: String
  body: String
  tags: [String!]
}

type Mutation {
  createArticle(input: CreateArticleInput!): Article
  updateArticle(id: ID!, input: UpdateArticleInput!): Article
}
```

### Directives

**Built-in directives:**

```graphql
type User {
  name: String!
  email: String!
  ssn: String @deprecated(reason: "Use nationalId instead")
  nationalId: String
  profile: Profile @include(if: $withProfile)
  posts: [Post] @skip(if: $skipPosts)
}
```

**Custom directives:**

```javascript
const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');

class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

const typeDefs = `#graphql
  directive @upper on FIELD_DEFINITION
  
  type User {
    name: String! @upper
    email: String!
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    upper: UpperCaseDirective,
  },
});
```

## Advanced Pagination

### Cursor-based Pagination (Relay-style)

```graphql
type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type ArticleEdge {
  node: Article!
  cursor: String!
}

type ArticleConnection {
  edges: [ArticleEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type Query {
  articles(
    first: Int
    after: String
    last: Int
    before: String
  ): ArticleConnection
}
```

**Resolver:**

```javascript
const resolvers = {
  Query: {
    articles: async (parent, { first, after, last, before }) => {
      const limit = first || last || 10;
      let query = Article.query().orderBy('createdAt', 'desc');
      
      if (after) {
        const afterItem = await Article.query().findById(decodeCursor(after));
        query = query.where('createdAt', '<', afterItem.createdAt);
      }
      
      if (before) {
        const beforeItem = await Article.query().findById(decodeCursor(before));
        query = query.where('createdAt', '>', beforeItem.createdAt);
      }
      
      const articles = await query.limit(limit + 1);
      const hasMore = articles.length > limit;
      const edges = articles.slice(0, limit).map(article => ({
        node: article,
        cursor: encodeCursor(article.id),
      }));
      
      return {
        edges,
        pageInfo: {
          hasNextPage: hasMore && !!first,
          hasPreviousPage: !!after,
          startCursor: edges[0]?.cursor,
          endCursor: edges[edges.length - 1]?.cursor,
        },
        totalCount: await Article.query().count(),
      };
    },
  },
};

function encodeCursor(id) {
  return Buffer.from(id.toString()).toString('base64');
}

function decodeCursor(cursor) {
  return Buffer.from(cursor, 'base64').toString('utf-8');
}
```

**Query:**

```graphql
query {
  articles(first: 10, after: "eyJpZCI6MTB9") {
    edges {
      node {
        id
        title
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
```

## Performance Optimization

### Query Complexity Analysis

Prevent expensive queries:

```javascript
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    createComplexityLimitRule(1000, {
      onCost: (cost) => console.log('Query cost:', cost),
      formatErrorMessage: (cost) =>
        `Query too complex: ${cost}. Maximum allowed: 1000`,
    }),
  ],
});
```

### Query Depth Limiting

```javascript
const depthLimit = require('graphql-depth-limit');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(7)],
});
```

### Persistent Queries

```javascript
const { ApolloServer } = require('@apollo/server');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: new Map(), // Or use Redis
  },
});
```

**Client sends hash instead of full query:**

```http
POST /graphql
{
  "extensions": {
    "persistedQuery": {
      "version": 1,
      "sha256Hash": "abc123..."
    }
  }
}
```

### Batching with DataLoader (Advanced)

```javascript
const DataLoader = require('dataloader');

class Context {
  constructor() {
    this.loaders = {
      user: new DataLoader(this.batchUsers),
      posts: new DataLoader(this.batchPosts),
    };
  }
  
  async batchUsers(ids) {
    const users = await User.query().findByIds(ids);
    return ids.map(id => users.find(u => u.id === id));
  }
  
  async batchPosts(userIds) {
    const posts = await Post.query().whereIn('userId', userIds);
    return userIds.map(userId => 
      posts.filter(p => p.userId === userId)
    );
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => new Context(),
});

const resolvers = {
  Article: {
    author: (article, args, { loaders }) => {
      return loaders.user.load(article.authorId);
    },
  },
  User: {
    posts: (user, args, { loaders }) => {
      return loaders.posts.load(user.id);
    },
  },
};
```

## Security Best Practices

### Rate Limiting

```javascript
const { ApolloServerPluginLandingPageDisabled } = require('@apollo/server/plugin/disabled');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use('/graphql', limiter);
```

### Query Cost Analysis

```javascript
const costAnalysis = require('graphql-cost-analysis').default;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    costAnalysis({
      maximumCost: 1000,
      defaultCost: 1,
      multipliers: ['first', 'last'],
      onComplete: (cost) => {
        console.log('Query cost:', cost);
      },
    }),
  ],
});
```

### Field-level Authorization

```javascript
const { ForbiddenError } = require('@apollo/server');

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String! # Requires authentication
    ssn: String! # Requires admin role
  }
`;

const resolvers = {
  User: {
    email: (user, args, { currentUser }) => {
      if (!currentUser) {
        throw new ForbiddenError('Authentication required');
      }
      if (currentUser.id !== user.id && !currentUser.isAdmin) {
        throw new ForbiddenError('Not authorized');
      }
      return user.email;
    },
    ssn: (user, args, { currentUser }) => {
      if (!currentUser?.isAdmin) {
        throw new ForbiddenError('Admin access required');
      }
      return user.ssn;
    },
  },
};
```

### Input Validation

```javascript
const { UserInputError } = require('@apollo/server');
const validator = require('validator');

const resolvers = {
  Mutation: {
    createUser: (parent, { input }) => {
      if (!validator.isEmail(input.email)) {
        throw new UserInputError('Invalid email format', {
          invalidArgs: ['email'],
        });
      }
      
      if (input.password.length < 8) {
        throw new UserInputError('Password must be at least 8 characters', {
          invalidArgs: ['password'],
        });
      }
      
      // Create user...
    },
  },
};
```

## File Uploads

```javascript
const { ApolloServer } = require('@apollo/server');
const { GraphQLUpload } = require('graphql-upload');
const fs = require('fs');
const path = require('path');

const typeDefs = `#graphql
  scalar Upload
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }
  
  type Mutation {
    uploadFile(file: Upload!): File!
    uploadFiles(files: [Upload!]!): [File!]!
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const filepath = path.join(__dirname, 'uploads', filename);
      
      await new Promise((resolve, reject) => {
        stream
          .pipe(fs.createWriteStream(filepath))
          .on('finish', resolve)
          .on('error', reject);
      });
      
      return {
        filename,
        mimetype,
        encoding,
        url: `/uploads/${filename}`,
      };
    },
    
    uploadFiles: async (parent, { files }) => {
      return Promise.all(
        files.map(file => resolvers.Mutation.uploadFile(parent, { file }))
      );
    },
  },
};
```

**Client mutation:**

```graphql
mutation($file: Upload!) {
  uploadFile(file: $file) {
    filename
    url
  }
}
```

## Schema Federation (Microservices)

### Gateway

```javascript
const { ApolloServer } = require('@apollo/server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'users', url: 'http://localhost:4001/graphql' },
      { name: 'products', url: 'http://localhost:4002/graphql' },
      { name: 'reviews', url: 'http://localhost:4003/graphql' },
    ],
  }),
});

const server = new ApolloServer({ gateway });
```

### Subgraph (Users Service)

```javascript
const { ApolloServer } = require('@apollo/server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = `#graphql
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])
  
  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }
  
  type Query {
    user(id: ID!): User
    users: [User]
  }
`;

const resolvers = {
  User: {
    __resolveReference(ref) {
      return getUserById(ref.id);
    },
  },
  Query: {
    user: (parent, { id }) => getUserById(id),
    users: () => getAllUsers(),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
```

### Subgraph (Reviews Service)

```javascript
const typeDefs = `#graphql
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])
  
  type User @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }
  
  type Review {
    id: ID!
    rating: Int!
    comment: String
    user: User
  }
  
  type Query {
    review(id: ID!): Review
  }
`;

const resolvers = {
  User: {
    reviews(user) {
      return getReviewsByUserId(user.id);
    },
  },
  Query: {
    review: (parent, { id }) => getReviewById(id),
  },
};
```

## Real-time Subscriptions (Advanced)

### Server Setup with WebSocket

```javascript
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const express = require('express');
const http = require('http');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const typeDefs = `#graphql
  type Message {
    id: ID!
    user: String!
    content: String!
    timestamp: String!
  }
  
  type Query {
    messages: [Message]
  }
  
  type Mutation {
    sendMessage(user: String!, content: String!): Message
  }
  
  type Subscription {
    messageAdded: Message
    messageAddedByUser(user: String!): Message
  }
`;

const resolvers = {
  Mutation: {
    sendMessage: (parent, { user, content }) => {
      const message = {
        id: String(Date.now()),
        user,
        content,
        timestamp: new Date().toISOString(),
      };
      
      pubsub.publish('MESSAGE_ADDED', { messageAdded: message });
      pubsub.publish(`MESSAGE_BY_${user}`, { messageAddedByUser: message });
      
      return message;
    },
  },
  
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED']),
    },
    messageAddedByUser: {
      subscribe: (parent, { user }) => {
        return pubsub.asyncIterator([`MESSAGE_BY_${user}`]);
      },
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  
  const serverCleanup = useServer({ schema }, wsServer);
  
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  
  await server.start();
  app.use('/graphql', express.json(), expressMiddleware(server));
  
  httpServer.listen(4000, () => {
    console.log('Server ready at http://localhost:4000/graphql');
  });
}

startServer();
```

### Client Subscription (React)

```javascript
import { useSubscription, gql } from '@apollo/client';

const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    messageAdded {
      id
      user
      content
      timestamp
    }
  }
`;

function MessageFeed() {
  const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h3>New Message:</h3>
      <p>{data?.messageAdded.content}</p>
      <small>by {data?.messageAdded.user}</small>
    </div>
  );
}
```

## Testing Strategies

### Unit Testing Resolvers

```javascript
const { describe, it, expect } = require('@jest/globals');

describe('User resolver', () => {
  it('should get user by id', async () => {
    const mockUser = { id: '1', name: 'Alice' };
    const getUserById = jest.fn().mockResolvedValue(mockUser);
    
    const resolver = {
      Query: {
        user: (parent, { id }) => getUserById(id),
      },
    };
    
    const result = await resolver.Query.user(null, { id: '1' });
    
    expect(getUserById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockUser);
  });
});
```

### Integration Testing

```javascript
const { ApolloServer } = require('@apollo/server');
const { describe, it, expect, beforeAll } = require('@jest/globals');

describe('GraphQL API', () => {
  let server;
  
  beforeAll(async () => {
    server = new ApolloServer({ typeDefs, resolvers });
  });
  
  it('should fetch users', async () => {
    const result = await server.executeOperation({
      query: `
        query {
          users {
            id
            name
          }
        }
      `,
    });
    
    expect(result.errors).toBeUndefined();
    expect(result.data.users).toHaveLength(2);
  });
  
  it('should create user', async () => {
    const result = await server.executeOperation({
      query: `
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            id
            name
          }
        }
      `,
      variables: {
        input: {
          name: 'Bob',
          email: 'bob@example.com',
        },
      },
    });
    
    expect(result.errors).toBeUndefined();
    expect(result.data.createUser.name).toBe('Bob');
  });
});
```

### End-to-End Testing

```javascript
const request = require('supertest');

describe('GraphQL E2E', () => {
  it('should handle complete user flow', async () => {
    // Create user
    const createResponse = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            createUser(input: { name: "Alice", email: "alice@example.com" }) {
              id
              name
            }
          }
        `,
      });
    
    const userId = createResponse.body.data.createUser.id;
    
    // Fetch user
    const fetchResponse = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            user(id: "${userId}") {
              name
              email
            }
          }
        `,
      });
    
    expect(fetchResponse.body.data.user.name).toBe('Alice');
    
    // Update user
    await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateUser(id: "${userId}", input: { name: "Alice Updated" }) {
              name
            }
          }
        `,
      });
    
    // Delete user
    const deleteResponse = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            deleteUser(id: "${userId}")
          }
        `,
      });
    
    expect(deleteResponse.body.data.deleteUser).toBe(true);
  });
});
```

## Monitoring and Analytics

### Apollo Studio Integration

```javascript
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginUsageReporting } = require('@apollo/server/plugin/usageReporting');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginUsageReporting({
      sendVariableValues: { all: true },
      sendHeaders: { all: true },
    }),
  ],
});
```

### Custom Logging Plugin

```javascript
const loggingPlugin = {
  async requestDidStart(requestContext) {
    console.log('Request started:', requestContext.request.query);
    
    return {
      async didEncounterErrors(requestContext) {
        console.error('Errors:', requestContext.errors);
      },
      
      async willSendResponse(requestContext) {
        console.log('Response sent');
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [loggingPlugin],
});
```

### Performance Tracing

```javascript
const { ApolloServerPluginInlineTrace } = require('@apollo/server/plugin/inlineTrace');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginInlineTrace()],
});
```

## Advanced Tooling

### GraphQL Code Generator

```bash
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
```

**codegen.yml:**

```yaml
schema: schema.graphql
generates:
  ./src/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-resolvers
    config:
      contextType: ./context#Context
```

**Generate types:**

```bash
npx graphql-codegen
```

### GraphQL ESLint

```bash
npm install -D @graphql-eslint/eslint-plugin
```

**.eslintrc.js:**

```javascript
module.exports = {
  overrides: [
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/no-anonymous-operations': 'error',
        '@graphql-eslint/naming-convention': ['error', {
          types: 'PascalCase',
          FieldDefinition: 'camelCase',
        }],
      },
    },
  ],
};
```

## References

- Docs: <https://graphql.org/learn/>
- Apollo Server: <https://www.apollographql.com/docs/apollo-server/>
- GraphQL Playground: <https://github.com/graphql/graphql-playground>
- Apollo Federation: <https://www.apollographql.com/docs/federation/>
- DataLoader: <https://github.com/graphql/dataloader>
- GraphQL Tools: <https://www.graphql-tools.com/>
- GraphQL Code Generator: <https://www.graphql-code-generator.com/>

---

## See Also

- [REST API Alternative](../REST-API/REST-API.md)
- [gRPC for Performance](../gRPC/gRPC.md)
- [OpenAPI/Swagger Documentation](../OpenAPI-Swagger/OpenAPI-Swagger.md)

