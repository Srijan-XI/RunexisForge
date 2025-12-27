# Dependency Scanning — User Guide

## Language-specific quick starts
- **JavaScript/TypeScript**: `npm audit` / `yarn npm audit` / `pnpm audit`; GitHub Dependabot alerts
- **Python**: `pip install pip-audit` → `pip-audit`; `pip install safety` → `safety check`; `pip install trivy` → `trivy fs .`
- **Java**: Use SCA via build plugins (OWASP Dependency-Check, Snyk, osv-scanner)
- **Go**: `go list -m -json all | osv-scanner --stdin` or `trivy fs .`

## CI examples

**GitHub Actions (osv-scanner):**
```yaml
name: osv-scanner
on: [push, pull_request]
jobs:
  osv:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: osv-scanner/actions/osv-scanner@v1
        with:
          scan-args: "."
```

**GitHub Dependabot alerts**: enable for the repo; review/update flagged packages.

## Best practices
- Pin versions; avoid floating `latest`
- Maintain an SBOM (CycloneDX/SPDX)
- Patch fast for high/critical vulns; add CI gates if needed
- Monitor transitive deps, not just direct ones

## References
- https://osv.dev/
- https://docs.github.com/en/code-security/dependabot/dependabot-alerts
- https://github.com/google/osv-scanner
