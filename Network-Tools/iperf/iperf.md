# iperf

## Introduction

## What is iperf?

iperf is a network performance measurement and tuning tool that tests maximum achievable bandwidth between two points. It supports TCP, UDP, and SCTP protocols and can measure throughput, jitter, packet loss, and other network metrics.

## Why iperf?

- Accurate bandwidth testing between two endpoints
- Tests both TCP and UDP performance
- Measures jitter and packet loss
- Client-server architecture for flexible testing
- Cross-platform support (Linux, Windows, macOS)
- Widely used industry standard

## Learning Path

1. Understand network performance concepts
2. Install iperf3 on client and server
3. Run basic throughput tests
4. Learn advanced testing scenarios
5. Interpret results and troubleshoot issues

## User Guide

## Prerequisites

- Two systems for testing (client and server)
- Network connectivity between systems
- Basic understanding of networking

Verify installation:

```bash
iperf3 --version
```

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install iperf3
```

### RHEL/CentOS/Fedora

```bash
sudo yum install iperf3
# Or on newer versions
sudo dnf install iperf3
```

### Arch Linux

```bash
sudo pacman -S iperf3
```

### macOS

```bash
brew install iperf3
```

### Windows

Download from [iperf.fr](https://iperf.fr/iperf-download.php) or use Chocolatey:

```powershell
choco install iperf3
```

## Basic Usage

### Start server

```bash
# On the server machine
iperf3 -s

# Server on specific port
iperf3 -s -p 5201

# Server in daemon mode
iperf3 -s -D

# Server with one-off mode (exit after one test)
iperf3 -s -1
```

### Run client test

```bash
# Basic test to server
iperf3 -c server_ip

# Examples
iperf3 -c 192.168.1.100
iperf3 -c example.com

# Test with specific port
iperf3 -c 192.168.1.100 -p 5201

# Test for specific duration (default is 10 seconds)
iperf3 -c 192.168.1.100 -t 30

# Test with specific number of bytes
iperf3 -c 192.168.1.100 -n 100M
```

## TCP Testing

### Basic TCP test

```bash
# Client: Run 10-second TCP test (default)
iperf3 -c 192.168.1.100

# Client: Run 30-second test
iperf3 -c 192.168.1.100 -t 30

# Client: Transfer specific amount
iperf3 -c 192.168.1.100 -n 1G
```

### Parallel streams

```bash
# Run with 5 parallel streams
iperf3 -c 192.168.1.100 -P 5

# Run with 10 parallel streams for 60 seconds
iperf3 -c 192.168.1.100 -P 10 -t 60
```

### Reverse mode (server sends)

```bash
# Normal: client sends, server receives
iperf3 -c 192.168.1.100

# Reverse: server sends, client receives
iperf3 -c 192.168.1.100 -R
```

### Bidirectional test

```bash
# Test both directions simultaneously
iperf3 -c 192.168.1.100 --bidir

# Bidirectional with parallel streams
iperf3 -c 192.168.1.100 --bidir -P 5
```

### Set window size

```bash
# Set TCP window size
iperf3 -c 192.168.1.100 -w 32K

# Set window size to 256KB
iperf3 -c 192.168.1.100 -w 256K

# Set window size to 1MB
iperf3 -c 192.168.1.100 -w 1M
```

## UDP Testing

### Basic UDP test

```bash
# UDP test with 1 Mbps bandwidth
iperf3 -c 192.168.1.100 -u -b 1M

# UDP test with 100 Mbps bandwidth
iperf3 -c 192.168.1.100 -u -b 100M

# UDP test with 1 Gbps bandwidth
iperf3 -c 192.168.1.100 -u -b 1G
```

### UDP packet size

```bash
# Set packet length to 1400 bytes
iperf3 -c 192.168.1.100 -u -b 10M -l 1400

# Test with 512 byte packets
iperf3 -c 192.168.1.100 -u -b 10M -l 512
```

### UDP with parallel streams

```bash
# 5 parallel UDP streams at 10 Mbps each
iperf3 -c 192.168.1.100 -u -b 10M -P 5
```

## Output and Formatting

### Different output formats

```bash
# JSON output
iperf3 -c 192.168.1.100 -J

# Save JSON to file
iperf3 -c 192.168.1.100 -J > results.json

# Logfile
iperf3 -c 192.168.1.100 --logfile results.txt

# Get results in specific interval
iperf3 -c 192.168.1.100 -i 1  # Report every 1 second
iperf3 -c 192.168.1.100 -i 5  # Report every 5 seconds
```

### Customize output

```bash
# Show detailed output
iperf3 -c 192.168.1.100 -V

# Omit detailed output (show only summary)
iperf3 -c 192.168.1.100 -O 5  # Omit first 5 seconds

# Timestamps
iperf3 -c 192.168.1.100 --timestamps
```

## Advanced Options

### Bandwidth limits

```bash
# Limit bandwidth to 10 Mbps
iperf3 -c 192.168.1.100 -b 10M

# Limit bandwidth to 100 Mbps (TCP)
iperf3 -c 192.168.1.100 -b 100M

# Note: For TCP, this limits sending rate
# For UDP, this sets target bandwidth
```

### IP version and binding

```bash
# Force IPv4
iperf3 -c 192.168.1.100 -4

# Force IPv6
iperf3 -c 2001:db8::1 -6

# Bind to specific interface/IP
iperf3 -c 192.168.1.100 -B 192.168.1.50
```

### Buffer size

```bash
# Set send/receive buffer size
iperf3 -c 192.168.1.100 -w 256K

# Different send and receive buffers
# Requires advanced socket options
```

### TCP options

```bash
# Set TCP no delay (disable Nagle's algorithm)
iperf3 -c 192.168.1.100 -N

# Set TCP maximum segment size (MSS)
iperf3 -c 192.168.1.100 -M 1400

# Set TCP congestion control algorithm (Linux)
iperf3 -c 192.168.1.100 -C cubic
iperf3 -c 192.168.1.100 -C reno
```

### Authentication

```bash
# Server with authentication
iperf3 -s --rsa-private-key-path server.pem --authorized-users-path users.csv

# Client with authentication
iperf3 -c 192.168.1.100 --username user1 --rsa-public-key-path server.pub
```

## Common Use Cases

### Test local network speed

```bash
# Server
iperf3 -s

# Client (bidirectional test)
iperf3 -c 192.168.1.100 --bidir -t 30
```

### Test internet connection

```bash
# Server (on internet-facing machine)
iperf3 -s

# Client (from local machine)
iperf3 -c public.ip.address -t 60

# Test download speed (server sends)
iperf3 -c public.ip.address -R
```

### Test WiFi performance

```bash
# Client test with multiple streams
iperf3 -c 192.168.1.100 -P 5 -t 60

# UDP test to check packet loss
iperf3 -c 192.168.1.100 -u -b 50M -t 30
```

### Test VPN throughput

```bash
# Before VPN
iperf3 -c remote.server -t 30

# After VPN connection
iperf3 -c remote.server -t 30

# Compare results
```

### Test firewall/NAT performance

```bash
# Test through firewall
iperf3 -c firewall.ip -p 5201 -t 60

# Test multiple ports
iperf3 -c firewall.ip -p 5201
iperf3 -c firewall.ip -p 5202
```

### Test QoS/traffic shaping

```bash
# Test without QoS
iperf3 -c 192.168.1.100 -b 100M

# Enable QoS, then test again
iperf3 -c 192.168.1.100 -b 100M

# Use different DSCP values
iperf3 -c 192.168.1.100 -S 0x10  # Set TOS byte
```

## Interpreting Results

### TCP results

```
- Interval: Time period for measurement
- Transfer: Amount of data transferred
- Bandwidth: Throughput in bits/sec
- Retr: Number of retransmissions (higher = network issues)
- Cwnd: Congestion window size
```

### UDP results

```
- Transfer: Amount of data sent
- Bandwidth: Throughput attempted
- Jitter: Variation in packet arrival time (lower is better)
- Lost/Total: Packet loss (should be 0% ideally)
```

### Example output analysis

```bash
[ ID] Interval           Transfer     Bandwidth       Retr
[  5]   0.00-10.00  sec  1.09 GBytes   941 Mbits/sec    0    sender
[  5]   0.00-10.00  sec  1.09 GBytes   940 Mbits/sec         receiver

# Good: High bandwidth, no retransmissions
# Network is performing well
```

```bash
[ ID] Interval           Transfer     Bandwidth       Jitter    Lost/Total Datagrams
[  5]   0.00-10.00  sec   114 MBytes  95.5 Mbits/sec  0.015 ms  0/14000 (0%)

# Good: Low jitter, no packet loss
# Network is stable for UDP
```

## Troubleshooting

### Cannot connect to server

```bash
# Check if server is running
ps aux | grep iperf

# Check firewall
sudo iptables -L | grep 5201
sudo firewall-cmd --list-all

# Allow iperf port
sudo ufw allow 5201/tcp
sudo firewall-cmd --add-port=5201/tcp --permanent
sudo firewall-cmd --reload
```

### Low bandwidth results

```bash
# Check for retransmissions
iperf3 -c 192.168.1.100 -t 30

# Try increasing window size
iperf3 -c 192.168.1.100 -w 512K

# Try parallel streams
iperf3 -c 192.168.1.100 -P 5

# Check CPU usage on both ends
top
```

### High jitter or packet loss (UDP)

```bash
# Reduce bandwidth target
iperf3 -c 192.168.1.100 -u -b 10M

# Check network path
traceroute 192.168.1.100
mtr 192.168.1.100

# Test different packet sizes
iperf3 -c 192.168.1.100 -u -b 10M -l 512
```

### Server busy error

```bash
# Server is handling another test
# Wait for it to complete or use:

# Server with one-off mode (restarts after each test)
iperf3 -s -1
```

## Scripting and Automation

### Automated testing script

```bash
#!/bin/bash
# Test multiple scenarios

SERVER="192.168.1.100"
RESULTS_DIR="iperf_results"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$RESULTS_DIR"

# TCP test
echo "Running TCP test..."
iperf3 -c $SERVER -t 30 -J > "$RESULTS_DIR/tcp_${TIMESTAMP}.json"

# TCP parallel
echo "Running TCP parallel test..."
iperf3 -c $SERVER -P 5 -t 30 -J > "$RESULTS_DIR/tcp_parallel_${TIMESTAMP}.json"

# UDP test
echo "Running UDP test..."
iperf3 -c $SERVER -u -b 100M -t 30 -J > "$RESULTS_DIR/udp_${TIMESTAMP}.json"

# Bidirectional
echo "Running bidirectional test..."
iperf3 -c $SERVER --bidir -t 30 -J > "$RESULTS_DIR/bidir_${TIMESTAMP}.json"

echo "Tests complete. Results in $RESULTS_DIR"
```

### Parse JSON results

```bash
#!/bin/bash
# Extract bandwidth from JSON results

JSON_FILE="results.json"

# Get final TCP bandwidth
jq '.end.sum_received.bits_per_second / 1000000' "$JSON_FILE"

# Get UDP packet loss percentage
jq '.end.sum.lost_percent' "$JSON_FILE"

# Get jitter
jq '.end.sum.jitter_ms' "$JSON_FILE"
```

### Continuous monitoring

```bash
#!/bin/bash
# Run iperf tests every hour

SERVER="192.168.1.100"
LOG_FILE="/var/log/iperf-monitor.log"

while true; do
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
    RESULT=$(iperf3 -c $SERVER -t 10 2>&1 | grep "sender")
    echo "[$TIMESTAMP] $RESULT" >> "$LOG_FILE"
    sleep 3600  # Wait 1 hour
done
```

## Performance Tuning

### Optimize TCP performance

```bash
# Increase TCP buffer sizes (Linux)
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728
sudo sysctl -w net.ipv4.tcp_rmem='4096 87380 134217728'
sudo sysctl -w net.ipv4.tcp_wmem='4096 65536 134217728'

# Test with optimized settings
iperf3 -c 192.168.1.100 -w 32M -P 5
```

### Optimize for 10Gbps+

```bash
# Use parallel streams
iperf3 -c 192.168.1.100 -P 10 -t 60

# Increase window size
iperf3 -c 192.168.1.100 -w 4M -P 10

# Disable CPU frequency scaling
sudo cpupower frequency-set -g performance
```

## Server Management

### Run server as systemd service

```bash
# Create service file
sudo nano /etc/systemd/system/iperf3.service
```

```ini
[Unit]
Description=iperf3 server
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/iperf3 -s
Restart=always
User=iperf3
Group=iperf3

[Install]
WantedBy=multi-user.target
```

```bash
# Create user
sudo useradd -r -s /bin/false iperf3

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable iperf3
sudo systemctl start iperf3

# Check status
sudo systemctl status iperf3
```

### Multiple server instances

```bash
# Run servers on different ports
iperf3 -s -p 5201 &
iperf3 -s -p 5202 &
iperf3 -s -p 5203 &

# Test different ports
iperf3 -c 192.168.1.100 -p 5201
iperf3 -c 192.168.1.100 -p 5202
```

## Quick Reference

### Essential server options

```bash
-s                # Run in server mode
-p <port>         # Server port (default 5201)
-D                # Run as daemon
-1                # One-off mode (exit after test)
-4/-6             # IPv4/IPv6 only
```

### Essential client options

```bash
-c <host>         # Connect to server
-t <time>         # Time in seconds (default 10)
-n <bytes>        # Number of bytes to transmit
-P <num>          # Number of parallel streams
-R                # Reverse mode (server sends)
-b <bandwidth>    # Target bandwidth (UDP or TCP)
-u                # UDP mode
-w <size>         # Window size
-J                # JSON output
-i <interval>     # Report interval
```

## Real-World Examples

### Diagnose slow file transfers

```bash
# Before optimization
iperf3 -c fileserver.local -t 60

# Test with parallel streams
iperf3 -c fileserver.local -P 5 -t 60

# Adjust based on results
```

### Validate network upgrade

```bash
# Before upgrade (1Gbps)
iperf3 -c 192.168.1.100 -t 30 -P 5

# After upgrade (10Gbps)
iperf3 -c 192.168.1.100 -t 30 -P 10 -w 4M

# Compare results
```

### Test cloud instance network

```bash
# Between cloud instances
iperf3 -c instance2.region.cloud.com -t 60 --bidir

# To internet (reverse mode for download)
iperf3 -c speedtest.server.com -R -t 30
```

### Verify SD-WAN performance

```bash
# Test primary path
iperf3 -c remote.site1 -t 60 -J > primary.json

# Test backup path
iperf3 -c remote.site2 -t 60 -J > backup.json

# Compare paths
```

## Resources

- [iperf3 official site](https://iperf.fr/)
- [iperf3 documentation](https://iperf.fr/iperf-doc.php)
- [iperf3 GitHub](https://github.com/esnet/iperf)
- [Public iperf3 servers](https://iperf.fr/iperf-servers.php)

## Next Steps

- Learn about TCP/IP performance tuning
- Explore network monitoring tools (iftop, nethogs)
- Study packet analysis with tcpdump/Wireshark
- Set up automated network testing
- Learn about QoS and traffic shaping
