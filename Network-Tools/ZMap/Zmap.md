# Zmap

## Introduction

## What is Zmap?

Zmap is an open-source network scanner designed to perform Internet-wide network scans in under 45 minutes, scanning the entire IPv4 address space on a single port from a single machine with a gigabit Ethernet connection. Created by researchers at the University of Michigan, Zmap uses a novel approach that eliminates the need for maintaining per-connection state, enabling unprecedented scanning speed.

## Why Zmap?

- Extremely fast (1.44 million packets/second)
- Stateless scanning architecture
- Can scan entire IPv4 space quickly
- Low resource consumption
- Randomized address probing
- Integration with data processing tools
- Research-grade tool
- Open-source
- Flexible output formats

## Learning Path

1. Understand TCP/IP fundamentals
2. Learn about network scanning
3. Study Zmap's stateless approach
4. Install and configure Zmap
5. Practice responsible scanning
6. Analyze large-scale scan data

## User Guide

## Prerequisites

- Understanding of networking
- High-bandwidth connection (for large scans)
- Root/administrator privileges
- Knowledge of TCP/IP protocols
- Ethical considerations

Verify installation:

```bash
zmap --version
```

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install zmap
```

### From source (recommended)

```bash
# Install dependencies
sudo apt install build-essential cmake libgmp3-dev gengetopt libpcap-dev flex byacc libjson-c-dev pkg-config libunistring-dev

# Clone repository
git clone https://github.com/zmap/zmap.git
cd zmap

# Build
cmake .
make

# Install
sudo make install
```

### RHEL/CentOS/Fedora

```bash
# Install dependencies
sudo dnf install cmake gmp-devel gengetopt libpcap-devel json-c-devel byacc

# Build from source (same as above)
```

### macOS

```bash
# Install dependencies
brew install pkg-config cmake gmp gengetopt json-c byacc libdnet

# Clone and build
git clone https://github.com/zmap/zmap.git
cd zmap
cmake .
make
sudo make install
```

## Basic Usage

### Simple scans

```bash
# Scan single port across random IPs
sudo zmap -p 80

# Scan specific subnet
sudo zmap -p 443 192.168.1.0/24

# Scan multiple subnets
sudo zmap -p 22 10.0.0.0/8 192.168.0.0/16

# Limit bandwidth
sudo zmap -p 80 -B 10M
```

### Output options

```bash
# Output to file
sudo zmap -p 80 -o results.txt

# CSV format
sudo zmap -p 80 -f "saddr,sport,daddr" -o results.csv

# JSON output
sudo zmap -p 80 --output-module=json -o results.json
```

## Command-Line Options

### Target specification

```bash
# All IPv4 addresses (default)
sudo zmap -p 80

# Specific subnet
sudo zmap -p 443 10.0.0.0/8

# Multiple targets
sudo zmap -p 80 192.168.1.0/24 10.0.0.0/8

# Exclude addresses
sudo zmap -p 80 -b exclude.txt

# Whitelist only
sudo zmap -p 80 -w whitelist.txt
```

### Rate limiting

```bash
# Packets per second
sudo zmap -p 80 -r 10000

# Bandwidth limit (bits/sec)
sudo zmap -p 80 -B 10M

# Max targets
sudo zmap -p 80 -n 10000
```

### Network interface

```bash
# Specify interface
sudo zmap -p 80 -i eth0

# Source IP
sudo zmap -p 80 -S 192.168.1.10

# Source port range
sudo zmap -p 80 -s 50000-60000

# Gateway MAC
sudo zmap -p 80 -G aa:bb:cc:dd:ee:ff
```

## Probe Modules

### Available modules

```bash
# List probe modules
zmap --list-probe-modules

Available:
- tcp_synscan (default)
- icmp_echoscan
- icmp_echo_time
- udp
- ntp
- upnp
```

### TCP SYN scan

```bash
# Default TCP SYN scan
sudo zmap -p 80

# Explicit module specification
sudo zmap -p 443 -M tcp_synscan
```

### ICMP scan

```bash
# ICMP echo request
sudo zmap -M icmp_echoscan

# ICMP echo with timestamp
sudo zmap -M icmp_echo_time
```

### UDP scan

```bash
# UDP scan
sudo zmap -M udp -p 53

# UDP payload
sudo zmap -M udp -p 161 --probe-args=file:snmp-payload.txt
```

### Other protocols

```bash
# NTP
sudo zmap -M ntp -p 123

# UPnP
sudo zmap -M upnp -p 1900
```

## Output Modules

### Available output modules

```bash
# List output modules
zmap --list-output-modules

Available:
- csv (default)
- json
- redis
- mongodb
```

### CSV output

```bash
# Default CSV
sudo zmap -p 80 -o results.csv

# Custom fields
sudo zmap -p 80 -f "saddr,sport,daddr,dport,classification" -o results.csv
```

### JSON output

```bash
# JSON format
sudo zmap -p 80 --output-module=json -o results.json

# Pretty JSON
sudo zmap -p 80 --output-module=json | jq '.' > results.json
```

### Redis output

```bash
# Output to Redis
sudo zmap -p 80 --output-module=redis --redis-server=127.0.0.1
```

## Output Fields

### Available fields

```bash
# List output fields
zmap --list-output-fields

Common fields:
- saddr       Source IP
- saddr-N     Source IP (numeric)
- daddr       Destination IP
- sport       Source port
- dport       Destination port
- seqnum      Sequence number
- acknum      ACK number
- window      Window size
- classification  Response classification
- success     Success flag (0 or 1)
- repeat      Is repeat response
- timestamp-str  Timestamp (string)
- timestamp-us   Timestamp (microseconds)
```

### Custom output

```bash
# Specific fields
sudo zmap -p 80 -f "saddr,dport,classification,success" -o custom.csv

# All fields
sudo zmap -p 80 -f "*" -o all-fields.csv
```

## Blacklisting and Whitelisting

### Blacklist file

```bash
# Create blacklist
cat > blacklist.txt <<EOF
# Private networks
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16

# Localhost
127.0.0.0/8

# Specific ranges
1.2.3.0/24
EOF

# Use blacklist
sudo zmap -p 80 -b blacklist.txt
```

### Whitelist file

```bash
# Create whitelist
cat > whitelist.txt <<EOF
# Only scan these ranges
8.8.8.0/24
1.1.1.0/24
EOF

# Use whitelist (ignore all others)
sudo zmap -p 80 -w whitelist.txt
```

### Default blacklist

```bash
# Use default blacklist (RFC1918, etc.)
sudo zmap -p 80 -b /etc/zmap/blacklist.conf
```

## Performance Tuning

### Optimization options

```bash
# Maximum speed (careful!)
sudo zmap -p 80 -r 100000

# Moderate speed
sudo zmap -p 80 -B 100M

# Use multiple cores
sudo zmap -p 80 -T 4

# Increase cooldown
sudo zmap -p 80 -c 10
```

### Sender threads

```bash
# Multiple sender threads
sudo zmap -p 80 -T 8

# Note: Usually 1-4 threads optimal
```

### Bandwidth calculation

```
Bandwidth = Rate × Packet Size

Example:
10,000 pps × 1,500 bytes × 8 bits = 120 Mbps

Safe rates:
- 100 Mbps: ~8,000 pps
- 1 Gbps: ~80,000 pps
- 10 Gbps: ~800,000 pps
```

## Advanced Features

### Sharding

```bash
# Scan only 1/10th of addresses (shard 0)
sudo zmap -p 80 --shards=10 --shard=0

# Distribute across 10 machines
# Machine 1: --shards=10 --shard=0
# Machine 2: --shards=10 --shard=1
# ...
# Machine 10: --shards=10 --shard=9
```

### Seed for reproducibility

```bash
# Use specific seed
sudo zmap -p 80 --seed=12345

# Same seed = same scan order
```

### Metadata

```bash
# Add metadata to output
sudo zmap -p 80 --metadata-file=metadata.json

# metadata.json
{
  "scan_purpose": "research",
  "operator": "researcher",
  "date": "2024-01-15"
}
```

## Integration with ZGrab

### ZGrab2 banner grabbing

```bash
# Scan with Zmap
sudo zmap -p 443 10.0.0.0/8 -o ips.txt

# Banner grab with ZGrab2
cat ips.txt | zgrab2 tls -o tls-results.json

# Or pipe directly
sudo zmap -p 443 10.0.0.0/8 | zgrab2 tls -o tls-results.json
```

## Monitoring and Statistics

### Real-time statistics

```bash
# Show statistics during scan
sudo zmap -p 80 -v 5

# Output:
# 0% (1234 sent, 567 recv, 123 hits)
# 1% (12340 sent, 5678 recv, 1234 hits)
```

### Summary statistics

```bash
# At completion shows:
# - Total sent
# - Total received
# - Total hits
# - Total runtime
# - Scan rate
# - Hit rate
```

## Common Use Cases

### Internet-wide port scan

```bash
# Scan entire IPv4 for HTTP
sudo zmap -p 80 -o http-servers.txt

# With blacklist
sudo zmap -p 80 -b /etc/zmap/blacklist.conf -o http-servers.txt

# Rate limited
sudo zmap -p 80 -B 100M -o http-servers.txt
```

### Research scan

```bash
# Scan for SSH servers
sudo zmap -p 22 -B 10M -o ssh-servers.txt

# Scan for HTTPS
sudo zmap -p 443 -r 10000 -o https-servers.txt

# DNS servers
sudo zmap -M udp -p 53 -o dns-servers.txt
```

### Network inventory

```bash
# Scan organization's IP space
sudo zmap -p 80,443 203.0.113.0/24 -o org-web-servers.txt
```

### Vulnerability research

```bash
# Find specific service
sudo zmap -p 5555 -o android-debug.txt

# IoT device discovery
sudo zmap -p 23,81,8080 -o iot-devices.txt
```

## Data Processing

### Pipe to other tools

```bash
# Filter successful responses
sudo zmap -p 80 | grep "1$" > successful.txt

# Count results
sudo zmap -p 80 | wc -l

# Pipe to ZGrab
sudo zmap -p 443 | zgrab2 tls
```

### Parse with awk

```bash
# Extract IPs only
sudo zmap -p 80 | awk '{print $1}' > ips.txt

# Filter by success
sudo zmap -p 80 | awk '$5==1 {print $1}' > successful-ips.txt
```

### Process with Python

```python
#!/usr/bin/env python3
import sys

for line in sys.stdin:
    fields = line.strip().split(',')
    ip = fields[0]
    success = fields[4]
    
    if success == '1':
        print(f"Success: {ip}")
```

## Configuration File

### Create config file

```bash
# /etc/zmap/zmap.conf
output-file = /var/log/zmap/scan.txt
blacklist-file = /etc/zmap/blacklist.conf
interface = eth0
rate = 10000
bandwidth = 100M
cooldown-time = 8
```

### Use config file

```bash
# Use config
sudo zmap -p 80 -C /etc/zmap/zmap.conf
```

## Responsible Scanning

### Best practices

```
1. Rate limit appropriately
   - Don't overwhelm networks
   - Consider impact on infrastructure

2. Use blacklists
   - Exclude sensitive networks
   - Respect opt-out requests

3. Provide contact information
   - Set proper reverse DNS
   - Monitor abuse complaints

4. Log and document
   - Keep scan records
   - Document purpose
```

### Blacklist recommendations

```bash
# Include in blacklist:
# - Private networks (RFC1918)
# - Localhost (127.0.0.0/8)
# - Multicast (224.0.0.0/4)
# - Military networks (6.0.0.0/8)
# - IANA reserved
# - Opt-out requests
```

## Troubleshooting

### No responses received

```bash
# Check interface
ip link show

# Verify gateway MAC
ip neigh show

# Specify gateway MAC
sudo zmap -p 80 -G $(ip neigh show | grep router | awk '{print $5}')

# Test with small sample
sudo zmap -p 80 -n 100 -v 5
```

### Permission denied

```bash
# Run as root
sudo zmap -p 80

# Or set capabilities
sudo setcap cap_net_raw=eip /usr/local/sbin/zmap
```

### Interface not found

```bash
# List interfaces
ip link show

# Specify explicitly
sudo zmap -p 80 -i eth0
```

### Slow scanning

```bash
# Check current rate
sudo zmap -p 80 -v 5

# Increase rate
sudo zmap -p 80 -r 50000

# Or bandwidth
sudo zmap -p 80 -B 500M
```

## Security and Legal Considerations

### ⚠️ CRITICAL WARNING

- **Zmap is designed for Internet-wide scanning**
- **Unauthorized scanning can be ILLEGAL**
- **Can cause significant network disruption**
- **May violate Computer Fraud and Abuse Act**
- **Always obtain proper authorization**
- **University/organizational approval required**
- **Follow responsible disclosure**
- **Respect opt-out requests**

### Legal requirements

```
Required before scanning:
1. Institutional Review Board (IRB) approval
2. Network owner authorization
3. Legal counsel review
4. Abuse contact monitoring
5. Opt-out mechanism
6. Data protection compliance
7. Terms of service compliance
```

### Ethical usage

```
Legitimate uses:
- Academic research (with approval)
- Internet measurement studies
- Security research (authorized)
- Network operations (own network)
- Censorship research (ethical review)

Best practices:
- Minimize scan frequency
- Respect robots.txt equivalent
- Provide contact information
- Monitor abuse complaints
- Respect privacy
- Follow responsible disclosure
- Document everything
- Never scan without authorization
```

## Quick Reference

### Essential commands

```bash
# Basic scan
sudo zmap -p 80 -o results.txt

# Rate limited
sudo zmap -p 443 -B 10M -o results.txt

# Specific subnet
sudo zmap -p 22 192.168.0.0/16 -o results.txt

# With blacklist
sudo zmap -p 80 -b blacklist.txt -o results.txt

# JSON output
sudo zmap -p 80 --output-module=json -o results.json

# Sharding (10 machines)
sudo zmap -p 80 --shards=10 --shard=0 -o results.txt
```

### Common options

```
-p PORT          Target port
-o FILE          Output file
-b FILE          Blacklist file
-w FILE          Whitelist file
-r RATE          Rate (packets/sec)
-B BW            Bandwidth (M=megabits)
-n COUNT         Max targets
-i IFACE         Network interface
-M MODULE        Probe module
-v LEVEL         Verbosity
--shards=N       Total shards
--shard=N        This shard (0-based)
```

## Real-World Examples

### Academic research scan

```bash
#!/bin/bash
# research-scan.sh

# Configuration
PORT=443
RATE=10000
OUTPUT=/data/scans/$(date +%Y%m%d)-port$PORT.txt
BLACKLIST=/etc/zmap/blacklist.conf

# Scan
sudo zmap -p $PORT \
  -r $RATE \
  -b $BLACKLIST \
  -o $OUTPUT \
  --metadata-file=metadata.json

# Process results
cat $OUTPUT | zgrab2 tls -o tls-data.json
```

### Organization network audit

```bash
# Scan company IP ranges
sudo zmap -p 80,443 \
  -w company-ips.txt \
  -o web-servers.txt \
  -B 100M
```

## Comparison with Other Tools

### vs Nmap

```
Zmap:
+ Extremely fast (stateless)
+ Optimized for wide scans
+ Low memory usage
+ Simple operation
- No service detection
- No OS fingerprinting
- Limited scanning options

Nmap:
+ Feature-rich
+ Service detection
+ OS fingerprinting
+ Script engine
- Slower
- Higher resource usage
```

### vs Masscan

```
Both are fast scanners

Zmap:
+ Internet-wide focus
+ Better for research
+ Cleaner codebase

Masscan:
+ TCP port ranges
+ Similar speed
+ More port scanning features
```

## Resources

- [Zmap official site](https://zmap.io/)
- [GitHub repository](https://github.com/zmap/zmap)
- [Research paper](https://zmap.io/paper.html)
- [Zmap project](https://zmap.io/)
- [ZGrab2](https://github.com/zmap/zgrab2)
- [Censys.io](https://censys.io/) - Built on Zmap

## Next Steps

- Read Zmap research paper
- Understand stateless scanning
- Learn about Internet measurement
- Study network security
- Explore ZGrab2 integration
- Review ethical scanning practices
- Join research community
- Contribute to Zmap project
- Study large-scale data analysis
