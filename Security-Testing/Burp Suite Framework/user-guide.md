# Burp Suite Framework Installation and Usage Guide

## Installation

### Prerequisites
- Java 8 or higher
- 4GB RAM minimum
- 500MB disk space
- Administrator/Root access

### Download
Visit https://portswigger.net/burp/download

### Linux Installation
```bash
# Download
wget https://portswigger.net/burp/releases/download?type=Linux

# Extract
tar -xzf burpsuite_*.tar.gz

# Run
cd BurpSuite
./burpsuite
```

### Windows Installation
1. Download installer from PortSwigger website
2. Run the installer
3. Follow installation wizard
4. Launch Burp Suite

### macOS Installation
1. Download DMG file
2. Mount the image
3. Drag Burp Suite to Applications
4. Launch from Applications folder

### Docker Installation
```bash
docker run -it -p 8080:8080 \
  -v /path/to/output:/output \
  portswigger/burp-suite-community:latest
```

## Initial Setup

### Browser Configuration
Configure your browser to use Burp as proxy:
- Proxy address: 127.0.0.1
- Port: 8080

### Install CA Certificate
1. Open browser to http://burp
2. Download CA certificate
3. Import into browser's certificate store

### Configure Burp
1. User Options → TLS
2. Generate CA certificate
3. Import certificate to browser

## Core Tools

### Proxy

#### Intercept Requests
1. Turn on Interceptor (Intercept is on)
2. Browse website
3. Requests appear in Proxy tab
4. Modify and forward or drop

#### Forward Intercepted Request
```
Original: GET / HTTP/1.1
Modified: GET /admin HTTP/1.1
```

#### Set Up Listeners
1. Go to Proxy → Options
2. Click "Add"
3. Set Binding: 127.0.0.1:8080
4. Set Redirect: default browser interface

### Scanner

#### Automated Scan
1. Right-click request → "Scan"
2. Go to Scanner tab
3. Monitor scan progress
4. Review findings

#### Active vs Passive Scanning
- **Passive**: Non-intrusive analysis
- **Active**: Send test payloads (use with caution)

### Intruder

#### Basic Attack Setup
1. Right-click request → "Send to Intruder"
2. Go to Intruder → Positions
3. Mark payload positions with § symbol
4. Choose attack type:
   - Sniper: One payload at a time
   - Battering ram: Same payload everywhere
   - Pitchfork: Multiple payloads simultaneously
   - Cluster bomb: All combinations

#### Payload Types
```
Simple list: One-by-one testing
Numbers: Sequential numbers
Dates: Date variations
Custom: User-defined values
Brute force: Character combinations
```

#### Example: SQL Injection Testing
```
GET /search?query=test' OR '1'='1 HTTP/1.1
Host: vulnerable.app
```

### Repeater

#### Manual Testing
1. Right-click request → "Send to Repeater"
2. Modify request manually
3. Click "Send"
4. Analyze response
5. Iterate until findings discovered

#### Request Modifications
```
Original: GET / HTTP/1.1
Modified: GET /../../etc/passwd HTTP/1.1
```

### Sequencer

#### Analyze Token Randomness
1. Right-click token → "Send to Sequencer"
2. Go to Sequencer tab
3. Click "Start live capture"
4. Analyze entropy and randomness
5. Determine predictability

### Decoder

#### Encode/Decode Data
```
Input: Hello World
Base64: SGVsbG8gV29ybGQ=
URL: %48%65%6c%6c%6f%20%57%6f%72%6c%64
HTML: &#72;&#101;&#108;...
```

### Comparer

#### Find Differences
1. Select two requests/responses
2. Right-click → "Send to Comparer"
3. Compare output
4. Identify differences

## Scanning Workflow

### Step 1: Create Scope
1. Target → Scope
2. Click "Add"
3. Enter URL: http://vulnerable-app.local

### Step 2: Map Application
1. Spider application with Proxy
2. Click "Scan" on target

### Step 3: Configure Scan Settings
1. Scanner → Live scanning
2. Select scope
3. Choose scan quality (Light/Normal/Deep)
4. Start scan

### Step 4: Review Findings
1. Scanner → Issues
2. Sort by severity
3. Click issue for details
4. Review proof of concept

### Step 5: Generate Report
1. Report → Generate
2. Export as HTML/PDF

## Common Vulnerabilities to Test

### SQL Injection
```
Input: 1' OR '1'='1
Payload: test' UNION SELECT NULL,NULL,NULL--
```

### Cross-Site Scripting (XSS)
```
Payload: <script>alert('XSS')</script>
Test in: Search fields, comments, user inputs
```

### Cross-Site Request Forgery (CSRF)
```
Look for: Missing CSRF tokens
Test: Forge requests without token
```

### Authentication Bypass
```
Test: Password reset flaws
Test: Session fixation
Test: Logic bypass
```

### Path Traversal
```
Payload: ../../etc/passwd
Payload: ..\\..\\windows\\system32\\config\\sam
```

## Advanced Techniques

### Intruder Fuzzing
```
Use wordlists from:
- SecLists (GitHub)
- Burp Suite provided lists
- Custom generated lists
```

### Custom Extensions
```java
// Burp Extension Example
public class BurpExtender implements IBurpExtender {
    public void registerExtenderCallbacks(IBurpExtenderCallbacks callbacks) {
        callbacks.setExtensionName("Custom Extension");
    }
}
```

### Burp Collaborator
- Out-of-band testing
- Time-delay SQL injection
- DNS exfiltration
- SSRF testing

## Useful Extensions
- Logger++ - Enhanced logging
- Active Scan++ - Extended scanning
- JSON Web Tokens - JWT testing
- Autorize - Authorization testing
- Retire.js - Dependency checking

## Best Practices

### Testing Best Practices
1. Always get written authorization
2. Test on staging environment first
3. Document all findings
4. Use Burp's scope feature
5. Follow OWASP Top 10
6. Test all input fields
7. Check authentication mechanisms
8. Test API endpoints

### Security Practices
1. Use strong Burp password
2. Disable Proxy when not testing
3. Don't test production without permission
4. Use VPN for testing
5. Keep Burp updated
6. Review Proxy history carefully
7. Implement findings promptly

## Keyboard Shortcuts
```
Ctrl+Shift+D     Send to Intruder
Ctrl+Shift+E     Send to Repeater
Ctrl+Shift+I     Send to Scanner
Tab              Switch tabs
Ctrl+B           Toggle Burp browser
```

## Troubleshooting

### Certificate Issues
```
Regenerate: User Options → TLS
Re-import certificate to browser
Clear browser cache
```

### Proxy Not Working
```
Check: Listeners on correct port
Verify: Browser proxy settings
Check: Firewall rules
```

### Scanner Not Finding Issues
```
Ensure: Scope is configured
Check: Active scanning is enabled
Verify: Target is accessible
```

## Useful Resources
- PortSwigger Web Security Academy: https://portswigger.net/web-security
- Burp Suite Docs: https://portswigger.net/burp/documentation
- Community Forum: https://forum.portswigger.net
- YouTube Tutorials: Official PortSwigger channel
- Bug Bounty Platforms: HackerOne, Bugcrowd
