# SAML - Security Assertion Markup Language

## Table of Contents
- [Introduction](#introduction)
- [Why SAML?](#why-saml)
- [Core Concepts](#core-concepts)
- [SAML 2.0 Protocol](#saml-20-protocol)
- [SSO Flow](#sso-flow)
- [SAML Assertions](#saml-assertions)
- [Service Provider vs Identity Provider](#service-provider-vs-identity-provider)
- [Implementation Examples](#implementation-examples)
- [Metadata Exchange](#metadata-exchange)
- [Security Best Practices](#security-best-practices)
- [SAML vs OAuth/OIDC](#saml-vs-oauthoidc)
- [Common Issues & Troubleshooting](#common-issues--troubleshooting)
- [Resources](#resources)

---

## Introduction

SAML (Security Assertion Markup Language) is an XML-based open standard for exchanging authentication and authorization data between parties, particularly between an **Identity Provider** (IdP) and a **Service Provider** (SP). SAML enables **Single Sign-On (SSO)**, allowing users to authenticate once and access multiple applications without re-entering credentials.

### Key Characteristics

- **XML-based**: All messages use XML format
- **Enterprise-focused**: Widely used in enterprise/corporate environments
- **SSO Standard**: Industry standard for Single Sign-On
- **Federation**: Enables identity federation across organizations
- **Trust Framework**: Based on pre-established trust relationships
- **Mature**: First released in 2001, SAML 2.0 in 2005

### SAML Versions

- **SAML 1.1**: Original specification (2003)
- **SAML 2.0**: Current standard (2005) - **This guide focuses on 2.0**
- Not backward compatible between versions

---

## Why SAML?

### Benefits

✅ **Single Sign-On (SSO)**
- Users authenticate once, access multiple apps
- Improved user experience
- Reduced password fatigue
- Centralized authentication

✅ **Enterprise Security**
- Centralized identity management
- Strong authentication (MFA)
- Standardized security policies
- Audit trails and compliance

✅ **Identity Federation**
- Cross-organization trust
- Partner access without separate accounts
- B2B collaboration
- Educational institutions (e.g., university systems)

✅ **Reduced IT Overhead**
- Single user directory
- Centralized user provisioning/deprovisioning
- Simplified password management
- Lower support costs

### Use Cases

- **Enterprise SSO**: Corporate applications (Salesforce, ServiceNow, Workday)
- **Cloud Applications**: SaaS app integration
- **Education**: SAML federation for universities (Shibboleth)
- **Government**: Secure citizen services
- **Healthcare**: HIPAA-compliant identity management
- **B2B Partnerships**: Partner portal access

### When to Use SAML

✅ **Use SAML when:**
- Enterprise SSO requirements
- B2B identity federation needed
- Legacy systems already using SAML
- Compliance requires centralized identity
- Desktop/web applications (not mobile-first)
- Existing IdP infrastructure (Okta, Azure AD, Ping)

❌ **Consider alternatives when:**
- Building modern mobile apps (use OAuth/OIDC)
- Public APIs (use OAuth 2.0)
- Simple authentication needs
- No existing IdP infrastructure
- Need programmatic API access

---

## Core Concepts

### SAML Architecture

```
┌──────────────┐                  ┌──────────────────┐
│     User     │                  │    Identity      │
│   (Browser)  │◄────────────────>│    Provider      │
└──────┬───────┘                  │     (IdP)        │
       │                          └──────────────────┘
       │                                   ▲
       │                                   │
       │                                   │ SAML
       │                                   │ Trust
       │                                   │
       │                          ┌────────┴──────────┐
       │                          │    Service        │
       └─────────────────────────>│    Provider       │
                                  │      (SP)         │
                                  └───────────────────┘
```

### Key Terms

**Identity Provider (IdP)**
- Authenticates users
- Issues SAML assertions
- Manages user identities
- Examples: Okta, Azure AD, OneLogin, Ping Identity

**Service Provider (SP)**
- Provides application/service
- Consumes SAML assertions
- Trusts IdP for authentication
- Examples: Salesforce, Slack, AWS Console

**SAML Assertion**
- XML document containing authentication/authorization data
- Signed by IdP
- Contains user attributes
- Types: Authentication, Attribute, Authorization Decision

**Principal**
- The user/entity being authenticated
- Identified by NameID in assertion

**Relying Party**
- Another term for Service Provider
- Relies on IdP assertions

**Metadata**
- XML document describing IdP or SP configuration
- Contains certificates, endpoints, entity IDs
- Exchanged during setup

---

## SAML 2.0 Protocol

### SAML Bindings

How SAML messages are transported:

1. **HTTP Redirect Binding**
   - SAML message in URL query parameter
   - GET request
   - Message size limited (~8KB)
   - Most common for authentication requests

2. **HTTP POST Binding**
   - SAML message in HTML form
   - POST request via auto-submit form
   - No size limitations
   - Most common for responses

3. **HTTP Artifact Binding**
   - Sends artifact (reference) instead of full message
   - Backend retrieval of actual assertion
   - More secure, no data in browser
   - Less common

4. **SOAP Binding**
   - Direct backend communication
   - Used for attribute queries

### SAML Profiles

Common use case workflows:

1. **Web Browser SSO Profile** (Most common)
   - SP-initiated flow
   - IdP-initiated flow

2. **Enhanced Client or Proxy (ECP) Profile**
   - For non-browser clients

3. **Single Logout Profile**
   - Logout from all applications

---

## SSO Flow

### SP-Initiated Flow (Most Common)

**Step-by-step process:**

```
User         Service Provider          Identity Provider
 │                 │                          │
 │─1.Access App──>│                          │
 │                 │                          │
 │                 │─2.Generate AuthnRequest─│
 │                 │   (unsigned/signed)      │
 │                 │                          │
 │◄─3.Redirect────┤                          │
 │   (HTTP 302)    │                          │
 │                 │                          │
 │─4.AuthnRequest────────────────────────────>│
 │   (HTTP GET/POST)                          │
 │                                            │
 │◄─5.Login Form──────────────────────────────┤
 │                                            │
 │─6.Credentials──────────────────────────────>│
 │                                            │
 │                                            │─7.Validate
 │                                            │   credentials
 │                                            │
 │◄─8.SAML Response──────────────────────────┤
 │   (signed assertion)                       │
 │                                            │
 │─9.Submit Response to SP──>│                │
 │   (HTTP POST)              │                │
 │                            │                │
 │                            │─10.Validate────│
 │                            │    assertion   │
 │                            │                │
 │◄─11.Grant Access──────────┤                │
 │    (session cookie)        │                │
```

**Detailed Steps:**

**1. User Accesses Service Provider**
```
User navigates to: https://app.example.com
```

**2. SP Generates SAML AuthnRequest**
```xml
<samlp:AuthnRequest
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="_abc123"
    Version="2.0"
    IssueInstant="2026-01-20T10:00:00Z"
    Destination="https://idp.example.com/sso"
    AssertionConsumerServiceURL="https://app.example.com/saml/acs">
    
    <saml:Issuer>https://app.example.com</saml:Issuer>
    
    <samlp:NameIDPolicy
        Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
        AllowCreate="true"/>
</samlp:AuthnRequest>
```

**3. SP Redirects User to IdP**
```http
HTTP/1.1 302 Found
Location: https://idp.example.com/sso?SAMLRequest=BASE64_ENCODED_REQUEST&RelayState=RETURN_URL
```

**4-6. User Authenticates at IdP**

User enters credentials, possibly with MFA.

**7-8. IdP Creates SAML Response**
```xml
<samlp:Response
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="_response123"
    Version="2.0"
    IssueInstant="2026-01-20T10:01:00Z"
    Destination="https://app.example.com/saml/acs">
    
    <saml:Issuer>https://idp.example.com</saml:Issuer>
    
    <samlp:Status>
        <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
    </samlp:Status>
    
    <saml:Assertion
        ID="_assertion123"
        Version="2.0"
        IssueInstant="2026-01-20T10:01:00Z">
        
        <saml:Issuer>https://idp.example.com</saml:Issuer>
        
        <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <!-- Digital signature -->
        </ds:Signature>
        
        <saml:Subject>
            <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">
                john.doe@example.com
            </saml:NameID>
            <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
                <saml:SubjectConfirmationData
                    NotOnOrAfter="2026-01-20T10:06:00Z"
                    Recipient="https://app.example.com/saml/acs"/>
            </saml:SubjectConfirmation>
        </saml:Subject>
        
        <saml:Conditions
            NotBefore="2026-01-20T10:00:00Z"
            NotOnOrAfter="2026-01-20T10:06:00Z">
            <saml:AudienceRestriction>
                <saml:Audience>https://app.example.com</saml:Audience>
            </saml:AudienceRestriction>
        </saml:Conditions>
        
        <saml:AuthnStatement
            AuthnInstant="2026-01-20T10:01:00Z"
            SessionIndex="_session123">
            <saml:AuthnContext>
                <saml:AuthnContextClassRef>
                    urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
                </saml:AuthnContextClassRef>
            </saml:AuthnContext>
        </saml:AuthnStatement>
        
        <saml:AttributeStatement>
            <saml:Attribute Name="email">
                <saml:AttributeValue>john.doe@example.com</saml:AttributeValue>
            </saml:Attribute>
            <saml:Attribute Name="firstName">
                <saml:AttributeValue>John</saml:AttributeValue>
            </saml:Attribute>
            <saml:Attribute Name="lastName">
                <saml:AttributeValue>Doe</saml:AttributeValue>
            </saml:Attribute>
            <saml:Attribute Name="groups">
                <saml:AttributeValue>Administrators</saml:AttributeValue>
                <saml:AttributeValue>Developers</saml:AttributeValue>
            </saml:Attribute>
        </saml:AttributeStatement>
    </saml:Assertion>
</samlp:Response>
```

**9. Browser POSTs Response to SP**
```html
<form method="post" action="https://app.example.com/saml/acs">
    <input type="hidden" name="SAMLResponse" value="BASE64_ENCODED_RESPONSE"/>
    <input type="hidden" name="RelayState" value="RETURN_URL"/>
</form>
<script>document.forms[0].submit();</script>
```

**10. SP Validates Assertion**

Checks:
- Signature validity
- Issuer matches expected IdP
- Audience matches SP entity ID
- Timestamp validity (NotBefore, NotOnOrAfter)
- Recipient URL matches ACS URL

**11. SP Creates Session**

Sets session cookie and redirects to original resource.

### IdP-Initiated Flow

User starts at IdP portal and selects application:

```
User         Identity Provider      Service Provider
 │                 │                       │
 │─1.Login to IdP─>│                       │
 │                 │                       │
 │─2.Select App───>│                       │
 │                 │                       │
 │                 │─3.Generate Assertion──│
 │                 │                       │
 │◄─4.Redirect─────┤                       │
 │   (with SAML    │                       │
 │    Response)    │                       │
 │                 │                       │
 │─5.POST to SP ACS──────────────────────>│
 │                 │                       │
 │                 │                       │─6.Validate
 │                 │                       │
 │◄─7.Grant Access────────────────────────┤
```

---

## SAML Assertions

### Assertion Types

**1. Authentication Assertion**
- Confirms user authenticated
- Includes authentication method and time

**2. Attribute Assertion**
- Contains user attributes (email, name, groups)
- Mapping to application roles

**3. Authorization Decision Assertion**
- Grants/denies access to resources
- Less commonly used

### NameID Formats

Identifies the user:

| Format | Description | Example |
|--------|-------------|---------|
| `emailAddress` | Email address | `john.doe@example.com` |
| `persistent` | Opaque persistent identifier | `abc123xyz789` |
| `transient` | Session-specific identifier | `_temp456` |
| `unspecified` | No specific format | Custom value |
| `X509SubjectName` | X.509 subject DN | `CN=John Doe,O=Example` |
| `WindowsDomainQualifiedName` | Windows domain user | `DOMAIN\johndoe` |

### Attribute Mapping

**IdP Attributes → SP Attributes:**

```xml
<!-- IdP sends -->
<saml:Attribute Name="urn:oid:0.9.2342.19200300.100.1.3">
    <saml:AttributeValue>john.doe@example.com</saml:AttributeValue>
</saml:Attribute>

<!-- SP maps to -->
{
  "email": "john.doe@example.com",
  "username": "john.doe",
  "roles": ["admin", "developer"]
}
```

---

## Service Provider vs Identity Provider

### Service Provider (SP) Responsibilities

1. **Generate AuthnRequest**
   - Create SAML authentication request
   - Redirect user to IdP

2. **Consume SAML Response**
   - Receive and validate assertion
   - Verify signature
   - Check conditions

3. **Create User Session**
   - Extract user attributes
   - Map to application roles
   - Set session cookie

4. **Publish Metadata**
   - Entity ID
   - Assertion Consumer Service (ACS) URL
   - Public certificate

### Identity Provider (IdP) Responsibilities

1. **Authenticate Users**
   - Verify credentials
   - Support MFA
   - Session management

2. **Generate SAML Assertions**
   - Create signed assertions
   - Include user attributes
   - Set validity periods

3. **Manage User Directory**
   - Store user credentials
   - Manage attributes
   - Group memberships

4. **Publish Metadata**
   - SSO endpoint URL
   - Public certificate
   - Supported bindings

---

## Implementation Examples

### Node.js Service Provider (passport-saml)

```bash
npm install passport passport-saml express-session
```

```javascript
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-saml');
const fs = require('fs');

const app = express();

app.use(require('express-session')({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// SAML Strategy Configuration
passport.use(new Strategy({
    // IdP Configuration
    entryPoint: 'https://idp.example.com/sso',
    issuer: 'https://app.example.com',
    callbackUrl: 'https://app.example.com/saml/acs',
    
    // Certificates
    cert: fs.readFileSync('./idp-cert.pem', 'utf-8'), // IdP public cert
    privateKey: fs.readFileSync('./sp-key.pem', 'utf-8'), // SP private key
    decryptionPvk: fs.readFileSync('./sp-key.pem', 'utf-8'),
    
    // Options
    signatureAlgorithm: 'sha256',
    identifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    wantAssertionsSigned: true,
    acceptedClockSkewMs: -1
  },
  (profile, done) => {
    // Verify and create/update user
    const user = {
      id: profile.nameID,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      groups: profile.groups
    };
    
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Fetch user from database
  done(null, { id });
});

// Routes
app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/login/fail' })
);

app.post('/saml/acs',
  passport.authenticate('saml', { failureRedirect: '/login/fail' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Metadata endpoint
app.get('/saml/metadata', (req, res) => {
  res.type('application/xml');
  res.send(passport._strategy('saml').generateServiceProviderMetadata(
    fs.readFileSync('./sp-cert.pem', 'utf-8'),
    fs.readFileSync('./sp-cert.pem', 'utf-8')
  ));
});

app.listen(3000);
```

### Python Service Provider (python3-saml)

```bash
pip install python3-saml flask
```

```python
from flask import Flask, request, redirect, session
from onelogin.saml2.auth import OneLogin_Saml2_Auth
import os

app = Flask(__name__)
app.secret_key = os.urandom(32)

def init_saml_auth(req):
    auth = OneLogin_Saml2_Auth(req, custom_base_path='saml/')
    return auth

def prepare_flask_request(request):
    url_data = urlparse(request.url)
    return {
        'https': 'on' if request.scheme == 'https' else 'off',
        'http_host': request.host,
        'server_port': url_data.port,
        'script_name': request.path,
        'get_data': request.args.copy(),
        'post_data': request.form.copy()
    }

@app.route('/login')
def login():
    req = prepare_flask_request(request)
    auth = init_saml_auth(req)
    return redirect(auth.login())

@app.route('/saml/acs', methods=['POST'])
def acs():
    req = prepare_flask_request(request)
    auth = init_saml_auth(req)
    
    auth.process_response()
    errors = auth.get_errors()
    
    if len(errors) == 0:
        session['samlUserdata'] = auth.get_attributes()
        session['samlNameId'] = auth.get_nameid()
        session['samlSessionIndex'] = auth.get_session_index()
        
        # Redirect to original URL
        return redirect(request.form.get('RelayState', '/'))
    else:
        return f"Error: {', '.join(errors)}", 403

@app.route('/logout')
def logout():
    req = prepare_flask_request(request)
    auth = init_saml_auth(req)
    
    name_id = session.get('samlNameId')
    session_index = session.get('samlSessionIndex')
    
    return redirect(auth.logout(name_id=name_id, session_index=session_index))

@app.route('/saml/metadata')
def metadata():
    req = prepare_flask_request(request)
    auth = init_saml_auth(req)
    settings = auth.get_settings()
    metadata = settings.get_sp_metadata()
    
    return metadata, 200, {'Content-Type': 'text/xml'}

if __name__ == '__main__':
    app.run(ssl_context='adhoc')
```

**SAML Configuration (saml/settings.json):**
```json
{
  "strict": true,
  "debug": false,
  "sp": {
    "entityId": "https://app.example.com",
    "assertionConsumerService": {
      "url": "https://app.example.com/saml/acs",
      "binding": "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
    },
    "singleLogoutService": {
      "url": "https://app.example.com/saml/sls",
      "binding": "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
    },
    "NameIDFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
    "x509cert": "CERT_CONTENT_HERE",
    "privateKey": "PRIVATE_KEY_HERE"
  },
  "idp": {
    "entityId": "https://idp.example.com",
    "singleSignOnService": {
      "url": "https://idp.example.com/sso",
      "binding": "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
    },
    "singleLogoutService": {
      "url": "https://idp.example.com/slo",
      "binding": "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
    },
    "x509cert": "IDP_CERT_CONTENT_HERE"
  },
  "security": {
    "nameIdEncrypted": false,
    "authnRequestsSigned": true,
    "logoutRequestSigned": true,
    "logoutResponseSigned": true,
    "signMetadata": false,
    "wantMessagesSigned": true,
    "wantAssertionsSigned": true,
    "wantNameIdEncrypted": false,
    "requestedAuthnContext": true,
    "signatureAlgorithm": "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256",
    "digestAlgorithm": "http://www.w3.org/2001/04/xmlenc#sha256"
  }
}
```

### Java Service Provider (Spring Security SAML)

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-saml2-service-provider</artifactId>
</dependency>
```

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/", "/login").permitAll()
                .anyRequest().authenticated()
            )
            .saml2Login(Customizer.withDefaults())
            .saml2Logout(Customizer.withDefaults());
        
        return http.build();
    }
    
    @Bean
    RelyingPartyRegistrationRepository relyingPartyRegistrations() {
        RelyingPartyRegistration registration = RelyingPartyRegistrations
            .fromMetadataLocation("https://idp.example.com/metadata")
            .registrationId("okta")
            .build();
        
        return new InMemoryRelyingPartyRegistrationRepository(registration);
    }
}
```

---

## Metadata Exchange

### Service Provider Metadata

```xml
<md:EntityDescriptor
    xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"
    entityID="https://app.example.com">
    
    <md:SPSSODescriptor
        AuthnRequestsSigned="true"
        WantAssertionsSigned="true"
        protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        
        <md:KeyDescriptor use="signing">
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:X509Data>
                    <ds:X509Certificate>
                        MIICajCCAdOgAwIBAgIBAD...
                    </ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </md:KeyDescriptor>
        
        <md:NameIDFormat>
            urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress
        </md:NameIDFormat>
        
        <md:AssertionConsumerService
            Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
            Location="https://app.example.com/saml/acs"
            index="0"
            isDefault="true"/>
        
        <md:AttributeConsumingService index="0">
            <md:ServiceName xml:lang="en">Application Name</md:ServiceName>
            <md:RequestedAttribute
                Name="email"
                isRequired="true"/>
            <md:RequestedAttribute
                Name="firstName"/>
            <md:RequestedAttribute
                Name="lastName"/>
        </md:AttributeConsumingService>
    </md:SPSSODescriptor>
</md:EntityDescriptor>
```

### Identity Provider Metadata

```xml
<md:EntityDescriptor
    xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"
    entityID="https://idp.example.com">
    
    <md:IDPSSODescriptor
        WantAuthnRequestsSigned="true"
        protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        
        <md:KeyDescriptor use="signing">
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:X509Data>
                    <ds:X509Certificate>
                        MIIDdDCCAlygAwIBAgIGAV...
                    </ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </md:KeyDescriptor>
        
        <md:NameIDFormat>
            urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress
        </md:NameIDFormat>
        
        <md:SingleSignOnService
            Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
            Location="https://idp.example.com/sso"/>
        
        <md:SingleSignOnService
            Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
            Location="https://idp.example.com/sso"/>
        
        <md:SingleLogoutService
            Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
            Location="https://idp.example.com/slo"/>
    </md:IDPSSODescriptor>
</md:EntityDescriptor>
```

---

## Security Best Practices

### 1. Always Sign Assertions

```xml
<saml:Assertion>
    <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
        <ds:SignedInfo>
            <ds:CanonicalizationMethod Algorithm="..."/>
            <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
            <ds:Reference URI="#_assertion123">
                <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                <ds:DigestValue>...</ds:DigestValue>
            </ds:Reference>
        </ds:SignedInfo>
        <ds:SignatureValue>...</ds:SignatureValue>
    </ds:Signature>
</saml:Assertion>
```

### 2. Validate Signatures

```javascript
const { SignedXml } = require('xml-crypto');
const fs = require('fs');

function validateAssertion(assertion, idpCert) {
  const sig = new SignedXml();
  sig.keyInfoProvider = {
    getKey: () => idpCert
  };
  
  sig.loadSignature(assertion);
  return sig.checkSignature(assertion);
}
```

### 3. Check Time Conditions

```javascript
function validateTimestamps(assertion) {
  const now = new Date();
  const notBefore = new Date(assertion.Conditions.NotBefore);
  const notOnOrAfter = new Date(assertion.Conditions.NotOnOrAfter);
  
  const clockSkew = 5 * 60 * 1000; // 5 minutes
  
  if (now < (notBefore - clockSkew)) {
    throw new Error('Assertion not yet valid');
  }
  
  if (now >= (notOnOrAfter + clockSkew)) {
    throw new Error('Assertion expired');
  }
}
```

### 4. Verify Audience

```javascript
function validateAudience(assertion, expectedAudience) {
  const audiences = assertion.Conditions.AudienceRestriction.Audience;
  
  if (!audiences.includes(expectedAudience)) {
    throw new Error('Invalid audience');
  }
}
```

### 5. Use HTTPS Only

All SAML endpoints must use HTTPS in production.

### 6. Protect Against Replay Attacks

```javascript
const processedAssertions = new Set();

function preventReplay(assertionId) {
  if (processedAssertions.has(assertionId)) {
    throw new Error('Assertion replay detected');
  }
  
  processedAssertions.add(assertionId);
  
  // Clean up old IDs after expiration
  setTimeout(() => {
    processedAssertions.delete(assertionId);
  }, 5 * 60 * 1000);
}
```

### 7. Certificate Management

```bash
# Generate private key
openssl genrsa -out sp-key.pem 2048

# Generate certificate signing request
openssl req -new -key sp-key.pem -out sp-csr.pem

# Self-sign certificate (or use CA)
openssl x509 -req -days 365 -in sp-csr.pem -signkey sp-key.pem -out sp-cert.pem

# Convert to formats
openssl x509 -in sp-cert.pem -outform DER -out sp-cert.der
```

---

## SAML vs OAuth/OIDC

| Feature | SAML | OAuth 2.0 | OIDC |
|---------|------|-----------|------|
| **Purpose** | Authentication + SSO | Authorization | Authentication + Authorization |
| **Format** | XML | JSON | JSON (JWT) |
| **Primary Use** | Enterprise SSO | API Access | Modern apps SSO |
| **Token Type** | SAML Assertion | Access Token | Access + ID Token |
| **Mobile Support** | ⚠️ Limited | ✅ Excellent | ✅ Excellent |
| **Complexity** | High | Medium | Medium |
| **Standards Body** | OASIS | IETF | OpenID Foundation |
| **First Released** | 2005 | 2012 | 2014 |
| **Browser-based** | ✅ Yes | ⚠️ Limited | ✅ Yes |
| **API Access** | ❌ Not ideal | ✅ Yes | ✅ Yes |
| **Enterprise Adoption** | ✅ Very high | ⚠️ Growing | ⚠️ Growing |

### When to Use Each

**Use SAML when:**
- Enterprise SSO requirements
- Existing SAML infrastructure
- B2B federation
- Desktop/web apps
- Compliance requirements

**Use OAuth 2.0 when:**
- API authorization
- Third-party app access
- Server-to-server
- Microservices

**Use OIDC when:**
- Modern authentication
- Mobile apps
- Single-page apps (SPAs)
- Social login
- Need user profile info

---

## Common Issues & Troubleshooting

### Issue 1: Clock Skew

**Symptom:** "Assertion expired" or "Not yet valid"

**Solution:**
```javascript
// Allow 5-minute clock skew
const clockSkewMs = 5 * 60 * 1000;
const now = Date.now();

if (now < (notBefore - clockSkewMs) || now >= (notOnOrAfter + clockSkewMs)) {
  // Invalid
}
```

### Issue 2: Invalid Signature

**Symptom:** Signature validation fails

**Checklist:**
- Correct IdP certificate loaded
- Certificate not expired
- Whitespace in certificate removed
- Using correct signature algorithm

### Issue 3: Wrong Audience

**Symptom:** "Invalid audience"

**Solution:** Ensure SP entity ID matches exactly:
```xml
<!-- IdP Metadata -->
<saml:Audience>https://app.example.com</saml:Audience>

<!-- Must match SP entity ID exactly -->
```

### Issue 4: Missing Attributes

**Symptom:** Expected user attributes not present

**Solution:**
- Check attribute mapping in IdP
- Verify attribute names match
- Check AttributeConsumingService in SP metadata

### Debugging Tools

**SAML Tracer (Browser Extension)**
- Chrome/Firefox addon
- Captures SAML messages
- Decodes Base64
- Shows request/response flow

**Online SAML Decoders**
- https://www.samltool.com/decode.php
- Base64 decode + XML format

**Command Line:**
```bash
# Decode SAMLRequest
echo "BASE64_STRING" | base64 -d | gunzip

# Decode SAMLResponse
echo "BASE64_STRING" | base64 -d
```

---

## Resources

### Official Specifications
- [SAML 2.0 Core](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
- [SAML 2.0 Bindings](https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf)
- [SAML 2.0 Profiles](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf)

### Tools & Libraries
- **Node.js**: `passport-saml`, `saml2-js`
- **Python**: `python3-saml`, `django-saml2-auth`
- **Java**: Spring Security SAML, OpenSAML
- **C#**: Sustainsys.Saml2, ComponentSpace
- **Ruby**: `ruby-saml`
- **Go**: `crewjam/saml`

### Identity Providers
- [Okta](https://www.okta.com/)
- [Azure AD](https://azure.microsoft.com/en-us/services/active-directory/)
- [OneLogin](https://www.onelogin.com/)
- [Ping Identity](https://www.pingidentity.com/)
- [Auth0](https://auth0.com/)
- [Shibboleth](https://www.shibboleth.net/) (Open source)

### Testing Tools
- [SAML-tracer](https://github.com/UNINETT/SAML-tracer)
- [SAML Tool](https://www.samltool.com/)
- [SSO Circle](https://www.ssocircle.com/) - Free test IdP

### Learning Resources
- [SAML for Developers](https://auth0.com/docs/protocols/saml)
- [Okta SAML Guidance](https://developer.okta.com/docs/concepts/saml/)
- [OneLogin SAML Toolkit](https://developers.onelogin.com/saml)

---

**Last Updated**: January 2026  
**SAML Version**: 2.0
