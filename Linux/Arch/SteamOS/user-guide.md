# SteamOS User Guide

## Installation (Desktop PC)

### Download SteamOS

⚠️ **Note**: Official SteamOS 3.x desktop installer coming soon from Valve.

### Alternative: HoloISO (Community Build)

**HoloISO** is a community build that brings SteamOS 3.x to desktop PCs.

```bash
1. Visit: https://github.com/HoloISO/holoiso
2. Download latest release ISO
3. Create bootable USB (Rufus, Etcher, or dd)
4. Boot from USB
5. Follow installation prompts
```bash

### Using dd (Linux/Mac)

```bash
# Find USB device
lsblk

# Write ISO to USB (replace /dev/sdX with your USB)
sudo dd if=holoiso.iso of=/dev/sdX bs=4M status=progress
sync
```bash

---

## Steam Deck - First Time Setup

### Initial Configuration

```bash
1. Power on Steam Deck
2. Select language
3. Connect to WiFi
4. Sign in to Steam account
5. Complete setup wizard
6. Downloads initial updates
7. Restart if prompted
```bash

---

## Game Mode Overview

### Main Interface

**Library**:

- Browse installed games
- Download new games
- Manage collections

**Store**:

- Browse Steam Store
- Purchase games
- View recommendations

**Friends**:

- Friends list
- Chat
- Invite to games

**Steam Menu**:

- Settings
- Downloads
- Power options

---

## Installing Games

### From Steam Library

```bash
1. Press Steam button
2. Navigate to Library
3. Select game
4. Click Install
5. Choose install location
6. Wait for download
```bash

### Proton Compatibility

**Enable Proton for All Games**:

```bash
1. Steam Menu → Settings
2. Compatibility
3. Enable "Enable Steam Play for all other titles"
4. Select Proton version (Latest recommended)
5. Restart Steam
```bash

**Per-Game Proton**:

```bash
1. Select game in Library
2. Press gear icon
3. Properties → Compatibility
4. Check "Force the use of a specific Steam Play compatibility tool"
5. Select Proton version
```bash

---

## Desktop Mode

### Switch to Desktop Mode

```bash
Steam Deck:
1. Press Steam button
2. Power → Switch to Desktop
3. KDE Plasma desktop loads

Desktop PC:
1. Return key from Game Mode
2. Or boot to desktop by default
```bash

### Desktop Mode Basics

**Applications**:

- **Discover**: App store (install software)
- **Konsole**: Terminal
- **Dolphin**: File manager
- **Firefox**: Web browser
- **System Settings**: Desktop configuration

---

## Installing Non-Steam Games

### Method 1: Add to Steam

```bash
Desktop Mode:
1. Open Steam (desktop client)
2. Games → Add a Non-Steam Game
3. Browse for executable
4. Add selected program
5. Return to Game Mode
6. Game appears in library
```bash

### Method 2: Lutris

```bash
# Install Lutris (Desktop Mode)
sudo pacman -S lutris

# Launch Lutris
# Search for game
# Install via script
# Game added to library
```bash

### Method 3: Heroic Launcher (Epic/GOG)

```bash
Desktop Mode:
1. Open Discover
2. Search "Heroic"
3. Install Heroic Games Launcher
4. Login to Epic/GOG
5. Install games
6. Add to Steam as non-Steam game
```bash

---

## Package Management

### Update System

```bash
# SteamOS updates automatically
# Or manually:
sudo steamos-update
```bash

### Install Software (Desktop Mode)

**Using Discover (GUI)**:

```bash
1. Open Discover
2. Search for application
3. Click Install
```bash

**Using Pacman (Terminal)**:

```bash
# Update package database
sudo pacman -Sy

# Install package
sudo pacman -S <package-name>

# Examples
sudo pacman -S firefox
sudo pacman -S gimp
sudo pacman -S code  # VS Code

# Remove package
sudo pacman -R <package-name>

# Search for package
pacman -Ss <keyword>
```bash

**Using Flatpak**:

```bash
# Install Flatpak app
flatpak install flathub <app-id>

# Example
flatpak install flathub org.mozilla.firefox

# Update all Flatpaks
flatpak update
```bash

---

## Emulation with EmuDeck

### Install EmuDeck

```bash
Desktop Mode:
1. Open Firefox
2. Visit: https://www.emudeck.com/
3. Download EmuDeck installer
4. Run installer
5. Follow setup wizard:
   - Choose Quick or Custom
   - Select emulators
   - Configure paths
   - Download BIOS files
6. Add ROMs to designated folders
7. Emulators appear in Steam
```bash

### Popular Emulators Included

- RetroArch (multi-system)
- Dolphin (GameCube/Wii)
- PCSX2 (PS2)
- RPCS3 (PS3)
- Yuzu/Ryujinx (Switch)
- Citra (3DS)
- PPSSPP (PSP)

---

## Optimize Performance

### Graphics Settings (Per-Game)

```bash
Game Mode:
1. Select game
2. Press ... (Quick Access button)
3. Performance overlay
4. Adjust:
   - FPS limiter
   - Refresh rate
   - TDP limit (Steam Deck)
   - GPU clock
   - Scaling filter
```bash

### Shader Cache

```bash
Settings → Downloads
→ Shader Pre-Caching
→ Enable for all games
```bash

### ProtonGE (Better Compatibility)

```bash
# Install ProtonUp-Qt
flatpak install flathub net.davidotek.pupgui2

# Launch ProtonUp-Qt
# Install GE-Proton
# Select in game properties
```bash

---

## Steam Deck Specific

### Controls

**Physical Controls**:

- A/B/X/Y buttons
- L1/R1, L2/R2 triggers
- L4/R4 back buttons (grip buttons)
- Thumbsticks
- D-pad
- Trackpads
- Gyro sensor

**Steam Button Functions**:

- **Steam Button**: Open Steam menu
- **Quick Access (...)**: Performance overlay
- **View Button**: Keyboard
- **Menu Button**: Context menu

### Battery Management

```bash
Quick Access (...) → Battery icon
- Performance mode
- Battery saver mode
- FPS limit (save battery)
- Brightness
- Refresh rate
```bash

### External Devices

**Dock/Hub**:

- USB-C dock for external monitor
- Keyboard and mouse support
- USB storage
- Ethernet

**Bluetooth**:

```bash
Settings → Bluetooth
- Pair headphones
- Pair controllers
- Pair keyboard/mouse
```bash

---

## Troubleshooting

### Game Won't Launch

```bash
1. Try different Proton version
   - Properties → Compatibility
   - Try GE-Proton
   
2. Check ProtonDB for fixes
   - Visit protondb.com
   - Search game
   - Read community fixes

3. Verify game files
   - Properties → Local Files
   - Verify integrity

4. Check launch options
   - Properties → General
   - Add launch options if needed
```bash

### Poor Performance

```bash
1. Lower graphics settings in-game
2. Set FPS limit (40Hz/40FPS sweet spot on Deck)
3. Reduce resolution
4. Enable FSR
5. Check background downloads
6. Update Proton version
```bash

### Desktop Mode Issues

```bash
# Restore to default settings
sudo steamos-readonly disable
sudo pacman -Syu
sudo steamos-readonly enable

# Or factory reset
Settings → System → Factory Reset
```bash

---

## Customization

### Install Decky Loader (Steam Deck)

```bash
# Desktop Mode terminal
curl -L https://github.com/SteamDeckHomebrew/decky-installer/releases/latest/download/install_release.sh | sh
```bash

**Popular Plugins**:

- PowerTools: Performance tuning
- ProtonDB Badges: Game ratings
- SteamGridDB: Custom artwork
- CSS Loader: Custom themes

### Custom Themes

```bash
Decky Loader → CSS Loader
- Browse themes
- Apply custom CSS
- Customize Game Mode UI
```bash

---

## File Locations

### Common Paths

```bash
# Steam games (default)
~/.local/share/Steam/steamapps/common/

# MicroSD card (if installed)
/run/media/mmcblk0p1/

# ROMs (EmuDeck)
~/Emulation/roms/

# Downloads
~/Downloads/

# Desktop files
~/Desktop/
```bash

---

## Keyboard Shortcuts (Desktop Mode)

```bash
Meta (Windows key) - Application launcher
Alt + Tab - Switch windows
Ctrl + Alt + T - Terminal
Meta + E - File manager
Meta + L - Lock screen
Ctrl + Alt + F1 - Switch to TTY1
Ctrl + Alt + F2 - Return to desktop
```bash

---

## Best Practices

1. **Update Regularly**: Keep SteamOS updated
2. **Check ProtonDB**: Before buying games
3. **Use MicroSD**: Expand storage (Steam Deck)
4. **Enable Shader Cache**: Reduce stuttering
5. **Limit FPS**: Save battery life
6. **Backup Saves**: Use Steam Cloud
7. **Community Fixes**: Check forums for game-specific issues
8. **Test First**: Try Proton before buying Windows games

---

## Resources

- [ProtonDB](https://www.protondb.com/) - Compatibility database
- [SteamDeckHQ](https://steamdeckhq.com/) - Guides and tips
- [EmuDeck Wiki](https://github.com/dragoonDorise/EmuDeck/wiki)
- [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader)
- [r/SteamDeck](https://www.reddit.com/r/SteamDeck/)

---

**Happy gaming! 🎮🚀**
