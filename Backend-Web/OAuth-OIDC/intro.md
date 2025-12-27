# OAuth 2.0 & OIDC — Introduction

OAuth 2.0 is an authorization framework that allows third-party apps to access user resources without exposing passwords. OpenID Connect (OIDC) is an identity layer on top of OAuth 2.0.

## Why OAuth 2.0 & OIDC?

- **Delegated access**: users grant limited access to their data
- **No password sharing**: apps never see user passwords
- **Standard protocol**: widely supported (Google, GitHub, Azure AD)
- **Identity**: OIDC adds authentication and user info

## Key concepts

- **Resource Owner**: the user
- **Client**: the app requesting access
- **Authorization Server**: issues tokens (e.g., Google, Auth0)
- **Resource Server**: the API being accessed
- **Access Token**: proof of authorization
- **ID Token** (OIDC): proof of authentication, contains user info

## OAuth 2.0 flows

- **Authorization Code**: most secure, for web apps
- **Client Credentials**: for server-to-server
- **PKCE**: for mobile/SPA apps

## OIDC additions

- ID Token (JWT with user claims)
- UserInfo endpoint
- Standard scopes (openid, profile, email)

## Where to go next

- User guide: `Backend-Web/OAuth-OIDC/user-guide.md`
- Examples: `Backend-Web/OAuth-OIDC/examples/`
