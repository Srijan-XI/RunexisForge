# OAuth 2.0 & OIDC — User Guide

## Authorization Code Flow (OIDC)

This is the most common flow for web apps.

### 1. Register your app

Register with an identity provider (Google, Auth0, Azure AD) to get:

- **Client ID**: public identifier
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
```text

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

```bash
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
