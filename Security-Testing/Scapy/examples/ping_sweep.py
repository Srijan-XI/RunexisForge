#!/usr/bin/env python3
# Simple ICMP Ping Sweep

from scapy.all import IP, ICMP, sr

target = "192.168.1.0/24"
packet = IP(dst=target) / ICMP()

print(f"[*] Sending ICMP ping to {target}")
answered, unanswered = sr(packet, timeout=1, verbose=False)

print(f"\n[+] Active hosts found:")
for response in answered:
    print(f"    {response[1].src} is alive")
