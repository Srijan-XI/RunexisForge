# Secrets Scanning — User Guide

## Local and CI options

- **gitleaks**: fast scanner with many built-in rules
- **trufflehog**: high-signal entropy + regex scanning
- **GitHub Advanced Security**: built-in secret scanning for public/private repos (if enabled)

## Run gitleaks locally

```bash
gitleaks detect -v
```bash

Use a custom config to tune false positives.

## GitHub Actions (gitleaks)

```yaml
name: gitleaks
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: gitleaks/gitleaks-action@v2
        with:
          args: "detect -v"
```bash

## Remediation

- Revoke and rotate exposed secrets immediately
- Remove secrets from code; load from vault/managed identity/env vars
- Add pre-commit hook for secrets scanning (e.g., gitleaks)

## Best practices

- Use least-privilege tokens; short-lived where possible
- Avoid committing `.env` files; add to .gitignore
- Monitor CI logs for leaks

## References

- <https://github.com/gitleaks/gitleaks>
- <https://github.com/trufflesecurity/trufflehog>
- <https://docs.github.com/en/code-security/secret-scanning>
