# GraphQL — Introduction

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
- User guide: `Backend-Web/GraphQL/user-guide.md`
- Examples: `Backend-Web/GraphQL/examples/`
