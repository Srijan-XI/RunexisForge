# Webhooks - Event-Driven HTTP Callbacks

## Table of Contents
- [Introduction](#introduction)
- [Why Webhooks?](#why-webhooks)
- [Core Concepts](#core-concepts)
- [Webhook Architecture](#webhook-architecture)
- [Implementation Patterns](#implementation-patterns)
- [Security](#security)
- [Payload Structure](#payload-structure)
- [Retry Logic & Reliability](#retry-logic--reliability)
- [Best Practices](#best-practices)
- [Testing Webhooks](#testing-webhooks)
- [Monitoring & Debugging](#monitoring--debugging)
- [Real-World Examples](#real-world-examples)
- [Webhooks vs Alternatives](#webhooks-vs-alternatives)
- [Resources](#resources)

---

## Introduction

Webhooks are user-defined HTTP callbacks that enable real-time, event-driven communication between applications. Instead of polling for changes, webhooks "push" data to your application when events occur, making them efficient for integrations and automation.

### Key Characteristics
- **Event-driven**: Triggered by specific events
- **Real-time**: Immediate notification delivery
- **HTTP-based**: Standard POST requests
- **Push model**: Server pushes data to clients
- **Asynchronous**: Non-blocking communication
- **Configurable**: Users define endpoints
- **Stateless**: Each request is independent
- **Retry-capable**: Failed deliveries can be retried

### Common Use Cases
- Payment processing notifications (Stripe, PayPal)
- Git repository events (GitHub, GitLab)
- CI/CD pipeline triggers
- Chat application integrations (Slack, Discord)
- E-commerce order updates
- CRM data synchronization
- Form submission notifications
- IoT device alerts

---

## Why Webhooks?

### Benefits

✅ **Real-Time Communication**
- Instant event notifications
- No polling delays
- Reduced latency
- Immediate action triggers

✅ **Efficiency**
- Less bandwidth consumption
- Reduced server load
- No unnecessary API calls
- Lower infrastructure costs

✅ **Scalability**
- Asynchronous processing
- Queue-based handling
- Independent of client polling
- Better resource utilization

✅ **Integration**
- Easy third-party integration
- Standard HTTP protocol
- Language-agnostic
- Widely supported

### Limitations

❌ **Challenges**
- Requires public endpoint
- Security considerations
- Potential for missing events
- Debugging complexity
- No built-in retry guarantees
- Order not guaranteed
- Endpoint availability requirements

---

## Core Concepts

### Webhook Flow

```
┌──────────┐         ┌──────────────┐         ┌───────────┐
│  Event   │ ─────>  │   Provider   │ ─────>  │  Webhook  │
│  Occurs  │         │   Platform   │  HTTP   │  Endpoint │
└──────────┘         └──────────────┘  POST   └───────────┘
                            │                       │
                            │                       ▼
                            │                  ┌───────────┐
                            │                  │  Process  │
                            │                  │   Event   │
                            │                  └───────────┘
                            │                       │
                            │                       ▼
                            │                  ┌───────────┐
                            │ <───────────────  │  Respond  │
                            │      200 OK       │  200 OK   │
                            └──────────────────>└───────────┘
```

### Key Components

1. **Provider**: Service that sends webhooks (GitHub, Stripe, etc.)
2. **Event**: Trigger that initiates webhook delivery
3. **Payload**: Data sent in HTTP POST body
4. **Endpoint**: URL that receives webhook requests
5. **Signature**: Cryptographic verification of authenticity
6. **Retry Logic**: Mechanism for handling failed deliveries

### Webhook Lifecycle

```
1. User registers webhook endpoint
2. Event occurs on provider platform
3. Provider constructs payload
4. Provider signs payload (HMAC)
5. Provider sends HTTP POST
6. Endpoint validates signature
7. Endpoint processes event
8. Endpoint responds 2xx
9. Provider logs delivery status
```

---

## Webhook Architecture

### Basic Architecture

```
┌─────────────────────────────────────────┐
│           Webhook Provider              │
│  ┌────────────┐      ┌──────────────┐  │
│  │   Event    │ ──>  │   Webhook    │  │
│  │   System   │      │   Dispatcher │  │
│  └────────────┘      └──────────────┘  │
└─────────────────────────────────────────┘
                 │
                 │ HTTPS POST
                 ▼
┌─────────────────────────────────────────┐
│          Your Application               │
│  ┌────────────┐      ┌──────────────┐  │
│  │  Webhook   │ ──>  │   Validator  │  │
│  │  Receiver  │      │   (HMAC)     │  │
│  └────────────┘      └──────────────┘  │
│         │                    │          │
│         ▼                    ▼          │
│  ┌────────────┐      ┌──────────────┐  │
│  │   Queue    │ ──>  │   Processor  │  │
│  │  (Async)   │      │   Worker     │  │
│  └────────────┘      └──────────────┘  │
└─────────────────────────────────────────┘
```

### Scalable Architecture

```
                  Load Balancer
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   Receiver 1     Receiver 2     Receiver 3
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                  Message Queue
                  (Redis/RabbitMQ)
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   Worker 1       Worker 2       Worker 3
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                   Database
```

---

## Implementation Patterns

### Basic Webhook Receiver (Node.js/Express)

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// Webhook endpoint
app.post('/webhooks/github', async (req, res) => {
    try {
        // 1. Verify signature
        const signature = req.headers['x-hub-signature-256'];
        const isValid = verifySignature(req.body, signature);
        
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid signature' });
        }
        
        // 2. Extract event type
        const eventType = req.headers['x-github-event'];
        
        // 3. Process asynchronously (return 200 immediately)
        res.status(200).json({ received: true });
        
        // 4. Process in background
        await processEvent(eventType, req.body);
        
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Verify HMAC signature
function verifySignature(payload, signatureHeader) {
    const secret = process.env.WEBHOOK_SECRET;
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(JSON.stringify(payload)).digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(digest),
        Buffer.from(signatureHeader)
    );
}

// Process event
async function processEvent(eventType, payload) {
    switch (eventType) {
        case 'push':
            await handlePushEvent(payload);
            break;
        case 'pull_request':
            await handlePullRequestEvent(payload);
            break;
        case 'issues':
            await handleIssueEvent(payload);
            break;
        default:
            console.log('Unhandled event:', eventType);
    }
}

app.listen(3000, () => {
    console.log('Webhook server running on port 3000');
});
```

### Queue-Based Processing (Node.js + Bull)

```javascript
const Queue = require('bull');
const webhookQueue = new Queue('webhooks', {
    redis: { host: 'localhost', port: 6379 }
});

// Receive webhook
app.post('/webhooks/stripe', async (req, res) => {
    const signature = req.headers['stripe-signature'];
    
    // Verify signature
    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        
        // Add to queue
        await webhookQueue.add({
            type: event.type,
            payload: event.data
        });
        
        res.status(200).json({ received: true });
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

// Process queue
webhookQueue.process(async (job) => {
    const { type, payload } = job.data;
    
    switch (type) {
        case 'payment_intent.succeeded':
            await handlePaymentSuccess(payload);
            break;
        case 'payment_intent.payment_failed':
            await handlePaymentFailure(payload);
            break;
        case 'customer.subscription.deleted':
            await handleSubscriptionCancellation(payload);
            break;
    }
});

// Retry configuration
webhookQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
    // Retry with exponential backoff
});
```

### Python Implementation (Flask)

```python
from flask import Flask, request, jsonify
import hmac
import hashlib
import json

app = Flask(__name__)

@app.route('/webhooks/github', methods=['POST'])
def github_webhook():
    # 1. Verify signature
    signature = request.headers.get('X-Hub-Signature-256')
    if not verify_signature(request.data, signature):
        return jsonify({'error': 'Invalid signature'}), 401
    
    # 2. Get event type
    event_type = request.headers.get('X-GitHub-Event')
    payload = request.get_json()
    
    # 3. Respond immediately
    response = jsonify({'received': True})
    
    # 4. Process asynchronously (using Celery, RQ, etc.)
    from tasks import process_webhook
    process_webhook.delay(event_type, payload)
    
    return response, 200

def verify_signature(payload, signature_header):
    """Verify HMAC signature"""
    secret = os.environ['WEBHOOK_SECRET'].encode()
    expected_signature = 'sha256=' + hmac.new(
        secret,
        payload,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(expected_signature, signature_header)

# Celery task
from celery import Celery
celery = Celery('tasks', broker='redis://localhost:6379')

@celery.task
def process_webhook(event_type, payload):
    if event_type == 'push':
        handle_push_event(payload)
    elif event_type == 'pull_request':
        handle_pr_event(payload)
    # ... more handlers

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### Go Implementation

```go
package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "encoding/json"
    "io/ioutil"
    "log"
    "net/http"
    "os"
)

type WebhookPayload struct {
    Event string          `json:"event"`
    Data  json.RawMessage `json:"data"`
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    // 1. Read body
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Error reading body", http.StatusBadRequest)
        return
    }
    defer r.Body.Close()
    
    // 2. Verify signature
    signature := r.Header.Get("X-Webhook-Signature")
    if !verifySignature(body, signature) {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }
    
    // 3. Parse payload
    var payload WebhookPayload
    if err := json.Unmarshal(body, &payload); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }
    
    // 4. Respond immediately
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]bool{"received": true})
    
    // 5. Process asynchronously
    go processWebhook(payload)
}

func verifySignature(payload []byte, signatureHeader string) bool {
    secret := []byte(os.Getenv("WEBHOOK_SECRET"))
    mac := hmac.New(sha256.New, secret)
    mac.Write(payload)
    expectedMAC := hex.EncodeToString(mac.Sum(nil))
    return hmac.Equal([]byte(expectedMAC), []byte(signatureHeader))
}

func processWebhook(payload WebhookPayload) {
    switch payload.Event {
    case "user.created":
        handleUserCreated(payload.Data)
    case "order.completed":
        handleOrderCompleted(payload.Data)
    default:
        log.Printf("Unknown event: %s", payload.Event)
    }
}

func main() {
    http.HandleFunc("/webhooks", webhookHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

---

## Security

### 1. Signature Verification (HMAC)

**Provider Side (Sending):**
```javascript
const crypto = require('crypto');

function signPayload(payload, secret) {
    const hmac = crypto.createHmac('sha256', secret);
    const signature = hmac.update(JSON.stringify(payload)).digest('hex');
    return signature;
}

// Send webhook
const payload = { event: 'user.created', userId: '12345' };
const signature = signPayload(payload, process.env.WEBHOOK_SECRET);

fetch('https://customer.com/webhooks', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Webhook-ID': generateUniqueId(),
        'X-Webhook-Timestamp': Date.now()
    },
    body: JSON.stringify(payload)
});
```

**Consumer Side (Receiving):**
```javascript
function verifyWebhookSignature(req) {
    const signature = req.headers['x-webhook-signature'];
    const timestamp = req.headers['x-webhook-timestamp'];
    
    // Prevent replay attacks (timestamp within 5 minutes)
    if (Math.abs(Date.now() - timestamp) > 300000) {
        throw new Error('Timestamp expired');
    }
    
    // Verify HMAC
    const secret = process.env.WEBHOOK_SECRET;
    const hmac = crypto.createHmac('sha256', secret);
    const expectedSignature = hmac
        .update(JSON.stringify(req.body))
        .digest('hex');
    
    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
}
```

### 2. IP Whitelisting

```javascript
const allowedIPs = [
    '192.30.252.0/22',  // GitHub
    '185.199.108.0/22', // GitHub Pages
    // ... more IP ranges
];

function isAllowedIP(clientIP) {
    return allowedIPs.some(range => ipInRange(clientIP, range));
}

app.post('/webhooks/github', (req, res) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    
    if (!isAllowedIP(clientIP)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Process webhook
});
```

### 3. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const webhookLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many webhook requests'
});

app.post('/webhooks/*', webhookLimiter, webhookHandler);
```

### 4. Idempotency

```javascript
const processedEvents = new Set();

app.post('/webhooks/stripe', async (req, res) => {
    const eventId = req.headers['x-webhook-id'];
    
    // Check if already processed
    if (processedEvents.has(eventId)) {
        return res.status(200).json({ 
            status: 'already_processed' 
        });
    }
    
    // Process event
    await processEvent(req.body);
    
    // Mark as processed
    processedEvents.add(eventId);
    
    res.status(200).json({ status: 'processed' });
});
```

### 5. HTTPS Enforcement

```javascript
app.use((req, res, next) => {
    if (req.protocol !== 'https' && process.env.NODE_ENV === 'production') {
        return res.status(403).send('HTTPS required');
    }
    next();
});
```

---

## Payload Structure

### Standard Webhook Payload

```json
{
  "id": "evt_1234567890",
  "type": "user.created",
  "created": 1642694400,
  "data": {
    "object": {
      "id": "user_abc123",
      "email": "john.doe@example.com",
      "name": "John Doe",
      "created_at": "2026-01-20T10:00:00Z"
    }
  },
  "metadata": {
    "webhook_id": "wh_xyz789",
    "attempt": 1,
    "signature": "sha256=abcdef123456"
  }
}
```

### GitHub Webhook Payload

```json
{
  "action": "opened",
  "number": 42,
  "pull_request": {
    "id": 1,
    "title": "Update README",
    "state": "open",
    "user": {
      "login": "johndoe",
      "id": 123456
    },
    "head": {
      "ref": "feature-branch",
      "sha": "abc123def456"
    },
    "base": {
      "ref": "main",
      "sha": "def456abc789"
    }
  },
  "repository": {
    "name": "my-repo",
    "full_name": "org/my-repo",
    "private": false
  },
  "sender": {
    "login": "johndoe",
    "id": 123456
  }
}
```

### Stripe Webhook Payload

```json
{
  "id": "evt_1234567890",
  "object": "event",
  "type": "payment_intent.succeeded",
  "created": 1642694400,
  "data": {
    "object": {
      "id": "pi_abc123",
      "amount": 1000,
      "currency": "usd",
      "status": "succeeded",
      "customer": "cus_xyz789"
    }
  },
  "livemode": false,
  "request": {
    "id": "req_abc123",
    "idempotency_key": "key_xyz789"
  }
}
```

---

## Retry Logic & Reliability

### Exponential Backoff Strategy

```javascript
class WebhookRetry {
    constructor() {
        this.maxRetries = 5;
        this.baseDelay = 1000; // 1 second
    }
    
    async sendWithRetry(url, payload, attempt = 1) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                timeout: 5000
            });
            
            if (response.ok) {
                return { success: true, attempt };
            }
            
            throw new Error(`HTTP ${response.status}`);
            
        } catch (error) {
            if (attempt >= this.maxRetries) {
                await this.handleFailure(url, payload, error);
                return { success: false, attempt, error };
            }
            
            // Exponential backoff: 1s, 2s, 4s, 8s, 16s
            const delay = this.baseDelay * Math.pow(2, attempt - 1);
            await this.sleep(delay);
            
            return this.sendWithRetry(url, payload, attempt + 1);
        }
    }
    
    async handleFailure(url, payload, error) {
        // Log to database/monitoring
        await logWebhookFailure({
            url,
            payload,
            error: error.message,
            timestamp: new Date()
        });
        
        // Send alert
        await sendAlert(`Webhook failed after ${this.maxRetries} attempts`);
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Usage
const retryHandler = new WebhookRetry();
await retryHandler.sendWithRetry(
    'https://example.com/webhooks',
    { event: 'user.created', userId: '123' }
);
```

### Circuit Breaker Pattern

```javascript
class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.failureThreshold = threshold;
        this.timeout = timeout;
        this.failures = 0;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.nextAttempt = Date.now();
    }
    
    async execute(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttempt) {
                throw new Error('Circuit breaker is OPEN');
            }
            this.state = 'HALF_OPEN';
        }
        
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failures = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failures++;
        if (this.failures >= this.failureThreshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.timeout;
        }
    }
}

// Usage
const breaker = new CircuitBreaker();

app.post('/webhooks/external', async (req, res) => {
    try {
        await breaker.execute(async () => {
            return await sendToExternalService(req.body);
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(503).json({ error: 'Service temporarily unavailable' });
    }
});
```

### Dead Letter Queue

```javascript
const { Queue } = require('bullmq');

const webhookQueue = new Queue('webhooks');
const deadLetterQueue = new Queue('failed-webhooks');

webhookQueue.process(async (job) => {
    const { url, payload } = job.data;
    
    try {
        await sendWebhook(url, payload);
    } catch (error) {
        // After max retries, move to dead letter queue
        if (job.attemptsMade >= job.opts.attempts) {
            await deadLetterQueue.add('failed', {
                originalJob: job.data,
                error: error.message,
                attempts: job.attemptsMade
            });
        }
        throw error;
    }
});

// Manual review and retry from dead letter queue
async function retryFailedWebhook(jobId) {
    const job = await deadLetterQueue.getJob(jobId);
    await webhookQueue.add('retry', job.data.originalJob);
    await job.remove();
}
```

---

## Best Practices

### 1. Respond Quickly

```javascript
// ❌ Bad: Slow response
app.post('/webhooks/slow', async (req, res) => {
    await processComplexLogic(req.body); // Takes 30 seconds
    res.status(200).send('OK'); // Timeout!
});

// ✅ Good: Immediate response
app.post('/webhooks/fast', async (req, res) => {
    res.status(200).send('OK'); // Respond immediately
    await queue.add(req.body); // Process async
});
```

### 2. Idempotency Handling

```javascript
// Store processed event IDs
const redis = require('redis');
const client = redis.createClient();

app.post('/webhooks/idempotent', async (req, res) => {
    const eventId = req.headers['x-event-id'];
    
    // Check if already processed (TTL: 24 hours)
    const exists = await client.get(`webhook:${eventId}`);
    if (exists) {
        return res.status(200).json({ status: 'duplicate' });
    }
    
    // Process event
    await processEvent(req.body);
    
    // Mark as processed
    await client.setex(`webhook:${eventId}`, 86400, '1');
    
    res.status(200).json({ status: 'processed' });
});
```

### 3. Structured Logging

```javascript
const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'webhooks.log' })]
});

app.post('/webhooks/logged', (req, res) => {
    const eventId = req.headers['x-event-id'];
    
    logger.info('Webhook received', {
        eventId,
        type: req.body.type,
        timestamp: new Date(),
        ip: req.ip
    });
    
    try {
        processEvent(req.body);
        logger.info('Webhook processed', { eventId, status: 'success' });
    } catch (error) {
        logger.error('Webhook failed', { 
            eventId, 
            error: error.message,
            stack: error.stack
        });
    }
    
    res.status(200).send('OK');
});
```

### 4. Version Your Webhook API

```javascript
app.post('/webhooks/v1/events', v1Handler);
app.post('/webhooks/v2/events', v2Handler);

// Include version in payload
const payload = {
    version: '2.0',
    event: 'user.created',
    data: {...}
};
```

### 5. Documentation

```yaml
# OpenAPI specification for webhooks
webhooks:
  userCreated:
    post:
      summary: User Created Event
      description: Triggered when a new user is created
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                event:
                  type: string
                  example: user.created
                data:
                  type: object
                  properties:
                    userId:
                      type: string
                    email:
                      type: string
      responses:
        '200':
          description: Webhook received successfully
```

---

## Testing Webhooks

### Local Testing Tools

**1. ngrok - Expose Local Server**
```bash
# Install ngrok
npm install -g ngrok

# Start local server
node server.js

# Expose to internet
ngrok http 3000

# Use generated URL: https://abc123.ngrok.io/webhooks
```

**2. Webhook.site - Instant Testing**
```
Visit: https://webhook.site
Get unique URL for testing
View incoming requests in real-time
```

**3. RequestBin - Request Inspector**
```
Visit: https://requestbin.com
Create temporary endpoint
Inspect webhook payloads
```

### Manual Testing

```bash
# cURL test
curl -X POST https://your-api.com/webhooks/test \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: abc123" \
  -d '{"event":"test","data":{"message":"hello"}}'

# HTTPie test
http POST https://your-api.com/webhooks/test \
  event=test \
  data:='{"message":"hello"}'
```

### Automated Testing (Jest)

```javascript
const request = require('supertest');
const app = require('./app');

describe('Webhook Endpoint', () => {
    it('should accept valid webhook', async () => {
        const payload = {
            event: 'user.created',
            data: { userId: '123' }
        };
        
        const response = await request(app)
            .post('/webhooks/test')
            .set('X-Webhook-Signature', generateSignature(payload))
            .send(payload);
        
        expect(response.status).toBe(200);
        expect(response.body.received).toBe(true);
    });
    
    it('should reject invalid signature', async () => {
        const response = await request(app)
            .post('/webhooks/test')
            .set('X-Webhook-Signature', 'invalid')
            .send({ event: 'test' });
        
        expect(response.status).toBe(401);
    });
    
    it('should handle duplicate events', async () => {
        const eventId = 'evt_123';
        const payload = { event: 'test', id: eventId };
        
        // First request
        await request(app)
            .post('/webhooks/test')
            .set('X-Event-ID', eventId)
            .send(payload);
        
        // Duplicate request
        const response = await request(app)
            .post('/webhooks/test')
            .set('X-Event-ID', eventId)
            .send(payload);
        
        expect(response.body.status).toBe('duplicate');
    });
});
```

---

## Monitoring & Debugging

### Monitoring Dashboard

```javascript
const prometheus = require('prom-client');

// Metrics
const webhookCounter = new prometheus.Counter({
    name: 'webhooks_received_total',
    help: 'Total webhooks received',
    labelNames: ['event_type', 'status']
});

const webhookDuration = new prometheus.Histogram({
    name: 'webhook_processing_duration_seconds',
    help: 'Webhook processing duration',
    buckets: [0.1, 0.5, 1, 2, 5]
});

app.post('/webhooks/:provider', async (req, res) => {
    const start = Date.now();
    
    try {
        await processWebhook(req.body);
        webhookCounter.inc({ 
            event_type: req.body.type, 
            status: 'success' 
        });
    } catch (error) {
        webhookCounter.inc({ 
            event_type: req.body.type, 
            status: 'failure' 
        });
    } finally {
        const duration = (Date.now() - start) / 1000;
        webhookDuration.observe(duration);
    }
    
    res.status(200).send('OK');
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(await prometheus.register.metrics());
});
```

### Error Tracking (Sentry)

```javascript
const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.post('/webhooks/monitored', (req, res) => {
    try {
        processWebhook(req.body);
    } catch (error) {
        Sentry.captureException(error, {
            tags: {
                webhook_type: req.body.type,
                provider: req.params.provider
            },
            extra: {
                payload: req.body,
                headers: req.headers
            }
        });
    }
    res.status(200).send('OK');
});
```

### Webhook Debugger UI

```javascript
// Store recent webhooks for debugging
const recentWebhooks = [];

app.post('/webhooks/debug', (req, res) => {
    const webhookData = {
        id: generateId(),
        timestamp: new Date(),
        headers: req.headers,
        body: req.body,
        ip: req.ip
    };
    
    recentWebhooks.unshift(webhookData);
    if (recentWebhooks.length > 100) recentWebhooks.pop();
    
    res.status(200).send('OK');
});

// Debug UI endpoint
app.get('/debug/webhooks', (req, res) => {
    res.json(recentWebhooks);
});
```

---

## Real-World Examples

### GitHub Webhook Handler

```javascript
app.post('/webhooks/github', async (req, res) => {
    const signature = req.headers['x-hub-signature-256'];
    const event = req.headers['x-github-event'];
    
    // Verify signature
    if (!verifyGitHubSignature(req.body, signature)) {
        return res.status(401).send('Invalid signature');
    }
    
    res.status(200).send('OK');
    
    // Handle events
    switch (event) {
        case 'push':
            await handlePush(req.body);
            break;
        case 'pull_request':
            if (req.body.action === 'opened') {
                await runCITests(req.body.pull_request);
            }
            break;
        case 'issues':
            if (req.body.action === 'opened') {
                await notifyTeam(req.body.issue);
            }
            break;
    }
});

async function handlePush(payload) {
    const { repository, commits } = payload;
    console.log(`Push to ${repository.full_name}: ${commits.length} commits`);
    
    // Trigger deployment
    if (payload.ref === 'refs/heads/main') {
        await triggerDeployment(repository.name);
    }
}
```

### Stripe Payment Webhook

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/webhooks/stripe', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        
        res.status(200).send('OK');
        
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                await fulfillOrder(paymentIntent);
                break;
            
            case 'customer.subscription.deleted':
                const subscription = event.data.object;
                await cancelUserAccess(subscription.customer);
                break;
            
            case 'invoice.payment_failed':
                const invoice = event.data.object;
                await notifyPaymentFailure(invoice.customer);
                break;
        }
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

async function fulfillOrder(paymentIntent) {
    // Update order status
    await db.orders.update({
        where: { paymentIntentId: paymentIntent.id },
        data: { status: 'paid', paidAt: new Date() }
    });
    
    // Send confirmation email
    await sendOrderConfirmation(paymentIntent.customer);
}
```

### Slack Webhook Integration

```javascript
// Outgoing webhook TO Slack
async function sendSlackNotification(message) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: message,
            username: 'Deployment Bot',
            icon_emoji: ':rocket:'
        })
    });
}

// Incoming webhook FROM Slack
app.post('/webhooks/slack', async (req, res) => {
    // Verify Slack signature
    const signature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    
    if (!verifySlackSignature(req.body, signature, timestamp)) {
        return res.status(401).send('Invalid signature');
    }
    
    // Handle slash command
    if (req.body.command === '/deploy') {
        const environment = req.body.text;
        
        res.json({
            response_type: 'in_channel',
            text: `Starting deployment to ${environment}...`
        });
        
        await triggerDeployment(environment);
    }
});
```

---

## Webhooks vs Alternatives

| Method | Real-Time | Efficiency | Complexity | Use Case |
|--------|-----------|------------|------------|----------|
| **Webhooks** | ✅ Yes | ✅ High | ⚠️ Medium | Event notifications |
| **Polling** | ❌ No | ❌ Low | ✅ Simple | Periodic checks |
| **WebSockets** | ✅ Yes | ✅ High | ❌ High | Bidirectional real-time |
| **Server-Sent Events** | ✅ Yes | ⚠️ Medium | ⚠️ Medium | One-way streaming |
| **Message Queues** | ✅ Yes | ✅ High | ❌ High | Async processing |

### When to Use What

**Use Webhooks when:**
- ✅ Events are infrequent
- ✅ One-way notifications sufficient
- ✅ Standard HTTP infrastructure
- ✅ Multiple consumers

**Use Polling when:**
- ✅ Webhooks not supported
- ✅ Simple implementation needed
- ✅ Firewall restrictions

**Use WebSockets when:**
- ✅ Bidirectional communication needed
- ✅ Continuous data stream
- ✅ Chat/gaming applications

---

## Resources

### Webhook Providers
- [GitHub Webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Twilio Webhooks](https://www.twilio.com/docs/usage/webhooks)
- [SendGrid Webhooks](https://docs.sendgrid.com/for-developers/tracking-events/event)
- [Shopify Webhooks](https://shopify.dev/docs/admin-api/rest/reference/events/webhook)

### Testing Tools
- [ngrok](https://ngrok.com/) - Secure tunnels
- [Webhook.site](https://webhook.site/) - Instant endpoints
- [RequestBin](https://requestbin.com/) - Request inspector
- [Svix](https://www.svix.com/) - Webhook infrastructure

### Libraries
- **Node.js**: `express`, `node-webhook`, `svix`
- **Python**: `flask`, `fastapi`, `webhooks`
- **Go**: `net/http`, `gorilla/webhooks`
- **Ruby**: `sinatra`, `webhooks`

### Best Practice Guides
- [Stripe Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)
- [GitHub Webhook Security](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks)
- [Webhook.site Blog](https://webhook.site/blog)

---

**Last Updated**: January 2026  
**Standard**: HTTP/1.1, HTTP/2
