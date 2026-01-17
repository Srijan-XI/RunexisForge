## WireGuard
A modern, high-performance VPN protocol included in the Linux kernel (since 5.6). It is opinionated and lacks the legacy bloat of other protocols.
**Why WireGuard?**

- Cryptography: Uses ChaCha20, Poly1305, BLAKE2, Curve25519.
- Connectionless: Works like UDP. No "handshake" lag when switching networks.
- Silent: If a packet uses an invalid key, the server drops it silently (easier to hide from scanners).
- Kernel-Level: Runs in kernel space for maximum performance
- Minimal Attack Surface: Small codebase is easier to audit
Architecture

- Cryptokey Routing: Routes packets based on public keys, not IP addresses
- Peer-to-Peer Capable: No strict client/server distinction
- Stateless: No connection tracking or session management
- UDP Only: No TCP fallback (keeps code simple)

### Advantages
`Strong Points`:

- Blazing Fast: 3-4x faster than OpenVPN in benchmarks
- Simple Configuration: ~10 lines per peer
- Battery Efficient: Minimal CPU usage on mobile devices
- Seamless Roaming: Automatically handles network switches
- Modern Cryptography: No legacy algorithm support reduces attack surface
- Easy Auditing: Small codebase can be reviewed by security experts
- Built into Linux: No separate installation needed on modern kernels
- Automatic Key Rotation: Rotates session keys automatically

`Best For`:

Mobile users who switch between WiFi and cellular
Performance-critical applications
Personal VPNs
Site-to-site connections
IoT devices with limited resources

`Disadvantages`
`Weak Points`:

- Static IP Assignment: Each peer needs a fixed IP (no DHCP)
- No Dynamic Routing: Can't easily change allowed IPs on the fly
- Firewall Traversal: UDP-only can be blocked by some networks
- Privacy Concerns: Stores peer IPs in memory (visible via wg show)
- No User Auth: Uses only cryptographic keys (no username/password)
- New Protocol: Less mature than OpenVPN (though rapidly improving)

### Challenges:

- Key Management: No built-in PKI, must manage keys yourself
- No Port Flexibility: Can't easily run on TCP port 443
- Limited Logging: Minimal logs make debugging harder
- Config Distribution: No automatic client config generation

Configuration Explained
Concepts:

Interface: Local settings (IP, Private Key).
Peer: Remote settings (Public Key, Endpoint, Allowed IPs).

Server Config (/etc/wireguard/wg0.conf):
```
ini[Interface]
Address = 10.0.0.1/24
SaveConfig = true
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
ListenPort = 51820
PrivateKey = <ServerPrivateKey>
```
[Peer]
# Client 1 (Laptop)
```
PublicKey = <ClientPublicKey>
AllowedIPs = 10.0.0.2/32
```
[Peer]
# Client 2 (Phone)
```
PublicKey = <Client2PublicKey>
AllowedIPs = 10.0.0.3/32
Client Config (/etc/wireguard/wg0.conf):
ini[Interface]
Address = 10.0.0.2/24
PrivateKey = <ClientPrivateKey>
DNS = 1.1.1.1
```
[Peer]

```
PublicKey = <ServerPublicKey>
Endpoint = vpn.example.com:51820
AllowedIPs = 0.0.0.0/0  # Route all traffic through VPN
PersistentKeepalive = 25  # Keep connection alive through NAT
Routing & Masquerading

```
To allow VPN clients to access the internet through the server, you must enable IP Forwarding and NAT/Masquerading.

```
Forwarding: sysctl -w net.ipv4.ip_forward=1

```
NAT: The PostUp commands in the config above handle this using iptables.

Permanent IP Forwarding:

```
bashecho "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```
Split Tunneling
You might want to route only traffic for your office servers (e.g., `192.168.1.x`) through the VPN, while letting Netflix/YouTube go through your normal ISP (for speed).

---

Client Config for Split Tunneling:

```
ini[Peer]
PublicKey = <ServerPublicKey>
Endpoint = 1.2.3.4:51820
AllowedIPs = 192.168.1.0/24  # Only route this subnet through VPN
```
# If you want ALL traffic, use AllowedIPs = 0.0.0.0/0
Multiple Subnets:
iniAllowedIPs = 192.168.1.0/24, 10.0.0.0/8, 172.16.0.0/12
Complete WireGuard Setup Guide
Server Setup (Ubuntu 20.04+):
bash# 1. Install WireGuard (built into kernel 5.6+)
sudo apt update
sudo apt install wireguard -y

2. Generate server keys
cd /etc/wireguard
umask 077
wg genkey | tee server_private.key | wg pubkey > server_public.key

3. Create server config
sudo nano /etc/wireguard/wg0.conf

Add:
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = <contents of server_private.key>
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

4. Generate client keys
wg genkey | tee client1_private.key | wg pubkey > client1_public.key

5. Add client peer to server config
sudo nano /etc/wireguard/wg0.conf

Add:
[Peer]
PublicKey = <contents of client1_public.key>
AllowedIPs = 10.0.0.2/32

6. Enable IP forwarding
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

7. Configure firewall
sudo ufw allow 51820/udp
sudo ufw allow OpenSSH
sudo ufw enable

8. Start WireGuard
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0

9. Verify
sudo wg show
Client Setup:
bash# 1. Install WireGuard
sudo apt install wireguard -y  # Linux
Or download from wireguard.com for Windows/Mac

2. Create client config
sudo nano /etc/wireguard/wg0.conf

Add:
```
[Interface]
Address = 10.0.0.2/24
PrivateKey = <client1_private.key>
DNS = 1.1.1.1
```
[Peer]
```
PublicKey = <server_public.key>
Endpoint = YOUR_SERVER_IP:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
```
3. Connect
```
sudo wg-quick up wg0
```

1. Verify
```
sudo wg show
ping 10.0.0.1
Mobile Setup (iOS/Android):
bash# Generate QR code for easy mobile import
sudo apt install qrencode -y
qrencode -t ansiutf8 < /etc/wireguard/client1.conf
```
# Scan with WireGuard mobile app
Quick Setup with Script:
bashwget https://git.io/wireguard -O wireguard-install.sh
chmod +x wireguard-install.sh
sudo ./wireguard-install.sh