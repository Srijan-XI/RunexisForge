# Fortify

## Introduction

Fortify (Micro Focus Fortify / OpenText Fortify) is a comprehensive enterprise-grade Application Security Testing (AST) platform that helps organizations identify, prioritize, and fix security vulnerabilities throughout the software development lifecycle (SDLC). Fortify combines Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), Software Composition Analysis (SCA), and Runtime Application Self-Protection (RASP) to provide complete application security coverage.

### What is Fortify?

Fortify provides multiple security testing solutions:
- **Fortify Static Code Analyzer (SCA)**: SAST for source code analysis
- **Fortify WebInspect**: DAST for runtime vulnerability testing
- **Fortify on Demand (FoD)**: Cloud-based security testing as a service
- **Fortify Software Security Center (SSC)**: Centralized vulnerability management
- **Fortify ScanCentral**: Distributed scanning for large-scale deployments

### Key Capabilities

**Multi-Technology Support:**
- 30+ programming languages and frameworks
- Java, C#, .NET, C/C++, Python, JavaScript, TypeScript
- PHP, Ruby, Go, Kotlin, Swift, Objective-C, Scala
- Mobile: iOS, Android
- Web frameworks: Spring, ASP.NET, React, Angular, Vue

**Security Coverage:**
- OWASP Top 10
- SANS Top 25
- CWE/SANS Top 25 Most Dangerous Software Errors
- PCI DSS, HIPAA, GDPR compliance
- Custom security standards and policies

**Enterprise Features:**
- Centralized management dashboard
- Role-based access control
- Integration with SDLC tools
- Automated policy enforcement
- Comprehensive reporting and analytics

## Why Fortify?

- **Enterprise Standard**: Industry-leading AppSec platform trusted globally
- **Complete Security Coverage**: SAST, DAST, SCA, RASP in one platform
- **Accuracy and Depth**: Advanced analysis with low false positives
- **Scalability**: Handles enterprise-scale applications and portfolios
- **Compliance Support**: Built-in compliance reporting for major standards
- **Centralized Management**: Single pane of glass for all security data
- **Developer Enablement**: IDE integration, training, remediation guidance
- **Flexibility**: Cloud (FoD), on-premises, or hybrid deployment
- **Mature Platform**: 20+ years of security testing innovation
- **Risk Prioritization**: Intelligent risk scoring and remediation prioritization

## Fortify vs Competitors

| Feature | Fortify | Checkmarx | Veracode | SonarQube | Synopsys |
|---------|---------|-----------|----------|-----------|----------|
| SAST | ✅ Excellent | ✅ Excellent | ✅ Excellent | ✅ Excellent | ✅ Excellent |
| DAST | ✅ WebInspect | ✅ Built-in | ✅ Built-in | ❌ No | ✅ Built-in |
| SCA | ✅ Built-in | ✅ Built-in | ✅ Built-in | ➕ Add-on | ✅ Excellent |
| RASP | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No |
| Languages | ✅ 30+ | ✅ 25+ | ✅ 100+ | ✅ 30+ | ✅ 40+ |
| Cloud Platform | ✅ FoD | ❌ Limited | ✅ Yes | ❌ No | ❌ Limited |
| On-Premises | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| False Positives | ✅ Low | ✅ Low | ✅ Medium | ✅ Medium | ✅ Low |
| Audit Manager | ✅ Built-in | ✅ Yes | ✅ Yes | ❌ Limited | ✅ Yes |
| Pricing | 💰 Very High | 💰 High | 💰 High | Free/Paid | 💰 Very High |
| Support | ✅ Enterprise | ✅ Enterprise | ✅ Enterprise | Community/Paid | ✅ Enterprise |

## When to Use Fortify

✅ **Use Fortify when:**
- Enterprise security program requires comprehensive platform
- Need both SAST and DAST in unified solution
- Regulatory compliance demands rigorous security testing
- Managing application security at portfolio scale
- Want centralized security management (SSC)
- Need flexible deployment (cloud FoD or on-premises)
- Require RASP for runtime protection
- Want mature platform with proven track record
- Need detailed audit trails and compliance reporting
- Budget supports enterprise-grade tooling

❌ **Consider alternatives when:**
- Budget is limited (SonarQube Community free)
- Small team or startup (Snyk, SonarQube better)
- Need only code quality focus (SonarQube better)
- Want cloud-native SaaS only (Veracode)
- Primary need is developer experience (Snyk better)
- Open-source solution required
- Simple security scanning sufficient

## Key Features

### Static Application Security Testing (SAST)
- **Source code analysis**: Analyzes code without execution
- **Data flow analysis**: Tracks data from sources to sinks
- **Control flow analysis**: Understands program logic
- **Structural analysis**: Examines code structure
- **Semantic analysis**: Understands code meaning and context
- **Configuration analysis**: Checks framework/library configurations

### Dynamic Application Security Testing (DAST)
- **Runtime testing**: Tests running applications
- **Black-box testing**: No source code required
- **Web application scanning**: HTTP/HTTPS protocols
- **API testing**: REST, SOAP, GraphQL
- **Authentication testing**: Login mechanisms
- **Session management**: Cookie and token security

### Software Composition Analysis (SCA)
- **Open-source scanning**: Identifies third-party components
- **License compliance**: Tracks open-source licenses
- **Vulnerability detection**: Known CVEs in dependencies
- **Outdated libraries**: Identifies components needing updates
- **Transitive dependencies**: Analyzes entire dependency tree

### Vulnerability Management
- **Centralized dashboard**: Single pane of glass (SSC)
- **Risk prioritization**: Business impact scoring
- **Vulnerability tracking**: Lifecycle management
- **False positive management**: AI-powered FP detection
- **Remediation guidance**: Fix recommendations

## Installation

### Fortify Static Code Analyzer (SCA)

#### Prerequisites
- Windows Server 2016+ or Linux (RHEL/CentOS 7+)
- 16GB RAM minimum (32GB+ recommended)
- 100GB+ disk space
- Java 8 or 11
- Appropriate license file (.fortify file)

#### Windows Installation

```powershell
# 1. Download Fortify SCA installer
# Requires valid license from Micro Focus/OpenText

# 2. Extract installer
Expand-Archive -Path Fortify_SCA_23.1.0_windows_x64.zip -DestinationPath C:\Fortify

# 3. Run installer as Administrator
cd C:\Fortify
.\Fortify_SCA_23.1.0_Installer_x64.exe

# 4. Follow installation wizard
# - Accept license agreement
# - Choose installation directory (default: C:\Program Files\Fortify\Fortify_SCA_23.1.0)
# - Install all components
# - Configure license

# 5. Install license
fortifyupdate -acceptKey
# Enter license key when prompted

# 6. Update security content
fortifyupdate

# 7. Verify installation
sourceanalyzer -version
```

#### Linux Installation

```bash
# 1. Download Fortify SCA for Linux
# Requires valid license

# 2. Extract installer
unzip Fortify_SCA_23.1.0_linux_x64.zip
cd Fortify_SCA_23.1.0_Linux_x64

# 3. Run installer
chmod +x Fortify_SCA_23.1.0_Installer_x64.run
sudo ./Fortify_SCA_23.1.0_Installer_x64.run

# 4. Set environment variables
export FORTIFY_HOME=/opt/Fortify/Fortify_SCA_23.1.0
export PATH=$PATH:$FORTIFY_HOME/bin

# Add to ~/.bashrc for persistence
echo 'export FORTIFY_HOME=/opt/Fortify/Fortify_SCA_23.1.0' >> ~/.bashrc
echo 'export PATH=$PATH:$FORTIFY_HOME/bin' >> ~/.bashrc

# 5. Install license
fortifyupdate -acceptKey

# 6. Update security content
fortifyupdate

# 7. Verify installation
sourceanalyzer -version
```

### Fortify Software Security Center (SSC)

```bash
# Prerequisites
# - Java 11
# - Database: MySQL 8.0, PostgreSQL 12+, Oracle 12c+, or SQL Server 2017+
# - Apache Tomcat 9.x or included

# 1. Download SSC installer
# Extract ssc-webapp-23.1.war

# 2. Create database
# MySQL example:
CREATE DATABASE ssc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ssc'@'localhost' IDENTIFIED BY 'SecurePassword123';
GRANT ALL PRIVILEGES ON ssc.* TO 'ssc'@'localhost';
FLUSH PRIVILEGES;

# 3. Deploy SSC WAR file
# Option A: Standalone
java -jar ssc-webapp-23.1.war

# Option B: Tomcat
cp ssc-webapp-23.1.war $CATALINA_HOME/webapps/ssc.war

# 4. Initial configuration
# Access: http://localhost:8080/ssc
# Follow setup wizard:
# - Configure database connection
# - Create admin account
# - Configure email (SMTP)
# - Upload license

# 5. Start SSC
# Standalone: Already running
# Tomcat: catalina.sh run
```

### Fortify WebInspect

```powershell
# Windows only

# 1. Download WebInspect installer
# Requires valid license

# 2. Run installer as Administrator
.\WebInspect_23.1.0_Setup.exe

# 3. Follow installation wizard
# - Install location: C:\Program Files\HP\HP WebInspect
# - Choose components: All
# - Configure license

# 4. Install license
# Help → License Management → Install License File

# 5. Update vulnerability checks
# Tools → Update Manager → Check for Updates

# 6. Verify installation
# Launch WebInspect from Start Menu
```

### Fortify on Demand (FoD)

```bash
# Cloud-based service - no installation required
# Sign up at: https://www.microfocus.com/fortify-on-demand

# Download FoD Uploader for CI/CD integration
# Windows
curl -O https://fortify.github.io/FortifyOnDemandUploader/FoDUploader.zip
unzip FoDUploader.zip

# Linux/macOS
curl -O https://fortify.github.io/FortifyOnDemandUploader/FoDUploader.jar

# Verify
java -jar FoDUploader.jar -version
```

## Configuration

### Fortify SCA Configuration

**Basic Configuration:**

```bash
# Set scan options
sourceanalyzer -b BuildID -scan-precision <1-5>
# 1: Fastest, least accurate
# 5: Slowest, most accurate (recommended for release scans)

# Configure memory
# Edit fortify-sca.properties
com.fortify.sca.scanners.memory.max=8G
com.fortify.sca.MaxHeapSize=6G

# Set number of threads
com.fortify.sca.ThreadCount=4
```

**Custom Rules:**

```xml
<!-- Create custom rule file: custom-rules.xml -->
<RulePack xmlns="xmlns://www.fortifysoftware.com/schema/rules">
  <Rules>
    <Rule id="custom-001">
      <Description>Detect hardcoded API keys</Description>
      <Triggers>
        <Pattern>
          <Match>api_key\s*=\s*["\'][a-zA-Z0-9]{32,}["\']</Match>
        </Pattern>
      </Triggers>
      <Vulnerable>
        <Alteration>
          <Description>Hardcoded API key detected</Description>
          <Severity>High</Severity>
          <Confidence>High</Confidence>
        </Alteration>
      </Vulnerable>
    </Rule>
  </Rules>
</RulePack>
```

```bash
# Load custom rules
sourceanalyzer -b BuildID -rules custom-rules.xml
```

### SSC Configuration

**Application Creation:**

```yaml
Steps:
  1. Login to SSC: http://localhost:8080/ssc
  2. Applications → New Application
  3. Configure:
     - Application Name: "MyApp"
     - Version Name: "1.0"
     - Description: "Production application"
  4. Set attributes:
     - Business Risk: High
     - Development Phase: Active Development
     - Deployment: Production
  5. Configure issue templates
  6. Set up users and permissions
```

**Policy Configuration:**

```yaml
Define Policies:
  1. Administration → Templates → Policy
  2. Create new policy: "Production Policy"
  3. Configure thresholds:
     - Critical Issues: 0
     - High Issues: 5
     - Medium Issues: 20
     - Low Issues: 50
  4. Apply to applications
  5. Enable automated reporting
```

## Scanning Applications

### Static Code Analysis (SCA)

**Java Application (Maven):**

```bash
# 1. Clean build
mvn clean

# 2. Translate (gather source files)
sourceanalyzer -b MyApp-BuildID \
  mvn clean compile

# 3. Scan
sourceanalyzer -b MyApp-BuildID \
  -scan \
  -f MyApp-results.fpr \
  -scan-precision 5

# With specific rules
sourceanalyzer -b MyApp-BuildID \
  -scan \
  -f MyApp-results.fpr \
  -rules custom-rules.xml \
  -filter owasp-top-10.filter
```

**Java Application (Gradle):**

```bash
# 1. Translate
sourceanalyzer -b MyApp-BuildID \
  gradle clean build

# 2. Scan
sourceanalyzer -b MyApp-BuildID \
  -scan \
  -f MyApp-results.fpr
```

**.NET Application:**

```powershell
# 1. Translate
sourceanalyzer -b MyApp-BuildID `
  msbuild MyApp.sln /t:Rebuild /p:Configuration=Release

# 2. Scan
sourceanalyzer -b MyApp-BuildID `
  -scan `
  -f MyApp-results.fpr `
  -scan-precision 5
```

**Python Application:**

```bash
# 1. Translate
sourceanalyzer -b MyApp-BuildID \
  -python-version 3.11 \
  -python-path /path/to/project \
  ./**/*.py

# 2. Scan
sourceanalyzer -b MyApp-BuildID \
  -scan \
  -f MyApp-results.fpr
```

**JavaScript/TypeScript:**

```bash
# 1. Translate
sourceanalyzer -b MyApp-BuildID \
  -nodejs-version 18 \
  ./**/*.js ./**/*.ts

# 2. Scan
sourceanalyzer -b MyApp-BuildID \
  -scan \
  -f MyApp-results.fpr
```

### Advanced Scan Options

```bash
# Exclude files/directories
sourceanalyzer -b BuildID \
  -exclude "node_modules/**" \
  -exclude "tests/**" \
  -exclude "*.test.js" \
  mvn compile

# Specify maximum heap size
sourceanalyzer -b BuildID \
  -Xmx8G \
  -scan -f results.fpr

# Enable debug mode
sourceanalyzer -b BuildID \
  -debug \
  -logfile scan.log \
  -scan -f results.fpr

# Quick scan (faster, less thorough)
sourceanalyzer -b BuildID \
  -quick \
  -scan -f results.fpr
```

### Software Composition Analysis (SCA)

```bash
# Scan for open-source vulnerabilities
sourceanalyzer -b BuildID \
  -scan \
  -sca \
  -f results.fpr

# With custom SCA configuration
sourceanalyzer -b BuildID \
  -scan \
  -sca \
  -sca-snapshot snapshot.json \
  -f results.fpr
```

### Uploading Results to SSC

```bash
# Upload FPR to SSC
fortifyclient -url http://localhost:8080/ssc \
  -authtoken <token> \
  uploadFPR \
  -file MyApp-results.fpr \
  -project "MyApp" \
  -version "1.0"

# Generate authentication token in SSC:
# Administration → Users → Generate Token
```

## Dynamic Application Security Testing (DAST)

### Fortify WebInspect

**Manual Scan Setup:**

```yaml
1. Launch WebInspect
2. File → New Scan
3. Configure scan:
   - URL: https://example.com
   - Authentication: Configure if needed
   - Scan Settings: Standard Assessment
   - Policy: OWASP Top 10
4. Start Scan
5. Review results
6. Export report
```

**Automated Scan (CLI):**

```powershell
# Windows
& "C:\Program Files\HP\HP WebInspect\WI.exe" `
  -s "https://example.com" `
  -ps "Standard Assessment" `
  -u username `
  -p password `
  -r "scan-results.xml"

# With settings file
& "C:\Program Files\HP\HP WebInspect\WI.exe" `
  -settings "scan-config.xml" `
  -r "scan-results.xml"
```

**API Scanning:**

```yaml
Steps:
  1. Import API definition:
     - OpenAPI/Swagger
     - Postman collection
     - WADL
     - GraphQL schema
  
  2. Configure authentication:
     - API keys
     - OAuth 2.0
     - JWT tokens
  
  3. Start scan
  4. Review API-specific vulnerabilities
```

## CI/CD Integration

### Jenkins Integration

**Using Fortify Jenkins Plugin:**

```groovy
pipeline {
    agent any
    
    environment {
        FORTIFY_SSC_URL = 'http://ssc.company.com:8080/ssc'
        FORTIFY_SSC_TOKEN = credentials('fortify-ssc-token')
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        
        stage('Fortify SCA Translation') {
            steps {
                sh """
                    sourceanalyzer -b ${env.JOB_NAME}-${env.BUILD_NUMBER} \
                    mvn clean compile
                """
            }
        }
        
        stage('Fortify SCA Scan') {
            steps {
                sh """
                    sourceanalyzer -b ${env.JOB_NAME}-${env.BUILD_NUMBER} \
                    -scan \
                    -f fortify-results.fpr \
                    -scan-precision 3
                """
            }
        }
        
        stage('Upload to SSC') {
            steps {
                sh """
                    fortifyclient -url ${FORTIFY_SSC_URL} \
                    -authtoken ${FORTIFY_SSC_TOKEN} \
                    uploadFPR \
                    -file fortify-results.fpr \
                    -project "MyApp" \
                    -version "${env.BRANCH_NAME}"
                """
            }
        }
        
        stage('Check Quality Gate') {
            steps {
                script {
                    def result = sh(
                        script: """
                            fortifyclient -url ${FORTIFY_SSC_URL} \
                            -authtoken ${FORTIFY_SSC_TOKEN} \
                            getApplicationVersionQuality \
                            -project "MyApp" \
                            -version "${env.BRANCH_NAME}"
                        """,
                        returnStdout: true
                    ).trim()
                    
                    if (result != "PASSED") {
                        error("Fortify quality gate failed: ${result}")
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Archive FPR file
            archiveArtifacts artifacts: '*.fpr', allowEmptyArchive: true
            
            // Clean up build ID
            sh "sourceanalyzer -b ${env.JOB_NAME}-${env.BUILD_NUMBER} -clean"
        }
    }
}
```

### GitHub Actions

```yaml
name: Fortify SAST Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  fortify-sast:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Set up JDK 11
        uses: actions/setup-java@v4
        with:
          java-version: 11
          distribution: 'temurin'
      
      - name: Download Fortify SCA
        run: |
          # Download from secure storage
          curl -O ${{ secrets.FORTIFY_SCA_URL }}
          tar -xzf fortify-sca.tar.gz
          export PATH=$PATH:$(pwd)/fortify/bin
      
      - name: Fortify Translation
        run: |
          sourceanalyzer -b ${{ github.repository }}-${{ github.run_number }} \
            mvn clean compile
      
      - name: Fortify Scan
        run: |
          sourceanalyzer -b ${{ github.repository }}-${{ github.run_number }} \
            -scan \
            -f fortify-results.fpr \
            -scan-precision 3
      
      - name: Upload to Fortify on Demand
        run: |
          java -jar FoDUploader.jar \
            -apiurl https://api.emea.fortify.com/ \
            -apikey ${{ secrets.FOD_API_KEY }} \
            -apisecret ${{ secrets.FOD_API_SECRET }} \
            -ac ${{ secrets.FOD_RELEASE_ID }} \
            -purl https://api.emea.fortify.com/submissions/v1 \
            -f fortify-results.fpr \
            -appsec Static \
            -pp 2 \
            -I 1
      
      - name: Upload FPR as artifact
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: fortify-results
          path: fortify-results.fpr
```

### GitLab CI

```yaml
fortify-sast:
  stage: security
  image: maven:3-openjdk-11
  
  variables:
    FORTIFY_SCA_PATH: "/opt/fortify/bin"
  
  before_script:
    - export PATH=$PATH:$FORTIFY_SCA_PATH
  
  script:
    # Translation
    - sourceanalyzer -b ${CI_PROJECT_NAME}-${CI_PIPELINE_ID} mvn clean compile
    
    # Scan
    - sourceanalyzer -b ${CI_PROJECT_NAME}-${CI_PIPELINE_ID} 
        -scan 
        -f fortify-results.fpr 
        -scan-precision 3
    
    # Upload to SSC
    - |
      fortifyclient -url $FORTIFY_SSC_URL \
        -authtoken $FORTIFY_SSC_TOKEN \
        uploadFPR \
        -file fortify-results.fpr \
        -project "${CI_PROJECT_NAME}" \
        -version "${CI_COMMIT_REF_NAME}"
    
    # Clean up
    - sourceanalyzer -b ${CI_PROJECT_NAME}-${CI_PIPELINE_ID} -clean
  
  artifacts:
    when: always
    paths:
      - fortify-results.fpr
    expire_in: 1 week
  
  allow_failure: false
  only:
    - main
    - develop
    - merge_requests
```

### Azure DevOps

```yaml
trigger:
  branches:
    include:
      - main
      - develop

pool:
  vmImage: 'windows-latest'

variables:
  - group: fortify-credentials

steps:
  - task: Maven@3
    displayName: 'Maven Build'
    inputs:
      mavenPomFile: 'pom.xml'
      goals: 'clean package'
  
  - task: PowerShell@2
    displayName: 'Fortify Translation'
    inputs:
      targetType: 'inline'
      script: |
        sourceanalyzer -b $(Build.Repository.Name)-$(Build.BuildNumber) `
          mvn clean compile
  
  - task: PowerShell@2
    displayName: 'Fortify Scan'
    inputs:
      targetType: 'inline'
      script: |
        sourceanalyzer -b $(Build.Repository.Name)-$(Build.BuildNumber) `
          -scan `
          -f fortify-results.fpr `
          -scan-precision 3
  
  - task: PowerShell@2
    displayName: 'Upload to SSC'
    inputs:
      targetType: 'inline'
      script: |
        fortifyclient -url $(FORTIFY_SSC_URL) `
          -authtoken $(FORTIFY_SSC_TOKEN) `
          uploadFPR `
          -file fortify-results.fpr `
          -project "$(Build.Repository.Name)" `
          -version "$(Build.SourceBranchName)"
  
  - task: PublishBuildArtifacts@1
    displayName: 'Publish FPR'
    inputs:
      pathToPublish: 'fortify-results.fpr'
      artifactName: 'FortifyResults'
    condition: always()
```

## Results Analysis

### Understanding Vulnerability Categories

```yaml
Critical/High Severity:
  - SQL Injection
  - Command Injection
  - Path Traversal
  - Remote Code Execution
  - Authentication Bypass
  - Hardcoded Credentials

Medium Severity:
  - Cross-Site Scripting (XSS)
  - Cross-Site Request Forgery (CSRF)
  - Insecure Cryptography
  - Information Leakage
  - Session Management Issues

Low/Informational:
  - Dead Code
  - Poor Error Handling
  - Code Quality Issues
  - Best Practice Violations
```

### Audit Workbench

```bash
# Open FPR in Audit Workbench (GUI)
# Windows:
auditworkbench fortify-results.fpr

# Linux/macOS:
/opt/Fortify/bin/auditworkbench fortify-results.fpr

# Generate PDF report
ReportGenerator -format pdf \
  -f fortify-results.fpr \
  -template "OWASP Top 10" \
  -output report.pdf
```

### Triage and Remediation

```yaml
Triage Process:
  1. Sort by severity (Critical → High → Medium)
  2. Review attack paths:
     - Source: Where untrusted data enters
     - Propagation: How data flows
     - Sink: Where vulnerability manifests
  3. Classify:
     - Exploitable: Real vulnerability
     - Not an Issue: False positive
     - Questionable: Needs more investigation
     - Suppressed: Accepted risk
  4. Assign to developers
  5. Track remediation

Audit Comments:
  - Document why marked as false positive
  - Explain suppression reasons
  - Link to tickets/issues
  - Add remediation notes
```

## Best Practices

### 1. Scan Strategy

```yaml
Development Phase:
  - Quick scans (-quick flag)
  - Scan changed files only
  - Run nightly on dev branch

Pre-Release:
  - Full scan (-scan-precision 5)
  - Include all modules
  - Review all findings

Production:
  - Monthly full scans
  - Quarterly compliance scans
  - Annual penetration testing
```

### 2. Performance Optimization

```yaml
Translation Phase:
  - Use incremental builds
  - Exclude test files
  - Parallel translation for multi-module projects

Scan Phase:
  - Increase heap size (-Xmx)
  - Use multiple threads
  - Adjust scan precision based on phase

Memory Settings:
  Small projects (<100K LOC): 4GB
  Medium projects (100K-500K LOC): 8GB
  Large projects (>500K LOC): 16GB+
```

### 3. False Positive Management

```yaml
Reduce False Positives:
  - Use latest security content (fortifyupdate)
  - Configure appropriate analysis depth
  - Use Fortify Audit Assistant (AI)
  - Mark consistently across versions
  - Create suppression rules for patterns

Audit Assistant:
  - ML-powered FP detection
  - Learns from your audit decisions
  - Suggests likely false positives
  - Improves over time
```

### 4. Integration with Development Workflow

```yaml
IDE Integration:
  - Install Fortify plugin for IntelliJ/Eclipse/VS
  - Real-time vulnerability highlighting
  - Fix guidance in IDE
  - Run scans before commit

Issue Tracker Integration:
  - Auto-create Jira tickets
  - Sync vulnerability status
  - Track remediation progress
  - Close loop on fixed issues
```

### 5. Compliance and Reporting

```yaml
Compliance Frameworks:
  - OWASP Top 10 reports
  - PCI DSS compliance reports
  - GDPR security assessments
  - HIPAA compliance tracking

Executive Dashboards:
  - Vulnerability trends
  - MTTR (Mean Time To Remediate)
  - Security debt
  - Application risk scores
  - Team/project comparisons
```

## Troubleshooting

### Common Issues

**1. Translation fails:**
```bash
# Solutions:
- Verify build command works independently
- Check Java/compiler version compatibility
- Increase memory: -Xmx8G
- Enable debug: -debug -logfile trans.log
- Verify source files are accessible
```

**2. Scan takes too long:**
```bash
# Solutions:
- Reduce scan precision (5 → 3)
- Use -quick for development scans
- Exclude unnecessary files/directories
- Increase thread count
- Use distributed scanning (ScanCentral)
```

**3. Cannot upload to SSC:**
```bash
# Verify:
1. SSC is accessible: curl http://ssc:8080/ssc
2. Authentication token is valid
3. Project and version exist in SSC
4. User has upload permissions
5. FPR file is not corrupted

# Test connection:
fortifyclient -url http://ssc:8080/ssc \
  -authtoken <token> \
  listApplications
```

**4. High memory usage:**
```bash
# Solutions:
- Split large projects into modules
- Scan modules independently
- Use ScanCentral for distributed scanning
- Increase system RAM
- Use disk-based caching
```

## Real-World Use Cases

### Use Case 1: Financial Services Security

**Scenario**: Bank must comply with PCI DSS and prevent credit card data breaches.

**Implementation**:
```yaml
Security Requirements:
  - Scan all payment processing code
  - Zero tolerance for Critical vulnerabilities
  - Quarterly compliance scans
  - Immediate remediation of High severity

Fortify Configuration:
  - Custom rules for PCI DSS
  - Scan precision: 5 (highest)
  - Enable SCA for dependencies
  - Integration with ticketing system

Process:
  1. Developer commits code
  2. Automated scan in CI/CD
  3. Block merge if Critical found
  4. Security review for High/Medium
  5. Upload to SSC for tracking
  6. Quarterly audit reports

Results:
  - 100% PCI DSS compliance
  - Zero data breaches
  - 90% reduction in vulnerabilities
  - Average fix time: < 3 days
```

### Use Case 2: Healthcare Application (HIPAA)

**Scenario**: Healthcare provider must protect patient data (PHI) under HIPAA.

**Implementation**:
```yaml
Focus Areas:
  - Data encryption vulnerabilities
  - Access control issues
  - Audit logging gaps
  - Privacy controls

Scan Configuration:
  - Enable all HIPAA-related rules
  - Scan for data exposure
  - Check encryption implementation
  - Verify authentication mechanisms

Workflow:
  - Pre-commit scans via IDE
  - PR scans with automated blocking
  - Weekly full scans
  - Monthly security reviews

Outcomes:
  - HIPAA audit passed
  - No PHI exposure incidents
  - Security awareness increased
  - Developer training improved
```

### Use Case 3: Enterprise Multi-Application Portfolio

**Scenario**: Large enterprise with 200+ applications needs centralized security management.

**Implementation**:
```yaml
Architecture:
  - Fortify SSC as central hub
  - ScanCentral for distributed scanning
  - LDAP integration for SSO
  - Role-based access control

Application Organization:
  - By business unit
  - By risk classification
  - By compliance requirements
  - By development team

Automation:
  - Scheduled nightly scans
  - Automated policy enforcement
  - Email notifications
  - Executive dashboards

Results:
  - Centralized visibility
  - Consistent security standards
  - 60% reduction in vulnerabilities
  - Faster onboarding for new apps
  - Better resource allocation
```

## Resources

### Official Documentation
- **Fortify Documentation**: https://www.microfocus.com/documentation/fortify/
- **Fortify Community**: https://community.microfocus.com/cyberres/fortify/
- **API Reference**: Available in SSC installation

### Downloads
- **Fortify Products**: Requires license from Micro Focus/OpenText
- **Trial Versions**: Available upon request
- **Fortify on Demand**: https://www.microfocus.com/fortify-on-demand

### Learning Resources
- **Fortify University**: Training and certification
- **Webinars**: Regular security webinars
- **Blog**: https://www.microfocus.com/blog/
- **YouTube**: Fortify product tutorials

### Support
- **Support Portal**: https://softwaresupport.softwaregrp.com/
- **Knowledge Base**: Extensive documentation
- **Professional Services**: Implementation assistance
- **Customer Success**: Dedicated support teams

### Compliance Resources
- **OWASP**: https://owasp.org/
- **CWE**: https://cwe.mitre.org/
- **PCI DSS**: https://www.pcisecuritystandards.org/
- **NIST**: https://www.nist.gov/cyberframework
- **SANS**: https://www.sans.org/

### Integration Partners
- **Issue Trackers**: Jira, ServiceNow, Azure Boards
- **CI/CD Tools**: Jenkins, GitLab CI, GitHub Actions, Azure DevOps
- **IDEs**: IntelliJ IDEA, Eclipse, Visual Studio, VS Code
- **SIEM**: Splunk, QRadar, ArcSight
