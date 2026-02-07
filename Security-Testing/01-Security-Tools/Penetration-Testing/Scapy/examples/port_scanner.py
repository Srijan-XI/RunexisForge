#!/usr/bin/env python3
# TCP Port Scanner

from scapy.all import IP, TCP, sr1
import sys

target = "192.168.1.1"
open_ports = []

print(f"[*] Scanning {target}...")

for port in range(1, 1024):
    response = sr1(
        IP(dst=target) / TCP(dport=port, flags="S"),
        timeout=0.1,
        verbose=False
    )
    
    if response and response[TCP].flags == 0x12:  # SYN-ACK
        open_ports.append(port)
        print(f"[+] Port {port} is OPEN")

print(f"\n[*] Scan complete. Found {len(open_ports)} open ports.")
print(f"[*] Open ports: {open_ports}")
