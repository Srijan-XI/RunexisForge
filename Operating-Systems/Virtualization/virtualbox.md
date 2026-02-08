# VirtualBox — Complete Guide

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Creating Your First VM](#creating-your-first-vm)
- [VirtualBox Manager Interface](#virtualbox-manager-interface)
- [VM Configuration](#vm-configuration)
- [Guest Additions](#guest-additions)
- [Networking](#networking)
- [Shared Folders](#shared-folders)
- [Snapshots & Clones](#snapshots--clones)
- [VBoxManage CLI](#vboxmanage-cli)
- [Headless Mode](#headless-mode)
- [Vagrant Integration](#vagrant-integration)
- [Performance Tuning](#performance-tuning)
- [Troubleshooting](#troubleshooting)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**Oracle VM VirtualBox** is a free, open-source Type 2 hypervisor that runs on Windows, macOS, Linux, and Solaris. It's perfect for:
- 🎓 Learning new operating systems
- 💻 Development and testing
- 🔬 Creating isolated lab environments
- 🏠 Home lab projects

**Key Features:**
- ✅ Free and open source (GPL v2)
- ✅ Cross-platform (Windows, macOS, Linux)
- ✅ Supports most guest OSes
- ✅ Powerful CLI (`VBoxManage`)
- ✅ Snapshots and cloning
- ✅ Extensive networking options

---

## Installation

### Windows

```powershell
# Download from official website
# https://www.virtualbox.org/wiki/Downloads

# Or using Chocolatey
choco install virtualbox

# Install Extension Pack (optional but recommended)
choco install virtualbox.extensionpack
```

**Manual installation:**
1. Download VirtualBox installer
2. Run `VirtualBox-x.x.x-Win.exe`
3. Follow installation wizard
4. Download Extension Pack separately
5. Double-click `.vbox-extpack` file to install

### macOS

```bash
# Using Homebrew
brew install --cask virtualbox

# Install Extension Pack
brew install --cask virtualbox-extension-pack
```

**Manual installation:**
1. Download macOS `.dmg` file
2. Open and drag VirtualBox to Applications
3. Grant necessary permissions in System Preferences → Security

### Linux

**Ubuntu/Debian:**
```bash
# Add VirtualBox repository
sudo apt update
sudo apt install virtualbox virtualbox-ext-pack

# Or download latest from virtualbox.org
wget https://download.virtualbox.org/virtualbox/7.0.14/virtualbox-7.0_7.0.14-161095~Ubuntu~jammy_amd64.deb
sudo dpkg -i virtualbox-7.0_*.deb

# Install Extension Pack
wget https://download.virtualbox.org/virtualbox/7.0.14/Oracle_VM_VirtualBox_Extension_Pack-7.0.14.vbox-extpack
sudo VBoxManage extpack install Oracle_VM_VirtualBox_Extension_Pack-7.0.14.vbox-extpack
```

**Fedora/RHEL:**
```bash
sudo dnf install VirtualBox

# Or from repo
wget https://download.virtualbox.org/virtualbox/rpm/fedora/virtualbox.repo
sudo mv virtualbox.repo /etc/yum.repos.d/
sudo dnf install VirtualBox-7.0
```

**Arch Linux:**
```bash
sudo pacman -S virtualbox virtualbox-host-modules-arch

# Load kernel modules
sudo modprobe vboxdrv
```

### Extension Pack

**What it includes:**
- USB 2.0 and USB 3.0 support
- VirtualBox Remote Desktop Protocol (VRDP)
- Disk encryption
- NVMe and PXE boot for Intel cards

**Install:**
```bash
# Download Extension Pack matching VirtualBox version
# File → Preferences → Extensions → Add

# Or via CLI
VBoxManage extpack install Oracle_VM_VirtualBox_Extension_Pack-7.0.14.vbox-extpack

# Check installed extensions
VBoxManage list extpacks
```

---

## Creating Your First VM

### Method 1: GUI Wizard

**Step-by-step:**

1. **Click "New"** in VirtualBox Manager

2. **Name and Operating System:**
   ```
   Name: Ubuntu-22.04
   Type: Linux
   Version: Ubuntu (64-bit)
   ```

3. **Memory Size:**
   ```
   Linux: 2048 MB (2 GB) minimum
   Windows 10: 4096 MB (4 GB) minimum
   ```

4. **Hard Disk:**
   ```
   ○ Create a virtual hard disk now
   Storage: VDI (VirtualBox Disk Image)
   Allocation: Dynamically allocated
   Size: 25 GB (for Linux), 50 GB (for Windows)
   ```

5. **Settings → Storage:**
   ```
   Controller: IDE → Empty
   Click disk icon → Choose a disk file
   Select your .iso file (e.g., ubuntu-22.04.iso)
   ```

6. **Start the VM** and follow OS installation

### Method 2: VBoxManage CLI

```bash
# Create VM
VBoxManage createvm --name "Ubuntu-22" --ostype "Ubuntu_64" --register

# Set memory (2GB)
VBoxManage modifyvm "Ubuntu-22" --memory 2048

# Set CPUs
VBoxManage modifyvm "Ubuntu-22" --cpus 2

# Create disk (25GB, dynamically allocated)
VBoxManage createmedium disk --filename "/path/to/Ubuntu-22.vdi" --size 25600 --format VDI

# Add SATA controller
VBoxManage storagectl "Ubuntu-22" --name "SATA" --add sata --controller IntelAhci

# Attach disk
VBoxManage storageattach "Ubuntu-22" --storagectl "SATA" --port 0 --device 0 --type hdd --medium "/path/to/Ubuntu-22.vdi"

# Add IDE controller for ISO
VBoxManage storagectl "Ubuntu-22" --name "IDE" --add ide

# Attach ISO
VBoxManage storageattach "Ubuntu-22" --storagectl "IDE" --port 0 --device 0 --type dvddrive --medium "/path/to/ubuntu-22.04.iso"

# Configure network (NAT)
VBoxManage modifyvm "Ubuntu-22" --nic1 nat

# Enable IOAPIC, PAE, VT-x
VBoxManage modifyvm "Ubuntu-22" --ioapic on --pae on --hwvirtex on

# Start VM
VBoxManage startvm "Ubuntu-22"
```

---

## VirtualBox Manager Interface

### Main Window

```
┌─────────────────────────────────────────┐
│ Machine Tools  Global Tools             │
├─────────────┬───────────────────────────┤
│ VM List     │  Details/Preview          │
│             │                           │
│ ○ Windows   │  Name: Ubuntu-22          │
│ ● Ubuntu-22 │  OS: Ubuntu 64-bit        │
│ ○ Debian    │  RAM: 2048 MB             │
│             │  CPUs: 2                  │
│             │  Display: VMSVGA          │
│             │                           │
│             │  [Preview Window]         │
│             │                           │
├─────────────┴───────────────────────────┤
│ Start Settings Snapshots Logs           │
└─────────────────────────────────────────┘
```

### Menu Bar

- **Machine**: New, Add, Settings, Clone, Remove
- **File**: Preferences, Import/Export, Tools
- **View**: Display modes, resize
- **Input**: Keyboard, mouse capture
- **Devices**: Optical drives, USB, shared folders

---

## VM Configuration

### System Settings

**Motherboard:**
```
Base Memory: 2048 MB (don't exceed host RAM)
Boot Order: Optical, Hard Disk, Network
Chipset: ICH9 (newer, better)
Pointing Device: PS/2 Mouse or USB Tablet
Enable I/O APIC: ✓ (required for 64-bit, multi-CPU)
Hardware Clock in UTC Time: ✓ (for Linux)
```

**Processor:**
```
CPUs: 2 (don't exceed physical cores)
Execution Cap: 100%
Enable PAE/NX: ✓
Enable VT-x/AMD-V: ✓
Enable Nested Paging: ✓
```

**Acceleration:**
```
Paravirtualization: Default or KVM
Enable Nested VT-x/AMD-V: □ (only if needed)
```

### Display Settings

```
Video Memory: 128 MB (max for best performance)
Monitor Count: 1 (or more for multi-monitor)
Scale Factor: 100%
Graphics Controller: VMSVGA (best for Linux/Windows)
3D Acceleration: ✓ (if needed for graphics-intensive apps)
2D Video Acceleration: □ (rarely needed)
```

**Recommended graphics controllers:**
- **Linux**: VMSVGA
- **Windows**: VBoxSVGA or VMSVGA
- **macOS**: VBoxSVGA

### Storage Settings

**Controller types:**
- **SATA (AHCI)**: Modern, recommended for most OSes
- **IDE**: Legacy, for old OSes
- **NVMe**: Fastest, requires Extension Pack
- **SCSI**: For special use cases

**Disk settings:**
```
Type: VDI (VirtualBox Disk Image)
Size: Dynamically allocated (grows as needed)
Limit: 25GB for Linux, 50GB for Windows

Advanced:
□ Solid-state Drive (check if host uses SSD)
✓ Hot-pluggable (allows attach/detach while running)
```

### Audio Settings

```
Enable Audio: ✓
Host Audio Driver: (Auto-detect)
Audio Controller: Intel HD Audio (modern)
Extended Features:
  ✓ Enable Audio Output
  ✓ Enable Audio Input (if needed)
```

### Network Settings

**Adapter 1:**
```
Enable Network Adapter: ✓
Attached to: NAT
Adapter Type: Intel PRO/1000 MT Desktop (or Paravirtualized)
Promiscuous Mode: Deny
MAC Address: (auto-generated)
Cable Connected: ✓
```

See [Networking](#networking) section for detailed configuration.

---

## Guest Additions

**Guest Additions** are drivers and utilities that enhance VM performance and usability.

### Features

✅ **Better video support** (higher resolutions, 3D acceleration)  
✅ **Seamless mouse integration** (no manual capture/release)  
✅ **Shared folders** (access host directories)  
✅ **Shared clipboard** (copy/paste between host/guest)  
✅ **Time synchronization**  
✅ **Better performance** (paravirtualized drivers)  

### Installation

#### Linux Guest

```bash
# Start VM
# Menu → Devices → Insert Guest Additions CD image

# Mount CD
sudo mkdir -p /mnt/cdrom
sudo mount /dev/cdrom /mnt/cdrom

# Install dependencies (Ubuntu/Debian)
sudo apt update
sudo apt install build-essential dkms linux-headers-$(uname -r)

# Run installer
cd /mnt/cdrom
sudo ./VBoxLinuxAdditions.run

# Reboot
sudo reboot
```

**Add user to vboxsf group (for shared folders):**
```bash
sudo usermod -aG vboxsf $USER
# Log out and back in
```

#### Windows Guest

```
1. Start Windows VM
2. Devices → Insert Guest Additions CD image
3. Open Windows Explorer → CD Drive
4. Run VBoxWindowsAdditions.exe
5. Follow installation wizard
6. Reboot
```

#### macOS Guest

macOS virtualization requires special setup (not officially supported):
```
Guest Additions not available for macOS.
Use VMware Fusion or Parallels for macOS guests.
```

### Verify Installation

**Linux:**
```bash
# Check version
VBoxControl --version

# Check services
lsmod | grep vbox
```

**Windows:**
```powershell
# Check in Programs and Features
# VirtualBox Guest Additions x.x.x
```

---

## Networking

### Network Modes Explained

#### 1. NAT (Default)

**Use case**: Internet access, isolated from host network

```
Internet
   ↓
Host (192.168.1.10)
   ↓ NAT
VM (10.0.2.15)  ← Internal IP, not accessible from outside
```

**Configuration:**
```bash
VBoxManage modifyvm "MyVM" --nic1 nat
```

**Access VM services (port forwarding):**
```bash
# Forward host:8080 → VM:80 (web server)
VBoxManage modifyvm "MyVM" --natpf1 "web,tcp,,8080,,80"

# Forward host:2222 → VM:22 (SSH)
VBoxManage modifyvm "MyVM" --natpf1 "ssh,tcp,,2222,,22"

# Access: http://localhost:8080 or ssh -p 2222 user@localhost
```

#### 2. NAT Network

**Use case**: Multiple VMs need to communicate + internet access

```
Internet
   ↓
Host
   ↓ NAT Network
VM1 (10.0.2.4) ←→ VM2 (10.0.2.5)
```

**Setup:**
```bash
# Create NAT network
VBoxManage natnetwork add --netname mynatnet --network "192.168.100.0/24" --enable

# Assign VMs
VBoxManage modifyvm "VM1" --nic1 natnetwork --nat-network1 "mynatnet"
VBoxManage modifyvm "VM2" --nic1 natnetwork --nat-network1 "mynatnet"
```

#### 3. Bridged Adapter

**Use case**: VM appears as physical device on network

```
Router (192.168.1.1)
   ├── Host (192.168.1.10)
   └── VM (192.168.1.11)  ← Gets IP from router
```

**Configuration:**
```bash
VBoxManage modifyvm "MyVM" --nic1 bridged --bridgeadapter1 "eth0"
# Replace eth0 with your network interface (wlan0, enp0s3, etc.)
```

**Get IP in VM:**
```bash
# VM will get IP via DHCP from router
ip addr show  # Linux
ipconfig  # Windows
```

#### 4. Host-Only Network

**Use case**: Private network between host and VMs

```
Host (192.168.56.1)
   ├── VM1 (192.168.56.101)
   └── VM2 (192.168.56.102)
(No internet access)
```

**Setup:**
```bash
# Create host-only network (GUI: File → Host Network Manager → Create)
VBoxManage hostonlyif create

# Configure VM
VBoxManage modifyvm "MyVM" --nic1 hostonly --hostonlyadapter1 "vboxnet0"
```

**Use case example:**
```bash
# VM1: Web server
# VM2: Database
# Host can access both, VMs can talk to each other
```

#### 5. Internal Network

**Use case**: VMs communicate only with each other

```
VM1 ←→ VM2 ←→ VM3
(Completely isolated, no host, no internet)
```

**Configuration:**
```bash
VBoxManage modifyvm "VM1" --nic1 intnet --intnet1 "internal_net"
VBoxManage modifyvm "VM2" --nic1 intnet --intnet1 "internal_net"
```

### Multiple Network Adapters

VMs can have up to 8 network adapters:

```bash
# Adapter 1: NAT (internet)
VBoxManage modifyvm "MyVM" --nic1 nat

# Adapter 2: Host-only (management)
VBoxManage modifyvm "MyVM" --nic2 hostonly --hostonlyadapter2 "vboxnet0"

# Adapter 3: Internal (private network)
VBoxManage modifyvm "MyVM" --nic3 intnet --intnet3 "private_net"
```

**Use case: Multi-tier application:**
```
VM1 (Web server):
  - Adapter 1: NAT (internet access)
  - Adapter 2: Internal (connects to app server)

VM2 (App server):
  - Adapter 1: Internal (connects to web + database)

VM3 (Database):
  - Adapter 1: Internal (isolated, only app server access)
```

---

## Shared Folders

Access host directories from guest VM.

### Setup Shared Folder

**GUI Method:**
```
1. VM Settings → Shared Folders
2. Click "+" icon
3. Folder Path: /path/on/host (e.g., C:\Users\YourName\Documents)
4. Folder Name: shared (this is the name VM sees)
5. Options:
   ☑ Auto-mount
   ☑ Make Permanent
6. Click OK
```

**CLI Method:**
```bash
VBoxManage sharedfolder add "MyVM" \
  --name "shared" \
  --hostpath "/path/on/host" \
  --automount
```

### Access from Guest

**Linux:**
```bash
# Manual mount
sudo mkdir /mnt/shared
sudo mount -t vboxsf shared /mnt/shared

# Auto-mount (with Guest Additions)
# Folder appears in /media/sf_shared

# Add user to vboxsf group
sudo usermod -aG vboxsf $USER
# Log out and back in

# Access
cd /media/sf_shared
```

**Windows:**
```powershell
# With Guest Additions, appears as network drive
# Z:\ (or next available letter)

# Or map manually
net use Z: \\vboxsvr\shared
```

### Permanent Mount (Linux)

Add to `/etc/fstab`:
```bash
shared    /mnt/shared    vboxsf    defaults    0    0
```

---

## Snapshots & Clones

### Snapshots

**Snapshot** = Freeze current VM state (disk, memory, settings)

**Use cases:**
- Before system updates
- Before installing software
- Before testing changes
- Creating restore points

**Create snapshot:**
```bash
# GUI: Machine → Take Snapshot

# CLI
VBoxManage snapshot "MyVM" take "Snapshot Name" \
  --description "Before upgrading to Ubuntu 24.04"
```

**Restore snapshot:**
```bash
# GUI: Machine → Snapshots → Select → Restore

# CLI
VBoxManage snapshot "MyVM" restore "Snapshot Name"
```

**Delete snapshot:**
```bash
VBoxManage snapshot "MyVM" delete "Snapshot Name"
```

**List snapshots:**
```bash
VBoxManage snapshot "MyVM" list
```

**Snapshot tree:**
```
Base Image
├── Snapshot 1: "Clean Install"
│   └── Snapshot 2: "With Updates"
│       └── Snapshot 3: "Development Setup"
└── Snapshot 4: "Testing Branch"
```

### Clones

**Clone** = Complete copy of VM

**Types:**
- **Full clone**: Independent, uses more disk space
- **Linked clone**: Shares disk with original, saves space

**Create clone:**
```bash
# Full clone
VBoxManage clonevm "OriginalVM" \
  --name "ClonedVM" \
  --register

# Linked clone (requires snapshot)
VBoxManage clonevm "OriginalVM" \
  --snapshot "SnapshotName" \
  --name "LinkedClone" \
  --options link \
  --register
```

**Use cases:**
```
Base VM: Ubuntu with all tools installed
├── Clone 1: Development environment
├── Clone 2: Testing environment
└── Clone 3: Production replica
```

---

## VBoxManage CLI

**VBoxManage** is the powerful CLI for automating VirtualBox.

### Common Commands

#### List VMs and Info

```bash
# List all VMs
VBoxManage list vms

# List running VMs
VBoxManage list runningvms

# Show VM info
VBoxManage showvminfo "MyVM"

# List OS types
VBoxManage list ostypes

# List host info
VBoxManage list hostinfo
```

#### VM Control

```bash
# Start VM (with GUI)
VBoxManage startvm "MyVM"

# Start headless (no GUI)
VBoxManage startvm "MyVM" --type headless

# Pause VM
VBoxManage controlvm "MyVM" pause

# Resume VM
VBoxManage controlvm "MyVM" resume

# Save state (hibernate)
VBoxManage controlvm "MyVM" savestate

# Power off (hard shutdown)
VBoxManage controlvm "MyVM" poweroff

# Send ACPI shutdown (graceful)
VBoxManage controlvm "MyVM" acpipowerbutton

# Reset (reboot)
VBoxManage controlvm "MyVM" reset
```

#### Modify VM Settings

```bash
# Change RAM
VBoxManage modifyvm "MyVM" --memory 4096

# Change CPUs
VBoxManage modifyvm "MyVM" --cpus 4

# Change video RAM
VBoxManage modifyvm "MyVM" --vram 128

# Enable 3D acceleration
VBoxManage modifyvm "MyVM" --accelerate3d on

# Change network
VBoxManage modifyvm "MyVM" --nic1 bridged --bridgeadapter1 eth0

# Change boot order
VBoxManage modifyvm "MyVM" --boot1 dvd --boot2 disk --boot3 none
```

#### Disk Management

```bash
# List hard disks
VBoxManage list hdds

# Create disk
VBoxManage createmedium disk \
  --filename "/path/to/disk.vdi" \
  --size 25600 \
  --format VDI

# Resize disk
VBoxManage modifymedium disk "/path/to/disk.vdi" --resize 51200

# Compact disk (reclaim space)
VBoxManage modifymedium disk "/path/to/disk.vdi" --compact

# Clone disk
VBoxManage clonemedium disk \
  "/path/to/source.vdi" \
  "/path/to/destination.vdi"

# Delete disk
VBoxManage closemedium disk "/path/to/disk.vdi" --delete
```

#### Advanced Control

```bash
# Screenshot
VBoxManage controlvm "MyVM" screenshotpng screenshot.png

# Change clipboard mode
VBoxManage controlvm "MyVM" clipboard mode bidirectional

# Insert DVD
VBoxManage storageattach "MyVM" \
  --storagectl "IDE" \
  --port 0 --device 0 \
  --type dvddrive \
  --medium /path/to/image.iso

# Eject DVD
VBoxManage storageattach "MyVM" \
  --storagectl "IDE" \
  --port 0 --device 0 \
  --type dvddrive \
  --medium none
```

### Automation Scripts

**Batch create VMs:**
```bash
#!/bin/bash
for i in {1..5}; do
    VBoxManage createvm --name "WebServer-$i" --ostype "Ubuntu_64" --register
    VBoxManage modifyvm "WebServer-$i" --memory 2048 --cpus 2
    VBoxManage createmedium disk --filename "WebServer-$i.vdi" --size 25600
    VBoxManage storagectl "WebServer-$i" --name "SATA" --add sata
    VBoxManage storageattach "WebServer-$i" --storagectl "SATA" --port 0 --device 0 --type hdd --medium "WebServer-$i.vdi"
done
```

**Start all VMs:**
```bash
#!/bin/bash
for vm in $(VBoxManage list vms | cut -d '"' -f2); do
    echo "Starting $vm..."
    VBoxManage startvm "$vm" --type headless
done
```

---

## Headless Mode

Run VMs without GUI (servers, automation).

### Start Headless

```bash
VBoxManage startvm "MyVM" --type headless
```

### Remote Access

#### SSH (Linux/macOS guests)

```bash
# Set up port forwarding
VBoxManage modifyvm "MyVM" --natpf1 "ssh,tcp,,2222,,22"

# Start VM
VBoxManage startvm "MyVM" --type headless

# Connect via SSH
ssh -p 2222 user@localhost
```

#### RDP (Remote Desktop)

Requires Extension Pack.

```bash
# Enable VRDP server
VBoxManage modifyvm "MyVM" --vrde on --vrdeport 3389

# Start VM
VBoxManage startvm "MyVM" --type headless

# Connect with RDP client
# Windows: mstsc /v:localhost:3389
# Linux: rdesktop localhost:3389
```

### Systemd Service (Linux)

Auto-start VMs on boot:

```bash
# Create service file
sudo nano /etc/systemd/system/vbox-vm@.service
```

```ini
[Unit]
Description=VirtualBox VM %i
After=network.target vboxdrv.service
Before=runlevel2.target shutdown.target

[Service]
User=yourusername
Group=vboxusers
ExecStart=/usr/bin/VBoxManage startvm "%i" --type headless
ExecStop=/usr/bin/VBoxManage controlvm "%i" savestate
RemainAfterExit=yes
Type=oneshot

[Install]
WantedBy=multi-user.target
```

```bash
# Enable service
sudo systemctl enable vbox-vm@MyVM.service

# Start VM
sudo systemctl start vbox-vm@MyVM.service

# Check status
sudo systemctl status vbox-vm@MyVM.service
```

---

## Vagrant Integration

**Vagrant** automates VM creation and provisioning.

### Install Vagrant

```bash
# Ubuntu/Debian
sudo apt install vagrant

# macOS
brew install vagrant

# Windows
choco install vagrant
```

### Basic Vagrantfile

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.vm.network "private_network", ip: "192.168.56.10"
  
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end
  
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nginx
  SHELL
end
```

### Vagrant Commands

```bash
# Initialize Vagrant
vagrant init ubuntu/jammy64

# Start VM
vagrant up

# SSH into VM
vagrant ssh

# Stop VM
vagrant halt

# Destroy VM
vagrant destroy

# Reload (restart with new config)
vagrant reload
```

---

## Performance Tuning

### CPU Optimization

✅ **Enable VT-x/AMD-V in BIOS**  
✅ **Don't overcommit CPUs** (use ≤ physical cores)  
✅ **Enable PAE/NX**  
✅ **Enable Nested Paging**  

```bash
VBoxManage modifyvm "MyVM" --cpus 2 --hwvirtex on --pae on --nestedpaging on
```

### Memory Optimization

```bash
# Allocate appropriate RAM (leave some for host)
VBoxManage modifyvm "MyVM" --memory 4096

# Enable page fusion (deduplicates RAM across VMs)
VBoxManage modifyvm "MyVM" --pagefusion on
```

### Disk Performance

✅ **Use SSD for VM storage**  
✅ **Use SATA or NVMe controllers** (not IDE)  
✅ **Enable SSD flag if host uses SSD**  
✅ **Use sparse (dynamically allocated) disks**  

```bash
# Enable SSD flag
VBoxManage storageattach "MyVM" --storagectl "SATA" --port 0 --device 0 --nonrotational on

# Use host I/O cache
VBoxManage storagectl "MyVM" --name "SATA" --hostiocache on
```

### Graphics Performance

```bash
# Max video RAM
VBoxManage modifyvm "MyVM" --vram 128

# VMSVGA graphics
VBoxManage modifyvm "MyVM" --graphicscontroller vmsvga

# 3D acceleration (if needed)
VBoxManage modifyvm "MyVM" --accelerate3d on
```

### Network Performance

```bash
# Use paravirtualized network adapter
VBoxManage modifyvm "MyVM" --nictype1 virtio
```

---

## Troubleshooting

### Common Issues

#### VT-x is not available

**Error**: "VT-x is disabled in the BIOS for all CPU modes"

**Solution:**
1. Reboot and enter BIOS
2. Enable Intel VT-x or AMD-V
3. Save and reboot

#### VM won't start

**Check:**
```bash
# Get detailed error
VBoxManage startvm "MyVM" --type headless

# Check VM configuration
VBoxManage showvminfo "MyVM"

# Verify disk exists
VBoxManage list hdds
```

#### Poor performance

**Fix:**
- Install Guest Additions
- Allocate more RAM/CPUs
- Enable hardware virtualization
- Use SSD storage
- Reduce video memory if not needed

#### Network not working

```bash
# Check network settings
VBoxManage showvminfo "MyVM" | grep NIC

# Reset network
VBoxManage modifyvm "MyVM" --nic1 nat
VBoxManage controlvm "MyVM" reset

# In guest, restart networking
sudo systemctl restart networking
```

#### Shared folder not accessible

```bash
# Guest Additions installed?
VBoxControl --version

# User in vboxsf group?
id | grep vboxsf

# Add user
sudo usermod -aG vboxsf $USER
# Log out and back in
```

---

## Advanced Features

### USB Passthrough

Requires Extension Pack.

```bash
# List USB devices
VBoxManage list usbhost

# Add USB filter
VBoxManage usbfilter add 0 \
  --target "MyVM" \
  --name "USB Drive" \
  --vendorid 0x1234 \
  --productid 0x5678
```

### PCI Passthrough

Direct hardware access (advanced).

```bash
# Attach PCI device to VM
VBoxManage modifyvm "MyVM" --pciattach 01:00.0

# Detach
VBoxManage modifyvm "MyVM" --pcidetach 01:00.0
```

### Disk Encryption

Requires Extension Pack.

```bash
# Encrypt disk
VBoxManage encryptmedium "disk.vdi" \
  --newpassword "password" \
  --cipher "AES-XTS256-PLAIN64"
```

---

## Best Practices

### VM Management

✅ **Name VMs descriptively** (`dev-ubuntu-22`, `test-windows-11`)  
✅ **Take snapshots before changes**  
✅ **Delete old snapshots** (they consume disk space)  
✅ **Use linked clones** for testing (saves space)  
✅ **Backup important VMs** (export as .ova)  

### Resource Allocation

✅ **Don't overcommit** (total VM RAM ≤ 75% host RAM)  
✅ **Leave 1-2 CPU cores for host**  
✅ **Use dynamic disks** (saves space)  
✅ **Monitor resource usage**  

### Security

✅ **Keep VirtualBox updated**  
✅ **Update guest OSes regularly**  
✅ **Use snapshots for risky operations**  
✅ **Limit network access** (host-only for malware analysis)  
✅ **Encrypt sensitive VMs**  

### Performance

✅ **Enable hardware virtualization**  
✅ **Install Guest Additions**  
✅ **Use paravirtualized drivers**  
✅ **Allocate sufficient video RAM**  
✅ **Use SSD storage if possible**  

---

## Resources

### Official Documentation
- [VirtualBox Manual](https://www.virtualbox.org/manual/)
- [VBoxManage Reference](https://www.virtualbox.org/manual/ch08.html)
- [VirtualBox Downloads](https://www.virtualbox.org/wiki/Downloads)
- [VirtualBox Forums](https://forums.virtualbox.org/)

### Tutorials
- [VirtualBox Beginner's Guide](https://www.virtualbox.org/manual/UserManual.html)
- [Vagrant with VirtualBox](https://developer.hashicorp.com/vagrant/docs/providers/virtualbox)

### Communities
- [r/virtualbox](https://www.reddit.com/r/virtualbox/)
- [Stack Overflow - virtualbox tag](https://stackoverflow.com/questions/tagged/virtualbox)

### Tools
- [Vagrant](https://www.vagrantup.com/) - Automation
- [Packer](https://www.packer.io/) - Image building
- [Vagrant Cloud](https://app.vagrantup.com/boxes/search) - Pre-built boxes

---

**Back to**: [Virtualization Main Guide](Virtualization.md)
