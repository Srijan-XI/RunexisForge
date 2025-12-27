# GraphQL — User Guide

## Installation

### Node.js (Apollo Server)
```bash
npm install @apollo/server graphql
```

### Python (Strawberry or Graphene)
```bash
pip install strawberry-graphql
# or
pip install graphene
```

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
```

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
```

**Fetch a specific book:**
```graphql
query {
  book(title: "1984") {
    title
    author
  }
}
```

**Add a book (mutation):**
```graphql
mutation {
  addBook(title: "Fahrenheit 451", author: "Ray Bradbury") {
    title
    author
  }
}
```

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
```

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
```

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
```

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
```

Variables (sent separately):
```json
{
  "title": "1984"
}
```

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
```

---

## Subscriptions (real-time)

**Schema:**
```graphql
type Subscription {
  bookAdded: Book
}
```

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
```

**Client subscription:**
```graphql
subscription {
  bookAdded {
    title
    author
  }
}
```

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
```

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
```

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
```

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
```

---

## N+1 problem (use DataLoader)

```bash
npm install dataloader
```

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
```

---

## Best practices
- Use DataLoader to batch/cache database queries
- Implement pagination (cursor-based or offset)
- Add rate limiting and query depth limits
- Use fragments to avoid duplication
- Enable introspection only in dev

---

## References
- Docs: https://graphql.org/learn/
- Apollo Server: https://www.apollographql.com/docs/apollo-server/
- GraphQL Playground: https://github.com/graphql/graphql-playground
