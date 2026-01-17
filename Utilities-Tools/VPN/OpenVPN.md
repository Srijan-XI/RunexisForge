## OpenVPN
The industry standard for over a decade. While slower and heavier than WireGuard, it is highly configurable and works through almost any firewall (especially in TCP mode on port 443).
Architecture

- Client-Server: Relies on a central PKI (Public Key Infrastructure). The server is the Certificate Authority (CA).
- Tun/Tap Interfaces: Uses virtual network adapters to route traffic.
- SSL/TLS: Uses the same encryption library as HTTPS websites
- User-Space: Runs as a regular application (not in the kernel)

### Advantages
Strong Points:

Mature and Battle-Tested: Used by enterprises for 20+ years
Highly Configurable: Extensive options for routing, authentication, and security
Firewall Friendly: Can run on TCP port 443 (looks like HTTPS traffic)
Cross-Platform: Works on virtually every operating system
Excellent Documentation: Extensive community knowledge base
Plugin Support: LDAP, 2FA, RADIUS integration available
Network Flexibility: Supports both routing (tun) and bridging (tap) modes

### Best For:

Enterprise environments with complex requirements
Situations where you need to bypass restrictive firewalls
Legacy systems that require tap-mode bridging
Organizations with existing PKI infrastructure

### Disadvantages
Weak Points:

Performance: Slower than WireGuard due to user-space implementation
Code Complexity: Large codebase increases attack surface
Complex Setup: Certificate management is tedious
Reconnection Issues: Doesn't handle network changes gracefully
Resource Usage: Higher CPU and memory consumption
Battery Drain: Mobile devices lose battery faster

### Challenges:

- Certificate Expiry: Must track and renew certificates
- Configuration Errors: Easy to misconfigure with so many options
- Debugging: Complex logs can be hard to parse

### Configuration Deep Dive
Server Config (`server.conf`):
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
---

### Client Config (`client.ovpn`):
```nginx
client
dev tun
proto udp
remote vpn.example.com 1194
resolv-retry infinite
nobind
persist-key
persist-tun
ca ca.crt
cert client.crt
key client.key
remote-cert-tls server
tls-auth ta.key 1
cipher AES-256-CBC
verb 3
```

### Authentication Methods

- Certificates (mTLS): Most secure. Client needs `client.crt` and `client.key`.
- Username/Password: Can be backed by LDAP/Active Directory.
- 2FA / TOTP: Can integrate with Google Authenticator via plugins.

Adding Username/Password Auth:

```nginx
# Server side
plugin /usr/lib/openvpn/openvpn-plugin-auth-pam.so login
 Client side
auth-user-pass
```
### Setup Scripts
Setting up OpenVPN manually involves generating many certificates. Use helper scripts:

- angristan/openvpn-install: Hardened, auto-config script.
- Pi VPN: Originally for Raspberry Pi, works on Debian/Ubuntu.

### Complete OpenVPN Setup Guide

Server Setup (Ubuntu/Debian):
```bash
# 1. Install OpenVPN and Easy-RSA
sudo apt update
sudo apt install openvpn easy-rsa -y

# 2. Setup PKI directory
make-cadir ~/openvpn-ca
cd ~/openvpn-ca

# 3. Configure certificate variables
nano vars
# Set: KEY_COUNTRY, KEY_PROVINCE, KEY_CITY, KEY_ORG, KEY_EMAIL

# 4. Build Certificate Authority
source vars
./clean-all
./build-ca

# 5. Generate server certificate and key
./build-key-server server

# 6. Generate Diffie-Hellman parameters (takes a while)
./build-dh

# 7. Generate HMAC key
openvpn --genkey --secret keys/ta.key

# 8. Generate client certificate
./build-key client1

# 9. Copy keys to OpenVPN directory
sudo cp ~/openvpn-ca/keys/{server.crt,server.key,ca.crt,dh2048.pem,ta.key} /etc/openvpn/

# 10. Create server config
sudo nano /etc/openvpn/server.conf
# (Use the configuration from above)

# 11. Enable IP forwarding
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# 12. Configure firewall
sudo ufw allow 1194/udp
sudo ufw allow OpenSSH

# Add NAT rules
sudo nano /etc/ufw/before.rules
# Add at the top:
# *nat
# :POSTROUTING ACCEPT [0:0]
# -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE
# COMMIT

sudo ufw disable && sudo ufw enable

# 13. Start OpenVPN
sudo systemctl start openvpn@server
sudo systemctl enable openvpn@server

# 14. Check status
sudo systemctl status openvpn@server
Client Setup:
bash# Create client config file
nano client1.ovpn

# Add your config (see above)
# Copy ca.crt, client1.crt, client1.key, ta.key to client

# On Linux
sudo openvpn --config client1.ovpn

# On Windows/Mac
# Import client1.ovpn into OpenVPN GUI
Quick Setup with Script:
bashwget https://git.io/vpn -O openvpn-install.sh
chmod +x openvpn-install.sh
sudo ./openvpn-install.sh