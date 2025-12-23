# SonarQube Usage Guide

## Run Locally (Docker)
```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
```
Login at http://localhost:9000 (default admin/admin, change immediately).

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
```

## GitHub Action
```yaml
- uses: sonarsource/sonarqube-scan-action@v2
  with:
    host-url: ${{ secrets.SONAR_HOST_URL }}
    login: ${{ secrets.SONAR_TOKEN }}
```

## Quality Gates
- Configure thresholds for bugs, vulnerabilities, coverage
- Fail CI builds when gate fails

## Languages and Coverage
- Provide coverage reports (JaCoCo, lcov, Cobertura) for richer insights
