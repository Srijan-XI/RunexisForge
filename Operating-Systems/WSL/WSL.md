# WSL

## Introduction

## What is WSL?

**Windows Subsystem for Linux (WSL)** is a compatibility layer for running Linux binary executables (ELF format) natively on Windows 10 and Windows 11. It allows developers to access the power of open-source tools without the overhead of a traditional, heavy Virtual Machine or dual-booting.

## Architecture & Implementation
How acts as a bridge between the two operating systems?

### WSL 1: The Translation Layer
*   **Mechanism**: It did not contain a real Linux kernel. Instead, it used a **translation layer** that converted Linux system calls (syscalls) into Windows system calls on the fly.
*   **Pros**: Extremely fast file sharing between Windows and Linux.
*   **Cons**: Incomplete compatibility (some apps like Docker didn't work because they needed real kernel features).

### WSL 2: The Lightweight VM (Current Standard)
*   **Mechanism**: WSL 2 runs a **real Linux kernel** inside a managed, lightweight Virtual Machine (Hyper-V architecture).
*   **Integration**: Unlike traditional VMs (VirtualBox/VMware), this VM boots in less than a second and is tightly integrated with the Windows desktop.
*   **File Sharing**: Uses the **9P protocol** to share files between the Linux VM and the Windows host, ensuring seamless access.
*   **Networking**: Uses a NAT'd network adapter but provides localhost forwarding, so you can access a Linux web server from a Windows browser locally.

## Available Linux Distros
Microsoft allows different Linux distributions to be installed from the Microsoft Store or command line. Common options include:

*   **Ubuntu** (Default & Most Popular): Great for general web dev, Python, Node.js.
*   **Debian**: Stable, reliable, preferred by sysadmins.
*   **Kali Linux**: For security professionals and penetration testing.
*   **Alpine**: Extremely lightweight, minimal footprint.
*   **OpenSUSE / SLES**: Enterprise-grade distributions.
*   **Oracle Linux**: RHEL-compatible enterprise distro.

Users can install multiple distros side-by-side!

## Real-World Problems Solved
Why is WSL a game-changer for developers?

### 1. Production Parity ("It works on my machine")
*   **Problem**: Most servers run Linux (Ubuntu/Debian). If you develop on Windows using PowerShell/CMD, you might face path issues (`\` vs `/`), missing binaries, or subtle environment bugs.
*   **Solution**: With WSL, you code in the **exact same environment** (Linux) that your code will deploy to.

### 2. The Tooling Gap
*   **Problem**: Tools like **Redis**, **Ansible**, **Bash scripts**, and **Makefile** workflows often treat Windows support as an afterthought or don't support it at all.
*   **Solution**: WSL lets you run these native Linux tools directly. You don't need a "Windows port" of Redis; you just run the real Linux Redis.

### 3. Cross-Platform Hybrid Development
*   **Problem**: You generally need a Mac or Linux machine for backend dev, but you might need Windows for Game Dev (Unreal/Unity), .NET (Legacy), or Corporate tools (Outlook/Office).
*   **Solution**: WSL gives you the best of both. You can run your Node.js backend in an Ubuntu terminal while writing the code in VS Code on Windows and checking email in Outlook.

### 4. Containerization (Docker) Performance
*   **Problem**: Running Docker on Windows previously used a heavy Linux VM (MobyLinuxVM) that was slow to start and resource-hungry.
*   **Solution**: Docker Desktop now uses the **WSL 2 backend**. It leverages the shared Linux kernel for near-native container performance and instant startup times.

## Learning Path

1. Install WSL and a distro (Ubuntu is common).
2. Learn where files live (`/home/...` vs `C:\Users\...`).
3. Install packages and dev tools inside WSL.
4. Learn interop: calling Windows from Linux and vice-versa.

---

## Full Setup Process (Zero to Hero)

### Step 1: Installation
Open **PowerShell as Administrator** and run the magic command:
```pwsh
wsl --install
```
*This handles enabling Windows features (Hyper-V, Virtual Machine Platform), downloading the latest Linux kernel, and installing Ubuntu by default.*
**Reboot your computer** when prompted.

### Step 2: User Configuration
Once rebooted, the Ubuntu terminal will open automatically.
1.  Enter a **Username** (e.g., `srijan`). *Note: This doesn't match your Windows user.*
2.  Enter a **Password**. *Note: You won't see characters while typing (legacy unix security).*

### Step 3: Installing Additional Distros (Optional)
To see what else is available online:
```pwsh
wsl --list --online
```
To install a specific one (e.g., Debian):
```pwsh
wsl --install -d Debian
```

### Step 4: The VS Code "Dev Environment" Rule
**Crucial Tip**: Do not edit Linux files using Windows Notepad! It can mess up line endings (`CRLF` vs `LF`) and permissions.
Instead, use **VS Code** with the **WSL Extension**.

1.  Open your WSL terminal (Ubuntu).
2.  Navigate to your home folder: `cd ~`
3.  Type `code .`
4.  VS Code will launch on Windows, but it will be "connected" to the Linux system (you'll see **WSL: Ubuntu** in the bottom left).

### Step 5: Essential First Commands
Update your repositories and packages to get the latest security patches:
```bash
sudo apt update && sudo apt upgrade -y
```

Install common dev tools:
```bash
# Git, Curl, Wget, Unzip, Build Tools (GCC/Make)
sudo apt install -y git curl wget unzip build-essential
```

## Filesystem & Navigation
Understanding the two worlds:

1.  **The Linux World**:
    *   Root: `/`
    *   Your Home: `/home/<username>/` or `~`
    *   *Best Practice*: Store all your project code here (e.g., `~/projects/my-app`) for maximum speed.
2.  **The Windows World**:
    *   Mounted at: `/mnt/`
    *   C Drive: `/mnt/c/`
    *   Your Windows Desktop: `/mnt/c/Users/<WindowsUser>/Desktop/`
    *   *Warning*: Accessing `/mnt/c/` files from Linux is slower due to the network protocol overhead. Avoid hosting standard projects (node_modules) here.

Tip: keep project code in the Linux filesystem (e.g. `~/projects`) for best performance on WSL 2.

## Useful interop commands

From Windows → open your WSL home in Explorer:

```bash
explorer.exe .
```

From WSL → run a Windows command:

```bash
notepad.exe README.md
```

## Common dev setup

Inside WSL (Ubuntu):

```bash
sudo apt install -y git curl build-essential
```

## Troubleshooting

- If `wsl` commands fail, ensure **Virtual Machine Platform** is enabled.
- If networking feels broken, try:
  - `wsl --shutdown` (from PowerShell) then reopen the distro.

See `WSL/examples/wsl_commands.md` for a quick command reference.

