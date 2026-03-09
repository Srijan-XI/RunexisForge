# API Versioning - Strategies & Best Practices

## Table of Contents
- [Introduction](#introduction)
- [Why API Versioning?](#why-api-versioning)
- [Versioning Strategies](#versioning-strategies)
- [URI Versioning](#uri-versioning)
- [Header Versioning](#header-versioning)
- [Query Parameter Versioning](#query-parameter-versioning)
- [Content Negotiation](#content-negotiation)
- [Semantic Versioning](#semantic-versioning)
- [Breaking vs Non-Breaking Changes](#breaking-vs-non-breaking-changes)
- [Version Lifecycle Management](#version-lifecycle-management)
- [Migration Strategies](#migration-strategies)
- [GraphQL Versioning](#graphql-versioning)
- [Platform-Specific Implementations](#platform-specific-implementations)
- [Real-World Examples](#real-world-examples)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**API versioning** is the practice of managing changes to an API in a way that maintains backward compatibility while allowing evolution and improvement. It's a critical aspect of API design that enables you to introduce new features, fix bugs, and improve performance without breaking existing client integrations.

### Key Characteristics

- **Backward Compatibility**: Old clients continue to work
- **Evolution**: APIs can improve over time
- **Client Control**: Clients choose when to upgrade
- **Documentation**: Clear version differences
- **Deprecation**: Controlled sunset of old versions

### Versioning Goals

| Goal | Description |
|------|-------------|
| **Stability** | Existing integrations remain functional |
| **Innovation** | Ability to introduce improvements |
| **Clarity** | Clear communication of changes |
| **Migration** | Smooth transition paths for clients |

---

## Why API Versioning?

### Benefits

✅ **Backward Compatibility**
- Existing clients aren't forced to update
- Gradual migration timelines
- Reduced breaking change impact
- Customer satisfaction

✅ **Controlled Evolution**
- Introduce improvements safely
- Test new features with subset of users
- Deprecate old functionality gracefully
- Maintain multiple supported versions

✅ **Clear Communication**
- Explicit version contracts
- Documented version differences
- Predictable change management
- Easier debugging and support

✅ **Business Continuity**
- No forced downtime for clients
- Planned migration windows
- Reduced support burden
- Better SLA management

### Use Cases

- **Public APIs**: Many external clients with different upgrade cycles
- **Mobile Apps**: Can't force immediate updates
- **Enterprise Integrations**: Long certification processes
- **Microservices**: Independent service evolution
- **Partner APIs**: Contractual SLAs
- **Gradual Rollouts**: A/B testing, canary releases

---

## Versioning Strategies

### Comparison of Versioning Approaches

| Strategy | Example | Pros | Cons | Best For |
|----------|---------|------|------|----------|
| **URI Path** | `/api/v1/users` | Simple, visible, cacheable | URL pollution | Most APIs |
| **URI Subdomain** | `v1.api.example.com` | Clean separation | DNS overhead | Large products |
| **Query Parameter** | `/api/users?version=1` | Optional versioning | Less discoverable | Optional features |
| **Header** | `X-API-Version: 1` | Clean URLs | Not visible, documentation needed | REST purists |
| **Content Negotiation** | `Accept: application/vnd.api+json; version=1` | REST compliant | Complex | Strict REST |
| **No Versioning** | `/api/users` | Simple | Breaking changes painful | GraphQL |

---

## URI Versioning

### Path-Based Versioning

Most common and straightforward approach.

```javascript
// Express.js example
const express = require('express');
const app = express();

// Version 1
app.get('/api/v1/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'John Doe' }
    ]
  });
});

// Version 2 - enhanced response
app.get('/api/v2/users', (req, res) => {
  res.json({
    users: [
      { 
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        createdAt: '2026-01-01T00:00:00Z'
      }
    ],
    metadata: {
      total: 1,
      page: 1
    }
  });
});

// Latest version alias
app.get('/api/users', (req, res) => {
  // Forward to latest version
  req.url = '/api/v2/users';
  app.handle(req, res);
});
```

### Subdomain Versioning

```javascript
// v1.api.example.com
// v2.api.example.com

const express = require('express');
const vhost = require('vhost');

const app = express();

// V1 app
const v1App = express();
v1App.get('/users', v1UsersHandler);

// V2 app
const v2App = express();
v2App.get('/users', v2UsersHandler);

// Mount on subdomains
app.use(vhost('v1.api.example.com', v1App));
app.use(vhost('v2.api.example.com', v2App));

// Latest version on main domain
app.use(vhost('api.example.com', v2App));
```

**Pros:**
- ✅ Clean URL structure
- ✅ Easy to route/load balance
- ✅ Independent deployment
- ✅ Clear separation

**Cons:**
- ❌ Requires DNS management
- ❌ SSL certificate per subdomain
- ❌ CORS complexity

---

## Header Versioning

### Custom Header

```javascript
// Client request
fetch('https://api.example.com/users', {
  headers: {
    'X-API-Version': '2',
    'Accept': 'application/json'
  }
});

// Server implementation
app.use((req, res, next) => {
  const version = req.headers['x-api-version'] || '2'; // Default to latest
  req.apiVersion = version;
  next();
});

app.get('/users', (req, res) => {
  switch (req.apiVersion) {
    case '1':
      return v1UsersHandler(req, res);
    case '2':
      return v2UsersHandler(req, res);
    default:
      return res.status(400).json({ error: 'Invalid API version' });
  }
});
```

### Accept Header (Content Negotiation)

```javascript
// Client request
fetch('https://api.example.com/users', {
  headers: {
    'Accept': 'application/vnd.myapi.v2+json'
  }
});

// Server implementation
app.get('/users', (req, res) => {
  const accept = req.headers.accept || '';
  
  if (accept.includes('application/vnd.myapi.v1+json')) {
    res.set('Content-Type', 'application/vnd.myapi.v1+json');
    return v1UsersHandler(req, res);
  } else if (accept.includes('application/vnd.myapi.v2+json')) {
    res.set('Content-Type', 'application/vnd.myapi.v2+json');
    return v2UsersHandler(req, res);
  } else {
    // Default to latest
    res.set('Content-Type', 'application/vnd.myapi.v2+json');
    return v2UsersHandler(req, res);
  }
});
```

**Pros:**
- ✅ Clean URLs
- ✅ RESTful
- ✅ Multiple versions per endpoint

**Cons:**
- ❌ Not visible in browser
- ❌ Harder to test/debug
- ❌ Requires documentation
- ❌ No HTTP caching by version

---

## Query Parameter Versioning

```javascript
// Client request
fetch('https://api.example.com/users?version=2');

// Server implementation
app.get('/users', (req, res) => {
  const version = req.query.version || '2';
  
  const handlers = {
    '1': v1UsersHandler,
    '2': v2UsersHandler
  };
  
  const handler = handlers[version];
  
  if (!handler) {
    return res.status(400).json({ 
      error: 'Unsupported API version',
      supportedVersions: ['1', '2']
    });
  }
  
  handler(req, res);
});
```

**Pros:**
- ✅ Simple to implement
- ✅ Optional (can default to latest)
- ✅ Easy to test

**Cons:**
- ❌ Pollutes query string
- ❌ Not RESTful
- ❌ Can conflict with other params
- ❌ Caching issues

---

## Content Negotiation

### Media Type Versioning

Following REST principles strictly.

```javascript
// Version in media type
app.get('/users', (req, res) => {
  const accept = req.headers.accept || 'application/json';
  
  // Parse media type
  const mediaType = parseMediaType(accept);
  
  switch (mediaType.version) {
    case '1':
      res.set('Content-Type', 'application/vnd.myapi.v1+json');
      return v1UsersHandler(req, res);
      
    case '2':
      res.set('Content-Type', 'application/vnd.myapi.v2+json');
      return v2UsersHandler(req, res);
      
    default:
      // Latest
      res.set('Content-Type', 'application/vnd.myapi.v2+json');
      return v2UsersHandler(req, res);
  }
});

function parseMediaType(accept) {
  const match = accept.match(/application\/vnd\.myapi\.v(\d+)\+json/);
  return {
    version: match ? match[1] : '2',
    format: 'json'
  };
}
```

### Full Content Negotiation Example

```javascript
// Support multiple formats and versions
app.get('/users', (req, res) => {
  const accept = req.headers.accept || 'application/json';
  
  // application/vnd.myapi.v1+json
  // application/vnd.myapi.v2+json
  // application/vnd.myapi.v1+xml
  
  const pattern = /application\/vnd\.myapi\.v(\d+)\+(json|xml)/;
  const match = accept.match(pattern);
  
  const version = match ? match[1] : '2';
  const format = match ? match[2] : 'json';
  
  const handlers = {
    '1': { json: v1JsonHandler, xml: v1XmlHandler },
    '2': { json: v2JsonHandler, xml: v2XmlHandler }
  };
  
  if (handlers[version] && handlers[version][format]) {
    res.set('Content-Type', `application/vnd.myapi.v${version}+${format}`);
    handlers[version][format](req, res);
  } else {
    res.status(406).json({ error: 'Not Acceptable' });
  }
});
```

**Pros:**
- ✅ RESTful (follows HTTP standards)
- ✅ Clean URLs
- ✅ Supports format negotiation
- ✅ Semantically correct

**Cons:**
- ❌ Complex to implement
- ❌ Not discoverable
- ❌ Harder to test
- ❌ Steep learning curve

---

## Semantic Versioning

### Version Number Format

```
MAJOR.MINOR.PATCH

Example: 2.3.1

MAJOR: Breaking changes (v1 → v2)
MINOR: New features, backward compatible (v2.1 → v2.2)
PATCH: Bug fixes, backward compatible (v2.2.0 → v2.2.1)
```

### API Version Semantics

```javascript
// Version mapping
const versions = {
  '1.0.0': { breaking: 'Initial release' },
  '1.1.0': { feature: 'Added pagination' },
  '1.1.1': { fix: 'Fixed timezone issue' },
  '2.0.0': { breaking: 'Changed response format' },
  '2.1.0': { feature: 'Added filtering' }
};

// Usually only major version in URL
app.get('/api/v2/users', (req, res) => {
  // Serves latest 2.x.x version
  res.json({
    version: '2.1.0',
    data: users
  });
});

// Full version in response
app.get('/api/version', (req, res) => {
  res.json({
    version: '2.1.0',
    supportedVersions: ['1.1.1', '2.1.0'],
    deprecatedVersions: ['1.0.0']
  });
});
```

### Version Header Response

```javascript
app.use((req, res, next) => {
  res.set('X-API-Version', '2.1.0');
  res.set('X-API-Supported-Versions', '1.1.1, 2.1.0');
  next();
});
```

---

## Breaking vs Non-Breaking Changes

### Breaking Changes (Require Major Version)

```javascript
// ❌ BREAKING: Changed field name
// v1
{ "name": "John Doe" }

// v2
{ "fullName": "John Doe" }  // Breaks v1 clients


// ❌ BREAKING: Changed data type
// v1
{ "id": 123 }

// v2
{ "id": "user-123" }  // String instead of number


// ❌ BREAKING: Removed field
// v1
{ "id": 1, "name": "John", "age": 30 }

// v2
{ "id": 1, "name": "John" }  // Removed 'age'


// ❌ BREAKING: Changed error format
// v1
{ "error": "User not found" }

// v2
{ "errors": [{ "code": "NOT_FOUND", "message": "User not found" }] }


// ❌ BREAKING: Required new parameter
// v1
GET /users  // Works

// v2
GET /users?orgId=123  // orgId now required
```

### Non-Breaking Changes (Minor/Patch Version)

```javascript
// ✅ NON-BREAKING: Add new optional field
// v1
{ "id": 1, "name": "John" }

// v1.1
{ "id": 1, "name": "John", "email": "john@example.com" }


// ✅ NON-BREAKING: Add new optional parameter
// v1
GET /users  // Works

// v1.1
GET /users?includeInactive=true  // Optional parameter


// ✅ NON-BREAKING: Add new endpoint
// v1.1
GET /users/:id/preferences  // New endpoint


// ✅ NON-BREAKING: Fix bug
// v1.0.1
// Fixed timezone bug in date parsing


// ✅ NON-BREAKING: Deprecate (but keep) field
// v1.2
{
  "id": 1,
  "name": "John",  // Deprecated, use firstName/lastName
  "firstName": "John",
  "lastName": "Doe"
}
```

### Maintaining Compatibility

```javascript
// Transform v1 to v2 internally
function getUsersV1(req, res) {
  const usersV2 = getUsersV2Data();
  
  // Transform v2 data to v1 format
  const usersV1 = usersV2.map(user => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    created: user.createdAt.split('T')[0]  // Date only for v1
  }));
  
  res.json({ users: usersV1 });
}

function getUsersV2(req, res) {
  const users = getUsersV2Data();
  
  res.json({
    users,
    metadata: {
      total: users.length,
      version: '2.0.0'
    }
  });
}
```

---

## Version Lifecycle Management

### Version States

```javascript
const versionStates = {
  'v1': {
    status: 'deprecated',
    sunsetDate: '2026-12-31',
    successor: 'v2',
    message: 'v1 will be sunset on Dec 31, 2026. Please migrate to v2.'
  },
  'v2': {
    status: 'current',
    releaseDate: '2026-01-01',
    message: 'Current stable version'
  },
  'v3': {
    status: 'beta',
    releaseDate: '2026-06-01',
    message: 'Beta version, subject to changes'
  }
};

app.use((req, res, next) => {
  const version = req.apiVersion;
  const versionInfo = versionStates[version];
  
  if (versionInfo) {
    res.set('X-API-Status', versionInfo.status);
    
    if (versionInfo.status === 'deprecated') {
      res.set('Sunset', versionInfo.sunsetDate);
      res.set('Link', `</api/${versionInfo.successor}>; rel="successor-version"`);
      
      // Add deprecation warning to response
      res.locals.deprecationWarning = versionInfo.message;
    }
  }
  
  next();
});
```

### Deprecation Notice

```javascript
app.get('/api/v1/users', (req, res) => {
  const response = {
    users: getUsers(),
    _deprecation: {
      message: 'API v1 is deprecated and will be sunset on 2026-12-31',
      sunset: '2026-12-31',
      migrationGuide: 'https://docs.example.com/migration/v1-to-v2',
      successor: 'v2'
    }
  };
  
  res.json(response);
});
```

### Version Discovery Endpoint

```javascript
app.get('/api/versions', (req, res) => {
  res.json({
    current: 'v2',
    supported: [
      {
        version: 'v1',
        status: 'deprecated',
        sunsetDate: '2026-12-31',
        endpoints: '/api/v1',
        documentation: 'https://docs.example.com/v1'
      },
      {
        version: 'v2',
        status: 'current',
        releaseDate: '2026-01-01',
        endpoints: '/api/v2',
        documentation: 'https://docs.example.com/v2'
      },
      {
        version: 'v3',
        status: 'beta',
        releaseDate: '2026-06-01',
        endpoints: '/api/v3',
        documentation: 'https://docs.example.com/v3/beta'
      }
    ]
  });
});
```

---

## Migration Strategies

### 1. Dual-Running Period

```javascript
// Run both versions simultaneously
const v1Router = express.Router();
const v2Router = express.Router();

// v1 routes
v1Router.get('/users', v1UsersHandler);
v1Router.post('/users', v1CreateUserHandler);

// v2 routes
v2Router.get('/users', v2UsersHandler);
v2Router.post('/users', v2CreateUserHandler);

// Mount both versions
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// Monitor usage
app.use((req, res, next) => {
  metrics.increment('api.version', {
    version: req.baseUrl.includes('/v1') ? 'v1' : 'v2',
    endpoint: req.path
  });
  next();
});
```

### 2. Feature Flags for Gradual Rollout

```javascript
// Gradual v2 rollout with feature flags
app.get('/api/users', async (req, res) => {
  const userId = req.user?.id;
  
  // Check if user is in v2 rollout
  const useV2 = await featureFlags.isEnabled('api-v2', userId);
  
  if (useV2) {
    return v2UsersHandler(req, res);
  } else {
    return v1UsersHandler(req, res);
  }
});
```

### 3. Adapter Pattern

```javascript
// Convert v1 requests to v2 internally
class V1ToV2Adapter {
  async getUsers(req) {
    // Call v2 service
    const v2Response = await v2Service.getUsers({
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      filters: this.convertFilters(req.query)
    });
    
    // Transform v2 to v1 format
    return {
      users: v2Response.data.map(this.transformUser),
      total: v2Response.metadata.total
    };
  }
  
  transformUser(v2User) {
    return {
      id: v2User.id,
      name: `${v2User.firstName} ${v2User.lastName}`,
      email: v2User.email,
      created: v2User.createdAt.split('T')[0]
    };
  }
}

const adapter = new V1ToV2Adapter();

app.get('/api/v1/users', async (req, res) => {
  const response = await adapter.getUsers(req);
  res.json(response);
});
```

### 4. Automated Migration Testing

```javascript
// Test that v1 and v2 produce compatible responses
describe('API Compatibility Tests', () => {
  it('v1 response should be valid subset of v2', async () => {
    const v1Response = await request(app).get('/api/v1/users');
    const v2Response = await request(app).get('/api/v2/users');
    
    // Check v1 fields exist in v2
    v1Response.body.users.forEach((v1User, index) => {
      const v2User = v2Response.body.users[index];
      
      expect(v2User.id).toBe(v1User.id);
      expect(`${v2User.firstName} ${v2User.lastName}`).toBe(v1User.name);
    });
  });
});
```

---

## GraphQL Versioning

GraphQL typically avoids traditional versioning through:

### 1. Schema Evolution

```graphql
type User {
  id: ID!
  name: String! @deprecated(reason: "Use firstName and lastName")
  firstName: String!
  lastName: String!
  email: String!
  # New fields added without breaking changes
  phoneNumber: String
  avatar: String
}

# New types added safely
type UserPreferences {
  theme: String
  language: String
}

type Query {
  user(id: ID!): User
  # Old query kept for compatibility
  userByEmail(email: String!): User @deprecated(reason: "Use user(id:) instead")
}
```

### 2. Field Deprecation

```javascript
// GraphQL resolver with deprecation handling
const resolvers = {
  User: {
    name: (user) => {
      // Log deprecation usage
      logger.warn('Deprecated field "name" accessed', { userId: user.id });
      return `${user.firstName} ${user.lastName}`;
    },
    firstName: (user) => user.firstName,
    lastName: (user) => user.lastName
  }
};
```

### 3. Nullable Fields for Evolution

```graphql
type User {
  id: ID!
  # Make new fields nullable for backward compatibility
  preferences: UserPreferences
  # Can later make required in major version
}
```

---

## Platform-Specific Implementations

### Express.js with Routing

```javascript
const express = require('express');
const app = express();

// Version-specific routers
const v1 = require('./routes/v1');
const v2 = require('./routes/v2');

// Mount version routers
app.use('/api/v1', v1);
app.use('/api/v2', v2);

// Default to latest
app.use('/api', v2);

// Version middleware
app.use((req, res, next) => {
  const version = req.baseUrl.match(/\/v(\d+)/)?.[1] || '2';
  req.apiVersion = version;
  res.set('X-API-Version', version);
  next();
});
```

### FastAPI (Python)

```python
from fastapi import FastAPI, APIRouter, Header
from typing import Optional

app = FastAPI()

# V1 router
v1_router = APIRouter(prefix="/api/v1", tags=["v1"])

@v1_router.get("/users")
def get_users_v1():
    return {"users": [{"id": 1, "name": "John Doe"}]}

# V2 router
v2_router = APIRouter(prefix="/api/v2", tags=["v2"])

@v2_router.get("/users")
def get_users_v2():
    return {
        "users": [
            {
                "id": 1,
                "firstName": "John",
                "lastName": "Doe",
                "email": "john@example.com"
            }
        ],
        "metadata": {"total": 1}
    }

app.include_router(v1_router)
app.include_router(v2_router)

# Header-based versioning
@app.get("/users")
def get_users(x_api_version: Optional[str] = Header(default="2")):
    if x_api_version == "1":
        return get_users_v1()
    else:
        return get_users_v2()
```

### ASP.NET Core

```csharp
using Microsoft.AspNetCore.Mvc;

// API Versioning package
services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(2, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
});

// V1 Controller
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsersV1() => Ok(new { users = GetUsersListV1() });
}

// V2 Controller
[ApiController]
[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class UsersV2Controller : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsersV2() => Ok(new
    {
        users = GetUsersListV2(),
        metadata = new { total = GetCount() }
    });
}
```

---

## Real-World Examples

### 1. GitHub API

```
# Version 3 (Header-based)
curl -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/users/octocat

# Beta features
curl -H "Accept: application/vnd.github.starfox-preview+json" \
  https://api.github.com/users/octocat
```

### 2. Stripe API

```
# Date-based versioning
curl https://api.stripe.com/v1/charges \
  -H "Stripe-Version: 2024-01-15"

# Latest version if not specified
curl https://api.stripe.com/v1/charges
```

### 3. Twitter API

```
# Version in URL
GET https://api.twitter.com/2/tweets/1234567890

# Legacy v1.1 still supported
GET https://api.twitter.com/1.1/statuses/show.json?id=1234567890
```

### 4. Google APIs

```
# Version in URL + service name
GET https://gmail.googleapis.com/gmail/v1/users/me/messages

GET https://www.googleapis.com/calendar/v3/calendars
```

---

## Best Practices

### 1. Choose the Right Strategy

✅ **Use URI Versioning for:**
- Public APIs
- Simple implementations
- Clear version visibility needed

✅ **Use Header Versioning for:**
- Clean URLs required
- RESTful purist approach
- Internal APIs

✅ **Use Content Negotiation for:**
- Strict REST compliance
- Multiple format support
- Complex scenarios

### 2. Version Planning

✅ **Plan for compatibility**
```javascript
// Design with future in mind
interface UserV1 {
  id: number;
  name: string;
}

interface UserV2 extends UserV1 {
  firstName: string;
  lastName: string;
  email: string;
}

// Can transform v1 from v2  data
```

✅ **Document breaking changes**
```markdown
## v2.0.0 Breaking Changes

### Response Format
- Changed `name` to `firstName` and `lastName`
- Added required `email` field
- Changed `id` from number to string

### Migration Guide
See [v1-to-v2-migration.md](./migration.md)
```

### 3. Communication

✅ **Clear sunset policy**
```javascript
// Deprecation timeline
const DEPRECATION_POLICY = {
  noticeMonths: 12,      // 12 months notice before sunset
  supportMonths: 24,     // Support version for 24 months
  sunsetGraceDays: 90    // 90 days after sunset before forced migration
};
```

✅ **Migration support**
```javascript
app.get('/api/v1/users', (req, res) => {
  res.set('Deprecation', 'true');
  res.set('Sunset', 'Sun, 31 Dec 2026 23:59:59 GMT');
  res.set('Link', '</api/v2/docs/migration>; rel="deprecation"');
  
  // ... handle request
});
```

### 4. Metrics & Monitoring

✅ **Track version usage**
```javascript
app.use((req, res, next) => {
  const version = extractVersion(req);
  
  metrics.increment('api.requests', {
    version,
    endpoint: req.path,
    method: req.method
  });
  
  next();
});
```

✅ **Alert on deprecated version usage**
```javascript
// Alert when deprecated versions still heavily used
if (metrics.get('api.requests.v1') > THRESHOLD) {
  alertOps('V1 API still receiving high traffic before sunset');
}
```

### 5. Testing

✅ **Test all supported versions**
```javascript
describe('API Versions', () => {
  ['v1', 'v2'].forEach(version => {
    describe(`Version ${version}`, () => {
      it('should return users', async () => {
        const response = await request(app).get(`/api/${version}/users`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
      });
    });
  });
});
```

✅ **Contract testing**
```javascript
// Ensure v1 contract still met
describe('V1 Contract', () => {
  it('should match v1 schema', async () => {
    const response = await request(app).get('/api/v1/users');
    const schema = require('./schemas/v1-users.json');
    expect(response.body).toMatchSchema(schema);
  });
});
```

---

## Resources

### Standards & Guidelines
- **Semantic Versioning**: https://semver.org/
- **HTTP Sunset Header**: https://datatracker.ietf.org/doc/html/rfc8594
- **API Evolution Best Practices**: https://tools.ietf.org/id/draft-wilde-api-evolution-00.html

### Libraries & Tools
- **express-api-version** (Node.js): https://www.npmjs.com/package/express-api-version
- **fastapi-versioning** (Python): https://github.com/DeanWay/fastapi-versioning
- **ASP.NET API Versioning** (.NET): https://github.com/dotnet/aspnet-api-versioning

### Articles & Guides
- **Roy Fielding on Versioning**: https://www.infoq.com/articles/roy-fielding-on-versioning/
- **Microsoft API Guidelines**: https://github.com/microsoft/api-guidelines
- **Google API Design Guide**: https://cloud.google.com/apis/design/versioning
- **Stripe API Versioning**: https://stripe.com/blog/api-versioning

### Books
- "RESTful Web APIs" by Richardson & Ruby
- "API Design Patterns" by JJ Geewax
- "Continuous API Management" by Medjaoui et al.

---

**Last Updated**: February 2026  
**Version**: 1.0
