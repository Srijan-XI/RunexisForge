# VirtualBox — Quick Guide

## Install
1. Download VirtualBox: https://www.virtualbox.org/
2. (Optional) Install the Extension Pack (USB 2/3, RDP, etc.)

## Create your first VM
1. Click **New**
2. Choose the OS type/version
3. Allocate RAM (start modest, e.g., 2–4 GB for Linux)
4. Create a virtual disk (VDI, dynamically allocated is fine for learning)
5. Attach an OS ISO in **Settings → Storage**
6. Start the VM and follow the OS installer

## Snapshots
- Take a snapshot before risky changes (drivers, upgrades)
- If something breaks, restore the snapshot

## Networking basics
- **NAT**: simplest; VM can access internet, host cannot directly access VM
- **Bridged**: VM appears on your LAN (useful for server labs)
- **Host-only**: isolated network between host and VM

## Automation (advanced)
VirtualBox ships `VBoxManage` to create/start/configure VMs via CLI.

References:
- Docs: https://www.virtualbox.org/wiki/Documentation
