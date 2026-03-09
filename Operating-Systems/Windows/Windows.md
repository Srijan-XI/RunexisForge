# Windows

## Introduction

## Overview

Microsoft Windows is a family of proprietary graphical operating system families, all of which are developed and marketed by Microsoft. Each family caters to a certain sector of the computing industry, including personal computers, Windows tablets, servers, and embedded systems.

It is the dominant desktop operating system worldwide, holding a massive market share due to its compatibility, enterprise integration, and gaming leadership.

## The Complete History of Windows
The history of Windows dates back to 1985, evolving from a GUI shell for MS-DOS to a completely standalone NT-based operating system.

### The DOS-Shell Era
*   **Windows 1.0 (1985)**: The first attempt. Tiled windows (not overlapping), mouse input, and simple apps like Calculator and Paint.
*   **Windows 2.0 (1987)**: Introduced overlapping windows, keyboard shortcuts, and the first versions of Word and Excel.
*   **Windows 3.0 / 3.1 (1990/1992)**: The first breakout success. Introduced TrueType fonts, Virtual Memory, and the Solitaire game.

### The 9x Family (Consumer)
*   **Windows 95 (1995)**: A revolutionary leap. Introduced the **Start Menu**, Taskbar, and "Plug and Play". It shifted to a 32-bit architecture.
*   **Windows 98 (1998)**: Refinement of 95 with better hardware support (USB) and integration of Internet Explorer.
*   **Windows ME (Millennium Edition) (2000)**: The final DOS-based Windows. Notorious for instability and bugs.

### The NT Family (Professional & Convergence)
*   **Windows NT 3.1 - 4.0 (1993-1996)**: Built from scratch for businesses. High stability, true 32-bit purely.
*   **Windows 2000 (2000)**: The professional counterpart to ME. Extremely stable, introduced Active Directory.
*   **Windows XP (2001)**: The Grand Unification. Merged the stability of the NT kernel with the consumer-friendliness of the 9x line. It featured the colorful "Luna" interface.
*   **Windows Vista (2007)**: Introduced the "Aero" glass design and major security overhauls (UAC). Criticized for high hardware requirements.
*   **Windows 7 (2009)**: Often considered the "fixed Vista". Polished, fast, and introduced the "Superbar" (pinned taxkbar icons).

### The Modern Era
*   **Windows 8 / 8.1 (2012)**: The "Touch-First" experiment. Removed the Start Menu in favor of a full-screen "Start Screen" with Live Tiles. See *Design Evolution* below.
*   **Windows 10 (2015)**: "Windows as a Service". Reintroduced the Start Menu (hybrid), introduced Cortana, Edge browser, and unifying the OS across PC and Xbox.
*   **Windows 11 (2021)**: A visual overhaul with centered taskbar, rounded corners, Snap Layouts, and strict hardware requirements (TPM 2.0) for enhanced security.

## Design Evolution: Desktop vs. "Sprint Touch"
Microsoft's design philosophy has swung like a pendulum between productivity and modernization.

### The Desktop Paradigm (Classic)
From Windows 95 to Windows 7, the design focused on the **WIMP** metaphor (Windows, Icons, Menus, Pointer). The interface was dense, precise, and mouse-driven. The "Aero" language in Vista/7 added depth with transparency and skeuomorphism (shiny glass effects).

### The "Sprint to Touch" (Metro/Modern UI)
With the rise of the iPad, Microsoft panicked and created **Windows 8**.
*   **Metro UI**: Based on typography and Swiss graphic design. Big, flat, colorful squares ("Live Tiles") designed for fingers, not mice.
*   **The Split**: The OS was schizophrenic—one half was a touch tablet, the other half was a legacy desktop. This confused users and led to the "Sprint" failure where enterprise users rejected the touch-centric interface.

### The Reconciliation (Fluent Design)
**Windows 11** implements **Fluent Design**, which balances the two:
*   **Materials**: "Mica" and "Acrylic" provide subtle translucency that scales across devices.
*   **Geometry**: Rounded corners soften the UI, moving away from the harsh sharp edges of Windows 8/10.
*   **Interaction**: Touch targets are larger, but the mouse remains a first-class citizen. It is a "calm" technology approach.

## Windows Feature Plans & The Future
Microsoft is currently steering Windows towards three pillars: AI, Cloud, and ARM compatibility.

1.  **Windows Copilot (AI)**: deeply integrated AI assistant that can control OS settings ("Turn on dark mode"), summarize documents, and generate content.
2.  **Windows 365 / Cloud PC**: Moving the OS to the cloud. You stream your Windows desktop to any device (iPad, Android, Mac). The goal is to make the local hardware irrelevant.
3.  **Windows on ARM**: With the rise of efficient chips (like Snapdragon X Elite), Microsoft is optimizing Windows to run natively on ARM processors to compete with Apple Silicon's battery life and performance.
4.  **CorePC**: Rumored modular architecture to strip down Windows for lightweight devices, removing legacy Win32 bloat where not needed.

## Key Versions (desktop)

## Key Versions Summary (Active/Recent)

- **Windows 10**: The reliable workhorse. Support ending in 2025.
- **Windows 11**: The current standard. Focuses on security and UI polish.
- **Windows Server 2022**: The backbone of enterprise infrastructure.

## Strengths

- Broad hardware and software support
- Deep ecosystem for gaming and productivity
- Extensive enterprise management tooling

## Resources

- Windows docs: <https://learn.microsoft.com/windows>
- Release health: <https://learn.microsoft.com/windows/release-health>

---

## User Guide

## Install / Upgrade

- Create bootable USB with Media Creation Tool
- Check TPM 2.0 and Secure Boot for Windows 11
- Choose edition (Home/Pro) and partitioning during setup

## Core Tasks

- Update: Settings > Windows Update
- Package manager: `winget search <pkg>` then `winget install <pkg>`
- Enable features: `Optional Features` (WSL, Hyper-V on Pro), `Turn Windows features on or off`

## WSL

```powershell
wsl --install Ubuntu
wsl -l -v
wsl --set-version Ubuntu 2
```bash

## Virtualization (VMs)

- Intro: `Operating-Systems/Windows/Virtualization/intro.md`
- VirtualBox: `Operating-Systems/Windows/Virtualization/virtualbox.md`
- VMware: `Operating-Systems/Windows/Virtualization/vmware.md`

## PowerShell Basics

```powershell
Get-Process
Get-Service | Where-Object {$_.Status -eq 'Running'}
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```bash

## Security

- Windows Defender and SmartScreen on by default
- BitLocker (Pro/Enterprise) for drive encryption
- Keep drivers updated via Windows Update or vendor tools

## Troubleshooting

- Event Viewer for logs
- `sfc /scannow` and `DISM /Online /Cleanup-Image /RestoreHealth`
- Safe Mode via Shift + Restart > Troubleshoot

