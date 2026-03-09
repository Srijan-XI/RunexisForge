# Red Hat Enterprise Linux (RHEL)

## Introduction

Red Hat Enterprise Linux (RHEL) is the world's leading enterprise Linux platform, providing a stable, secure, and supported foundation for mission-critical workloads. Backed by Red Hat (an IBM company), RHEL powers everything from Fortune 500 data centers to cloud infrastructure, offering unmatched stability, comprehensive support, and extensive ecosystem certification.

### Philosophy and Vision

- **Enterprise First**: Stability and reliability over bleeding edge
- **Long-Term Support**: Predictable 10+ year lifecycles
- **Certified Ecosystem**: Extensive ISV and hardware certification
- **Professional Support**: 24/7 global support available
- **Open Source Leadership**: Major contributor to upstream projects
- **Hybrid Cloud**: Consistent platform across physical, virtual, cloud

### Key Characteristics

- **Package Manager**: DNF (Dandified YUM)
- **Package Format**: RPM
- **Init System**: systemd
- **Security**: SELinux enforcing, FIPS 140-2 certified
- **File System**: XFS (default), ext4, Btrfs
- **Release Cycle**: Major every 3-4 years, minor every 6 months
- **Support**: 10 years + Extended Life Cycle Support (ELS)
- **Subscription**: Required for production use
- **Variants**: Server, Desktop, SAP Solutions, OpenStack Platform

### Target Audience

- **Enterprises**: Fortune 500 companies
- **Government**: Federal, state, local agencies
- **Financial Services**: Banks, insurance companies
- **Healthcare**: Hospitals, medical organizations
- **Telecommunications**: Service providers
- **Cloud Providers**: AWS, Azure, Google Cloud
- **Managed Service Providers**: MSPs and hosting companies

### Use Cases

- Mission-critical applications
- Enterprise resource planning (ERP)
- Database servers (Oracle, SAP HANA, PostgreSQL)
- Web and application servers
- Container platforms (OpenShift)
- Virtualization (RHEV, KVM)
- Cloud infrastructure
- High-performance computing
- DevOps and CI/CD pipelines

## Resources

### Official Resources

- **Website**: <https://www.redhat.com/rhel>
- **Customer Portal**: <https://access.redhat.com>
- **Documentation**: <https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/>
- **Knowledge Base**: <https://access.redhat.com/articles>
- **Downloads**: <https://access.redhat.com/downloads>
- **Product Lifecycle**: <https://access.redhat.com/support/policy/updates/errata>

### Support and Training

- **Red Hat Support**: <https://access.redhat.com/support>
- **Red Hat Training**: <https://www.redhat.com/en/services/training-and-certification>
- **RHCSA Certification**: Red Hat Certified System Administrator
- **RHCE Certification**: Red Hat Certified Engineer
- **Partner Network**: <https://connect.redhat.com>

### Community

- **Red Hat Developers**: <https://developers.redhat.com>
- **Enable Sysadmin**: <https://www.redhat.com/sysadmin>
- **Red Hat Blog**: <https://www.redhat.com/en/blog>
- **Reddit**: r/RedHat

---

## RHEL Versions and Lifecycle

### Current Supported Versions

| Version | Released | Kernel | End of Support | Extended Life | End of ELS |
|---------|----------|--------|----------------|---------------|------------|
| **RHEL 7** | June 2014 | 3.10 | June 30, 2024 | ELS Phase 1-4 | June 2028 |
| **RHEL 8** | May 2019 | 4.18 | May 31, 2029 | ELS Phase 1-4 | May 2032 |
| **RHEL 9** | May 2022 | 5.14 | May 31, 2032 | ELS Phase 1-4 | May 2035 |

### RHEL 9 Key Features

```
Kernel: Linux 5.14
GCC: 11.2
Python: 3.9
Node.js: 16
Ruby: 3.0
PHP: 8.0
PostgreSQL: 13
MariaDB: 10.5

New Features:
- Improved container support
- Enhanced security (crypto policies)
- Image Builder improvements
- Web Console (Cockpit) enhancements
- Better cloud integration
- Podman 4.0
```

### RHEL 8 Key Features

```
Kernel: Linux 4.18
Python: 3.6/3.9/3.11 (Application Streams)
Java: OpenJDK 8/11/17
Container Tools: Podman, Buildah, Skopeo

Major Changes:
- YUM replaced by DNF
- Python 2 deprecated
- Application Streams (modular packages)
- System Roles (Ansible automation)
- Image Builder
- Enhanced web console
```

---

## Subscription and Registration

### Subscription Types

#### Red Hat Developer Subscription

```
Cost: FREE
Systems: Up to 16 systems
Use: Development and testing only
Support: Self-support (KB access, no tickets)
Downloads: Full access to RHEL ISOs

How to Get:
1. Create account: https://developers.redhat.com
2. Register for free developer subscription
3. Download RHEL
4. Register systems with subscription-manager
```

#### Red Hat Enterprise Linux Standard

```
Cost: Paid (per socket or virtual guest)
Support: Business hours (8x5)
Updates: Full access
Knowledge Base: Full access
Target: Small to medium deployments
```

#### Red Hat Enterprise Linux Premium

```
Cost: Paid (higher tier)
Support: 24x7 with faster SLA
Updates: Full access + priority
Target: Mission-critical deployments
Additional: Extended Update Support available
```

### System Registration

```bash
# Register system with Red Hat
sudo subscription-manager register
# Enter Red Hat account username/password

# Or with activation key
sudo subscription-manager register --org=<org-id> --activationkey=<key>

# Auto-attach subscription
sudo subscription-manager attach --auto

# Or manually select subscription
sudo subscription-manager list --available
sudo subscription-manager attach --pool=<pool-id>

# Verify registration
sudo subscription-manager status
sudo subscription-manager list --consumed

# Refresh subscriptions
sudo subscription-manager refresh

# Unregister system
sudo subscription-manager unregister
```

### Repository Management

```bash
# List enabled repositories
sudo subscription-manager repos --list-enabled

# List all available repositories
sudo subscription-manager repos --list

# Enable repository
sudo subscription-manager repos --enable=rhel-9-for-x86_64-baseos-rpms
sudo subscription-manager repos --enable=rhel-9-for-x86_64-appstream-rpms

# Disable repository
sudo subscription-manager repos --disable=repository-id

# Common repositories:
# RHEL 9:
# - rhel-9-for-x86_64-baseos-rpms (Base OS)
# - rhel-9-for-x86_64-appstream-rpms (Application Stream)
# - codeready-builder-for-rhel-9-x86_64-rpms (PowerTools/CRB)

# RHEL 8:
# - rhel-8-for-x86_64-baseos-rpms
# - rhel-8-for-x86_64-appstream-rpms
# - codeready-builder-for-rhel-8-x86_64-rpms
```

---

## Installation

### System Requirements

**Minimum**:
- **RAM**: 1.5 GB (4+ GB recommended)
- **Disk**: 20 GB
- **Processor**: 1 GHz

**Recommended (Production)**:
- **RAM**: 8+ GB
- **Disk**: 100+ GB (SSD)
- **Processor**: 4+ cores, 2+ GHz
- **Network**: Redundant NICs

### Installation Media

```bash
# Download from Red Hat Customer Portal
https://access.redhat.com/downloads/content/479/

# Options:
- Binary DVD (full installation)
- Boot ISO (network installation)
- KVM Guest Image
- Cloud Images (AWS, Azure, GCP)

# Verify checksum
sha256sum rhel-9.3-x86_64-dvd.iso
```

### Installation Methods

#### 1. Graphical Installation (Anaconda)

```
1. Boot from DVD/USB
2. Select "Install Red Hat Enterprise Linux 9"
3. Installation Summary:
   - Localization (keyboard, language, time)
   - Software Selection
   - Installation Destination
   - Network & Hostname
   - Security Policy (optional)
4. Begin Installation
5. Root Password (optional)
6. User Creation
7. Reboot
```

#### 2. Kickstart (Automated)

```bash
# Create kickstart file
# /path/to/ks.cfg

# Boot with kickstart
# At boot: ks=http://server/ks.cfg

# Example kickstart for automated install:
install
url --url="http://mirror/rhel9/BaseOS"
lang en_US.UTF-8
keyboard us
timezone America/New_York
rootpw --iscrypted $encrypted_password
user --name=admin --groups=wheel --password=$encrypted_password --iscrypted
autopart
network --bootproto=dhcp --device=eth0 --onboot=yes
firewall --enabled --service=ssh
selinux --enforcing
reboot

%packages
@^server-product-environment
@development
%end
```

#### 3. Cloud Deployment

```bash
# AWS Marketplace
# Azure Marketplace
# Google Cloud Platform Marketplace
# Pre-configured RHEL images
# Bring Your Own Subscription (BYOS) or Pay-As-You-Go
```

### Post-Installation

```bash
# Register system
sudo subscription-manager register
sudo subscription-manager attach --auto

# Update system
sudo dnf update -y

# Install useful packages
sudo dnf install vim wget curl git htop

# Configure firewall
sudo systemctl enable --now firewalld
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload

# Verify SELinux
getenforce  # Should be "Enforcing"
```

---

## Package Management

### DNF Package Manager

```bash
# Update all packages
sudo dnf update
sudo dnf upgrade  # Alias

# Search packages
dnf search package-name

# Install packages
sudo dnf install package-name
sudo dnf install package-1 package-2

# Remove packages
sudo dnf remove package-name
sudo dnf autoremove

# Package information
dnf info package-name
dnf list installed
dnf list available

# Groups
dnf group list
sudo dnf group install "Server with GUI"

# History
dnf history
sudo dnf history undo last

# Clean cache
sudo dnf clean all
```

### Application Streams

```bash
# Application Streams allow multiple versions of software

# List available modules
dnf module list

# Example: PostgreSQL module
dnf module list postgresql

# Install specific version
sudo dnf module install postgresql:13

# Switch versions
sudo dnf module reset postgresql
sudo dnf module install postgresql:15

# Common modules:
# - nodejs:16, nodejs:18
# - python39, python311
# - postgresql:13, postgresql:15
# - mariadb:10.5, mariadb:10.11
# - php:8.0, php:8.1
```

### Software Collections (RHEL 7)

```bash
# For RHEL 7, use Software Collections
sudo subscription-manager repos --enable=rhel-7-server-optional-rpms
sudo subscription-manager repos --enable=rhel-server-rhscl-7-rpms

# Install Software Collection
sudo yum install rh-python38

# Enable Software Collection
scl enable rh-python38 bash
python --version
```

---

## Enterprise Features

### Red Hat Insights

```bash
# Proactive system management and remediation

# Install Insights client
sudo dnf install insights-client

# Register system
sudo insights-client --register

# Run analysis
sudo insights-client

# View results
https://console.redhat.com/insights/

Features:
- Security vulnerabilities detection
- Performance analysis
- Configuration drift detection
- Compliance reporting
- Predictive analytics
- Automated remediation with Ansible
```

### System Roles (Ansible Automation)

```bash
# Red Hat Enterprise Linux System Roles
# Pre-built Ansible roles for common tasks

# Install system roles
sudo dnf install rhel-system-roles

# Available roles:
# - network
# - selinux
# - timesync
# - kdump
# - storage
# - certificate
# - firewall
# - ha_cluster
# - logging
# - metrics
# - nbde_client/nbde_server
# - postfix
# - ssh
# - vpn

# Example playbook
# configure-network.yml
---
- name: Configure network
  hosts: servers
  roles:
    - rhel-system-roles.network
  vars:
    network_connections:
      - name: eth0
        type: ethernet
        ip:
          address:
            - 192.168.1.100/24
```

### Image Builder

```bash
# Create custom RHEL images

# Install composer
sudo dnf install osbuild-composer composer-cli cockpit-composer

# Start service
sudo systemctl enable --now osbuild-composer.socket

# Access via Cockpit
http://localhost:9090

# Or CLI
composer-cli blueprints list
composer-cli compose start blueprint-name image-type

Supported outputs:
- qcow2 (KVM)
- ami (AWS)
- vhd (Azure)
- vmdk (VMware)
- openstack
- tar (containers)
```

### Web Console (Cockpit)

```bash
# Install Cockpit
sudo dnf install cockpit

# Enable and start
sudo systemctl enable --now cockpit.socket

# Allow through firewall
sudo firewall-cmd --permanent --add-service=cockpit
sudo firewall-cmd --reload

# Access
https://server-ip:9090

Features:
- System overview
- Storage management
- Network configuration
- User accounts
- Services
- Updates
- Logs
- Terminal
- Virtual machines (with cockpit-machines)
- Container management (with cockpit-podman)
```

---

## Security and Compliance

### SELinux

```bash
# SELinux is enforcing by default (and should stay that way)

# Check status
getenforce
sestatus

# Never disable permanently in production!

# Troubleshooting
sudo ausearch -m avc -ts recent
sudo sealert -a /var/log/audit/audit.log

# Install troubleshooting tools
sudo dnf install setroubleshoot-server
```

### FIPS 140-2 Mode

```bash
# Enable FIPS mode (requires reboot)
sudo fips-mode-setup --enable
sudo reboot

# Verify
fips-mode-setup --check

# FIPS mode:
- Cryptographic algorithm compliance
- Required for government/regulated industries
- Cannot be disabled without reinstallation
```

### OpenSCAP Compliance

```bash
# Install OpenSCAP
sudo dnf install openscap-scanner scap-security-guide

# Available profiles:
# - PCI-DSS
# - HIPAA
# - DISA STIG
# - CIS Benchmarks

# Run compliance scan
sudo oscap xccdf eval --profile pci-dss \
  --results scan-results.xml \
  /usr/share/xml/scap/ssg/content/ssg-rhel9-ds.xml

# Generate report
sudo oscap xccdf generate report scan-results.xml > report.html
```

---

## High Availability and Clustering

### Pacemaker/Corosync Cluster

```bash
# Install HA packages
sudo dnf install pcs pacemaker corosync

# Enable services
sudo systemctl enable --now pcsd

# Configure firewall
sudo firewall-cmd --permanent --add-service=high-availability
sudo firewall-cmd --reload

# Authenticate nodes
sudo pcs host auth node1 node2 node3

# Create cluster
sudo pcs cluster setup mycluster node1 node2 node3

# Start cluster
sudo pcs cluster start --all
sudo pcs cluster enable --all

# Check status
sudo pcs status
```

---

## Container Platform

### Podman

```bash
# Podman is default container runtime in RHEL 8+

# Pull image
podman pull registry.redhat.io/rhel8/httpd-24

# Run container
podman run -d -p 8080:8080 registry.redhat.io/rhel8/httpd-24

# List containers
podman ps

# Rootless containers (run as user)
podman run -d --name nginx -p 8080:80 nginx

# Systemd integration
podman generate systemd --new --files --name nginx
sudo mv container-nginx.service /etc/systemd/system/
sudo systemctl enable --now container-nginx
```

### Red Hat OpenShift (Kubernetes)

```
RHEL is the base OS for:
- Red Hat OpenShift Container Platform
- OpenShift Kubernetes Engine
- OpenShift Platform Plus

Enterprise Kubernetes platform
Built on RHEL CoreOS
Full lifecycle management
```

---

## Support and Troubleshooting

### Red Hat Support

```bash
# Create support case
https://access.redhat.com/support/cases/

# Generate sosreport (system information)
sudo dnf install sos
sudo sosreport

# Upload to Red Hat support case
# File will be in /var/tmp/
```

### Common Issues

```bash
# Subscription issues
sudo subscription-manager refresh
sudo subscription-manager attach --auto

# Repository issues
sudo dnf clean all
sudo subscription-manager repos --list

# SELinux denials
sudo sealert -a /var/log/audit/audit.log

# Network issues
sudo nmcli connection show
sudo systemctl status NetworkManager
```

---

## Best Practices

### Production Deployment

```bash
# 1. Use supported configurations
# Check Red Hat hardware certification
https://catalog.redhat.com

# 2. Keep SELinux enforcing
getenforce  # Must show "Enforcing"

# 3. Regular patching
# Monthly security updates recommended
sudo dnf upgrade --security

# 4. Use Red Hat Insights
sudo insights-client

# 5. Implement monitoring
# - Red Hat Insights
# - Prometheus/Grafana
# - Cockpit

# 6. Backup strategy
# - System snapshots
# - Configuration backups (/etc)
# - Database backups
# - Document recovery procedures

# 7. Use System Roles for automation
# Ansible playbooks for consistency

# 8. Security hardening
# - SCAP compliance scanning
# - Minimal package installation
# - Firewall configuration
# - Audit logging
```

---

## Migration and Upgrade

### In-Place Upgrade (RHEL 8 → RHEL 9)

```bash
# Using leapp tool

# Prerequisites
# - RHEL 8.6 or later
# - All updates applied
# - Valid subscription

# Install leapp
sudo dnf install leapp-upgrade

# Pre-upgrade check
sudo leapp preupgrade

# Review report
cat /var/log/leapp/leapp-report.txt

# Fix any blockers

# Perform upgrade
sudo leapp upgrade

# Reboot
sudo reboot

# Verify
cat /etc/redhat-release
```

---

## Real-World Use Cases

### Case Study 1: Enterprise Database Server

```
Organization: Financial services company
Deployment: Oracle Database 19c on RHEL 8
Hardware: HP ProLiant DL380 (certified)
Support: RHEL Premium subscription

Benefits:
- 99.99% uptime over 3 years
- Red Hat support for production issues
- Certified Oracle configuration
- 10-year support lifecycle
- Regular security patches

Configuration:
- RHEL 8.8 with Oracle patches
- SELinux enforcing
- Pacemaker HA cluster
- Red Hat Insights monitoring
```

### Case Study 2: Cloud-Native Application Platform

```
Organization: Retail e-commerce
Platform: Red Hat OpenShift on RHEL CoreOS
Scale: 50+ Kubernetes nodes
Workload: Microservices, containers

Benefits:
- Consistent platform (on-prem and cloud)
- Enterprise Kubernetes support
- Integrated CI/CD (Tekton)
- Advanced security (OPA, Falco)
- Single vendor support stack

Outcome:
- 10x faster deployments
- Reduced operational complexity
- Improved security posture
```

---

## Conclusion

Red Hat Enterprise Linux represents the gold standard for enterprise Linux deployments, offering unmatched stability, security, and support for mission-critical workloads. With a proven track record spanning decades, comprehensive ecosystem certification, and professional support backed by Red Hat and IBM, RHEL provides the foundation for the world's most demanding computing environments.

Whether running traditional monolithic applications, modern containerized microservices, or hybrid cloud infrastructure, RHEL delivers the reliability, security, and lifecycle management that enterprises require. Combined with Red Hat's extensive portfolio of complementary products (OpenShift, Ansible, Satellite) and professional services, RHEL remains the preferred choice for organizations where downtime is not an option.

**Key Takeaways**:
- **Stability**: 10+ year lifecycle with predictable updates
- **Support**: 24/7 professional support available
- **Security**: SELinux, FIPS, comprehensive compliance
- **Ecosystem**: Extensive ISV and hardware certification
- **Innovation**: Latest enterprise features from upstream
- **Free Development**: No-cost developer subscriptions available

