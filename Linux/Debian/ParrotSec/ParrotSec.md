# Parrot Security OS (ParrotSec)

## Introduction

Parrot Security OS (commonly called Parrot or ParrotSec) is a Debian-based Linux distribution designed for security testing, digital forensics, privacy protection, and software development. Developed by the Frozenbox Team, Parrot OS distinguishes itself from Kali Linux by combining offensive security tools with privacy features and a lightweight desktop environment suitable for daily use.

### Philosophy and Vision

- **Security + Privacy**: Offensive security tools with privacy protection
- **Lightweight**: Runs efficiently on older hardware
- **Developer-Friendly**: Full development environment included
- **Anonymous**: Built-in anonymity tools (AnonSurf)
- **Multi-Purpose**: Security testing, privacy, development
- **Community-Driven**: Open-source and community-focused

### Key Characteristics

- **Base**: Debian Testing (rolling release)
- **Desktop Environment**: MATE (default), KDE Plasma option
- **Package Manager**: APT with Parrot repositories
- **Init System**: systemd
- **Kernel**: Custom hardened kernel
- **Tool Count**: 700+ security and privacy tools
- **Editions**: Home, Security, Architect, Cloud
- **Size**: Lightweight (~2.5 GB ISO)

### Target Audience

- **Security Professionals**: Penetration testers and ethical hackers
- **Privacy Advocates**: Users prioritizing anonymity
- **Developers**: Software developers and programmers
- **Forensics Experts**: Digital forensics investigators
- **Students**: Cybersecurity and Linux learners
- **Privacy-Conscious Users**: Daily driver with privacy focus
- **CTF Players**: Capture The Flag participants

### Use Cases

- Penetration testing and security auditing
- Digital forensics and incident response
- Privacy-focused daily computing
- Software development (Python, Go, C/C++, Java)
- Network analysis and monitoring
- Wireless security testing
- Web application testing
- Malware analysis and reverse engineering
- Anonymous communication and browsing
- Cloud penetration testing

## Resources

### Official Resources

- **Website**: <https://parrotsec.org>
- **Documentation**: <https://parrotsec.org/docs/>
- **Download**: <https://parrotsec.org/download/>
- **Community**: <https://community.parrotsec.org>
- **Blog**: <https://blog.parrotsec.org>
- **Wiki**: <https://parrotsec.org/docs/>
- **GitLab**: <https://gitlab.com/parrotsec>

### Community Resources

- **Forum**: <https://community.parrotsec.org>
- **Telegram**: <https://t.me/parrotsec>
- **Discord**: Parrot Security OS server
- **Matrix**: #parrotsec:matrix.org
- **Reddit**: r/ParrotSecurity
- **Twitter**: @ParrotSec

### Learning Resources

- [Official Documentation](https://parrotsec.org/docs/)
- [Parrot Tools](https://parrotsec.org/docs/tools/)
- [Community Tutorials](https://community.parrotsec.org/c/tutorials)
- [TryHackMe](https://tryhackme.com) - Hands-on security training
- [HackTheBox](https://hackthebox.com) - Practice platform

---

## Parrot Editions

### Parrot Security Edition

```
Purpose: Full penetration testing and security auditing
Size: ~4.5 GB
Tools: 700+ security tools pre-installed
Desktop: MATE or KDE Plasma
Target: Security professionals, pentesters

Includes:
- Full Metasploit Framework
- Burp Suite
- Aircrack-ng suite
- Wireshark
- John the Ripper
- Hashcat
- Nmap
- SQLMap
- And 690+ more tools

Use Case: Professional security testing
```

### Parrot Home Edition

```
Purpose: Privacy-focused daily use
Size: ~2.5 GB
Tools: Privacy and cryptography tools
Desktop: MATE (lightweight)
Target: Privacy-conscious users, developers

Includes:
- AnonSurf (anonymity system)
- Tor Browser
- OnionShare
- Metadata Anonymisation Toolkit
- Development tools
- Office suite
- Basic utilities

Use Case: Daily driver with privacy focus
```

### Parrot Architect Edition

```
Purpose: Minimal installation
Size: ~900 MB
Tools: None pre-installed
Desktop: Netinstall (choose your own)
Target: Advanced users, custom setups

Features:
- Minimal base system
- Build your own Parrot
- Choose tools and desktop
- Custom installations

Use Case: Advanced customization
```

### Parrot Cloud/Headless Edition

```
Purpose: Server/cloud deployments
Size: ~500 MB
Tools: Command-line security tools
Desktop: None (CLI only)
Target: Server deployments, cloud pentesting

Features:
- No GUI
- Minimal footprint
- Docker-ready
- Remote access optimized

Use Case: Cloud penetration testing, VPS
```

---

## Installation

### System Requirements

**Minimum**:
- **RAM**: 1 GB (2+ GB recommended)
- **Disk**: 20 GB
- **Processor**: 1 GHz dual-core
- **Architecture**: x86-64, ARM

**Recommended**:
- **RAM**: 4+ GB
- **Disk**: 40+ GB SSD
- **Processor**: 2+ GHz quad-core
- **Graphics**: Modern GPU
- **Network**: WiFi card supporting monitor mode

### Installation Methods

#### 1. Bare Metal Installation

```bash
# Download ISO
wget https://download.parrot.sh/parrot/iso/5.3/Parrot-security-5.3_amd64.iso

# Verify checksum
sha256sum Parrot-security-5.3_amd64.iso
# Compare with official checksums

# Create bootable USB
sudo dd if=Parrot-security-5.3_amd64.iso of=/dev/sdX bs=4M status=progress
sudo sync

# Boot from USB and install
```

**Installation Steps**:
1. Boot from USB
2. Select "Install" (or "Graphical Install")
3. Language and location
4. Keyboard layout
5. Network configuration
6. User creation (NOT root for daily use)
7. Disk partitioning
8. Package selection
9. GRUB installation
10. Reboot

#### 2. Virtual Machine

```bash
# VMware/VirtualBox
- Import OVA file (pre-built VM available)
- Or install from ISO

# Recommended VM settings:
RAM: 4+ GB
Disk: 40+ GB (dynamic)
CPUs: 2+ cores
Network: NAT or Bridged
USB: Enable 3.0 for wireless adapters

# Default credentials (change immediately):
Username: user
Password: toor (or set during install)
```

#### 3. Docker Container

```bash
# Official Parrot Docker images
docker pull parrotsec/security

# Run container
docker run -it --name parrot parrotsec/security /bin/bash

# Inside container
apt update
apt install parrot-tools-cloud

# Persistent container
docker run -it --name parrot -v parrot-data:/root parrotsec/security
```

#### 4. WSL (Windows Subsystem for Linux)

```bash
# Install WSL2
wsl --install

# Install Parrot (requires manual import)
# Download rootfs from Parrot website
wsl --import ParrotSec C:\WSL\ParrotSec parrot-rootfs.tar.gz

# Launch
wsl -d ParrotSec

# Update
sudo apt update
sudo apt full-upgrade
```

### Post-Installation Setup

```bash
# Update system
sudo parrot-upgrade
# Or
sudo apt update && sudo apt full-upgrade

# Change default password
passwd

# Install additional tools (if needed)
sudo apt install parrot-tools-full

# Enable firewall
sudo ufw enable
sudo ufw status

# Configure AnonSurf (Parrot Home/Security)
sudo anonsurf start      # Enable anonymous mode
sudo anonsurf myip       # Check current IP
sudo anonsurf stop       # Disable

# Install development tools
sudo apt install build-essential git curl
```

---

## Package Management

### APT in Parrot

```bash
# Parrot-specific upgrade command
sudo parrot-upgrade
# This handles updates, upgrades, and cleanup

# Standard APT commands
sudo apt update
sudo apt upgrade
sudo apt full-upgrade

# Search for packages
apt search keyword
apt search --names-only nmap

# Install packages
sudo apt install package-name

# Remove packages
sudo apt remove package-name
sudo apt purge package-name
sudo apt autoremove
```

### Parrot Metapackages

```bash
# Security tools
sudo apt install parrot-tools-full          # All tools
sudo apt install parrot-tools-cloud         # Headless tools
sudo apt install parrot-tools-web           # Web testing
sudo apt install parrot-tools-wireless      # Wireless testing
sudo apt install parrot-tools-forensic      # Forensics
sudo apt install parrot-tools-crypto        # Cryptography
sudo apt install parrot-tools-passwords     # Password cracking
sudo apt install parrot-tools-exploitation  # Exploitation frameworks
sudo apt install parrot-tools-maintain      # Maintenance tools

# Desktop environments
sudo apt install parrot-desktop-mate        # MATE (default)
sudo apt install parrot-desktop-kde         # KDE Plasma

# Development
sudo apt install parrot-devel-tools         # Dev tools
```

### Parrot Repositories

```bash
# View sources
cat /etc/apt/sources.list.d/parrot.list

# Parrot repositories
deb https://deb.parrot.sh/parrot/ parrot main contrib non-free non-free-firmware
deb https://deb.parrot.sh/parrot/ parrot-security main contrib non-free non-free-firmware

# Update sources
sudo apt update
```

---

## Privacy and Anonymity Features

### AnonSurf

AnonSurf is Parrot's built-in anonymity system that routes all traffic through Tor.

```bash
# Start anonymous mode
sudo anonsurf start

# Check current IP
sudo anonsurf myip

# Change Tor identity
sudo anonsurf changeid
sudo anonsurf change

# Change MAC address
sudo anonsurf changemac

# Stop AnonSurf
sudo anonsurf stop

# Restart AnonSurf
sudo anonsurf restart

# Check status
sudo anonsurf status

# View AnonSurf logs
sudo anonsurf log

# DNS leak test
# Visit: https://www.dnsleaktest.com
```

**How AnonSurf Works**:
- Routes all traffic through Tor network
- Changes MAC address
- Configures iptables for anonymity
- DNS queries through Tor
- Prevents IP leaks

**Cautions**:
- Slower internet speeds
- Some websites may block Tor
- Not 100% anonymous (use with best practices)
- JavaScript can de-anonymize

### Tor Browser

```bash
# Pre-installed in Parrot Security/Home
# Launch from menu or:
torbrowser

# Features:
- NoScript (JavaScript blocking)
- HTTPS Everywhere
- Tor network routing
- Anti-fingerprinting
- Private browsing
```

### OnionShare

```bash
# Anonymous file sharing
onionshare

# Features:
- Share files anonymously via Tor
- Host anonymous websites
- Chat anonymously
- No registration required
```

### MAT2 (Metadata Anonymisation Toolkit)

```bash
# Remove metadata from files
mat2 file.jpg
mat2 document.pdf

# Show metadata
mat2 --show file.jpg

# Clean all files in directory
mat2 *.jpg

# Supported formats:
- Images (JPEG, PNG, GIF)
- Documents (PDF, Office documents)
- Audio/Video
- Archives
```

---

## Security Testing Tools

### Network Analysis

```bash
# Nmap - Network scanner
nmap -sV -sC target.com
nmap -p- target.com

# Wireshark - Packet analyzer
wireshark

# Netdiscover - ARP reconnaissance
sudo netdiscover -r 192.168.1.0/24

# Masscan - Fast port scanner
masscan -p1-65535 target.com --rate=1000
```

### Web Application Testing

```bash
# Burp Suite
burpsuite

# OWASP ZAP
zaproxy

# Nikto
nikto -h http://target.com

# WPScan (WordPress)
wpscan --url http://target.com

# SQLMap
sqlmap -u "http://target.com/page?id=1"

# Dirb / Gobuster
dirb http://target.com
gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt
```

### Wireless Security

```bash
# Aircrack-ng suite
sudo airmon-ng start wlan0
sudo airodump-ng wlan0mon
sudo aireplay-ng -0 10 -a BSSID wlan0mon
aircrack-ng -w wordlist.txt capture.cap

# Wifite (automated)
sudo wifite

# Reaver (WPS attacks)
sudo reaver -i wlan0mon -b BSSID -vv

# Bettercap
sudo bettercap -iface eth0
```

### Password Attacks

```bash
# John the Ripper
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt

# Hashcat (GPU)
hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt

# Hydra
hydra -l admin -P wordlist.txt ssh://target.com

# Crunch (wordlist generator)
crunch 8 8 -t pass%%%% -o wordlist.txt
```

### Exploitation

```bash
# Metasploit Framework
msfconsole

# SET (Social Engineering Toolkit)
setoolkit

# Searchsploit
searchsploit apache 2.4
searchsploit -m exploits/linux/remote/12345.py
```

### Forensics

```bash
# Autopsy
autopsy

# Volatility (memory forensics)
volatility -f memory.dmp imageinfo

# Binwalk (firmware analysis)
binwalk firmware.bin
binwalk -e firmware.bin

# Foremost (file carving)
foremost -i disk.img -o output/
```

---

## Development Environment

### Programming Languages

```bash
# Python (pre-installed)
python3 --version
pip3 install package-name

# Go
sudo apt install golang-go
go version

# C/C++
sudo apt install build-essential
gcc --version

# Java
sudo apt install default-jdk
java -version

# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Node.js
sudo apt install nodejs npm
node --version
```

### IDEs and Editors

```bash
# Visual Studio Code
sudo apt install code

# Sublime Text
sudo apt install sublime-text

# Vim/Neovim
sudo apt install vim neovim

# Geany (lightweight)
sudo apt install geany
```

### Version Control

```bash
# Git (pre-installed)
git --version
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

# GitHub CLI
sudo apt install gh
```

---

## Parrot vs Kali Linux

### Comparison Matrix

| Feature | Parrot OS | Kali Linux |
|---------|-----------|------------|
| **Base** | Debian Testing | Debian Testing |
| **Desktop** | MATE (lightweight) | Xfce (medium) |
| **RAM Usage** | ~400-600 MB | ~600-800 MB |
| **Tool Count** | 700+ | 600+ |
| **Privacy Focus** | High (AnonSurf built-in) | Medium |
| **Daily Driver** | Yes (Home edition) | Not recommended |
| **Development** | Strong focus | Limited |
| **Anonymity** | AnonSurf integrated | Manual Tor setup |
| **Resource Usage** | Lighter | Heavier |
| **Updates** | Rolling | Rolling |
| **Community** | Smaller | Larger |
| **Documentation** | Good | Excellent |
| **Corporate Backing** | Community | Offensive Security |

### When to Choose Parrot

- Lightweight system needed
- Daily driver with security tools
- Privacy is priority
- Development + security work
- Older hardware
- Integrated anonymity (AnonSurf)

### When to Choose Kali

- Maximum tool compatibility
- Offensive Security training (OSCP)
- Extensive documentation needed
- Larger community support
- Professional certifications

---

## Best Practices

### Security and Privacy

```bash
# Use AnonSurf for anonymity
sudo anonsurf start

# Regular updates
sudo parrot-upgrade

# Use strong passwords
passwd

# Enable firewall
sudo ufw enable

# Encrypted disk
# Enable during installation

# VPN + Tor (defense in depth)
# VPN -> Tor for extra layer
```

### Ethical and Legal Guidelines

```
WARNING: Only test systems you own or have permission to test!

Legal considerations:
- Unauthorized access is illegal
- Get written permission
- Follow rules of engagement
- Stay within scope

Ethical use:
- Bug bounty programs
- Personal lab environments
- CTF competitions
- Authorized penetration testing
```

---

## Troubleshooting

### Common Issues

```bash
# Update issues
sudo apt clean
sudo apt update --fix-missing
sudo apt full-upgrade

# AnonSurf not working
sudo anonsurf stop
sudo systemctl restart tor
sudo anonsurf start

# Wireless adapter not detected
sudo apt install firmware-linux-nonfree
sudo apt install realtek-rtl88xxau-dkms

# Boot issues
# Boot to recovery mode
# Select "repair broken packages"
```

---

## Real-World Use Cases

### Case Study 1: Web Application Penetration Test

```
Tools: Burp Suite, SQLMap, Nikto, Gobuster
Scenario: E-commerce security audit
Process:
1. Information gathering (Sublist3r, Nmap)
2. Vulnerability scanning (Nikto, WPScan)
3. Manual testing (Burp Suite)
4. SQL injection (SQLMap)
5. Reporting

Outcome: 12 vulnerabilities identified
Privacy: AnonSurf maintained anonymity during OSINT
```

### Case Study 2: Privacy-Focused Daily Computing

```
Edition: Parrot Home
Tools: AnonSurf, Tor Browser, OnionShare
User: Journalist in restricted region
Benefits:
- Built-in anonymity (AnonSurf)
- Encrypted communications
- Metadata removal (MAT2)
- Lightweight performance

Outcome: Secure daily computing with privacy
```

### Case Study 3: Wireless Security Assessment

```
Tools: Aircrack-ng, Wifite, Wireshark
Scenario: Corporate WiFi audit
Process:
1. Network discovery (Airodump-ng)
2. Handshake capture
3. Password cracking (Hashcat)
4. Evil twin attack testing

Outcome: Weak WPA2-PSK identified
Recommendation: WPA3-Enterprise migration
```

---

## Conclusion

Parrot Security OS offers a unique combination of offensive security tools, privacy features, and lightweight performance, making it an excellent choice for security professionals, privacy advocates, and developers alike. Its AnonSurf integration, MATE desktop efficiency, and multi-edition approach (Security, Home, Architect, Cloud) provide flexibility for various use cases from daily computing to professional penetration testing.

While Kali Linux remains the industry standard for offensive security, Parrot OS excels as a versatile, privacy-focused alternative that can serve as both a powerful security testing platform and a practical daily driver operating system.

