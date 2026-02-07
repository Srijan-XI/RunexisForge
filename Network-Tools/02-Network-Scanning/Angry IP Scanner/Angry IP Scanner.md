# Angry IP Scanner

## Introduction

## What is Angry IP Scanner?

Angry IP Scanner (ipscan) is a fast and friendly open-source network scanner designed to scan IP addresses and ports. It's cross-platform, easy to use, and doesn't require installation. The tool is popular for its simplicity, speed, and user-friendly graphical interface, making network discovery accessible to both beginners and professionals.

## Why Angry IP Scanner?

- Fast multi-threaded scanning
- Cross-platform (Windows, Linux, macOS)
- User-friendly GUI
- No installation required (portable)
- Port scanning capabilities
- Hostname resolution
- NetBIOS information
- MAC address detection
- Customizable with plugins
- Export results (CSV, XML, TXT)
- Open-source and free

## Learning Path

1. Understand basic networking concepts
2. Learn about IP addresses and ports
3. Install and configure Angry IP Scanner
4. Practice basic scans
5. Explore advanced features
6. Integrate with other tools

## User Guide

## Prerequisites

- Basic networking knowledge
- Java Runtime Environment (JRE)
- Network access
- Appropriate permissions

Verify Java installation:

```bash
java -version
```

## Installation

### Windows

```powershell
# Download from official site
# https://angryip.org/download/

# Portable version (no installation)
# Download ipscan-win64-3.9.1.exe
# Run directly

# Installer version
# Download ipscan-3.9.1-setup.exe
# Run installer
```

### Linux

```bash
# Ubuntu/Debian (.deb package)
wget https://github.com/angryip/ipscan/releases/download/3.9.1/ipscan_3.9.1_amd64.deb
sudo dpkg -i ipscan_3.9.1_amd64.deb

# Dependencies
sudo apt install openjdk-11-jre

# Run
ipscan

# Or from command line
java -jar ipscan-linux64-3.9.1.jar
```

### macOS

```bash
# Download DMG
# https://github.com/angryip/ipscan/releases

# Or using Homebrew Cask
brew install --cask angry-ip-scanner

# Run
open /Applications/Angry\ IP\ Scanner.app
```

### Cross-platform (JAR)

```bash
# Download JAR file
wget https://github.com/angryip/ipscan/releases/download/3.9.1/ipscan-3.9.1.jar

# Run
java -jar ipscan-3.9.1.jar

# Linux with more memory
java -Xmx1024m -jar ipscan-3.9.1.jar
```

## Basic Usage

### GUI Interface

```
1. Launch Angry IP Scanner

2. IP Range:
   - From: 192.168.1.1
   - To: 192.168.1.254
   
   Or use hostname:
   - mynetwork.local

3. Click "Start" button

4. View results in real-time

5. Export results (File > Export)
```

### Quick Start

```
Main Window Components:
- IP Range: Start and end IP addresses
- Hostname: Scan by hostname/domain
- Feeder: Random, range, or file
- Toolbar: Start, Stop, Fetch, Next
- Results: Table with scan results
- Status: Progress and statistics
```

## Scan Types

### IP Range scan

```
IP Range:
From: 192.168.1.1
To: 192.168.1.254

Click "Start"

Results show:
- IP Address
- Ping status
- Hostname
- Ports (if port scanning enabled)
```

### CIDR notation

```
Hostname field:
192.168.1.0/24

Automatically expands to:
192.168.1.1 - 192.168.1.254
```

### Random IP scan

```
Feeder > Random
Number of IPs: 100

Generates random IPs for scanning
```

### File-based scan

```
Create file: targets.txt
192.168.1.1
192.168.1.10
10.0.0.1
example.com

Feeder > File
Select targets.txt
Start scan
```

## Configuration

### Preferences

```
Tools > Preferences

Display:
- Show scan stats
- Display method
- List progress indication

Scanning:
- Thread delay (ms)
- Timeout (ms)
- Retry count
- Ping method

Ports:
- Port selection
- Timeout

Performance:
- Number of threads
```

### Fetcher Selection

```
Tools > Fetchers

Available fetchers:
☑ IP
☑ Ping
☑ Hostname
☑ Ports
☑ Filtered ports
☑ Web detection
☑ HTTP sender
☑ MAC address
☑ MAC vendor
☑ NetBIOS info
☑ Comment

Customize columns shown in results
```

### Display Preferences

```
Preferences > Display

Options:
- Show scan statistics
- List items in scan order
- Show IP range in title
- Use system look and feel
- Language selection
```

### Performance Tuning

```
Preferences > Scanning

Threads: 100-1000 (default: 100)
- More threads = faster scanning
- Too many = network congestion

Timeout: 500-5000ms
- Lower = faster but less accurate
- Higher = more accurate but slower

Retry: 1-3 times
```

## Port Scanning

### Enable port scanning

```
Tools > Preferences > Ports

Port selection:
- Selected ports only
- Port list: 21,22,23,25,53,80,443,3389

Or:
- Port range: 1-1000

Timeout: 1000ms
```

### Common port sets

```
Web servers:
80,443,8080,8443

Common services:
21,22,23,25,53,80,110,143,443,445,3306,3389

All common ports:
1-1024

Custom:
22,80,443,3389,5900,8080
```

## Fetchers (Data Columns)

### Available fetchers

```
IP - IP address
Ping - Ping time/status
Hostname - DNS hostname
Ports - Open ports
Web detection - HTTP detection
MAC address - Hardware address
MAC vendor - Manufacturer
NetBIOS info - Windows information
Comment - User comments
```

### Custom fetchers

```
Tools > Fetchers > Add

Create custom fetchers:
- Command execution
- HTTP requests
- Custom scripts
```

## Exporting Results

### Export formats

```
File > Export

Formats:
- CSV
- TXT
- XML
- IP:Port list

Options:
- All IPs
- Alive IPs only
- Selected IPs
- Dead IPs
```

### CSV export

```
File > Export > CSV

Save as: scan-results.csv

Opens in Excel:
IP,Ping,Hostname,Ports
192.168.1.1,2ms,router.local,80;443
192.168.1.10,5ms,server.local,22;80;443
```

### IP-Port list

```
File > Export > IP:Port list

Output:
192.168.1.1:80
192.168.1.1:443
192.168.1.10:22
192.168.1.10:80
```

## Command-Line Usage

### Basic CLI

```bash
# Scan range
java -jar ipscan.jar 192.168.1.1-192.168.1.254

# Scan CIDR
java -jar ipscan.jar 192.168.1.0/24

# Scan with output
java -jar ipscan.jar -f:range 192.168.1.1 192.168.1.254 -o results.txt

# Quiet mode
java -jar ipscan.jar -q 192.168.1.0/24
```

### CLI options

```bash
# Output formats
-o file.txt       # Text output
-o file.csv       # CSV output
-o file.xml       # XML output

# Feeders
-f:range start end
-f:random count
-f:file filename

# Quiet mode (no GUI)
-q
```

## Ping Methods

### Available methods

```
Preferences > Scanning > Ping method:

1. ICMP Echo (requires privileges)
   - Most accurate
   - May require root/admin

2. UDP packets
   - Works without privileges
   - Less reliable

3. TCP connections
   - Works without privileges
   - Reliable but slower

4. Combined (ICMP + TCP)
   - Best accuracy
   - Recommended
```

## Scan Statistics

### Live statistics

```
During scan:
- Running: 0:00:15
- Threads: 100
- Scanned: 120/254
- Alive: 15
- Dead: 105
- Rate: 8 IPs/sec
```

### Post-scan summary

```
File > Show scan statistics

Details:
- Total scanned
- Alive hosts
- Dead hosts
- With ports
- Total time
- Average time per host
```

## Common Use Cases

### Network inventory

```
1. Scan entire network
   IP Range: 192.168.1.0/24

2. Enable fetchers:
   ☑ IP
   ☑ Hostname
   ☑ MAC address
   ☑ MAC vendor

3. Export to CSV

4. Import to spreadsheet for inventory
```

### Find specific services

```
1. Configure ports:
   Ports: 3389,5900

2. Scan network

3. Filter results:
   - Show: Alive hosts with ports

4. Export results
```

### Security audit

```
1. Scan network with all fetchers

2. Look for:
   - Unknown devices
   - Unexpected open ports
   - Unauthorized services

3. Export for analysis
```

### IoT device discovery

```
1. Scan network

2. Look at MAC vendors:
   - Espressif (ESP8266/ESP32)
   - Raspberry Pi Foundation
   - Arduino
   - Smart home vendors

3. Note IP addresses for further investigation
```

## Advanced Features

### Openers

```
Tools > Openers

Configure what happens when clicking results:

- Web browser: http://[IP]
- SSH: ssh [IP]
- RDP: mstsc /v:[IP]
- Custom command

Example:
ping [IP]
nmap [IP]
```

### Plugins

```
Plugins directory:
Windows: %APPDATA%/ipscan/plugins
Linux: ~/.ipscan/plugins
macOS: ~/Library/Application Support/ipscan/plugins

Place .jar files in plugins directory
Restart Angry IP Scanner
```

## Scripting and Automation

### Batch scanning

```bash
#!/bin/bash
# scan-networks.sh

NETWORKS=(
    "192.168.1.0/24"
    "10.0.0.0/24"
    "172.16.0.0/24"
)

for NET in "${NETWORKS[@]}"; do
    java -jar ipscan.jar -q -f:range $NET -o scan-$NET.csv
done
```

### Scheduled scans

```bash
# Cron job (daily at 2 AM)
0 2 * * * java -jar /path/to/ipscan.jar -q 192.168.1.0/24 -o /var/log/scan-$(date +\%Y\%m\%d).csv
```

### Parse results

```python
#!/usr/bin/env python3
import csv

with open('results.csv', 'r') as f:
    reader = csv.DictReader(f)
    
    for row in reader:
        if row['Ping'] != '':
            print(f"Alive: {row['IP']} - {row['Hostname']}")
            if row['Ports']:
                print(f"  Ports: {row['Ports']}")
```

## Comparison with Other Tools

### vs Nmap

```
Angry IP Scanner:
+ User-friendly GUI
+ Faster for simple scans
+ Easy to use
+ Good for beginners
- Limited features
- Basic port scanning

Nmap:
+ Advanced features
+ Better port scanning
+ OS detection
+ Scripting engine
- Command-line focused
- Steeper learning curve
```

### vs Advanced IP Scanner

```
Angry IP Scanner:
+ Cross-platform
+ Open-source
+ More customizable
+ Command-line support

Advanced IP Scanner:
+ Windows only
+ Simpler interface
- Closed source
```

## Troubleshooting

### Java not found

```bash
# Check Java installation
java -version

# Install Java
# Ubuntu/Debian
sudo apt install default-jre

# Windows
# Download from: https://www.java.com/

# macOS
brew install openjdk
```

### Permission errors (ICMP)

```
ICMP ping requires root/admin privileges

Solutions:
1. Run as administrator/root

2. Change ping method:
   Preferences > Scanning > UDP or TCP

3. Linux: Set capabilities
   sudo setcap cap_net_raw+ep $(which java)
```

### Slow scanning

```
Optimize performance:

1. Increase threads:
   Preferences > Scanning > Threads: 200-500

2. Reduce timeout:
   Preferences > Scanning > Timeout: 500ms

3. Disable unnecessary fetchers:
   Tools > Fetchers
   (Uncheck unused fetchers)

4. Use appropriate ping method
```

### No hosts found

```
Check:
1. Network connectivity
   ping 192.168.1.1

2. Correct IP range
   ipconfig /all (Windows)
   ip addr (Linux)

3. Firewall settings

4. Ping method
   Try different methods in preferences
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **Only scan networks you own or have authorization to scan**
- Unauthorized network scanning may be illegal
- Can be considered reconnaissance
- May violate acceptable use policies
- Always obtain proper authorization
- Respect privacy

### Ethical usage

```
Legitimate uses:
- Network inventory and management
- Troubleshooting network issues
- Asset discovery
- Security auditing (authorized)
- DHCP management

Best practices:
- Document authorization
- Limit scan scope
- Use appropriate timing
- Respect network policies
- Secure scan results
- Don't scan public networks without permission
```

## Quick Reference

### Common tasks

```
Scan local network:
1. Enter: 192.168.1.0/24
2. Click Start

Scan with ports:
1. Preferences > Ports
2. Enter: 80,443,3389
3. Start scan

Export results:
File > Export > CSV

Find web servers:
1. Ports: 80,443
2. Enable: Web detection
3. Start scan
```

### Keyboard shortcuts

```
F5 - Start scan
Esc - Stop scan
Ctrl+O - Open
Ctrl+S - Save
Ctrl+E - Export
Ctrl+P - Preferences
Ctrl+F - Find
Ctrl+Q - Quit
```

## Real-World Examples

### Office network audit

```
Scenario: Monthly network audit

1. Configure scan:
   Range: 10.0.0.0/22 (company network)
   Ports: 22,80,443,3389
   Fetchers: IP, Hostname, MAC vendor, Ports

2. Run scan

3. Export to CSV

4. Compare with previous month
   Look for:
   - New devices
   - Changed ports
   - Missing devices

5. Report findings
```

### Find rogue DHCP servers

```
1. Scan network: 192.168.1.0/24

2. Port: 67 (DHCP server)

3. Results should show only authorized DHCP server

4. Investigate any unexpected hosts with port 67 open
```

### Locate printers

```
1. Scan network

2. Ports: 9100,515,631 (printer ports)

3. Look at MAC vendors:
   - HP
   - Canon
   - Epson
   - Brother

4. Export printer list
```

## Integration with Other Tools

### Export to Nmap

```bash
# Export IP list from Angry IP Scanner
File > Export > IP List (scan-results.txt)

# Use with Nmap
nmap -iL scan-results.txt -sV -O
```

### Import to spreadsheet

```
1. Export as CSV

2. Open in Excel/LibreOffice

3. Analyze with pivot tables, filters

4. Create reports
```

### Database import

```sql
-- Import CSV to database
LOAD DATA INFILE 'scan-results.csv'
INTO TABLE network_devices
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

## Resources

- [Angry IP Scanner official site](https://angryip.org/)
- [GitHub repository](https://github.com/angryip/ipscan)
- [Documentation](https://angryip.org/documentation/)
- [Download page](https://angryip.org/download/)
- [Bug tracker](https://github.com/angryip/ipscan/issues)

## Next Steps

- Learn network fundamentals
- Practice scanning your own network
- Explore complementary tools (Nmap, Wireshark)
- Automate regular scans
- Integrate with monitoring systems
- Develop custom plugins
- Contribute to the project
- Join network administration communities
