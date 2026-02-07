# Kismet

## Introduction

## What is Kismet?

Kismet is an open-source wireless network detector, packet sniffer, and intrusion detection system for 802.11 wireless LANs (Wi-Fi), Bluetooth, SDR (Software Defined Radio), and other wireless protocols. Originally created by Mike Kershaw (dragorn) in 2001, Kismet has evolved into a powerful passive wireless monitoring platform.

## Why Kismet?

- Passive detection (doesn't transmit)
- Multi-protocol support (Wi-Fi, Bluetooth, Zigbee, etc.)
- Works with standard wireless cards
- No special hardware required
- Comprehensive logging
- Real-time alerting
- Web-based interface
- Plugin architecture
- GPS integration
- Client-server architecture

## Learning Path

1. Understand wireless networking basics
2. Learn 802.11 protocol fundamentals
3. Install and configure Kismet
4. Practice passive monitoring
5. Explore advanced features
6. Develop custom plugins

## User Guide

## Prerequisites

- Basic understanding of wireless networking
- Compatible wireless adapter
- Root/administrator privileges
- Understanding of packet analysis

Verify installation:

```bash
kismet --version
```

## Installation

### Ubuntu/Debian

```bash
# Add repository
wget -O - https://www.kismetwireless.net/repos/kismet-release.gpg.key | sudo apt-key add -
echo 'deb https://www.kismetwireless.net/repos/apt/release/$(lsb_release -cs) $(lsb_release -cs) main' | sudo tee /etc/apt/sources.list.d/kismet.list

# Install
sudo apt update
sudo apt install kismet

# Add user to kismet group (recommended)
sudo usermod -aG kismet $USER

# Logout and login for group changes
```

### RHEL/CentOS/Fedora

```bash
# Install dependencies
sudo dnf install libwebsockets-devel libmicrohttpd-devel \
    libpcap-devel NetworkManager-libnm-devel protobuf-devel \
    protobuf-c-devel sqlite-devel libdwarf-devel elfutils-devel

# Download and compile from source
wget https://www.kismetwireless.net/code/kismet-2023-07-R1.tar.xz
tar xf kismet-2023-07-R1.tar.xz
cd kismet-2023-07-R1
./configure
make
sudo make suidinstall
```

### macOS

```bash
# Install dependencies
brew install pkg-config libpcap protobuf protobuf-c libmicrohttpd

# Compile from source
wget https://www.kismetwireless.net/code/kismet-2023-07-R1.tar.xz
tar xf kismet-2023-07-R1.tar.xz
cd kismet-2023-07-R1
./configure
make
sudo make install
```

### Arch Linux

```bash
# From AUR
yay -S kismet

# Or
sudo pacman -S kismet
```

## Configuration

### kismet.conf

```bash
# Configuration file location
/etc/kismet/kismet.conf           # System-wide
~/.kismet/kismet.conf            # User-specific
~/.kismet/kismet_site.conf       # Site-specific overrides

# Edit configuration
sudo nano /etc/kismet/kismet.conf
```

### Basic configuration

```conf
# Server name
server_name=Kismet

# Default user
httpd_username=kismet

# Listen address
httpd_bind_address=127.0.0.1

# Port
httpd_port=2501

# Sources (capture interfaces)
source=wlan0:name=wireless
source=wlan1:name=external

# Log settings
log_types=kismet,pcapng
log_title=Kismet
log_prefix=/var/log/kismet/

# GPS
gps=serial:device=/dev/ttyUSB0,name=gps

# Alerts
alert=AIRJACKSSID,5/min,1/sec
```

### Source configuration

```bash
# Add source at runtime
kismet -c wlan0

# Multiple sources
kismet -c wlan0 -c wlan1

# Named source
kismet -c wlan0:name=internal

# Source with options
kismet -c wlan0:hop=true,channel_hop_speed=5/sec
```

## Basic Usage

### Starting Kismet

```bash
# Start with default settings
kismet

# Start with specific interface
kismet -c wlan0

# Start with configuration file
kismet -f /path/to/config.conf

# Start in background
kismet --daemonize

# Start without web interface
kismet --no-ncurses-wrapper
```

### Web interface

```
Access web interface:
http://localhost:2501

Default credentials:
- Username: kismet
- Password: (set on first run)

Features:
- Live device list
- Signal strength maps
- Alert notifications
- Packet statistics
- Device details
```

### Command-line client

```bash
# Connect to Kismet server
kismet_client

# Connect to remote server
kismet_client --server=192.168.1.100:2501
```

## Monitoring Wireless Networks

### 802.11 Wi-Fi

```bash
# Monitor all channels
kismet -c wlan0

# Monitor specific channel
kismet -c wlan0:channel=6

# Channel hopping
kismet -c wlan0:hop=true

# Monitor 2.4GHz and 5GHz
kismet -c wlan0:channels="1,6,11,36,40,44,48"

# Set hop rate
kismet -c wlan0:hop_rate=10/sec
```

### Device tracking

```
Kismet automatically tracks:
- Access Points (APs)
- Client devices
- SSID broadcasts
- Probe requests
- Data rates
- Encryption types
- Signal strength
- Manufacturer (MAC OUI)
```

## Bluetooth Monitoring

### Enable Bluetooth source

```bash
# Linux Bluetooth interface
kismet -c hci0:name=bluetooth

# Configuration
source=hci0:type=linuxbluetooth,name=bt0

# Ubertooth (if available)
kismet -c ubertooth-0
```

## Data Sources

### Wi-Fi adapters

```bash
# Linux wireless interface
source=wlan0:name=wifi

# Multiple cards
source=wlan0:name=internal
source=wlan1:name=external

# Channel locking
source=wlan0:channel=6,channel_hop=false

# Set initial channel
source=wlan0:initialchannel=36
```

### Remote capture

```bash
# Remote capture setup
# On remote host:
kismet_cap_linux_wifi --connect remote.server:3501 --source=wlan0

# In kismet.conf:
source=remote:host=192.168.1.100,port=3501
```

### Other sources

```bash
# RTL-SDR
source=rtladsb:name=adsb

# PCAP file
source=/path/to/capture.pcap:name=replay

# nRF devices
source=nrf_51822:name=nrf0
```

## Logging

### Log types

```conf
# Log configuration
log_types=kismet,pcapng,wiglecsv,text

# Kismetdb (SQLite database)
# - Complete device tracking
# - Packet storage
# - GPS data

# PCAP-NG
# - Standard packet capture
# - Compatible with Wireshark

# Wigle CSV
# - Upload to WiGLE.net
# - Wardriving data

# Text logs
# - Alert messages
# - Status information
```

### Log locations

```bash
# Default log directory
/var/log/kismet/

# Log files
Kismet-YYYYMMDD-HH-MM-SS-1.kismet    # Database
Kismet-YYYYMMDD-HH-MM-SS-1.pcapng    # Packets
Kismet-YYYYMMDD-HH-MM-SS-1.wiglecsv  # Wigle
Kismet-YYYYMMDD-HH-MM-SS-1.txt       # Text log
```

## Alerts

### Built-in alerts

```
Alert Types:
- AIRJACKSSID: Airjack AP detection
- BSSTIMESTAMP: Invalid BSS timestamp
- CHANCHANGE: Illegal channel change
- CRYPTODROP: Encryption downgrade
- DISASSOCTRAFFIC: Disassoc attack
- DEAUTHFLOOD: Deauth flood
- DHCPCONFLICT: DHCP server conflict
- DHCPCLIENTID: DHCP client ID change
- NETSTUMBLER: NetStumbler detection
- NULLPROBERESP: Null probe response
- PROBECHAN: Probe on wrong channel
```

### Custom alerts

```conf
# Define alert
alert=CUSTOMALERT,5/min,1/sec

# Alert throttling
alertthrottle=DEAUTHFLOOD,10/min
```

## GPS Integration

### Configure GPS

```bash
# Serial GPS
gps=serial:device=/dev/ttyUSB0,baud=4800,name=gps

# GPSD
gps=gpsd:host=localhost,port=2947

# Web GPS (from browser)
gps=web:name=webgps
```

### GPS usage

```
Features:
- Location tagging of devices
- Wardriving
- Signal strength mapping
- Coverage analysis
- Export to KML/GPX
```

## REST API

### API endpoints

```bash
# Device list
curl http://localhost:2501/devices/all_devices.json

# Specific device
curl http://localhost:2501/devices/by-key/[device-key]/device.json

# System status
curl http://localhost:2501/system/status.json

# Data sources
curl http://localhost:2501/datasource/all_sources.json

# Alerts
curl http://localhost:2501/alerts/all_alerts.json
```

### Authentication

```bash
# Create API key
curl -X POST http://localhost:2501/session/create_apikey \
  -u kismet:password \
  -H "Content-Type: application/json" \
  -d '{"name":"mykey","role":"readonly"}'

# Use API key
curl http://localhost:2501/devices/all_devices.json \
  -H "KISMET: [api-key]"
```

## Kismetdb Tool

### Extract data from logs

```bash
# View database info
kismetdb_dump_devices --in kismet.kismet

# Export to JSON
kismetdb_dump_devices --in kismet.kismet --json out.json

# Export to CSV
kismetdb_to_wiglecsv --in kismet.kismet --out wigle.csv

# Extract packets
kismetdb_to_pcap --in kismet.kismet --out capture.pcapng

# Filter by SSID
kismetdb_dump_devices --in kismet.kismet --ssid "MyNetwork"

# Filter by time
kismetdb_dump_devices --in kismet.kismet \
  --start-time "2023-01-01 00:00:00" \
  --end-time "2023-01-01 23:59:59"
```

### Statistics

```bash
# Device statistics
kismetdb_statistics --in kismet.kismet

# Packet count
kismetdb_statistics --in kismet.kismet --packets

# Show encryption types
kismetdb_statistics --in kismet.kismet --encryption
```

## Advanced Features

### Channel hopping

```bash
# Configure channel hopping
# 2.4GHz channels
source=wlan0:hop_channels=1,6,11

# 5GHz channels
source=wlan0:hop_channels=36,40,44,48,149,153,157,161

# Mixed bands
source=wlan0:hop_channels=1,6,11,36,149

# Custom hop rate
source=wlan0:hop_rate=5/sec
```

### Packet filtering

```bash
# Filter configuration
# In kismet_filter.conf

filter_tracker=DENY,type=dot11.device.phy,value=00:11:22:33:44:55
filter_tracker=PASS,type=dot11.device.ssid,value=TargetNetwork
```

### Remote capture

```bash
# Server side
kismet

# Client side (remote capture)
kismet_cap_linux_wifi --tcp --connect server:3501 --source wlan0
```

## Wardriving

### GPS wardriving setup

```bash
# Configuration
gps=gpsd:host=localhost,port=2947
log_types=kismet,wiglecsv

# Start capture
kismet -c wlan0 -f wardriving.conf

# Upload to WiGLE
# Export: Kismet-*.wiglecsv
# Upload at: https://wigle.net
```

### Mobile setup

```bash
# Android phone GPS
gps=tcp:host=192.168.1.100,port=4352

# Battery optimization
# Reduce logging
log_packets=false

# Limit device tracking
tracker_device_timeout=300
```

## Intrusion Detection

### Detection modes

```
- Rogue AP detection
- Evil twin detection
- Deauthentication attacks
- WPS attacks
- Client probing
- Encryption downgrades
- Channel violations
```

### Alert configuration

```conf
# Enable IDS alerts
alert=DEAUTHFLOOD,10/min,1/sec
alert=BSSTIMESTAMP,5/min,1/sec
alert=CRYPTODROP,5/min,1/sec

# Alert actions
alertaction=log:alert.log
alertaction=speech:Festival alert detected
```

## Plugins

### Available plugins

```
- kismet-adsb: ADS-B aircraft tracking
- kismet-bluetooth: Bluetooth support
- kismet-zigbee: Zigbee monitoring
- kismet-rtl433: RTL-433 sensor decoding
- kismet-rtladsb: RTL-SDR ADS-B
```

### Enable plugins

```bash
# Install plugin
sudo apt install kismet-plugins

# Enable in config
plugin=/usr/lib/kismet/kismet_adsb.so
```

## Performance Tuning

### Optimize for high traffic

```conf
# Increase buffer size
pcap_buffer_size=524288

# Disable unnecessary logging
log_packets=false

# Limit tracked devices
tracker_device_timeout=300

# Reduce channel hop rate
source=wlan0:hop_rate=2/sec
```

### Memory management

```conf
# Device timeout
tracker_device_timeout=600

# Clean old devices
tracker_cleanup_timeout=900
```

## Troubleshooting

### Interface won't start

```bash
# Check interface
ip link show wlan0

# Kill conflicting processes
sudo airmon-ng check kill

# Put in monitor mode manually
sudo ip link set wlan0 down
sudo iw dev wlan0 set type monitor
sudo ip link set wlan0 up

# Then start Kismet
kismet -c wlan0
```

### Permission issues

```bash
# Add user to kismet group
sudo usermod -aG kismet $USER

# Set capabilities (if needed)
sudo setcap cap_net_raw,cap_net_admin=eip /usr/bin/kismet_cap_linux_wifi

# Check permissions
getcap /usr/bin/kismet_cap_linux_wifi
```

### Can't access web interface

```bash
# Check if Kismet is running
ps aux | grep kismet

# Check port
netstat -tlnp | grep 2501

# Check firewall
sudo ufw allow 2501

# Test locally
curl http://localhost:2501
```

### No GPS data

```bash
# Check GPSD
gpsd -D 5 -N -n /dev/ttyUSB0

# Test GPS
gpsmon

# Check Kismet GPS config
gps=gpsd:host=localhost,port=2947,reconnect=true
```

## Common Use Cases

### Home network monitoring

```bash
# Monitor your network
kismet -c wlan0:channel=6,hop=false

# Alert on new devices
alert=NEWDEVICE,1/min,1/sec
```

### Site survey

```bash
# Survey area
kismet -c wlan0 --gps gpsd:host=localhost

# Generate heatmap (post-processing)
kismetdb_dump_devices --in survey.kismet --json survey.json
```

### Security assessment

```bash
# Comprehensive monitoring
kismet -c wlan0 -c wlan1

# Enable all alerts
# Check for:
# - Rogue APs
# - Weak encryption
# - Deauth attacks
# - Client isolation
```

### Research and development

```bash
# Capture for analysis
log_types=kismet,pcapng

# Extract specific data
kismetdb_to_pcap --in capture.kismet --out packets.pcapng

# Analyze with Wireshark
wireshark packets.pcapng
```

## Integration with Other Tools

### Wireshark

```bash
# Export packets
kismetdb_to_pcap --in kismet.kismet --out capture.pcapng

# Open in Wireshark
wireshark capture.pcapng
```

### Python scripting

```python
#!/usr/bin/env python3
import requests
import json

# Connect to Kismet
url = "http://localhost:2501"
auth = ("kismet", "password")

# Get devices
response = requests.get(f"{url}/devices/all_devices.json", auth=auth)
devices = response.json()

for device in devices:
    print(f"Device: {device['kismet.device.base.name']}")
    print(f"  Type: {device['kismet.device.base.type']}")
    print(f"  Signal: {device['kismet.device.base.signal/kismet.common.signal.last_signal']}")
```

## Security and Legal Considerations

### ⚠️ Legal Warning

- **Only monitor networks you own or have explicit authorization to monitor**
- Passive monitoring may still be subject to local laws
- Recording communications may violate wiretapping laws
- Always obtain proper authorization
- Follow responsible disclosure practices

### Ethical usage

```bash
# Legitimate uses:
# - Personal network security
# - Authorized security assessments
# - Network troubleshooting
# - Research with permission
# - Site surveys (non-invasive)

# Best practices:
# - Document authorization
# - Respect privacy
# - Don't decrypt traffic without permission
# - Secure logged data
# - Follow disclosure policies
```

## Quick Reference

### Common commands

```bash
# Start monitoring
kismet -c wlan0

# Multiple interfaces
kismet -c wlan0 -c wlan1

# Specific channel
kismet -c wlan0:channel=6

# With GPS
kismet -c wlan0 --gps gpsd

# Extract devices
kismetdb_dump_devices --in capture.kismet

# Export packets
kismetdb_to_pcap --in capture.kismet --out packets.pcapng
```

### Configuration locations

```
/etc/kismet/kismet.conf           # Main config
/etc/kismet/kismet_alerts.conf    # Alerts
/etc/kismet/kismet_filter.conf    # Filters
/etc/kismet/kismet_httpd.conf     # Web interface
~/.kismet/kismet_site.conf        # User overrides
```

## Resources

- [Kismet official site](https://www.kismetwireless.net/)
- [Kismet documentation](https://www.kismetwireless.net/docs/)
- [Kismet Git repository](https://github.com/kismetwireless/kismet)
- [Kismet Discord](https://discord.gg/v7gPFYNS)
- [WiGLE.net](https://wigle.net/) - Wardriving database

## Next Steps

- Learn wireless protocols in depth
- Practice with different capture scenarios
- Explore GPS integration
- Develop custom plugins
- Integrate with other security tools
- Contribute to Kismet development
- Join wireless security communities
- Study RF fundamentals
