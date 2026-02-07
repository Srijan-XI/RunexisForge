# ARP-scan

## Introduction

## What is ARP-scan?

ARP-scan is a command-line tool that uses the Address Resolution Protocol (ARP) to discover and fingerprint IPv4 hosts on the local network. It's designed to be fast, efficient, and highly customizable, making it ideal for network discovery, security auditing, and asset management on local area networks.

## Why ARP-scan?

- Fast local network scanning
- Works at Layer 2 (MAC/ARP)
- Bypasses many firewall rules
- Discovers hosts that block ping
- MAC vendor identification
- Duplicate IP detection
- Simple and lightweight
- Cross-platform support
- No special privileges needed
- Reliable host discovery

## Learning Path

1. Understand ARP protocol basics
2. Learn network fundamentals
3. Install and configure ARP-scan
4. Practice basic scans
5. Master advanced options
6. Integrate with other tools

## User Guide

## Prerequisites

- Basic understanding of networking
- Root/administrator privileges
- Network interface card
- Local network access

Verify installation:

```bash
arp-scan --version
```

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install arp-scan
```

### RHEL/CentOS/Fedora

```bash
sudo yum install arp-scan
# Or
sudo dnf install arp-scan
```

### macOS

```bash
# Using Homebrew
brew install arp-scan
```

### Arch Linux

```bash
sudo pacman -S arp-scan
```

### From source

```bash
# Download latest version
wget https://github.com/royhills/arp-scan/archive/refs/tags/1.10.0.tar.gz
tar xzf 1.10.0.tar.gz
cd arp-scan-1.10.0

# Build and install
autoreconf --install
./configure
make
sudo make install
```

### Windows

```powershell
# Download Windows binary
# From: https://github.com/royhills/arp-scan/releases

# Requires WinPcap or Npcap
# Install from: https://npcap.com/
```

## Basic Usage

### Simple scan

```bash
# Scan local network (auto-detect interface and subnet)
sudo arp-scan --localnet

# Scan specific subnet
sudo arp-scan 192.168.1.0/24

# Scan IP range
sudo arp-scan 192.168.1.1-192.168.1.254

# Scan specific interface
sudo arp-scan -I eth0 --localnet

# Read targets from file
sudo arp-scan -f targets.txt
```

### Output format

```bash
# Default output
sudo arp-scan --localnet

# Sample output:
# Interface: eth0, datalink type: EN10MB (Ethernet)
# Starting arp-scan 1.10.0 with 256 hosts
# 192.168.1.1     aa:bb:cc:dd:ee:ff   Router Inc.
# 192.168.1.10    11:22:33:44:55:66   Device Co.
# 
# 2 packets received, 2 responded, 0 in 0.5s
```

## Command-line Options

### Interface selection

```bash
# Specify interface
sudo arp-scan -I eth0 192.168.1.0/24

# List available interfaces
arp-scan --interface-list

# Use specific interface
sudo arp-scan -I wlan0 --localnet
```

### Target specification

```bash
# Single host
sudo arp-scan 192.168.1.1

# Multiple hosts
sudo arp-scan 192.168.1.1 192.168.1.10 192.168.1.20

# CIDR notation
sudo arp-scan 192.168.1.0/24

# IP range
sudo arp-scan 192.168.1.1-192.168.1.100

# From file
sudo arp-scan -f targets.txt
```

### Timing options

```bash
# Set timeout (default 500ms)
sudo arp-scan --timeout=1000 --localnet

# Retry count (default 1)
sudo arp-scan --retry=3 --localnet

# Interval between packets (ms)
sudo arp-scan --interval=100 --localnet

# Bandwidth limit (bits per second)
sudo arp-scan --bandwidth=10000000 --localnet
```

### Output options

```bash
# Quiet mode (minimal output)
sudo arp-scan -q --localnet

# Plain output (no header/footer)
sudo arp-scan -x --localnet

# Show only responding hosts
sudo arp-scan --localnet | grep -v "^Starting\|^Interface\|^Ending"

# CSV format
sudo arp-scan --localnet -x | awk '{print $1","$2","$3}'
```

## Advanced Features

### MAC vendor lookup

```bash
# Show vendor information (default)
sudo arp-scan --localnet

# Update MAC vendor file
sudo get-iab -u
sudo get-oui -u

# Use custom MAC vendor file
sudo arp-scan --macfile=/path/to/mac-vendor.txt --localnet

# Suppress vendor lookup
sudo arp-scan -N --localnet
```

### Source MAC/IP spoofing

```bash
# Spoof source MAC
sudo arp-scan --srcaddr=aa:bb:cc:dd:ee:ff --localnet

# Spoof source IP
sudo arp-scan --arpspa=192.168.1.254 --localnet

# Random source MAC
sudo arp-scan --randomseed=12345 --localnet
```

### VLAN tagging

```bash
# Add 802.1Q VLAN tag
sudo arp-scan --vlan=10 192.168.1.0/24

# Specify both VLAN and priority
sudo arp-scan --vlan=10 --priority=5 192.168.1.0/24
```

### Custom ARP packets

```bash
# Custom ARP operation code
sudo arp-scan --arpop=1 --localnet  # 1=request, 2=reply

# Custom hardware type
sudo arp-scan --arphrd=1 --localnet  # 1=Ethernet

# Custom protocol type
sudo arp-scan --arppro=0x0800 --localnet  # 0x0800=IPv4

# Custom packet padding
sudo arp-scan --padding=FF00FF00 --localnet
```

## Scanning Techniques

### Fast scan

```bash
# Minimal retries and timeout
sudo arp-scan --retry=1 --timeout=100 --localnet

# No vendor lookup
sudo arp-scan -N -q --localnet

# Combined fast scan
sudo arp-scan -N -q --retry=1 --timeout=100 --localnet
```

### Thorough scan

```bash
# Multiple retries with longer timeout
sudo arp-scan --retry=5 --timeout=2000 --localnet

# Slower interval for reliability
sudo arp-scan --retry=3 --interval=200 --localnet
```

### Stealth scan

```bash
# Random source MAC
sudo arp-scan --randomseed=$(date +%s) --localnet

# Slow scan to avoid detection
sudo arp-scan --interval=1000 --bandwidth=100000 --localnet

# Spoof source address
sudo arp-scan --srcaddr=aa:bb:cc:dd:ee:ff --arpspa=192.168.1.254 --localnet
```

## Common Use Cases

### Network inventory

```bash
# Discover all devices
sudo arp-scan --localnet -x > inventory.txt

# Schedule regular scans
#!/bin/bash
# Cron: 0 */6 * * * /path/to/scan-network.sh

LOGFILE="/var/log/network-scan-$(date +%Y%m%d).log"
sudo arp-scan --localnet -x >> $LOGFILE
```

### Duplicate IP detection

```bash
# Find duplicate IPs
sudo arp-scan -d --localnet

# Output shows duplicates:
# 192.168.1.10  aa:bb:cc:dd:ee:ff   Vendor1
# 192.168.1.10  11:22:33:44:55:66   Vendor2 (DUP: 2)
```

### Security audit

```bash
# Find unknown devices
sudo arp-scan --localnet > current-scan.txt

# Compare with known devices
diff known-devices.txt current-scan.txt

# Alert on new devices
#!/bin/bash
CURRENT=$(sudo arp-scan --localnet -x)
KNOWN=$(cat /etc/known-devices.txt)

if ! echo "$KNOWN" | grep -Fxq "$CURRENT"; then
    echo "Unknown device detected!" | mail -s "Security Alert" admin@example.com
fi
```

### IoT device discovery

```bash
# Scan and identify IoT devices
sudo arp-scan --localnet | grep -i "espressif\|raspberry\|arduino"

# Save IoT inventory
sudo arp-scan --localnet | \
  grep -iE "espressif|raspberry|arduino|sonoff|shelly|xiaomi" > iot-devices.txt
```

## Scripting and Automation

### Bash scripting

```bash
#!/bin/bash
# network-monitor.sh

INTERFACE="eth0"
NETWORK="192.168.1.0/24"
LOGFILE="/var/log/arp-scan.log"

# Scan network
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
echo "=== Scan: $TIMESTAMP ===" >> $LOGFILE

sudo arp-scan -I $INTERFACE $NETWORK -x >> $LOGFILE
echo "" >> $LOGFILE

# Count devices
COUNT=$(sudo arp-scan -I $INTERFACE $NETWORK -x | wc -l)
echo "$TIMESTAMP - Devices found: $COUNT" >> $LOGFILE
```

### Python integration

```python
#!/usr/bin/env python3
import subprocess
import re

def scan_network(interface="eth0", network="--localnet"):
    """Scan network and return list of hosts"""
    cmd = ["sudo", "arp-scan", "-I", interface, network, "-x"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    hosts = []
    for line in result.stdout.split('\n'):
        match = re.match(r'(\d+\.\d+\.\d+\.\d+)\s+([0-9a-f:]+)\s*(.*)', line)
        if match:
            hosts.append({
                'ip': match.group(1),
                'mac': match.group(2),
                'vendor': match.group(3).strip()
            })
    
    return hosts

# Usage
devices = scan_network()
for device in devices:
    print(f"{device['ip']:15} {device['mac']:17} {device['vendor']}")
```

### Continuous monitoring

```bash
#!/bin/bash
# continuous-monitor.sh

INTERFACE="eth0"
NETWORK="--localnet"
INTERVAL=300  # 5 minutes

while true; do
    echo "Scanning at $(date)"
    sudo arp-scan -I $INTERFACE $NETWORK
    echo "Sleeping for $INTERVAL seconds..."
    sleep $INTERVAL
done
```

## Output Parsing

### Extract IPs only

```bash
sudo arp-scan --localnet -x | awk '{print $1}'
```

### Extract MACs only

```bash
sudo arp-scan --localnet -x | awk '{print $2}'
```

### Format as CSV

```bash
sudo arp-scan --localnet -x | awk '{print $1","$2","$3" "$4" "$5}'
```

### JSON output (custom)

```bash
#!/bin/bash
echo "["
sudo arp-scan --localnet -x | awk '{
    printf "{\"ip\":\"%s\",\"mac\":\"%s\",\"vendor\":\"%s\"},\n", $1, $2, $3
}' | sed '$ s/,$//'
echo "]"
```

## Comparison with Other Tools

### ARP-scan vs Nmap

```bash
# ARP-scan (Layer 2, very fast)
sudo arp-scan --localnet

# Nmap ping scan (Layer 3/4)
sudo nmap -sn 192.168.1.0/24

# Comparison:
# - ARP-scan: Faster, Layer 2 only, local network
# - Nmap: Slower, more features, works remotely
```

### ARP-scan vs Netdiscover

```bash
# ARP-scan (command-line focused)
sudo arp-scan --localnet

# Netdiscover (interactive)
sudo netdiscover -i eth0

# ARP-scan advantages:
# - Better for scripting
# - More options
# - More reliable
```

## Troubleshooting

### Permission denied

```bash
# Run with sudo
sudo arp-scan --localnet

# Or set capabilities (Linux)
sudo setcap cap_net_raw+ep /usr/bin/arp-scan
```

### No responses

```bash
# Check interface is up
ip link show

# Verify network connectivity
ping -c 1 192.168.1.1

# Try different interface
sudo arp-scan -I wlan0 --localnet

# Increase timeout
sudo arp-scan --timeout=2000 --retry=3 --localnet
```

### Wrong subnet detected

```bash
# Specify subnet explicitly
sudo arp-scan 192.168.1.0/24

# Or specify interface
sudo arp-scan -I eth0 --localnet
```

### Missing vendor information

```bash
# Update OUI database
sudo get-oui -u

# Update IAB database  
sudo get-iab -u

# Check database location
ls -l /usr/share/arp-scan/
```

## Performance Tuning

### Optimize for speed

```bash
# Fast scan settings
sudo arp-scan -N -q --retry=1 --timeout=100 --localnet
```

### Optimize for accuracy

```bash
# Thorough scan settings
sudo arp-scan --retry=5 --timeout=2000 --interval=50 --localnet
```

### Bandwidth control

```bash
# Limit to 1 Mbps
sudo arp-scan --bandwidth=1000000 --localnet

# Slower interval (100ms between packets)
sudo arp-scan --interval=100 --localnet
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **Only scan networks you own or have explicit authorization to scan**
- ARP scanning can be detected by network monitoring systems
- May trigger security alerts
- Could be considered network reconnaissance
- Follow organizational policies
- Always obtain proper authorization

### Ethical usage

```bash
# Legitimate uses:
# - Network inventory and asset management
# - Troubleshooting network issues
# - DHCP conflict detection
# - Security auditing (authorized)
# - Device discovery for configuration

# Best practices:
# - Document authorization
# - Limit scan frequency
# - Use appropriate timing
# - Respect network policies
# - Secure scan results
```

## Quick Reference

### Essential commands

```bash
# Basic scan
sudo arp-scan --localnet

# Specific subnet
sudo arp-scan 192.168.1.0/24

# Specific interface
sudo arp-scan -I eth0 --localnet

# Quiet mode
sudo arp-scan -q --localnet

# Find duplicates
sudo arp-scan -d --localnet

# List interfaces
arp-scan --interface-list

# Update OUI database
sudo get-oui -u
```

### Common options

```
-I, --interface=<if>    Network interface
-l, --localnet          Scan local network
-f, --file=<fn>         Read targets from file
-q, --quiet             Minimal output
-x, --plain             No header/footer
-N, --numeric           No vendor lookup
-d, --duplicate         Show duplicates
--timeout=<ms>          Timeout per host
--retry=<n>             Number of retries
--interval=<ms>         Minimum packet interval
```

## Real-World Examples

### Network change detection

```bash
#!/bin/bash
# detect-changes.sh

BASELINE="/var/baseline-scan.txt"
CURRENT="/tmp/current-scan.txt"

# Perform scan
sudo arp-scan --localnet -x > $CURRENT

# Compare
if [ -f $BASELINE ]; then
    diff $BASELINE $CURRENT > /tmp/changes.txt
    if [ -s /tmp/changes.txt ]; then
        echo "Network changes detected!"
        cat /tmp/changes.txt
    fi
else
    cp $CURRENT $BASELINE
    echo "Baseline created"
fi
```

### Unauthorized device alert

```bash
#!/bin/bash
# unauthorized-alert.sh

WHITELIST="/etc/authorized-macs.txt"

# Scan and check
sudo arp-scan --localnet -x | while read ip mac vendor; do
    if ! grep -q "$mac" $WHITELIST; then
        echo "ALERT: Unauthorized device detected!"
        echo "IP: $ip, MAC: $mac, Vendor: $vendor"
        # Send alert
        echo "Unauthorized: $ip ($mac)" | mail -s "Security Alert" admin@company.com
    fi
done
```

### DHCP IP conflict check

```bash
#!/bin/bash
# check-conflicts.sh

# Run duplicate detection
DUPLICATES=$(sudo arp-scan -d --localnet | grep "DUP:")

if [ -n "$DUPLICATES" ]; then
    echo "IP conflicts detected:"
    echo "$DUPLICATES"
    logger "ARP-scan: IP conflicts detected"
fi
```

## Integration with Other Tools

### Nmap integration

```bash
# Quick discovery with ARP-scan
sudo arp-scan --localnet -x | awk '{print $1}' > live-hosts.txt

# Detailed scan with Nmap
nmap -iL live-hosts.txt -sV -O
```

### Monitoring systems

```bash
# Export for Nagios/Icinga
sudo arp-scan --localnet -x | \
  awk '{print $1","$2}' > /var/lib/nagios/network-devices.csv
```

### Database logging

```bash
#!/bin/bash
# log-to-db.sh

sudo arp-scan --localnet -x | while read ip mac vendor; do
    sqlite3 /var/db/network.db \
      "INSERT INTO devices (timestamp, ip, mac, vendor) \
       VALUES (datetime('now'), '$ip', '$mac', '$vendor');"
done
```

## Resources

- [ARP-scan official site](https://github.com/royhills/arp-scan)
- [ARP-scan Wiki](https://github.com/royhills/arp-scan/wiki)
- [Man page](https://linux.die.net/man/1/arp-scan)
- [ARP protocol RFC 826](https://tools.ietf.org/html/rfc826)

## Next Steps

- Learn ARP protocol in detail
- Practice network discovery techniques
- Automate network monitoring
- Integrate with configuration management
- Explore network security best practices
- Study Layer 2 security
- Combine with other scanning tools
- Develop custom monitoring scripts
