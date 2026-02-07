# OAuth 2.0 & OpenID Connect (OIDC) - Complete Guide

## Table of Contents
- [Introduction](#introduction)
- [Why OAuth 2.0 & OIDC?](#why-oauth-20--oidc)
- [Core Concepts](#core-concepts)
- [OAuth 2.0 Grant Types](#oauth-20-grant-types)
- [OpenID Connect (OIDC)](#openid-connect-oidc)
- [Token Management](#token-management)
- [Scope Handling](#scope-handling)
- [PKCE (Proof Key for Code Exchange)](#pkce-proof-key-for-code-exchange)
- [Security Best Practices](#security-best-practices)
- [Implementation Examples](#implementation-examples)
- [Token Validation](#token-validation)
- [Common Providers](#common-providers)
- [OAuth 2.0 vs OIDC vs SAML](#oauth-20-vs-oidc-vs-saml)
- [Resources](#resources)

---

## Introduction

OAuth 2.0 is an industry-standard **authorization framework** that enables applications to obtain limited access to user accounts on an HTTP service. OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0 that adds **authentication** capabilities and standardized user identity information.

### Key Characteristics

**OAuth 2.0:**
- Authorization framework (not authentication)
- Delegated access to resources
- Access tokens for API calls
- Multiple grant types for different use cases
- Industry standard since 2012 (RFC 6749)

**OpenID Connect (OIDC):**
- Authentication layer on OAuth 2.0
- ID tokens with user information (JWT)
- UserInfo endpoint for profile data
- Standard claims (sub, name, email, etc.)
- Single Sign-On (SSO) capabilities
- Standard since 2014

---

## Why OAuth 2.0 & OIDC?

### Benefits

✅ **Security**
- No password sharing between apps
- Limited scope access
- Token-based authentication
- Industry-standard security practices
- Revocable access

✅ **User Experience**
- Single Sign-On (SSO)
- Familiar login flows (Google, Facebook, GitHub)
- Granular permission control
- Easy account linking
- Consent management

✅ **Developer Experience**
- Widely supported libraries
- Standard protocol
- Well-documented
- Easy integration with providers
- Code generation tools

✅ **Enterprise Ready**
- Compliance friendly (GDPR, HIPAA, SOC 2)
- Audit trails
- Centralized identity management
- Role-based access control (RBAC)
- Multi-factor authentication (MFA) support

### Use Cases

- **Social Login**: Sign in with Google, Facebook, GitHub
- **API Access**: Mobile apps accessing backend APIs
- **Third-Party Integration**: Apps accessing user data (Spotify, Strava, Gmail)
- **Microservices**: Service-to-service authentication
- **Single Sign-On (SSO)**: Enterprise identity federation
- **Mobile Apps**: Secure authentication without storing passwords
- **IoT Devices**: Secure device authentication

---

## Core Concepts

### OAuth 2.0 Roles

```
┌──────────────┐         ┌──────────────────┐
│   Resource   │◄────────│  Resource Server │
│     Owner    │         │   (API Server)   │
│   (User)     │         └──────────────────┘
└──────────────┘                  ▲
      │                           │
      │ 1. Authorization          │ 4. Access API
      │    Request                │    with Token
      ▼                           │
┌──────────────┐         ┌──────────────────┐
│    Client    │────────>│  Authorization   │
│ Application  │ 2. Auth │     Server       │
│              │◄────────│  (Identity       │
└──────────────┘ 3. Token│   Provider)      │
                         └──────────────────┘
```

1. **Resource Owner**: The user who owns the data
2. **Client**: The application requesting access (web app, mobile app, SPA)
3. **Authorization Server**: Issues tokens (Google, Auth0, Okta, Azure AD)
4. **Resource Server**: API hosting protected resources

### Key Terms

**Access Token**
- Short-lived credential for API access
- Bearer token (typically JWT or opaque)
- Includes scopes/permissions
- Example lifetime: 15 minutes - 1 hour
- Format: `Bearer eyJhbGciOiJSUzI1NiIs...`

**Refresh Token**
- Long-lived credential
- Used to obtain new access tokens
- Revocable
- Example lifetime: 30-90 days (or indefinite with rotation)
- Should be stored securely

**ID Token (OIDC only)**
- Proof of authentication
- Always a JWT
- Contains claims (sub, email, name, iat, exp)
- Should NOT be used for API access
- Typically short-lived (5-15 minutes)

**Authorization Code**
- Temporary code exchanged for tokens
- One-time use
- Short lifetime (30-60 seconds)
- Prevents token exposure in browser history

**Scopes**
- Define permissions/access levels
- Space-separated list
- Examples: `read:users write:posts openid profile email`
- Provider-specific or standard (OIDC)

**Claims**
- Pieces of information about user/token
- Standard claims: `sub`, `name`, `email`, `iss`, `aud`, `exp`, `iat`
- Custom claims: application-specific data

---

## OAuth 2.0 Grant Types

### 1. Authorization Code Grant

**Most secure** - Recommended for web applications with server-side components.

**Flow:**
```
User            Client          Auth Server      Resource Server
  │               │                  │                  │
  │─1.Login──────>│                  │                  │
  │               │──2.Auth Request─>│                  │
  │◄──────────────┼──3.Login Page────│                  │
  │─4.Credentials>│                  │                  │
  │               │◄─5.Auth Code─────│                  │
  │               │──6.Token Request>│                  │
  │               │◄─7.Access Token──│                  │
  │               │──8.API Request──────────────────────>│
  │               │◄─9.Response──────────────────────────│
```

**Step 1: Authorization Request**
```http
GET /authorize?
  response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &scope=openid%20profile%20email
  &state=random_csrf_token
  &code_challenge=BASE64URL(SHA256(code_verifier))
  &code_challenge_method=S256
```

**Parameters:**
- `response_type=code`: Request authorization code
- `client_id`: Your application's client ID
- `redirect_uri`: Where to send user after authorization
- `scope`: Requested permissions
- `state`: CSRF protection token (verify on callback)
- `code_challenge`: For PKCE (optional but recommended)

**Step 2: User Authenticates & Consents**

User logs in and approves permissions.

**Step 3: Authorization Code Returned**
```http
GET https://yourapp.com/callback?
  code=AUTH_CODE_HERE
  &state=random_csrf_token
```

**Verify:**
- `state` parameter matches original request
- Check for error parameters

**Step 4: Exchange Code for Tokens**
```http
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=AUTH_CODE_HERE
&redirect_uri=https://yourapp.com/callback
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
&code_verifier=ORIGINAL_CODE_VERIFIER
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "v1.MRqKJbHGNR...",
  "id_token": "eyJhbGciOiJSUzI1NiIs...",
  "scope": "openid profile email"
}
```

### 2. Client Credentials Grant

**Server-to-server** - For machine-to-machine authentication (no user involved).

**Flow:**
```
Client                Auth Server           Resource Server
  │                         │                       │
  │──1.Token Request──────>│                       │
  │    (client creds)       │                       │
  │◄─2.Access Token─────────│                       │
  │──3.API Request─────────────────────────────────>│
  │    (with token)         │                       │
  │◄─4.Protected Resource───────────────────────────│
```

**Request:**
```http
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
&scope=api.read api.write
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "api.read api.write"
}
```

**Use Cases:**
- Microservice communication
- Batch jobs
- CI/CD pipelines
- Server-side automation

### 3. Implicit Grant (Deprecated)

⚠️ **Not recommended** - Use Authorization Code with PKCE instead.

Originally designed for browser-based apps but has security vulnerabilities:
- Tokens exposed in URL
- No refresh tokens
- Limited security controls

**Legacy flow (for reference only):**
```http
GET /authorize?
  response_type=token
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &scope=openid%20profile

# Returns token in URL fragment:
https://yourapp.com/callback#access_token=...&token_type=Bearer
```

### 4. Resource Owner Password Credentials (Deprecated)

⚠️ **Not recommended** - Only for trusted first-party applications.

**Request:**
```http
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=password
&username=user@example.com
&password=user_password
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
```

**Issues:**
- Exposes passwords to client
- No SSO benefits
- Limited MFA support
- Use only for migration scenarios

### 5. Device Authorization Grant

**For devices** with limited input capabilities (Smart TVs, IoT, CLIs).

**Flow:**
```
Device              User's Browser        Auth Server
  │                       │                    │
  │──1.Device Auth Req───>│                    │
  │◄─2.User Code & URL────│                    │
  │                       │                    │
  │ Display: "Visit       │                    │
  │ example.com/activate  │                    │
  │ Enter code: ABCD-1234"│                    │
  │                       │─3.Visit URL───────>│
  │                       │─4.Enter Code──────>│
  │                       │◄─5.Consent Screen──│
  │                       │─6.Approve─────────>│
  │──7.Poll Token─────────────────────────────>│
  │◄─8.Access Token───────────────────────────│
```

**Step 1: Request Device Code**
```http
POST /device/code
Content-Type: application/x-www-form-urlencoded

client_id=YOUR_CLIENT_ID
&scope=openid profile
```

**Response:**
```json
{
  "device_code": "GmRhmhcxhwAzkoEqiMEg_DnyEysNkuNhszIySk9eS",
  "user_code": "WDJB-MJHT",
  "verification_uri": "https://example.com/activate",
  "verification_uri_complete": "https://example.com/activate?user_code=WDJB-MJHT",
  "expires_in": 1800,
  "interval": 5
}
```

**Step 2: Poll for Token**
```http
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:device_code
&client_id=YOUR_CLIENT_ID
&device_code=GmRhmhcxhwAzkoEqiMEg_DnyEysNkuNhszIySk9eS
```

---

## OpenID Connect (OIDC)

OIDC adds **authentication** on top of OAuth 2.0's authorization.

### OIDC Flow

Same as OAuth 2.0 Authorization Code, but:
- Include `openid` scope
- Receive ID Token in addition to access token
- Use UserInfo endpoint for additional user data

### ID Token Structure (JWT)

**Header:**
```json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "1234567890abcdef"
}
```

**Payload:**
```json
{
  "iss": "https://accounts.google.com",
  "sub": "110169484474386276334",
  "aud": "your-client-id.apps.googleusercontent.com",
  "exp": 1642694400,
  "iat": 1642690800,
  "nonce": "random_nonce_value",
  "name": "John Doe",
  "given_name": "John",
  "family_name": "Doe",
  "email": "john.doe@example.com",
  "email_verified": true,
  "picture": "https://lh3.googleusercontent.com/..."
}
```

**Signature:**
```
RSASHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  privateKey
)
```

### Standard OIDC Claims

| Claim | Description |
|-------|-------------|
| `sub` | Subject identifier (unique user ID) |
| `name` | Full name |
| `given_name` | First name |
| `family_name` | Last name |
| `middle_name` | Middle name |
| `nickname` | Casual name |
| `preferred_username` | Username |
| `profile` | Profile page URL |
| `picture` | Profile picture URL |
| `website` | Website URL |
| `email` | Email address |
| `email_verified` | Email verification status |
| `gender` | Gender |
| `birthdate` | Birthdate (YYYY-MM-DD) |
| `zoneinfo` | Timezone |
| `locale` | Locale (en-US) |
| `phone_number` | Phone number |
| `phone_number_verified` | Phone verification status |
| `address` | Address object |
| `updated_at` | Last update timestamp |

### UserInfo Endpoint

Retrieve additional user information:

```http
GET /userinfo
Authorization: Bearer ACCESS_TOKEN
```

**Response:**
```json
{
  "sub": "110169484474386276334",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "email_verified": true,
  "picture": "https://...",
  "locale": "en"
}
```

### Discovery Document

OIDC providers publish configuration at `/.well-known/openid-configuration`:

```http
GET https://accounts.google.com/.well-known/openid-configuration
```

**Response:**
```json
{
  "issuer": "https://accounts.google.com",
  "authorization_endpoint": "https://accounts.google.com/o/oauth2/v2/auth",
  "token_endpoint": "https://oauth2.googleapis.com/token",
  "userinfo_endpoint": "https://openidconnect.googleapis.com/v1/userinfo",
  "jwks_uri": "https://www.googleapis.com/oauth2/v3/certs",
  "scopes_supported": ["openid", "email", "profile"],
  "response_types_supported": ["code", "token", "id_token"],
  "grant_types_supported": ["authorization_code", "refresh_token"],
  "subject_types_supported": ["public"],
  "id_token_signing_alg_values_supported": ["RS256"]
}
```

---

## Token Management

### Token Lifecycle

```
┌─────────────────────────────────────────────────┐
│ 1. Obtain Tokens (Authorization Code Exchange) │
└───────────────────┬─────────────────────────────┘
                    │
        ┌───────────▼──────────┐
        │   Use Access Token   │
        │    (API Requests)    │
        └───────────┬──────────┘
                    │
                    ▼
              Token Expired?
                 │      │
             NO  │      │ YES
                 │      │
                 │      ▼
                 │  ┌──────────────────┐
                 │  │ Use Refresh Token│
                 │  │ (Get New Access) │
                 │  └────────┬─────────┘
                 │           │
                 └◄──────────┘
                    │
                    ▼
         Refresh Token Valid?
                 │      │
             YES │      │ NO
                 │      │
                 │      ▼
                 │  ┌──────────────┐
                 │  │ Re-authorize │
                 │  │  User Again  │
                 │  └──────────────┘
                 │
                 ▼
          Continue Using
```

### Refresh Token Flow

**Request:**
```http
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token=v1.MRqKJbHGNR...
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
&scope=openid profile email
```

**Response:**
```json
{
  "access_token": "new_access_token_here",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "new_refresh_token_here",
  "scope": "openid profile email"
}
```

**Note:** Some providers rotate refresh tokens for security.

### Token Storage

**Web Applications (Server-Side):**
```javascript
// Store in server session
app.get('/callback', async (req, res) => {
  const tokens = await exchangeCodeForTokens(req.query.code);
  
  // Store in encrypted session
  req.session.tokens = {
    access_token: tokens.access_token,
    refresh_token: encrypt(tokens.refresh_token), // Encrypt sensitive data
    expires_at: Date.now() + tokens.expires_in * 1000
  };
  
  res.redirect('/dashboard');
});
```

**Single Page Applications (SPAs):**
```javascript
// Use secure, httpOnly cookies via backend
// OR in-memory storage (lost on page refresh)

class TokenManager {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
  }
  
  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    // Never store refresh tokens in localStorage!
    // Use httpOnly cookies or in-memory only
  }
  
  async getAccessToken() {
    if (this.isTokenExpired(this.accessToken)) {
      await this.refreshAccessToken();
    }
    return this.accessToken;
  }
}
```

**Mobile Applications:**
```swift
// Use secure storage (iOS Keychain, Android Keystore)
import KeychainAccess

let keychain = Keychain(service: "com.yourapp.tokens")

// Store tokens
keychain["access_token"] = accessToken
keychain["refresh_token"] = refreshToken

// Retrieve tokens
if let accessToken = keychain["access_token"] {
  // Use token
}
```

### Token Revocation

**Revoke Refresh Token:**
```http
POST /revoke
Content-Type: application/x-www-form-urlencoded

token=REFRESH_TOKEN_HERE
&token_type_hint=refresh_token
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
```

**Logout:**
```javascript
async function logout() {
  // 1. Revoke tokens
  await revokeTokens();
  
  // 2. Clear local storage
  sessionStorage.clear();
  localStorage.clear();
  
  // 3. Redirect to provider logout (optional)
  window.location.href = 'https://accounts.google.com/logout';
}
```

---

## Scope Handling

### Standard OIDC Scopes

| Scope | Description | Claims Included |
|-------|-------------|-----------------|
| `openid` | **Required** for OIDC | `sub` |
| `profile` | User profile info | `name`, `family_name`, `given_name`, `picture`, `locale` |
| `email` | Email address | `email`, `email_verified` |
| `address` | Physical address | `address` object |
| `phone` | Phone number | `phone_number`, `phone_number_verified` |
| `offline_access` | Refresh token | Enables refresh token issuance |

### Custom Scopes

**Define custom scopes for your API:**
```javascript
// Authorization request
const scopes = [
  'openid',
  'profile',
  'email',
  'read:posts',
  'write:posts',
  'admin:users'
].join(' ');

const authUrl = `${authEndpoint}?scope=${encodeURIComponent(scopes)}`;
```

**Validate scopes in API:**
```javascript
function requireScope(requiredScope) {
  return (req, res, next) => {
    const tokenScopes = req.user.scope.split(' ');
    
    if (!tokenScopes.includes(requiredScope)) {
      return res.status(403).json({
        error: 'insufficient_scope',
        message: `Requires ${requiredScope} scope`
      });
    }
    
    next();
  };
}

// Usage
app.delete('/posts/:id', 
  authenticate,
  requireScope('write:posts'),
  deletePost
);
```

### Incremental Authorization

Request additional scopes later:

```javascript
// Initial login: basic scopes
const initialScopes = 'openid profile email';

// Later: request additional scopes
async function requestCalendarAccess() {
  const additionalScopes = 'https://www.googleapis.com/auth/calendar';
  
  const authUrl = `${authEndpoint}?` +
    `scope=${encodeURIComponent(additionalScopes)}` +
    `&prompt=consent` + // Force consent screen
    `&include_granted_scopes=true`; // Keep existing scopes
  
  window.location.href = authUrl;
}
```

---

## PKCE (Proof Key for Code Exchange)

PKCE prevents authorization code interception attacks. **Recommended for all public clients** (mobile, SPA, desktop apps).

### How PKCE Works

```
Client                          Auth Server
  │                                  │
  │──1. Generate Code Verifier──────│
  │    (random string)               │
  │                                  │
  │──2. Create Code Challenge────────│
  │    SHA256(code_verifier)         │
  │                                  │
  │──3. Auth Request with Challenge─>│
  │    ?code_challenge=...           │
  │    &code_challenge_method=S256   │
  │                                  │
  │◄─4. Authorization Code───────────│
  │                                  │
  │──5. Token Request with Verifier─>│
  │    code_verifier=original_string │
  │                                  │
  │    Server verifies:              │
  │    SHA256(code_verifier) ==      │
  │    code_challenge                │
  │                                  │
  │◄─6. Access Token─────────────────│
```

### Implementation

**Step 1: Generate Code Verifier & Challenge**
```javascript
// Generate code verifier (43-128 characters)
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

// Create code challenge
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(hash));
}

function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Usage
const codeVerifier = generateCodeVerifier();
const codeChallenge = await generateCodeChallenge(codeVerifier);

// Store verifier (in-memory or sessionStorage)
sessionStorage.setItem('pkce_code_verifier', codeVerifier);
```

**Step 2: Authorization Request**
```javascript
const authUrl = `${authEndpoint}?` +
  `response_type=code` +
  `&client_id=${clientId}` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}` +
  `&scope=${encodeURIComponent('openid profile email')}` +
  `&code_challenge=${codeChallenge}` +
  `&code_challenge_method=S256` +
  `&state=${state}`;

window.location.href = authUrl;
```

**Step 3: Token Exchange**
```javascript
const codeVerifier = sessionStorage.getItem('pkce_code_verifier');

const response = await fetch(tokenEndpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
  })
});

const tokens = await response.json();
```

---

## Security Best Practices

### 1. Always Use HTTPS

```nginx
# Force HTTPS redirect
server {
    listen 80;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

### 2. Validate State Parameter (CSRF Protection)

```javascript
// Generate state
const state = crypto.randomBytes(32).toString('hex');
req.session.oauthState = state;

// Redirect to auth
const authUrl = `${authEndpoint}?state=${state}&...`;

// On callback
app.get('/callback', (req, res) => {
  if (req.query.state !== req.session.oauthState) {
    return res.status(403).send('Invalid state parameter');
  }
  
  delete req.session.oauthState; // One-time use
  // Continue...
});
```

### 3. Validate ID Token

```javascript
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

async function validateIdToken(idToken, clientId, issuer) {
  // 1. Get signing keys from JWKS endpoint
  const client = jwksClient({
    jwksUri: `${issuer}/.well-known/jwks.json`
  });
  
  const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
      callback(null, key.publicKey || key.rsaPublicKey);
    });
  };
  
  // 2. Verify and decode
  return new Promise((resolve, reject) => {
    jwt.verify(idToken, getKey, {
      audience: clientId,
      issuer: issuer,
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}

// Usage
try {
  const claims = await validateIdToken(
    idToken,
    'your-client-id',
    'https://accounts.google.com'
  );
  console.log('User:', claims.email);
} catch (err) {
  console.error('Invalid ID token:', err);
}
```

### 4. Secure Token Storage

**❌ Never store tokens in:**
- `localStorage` (vulnerable to XSS)
- URL parameters
- Session storage (for sensitive tokens)
- Cookies without `httpOnly` flag

**✅ Best practices:**
```javascript
// Server-side: HTTP-only, secure cookies
res.cookie('refresh_token', refreshToken, {
  httpOnly: true,
  secure: true, // HTTPS only
  sameSite: 'strict',
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
});

// Client-side: In-memory storage for access tokens
class TokenStore {
  constructor() {
    this.accessToken = null; // In-memory only
  }
  
  setAccessToken(token) {
    this.accessToken = token;
  }
  
  getAccessToken() {
    return this.accessToken;
  }
}
```

### 5. Implement Token Rotation

```javascript
async function refreshAccessToken() {
  const response = await fetch('/api/refresh', {
    method: 'POST',
    credentials: 'include' // Include httpOnly cookie
  });
  
  const { access_token, refresh_token } = await response.json();
  
  // Update access token in memory
  tokenStore.setAccessToken(access_token);
  
  // Server rotates refresh token in httpOnly cookie
  return access_token;
}
```

### 6. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many authentication attempts'
});

app.post('/token', authLimiter, tokenHandler);
```

### 7. Audit Logging

```javascript
function logAuthEvent(event, userId, metadata) {
  logger.info({
    event,
    userId,
    timestamp: new Date(),
    ip: metadata.ip,
    userAgent: metadata.userAgent,
    scope: metadata.scope
  });
}

// Usage
app.post('/token', async (req, res) => {
  const tokens = await exchangeCode(req.body.code);
  
  logAuthEvent('token_issued', tokens.sub, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
    scope: tokens.scope
  });
  
  res.json(tokens);
});
```

---

## Implementation Examples

### Node.js (Express + Passport.js)

```bash
npm install express passport passport-google-oauth20 express-session
```

```javascript
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://yourapp.com/auth/google/callback",
    scope: ['openid', 'profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    // Save user to database
    const user = await User.findOrCreate({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0].value
    });
    
    // Store tokens (encrypted)
    user.tokens = {
      access: encrypt(accessToken),
      refresh: encrypt(refreshToken)
    };
    
    await user.save();
    return done(null, user);
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Routes
app.get('/auth/google',
  passport.authenticate('google')
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.listen(3000);
```

### Python (Flask + Authlib)

```bash
pip install flask authlib requests
```

```python
from flask import Flask, redirect, url_for, session, request
from authlib.integrations.flask_client import OAuth
import os

app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']

oauth = OAuth(app)

# Configure Google OAuth
google = oauth.register(
    name='google',
    client_id=os.environ['GOOGLE_CLIENT_ID'],
    client_secret=os.environ['GOOGLE_CLIENT_SECRET'],
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)

@app.route('/login')
def login():
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/authorize')
def authorize():
    token = google.authorize_access_token()
    user_info = google.parse_id_token(token)
    
    # Store user in session
    session['user'] = {
        'id': user_info['sub'],
        'email': user_info['email'],
        'name': user_info['name'],
        'picture': user_info.get('picture')
    }
    
    return redirect('/dashboard')

@app.route('/dashboard')
def dashboard():
    user = session.get('user')
    if not user:
        return redirect('/login')
    return f"Welcome {user['name']}!"

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

if __name__ == '__main__':
    app.run(ssl_context='adhoc')  # HTTPS
```

### React SPA (PKCE Flow)

```bash
npm install @auth0/auth0-spa-js
```

```javascript
import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0Client = new Auth0Client({
  domain: 'your-domain.auth0.com',
  client_id: 'YOUR_CLIENT_ID',
  redirect_uri: window.location.origin,
  cacheLocation: 'memory', // Don't use localStorage
  useRefreshTokens: true
});

// Login
async function login() {
  await auth0Client.loginWithRedirect({
    redirect_uri: window.location.origin + '/callback'
  });
}

// Handle callback
async function handleCallback() {
  const query = window.location.search;
  if (query.includes('code=')) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/');
  }
}

// Get access token
async function getAccessToken() {
  try {
    const token = await auth0Client.getTokenSilently();
    return token;
  } catch (err) {
    if (err.error === 'login_required') {
      await login();
    }
  }
}

// Make authenticated API call
async function callAPI() {
  const token = await getAccessToken();
  
  const response = await fetch('https://api.yourapp.com/data', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
}

// Logout
async function logout() {
  await auth0Client.logout({
    returnTo: window.location.origin
  });
}

// React component
function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    handleCallback();
    
    auth0Client.isAuthenticated().then(authenticated => {
      if (authenticated) {
        auth0Client.getUser().then(setUser);
      }
    });
  }, []);
  
  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome {user.name}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

### Mobile (iOS Swift)

```swift
import AppAuth

class AuthManager {
    var authState: OIDAuthState?
    
    func login(viewController: UIViewController, completion: @escaping (Error?) -> Void) {
        // Discovery
        let issuer = URL(string: "https://accounts.google.com")!
        
        OIDAuthorizationService.discoverConfiguration(forIssuer: issuer) { config, error in
            guard let configuration = config else {
                completion(error)
                return
            }
            
            // Authorization request
            let request = OIDAuthorizationRequest(
                configuration: configuration,
                clientId: "YOUR_CLIENT_ID",
                clientSecret: nil,
                scopes: ["openid", "profile", "email"],
                redirectURL: URL(string: "com.yourapp:/oauth2redirect")!,
                responseType: OIDResponseTypeCode,
                additionalParameters: nil
            )
            
            // Perform authorization
            self.authState = OIDAuthState.authState(byPresenting: request, presenting: viewController) { authState, error in
                if let authState = authState {
                    self.authState = authState
                    self.saveTokens(authState)
                    completion(nil)
                } else {
                    completion(error)
                }
            }
        }
    }
    
    func getAccessToken(completion: @escaping (String?, Error?) -> Void) {
        authState?.performAction { accessToken, idToken, error in
            completion(accessToken, error)
        }
    }
    
    func saveTokens(_ authState: OIDAuthState) {
        let keychain = Keychain(service: "com.yourapp.tokens")
        keychain["auth_state"] = try? NSKeyedArchiver.archivedData(
            withRootObject: authState,
            requiringSecureCoding: false
        )
    }
}
```

---

## Token Validation

### Validate Access Token (JWT)

```javascript
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

// Middleware to validate access token
function validateAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.substring(7);
  
  // Get signing key
  const client = jwksRsa({
    jwksUri: 'https://your-domain.auth0.com/.well-known/jwks.json',
    cache: true,
    cacheMaxAge: 86400000 // 24 hours
  });
  
  const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
      callback(null, key?.publicKey || key?.rsaPublicKey);
    });
  };
  
  // Verify JWT
  jwt.verify(token, getKey, {
    audience: 'https://api.yourapp.com',
    issuer: 'https://your-domain.auth0.com/',
    algorithms: ['RS256']
  }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    req.user = decoded;
    next();
  });
}

// Usage
app.get('/api/protected', validateAccessToken, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});
```

### Introspection Endpoint

For opaque tokens:

```javascript
async function introspectToken(token) {
  const response = await fetch('https://auth-server.com/introspect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString('base64')
    },
    body: new URLSearchParams({
      token: token,
      token_type_hint: 'access_token'
    })
  });
  
  return response.json();
}

// Response
{
  "active": true,
  "scope": "read:posts write:posts",
  "client_id": "client123",
  "username": "john.doe",
  "token_type": "Bearer",
  "exp": 1642694400,
  "iat": 1642690800,
  "sub": "user-123"
}
```

---

## Common Providers

### Google

```javascript
{
  issuer: 'https://accounts.google.com',
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  userinfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
  scopes: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/calendar']
}
```

### Auth0

```javascript
{
  issuer: 'https://your-domain.auth0.com/',
  authorizationEndpoint: 'https://your-domain.auth0.com/authorize',
  tokenEndpoint: 'https://your-domain.auth0.com/oauth/token',
  userinfoEndpoint: 'https://your-domain.auth0.com/userinfo',
  scopes: ['openid', 'profile', 'email', 'offline_access']
}
```

### Okta

```javascript
{
  issuer: 'https://your-domain.okta.com/oauth2/default',
  authorizationEndpoint: 'https://your-domain.okta.com/oauth2/default/v1/authorize',
  tokenEndpoint: 'https://your-domain.okta.com/oauth2/default/v1/token',
  userinfoEndpoint: 'https://your-domain.okta.com/oauth2/default/v1/userinfo'
}
```

### Microsoft Azure AD

```javascript
{
  issuer: 'https://login.microsoftonline.com/{tenant}/v2.0',
  authorizationEndpoint: 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize',
  tokenEndpoint: 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token',
  scopes: ['openid', 'profile', 'email', 'offline_access']
}
```

### GitHub

```javascript
{
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  userinfoEndpoint: 'https://api.github.com/user',
  scopes: ['read:user', 'user:email', 'repo']
}
```

---

## OAuth 2.0 vs OIDC vs SAML

| Feature | OAuth 2.0 | OIDC | SAML |
|---------|-----------|------|------|
| **Purpose** | Authorization | Authentication + Authorization | Authentication |
| **Format** | JSON | JSON (JWT) | XML |
| **Token Type** | Access Token | Access + ID Token | SAML Assertion |
| **Use Case** | API Access | Modern apps, SSO | Enterprise SSO |
| **Complexity** | Medium | Medium | High |
| **Mobile Support** | ✅ Excellent | ✅ Excellent | ⚠️ Limited |
| **Browser Support** | ✅ Native | ✅ Native | ⚠️ Limited |
| **User Info** | Custom API | Standard claims | Attributes |
| **Standard Since** | 2012 | 2014 | 2005 |

---

## Resources

### Official Specifications
- [OAuth 2.0 (RFC 6749)](https://datatracker.ietf.org/doc/html/rfc6749)
- [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)
- [PKCE (RFC 7636)](https://datatracker.ietf.org/doc/html/rfc7636)
- [JWT (RFC 7519)](https://datatracker.ietf.org/doc/html/rfc7519)

### Learning Resources
- [OAuth.com](https://www.oauth.com/) - Comprehensive guide
- [OAuth 2.0 Playground](https://www.oauth.com/playground/)
- [JWT.io](https://jwt.io/) - JWT debugger
- [OpenID Connect Playground](https://openidconnect.net/)

### Provider Documentation
- [Google Identity Platform](https://developers.google.com/identity)
- [Auth0 Docs](https://auth0.com/docs)
- [Okta Developer](https://developer.okta.com/)
- [Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/)
- [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps)

### Libraries
- **Node.js**: `passport`, `@auth0/auth0-spa-js`, `openid-client`
- **Python**: `authlib`, `python-jose`, `requests-oauthlib`
- **Java**: `Spring Security OAuth`, `Pac4j`
- **C#**: `IdentityServer`, `Microsoft.Identity.Web`
- **Go**: `golang.org/x/oauth2`, `coreos/go-oidc`
- **Ruby**: `omniauth`, `doorkeeper`

### Tools
- [Postman](https://www.postman.com/) - API testing
- [OAuth Debugger](https://oauthdebugger.com/)
- [JWT Debugger](https://jwt.io/)
- [Auth0 by Okta](https://auth0.com/) - Identity platform

---

**Last Updated**: January 2026  
**OAuth 2.0 Version**: RFC 6749  
**OIDC Version**: 1.0
