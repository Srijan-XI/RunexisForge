# GitLab

## Introduction

GitLab is a DevOps platform providing git hosting, CI/CD pipelines, issue tracking, and security scanning in one application.

## Key Features

- Git repos with merge requests and code review
- Built-in CI/CD with GitLab Runners
- Container Registry and Package Registry
- Security scans (SAST, DAST, Dependency, IaC) in Ultimate tiers

## Resources

- Docs: <https://docs.gitlab.com>
- SaaS: <https://gitlab.com>
- Self-managed downloads: <https://about.gitlab.com/install/>

---

## User Guide

## Pipeline Basics

- Pipelines run from `.gitlab-ci.yml`
- Jobs run on runners (shared or self-hosted)
- Stages execute sequentially; jobs in a stage run in parallel

## Minimal Pipeline

```yaml
stages: [test, deploy]

image: node:18

cache:
  paths:
    - node_modules/

test:
  stage: test
  script:
    - npm ci
    - npm test

deploy:
  stage: deploy
  script: echo "deploy here"
  only:
    - main
```bash

## Variables and Secrets

- Set CI/CD variables in Project Settings > CI/CD > Variables
- Use `variables:` block or `$VAR` in scripts

## Runners

- Shared runners available on gitlab.com
- Register self-hosted runner:

```bash
gitlab-runner register
```bash

## Artifacts

- Save build outputs:

```yaml
artifacts:
  paths:
    - dist/
```bash

## Environments

- Use `environment:` for review apps and deployments
- Track deployments in GitLab UI

## Templates

- Include templates: `include: template: Node.gitlab-ci.yml`
- Auto DevOps pipelines available with Kubernetes integration

