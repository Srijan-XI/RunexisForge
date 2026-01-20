# SonarQube

## Introduction

SonarQube is a leading open-source platform for continuous inspection of code quality and security. It performs automatic reviews with static analysis to detect bugs, code smells, and security vulnerabilities across 30+ programming languages. SonarQube provides a centralized dashboard for tracking code quality metrics, technical debt, and security hotspots throughout your development lifecycle.

### What is SonarQube?

SonarQube analyzes source code to detect:
- **Bugs**: Code that is demonstrably wrong or highly likely to yield unexpected behavior
- **Vulnerabilities**: Security weaknesses that could be exploited
- **Code Smells**: Maintainability issues that make code harder to understand and modify
- **Security Hotspots**: Security-sensitive code that requires manual review
- **Duplications**: Repeated code blocks that reduce maintainability
- **Coverage**: Percentage of code covered by tests

### SonarQube Editions

1. **Community Edition** (Free)
   - Support for 15+ languages
   - Basic security analysis
   - Quality gates
   - Branch analysis for main branch

2. **Developer Edition**
   - All Community features
   - Branch analysis for all branches
   - Pull request decoration
   - Additional languages (Apex, COBOL, PL/SQL, VB)

3. **Enterprise Edition**
   - All Developer features
   - Portfolio management
   - Executive reporting
   - Faster analysis with parallel processing

4. **Data Center Edition**
   - All Enterprise features
   - High availability
   - Horizontal scalability

## Key Features

### Code Quality Analysis
- **Multi-language support**: Java, JavaScript, TypeScript, Python, C#, C/C++, Go, Kotlin, Ruby, Scala, PHP, HTML, CSS, XML, and more
- **Clean Code**: Enforces clean code principles and best practices
- **Complexity metrics**: Cyclomatic complexity, cognitive complexity
- **Maintainability ratings**: A-E ratings based on technical debt

### Security Analysis
- **OWASP Top 10**: Detection of OWASP vulnerabilities
- **CWE coverage**: Common Weakness Enumeration security issues
- **SANS Top 25**: Detection of most dangerous software errors
- **Security hotspots**: Manual review queue for security-sensitive code
- **Taint analysis**: Data flow analysis to detect injection flaws

### Quality Gates
- **Customizable thresholds**: Define quality standards for your projects
- **CI/CD integration**: Fail builds that don't meet quality standards
- **New Code focus**: Focus on quality of recently added/changed code
- **Multiple conditions**: Combine various metrics for comprehensive gates

### Integration Capabilities
- **SCM integration**: GitHub, GitLab, Bitbucket, Azure DevOps
- **CI/CD tools**: Jenkins, GitHub Actions, GitLab CI, Azure Pipelines
- **IDEs**: IntelliJ IDEA, Visual Studio, VS Code, Eclipse
- **Build tools**: Maven, Gradle, MSBuild, Ant

## Installation

### Prerequisites
- Java 17 or Java 21 (required)
- Supported databases: PostgreSQL 12-16, Oracle, SQL Server
- Minimum 2GB RAM (4GB+ recommended for production)
- Supported OS: Linux, Windows, macOS

### Installation Methods

#### 1. Docker (Quickest for Testing)

```bash
# Run SonarQube with embedded H2 database (NOT for production)
docker run -d --name sonarqube \
  -p 9000:9000 \
  sonarqube:lts-community

# Run with PostgreSQL (Recommended)
docker run -d --name sonarqube-db \
  -e POSTGRES_USER=sonar \
  -e POSTGRES_PASSWORD=sonar \
  -e POSTGRES_DB=sonarqube \
  postgres:15

docker run -d --name sonarqube \
  -p 9000:9000 \
  -e SONAR_JDBC_URL=jdbc:postgresql://sonarqube-db:5432/sonarqube \
  -e SONAR_JDBC_USERNAME=sonar \
  -e SONAR_JDBC_PASSWORD=sonar \
  --link sonarqube-db \
  sonarqube:lts-community
```

#### 2. Docker Compose (Production-ready)

```yaml
version: "3.9"

services:
  sonarqube:
    image: sonarqube:lts-community
    depends_on:
      - db
    environment:
      SONAR_JDBC_URL: jdbc:postgresql://db:5432/sonar
      SONAR_JDBC_USERNAME: sonar
      SONAR_JDBC_PASSWORD: sonar
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions
      - sonarqube_logs:/opt/sonarqube/logs
    ports:
      - "9000:9000"
    
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: sonar
      POSTGRES_PASSWORD: sonar
      POSTGRES_DB: sonar
    volumes:
      - postgresql:/var/lib/postgresql
      - postgresql_data:/var/lib/postgresql/data

volumes:
  sonarqube_data:
  sonarqube_extensions:
  sonarqube_logs:
  postgresql:
  postgresql_data:
```

```bash
docker-compose up -d
```

#### 3. Native Installation (Linux)

```bash
# Install Java 17
sudo apt update
sudo apt install openjdk-17-jdk

# Download SonarQube
cd /opt
sudo wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-10.3.0.82913.zip
sudo unzip sonarqube-10.3.0.82913.zip
sudo mv sonarqube-10.3.0.82913 sonarqube

# Create dedicated user
sudo useradd -r -s /bin/bash sonar
sudo chown -R sonar:sonar /opt/sonarqube

# Configure PostgreSQL connection
sudo nano /opt/sonarqube/conf/sonar.properties
# Add:
# sonar.jdbc.username=sonar
# sonar.jdbc.password=sonar
# sonar.jdbc.url=jdbc:postgresql://localhost/sonarqube

# Start SonarQube
sudo -u sonar /opt/sonarqube/bin/linux-x86-64/sonar.sh start
```

#### 4. Kubernetes (Helm)

```bash
# Add Helm repository
helm repo add sonarqube https://SonarSource.github.io/helm-chart-sonarqube
helm repo update

# Install SonarQube
helm install sonarqube sonarqube/sonarqube \
  --namespace sonarqube \
  --create-namespace \
  --set postgresql.enabled=true \
  --set persistence.enabled=true
```

### Initial Setup

1. **Access SonarQube**: Navigate to `http://localhost:9000`
2. **Default credentials**: Login with `admin` / `admin`
3. **Change password**: You'll be prompted to change the admin password immediately
4. **Generate token**: Go to User → My Account → Security → Generate token

## Configuration

### sonar.properties Key Settings

```properties
# Database
sonar.jdbc.username=sonar
sonar.jdbc.password=sonar
sonar.jdbc.url=jdbc:postgresql://localhost/sonarqube

# Web Server
sonar.web.host=0.0.0.0
sonar.web.port=9000
sonar.web.context=/sonarqube

# Compute Engine
sonar.ce.javaOpts=-Xmx2G -Xms512m

# Elasticsearch
sonar.search.javaOpts=-Xmx2G -Xms2G

# Logging
sonar.log.level=INFO
```

### System Requirements Configuration

```bash
# Linux: Increase system limits
sudo sysctl -w vm.max_map_count=524288
sudo sysctl -w fs.file-max=131072

# Make persistent
echo "vm.max_map_count=524288" | sudo tee -a /etc/sysctl.conf
echo "fs.file-max=131072" | sudo tee -a /etc/sysctl.conf
```

## Project Analysis

### Scanner Installation

#### SonarScanner CLI

```bash
# macOS
brew install sonar-scanner

# Linux
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
unzip sonar-scanner-cli-5.0.1.3006-linux.zip
export PATH=$PATH:/path/to/sonar-scanner/bin

# Windows
choco install sonarscanner
```

#### Language-Specific Scanners

**Maven:**
```xml
<!-- pom.xml -->
<properties>
    <sonar.organization>my-org</sonar.organization>
    <sonar.host.url>https://sonarqube.company.com</sonar.host.url>
</properties>
```

```bash
mvn clean verify sonar:sonar \
  -Dsonar.projectKey=my-project \
  -Dsonar.login=$SONAR_TOKEN
```

**Gradle:**
```groovy
// build.gradle
plugins {
    id "org.sonarqube" version "4.4.1.3373"
}

sonar {
    properties {
        property "sonar.projectKey", "my-project"
        property "sonar.projectName", "My Project"
        property "sonar.host.url", "https://sonarqube.company.com"
    }
}
```

```bash
./gradlew sonar \
  -Dsonar.login=$SONAR_TOKEN
```

**.NET:**
```bash
# Install .NET scanner
dotnet tool install --global dotnet-sonarscanner

# Begin analysis
dotnet sonarscanner begin \
  /k:"my-project" \
  /d:sonar.host.url="http://localhost:9000" \
  /d:sonar.login="$SONAR_TOKEN"

# Build project
dotnet build

# End analysis
dotnet sonarscanner end /d:sonar.login="$SONAR_TOKEN"
```

**JavaScript/TypeScript:**
```bash
sonar-scanner \
  -Dsonar.projectKey=my-js-project \
  -Dsonar.sources=src \
  -Dsonar.tests=tests \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=$SONAR_TOKEN
```

### sonar-project.properties Configuration

```properties
# Required metadata
sonar.projectKey=my-project-key
sonar.projectName=My Project
sonar.projectVersion=1.0

# Source code
sonar.sources=src
sonar.tests=tests

# Exclusions
sonar.exclusions=**/node_modules/**,**/*.spec.ts,**/*.test.js
sonar.test.exclusions=**/*.test.js,**/*.spec.ts

# Coverage reports
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.python.coverage.reportPaths=coverage.xml
sonar.java.coveragePlugin=jacoco
sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml

# Language-specific
sonar.java.source=17
sonar.java.binaries=target/classes
sonar.python.version=3.11
```

## Quality Gates

### Creating Custom Quality Gates

1. **Navigate**: Administration → Quality Gates
2. **Create**: Click "Create" button
3. **Add Conditions**: Define thresholds

### Common Quality Gate Conditions

```yaml
Quality Gate: "Strict Quality"
Conditions on New Code:
  - Coverage: < 80% (Error)
  - Duplicated Lines: > 3% (Error)
  - Maintainability Rating: worse than A (Error)
  - Reliability Rating: worse than A (Error)
  - Security Rating: worse than A (Error)
  - Security Hotspots Reviewed: < 100% (Error)
  
Conditions on Overall Code:
  - Blocker Issues: > 0 (Error)
  - Critical Issues: > 0 (Error)
  - Code Smells: > 100 (Warning)
```

### Setting Default Quality Gate

```bash
# Via API
curl -u $SONAR_TOKEN: -X POST \
  "http://localhost:9000/api/qualitygates/set_as_default?id=1"
```

### Quality Gate in CI/CD

```bash
# Check quality gate status
sonar-scanner # ... scan parameters

# Wait for quality gate result
curl -u $SONAR_TOKEN: \
  "http://localhost:9000/api/qualitygates/project_status?projectKey=my-project" \
  | jq '.projectStatus.status'

# Returns: "OK", "WARN", or "ERROR"
```

## Quality Profiles

### Understanding Quality Profiles

Quality Profiles define which rules are active for analysis. Each language has default profiles, but you can customize them.

### Creating Custom Profile

1. **Navigate**: Quality Profiles → Create
2. **Base profile**: Select parent (e.g., "Sonar way")
3. **Customize rules**: Activate/deactivate specific rules
4. **Set severity**: Blocker, Critical, Major, Minor, Info

### Activating Rules

```yaml
Example Rules to Activate:
Java:
  - "Unused private methods should be removed"
  - "Cognitive Complexity of methods should not be too high"
  - "Methods should not have too many parameters"
  
JavaScript:
  - "Strict equality should be used"
  - "Variables should be declared before use"
  - "Functions should not have too many lines"

Security:
  - "SQL queries should not be vulnerable to injection"
  - "Cryptographic keys should be robust"
  - "Hard-coded credentials should not be used"
```

### Profile Inheritance

```bash
Custom Profile
  ↓ extends
Sonar way Java
  ↓ includes
500+ rules
```

## CI/CD Integration

### GitHub Actions

```yaml
name: SonarQube Analysis

on:
  push:
    branches: [main, develop]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarqube:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for better analysis
      
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: 17
          distribution: 'temurin'
      
      - name: Cache SonarQube packages
        uses: actions/cache@v3
        with:
          path: ~/.sonar/cache
          key: ${{ runner.os }}-sonar
      
      - name: Build and analyze
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
        run: |
          mvn clean verify sonar:sonar \
            -Dsonar.projectKey=my-project \
            -Dsonar.pullrequest.key=${{ github.event.pull_request.number }} \
            -Dsonar.pullrequest.branch=${{ github.head_ref }} \
            -Dsonar.pullrequest.base=${{ github.base_ref }}
      
      - name: Quality Gate check
        uses: sonarsource/sonarqube-quality-gate-action@master
        timeout-minutes: 5
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### GitLab CI

```yaml
sonarqube-check:
  image: maven:3-openjdk-17
  variables:
    SONAR_USER_HOME: "${CI_PROJECT_DIR}/.sonar"
    GIT_DEPTH: "0"
  cache:
    key: "${CI_JOB_NAME}"
    paths:
      - .sonar/cache
  script:
    - mvn verify sonar:sonar
        -Dsonar.projectKey=$CI_PROJECT_NAME
        -Dsonar.qualitygate.wait=true
        -Dsonar.host.url=$SONAR_HOST_URL
        -Dsonar.login=$SONAR_TOKEN
  allow_failure: false
  only:
    - merge_requests
    - main
    - develop
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        SONAR_TOKEN = credentials('sonarqube-token')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube Server') {
                    sh '''
                        mvn sonar:sonar \
                          -Dsonar.projectKey=my-project \
                          -Dsonar.host.url=$SONAR_HOST_URL \
                          -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
```

### Azure Pipelines

```yaml
trigger:
  - main
  - develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  - group: sonarqube-variables

steps:
  - task: SonarQubePrepare@5
    inputs:
      SonarQube: 'SonarQube Connection'
      scannerMode: 'CLI'
      configMode: 'manual'
      cliProjectKey: 'my-project'
      cliProjectName: 'My Project'
      cliSources: 'src'

  - task: Maven@3
    inputs:
      mavenPomFile: 'pom.xml'
      goals: 'clean verify'

  - task: SonarQubeAnalyze@5

  - task: SonarQubePublish@5
    inputs:
      pollingTimeoutSec: '300'
```

## Code Coverage Integration

### JaCoCo (Java)

```xml
<!-- pom.xml -->
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.11</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

```bash
mvn clean test jacoco:report sonar:sonar
```

### Jest (JavaScript/TypeScript)

```json
// package.json
{
  "jest": {
    "collectCoverage": true,
    "coverageReporters": ["lcov", "text"],
    "coverageDirectory": "coverage"
  }
}
```

```bash
npm test
sonar-scanner -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
```

### pytest-cov (Python)

```bash
pytest --cov=src --cov-report=xml

sonar-scanner \
  -Dsonar.python.coverage.reportPaths=coverage.xml
```

### Coverage (Go)

```bash
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

sonar-scanner \
  -Dsonar.go.coverage.reportPaths=coverage.out
```

## Metrics and Technical Debt

### Key Metrics

**Reliability:**
- Bugs count
- Reliability rating (A-E)
- Reliability remediation effort

**Security:**
- Vulnerabilities count
- Security rating (A-E)
- Security hotspots
- Security remediation effort

**Maintainability:**
- Code smells count
- Maintainability rating (A-E)
- Technical debt ratio
- Technical debt (time to fix)

**Coverage:**
- Line coverage %
- Branch coverage %
- Uncovered lines/conditions

**Duplications:**
- Duplicated lines %
- Duplicated blocks
- Duplicated files

**Size:**
- Lines of code
- Statements
- Functions
- Classes
- Files

### Technical Debt Calculation

```
Technical Debt Ratio = (Technical Debt / Development Cost) * 100

Where:
- Technical Debt = Remediation effort for all code smells
- Development Cost = Lines of Code * 30 minutes per line
```

### Remediation Effort

```yaml
Issue Severity → Default Remediation Time:
  Blocker: 1 day
  Critical: 1 hour
  Major: 30 minutes
  Minor: 10 minutes
  Info: 5 minutes
```

## Security Features

### Security Hotspots

Security hotspots are security-sensitive pieces of code that need manual review:

```java
// Example: Security Hotspot
public void processUserInput(String input) {
    // Hotspot: Using exec() with user input
    Runtime.getRuntime().exec(input);  // ⚠️ Review required
}
```

**Review Process:**
1. Navigate to Security Hotspots tab
2. Review flagged code
3. Mark as:
   - **Safe**: Code is secure
   - **Fixed**: Vulnerability was found and fixed
   - **Acknowledge**: Known risk, accepted

### Taint Analysis

Tracks data flow from sources to sinks:

```java
// Source: User input
String userInput = request.getParameter("sql");

// No sanitization

// Sink: SQL execution
Statement stmt = connection.createStatement();
stmt.execute(userInput);  // ⚠️ SQL Injection vulnerability
```

### OWASP Top 10 Coverage

SonarQube detects issues for all OWASP Top 10 categories:
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery

## Advanced Features

### Branch Analysis (Developer Edition+)

```bash
# Analyze feature branch
mvn sonar:sonar \
  -Dsonar.branch.name=feature/new-feature

# Analyze pull request
mvn sonar:sonar \
  -Dsonar.pullrequest.key=123 \
  -Dsonar.pullrequest.branch=feature/new-feature \
  -Dsonar.pullrequest.base=main
```

### Portfolio Management (Enterprise Edition)

```yaml
Portfolio Structure:
  Company Portfolio
    ├── Team A Projects
    │   ├── Project 1
    │   └── Project 2
    └── Team B Projects
        ├── Project 3
        └── Project 4

Aggregated Metrics:
  - Overall reliability rating
  - Total technical debt
  - Security vulnerabilities across all projects
```

### Custom Rules

Create custom rules using templates or XPath:

```xml
<!-- Custom Java rule using XPath -->
<rule>
  <key>custom-rule-1</key>
  <name>Method names must start with lowercase</name>
  <description>Enforce method naming convention</description>
  <xpath>//MethodDeclarator[matches(@Image, '^[A-Z].*')]</xpath>
</rule>
```

### Webhooks

Send analysis results to external systems:

```json
POST https://your-server.com/webhook
{
  "serverUrl": "https://sonarqube.company.com",
  "taskId": "AXxyz123",
  "status": "SUCCESS",
  "analysedAt": "2026-01-20T10:30:00+0000",
  "project": {
    "key": "my-project",
    "name": "My Project"
  },
  "qualityGate": {
    "status": "OK",
    "conditions": [
      {
        "metric": "new_coverage",
        "operator": "LESS_THAN",
        "value": "75",
        "status": "OK",
        "actualValue": "82"
      }
    ]
  }
}
```

## Best Practices

### 1. Focus on New Code

Configure quality gates to be strict on new code:
```yaml
Philosophy: Fix as You Go
- New code must meet high standards (A rating, 80%+ coverage)
- Legacy code improved gradually
- Prevents deterioration over time
```

### 2. Fail Fast in CI/CD

```bash
# Always check quality gate
mvn sonar:sonar -Dsonar.qualitygate.wait=true

# Exit code non-zero if gate fails
```

### 3. Regular Profile Updates

```bash
# Stay current with Sonar way updates
- Review monthly for new rules
- Test changes in non-production first
- Communicate rule changes to team
```

### 4. Meaningful Exclusions

```properties
# Be specific with exclusions
sonar.exclusions=**/generated/**,**/*.pb.go,**/vendor/**

# Document WHY code is excluded
# Bad: sonar.exclusions=**/*
# Good: sonar.exclusions=**/proto/** # Generated protobuf code
```

### 5. Security-First Mindset

```yaml
Prioritize:
  1. Critical vulnerabilities (immediate fix)
  2. Security hotspots (review within sprint)
  3. Bugs (fix before features)
  4. Code smells (continuous improvement)
```

### 6. Coverage Targets

```yaml
Recommended Coverage Targets:
  Critical Services: 90%+
  Business Logic: 80%+
  Utilities: 70%+
  UI Components: 60%+

Not: "100% coverage"
But: "Coverage of critical paths"
```

## Troubleshooting

### Common Issues

**1. OutOfMemoryError during analysis:**
```bash
# Increase Elasticsearch heap
sonar.search.javaOpts=-Xmx4G -Xms4G

# Increase Compute Engine heap
sonar.ce.javaOpts=-Xmx4G -Xms1G
```

**2. Analysis takes too long:**
```bash
# Exclude test files from duplication check
sonar.cpd.exclusions=**/*Test.java,**/*IT.java

# Reduce scope
sonar.sources=src/main
sonar.exclusions=**/vendor/**,**/node_modules/**
```

**3. Quality gate not appearing in CI:**
```bash
# Ensure webhook is configured
# Check background task completed
# Verify quality gate timeout is sufficient
```

**4. Scanner fails with authentication error:**
```bash
# Verify token hasn't expired
# Check token has 'Execute Analysis' permission
# Use token, not password
mvn sonar:sonar -Dsonar.login=$TOKEN  # Not -Dsonar.password
```

### Logs Location

```bash
# Web Server logs
$SONARQUBE_HOME/logs/web.log

# Compute Engine logs
$SONARQUBE_HOME/logs/ce.log

# Elasticsearch logs
$SONARQUBE_HOME/logs/es.log

# Access logs
$SONARQUBE_HOME/logs/access.log
```

## Real-World Use Cases

### Use Case 1: Preventing Vulnerable Code Merges

**Scenario**: Fintech company must prevent security vulnerabilities from reaching production.

**Implementation**:
```yaml
GitHub Branch Protection:
  - Require SonarQube check to pass
  - Quality Gate conditions:
    * New vulnerabilities: 0
    * Security rating: A
    * Security hotspots reviewed: 100%

Result:
  - Pull requests with security issues automatically blocked
  - Developers fix issues before code review
  - Security team reviews only hotspots
```

### Use Case 2: Legacy Code Modernization

**Scenario**: E-commerce platform with 500K lines of legacy code wants to improve quality without rewrite.

**Implementation**:
```yaml
Strategy:
  Phase 1: Measure baseline
    - Run initial scan
    - Document current technical debt: 450 days
    
  Phase 2: Stop the bleeding
    - Quality gate for new code only
    - New code must have: A rating, 80% coverage
    
  Phase 3: Gradual improvement
    - Boy Scout Rule: Improve touched files
    - Target: Reduce debt by 5% per quarter
    
  Phase 4: Active remediation
    - Dedicate 20% sprint capacity to debt
    - Prioritize high-traffic modules

Result after 1 year:
  - Technical debt reduced to 320 days (-29%)
  - All new features meet quality standards
  - Zero new security vulnerabilities
```

### Use Case 3: Multi-Team Consistency

**Scenario**: Large organization with 50 teams needs consistent code quality standards.

**Implementation**:
```yaml
Centralized SonarQube:
  - Single instance for all teams
  - Shared quality profiles per language
  - Mandatory quality gates
  - Portfolio dashboard for executives

Team Autonomy:
  - Teams can extend base profiles
  - Custom project-specific metrics
  - Team-level quality gates (stricter than company minimum)

Governance:
  - Quality Guild reviews profiles quarterly
  - Security team manages security rules
  - Automated compliance reports

Result:
  - Consistent quality standards across 200+ projects
  - 40% reduction in production bugs
  - Faster onboarding for developers switching teams
```

## Resources

### Official Documentation
- **Main Docs**: https://docs.sonarsource.com/sonarqube/
- **API Documentation**: https://next.sonarqube.com/sonarqube/web_api
- **Community Forum**: https://community.sonarsource.com/

### Downloads
- **SonarQube**: https://www.sonarsource.com/products/sonarqube/downloads/
- **Scanner CLI**: https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner/

### Learning Resources
- **SonarQube Academy**: Free training courses
- **Clean Code**: https://www.sonarsource.com/learn/clean-code/
- **Blog**: https://www.sonarsource.com/blog/

### Plugins
- **SonarLint**: IDE integration for IntelliJ, VS Code, Eclipse, Visual Studio
- **Community Plugins**: https://docs.sonarsource.com/sonarqube/latest/instance-administration/plugin-version-matrix/

