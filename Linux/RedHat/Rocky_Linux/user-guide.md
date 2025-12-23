# Rocky Linux User Guide

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
```
1. Download Rufus: https://rufus.ie/
2. Insert USB drive (8+ GB)
3. Select Rocky Linux ISO
4. Click Start
5. Wait for completion
```

### Using dd (Linux/Mac)
```bash
# Find USB device
lsblk

# Write ISO (replace /dev/sdX)
sudo dd if=Rocky-9-x86_64-minimal.iso of=/dev/sdX bs=4M status=progress
sync
```

---

## Installation Steps

### Boot from Installation Media

```
1. Insert USB/DVD
2. Restart computer
3. Enter BIOS/UEFI (F2, F12, DEL, or ESC)
4. Select boot device
5. Boot Rocky Linux installer
```

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
```

### Update System

```bash
# Update all packages
sudo dnf update -y

# Reboot if kernel updated
sudo reboot
```

---

## Basic System Configuration

### Set Hostname

```bash
# Set hostname
sudo hostnamectl set-hostname server.example.com

# Verify
hostnamectl
```

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
```

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
```

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
```

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
```

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
```

### EPEL Repository

```bash
# Install EPEL (Extra Packages for Enterprise Linux)
sudo dnf install epel-release

# Verify
dnf repolist | grep epel
```

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
```

### Virtual Host Configuration

```bash
# Create document root
sudo mkdir -p /var/www/example.com/html

# Create virtual host config
sudo vi /etc/httpd/conf.d/example.com.conf
```

```apache
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/example.com/html
    ErrorLog /var/log/httpd/example.com-error.log
    CustomLog /var/log/httpd/example.com-access.log combined
</VirtualHost>
```

```bash
# Test configuration
sudo apachectl configtest

# Restart Apache
sudo systemctl restart httpd
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

### SSH Key Authentication

```bash
# Generate key (on client)
ssh-keygen -t ed25519

# Copy key to server
ssh-copy-id user@server-ip

# Login without password
ssh user@server-ip
```

---

## Automation with Ansible

```bash
# Install Ansible
sudo dnf install ansible

# Create inventory
sudo vi /etc/ansible/hosts
```

```ini
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com
```

```bash
# Test connectivity
ansible all -m ping

# Run command
ansible webservers -a "uptime"

# Run playbook
ansible-playbook site.yml
```

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
```

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
```

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
```

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
```

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
