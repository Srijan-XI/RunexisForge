# Qubes OS

## Introduction

Qubes OS is a revolutionary security-focused operating system that implements security through compartmentalization. By isolating applications into separate virtual machines (called "qubes") running on the Xen hypervisor, Qubes OS provides an unprecedented level of security without sacrificing usability. The operating system is designed on the principle that "security through isolation" is more reliable than trusting individual applications to be secure.

### Philosophy and Design Principles

- **Security Through Isolation**: Different security contexts for different tasks
- **Assume Compromise**: Design assumes some components will be compromised
- **Compartmentalization**: Separate qubes for work, personal, banking, untrusted activities
- **Template System**: Shared base system for efficiency and centralized updates
- **Hardware Isolation**: Device isolation using IOMMU/VT-d
- **Disposable VMs**: Temporary VMs for risky operations
- **No Trust Required**: Don't need to trust individual applications

### Key Characteristics

- **Xen Hypervisor**: Type 1 hypervisor for strong isolation
- **Dom0**: Privileged administrative domain (Fedora-based)
- **AppVMs**: Application virtual machines for daily use
- **TemplateVMs**: Base systems shared across multiple qubes
- **DisposableVMs**: Single-use VMs that self-destruct
- **Color-Coded Security**: Visual security indicators
- **Secure Copy/Paste**: Controlled data transfer between qubes
- **Split Applications**: Security-critical apps split across qubes

### Use Cases

- High-security computing environments
- Journalists and activists requiring anonymity
- Security researchers and penetration testers
- Privacy-conscious individuals
- Handling sensitive documents and communications
- Cryptocurrency and financial operations
- Government and military applications
- Multi-level security (MLS) requirements

### Target Audience

- Security professionals and researchers
- Privacy advocates and journalists
- System administrators handling sensitive data
- Cryptocurrency users
- Users in high-risk environments
- Anyone requiring strong compartmentalization
- Advanced Linux users (some learning curve)

## Security Model

### Security by Compartmentalization

Qubes OS implements a unique security model based on isolation:

**Principle**: If one component is compromised, others remain secure
**Implementation**: Each qube is isolated at the hypervisor level
**Benefit**: Malware in one qube cannot access data in others

### Threat Model

Qubes OS protects against:
- Malware and viruses
- Phishing attacks
- Network-based attacks
- Hardware-based attacks (limited)
- Side-channel attacks (partial)
- Evil maid attacks (with Anti Evil Maid)

Limitations:
- Cannot protect against compromised hardware
- Limited protection against sophisticated state-level attacks on hardware
- Dom0 compromise would be catastrophic (hence kept offline)

### Security Domains

```
┌─────────────────────────────────────────────┐
│              Dom0 (Privileged)              │
│         Administrative Domain (Offline)      │
└─────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
   │ sys-net │   │sys-fire-│   │ sys-usb │
   │ (NetVM) │   │ wall    │   │(USB VM) │
   └────┬────┘   └────┬────┘   └─────────┘
        │             │
   ┌────▼─────────────▼────┐
   │      AppVMs/Qubes      │
   │ ┌──────┐ ┌──────┐     │
   │ │ Work │ │ Personal│   │
   │ └──────┘ └──────┘     │
   │ ┌──────┐ ┌──────┐     │
   │ │ Bank │ │Untrust│    │
   │ └──────┘ └──────┘     │
   └────────────────────────┘
```

## Resources

### Official Resources

- **Website**: <https://www.qubes-os.org>
- **Documentation**: <https://www.qubes-os.org/doc/>
- **Downloads**: <https://www.qubes-os.org/downloads/>
- **Forum**: <https://forum.qubes-os.org>
- **Mailing Lists**: <https://www.qubes-os.org/mailing-lists/>
- **Source Code**: <https://github.com/QubesOS>
- **Security Pack**: <https://www.qubes-os.org/security/pack/>

### Community Resources

- **Reddit**: r/Qubes
- **IRC**: #qubes on OFTC
- **Twitter**: @QubesOS
- **YouTube**: Qubes OS tutorials and talks
- **Blog**: <https://www.qubes-os.org/news/>

### Learning Resources

- [Qubes OS Documentation](https://www.qubes-os.org/doc/) - Official comprehensive guide
- [Introduction to Qubes OS](https://www.qubes-os.org/intro/)
- [Video Tours](https://www.qubes-os.org/video-tours/)
- [Getting Started Guide](https://www.qubes-os.org/doc/getting-started/)

---

## System Requirements

### Minimum Requirements

- **CPU**: 64-bit Intel or AMD processor
- **CPU Extensions**: VT-x/AMD-V (virtualization) - **Required**
- **IOMMU**: VT-d/AMD-Vi - **Highly Recommended**
- **RAM**: 4 GB (8+ GB strongly recommended)
- **Disk**: 32 GB (128+ GB recommended)
- **GPU**: Intel/AMD integrated graphics (NVIDIA problematic)
- **TPM**: Optional but recommended for Anti Evil Maid

### Recommended Requirements

- **CPU**: Intel i5/i7 or AMD Ryzen with VT-x/AMD-V and VT-d/AMD-Vi
- **RAM**: 16+ GB (32 GB ideal for power users)
- **Disk**: 256+ GB SSD
- **GPU**: Intel integrated graphics (best compatibility)
- **Screen**: 1920x1080 or higher
- **Network**: Ethernet and/or WiFi

### Hardware Compatibility

Check the Hardware Compatibility List (HCL):
- <https://www.qubes-os.org/hcl/>
- Community-tested hardware
- Known issues and workarounds

**Best Compatibility**:
- Intel CPUs with Intel graphics
- Lenovo ThinkPad series (T, X, P series)
- Dell Latitude and XPS
- System76 laptops

**Problematic Hardware**:
- NVIDIA graphics (use integrated Intel instead)
- Very new hardware (wait for kernel support)
- Some wireless cards (Broadcom)

---

## Installation

### Pre-Installation Checklist

1. **Verify Hardware Support**
   - Check BIOS for VT-x/AMD-V and VT-d/AMD-Vi
   - Enable virtualization in BIOS
   - Disable Secure Boot (temporarily, can re-enable later)

2. **Backup Data**
   - Qubes OS requires dedicated hardware or full disk
   - No dual-boot recommended (security considerations)

3. **Download and Verify ISO**
   ```bash
   # Download ISO and signature
   wget https://ftp.qubes-os.org/iso/Qubes-R4.2.0-x86_64.iso
   wget https://ftp.qubes-os.org/iso/Qubes-R4.2.0-x86_64.iso.asc
   
   # Import Qubes signing key
   gpg --keyserver keys.gnupg.net --recv-keys 0x427F11FD0FAA4B080123F01CDDFA1A3E36879494
   
   # Verify signature
   gpg --verify Qubes-R4.2.0-x86_64.iso.asc Qubes-R4.2.0-x86_64.iso
   
   # Should show "Good signature from Qubes OS Release X Signing Key"
   ```

4. **Create Installation Media**
   ```bash
   # Linux
   sudo dd if=Qubes-R4.2.0-x86_64.iso of=/dev/sdX bs=4M status=progress && sync
   
   # Verify written media
   sudo dd if=/dev/sdX bs=4M | sha256sum
   ```

### Installation Process

#### Step 1: Boot Installation Media

```
1. Boot from USB
2. Select "Test this media and install Qubes OS"
3. Wait for media check to complete
4. Installer will start
```

#### Step 2: Language and Keyboard

```
- Select language
- Configure keyboard layout
- Set timezone
```

#### Step 3: Installation Destination

```
1. Select installation disk
2. Choose partitioning:
   - Automatic (recommended for beginners)
   - Custom (advanced users)

Recommended partitioning:
- /boot: 1 GB (ext4)
- /: 50+ GB (ext4)
- swap: 16 GB (if 16 GB RAM)
- /home: Remaining space (encrypted)

Or use LVM with encryption (recommended):
- Physical Volume (PV) on encrypted partition
- Logical Volumes (LV) for /, /home, swap
```

#### Step 4: Encryption

```
CRITICAL: Enable full disk encryption (FDE)
- Set a strong passphrase (20+ characters)
- Remember this passphrase (unrecoverable if lost)
- Consider using a passphrase manager

Encryption protects:
- Dom0 and all qubes at rest
- Against physical theft
- Against cold boot attacks (partially)
```

#### Step 5: Qubes OS Installation Options

```
Choose which templates to install:

Fedora Templates:
☑ Fedora (default)
☐ Fedora Minimal

Debian Templates:
☑ Debian (recommended)
☐ Debian Minimal

Whonix (privacy/anonymity):
☑ Whonix Gateway
☑ Whonix Workstation

Default Qubes:
☑ sys-net (networking)
☑ sys-firewall (firewall)
☑ sys-usb (USB devices)
☑ default-dvm (disposable VM template)

Personal Qubes:
☑ personal (personal files and apps)
☑ work (work-related)
☑ vault (offline storage for keys/passwords)
☑ untrusted (risky/untrusted activities)
```

#### Step 6: Create User Account

```
- Username: regular user (not admin in qubes)
- Password: Strong password for dom0 access
- This is separate from encryption passphrase
```

#### Step 7: Installation

```
1. Review settings
2. Begin installation (20-40 minutes)
3. Installation creates:
   - Dom0 (administrative domain)
   - Templates (base systems)
   - System VMs (networking, firewall, USB)
   - User qubes (personal, work, etc.)
```

#### Step 8: First Boot Configuration

```
1. Remove installation media
2. Reboot
3. Enter disk encryption passphrase
4. Login to dom0
5. Complete initial configuration wizard:
   - Update templates
   - Configure default applications
   - Set up networking
```

### Post-Installation Setup

#### Update System

```bash
# From dom0 terminal
sudo qubes-dom0-update

# Update all templates
qvm-run --all --exclude dom0 -- "sudo dnf update -y"  # Fedora
qvm-run --all --exclude dom0 -- "sudo apt update && sudo apt upgrade -y"  # Debian
```

#### Configure USB Qube

```bash
# Assign USB controllers to sys-usb
# Go to: Qube Manager → sys-usb → Devices
# Attach USB controllers
# Be careful: Don't attach keyboard/mouse USB if using USB keyboard/mouse
```

#### Create Additional Qubes

```bash
# From dom0 terminal
qvm-create personal-banking --template debian-11 --label green
qvm-create crypto-wallet --template debian-11 --label purple --prop netvm=''
qvm-create development --template fedora-37 --label blue
```

---

## Understanding Qubes

### Qube Types

#### 1. Dom0 (Administrative Domain)

**Purpose**: Privileged domain that manages all other VMs

```bash
Characteristics:
- Runs on bare metal (not a VM)
- Fedora-based
- No network access (except for updates)
- Contains Xen hypervisor
- GUI domain
- Most critical component

Security Rules for Dom0:
✗ Never browse the web from dom0
✗ Never run untrusted code in dom0
✗ Never install unnecessary software
✓ Keep offline except for updates
✓ Minimal software installation
✓ Regular backups of dom0 config
```

#### 2. TemplateVMs

**Purpose**: Base systems shared across multiple qubes

```bash
How Templates Work:
1. Software installed in template
2. Template filesystem is read-only in AppVMs
3. AppVMs have private writable storage
4. Updates in template affect all AppVMs

Default Templates:
- fedora-XX (Fedora-based, default)
- debian-XX (Debian-based)
- whonix-gw-XX (Whonix Gateway)
- whonix-ws-XX (Whonix Workstation)

Template Management:
# Install software in template
qvm-run -u root fedora-37 xterm
sudo dnf install firefox libreoffice

# Create new template
qvm-clone fedora-37 fedora-37-dev
```

#### 3. AppVMs (Application Virtual Machines)

**Purpose**: VMs for running applications

```bash
Characteristics:
- Based on TemplateVM
- Private storage for user data
- Isolated from each other
- Can have network or be offline
- Color-coded for security levels

Common AppVMs:
- personal: Personal use, web browsing, email
- work: Work-related activities
- vault: Offline storage (passwords, keys, GPG)
- untrusted: Risky activities, unknown files
- banking: Financial transactions

Create AppVM:
qvm-create my-app --template fedora-37 --label blue
qvm-prefs my-app netvm sys-firewall
qvm-start my-app
```

#### 4. StandaloneVMs

**Purpose**: VMs with their own filesystem (not template-based)

```bash
Use Cases:
- Specialized configurations
- Testing different distros
- VMs requiring persistent system changes
- Windows VMs

Create Standalone:
qvm-create my-standalone --standalone --template fedora-37 --label yellow

Note: Updates must be applied individually (no template sharing)
```

#### 5. DisposableVMs (DispVMs)

**Purpose**: Temporary VMs that self-destruct after use

```bash
Use Cases:
- Opening untrusted files
- Risky web browsing
- One-time tasks
- Testing software

Create Disposable:
qvm-run --dispvm=default-dvm firefox

Create from any qube:
Right-click file → Open in DisposableVM

Set as default for file types:
Applications → File Manager → Preferences
```

#### 6. Service VMs

**Purpose**: System services (networking, firewall, USB)

```bash
sys-net:
- Manages network hardware
- WiFi and Ethernet connections
- First point of potential network compromise
- Should have minimal software

sys-firewall:
- Firewall between sys-net and AppVMs
- Network traffic filtering
- Port blocking
- Proxy configuration

sys-usb:
- USB device management
- Protects against USB attacks
- Isolate potentially malicious USB devices
- Can be configured to auto-attach devices
```

### Security Domains and Colors

```bash
Color Coding System:
🔴 Red    - Untrusted, highest risk
🟠 Orange - Semi-trusted
🟡 Yellow - Moderate trust
🟢 Green  - Trusted (banking, personal)
🔵 Blue   - Work-related
🟣 Purple - Special purpose (crypto, vault)
⚫ Black  - Fully trusted, offline
⚪ Gray   - System VMs

Color Strategy:
- Assign colors based on trust level
- Visual reminder of security context
- Different colors = different security domains
- Never mix security domains
```

---

## Daily Usage

### Starting and Using Qubes

```bash
# Start a qube
qvm-start personal

# Run application in qube
qvm-run personal firefox

# Open terminal in qube
qvm-run personal xterm

# Run as root
qvm-run -u root personal xterm

# Shutdown qube
qvm-shutdown personal

# Force shutdown
qvm-kill personal

# List running qubes
qvm-ls --running

# List all qubes
qvm-ls
```

### Application Menu

```
Applications Menu (top-left):
- Organized by qube
- Shows installed applications per qube
- Can pin favorites
- Create custom entries

To add application to menu:
1. Install in TemplateVM
2. Refresh application list
3. Appear in qube's submenu
```

### Inter-Qube Communication

#### Copying Files Between Qubes

```bash
# From GUI:
Right-click file → Copy to Another AppVM → Select destination

# From command line (in source qube):
qvm-copy-to-vm destination-qube file.txt

# Received files appear in:
~/QubesIncoming/source-qube/file.txt

# Moving files (one-way, more secure):
qvm-move-to-vm destination-qube file.txt
# Original file is deleted
```

#### Copy and Paste Between Qubes

```
Secure Clipboard:
1. Copy in source qube: Ctrl+C
2. Qubes clipboard: Ctrl+Shift+C
3. Paste in destination: Ctrl+Shift+V
4. Then Ctrl+V in application

Two-step process prevents accidental cross-qube paste
```

#### Running Commands in Other Qubes

```bash
# Execute command in another qube (from dom0)
qvm-run qube-name "command"

# Examples:
qvm-run personal "notify-send 'Hello from dom0'"
qvm-run work "gnome-terminal"

# Run disposable with command:
qvm-run --dispvm=default-dvm "firefox https://example.com"
```

---

## Software Management

### Installing Software

#### In TemplateVMs (Recommended)

```bash
# Fedora template
qvm-run -u root fedora-37 xterm
sudo dnf install package-name

# Debian template
qvm-run -u root debian-11 xterm
sudo apt update && sudo apt install package-name

# After installation:
1. Shutdown template
2. Restart AppVMs based on that template
3. Software available in all AppVMs
```

#### In AppVMs (Not Recommended)

```bash
# Can install, but changes lost on reboot
# Unless installed in /rw/usrlocal or ~/
qvm-run -u root my-app xterm
sudo dnf install package

# Persistent installation in AppVM:
# Use /rw/bind-dirs (advanced)
```

### Installing Templates

```bash
# List available templates
sudo qubes-dom0-update --action=search qubes-template-*

# Install template
sudo qubes-dom0-update qubes-template-debian-11
sudo qubes-dom0-update qubes-template-fedora-37

# Community templates:
# - Arch Linux
# - Ubuntu
# - CentOS
# - Gentoo
# - More at: https://www.qubes-os.org/doc/templates/

# Clone template for customization
qvm-clone fedora-37 fedora-37-dev
```

### Updating System

```bash
# Update dom0
sudo qubes-dom0-update

# Update all templates
# Method 1: Through GUI
Qube Manager → right-click template → Update

# Method 2: Command line
qvm-run -u root fedora-37 -- "sudo dnf update -y"
qvm-run -u root debian-11 -- "sudo apt update && sudo apt upgrade -y"

# Update all Fedora-based qubes
qvm-run --all --exclude dom0 -- "sudo dnf update -y"

# Automated updates (cron in dom0)
# /etc/cron.daily/qubes-update
#!/bin/bash
sudo qubes-dom0-update -y
```

---

## Advanced Features

### Split GPG

Split GPG separates GPG key storage from key usage for enhanced security.

```bash
Setup:
1. Create vault qube (offline, no network)
2. Generate/import GPG keys in vault
3. Configure AppVMs to use vault for GPG operations

# In vault qube
gpg --gen-key
# Follow prompts

# In AppVM, configure split GPG
echo "vault" > /rw/config/gpg-split-domain

# Use GPG in AppVM
echo "test" | gpg --armor --sign
# GPG agent in vault prompts for passphrase
# Vault signs, AppVM gets signature

Benefits:
- GPG keys never leave vault
- Malware in AppVM can't steal keys
- Vault can be backed up offline
```

### Split Browser

Separate browser rendering from browsing VM for enhanced security.

```bash
Concept:
- Browser runs in untrusted VM
- Display rendered in trusted VM
- Compromise of untrusted VM doesn't affect other qubes

Implementation:
# Use qubes-app-split-browser
# Or manually configure with qrexec
```

### U2F (Universal 2nd Factor)

```bash
# Use U2F keys with Qubes
# Configure USB qube to pass U2F devices
qvm-usb attach target-qube sys-usb:X-Y

# U2F proxy for security
# Allows U2F without exposing USB controller
```

### VPN

```bash
# VPN in ProxyVM (recommended)
1. Create ProxyVM: qvm-create vpn --proxy --template fedora-37
2. Install VPN client in VPN template or vpn qube
3. Configure VPN
4. Set AppVMs to use vpn as NetVM

# Benefits:
- VPN compromise doesn't affect other VMs
- Easy to route specific qubes through VPN
- Can chain: AppVM → VPN → sys-firewall → sys-net

# In VPN qube:
sudo openvpn --config /path/to/config.ovpn

# Set as NetVM for qube:
qvm-prefs work netvm vpn
```

### Whonix Integration

Whonix provides anonymity through Tor.

```bash
# Install Whonix templates (if not during initial install)
sudo qubes-dom0-update qubes-template-whonix-gw-16
sudo qubes-dom0-update qubes-template-whonix-ws-16

# Create Whonix Gateway
qvm-create sys-whonix --template whonix-gw-16 --label purple --proxy

# Create Whonix Workstation
qvm-create anon-whonix --template whonix-ws-16 --label purple
qvm-prefs anon-whonix netvm sys-whonix

# All traffic from anon-whonix goes through Tor
# Anonymous browsing, IRC, etc.

# Can create multiple Whonix workstations
# All share same Whonix Gateway (Tor entry)
```

### Disposable VMs (Advanced)

```bash
# Create custom disposable template
qvm-create fedora-37-dvm --template fedora-37 --label red --class AppVM
# Customize as needed
qvm-prefs fedora-37-dvm template_for_dispvms True

# Set as default disposable
qvm-prefs default-dvm template_for_dispvms True

# Create named disposable
qvm-run --dispvm=fedora-37-dvm firefox

# Disposable from GUI
Right-click qube → Run Disposable
```

### Backup and Restore

```bash
# Backup qubes
# GUI: Qube Manager → System → Backup Qubes
# Or command line:
qvm-backup-restore --backup-dir /path/to/backup qube1 qube2

# Backup to external drive (recommended)
qvm-backup-restore --backup-dir /media/backup --encrypt \
  personal work vault

# Restore from backup
qvm-backup-restore --restore-from-backup-file /path/to/backup.tar

# Best practices:
- Backup regularly (weekly)
- Store backups offline
- Encrypt backups
- Test restore procedure
- Backup dom0 configuration
```

---

## Security Best Practices

### Dom0 Security

```bash
✓ DO:
- Keep dom0 offline (except updates)
- Use minimal software in dom0
- Update regularly
- Strong authentication
- Backup dom0 config

✗ DON'T:
- Browse web from dom0
- Run untrusted software
- Copy files from AppVMs to dom0 (unless necessary)
- Install unnecessary applications
- Use dom0 for daily tasks
```

### Qube Security

```bash
Security Hygiene:
1. Separate by trust level (use colors)
2. Use disposables for untrusted content
3. Keep vault qube offline
4. Regular updates
5. Minimal software installation
6. Review firewall rules

Trust Levels:
- Black/Purple: Vault, crypto (offline)
- Green: Banking, important accounts
- Blue: Work
- Yellow/Orange: General use
- Red: Untrusted, risky activities

Never:
- Mix security domains
- Open untrusted files in trusted qubes
- Share passwords between domains
```

### Network Security

```bash
# Firewall rules (in sys-firewall)
# Block all except necessary ports

# Disable networking for sensitive qubes
qvm-prefs vault netvm ''
qvm-prefs crypto-wallet netvm ''

# Use VPN qube for extra privacy
# Use Whonix for anonymity

# Tor Browser in Whonix workstation
# Regular browsing in personal qube
# Banking in dedicated banking qube (no Tor)
```

### USB Security

```bash
# Use sys-usb to isolate USB devices
# Prevents USB-based attacks on dom0

# Attach USB device to qube
qvm-usb list
qvm-usb attach target-qube sys-usb:X-Y

# Auto-attach trusted devices
# Configure in dom0:
qvm-usb attach --persistent vault sys-usb:2-1.1

# Never trust unknown USB devices
# Use disposable VM to examine files on USB
```

### Anti Evil Maid (AEM)

```bash
# Protects against physical tampering
# Requires TPM chip

# Install AEM
sudo qubes-dom0-update anti-evil-maid

# Setup AEM
sudo anti-evil-maid-install
# Follow prompts to configure

# How it works:
1. Measures boot components
2. Stores measurements in TPM
3. On boot, TPM verifies integrity
4. Secret revealed only if measurements match
5. User verifies secret before entering passphrase

# If secret doesn't match:
- Don't enter passphrase
- System may be compromised
```

---

## Troubleshooting

### Common Issues

#### Qube Won't Start

```bash
# Check if enough RAM
qvm-prefs qube-name memory
# Increase if needed
qvm-prefs qube-name memory 2048

# Check logs
journalctl -f  # In dom0
tail -f /var/log/xen/console/guest-qube-name.log

# Reset qube
qvm-kill qube-name
qvm-start qube-name

# Reinstall qube
qvm-remove qube-name
qvm-create qube-name --template fedora-37 --label blue
```

#### Network Not Working

```bash
# Restart sys-net and sys-firewall
qvm-shutdown --wait sys-firewall
qvm-shutdown --wait sys-net
qvm-start sys-net
qvm-start sys-firewall

# Check NetworkManager
qvm-run -u root sys-net "systemctl status NetworkManager"

# Reassign network device to sys-net
# Qube Manager → sys-net → Devices → PCI Devices
```

#### Out of Disk Space

```bash
# Check disk usage
df -h /

# Increase storage pool
sudo lvextend -L +20G /dev/mapper/qubes_dom0-pool00
sudo lvextend -L +20G /dev/mapper/qubes_dom0-root

# Clean up old logs
sudo journalctl --vacuum-time=7d

# Remove old kernels
sudo qubes-dom0-update --clean

# Clean package cache
qvm-run -u root fedora-37 "sudo dnf clean all"
```

#### Template Issues

```bash
# Template won't update
qvm-run -u root fedora-37 xterm
sudo dnf clean all
sudo dnf update --refresh

# Reset template (CAUTION: loses customizations)
qvm-remove fedora-37
sudo qubes-dom0-update qubes-template-fedora-37

# Clone before experimenting
qvm-clone fedora-37 fedora-37-backup
```

### Performance Optimization

```bash
# Reduce RAM usage
qvm-prefs qube-name memory 512
qvm-prefs qube-name maxmem 1024

# Use minimal templates
sudo qubes-dom0-update qubes-template-fedora-37-minimal

# Reduce CPU count for VMs
qvm-prefs qube-name vcpus 1

# Disable unnecessary services
qvm-service qube-name service-name off

# Use SSD for better performance
# Enable TRIM in dom0
sudo systemctl enable fstrim.timer
```

---

## Real-World Use Cases

### Case Study 1: Journalist/Activist

**Scenario**: Journalist working on sensitive stories

**Implementation**:
```bash
Qubes Setup:
- vault: Offline storage for sensitive documents, GPG keys
- sources: Communication with sources (Whonix)
- research: General research (regular internet)
- personal: Personal communications
- work: Work-related non-sensitive tasks

Workflow:
1. Receive encrypted documents in disposable VM
2. Decrypt in vault (offline, split GPG)
3. Work on documents in sources qube (Whonix)
4. Publish from research qube
5. Keep sources qube isolated from personal

Benefits:
- Source protection through Whonix
- Document security in vault
- Compromise of one qube doesn't affect others
- Can securely handle malicious attachments
```

### Case Study 2: Cryptocurrency Management

**Scenario**: Managing cryptocurrency wallets and trading

**Implementation**:
```bash
Qubes Setup:
- crypto-cold: Offline wallet storage (no network)
- crypto-watch: Watch-only wallet (read-only)
- exchange: Trading on exchanges
- research: Cryptocurrency research

Workflow:
1. Generate keys in crypto-cold (offline)
2. Export public keys to crypto-watch
3. Monitor balances in crypto-watch
4. Create unsigned transactions in crypto-watch
5. Sign transactions in crypto-cold (via qrexec)
6. Broadcast from crypto-watch
7. Trade on exchanges in separate exchange qube

Benefits:
- Private keys never online
- Exchange compromise doesn't affect cold storage
- Can monitor portfolio without risk
- Split wallet approach prevents key theft
```

### Case Study 3: Security Researcher

**Scenario**: Malware analysis and penetration testing

**Implementation**:
```bash
Qubes Setup:
- analysis: Malware analysis (isolated, disposable)
- tools: Security tools and frameworks
- target: Penetration testing targets
- reporting: Report writing and documentation
- personal: Personal activities (separated)

Workflow:
1. Analyze malware in disposable VMs
2. Snapshot analysis qube before each test
3. Run security tools in tools qube
4. Test targets in isolated target qube
5. Document in reporting qube
6. Personal life in separate qube

Benefits:
- Malware contained in disposable
- Each analysis starts fresh
- Tools qube kept clean
- Work/personal separation
- Can safely detonate malware
```

### Case Study 4: Developer

**Scenario**: Software development with various trust levels

**Implementation**:
```bash
Qubes Setup:
- dev-trusted: Company/trusted projects
- dev-oss: Open source contributions
- dev-test: Testing untrusted code
- personal: Personal projects
- deployment: Production deployment

Workflow:
1. Develop trusted code in dev-trusted
2. Contribute to OSS in dev-oss
3. Test third-party libraries in dev-test
4. Personal projects in personal qube
5. Deploy from deployment qube

Benefits:
- Malicious dependencies contained
- Company IP protected
- Can safely test untrusted code
- Clear separation of contexts
- Supply chain attack mitigation
```

### Case Study 5: Enterprise User

**Scenario**: Corporate employee with strict security requirements

**Implementation**:
```bash
Qubes Setup:
- corporate: Company VPN and resources
- email: Corporate email (separate VM)
- web: Web browsing for research
- personal: Personal use (off-hours)
- vault: Password manager, certificates

Workflow:
1. Connect to corporate VPN in corporate qube
2. Access company resources through VPN qube
3. Email in dedicated email qube
4. Research in web qube
5. Passwords in vault (offline)
6. Personal activities in personal qube

Benefits:
- Corporate data isolated from personal
- Email phishing contained
- Web browsing compromises don't affect corporate access
- Password vault protected
- Compliance with security policies
```

---

## Advanced Topics

### Qubes RPC

```bash
# Inter-qube communication framework
# Located in: /etc/qubes-rpc/

# Create custom RPC service
# In target qube: /etc/qubes-rpc/custom.Service
#!/bin/bash
echo "Response from service"

# Grant permission in dom0
# /etc/qubes-rpc/policy/custom.Service
source-qube target-qube allow

# Call from source qube
/usr/lib/qubes/qrexec-client-vm target-qube custom.Service
```

### Custom Qube Templates

```bash
# Minimal template for specific use case
qvm-clone fedora-37-minimal webserver-template

# Customize
qvm-run -u root webserver-template xterm
sudo dnf install nginx php-fpm
# Configure services

# Mark as template
qvm-prefs webserver-template provides_network False

# Create AppVM from custom template
qvm-create webserver --template webserver-template --label blue
```

### Passwordless Root Access

```bash
# In TemplateVM, configure sudo
sudo visudo
# Add: user ALL=(ALL) NOPASSWD: ALL

# Or per-command:
user ALL=(ALL) NOPASSWD: /usr/bin/apt update, /usr/bin/apt upgrade

# Useful for automation
# Use carefully (security implications)
```

---

## Migration and Deployment

### Migrating to Qubes OS

```bash
Preparation:
1. Export important data from old system
2. Export email (mbox format)
3. Export browser bookmarks
4. List installed applications
5. Document workflows

Migration Steps:
1. Install Qubes OS (fresh installation)
2. Create qubes for different contexts
3. Import data to appropriate qubes
4. Install applications in templates
5. Configure workflows

Tips:
- Start with main qubes (personal, work)
- Add specialized qubes as needed
- Don't try to replicate old system exactly
- Think in terms of security domains
```

### Deployment in Organizations

```bash
Considerations:
- Hardware standardization (HCL compatibility)
- Template customization (corporate software)
- Centralized dom0 updates
- Backup strategy
- User training
- Support infrastructure

Corporate Template:
1. Create base corporate template
2. Install corporate software
3. Configure VPN, certificates
4. Deploy to all machines
5. Users clone for personal customization
```

---

## Resources and Community

### Getting Help

- **Forum**: Most active community resource
- **Mailing Lists**: Development discussions
- **IRC**: Real-time help (#qubes on OFTC)
- **Documentation**: Comprehensive official docs
- **GitHub Issues**: Bug reports and feature requests

### Contributing

- Report bugs and issues
- Improve documentation
- Develop packages and tools
- Create templates
- Help other users in forums
- Donate to support development

### Stay Updated

- Subscribe to qubes-announce mailing list
- Follow security advisories
- Check blog for updates
- Monitor GitHub for releases

---

## Comparison with Other Security-Focused OSes

### Qubes OS vs Tails

| Feature | Qubes OS | Tails |
|---------|----------|-------|
| Approach | Compartmentalization | Anonymity |
| Persistence | Yes | Optional |
| Anonymity | Optional (Whonix) | Default (Tor) |
| Use Case | Daily use, diverse tasks | Specific sessions |
| Complexity | High | Low |
| Installation | To disk | Live USB |

### Qubes OS vs Standard Linux

| Feature | Qubes OS | Standard Linux |
|---------|----------|----------------|
| Security Model | Isolation-based | Permission-based |
| VM Overhead | Yes (resource intensive) | No |
| Software Isolation | Hypervisor-level | Process-level |
| Complexity | High | Low to medium |
| Learning Curve | Steep | Gentle |
| Resource Requirements | High (16+ GB RAM) | Low |

---

## Conclusion

Qubes OS represents a paradigm shift in operating system security. By assuming that compromise is inevitable and designing around that assumption, it provides unprecedented protection for users who handle sensitive information or work in high-risk environments.

While the learning curve is steep and hardware requirements are substantial, the security benefits are unmatched. For journalists, activists, cryptocurrency users, security researchers, and anyone requiring strong compartmentalization, Qubes OS offers a practical implementation of "security through isolation."

The key to success with Qubes OS is understanding its security model, carefully planning your qube architecture based on trust levels, and developing workflows that take advantage of compartmentalization. With proper use, Qubes OS can significantly reduce the impact of compromises and provide peace of mind for security-conscious users.

**Remember**: Qubes OS is a tool. Its effectiveness depends on how you use it. No operating system can protect against all threats, but Qubes OS provides powerful mechanisms to limit the damage when things go wrong.

