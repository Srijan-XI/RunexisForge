# SonarQube

## Introduction

SonarQube is a platform for continuous inspection of code quality and security, providing static analysis, coverage metrics, and quality gates.

## Key Features

- Static analysis for many languages
- Security hotspot and vulnerability detection
- Quality Gates to enforce thresholds in CI/CD
- Integrations with GitHub/GitLab/Azure DevOps

## Resources

- Docs: <https://docs.sonarsource.com/sonarqube/>
- Downloads: <https://www.sonarsource.com/products/sonarqube/downloads/>

---

## User Guide

## Run Locally (Docker)

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
```bash

Login at <http://localhost:9000> (default admin/admin, change immediately).

## Create a Project

- In UI, create project and generate a token
- Use token in scanner

## Scan with CLI Scanner

```bash
# macOS/Linux
brew install sonarqube
# Or download sonar-scanner from SonarSource
sonar-scanner \
  -Dsonar.projectKey=demo \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=<token>
```bash

## GitHub Action

```yaml
- uses: sonarsource/sonarqube-scan-action@v2
  with:
    host-url: ${{ secrets.SONAR_HOST_URL }}
    login: ${{ secrets.SONAR_TOKEN }}
```bash

## Quality Gates

- Configure thresholds for bugs, vulnerabilities, coverage
- Fail CI builds when gate fails

## Languages and Coverage

- Provide coverage reports (JaCoCo, lcov, Cobertura) for richer insights

