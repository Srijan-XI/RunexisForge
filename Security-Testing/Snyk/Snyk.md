# Snyk

## Introduction

Snyk is a developer-focused security platform for scanning open source dependencies, containers, IaC, and code for vulnerabilities.

## Key Features

- Dependency scanning with fix advice
- Container image scanning
- IaC policy checks (Terraform, Kubernetes manifests)
- SAST for code security
- CI/CD and SCM integrations

## Resources

- Docs: <https://docs.snyk.io>
- CLI: <https://docs.snyk.io/snyk-cli/install-the-snyk-cli>

---

## User Guide

## Install CLI

```bash
npm install -g snyk
snyk auth
```bash

## Test Dependencies

```bash
snyk test
snyk test --severity-threshold=high
```bash

## Monitor (create ongoing project)

```bash
snyk monitor
```bash

## Container Scan

```bash
snyk container test nginx:latest
```bash

## IaC Scan

```bash
snyk iac test infra/
```bash

## CI/CD

- GitHub Action: `snyk/actions/node@master`
- Fail builds on high/critical findings via `--severity-threshold`

