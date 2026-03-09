# Checkmarx

## Introduction

Checkmarx is a leading enterprise-level Static Application Security Testing (SAST) solution that identifies security vulnerabilities in source code during the development lifecycle. It provides comprehensive security analysis across multiple programming languages and integrates seamlessly into CI/CD pipelines, enabling developers to find and fix security issues before they reach production.

### What is Checkmarx?

Checkmarx offers a suite of application security testing products:
- **Checkmarx SAST** (CxSAST): Static Application Security Testing
- **Checkmarx SCA** (CxSCA): Software Composition Analysis for open-source dependencies
- **Checkmarx IAST**: Interactive Application Security Testing
- **Checkmarx DAST**: Dynamic Application Security Testing
- **Checkmarx One**: Unified AppSec platform combining all tools

### Key Capabilities

**Multi-Language Support:**
- Java, C#, .NET, C/C++, Python, JavaScript, TypeScript
- PHP, Ruby, Go, Kotlin, Swift, Objective-C
- Apex (Salesforce), COBOL, VB6, VB.NET, Perl, Scala
- 25+ programming languages and frameworks

**Security Coverage:**
- OWASP Top 10
- SANS Top 25
- CWE (Common Weakness Enumeration)
- PCI DSS compliance
- GDPR compliance
- Custom security standards

## Why Checkmarx?

- **Enterprise-Grade Security**: Trusted by Fortune 500 companies
- **Comprehensive Coverage**: SAST, SCA, DAST, IAST in one platform
- **Deep Code Analysis**: Advanced data flow and taint analysis
- **Developer Integration**: IDE plugins, Git integration, CI/CD automation
- **Accurate Results**: Low false-positive rates with intelligent detection
- **Compliance Automation**: Built-in compliance reporting (PCI-DSS, GDPR, HIPAA)
- **Scalability**: Handles massive codebases (millions of lines)
- **Expert Remediation**: Detailed fix guidance with code examples
- **AppSec Training**: Integrated Codebashing secure coding training
- **Proven Track Record**: 1,500+ enterprise customers, 20+ years experience

## Checkmarx vs Competitors

| Feature | Checkmarx | SonarQube | Fortify | Veracode | Snyk |
|---------|-----------|-----------|---------|----------|------|
| SAST | ✅ Excellent | ✅ Excellent | ✅ Excellent | ✅ Excellent | ✅ Good |
| SCA | ✅ Built-in | ➕ Add-on | ✅ Built-in | ✅ Built-in | ✅ Excellent |
| DAST | ✅ Built-in | ❌ No | ✅ Built-in | ✅ Built-in | ❌ No |
| IAST | ✅ Yes | ❌ No | ❌ No | ✅ Yes | ❌ No |
| Languages | ✅ 25+ | ✅ 30+ | ✅ 30+ | ✅ 100+ | ✅ 20+ |
| False Positives | ✅ Low | ✅ Medium | ✅ Low | ✅ Low | ✅ Low |
| Remediation | ✅ Excellent | ✅ Good | ✅ Excellent | ✅ Good | ✅ Excellent |
| Open Source | ❌ No | ✅ Community | ❌ No | ❌ No | ✅ Free tier |
| Pricing | 💰 High | Free/Paid | 💰 Very High | 💰 High | 💰 Medium |
| Deployment | ✅ On-prem/Cloud | ✅ Self-hosted | ✅ On-prem/Cloud | ☁️ Cloud-only | ☁️ Cloud-only |

## When to Use Checkmarx

✅ **Use Checkmarx when:**
- Enterprise security requirements demand comprehensive AppSec
- Need unified platform for SAST, SCA, DAST, IAST
- Regulatory compliance is critical (PCI-DSS, HIPAA, GDPR)
- Want low false-positive rates and accurate vulnerability detection
- Need deep code analysis with data flow tracking
- Building security champions program with Codebashing training
- Large organization with diverse technology stack
- Require on-premises deployment for data sovereignty
- Want detailed remediation guidance for developers
- Need executive-level security reporting and analytics

❌ **Consider alternatives when:**
- Budget is limited (use SonarQube Community)
- Need only code quality metrics (SonarQube better)
- Small team or startup (Snyk more cost-effective)
- Open-source solution required
- Primary focus is container security (Snyk better)
- Want developer-focused tool over enterprise platform
- Need lightweight, fast scans only

## Key Features

### Source Code Analysis
- **Comprehensive scanning**: Analyzes entire codebase, not just compiled artifacts
- **Data flow analysis**: Tracks taint from sources to sinks
- **Control flow analysis**: Understands execution paths
- **Semantic analysis**: Understands code context and logic
- **Incremental scans**: Faster scans for incremental changes

### Vulnerability Detection
- **SQL Injection**: Detects all injection vulnerability types
- **Cross-Site Scripting (XSS)**: Stored, reflected, and DOM-based
- **Authentication issues**: Broken authentication and session management
- **Authorization flaws**: Broken access control
- **Cryptographic issues**: Weak algorithms, hard-coded keys
- **Code injection**: Command injection, LDAP injection, XPath injection
- **Insecure configurations**: Security misconfigurations

### Remediation Guidance
- **Detailed vulnerability descriptions**: What, where, and why
- **Attack vectors**: How the vulnerability can be exploited
- **Code examples**: Secure coding examples
- **Remediation guidance**: Step-by-step fix instructions
- **Training links**: Developer education resources

### Integration Capabilities
- **IDE plugins**: Visual Studio, IntelliJ IDEA, Eclipse, VS Code
- **CI/CD integration**: Jenkins, GitLab CI, GitHub Actions, Azure DevOps
- **Issue trackers**: Jira, ServiceNow, Azure Boards
- **SCM integration**: GitHub, GitLab, Bitbucket, Azure Repos
- **Build tools**: Maven, Gradle, MSBuild, Ant

## Installation

### Prerequisites
- Windows Server 2019+ or Linux (RHEL/CentOS 7+)
- Microsoft SQL Server 2017+ or PostgreSQL 11+
- 16GB RAM minimum (32GB+ recommended for production)
- 500GB+ disk space for scans and databases
- Network access to code repositories

### Checkmarx Server Installation

#### Windows Installation

```powershell
# 1. Download Checkmarx installer
# Contact Checkmarx for license and installer

# 2. Run installer as Administrator
.\CheckmarxSetup.exe

# 3. Follow installation wizard:
# - Accept license agreement
# - Choose installation path (default: C:\Program Files\Checkmarx)
# - Configure database connection
# - Set admin credentials
# - Configure email settings (SMTP)

# 4. Verify installation
# Access web portal: https://localhost/cxwebclient
# Default login: admin / <password-set-during-install>
```

#### Linux Installation (Docker)

```bash
# Checkmarx provides Docker images for enterprise deployment

# 1. Load Checkmarx Docker images
docker load < checkmarx-manager.tar
docker load < checkmarx-engine.tar

# 2. Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  cxdb:
    image: mcr.microsoft.com/mssql/server:2019-latest
    environment:
      ACCEPT_EULA: "Y"
      SA_PASSWORD: "YourStrong!Passw0rd"
    volumes:
      - cxdb-data:/var/opt/mssql
    ports:
      - "1433:1433"

  cxmanager:
    image: checkmarx/manager:latest
    depends_on:
      - cxdb
    environment:
      CX_DB_SERVER: cxdb
      CX_DB_USER: sa
      CX_DB_PASSWORD: "YourStrong!Passw0rd"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - cxmanager-logs:/var/log/checkmarx

  cxengine:
    image: checkmarx/engine:latest
    depends_on:
      - cxmanager
    environment:
      CX_MANAGER_URL: http://cxmanager
    volumes:
      - cxengine-data:/opt/checkmarx

volumes:
  cxdb-data:
  cxmanager-logs:
  cxengine-data:
EOF

# 3. Start services
docker-compose up -d

# 4. Access portal
# https://localhost/cxwebclient
```

### CLI Scanner Installation

```bash
# Windows
# Download CxConsole from Checkmarx portal
# Extract to C:\CxConsole

# Linux/macOS
wget https://download.checkmarx.com/CxConsole/CLI/CxConsolePlugin-latest.zip
unzip CxConsolePlugin-latest.zip -d /opt/cxconsole
chmod +x /opt/cxconsole/runCxConsole.sh

# Verify installation
/opt/cxconsole/runCxConsole.sh version
```

### IDE Plugin Installation

**Visual Studio:**
```
1. Open Visual Studio
2. Extensions → Manage Extensions
3. Search "Checkmarx"
4. Install "Checkmarx Visual Studio Extension"
5. Restart Visual Studio
6. Configure: Tools → Options → Checkmarx
```

**IntelliJ IDEA:**
```
1. Settings → Plugins
2. Search "Checkmarx"
3. Install plugin
4. Restart IDE
5. Configure: Settings → Tools → Checkmarx
```

**VS Code:**
```bash
# Install via Extensions Marketplace
code --install-extension Checkmarx.checkmarx-ast-results
```

## Configuration

### Initial Setup

1. **Access Web Portal**: `https://<server>/cxwebclient`
2. **Login**: Use admin credentials
3. **Configure LDAP/SAML** (Optional):
   - Settings → Authentication
   - Configure Active Directory or SSO
4. **Create Teams**:
   - Management → Teams
   - Organize projects by team/department
5. **Set Permissions**:
   - Define roles: Scanner, Reviewer, Manager, Admin

### Preset Configuration

Presets define which security queries to run during scans:

```yaml
Default Presets:
  - Checkmarx Default: Balanced coverage
  - All: Comprehensive (longest scan time)
  - OWASP Top 10: Focus on OWASP vulnerabilities
  - OWASP Mobile Top 10: Mobile-specific issues
  - High and Medium: Prioritize severity
  - High: Only critical issues

Custom Preset Creation:
  1. Settings → Scan Settings → Preset Manager
  2. Create new preset
  3. Select queries to include
  4. Save and assign to projects
```

### Project Configuration

```yaml
Project Settings:
  General:
    - Project name
    - Team assignment
    - Preset selection
    - Scan configuration
  
  Source Control:
    - Repository URL
    - Branch to scan
    - Credentials
    - Scan trigger (commit, schedule, manual)
  
  Scan Settings:
    - Excluded files/folders
    - Excluded queries
    - Custom parameters
  
  Results Settings:
    - Threshold for build failure
    - Email notifications
    - Ticket integration
```

## Scanning Projects

### Web Portal Scan

```yaml
Steps:
  1. Login to Checkmarx portal
  2. Projects & Scans → Create New Project
  3. Configure project:
     - Name: "MyApp-Production"
     - Team: "Development Team A"
     - Preset: "OWASP Top 10"
  4. Upload source code:
     - ZIP file upload
     - Git repository
     - SVN/TFS integration
  5. Start scan
  6. Monitor progress
  7. Review results
```

### CLI Scanner

```bash
# Basic scan
./runCxConsole.sh Scan \
  -CxServer https://checkmarx.company.com \
  -CxUser admin \
  -CxPassword <password> \
  -ProjectName "MyApp" \
  -LocationType folder \
  -LocationPath /path/to/source

# Scan with report generation
./runCxConsole.sh Scan \
  -CxServer https://checkmarx.company.com \
  -CxToken <API-TOKEN> \
  -ProjectName "MyApp" \
  -LocationType folder \
  -LocationPath /path/to/source \
  -Preset "OWASP Top 10" \
  -ReportXML results.xml \
  -ReportPDF results.pdf

# Incremental scan (faster)
./runCxConsole.sh Scan \
  -CxServer https://checkmarx.company.com \
  -CxToken <API-TOKEN> \
  -ProjectName "MyApp" \
  -LocationType folder \
  -LocationPath /path/to/source \
  -Incremental

# Scan from Git repository
./runCxConsole.sh Scan \
  -CxServer https://checkmarx.company.com \
  -CxToken <API-TOKEN> \
  -ProjectName "MyApp" \
  -LocationType git \
  -LocationURL https://github.com/company/myapp.git \
  -LocationBranch main \
  -LocationPrivateKey /path/to/ssh/key
```

### Scan Exclusions

```bash
# Exclude files and folders
./runCxConsole.sh Scan \
  -ProjectName "MyApp" \
  -LocationPath /path/to/source \
  -LocationPathExclude "tests,docs,*.min.js,node_modules"

# Using configuration file
cat > cx_config.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<CxConfig>
  <Project Name="MyApp">
    <Exclude>
      <Folder>tests</Folder>
      <Folder>docs</Folder>
      <Folder>node_modules</Folder>
      <Folder>vendor</Folder>
      <FileExtension>*.min.js</FileExtension>
      <FileExtension>*.test.js</FileExtension>
    </Exclude>
  </Project>
</CxConfig>
EOF

./runCxConsole.sh Scan \
  -Configuration cx_config.xml
```

## CI/CD Integration

### Jenkins Integration

**Using Jenkins Plugin:**

```groovy
pipeline {
    agent any
    
    environment {
        CX_SERVER = 'https://checkmarx.company.com'
        CX_CREDENTIALS = credentials('checkmarx-token')
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
        
        stage('Checkmarx Scan') {
            steps {
                step([
                    $class: 'CxScanBuilder',
                    serverUrl: env.CX_SERVER,
                    username: '',
                    password: '',
                    credentialsId: 'checkmarx-token',
                    projectName: 'MyApp',
                    teamPath: '/CxServer/Development',
                    preset: 'Checkmarx Default',
                    excludeFolders: 'tests,docs,node_modules',
                    generatePdfReport: true,
                    enableProjectPolicyEnforcement: true,
                    vulnerabilityThresholdEnabled: true,
                    highThreshold: 0,
                    mediumThreshold: 5,
                    lowThreshold: 10
                ])
            }
        }
    }
    
    post {
        always {
            // Archive reports
            archiveArtifacts artifacts: '**/Checkmarx/Reports/**', allowEmptyArchive: true
        }
    }
}
```

**Using CLI:**

```groovy
stage('Checkmarx Scan') {
    steps {
        sh '''
            /opt/cxconsole/runCxConsole.sh Scan \
              -CxServer ${CX_SERVER} \
              -CxToken ${CX_TOKEN} \
              -ProjectName "MyApp-${BRANCH_NAME}" \
              -LocationType folder \
              -LocationPath ${WORKSPACE} \
              -Preset "OWASP Top 10" \
              -High 0 \
              -Medium 5 \
              -Low 10
        '''
    }
}
```

### GitHub Actions

```yaml
name: Checkmarx SAST Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  checkmarx-scan:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Checkmarx CxFlow Action
        uses: checkmarx-ts/checkmarx-cxflow-github-action@v1.6
        with:
          project: ${{ github.repository }}
          team: /CxServer/Development
          checkmarx_url: ${{ secrets.CHECKMARX_URL }}
          checkmarx_username: ${{ secrets.CHECKMARX_USERNAME }}
          checkmarx_password: ${{ secrets.CHECKMARX_PASSWORD }}
          checkmarx_client_secret: ${{ secrets.CHECKMARX_CLIENT_SECRET }}
          preset: 'Checkmarx Default'
          break_build: true
          bug_tracker: GitHub
          params: >
            --severity=High
            --severity=Medium
            --namespace=${{ github.repository_owner }}
            --repo-name=${{ github.event.repository.name }}
            --branch=${{ github.ref }}
      
      - name: Upload SARIF to GitHub
        if: always()
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: cx.sarif
```

### GitLab CI

```yaml
checkmarx-sast:
  stage: security
  image: checkmarx/cxcli:latest
  
  variables:
    CX_PROJECT_NAME: "$CI_PROJECT_NAME-$CI_COMMIT_REF_NAME"
  
  script:
    - |
      runCxConsole.sh Scan \
        -CxServer $CHECKMARX_URL \
        -CxToken $CHECKMARX_TOKEN \
        -ProjectName "$CX_PROJECT_NAME" \
        -LocationType folder \
        -LocationPath $CI_PROJECT_DIR \
        -Preset "OWASP Top 10" \
        -ReportXML cx-results.xml \
        -ReportPDF cx-results.pdf \
        -High 0 \
        -Medium 5
  
  artifacts:
    when: always
    paths:
      - cx-results.xml
      - cx-results.pdf
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
  vmImage: 'ubuntu-latest'

variables:
  - group: checkmarx-credentials

steps:
  - task: CheckmarxSAST@2021
    inputs:
      CheckmarxService: 'Checkmarx Connection'
      projectName: '$(Build.Repository.Name)'
      preset: 'Checkmarx Default'
      fullScansScheduled: true
      incScansScheduled: false
      generatePDFReport: true
      enablePolicyViolations: true
      highThreshold: 0
      mediumThreshold: 5
      lowThreshold: 10
      enableDependencyScanning: true
      dependencyFolderExclusion: 'node_modules,vendor'
    displayName: 'Checkmarx SAST Scan'
  
  - task: PublishBuildArtifacts@1
    inputs:
      pathToPublish: '$(Build.SourcesDirectory)/Checkmarx/Reports'
      artifactName: 'CheckmarxReports'
    condition: always()
```

## Results Analysis

### Understanding Results

**Vulnerability Severity:**
```yaml
Critical:
  - Exploitable remotely
  - No authentication required
  - High business impact
  - Examples: SQL Injection, Remote Code Execution

High:
  - Exploitable with limited access
  - Significant business impact
  - Examples: Authentication bypass, Privilege escalation

Medium:
  - Requires specific conditions
  - Moderate business impact
  - Examples: Information disclosure, Session fixation

Low:
  - Low likelihood or impact
  - Examples: Verbose error messages, Missing security headers

Info:
  - Best practice violations
  - Potential future issues
  - Examples: Commented-out code, Hardcoded strings
```

### Triage Process

```yaml
1. Review High and Critical:
   - Verify exploitability
   - Assess business impact
   - Prioritize for immediate fix

2. Analyze Attack Vector:
   - Understand data flow
   - Identify entry points
   - Review sanitization

3. Mark as:
   - To Verify: Needs investigation
   - Confirmed: Real vulnerability
   - Not Exploitable: False positive
   - Urgent: Requires immediate fix
   - Proposed Not Exploitable: Suggest false positive

4. Assign to Developer:
   - Create Jira ticket
   - Add remediation guidance
   - Set due date
```

### False Positive Management

```yaml
Reduce False Positives:
  
  1. Use appropriate preset:
     - Don't use "All" unless necessary
     - Choose OWASP Top 10 for focused results
  
  2. Configure exclusions:
     - Exclude test files
     - Exclude third-party libraries
     - Exclude generated code
  
  3. Mark accurately:
     - Not Exploitable: Cannot be exploited in this context
     - Proposed Not Exploitable: Suggest FP to admin
     - Confirmed: Real issue
  
  4. Train scan engine:
     - Approved FP markings improve future scans
     - Use comments to document decisions
```

## Remediation

### Remediation Workflow

```yaml
1. Understand Vulnerability:
   - Read description
   - Review attack vector
   - Check code flow

2. Locate Issue:
   - Use IDE plugin for navigation
   - Review source/sink points
   - Understand context

3. Apply Fix:
   - Follow remediation guidance
   - Use secure coding practices
   - Add input validation/sanitization

4. Verify Fix:
   - Rescan project
   - Check vulnerability status
   - Test functionality
```

### Common Remediation Examples

**SQL Injection:**

```java
// Vulnerable code
String query = "SELECT * FROM users WHERE username = '" + username + "'";
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(query);

// Secure remediation
String query = "SELECT * FROM users WHERE username = ?";
PreparedStatement pstmt = connection.prepareStatement(query);
pstmt.setString(1, username);
ResultSet rs = pstmt.executeQuery();
```

**Cross-Site Scripting (XSS):**

```javascript
// Vulnerable code
document.getElementById('output').innerHTML = userInput;

// Secure remediation
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
document.getElementById('output').textContent = userInput;
// OR for HTML: document.getElementById('output').innerHTML = escapeHtml(userInput);
```

**Hard-Coded Password:**

```python
# Vulnerable code
db_password = "MySecretPass123"
connection = psycopg2.connect(
    host="localhost",
    database="mydb",
    user="admin",
    password=db_password
)

# Secure remediation
import os
db_password = os.environ.get('DB_PASSWORD')
if not db_password:
    raise ValueError("DB_PASSWORD environment variable not set")

connection = psycopg2.connect(
    host="localhost",
    database="mydb",
    user="admin",
    password=db_password
)
```

**Path Traversal:**

```java
// Vulnerable code
String filename = request.getParameter("file");
File file = new File("/var/www/files/" + filename);

// Secure remediation
String filename = request.getParameter("file");
String basePath = "/var/www/files/";
File file = new File(basePath, filename).getCanonicalFile();

// Verify file is within base directory
if (!file.getPath().startsWith(basePath)) {
    throw new SecurityException("Access denied");
}
```

## Best Practices

### 1. Scan Early and Often

```yaml
Strategy:
  - Scan on every commit (incremental)
  - Full scan nightly
  - Mandatory scan before merge to main
  - Pre-commit hooks with IDE plugins
```

### 2. Set Realistic Thresholds

```yaml
Initial Phase (Legacy Code):
  High: 10
  Medium: 50
  Low: 100

Stabilization Phase:
  High: 5
  Medium: 20
  Low: 50

Mature Phase:
  High: 0
  Medium: 5
  Low: 10

New Projects:
  High: 0
  Medium: 0
  Low: 5
```

### 3. Optimize Scan Performance

```yaml
Techniques:
  - Use incremental scans for quick feedback
  - Exclude irrelevant files (tests, docs, vendor)
  - Schedule full scans during off-hours
  - Parallelize engine workers
  - Use distributed scanning for large codebases
```

### 4. Integrate with Security Training

```yaml
Process:
  1. Developer encounters vulnerability
  2. Reviews Checkmarx remediation guide
  3. Completes related training module
  4. Implements fix
  5. Confirms understanding via quiz

Tools:
  - Checkmarx Codebashing integration
  - OWASP Top 10 training
  - Secure coding workshops
```

### 5. Track Metrics

```yaml
Key Metrics:
  - Vulnerabilities introduced per sprint
  - Mean time to remediation (MTTR)
  - False positive rate
  - Scan coverage (% of code scanned)
  - Policy compliance rate
  
Monthly Review:
  - Trend analysis
  - Team comparisons
  - Training needs identification
```

## Troubleshooting

### Common Issues

**1. Scan fails with "Out of Memory":**
```bash
# Increase CxEngine memory
# Edit CxEngineService.exe.config
<add key="MemorySize" value="4096"/> <!-- 4GB -->

# Restart CxEngine service
net stop CxEngineService
net start CxEngineService
```

**2. Slow scan performance:**
```bash
# Solutions:
- Enable incremental scans
- Exclude unnecessary files
- Increase engine workers
- Optimize source code organization
- Use local caching
```

**3. Cannot connect to server:**
```bash
# Verify:
1. Server URL is correct (https://server/cxrestapi)
2. Credentials are valid
3. Network allows connection
4. SSL certificate is trusted

# Test connection
curl -k https://checkmarx.company.com/cxrestapi/auth/identity/connect/token
```

**4. High false positive rate:**
```bash
# Remedies:
1. Use appropriate preset (not "All")
2. Configure project exclusions
3. Mark false positives consistently
4. Review query customization
5. Update to latest version
```

## Real-World Use Cases

### Use Case 1: Financial Institution Security Compliance

**Scenario**: Bank must comply with PCI DSS for payment processing systems.

**Implementation**:
```yaml
Setup:
  - Checkmarx SAST for all payment applications
  - PCI DSS preset configuration
  - Zero-tolerance policy for High vulnerabilities
  - Mandatory scan before production deployment

Process:
  1. Developer commits code
  2. Automated scan triggered
  3. Results reviewed by security team
  4. Vulnerabilities must be fixed before merge
  5. Quarterly audit reports generated

Results:
  - 100% PCI DSS compliance
  - 95% reduction in production vulnerabilities
  - Average fix time: 2 days for High, 1 week for Medium
  - Zero security incidents in 2 years
```

### Use Case 2: Healthcare Application HIPAA Compliance

**Scenario**: Healthcare SaaS must protect patient data (PHI) and maintain HIPAA compliance.

**Implementation**:
```yaml
Configuration:
  - Custom preset focusing on:
    * Data encryption
    * Access control
    * Audit logging
    * SQL injection
    * XSS vulnerabilities
  
Workflow:
  - Pre-commit scans via IDE
  - PR scans with automated comments
  - Nightly full scans
  - Monthly security reviews

Policies:
  - Critical: Block deployment
  - High: Require security review
  - Medium: Must fix within 30 days
  - Low: Track and prioritize

Outcomes:
  - HIPAA audit passed with zero findings
  - 87% reduction in security defects
  - Faster remediation (avg 3 days for High)
  - Developer security awareness improved 60%
```

### Use Case 3: Open Source Project Security

**Scenario**: Popular open-source project wants to ensure contributor code is secure.

**Implementation**:
```yaml
GitHub Integration:
  - Checkmarx scans on all PRs
  - Automated comments on findings
  - Security badge on README
  - Public scan results (optional)

Contributor Guidelines:
  - All PRs must pass Checkmarx scan
  - Maintainers review security findings
  - Contributors receive remediation guidance
  - Security training resources provided

Results:
  - 40% of PRs initially had security issues
  - After 6 months: Only 8% require security fixes
  - Community security awareness increased
  - Project reputation for security strengthened
  - Faster PR approval process
```

## Resources

### Official Documentation
- **Checkmarx Documentation**: https://checkmarx.com/resource/documents/
- **API Reference**: https://checkmarx.com/resource/documents/en/34965-8158-rest-api.html
- **Checkmarx University**: Training and certification

### Downloads
- **CxSAST**: Contact Checkmarx sales for license
- **CLI Scanner**: Available from Checkmarx portal
- **IDE Plugins**: Available in respective marketplaces

### Learning Resources
- **Checkmarx Academy**: Free security training
- **Codebashing**: Interactive secure coding training
- **Blog**: https://checkmarx.com/blog/
- **Webinars**: Regular security webinars

### Community
- **Support Portal**: https://support.checkmarx.com/
- **Community Forum**: https://community.checkmarx.com/
- **GitHub**: https://github.com/checkmarx-ts

### Compliance Frameworks
- **OWASP**: https://owasp.org/
- **CWE**: https://cwe.mitre.org/
- **SANS Top 25**: https://www.sans.org/top25-software-errors/
- **PCI DSS**: https://www.pcisecuritystandards.org/
