# Nmap

## Introduction

## What is Nmap?

Nmap (Network Mapper) is a free and open-source network scanner created by Gordon Lyon. It's designed to discover hosts and services on a computer network by sending packets and analyzing the responses. Nmap is one of the most popular and powerful network scanning tools used worldwide.

## Why Nmap?

- Comprehensive network discovery
- Port scanning (TCP/UDP)
- Service and version detection
- Operating system detection
- Scriptable with NSE (Nmap Scripting Engine)
- Supports multiple scan techniques
- Cross-platform (Linux, Windows, macOS)
- Industry standard tool
- Active development and community support

## Learning Path

1. Understand basic networking concepts
2. Learn port scanning fundamentals
3. Practice basic scans
4. Master scan types and options
5. Explore NSE scripts
6. Study advanced techniques

## User Guide

## Prerequisites

- Basic understanding of TCP/IP and ports
- Root/administrator privileges (for some scan types)
- Network testing authorization

Verify installation:

```bash
nmap --version
```

## Installation

### Windows

```powershell
# Download installer from nmap.org
# https://nmap.org/download.html

# Or using Chocolatey
choco install nmap

# Includes:
# - Nmap
# - Zenmap (GUI)
# - Ncat
# - Ndiff
# - Nping
```

### macOS

```bash
# Using Homebrew
brew install nmap

# Or download from official site
```

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install nmap
```

### RHEL/CentOS/Fedora

```bash
sudo yum install nmap
# Or
sudo dnf install nmap
```

### Arch Linux

```bash
sudo pacman -S nmap
```

## Basic Usage

### Simple host scan

```bash
# Scan single host
nmap scanme.nmap.org
nmap 192.168.1.1

# Scan multiple hosts
nmap 192.168.1.1 192.168.1.2 192.168.1.3

# Scan IP range
nmap 192.168.1.1-254

# Scan subnet
nmap 192.168.1.0/24

# Scan from list
nmap -iL targets.txt
```

### Common scan types

```bash
# TCP Connect scan (default without root)
nmap -sT 192.168.1.1

# SYN scan (stealth, requires root)
sudo nmap -sS 192.168.1.1

# UDP scan
sudo nmap -sU 192.168.1.1

# Comprehensive scan
nmap -A 192.168.1.1
```

## Host Discovery

### Ping scans

```bash
# List scan (no port scan, just list targets)
nmap -sL 192.168.1.0/24

# Ping scan (no port scan)
nmap -sn 192.168.1.0/24

# No ping (treat all hosts as online)
nmap -Pn 192.168.1.1

# TCP SYN ping
sudo nmap -PS22,80,443 192.168.1.1

# TCP ACK ping
sudo nmap -PA80 192.168.1.1

# UDP ping
sudo nmap -PU 192.168.1.1

# ICMP ping types
sudo nmap -PE 192.168.1.1  # Echo
sudo nmap -PP 192.168.1.1  # Timestamp
sudo nmap -PM 192.168.1.1  # Address mask
```

### ARP discovery (local network)

```bash
# ARP ping (very fast on local network)
sudo nmap -PR 192.168.1.0/24
```

## Port Scanning

### Scan types

```bash
# TCP SYN scan (half-open, stealth)
sudo nmap -sS 192.168.1.1

# TCP Connect scan
nmap -sT 192.168.1.1

# UDP scan
sudo nmap -sU 192.168.1.1

# TCP ACK scan (firewall testing)
sudo nmap -sA 192.168.1.1

# TCP Window scan
sudo nmap -sW 192.168.1.1

# TCP Maimon scan
sudo nmap -sM 192.168.1.1

# TCP NULL scan
sudo nmap -sN 192.168.1.1

# TCP FIN scan
sudo nmap -sF 192.168.1.1

# TCP Xmas scan
sudo nmap -sX 192.168.1.1
```

### Port specification

```bash
# Scan specific port
nmap -p 80 192.168.1.1

# Scan multiple ports
nmap -p 22,80,443 192.168.1.1

# Scan port range
nmap -p 1-1000 192.168.1.1

# Scan all ports
nmap -p- 192.168.1.1
nmap -p 1-65535 192.168.1.1

# Scan most common ports
nmap --top-ports 100 192.168.1.1

# Fast scan (100 most common ports)
nmap -F 192.168.1.1

# Scan by protocol
nmap -p U:53,T:80 192.168.1.1  # UDP 53, TCP 80
```

## Service and Version Detection

### Service detection

```bash
# Basic service detection
nmap -sV 192.168.1.1

# Aggressive service detection
nmap -sV --version-intensity 9 192.168.1.1

# Light service detection
nmap -sV --version-intensity 0 192.168.1.1

# Service detection with all TCP ports
nmap -sV -p- 192.168.1.1
```

## Operating System Detection

### OS fingerprinting

```bash
# Enable OS detection
sudo nmap -O 192.168.1.1

# Aggressive OS detection
sudo nmap -O --osscan-guess 192.168.1.1

# Limit OS detection to promising targets
sudo nmap -O --osscan-limit 192.168.1.1

# Maximum OS detection
sudo nmap -O --max-os-tries 5 192.168.1.1
```

## NSE (Nmap Scripting Engine)

### Script categories

```
auth      - Authentication related
broadcast - Network broadcast discovery
brute     - Brute force attacks
default   - Default safe scripts
discovery - Host and service discovery
dos       - Denial of service
exploit   - Exploit vulnerabilities
external  - External resources
fuzzer    - Fuzzing
intrusive - Intrusive scans
malware   - Malware detection
safe      - Safe scripts
version   - Version detection
vuln      - Vulnerability detection
```

### Using scripts

```bash
# Run default scripts
nmap -sC 192.168.1.1

# Run specific script
nmap --script=http-title 192.168.1.1

# Run multiple scripts
nmap --script=http-title,http-headers 192.168.1.1

# Run script category
nmap --script=vuln 192.168.1.1

# Run all scripts in category
nmap --script=discovery 192.168.1.1

# Script with arguments
nmap --script=http-put --script-args http-put.url=/uploads/,http-put.file=/tmp/test.txt 192.168.1.1

# Update script database
sudo nmap --script-updatedb
```

### Popular NSE scripts

```bash
# HTTP
nmap --script=http-enum 192.168.1.1
nmap --script=http-headers 192.168.1.1
nmap --script=http-methods 192.168.1.1
nmap --script=http-title 192.168.1.1

# SSL/TLS
nmap --script=ssl-cert 192.168.1.1
nmap --script=ssl-enum-ciphers 192.168.1.1

# SMB
nmap --script=smb-os-discovery 192.168.1.1
nmap --script=smb-vuln* 192.168.1.1

# DNS
nmap --script=dns-brute domain.com
nmap --script=dns-zone-transfer domain.com

# SSH
nmap --script=ssh-auth-methods 192.168.1.1
nmap --script=ssh2-enum-algos 192.168.1.1

# FTP
nmap --script=ftp-anon 192.168.1.1
nmap --script=ftp-bounce 192.168.1.1

# Vulnerabilities
nmap --script=vuln 192.168.1.1
nmap --script=vulners 192.168.1.1
```

## Timing and Performance

### Timing templates

```bash
# Paranoid (very slow, IDS evasion)
nmap -T0 192.168.1.1

# Sneaky (slow, IDS evasion)
nmap -T1 192.168.1.1

# Polite (slow, less bandwidth)
nmap -T2 192.168.1.1

# Normal (default)
nmap -T3 192.168.1.1

# Aggressive (fast, assumes good network)
nmap -T4 192.168.1.1

# Insane (very fast, may miss ports)
nmap -T5 192.168.1.1
```

### Performance options

```bash
# Minimum packets per second
nmap --min-rate 100 192.168.1.1

# Maximum packets per second
nmap --max-rate 1000 192.168.1.1

# Host timeout
nmap --host-timeout 5m 192.168.1.1

# Maximum retries
nmap --max-retries 3 192.168.1.1

# Parallel host scan groups
nmap --min-hostgroup 50 192.168.1.0/24

# Parallel port probes
nmap --min-parallelism 100 192.168.1.1
```

## Output Options

### Output formats

```bash
# Normal output
nmap -oN output.txt 192.168.1.1

# XML output
nmap -oX output.xml 192.168.1.1

# Grepable output
nmap -oG output.gnmap 192.168.1.1

# All formats
nmap -oA scan_results 192.168.1.1

# Script kiddie format
nmap -oS output.txt 192.168.1.1
```

### Verbosity and debugging

```bash
# Verbose
nmap -v 192.168.1.1

# Very verbose
nmap -vv 192.168.1.1

# Debugging
nmap -d 192.168.1.1

# More debugging
nmap -d -d 192.168.1.1
```

### Interactive control

```
During scan:
v/V - Increase/decrease verbosity
d/D - Increase/decrease debugging
p/P - Enable/disable packet tracing
? - Help
```

## Firewall/IDS Evasion

### Fragmentation

```bash
# Fragment packets
sudo nmap -f 192.168.1.1

# Custom MTU
sudo nmap --mtu 16 192.168.1.1
```

### Decoy scanning

```bash
# Use decoys
sudo nmap -D RND:10 192.168.1.1

# Specific decoys
sudo nmap -D decoy1,decoy2,ME,decoy3 192.168.1.1
```

### Timing manipulation

```bash
# Slow scan
nmap -T0 192.168.1.1

# Random delay between probes
nmap --scan-delay 1s 192.168.1.1
```

### Source manipulation

```bash
# Spoof source IP
sudo nmap -S 192.168.1.50 192.168.1.1

# Spoof source port
sudo nmap --source-port 53 192.168.1.1

# Interface selection
sudo nmap -e eth0 192.168.1.1
```

### Other evasion techniques

```bash
# Randomize target order
nmap --randomize-hosts 192.168.1.0/24

# Bad checksum (IDS test)
sudo nmap --badsum 192.168.1.1

# Idle/zombie scan
sudo nmap -sI zombie_host target_host
```

## Advanced Scans

### Comprehensive scan

```bash
# Aggressive scan (-A enables OS, version, scripts, traceroute)
sudo nmap -A 192.168.1.1

# Complete scan
sudo nmap -sS -sU -T4 -A -v -p 1-65535 192.168.1.1
```

### IPv6 scanning

```bash
# IPv6 scan
nmap -6 ipv6.address

# IPv6 localhost
nmap -6 ::1
```

### Protocol scan

```bash
# Determine which IP protocols are supported
sudo nmap -sO 192.168.1.1
```

## Zenmap (GUI)

### Features

```
- Graphical interface for Nmap
- Profile editor
- Scan comparison (Ndiff integration)
- Network topology visualization
- Scan result saving

Launch:
zenmap (Linux/Mac)
Run Zenmap from Start Menu (Windows)
```

### Common profiles

```
- Intense scan
- Quick scan
- Quick scan plus
- Quick traceroute
- Regular scan
- Ping scan
- Comprehensive scan
```

## Ndiff (Scan Comparison)

### Compare scans

```bash
# Generate XML scans
nmap -oX scan1.xml 192.168.1.0/24
# Wait some time...
nmap -oX scan2.xml 192.168.1.0/24

# Compare
ndiff scan1.xml scan2.xml

# HTML output
ndiff --xml scan1.xml scan2.xml > diff.html
```

## Common Use Cases

### Network inventory

```bash
# Discover all devices on network
sudo nmap -sn 192.168.1.0/24

# Detailed inventory
sudo nmap -sS -sV -O -oA network_inventory 192.168.1.0/24
```

### Security audit

```bash
# Comprehensive security scan
sudo nmap -sS -sV -sC -O -A --script=vuln -p- -T4 192.168.1.1 -oA security_audit
```

### Web server enumeration

```bash
# HTTP service scan
nmap -p 80,443,8080,8443 --script=http-enum,http-headers,http-methods 192.168.1.1
```

### Check for specific vulnerability

```bash
# SMB vulnerabilities
nmap --script=smb-vuln* -p 445 192.168.1.0/24

# Heartbleed
nmap --script=ssl-heartbleed -p 443 192.168.1.1

# MS17-010 (EternalBlue)
nmap --script=smb-vuln-ms17-010 -p 445 192.168.1.0/24
```

### Database servers

```bash
# MySQL
nmap -p 3306 --script=mysql-* 192.168.1.0/24

# PostgreSQL
nmap -p 5432 --script=pgsql-* 192.168.1.0/24

# MongoDB
nmap -p 27017 --script=mongodb-* 192.168.1.0/24

# MSSQL
nmap -p 1433 --script=ms-sql-* 192.168.1.0/24
```

## Scripting and Automation

### Automated scanning

```bash
#!/bin/bash
# Automated network scan

NETWORK="192.168.1.0/24"
OUTPUTDIR="/var/log/nmap"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $OUTPUTDIR

# Quick discovery
sudo nmap -sn $NETWORK -oA $OUTPUTDIR/discovery_$TIMESTAMP

# Full scan on discovered hosts
sudo nmap -sS -sV -O -p- -T4 $NETWORK -oA $OUTPUTDIR/full_scan_$TIMESTAMP

# Vulnerability scan
sudo nmap --script=vuln $NETWORK -oA $OUTPUTDIR/vuln_scan_$TIMESTAMP

echo "Scans complete. Results in $OUTPUTDIR"
```

### Parse Nmap XML

```python
#!/usr/bin/env python3
import xml.etree.ElementTree as ET

tree = ET.parse('scan.xml')
root = tree.getroot()

for host in root.findall('host'):
    ip = host.find('address').get('addr')
    state = host.find('status').get('state')
    
    if state == 'up':
        print(f"Host: {ip}")
        for port in host.findall('.//port'):
            portid = port.get('portid')
            service = port.find('service')
            if service is not None:
                name = service.get('name')
                print(f"  Port {portid}: {name}")
```

## Troubleshooting

### No root privileges

```bash
# Some scans require root
sudo nmap -sS 192.168.1.1

# Or use TCP connect scan (doesn't require root)
nmap -sT 192.168.1.1
```

### Slow scans

```bash
# Increase timing
nmap -T4 192.168.1.1

# Skip host discovery
nmap -Pn 192.168.1.1

# Limit port range
nmap -p 1-1000 192.168.1.1

# Increase parallelism
nmap --min-parallelism 100 192.168.1.1
```

### Firewall blocking

```bash
# Try different scan types
nmap -sA 192.168.1.1  # ACK scan
nmap -sW 192.168.1.1  # Window scan

# Use fragmentation
sudo nmap -f 192.168.1.1

# Try different source ports
sudo nmap --source-port 53 192.168.1.1
```

### Host appears down

```bash
# Skip ping
nmap -Pn 192.168.1.1

# Try different ping types
sudo nmap -PS80,443 192.168.1.1
sudo nmap -PA80 192.168.1.1
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **Only scan networks and systems you own or have explicit written authorization to scan**
- Unauthorized port scanning may be illegal
- Can be considered network reconnaissance for attack
- May violate computer fraud and abuse laws
- Always obtain proper authorization

### Ethical usage

```bash
# Legitimate uses:
# - Network inventory and asset management
# - Security auditing with permission
# - Troubleshooting network issues
# - Compliance verification
# - Vulnerability assessment (authorized)

# Best practices:
# - Document authorization
# - Limit scan scope
# - Use appropriate timing
# - Respect rate limits
# - Monitor for unintended effects
# - Follow responsible disclosure
```

## Quick Reference

### Common commands

```bash
# Basic scan
nmap 192.168.1.1

# Ping scan
nmap -sn 192.168.1.0/24

# SYN scan
sudo nmap -sS 192.168.1.1

# Service detection
nmap -sV 192.168.1.1

# OS detection
sudo nmap -O 192.168.1.1

# Aggressive scan
sudo nmap -A 192.168.1.1

# All ports
nmap -p- 192.168.1.1

# Fast scan
nmap -F 192.168.1.1

# Scripts
nmap -sC 192.168.1.1
nmap --script=vuln 192.168.1.1
```

### Scan types

```
-sS    SYN scan (stealth)
-sT    Connect scan
-sU    UDP scan
-sA    ACK scan
-sW    Window scan
-sM    Maimon scan
-sN    NULL scan
-sF    FIN scan
-sX    Xmas scan
-sO    IP protocol scan
```

## Real-World Examples

### Pre-deployment security check

```bash
# Before deploying server
sudo nmap -sS -sV -O -p- --script=vuln server.example.com -oA pre_deployment_scan

# Verify:
# - Only necessary ports open
# - Services up to date
# - No critical vulnerabilities
```

### Compliance scanning

```bash
# PCI DSS compliance check
sudo nmap -sS -sV -p- --script=vuln,auth company_network.local -oA pci_compliance

# Review for:
# - Unnecessary services
# - Outdated versions
# - Known vulnerabilities
```

### IoT device discovery

```bash
# Find IoT devices
sudo nmap -sS -p 80,443,8080,1883,8883,5683 --open 192.168.1.0/24 --script=http-title

# Common IoT ports:
# 80,443: Web interfaces
# 1883: MQTT
# 5683: CoAP
```

## Resources

- [Nmap official site](https://nmap.org/)
- [Nmap documentation](https://nmap.org/docs.html)
- [NSE script library](https://nmap.org/nsedoc/)
- [Nmap book](https://nmap.org/book/)
- [Nmap mailing list](https://nmap.org/mailman/listinfo/dev)

## Next Steps

- Read the Nmap book (free online)
- Practice with intentionally vulnerable systems (Metasploitable, DVWA)
- Learn NSE script development
- Study network protocols in depth
- Explore complementary tools (Masscan, Zmap)
- Obtain security certifications (CEH, OSCP)
- Contribute to Nmap development
- Join security communities
