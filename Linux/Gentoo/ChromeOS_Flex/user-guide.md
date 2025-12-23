# ChromeOS Flex User Guide

## Installation

### Prerequisites
1. USB drive (8+ GB)
2. Target computer (Intel/AMD x86-64, 4+ GB RAM)
3. Windows, Mac, or ChromeOS computer to create installer

---

## Create Installation USB

### Using ChromeOS Recovery Utility (Recommended)

1. **Install Extension**
   - Open Chrome browser
   - Visit [Chrome Web Store](https://chrome.google.com/webstore/)
   - Search "Chromebook Recovery Utility"
   - Click "Add to Chrome"

2. **Create USB Installer**
   ```
   1. Launch Chromebook Recovery Utility
   2. Click "Get started"
   3. Click gear icon (top right)
   4. Select "Use local image"
   5. Browse to ChromeOS Flex image (.bin file)
   6. Insert USB drive
   7. Select your USB drive
   8. Click "Continue"
   9. Click "Create now"
   10. Wait for process to complete
   ```

3. **Download ChromeOS Flex Image**
   - Visit [ChromeOS Flex download page](https://chromeenterprise.google/os/chromeosflex/)
   - Download the installer image

---

## Installation Steps

### 1. Boot from USB

```
1. Insert USB drive into target computer
2. Restart computer
3. Press boot menu key (F12, F2, ESC, or DEL)
4. Select USB drive from boot menu
5. ChromeOS Flex will load
```

### 2. Try Before Installing (Optional)

```
1. ChromeOS Flex boots in live mode
2. Test functionality:
   - WiFi connection
   - Browser performance
   - Hardware compatibility
3. Explore without installing
```

### 3. Install ChromeOS Flex

```
1. Click clock (bottom right)
2. Click "Install ChromeOS Flex"
3. Read information screen
4. Click "Install ChromeOS Flex"
5. Confirm installation (this ERASES all data)
6. Wait for installation (~5-10 minutes)
7. Remove USB when prompted
8. Computer restarts automatically
```

---

## First-Time Setup

### Initial Configuration

```
1. Select language
2. Select keyboard layout
3. Connect to WiFi
4. Accept Terms of Service
5. Sign in with Google Account
6. Follow setup wizard
```

---

## Basic Usage

### File Management

**Access Files App**:
```
1. Click Launcher (bottom left)
2. Search "Files" or click Files icon
3. Navigate folders
```

**File Locations**:
- **Downloads**: Local storage
- **Google Drive**: Cloud storage
- **Linux files**: Linux container files

### Installing Linux Apps

**Enable Linux**:
```
1. Settings → Advanced → Developers
2. Turn on "Linux development environment"
3. Click "Turn on"
4. Wait for Linux container setup
5. Terminal opens automatically
```

**Install Applications**:
```bash
# Update package list
sudo apt update

# Install VS Code
sudo apt install code

# Install GIMP
sudo apt install gimp

# Install LibreOffice
sudo apt install libreoffice

# Install Python
sudo apt install python3 python3-pip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs
```

---

## Settings & Customization

### Access Settings
```
Click clock → Settings icon (gear)
```

### Important Settings

**Appearance**:
```
Settings → Personalization
- Wallpaper
- Theme (Light/Dark)
- Shelf (taskbar) position
```

**WiFi**:
```
Settings → Network
- Connect to networks
- VPN configuration
- Proxy settings
```

**Bluetooth**:
```
Settings → Bluetooth
- Pair devices
- Manage connections
```

**Displays**:
```
Settings → Device → Displays
- Resolution
- Scale
- Arrangement (multi-monitor)
```

**Privacy**:
```
Settings → Privacy and security
- Site settings
- Clear browsing data
- Permissions
```

---

## Keyboard Shortcuts

### Essential Shortcuts
```
Ctrl + Alt + ? - Show all shortcuts

# Window Management
Alt + [ - Dock window left
Alt + ] - Dock window right
Alt + = - Maximize window
Alt + - - Minimize window
Alt + Tab - Switch windows

# Browser
Ctrl + T - New tab
Ctrl + W - Close tab
Ctrl + Shift + T - Reopen closed tab
Ctrl + L - Address bar
Ctrl + Tab - Next tab

# Screenshots
Ctrl + Show windows - Screenshot
Ctrl + Shift + Show windows - Partial screenshot

# System
Search (🔍) - Open launcher
Shift + Alt + M - Files app
Shift + Alt + N - Notifications
```

---

## Printing

### Setup Printer

1. **WiFi Printer**:
   ```
   Settings → Advanced → Printing
   → Printers → Add Printer
   → Select printer or add manually
   ```

2. **Cloud Print Alternative**:
   - Use manufacturer's web printing service
   - Many modern printers support IPP Everywhere

---

## Troubleshooting

### WiFi Not Working

```
1. Settings → Network
2. Click WiFi network
3. Click "Forget"
4. Reconnect with password
5. Or: Restart device
```

### Device Running Slow

```
1. Clear browser cache:
   Settings → Privacy → Clear browsing data
   
2. Close unused tabs/apps

3. Disable unnecessary extensions:
   Chrome → Extensions → Manage Extensions

4. Check Linux apps resource usage
```

### Linux Apps Not Working

```
# Restart Linux container
Settings → Advanced → Developers
→ Linux development environment
→ Click gear icon → Restart Linux

# Or terminal command:
sudo reboot
```

### Can't Install ChromeOS Flex

```
Possible reasons:
1. Device not on certified list
2. Incompatible hardware (ARM processor)
3. BIOS settings (disable Secure Boot)
4. Corrupted USB installer (recreate)
```

---

## Enterprise Management

### Enroll Device

```
1. During setup, use enterprise credentials
2. Device auto-enrolls if configured
3. Or: Settings → About ChromeOS Flex
   → Enterprise enrollment
```

### Admin Console

Administrators can manage:
- Device policies
- App restrictions
- User permissions
- Network settings
- Updates
- Remote wipe

---

## Updates

### Automatic Updates

```
ChromeOS Flex updates automatically
- No user action needed
- Updates in background
- Restart when prompted
```

### Check for Updates

```
Settings → About ChromeOS Flex
→ Check for updates
→ Restart to update if available
```

---

## Backup & Recovery

### Backup Important Files

```
⚠️ ChromeOS Flex is cloud-first

Backup locations:
1. Google Drive (automatic for cloud files)
2. External USB drive
3. Linux files: manually backup
```

### Powerwash (Factory Reset)

```
Settings → Advanced → Reset settings
→ Powerwash → Restart

⚠️ This ERASES all local data!
```

---

## Performance Tips

1. **Use Web Apps**: Faster than Linux apps
2. **Limit Extensions**: Only essential extensions
3. **Close Unused Tabs**: Saves RAM
4. **Disable Unnecessary Services**: Check running apps
5. **Keep Linux Apps Updated**: `sudo apt update && sudo apt upgrade`
6. **Use SSD**: Much faster than HDD
7. **8+ GB RAM**: Recommended for multitasking

---

## Web App Alternatives

| Need | Alternative |
|------|-------------|
| Office | Google Workspace, Microsoft Office Online |
| Photo Editing | Photopea, Pixlr |
| Video Editing | Clipchamp, WeVideo |
| Design | Canva, Figma |
| Email | Gmail, Outlook.com |
| Calendar | Google Calendar |
| Notes | Google Keep, Notion |
| Code Editor | VS Code (Linux) |

---

## Common Commands (Linux)

```bash
# Update system
sudo apt update && sudo apt upgrade

# Install package
sudo apt install <package-name>

# Remove package
sudo apt remove <package-name>

# List installed packages
apt list --installed

# Search for package
apt search <keyword>

# Check disk space
df -h

# Check system info
neofetch  # (install: sudo apt install neofetch)
```

---

## Support Resources

### Official
- [ChromeOS Flex Help](https://support.google.com/chromeosflex/)
- [Community Forum](https://support.google.com/chromeosflex/community)
- [Known Issues](https://support.google.com/chromeosflex/answer/11542901)

### Community
- [r/ChromeOSFlex](https://www.reddit.com/r/ChromeOSFlex/)
- [ChromeOS Discord](https://discord.gg/chromeos)

---

## Best Practices

- ✅ Keep device plugged in during updates
- ✅ Use Google Drive for file sync
- ✅ Enable 2-factor authentication
- ✅ Regular Powerwash for fresh start (backup first!)
- ✅ Test USB boot before installing
- ✅ Check certified models list
- ✅ Maintain good internet connection

---

**Enjoy your ChromeOS Flex experience! 💻🚀**
