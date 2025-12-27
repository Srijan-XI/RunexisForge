# OWASP Top 10 — User Guide

## How to use the Top 10

- Threat modeling: identify which risks apply to your app
- Secure design: apply controls before coding
- Testing: build test cases for each category
- CI/CD gates: run automated checks and block on high-risk findings

## Quick checklists by category

- A01 Broken Access Control: enforce least privilege, deny-by-default, validate ownership, rate-limit sensitive actions
- A02 Cryptographic Failures: enforce TLS, disable weak ciphers, never store secrets in plaintext, use modern algorithms (AES-GCM, Argon2)
- A03 Injection: use parameterized queries/ORM, avoid string concatenation, sanitize untrusted input, prefer allowlists
- A04 Insecure Design: threat model critical flows, apply security patterns (STRIDE, ATT&CK), defense-in-depth
- A05 Security Misconfiguration: hardened defaults, no default creds, minimal services, secure headers (CSP, HSTS), disable directory listing
- A06 Vulnerable & Outdated Components: SBOM, pin versions, SCA scans, timely patching
- A07 Identification & Authentication Failures: MFA, secure password storage (bcrypt/argon2), session timeouts, lockout with care
- A08 Software & Data Integrity Failures: signed artifacts, verified builds, supply chain policies, checksum downloads
- A09 Logging & Monitoring Failures: central logging, alerting, log integrity, retention, privacy controls
- A10 SSRF: restrict outbound requests, block internal metadata IPs, use allowlists, egress proxies

## Developer guardrails

- Secure defaults in code (HTTP security headers, input validation, authz checks)
- Use frameworks’ built-in protections (CSRF tokens, template auto-escaping)
- Handle secrets via vaults/managed identities, never commit secrets

## CI/CD integration ideas

- Lint for security headers in infra as code
- SCA (dependency scanning) for A06
- Secrets scanning in repos
- IaC scanning (Terraform/K8s policies)
- DAST/SAST/IAST where applicable

## References

- <https://owasp.org/Top10/>
- ASVS: <https://owasp.org/www-project-application-security-verification-standard/>
- Cheat Sheets: <https://cheatsheetseries.owasp.org/>
