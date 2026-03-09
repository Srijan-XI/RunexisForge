# Refresh Tokens - Token Management

## Table of Contents
- [Introduction](#introduction)
- [Why Refresh Tokens?](#why-refresh-tokens)
- [Core Concepts](#core-concepts)
- [Access Token vs Refresh Token](#access-token-vs-refresh-token)
- [Token Flow & Lifecycle](#token-flow--lifecycle)
- [Implementation Patterns](#implementation-patterns)
- [Security Best Practices](#security-best-practices)
- [Token Storage](#token-storage)
- [Token Rotation](#token-rotation)
- [Revocation Strategies](#revocation-strategies)
- [Common Vulnerabilities](#common-vulnerabilities)
- [Platform-Specific Implementations](#platform-specific-implementations)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**Refresh tokens** are long-lived credentials used to obtain new access tokens without requiring the user to re-authenticate. They are a critical component of modern authentication systems, particularly in OAuth 2.0 and OpenID Connect implementations.

### Key Characteristics

- **Long-Lived**: Valid for days, weeks, or months
- **Single-Use or Rotatable**: Can be configured for one-time use
- **Secure Storage Required**: Must be stored securely
- **Revocable**: Can be invalidated server-side
- **Scope-Limited**: Tied to specific user and permissions

### Token Types

| Token Type | Lifespan | Purpose | Storage | Security Level |
|------------|----------|---------|---------|----------------|
| **Access Token** | 5-60 minutes | API authorization | Memory/SessionStorage | Medium |
| **Refresh Token** | Days to months | Obtain new access tokens | Secure storage | High |
| **ID Token** | 5-60 minutes | User identity (OIDC) | Memory | Medium |

---

## Why Refresh Tokens?

### Benefits

✅ **Security**
- Short-lived access tokens minimize exposure
- Reduced risk if access token is compromised
- Centralized revocation capability
- Better audit trail

✅ **User Experience**
- Seamless re-authentication
- No repeated login prompts
- Persistent sessions
- Background token renewal

✅ **Flexibility**
- Different expiration policies
- Granular revocation control
- Support for multiple devices
- Session management capabilities

✅ **Compliance**
- Meets security requirements (PCI-DSS, HIPAA)
- Supports session timeout policies
- Enables audit logging
- Facilitates consent management

### Use Cases

- **Mobile Applications**: Long sessions without repeated logins
- **Web Applications**: Remember me functionality
- **Single Page Applications (SPA)**: Token renewal without page refresh
- **API Clients**: Continuous API access
- **Multi-Device**: Manage sessions across devices
- **Enterprise Applications**: Compliance with session policies

---

## Core Concepts

### Token Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│                    Initial Authentication               │
│         (User logs in with credentials)                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Authorization Server Issues:               │
│  1. Access Token (short-lived: 15min)                   │
│  2. Refresh Token (long-lived: 30 days)                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│         Client Uses Access Token for API Calls          │
│              (Until it expires)                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│           Access Token Expires                          │
│  Client receives 401 Unauthorized                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│   Client Sends Refresh Token to Token Endpoint          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│         Authorization Server Validates:                 │
│  - Token signature                                      │
│  - Token not expired                                    │
│  - Token not revoked                                    │
│  - Token belongs to client                              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Server Issues New Tokens:                  │
│  1. New Access Token                                    │
│  2. (Optionally) New Refresh Token (rotation)           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
              Cycle Repeats
```

### Token Anatomy

**Access Token (JWT Example):**
```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user123",
    "iss": "https://auth.example.com",
    "aud": "api.example.com",
    "exp": 1709856000,  // Expires: 15 minutes
    "iat": 1709855100,
    "scope": "read write"
  }
}
```

**Refresh Token:**
- **Opaque Token**: Random string, no embedded data
- **JWT Token**: Contains claims like access tokens
- **Hybrid**: Reference token pointing to server-side session

---

## Access Token vs Refresh Token

### Comparison

| Aspect | Access Token | Refresh Token |
|--------|--------------|---------------|
| **Purpose** | API authorization | Token renewal |
| **Lifespan** | Short (5-60 min) | Long (days to months) |
| **Usage** | Every API request | Only at token endpoint |
| **Exposure** | High (sent frequently) | Low (rarely transmitted) |
| **Revocation** | Typically not revoked | Can be revoked |
| **Storage** | Memory/SessionStorage | Secure storage (HttpOnly cookie) |
| **Size** | Larger (contains claims) | Smaller (often opaque) |
| **Network** | Frequent transmission | Infrequent transmission |

### Security Implications

**Access Token:**
```javascript
// Short-lived, so compromise has limited impact
const accessToken = "eyJhbGc...";  // Expires in 15 minutes
// Even if stolen, only valid briefly
```

**Refresh Token:**
```javascript
// Long-lived, so must be protected carefully
const refreshToken = "8f7a9b2c...";  // Valid for 30 days
// If stolen, attacker has long-term access
```

---

## Token Flow & Lifecycle

### 1. Initial Authentication

**Authorization Code Flow (OAuth 2.0):**

```http
POST /oauth/token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTHORIZATION_CODE&
redirect_uri=https://app.example.com/callback&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 900,
  "refresh_token": "8f7a9b2c-4d3e-5f6g...",
  "scope": "read write"
}
```

### 2. Using Access Token

```http
GET /api/users/me HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

### 3. Token Refresh

**Request:**
```http
POST /oauth/token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&
refresh_token=8f7a9b2c-4d3e-5f6g...&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",  // New access token
  "token_type": "Bearer",
  "expires_in": 900,
  "refresh_token": "9g8b0c3d-5e4f-6g7h...",  // New refresh token (optional)
  "scope": "read write"
}
```

### 4. Error Handling

**Expired/Invalid Refresh Token:**
```json
{
  "error": "invalid_grant",
  "error_description": "Refresh token is expired or revoked"
}
```

**Client Action:** Redirect user to login

---

## Implementation Patterns

### Pattern 1: Opaque Refresh Tokens

```javascript
// Server-side (Node.js/Express)
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Generate tokens
function generateTokens(userId) {
  // Short-lived access token (JWT)
  const accessToken = jwt.sign(
    { 
      userId,
      type: 'access',
      scope: 'read write'
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  // Long-lived refresh token (opaque)
  const refreshToken = crypto.randomBytes(64).toString('hex');
  
  // Store refresh token in database
  storeRefreshToken(userId, refreshToken, {
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    createdAt: new Date(),
    deviceInfo: req.headers['user-agent']
  });

  return { accessToken, refreshToken };
}

// Validate and refresh
async function refreshAccessToken(refreshToken) {
  // Check database
  const tokenData = await db.refreshTokens.findOne({
    token: refreshToken,
    expiresAt: { $gt: new Date() },
    revoked: false
  });

  if (!tokenData) {
    throw new Error('Invalid or expired refresh token');
  }

  // Generate new access token
  const accessToken = jwt.sign(
    { 
      userId: tokenData.userId,
      type: 'access'
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  return { accessToken };
}
```

### Pattern 2: JWT Refresh Tokens

```javascript
// JWT-based refresh tokens
function generateJWTRefreshToken(userId) {
  const refreshToken = jwt.sign(
    {
      userId,
      type: 'refresh',
      tokenId: crypto.randomBytes(16).toString('hex')
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '30d' }
  );

  // Store token ID in whitelist/revocation list
  storeTokenId(userId, decoded.tokenId);

  return refreshToken;
}

// Validate JWT refresh token
async function validateJWTRefreshToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    // Check if token ID is still valid (not revoked)
    const isValid = await checkTokenId(decoded.userId, decoded.tokenId);
    
    if (!isValid) {
      throw new Error('Token has been revoked');
    }

    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}
```

### Pattern 3: Automatic Token Refresh (Client-Side)

```javascript
// React/JavaScript client
class TokenManager {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.refreshTimer = null;
  }

  // Set tokens and schedule refresh
  setTokens({ accessToken, refreshToken, expiresIn }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    
    // Schedule refresh before expiration (90% of lifetime)
    const refreshTime = (expiresIn * 0.9) * 1000;
    this.scheduleRefresh(refreshTime);
  }

  // Schedule automatic refresh
  scheduleRefresh(delay) {
    clearTimeout(this.refreshTimer);
    this.refreshTimer = setTimeout(() => {
      this.refresh();
    }, delay);
  }

  // Refresh tokens
  async refresh() {
    try {
      const response = await fetch('https://auth.example.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
          client_id: CLIENT_ID
        })
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const tokens = await response.json();
      this.setTokens(tokens);
      
      return tokens.accessToken;
    } catch (error) {
      // Redirect to login
      window.location.href = '/login';
    }
  }

  // Get valid access token
  async getAccessToken() {
    // Return current token if valid
    if (this.isTokenValid(this.accessToken)) {
      return this.accessToken;
    }
    
    // Otherwise refresh
    return await this.refresh();
  }

  // Decode and check token validity
  isTokenValid(token) {
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}

// Usage with API client
const tokenManager = new TokenManager();

async function apiCall(endpoint) {
  const token = await tokenManager.getAccessToken();
  
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
}
```

---

## Security Best Practices

### 1. Token Expiration

```javascript
// Recommended expiration times
const TOKEN_CONFIG = {
  // Access tokens: short-lived
  accessToken: {
    expiresIn: '15m',  // 15 minutes (web apps)
    expiresIn: '1h',   // 1 hour (mobile apps)
  },
  
  // Refresh tokens: varies by use case
  refreshToken: {
    web: '7d',        // 7 days (web apps)
    mobile: '90d',    // 90 days (mobile apps)
    enterprise: '30d' // 30 days (enterprise)
  }
};
```

### 2. Secure Storage

**Web Applications:**
```javascript
// ❌ DON'T: Store in localStorage (vulnerable to XSS)
localStorage.setItem('refreshToken', token);

// ✅ DO: Use HttpOnly cookies
// Server-side (Express)
res.cookie('refreshToken', token, {
  httpOnly: true,     // Not accessible via JavaScript
  secure: true,       // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
});

// Access token can be in memory
// (will be lost on page refresh, use refresh token to get new one)
```

**Mobile Applications:**
```swift
// iOS: Keychain
import Security

func saveRefreshToken(_ token: String) {
    let data = token.data(using: .utf8)!
    
    let query: [String: Any] = [
        kSecClass as String: kSecClassGenericPassword,
        kSecAttrAccount as String: "refreshToken",
        kSecValueData as String: data,
        kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly
    ]
    
    SecItemAdd(query as CFDictionary, nil)
}
```

```kotlin
// Android: EncryptedSharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

val masterKey = MasterKey.Builder(context)
    .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
    .build()

val encryptedPrefs = EncryptedSharedPreferences.create(
    context,
    "secure_prefs",
    masterKey,
    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
)

encryptedPrefs.edit()
    .putString("refresh_token", token)
    .apply()
```

### 3. HTTPS Only

```javascript
// Always use HTTPS for token transmission
if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
  throw new Error('Tokens must be transmitted over HTTPS');
}
```

### 4. Client Authentication

```javascript
// Confidential clients (backend)
const response = await fetch('/oauth/token', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
  },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  })
});

// Public clients (SPA, mobile) - use PKCE
const codeVerifier = generateCodeVerifier();
const codeChallenge = await generateCodeChallenge(codeVerifier);
```

### 5. Token Binding

```javascript
// Bind refresh token to device/browser
function generateRefreshToken(userId, deviceFingerprint) {
  const token = crypto.randomBytes(64).toString('hex');
  
  storeRefreshToken({
    userId,
    token,
    deviceFingerprint: hash(deviceFingerprint),
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip
  });
  
  return token;
}

// Validate binding on refresh
function validateRefreshToken(token, currentDeviceFingerprint) {
  const tokenData = getRefreshToken(token);
  
  if (hash(currentDeviceFingerprint) !== tokenData.deviceFingerprint) {
    revokeToken(token);
    throw new Error('Token binding mismatch - possible token theft');
  }
}
```

---

## Token Storage

### Storage Options Comparison

| Storage Method | Security | Persistence | XSS Vulnerable | CSRF Vulnerable | Use Case |
|----------------|----------|-------------|----------------|-----------------|----------|
| **Memory** | High | No | No | N/A | Access tokens (SPA) |
| **SessionStorage** | Medium | Tab session | Yes | N/A | Temporary data |
| **LocalStorage** | Low | Yes | Yes | N/A | ❌ Never use for tokens |
| **HttpOnly Cookie** | High | Yes | No | Configurable | Refresh tokens (web) |
| **Keychain (iOS)** | Very High | Yes | No | N/A | Mobile apps |
| **KeyStore (Android)** | Very High | Yes | No | N/A | Mobile apps |

### Recommended Approach

**Single Page Applications:**
```javascript
// Token storage pattern for SPA
class SecureTokenStorage {
  constructor() {
    // Access token in memory only
    this.accessToken = null;
    
    // Refresh token in HttpOnly cookie (set by server)
    // Not accessible from JavaScript
  }

  setAccessToken(token) {
    // Store in memory
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  async refreshTokens() {
    // Refresh token sent automatically via cookie
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include'  // Include cookies
    });

    const { accessToken } = await response.json();
    this.setAccessToken(accessToken);
    
    return accessToken;
  }

  clearTokens() {
    this.accessToken = null;
    // Server must clear refresh token cookie
    fetch('/api/auth/logout', { 
      method: 'POST',
      credentials: 'include'
    });
  }
}
```

---

## Token Rotation

### Automatic Rotation

```javascript
// Server-side: Rotate refresh token on each use
async function refreshTokenEndpoint(req, res) {
  const { refresh_token } = req.body;
  
  // Validate old refresh token
  const tokenData = await validateRefreshToken(refresh_token);
  
  if (!tokenData) {
    return res.status(401).json({ error: 'invalid_grant' });
  }

  // Revoke old refresh token
  await revokeRefreshToken(refresh_token);
  
  // Generate new tokens
  const { accessToken, refreshToken } = generateTokens(tokenData.userId);
  
  // Store new refresh token
  await storeRefreshToken(tokenData.userId, refreshToken);
  
  res.json({
    access_token: accessToken,
    refresh_token: refreshToken,  // New refresh token
    token_type: 'Bearer',
    expires_in: 900
  });
}
```

### Rotation with Grace Period

```javascript
// Allow old token for short grace period (prevent race conditions)
async function refreshWithGracePeriod(oldToken) {
  const tokenData = await db.refreshTokens.findOne({ token: oldToken });
  
  // Check if token was recently rotated (within 5 seconds)
  const rotationTime = tokenData.rotatedAt?.getTime() || 0;
  const gracePeriod = 5000; // 5 seconds
  
  if (Date.now() - rotationTime < gracePeriod && tokenData.rotatedTo) {
    // Return the new token that was already issued
    return db.refreshTokens.findOne({ token: tokenData.rotatedTo });
  }
  
  // Normal rotation flow
  const newToken = await rotateToken(oldToken);
  
  // Mark old token with rotation info
  await db.refreshTokens.updateOne(
    { token: oldToken },
    { 
      rotatedAt: new Date(),
      rotatedTo: newToken
    }
  );
  
  return newToken;
}
```

---

## Revocation Strategies

### 1. Individual Token Revocation

```javascript
// Revoke specific refresh token
async function revokeToken(refreshToken) {
  await db.refreshTokens.updateOne(
    { token: refreshToken },
    { 
      revoked: true,
      revokedAt: new Date()
    }
  );
}

// Revocation endpoint
app.post('/oauth/revoke', async (req, res) => {
  const { token } = req.body;
  await revokeToken(token);
  res.sendStatus(200);
});
```

### 2. User-Level Revocation

```javascript
// Revoke all tokens for a user (logout all devices)
async function revokeAllUserTokens(userId) {
  await db.refreshTokens.updateMany(
    { userId, revoked: false },
    { 
      revoked: true,
      revokedAt: new Date()
    }
  );
}
```

### 3. Device/Session Management

```javascript
// List active sessions
async function getUserSessions(userId) {
  return await db.refreshTokens.find({
    userId,
    revoked: false,
    expiresAt: { $gt: new Date() }
  }).select('createdAt deviceInfo ipAddress lastUsed');
}

// Revoke specific session
async function revokeSession(userId, sessionId) {
  await db.refreshTokens.updateOne(
    { userId, _id: sessionId },
    { revoked: true, revokedAt: new Date() }
  );
}
```

### 4. Emergency Revocation

```javascript
// Global key rotation (emergency)
async function rotateTokenSecret() {
  // Generate new secret
  const newSecret = crypto.randomBytes(64).toString('hex');
  
  // Update config
  await updateSecret(newSecret);
  
  // All existing JWT refresh tokens now invalid
  // Opaque tokens still need database revocation
  await db.refreshTokens.updateMany(
    { revoked: false },
    { revoked: true, revokedAt: new Date() }
  );
  
  // Notify users to re-login
  await notifyUsers('Security update - please log in again');
}
```

---

## Common Vulnerabilities

### 1. Refresh Token Theft

**Attack:**
```javascript
// Attacker steals refresh token from:
// - Insecure storage (localStorage)
// - Man-in-the-middle (HTTP)
// - XSS attack
```

**Mitigation:**
```javascript
// ✅ Use secure storage
// ✅ HTTPS only
// ✅ Token rotation
// ✅ Device binding
// ✅ Anomaly detection

// Detect suspicious usage
function detectAnomalies(userId, refreshRequest) {
  const history = getUserTokenHistory(userId);
  
  // Check for impossible travel
  if (detectImpossibleTravel(history, refreshRequest)) {
    revokeAllUserTokens(userId);
    alertUser(userId, 'Suspicious activity detected');
  }
}
```

### 2. Token Fixation

**Attack:**
```javascript
// Attacker pre-generates refresh token and tricks user into using it
```

**Mitigation:**
```javascript
// ✅ Rotate tokens on login
// ✅ Bind to session
// ✅ Validate user context

function login(userId) {
  // Always issue new tokens on login
  // Never reuse existing tokens
  const tokens = generateTokens(userId);
  
  // Revoke any existing tokens from this device
  revokeDeviceTokens(userId, deviceId);
  
  return tokens;
}
```

### 3. Replay Attacks

**Attack:**
```javascript
// Attacker intercepts and reuses refresh token
```

**Mitigation:**
```javascript
// ✅ Token rotation (single-use tokens)
// ✅ Short expiration
// ✅ Detect duplicate usage

async function refreshToken(token) {
  const tokenData = await getToken(token);
  
  // Check if already used
  if (tokenData.used) {
    // Possible replay attack
    await revokeTokenFamily(tokenData.familyId);
    throw new Error('Token reuse detected');
  }
  
  // Mark as used
  await markTokenUsed(token);
  
  // Issue new token
  return generateNewToken(tokenData.userId);
}
```

---

## Platform-Specific Implementations

### Node.js/Express

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();

// Token refresh endpoint
app.post('/api/auth/refresh', async (req, res) => {
  try {
    // Get refresh token from HttpOnly cookie
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' });
    }

    // Validate refresh token
    const tokenData = await db.refreshTokens.findOne({
      token: refreshToken,
      expiresAt: { $gt: new Date() },
      revoked: false
    });

    if (!tokenData) {
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: tokenData.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // Optional: Rotate refresh token
    if (process.env.ROTATE_REFRESH_TOKENS === 'true') {
      const newRefreshToken = crypto.randomBytes(64).toString('hex');
      
      await db.refreshTokens.updateOne(
        { token: refreshToken },
        { revoked: true }
      );
      
      await db.refreshTokens.create({
        userId: tokenData.userId,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });
    }

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Token refresh failed' });
  }
});
```

### Python/Flask

```python
from flask import Flask, request, jsonify, make_response
import jwt
import secrets
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route('/api/auth/refresh', methods=['POST'])
def refresh_tokens():
    # Get refresh token from cookie
    refresh_token = request.cookies.get('refreshToken')
    
    if not refresh_token:
        return jsonify({'error': 'No refresh token'}), 401
    
    # Validate refresh token
    token_data = db.refresh_tokens.find_one({
        'token': refresh_token,
        'expiresAt': {'$gt': datetime.utcnow()},
        'revoked': False
    })
    
    if not token_data:
        return jsonify({'error': 'Invalid refresh token'}), 401
    
    # Generate new access token
    access_token = jwt.encode(
        {
            'userId': str(token_data['userId']),
            'exp': datetime.utcnow() + timedelta(minutes=15)
        },
        app.config['ACCESS_TOKEN_SECRET'],
        algorithm='HS256'
    )
    
    response = make_response(jsonify({
        'accessToken': access_token
    }))
    
    return response
```

### React (Client)

```javascript
// hooks/useAuth.js
import { useState, useEffect } from 'react';

export function useAuth() {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Refresh tokens on mount
  useEffect(() => {
    refreshAccessToken();
  }, []);

  async function refreshAccessToken() {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'  // Send cookies
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        setAccessToken(accessToken);
      } else {
        // Redirect to login
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Auto-refresh before expiration
  useEffect(() => {
    if (!accessToken) return;

    // Decode token to get expiration
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    const expiresIn = payload.exp * 1000 - Date.now();
    
    // Refresh at 90% of token lifetime
    const refreshTime = expiresIn * 0.9;
    
    const timer = setTimeout(refreshAccessToken, refreshTime);
    return () => clearTimeout(timer);
  }, [accessToken]);

  async function logout() {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setAccessToken(null);
    window.location.href = '/login';
  }

  return { accessToken, isLoading, logout, refreshAccessToken };
}

// Usage in component
function App() {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) return <Loading />;
  if (!accessToken) return <Login />;

  return <Dashboard />;
}
```

---

## Real-World Use Cases

### 1. Mobile App with Biometric Re-authentication

```swift
// iOS implementation
class TokenManager {
    func refreshAccessToken(requiresBiometric: Bool = false) async throws -> String {
        if requiresBiometric {
            // Require biometric auth for sensitive operations
            let context = LAContext()
            try await context.evaluatePolicy(
                .deviceOwnerAuthenticationWithBiometrics,
                localizedReason: "Authenticate to refresh session"
            )
        }
        
        // Get refresh token from keychain
        guard let refreshToken = KeychainManager.shared.getRefreshToken() else {
            throw TokenError.noRefreshToken
        }
        
        // Call refresh endpoint
        let request = URLRequest(url: URL(string: "https://api.example.com/auth/refresh")!)
        // ... make request
        
        return newAccessToken
    }
}
```

### 2. Multi-Device Session Management

```javascript
// Backend: Track and display active sessions
app.get('/api/user/sessions', authenticate, async (req, res) => {
  const sessions = await db.refreshTokens.find({
    userId: req.user.id,
    revoked: false,
    expiresAt: { $gt: new Date() }
  }).select('createdAt lastUsed deviceInfo ipAddress location');
  
  const formattedSessions = sessions.map(session => ({
    id: session._id,
    device: session.deviceInfo,
    location: session.location,
    lastActive: session.lastUsed,
    current: session.token === req.cookies.refreshToken
  }));
  
  res.json({ sessions: formattedSessions });
});

// Revoke specific session
app.delete('/api/user/sessions/:sessionId', authenticate, async (req, res) => {
  await db.refreshTokens.updateOne(
    { _id: req.params.sessionId, userId: req.user.id },
    { revoked: true }
  );
  
  res.sendStatus(200);
});
```

### 3. Enterprise SSO with Step-Up Authentication

```javascript
// Require re-authentication for sensitive operations
async function sensitiveOperation(req, res) {
  const accessToken = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.decode(accessToken);
  
  // Check if recent authentication
  const authTime = decoded.auth_time;
  const reauthRequired = Date.now() - authTime > 5 * 60 * 1000; // 5 minutes
  
  if (reauthRequired) {
    return res.status(403).json({
      error: 'step_up_required',
      message: 'Recent authentication required for this operation'
    });
  }
  
  // Proceed with sensitive operation
  // ...
}
```

---

## Best Practices

### 1. Token Expiration Strategy

```javascript
// Environment-specific configuration
const TOKEN_CONFIG = {
  development: {
    accessToken: '1h',
    refreshToken: '7d'
  },
  production: {
    accessToken: '15m',
    refreshToken: '30d'
  },
  mobile: {
    accessToken: '1h',
    refreshToken: '90d'
  }
};
```

### 2. Monitoring and Alerting

```javascript
// Log token operations
function logTokenEvent(event, data) {
  logger.info({
    event,
    userId: data.userId,
    timestamp: new Date(),
    ipAddress: data.ip,
    userAgent: data.userAgent,
    success: data.success
  });
  
  // Alert on suspicious patterns
  if (detectAnomalies(data)) {
    alertSecurityTeam({
      severity: 'high',
      event: 'suspicious_token_activity',
      details: data
    });
  }
}
```

### 3. Graceful Degradation

```javascript
// Handle refresh failures gracefully
async function apiCall(endpoint) {
  try {
    let token = getAccessToken();
    
    let response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // If 401, try refreshing once
    if (response.status === 401) {
      token = await refreshAccessToken();
      response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    
    return response;
  } catch (error) {
    // Redirect to login
    redirectToLogin();
  }
}
```

---

## Resources

### Standards & Specifications
- **OAuth 2.0 RFC 6749**: https://datatracker.ietf.org/doc/html/rfc6749
- **OAuth 2.0 Token Revocation (RFC 7009)**: https://datatracker.ietf.org/doc/html/rfc7009
- **OAuth 2.0 for Browser-Based Apps**: https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps
- **OAuth 2.0 Security Best Practices**: https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics

### Tools & Libraries
- **jsonwebtoken (Node.js)**: https://github.com/auth0/node-jsonwebtoken
- **PyJWT (Python)**: https://github.com/jpadilla/pyjwt
- **jose (JavaScript)**: https://github.com/panva/jose
- **Spring Security OAuth**: https://spring.io/projects/spring-security-oauth

### Articles & Guides
- **Auth0: Refresh Token Rotation**: https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-rotation
- **OAuth.net**: https://oauth.net/2/
- **OWASP Authentication Cheat Sheet**: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

---

**Last Updated**: February 2026  
**Version**: 1.0
