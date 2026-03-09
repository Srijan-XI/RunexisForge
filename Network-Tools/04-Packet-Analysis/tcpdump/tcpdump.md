# tcpdump

## Introduction

## What is tcpdump?

tcpdump is a powerful command-line packet analyzer that captures and displays network packets transmitted or received over a network interface. It's one of the most widely used network troubleshooting and security analysis tools.

## Why tcpdump?

- Lightweight and available on most Unix-like systems
- Powerful packet filtering capabilities
- Real-time packet capture and analysis
- Can save packets to files for later analysis
- Essential for network debugging and security analysis

## Learning Path

1. Understand basic packet capture concepts
2. Learn tcpdump filter syntax
3. Practice capturing and analyzing traffic
4. Master advanced filtering techniques
5. Integrate with other analysis tools (Wireshark)

## User Guide

## Prerequisites

- Linux/Unix system (most distributions include tcpdump)
- Root or sudo privileges (required for packet capture)
- Basic understanding of networking protocols

Verify installation:

```bash
tcpdump --version
```

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install tcpdump
```

### RHEL/CentOS/Fedora

```bash
sudo yum install tcpdump
# Or on newer versions
sudo dnf install tcpdump
```

### macOS

```bash
# Usually pre-installed
# Or via Homebrew
brew install tcpdump
```

## Basic Usage

### Capture all traffic

```bash
sudo tcpdump
```

### Capture on specific interface

```bash
# List available interfaces
tcpdump -D

# Capture on eth0
sudo tcpdump -i eth0

# Capture on any interface
sudo tcpdump -i any
```

### Limit number of packets

```bash
# Capture only 10 packets
sudo tcpdump -c 10
```

### Display in ASCII

```bash
# Show packet data in ASCII
sudo tcpdump -A

# Show packet data in hex and ASCII
sudo tcpdump -XX
```

## Filtering Traffic

### By host

```bash
# Traffic to/from specific host
sudo tcpdump host 192.168.1.100

# Traffic from specific host
sudo tcpdump src host 192.168.1.100

# Traffic to specific host
sudo tcpdump dst host 192.168.1.100
```

### By port

```bash
# Traffic on port 80
sudo tcpdump port 80

# Source port 80
sudo tcpdump src port 80

# Destination port 443
sudo tcpdump dst port 443

# Port range
sudo tcpdump portrange 1-1024
```

### By protocol

```bash
# TCP traffic only
sudo tcpdump tcp

# UDP traffic only
sudo tcpdump udp

# ICMP traffic (ping)
sudo tcpdump icmp

# ARP traffic
sudo tcpdump arp
```

### By network

```bash
# Traffic from subnet
sudo tcpdump net 192.168.1.0/24

# Traffic from source network
sudo tcpdump src net 192.168.1.0/24
```

## Complex Filters

### Combining filters with AND

```bash
# HTTP traffic from specific host
sudo tcpdump host 192.168.1.100 and port 80

# TCP traffic on eth0 from subnet
sudo tcpdump -i eth0 tcp and src net 192.168.1.0/24
```

### Using OR

```bash
# Traffic on port 80 or 443
sudo tcpdump port 80 or port 443

# HTTP or DNS traffic
sudo tcpdump port 80 or port 53
```

### Using NOT

```bash
# All traffic except SSH
sudo tcpdump not port 22

# All traffic except from specific host
sudo tcpdump not host 192.168.1.100
```

### Complex combinations

```bash
# HTTP or HTTPS traffic from specific subnet, but not from one host
sudo tcpdump '(port 80 or port 443) and src net 192.168.1.0/24 and not host 192.168.1.50'

# SYN packets (TCP connection attempts)
sudo tcpdump 'tcp[tcpflags] & (tcp-syn) != 0'
```

## Saving and Reading Captures

### Save to file

```bash
# Save to pcap file
sudo tcpdump -w capture.pcap

# Save with timestamp in filename
sudo tcpdump -w capture-$(date +%Y%m%d-%H%M%S).pcap

# Rotate files by size (100MB each)
sudo tcpdump -w capture.pcap -C 100

# Rotate files by count (keep only 5 files)
sudo tcpdump -w capture.pcap -C 100 -W 5
```

### Read from file

```bash
# Read captured file
tcpdump -r capture.pcap

# Read with specific filter
tcpdump -r capture.pcap port 80

# Read and display in ASCII
tcpdump -r capture.pcap -A
```

## Advanced Usage

### Verbose output levels

```bash
# Verbose
sudo tcpdump -v

# More verbose
sudo tcpdump -vv

# Most verbose
sudo tcpdump -vvv
```

### Packet size control

```bash
# Capture only first 96 bytes of each packet
sudo tcpdump -s 96

# Capture full packets
sudo tcpdump -s 0

# Use default snapshot length
sudo tcpdump -s 262144
```

### Timestamps

```bash
# Print absolute timestamps
sudo tcpdump -tttt

# Print delta time between packets
sudo tcpdump -ttt

# Microsecond precision
sudo tcpdump -tttt --micro
```

### DNS resolution

```bash
# Don't resolve hostnames (faster)
sudo tcpdump -n

# Don't resolve hostnames or ports
sudo tcpdump -nn

# Don't resolve hostnames, show ethernet addresses
sudo tcpdump -ne
```

## Common Use Cases

### Capture HTTP traffic

```bash
# Basic HTTP capture
sudo tcpdump -i eth0 -A port 80

# HTTP with host headers
sudo tcpdump -i eth0 -A 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'
```

### Capture DNS queries

```bash
# All DNS traffic
sudo tcpdump -i eth0 port 53

# DNS queries only
sudo tcpdump -i eth0 'udp port 53'

# Verbose DNS
sudo tcpdump -i eth0 -vv port 53
```

### Debug SSH connections

```bash
# Capture SSH traffic
sudo tcpdump -i eth0 port 22 -vv

# Watch SSH connection attempts
sudo tcpdump -i eth0 'tcp port 22 and tcp[tcpflags] & (tcp-syn) != 0'
```

### Monitor network interface

```bash
# Continuous monitoring with line buffering
sudo tcpdump -i eth0 -l | tee capture.txt

# Monitor specific traffic pattern
sudo tcpdump -i eth0 -n 'icmp or arp' -v
```

### Capture email traffic

```bash
# SMTP traffic
sudo tcpdump -i eth0 port 25 -A

# IMAP traffic
sudo tcpdump -i eth0 port 143 -A

# POP3 traffic
sudo tcpdump -i eth0 port 110 -A
```

## Integration with Other Tools

### Pipe to Wireshark

```bash
# On remote system
ssh user@remote 'sudo tcpdump -i eth0 -U -w -' | wireshark -k -i -

# Save and analyze later
sudo tcpdump -w - | wireshark -k -i -
```

### Pipe to grep

```bash
# Search for specific pattern
sudo tcpdump -i eth0 -A | grep -i 'user-agent'

# Count SYN packets
sudo tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn) != 0' | wc -l
```

### With tshark

```bash
# Capture with tcpdump, analyze with tshark
sudo tcpdump -w capture.pcap
tshark -r capture.pcap
```

## Performance Optimization

### Reduce overhead

```bash
# Disable DNS resolution
sudo tcpdump -n

# Use specific buffer size
sudo tcpdump -B 4096

# Capture only headers
sudo tcpdump -s 68

# Use faster filters
sudo tcpdump -i eth0 'tcp and port 80' # Better than 'tcp port 80'
```

### High-speed capture

```bash
# Increase buffer size for high traffic
sudo tcpdump -B 32768 -w capture.pcap

# Use multiple files
sudo tcpdump -C 100 -W 10 -w capture.pcap
```

## Security Considerations

### Permissions

```bash
# Grant capture capabilities to user (Linux)
sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump

# Create dedicated group
sudo groupadd pcap
sudo usermod -a -G pcap $USER
sudo chgrp pcap /usr/sbin/tcpdump
sudo chmod 750 /usr/sbin/tcpdump
```

### Privacy

- Be aware of sensitive data in captures (passwords, tokens)
- Encrypt or secure capture files
- Follow organizational security policies
- Comply with legal requirements for packet capture

### Best practices

```bash
# Use specific filters to minimize data
sudo tcpdump -i eth0 'port 80 or port 443'

# Rotate files automatically
sudo tcpdump -C 100 -W 5 -w capture.pcap

# Capture only necessary data
sudo tcpdump -s 96 -w capture.pcap  # Headers only
```

## Troubleshooting

### Common issues

```bash
# Permission denied
# Solution: Use sudo or grant capabilities

# No suitable device found
# Check interface names
ip link show
# Or
tcpdump -D

# Packet loss
# Increase buffer size
sudo tcpdump -B 32768

# Too much output
# Use more specific filters
sudo tcpdump -n 'host 192.168.1.100 and port 80'
```

## Quick Reference

### Essential options

```bash
-i <interface>    # Specify interface
-c <count>        # Capture N packets
-w <file>         # Write to file
-r <file>         # Read from file
-n                # Don't resolve names
-v/-vv/-vvv       # Verbosity levels
-A                # Print in ASCII
-X                # Print in hex and ASCII
-s <size>         # Snapshot length
-C <size>         # File size before rotation (MB)
-W <count>        # Number of files for rotation
```

### Filter expressions

```bash
host <ip>         # Traffic to/from host
port <num>        # Traffic on port
src/dst           # Direction modifiers
net <cidr>        # Network traffic
tcp/udp/icmp      # Protocol filters
and/or/not        # Logical operators
```

## Real-World Examples

### Debugging slow website

```bash
# Capture HTTP traffic to analyze delays
sudo tcpdump -i eth0 -s 0 -A 'tcp port 80 and host website.com' -w debug.pcap
```

### Detecting port scan

```bash
# Watch for SYN packets without ACK response
sudo tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn) != 0 and tcp[tcpflags] & (tcp-ack) == 0'
```

### Monitor database traffic

```bash
# MySQL traffic
sudo tcpdump -i eth0 port 3306 -w mysql.pcap

# PostgreSQL traffic
sudo tcpdump -i eth0 port 5432 -w postgres.pcap
```

### Capture DHCP traffic

```bash
sudo tcpdump -i eth0 -n port 67 or port 68
```

## Resources

- [tcpdump man page](https://www.tcpdump.org/manpages/tcpdump.1.html)
- [tcpdump official site](https://www.tcpdump.org/)
- [Berkeley Packet Filter (BPF) syntax](https://biot.com/capstats/bpf.html)
- [Sample captures](https://wiki.wireshark.org/SampleCaptures)

## Next Steps

- Learn Wireshark for GUI-based packet analysis
- Study BPF filter syntax in depth
- Practice with real network scenarios
- Explore tshark for scriptable analysis
- Learn about network protocols (TCP/IP, HTTP, DNS, etc.)
