# Introduction to Rocky Linux

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

Ready to get started? Check the [User Guide](user-guide.md) for installation and administration!

---

**Enterprise Linux, Community Driven! 🏔️🐧**
