# Wireshark

## Introduction

## What is Wireshark?

Wireshark is the world's most popular network protocol analyzer. It lets you capture and interactively browse network traffic at a microscopic level, providing deep inspection of hundreds of protocols. Wireshark is used by network professionals, security experts, developers, and educators worldwide.

## Why Wireshark?

- Deep packet inspection and analysis
- Supports 2000+ network protocols
- Cross-platform (Windows, macOS, Linux)
- Live capture and offline analysis
- Powerful display filters
- Rich VoIP analysis
- Decryption capabilities (SSL/TLS with keys)
- Extensible with plugins
- Industry standard tool

## Learning Path

1. Understand basic networking concepts (TCP/IP, OSI model)
2. Learn packet structure and protocols
3. Practice basic packet capture
4. Master display and capture filters
5. Explore advanced analysis techniques

## User Guide

## Prerequisites

- Basic understanding of networking
- Administrator/root privileges (for packet capture)
- Network interface card

Verify installation:

```bash
wireshark --version
```

## Installation

### Windows

```powershell
# Download from official site
# https://www.wireshark.org/download.html

# Or using Chocolatey
choco install wireshark

# Install with Npcap (required for capture)
```

### macOS

```bash
# Using Homebrew
brew install --cask wireshark

# Or download DMG from official site
```

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install wireshark

# Add user to wireshark group (no sudo needed)
sudo usermod -aG wireshark $USER
# Logout and login again

# Or run with sudo
sudo wireshark
```

### RHEL/CentOS/Fedora

```bash
sudo yum install wireshark wireshark-gnome
# Or
sudo dnf install wireshark wireshark-qt
```

### Arch Linux

```bash
sudo pacman -S wireshark-qt
# Or
sudo pacman -S wireshark-cli
```

## Basic Usage

### Start capture

```
GUI:
1. Launch Wireshark
2. Select network interface (Ethernet, WiFi, etc.)
3. Click the blue shark fin icon to start capture
4. Click red square to stop
```

### Command-line capture (tshark)

```bash
# Capture on interface
sudo tshark -i eth0

# Capture to file
sudo tshark -i eth0 -w capture.pcap

# Capture specific number of packets
sudo tshark -i eth0 -c 100
```

### Open existing capture

```
File → Open → Select .pcap or .pcapng file
```

## Interface Overview

### Main window sections

```
1. Menu Bar: File, Edit, View, Go, Capture, Analyze, etc.
2. Main Toolbar: Quick access to common functions
3. Filter Toolbar: Display filter input
4. Packet List Pane: All captured packets
5. Packet Details Pane: Selected packet structure
6. Packet Bytes Pane: Raw packet data (hex/ASCII)
7. Status Bar: Capture statistics
```

## Capture Filters

### Syntax

```
Based on BPF (Berkeley Packet Filter)
Applied BEFORE capture (more efficient)
```

### Common capture filters

```bash
# Capture all traffic
# (no filter)

# Specific host
host 192.168.1.100

# Source or destination
src host 192.168.1.100
dst host 192.168.1.100

# Specific port
port 80
port 443

# Port range
portrange 1-1024

# Protocol
tcp
udp
icmp
arp

# Network
net 192.168.1.0/24
net 192.168.1.0 mask 255.255.255.0

# Combinations (AND, OR, NOT)
host 192.168.1.100 and port 80
tcp and port 443
not port 22
port 80 or port 443

# Examples
tcp port 80 and host 192.168.1.100
udp and (port 53 or port 67)
not broadcast and not multicast
```

## Display Filters

### Syntax

```
Applied AFTER capture (can be changed anytime)
More powerful than capture filters
Wireshark-specific syntax
```

### Common display filters

```
# Protocol filters
http
dns
tcp
udp
ssl
ssh

# IP address
ip.addr == 192.168.1.100
ip.src == 192.168.1.100
ip.dst == 192.168.1.100

# Port numbers
tcp.port == 80
tcp.dstport == 443
udp.port == 53

# HTTP specific
http.request
http.response
http.request.method == "GET"
http.request.method == "POST"
http.request.uri contains "login"
http.response.code == 200
http.response.code == 404

# TCP flags
tcp.flags.syn == 1
tcp.flags.ack == 1
tcp.flags.reset == 1

# String search
frame contains "password"
http contains "admin"

# Length filters
frame.len > 1000
tcp.len > 0

# Time filters
frame.time >= "2024-01-01 00:00:00"

# Combinations
ip.addr == 192.168.1.100 && tcp.port == 80
http && ip.src == 192.168.1.100
!(arp || icmp)
tcp.port == 80 || tcp.port == 443

# Complex examples
http.request && http.request.uri contains "api"
tcp.flags.syn == 1 && tcp.flags.ack == 0
ip.addr == 192.168.1.100 && (tcp.port == 80 || tcp.port == 443)
```

## Protocol Analysis

### HTTP Analysis

```
Display filter: http

View:
- HTTP requests (GET, POST, PUT, DELETE)
- Headers
- Response codes
- Cookies
- User-Agent strings

Follow HTTP Stream:
Right-click packet → Follow → HTTP Stream
```

### DNS Analysis

```
Display filter: dns

View:
- DNS queries
- DNS responses
- Record types (A, AAAA, MX, CNAME, etc.)
- Response times

Statistics → DNS
```

### TCP Analysis

```
Display filter: tcp

Features:
- TCP stream following
- Retransmissions
- Out-of-order packets
- Window scaling
- Sequence analysis

Analyze → Expert Information → TCP
```

### SSL/TLS Analysis

```
Display filter: ssl or tls

View:
- Handshake process
- Certificate information
- Cipher suites
- TLS versions

Decrypt with key:
Edit → Preferences → Protocols → TLS → RSA keys
```

## Advanced Features

### Following Streams

```
Right-click packet → Follow → [Protocol] Stream

Options:
- TCP Stream
- UDP Stream
- HTTP Stream
- TLS Stream

Shows complete conversation
```

### Statistics

```
Statistics Menu:

- Capture File Properties: File info
- Protocol Hierarchy: Protocol distribution
- Conversations: IP/TCP/UDP conversations
- Endpoints: Traffic by endpoint
- I/O Graph: Traffic over time
- HTTP: Request/response statistics
- DNS: Query statistics
```

### Expert Information

```
Analyze → Expert Information

Shows:
- Errors (red)
- Warnings (yellow)
- Notes (cyan)
- Chats (blue)

Categories:
- Checksum errors
- Retransmissions
- Connection issues
- Application errors
```

### Coloring Rules

```
View → Coloring Rules

Default colors:
- Light purple: TCP
- Light blue: UDP
- Black: Errors
- Green: HTTP
- Light green: DNS
- Dark yellow: Routing

Custom coloring rules:
View → Coloring Rules → New
```

### Time Display

```
View → Time Display Format

Options:
- Seconds Since Beginning of Capture
- Seconds Since Previous Captured Packet
- Time of Day
- UTC Time of Day
- Date and Time of Day
```

## Decryption

### SSL/TLS Decryption

```
Requirements:
- Private key or pre-master secret
- No perfect forward secrecy (for key-based)

Setup:
Edit → Preferences → Protocols → TLS
→ RSA keys list → Add

Fields:
- IP address
- Port
- Protocol (http, etc.)
- Key file path
```

### WPA/WPA2 Decryption

```
Edit → Preferences → Protocols → IEEE 802.11
→ Enable decryption
→ Decryption keys → Add

Enter:
- wpa-pwd: password:SSID
Or
- wpa-psk: 64-character hex key
```

## Command-Line Tools

### tshark (CLI Wireshark)

```bash
# Basic capture
tshark -i eth0

# Capture to file
tshark -i eth0 -w output.pcap

# Read file
tshark -r input.pcap

# Display filter
tshark -r input.pcap -Y "http"

# Field extraction
tshark -r input.pcap -T fields -e ip.src -e ip.dst -e tcp.port

# Statistics
tshark -r input.pcap -q -z io,stat,1

# Export objects
tshark -r input.pcap --export-objects http,output_dir
```

### dumpcap (Capture only)

```bash
# List interfaces
dumpcap -D

# Capture
dumpcap -i eth0 -w capture.pcap

# Multiple files (rotation)
dumpcap -i eth0 -b filesize:100000 -w capture.pcap
```

### editcap (Edit captures)

```bash
# Split by time
editcap -i 60 input.pcap output.pcap

# Select packet range
editcap -r input.pcap output.pcap 1-100

# Remove duplicates
editcap -d input.pcap output.pcap

# Change format
editcap -F pcapng input.pcap output.pcapng
```

### mergecap (Merge captures)

```bash
# Merge files
mergecap -w output.pcap file1.pcap file2.pcap file3.pcap

# Merge and sort by time
mergecap -w output.pcap -a file1.pcap file2.pcap
```

## Export Features

### Export objects

```
File → Export Objects → [Protocol]

Supported:
- HTTP
- SMB
- TFTP
- IMF (Email)

Saves files transferred over network
```

### Export packet dissections

```
File → Export Packet Dissections

Formats:
- Plain text
- CSV
- JSON
- XML
- PSML
- PDML
```

### Export specific packets

```
File → Export Specified Packets

Options:
- All packets
- Displayed packets (filtered)
- Marked packets
- Selected packet range
```

## Performance Tips

### Large capture files

```
# Use display filters instead of loading everything
# Disable protocol dissectors you don't need:
Analyze → Enabled Protocols

# Increase memory limit:
Edit → Preferences → Appearance → Layout
→ Packet list cached count

# Use command-line tools for very large files
tshark -r huge.pcap -Y "http" -w filtered.pcap
```

### Live capture optimization

```
# Use capture filters to reduce data
# Limit packet size:
-s snaplen (capture filter)

# Stop after X packets:
-c count

# Ring buffer (multiple files):
Capture → Options → Output → Create a new file automatically
```

## Common Use Cases

### Debug web application

```
1. Start capture on appropriate interface
2. Display filter: http
3. Look for:
   - HTTP errors (4xx, 5xx)
   - Slow responses
   - Failed requests
   - Cookie issues
4. Follow HTTP stream for details
```

### Analyze slow network

```
1. Capture traffic during slow period
2. Statistics → I/O Graph
3. Look for:
   - Packet loss (Expert Info)
   - Retransmissions
   - High latency (Time column)
4. Identify bandwidth hogs:
   Statistics → Conversations
```

### Security analysis

```
1. Capture suspicious traffic
2. Look for:
   - Unusual protocols
   - Unencrypted passwords
   - Malware indicators
   - Port scans (lots of SYN packets)
   - DNS tunneling
3. Use Expert Info for anomalies
```

### VoIP troubleshooting

```
1. Capture during call
2. Telephony → VoIP Calls
3. Analyze:
   - Codec information
   - Jitter
   - Packet loss
   - Call flow
4. Play audio: Telephony → RTP → Stream Analysis → Player
```

### Network discovery

```
1. Capture broadcast/multicast traffic
2. Filters:
   - arp
   - dhcp
   - dns
   - ssdp
   - mdns
3. Statistics → Endpoints
4. Map network devices
```

## Troubleshooting

### Permission denied

```bash
# Linux: Add user to wireshark group
sudo usermod -aG wireshark $USER
# Logout and login

# Or use sudo
sudo wireshark

# macOS: Install ChmodBPF
# Included with Wireshark installer
```

### No interfaces shown

```bash
# Windows: Install/reinstall Npcap
# https://npcap.com/

# Linux: Check permissions
ls -l /dev/net/tun

# Start Wireshark as root (temporary)
sudo wireshark
```

### Capture shows no packets

```bash
# Check interface is active
ip addr show
ifconfig

# Verify you're on correct interface
# Check for monitor/promiscuous mode (WiFi)

# Disable hardware offloading (Linux)
sudo ethtool -K eth0 gro off lro off
```

### Wireshark runs slowly

```bash
# Disable unnecessary protocols
Analyze → Enabled Protocols

# Reduce displayed packets
Use display filters

# Lower packet list cache
Edit → Preferences → Appearance
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **Only capture traffic on networks you own or have explicit permission to monitor**
- Packet capturing may be illegal without authorization
- Respect privacy and confidentiality
- Follow organizational policies
- Comply with data protection regulations (GDPR, etc.)

### Best practices

```
- Minimize capture scope
- Encrypt sensitive capture files
- Delete captures after analysis
- Don't capture passwords intentionally
- Use secure transfer methods for pcap files
- Follow incident response procedures
- Document authorization
```

## Keyboard Shortcuts

### Essential shortcuts

```
Ctrl+E / Cmd+E     - Start/Stop capture
Ctrl+K / Cmd+K     - Capture options
Ctrl+O / Cmd+O     - Open file
Ctrl+S / Cmd+S     - Save
Ctrl+F / Cmd+F     - Find packet
Ctrl+G / Cmd+G     - Go to packet
Ctrl+/ / Cmd+/     - Display filter
Ctrl+Shift+D       - Expert Information
F8                 - Next packet in conversation
F7                 - Previous packet
Ctrl+→             - Next packet
Ctrl+←             - Previous packet
```

## Quick Reference

### Display filter operators

```
==          - Equal
!=          - Not equal
>           - Greater than
<           - Less than
>=          - Greater than or equal
<=          - Less than or equal
contains    - Contains string
matches     - Regex match
&&          - Logical AND
||          - Logical OR
!           - Logical NOT
```

### Common protocols

```
HTTP/HTTPS  - http, tls, ssl
DNS         - dns
SMTP        - smtp
POP3        - pop
IMAP        - imap
FTP         - ftp, ftp-data
SSH         - ssh
Telnet      - telnet
DHCP        - dhcp, bootp
SMB         - smb, smb2
```

## Real-World Examples

### Capture credentials (for testing)

```
1. Start capture on interface
2. Display filter: http.request
3. Look for POST requests
4. Follow → HTTP Stream
5. Search for username/password fields
(Only on authorized test networks)
```

### Diagnose application issues

```
1. Reproduce issue while capturing
2. Filter by application protocol
3. Check for:
   - Error codes
   - Missing responses
   - Timeouts
4. Analyze timing between requests
```

### Verify encryption

```
1. Capture traffic during secure session
2. Check for:
   - TLS handshake
   - Encrypted data (appears random)
   - Certificate validation
3. Ensure no plaintext credentials
```

## Resources

- [Wireshark official site](https://www.wireshark.org/)
- [Wireshark User Guide](https://www.wireshark.org/docs/wsug_html_chunked/)
- [Display Filter Reference](https://www.wireshark.org/docs/dfref/)
- [Sample Captures](https://wiki.wireshark.org/SampleCaptures)
- [Wireshark Q&A](https://ask.wireshark.org/)
- [Wireshark University](https://www.wiresharktraining.com/)

## Next Steps

- Practice with sample capture files
- Learn common protocols in depth
- Study TCP/IP thoroughly
- Explore Wireshark plugins
- Learn about network security
- Obtain certifications (Wireshark Certified Network Analyst)
- Contribute to Wireshark development
- Master tshark for automation
