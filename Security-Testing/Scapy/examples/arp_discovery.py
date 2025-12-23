#!/usr/bin/env python3
# ARP Network Discovery

from scapy.all import Ether, ARP, srp

network = "192.168.1.0/24"
packet = Ether(dst="ff:ff:ff:ff:ff:ff") / ARP(pdst=network)

print(f"[*] Scanning {network} with ARP...")
answered, unanswered = srp(packet, timeout=1, verbose=False)

print(f"\n[+] Found {len(answered)} active hosts:\n")
print(f"{'IP Address':<15} | {'MAC Address':<18}")
print("-" * 35)

for response in answered:
    ip = response[1].psrc
    mac = response[1].hwsrc
    print(f"{ip:<15} | {mac:<18}")
