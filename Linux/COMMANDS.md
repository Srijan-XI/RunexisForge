# Linux Commands Cheat Sheet

A quick reference for common Linux commands across different distros.

## Package Management

### Debian/Ubuntu (APT)
```bash
sudo apt update              # Refresh package list
sudo apt upgrade             # Upgrade packages
sudo apt install <pkg>       # Install package
sudo apt remove <pkg>        # Remove package
sudo apt purge <pkg>         # Remove package + config
sudo apt search <name>       # Search packages
sudo apt autoremove          # Clean unused dependencies
```

### Red Hat/Fedora/CentOS (DNF)
```bash
sudo dnf upgrade --refresh   # Refresh and upgrade
sudo dnf install <pkg>       # Install package
sudo dnf remove <pkg>        # Remove package
sudo dnf search <name>       # Search packages
sudo dnf repolist            # List enabled repos
sudo dnf clean all           # Clean cache
```

### Arch (Pacman)
```bash
sudo pacman -Syu             # Sync and upgrade
sudo pacman -S <pkg>         # Install package
sudo pacman -R <pkg>         # Remove package
sudo pacman -Rs <pkg>        # Remove + dependencies
sudo pacman -Ss <name>       # Search packages
sudo pacman -Sc              # Clean cache
```

### Gentoo (Emerge)
```bash
sudo emaint sync --auto      # Sync repos
sudo emerge --ask --update --deep --newuse @world
                             # Update system
sudo emerge --ask <pkg>      # Install package
sudo emerge --unmerge <pkg>  # Remove package
emerge --search <name>       # Search packages
```

### Slackware (Slackpkg)
```bash
sudo slackpkg update         # Update repos
sudo slackpkg upgrade-all    # Upgrade all packages
sudo slackpkg install <pkg>  # Install package
sudo removepkg <pkg>         # Remove package
```

## System Management

### Service/Daemon Control (systemd)
```bash
systemctl status <service>       # Check service status
sudo systemctl start <service>   # Start service
sudo systemctl stop <service>    # Stop service
sudo systemctl restart <service> # Restart service
sudo systemctl enable <service>  # Enable on boot
sudo systemctl disable <service> # Disable on boot
sudo systemctl enable --now <svc> # Enable + start now
sudo systemctl list-units --type=service
                                 # List all services
journalctl -u <service> -n 20   # View last 20 logs
```

### System Information
```bash
uname -a                     # Kernel and system info
lsb_release -a               # Distro version (Debian/Ubuntu)
cat /etc/os-release          # Universal distro info
lsblk                        # List block devices/disks
df -h                        # Disk space usage
free -h                      # Memory usage
top or htop                  # System monitor
ps aux                       # List running processes
uptime                       # System uptime
```

## File & Directory Operations

```bash
ls -la                       # List with details
cd <path>                    # Change directory
pwd                          # Print working directory
mkdir -p <path>              # Create directory (recursive)
rm -rf <path>                # Remove directory (recursive)
cp -r <src> <dst>            # Copy directory
mv <src> <dst>               # Move/rename
touch <file>                 # Create empty file
cat <file>                   # Display file content
less <file>                  # View file paginated
grep <pattern> <file>        # Search in file
find <path> -name <pattern>  # Find files
```

## Text Processing

```bash
grep <pattern> <file>        # Search text
sed 's/old/new/g' <file>     # Replace text
awk '{print $1}' <file>      # Extract columns
cut -d: -f1 <file>           # Cut by delimiter
sort <file>                  # Sort lines
uniq <file>                  # Remove duplicates
wc -l <file>                 # Count lines
head -n 10 <file>            # Show first 10 lines
tail -n 10 <file>            # Show last 10 lines
```

## User & Permission

```bash
whoami                       # Current user
sudo su                      # Switch to root
sudo -l                      # List sudo permissions
useradd <user>               # Add user
userdel <user>               # Remove user
passwd <user>                # Change password
chmod 755 <file>             # Change permissions
chown user:group <file>      # Change ownership
sudo visudo                  # Edit sudoers safely
```

## Network

```bash
ping <host>                  # Test connectivity
ifconfig or ip addr show     # Show IP addresses
netstat -tuln                # Show listening ports
ss -tuln                     # Show connections (ss)
curl <url>                   # Fetch URL
wget <url>                   # Download file
ssh user@host                # SSH login
scp file user@host:/path     # Copy over SSH
```

## Process Management

```bash
ps aux                       # List processes
ps aux | grep <name>         # Find process
kill -9 <PID>                # Force kill process
pkill <name>                 # Kill by name
bg                           # Run in background
fg                           # Bring to foreground
jobs                         # List background jobs
nohup <cmd> &                # Run immune to hangup
```

## Archive & Compression

```bash
tar -czf archive.tar.gz <path>   # Create tar.gz
tar -xzf archive.tar.gz          # Extract tar.gz
zip -r archive.zip <path>        # Create zip
unzip archive.zip                # Extract zip
gzip <file>                      # Compress with gzip
gunzip <file.gz>                 # Decompress gzip
```

## Filesystem

```bash
mount <device> <path>        # Mount filesystem
umount <path>                # Unmount filesystem
df -h                        # Disk usage by filesystem
du -sh <path>                # Directory size
fsck <device>                # File system check
mkfs.ext4 <device>           # Format as ext4
lsblk                        # List block devices
```

## Tips & Tricks

- **Man pages**: `man <command>` for help
- **History**: `history` or press Ctrl+R to search
- **Pipe**: `command1 | command2` to chain commands
- **Redirect**: `>` (overwrite), `>>` (append), `<` (input)
- **Wildcard**: `*` (any), `?` (single char), `[abc]` (one of)
- **Background**: Add `&` at end to background job
- **Alias**: `alias name='command'` for shortcuts
- **Environment variables**: `echo $VAR`, `export VAR=value`

## Cross-Distro Tips

- Most commands are universal across distros
- Package manager commands vary (apt, dnf, pacman, etc.)
- Service manager is usually systemd (exceptions: Slackware uses rc scripts, some use OpenRC)
- Always use `sudo` for privileged operations
- Check distro docs for distro-specific tools
