# OWASP ZAP (Zed Attack Proxy)

## Introduction

OWASP ZAP (Zed Attack Proxy) is the world's most popular free, open-source web application security scanner. Developed by the Open Web Application Security Project (OWASP), ZAP helps developers and security professionals find security vulnerabilities in web applications during development and testing phases. It's designed to be used by people with a wide range of security experience and is ideal for penetration testing.

### What is OWASP ZAP?

ZAP is a "man-in-the-middle proxy" that sits between your browser and the web application, intercepting and inspecting messages sent between them. It can:
- **Automatically find** security vulnerabilities
- **Manually test** applications through interception
- **Generate reports** for compliance and documentation
- **Integrate** into CI/CD pipelines for automated security testing
- **Extend functionality** through a marketplace of add-ons

### Key Capabilities

**Security Testing Types:**
- **Active Scanning**: Automated attacks against the application
- **Passive Scanning**: Analyzes traffic without attacking
- **Manual Testing**: Intercept and modify requests
- **Fuzzing**: Automated input variation testing
- **Authentication Testing**: Test authentication mechanisms
- **Session Management**: Analyze session security

**Vulnerability Coverage:**
- OWASP Top 10 (all categories)
- SQL Injection, XSS, CSRF
- Security misconfigurations
- Sensitive data exposure
- Broken authentication
- XML External Entities (XXE)
- Insecure deserialization

## Key Features

### Automated Scanners
- **Spider/Crawler**: Discovers application structure and URLs
- **AJAX Spider**: JavaScript-aware crawling for modern SPAs
- **Active Scanner**: Attacks application to find vulnerabilities
- **Passive Scanner**: Identifies issues during normal browsing
- **Fuzzer**: Tests input validation with malformed data

### Manual Testing Tools
- **Intercepting Proxy**: Modify requests and responses in real-time
- **Request Editor**: Manually craft and send HTTP requests
- **Response Viewer**: Analyze server responses
- **Breakpoints**: Pause requests matching certain criteria
- **History**: Review all requests and responses

### Automation and Integration
- **API**: RESTful API for automation
- **CLI**: Command-line interface for headless scanning
- **Docker**: Containerized scanning
- **CI/CD Integration**: Jenkins, GitLab CI, GitHub Actions
- **WebDriver**: Browser automation integration

### Reporting and Documentation
- **HTML Reports**: Detailed vulnerability reports
- **XML/JSON/Markdown**: Machine-readable formats
- **Risk Classification**: High, Medium, Low, Informational
- **Compliance Mapping**: OWASP, PCI DSS, NIST
- **Evidence Collection**: Screenshots, request/response pairs

## Installation

### Desktop Application

#### Windows

```powershell
# Option 1: Installer
# Download from https://www.zaproxy.org/download/
# Run: ZAP_2_14_0_windows.exe

# Option 2: Chocolatey
choco install owasp-zap

# Option 3: Portable
# Download ZAP_2_14_0_windows.zip
# Extract and run zap.bat
```

#### macOS

```bash
# Option 1: Installer
# Download from https://www.zaproxy.org/download/
# Install: ZAP_2.14.0.dmg

# Option 2: Homebrew
brew install --cask zap

# Verify installation
/Applications/ZAP.app/Contents/MacOS/zap.sh -version
```

#### Linux

```bash
# Option 1: Download installer
wget https://github.com/zaproxy/zaproxy/releases/download/v2.14.0/ZAP_2_14_0_unix.sh
chmod +x ZAP_2_14_0_unix.sh
./ZAP_2_14_0_unix.sh

# Option 2: Snap
sudo snap install zaproxy --classic

# Option 3: Flatpak
flatpak install flathub org.zaproxy.ZAP
flatpak run org.zaproxy.ZAP

# Option 4: From package manager
sudo apt install zaproxy  # Debian/Ubuntu (may not be latest)
```

### Docker

```bash
# Pull official ZAP image
docker pull zaproxy/zap-stable

# Run ZAP in daemon mode (headless)
docker run -u zap -p 8080:8080 -i zaproxy/zap-stable zap.sh -daemon -host 0.0.0.0 -port 8080 -config api.disablekey=true

# Run ZAP with GUI (requires X11)
docker run -u zap -p 8080:8080 -e DISPLAY=:0 -v /tmp/.X11-unix:/tmp/.X11-unix zaproxy/zap-stable zap.sh

# Run ZAP weekly build (latest features)
docker pull zaproxy/zap-weekly
docker run -u zap -p 8080:8080 -i zaproxy/zap-weekly zap.sh -daemon -host 0.0.0.0 -port 8080
```

### CLI Only

```bash
# Linux/macOS - Download and extract
wget https://github.com/zaproxy/zaproxy/releases/download/v2.14.0/ZAP_2.14.0_Linux.tar.gz
tar -xvf ZAP_2.14.0_Linux.tar.gz
cd ZAP_2.14.0
./zap.sh -cmd

# Verify installation
./zap.sh -version
```

## Configuration

### Initial Setup

```yaml
First Launch:
  1. Start ZAP application
  2. Choose session persistence:
     - Persist session (recommended for manual testing)
     - No session persistence (for automated scans)
  3. Check for updates
  4. Configure proxy settings

Default Proxy:
  - Host: localhost
  - Port: 8080
```

### Browser Configuration

**Manual Proxy Setup:**

```yaml
Firefox:
  1. Settings → General → Network Settings
  2. Manual proxy configuration:
     - HTTP Proxy: localhost
     - Port: 8080
     - Use this proxy for all protocols: ✓
  3. Save changes

Chrome (via CLI):
  # Windows
  chrome.exe --proxy-server="localhost:8080"
  
  # macOS
  open -a "Google Chrome" --args --proxy-server="localhost:8080"
  
  # Linux
  google-chrome --proxy-server="localhost:8080"

FoxyProxy Extension:
  - Install FoxyProxy for easy proxy switching
  - Add ZAP proxy profile
  - Enable/disable with one click
```

**SSL Certificate Import:**

```bash
# Export ZAP CA certificate
# In ZAP: Tools → Options → Dynamic SSL Certificates → Save

# Firefox: Import certificate
# Settings → Privacy & Security → Certificates → View Certificates
# → Authorities → Import → Select owasp_zap_root_ca.cer
# ✓ Trust this CA to identify websites

# Chrome/System:
# Settings → Privacy and security → Security → Manage certificates
# → Authorities → Import → Select owasp_zap_root_ca.cer
```

### API Configuration

```yaml
Enable API:
  Tools → Options → API
  - Enable API: ✓
  - Secure API: ✓ (recommended)
  - API Key: <generate-strong-key>

API Key Usage:
  - Add to all API requests as parameter: apikey=<key>
  - Or use HTTP header: X-ZAP-API-Key: <key>
```

### Headless Mode Configuration

```bash
# Start ZAP in daemon mode
zap.sh -daemon -host localhost -port 8080 -config api.key=<YOUR-API-KEY>

# With specific configurations
zap.sh -daemon \
  -host 0.0.0.0 \
  -port 8080 \
  -config api.key=myapikey123 \
  -config api.addrs.addr.name=.* \
  -config api.addrs.addr.regex=true
```

## Scanning Modes

### 1. Automated Scan (Quick Start)

**Using GUI:**

```yaml
Steps:
  1. Launch ZAP
  2. Quick Start tab → Automated Scan
  3. Enter target URL: https://example.com
  4. Click "Attack"
  5. Wait for scan completion
  6. Review alerts

Configuration:
  - Spider: Enabled (discovers pages)
  - AJAX Spider: Optional (for JavaScript-heavy sites)
  - Active Scan: Enabled (attacks application)
```

**Using CLI:**

```bash
# Quick scan
zap-cli quick-scan --self-contained --start-options '-config api.disablekey=true' http://example.com

# With spider only
zap-cli quick-scan --spider-only http://example.com

# With active scan
zap-cli quick-scan --scanners all http://example.com
```

**Using Docker:**

```bash
# Baseline scan (passive only)
docker run -v $(pwd):/zap/wrk:rw -t zaproxy/zap-stable zap-baseline.py \
  -t https://example.com \
  -r baseline-report.html

# Full scan (spider + active)
docker run -v $(pwd):/zap/wrk:rw -t zaproxy/zap-stable zap-full-scan.py \
  -t https://example.com \
  -r full-scan-report.html
```

### 2. Manual Explore

**Intercepting Proxy Method:**

```yaml
Setup:
  1. Configure browser to use ZAP proxy
  2. In ZAP: Enable breakpoints (if needed)
  3. Browse application manually
  4. ZAP passively scans all traffic

Workflow:
  1. Navigate through application
  2. Login with credentials
  3. Explore all functionality
  4. ZAP builds site tree
  5. Review passive scan alerts
  6. Run active scan on specific endpoints
```

**Using Breakpoints:**

```yaml
Purpose:
  - Modify requests before sending
  - Alter responses before browser receives
  - Test access control
  - Bypass client-side validation

Setup:
  1. Set breakpoint: Right-click request → Break
  2. Navigate to trigger request
  3. Request pauses in ZAP
  4. Modify parameters, headers, body
  5. Forward or drop request
```

### 3. AJAX Spider

For modern JavaScript applications:

```yaml
When to Use:
  - Single Page Applications (SPAs)
  - Heavy JavaScript/AJAX usage
  - React, Angular, Vue applications
  - Dynamic content loading

Configuration:
  Tools → Options → AJAX Spider
  - Browser: Firefox Headless or Chrome Headless
  - Max Duration: 10 minutes (adjust as needed)
  - Event Wait: 1000ms
  - Reload Wait: 1000ms

Running:
  1. Tools → AJAX Spider
  2. Enter starting URL
  3. Configure browser
  4. Click "Start Scan"
  5. Monitor progress
  6. Review discovered URLs
```

### 4. Active Scan

Automated vulnerability testing:

```yaml
Configuration:
  - Input vectors: Auto-detect (URL parameters, POST data, headers)
  - Attack strength: Medium (Low/Medium/High/Insane)
  - Alert threshold: Medium (Low/Medium/High)
  - Scanners: Select specific tests or use all

Running Active Scan:
  1. Right-click node in Sites tree
  2. Attack → Active Scan
  3. Configure policy
  4. Start scan
  5. Monitor progress
  6. Review alerts

Custom Scan Policy:
  Analyze → Scan Policy Manager
  - Create new policy
  - Enable/disable specific scanners
  - Configure thresholds
  - Set input vectors
```

### 5. API Scanning

**OpenAPI/Swagger:**

```bash
# Import OpenAPI definition
# File → Import → Import an OpenAPI definition
# Select: openapi.json or openapi.yaml

# Or via API
curl 'http://localhost:8080/JSON/openapi/action/importUrl/?url=https://example.com/api/openapi.json&apikey=<KEY>'

# Scan API
curl 'http://localhost:8080/JSON/ascan/action/scan/?url=https://example.com/api&apikey=<KEY>'
```

**GraphQL:**

```bash
# Import GraphQL schema
curl 'http://localhost:8080/JSON/graphql/action/importUrl/?endurl=https://example.com/graphql&apikey=<KEY>'

# Scan GraphQL endpoint
curl 'http://localhost:8080/JSON/ascan/action/scan/?url=https://example.com/graphql&apikey=<KEY>'
```

## CI/CD Integration

### Jenkins Integration

**Using ZAP Jenkins Plugin:**

```groovy
pipeline {
    agent any
    
    stages {
        stage('Deploy Application') {
            steps {
                // Deploy your app to test environment
                sh './deploy-test.sh'
            }
        }
        
        stage('ZAP Baseline Scan') {
            steps {
                script {
                    def zapHome = tool name: 'OWASP ZAP'
                    sh """
                        docker run -v \$(pwd):/zap/wrk:rw -t zaproxy/zap-stable \
                        zap-baseline.py -t http://testapp.local -r baseline-report.html -I
                    """
                }
            }
        }
        
        stage('ZAP Full Scan') {
            steps {
                sh """
                    docker run -v \$(pwd):/zap/wrk:rw -t zaproxy/zap-stable \
                    zap-full-scan.py -t http://testapp.local -r full-scan-report.html
                """
            }
        }
    }
    
    post {
        always {
            // Publish HTML reports
            publishHTML([
                reportDir: '.',
                reportFiles: 'baseline-report.html, full-scan-report.html',
                reportName: 'ZAP Security Reports'
            ])
            
            // Archive reports
            archiveArtifacts artifacts: '*-report.html', allowEmptyArchive: true
        }
    }
}
```

### GitHub Actions

```yaml
name: OWASP ZAP Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * 0'  # Weekly on Sunday at 2 AM

jobs:
  zap-scan:
    runs-on: ubuntu-latest
    name: ZAP Scan
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Deploy test application
        run: |
          docker-compose -f docker-compose.test.yml up -d
          sleep 30  # Wait for app to start
      
      - name: ZAP Baseline Scan
        uses: zaproxy/action-baseline@v0.9.0
        with:
          target: 'http://localhost:3000'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a -j'
      
      - name: ZAP Full Scan
        uses: zaproxy/action-full-scan@v0.7.0
        with:
          target: 'http://localhost:3000'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a -j'
      
      - name: Upload ZAP Reports
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: zap-reports
          path: |
            report_html.html
            report_json.json
      
      - name: Publish to GitHub Security tab
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: results.sarif
```

### GitLab CI

```yaml
zap-baseline:
  stage: security-test
  image: zaproxy/zap-stable
  
  services:
    - name: myapp:latest
      alias: testapp
  
  script:
    - mkdir /zap/wrk
    - zap-baseline.py -t http://testapp:8080 -r baseline-report.html -I || true
  
  artifacts:
    when: always
    paths:
      - baseline-report.html
    expire_in: 1 week
  
  allow_failure: true

zap-full-scan:
  stage: security-test
  image: zaproxy/zap-stable
  
  services:
    - name: myapp:latest
      alias: testapp
  
  script:
    - mkdir /zap/wrk
    - zap-full-scan.py -t http://testapp:8080 -r full-scan-report.html || true
  
  artifacts:
    when: always
    paths:
      - full-scan-report.html
    expire_in: 1 week
  
  only:
    - schedules
    - main
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

stages:
  - stage: SecurityScan
    jobs:
      - job: ZAPScan
        steps:
          - task: Docker@2
            displayName: 'Deploy Test App'
            inputs:
              command: 'run'
              arguments: '-d -p 8080:8080 --name testapp myapp:latest'
          
          - script: |
              docker run -v $(System.DefaultWorkingDirectory):/zap/wrk:rw \
                -t zaproxy/zap-stable \
                zap-full-scan.py \
                -t http://$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' testapp):8080 \
                -r zap-report.html \
                -J zap-report.json
            displayName: 'Run ZAP Full Scan'
          
          - task: PublishBuildArtifacts@1
            displayName: 'Publish ZAP Reports'
            inputs:
              pathToPublish: 'zap-report.html'
              artifactName: 'ZAP Reports'
            condition: always()
```

## API Automation

### Python (ZAP API Client)

```python
#!/usr/bin/env python3
from zapv2 import ZAPv2
import time

# Connect to ZAP
apikey = 'your-api-key'
zap = ZAPv2(apikey=apikey, proxies={'http': 'http://localhost:8080', 'https': 'http://localhost:8080'})

target = 'https://example.com'

# Spider the target
print('Spidering target:', target)
scan_id = zap.spider.scan(target)

while int(zap.spider.status(scan_id)) < 100:
    print(f'Spider progress: {zap.spider.status(scan_id)}%')
    time.sleep(2)

print('Spider completed')

# AJAX Spider (for modern apps)
print('AJAX Spidering target:', target)
zap.ajaxSpider.scan(target)

while zap.ajaxSpider.status == 'running':
    print('AJAX Spider running...')
    time.sleep(2)

print('AJAX Spider completed')

# Active Scan
print('Active scanning target:', target)
scan_id = zap.ascan.scan(target)

while int(zap.ascan.status(scan_id)) < 100:
    print(f'Active scan progress: {zap.ascan.status(scan_id)}%')
    time.sleep(5)

print('Active scan completed')

# Get alerts
alerts = zap.core.alerts(baseurl=target)
print(f'Found {len(alerts)} alerts')

# Print high-risk alerts
for alert in alerts:
    if alert['risk'] == 'High':
        print(f"High: {alert['alert']} - {alert['url']}")

# Generate HTML report
with open('zap-report.html', 'w') as f:
    f.write(zap.core.htmlreport())

print('Report saved to zap-report.html')
```

### Bash (Using cURL)

```bash
#!/bin/bash

ZAP_URL="http://localhost:8080"
API_KEY="your-api-key"
TARGET="https://example.com"

# Spider the target
echo "Starting spider scan..."
SPIDER_ID=$(curl -s "${ZAP_URL}/JSON/spider/action/scan/?url=${TARGET}&apikey=${API_KEY}" | jq -r '.scan')

# Wait for spider to complete
while true; do
    STATUS=$(curl -s "${ZAP_URL}/JSON/spider/view/status/?scanId=${SPIDER_ID}&apikey=${API_KEY}" | jq -r '.status')
    echo "Spider status: ${STATUS}%"
    [[ "$STATUS" == "100" ]] && break
    sleep 2
done

echo "Spider completed"

# Active scan
echo "Starting active scan..."
ASCAN_ID=$(curl -s "${ZAP_URL}/JSON/ascan/action/scan/?url=${TARGET}&apikey=${API_KEY}" | jq -r '.scan')

# Wait for active scan to complete
while true; do
    STATUS=$(curl -s "${ZAP_URL}/JSON/ascan/view/status/?scanId=${ASCAN_ID}&apikey=${API_KEY}" | jq -r '.status')
    echo "Active scan status: ${STATUS}%"
    [[ "$STATUS" == "100" ]] && break
    sleep 5
done

echo "Active scan completed"

# Get alerts
curl -s "${ZAP_URL}/JSON/core/view/alerts/?baseurl=${TARGET}&apikey=${API_KEY}" | jq .

# Generate HTML report
curl -s "${ZAP_URL}/OTHER/core/other/htmlreport/?apikey=${API_KEY}" > zap-report.html

echo "Report saved to zap-report.html"
```

## Authentication Testing

### Form-Based Authentication

```yaml
Configuration:
  1. Define Context:
     - Right-click site → Include in Context → New Context
     - Name: "MyApp Context"
  
  2. Set Authentication Method:
     - Session Properties → Authentication
     - Method: Form-Based Authentication
     - Login URL: https://example.com/login
     - Login Request POST Data: username={%username%}&password={%password%}
     - Username parameter: username
     - Password parameter: password
     - Logged in indicator: regex:\QWelcome, .*\E
     - Logged out indicator: regex:\QSign In\E
  
  3. Configure Users:
     - Session Properties → Users
     - Add User: testuser
     - Username: testuser@example.com
     - Password: TestPassword123
  
  4. Enable forced user mode:
     - Tools → Options → Forced User Mode
     - Enable for context
```

### Script-Based Authentication

```javascript
// Custom authentication script
// Tools → Options → Authentication → Script-Based Authentication

function authenticate(helper, paramsValues, credentials) {
    var loginUrl = paramsValues.get("loginUrl");
    var postData = "username=" + credentials.getParam("username") + 
                   "&password=" + credentials.getParam("password");
    
    var msg = helper.prepareMessage();
    msg.setRequestHeader("POST " + loginUrl + " HTTP/1.1");
    msg.setRequestBody(postData);
    msg.getRequestHeader().setHeader("Content-Type", "application/x-www-form-urlencoded");
    
    helper.sendAndReceive(msg);
    
    return msg;
}

function getRequiredParamsNames() {
    return ["loginUrl"];
}

function getOptionalParamsNames() {
    return [];
}

function getCredentialsParamsNames() {
    return ["username", "password"];
}
```

### API Key/Token Authentication

```yaml
Method 1: Header-Based
  - Context → Include in Context
  - Session Properties → Authentication → Header Based
  - Header: Authorization
  - Value: Bearer {%token%}

Method 2: Script-Based for OAuth2
  - Use custom script to handle token refresh
  - Store tokens in ZAP session
  - Inject into requests automatically
```

## Advanced Features

### Custom Scripts

**Active Scan Rules:**

```python
# Custom active scan rule (Python)
def scanNode(sas, msg):
    # Test for custom vulnerability
    param = msg.getUrlParams().first()
    if param:
        # Create attack payload
        attack_payload = param.getValue() + "'; DROP TABLE users; --"
        msg.setParameter(msg.PARAM_URL, param.getName(), attack_payload)
        
        # Send request
        sas.sendAndReceive(msg)
        
        # Check for vulnerability
        response = msg.getResponseBody().toString()
        if "SQL syntax error" in response:
            sas.raiseAlert(
                risk=3,  # High
                confidence=2,  # Medium
                name="Custom SQL Injection",
                description="Potential SQL injection vulnerability",
                uri=msg.getRequestHeader().getURI().toString(),
                param=param.getName(),
                attack=attack_payload,
                evidence="SQL syntax error"
            )
```

**HTTP Sender Scripts:**

```javascript
// Modify all outgoing requests
function sendingRequest(msg, initiator, helper) {
    // Add custom header to all requests
    msg.getRequestHeader().setHeader("X-Custom-Header", "CustomValue");
    
    // Add timestamp to requests
    var timestamp = new Date().getTime();
    msg.getRequestHeader().setHeader("X-Timestamp", timestamp.toString());
}

function responseReceived(msg, initiator, helper) {
    // Log all responses
    print("Response from: " + msg.getRequestHeader().getURI());
    print("Status: " + msg.getResponseHeader().getStatusCode());
}
```

### Fuzzing

```yaml
Using Fuzzer:
  1. Send request to Fuzzer:
     - Right-click request → Attack → Fuzz
  
  2. Select fuzz locations:
     - Highlight parameter value
     - Click "Add" button
  
  3. Add payloads:
     - File: Load from wordlist
     - Strings: Manual input
     - Regex: Pattern-based
     - Numberzz: Number sequences
  
  4. Configure:
     - Concurrent threads: 5-10
     - Delay between requests: 0ms
     - Follow redirects: Yes
  
  5. Start fuzzing
  
  6. Analyze results:
     - Sort by response code
     - Look for anomalies
     - Check response sizes
```

**Example Fuzz Wordlists:**

```bash
# SQL Injection
' OR '1'='1
admin' --
'; DROP TABLE users; --
1' UNION SELECT NULL--

# XSS
<script>alert('XSS')</script>
"><script>alert(String.fromCharCode(88,83,83))</script>
<img src=x onerror=alert('XSS')>

# Path Traversal
../../etc/passwd
..\..\windows\win.ini
....//....//etc/passwd
```

### Session Management

```yaml
Session Tokens:
  1. Analyze → HTTP Sessions
  2. Set active session
  3. View session tokens
  4. Test token randomness
  5. Check for session fixation

Session Hijacking Test:
  1. Capture valid session token
  2. Clear cookies in browser
  3. Manually set old token
  4. Test if session still valid
  5. Check session timeout
```

## Reporting

### HTML Reports

```bash
# Generate from GUI
# Report → Generate HTML Report

# Generate from API
curl "http://localhost:8080/OTHER/core/other/htmlreport/?apikey=<KEY>" > report.html

# Generate from CLI
zap-cli report -o report.html -f html
```

### JSON/XML Reports

```bash
# JSON
curl "http://localhost:8080/JSON/core/view/alerts/" > alerts.json

# XML
curl "http://localhost:8080/XML/core/view/alerts/" > alerts.xml

# Markdown
curl "http://localhost:8080/OTHER/core/other/mdreport/?apikey=<KEY>" > report.md
```

### Custom Report Templates

```python
from zapv2 import ZAPv2
import jinja2

zap = ZAPv2(apikey='your-key')
alerts = zap.core.alerts()

# Group by risk
high_risk = [a for a in alerts if a['risk'] == 'High']
medium_risk = [a for a in alerts if a['risk'] == 'Medium']
low_risk = [a for a in alerts if a['risk'] == 'Low']

# Generate custom report
template = """
# Security Scan Report

## Summary
- High Risk: {{ high|length }}
- Medium Risk: {{ medium|length }}
- Low Risk: {{ low|length }}

## High Risk Vulnerabilities
{% for alert in high %}
### {{ alert.alert }}
- **URL**: {{ alert.url }}
- **Description**: {{ alert.description }}
- **Solution**: {{ alert.solution }}
{% endfor %}
"""

tmpl = jinja2.Template(template)
report = tmpl.render(high=high_risk, medium=medium_risk, low=low_risk)

with open('custom-report.md', 'w') as f:
    f.write(report)
```

## Best Practices

### 1. Scan Strategy

```yaml
Development:
  - Baseline scans on every build
  - Quick feedback (< 5 minutes)
  - Passive scanning only

Testing:
  - Full scans before release
  - Active + Passive scanning
  - Authenticated scans

Production:
  - Monthly deep scans
  - API scanning
  - Regression testing
```

### 2. Performance Optimization

```yaml
Speed up scans:
  - Use incremental scanning
  - Limit scope to changed areas
  - Adjust attack strength (Medium vs Insane)
  - Increase thread count
  - Exclude static resources (images, CSS, fonts)
  - Use caching

Reduce false positives:
  - Configure alert thresholds
  - Use context-specific scanning
  - Review and mark false positives
  - Create custom rules
```

### 3. Security Considerations

```yaml
ZAP Server Security:
  - Enable API key
  - Restrict API access by IP
  - Use HTTPS for remote access
  - Secure storage of scan data
  - Regular ZAP updates

Testing Ethics:
  - Only scan authorized applications
  - Use test/staging environments
  - Avoid DoS conditions (rate limiting)
  - Respect robots.txt (if appropriate)
  - Document all testing activities
```

### 4. Vulnerability Triage

```yaml
Priority Matrix:
  Critical (P0):
    - Risk: High
    - Exploitability: Easy
    - Impact: Critical business function
    - Fix: Immediately

  High (P1):
    - Risk: High or Medium
    - Exploitability: Moderate
    - Fix: Within 1 week

  Medium (P2):
    - Risk: Medium
    - Exploitability: Difficult
    - Fix: Within 1 month

  Low (P3):
    - Risk: Low or Informational
    - Fix: Backlog
```

## Troubleshooting

### Common Issues

**1. ZAP can't intercept HTTPS:**
```bash
# Solution: Import ZAP CA certificate
# Export from: Tools → Options → Dynamic SSL Certificates → Save
# Import into browser certificate store
```

**2. AJAX Spider not finding pages:**
```bash
# Solutions:
- Ensure JavaScript is enabled
- Increase max duration
- Use Chrome Headless instead of Firefox
- Check for authentication requirements
- Review browser console for errors
```

**3. Active scan taking too long:**
```bash
# Solutions:
- Reduce attack strength (High → Medium)
- Limit scope (specific paths only)
- Disable unnecessary scanners
- Increase thread pool
- Use incremental scanning
```

**4. High false positive rate:**
```bash
# Solutions:
- Adjust alert threshold (Medium → High)
- Review and mark false positives
- Use context-specific scanning
- Update to latest ZAP version
- Configure custom rules
```

## Real-World Use Cases

### Use Case 1: Continuous Security in Agile Development

**Scenario**: Agile team releasing features every 2 weeks needs continuous security validation.

**Implementation**:
```yaml
Pipeline Integration:
  - Feature branch: Baseline scan (passive only)
  - Pull request: Quick active scan (5 min)
  - Before merge: Full scan (30 min)
  - Nightly: Comprehensive scan (2 hours)

Quality Gates:
  - Block merge if High vulnerabilities found
  - Warn on Medium (manual review)
  - Report Low and Info

Results:
  - Security integrated into dev workflow
  - Issues caught before production
  - Average fix time: 2 days
  - Zero critical vulnerabilities in production
```

### Use Case 2: Third-Party Vendor Assessment

**Scenario**: Company needs to assess security of third-party SaaS before integration.

**Implementation**:
```yaml
Assessment Process:
  1. Unauthenticated scan:
     - Discover public attack surface
     - Test for common vulnerabilities
  
  2. Authenticated scan:
     - Request test account from vendor
     - Full application scanning
     - API testing
  
  3. Report generation:
     - Executive summary
     - Technical findings
     - Risk assessment
     - Remediation timeline

Findings shared with vendor:
  - 12 High vulnerabilities
  - 25 Medium issues
  - Vendor fixed within 30 days
  - Rescanned to verify fixes
  - Approved for integration
```

### Use Case 3: Compliance Scanning (PCI DSS)

**Scenario**: E-commerce platform must demonstrate security testing for PCI DSS compliance.

**Implementation**:
```yaml
Compliance Requirements:
  - Quarterly vulnerability scans
  - Scan all web applications
  - Fix High/Critical before deadline
  - Document all findings

ZAP Configuration:
  - Scan all payment pages
  - Test for OWASP Top 10
  - Verify SSL/TLS configuration
  - Check for sensitive data exposure
  - Generate compliance reports

Quarterly Process:
  1. Schedule scans (automated)
  2. Review findings
  3. Create remediation tickets
  4. Verify fixes
  5. Submit reports to auditor

Results:
  - PCI DSS compliance maintained
  - Quarterly audits passed
  - Documented security practices
  - Reduced audit preparation time 70%
```

## Resources

### Official Documentation
- **ZAP Website**: https://www.zaproxy.org/
- **User Guide**: https://www.zaproxy.org/docs/
- **API Documentation**: https://www.zaproxy.org/docs/api/
- **Automation Framework**: https://www.zaproxy.org/docs/automate/

### Downloads
- **ZAP Releases**: https://github.com/zaproxy/zaproxy/releases
- **Docker Images**: https://hub.docker.com/u/zaproxy
- **Add-ons Marketplace**: Available within ZAP application

### Learning Resources
- **ZAP in Ten**: Quick video tutorials
- **ZAP Blog**: https://www.zaproxy.org/blog/
- **ZAP Getting Started**: https://www.zaproxy.org/getting-started/
- **OWASP**: https://owasp.org/

### Community
- **Google Group**: https://groups.google.com/g/zaproxy-users
- **GitHub Issues**: https://github.com/zaproxy/zaproxy/issues
- **Twitter**: @zaproxy
- **Discord**: OWASP ZAP community

### Add-ons and Extensions
- **Active Scanners**: Additional attack modules
- **Passive Scanners**: More detection rules
- **Authentication**: Enhanced auth methods
- **Fuzzing**: Custom fuzz payloads
- **Reporting**: Additional report formats
- **Integration**: CI/CD and third-party tools

### Wordlists and Payloads
- **SecLists**: https://github.com/danielmiessler/SecLists
- **FuzzDB**: https://github.com/fuzzdb-project/fuzzdb
- **PayloadsAllTheThings**: https://github.com/swisskyrepo/PayloadsAllTheThings
