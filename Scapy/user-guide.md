# Scapy Installation and Usage Guide

## Installation

### Prerequisites
- Python 3.6 or higher
- pip (Python package manager)
- Root/Administrator privileges
- Tcpdump (for sniffing)

### Install Scapy
```bash
pip install scapy
```

### On Linux
```bash
sudo pip install scapy
sudo apt-get install tcpdump
```

### On Windows
```bash
pip install scapy
# Install Npcap from https://npcap.com
pip install npcap
```

### On macOS
```bash
pip install scapy
brew install libpcap
```

### Verify Installation
```bash
python3 -c "import scapy; print(scapy.__version__)"
```

## Interactive Shell

### Start Scapy Interactive Shell
```bash
sudo scapy
```

### Basic Commands
```
IPv4()
IPv4().show()
TCP().show()
```

## Creating Packets

### Simple IP Packet
```python
from scapy.all import IP, TCP, send

# Create an IP packet
packet = IP(dst="192.168.1.1")
print(packet.show())

# Add TCP layer
packet = IP(dst="192.168.1.1") / TCP(dport=80)
print(packet.show())
```

### HTTP Request
```python
from scapy.all import IP, TCP, Raw

packet = IP(dst="www.example.com") / TCP(dport=80) / Raw(load="GET / HTTP/1.1\r\nHost: example.com\r\n\r\n")
packet.show()
```

## Sending Packets

### Send Single Packet
```python
from scapy.all import IP, ICMP, send

packet = IP(dst="192.168.1.1") / ICMP()
send(packet)
```

### Send and Receive (sr)
```python
from scapy.all import IP, ICMP, sr

packet = IP(dst="192.168.1.1") / ICMP()
answered, unanswered = sr(packet)
answered.show()
```

### Send Multiple Packets
```python
from scapy.all import IP, TCP, sr1
from itertools import count

for i in range(1, 1024):
    packet = IP(dst="192.168.1.1") / TCP(dport=i)
    response = sr1(packet, timeout=1, verbose=False)
    if response:
        print(f"Port {i}: Open")
```

## Packet Sniffing

### Capture Packets
```python
from scapy.all import sniff

# Capture 10 packets
packets = sniff(count=10)
packets.show()

# Capture from specific interface
packets = sniff(iface="eth0", count=10)

# Capture specific protocol
packets = sniff(filter="tcp port 80", count=10)

# Capture with timeout
packets = sniff(timeout=30)
```

### Process Captured Packets
```python
from scapy.all import sniff, IP

def packet_callback(packet):
    if IP in packet:
        print(f"Source: {packet[IP].src} -> Destination: {packet[IP].dst}")

sniff(prn=packet_callback, count=10)
```

## Network Scanning

### Ping Sweep
```python
from scapy.all import IP, ICMP, sr

target = "192.168.1.0/24"
packet = IP(dst=target) / ICMP()
answered, unanswered = sr(packet, timeout=1, verbose=False)

for response in answered:
    print(f"Host {response[1].src} is alive")
```

### TCP Port Scan
```python
from scapy.all import IP, TCP, sr1

target = "192.168.1.1"
open_ports = []

for port in range(1, 1024):
    response = sr1(
        IP(dst=target) / TCP(dport=port, flags="S"),
        timeout=0.1,
        verbose=False
    )
    
    if response and response[TCP].flags == 0x12:  # SYN-ACK
        open_ports.append(port)
        print(f"Port {port} is open")

print(f"Open ports: {open_ports}")
```

### UDP Port Scan
```python
from scapy.all import IP, UDP, sr, ICMP

target = "192.168.1.1"

for port in [53, 67, 123, 161]:
    response = sr1(
        IP(dst=target) / UDP(dport=port),
        timeout=1,
        verbose=False
    )
    
    if response:
        print(f"Port {port} responded")
```

## ARP Scanning

### ARP Ping
```python
from scapy.all import Ether, ARP, srp

target = "192.168.1.0/24"
packet = Ether(dst="ff:ff:ff:ff:ff:ff") / ARP(pdst=target)
answered, unanswered = srp(packet, timeout=1, verbose=False)

for response in answered:
    print(f"IP: {response[1].psrc}, MAC: {response[1].hwsrc}")
```

## DNS Queries

### Simple DNS Query
```python
from scapy.all import IP, UDP, DNS, DNSQR

packet = IP(dst="8.8.8.8") / UDP(dport=53) / DNS(rd=1, qd=DNSQR(qname="example.com"))
response = sr1(packet, verbose=False, timeout=2)
response.show()
```

## Packet Manipulation

### Modify Packet
```python
from scapy.all import IP, TCP

packet = IP(dst="192.168.1.1") / TCP(dport=80)
packet[IP].src = "192.168.1.10"
packet[TCP].sport = 1234
packet.show()
```

### Extract Information
```python
from scapy.all import sniff, IP, TCP

def extract_data(packet):
    if IP in packet:
        src_ip = packet[IP].src
        dst_ip = packet[IP].dst
        
        if TCP in packet:
            src_port = packet[TCP].sport
            dst_port = packet[TCP].dport
            print(f"{src_ip}:{src_port} -> {dst_ip}:{dst_port}")

sniff(prn=extract_data, count=10)
```

## Script Examples

### Full Script - Port Scanner
```python
#!/usr/bin/env python3
from scapy.all import IP, TCP, sr1
import sys

if len(sys.argv) < 2:
    print("Usage: python3 port_scan.py <target>")
    sys.exit(1)

target = sys.argv[1]
open_ports = []

for port in range(1, 1024):
    response = sr1(
        IP(dst=target) / TCP(dport=port, flags="S"),
        timeout=0.1,
        verbose=False
    )
    
    if response and response[TCP].flags == 0x12:
        open_ports.append(port)
        print(f"[+] Port {port} is open")

print(f"\n[*] Found {len(open_ports)} open ports: {open_ports}")
```

### Full Script - Network Discovery
```python
#!/usr/bin/env python3
from scapy.all import Ether, ARP, srp
import sys

if len(sys.argv) < 2:
    print("Usage: python3 arp_scan.py <network>")
    sys.exit(1)

network = sys.argv[1]
packet = Ether(dst="ff:ff:ff:ff:ff:ff") / ARP(pdst=network)
answered, unanswered = srp(packet, timeout=1, verbose=False)

print("[*] Active hosts found:")
for response in answered:
    print(f"IP: {response[1].psrc:15} | MAC: {response[1].hwsrc}")
```

## Best Practices
1. Always get authorization before scanning
2. Use appropriate timeouts
3. Handle exceptions properly
4. Test on lab networks first
5. Document your scripts
6. Use verbose=False for cleaner output
7. Implement rate limiting
8. Follow ethical guidelines
9. Respect network resources
10. Keep Scapy updated

## Common Filters
```
tcp          # TCP packets
udp          # UDP packets
icmp         # ICMP packets
port 80      # Specific port
host 192.168.1.1  # Specific host
src 192.168.1.0/24  # Source network
dst 192.168.1.1  # Destination host
```

## Useful Resources
- Scapy Documentation: https://scapy.readthedocs.io
- Protocol Reference: https://en.wikipedia.org/wiki/Network_protocol
- Packet Structure: https://www.tcpdump.org/papers/sniffing-faq.html
