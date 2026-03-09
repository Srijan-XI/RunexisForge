# VPN - Secure Remote Access & Networking

## Table of Contents
- [Introduction](#introduction)
- [Protocol Comparison](#protocol-comparison)
- [IPsec / IKEv2](#ipsec--ikev2)
  - [Setup Guide](#setup-guide)
- [Zero Trust Alternatives](#zero-trust-alternatives)
  - [Tailscale](#tailscale)
  - [Cloudflare Tunnel](#cloudflare-tunnel)
  - [Comparison](#comparison-traditional-vpn-vs-zero-trust)
- [Developer Use Cases](#developer-use-cases)
- [Security Best Practices](#security-best-practices)
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

## IPsec / IKEv2

Internet Protocol Security (IPsec) is heavily used in enterprise environments and is natively supported by iOS, macOS, and Windows (no app install required).

- **StrongSwan**: The most popular IPsec implementation for Linux.
- **Algo VPN**: A set of Ansible scripts that simplifies IPsec setup.

### Advantages
**Strong Points:**
- **Native OS Support**: No app installation needed on most devices
- **Enterprise Standard**: Widely deployed in corporate environments
- **Fast Performance**: Kernel-level implementation
- **Strong Security**: Well-audited and trusted by governments
- **NAT Traversal**: Handles complex network scenarios well
- **Roaming Support**: IKEv2 handles network changes smoothly

**Best For:**
- Corporate environments with managed devices
- Users who can't install VPN apps
- High-security requirements

### Disadvantages
**Weak Points:**
- **Complex Setup**: Most difficult VPN to configure manually
- **Firewall Issues**: Uses multiple ports (UDP 500, 4500)
- **Huge Codebase**: Difficult to audit
- **Configuration Hell**: Many moving parts and options
- **Compatibility Issues**: Different implementations may not work together

**Challenges:**
- **Certificate Management**: Complex PKI setup required
- **Debugging**: Very difficult to troubleshoot connection issues
- **Documentation**: Often contradictory or outdated

### Setup Guide
**Using Algo VPN (Recommended):**

```bash
# 1. Clone Algo repository
git clone https://github.com/trailofbits/algo.git
cd algo

# 2. Install dependencies
python3 -m pip install -r requirements.txt

# 3. Configure
cp config.cfg.example config.cfg
nano config.cfg  # Edit user list

# 4. Deploy (to DigitalOcean, AWS, etc.)
./algo

# 5. Follow prompts to select cloud provider
# It will automatically configure everything
```

**Manual StrongSwan Setup (Advanced):**
```bash
# Server setup is complex - use Algo VPN instead
# Or follow: https://www.strongswan.org/testing/testresults/ikev2/
```

## Zero Trust Alternatives

Traditional VPNs grant access to the network perimeter. Once in, you can often scan everything. Zero Trust Network Access (ZTNA) tools provide granular access to specific applications.

### Tailscale
Built on top of WireGuard.

- **Mesh Network**: Devices connect directly to each other (p2p) when possible, using NAT traversal.
- **Authentication**: Login with Google/GitHub/Microsoft (SSO).
- **ACL**: Define rules like "Engineering group can access SSH, but not the Production DB".

**Advantages:**
- Zero configuration NAT traversal
- Automatic key exchange and rotation
- Access control lists (ACLs)
- Works behind firewalls without port forwarding
- Free for personal use (up to 20 devices)
- Mobile apps with excellent UX

**Disadvantages:**
- Requires Tailscale account (third-party dependency)
- Less control than self-hosted VPN
- Privacy concerns (coordination server knows your network topology)

**Setup:**

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Connect
sudo tailscale up

# Authenticate via browser
# Done! All devices on your Tailscale network can now communicate
```

**Use Cases:**
- Personal network of devices
- Remote access to home servers
- Secure SSH without exposing ports
- Share development environments with team

### Cloudflare Tunnel
Expose a local web service to the internet without opening ports on your router.

- **Command**: `cloudflared tunnel run my-tunnel`
- **Security**: Traffic is proxied through Cloudflare's edge implementation.

**Advantages:**
- No port forwarding needed
- Built-in DDoS protection
- Free tier available
- Easy HTTPS with automatic certificates
- Access control with Cloudflare Access

**Disadvantages:**
- HTTP/HTTPS traffic only (no SSH, RDP, etc. on free tier)
- Cloudflare can see your traffic
- Vendor lock-in

**Setup:**

```bash
# 1. Install cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# 2. Login
cloudflared tunnel login

# 3. Create tunnel
cloudflared tunnel create my-tunnel

# 4. Configure
nano ~/.cloudflared/config.yml
# Add:
# tunnel: <tunnel-id>
# credentials-file: /home/user/.cloudflared/<tunnel-id>.json
# ingress:
#   - hostname: example.com
#     service: http://localhost:8080
#   - service: http_status:404

# 5. Route DNS
cloudflared tunnel route dns my-tunnel example.com

# 6. Run tunnel
cloudflared tunnel run my-tunnel
```

### Comparison: Traditional VPN vs Zero Trust

| Feature | Traditional VPN | Zero Trust (Tailscale) |
|---------|----------------|------------------------|
| **Network Access** | Full network access | Per-application access |
| **Setup** | Manual server setup | Automatic |
| **NAT Traversal** | Often requires port forwarding | Automatic |
| **Security Model** | Perimeter-based | Identity-based |
| **Scalability** | Requires central server | Mesh topology |
| **Maintenance** | High (server updates, certs) | Low (managed service) |

## Developer Use Cases

- **Accessing Private Databases**: RDS/Postgres instances often exist in private VPC subnets. A simple VPN host (Bastion) allows local GUI tools (DBeaver, TablePlus) to connect.
- **IP Whitelisting**: Lock down admin panels or APIs to a single Static IP (your VPN server). Even if credentials are stolen, attackers can't login from elsewhere.
- **Geo-Testing**: Test how your app behaves for users in different countries by routing traffic through VPN servers in those regions.
- **Secure Development**: Connect to staging/production environments without exposing them to the internet.
- **Remote Pair Programming**: Share localhost servers with teammates securely (Tailscale excels here).
- **Bypassing Corporate Restrictions**: Access blocked developer tools or documentation (use responsibly).
- **IoT Device Management**: Securely manage IoT devices without opening ports to the internet.
- **Multi-Region Testing**: Deploy VPN servers in different regions to test CDN behavior and latency.
- **Secure CI/CD**: Jenkins/GitLab runners can access private resources via VPN.
- **Kubernetes Cluster Access**: Connect to private Kubernetes clusters without exposing the API server.

### Example: Database Access
```bash
# Without VPN - Can't connect
psql -h 10.0.1.50 -U admin -d production
# Error: Connection timeout

# With VPN - Direct access
sudo wg-quick up wg0
psql -h 10.0.1.50 -U admin -d production

# Connected!
```

## Security Best Practices

- **Use Strong Encryption**: Always use AES-256 or ChaCha20
- **Enable 2FA**: For OpenVPN, integrate with Google Authenticator
- **Regular Key Rotation**: Rotate WireGuard keys every 3-6 months
- **Firewall Rules**: Only allow necessary traffic through VPN
- **Kill Switch**: Configure clients to block internet if VPN drops
- **DNS Leak Prevention**: Force all DNS through VPN
- **Audit Logs**: Monitor connection logs for suspicious activity
- **Limit Privileges**: Use least-privilege access for VPN users
- **Certificate Expiry Monitoring**: Set reminders for certificate renewal
- **Regular Updates**: Keep VPN software up to date

### OpenVPN Kill Switch
```bash
# Add to client config
pull-filter ignore "route-ipv6"
pull-filter ignore "ifconfig-ipv6"
route-nopull
route-method exe
route-delay 2
up /etc/openvpn/update-resolv-conf
down /etc/openvpn/update-resolv-conf
script-security 2
```

### WireGuard Kill Switch (using UFW)
```bash
# Block all non-VPN traffic
sudo ufw default deny outgoing
sudo ufw default deny incoming
sudo ufw allow out on wg0
sudo ufw allow in on wg0
sudo ufw allow out to <VPN_SERVER_IP> port 51820 proto udp
sudo ufw enable
```

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
