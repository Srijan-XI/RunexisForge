# Airmon-ng

## Introduction

## What is Airmon-ng?

Airmon-ng is a script from the Aircrack-ng suite that enables and disables monitor mode on wireless interfaces. Monitor mode allows a wireless network interface to monitor all traffic received from the wireless network, which is essential for wireless security auditing and penetration testing.

## Why Airmon-ng?

- Essential for wireless security testing
- Enables monitor mode on WiFi adapters
- Kills interfering processes automatically
- Widely compatible with various chipsets
- Part of the comprehensive Aircrack-ng suite
- Cross-platform support

## Learning Path

1. Understand wireless networking basics (802.11)
2. Learn about monitor mode vs managed mode
3. Choose compatible wireless adapter
4. Practice enabling/disabling monitor mode
5. Integrate with other Aircrack-ng tools

## User Guide

## Prerequisites

- Linux system (Kali Linux recommended)
- Compatible wireless adapter with monitor mode support
- Root/sudo privileges
- Basic understanding of wireless networking
- **Legal authorization** for wireless testing

Check if airmon-ng is installed:

```bash
airmon-ng --help
```

## Installation

### Kali Linux

```bash
# Usually pre-installed
# If not:
sudo apt update
sudo apt install aircrack-ng
```

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install aircrack-ng
```

### RHEL/CentOS/Fedora

```bash
sudo yum install aircrack-ng
# Or
sudo dnf install aircrack-ng
```

### Arch Linux

```bash
sudo pacman -S aircrack-ng
```

### macOS

```bash
# Install via Homebrew
brew install aircrack-ng

# Note: macOS wireless drivers may not support monitor mode
# Consider using Linux VM or dedicated Linux system
```

## Compatible Wireless Adapters

### Recommended chipsets

```
Atheros AR9271    # TP-Link TL-WN722N v1, Alfa AWUS036NHA
Ralink RT3070     # Alfa AWUS036NH
Ralink RT3572     # Alfa AWUS051NH
Ralink RT5572     # Alfa AWUS051NH v2
Atheros AR9170    # TP-Link TL-WN821N v3
Realtek RTL8187L  # Alfa AWUS036H
Realtek RTL8812AU # Alfa AWUS036ACH
MediaTek MT7601U  # Various USB adapters
```

### Check adapter compatibility

```bash
# List wireless interfaces
airmon-ng

# Check driver support
lsusb
lsmod | grep -E "rt2800|rt73|rtl8187|ath9k|carl9170"

# Verify monitor mode capability
iw list | grep -A 10 "Supported interface modes"
```

## Basic Usage

### Check wireless interfaces

```bash
# List all wireless interfaces
airmon-ng

# Output shows:
# PHY     Interface    Driver        Chipset
# phy0    wlan0        ath9k         Qualcomm Atheros AR9271
```

### Enable monitor mode

```bash
# Enable monitor mode on interface
sudo airmon-ng start wlan0

# Interface will be renamed (usually to wlan0mon or mon0)
```

### Check monitor mode status

```bash
# List interfaces again
airmon-ng

# Monitor interface will be shown
iwconfig
```

### Disable monitor mode

```bash
# Stop monitor mode
sudo airmon-ng stop wlan0mon

# Interface returns to managed mode (wlan0)
```

## Managing Interfering Processes

### Check for interfering processes

```bash
# Airmon-ng will warn about processes that may interfere
sudo airmon-ng check

# Common interfering processes:
# - NetworkManager
# - wpa_supplicant
# - dhclient
# - avahi-daemon
```

### Kill interfering processes

```bash
# Automatically kill interfering processes
sudo airmon-ng check kill

# This stops:
# - NetworkManager
# - wpa_supplicant
# - dhclient
# And other processes that might interfere
```

### Restart network services after testing

```bash
# Restart NetworkManager
sudo systemctl start NetworkManager

# Or
sudo service network-manager start

# Restart wpa_supplicant if needed
sudo systemctl start wpa_supplicant
```

## Advanced Usage

### Enable monitor mode on specific channel

```bash
# Enable monitor mode and set channel
sudo airmon-ng start wlan0 6

# Or use iw/iwconfig after enabling
sudo airmon-ng start wlan0
sudo iw dev wlan0mon set channel 6
```

### Check current channel

```bash
# Using iwconfig
iwconfig wlan0mon

# Using iw
iw dev wlan0mon info
```

### Change channel while in monitor mode

```bash
# Using iw (preferred)
sudo iw dev wlan0mon set channel 11

# Using iwconfig
sudo iwconfig wlan0mon channel 1
```

### Set channel width

```bash
# Set 20MHz channel width
sudo iw dev wlan0mon set channel 6 HT20

# Set 40MHz channel width
sudo iw dev wlan0mon set channel 6 HT40+
sudo iw dev wlan0mon set channel 6 HT40-
```

## Troubleshooting

### Interface not showing up

```bash
# Check if wireless card is detected
lsusb | grep -i wireless
lspci | grep -i wireless

# Check if drivers are loaded
lsmod | grep -E "ath|rt|rtl"

# Try reloading drivers
sudo modprobe -r rtl8187  # Example for Realtek
sudo modprobe rtl8187
```

### Monitor mode not working

```bash
# Check if adapter supports monitor mode
iw list | grep -A 10 "Supported interface modes"

# Should show "monitor" in the list

# Try manual method
sudo ip link set wlan0 down
sudo iw dev wlan0 set type monitor
sudo ip link set wlan0 up
```

### Adapter keeps disconnecting

```bash
# Disable power management
sudo iwconfig wlan0 power off

# Or permanently in /etc/NetworkManager/conf.d/
sudo nano /etc/NetworkManager/conf.d/default-wifi-powersave-on.conf
```

Add:
```
[connection]
wifi.powersave = 2
```

### "Device or resource busy" error

```bash
# Kill processes using the interface
sudo airmon-ng check kill

# Manually stop NetworkManager
sudo systemctl stop NetworkManager

# Bring interface down
sudo ip link set wlan0 down
```

### Firmware issues

```bash
# Check dmesg for firmware errors
dmesg | grep firmware
dmesg | tail -50

# Install firmware packages
sudo apt install firmware-atheros
sudo apt install firmware-ralink
sudo apt install firmware-realtek

# Reload drivers after firmware install
sudo modprobe -r <driver_name>
sudo modprobe <driver_name>
```

## Integration with Aircrack-ng Suite

### Capture handshakes

```bash
# 1. Enable monitor mode
sudo airmon-ng start wlan0

# 2. Scan for networks
sudo airodump-ng wlan0mon

# 3. Capture specific network
sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon

# 4. Deauth to capture handshake (in new terminal)
sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon
```

### Network scanning

```bash
# Enable monitor mode
sudo airmon-ng start wlan0

# Scan all channels
sudo airodump-ng wlan0mon

# Scan specific channel
sudo airodump-ng -c 11 wlan0mon

# Save to file
sudo airodump-ng -w scan_results wlan0mon
```

### Packet injection testing

```bash
# Enable monitor mode
sudo airmon-ng start wlan0

# Test injection
sudo aireplay-ng --test wlan0mon

# Test against specific AP
sudo aireplay-ng --test -a AA:BB:CC:DD:EE:FF wlan0mon
```

## Channel Management

### Available channels

```bash
# 2.4 GHz channels (varies by region)
# US: 1-11
# Europe: 1-13
# Japan: 1-14

# 5 GHz channels
# 36, 40, 44, 48 (UNII-1)
# 52, 56, 60, 64 (UNII-2)
# 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140 (UNII-2e)
# 149, 153, 157, 161, 165 (UNII-3)
```

### Channel hopping

```bash
# Let airodump-ng handle channel hopping
sudo airodump-ng wlan0mon

# Hop only on specific channels
sudo airodump-ng --channel 1,6,11 wlan0mon

# Hop on 5GHz
sudo airodump-ng --band a wlan0mon

# Both 2.4GHz and 5GHz
sudo airodump-ng --band abg wlan0mon
```

## Scripting and Automation

### Automated setup script

```bash
#!/bin/bash
# Setup wireless adapter for monitoring

INTERFACE="wlan0"

echo "[*] Checking for interfering processes..."
sudo airmon-ng check kill

echo "[*] Enabling monitor mode on $INTERFACE..."
sudo airmon-ng start $INTERFACE

echo "[*] Monitor mode enabled!"
airmon-ng

echo "[*] Starting network scan..."
sudo airodump-ng ${INTERFACE}mon
```

### Cleanup script

```bash
#!/bin/bash
# Restore wireless adapter to managed mode

MON_INTERFACE="wlan0mon"

echo "[*] Stopping monitor mode..."
sudo airmon-ng stop $MON_INTERFACE

echo "[*] Restarting NetworkManager..."
sudo systemctl start NetworkManager

echo "[*] Wireless adapter restored to managed mode"
iwconfig
```

### Automated channel scan script

```bash
#!/bin/bash
# Scan all channels and save results

INTERFACE="wlan0mon"
OUTPUT_DIR="scans"
DURATION=60

mkdir -p $OUTPUT_DIR

for channel in {1..11}; do
    echo "[*] Scanning channel $channel for ${DURATION}s..."
    timeout $DURATION sudo airodump-ng -c $channel \
        -w ${OUTPUT_DIR}/channel_${channel} \
        $INTERFACE --output-format csv
done

echo "[*] Scan complete. Results in $OUTPUT_DIR/"
```

## Common Use Cases

### Security audit of wireless network

```bash
# 1. Enable monitor mode
sudo airmon-ng start wlan0

# 2. Scan for networks
sudo airodump-ng wlan0mon

# 3. Identify target network
# Note BSSID and channel

# 4. Capture traffic
sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w audit wlan0mon
```

### Test wireless security

```bash
# Enable monitor mode
sudo airmon-ng start wlan0

# Test WPS
sudo reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv

# Test WPA/WPA2
sudo airmon-ng start wlan0
sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon
sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon
```

### Wireless packet analysis

```bash
# Enable monitor mode
sudo airmon-ng start wlan0

# Capture packets
sudo airodump-ng -w packets wlan0mon

# Analyze with Wireshark
wireshark packets-01.cap
```

### Site survey

```bash
# Enable monitor mode
sudo airmon-ng start wlan0

# Continuous scan
sudo airodump-ng wlan0mon

# Or with GPS coordinates (if supported)
sudo airodump-ng --gpsd wlan0mon
```

## Multiple Wireless Adapters

### Manage multiple adapters

```bash
# List all wireless interfaces
airmon-ng

# Enable monitor mode on specific adapters
sudo airmon-ng start wlan0
sudo airmon-ng start wlan1

# Use different adapters for different tasks
# Adapter 1: Scanning
sudo airodump-ng wlan0mon

# Adapter 2: Injection
sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan1mon
```

## Best Practices

### Before starting

```bash
# 1. Check compatibility
airmon-ng

# 2. Update system
sudo apt update && sudo apt upgrade

# 3. Check for interfering processes
sudo airmon-ng check

# 4. Kill interfering processes
sudo airmon-ng check kill
```

### During operation

```bash
# Monitor for errors
dmesg -w

# Check interface status periodically
iwconfig wlan0mon

# Verify channel settings
iw dev wlan0mon info
```

### After testing

```bash
# 1. Stop monitor mode
sudo airmon-ng stop wlan0mon

# 2. Restart network services
sudo systemctl start NetworkManager

# 3. Reconnect to network
nmcli device wifi connect <SSID> password <password>
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **Only test networks you own or have written authorization to test**
- Unauthorized wireless network access is **illegal**
- Violating computer fraud and wireless communication laws can result in severe penalties
- Always obtain explicit permission before conducting wireless security assessments

### Ethical usage

```bash
# Legitimate uses:
# - Testing your own wireless network
# - Authorized penetration testing
# - Network troubleshooting
# - Security research in isolated lab

# Document authorization:
# - Written permission from network owner
# - Scope of testing clearly defined
# - Date and time of assessment
# - Responsible disclosure of findings
```

## Quick Reference

### Essential commands

```bash
# List interfaces
airmon-ng

# Check for interfering processes
sudo airmon-ng check

# Kill interfering processes
sudo airmon-ng check kill

# Enable monitor mode
sudo airmon-ng start wlan0

# Enable on specific channel
sudo airmon-ng start wlan0 6

# Disable monitor mode
sudo airmon-ng stop wlan0mon
```

### Interface commands

```bash
# Check interface status
iwconfig
iw dev

# Set channel
sudo iw dev wlan0mon set channel 11

# Check current channel
iw dev wlan0mon info
```

## Real-World Examples

### Audit home network security

```bash
# With proper authorization
sudo airmon-ng check kill
sudo airmon-ng start wlan0
sudo airodump-ng -c 6 --bssid <YOUR_ROUTER_BSSID> -w home_audit wlan0mon

# Check:
# - WPA2 encryption enabled
# - Strong password (attempt crack)
# - WPS disabled
# - Hidden SSID effectiveness
```

### Corporate wireless assessment

```bash
# With written authorization
sudo airmon-ng start wlan0
sudo airodump-ng --band abg wlan0mon -w corporate_scan

# Assess:
# - Encryption strength
# - Rogue access points
# - Client vulnerabilities
# - Signal coverage
```

### Troubleshoot WiFi issues

```bash
# Enable monitor mode
sudo airmon-ng start wlan0

# Scan for interference
sudo airodump-ng wlan0mon

# Identify:
# - Channel congestion
# - Overlapping networks
# - Signal strength issues
# - Competing access points
```

## Resources

- [Aircrack-ng official site](https://www.aircrack-ng.org/)
- [Airmon-ng documentation](https://www.aircrack-ng.org/doku.php?id=airmon-ng)
- [Aircrack-ng GitHub](https://github.com/aircrack-ng/aircrack-ng)
- [Wireless adapter compatibility](https://www.aircrack-ng.org/doku.php?id=compatibility_drivers)

## Next Steps

- Learn other Aircrack-ng tools (airodump-ng, aireplay-ng, aircrack-ng)
- Study wireless security protocols (WEP, WPA, WPA2, WPA3)
- Practice in isolated lab environment
- Obtain wireless security certifications (OSWP)
- Learn about wireless intrusion detection systems
- Explore WiFi Pineapple for advanced testing
