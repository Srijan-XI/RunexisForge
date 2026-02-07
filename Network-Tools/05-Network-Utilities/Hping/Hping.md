# Hping

## Introduction

## What is Hping?

Hping is a command-line oriented TCP/IP packet assembler and analyzer. It can be used for network security testing, firewall testing, manual path MTU discovery, advanced traceroute, remote OS fingerprinting, and more. Hping is essentially a packet crafting tool that allows you to create customized TCP/IP packets.

## Why Hping?

- Advanced packet crafting capabilities
- Firewall and IDS testing
- Port scanning with custom packets
- Path MTU discovery
- Network performance testing
- OS fingerprinting
- DoS testing (in authorized environments)
- Supports TCP, UDP, ICMP, and RAW-IP

## Learning Path

1. Understand TCP/IP packet structure
2. Learn basic hping commands
3. Practice packet crafting
4. Master firewall testing techniques
5. Explore advanced scanning methods

## User Guide

## Prerequisites

- Linux/Unix system (recommended)
- Root/sudo privileges
- Basic understanding of TCP/IP protocols
- Network testing authorization

Verify installation:

```bash
hping3 --version
```

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install hping3
```

### RHEL/CentOS/Fedora

```bash
sudo yum install hping3
# Or
sudo dnf install hping3
```

### Arch Linux

```bash
sudo pacman -S hping
```

### macOS

```bash
brew install hping
```

### Compile from source

```bash
# Install dependencies
sudo apt install libpcap-dev tcl-dev

# Download and compile
git clone https://github.com/antirez/hping.git
cd hping
./configure
make
sudo make install
```

## Basic Usage

### ICMP ping

```bash
# Basic ICMP ping
sudo hping3 -1 target.com

# Count packets
sudo hping3 -1 -c 5 target.com

# Interval (wait time between packets)
sudo hping3 -1 -i u1000 target.com  # 1000 microseconds

# Flood mode (fast as possible)
sudo hping3 -1 --flood target.com
```

### TCP packets

```bash
# TCP SYN to port 80
sudo hping3 -S -p 80 target.com

# TCP ACK
sudo hping3 -A -p 80 target.com

# TCP FIN
sudo hping3 -F -p 80 target.com

# TCP RST
sudo hping3 -R -p 80 target.com

# TCP SYN+ACK
sudo hping3 -SA -p 80 target.com
```

### UDP packets

```bash
# UDP to port 53
sudo hping3 --udp -p 53 target.com

# UDP with data
sudo hping3 --udp -p 161 -d 100 target.com
```

### RAW IP mode

```bash
# Send RAW IP packets
sudo hping3 --rawip -p 0 target.com
```

## Port Scanning

### SYN scan (stealth scan)

```bash
# Single port
sudo hping3 -S -p 80 -c 1 target.com

# Multiple ports (sequential)
sudo hping3 -S -p ++1 -c 100 target.com

# Scan specific ports
for port in 20 21 22 23 25 80 443; do
    sudo hping3 -S -p $port -c 1 target.com
done
```

### ACK scan (firewall testing)

```bash
# ACK scan to test firewall rules
sudo hping3 -A -p 80 target.com

# If RST received: port not filtered
# If no response: port filtered
```

### FIN scan

```bash
# FIN scan (bypass some firewalls)
sudo hping3 -F -p 80 target.com

# Open port: no response
# Closed port: RST response
```

### Xmas scan

```bash
# FIN+PSH+URG flags set
sudo hping3 -F -P -U -p 80 target.com
```

### NULL scan

```bash
# No flags set
sudo hping3 -p 80 target.com

# (no flags specified defaults to NULL scan)
```

## Firewall Testing

### Test firewall rules

```bash
# Test if port is filtered
sudo hping3 -S -p 80 -c 5 target.com

# Test with specific source port
sudo hping3 -S -p 80 -s 53 target.com

# Test from specific source IP (IP spoofing)
sudo hping3 -S -p 80 -a 192.168.1.100 target.com
```

### Fragment testing

```bash
# Send fragmented packets
sudo hping3 -S -p 80 -f target.com

# Specific fragment offset
sudo hping3 -S -p 80 -f -x 16 target.com
```

### MTU discovery

```bash
# Set packet size
sudo hping3 -S -p 80 -d 1500 target.com

# Don't fragment flag
sudo hping3 -S -p 80 -d 1500 -M dont target.com

# Gradually increase size to find MTU
for size in 500 1000 1500 2000; do
    echo "Testing size $size"
    sudo hping3 -S -p 80 -d $size -c 1 target.com
done
```

## Advanced Packet Crafting

### Custom TTL

```bash
# Set specific TTL
sudo hping3 -S -p 80 -t 5 target.com

# Trace route with TTL
for ttl in {1..30}; do
    echo "TTL $ttl:"
    sudo hping3 -S -p 80 -t $ttl -c 1 target.com
done
```

### Custom window size

```bash
# Set TCP window size
sudo hping3 -S -p 80 -w 64 target.com
```

### Custom sequence number

```bash
# Set initial sequence number
sudo hping3 -S -p 80 -M 1000 target.com
```

### Custom ACK number

```bash
# Set ACK number
sudo hping3 -S -p 80 -L 1000 target.com
```

### Custom data

```bash
# Send data with packet
sudo hping3 -S -p 80 -d 100 target.com

# Send specific data
sudo hping3 -S -p 80 -E /path/to/file target.com

# Send signature
sudo hping3 -S -p 80 --sign timestamp target.com
```

## Network Testing

### Bandwidth testing

```bash
# Flood packets to test bandwidth
sudo hping3 -S -p 80 --flood target.com

# With specific data size
sudo hping3 -S -p 80 -d 1000 --flood target.com

# Limited rate
sudo hping3 -S -p 80 --faster target.com
```

### Latency testing

```bash
# Measure latency
sudo hping3 -S -p 80 -c 10 target.com

# Different intervals
sudo hping3 -S -p 80 -i u100000 -c 10 target.com  # 100ms interval
```

### Jitter testing

```bash
# Random intervals
sudo hping3 -S -p 80 --rand-source target.com

# Multiple tests and analyze
for i in {1..5}; do
    sudo hping3 -1 -c 100 target.com | grep avg
done
```

## OS Fingerprinting

### TCP fingerprinting

```bash
# Different TCP options
sudo hping3 -S -p 80 -O target.com

# Window size variations
sudo hping3 -S -p 80 -w 0 target.com
sudo hping3 -S -p 80 -w 65535 target.com

# TTL analysis
sudo hping3 -S -p 80 -t 128 target.com
```

### ICMP fingerprinting

```bash
# ICMP timestamp
sudo hping3 --icmp-ts target.com

# ICMP address mask
sudo hping3 --icmp-addr target.com
```

## Traceroute

### TCP traceroute

```bash
# TCP traceroute to port 80
sudo hping3 -S -p 80 --traceroute target.com

# Verbose traceroute
sudo hping3 -S -p 80 --traceroute -V target.com
```

### UDP traceroute

```bash
# UDP traceroute
sudo hping3 --udp --traceroute -p 53 target.com
```

### ICMP traceroute

```bash
# ICMP traceroute
sudo hping3 -1 --traceroute target.com
```

## IDS/IPS Testing

### Test IDS signatures

```bash
# Send suspicious patterns
sudo hping3 -S -p 80 -d 1000 --file /path/to/payload target.com

# Evasion techniques
# Fragment packets
sudo hping3 -S -p 80 -f target.com

# Random source IPs
sudo hping3 -S -p 80 --rand-source target.com

# Low and slow
sudo hping3 -S -p 80 -i s10 target.com  # 10 second interval
```

### Stress testing

```bash
# SYN flood (authorized testing only)
sudo hping3 -S -p 80 --flood --rand-source target.com

# Connection exhaustion
sudo hping3 -S -p 80 -c 1000 --faster target.com
```

## Scripting with Hping

### Port scan script

```bash
#!/bin/bash
# Scan common ports with hping

TARGET=$1
PORTS="20 21 22 23 25 53 80 110 143 443 445 3306 3389 8080"

echo "Scanning $TARGET..."

for port in $PORTS; do
    result=$(sudo hping3 -S -p $port -c 1 $TARGET 2>&1)
    if echo "$result" | grep -q "flags=SA"; then
        echo "Port $port: OPEN"
    elif echo "$result" | grep -q "flags=RA"; then
        echo "Port $port: CLOSED"
    else
        echo "Port $port: FILTERED"
    fi
done
```

### Firewall rule tester

```bash
#!/bin/bash
# Test firewall rules

TARGET=$1
PORT=$2

echo "Testing firewall rules for $TARGET:$PORT"

# SYN test
echo -n "SYN test: "
sudo hping3 -S -p $PORT -c 1 $TARGET 2>&1 | grep -q "flags=SA" && echo "ALLOWED" || echo "BLOCKED"

# ACK test
echo -n "ACK test: "
sudo hping3 -A -p $PORT -c 1 $TARGET 2>&1 | grep -q "flags=R" && echo "NOT FILTERED" || echo "FILTERED"

# Fragment test
echo -n "Fragment test: "
sudo hping3 -S -p $PORT -f -c 1 $TARGET 2>&1 | grep -q "flags=SA" && echo "ALLOWED" || echo "BLOCKED"
```

### Bandwidth monitor

```bash
#!/bin/bash
# Monitor available bandwidth

TARGET=$1
DURATION=10

echo "Testing bandwidth to $TARGET for ${DURATION}s..."

sudo hping3 -S -p 80 --flood $TARGET &
PID=$!

sleep $DURATION
sudo kill $PID

echo "Test complete"
```

## Common Use Cases

### Test load balancer

```bash
# Send requests and check responses
sudo hping3 -S -p 80 -c 100 loadbalancer.com

# Check if different servers respond
sudo hping3 -S -p 80 --ttl 64 loadbalancer.com -c 10
```

### Bypass firewall restrictions

```bash
# Try different source ports
sudo hping3 -S -p 80 -s 53 target.com     # DNS
sudo hping3 -S -p 80 -s 443 target.com    # HTTPS
sudo hping3 -S -p 80 -s 25 target.com     # SMTP

# Fragment packets
sudo hping3 -S -p 80 -f target.com
```

### Test DDoS protection

```bash
# Simulate traffic (authorized only)
sudo hping3 -S -p 80 --flood target.com

# Multiple source IPs
sudo hping3 -S -p 80 --flood --rand-source target.com

# Distributed (from multiple machines)
# Run on different hosts simultaneously
```

### Verify SSL/TLS

```bash
# Test HTTPS port
sudo hping3 -S -p 443 -c 5 target.com

# Check response times
sudo hping3 -S -p 443 -c 100 target.com | grep avg
```

## Output Analysis

### Interpret responses

```bash
# flags=SA : SYN-ACK (port open, service listening)
# flags=RA : RST-ACK (port closed, no service)
# No response: Port filtered or host down

# RTT: Round-trip time
# TTL: Time to live (hops)
# id: IP identification field
# seq: TCP sequence number
```

### Verbose output

```bash
# Verbose mode
sudo hping3 -S -p 80 -V target.com

# Debug mode
sudo hping3 -S -p 80 -d 100 --debug target.com
```

## Performance Options

### Timing options

```bash
# Interval in seconds
sudo hping3 -1 -i 1 target.com

# Interval in microseconds
sudo hping3 -1 -i u100000 target.com

# Fast mode
sudo hping3 -1 --fast target.com

# Faster mode
sudo hping3 -1 --faster target.com

# Flood mode
sudo hping3 -1 --flood target.com
```

### Count and duration

```bash
# Send 100 packets
sudo hping3 -S -p 80 -c 100 target.com

# Continuous (Ctrl+C to stop)
sudo hping3 -S -p 80 target.com
```

## Troubleshooting

### Permission denied

```bash
# Hping requires root
sudo hping3 -1 target.com

# Check capabilities
sudo getcap /usr/sbin/hping3
```

### No response received

```bash
# Increase timeout
sudo hping3 -S -p 80 -c 5 target.com

# Check if target is up
ping target.com

# Verify firewall not blocking
sudo iptables -L
```

### Interface issues

```bash
# Specify interface
sudo hping3 -S -p 80 -I eth0 target.com

# List interfaces
ip addr show
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **Only use on networks and systems you own or have written authorization to test**
- Unauthorized network scanning and testing is **illegal**
- DDoS testing without permission can result in criminal charges
- Always obtain explicit authorization before security testing

### Ethical usage

```bash
# Legitimate uses:
# - Testing your own firewall
# - Authorized penetration testing
# - Network troubleshooting
# - Security research in isolated lab

# Best practices:
# - Document authorization
# - Define scope of testing
# - Use responsible disclosure
# - Avoid production systems during business hours
```

## Quick Reference

### Common flags

```bash
-1            # ICMP mode
-2            # UDP mode
-S            # SYN flag
-A            # ACK flag
-F            # FIN flag
-R            # RST flag
-P            # PUSH flag
-U            # URG flag
-p <port>     # Destination port
-s <port>     # Source port
-a <ip>       # Spoof source IP
-t <ttl>      # Time to live
-c <count>    # Packet count
-i <interval> # Interval between packets
-d <size>     # Data size
-f            # Fragment packets
-w <size>     # Window size
-V            # Verbose
--flood       # Flood mode
--rand-source # Random source IP
--traceroute  # Traceroute mode
```

### Scan types

```bash
# SYN scan
sudo hping3 -S -p 80 target.com

# ACK scan
sudo hping3 -A -p 80 target.com

# FIN scan
sudo hping3 -F -p 80 target.com

# NULL scan
sudo hping3 -p 80 target.com

# Xmas scan
sudo hping3 -FPU -p 80 target.com
```

## Real-World Examples

### Diagnose network path

```bash
# TCP traceroute on port 443
sudo hping3 -S -p 443 --traceroute website.com

# Find MTU
sudo hping3 -S -p 80 -d 1500 -M dont website.com
```

### Test WAF effectiveness

```bash
# Normal request
sudo hping3 -S -p 80 -c 1 website.com

# Fragmented request
sudo hping3 -S -p 80 -f -c 1 website.com

# Different TTL
sudo hping3 -S -p 80 -t 64 -c 1 website.com
```

### Verify CDN behavior

```bash
# Multiple locations (run from different machines)
sudo hping3 -S -p 80 -c 10 cdn.website.com

# Compare TTL and RTT
```

## Resources

- [Hping official site](http://www.hping.org/)
- [Hping GitHub](https://github.com/antirez/hping)
- [Hping man page](https://linux.die.net/man/8/hping3)
- [TCP/IP packet structure](https://en.wikipedia.org/wiki/Internet_protocol_suite)

## Next Steps

- Learn Nmap for comprehensive port scanning
- Study TCP/IP protocol in depth
- Practice with Wireshark to see crafted packets
- Explore scapy for Python-based packet crafting
- Learn about firewalls and IDS/IPS systems
- Study network security fundamentals
