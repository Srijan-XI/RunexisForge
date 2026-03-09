# Security Testing

A comprehensive collection of security tools and testing frameworks organized by category.

## 📁 Directory Structure

### 01-Security-Tools

Security-focused tools for vulnerability assessment, penetration testing, and code analysis.

#### Vulnerability-Scanning
Tools for identifying security vulnerabilities in applications and infrastructure:
- **AquaSecurity** - Container and cloud-native security platform
- **Checkmarx** - Static Application Security Testing (SAST) solution
- **OpenVAS** - Open-source vulnerability scanner
- **Snyk** - Developer-first security platform for dependencies and containers

#### Penetration-Testing
Tools for security testing and exploitation:
- **Burp Suite Framework** - Web application security testing platform
- **Metasploit Framework** - Penetration testing framework
- **OWASP-ZAP** - OWASP Zed Attack Proxy for web app security testing
- **Scapy** - Network packet manipulation and analysis tool

#### Static-Analysis
Static code analysis tools for identifying security issues and code quality:
- **Fortify** - Static application security testing platform
- **Semgrep** - Lightweight static analysis for finding bugs and enforcing code standards
- **SonarQube** - Code quality and security analysis platform

#### Dependency-Security
Tools for securing application dependencies:
- **Dependency-Scanning** - Scanning project dependencies for known vulnerabilities
- **Secrets-Scanning** - Detecting hardcoded secrets and credentials in code

#### Secrets-Management
Secure storage and management of sensitive data:
- **HashiCorpVault** - Secrets management and data protection platform

#### Security-References
Security guidelines and best practices:
- **OWASP-Top-10** - The ten most critical web application security risks

---

### 02-Testing-Frameworks

Comprehensive testing frameworks for various testing methodologies.

#### Unit-Testing
Frameworks for writing and executing unit tests:
- **Jest** - JavaScript testing framework
- **JUnit** - Java unit testing framework
- **Mocha** - JavaScript test framework
- **PHPUnit** - PHP unit testing framework
- **pytest** - Python testing framework
- **RSpec** - Ruby testing framework
- **TestNG** - Java testing framework
- **unittest** - Python's built-in unit testing framework
- **Vitest** - Vite-native unit testing framework

#### Test-Utilities
Helper libraries and utilities for testing:
- **Chai** - BDD/TDD assertion library for JavaScript
- **Sinon** - JavaScript test spies, stubs, and mocks

#### E2E-Testing
End-to-end testing frameworks for full application testing:
- **Cypress** - Modern web testing framework
- **Playwright** - Cross-browser automation framework
- **Puppeteer** - Node.js library for controlling headless Chrome
- **Selenium** - Browser automation framework

#### BDD-Testing
Behavior-Driven Development testing frameworks:
- **Cucumber** - BDD framework supporting Gherkin syntax

#### API-Testing
Tools for testing APIs and web services:
- **Postman** - API development and testing platform

---

### 03-Code-Coverage

Tools for measuring test coverage:
- **Codecov** - Code coverage reporting and analysis
- **Coveralls** - Test coverage history and statistics

---

## 🚀 Quick Start

1. Navigate to the relevant category based on your needs
2. Each tool folder contains documentation and examples
3. Review tool-specific README files for setup and usage instructions

## 📖 Usage Guidelines

### For Security Testing
- Start with **Vulnerability-Scanning** for general security assessment
- Use **Static-Analysis** during development to catch issues early
- Apply **Penetration-Testing** tools for deeper security validation
- Leverage **Dependency-Security** to keep dependencies secure

### For Application Testing
- Use **Unit-Testing** frameworks for component-level tests
- Apply **E2E-Testing** for full user workflow validation
- Integrate **BDD-Testing** for behavior-driven development
- Monitor quality with **Code-Coverage** tools

## 🔗 Related Resources

See also:
- [Cloud-DevOps/08-Security-Secrets](../Cloud-DevOps/08-Security-Secrets/) for deployment security
- [Backend-Web/05-Authentication](../Backend-Web/05-Authentication/) for authentication patterns
- [Development-Tools](../Development-Tools/) for additional development utilities

---

**Last Updated:** February 2026
