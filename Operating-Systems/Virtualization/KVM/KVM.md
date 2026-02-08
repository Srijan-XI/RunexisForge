# KVM (Kernel-based Virtual Machine) — Comprehensive Guide

KVM (Kernel-based Virtual Machine) is a full virtualization solution for Linux built into the mainline Linux kernel. It transforms Linux into a Type-1 (bare-metal) hypervisor, offering near-native performance for virtual machines.

## Table of Contents

- [What is KVM?](#what-is-kvm)
- [Architecture](#architecture)
- [Installation](#installation)
- [VM Management](#vm-management)
- [Networking](#networking)
- [Storage](#storage)
- [Performance Optimization](#performance-optimization)
- [Security](#security)
- [Automation & Orchestration](#automation--orchestration)
- [Management Tools](#management-tools)
- [Backup & Snapshots](#backup--snapshots)
- [Migration](#migration)
- [Real-World Use Cases](#real-world-use-cases)
- [Troubleshooting](#troubleshooting)

---

## What is KVM?

### Key Features

- **Native Linux Integration**: Part of the Linux kernel since 2.6.20 (2007)
- **Hardware-Assisted Virtualization**: Requires Intel VT-x or AMD-V
- **Type-1 Hypervisor**: Runs directly on hardware when kernel is loaded
- **Performance**: Near-native performance for virtualized workloads
- **Open Source**: GPL licensed, no vendor lock-in
- **Wide Support**: Supported by Red Hat, SUSE, Ubuntu, and more

### KVM vs. Other Hypervisors

| Feature | KVM | VMware ESXi | Hyper-V | Xen |
|---------|-----|-------------|---------|-----|
| **License** | Open Source (GPL) | Commercial | Commercial/Free | Open Source |
| **Platform** | Linux | Proprietary | Windows | Linux |
| **Performance** | Excellent | Excellent | Very Good | Excellent |
| **Cost** | Free | $$$$ | $$$ (Server license) | Free |
| **Management** | Multiple options | vCenter | SCVMM | XenCenter |
| **Best For** | Linux environments, cloud | Enterprise | Microsoft shops | Cloud, specialized |

---

## Architecture

### Components

```
┌─────────────────────────────────────────────┐
│         Virtual Machines (Guests)           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │   VM 1   │  │   VM 2   │  │   VM 3   │ │
│  │ (QEMU)   │  │ (QEMU)   │  │ (QEMU)   │ │
│  └──────────┘  └──────────┘  └──────────┘ │
└─────────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────────┐
│             KVM Kernel Module                │
│  (/dev/kvm - virtualization interface)      │
└─────────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────────┐
│              Linux Kernel                    │
│  (Host OS - RHEL, Ubuntu, etc.)             │
└─────────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────────┐
│          Physical Hardware                   │
│  (CPU with VT-x/AMD-V, RAM, Storage, NIC)  │
└─────────────────────────────────────────────┘
```

### Key Components Explained

1. **KVM Module** (`kvm.ko`)
   - Kernel module providing virtualization infrastructure
   - Exposes `/dev/kvm` interface
   - Manages CPU and memory virtualization

2. **QEMU (Quick EMUlator)**
   - User-space process for each VM
   - Provides device emulation (disk, network, graphics)
   - Works with KVM for hardware acceleration

3. **libvirt**
   - Virtualization API and management library
   - Provides abstraction layer
   - Tools: virsh, virt-manager, virt-install

4. **virtio**
   - Paravirtualized device drivers
   - High-performance I/O (network, disk, balloon, etc.)
   - Guest OS cooperation for better performance

---

## Installation

### Check Hardware Support

```bash
# Check for CPU virtualization support
egrep -c '(vmx|svm)' /proc/cpuinfo
# Output > 0 means supported

# Check specific flags
lscpu | grep Virtualization
# Intel: VT-x
# AMD: AMD-V

# Verify KVM module can be loaded
sudo modprobe kvm
lsmod | grep kvm

# Check /dev/kvm exists after loading
ls -l /dev/kvm
```

### Install on Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install KVM and dependencies
sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager

# Install additional tools
sudo apt install -y virtinst virt-viewer

# Add user to libvirt and kvm groups
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER

# Enable and start libvirtd
sudo systemctl enable libvirtd
sudo systemctl start libvirtd

# Verify installation
sudo systemctl status libvirtd
virsh list --all

# Reboot or re-login for group changes
```

### Install on RHEL/CentOS/Rocky/AlmaLinux

```bash
# Install KVM packages
sudo dnf install -y qemu-kvm libvirt virt-install virt-manager virt-viewer

# On RHEL 8/9, install module
sudo dnf module install virt

# Start and enable libvirtd
sudo systemctl start libvirtd
sudo systemctl enable libvirtd

# Add user to libvirt group
sudo usermod -aG libvirt $USER

# Verify
sudo systemctl status libvirtd
virsh list --all
```

### Install on Arch Linux

```bash
# Install KVM and tools
sudo pacman -S qemu-full libvirt virt-manager virt-viewer dnsmasq bridge-utils

# Enable and start libvirtd
sudo systemctl enable libvirtd.service
sudo systemctl start libvirtd.service

# Add user to libvirt group
sudo usermod -aG libvirt $USER
```

### Verify Installation

```bash
# Check KVM module
lsmod | grep kvm
# Should show: kvm_intel or kvm_amd

# Verify KVM acceleration
sudo virt-host-validate
# Should show PASS for KVM and QEMU checks

# Check libvirt connection
virsh uri
# Should show: qemu:///system

# List default network
virsh net-list --all
```

---

## VM Management

### Creating VMs with virt-install

**Basic VM Creation**:

```bash
# Download ISO (example: Ubuntu)
wget https://releases.ubuntu.com/22.04/ubuntu-22.04.3-live-server-amd64.iso

# Create VM
virt-install \
  --name ubuntu-vm \
  --ram 2048 \
  --vcpus 2 \
  --disk path=/var/lib/libvirt/images/ubuntu-vm.qcow2,size=20 \
  --os-variant ubuntu22.04 \
  --network bridge=virbr0 \
  --graphics vnc,listen=0.0.0.0 \
  --cdrom /path/to/ubuntu-22.04.3-live-server-amd64.iso \
  --noautoconsole

# Connect to VNC console
virt-viewer ubuntu-vm
```

**Advanced VM Creation**:

```bash
# Create VM with specific features
virt-install \
  --name production-vm \
  --ram 4096 \
  --vcpus 4 \
  --cpu host-passthrough \
  --disk path=/var/lib/libvirt/images/prod-vm.qcow2,size=50,format=qcow2,bus=virtio \
  --network bridge=br0,model=virtio \
  --os-variant rhel9.0 \
  --graphics spice,listen=0.0.0.0 \
  --video qxl \
  --channel spicevmc,target_type=virtio,name=com.redhat.spice.0 \
  --location /path/to/rhel-9.0-x86_64-dvd.iso \
  --extra-args "console=tty0 console=ttyS0,115200n8" \
  --initrd-inject=/path/to/kickstart.cfg \
  --extra-args "inst.ks=file:/kickstart.cfg"
```

**Unattended Installation**:

```bash
# Using cloud-init image
wget https://cloud-images.ubuntu.com/releases/22.04/release/ubuntu-22.04-server-cloudimg-amd64.img

# Resize image
qemu-img resize ubuntu-22.04-server-cloudimg-amd64.img 20G

# Create cloud-init config
cat > user-data <<EOF
#cloud-config
hostname: my-vm
fqdn: my-vm.example.com
manage_etc_hosts: true
users:
  - name: ubuntu
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: users, admin
    home: /home/ubuntu
    shell: /bin/bash
    ssh_authorized_keys:
      - ssh-rsa AAAAB3... user@host
ssh_pwauth: false
disable_root: true
package_update: true
package_upgrade: true
packages:
  - qemu-guest-agent
EOF

cat > meta-data <<EOF
instance-id: my-vm-001
local-hostname: my-vm
EOF

# Create cloud-init ISO
genisoimage -output cloud-init.iso -volid cidata -joliet -rock user-data meta-data

# Create VM with cloud-init
virt-install \
  --name my-vm \
  --ram 2048 \
  --vcpus 2 \
  --disk path=ubuntu-22.04-server-cloudimg-amd64.img,device=disk,bus=virtio \
  --disk path=cloud-init.iso,device=cdrom \
  --os-variant ubuntu22.04 \
  --network bridge=virbr0,model=virtio \
  --graphics spice \
  --import \
  --noautoconsole
```

### VM Management with virsh

**Power Management**:

```bash
# List all VMs
virsh list --all

# Start VM
virsh start vm-name

# Shutdown VM (graceful)
virsh shutdown vm-name

# Force power off
virsh destroy vm-name

# Restart VM
virsh reboot vm-name

# Autostart VM at boot
virsh autostart vm-name
virsh autostart --disable vm-name

# Suspend/Resume VM
virsh suspend vm-name
virsh resume vm-name

# Save VM state to disk
virsh save vm-name /path/to/save-file
virsh restore /path/to/save-file
```

**VM Information**:

```bash
# VM details
virsh dominfo vm-name

# Show VM XML configuration
virsh dumpxml vm-name

# Show VNC/SPICE display info
virsh vncdisplay vm-name
virsh domdisplay vm-name

# CPU statistics
virsh vcpuinfo vm-name

# Memory statistics
virsh domstats vm-name

# Disk information
virsh domblklist vm-name
```

**VM Modification**:

```bash
# Edit VM configuration (opens in editor)
virsh edit vm-name

# Change RAM (requires VM shutdown)
virsh setmaxmem vm-name 4G --config
virsh setmem vm-name 4G --config

# Change vCPUs (some changes work live)
virsh setvcpus vm-name 4 --config --maximum
virsh setvcpus vm-name 2 --current

# Attach disk
virsh attach-disk vm-name \
  /var/lib/libvirt/images/new-disk.qcow2 vdb \
  --driver qemu --subdriver qcow2 --targetbus virtio --persistent

# Detach disk
virsh detach-disk vm-name vdb --persistent

# Attach network interface
virsh attach-interface vm-name \
  --type bridge --source br0 --model virtio --config

# Detach network interface
virsh detach-interface vm-name --type bridge --mac 52:54:00:xx:xx:xx --config
```

**VM Console Access**:

```bash
# Serial console (requires guest config)
virsh console vm-name

# Graphical console
virt-viewer vm-name
# Or
virt-manager
```

**VM Cloning**:

```bash
# Clone VM
virt-clone \
  --original source-vm \
  --name cloned-vm \
  --file /var/lib/libvirt/images/cloned-vm.qcow2

# Clone with auto-generated name
virt-clone --original source-vm --auto-clone
```

**VM Deletion**:

```bash
# Undefine VM (removes from libvirt, keeps disks)
virsh undefine vm-name

# Undefine and remove storage
virsh undefine vm-name --remove-all-storage

# Delete specific storage volume
virsh vol-delete vm-disk.qcow2 --pool default
```

---

## Networking

### Network Types

**1. NAT Network (Default)**:

```bash
# List networks
virsh net-list --all

# Default NAT network (virbr0)
virsh net-dumpxml default

# Network provides:
- NAT to outside world
- DHCP for VMs
- DNS resolution
- Isolated from host networks

# Start network
virsh net-start default
virsh net-autostart default

# View DHCP leases
virsh net-dhcp-leases default
```

**2. Bridge Network**:

Directly connects VMs to physical network.

```bash
# Install bridge-utils
sudo apt install bridge-utils  # Debian/Ubuntu
sudo dnf install bridge-utils  # RHEL/CentOS

# Create bridge using netplan (Ubuntu 18.04+)
sudo nano /etc/netplan/01-netcfg.yaml

network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: no
  bridges:
    br0:
      interfaces: [enp0s3]
      dhcp4: yes
      # Or static:
      # addresses: [192.168.1.100/24]
      # gateway4: 192.168.1.1
      # nameservers:
      #   addresses: [8.8.8.8, 8.8.4.4]

# Apply changes
sudo netplan apply

# Verify bridge
brctl show

# Create libvirt bridge network
cat > bridge-network.xml <<EOF
<network>
  <name>br0</name>
  <forward mode="bridge"/>
  <bridge name="br0"/>
</network>
EOF

virsh net-define bridge-network.xml
virsh net-start br0
virsh net-autostart br0

# Attach VM to bridge
virsh attach-interface vm-name \
  --type bridge --source br0 --model virtio --config
```

**3. Isolated Network**:

VMs can communicate with each other but not external networks.

```bash
# Create isolated network
cat > isolated-network.xml <<EOF
<network>
  <name>isolated</name>
  <ip address="192.168.100.1" netmask="255.255.255.0">
    <dhcp>
      <range start="192.168.100.100" end="192.168.100.200"/>
    </dhcp>
  </ip>
</network>
EOF

virsh net-define isolated-network.xml
virsh net-start isolated
virsh net-autostart isolated
```

**4. Routed Network**:

```bash
# Create routed network
cat > routed-network.xml <<EOF
<network>
  <name>routed</name>
  <forward mode="route" dev="eth0"/>
  <ip address="192.168.200.1" netmask="255.255.255.0">
    <dhcp>
      <range start="192.168.200.100" end="192.168.200.200"/>
    </dhcp>
  </ip>
</network>
EOF

virsh net-define routed-network.xml
virsh net-start routed
virsh net-autostart routed
```

### Network Management

```bash
# Network information
virsh net-info network-name

# Edit network configuration
virsh net-edit network-name

# Destroy network (stop)
virsh net-destroy network-name

# Undefine network (remove)
virsh net-undefine network-name

# Show network interfaces in VM
virsh domiflist vm-name

# Show network stats
virsh domifstat vm-name vnet0

# Static IP via DHCP reservation
virsh net-update default add ip-dhcp-host \
  "<host mac='52:54:00:xx:xx:xx' name='vm-name' ip='192.168.122.100'/>" \
  --live --config
```

### SR-IOV (Single Root I/O Virtualization)

High-performance network passthrough.

```bash
# Check SR-IOV support
lspci | grep Ethernet
# Check NIC datasheet for SR-IOV support

# Enable SR-IOV on NIC (example: Intel)
# Add to /etc/default/grub:
GRUB_CMDLINE_LINUX="intel_iommu=on iommu=pt"

# Update grub
sudo update-grub  # Debian/Ubuntu
sudo grub2-mkconfig -o /boot/grub2/grub.cfg  # RHEL

# Reboot
sudo reboot

# Create virtual functions
echo 4 > /sys/class/net/enp0s3/device/sriov_numvfs

# List VFs
lspci | grep Virtual

# Attach VF to VM
virsh nodedev-list --cap pci
virsh nodedev-dumpxml pci_0000_xx_xx_x

# Edit VM XML to attach VF
virsh edit vm-name
# Add:
<interface type='hostdev' managed='yes'>
  <source>
    <address type='pci' domain='0x0000' bus='0xXX' slot='0xXX' function='0xX'/>
  </source>
</interface>
```

---

## Storage

### Storage Pools

Storage pools are collections of storage volumes.

**Default Pool**:

```bash
# List storage pools
virsh pool-list --all

# Default pool location
/var/lib/libvirt/images/

# Pool information
virsh pool-info default

# List volumes in pool
virsh vol-list default
```

**Create Directory Pool**:

```bash
# Create directory
sudo mkdir -p /storage/vms

# Define pool
virsh pool-define-as \
  vm-storage dir - - - - "/storage/vms"

# Build pool
virsh pool-build vm-storage

# Start pool
virsh pool-start vm-storage

# Autostart pool
virsh pool-autostart vm-storage

# Verify
virsh pool-list --all
```

**Create LVM Pool**:

```bash
# Assuming LVM volume group exists (vg_kvm)
virsh pool-define-as \
  lvm-pool logical - - - - vg_kvm

# Start pool
virsh pool-start lvm-pool
virsh pool-autostart lvm-pool

# Create LVM volume for VM
virsh vol-create-as lvm-pool vm-disk 20G

# Attach to VM
virsh attach-disk vm-name \
  /dev/vg_kvm/vm-disk vdb \
  --driver qemu --subdriver raw --targetbus virtio --persistent
```

**Create NFS Pool**:

```bash
# Define NFS pool
virsh pool-define-as \
  nfs-pool netfs - - - - "nfs-server:/export/vms"

# Start pool
virsh pool-start nfs-pool
virsh pool-autostart nfs-pool
```

**Create iSCSI Pool**:

```bash
# Define iSCSI pool
virsh pool-define-as \
  iscsi-pool iscsi - - - iscsi.example.com iqn.2023-01.com.example:target

# Start pool
virsh pool-start iscsi-pool
virsh pool-autostart iscsi-pool
```

### Disk Image Formats

**qcow2 (QEMU Copy-On-Write 2)**:

```bash
# Create qcow2 disk
qemu-img create -f qcow2 /var/lib/libvirt/images/disk.qcow2 20G

# Thin provisioning by default
# Actual space used grows as needed

# Create with backing file (linked clone)
qemu-img create -f qcow2 -b base-image.qcow2 -F qcow2 clone.qcow2

# Information
qemu-img info disk.qcow2

# Resize
qemu-img resize disk.qcow2 +10G

# Convert format
qemu-img convert -f raw -O qcow2 source.img dest.qcow2

# Compression
qemu-img convert -O qcow2 -c source.qcow2 compressed.qcow2

# Check disk for errors
qemu-img check disk.qcow2

# Repair disk
qemu-img check -r all disk.qcow2
```

**Raw Format**:

```bash
# Create raw disk
qemu-img create -f raw disk.img 20G
# Or
dd if=/dev/zero of=disk.img bs=1G count=20

# Preallocate space (better performance)
fallocate -l 20G disk.img

# Advantages:
- Better performance
- Simpler format
- Direct I/O capable

# Disadvantages:
- No thin provisioning
- No snapshots (internal)
- Larger size
```

**LVM (Logical Volume Manager)**:

```bash
# Create LV for VM disk
sudo lvcreate -L 20G -n vm-disk vg_kvm

# Use in VM
virt-install ... --disk path=/dev/vg_kvm/vm-disk,bus=virtio ...

# Advantages:
- Fast snapshots (LVM snapshots)
- Thin provisioning (LVM thin pools)
- Flexible resizing
- Better performance than qcow2

# Resize LV
sudo lvresize -L +10G /dev/vg_kvm/vm-disk
# Then resize filesystem inside VM
```

### Storage Management

```bash
# Create volume
virsh vol-create-as default vm-disk.qcow2 20G --format qcow2

# Clone volume
virsh vol-clone --pool default source-disk.qcow2 clone-disk.qcow2

# Delete volume
virsh vol-delete vm-disk.qcow2 --pool default

# Volume information
virsh vol-info vm-disk.qcow2 --pool default

# Resize volume
virsh vol-resize vm-disk.qcow2 30G --pool default

# Upload/download volumes
virsh vol-upload vm-disk.qcow2 /path/to/local-file --pool default
virsh vol-download vm-disk.qcow2 /path/to/save-file --pool default
```

### Thin Provisioning

```bash
# Create LVM thin pool
sudo lvcreate -L 100G -T vg_kvm/thin_pool

# Create thin LV
sudo lvcreate -V 20G -T vg_kvm/thin_pool -n vm-disk-thin

# Monitor thin pool usage
sudo lvs -a
```

---

## Performance Optimization

### CPU Optimization

**CPU Pinning**:

```bash
# Pin vCPUs to specific physical CPUs
virsh vcpupin vm-name 0 0-3
virsh vcpupin vm-name 1 4-7

# Show current pinning
virsh vcpupin vm-name

# Persistent pinning (edit XML)
virsh edit vm-name
# Add in <vcpu> section:
<vcpu placement='static' cpuset='0-7'>4</vcpu>
<cputune>
  <vcpupin vcpu='0' cpuset='0-1'/>
  <vcpupin vcpu='1' cpuset='2-3'/>
  <vcpupin vcpu='2' cpuset='4-5'/>
  <vcpupin vcpu='3' cpuset='6-7'/>
</cputune>
```

**CPU Models**:

```bash
# Host CPU passthrough (best performance)
virsh edit vm-name
<cpu mode='host-passthrough' check='none'/>

# Host model (compatibility + performance)
<cpu mode='host-model' check='partial'/>

# Specific CPU model
<cpu mode='custom' match='exact' check='full'>
  <model fallback='forbid'>Skylake-Client</model>
</cpu>

# List available CPU models
virsh cpu-models x86_64
```

**NUMA (Non-Uniform Memory Access)**:

```bash
# Check host NUMA topology
numactl --hardware

# Configure VM NUMA
virsh edit vm-name
<cpu>
  <numa>
    <cell id='0' cpus='0-3' memory='4194304' unit='KiB'/>
    <cell id='1' cpus='4-7' memory='4194304' unit='KiB'/>
  </numa>
</cpu>

# Pin VM NUMA nodes to host NUMA nodes
<numatune>
  <memory mode='strict' nodeset='0-1'/>
  <memnode cellid='0' mode='strict' nodeset='0'/>
  <memnode cellid='1' mode='strict' nodeset='1'/>
</numatune>
```

### Memory Optimization

**Huge Pages**:

```bash
# Enable huge pages on host
# Add to /etc/default/grub:
GRUB_CMDLINE_LINUX="default_hugepagesz=1G hugepagesz=1G hugepages=16"

# Update grub and reboot
sudo update-grub && sudo reboot

# Verify huge pages
cat /proc/meminfo | grep Huge

# Configure VM to use huge pages
virsh edit vm-name
<memoryBacking>
  <hugepages/>
</memoryBacking>

# Or specific page size
<memoryBacking>
  <hugepages>
    <page size='1' unit='G'/>
  </hugepages>
</memoryBacking>
```

**Memory Ballooning**:

```bash
# Enabled by default with virtio-balloon
# Allows dynamic memory adjustment

# Check balloon device
virsh dumpxml vm-name | grep balloon

# Set current memory (VM must have balloon driver)
virsh setmem vm-name 2G --current

# View memory statistics
virsh dommemstat vm-name
```

**Kernel Same-page Merging (KSM)**:

```bash
# Enable KSM on host
echo 1 > /sys/kernel/mm/ksm/run

# Tune KSM
echo 1000 > /sys/kernel/mm/ksm/pages_to_scan
echo 20 > /sys/kernel/mm/ksm/sleep_millisecs

# Check KSM statistics
cat /sys/kernel/mm/ksm/pages_sharing
cat /sys/kernel/mm/ksm/pages_shared

# Make persistent (systemd service)
sudo systemctl enable ksm
sudo systemctl start ksm
```

### Storage Optimization

**virtio-blk vs virtio-scsi**:

```bash
# virtio-blk (better performance, limited features)
<disk type='file' device='disk'>
  <driver name='qemu' type='qcow2' cache='none' io='native'/>
  <source file='/var/lib/libvirt/images/disk.qcow2'/>
  <target dev='vda' bus='virtio'/>
</disk>

# virtio-scsi (more features, TRIM support)
<disk type='file' device='disk'>
  <driver name='qemu' type='qcow2' cache='none' io='native' discard='unmap'/>
  <source file='/var/lib/libvirt/images/disk.qcow2'/>
  <target dev='sda' bus='scsi'/>
</disk>
<controller type='scsi' model='virtio-scsi'/>
```

**Cache Modes**:

```bash
# none - No caching, best for production (safest)
cache='none'

# writethrough - Host cache for reads only
cache='writethrough'

# writeback - Host cache for reads and writes (fastest, less safe)
cache='writeback'

# directsync - Like none but with O_DIRECT
cache='directsync'
```

**I/O Tuning**:

```bash
# Set disk I/O limits
virsh blkdeviotune vm-name vda \
  --total-bytes-sec 104857600 \  # 100 MB/s
  --total-iops-sec 1000

# View current limits
virsh blkdeviotune vm-name vda

# I/O thread configuration
virsh edit vm-name
<domain>
  <iothreads>4</iothreads>
  ...
  <disk>
    <driver iothread='1'/>
    ...
  </disk>
</domain>
```

### Network Optimization

**virtio Network**:

```bash
# Use virtio for best performance
virsh edit vm-name
<interface type='bridge'>
  <source bridge='br0'/>
  <model type='virtio'/>
  <driver name='vhost'/>
</interface>

# Multi-queue virtio-net
<interface type='bridge'>
  <source bridge='br0'/>
  <model type='virtio'/>
  <driver name='vhost' queues='4'/>
</interface>
```

**vhost-net**:

```bash
# Ensure vhost-net module is loaded
sudo modprobe vhost-net
lsmod | grep vhost

# Make persistent
echo "vhost-net" | sudo tee -a /etc/modules
```

---

## Security

### SELinux/AppArmor

**SELinux (RHEL/CentOS)**:

```bash
# Check SELinux status
sestatus

# Set correct context for VM images
sudo chcon -t virt_image_t /path/to/vm-disk.qcow2

# Or move to default directory with correct context
sudo mv disk.qcow2 /var/lib/libvirt/images/

# Restore contexts
sudo restorecon -R /var/lib/libvirt/images/

# SELinux booleans for libvirt
getsebool -a | grep virt

# Allow certain operations
sudo setsebool -P virt_use_nfs on
sudo setsebool -P virt_use_samba on
```

**AppArmor (Ubuntu/Debian)**:

```bash
# Check AppArmor status
sudo aa-status

# Libvirt AppArmor profiles
/etc/apparmor.d/libvirt/

# Edit VM-specific profile
sudo nano /etc/apparmor.d/libvirt/libvirt-<vm-uuid>

# Reload AppArmor profiles
sudo systemctl reload apparmor
```

### SecureBoot & TPM

**SecureBoot**:

```bash
# Install OVMF (UEFI firmware)
sudo apt install ovmf  # Debian/Ubuntu
sudo dnf install edk2-ovmf  # RHEL/CentOS

# Configure VM for SecureBoot
virsh edit vm-name
<os>
  <type arch='x86_64' machine='q35'>hvm</type>
  <loader readonly='yes' secure='yes' type='pflash'>/usr/share/OVMF/OVMF_CODE.secboot.fd</loader>
  <nvram template='/usr/share/OVMF/OVMF_VARS.secboot.fd'>/var/lib/libvirt/qemu/nvram/vm-name_VARS.fd</nvram>
  <boot dev='hd'/>
</os>
```

**Virtual TPM 2.0**:

```bash
# Install swtpm
sudo apt install swtpm swtpm-tools  # Ubuntu
sudo dnf install swtpm swtpm-tools  # RHEL

# Add TPM to VM
virsh edit vm-name
<devices>
  <tpm model='tpm-tis'>
    <backend type='emulator' version='2.0'/>
  </tpm>
</devices>
```

### Encryption

**Disk Encryption**:

```bash
# Create secret for LUKS
cat > secret.xml <<EOF
<secret ephemeral='no' private='yes'>
  <description>Disk encryption secret</description>
  <usage type='volume'>
    <volume>/var/lib/libvirt/images/encrypted.qcow2</volume>
  </usage>
</secret>
EOF

virsh secret-define secret.xml
# Returns UUID

# Set secret value
virsh secret-set-value <UUID> "your-passphrase-here" --base64

# Create encrypted qcow2
qemu-img create --object secret,id=sec0,data=your-passphrase-here \
  -f qcow2 -o encrypt.format=luks,encrypt.key-secret=sec0 \
  encrypted.qcow2 20G

# Use in VM XML
<disk type='file' device='disk'>
  <driver name='qemu' type='qcow2'/>
  <source file='/var/lib/libvirt/images/encrypted.qcow2'/>
  <encryption format='luks'>
    <secret type='passphrase' uuid='<UUID>'/>
  </encryption>
  <target dev='vda' bus='virtio'/>
</disk>
```

### Firewall Configuration

```bash
# Allow libvirt bridge traffic (firewalld)
sudo firewall-cmd --permanent --zone=libvirt --add-service=libvirt
sudo firewall-cmd --permanent --zone=libvirt --add-interface=virbr0
sudo firewall-cmd --reload

# UFW (Ubuntu)
sudo ufw allow in on virbr0
sudo ufw allow out on virbr0
```

---

## Automation & Orchestration

### Terraform

```hcl
# main.tf
terraform {
  required_providers {
    libvirt = {
      source = "dmacvicar/libvirt"
      version = "0.7.1"
    }
  }
}

provider "libvirt" {
  uri = "qemu:///system"
}

resource "libvirt_volume" "ubuntu" {
  name   = "ubuntu.qcow2"
  pool   = "default"
  source = "https://cloud-images.ubuntu.com/releases/22.04/release/ubuntu-22.04-server-cloudimg-amd64.img"
  format = "qcow2"
}

resource "libvirt_volume" "ubuntu_resized" {
  name           = "ubuntu_resized.qcow2"
  base_volume_id = libvirt_volume.ubuntu.id
  pool           = "default"
  size           = 21474836480  # 20 GB
}

resource "libvirt_cloudinit_disk" "commoninit" {
  name      = "commoninit.iso"
  user_data = data.template_file.user_data.rendered
  pool      = "default"
}

data "template_file" "user_data" {
  template = file("${path.module}/cloud_init.cfg")
}

resource "libvirt_domain" "ubuntu_vm" {
  name   = "ubuntu-vm"
  memory = "2048"
  vcpu   = 2

  network_interface {
    network_name   = "default"
    wait_for_lease = true
  }

  disk {
    volume_id = libvirt_volume.ubuntu_resized.id
  }

  cloudinit = libvirt_cloudinit_disk.commoninit.id

  console {
    type        = "pty"
    target_type = "serial"
    target_port = "0"
  }

  graphics {
    type        = "spice"
    listen_type = "address"
    autoport    = true
  }
}

output "ip" {
  value = libvirt_domain.ubuntu_vm.network_interface[0].addresses[0]
}
```

### Ansible

```yaml
# playbook.yml
---
- name: Create KVM VM
  hosts: kvm_host
  become: yes
  tasks:
    - name: Install required packages
      apt:
        name:
          - libvirt-daemon-system
          - libvirt-clients
          - virtinst
          - python3-libvirt
        state: present

    - name: Download Ubuntu cloud image
      get_url:
        url: https://cloud-images.ubuntu.com/releases/22.04/release/ubuntu-22.04-server-cloudimg-amd64.img
        dest: /var/lib/libvirt/images/ubuntu-22.04-base.img

    - name: Create VM disk from base image
      command: >
        qemu-img create -f qcow2 -F qcow2
        -b /var/lib/libvirt/images/ubuntu-22.04-base.img
        /var/lib/libvirt/images/my-vm.qcow2 20G
      args:
        creates: /var/lib/libvirt/images/my-vm.qcow2

    - name: Create cloud-init ISO
      command: >
        genisoimage -output /var/lib/libvirt/images/my-vm-cloud-init.iso
        -volid cidata -joliet -rock /tmp/user-data /tmp/meta-data
      args:
        creates: /var/lib/libvirt/images/my-vm-cloud-init.iso

    - name: Define and create VM
      community.libvirt.virt:
        command: define
        xml: "{{ lookup('template', 'vm.xml.j2') }}"

    - name: Start VM
      community.libvirt.virt:
        name: my-vm
        state: running
```

### Vagrant

```ruby
# Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.provider :libvirt do |libvirt|
    libvirt.driver = "kvm"
    libvirt.host = "localhost"
    libvirt.uri = "qemu:///system"
    libvirt.memory = 2048
    libvirt.cpus = 2
    libvirt.storage_pool_name = "default"
  end

  config.vm.define "web" do |web|
    web.vm.box = "generic/ubuntu2204"
    web.vm.hostname = "web-server"
    web.vm.network "private_network", ip: "192.168.121.100"
  end

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y apache2
  SHELL
end
```

---

## Management Tools

### virt-manager (GUI)

```bash
# Install
sudo apt install virt-manager  # Debian/Ubuntu
sudo dnf install virt-manager  # RHEL/CentOS

# Launch
virt-manager

# Features:
- Graphical VM creation
- Live console access
- Performance graphs
- Storage/network management
- Snapshot management
```

### Cockpit (Web UI)

```bash
# Install Cockpit
sudo apt install cockpit cockpit-machines  # Ubuntu
sudo dnf install cockpit cockpit-machines  # RHEL

# Enable and start
sudo systemctl enable --now cockpit.socket

# Access
# Open browser to: https://server-ip:9090
# Login with local user credentials

# Features:
- Web-based management
- VM creation and management
- Resource monitoring
- Storage configuration
```

### kimchi (Web UI)

```bash
# Install (Ubuntu)
sudo apt install wok kimchi

# Start service
sudo systemctl start wokd

# Access
# https://server-ip:8001

# Features:
- Simple web interface
- VM templates
- Guest management
- Mobile-friendly
```

### oVirt / Proxmox (Enterprise)

**oVirt**:
- Enterprise KVM/storage/network management
- Red Hat backed
- Self-hosted engine
- Advanced features (HA, live migration)

**Proxmox VE**:
- Debian-based hypervisor platform
- Web-based management
- Integrated KVM and LXC
- Clustering and HA
- Backup and restore

---

## Backup & Snapshots

### Internal Snapshots

```bash
# Create snapshot (VM must be running or shut down)
virsh snapshot-create-as vm-name \
  snapshot-name "Description of snapshot"

# List snapshots
virsh snapshot-list vm-name

# Snapshot information
virsh snapshot-info vm-name snapshot-name

# View snapshot XML
virsh snapshot-dumpxml vm-name snapshot-name

# Revert to snapshot
virsh snapshot-revert vm-name snapshot-name

# Delete snapshot
virsh snapshot-delete vm-name snapshot-name

# Create snapshot with memory state (running VM)
virsh snapshot-create-as vm-name snapshot-name \
  "Snapshot with memory" --memspec file=/var/lib/libvirt/images/snapshot-mem,snapshot=external

# Current snapshot
virsh snapshot-current vm-name
```

### External Snapshots

```bash
# Create external snapshot (better for production)
virsh snapshot-create-as vm-name snapshot-1 \
  --diskspec vda,file=/var/lib/libvirt/images/vm-snapshot1.qcow2 \
  --disk-only --atomic

# List snapshot chain
qemu-img info --backing-chain /var/lib/libvirt/images/vm-disk.qcow2

# Blockcommit (merge snapshot back)
virsh blockcommit vm-name vda --active --pivot

# Blockpull (flatten chain)
virsh blockpull vm-name vda --wait
```

### Backup Solutions

**Manual Backup**:

```bash
# Shutdown method
virsh shutdown vm-name
# Wait for shutdown
sleep 30
# Copy disk
cp /var/lib/libvirt/images/vm-disk.qcow2 /backup/vm-disk-$(date +%Y%m%d).qcow2
# Copy XML
virsh dumpxml vm-name > /backup/vm-name-$(date +%Y%m%d).xml
# Restart
virsh start vm-name
```

**Live Backup (Using Snapshots)**:

```bash
#!/bin/bash
VM_NAME="my-vm"
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d-%H%M%S)

# Create external snapshot
virsh snapshot-create-as $VM_NAME backup-$DATE \
  --diskspec vda,file=/var/lib/libvirt/images/temp-snapshot.qcow2 \
  --disk-only --atomic

# Copy original disk (now frozen)
rsync -avP /var/lib/libvirt/images/vm-disk.qcow2 \
  $BACKUP_DIR/vm-disk-$DATE.qcow2

# Blockcommit to merge snapshot
virsh blockcommit $VM_NAME vda --active --pivot

# Remove temporary snapshot file
rm /var/lib/libvirt/images/temp-snapshot.qcow2

# Backup VM XML
virsh dumpxml $VM_NAME > $BACKUP_DIR/vm-config-$DATE.xml

echo "Backup completed: $BACKUP_DIR/vm-disk-$DATE.qcow2"
```

**Third-Party Backup Tools**:

```bash
# Borg Backup
sudo apt install borgbackup

# Restic
sudo apt install restic

# Bacula
# Enterprise-grade backup solution

# Veeam Agent for Linux
# Commercial backup solution with free tier
```

---

## Migration

### Live Migration (Shared Storage)

```bash
# Requirements:
- Shared storage (NFS, iSCSI, etc.) accessible by both hosts
- Same CPU architecture
- Network connectivity between hosts
- SSH keys configured

# Migrate VM to another host
virsh migrate --live --persistent \
  --undefinesource vm-name \
  qemu+ssh://destination-host/system

# With custom parameters
virsh migrate --live --persistent \
  --undefinesource \
  --copy-storage-all \  # If no shared storage
  --verbose \
  vm-name \
  qemu+ssh://destination-host/system \
  tcp://destination-host  # Migration data channel
```

### Storage Migration

```bash
# Offline storage migration
virsh shutdown vm-name
virsh migrate --offline --persistent \
  --copy-storage-all \
  vm-name qemu+ssh://destination-host/system

# Online storage migration (live + storage)
virsh migrate --live --persistent \
  --copy-storage-all \
  --undefinesource \
  vm-name qemu+ssh://destination-host/system
```

### Convert from Other Formats

**VMware to KVM**:

```bash
# Convert VMDK to qcow2
qemu-img convert -f vmdk -O qcow2 vmware-disk.vmdk kvm-disk.qcow2

# Import VMware VM
virt-install \
  --name imported-vm \
  --ram 4096 \
  --vcpus 2 \
  --disk path=kvm-disk.qcow2,bus=virtio \
  --network bridge=virbr0,model=virtio \
  --os-variant ubuntu22.04 \
  --graphics spice \
  --import

# Install guest additions
# (Inside guest: install qemu-guest-agent, virtio drivers)
```

**VirtualBox to KVM**:

```bash
# Convert VDI to qcow2
qemu-img convert -f vdi -O qcow2 virtualbox-disk.vdi kvm-disk.qcow2

# Or VirtualBox OVA
# Extract OVA
tar -xvf virtualbox.ova

# Convert VMDK (from OVA) to qcow2
qemu-img convert -f vmdk -O qcow2 disk.vmdk kvm-disk.qcow2

# Import VM (same as above)
```

**Hyper-V to KVM**:

```bash
# Convert VHDX to qcow2
qemu-img convert -f vhdx -O qcow2 hyperv-disk.vhdx kvm-disk.qcow2

# Import and configure
```

---

## Real-World Use Cases

### Home Lab

**Scenario**: Learning environment with multiple distros and services.

```bash
# Infrastructure:
- 1 Physical server (16 GB RAM, 4 cores)
- Multiple VMs (web server, database, DNS, etc.)
- NAT network for isolated testing

# Example VMs:
1. Ubuntu Server (web/app server)
2. CentOS (learning RedHat ecosystem)
3. Debian (database server)
4. Arch (testing rolling release)
5. Windows 10 (desktop testing)

# Automation:
- Ansible playbooks for configuration
- Snapshots before experiments
- Scheduled backups (weekly)

# Management:
- Cockpit for web access
- virsh scripts for automation
```

### Development Environment

**Scenario**: Isolated development environments per project.

```bash
# Setup:
- Template VM with development tools
- Clone template for each project
- Resource limits per VM
- Shared folders for code

# Workflow:
1. Clone development template
2. Customize for project (DB, languages, etc.)
3. Develop and test in VM
4. Snapshot before major changes
5. Deploy from VM to production

# Example:
virt-clone --original dev-template --name project-alpha --auto-clone
virsh start project-alpha
# SSH into VM and work
```

### Private Cloud

**Scenario**: Small business private cloud with Proxmox.

```bash
# Infrastructure:
- 3-node Proxmox cluster
- Ceph storage (distributed)
- HA enabled
- Automated backups

# Services:
- Email server (Zimbra)
- File server (Nextcloud)
- CRM (SuiteCRM)
- Website hosting
- VPN gateway

# Benefits:
- Cost savings vs cloud
- Data sovereignty
- Customization
- Learning opportunity
```

### CI/CD Infrastructure

**Scenario**: Automated testing with ephemeral VMs.

```bash
# Setup:
- Jenkins/GitLab CI
- KVM host for test VMs
- Automated VM creation/destruction
- Terraform for VM provisioning

# Workflow:
1. Code commit triggers build
2. Terraform creates fresh VM
3. Application deployed to VM
4. Automated tests run
5. Results collected
6. VM destroyed

# Benefits:
- Clean test environment each time
- Fast provisioning
- Cost-effective
- Easy scaling
```

### VDI (Virtual Desktop Infrastructure)

**Scenario**: Remote work environment with virtual desktops.

```bash
# Infrastructure:
- KVM hosts with desktop VMs
- SPICE protocol for low latency
- USB redirection
- Centralized authentication (LDAP)

# Desktop Pool:
- 20 Ubuntu desktop VMs
- RDP/SPICE access
- Persistent user data (separate disk)
- Automated provisioning

# Benefits:
- Centralized management
- Data security (no local storage)
- Easy backup
- Hardware independent
```

---

## Troubleshooting

### VM Won't Start

```bash
# Check error message
virsh start vm-name
# Read error carefully

# Common issues:

# 1. Disk permission error
sudo chown libvirt-qemu:kvm /var/lib/libvirt/images/vm-disk.qcow2

# 2. Disk doesn't exist
virsh vol-list default
ls -l /var/lib/libvirt/images/

# 3. Insufficient resources
free -h
virsh nodeinfo

# 4. Network doesn't exist
virsh net-list --all
virsh net-start default

# 5. Check libvirtd log
sudo journalctl -u libvirtd -f

# 6. Validate XML
virsh dumpxml vm-name | xmllint --format -

# 7. SELinux issues (RHEL/CentOS)
sudo ausearch -m avc -ts recent
sudo restorecon -R /var/lib/libvirt/images/
```

### Network Issues

```bash
# VM has no network

# 1. Check VM network interface
virsh domiflist vm-name

# 2. Check if connected
virsh dumpxml vm-name | grep "link state"

# 3. Check network is running
virsh net-list
virsh net-start default

# 4. Check bridge
brctl show

# 5. Check firewall
sudo iptables -L -n -v
sudo firewall-cmd --list-all

# 6. Check inside guest
# Boot into VM and check network config
ip a
ip route
cat /etc/resolv.conf

# 7. Restart network in VM
sudo systemctl restart NetworkManager
```

### Performance Issues

```bash
# High CPU usage

# 1. Check what's using CPU
virsh domstats vm-name --cpu-total

# 2. Check CPU pinning
virsh vcpupin vm-name

# 3. Top-like view of VMs
virt-top

# 4. Check for I/O wait
# Inside guest:
top
# Look for high %wa (I/O wait)

# Memory pressure

# 1. Check memory stats
virsh dommemstat vm-name

# 2. Check for swapping
virsh domstats vm-name --balloon

# 3. Check host memory
free -h

# Disk I/O issues

# 1. Check disk stats
virsh domblkstat vm-name vda

# 2. Monitor disk I/O
virsh domblkinfo vm-name vda

# 3. Use iotop inside guest
sudo iotop

# 4. Check disk cache mode
virsh dumpxml vm-name | grep cache

# 5. Consider changing to cache='none' or using LVM
```

### Can't Connect to Console

```bash
# VNC/SPICE connection fails

# 1. Check graphics configuration
virsh domdisplay vm-name

# 2. Verify VM is running
virsh list

# 3. Check firewall
sudo firewall-cmd --list-all
sudo ufw status

# 4. Try serial console instead
virsh console vm-name

# For serial console to work, guest needs:
# - systemd: systemctl enable serial-getty@ttyS0.service
# - or add to kernel params: console=ttyS0

# 5. Check SPICE/VNC port
virsh dumpxml vm-name | grep graphics
netstat -tulpn | grep qemu
```

### Libvirtd Issues

```bash
# Libvirtd won't start

# 1. Check status
sudo systemctl status libvirtd

# 2. Check logs
sudo journalctl -xe -u libvirtd

# 3. Verify apparmor/SELinux not blocking
sudo aa-status
sudo setenforce 0  # Temporarily disable SELinux

# 4. Check for config errors
sudo libvirtd --verbose

# 5. Restart service
sudo systemctl restart libvirtd

# 6. Nuclear option (caution)
sudo systemctl stop libvirtd
sudo rm -rf /var/run/libvirt/*
sudo systemctl start libvirtd
```

---

## Learning Resources

### Official Documentation

- **KVM Website**: <https://www.linux-kvm.org/>
- **QEMU Documentation**: <https://www.qemu.org/documentation/>
- **libvirt Documentation**: <https://libvirt.org/docs.html>
- **Red Hat Virtualization Guide**: <https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/configuring_and_managing_virtualization/>
- **Ubuntu KVM Guide**: <https://ubuntu.com/server/docs/virtualization-with-kvm>

### Books

- "Mastering KVM Virtualization" by Humble Devassy Chirammal
- "QEMU/KVM User Guide"
- "The Definitive Guide to KVM Virtualization"

### Community

- **Reddit**: r/homelab, r/selfhosted
- **Server Fault**: <https://serverfault.com/> (Q&A)
- **KVM Forum**: Annual conference and mailing lists

### Hands-On Practice

- Personal home server
- Cloud providers (AWS EC2 bare metal with KVM)
- Virtual machines to practice (nested virtualization)

---

## Conclusion

KVM is a powerful, open-source virtualization solution deeply integrated with the Linux kernel. It provides:

- **Enterprise-grade performance** without licensing costs
- **Flexibility** in management (CLI, GUI, API, automation)
- **Scalability** from single VMs to large cloud deployments
- **Security** with SELinux/AppArmor, SecureBoot, encryption
- **Wide ecosystem** (libvirt, QEMU, various management tools)

Whether you're building a home lab, development environment, or production infrastructure, KVM offers the tools and performance needed for modern virtualization workloads.

For the latest updates and in-depth guides, always refer to the official documentation at <https://www.linux-kvm.org/> and <https://libvirt.org/>.
