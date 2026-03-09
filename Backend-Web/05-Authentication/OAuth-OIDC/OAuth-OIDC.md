# OAuth 2.0 & OpenID Connect (OIDC)

## Table of Contents
- [Introduction](#introduction)
- [Why OAuth 2.0 & OIDC?](#why-oauth-20--oidc)
- [Core Concepts](#core-concepts)
- [OAuth 2.0 Grant Types](#oauth-20-grant-types)
- [OpenID Connect (OIDC)](#openid-connect-oidc)
- [Token Management](#token-management)
- [Scope Handling](#scope-handling)
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
- Industry standard since 2012

**OpenID Connect (OIDC):**
- Authentication layer on OAuth 2.0
- ID tokens with user information (JWT)
- UserInfo endpoint for profile data
- Standard claims (sub, name, email, etc.)
- Single Sign-On (SSO) capabilities

---

## Why OAuth 2.0 & OIDC?

### Benefits

✅ **Security**
- No password sharing between apps
- Limited scope access
- Token-based authentication
- Industry-standard security practices

✅ **User Experience**
- Single Sign-On (SSO)
- Familiar login flows (Google, Facebook, etc.)
- Granular permission control
- Easy account linking

✅ **Developer Experience**
- Widely supported libraries
- Standard protocol
- Well-documented
- Easy integration with providers

✅ **Enterprise Ready**
- Compliance friendly (GDPR, HIPAA)
- Audit trails
- Centralized identity management
- Role-based access control (RBAC)

### Use Cases

- **Social Login**: Sign in with Google, Facebook, GitHub
- **API Access**: Mobile apps accessing backend APIs
- **Third-Party Integration**: Apps accessing user data (Spotify, Strava)
- **Microservices**: Service-to-service authentication
- **Single Sign-On (SSO)**: Enterprise identity federation
- **Mobile Apps**: Secure authentication without storing passwords

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
2. **Client**: The application requesting access
3. **Authorization Server**: Issues tokens (Google, Auth0, Okta)
4. **Resource Server**: API hosting protected resources

### Key Terms

**Access Token**
- Short-lived credential for API access
- Bearer token (typically JWT)
- Includes scopes/permissions
- Example lifetime: 1 hour

**Refresh Token**
- Long-lived credential
- Used to obtain new access tokens
- Revocable
- Example lifetime: 30-90 days

**ID Token (OIDC)**
- Proof of authentication
- JWT with user information
- Contains claims (sub, email, name)
- Should not be used for API access

**Scopes**
- Define permissions
- Space-separated list
- Examples: `read:users`, `write:posts`, `openid profile email`

**Claims**
- Pieces of information about user/token
- Standard claims: `sub`, `name`, `email`, `iss`, `exp`
- Custom claims: application-specific data

---

## OAuth 2.0 Grant Types

### User Guide

### 1. Authorization Code Grant

**Most secure flow** for web applications with server-side components.

**Flow Diagram:**
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
  │               │◄─9.Protected Resource───────────────│
```

**Step 1: Redirect to Authorization Endpoint**
- **Client Secret**: confidential key
- **Redirect URI**: where users return after login

### 2. Redirect user to authorization endpoint

```yaml
https://accounts.google.com/o/oauth2/v2/auth?
  client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=openid%20profile%20email
  &state=random_state_string
```

**Params:**

- `response_type=code`: request authorization code
- `scope=openid profile email`: what data you need
- `state`: CSRF protection token

### 3. User consents and is redirected back

```yaml
https://yourapp.com/callback?
  code=AUTH_CODE
  &state=random_state_string
```yaml

Verify `state` matches what you sent.

### 4. Exchange code for tokens

**POST** to token endpoint:

```
curl -X POST https://oauth2.googleapis.com/token \
  -d client_id=YOUR_CLIENT_ID \
  -d client_secret=YOUR_CLIENT_SECRET \
  -d code=AUTH_CODE \
  -d redirect_uri=https://yourapp.com/callback \
  -d grant_type=authorization_code
```yaml

**Response:**

```json
{
  "access_token": "ya29.a0AfH6...",
  "id_token": "eyJhbGciOiJSUzI1NiIs...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "refresh_token": "1//0gH..."
}
```yaml

### 5. Decode ID Token (JWT)

**Example ID Token payload:**

```json
{
  "iss": "https://accounts.google.com",
  "sub": "10769150350006150715113082367",
  "email": "user@example.com",
  "email_verified": true,
  "name": "John Doe",
  "picture": "https://...",
  "iat": 1516239022,
  "exp": 1516242622
}
```yaml

**Validate:**

- Signature (use provider's public keys)
- `iss` (issuer) matches expected
- `aud` (audience) matches your Client ID
- `exp` (expiration) not passed

### 6. Use Access Token to call APIs

```bash
curl https://www.googleapis.com/oauth2/v1/userinfo \
  -H "Authorization: Bearer ACCESS_TOKEN"
```yaml

---

## Refresh tokens

When access token expires, use refresh token to get a new one:

```bash
curl -X POST https://oauth2.googleapis.com/token \
  -d client_id=YOUR_CLIENT_ID \
  -d client_secret=YOUR_CLIENT_SECRET \
  -d refresh_token=REFRESH_TOKEN \
  -d grant_type=refresh_token
```yaml

---

## PKCE (Proof Key for Code Exchange)

For mobile/SPA apps that can't securely store client secrets.

### 1. Generate code verifier and challenge

```javascript
const codeVerifier = base64UrlEncode(crypto.randomBytes(32));
const codeChallenge = base64UrlEncode(sha256(codeVerifier));
```yaml

### 2. Authorization request (include challenge)

```yaml
https://accounts.google.com/o/oauth2/v2/auth?
  ...
  &code_challenge=CODE_CHALLENGE
  &code_challenge_method=S256
```yaml

### 3. Token request (include verifier)

```yaml
POST /token
  ...
  code_verifier=CODE_VERIFIER
```yaml

No client secret needed; the verifier proves authenticity.

---

## Client Credentials Flow (server-to-server)

For machine-to-machine auth (no user involved).

```bash
curl -X POST https://oauth.provider.com/token \
  -d client_id=YOUR_CLIENT_ID \
  -d client_secret=YOUR_CLIENT_SECRET \
  -d grant_type=client_credentials \
  -d scope=api.read
```yaml

**Response:**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```yaml

---

## Implementing in Node.js (Passport.js)

```bash
npm install passport passport-google-oauth20 express-session
```bash

**app.js:**

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // Save user to database
    return done(null, profile);
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);
```bash

---

## Implementing in Python (Authlib)

```bash
pip install authlib requests
```bash

```python
from authlib.integrations.flask_client import OAuth
from flask import Flask, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'random_secret_key'
oauth = OAuth(app)

google = oauth.register(
    name='google',
    client_id='YOUR_CLIENT_ID',
    client_secret='YOUR_CLIENT_SECRET',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

@app.route('/login')
def login():
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/authorize')
def authorize():
    token = google.authorize_access_token()
    user_info = google.parse_id_token(token)
    session['user'] = user_info
    return redirect('/dashboard')
```bash

---

## Security best practices

- Always use HTTPS
- Validate `state` parameter (CSRF protection)
- Verify ID Token signature and claims
- Store tokens securely (encrypted, httpOnly cookies)
- Use PKCE for public clients (mobile, SPA)
- Rotate refresh tokens
- Implement token expiration and refresh logic

---

## References

- OAuth 2.0 spec: <https://oauth.net/2/>
- OIDC spec: <https://openid.net/connect/>
- Auth0 docs: <https://auth0.com/docs/>
- Google OIDC: <https://developers.google.com/identity/protocols/oauth2/openid-connect>

