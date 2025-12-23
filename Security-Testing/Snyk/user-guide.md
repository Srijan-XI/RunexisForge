# Snyk Usage Guide

## Install CLI
```bash
npm install -g snyk
snyk auth
```

## Test Dependencies
```bash
snyk test
snyk test --severity-threshold=high
```

## Monitor (create ongoing project)
```bash
snyk monitor
```

## Container Scan
```bash
snyk container test nginx:latest
```

## IaC Scan
```bash
snyk iac test infra/
```

## CI/CD
- GitHub Action: `snyk/actions/node@master`
- Fail builds on high/critical findings via `--severity-threshold`
