# Oracle Linux

## Introduction

Oracle Linux is a free, open-source Linux distribution developed and maintained by Oracle Corporation. Based on Red Hat Enterprise Linux (RHEL) source code, Oracle Linux offers 100% application binary compatibility with RHEL while providing unique features like the Unbreakable Enterprise Kernel (UEK), Ksplice zero-downtime updates, and optimizations for Oracle software workloads.

### Philosophy and Vision

- **Free and Open**: No cost for downloads and use
- **RHEL Compatible**: Binary compatibility with RHEL
- **Oracle Optimized**: Enhanced for Oracle Database and applications
- **Unbreakable**: Mission-critical reliability
- **Support Options**: Free community support or paid Premier Support
- **Zero Downtime**: Ksplice kernel patching without reboots

### Key Characteristics

- **Base**: RHEL source code (100% compatible)
- **Package Manager**: DNF/YUM
- **Package Format**: RPM
- **Init System**: systemd
- **Security**: SELinux enforcing
- **Kernels**: UEK (Unbreakable Enterprise Kernel) or RHCK (Red Hat Compatible Kernel)
- **Release Cycle**: Follows RHEL releases
- **Support**: 10+ years with Premier Support
- **Cost**: Free (support optional)

### Target Audience

- **Oracle Database Administrators**: Optimal Oracle DB platform
- **Enterprises**: RHEL alternative without subscription costs
- **Hosting Providers**: Free RHEL-compatible platform
- **Oracle Cloud Users**: Native cloud platform
- **Cost-Conscious Organizations**: Enterprise Linux without fees
- **Mixed Environments**: Interoperability with RHEL/CentOS

### Use Cases

- Oracle Database hosting
- Oracle applications (E-Business Suite, PeopleSoft, etc.)
- General enterprise server workloads
- Web servers and application platforms
- Container hosts
- Virtualization platforms
- Cloud infrastructure (Oracle Cloud, others)
- Development and testing environments

## Resources

### Official Resources

- **Website**: <https://www.oracle.com/linux>
- **Downloads**: <https://www.oracle.com/linux/downloads>
- **Documentation**: <https://docs.oracle.com/en/operating-systems/oracle-linux/>
- **Ksplice**: <https://ksplice.oracle.com>
- **Oracle Cloud**: <https://www.oracle.com/cloud>
- **Support**: <https://www.oracle.com/support>

### Community Resources

- **Forums**: <https://community.oracle.com/mosc/categories/oracle-linux>
- **Public YUM Server**: <https://yum.oracle.com>
- **Container Registry**: <https://container-registry.oracle.com>
- **GitHub**: <https://github.com/oracle/oracle-linux>

### Learning Resources

- [Oracle Linux Documentation](https://docs.oracle.com/en/operating-systems/oracle-linux/)
- [Oracle University](https://education.oracle.com/linux)
- [Oracle Linux Training](https://www.oracle.com/linux/training/)

---

## Oracle Linux vs RHEL

### Similarities (RHEL Compatible)

```
✅ Same source code base
✅ Binary compatible with RHEL
✅ Same package repositories structure
✅ Same administration tools
✅ Applications certified for RHEL work on Oracle Linux
✅ Same SELinux policies
✅ Compatible upgrade paths
```

### Oracle Linux Advantages

```
✅ Free to download and use
✅ No subscription required
✅ Unbreakable Enterprise Kernel (UEK)
✅ Ksplice (zero-downtime kernel updates)
✅ Oracle software optimizations
✅ DTrace observability tool
✅ Btrfs support (in UEK)
✅ Container-native features
✅ Oracle Cloud integration
```

### Comparison Table

| Feature | Oracle Linux | RHEL |
|---------|--------------|------|
| **Cost** | Free | Subscription required |
| **Support** | Optional (Premier) | Included with subscription |
| **Kernel** | UEK or RHCK | RHCK only |
| **Ksplice** | Available | Not available |
| **DTrace** | Yes (UEK) | No |
| **Oracle Optimizations** | Yes | No |
| **RHEL Compatibility** | 100% | N/A |
| **Community Support** | Free | Limited |
| **Updates** | Free | Requires subscription |

---

## Unbreakable Enterprise Kernel (UEK)

### What is UEK?

UEK is Oracle's custom Linux kernel built from mainline kernel sources with Oracle-specific optimizations, newer features, and performance enhancements.

```
Benefits:
- Newer kernel features than RHCK
- Performance optimizations for Oracle workloads
- Advanced storage features (Btrfs, NVMe)
- Enhanced networking (RDS, RoCE)
- DTrace observability
- Container optimizations
- Cloud-native features

Versions:
- UEK R7: Based on Linux 5.15 (Oracle Linux 8, 9)
- UEK R6: Based on Linux 5.4 (Oracle Linux 8, 7)
- UEK R5: Based on Linux 4.14 (Oracle Linux 7)
```

### UEK vs RHCK

```bash
# Oracle Linux includes both kernels:

# Unbreakable Enterprise Kernel (UEK) - Default
- Newer kernel version
- Latest features and optimizations
- Oracle-specific enhancements
- Recommended for Oracle workloads

# Red Hat Compatible Kernel (RHCK)
- Same as RHEL kernel
- Maximum RHEL compatibility
- Use for ISV-certified applications
- Fallback option

# Check current kernel
uname -r
# Example: 5.15.0-102.114.1.el8uek.x86_64 (UEK)
# Example: 4.18.0-477.27.1.el8_8.x86_64 (RHCK)

# Switch between kernels
# Edit /etc/default/grub
# Change GRUB_DEFAULT=0 (first kernel, usually UEK)
# Or GRUB_DEFAULT=1 (second kernel, usually RHCK)
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
sudo reboot
```

---

## Ksplice (Zero-Downtime Updates)

### What is Ksplice?

Ksplice allows applying kernel security patches and critical bug fixes without rebooting the system.

```
Benefits:
- Zero downtime for kernel updates
- No service interruption
- Immediate security patching
- Maintain uptime SLAs
- Reduced maintenance windows

Availability:
- Free for Oracle Linux on Oracle Cloud
- Requires Oracle Linux Premier Support on-premises
- Works with both UEK and RHCK
```

### Using Ksplice

```bash
# Install Ksplice (requires registration)
sudo dnf install uptrack

# Register with Ksplice
sudo uptrack-upgrade --register

# Check for updates
sudo uptrack-upgrade --check

# Apply updates (no reboot!)
sudo uptrack-upgrade --install

# View applied patches
sudo uptrack-show

# Remove Ksplice patches (requires reboot to take effect)
sudo uptrack-remove --all
```

---

## Installation

### System Requirements

**Minimum**:
- **RAM**: 1 GB (2+ GB recommended)
- **Disk**: 10 GB (20+ GB recommended)
- **Processor**: 1 GHz

**Recommended**:
- **RAM**: 4+ GB (8+ GB for database workloads)
- **Disk**: 50+ GB SSD
- **Processor**: 2+ GHz multi-core

### Download Oracle Linux

```bash
# Download from Oracle
https://www.oracle.com/linux/downloads

# Available ISOs:
- Full ISO (~10 GB) - Complete installation
- Boot ISO (~700 MB) - Network installation
- UEK Boot ISO - Boot with UEK kernel

# No registration required for downloads

# Verify checksum
sha256sum OracleLinux-R9-U3-x86_64-dvd.iso
```

### Installation Process

```
1. Boot from ISO
2. Select "Install Oracle Linux 9"
3. Anaconda Installer (same as RHEL)
4. Installation Summary:
   - Language & Keyboard
   - Time & Date
   - Installation Destination
   - Network & Hostname
   - Software Selection
   - Kernel: Choose UEK or RHCK
5. Begin Installation
6. Root password
7. User creation
8. Reboot
9. Initial Setup (if selected)
```

### Post-Installation

```bash
# Update system
sudo dnf update -y

# Verify kernel
uname -r
# Should show: ...uek... (UEK kernel)

# Enable additional repositories
sudo dnf config-manager --enable ol9_developer
sudo dnf config-manager --enable ol9_developer_EPEL

# Install useful tools
sudo dnf install vim wget curl git htop

# Install Oracle preinstall package (for Oracle Database)
sudo dnf install oracle-database-preinstall-23c

# Configure firewall
sudo systemctl enable --now firewalld
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```

---

## Package Management

### DNF/YUM

```bash
# Update system
sudo dnf update
sudo dnf upgrade

# Search packages
dnf search package-name

# Install packages
sudo dnf install package-name

# Remove packages
sudo dnf remove package-name
sudo dnf autoremove

# List repositories
dnf repolist

# Package information
dnf info package-name
```

### Oracle Linux Repositories

```bash
# Default repositories (Oracle Linux 9):
# - ol9_baseos_latest
# - ol9_appstream
# - ol9_UEKR7

# Additional repositories:
sudo dnf config-manager --enable ol9_developer
sudo dnf config-manager --enable ol9_developer_EPEL
sudo dnf config-manager --enable ol9_addons
sudo dnf config-manager --enable ol9_MySQL80
sudo dnf config-manager --enable ol9_oracle_software

# Oracle software repository (requires ULN or Unbreakable Linux Network)
sudo dnf config-manager --enable ol9_oracle_instantclient

# Container tools
sudo dnf config-manager --enable ol9_olcne15  # Oracle Linux Cloud Native Environment
```

### Oracle Software Installation

```bash
# Oracle Instant Client
sudo dnf install oracle-instantclient-basic
sudo dnf install oracle-instantclient-sqlplus

# Oracle Database Preinstall
# Automatically configures kernel parameters, creates users, etc.
sudo dnf install oracle-database-preinstall-23c

# Oracle Java
sudo dnf install oracle-java-se-8
# Or
sudo dnf install oracle-java-se-11
# Or
sudo dnf install oracle-java-se-17
```

---

## Oracle Linux Features

### DTrace

```bash
# Dynamic tracing framework (UEK only)

# Install DTrace
sudo dnf install dtrace-utils

# Example: Trace system calls
sudo dtrace -n 'syscall:::entry { @[probefunc] = count(); }'

# Trace file opens
sudo dtrace -n 'syscall::open*:entry { printf("%s %s", execname, copyinstr(arg0)); }'

# DTrace scripts in /usr/share/dtrace/toolkit/
```

### Btrfs Support

```bash
# Btrfs available in UEK

# Create Btrfs filesystem
sudo mkfs.btrfs /dev/sdb1

# Mount Btrfs
sudo mount /dev/sdb1 /mnt/data

# Create subvolume
sudo btrfs subvolume create /mnt/data/subvol1

# Snapshot
sudo btrfs subvolume snapshot /mnt/data/subvol1 /mnt/data/snapshot1

# List subvolumes
sudo btrfs subvolume list /mnt/data
```

---

## Oracle Database on Oracle Linux

### Preparing for Oracle Database

```bash
# Install Oracle Database Preinstall package
sudo dnf install oracle-database-preinstall-23c

# This automatically:
# - Creates oracle user and groups
# - Sets kernel parameters
# - Sets resource limits
# - Creates directories
# - Configures security settings

# Verify oracle user
id oracle

# Verify kernel parameters
sysctl -a | grep -E 'shmmax|shmall|shmmni|sem'

# Configure hugepages (for large SGA)
sudo sh -c 'echo "vm.nr_hugepages=1280" >> /etc/sysctl.conf'
sudo sysctl -p

# Configure firewall for Oracle
sudo firewall-cmd --permanent --add-port=1521/tcp  # Listener
sudo firewall-cmd --permanent --add-port=5500/tcp  # EM Express
sudo firewall-cmd --reload
```

### Installing Oracle Database

```bash
# Download Oracle Database from oracle.com
# Extract and run installer as oracle user

su - oracle
cd /path/to/database
./runInstaller

# Or silent installation
./runInstaller -silent -responseFile /path/to/response.rsp

# Or use Oracle Database RPM
sudo dnf install oracle-database-ee-23c.x86_64.rpm
```

---

## Container Support

### Podman

```bash
# Podman pre-installed

# Pull Oracle Linux image
podman pull container-registry.oracle.com/os/oraclelinux:9

# Run container
podman run -it container-registry.oracle.com/os/oraclelinux:9 /bin/bash

# Oracle Database container
podman pull container-registry.oracle.com/database/enterprise:latest

podman run -d \
  --name oracle-db \
  -p 1521:1521 \
  -e ORACLE_PWD=YourPassword \
  container-registry.oracle.com/database/enterprise:latest
```

### Oracle Linux Cloud Native Environment (OLCNE)

```bash
# Kubernetes platform from Oracle

# Install OLCNE
sudo dnf config-manager --enable ol9_olcne15
sudo dnf install olcnectl olcne-api-server olcne-agent olcne-utils

# Features:
# - Kubernetes
# - Istio service mesh
# - Helm
# - Multus CNI
# - MetalLB
```

---

## System Administration

### Service Management

```bash
# Same systemd commands as RHEL

sudo systemctl start service-name
sudo systemctl stop service-name
sudo systemctl restart service-name
sudo systemctl status service-name
sudo systemctl enable service-name

journalctl -u service-name
```

### Firewall (firewalld)

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

sudo firewall-cmd --list-all
```

### SELinux

```bash
# SELinux enforcing by default
getenforce

# Troubleshooting
sudo ausearch -m avc -ts recent
sudo sealert -a /var/log/audit/audit.log
```

---

## Support Options

### Free Support

```
- Community forums
- Public documentation
- Public YUM server
- No SLA
- Self-service
```

### Oracle Linux Premier Support

```
Includes:
- 24/7 technical support
- Ksplice zero-downtime updates
- Unbreakable Linux Network (ULN)
- Oracle support integration
- Oracle Cloud credits
- Indemnification
- Management tools

Cost:
- Lower than RHEL subscriptions
- Bundled with Oracle Database support
```

---

## Migration

### Migrating from CentOS/RHEL

```bash
# Oracle provides migration scripts

# Download migration script
curl -O https://linux.oracle.com/switch/centos2ol.sh

# Review script
less centos2ol.sh

# Run migration (CentOS 8 → Oracle Linux 8)
sudo bash centos2ol.sh

# System will be converted to Oracle Linux
# Preserves data and configurations
# Switches to Oracle repositories

# Reboot
sudo reboot

# Verify
cat /etc/oracle-release
uname -r  # Should show UEK kernel
```

---

## Best Practices

### For Oracle Database Workloads

```bash
# 1. Use UEK kernel
# Better performance for Oracle Database

# 2. Use Oracle preinstall package
sudo dnf install oracle-database-preinstall-23c

# 3. Configure hugepages
# Calculate based on SGA size

# 4. Enable Ksplice (with Premier Support)
# Zero-downtime kernel patching

# 5. Use ASMlib for ASM storage
sudo dnf install oracleasm-support oracleasmlib

# 6. Monitor with Oracle Enterprise Manager
# Or Oracle Cloud Observability
```

### General Best Practices

```bash
# Regular updates
sudo dnf update

# Keep SELinux enforcing
getenforce

# Configure firewall
sudo systemctl enable --now firewalld

# Regular backups
# System, databases, configurations

# Monitor system health
# Use Oracle Cloud Observability or similar
```

---

## Real-World Use Cases

### Case Study 1: Oracle Database Hosting

```
Organization: Large healthcare provider
Workload: Oracle Database 19c RAC cluster
Setup: Oracle Linux 8 with UEK R6
Support: Oracle Linux Premier Support

Benefits:
- Optimized performance with UEK
- Zero-downtime patching with Ksplice
- Single vendor support (Oracle)
- Cost savings vs RHEL
- 99.99% uptime achieved

Configuration:
- 4-node RAC cluster
- ASM storage
- Hugepages configured
- DTrace for performance tuning
```

### Case Study 2: Cloud-Native Development

```
Organization: FinTech startup
Platform: Oracle Linux with OLCNE (Kubernetes)
Deployment: Oracle Cloud Infrastructure
Workload: Microservices, containers

Benefits:
- Free OS with enterprise features
- Native cloud integration
- Kubernetes platform (OLCNE)
- ARM support (Ampere processors)
- Cost-effective development

Outcome:
- Rapid deployment cycles
- Seamless Oracle Cloud integration
- Reduced infrastructure costs
```

---

## Conclusion

Oracle Linux provides a compelling, cost-effective alternative to RHEL while maintaining 100% binary compatibility. With unique features like the Unbreakable Enterprise Kernel (UEK), Ksplice zero-downtime updates, and optimizations for Oracle software workloads, Oracle Linux offers significant value—especially for organizations running Oracle Database or applications.

The combination of being freely available, RHEL-compatible, and offering optional enterprise support makes Oracle Linux attractive for enterprises seeking to reduce costs without sacrificing reliability or features. Whether running Oracle workloads or general enterprise Linux servers, Oracle Linux delivers enterprise-grade capabilities with the flexibility of optional commercial support.

**Key Advantages**:
- **Free**: No licensing costs
- **Compatible**: 100% RHEL binary compatibility
- **Modern**: UEK kernel with latest features
- **Zero Downtime**: Ksplice kernel patching
- **Oracle Optimized**: Best platform for Oracle software
- **Flexible Support**: Optional Premier Support available

