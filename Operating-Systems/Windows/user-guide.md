# Windows Usage Guide

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
```

## PowerShell Basics
```powershell
Get-Process
Get-Service | Where-Object {$_.Status -eq 'Running'}
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Security
- Windows Defender and SmartScreen on by default
- BitLocker (Pro/Enterprise) for drive encryption
- Keep drivers updated via Windows Update or vendor tools

## Troubleshooting
- Event Viewer for logs
- `sfc /scannow` and `DISM /Online /Cleanup-Image /RestoreHealth`
- Safe Mode via Shift + Restart > Troubleshoot
