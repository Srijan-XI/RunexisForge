# SSH & SSL/TLS - Secure Communication

## Table of Contents
- [Introduction](#introduction)
- [SSH (Secure Shell)](#ssh-secure-shell)
  - [SSH Key Management](#ssh-key-management)
  - [SSH Config File](#ssh-config-file)
  - [SSH Agent and Key Forwarding](#ssh-agent-and-key-forwarding)
  - [SSH Tunneling and Port Forwarding](#ssh-tunneling-and-port-forwarding)
  - [SSH Hardening and Security](#ssh-hardening-and-security)
  - [Advanced SSH Features](#advanced-ssh-features)
- [SSL/TLS Certificates](#ssltls-certificates)
  - [Understanding SSL/TLS](#understanding-ssltls)
  - [Certificate Generation](#certificate-generation)
  - [Certificate Authority (CA)](#certificate-authority-ca)
  - [Let's Encrypt Automation](#lets-encrypt-automation)
  - [Certificate Formats and Conversion](#certificate-formats-and-conversion)
  - [Mutual TLS (mTLS)](#mutual-tls-mtls)
  - [Certificate Chain Validation](#certificate-chain-validation)
- [OpenSSL Command Reference](#openssl-command-reference)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**SSH (Secure Shell)** is the standard protocol for accessing remote servers securely, replacing insecure protocols like Telnet and FTP. **SSL/TLS (Secure Sockets Layer/Transport Layer Security)** is the foundation of HTTPS and secure network communications.

### Why SSH and SSL/TLS Matter

**SSH Benefits:**
- Secure remote access to servers
- Encrypted file transfers (SFTP, SCP)
- Secure tunneling for databases and services
- Authentication without passwords
- Automation and scripting

**SSL/TLS Benefits:**
- Encrypted web traffic (HTTPS)
- Data integrity and authentication
- Protects against man-in-the-middle attacks
- Required for modern web applications
- Compliance requirements (PCI DSS, HIPAA)

### Use Cases

- Remote server administration
- Automated deployments and CI/CD
- Secure database connections
- HTTPS websites and APIs
- Service-to-service communication (mTLS)
- VPN and tunneling

---

## SSH (Secure Shell)

### SSH Key Management

#### Generating SSH Keys

**Ed25519 (Recommended - Modern, Secure, Fast):**

```bash
# Generate Ed25519 key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Output:
# Generating public/private ed25519 key pair.
# Enter file in which to save the key (~/.ssh/id_ed25519):
# Enter passphrase (empty for no passphrase):

# Key files created:
# ~/.ssh/id_ed25519       (private key - NEVER share)
# ~/.ssh/id_ed25519.pub   (public key - safe to share)
```

**RSA (Legacy Compatibility):**

```bash
# Generate RSA 4096-bit key
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Files created:
# ~/.ssh/id_rsa
# ~/.ssh/id_rsa.pub
```

**ECDSA:**

```bash
# Generate ECDSA key
ssh-keygen -t ecdsa -b 521 -C "your_email@example.com"
```

#### Key Management Best Practices

```bash
# Use descriptive filenames
ssh-keygen -t ed25519 -f ~/.ssh/github_ed25519 -C "GitHub"
ssh-keygen -t ed25519 -f ~/.ssh/work_servers_ed25519 -C "Work Servers"
ssh-keygen -t ed25519 -f ~/.ssh/personal_vps_ed25519 -C "Personal VPS"

# Always use passphrase for private keys
ssh-keygen -t ed25519 -C "protected_key" -N "strong-passphrase"

# Set proper permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/authorized_keys
```

#### Copy Public Key to Server

```bash
# Method 1: ssh-copy-id (easiest)
ssh-copy-id user@hostname

# With specific key
ssh-copy-id -i ~/.ssh/work_ed25519.pub user@server.com

# Method 2: Manual copy
cat ~/.ssh/id_ed25519.pub | ssh user@hostname "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# Method 3: Direct paste
# Copy public key
cat ~/.ssh/id_ed25519.pub

# SSH to server and paste into ~/.ssh/authorized_keys
ssh user@hostname
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "ssh-ed25519 AAAA...your_public_key" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

#### List and Manage Keys

```bash
# List SSH keys
ls -la ~/.ssh/

# View public key
cat ~/.ssh/id_ed25519.pub

# View fingerprint
ssh-keygen -lf ~/.ssh/id_ed25519.pub

# Change passphrase
ssh-keygen -p -f ~/.ssh/id_ed25519

# Remove passphrase
ssh-keygen -p -f ~/.ssh/id_ed25519 -N ""

# Test SSH connection
ssh -T git@github.com
```

---

### SSH Config File

Stop typing long SSH commands. Create `~/.ssh/config`:

#### Basic Configuration

```ssh
# ~/.ssh/config

# Personal GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_ed25519
    IdentitiesOnly yes

# Work GitHub
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/work_github_ed25519
    IdentitiesOnly yes

# Production Server
Host prod
    HostName 203.0.113.10
    User deploy
    Port 2222
    IdentityFile ~/.ssh/production_ed25519
    ForwardAgent yes

# Bastion/Jump Host
Host bastion
    HostName bastion.company.com
    User admin
    IdentityFile ~/.ssh/company_ed25519
    
# Database Server (via bastion)
Host db
    HostName db.internal.company.com
    User dbadmin
    ProxyJump bastion
    LocalForward 5432 localhost:5432
```

**Usage:**

```bash
# Instead of:
ssh -i ~/.ssh/production_ed25519 -p 2222 deploy@203.0.113.10

# Just type:
ssh prod

# GitHub work account:
git clone git@github-work:company/repo.git
```

#### Advanced Config Options

```ssh
# Development servers with wildcard
Host dev-*
    User developer
    IdentityFile ~/.ssh/dev_key
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
    LogLevel QUIET

# High-security production
Host prod-*
    User deploy
    Port 2222
    IdentityFile ~/.ssh/prod_key
    StrictHostKeyChecking yes
    PasswordAuthentication no
    PubkeyAuthentication yes
    ServerAliveInterval 60
    ServerAliveCountMax 3
    
# AWS EC2 instances
Host ec2-*
    User ec2-user
    IdentityFile ~/.ssh/aws-keypair.pem
    StrictHostKeyChecking no

# All hosts default settings
Host *
    AddKeysToAgent yes
    UseKeychain yes  # macOS only
    IdentitiesOnly yes
    Compression yes
    TCPKeepAlive yes
    ServerAliveInterval 60
```

#### Config File Permissions

```bash
chmod 600 ~/.ssh/config
```

---

### SSH Agent and Key Forwarding

#### SSH Agent

The SSH agent holds your private keys in memory, so you don't need to enter passphrases repeatedly.

**Start SSH Agent:**

```bash
# Check if agent is running
echo $SSH_AUTH_SOCK

# Start agent (if not running)
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Add key with passphrase
ssh-add ~/.ssh/work_ed25519
# Enter passphrase

# List loaded keys
ssh-add -l

# Remove key from agent
ssh-add -d ~/.ssh/id_ed25519

# Remove all keys
ssh-add -D

# Kill agent
ssh-agent -k
```

**Auto-start on Login:**

```bash
# ~/.bashrc or ~/.zshrc
if [ -z "$SSH_AUTH_SOCK" ]; then
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_ed25519 2>/dev/null
fi
```

**macOS Keychain Integration:**

```bash
# Add to keychain
ssh-add --apple-use-keychain ~/.ssh/id_ed25519

# ~/.ssh/config
Host *
    AddKeysToAgent yes
    UseKeychain yes
```

#### SSH Agent Forwarding

Forward your local SSH keys to remote servers (use carefully!):

```bash
# Enable agent forwarding
ssh -A user@server

# In SSH config
Host jumpserver
    ForwardAgent yes
```

**Security Warning:** Only use agent forwarding on trusted servers. Admins on the remote server can use your forwarded keys.

**Better Alternative - ProxyJump:**

```bash
# Instead of agent forwarding
ssh -J bastion@jumphost user@targetserver

# Or in config:
Host targetserver
    ProxyJump bastion@jumphost
```

---

### SSH Tunneling and Port Forwarding

#### Local Port Forwarding

Access remote service on local port:

```bash
# Forward local port 9000 to remote db:5432
ssh -L 9000:localhost:5432 user@dbserver

# Access DB at localhost:9000
psql -h localhost -p 9000 -U dbuser

# Forward local 8080 to remote service on different host
ssh -L 8080:internal-server:80 user@bastion

# Multiple forwards
ssh -L 3306:db1:3306 -L 6379:redis:6379 user@server

# Background tunnel
ssh -fN -L 5432:localhost:5432 user@dbserver
# -f: background
# -N: no command execution
```

#### Remote Port Forwarding

Expose local service to remote server:

```bash
# Make local port 3000 available on remote port 8080
ssh -R 8080:localhost:3000 user@server

# Example: Share local development site
ssh -R 8080:localhost:3000 user@publicserver
# Now accessible at publicserver:8080

# Bind to all interfaces on remote
ssh -R 0.0.0.0:8080:localhost:3000 user@server
```

#### Dynamic Port Forwarding (SOCKS Proxy)

```bash
# Create SOCKS proxy on port 1080
ssh -D 1080 user@server

# Configure browser or application to use SOCKS5 proxy
# localhost:1080

# Route all traffic through SSH tunnel
ssh -D 1080 -C -q -N user@server
# -C: compression
# -q: quiet mode
# -N: no remote command
```

**Configure Firefox to use SOCKS proxy:**
1. Preferences → Network Settings
2. Manual proxy configuration
3. SOCKS Host: localhost, Port: 1080
4. SOCKS v5

#### SSH Tunnel as Systemd Service

```ini
# /etc/systemd/system/ssh-tunnel-db.service
[Unit]
Description=SSH Tunnel to Database
After=network.target

[Service]
User=youruser
ExecStart=/usr/bin/ssh -NT -o ServerAliveInterval=60 -L 5432:localhost:5432 user@dbserver
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable ssh-tunnel-db
sudo systemctl start ssh-tunnel-db
```

---

### SSH Hardening and Security

#### Server-Side SSH Configuration

Edit `/etc/ssh/sshd_config`:

```bash
# Disable root login
PermitRootLogin no

# Disable password authentication
PasswordAuthentication no
PubkeyAuthentication yes
ChallengeResponseAuthentication no

# Change default port (security through obscurity)
Port 2222

# Limit user access
AllowUsers deploy admin
# Or by group
AllowGroups sshusers

# Disable empty passwords
PermitEmptyPasswords no

# Use modern key exchange algorithms
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org

# Modern ciphers only
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com

# Modern MACs
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com

# Disconnect idle sessions
ClientAliveInterval 300
ClientAliveCountMax 2

# Limit authentication attempts
MaxAuthTries 3

# Disable X11 forwarding (if not needed)
X11Forwarding no

# Log level
LogLevel VERBOSE

# Restart SSH service after changes
sudo systemctl restart sshd
```

#### Fail2Ban (Brute Force Protection)

```bash
# Install Fail2Ban
sudo apt install fail2ban

# Configure
sudo nano /etc/fail2ban/jail.local
```

```ini
[sshd]
enabled = true
port = ssh,2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
```

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check banned IPs
sudo fail2ban-client status sshd
```

#### Two-Factor Authentication (2FA)

```bash
# Install Google Authenticator
sudo apt install libpam-google-authenticator

# Configure for user
google-authenticator

# Edit PAM configuration
sudo nano /etc/pam.d/sshd

# Add:
auth required pam_google_authenticator.so

# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Update:
ChallengeResponseAuthentication yes
AuthenticationMethods publickey,keyboard-interactive

sudo systemctl restart sshd
```

---

### Advanced SSH Features

#### SSH Certificate-Based Authentication

```bash
# Generate CA key
ssh-keygen -t ed25519 -f ca_key -C "SSH CA"

# Sign user public key
ssh-keygen -s ca_key -I user_identity -n username -V +52w ~/.ssh/id_ed25519.pub

# Configure SSH server to trust CA
# /etc/ssh/sshd_config
TrustedUserCAKeys /etc/ssh/ca_key.pub
```

#### SSH Jump Hosts/Bastions

```bash
# Single jump
ssh -J bastion user@target

# Multiple jumps
ssh -J bastion1,bastion2 user@target

# In config
Host target
    ProxyJump bastion1,bastion2
```

#### SSH Multiplexing

Share single connection for multiple sessions:

```ssh
# ~/.ssh/config
Host *
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
```

```bash
# First connection creates master
ssh server

# Subsequent connections reuse master (instant)
ssh server
scp file.txt server:/path/
```

#### Execute Commands Remotely

```bash
# Single command
ssh user@server 'uptime'

# Multiple commands
ssh user@server 'cd /var/www && git pull && sudo systemctl restart nginx'

# Interactive commands with TTY
ssh -t user@server 'sudo systemctl status nginx'

# Pipe local file to remote command
cat script.sh | ssh user@server 'bash -s'

# Execute local script on remote
ssh user@server 'bash -s' < local_script.sh
```

#### SFTP and SCP

```bash
# SCP (Simple file copy)
scp file.txt user@server:/path/to/destination
scp user@server:/remote/file.txt ./local/
scp -r directory/ user@server:/remote/path/

# SFTP (Interactive file transfer)
sftp user@server

# SFTP commands
sftp> ls
sftp> cd /remote/path
sftp> get remote_file.txt
sftp> put local_file.txt
sftp> mkdir newdir
sftp> rm file.txt
sftp> exit
```

---

## SSL/TLS Certificates

### Understanding SSL/TLS

**Key Components:**

1. **Private Key (.key)** - Secret key for decryption, never share
2. **Public Key / Certificate (.crt/.pem)** - Public certificate for encryption
3. **CSR (Certificate Signing Request)** - Request sent to CA for signing
4. **CA (Certificate Authority)** - Trusted entity that signs certificates (DigiCert, Let's Encrypt)
5. **Certificate Chain** - Intermediate + Root CA certificates
6. **Root Certificate** - Self-signed certificate trusted by browsers/OS

**TLS Handshake Process:**

1. Client Hello (supported ciphers, TLS version)
2. Server Hello (chosen cipher, certificate)
3. Certificate verification
4. Key exchange
5. Encrypted communication begins

---

### Certificate Generation

#### Self-Signed Certificates (Development Only)

```bash
# Generate private key and self-signed certificate (one command)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Without password protection (-nodes)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Generate with SAN (Subject Alternative Names)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1"

# Ed25519 (modern, faster)
openssl genpkey -algorithm ED25519 -out key.pem
openssl req -new -x509 -key key.pem -out cert.pem -days 365
```

#### Generate Private Key and CSR Separately

```bash
# Step 1: Generate private key
openssl genrsa -out private.key 4096

# Or with password protection
openssl genrsa -aes256 -out private.key 4096

# Step 2: Generate CSR
openssl req -new -key private.key -out request.csr

# With custom subject
openssl req -new -key private.key -out request.csr \
  -subj "/C=US/ST=California/L=SanFrancisco/O=MyCompany/CN=www.example.com"

# CSR with SAN
cat > san.cnf <<EOF
[req]
default_bits = 4096
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = v3_req

[dn]
C=US
ST=California
L=San Francisco
O=My Company
CN=example.com

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = example.com
DNS.2 = www.example.com
DNS.3 = *.example.com
IP.1 = 192.168.1.1
EOF

openssl req -new -key private.key -out request.csr -config san.cnf
```

#### Wildcard Certificates

```bash
# Generate CSR for wildcard domain
openssl req -new -key private.key -out wildcard.csr \
  -subj "/CN=*.example.com"
```

---

### Certificate Authority (CA)

#### Create Your Own CA (Internal Use)

```bash
# Generate CA private key
openssl genrsa -aes256 -out ca-key.pem 4096

# Generate CA certificate (root cert)
openssl req -new -x509 -days 3650 -key ca-key.pem -out ca-cert.pem \
  -subj "/C=US/ST=State/L=City/O=MyCompany/CN=MyCompany Root CA"

# Sign server CSR with your CA
openssl x509 -req -in request.csr -CA ca-cert.pem -CAkey ca-key.pem \
  -CAcreateserial -out signed-cert.pem -days 365 -sha256

# Sign with SAN
openssl x509 -req -in request.csr -CA ca-cert.pem -CAkey ca-key.pem \
  -CAcreateserial -out signed-cert.pem -days 365 -sha256 \
  -extensions v3_req -extfile san.cnf
```

---

### Let's Encrypt Automation

#### Certbot (Official Let's Encrypt Client)

**Installation:**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install certbot python3-certbot-nginx python3-certbot-apache

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx

# macOS
brew install certbot
```

**Obtain Certificate (Nginx):**

```bash
# Auto-configure Nginx
sudo certbot --nginx -d example.com -d www.example.com

# Manual certificate only (no auto-config)
sudo certbot certonly --nginx -d example.com -d www.example.com

# Standalone (requires port 80 to be free)
sudo certbot certonly --standalone -d example.com

# Webroot (existing web server)
sudo certbot certonly --webroot -w /var/www/html -d example.com

# DNS challenge (wildcard certificates)
sudo certbot certonly --manual --preferred-challenges dns -d *.example.com
```

**Obtain Certificate (Apache):**

```bash
# Auto-configure Apache
sudo certbot --apache -d example.com -d www.example.com
```

**Automatic Renewal:**

```bash
# Test renewal
sudo certbot renew --dry-run

# Renew (run as cron job)
sudo certbot renew

# Renew with hooks
sudo certbot renew --deploy-hook "systemctl reload nginx"

# Cron job (runs twice daily)
sudo crontab -e
# Add:
0 0,12 * * * certbot renew --quiet --deploy-hook "systemctl reload nginx"
```

**Systemd Timer (Modern):**

```bash
# Enable automatic renewal
sudo systemctl enable certbot-renew.timer
sudo systemctl start certbot-renew.timer

# Check timer status
sudo systemctl list-timers certbot-renew
```

#### acme.sh (Alternative Client - Pure Shell Script)

```bash
# Install
curl https://get.acme.sh | sh -s email=my@example.com

# Issue certificate (with auto-renewal)
acme.sh --issue -d example.com -w /var/www/html

# Issue with DNS challenge (Cloudflare)
export CF_Token="your-cloudflare-api-token"
acme.sh --issue --dns dns_cf -d example.com -d *.example.com

# Install certificate
acme.sh --install-cert -d example.com \
  --key-file /etc/nginx/ssl/key.pem \
  --fullchain-file /etc/nginx/ssl/cert.pem \
  --reloadcmd "systemctl reload nginx"

# Renew
acme.sh --renew -d example.com
```

---

### Certificate Formats and Conversion

**Common Formats:**

- **PEM** (.pem, .crt, .cer): Base64 encoded, most common
- **DER** (.der, .cer): Binary encoding
- **PKCS#7** (.p7b, .p7c): Bundle multiple certificates
- **PKCS#12** (.pfx, .p12): Certificate + private key (password protected)
- **JKS** (.jks): Java KeyStore

**Conversions:**

```bash
# PEM to DER
openssl x509 -outform der -in cert.pem -out cert.der

# DER to PEM
openssl x509 -inform der -in cert.der -out cert.pem

# PEM to PKCS#12 (with private key)
openssl pkcs12 -export -out certificate.pfx \
  -inkey private.key -in certificate.crt -certfile ca-chain.crt

# PKCS#12 to PEM
openssl pkcs12 -in certificate.pfx -out certificate.pem -nodes

# Extract private key from PKCS#12
openssl pkcs12 -in certificate.pfx -nocerts -out private.key -nodes

# Extract certificate from PKCS#12
openssl pkcs12 -in certificate.pfx -clcerts -nokeys -out certificate.crt

# Convert PEM bundle to individual files
openssl pkcs12 -in bundle.p12 -out cert.pem -clcerts -nokeys
openssl pkcs12 -in bundle.p12 -out key.pem -nocerts -nodes

# Create certificate chain
cat certificate.crt intermediate.crt root.crt > chain.pem
```

---

### Mutual TLS (mTLS)

Client and server both authenticate with certificates.

**Server Configuration (Nginx):**

```nginx
server {
    listen 443 ssl;
    server_name example.com;
    
    # Server certificate
    ssl_certificate /etc/nginx/ssl/server-cert.pem;
    ssl_certificate_key /etc/nginx/ssl/server-key.pem;
    
    # Client certificate verification
    ssl_client_certificate /etc/nginx/ssl/ca-cert.pem;
    ssl_verify_client on;
    ssl_verify_depth 2;
    
    location / {
        # Pass client cert info to backend
        proxy_set_header X-SSL-Client-Cert $ssl_client_cert;
        proxy_set_header X-SSL-Client-DN $ssl_client_s_dn;
        proxy_pass http://backend;
    }
}
```

**Client Certificate Generation:**

```bash
# Generate client private key
openssl genrsa -out client-key.pem 4096

# Generate client CSR
openssl req -new -key client-key.pem -out client.csr \
  -subj "/CN=client@example.com"

# Sign with CA
openssl x509 -req -in client.csr -CA ca-cert.pem -CAkey ca-key.pem \
  -CAcreateserial -out client-cert.pem -days 365

# Create PKCS#12 for browser import
openssl pkcs12 -export -out client.pfx \
  -inkey client-key.pem -in client-cert.pem -certfile ca-cert.pem

# Test with curl
curl --cert client-cert.pem --key client-key.pem https://example.com
```

**mTLS with Docker:**

```yaml
# docker-compose.yml
services:
  app:
    image: myapp
    volumes:
      - ./certs/client-cert.pem:/app/cert.pem
      - ./certs/client-key.pem:/app/key.pem
      - ./certs/ca-cert.pem:/app/ca.pem
    environment:
      - TLS_CERT_FILE=/app/cert.pem
      - TLS_KEY_FILE=/app/key.pem
      - TLS_CA_FILE=/app/ca.pem
```

---

### Certificate Chain Validation

**Understanding Certificate Chains:**

```
Root CA (trusted by OS/browser)
  └── Intermediate CA
      └── End Entity Certificate (your server)
```

**Build Certificate Chain:**

```bash
# Correct order in chain file:
# 1. Your certificate
# 2. Intermediate certificate(s)
# 3. Root certificate (optional)

cat server-cert.pem intermediate-cert.pem root-cert.pem > fullchain.pem

# Or
cat server-cert.pem intermediate-cert.pem > chain.pem
```

**Verify Certificate Chain:**

```bash
# Verify certificate against CA
openssl verify -CAfile ca-cert.pem server-cert.pem

# Verify with intermediate
openssl verify -CAfile root-cert.pem -untrusted intermediate-cert.pem server-cert.pem

# Check certificate chain from server
openssl s_client -connect example.com:443 -showcerts

# Check certificate expiration
openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates

# Test specific protocol version
openssl s_client -connect example.com:443 -tls1_3
```

**View Certificate Chain:**

```bash
# From website
echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -text

# Certificate chain details
openssl s_client -connect example.com:443 -showcerts </dev/null
```

---

## OpenSSL Command Reference

### Certificate Information

```bash
# View certificate details
openssl x509 -in cert.pem -text -noout

# View certificate dates
openssl x509 -in cert.pem -noout -dates

# View certificate subject
openssl x509 -in cert.pem -noout -subject

# View certificate issuer
openssl x509 -in cert.pem -noout -issuer

# View certificate fingerprint
openssl x509 -in cert.pem -noout -fingerprint -sha256

# View SAN
openssl x509 -in cert.pem -noout -ext subjectAltName

# Check certificate/key match
openssl x509 -noout -modulus -in cert.pem | openssl md5
openssl rsa -noout -modulus -in key.pem | openssl md5
# If MD5 hashes match, they're a pair
```

### CSR Information

```bash
# View CSR details
openssl req -in request.csr -text -noout

# Verify CSR signature
openssl req -in request.csr -verify -noout
```

### Private Key Operations

```bash
# View private key
openssl rsa -in private.key -text -noout

# Remove password from key
openssl rsa -in encrypted.key -out decrypted.key

# Add password to key
openssl rsa -aes256 -in key.pem -out encrypted-key.pem

# Check if key is encrypted
openssl rsa -in key.pem -check -noout

# Generate random password
openssl rand -base64 32
```

### Testing and Validation

```bash
# Test HTTPS connection
openssl s_client -connect example.com:443

# Test with SNI
openssl s_client -servername example.com -connect example.com:443

# Test specific TLS version
openssl s_client -connect example.com:443 -tls1_2
openssl s_client -connect example.com:443 -tls1_3

# Show supported ciphers
openssl ciphers -v 'HIGH:!aNULL:!MD5'

# Benchmark
openssl speed rsa2048
openssl speed aes-256-gcm
```

### File Operations

```bash
# Combine certificates
cat cert1.pem cert2.pem > combined.pem

# Split certificate bundle
awk '/BEGIN/,/END/{ if(/BEGIN/){a++}; out="cert"a".pem"; print >out}' bundle.pem

# Create PEM bundle
cat server.crt intermediate.crt root.crt > bundle.pem

# Validate PEM file
openssl x509 -in cert.pem -text -noout
# Returns nothing if invalid
```

---

## Troubleshooting

### Common SSL/TLS Issues

#### 1. Certificate Not Trusted

**Problem:** Browser shows "Not Secure" or "Certificate not trusted"

**Solutions:**

```bash
# Check certificate chain
openssl s_client -connect example.com:443 -showcerts

# Verify root and intermediate certificates are included
# Nginx example:
ssl_certificate /path/to/fullchain.pem;  # Include intermediate + cert

# Apache example:
SSLCertificateFile /path/to/cert.pem
SSLCertificateChainFile /path/to/intermediate.pem
```

#### 2. Certificate/Key Mismatch

**Problem:** SSL Error on server start

**Solution:**

```bash
# Compare modulus
openssl x509 -noout -modulus -in cert.pem | openssl md5
openssl rsa -noout -modulus -in key.pem | openssl md5
# Should match

# Check certificate/key pair
openssl x509 -noout -text -in cert.pem | grep Public-Key
openssl rsa -noout -text -in key.pem | grep Private-Key
# Bit length should match
```

#### 3. Certificate Expired

**Problem:** Certificate has expired

**Solution:**

```bash
# Check expiration
openssl x509 -in cert.pem -noout -enddate

# Renew with Let's Encrypt
sudo certbot renew

# Or obtain new certificate
```

#### 4. Mixed Content Warnings

**Problem:** HTTPS site loading HTTP resources

**Solution:**

```html
<!-- Use protocol-relative URLs -->
<script src="//example.com/script.js"></script>

<!-- Or force HTTPS -->
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

#### 5. SSH Connection Refused

**Problem:** `Connection refused` or `Connection timed out`

**Solutions:**

```bash
# Check if SSH service is running
sudo systemctl status sshd

# Check firewall
sudo ufw status
sudo ufw allow 22/tcp

# Check port
sudo netstat -tlnp | grep ssh

# Test connection
telnet server 22
nc -zv server 22

# Verbose SSH debug
ssh -vvv user@server
```

#### 6. Permission Denied (SSH)

**Problem:** SSH authentication fails

**Solutions:**

```bash
# Check permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/config
chmod 644 ~/.ssh/id_rsa.pub

# Check authorized_keys on server
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Debug
ssh -vvv user@server
# Look for "Permission denied (publickey)"

# Check if key is loaded
ssh-add -l

# Server-side logs
sudo tail -f /var/log/auth.log  # Debian/Ubuntu
sudo tail -f /var/log/secure     # CentOS/RHEL
```

### Debugging Tools

```bash
# SSL Labs (online)
# https://www.ssllabs.com/ssltest/

# testssl.sh (comprehensive SSL/TLS testing)
git clone https://github.com/drwetter/testssl.sh.git
cd testssl.sh
./testssl.sh example.com

# Check certificate transparency logs
# https://crt.sh

# nmap SSL scan
nmap --script ssl-enum-ciphers -p 443 example.com

# Check OCSP stapling
openssl s_client -connect example.com:443 -status
```

---

## Best Practices

### SSH Security

1. ✅ **Use SSH keys, not passwords**
2. ✅ **Use Ed25519 keys** (or RSA 4096)
3. ✅ **Protect private keys with passphrases**
4. ✅ **Disable root login** (`PermitRootLogin no`)
5. ✅ **Disable password authentication**
6. ✅ **Change default SSH port** (optional)
7. ✅ **Use SSH config** for connection management
8. ✅ **Enable SSH multiplexing** for performance
9. ✅ **Use Fail2Ban** for brute force protection
10. ✅ **Regular key rotation**

### SSL/TLS Security

1. ✅ **Use strong private keys** (RSA 4096 or Ed25519)
2. ✅ **Enable TLS 1.2 and 1.3 only**
3. ✅ **Use strong cipher suites**
4. ✅ **Enable HSTS** (HTTP Strict Transport Security)
5. ✅ **Enable OCSP Stapling**
6. ✅ **Use CAA DNS records**
7. ✅ **Regular certificate renewal**
8. ✅ **Monitor certificate expiration**
9. ✅ **Include full certificate chain**
10. ✅ **Test with SSL Labs**

### Certificate Management

```bash
# Certificate expiration monitoring script
#!/bin/bash
DOMAIN="example.com"
DAYS=30

EXPIRY=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | \
  openssl x509 -noout -enddate | cut -d= -f2)

EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s)
NOW_EPOCH=$(date +%s)
DAYS_LEFT=$(( ($EXPIRY_EPOCH - $NOW_EPOCH) / 86400 ))

if [ $DAYS_LEFT -lt $DAYS ]; then
  echo "Certificate for $DOMAIN expires in $DAYS_LEFT days!"
  # Send alert
fi
```

---

## Resources

### Official Documentation

- [OpenSSH Manual](https://www.openssh.com/manual.html)
- [OpenSSL Documentation](https://www.openssl.org/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)

### Security Tools

- [SSL Labs Test](https://www.ssllabs.com/ssltest/)
- [testssl.sh](https://github.com/drwetter/testssl.sh)
- [Certificate Transparency Log](https://crt.sh/)
- [SSH Audit](https://github.com/jtesta/ssh-audit)

### Books and Guides

- [OpenSSL Cookbook](https://www.feistyduck.com/books/openssl-cookbook/) by Ivan Ristić
- [Bulletproof SSL and TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)
- [SSH, The Secure Shell: The Definitive Guide](https://www.oreilly.com/library/view/ssh-the-secure/0596008953/)

### Best Practice Guides

- [Mozilla Server Side TLS](https://wiki.mozilla.org/Security/Server_Side_TLS)
- [OWASP Transport Layer Protection](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html)
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks/)

### Communities

- [r/sysadmin](https://reddit.com/r/sysadmin)
- [r/netsec](https://reddit.com/r/netsec)
- [Stack Overflow - SSH](https://stackoverflow.com/questions/tagged/ssh)
- [Stack Overflow - OpenSSL](https://stackoverflow.com/questions/tagged/openssl)

---

## Summary

**SSH Quick Reference:**
- Generate keys: `ssh-keygen -t ed25519`
- Copy to server: `ssh-copy-id user@host`
- Use config: `~/.ssh/config`
- Port forwarding: `ssh -L local:remote:port user@host`
- Agent: `ssh-add ~/.ssh/id_ed25519`

**SSL/TLS Quick Reference:**
- Self-signed: `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes`
- Let's Encrypt: `sudo certbot --nginx -d example.com`
- View cert: `openssl x509 -in cert.pem -text -noout`
- Test connection: `openssl s_client -connect example.com:443`
- Convert formats: `openssl x509 -inform der -in cert.der -out cert.pem`

**Security Checklist:**
- [ ] SSH keys with passphrases
- [ ] Disable password authentication
- [ ] Use SSH config for management
- [ ] TLS 1.2/1.3 only
- [ ] Strong ciphers
- [ ] Valid certificate chain
- [ ] Automated certificate renewal
- [ ] Monitor expiration
- [ ] Regular security audits

Happy securing! 🔒
