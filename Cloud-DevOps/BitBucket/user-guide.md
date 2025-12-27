# Bitbucket Pipelines Usage Guide

## Enable Pipelines

- In repository Settings > Pipelines, enable
- Requires a `bitbucket-pipelines.yml` at repo root

## Minimal Pipeline (Node)

```yaml
image: node:18

pipelines:
  default:
    - step:
        caches:
          - node
        script:
          - npm install
          - npm test
```bash

## Caches and Artifacts

- `caches:` for dependency caches (node, pip, maven)
- `artifacts:` to pass files between steps

## Deployment Pipelines

```yaml
pipelines:
  branches:
    main:
      - step: { script: npm test }
      - step: { script: ./deploy.sh }
```bash

## Variables and Secrets

- Repository Settings > Pipelines > Repository variables
- Use `${MY_VAR}` in scripts

## Services

- Define docker services (e.g., postgres) under `definitions: services:`

## Self-Hosted Runners

- Install runner agent and associate with workspace; reference by `runs-on: self.hosted`
