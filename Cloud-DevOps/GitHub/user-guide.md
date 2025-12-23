# GitHub Actions Usage Guide

## Basics
- Workflows live in `.github/workflows/*.yml`
- Triggered by events (push, pull_request, schedule, workflow_dispatch)
- Jobs run on GitHub-hosted runners (`ubuntu-latest`, `windows-latest`, `macos-latest`) or self-hosted

## Minimal CI Example (Node)
```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
```

## Caching
```yaml
      - uses: actions/cache@v4
        with:
          path: node_modules
          key: ${{ runner.os }}-npm-${{ hashFiles('package-lock.json') }}
```

## Secrets
- Add repository or org secrets in Settings > Secrets and variables > Actions
- Reference via `${{ secrets.MY_SECRET }}`

## Matrix Builds
```yaml
strategy:
  matrix:
    node: [18, 20]
```

## Deploy Examples
- Pages: `actions/deploy-pages`
- Docker to GHCR: `docker/build-push-action`
- Cloud: use provider CLIs with secrets/OIDC (`azure/login`, `aws-actions/configure-aws-credentials`, `google-github-actions/auth`)

## Reusable Workflows
- Define in `.github/workflows/reusable.yml`
- Call with `uses: ./.github/workflows/reusable.yml` and `workflow_call`
