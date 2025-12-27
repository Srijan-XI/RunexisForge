# OpenVAS Installation and Usage Guide

## Installation

### Prerequisites

- Ubuntu 18.04 LTS or newer (recommended)
- 4GB minimum RAM
- 20GB minimum disk space
- Internet connection for vulnerability database updates

### Method 1: Docker Installation (Recommended)

#### Install Docker

```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```bash

#### Run OpenVAS Container

```bash
docker run --detach --publish 443:443 --publish 9392:9392 \
  --env ADMIN_USERNAME=admin \
  --env ADMIN_PASSWORD=your_secure_password \
  --volume openvas-data:/data \
  --name openvas \
  greenbone/openvas
```bash

### Method 2: Manual Installation on Ubuntu

#### Add Greenbone Repository

```bash
sudo apt-get install -y curl gnupg
curl https://package.greenbone.net/greenbone-community-edition.asc | sudo apt-key add -
sudo echo "deb https://package.greenbone.net/ubuntu-gce focal main" | \
  sudo tee /etc/apt/sources.list.d/greenbone.list
```bash

#### Install Components

```bash
sudo apt-get update
sudo apt-get install -y \
  openvas-scanner \
  openvas-manager \
  greenbone-security-assistant
```bash

#### Initialize Database

```bash
sudo greenbone-nvt-sync
sudo greenbone-scapdata-sync
sudo greenbone-certdata-sync
```bash

#### Start Services

```bash
sudo systemctl start openvas-scanner
sudo systemctl start openvas-manager
sudo systemctl start greenbone-security-assistant
```bash

### Access OpenVAS Web Interface

**URL:** <https://localhost:9392>
**Default Username:** admin
**Default Password:** admin (change immediately)

## Basic Workflow

### Step 1: Create a Target

1. Go to Configuration → Targets
2. Click "New Target"
3. Enter target IP or network (CIDR notation)
4. Optionally add credentials for authenticated scanning
5. Save

### Step 2: Create a Task

1. Go to Scans → Tasks
2. Click "New Task"
3. Select target
4. Choose a scanner (default is fine)
5. Select scan configuration (Full and Very Deep is comprehensive)
6. Set schedule if needed
7. Save

### Step 3: Run Scan

1. Click the play icon on your task
2. Monitor progress in the Reports tab
3. Wait for completion

### Step 4: Review Report

1. Go to Scans → Reports
2. Click on completed report
3. Review vulnerabilities by severity
4. Export report as needed

## Scan Configurations

### Full and Very Deep Scan

Most comprehensive scan, takes longer

- Best for: Initial assessments
- Time: 2-24 hours depending on network

### Full and Fast Scan

Good balance of coverage and speed

- Best for: Regular scans
- Time: 30 minutes to 4 hours

### Discovery Scan

Lightweight scan for network discovery

- Best for: Identification only
- Time: 5-30 minutes

### Host Discovery

Identify active hosts on network

- Best for: Asset discovery
- Time: 5-15 minutes

## Authenticated Scanning

### Add Credentials

1. Configuration → Credentials
2. Click "New Credential"
3. Select credential type:
   - Username & Password
   - SSH Key
   - SNMP
   - SMB
4. Enter credentials
5. Save

### Use Credentials in Target

1. Edit target
2. Add credentials in "Allow simultaneous" section
3. Save and run scan

## Interpreting Results

### Severity Levels

- **High (Red)**: Critical, fix immediately
- **Medium (Orange)**: Important, fix soon
- **Low (Yellow)**: Minor, fix eventually
- **None (Green)**: Informational

### Report Sections

1. **Summary**: Overview of findings
2. **Vulnerabilities**: Detailed list by severity
3. **Hosts**: Results by target host
4. **CVE**: Cross-reference with CVE database

## Scheduled Scanning

### Create Schedule

1. Configuration → Schedules
2. Click "New Schedule"
3. Set frequency and time
4. Save

### Assign to Task

1. Edit task
2. Select schedule
3. Save

## Report Export

### Generate Report

1. Reports → Select scan
2. Click export icon
3. Choose format:
   - PDF
   - CSV
   - XML
   - Anonymous XML

## Command Line Operations

### List Targets

```bash
gvm-cli --gmp-username admin --gmp-password password socket \
  --xml "<get_targets/>"
```bash

### Start Scan

```bash
gvm-cli --gmp-username admin --gmp-password password socket \
  --xml "<create_task><name>Test Scan</name><target id='TARGET_ID'/><config id='CONFIG_ID'/></create_task>"
```bash

### Get Scan Results

```bash
gvm-cli --gmp-username admin --gmp-password password socket \
  --xml "<get_reports/>"
```text

## Best Practices

### Security Practices

1. Change default admin password immediately
2. Use strong credentials for all accounts
3. Restrict access to web interface
4. Use VPN for remote access
5. Keep OpenVAS updated
6. Backup scan results regularly

### Scanning Best Practices

1. Always get written authorization
2. Scan during maintenance windows
3. Start with non-intrusive scans
4. Use credentials for accurate results
5. Schedule scans during off-peak hours
6. Document all scan activities
7. Follow up on findings promptly
8. Verify false positives

### Network Considerations

1. Monitor network impact
2. Limit scan rate if needed
3. Test in lab environment first
4. Coordinate with network team
5. Avoid scanning production systems
6. Have remediation plan ready

## Troubleshooting

### Vulnerability Database Not Updating

```bash
sudo greenbone-nvt-sync
sudo greenbone-scapdata-sync
sudo greenbone-certdata-sync
```text

### Service Won't Start

```bash
# Check status
sudo systemctl status openvas-scanner
sudo systemctl status openvas-manager

# View logs
sudo journalctl -u openvas-scanner -f
sudo journalctl -u openvas-manager -f
```text

### Reset Admin Password

```bash
sudo openvasmd --user=admin --new-password=newpassword
```text

## Useful Resources

- OpenVAS Documentation: <https://docs.greenbone.net>
- Vulnerability Database: <https://www.greenbone.net/en/nvt-feed>
- Community Forum: <https://community.greenbone.net>
- GVMd Scripting: <https://docs.greenbone.net/gvm-tools/latest/>
- CVE Database: <https://cve.mitre.org>
