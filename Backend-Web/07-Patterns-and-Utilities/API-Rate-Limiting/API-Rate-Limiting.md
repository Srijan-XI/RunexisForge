# API Rate Limiting - Best Practices

## Table of Contents
- [Introduction](#introduction)
- [Why Rate Limiting?](#why-rate-limiting)
- [Core Concepts](#core-concepts)
- [Rate Limiting Algorithms](#rate-limiting-algorithms)
- [Implementation Strategies](#implementation-strategies)
- [Storage Backends](#storage-backends)
- [Rate Limiting Patterns](#rate-limiting-patterns)
- [Response Headers](#response-headers)
- [Error Handling](#error-handling)
- [Rate Limiting by Different Criteria](#rate-limiting-by-different-criteria)
- [Dynamic Rate Limiting](#dynamic-rate-limiting)
- [Distributed Rate Limiting](#distributed-rate-limiting)
- [Platform-Specific Implementations](#platform-specific-implementations)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**Rate limiting** is a technique used to control the number of requests a client can make to an API within a specified time window. It's a critical component of API design that protects services from abuse, ensures fair resource distribution, and maintains service quality.

### Key Characteristics

- **Traffic Control**: Limits request frequency per client
- **Resource Protection**: Prevents system overload
- **Fairness**: Ensures equitable access for all users
- **Abuse Prevention**: Blocks malicious actors
- **Cost Management**: Controls infrastructure costs

### Rate Limiting Scope

| Scope | Description | Use Case |
|-------|-------------|----------|
| **User-Based** | Per authenticated user | Standard API usage |
| **IP-Based** | Per client IP address | Public endpoints, DDoS protection |
| **API Key** | Per API key/token | Third-party integrations |
| **Endpoint-Based** | Per API endpoint | Expensive operations |
| **Global** | Across entire API | System-wide protection |

---

## Why Rate Limiting?

### Benefits

✅ **Security**
- Prevent brute force attacks
- Mitigate DDoS attacks
- Block credential stuffing
- Prevent data scraping

✅ **Reliability**
- Prevent system overload
- Maintain SLA guarantees
- Ensure fair resource distribution
- Predictable performance

✅ **Cost Control**
- Limit infrastructure scaling
- Prevent unexpected bills
- Control third-party API usage
- Optimize resource utilization

✅ **Quality of Service**
- Prevent noisy neighbor problems
- Guarantee response times
- Maintain service availability
- Support SLA tiers

### Use Cases

- **Public APIs**: Protect against abuse
- **Freemium Models**: Enforce tier limits
- **Authentication Endpoints**: Prevent brute force
- **Resource-Intensive Operations**: Protect expensive endpoints
- **Third-Party Integrations**: Control external API usage
- **Scraping Prevention**: Block automated data extraction

---

## Core Concepts

### Rate Limit Components

```
┌─────────────────────────────────────────────────────────┐
│                   Rate Limit Configuration              │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Limit      │  │  Time Window │  │  Identifier  │  │
│  │   (count)    │  │   (period)   │  │  (who/what)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│       100              1 minute           API Key       │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│                   Request Processing                     │
│                                                         │
│  1. Extract identifier (IP, user ID, API key)           │
│  2. Check current count for time window                 │
│  3. If under limit: increment & allow                   │
│  4. If over limit: reject with 429 status              │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│                   Response Headers                       │
│                                                         │
│  X-RateLimit-Limit: 100                                │
│  X-RateLimit-Remaining: 73                             │
│  X-RateLimit-Reset: 1709856000                         │
│  Retry-After: 42                                       │
└─────────────────────────────────────────────────────────┘
```

### HTTP Status Codes

- **429 Too Many Requests**: Rate limit exceeded
- **503 Service Unavailable**: System-wide limit (optional)

### Standard Headers

```http
X-RateLimit-Limit: 100           # Maximum requests allowed
X-RateLimit-Remaining: 73        # Requests remaining in window
X-RateLimit-Reset: 1709856000    # Unix timestamp when limit resets
Retry-After: 42                  # Seconds until retry allowed
```

---

## Rate Limiting Algorithms

### 1. Fixed Window Counter

**How it works:**
- Requests counted per fixed time window (e.g., per minute)
- Counter resets at end of window

```javascript
// Fixed window implementation
class FixedWindowRateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.windows = new Map();
  }

  async isAllowed(key) {
    const now = Date.now();
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs;
    const windowKey = `${key}:${windowStart}`;

    const count = this.windows.get(windowKey) || 0;

    if (count >= this.limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: windowStart + this.windowMs
      };
    }

    this.windows.set(windowKey, count + 1);

    // Cleanup old windows
    this.cleanup(windowStart);

    return {
      allowed: true,
      remaining: this.limit - count - 1,
      resetAt: windowStart + this.windowMs
    };
  }

  cleanup(currentWindow) {
    for (const [key, _] of this.windows) {
      const windowStart = parseInt(key.split(':')[1]);
      if (windowStart < currentWindow - this.windowMs) {
        this.windows.delete(key);
      }
    }
  }
}

// Usage
const limiter = new FixedWindowRateLimiter(100, 60000); // 100 req/min
const result = await limiter.isAllowed('user123');
```

**Pros:**
- Simple implementation
- Memory efficient
- Easy to understand

**Cons:**
- Burst at window boundaries
- Not truly distributed
- Can allow 2x limit at boundary

### 2. Sliding Window Log

**How it works:**
- Stores timestamp of each request
- Counts requests within sliding time window

```javascript
class SlidingWindowLog {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.logs = new Map();
  }

  async isAllowed(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Get existing logs for this key
    let timestamps = this.logs.get(key) || [];

    // Remove timestamps outside window
    timestamps = timestamps.filter(ts => ts > windowStart);

    if (timestamps.length >= this.limit) {
      const oldestTimestamp = timestamps[0];
      return {
        allowed: false,
        remaining: 0,
        resetAt: oldestTimestamp + this.windowMs
      };
    }

    // Add current timestamp
    timestamps.push(now);
    this.logs.set(key, timestamps);

    return {
      allowed: true,
      remaining: this.limit - timestamps.length,
      resetAt: now + this.windowMs
    };
  }
}
```

**Pros:**
- Accurate sliding window
- No boundary issues
- Precise rate limiting

**Cons:**
- High memory usage (stores all timestamps)
- Not suitable for high-volume APIs
- Requires timestamp cleanup

### 3. Sliding Window Counter

**How it works:**
- Hybrid of fixed window and sliding window
- Uses weighted counter from current and previous windows

```javascript
class SlidingWindowCounter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.counters = new Map();
  }

  async isAllowed(key) {
    const now = Date.now();
    const currentWindow = Math.floor(now / this.windowMs);
    const previousWindow = currentWindow - 1;
    
    const currentKey = `${key}:${currentWindow}`;
    const previousKey = `${key}:${previousWindow}`;

    const currentCount = this.counters.get(currentKey) || 0;
    const previousCount = this.counters.get(previousKey) || 0;

    // Calculate position in current window (0 to 1)
    const windowPosition = (now % this.windowMs) / this.windowMs;

    // Weighted count: current + (previous * (1 - position))
    const estimatedCount = currentCount + previousCount * (1 - windowPosition);

    if (estimatedCount >= this.limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: (currentWindow + 1) * this.windowMs
      };
    }

    // Increment current window
    this.counters.set(currentKey, currentCount + 1);

    return {
      allowed: true,
      remaining: Math.floor(this.limit - estimatedCount - 1),
      resetAt: (currentWindow + 1) * this.windowMs
    };
  }
}
```

**Pros:**
- Memory efficient
- Smooth rate limiting
- No boundary burst

**Cons:**
- Approximate (not exact)
- Slightly complex logic

### 4. Token Bucket

**How it works:**
- Bucket starts with tokens
- Each request consumes token
- Tokens refilled at fixed rate

```javascript
class TokenBucket {
  constructor(capacity, refillRate, refillInterval = 1000) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.refillInterval = refillInterval;
    this.buckets = new Map();
  }

  async isAllowed(key, tokens = 1) {
    const now = Date.now();
    
    let bucket = this.buckets.get(key);
    
    if (!bucket) {
      bucket = {
        tokens: this.capacity,
        lastRefill: now
      };
      this.buckets.set(key, bucket);
    }

    // Calculate tokens to add based on time elapsed
    const timePassed = now - bucket.lastRefill;
    const refills = Math.floor(timePassed / this.refillInterval);
    const tokensToAdd = refills * this.refillRate;

    // Refill bucket (up to capacity)
    bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
    bucket.lastRefill += refills * this.refillInterval;

    // Check if enough tokens available
    if (bucket.tokens >= tokens) {
      bucket.tokens -= tokens;
      return {
        allowed: true,
        remaining: bucket.tokens
      };
    }

    return {
      allowed: false,
      remaining: bucket.tokens,
      retryAfter: Math.ceil((tokens - bucket.tokens) / this.refillRate) * this.refillInterval
    };
  }
}

// Usage
const bucket = new TokenBucket(100, 10, 1000); // 100 capacity, +10 tokens/second
const result = await bucket.isAllowed('user123');
```

**Pros:**
- Allows bursts within capacity
- Flexible refill rates
- Good for variable request sizes

**Cons:**
- More complex
- Requires state management
- Clock synchronization in distributed systems

### 5. Leaky Bucket

**How it works:**
- Requests added to queue
- Queue processed at fixed rate
- Overflow requests rejected

```javascript
class LeakyBucket {
  constructor(capacity, leakRate) {
    this.capacity = capacity;
    this.leakRate = leakRate; // requests per second
    this.buckets = new Map();
  }

  async isAllowed(key) {
    const now = Date.now();
    
    let bucket = this.buckets.get(key);
    
    if (!bucket) {
      bucket = {
        queue: [],
        lastLeak: now
      };
      this.buckets.set(key, bucket);
    }

    // Leak (process) requests
    const timePassed = (now - bucket.lastLeak) / 1000;
    const leaked = Math.floor(timePassed * this.leakRate);
    bucket.queue = bucket.queue.slice(leaked);
    bucket.lastLeak = now;

    // Check capacity
    if (bucket.queue.length >= this.capacity) {
      return {
        allowed: false,
        remaining: 0,
        retryAfter: Math.ceil(bucket.queue.length / this.leakRate)
      };
    }

    // Add to queue
    bucket.queue.push(now);

    return {
      allowed: true,
      remaining: this.capacity - bucket.queue.length
    };
  }
}
```

**Pros:**
- Smooth output rate
- Prevents bursts
- Good for rate-sensitive services

**Cons:**
- Adds latency (queuing)
- Complex state management
- Requires queue processing

---

## Implementation Strategies

### Middleware Pattern (Express.js)

```javascript
const rateLimit = require('express-rate-limit');

// Basic rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please retry after some time.',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

// Apply to all routes
app.use(limiter);

// Apply to specific routes
app.use('/api/', limiter);

// Different limits for different routes
const strictLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});

app.post('/api/auth/login', strictLimiter, loginHandler);
```

### Custom Middleware with Redis

```javascript
const Redis = require('ioredis');
const redis = new Redis();

function createRateLimiter(options) {
  const { limit, window, keyGenerator } = options;

  return async (req, res, next) => {
    const key = keyGenerator(req);
    const now = Date.now();
    const windowStart = now - window;

    try {
      // Use Redis sorted set for sliding window
      const multi = redis.multi();
      
      // Remove old entries
      multi.zremrangebyscore(key, 0, windowStart);
      
      // Count entries in window
      multi.zcard(key);
      
      // Add current request
      multi.zadd(key, now, `${now}-${Math.random()}`);
      
      // Set expiry
      multi.expire(key, Math.ceil(window / 1000));

      const results = await multi.exec();
      const count = results[1][1];

      const remaining = Math.max(0, limit - count - 1);
      const resetAt = now + window;

      // Set response headers
      res.set({
        'X-RateLimit-Limit': limit,
        'X-RateLimit-Remaining': remaining,
        'X-RateLimit-Reset': Math.ceil(resetAt / 1000)
      });

      if (count >= limit) {
        const retryAfter = Math.ceil((resetAt - now) / 1000);
        res.set('Retry-After', retryAfter);
        
        return res.status(429).json({
          error: 'Rate limit exceeded',
          retryAfter
        });
      }

      next();
    } catch (error) {
      // On error, allow request (fail open)
      console.error('Rate limit error:', error);
      next();
    }
  };
}

// Usage
const rateLimiter = createRateLimiter({
  limit: 100,
  window: 60000, // 1 minute
  keyGenerator: (req) => {
    return `ratelimit:${req.user?.id || req.ip}:${req.path}`;
  }
});

app.use('/api/', rateLimiter);
```

---

## Storage Backends

### 1. In-Memory (Single Server)

```javascript
// Simple Map-based storage
class MemoryStore {
  constructor() {
    this.hits = new Map();
    this.resetTime = new Map();
  }

  async increment(key) {
    const current = this.hits.get(key) || 0;
    this.hits.set(key, current + 1);
    return current + 1;
  }

  async decrement(key) {
    const current = this.hits.get(key) || 0;
    if (current > 0) {
      this.hits.set(key, current - 1);
    }
  }

  async resetKey(key) {
    this.hits.delete(key);
    this.resetTime.delete(key);
  }
}
```

**Pros:**
- Fast
- No external dependencies
- Simple

**Cons:**
- Not distributed
- Lost on restart
- Memory consumption

### 2. Redis (Distributed)

```javascript
const Redis = require('ioredis');
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

class RedisStore {
  async increment(key, ttl) {
    const count = await redis.incr(key);
    
    // Set TTL on first request
    if (count === 1) {
      await redis.expire(key, ttl);
    }
    
    return count;
  }

  async getResetTime(key) {
    const ttl = await redis.ttl(key);
    return Date.now() + (ttl * 1000);
  }
}

// Lua script for atomic operations
const rateLimitScript = `
  local key = KEYS[1]
  local limit = tonumber(ARGV[1])
  local window = tonumber(ARGV[2])
  local now = tonumber(ARGV[3])
  
  local count = redis.call('INCR', key)
  
  if count == 1 then
    redis.call('EXPIRE', key, window)
  end
  
  if count > limit then
    return {0, count - 1, window}
  else
    return {1, limit - count, redis.call('TTL', key)}
  end
`;

// Execute script
const result = await redis.eval(
  rateLimitScript,
  1,
  'ratelimit:user123',
  100,  // limit
  60,   // window in seconds
  Date.now()
);
```

**Pros:**
- Distributed
- Persistent
- High performance
- Atomic operations

**Cons:**
- External dependency
- Network latency
- Operational overhead

### 3. Database (PostgreSQL)

```sql
-- Rate limit table
CREATE TABLE rate_limits (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    window_start TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(key, window_start)
);

CREATE INDEX idx_rate_limits_key_window ON rate_limits(key, window_start);

-- Increment counter
INSERT INTO rate_limits (key, count, window_start)
VALUES ($1, 1, date_trunc('minute', NOW()))
ON CONFLICT (key, window_start)
DO UPDATE SET count = rate_limits.count + 1
RETURNING count;

-- Cleanup old windows
DELETE FROM rate_limits 
WHERE window_start < NOW() - INTERVAL '1 hour';
```

```javascript
// PostgreSQL implementation
class PostgresStore {
  async increment(key, windowMs) {
    const windowStart = new Date(Math.floor(Date.now() / windowMs) * windowMs);
    
    const result = await db.query(`
      INSERT INTO rate_limits (key, count, window_start)
      VALUES ($1, 1, $2)
      ON CONFLICT (key, window_start)
      DO UPDATE SET count = rate_limits.count + 1
      RETURNING count
    `, [key, windowStart]);
    
    return result.rows[0].count;
  }
}
```

**Pros:**
- Persistent
- Transactions
- Complex queries
- Existing infrastructure

**Cons:**
- Slower than Redis
- Database load
- Requires cleanup

---

## Rate Limiting Patterns

### 1. Tiered Rate Limiting

```javascript
const tierLimits = {
  free: { requests: 100, window: 60000 },
  basic: { requests: 1000, window: 60000 },
  premium: { requests: 10000, window: 60000 },
  enterprise: { requests: 100000, window: 60000 }
};

function getTierLimiter(tier) {
  const config = tierLimits[tier];
  
  return rateLimit({
    windowMs: config.window,
    max: config.requests,
    keyGenerator: (req) => `${tier}:${req.user.id}`
  });
}

// Apply based on user tier
app.use('/api/', (req, res, next) => {
  const tier = req.user.tier || 'free';
  const limiter = getTierLimiter(tier);
  limiter(req, res, next);
});
```

### 2. IP + User Combined Limiting

```javascript
// Limit by IP (prevent abuse)
const ipLimiter = rateLimit({
  windowMs: 60000,
  max: 1000,
  keyGenerator: (req) => req.ip
});

// Limit by user (fair usage)
const userLimiter = rateLimit({
  windowMs: 60000,
  max: 100,
  keyGenerator: (req) => req.user?.id || req.ip
});

// Apply both
app.use('/api/', ipLimiter, userLimiter);
```

### 3. Endpoint-Specific Limits

```javascript
const limits = {
  '/api/auth/login': { windowMs: 300000, max: 5 },    // 5 per 5 min
  '/api/search': { windowMs: 60000, max: 30 },        // 30 per minute
  '/api/upload': { windowMs: 3600000, max: 10 },      // 10 per hour
  '/api/users': { windowMs: 60000, max: 100 }         // 100 per minute
};

app.use((req, res, next) => {
  const config = limits[req.path] || { windowMs: 60000, max: 100 };
  const limiter = rateLimit(config);
  limiter(req, res, next);
});
```

### 4. Quota-Based Limiting

```javascript
// Monthly API quota
class QuotaLimiter {
  async checkQuota(userId) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const usage = await db.query(`
      SELECT COUNT(*) as count
      FROM api_calls
      WHERE user_id = $1 AND created_at >= $2
    `, [userId, startOfMonth]);
    
    const userQuota = await getUserQuota(userId);
    const used = parseInt(usage.rows[0].count);
    
    return {
      allowed: used < userQuota.monthly_limit,
      used,
      remaining: Math.max(0, userQuota.monthly_limit - used),
      resetAt: getNextMonthStart()
    };
  }
}
```

---

## Response Headers

### Standard Rate Limit Headers

```javascript
function setRateLimitHeaders(res, rateLimit) {
  res.set({
    // Maximum requests allowed in window
    'X-RateLimit-Limit': rateLimit.limit,
    
    // Requests remaining in current window
    'X-RateLimit-Remaining': Math.max(0, rateLimit.remaining),
    
    // Unix timestamp when limit resets
    'X-RateLimit-Reset': Math.ceil(rateLimit.resetAt / 1000),
    
    // Seconds until retry (when rate limited)
    'Retry-After': rateLimit.retryAfter || 60
  });
}

// Usage
app.use((req, res, next) => {
  const rateLimit = checkRateLimit(req);
  
  setRateLimitHeaders(res, rateLimit);
  
  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded',
      retryAfter: rateLimit.retryAfter
    });
  }
  
  next();
});
```

### RateLimit Header (Draft Standard)

```javascript
// Using new RateLimit header standard (IETF draft)
function setStandardRateLimitHeaders(res, rateLimit) {
  // Format: limit, remaining;window=W[, policy="..."]
  const window = Math.ceil(rateLimit.window / 1000);
  
  res.set({
    'RateLimit-Limit': rateLimit.limit,
    'RateLimit-Remaining': rateLimit.remaining,
    'RateLimit-Reset': Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
    'RateLimit': `limit=${rateLimit.limit}, remaining=${rateLimit.remaining}, reset=${window}`
  });
}
```

---

## Error Handling

### 429 Response Format

```javascript
// Standardized error response
function rateLimitError(req, res, rateLimit) {
  const error = {
    status: 429,
    error: 'Too Many Requests',
    message: 'You have exceeded the rate limit for this endpoint.',
    details: {
      limit: rateLimit.limit,
      window: 'per minute',
      retryAfter: rateLimit.retryAfter,
      resetAt: new Date(rateLimit.resetAt).toISOString(),
      documentation: 'https://api.example.com/docs/rate-limits'
    },
    requestId: req.id
  };
  
  res.status(429).json(error);
}
```

### Client-Side Retry Logic

```javascript
// Exponential backoff with rate limit awareness
async function apiCallWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // Check rate limit headers
      const remaining = parseInt(response.headers.get('X-RateLimit-Remaining'));
      const reset = parseInt(response.headers.get('X-RateLimit-Reset'));
      
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After')) || 60;
        
        if (attempt < maxRetries) {
          console.log(`Rate limited. Retrying after ${retryAfter} seconds...`);
          await sleep(retryAfter * 1000);
          continue;
        }
        
        throw new Error('Rate limit exceeded');
      }
      
      // Proactive slowdown if approaching limit
      if (remaining !== null && remaining < 10) {
        const resetTime = (reset * 1000) - Date.now();
        const delay = resetTime / remaining;
        await sleep(delay);
      }
      
      return response;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await sleep(delay);
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## Rate Limiting by Different Criteria

### 1. By IP Address

```javascript
const ipLimiter = rateLimit({
  keyGenerator: (req) => req.ip,
  windowMs: 60000,
  max: 100
});
```

### 2. By User ID

```javascript
const userLimiter = rateLimit({
  keyGenerator: (req) => req.user?.id || req.ip,
  windowMs: 60000,
  max: 1000
});
```

### 3. By API Key

```javascript
const apiKeyLimiter = rateLimit({
  keyGenerator: (req) => req.headers['x-api-key'],
  windowMs: 60000,
  max: 5000
});
```

### 4. Composite Key

```javascript
const compositeLimiter = rateLimit({
  keyGenerator: (req) => {
    const tier = req.user?.tier || 'free';
    const userId = req.user?.id || req.ip;
    const endpoint = req.path;
    return `${tier}:${userId}:${endpoint}`;
  },
  windowMs: 60000,
  max: (req) => {
    const tierLimits = { free: 100, premium: 10000 };
    return tierLimits[req.user?.tier || 'free'];
  }
});
```

---

## Dynamic Rate Limiting

### Based on System Load

```javascript
const os = require('os');

function getDynamicLimit() {
  const cpuUsage = os.loadavg()[0] / os.cpus().length;
  
  if (cpuUsage > 0.8) {
    return 50;  // Reduce limit under high load
  } else if (cpuUsage > 0.5) {
    return 100;
  } else {
    return 200; // Higher limit when system healthy
  }
}

const dynamicLimiter = rateLimit({
  windowMs: 60000,
  max: (req) => getDynamicLimit()
});
```

### Cost-Based Rate Limiting

```javascript
// Different endpoints have different "costs"
const endpointCosts = {
  '/api/search': 1,
  '/api/reports/generate': 10,
  '/api/ml/inference': 5
};

class CostBasedRateLimiter {
  constructor(budget, window) {
    this.budget = budget;
    this.window = window;
    this.usage = new Map();
  }

  async isAllowed(key, endpoint) {
    const cost = endpointCosts[endpoint] || 1;
    const usage = this.usage.get(key) || { spent: 0, resetAt: Date.now() + this.window };
    
    if (Date.now() > usage.resetAt) {
      usage.spent = 0;
      usage.resetAt = Date.now() + this.window;
    }
    
    if (usage.spent + cost > this.budget) {
      return {
        allowed: false,
        remaining: this.budget - usage.spent,
        resetAt: usage.resetAt
      };
    }
    
    usage.spent += cost;
    this.usage.set(key, usage);
    
    return {
      allowed: true,
      remaining: this.budget - usage.spent,
      resetAt: usage.resetAt
    };
  }
}
```

---

## Distributed Rate Limiting

### Redis-Based Distributed Limiter

```javascript
const Redis = require('ioredis');
const { RateLimiterRedis } = require('rate-limiter-flexible');

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  enableOfflineQueue: false
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 100,      // Number of requests
  duration: 60,     // Per 60 seconds
  blockDuration: 0  // Don't block, just reject
});

async function rateLimitMiddleware(req, res, next) {
  try {
    const key = req.user?.id || req.ip;
    const result = await rateLimiter.consume(key);
    
    res.set({
      'X-RateLimit-Limit': 100,
      'X-RateLimit-Remaining': result.remainingPoints,
      'X-RateLimit-Reset': new Date(Date.now() + result.msBeforeNext).toISOString()
    });
    
    next();
  } catch (error) {
    res.set({
      'X-RateLimit-Limit': 100,
      'X-RateLimit-Remaining': 0,
      'Retry-After': Math.ceil(error.msBeforeNext / 1000)
    });
    
    res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: Math.ceil(error.msBeforeNext / 1000)
    });
  }
}
```

---

## Platform-Specific Implementations

### Express.js

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const app = express();
const redis = new Redis();

const limiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:'
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,  // Don't count failed requests
  skip: (req) => req.path === '/health',  // Skip health checks
  keyGenerator: (req) => req.user?.id || req.ip
});

app.use(limiter);
```

### FastAPI (Python)

```python
from fastapi import FastAPI, Request, HTTPException
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

app = FastAPI()

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/api/data")
@limiter.limit("100/minute")
async def get_data(request: Request):
    return {"data": "value"}

# Custom key function
def get_user_id(request: Request):
    return request.state.user.id if hasattr(request.state, 'user') else request.client.host

@app.get("/api/user/data")
@limiter.limit("1000/minute", key_func=get_user_id)
async def get_user_data(request: Request):
    return {"data": "user_value"}
```

### ASP.NET Core (C#)

```csharp
using AspNetCoreRateLimit;

// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // Add rate limiting
    services.AddMemoryCache();
    services.Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"));
    services.AddInMemoryRateLimiting();
    services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
}

public void Configure(IApplicationBuilder app)
{
    app.UseIpRateLimiting();
    app.UseRouting();
    app.UseEndpoints(endpoints => endpoints.MapControllers());
}

// appsettings.json
{
  "IpRateLimiting": {
    "EnableEndpointRateLimiting": true,
    "StackBlockedRequests": false,
    "RealIpHeader": "X-Real-IP",
    "HttpStatusCode": 429,
    "GeneralRules": [
      {
        "Endpoint": "*",
        "Period": "1m",
        "Limit": 100
      },
      {
        "Endpoint": "*/api/auth/*",
        "Period": "15m",
        "Limit": 5
      }
    ]
  }
}
```

---

## Real-World Use Cases

### 1. Authentication Endpoint Protection

```javascript
// Strict rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  skipSuccessfulRequests: true, // Only count failed attempts
  keyGenerator: (req) => {
    // Limit by username to prevent distributed brute force
    return req.body.username || req.ip;
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many login attempts',
      message: 'Please try again after 15 minutes'
    });
  }
});

app.post('/api/auth/login', loginLimiter, loginHandler);
```

### 2. Public API with Tiered Access

```javascript
app.use('/api/', async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    // Anonymous: 10 requests/hour
    return rateLimit({ windowMs: 3600000, max: 10 })(req, res, next);
  }
  
  const tier = await getAPIKeyTier(apiKey);
  
  const limits = {
    free: { windowMs: 3600000, max: 1000 },
    pro: { windowMs: 3600000, max: 10000 },
    enterprise: { windowMs: 3600000, max: 100000 }
  };
  
  const limiter = rateLimit(limits[tier]);
  limiter(req, res, next);
});
```

### 3. GraphQL Rate Limiting by Query Complexity

```javascript
const { getComplexity, simpleEstimator } = require('graphql-query-complexity');

app.use('/graphql', async (req, res, next) => {
  const query = req.body.query;
  const complexity = getComplexity({
    schema,
    query,
    estimators: [simpleEstimator({ defaultComplexity: 1 })]
  });
  
  // Rate limit based on query complexity
  const key = req.user?.id || req.ip;
  const budget = await getComplexityBudget(key);
  
  if (budget.used + complexity > budget.limit) {
    return res.status(429).json({
      error: 'Query complexity budget exceeded',
      complexity,
      limit: budget.limit,
      used: budget.used
    });
  }
  
  await incrementBudget(key, complexity);
  next();
});
```

---

## Best Practices

### 1. Design Considerations

✅ **Set Appropriate Limits**
```javascript
// Consider:
// - API capacity
// - Expected usage patterns
// - Resource costs
// - User experience

const limits = {
  anonymous: 100,      // Public users
  authenticated: 1000, // Logged-in users
  premium: 10000       // Paying customers
};
```

✅ **Use Multiple Layers**
```javascript
// Layer 1: Global protection
app.use(rateLimit({ windowMs: 60000, max: 10000 }));

// Layer 2: Per-user limits
app.use('/api/', userRateLimit({ windowMs: 60000, max: 100 }));

// Layer 3: Endpoint-specific
app.post('/api/expensive', rateLimit({ windowMs: 60000, max: 10 }));
```

### 2. Implementation

✅ **Fail Open on Errors**
```javascript
// Don't block requests if rate limiter fails
try {
  await checkRateLimit(req);
} catch (error) {
  console.error('Rate limit check failed:', error);
  // Allow request to proceed
}
```

✅ **Use Appropriate Storage**
```javascript
// Development: In-memory
// Production: Redis/distributed

const store = process.env.NODE_ENV === 'production'
  ? new RedisStore({ client: redis })
  : new MemoryStore();
```

### 3. Monitoring

✅ **Log Rate Limit Events**
```javascript
const limiter = rateLimit({
  handler: (req, res) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      user: req.user?.id,
      endpoint: req.path,
      limit: req.rateLimit.limit
    });
    
    res.status(429).json({ error: 'Too Many Requests' });
  }
});
```

✅ **Track Metrics**
```javascript
// Prometheus metrics
const rateLimitCounter = new promClient.Counter({
  name: 'rate_limit_exceeded_total',
  help: 'Total number of rate limit violations',
  labelNames: ['endpoint', 'tier']
});

rateLimitCounter.inc({ 
  endpoint: req.path,
  tier: req.user?.tier || 'anonymous'
});
```

### 4. Communication

✅ **Document Rate Limits**
```markdown
## Rate Limits

| Tier | Requests/Hour | Burst |
|------|---------------|-------|
| Anonymous | 100 | 10 |
| Free | 1,000 | 50 |
| Pro | 10,000 | 200 |
| Enterprise | 100,000 | 1,000 |

### Headers
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Unix timestamp when limit resets
```

✅ **Provide Clear Error Messages**
```javascript
{
  "error": "Rate Limit Exceeded",
  "message": "You have made too many requests. Please slow down.",
  "documentation": "https://api.example.com/docs/rate-limits",
  "limit": 100,
  "remaining": 0,
  "resetAt": "2026-02-07T12:00:00Z",
  "retryAfter": 300
}
```

---

## Resources

### Libraries & Tools
- **express-rate-limit** (Node.js): https://github.com/nfriedly/express-rate-limit
- **rate-limiter-flexible** (Node.js): https://github.com/animir/node-rate-limiter-flexible
- **slowapi** (Python/FastAPI): https://github.com/laurents/slowapi
- **AspNetCoreRateLimit** (C#/.NET): https://github.com/stefanprodan/AspNetCoreRateLimit
- **rack-attack** (Ruby/Rails): https://github.com/rack/rack-attack

### Standards
- **IETF RateLimit Header Fields**: https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/
- **HTTP Status Code 429**: https://httpstatuses.com/429

### Articles
- **Stripe Rate Limiting**: https://stripe.com/blog/rate-limiters
- **CloudFlare Rate Limiting**: https://developers.cloudflare.com/waf/rate-limiting-rules/
- **Kong Rate Limiting**: https://docs.konghq.com/hub/kong-inc/rate-limiting/

---

**Last Updated**: February 2026  
**Version**: 1.0
