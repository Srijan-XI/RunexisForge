# Snyk Usage Guide

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
