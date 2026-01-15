# Rocky_Linux

## Introduction

## What is Rocky Linux?

**Rocky Linux** is a free, open-source enterprise Linux distribution designed to be 100% bug-for-bug compatible with Red Hat Enterprise Linux (RHEL). Created in response to CentOS shifting to CentOS Stream, Rocky Linux serves as a stable, production-ready alternative for enterprises, developers, and organizations requiring long-term support and stability.

---

## Why Choose Rocky Linux?

- **🔄 CentOS Replacement**: Direct successor to CentOS
- **🏢 Enterprise-Grade**: Production-ready stability
- **🆓 Free Forever**: No licensing costs
- **🔒 10-Year Support**: Long-term stability
- **🎯 RHEL Compatible**: Binary compatibility with RHEL
- **🌍 Community-Driven**: Governed by the Rocky Enterprise Software Foundation
- **📦 Extensive Packages**: Enterprise Linux ecosystem

---

## History & Background

### Timeline

- **2020**: CentOS announces shift to CentOS Stream
- **2020**: Gregory Kurtzer announces Rocky Linux project
- **2021**: Rocky Linux 8.4 released (June)
- **2022**: Rocky Linux 9.0 released
- **2023**: Continued growth and enterprise adoption
- **2024**: Active development, stable releases

### Name Origin

Named after Rocky McGaugh, co-founder of CentOS who passed away in 2004.

---

## Rocky Linux vs Other RHEL Derivatives

| Feature | Rocky Linux | AlmaLinux | CentOS Stream | RHEL |
|---------|-------------|-----------|---------------|------|
| **Cost** | Free | Free | Free | Paid |
| **RHEL Compatibility** | 1:1 | 1:1 | Upstream | Original |
| **Support Length** | 10 years | 10 years | ~5 years | 10 years |
| **Governance** | Community | Community | Red Hat | Red Hat |
| **Target** | Enterprise | Enterprise | Developers | Enterprise |
| **Stability** | High | High | Medium | Highest |
| **Updates** | After RHEL | After RHEL | Before RHEL | First |

---

## Key Features

### Stability

- **Long-term Support**: 10 years per major release
- **Minimal Updates**: Security and bugfix only
- **Production-Ready**: Enterprise stability
- **Predictable**: No surprises, stable ABI

### Compatibility

- **RHEL Binary Compatible**: Drop-in replacement
- **Package Compatibility**: RPM packages from RHEL work
- **Certification**: Many vendors support Rocky Linux
- **Migration**: Easy migration from CentOS

### Security

- **SELinux**: Security-Enhanced Linux enabled by default
- **Firewalld**: Modern firewall management
- **Regular Updates**: Security patches
- **FIPS Compliance**: Available for regulated industries

---

## Supported Architectures

- **x86_64 (AMD64)**: Primary architecture
- **aarch64 (ARM64)**: Cloud and edge computing
- **ppc64le (PowerPC)**: IBM POWER systems
- **s390x (IBM Z)**: Mainframes

---

## Use Cases

### Enterprise Servers

- Web servers (Apache, Nginx)
- Database servers (PostgreSQL, MySQL, MariaDB)
- Application servers (JBoss, Tomcat)
- File servers (Samba, NFS)
- Mail servers (Postfix, Dovecot)

### Cloud Infrastructure

- OpenStack deployments
- Kubernetes clusters
- Container hosts (Docker, Podman)
- Virtual machine hosts (KVM, oVirt)

### DevOps & CI/CD

- Jenkins build servers
- GitLab runners
- Ansible control nodes
- Development environments

### High-Performance Computing

- Scientific computing
- Research environments
- Cluster computing
- Supercomputing nodes

---

## Package Management

### DNF Package Manager

Rocky Linux uses **DNF** (Dandified YUM), the next-generation RPM package manager.

```bash
# Install package
sudo dnf install httpd

# Remove package
sudo dnf remove httpd

# Update all packages
sudo dnf update

# Search for package
dnf search nginx

# Get package info
dnf info mariadb-server
```bash

---

## Editions

### Minimal Installation

- Command-line only
- Essential packages
- Ideal for servers

### Server with GUI

- GNOME desktop environment
- Server tools
- Graphical management

### Workstation

- Full desktop environment
- Development tools
- Office applications

---

## Support Lifecycle

### Rocky Linux 8

- **Based on**: RHEL 8
- **Release**: June 2021
- **Support Until**: May 2029
- **Kernel**: 4.18.x

### Rocky Linux 9

- **Based on**: RHEL 9
- **Release**: July 2022
- **Support Until**: May 2032
- **Kernel**: 5.14.x

---

## Default Software

### System Tools

- **SELinux**: Security framework
- **Firewalld**: Firewall management
- **Cockpit**: Web-based administration
- **systemd**: System and service manager

### Package Repositories

- BaseOS: Core OS packages
- AppStream: Applications and runtime
- Extras: Additional packages
- EPEL: Extra Packages for Enterprise Linux (third-party)

---

## Who Should Use Rocky Linux?

### Ideal For

- Former CentOS users
- Enterprise environments
- Hosting providers
- Developers needing RHEL compatibility
- Organizations requiring long-term stability
- Production servers
- Users wanting free RHEL alternative

### Not Ideal For

- Desktop daily driver (better options available)
- Bleeding-edge software needs
- Gaming
- Users wanting latest software versions
- Rapid release cycle needs

---

## Differences from CentOS

### CentOS (Old Model)

- Point releases
- Downstream of RHEL
- 10-year support
- **Status**: Ended Dec 2021

### CentOS Stream (New Model)

- Rolling release
- Upstream of RHEL
- Shorter support
- Testing ground

### Rocky Linux

- Point releases (like old CentOS)
- Downstream of RHEL
- 10-year support
- Community-driven
- **Direct CentOS replacement**

---

## Migration from CentOS

Rocky Linux provides migration scripts:

```bash
# Migrate from CentOS 8
sudo curl -o migrate2rocky.sh https://raw.githubusercontent.com/rocky-linux/rocky-tools/main/migrate2rocky/migrate2rocky.sh
sudo chmod +x migrate2rocky.sh
sudo ./migrate2rocky.sh -r
```bash

---

## Community & Support

### Official Resources

- [Rocky Linux Website](https://rockylinux.org/)
- [Documentation](https://docs.rockylinux.org/)
- [Wiki](https://wiki.rockylinux.org/)
- [Forums](https://forums.rockylinux.org/)

### Community Channels

- [Mattermost Chat](https://chat.rockylinux.org/)
- [Reddit r/RockyLinux](https://www.reddit.com/r/RockyLinux/)
- IRC: #rockylinux on Libera.Chat
- [Twitter @rocky_linux](https://twitter.com/rocky_linux)

### Commercial Support

Multiple vendors offer commercial support:

- CIQ (founded by Rocky Linux creator)
- 45Drives
- Other third-party providers

---

## Pros & Cons

### Strengths

- ✅ Free and open-source
- ✅ RHEL compatibility
- ✅ 10-year support lifecycle
- ✅ Enterprise stability
- ✅ Strong community
- ✅ Easy CentOS migration
- ✅ No sudden changes

### Limitations

- ❌ Conservative software versions
- ❌ Slower updates than cutting-edge distros
- ❌ Not ideal for desktop use
- ❌ Learning curve for beginners
- ❌ Less multimedia support out-of-box

---

## Rocky Linux Foundation

### Governance

- **Organization**: Rocky Enterprise Software Foundation (RESF)
- **Type**: Public Benefit Corporation
- **Mission**: Community-owned enterprise Linux
- **Sponsors**: CIQ, Google Cloud, AWS, Microsoft, and others

### Principles

- Community-driven
- Transparent development
- No single controlling entity
- Long-term stability commitment

---

## Certifications & Compliance

Rocky Linux aims for compatibility with certifications targeting RHEL:

- **FIPS 140-2**: Cryptographic module validation
- **Common Criteria**: Security evaluation
- **PCI-DSS**: Payment card industry compliance
- **HIPAA**: Healthcare compliance
- **SOC 2**: Security controls

---

## Learning Path

### Beginners

1. Install Rocky Linux in VM
2. Learn basic Linux commands
3. Understand package management (DNF)
4. Practice system administration

### Intermediate

1. Configure web/database servers
2. Learn SELinux
3. Automate with Ansible
4. Container deployment (Podman)

### Advanced

1. Cluster management
2. High availability setups
3. Performance tuning
4. Custom package building

---

Ready to get started? Jump to the **User Guide** section below for installation and administration.

---

**Enterprise Linux, Community Driven! 🏔️🐧**

---

## User Guide

## Installation

### Download Rocky Linux

1. Visit [Rocky Linux Downloads](https://rockylinux.org/download/)
2. Select version (Rocky 8 or 9)
3. Choose architecture (x86_64 most common)
4. Download ISO:
   - **Minimal**: Server without GUI
   - **Boot**: Network install
   - **DVD**: Full installation media

---

## Create Bootable Media

### Using Rufus (Windows)

```bash
1. Download Rufus: https://rufus.ie/
2. Insert USB drive (8+ GB)
3. Select Rocky Linux ISO
4. Click Start
5. Wait for completion
```bash

### Using dd (Linux/Mac)

```bash
# Find USB device
lsblk

# Write ISO (replace /dev/sdX)
sudo dd if=Rocky-9-x86_64-minimal.iso of=/dev/sdX bs=4M status=progress
sync
```bash

---

## Installation Steps

### Boot from Installation Media

```bash
1. Insert USB/DVD
2. Restart computer
3. Enter BIOS/UEFI (F2, F12, DEL, or ESC)
4. Select boot device
5. Boot Rocky Linux installer
```bash

### Installation Process

1. **Language Selection**
   - Select installation language

2. **Installation Summary**
   - **Localization**:
     - Keyboard layout
     - Language support
     - Time & Date

   - **Software**:
     - Installation Source
     - Software Selection:
       - Minimal Install
       - Server with GUI
       - Workstation
       - Custom Operating System

   - **System**:
     - Installation Destination (disk partitioning)
     - Network & Hostname
     - Root Password
     - User Creation

3. **Partitioning**

   ```

   Automatic:

- Let installer handle partitioning

   Manual (recommended for servers):
   /boot     - 1 GB (ext4)
   /boot/efi - 512 MB (vfat) [UEFI systems]
   /         - 20+ GB (xfs)
   /home     - Remaining space (xfs)
   swap      - 2x RAM (or equal to RAM)

   ```

4. **Network Configuration**

   ```

- Set hostname
- Configure ethernet
- Enable on boot
- Configure IP (DHCP or static)

   ```

5. **Begin Installation**
   - Click "Begin Installation"
   - Set root password while installing
   - Create user account
   - Wait for completion
   - Reboot

---

## First Boot Configuration

### Login

```bash
# Console login
rocky login: yourusername
Password: ********

# Or root
rocky login: root
Password: ********
```bash

### Update System

```bash
# Update all packages
sudo dnf update -y

# Reboot if kernel updated
sudo reboot
```bash

---

## Basic System Configuration

### Set Hostname

```bash
# Set hostname
sudo hostnamectl set-hostname server.example.com

# Verify
hostnamectl
```bash

### Configure Network

```bash
# List network devices
nmcli device status

# Configure static IP
sudo nmcli con mod eth0 ipv4.addresses 192.168.1.100/24
sudo nmcli con mod eth0 ipv4.gateway 192.168.1.1
sudo nmcli con mod eth0 ipv4.dns "8.8.8.8 8.8.4.4"
sudo nmcli con mod eth0 ipv4.method manual
sudo nmcli con up eth0

# Or edit configuration
sudo vi /etc/sysconfig/network-scripts/ifcfg-eth0
```bash

### Firewall Configuration

```bash
# Check firewall status
sudo firewall-cmd --state

# List active zones
sudo firewall-cmd --get-active-zones

# Allow service
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# Allow port
sudo firewall-cmd --permanent --add-port=8080/tcp

# Reload firewall
sudo firewall-cmd --reload

# List rules
sudo firewall-cmd --list-all
```bash

### SELinux Management

```bash
# Check SELinux status
getenforce

# Temporarily set permissive (not recommended for production)
sudo setenforce 0

# Permanently disable (requires reboot)
sudo vi /etc/selinux/config
# Set: SELINUX=permissive or SELINUX=disabled

# View SELinux denials
sudo ausearch -m avc -ts recent
```bash

---

## Package Management

### DNF Basics

```bash
# Search for package
dnf search nginx

# Get package information
dnf info nginx

# Install package
sudo dnf install nginx

# Install multiple packages
sudo dnf install httpd mariadb-server php

# Remove package
sudo dnf remove httpd

# Update single package
sudo dnf update nginx

# Update all packages
sudo dnf update

# List installed packages
dnf list installed

# List available updates
dnf list updates

# Clean cache
sudo dnf clean all
```bash

### Repository Management

```bash
# List enabled repositories
dnf repolist

# List all repositories
dnf repolist all

# Enable repository
sudo dnf config-manager --enable <repo-name>

# Disable repository
sudo dnf config-manager --disable <repo-name>
```bash

### EPEL Repository

```bash
# Install EPEL (Extra Packages for Enterprise Linux)
sudo dnf install epel-release

# Verify
dnf repolist | grep epel
```bash

---

## Web Server Setup (Apache)

```bash
# Install Apache
sudo dnf install httpd

# Start Apache
sudo systemctl start httpd

# Enable on boot
sudo systemctl enable httpd

# Check status
sudo systemctl status httpd

# Allow HTTP/HTTPS through firewall
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Test
# Browse to http://your-server-ip
```bash

### Virtual Host Configuration

```bash
# Create document root
sudo mkdir -p /var/www/example.com/html

# Create virtual host config
sudo vi /etc/httpd/conf.d/example.com.conf
```bash

```apache
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/example.com/html
    ErrorLog /var/log/httpd/example.com-error.log
    CustomLog /var/log/httpd/example.com-access.log combined
</VirtualHost>
```bash

```bash
# Test configuration
sudo apachectl configtest

# Restart Apache
sudo systemctl restart httpd
```bash

---

## Database Setup (MariaDB)

```bash
# Install MariaDB
sudo dnf install mariadb-server

# Start MariaDB
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Secure installation
sudo mysql_secure_installation

# Login
sudo mysql -u root -p
```bash

---

## Container Management (Podman)

```bash
# Install Podman
sudo dnf install podman

# Run container
podman run -d --name webserver -p 8080:80 nginx

# List containers
podman ps

# Stop container
podman stop webserver

# Remove container
podman rm webserver

# List images
podman images

# Pull image
podman pull docker.io/library/httpd
```bash

---

## System Administration

### User Management

```bash
# Add user
sudo useradd john

# Set password
sudo passwd john

# Add user to wheel group (sudo access)
sudo usermod -aG wheel john

# Delete user
sudo userdel -r john

# List logged-in users
who
w
```bash

### Service Management (systemd)

```bash
# Start service
sudo systemctl start httpd

# Stop service
sudo systemctl stop httpd

# Restart service
sudo systemctl restart httpd

# Reload configuration
sudo systemctl reload httpd

# Enable on boot
sudo systemctl enable httpd

# Disable on boot
sudo systemctl disable httpd

# Check status
sudo systemctl status httpd

# View logs
sudo journalctl -u httpd
```bash

### Disk Management

```bash
# View disk usage
df -h

# View directory size
du -sh /var/log

# List block devices
lsblk

# Check filesystem
sudo fsck /dev/sda1

# Mount filesystem
sudo mount /dev/sdb1 /mnt

# Unmount
sudo umount /mnt
```bash

---

## Cockpit Web Interface

**Cockpit** is a web-based server management tool included with Rocky Linux.

```bash
# Install Cockpit
sudo dnf install cockpit

# Start and enable
sudo systemctl start cockpit.socket
sudo systemctl enable cockpit.socket

# Allow through firewall
sudo firewall-cmd --permanent --add-service=cockpit
sudo firewall-cmd --reload

# Access
# Browse to https://your-server-ip:9090
# Login with system credentials
```bash

---

## SSH Configuration

```bash
# Install SSH server (usually pre-installed)
sudo dnf install openssh-server

# Start SSH
sudo systemctl start sshd
sudo systemctl enable sshd

# Configure SSH
sudo vi /etc/ssh/sshd_config

# Recommended changes:
# PermitRootLogin no
# PasswordAuthentication no (use keys)
# Port 2222 (change default port)

# Restart SSH
sudo systemctl restart sshd

# Allow SSH through firewall
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```bash

### SSH Key Authentication

```bash
# Generate key (on client)
ssh-keygen -t ed25519

# Copy key to server
ssh-copy-id user@server-ip

# Login without password
ssh user@server-ip
```bash

---

## Automation with Ansible

```bash
# Install Ansible
sudo dnf install ansible

# Create inventory
sudo vi /etc/ansible/hosts
```bash

```ini
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com
```bash

```bash
# Test connectivity
ansible all -m ping

# Run command
ansible webservers -a "uptime"

# Run playbook
ansible-playbook site.yml
```bash

---

## Monitoring & Logging

### View Logs

```bash
# System logs
sudo journalctl

# Follow logs
sudo journalctl -f

# Logs for specific service
sudo journalctl -u httpd

# Logs since boot
sudo journalctl -b

# Logs for today
sudo journalctl --since today
```bash

### System Monitoring

```bash
# CPU and memory usage
top
htop  # (install: sudo dnf install htop)

# Disk I/O
iostat  # (install: sudo dnf install sysstat)

# Network statistics
netstat -tuln
ss -tuln
```bash

---

## Troubleshooting

### Network Issues

```bash
# Test connectivity
ping google.com

# DNS lookup
nslookup google.com
dig google.com

# Trace route
traceroute google.com

# Check listening ports
sudo ss -tuln
```bash

### Service Issues

```bash
# Check service status
sudo systemctl status servicename

# View detailed logs
sudo journalctl -xe -u servicename

# Check SELinux denials
sudo ausearch -m avc -ts recent

# Check firewall
sudo firewall-cmd --list-all
```bash

---

## Best Practices

1. **Regular Updates**: Keep system updated
2. **Firewall**: Only open necessary ports
3. **SELinux**: Keep enabled (don't disable)
4. **SSH Keys**: Use key authentication, disable passwords
5. **Backups**: Regular system backups
6. **Monitoring**: Set up monitoring (Cockpit, Nagios, etc.)
7. **Documentation**: Document configurations
8. **Minimal Services**: Only run necessary services

---

## Resources

- [Rocky Linux Docs](https://docs.rockylinux.org/)
- [Rocky Wiki](https://wiki.rockylinux.org/)
- [Forums](https://forums.rockylinux.org/)
- [Mattermost Chat](https://chat.rockylinux.org/)
- [r/RockyLinux](https://www.reddit.com/r/RockyLinux/)

---

**Stable, Reliable, Enterprise-Ready! 🏔️💪**

