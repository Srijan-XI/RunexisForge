# Algolia - The Search-as-a-Service Platform

## Table of Contents
- [Introduction](#introduction)
- [Why Algolia?](#why-algolia)
- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
- [Index Management](#index-management)
- [Adding & Managing Records](#adding--managing-records)
- [Searching](#searching)
- [Filtering & Faceting](#filtering--faceting)
- [Ranking & Relevance](#ranking--relevance)
- [Typo Tolerance](#typo-tolerance)
- [Personalization](#personalization)
- [Query Suggestions](#query-suggestions)
- [Analytics](#analytics)
- [A/B Testing](#ab-testing)
- [Rules & Merchandising](#rules--merchandising)
- [Geo Search](#geo-search)
- [Security & API Keys](#security--api-keys)
- [InstantSearch Libraries](#instantsearch-libraries)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Introduction

**Algolia** is a hosted search-as-a-service platform designed to deliver instant, relevant search experiences. Built for developers, Algolia handles infrastructure, scaling, and optimization, allowing teams to focus on building great search UIs.

### Key Features
- **⚡ Blazing Fast** - Sub-100ms search latency worldwide
- **🌍 Global CDN** - Distributed infrastructure across 70+ data centers
- **🔍 Typo Tolerance** - Intelligent typo handling
- **🎯 AI-Powered Relevance** - Dynamic re-ranking
- **📊 Analytics** - Detailed search insights
- **🧪 A/B Testing** - Test ranking strategies
- **🎨 InstantSearch** - Pre-built UI components
- **🔒 Enterprise Security** - SOC 2, GDPR compliant
- **🤖 AI Recommendations** - Personalized results

### Architecture
- **Index** - Searchable collection of records
- **Record** - JSON object (max 10KB)
- **Replica** - Index copy with different settings
- **Synonym** - Search term equivalence
- **Rule** - Custom ranking/filtering logic

### Use Cases
- **E-Commerce** - Product search and discovery
- **Media** - Content and video search
- **SaaS** - In-app search
- **Marketplaces** - Listings search
- **Documentation** - Knowledge base search
- **Mobile Apps** - Fast mobile search

---

## Why Algolia?

### Advantages

✅ **Fully Managed**
- No infrastructure to maintain
- Auto-scaling
- 99.99% SLA uptime
- Global CDN

✅ **Developer Experience**
- Simple API
- 12+ official SDKs
- InstantSearch UI libraries
- Extensive documentation

✅ **Performance**
- Sub-100ms latency
- Optimized indexing
- Geo-distributed
- Real-time updates

✅ **Features**
- Advanced typo tolerance
- Personalization
- A/B testing
- Analytics dashboard
- AI-powered relevance
- Merchandising tools

### Algolia vs Competitors

| Feature | Algolia | Elasticsearch | Typesense | Meilisearch |
|---------|---------|---------------|-----------|-------------|
| **Hosting** | Hosted only | Self/Hosted | Self/Hosted | Self/Hosted |
| **Setup** | Very easy | Complex | Easy | Easy |
| **Performance** | Very fast | Fast | Very fast | Very fast |
| **UI Libraries** | ✅ Extensive | ❌ | ⚠️ Limited | ⚠️ Limited |
| **Analytics** | ✅ Built-in | ❌ | ❌ | ❌ |
| **A/B Testing** | ✅ | ❌ | ❌ | ❌ |
| **Personalization** | ✅ AI-powered | ⚠️ Manual | ❌ | ❌ |
| **Pricing** | Paid | Free/Paid | Free/Paid | Free/Paid |
| **Best For** | Production apps | Large datasets | Medium data | Small-medium |

---

## Getting Started

### Sign Up

```
https://www.algolia.com/users/sign_up
```

Free tier includes:
- 10,000 records
- 10,000 search requests/month
- Community support

### Dashboard

```
https://dashboard.algolia.com
```

Get your:
- **Application ID**
- **Admin API Key** (keep secret)
- **Search-Only API Key** (public)

### Quick Start (JavaScript)

```bash
npm install algoliasearch
```

```javascript
const algoliasearch = require('algoliasearch');

const client = algoliasearch('YourApplicationID', 'YourAdminAPIKey');
const index = client.initIndex('products');

// Add records
index.saveObjects([
  { objectID: '1', name: 'Laptop', price: 999.99 },
  { objectID: '2', name: 'Mouse', price: 29.99 }
]).then(({ objectIDs }) => {
  console.log(objectIDs);
});

// Search
index.search('laptop').then(({ hits }) => {
  console.log(hits);
});
```

---

## Core Concepts

### Application

An Algolia account can have multiple applications (environments):
- **Development** - For testing
- **Production** - For live traffic

### Index

Collection of records with search configuration:

```javascript
const index = client.initIndex('products');

// Get settings
index.getSettings().then((settings) => {
  console.log(settings);
});
```

### Records

JSON objects with unique `objectID`:

```json
{
  "objectID": "123",
  "name": "Gaming Laptop",
  "brand": "TechCorp",
  "price": 1299.99,
  "categories": ["Electronics", "Computers"],
  "rating": 4.5,
  "in_stock": true,
  "_geoloc": {
    "lat": 40.7128,
    "lng": -74.0060
  }
}
```

---

## Index Management

### Create Index

```javascript
// Index is created automatically when adding records
const index = client.initIndex('products');
```

### Configure Index Settings

```javascript
index.setSettings({
  searchableAttributes: [
    'name',
    'brand',
    'categories'
  ],
  attributesForFaceting: [
    'searchable(brand)',
    'searchable(categories)',
    'filterOnly(price)',
    'filterOnly(in_stock)'
  ],
  customRanking: [
    'desc(rating)',
    'desc(popularity)'
  ],
  replicas: [
    'products_price_asc',
    'products_price_desc'
  ]
}).then(() => {
  console.log('Settings updated');
});
```

### Replica Indices

Create replicas for different sorting:

```javascript
// Main index
const mainIndex = client.initIndex('products');

// Replica for price ascending
const replicaAsc = client.initIndex('products_price_asc');
replicaAsc.setSettings({
  ranking: [
    'asc(price)',
    'typo',
    'geo',
    'words',
    'filters',
    'proximity',
    'attribute',
    'exact',
    'custom'
  ]
});

// Replica for price descending
const replicaDesc = client.initIndex('products_price_desc');
replicaDesc.setSettings({
  ranking: [
    'desc(price)',
    'typo',
    'geo',
    'words',
    'filters',
    'proximity',
    'attribute',
    'exact',
    'custom'
  ]
});
```

### Copy/Move Index

```javascript
// Copy index
client.copyIndex('source_index', 'destination_index').wait();

// Move index (rename)
client.moveIndex('old_name', 'new_name').wait();
```

### Delete Index

```javascript
index.delete().then(() => {
  console.log('Index deleted');
});
```

---

## Adding & Managing Records

### Add Records

```javascript
// Single record
index.saveObject({
  objectID: '1',
  name: 'Gaming Laptop',
  price: 1299.99
});

// Multiple records
index.saveObjects([
  { objectID: '1', name: 'Laptop', price: 999.99 },
  { objectID: '2', name: 'Mouse', price: 29.99 }
]);

// Auto-generate objectID
index.saveObjects([
  { name: 'Keyboard', price: 79.99 }
], { autoGenerateObjectIDIfNotExist: true });
```

### Update Records

```javascript
// Partial update
index.partialUpdateObject({
  objectID: '1',
  price: 899.99
});

// Partial update (create if not exists)
index.partialUpdateObject({
  objectID: '1',
  price: 899.99
}, { createIfNotExists: true });
```

### Get Records

```javascript
// Get by objectID
index.getObject('1').then((object) => {
  console.log(object);
});

// Get multiple
index.getObjects(['1', '2', '3']).then(({ results }) => {
  console.log(results);
});
```

### Delete Records

```javascript
// Delete single
index.deleteObject('1');

// Delete multiple
index.deleteObjects(['1', '2', '3']);

// Delete by query
index.deleteBy({
  filters: 'category:discontinued'
});
```

### Batch Operations

```javascript
index.batch([
  { action: 'addObject', body: { name: 'Product 1' }},
  { action: 'updateObject', body: { objectID: '2', price: 99.99 }},
  { action: 'deleteObject', body: { objectID: '3' }}
]);
```

---

## Searching

### Basic Search

```javascript
index.search('laptop').then(({ hits }) => {
  console.log(hits);
});
```

### Advanced Search

```javascript
index.search('gaming laptop', {
  filters: 'price < 1500 AND in_stock:true',
  facets: ['brand', 'category'],
  hitsPerPage: 20,
  page: 0,
  attributesToRetrieve: ['name', 'price', 'image'],
  attributesToHighlight: ['name', 'description'],
  getRankingInfo: true
}).then(({ hits, facets, nbHits }) => {
  console.log(hits);
  console.log(facets);
});
```

### Search Multiple Indices

```javascript
client.multipleQueries([
  { indexName: 'products', query: 'laptop' },
  { indexName: 'articles', query: 'laptop' }
]).then(({ results }) => {
  console.log(results);
});
```

### Search for Facet Values

```javascript
index.searchForFacetValues('brand', 'app', {
  filters: 'category:Electronics'
}).then(({ facetHits }) => {
  console.log(facetHits);
});
```

---

## Filtering & Faceting

### Numeric Filters

```javascript
index.search('laptop', {
  filters: 'price >= 500 AND price <= 1500'
});
```

### Tag Filters

```javascript
index.search('laptop', {
  tagFilters: ['electronics', 'computers']
});
```

### Facet Filters

```javascript
index.search('laptop', {
  facetFilters: [
    'category:Electronics',
    ['brand:Apple', 'brand:Dell']  // OR
  ]
});
```

### Faceting

```javascript
// Configure facets
index.setSettings({
  attributesForFaceting: [
    'searchable(brand)',
    'searchable(category)',
    'price'
  ]
});

// Search with facets
index.search('', {
  facets: ['brand', 'category']
}).then(({ facets }) => {
  console.log(facets);
  // {
  //   brand: { Apple: 10, Dell: 15, HP: 8 },
  //   category: { Electronics: 45, Accessories: 12 }
  // }
});
```

---

## Ranking & Relevance

### Ranking Formula

Algolia uses these criteria (in order):

1. **Typo** - Fewer typos = higher rank
2. **Geo** - Closer distance = higher rank
3. **Words** - More query words matched = higher rank
4. **Filters** - Matched filters = higher rank
5. **Proximity** - Words closer together = higher rank
6. **Attribute** - Earlier attribute = higher rank
7. **Exactness** - Exact matches = higher rank
8. **Custom** - Your custom ranking attributes

### Custom Ranking

```javascript
index.setSettings({
  customRanking: [
    'desc(popularity)',
    'desc(rating)',
    'asc(price)'
  ]
});
```

### Optional Filters

```javascript
// Boost results matching optional filters
index.search('laptop', {
  optionalFilters: [
    'brand:Apple<score=2>',
    'category:Electronics<score=1>'
  ]
});
```

---

## Typo Tolerance

### Automatic Typo Tolerance

```javascript
// "laptap" matches "laptop"
index.search('laptap');
```

### Configure Typo Tolerance

```javascript
index.setSettings({
  typoTolerance: 'min',  // 'true', 'false', 'min', 'strict'
  minWordSizefor1Typo: 4,
  minWordSizefor2Typos: 8,
  allowTyposOnNumericTokens: false,
  disableTypoToleranceOnAttributes: ['brand'],
  disableTypoToleranceOnWords: ['apple', 'samsung']
});
```

---

## Personalization

### Enable Personalization

```javascript
// Set user token
index.search('laptop', {
  userToken: 'user_123'
});

// Track events
const insights = require('search-insights');
insights('init', {
  appId: 'YourApplicationID',
  apiKey: 'YourSearchAPIKey'
});

insights('clickedObjectIDsAfterSearch', {
  userToken: 'user_123',
  eventName: 'Product Clicked',
  index: 'products',
  queryID: 'query_123',
  objectIDs: ['product_1']
});
```

### Personalization Strategy

```javascript
index.setSettings({
  enablePersonalization: true
});

// Configure in dashboard
// Dashboard > Personalization > Strategy
```

---

## Query Suggestions

### Create Query Suggestions Index

```javascript
// Generate from source index
client.generateSecuredApiKey('YourSearchAPIKey', {
  validUntil: Math.floor(Date.now() / 1000) + 3600
});

// Use pre-built Query Suggestions index
const suggestionsIndex = client.initIndex('products_query_suggestions');
```

### Implement Autocomplete

```javascript
suggestionsIndex.search('lap', {
  hitsPerPage: 5
}).then(({ hits }) => {
  console.log(hits.map(h => h.query));
  // ['laptop', 'laptop bag', 'laptop stand']
});
```

---

## Analytics

### Dashboard Analytics

Access in Algolia Dashboard:
- Search analytics
- Click analytics
- Conversion analytics
- Popular searches
- No results queries

### Track Conversions

```javascript
const insights = require('search-insights');

// Track conversion
insights('convertedObjectIDsAfterSearch', {
  userToken: 'user_123',
  eventName: 'Product Purchased',
  index: 'products',
  queryID: 'query_123',
  objectIDs: ['product_1']
});
```

### Get Analytics Data

```javascript
const analyticsClient = require('@algolia/client-analytics');
const analytics = analyticsClient('YourApplicationID', 'YourAdminAPIKey');

// Get top searches
analytics.getTopSearches('products').then((data) => {
  console.log(data);
});

// Get no results searches
analytics.getSearchesNoResults('products').then((data) => {
  console.log(data);
});
```

---

## A/B Testing

### Create A/B Test

```javascript
// Via API
client.request({
  method: 'POST',
  path: '/2/abtests',
  data: {
    name: 'Price Ranking Test',
    variants: [
      {
        index: 'products',
        trafficPercentage: 50,
        description: 'Control'
      },
      {
        index: 'products_variant',
        trafficPercentage: 50,
        description: 'Custom ranking by price'
      }
    ],
    endAt: '2024-12-31T23:59:59Z'
  }
});
```

---

## Rules & Merchandising

### Create Query Rule

```javascript
index.saveRule({
  objectID: 'brand-rule',
  conditions: [{
    pattern: '{facet:brand}',
    anchoring: 'contains'
  }],
  consequence: {
    params: {
      automaticFacetFilters: ['brand']
    }
  }
});

// Pin products
index.saveRule({
  objectID: 'summer-sale',
  conditions: [{
    pattern: 'summer sale',
    anchoring: 'is'
  }],
  consequence: {
    promote: [
      { objectID: 'product_1', position: 0 },
      { objectID: 'product_2', position: 1 }
    ]
  }
});

// Hide products
index.saveRule({
  objectID: 'hide-discontinued',
  conditions: [{
    pattern: 'laptop',
    anchoring: 'contains'
  }],
  consequence: {
    hide: [
      { objectID: 'discontinued_product' }
    ]
  }
});
```

---

## Geo Search

### Index with Geolocation

```javascript
index.saveObject({
  objectID: '1',
  name: 'Coffee Shop',
  _geoloc: {
    lat: 40.7128,
    lng: -74.0060
  }
});
```

### Search by Distance

```javascript
index.search('coffee', {
  aroundLatLng: '40.7128, -74.0060',
  aroundRadius: 5000  // 5km in meters
}).then(({ hits }) => {
  console.log(hits);
});
```

### Geo Ranking

```javascript
index.setSettings({
  ranking: [
    'geo',  // Prioritize proximity
    'typo',
    'words',
    'filters',
    'proximity',
    'attribute',
    'exact',
    'custom'
  ]
});
```

---

## Security & API Keys

### API Key Types

- **Admin API Key** - Full access (keep secret)
- **Search-Only API Key** - Public, read-only
- **Monitoring API Key** - Metrics access

### Generate Secured API Key

```javascript
// Frontend-safe key with restrictions
const securedApiKey = client.generateSecuredApiKey('YourSearchAPIKey', {
  filters: 'user_id:123',
  validUntil: Math.floor(Date.now() / 1000) + 3600  // 1 hour
});
```

### Rate Limiting

```javascript
const securedApiKey = client.generateSecuredApiKey('YourSearchAPIKey', {
  userToken: 'user_123',
  validUntil: Math.floor(Date.now() / 1000) + 3600
});
```

---

## InstantSearch Libraries

### React InstantSearch

```bash
npm install react-instantsearch algoliasearch
```

```jsx
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch';

const searchClient = algoliasearch('YourApplicationID', 'YourSearchAPIKey');

function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <SearchBox />
      <RefinementList attribute="brand" />
      <RefinementList attribute="category" />
      <Hits />
    </InstantSearch>
  );
}
```

### Vue InstantSearch

```bash
npm install vue-instantsearch algoliasearch
```

```vue
<template>
  <ais-instant-search :search-client="searchClient" index-name="products">
    <ais-search-box />
    <ais-refinement-list attribute="brand" />
    <ais-hits />
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';

export default {
  data() {
    return {
      searchClient: algoliasearch('YourApplicationID', 'YourSearchAPIKey')
    };
  }
};
</script>
```

---

## Real-World Use Cases

### E-Commerce Product Search

```javascript
// Index configuration
index.setSettings({
  searchableAttributes: [
    'name',
    'brand',
    'description',
    'categories'
  ],
  attributesForFaceting: [
    'searchable(brand)',
    'searchable(categories)',
    'filterOnly(price)',
    'filterOnly(in_stock)'
  ],
  customRanking: [
    'desc(popularity)',
    'desc(rating)'
  ],
  replicas: [
    'products_price_asc',
    'products_price_desc',
    'products_newest'
  ]
});

// Search with facets and filters
index.search('laptop', {
  filters: 'in_stock:true AND price < 2000',
  facets: ['brand', 'categories'],
  hitsPerPage: 20
});
```

---

## Best Practices

```yaml
✅ DO:
- Use secured API keys for frontend
- Implement faceted search
- Track analytics events
- Use InstantSearch libraries
- Set up replicas for different sorting
- Monitor search performance
- Test with A/B testing

❌ DON'T:
- Expose admin API key
- Store large binary data
- Index unnecessary attributes
- Ignore analytics insights
- Over-use custom ranking
```

---

## Troubleshooting

### Common Issues

```javascript
// Check index status
index.getSettings().then((settings) => {
  console.log(settings);
});

// Check API key permissions
client.getApiKey('YourAPIKey').then((key) => {
  console.log(key.acl);
});

// Debug search
index.search('query', {
  getRankingInfo: true
}).then(({ hits }) => {
  console.log(hits[0]._rankingInfo);
});
```

---

## Resources

### Official
- **Website:** https://www.algolia.com
- **Documentation:** https://www.algolia.com/doc/
- **Dashboard:** https://dashboard.algolia.com
- **Status:** https://status.algolia.com

### Community
- **Discourse:** https://discourse.algolia.com
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/algolia
- **GitHub:** https://github.com/algolia

### Learning
- **Academy:** https://academy.algolia.com
- **Blog:** https://www.algolia.com/blog/

---

## Conclusion

Algolia is a comprehensive, fully-managed search platform that delivers instant, relevant search experiences at scale. With built-in analytics, A/B testing, personalization, and merchandising tools, Algolia provides everything needed for production-grade search.

**Key Takeaways:**
- ⚡ Hosted, scalable infrastructure
- 🌍 Global CDN for low latency
- 🎨 Ready-made UI components
- 📊 Built-in analytics & insights
- 🧪 A/B testing capabilities
- 🤖 AI-powered personalization
- 🔒 Enterprise security

Perfect for e-commerce, media, SaaS, and any application requiring world-class search!
