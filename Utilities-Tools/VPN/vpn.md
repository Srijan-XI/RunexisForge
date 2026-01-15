# VPN - Secure Remote Access & Networking

## Table of Contents
- [Introduction](#introduction)
- [Protocol Comparison](#protocol-comparison)
- [OpenVPN](#openvpn)
  - [Architecture](#architecture-openvpn)
  - [Configuration Deep Dive](#configuration-deep-dive-openvpn)
  - [Authentication Methods](#authentication-methods)
  - [Setup Scripts](#setup-scripts)
- [WireGuard](#wireguard)
  - [Why WireGuard?](#why-wireguard)
  - [Architecture](#architecture-wireguard)
  - [Configuration Explained](#configuration-explained-wireguard)
  - [Routing & Masquerading](#routing--masquerading)
  - [Split Tunneling](#split-tunneling)
- [IPsec / IKEv2](#ipsec--ikev2)
- [Zero Trust Alternatives](#zero-trust-alternatives)
  - [Tailscale](#tailscale)
  - [Cloudflare Tunnel](#cloudflare-tunnel)
- [Developer Use Cases](#developer-use-cases)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

---

## Introduction

A **VPN (Virtual Private Network)** creates a secure, encrypted tunnel between your device and a remote network. For developers and DevOps engineers, it is an essential tool for accessing restricted infrastructure, securing communications on public WiFi, and testing geographical features.

---

## Protocol Comparison

| Feature | WireGuard | OpenVPN | IPsec (IKEv2) |
|---------|-----------|---------|---------------|
| **Speed** | 🚀 Very Fast | 🐢 Moderate | 🚀 Fast |
| **Security** | State-of-the-art crypto | Strong (OpenSSL) | Strong |
| **Code Base** | ~4,000 lines (Auditable) | ~100,000+ lines | Huge |
| **Setup** | Simple | Complex | Very Complex |
| **Port** | UDP 51820 (default) | TCP/UDP 1194 | UDP 500/4500 |
| **Roaming** | Seamless (Mobile friendly) | Disconnects | Good |
| **Stability** | Excellent | Good | Good |

---

## OpenVPN

The industry standard for over a decade. While slower and heavier than WireGuard, it is highly configurable and works through almost any firewall (especially in TCP mode on port 443).

### Architecture
-   **Client-Server**: Relies on a central PKI (Public Key Infrastructure). The server is the Certificate Authority (CA).
-   **Tun/Tap Interfaces**: Uses virtual network adapters to route traffic.

### Configuration Deep Dive

**Server Config (`server.conf`)**:
```nginx
port 1194
proto udp
dev tun
ca ca.crt
cert server.crt
key server.key
dh dh.pem
server 10.8.0.0 255.255.255.0  # Internal VPN subnet
push "redirect-gateway def1 bypass-dhcp" # Route all traffic through VPN
push "dhcp-option DNS 1.1.1.1" # Use Cloudflare DNS
keepalive 10 120
tls-auth ta.key 0 # HMAC firewall
cipher AES-256-CBC
user nobody
group nogroup
persist-key
persist-tun
status openvpn-status.log
verb 3
```

### Authentication Methods
1.  **Certificates (mTLS)**: Most secure. Client needs `client.crt` and `client.key`.
2.  **Username/Password**: Can be backed by LDAP/Active Directory.
3.  **2FA / TOTP**: Can integrate with Google Authenticator via plugins.

### Setup Scripts
Setting up OpenVPN manually involves generating many certificates. Use helper scripts:
-   **[angristan/openvpn-install](https://github.com/angristan/openvpn-install)**: Hardened, auto-config script.
-   **[PiVPN](https://www.pivpn.io/)**: Originally for Raspberry Pi, works on Debian/Ubuntu.

---

## WireGuard

A modern, high-performance VPN protocol included in the Linux kernel (since 5.6). It is opinionated and lacks the legacy bloat of other protocols.

### Why WireGuard?
-   **Cryptography**: Uses ChaCha20, Poly1305, BLAKE2, Curve25519.
-   **Connectionless**: Works like UDP. No "handshake" lag when switching networks.
-   **Silent**: If a packet uses an invalid key, the server drops it silently (easier to hide from scanners).

### Configuration Explained

**Concepts**:
-   **Interface**: Local settings (IP, Private Key).
-   **Peer**: Remote settings (Public Key, Endpoint, Allowed IPs).

**Server Config (`/etc/wireguard/wg0.conf`)**:
```ini
[Interface]
Address = 10.0.0.1/24
SaveConfig = true
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
ListenPort = 51820
PrivateKey = <ServerPrivateKey>

[Peer]
# Client 1 (Laptop)
PublicKey = <ClientPublicKey>
AllowedIPs = 10.0.0.2/32
```

### Routing & Masquerading
To allow VPN clients to access the internet through the server, you must enable **IP Forwarding** and **NAT/Masquerading**.
1.  **Forwarding**: `sysctl -w net.ipv4.ip_forward=1`
2.  **NAT**: The `PostUp` commands in the config above handle this using `iptables`.

### Split Tunneling
You might want to route *only* traffic for your office servers (e.g., `192.168.1.x`) through the VPN, while letting Netflix/YouTube go through your normal ISP (for speed).

**Client Config for Split Tunneling**:
```ini
[Peer]
PublicKey = <ServerPublicKey>
Endpoint = 1.2.3.4:51820
AllowedIPs = 192.168.1.0/24  # Only route this subnet through VPN
# If you want ALL traffic, use AllowedIPs = 0.0.0.0/0
```

---

## IPsec / IKEv2

**Internet Protocol Security (IPsec)** is heavily used in enterprise environments and is natively supported by iOS, macOS, and Windows (no app install required).
-   **StrongSwan**: The most popular IPsec implementation for Linux.
-   **Algo VPN**: A set of Ansible scripts that simplifies IPsec setup.

---

## Zero Trust Alternatives

Traditional VPNs grant access to the network perimeter. Once in, you can often scan everything. **Zero Trust Network Access (ZTNA)** tools provide granular access to specific applications.

### Tailscale
Built on top of WireGuard.
-   **Mesh Network**: Devices connect directly to each other (p2p) when possible, using NAT traversal.
-   **Authentication**: Login with Google/GitHub/Microsoft (SSO).
-   **ACL**: Define rules like "Engineering group can access SSH, but not the Production DB".

### Cloudflare Tunnel
Expose a local web service to the internet without opening ports on your router.
-   **Command**: `cloudflared tunnel run my-tunnel`
-   **Security**: Traffic is proxied through Cloudflare's edge implementation.

---

## Developer Use Cases

1.  **Accessing Private Databases**: RDS/Postgres instances often exist in private VPC subnets. A simple VPN host (Bastion) allows local GUI tools (DBeaver, TablePlus) to connect.
2.  **IP Whitelisting**: Lock down admin panels or APIs to a single Static IP (your VPN server). Even if credentials are stolen, attackers can't login from elsewhere.
3.  **Geo-Testing**: Test how your app behaves for users in different countries by routing traffic through VPN servers in those regions.

---

## Troubleshooting

1.  **Handshake Fails (WireGuard)**:
    -   Check keys: Does Server have Client's *Public* key, and vice versa?
    -   Check Firewall: Is UDP port 51820 open?
2.  **Connected but No Internet**:
    -   Check IP Forwarding: `cat /proc/sys/net/ipv4/ip_forward` should be `1`.
    -   Check DNS: Are you pushing a valid DNS server?
3.  **MTU Issues**:
    -   If some sites load but others hang (TLS handshake freeze), reduce MTU.
    -   WireGuard default is 1420. Try 1360 or 1280 (MSS clamping).

---

## Resources

-   [WireGuard QuickStart](https://www.wireguard.com/quickstart/)
-   [OpenVPN Community Wiki](https://community.openvpn.net/openvpn/wiki)
-   [Tailscale Documentation](https://tailscale.com/kb/)
-   [Algo VPN](https://github.com/trailofbits/algo)
