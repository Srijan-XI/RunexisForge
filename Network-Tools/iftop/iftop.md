# iftop

## Introduction

## What is iftop?

iftop is a real-time network bandwidth monitoring tool that displays bandwidth usage on an interface. It shows a list of network connections ordered by bandwidth usage, making it easy to identify which connections are consuming network resources.

## Why iftop?

- Real-time bandwidth monitoring
- Shows active connections and their bandwidth usage
- Identifies top bandwidth consumers instantly
- Lightweight and easy to use
- Available on most Unix-like systems

## Learning Path

1. Install iftop on your system
2. Learn basic monitoring commands
3. Understand bandwidth metrics
4. Master filtering and sorting options
5. Use for network troubleshooting

## User Guide

## Prerequisites

- Linux/Unix system
- Root or sudo privileges
- Basic understanding of networking

Verify installation:

```bash
iftop --version
```

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install iftop
```

### RHEL/CentOS/Fedora

```bash
sudo yum install iftop
# Or on newer versions
sudo dnf install iftop
```

### Arch Linux

```bash
sudo pacman -S iftop
```

### macOS

```bash
brew install iftop
```

## Basic Usage

### Monitor default interface

```bash
sudo iftop
```

### Monitor specific interface

```bash
# List network interfaces
ip addr show
# Or
ifconfig

# Monitor eth0
sudo iftop -i eth0

# Monitor wlan0
sudo iftop -i wlan0
```

### Display options

```bash
# Show bandwidth in bytes
sudo iftop -B

# Show bandwidth in bits
sudo iftop -b

# Don't show bar graphs
sudo iftop -b -B

# Display ports
sudo iftop -P

# Display port numbers (not service names)
sudo iftop -N

# Don't resolve hostnames
sudo iftop -n
```

## Understanding the Display

### Screen layout

```
Top section: Network connections sorted by bandwidth
Left column: Source IP/hostname
Middle: <=> arrows showing traffic direction
Right column: Destination IP/hostname
Right side: Bandwidth values (2s, 10s, 40s averages)

Bottom section: Summary statistics
TX: Transmitted (sent) data
RX: Received data
TOTAL: Combined TX + RX
cum: Cumulative total since start
peak: Peak bandwidth observed
rates: Current average rates
```

### Interactive keys

```
h - Help screen
n - Toggle DNS resolution
s - Toggle source host display
d - Toggle destination host display
t - Cycle through line display modes
p - Toggle port display
P - Toggle port/service names
b - Toggle bar graph display
B - Bandwidth units (bits/bytes)
T - Toggle cumulative line totals
j/k - Scroll display up/down
f - Edit filter
l - Set screen filter
L - Set linear scale
q - Quit
```

## Filtering Traffic

### Filter by host

```bash
# Filter specific host
sudo iftop -f 'host 192.168.1.100'

# Filter network
sudo iftop -f 'net 192.168.1.0/24'

# Filter source
sudo iftop -f 'src host 192.168.1.100'

# Filter destination
sudo iftop -f 'dst host 192.168.1.100'
```

### Filter by port

```bash
# Filter specific port
sudo iftop -f 'port 80'

# Filter port range
sudo iftop -f 'portrange 1-1024'

# Filter source port
sudo iftop -f 'src port 80'

# Filter destination port
sudo iftop -f 'dst port 443'
```

### Filter by protocol

```bash
# TCP only
sudo iftop -f 'tcp'

# UDP only
sudo iftop -f 'udp'

# ICMP only
sudo iftop -f 'icmp'
```

### Complex filters

```bash
# HTTP and HTTPS traffic
sudo iftop -f 'port 80 or port 443'

# Specific host on specific ports
sudo iftop -f 'host 192.168.1.100 and (port 80 or port 443)'

# Exclude SSH traffic
sudo iftop -f 'not port 22'

# Traffic from subnet to internet
sudo iftop -f 'src net 192.168.1.0/24 and not dst net 192.168.1.0/24'
```

## Advanced Options

### Text output mode

```bash
# Text mode for scripting
sudo iftop -t -s 5 -L 10

# Explanation:
# -t: Text output mode
# -s 5: Run for 5 seconds
# -L 10: Show top 10 connections
```

### Bandwidth limits

```bash
# Set custom bandwidth scale
sudo iftop -m 100M

# -m: Maximum bandwidth for scale (K/M/G)
```

### Output formatting

```bash
# One-line output per connection
sudo iftop -t -s 10

# No DNS resolution (faster)
sudo iftop -n

# Show ports numerically
sudo iftop -N

# Combine options
sudo iftop -nNP -i eth0
```

## Common Use Cases

### Monitor web server traffic

```bash
# Monitor HTTP/HTTPS traffic
sudo iftop -i eth0 -f 'port 80 or port 443' -P

# With no DNS resolution for faster display
sudo iftop -i eth0 -f 'port 80 or port 443' -nP
```

### Monitor specific subnet

```bash
# Monitor traffic to/from specific subnet
sudo iftop -i eth0 -f 'net 10.0.0.0/8'

# Monitor traffic from subnet
sudo iftop -i eth0 -f 'src net 192.168.1.0/24'
```

### Find bandwidth hogs

```bash
# Monitor all traffic, sorted by bandwidth
sudo iftop -i eth0 -P

# Press 'T' to toggle cumulative totals
# Press 'o' to cycle through sorting options
```

### Monitor database traffic

```bash
# MySQL
sudo iftop -f 'port 3306' -P

# PostgreSQL
sudo iftop -f 'port 5432' -P

# MongoDB
sudo iftop -f 'port 27017' -P

# Redis
sudo iftop -f 'port 6379' -P
```

### Monitor email traffic

```bash
# SMTP
sudo iftop -f 'port 25 or port 587' -P

# IMAP
sudo iftop -f 'port 143 or port 993' -P

# POP3
sudo iftop -f 'port 110 or port 995' -P
```

### Monitor VPN traffic

```bash
# OpenVPN
sudo iftop -f 'port 1194' -P

# WireGuard
sudo iftop -i wg0
```

## Scripting and Automation

### Capture bandwidth snapshot

```bash
# Run for 30 seconds and save output
sudo iftop -t -s 30 -L 20 > bandwidth-snapshot.txt

# Schedule regular snapshots
cat << 'EOF' > /usr/local/bin/iftop-snapshot.sh
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
sudo iftop -t -s 60 -L 50 > /var/log/iftop/snapshot-${TIMESTAMP}.txt
EOF

chmod +x /usr/local/bin/iftop-snapshot.sh
```

### Cron job for monitoring

```bash
# Add to crontab
# Every hour, capture 60 second snapshot
0 * * * * /usr/local/bin/iftop-snapshot.sh
```

### Parse output for alerts

```bash
#!/bin/bash
# Alert if any single connection exceeds 10 Mbps

OUTPUT=$(sudo iftop -t -s 10 -L 5 2>/dev/null)

# Parse and check bandwidth
while IFS= read -r line; do
    # Extract bandwidth values (simplified example)
    if [[ $line =~ ([0-9.]+)([KMG]b) ]]; then
        value="${BASH_REMATCH[1]}"
        unit="${BASH_REMATCH[2]}"
        
        # Check if Mb or Gb and value > threshold
        if [[ "$unit" == "Mb" && $(echo "$value > 10" | bc) -eq 1 ]]; then
            echo "Alert: High bandwidth detected - $line"
        fi
    fi
done <<< "$OUTPUT"
```

## Configuration File

### Create config file

```bash
# Create ~/.iftoprc
cat << 'EOF' > ~/.iftoprc
# Don't resolve hostnames
dns-resolution: no

# Don't resolve port numbers
port-resolution: no

# Show ports
show-ports: yes

# Display bandwidth in bits
bandwidth-unit: bits

# Maximum scale
max-bandwidth: 100M

# Filter
filter-code: port 80 or port 443
EOF
```

### Configuration options

```
dns-resolution: yes/no
port-resolution: yes/no
show-ports: yes/no
port-display: on/off/source/destination
promiscuous: yes/no
hide-source: yes/no
hide-destination: yes/no
use-bytes: yes/no
sort: 2s/10s/40s/source/destination
line-display: two-line/one-line-both/one-line-received/one-line-sent
show-bars: yes/no
bandwidth-unit: bits/bytes
filter-code: <pcap filter>
```

## Performance Tuning

### Optimize for high traffic

```bash
# Disable DNS resolution
sudo iftop -n -N

# Reduce line count
sudo iftop -L 20

# Use specific filter
sudo iftop -f 'tcp'
```

### Memory and CPU

```bash
# iftop is generally lightweight
# For systems with limited resources:
sudo nice -n -10 iftop -n -N -L 10
```

## Troubleshooting

### Permission denied

```bash
# Solution: Use sudo
sudo iftop

# Or grant capabilities (Linux)
sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/iftop
```

### No traffic displayed

```bash
# Check interface name
ip addr show

# Try different interface
sudo iftop -i any

# Check if interface is up
ip link show dev eth0
```

### High CPU usage

```bash
# Disable DNS resolution
sudo iftop -n

# Reduce update frequency
# (not directly supported, but filtering helps)
sudo iftop -f 'tcp and port 80'
```

### Filter not working

```bash
# Check filter syntax
sudo iftop -f 'host 192.168.1.1'

# Test with tcpdump syntax
sudo tcpdump -i eth0 'host 192.168.1.1' -c 5

# Use same filter in iftop
sudo iftop -i eth0 -f 'host 192.168.1.1'
```

## Comparison with Other Tools

### iftop vs nethogs

```bash
# iftop: Shows connections and bandwidth
sudo iftop

# nethogs: Shows bandwidth per process
sudo nethogs
```

### iftop vs nload

```bash
# iftop: Shows individual connections
sudo iftop

# nload: Shows total interface bandwidth
nload
```

### iftop vs vnstat

```bash
# iftop: Real-time monitoring
sudo iftop

# vnstat: Historical bandwidth statistics
vnstat -d
```

## Quick Reference

### Essential options

```bash
-i <interface>    # Specify interface
-f <filter>       # pcap filter expression
-n                # Don't resolve hostnames
-N                # Don't resolve ports
-P                # Show ports
-b                # Bandwidth in bits
-B                # Bandwidth in bytes
-t                # Text output mode
-s <seconds>      # Text output duration
-L <lines>        # Number of lines in text output
```

### Interactive keys

```bash
h - Help
n - Toggle DNS
p - Toggle ports
P - Toggle port numbers
t - Cycle display modes
b - Toggle bar graphs
B - Toggle bandwidth units
T - Toggle cumulative totals
j/k - Scroll
f - Edit filter
q - Quit
```

## Real-World Examples

### Diagnose slow network

```bash
# Monitor all traffic to find bandwidth hogs
sudo iftop -i eth0 -P -B

# Press 'T' to see cumulative totals
# Identify top bandwidth consumers
```

### Monitor production server

```bash
# Monitor HTTP/HTTPS with hostnames resolved
sudo iftop -i eth0 -f 'port 80 or port 443' -P

# Save periodic snapshots
sudo iftop -t -s 300 -L 50 > /var/log/http-traffic-$(date +%Y%m%d-%H%M).txt
```

### Debug microservices

```bash
# Monitor service mesh traffic (e.g., port 8080)
sudo iftop -i eth0 -f 'port 8080' -nP

# Or monitor container network
sudo iftop -i docker0 -P
```

### Check backup traffic

```bash
# Monitor rsync traffic
sudo iftop -f 'port 873' -P -B

# Monitor SCP/SFTP
sudo iftop -f 'port 22' -P -B
```

## Resources

- [iftop man page](http://www.ex-parrot.com/pdw/iftop/)
- [iftop source code](https://code.blinkace.com/pdw/iftop)
- [pcap filter syntax](https://www.tcpdump.org/manpages/pcap-filter.7.html)

## Next Steps

- Combine with nethogs for process-level monitoring
- Use vnstat for long-term bandwidth statistics
- Integrate with monitoring systems (Prometheus, Grafana)
- Learn tcpdump for detailed packet analysis
- Explore nload, bmon for alternative views
