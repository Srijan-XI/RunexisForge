# Bash

## Introduction

## What is Bash?

Bash (Bourne Again Shell) is a Unix shell and command language written by Brian Fox for the GNU Project as a free software replacement for the Bourne shell (sh). First released in 1989, Bash has become one of the most widely used shells in the Linux and Unix world, and is the default shell for most Linux distributions and macOS (prior to Catalina).

Bash is both a **command interpreter** and a **scripting language**. As a command interpreter, it provides a text-based interface for users to interact with the operating system. As a scripting language, it allows users to automate tasks by writing shell scripts.

## Why Learn Bash?

### 1. **Universal Availability**

Bash is pre-installed on virtually all Linux distributions and macOS systems. It's also available on Windows through WSL (Windows Subsystem for Linux), Git Bash, and Cygwin.

### 2. **Automation and Productivity**

Bash scripts allow you to automate repetitive tasks, saving time and reducing human error. From simple file operations to complex system administration tasks, Bash can handle it all.

### 3. **System Administration**

System administrators rely heavily on Bash for managing servers, deploying applications, monitoring systems, and performing maintenance tasks.

### 4. **DevOps and CI/CD**

Bash is integral to DevOps workflows, including:

- Build automation
- Deployment scripts
- Configuration management
- Container orchestration
- CI/CD pipelines

### 5. **Data Processing**

Bash excels at text processing and can be combined with utilities like `grep`, `sed`, `awk`, and `cut` to manipulate and analyze data efficiently.

## Key Features

### 1. **Command-Line Editing**

Bash provides powerful command-line editing capabilities with keyboard shortcuts inspired by Emacs and Vi.

### 2. **Job Control**

Manage multiple processes with foreground and background job control, allowing you to multitask effectively.

### 3. **Shell Functions and Aliases**

Create reusable functions and shortcuts (aliases) to simplify complex commands.

### 4. **Command History**

Access and search through previously executed commands, making it easy to repeat or modify past operations.

### 5. **Filename Expansion (Globbing)**

Use wildcards and patterns to work with multiple files simultaneously.

### 6. **Pipes and Redirection**

Combine commands and control input/output streams to create powerful one-liners.

### 7. **Variables and Arrays**

Store and manipulate data using variables, environment variables, and arrays.

### 8. **Control Structures**

Use conditional statements (`if`, `case`) and loops (`for`, `while`, `until`) to create complex scripts.

### 9. **Command Substitution**

Capture the output of commands and use them as input for other commands.

### 10. **Scripting Capabilities**

Write complete programs with functions, error handling, and complex logic.

## Bash vs Other Shells

| Shell | Description | Key Differences |
|-------|-------------|-----------------|
| **sh (Bourne Shell)** | Original Unix shell | Bash is backward-compatible with sh but adds many features |
| **zsh (Z Shell)** | Extended Bourne shell | More features, better customization, advanced completion |
| **fish (Friendly Interactive Shell)** | User-friendly shell | Different syntax, not POSIX-compliant, better defaults |
| **ksh (Korn Shell)** | AT&T Bell Labs shell | Similar features but different implementation |
| **csh/tcsh (C Shell)** | C-like syntax | Different syntax, less common for scripting |

## Common Use Cases

### 1. **File Operations**

```bash
# Copy files with a specific extension
cp *.txt backup/

# Find and delete old files
find /tmp -mtime +7 -delete
```bash

### 2. **System Monitoring**

```bash
# Check disk usage
df -h

# Monitor running processes
ps aux | grep apache
```bash

### 3. **Text Processing**

```bash
# Extract specific columns
awk '{print $1, $3}' data.txt

# Search and replace in files
sed -i 's/old/new/g' file.txt
```bash

### 4. **Networking**

```bash
# Test connectivity
ping -c 4 google.com

# Download files
curl -O https://example.com/file.zip
```bash

### 5. **Automation**

```bash
# Backup script
tar -czf backup-$(date +%Y%m%d).tar.gz /important/data

# Log rotation
find /var/log -name "*.log" -mtime +30 -exec gzip {} \;
```bash

## The Bash Philosophy

Bash follows the Unix philosophy:

- **Do one thing and do it well**: Each command has a specific purpose
- **Everything is a file**: Uniform interface for devices, processes, and data
- **Compose simple tools**: Combine small utilities to solve complex problems
- **Text streams**: Use text as the universal interface between programs

## History and Evolution

- **1971**: Thompson shell (sh) - the first Unix shell
- **1977**: Bourne shell (sh) - improved Unix shell by Stephen Bourne
- **1989**: Bash 1.0 - released by Brian Fox for GNU Project
- **1996**: Bash 2.0 - added arrays and other features
- **2004**: Bash 3.0 - improved internationalization
- **2009**: Bash 4.0 - associative arrays, better globbing
- **2019**: Bash 5.0 - improved shell variable expansion and other enhancements

## Getting Started

To check if Bash is installed and its version:

```bash
bash --version
```bash

To start a Bash session:

```bash
bash
```bash

To check your current shell:

```bash
echo $SHELL
```bash

## Conclusion

Bash is an essential tool for anyone working with Unix-like systems. Whether you're a developer, system administrator, data scientist, or DevOps engineer, mastering Bash will significantly improve your productivity and give you powerful control over your computing environment.

The combination of its ubiquity, power, and flexibility makes Bash an invaluable skill in modern computing. From simple command-line tasks to complex automation scripts, Bash remains a cornerstone of the Unix/Linux ecosystem.

---

**Ready to dive deeper?** Jump to the **User Guide** section below for installation instructions, basic commands, and scripting tutorials, or jump straight into the [Practice Questions](Questions/) to start learning by doing!

---

## User Guide

## Table of Contents

1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Basic Commands](#basic-commands)
4. [File and Directory Operations](#file-and-directory-operations)
5. [Text Processing](#text-processing)
6. [Variables and Data Types](#variables-and-data-types)
7. [Control Structures](#control-structures)
8. [Functions](#functions)
9. [Input/Output and Redirection](#inputoutput-and-redirection)
10. [Advanced Features](#advanced-features)
11. [Best Practices](#best-practices)
12. [Debugging](#debugging)

---

## Installation

### Linux

Bash comes pre-installed on most Linux distributions. To verify:

```bash
bash --version
```bash

To install or update Bash:

```bash
# Debian/Ubuntu
sudo apt update
sudo apt install bash

# RHEL/CentOS/Fedora
sudo dnf install bash

# Arch Linux
sudo pacman -S bash
```bash

### macOS

Bash is pre-installed, but macOS Catalina+ uses zsh as default. To use Bash:

```bash
# Check Bash version
bash --version

# Change default shell to Bash
chsh -s /bin/bash

# Install latest Bash via Homebrew
brew install bash
```bash

### Windows

Several options are available:

**1. Windows Subsystem for Linux (WSL)** - Recommended

```powershell
wsl --install
```bash

**2. Git Bash** - Download from [git-scm.com](https://git-scm.com)

**3. Cygwin** - Download from [cygwin.com](https://www.cygwin.com)

---

## Getting Started

### Starting Bash

```bash
# Start a new Bash session
bash

# Run a Bash script
bash script.sh

# Make script executable and run
chmod +x script.sh
./script.sh
```bash

### Your First Script

Create a file named `hello.sh`:

```bash
#!/bin/bash
# This is a comment

echo "Hello, World!"
echo "Welcome to Bash scripting!"
```bash

Run it:

```bash
chmod +x hello.sh
./hello.sh
```bash

### The Shebang (`#!/bin/bash`)

The first line tells the system which interpreter to use:

```bash
#!/bin/bash          # Standard Bash
#!/usr/bin/env bash  # More portable (finds Bash in PATH)
#!/bin/sh            # POSIX shell (may not be Bash)
```bash

---

## Basic Commands

### Navigation

```bash
pwd                 # Print working directory
cd /path/to/dir     # Change directory
cd ~                # Go to home directory
cd ..               # Go up one directory
cd -                # Go to previous directory
```bash

### File Information

```bash
ls                  # List files
ls -l               # Long format
ls -a               # Show hidden files
ls -lh              # Human-readable sizes
ls -lt              # Sort by time

file filename       # Determine file type
stat filename       # Detailed file information
```bash

### Getting Help

```bash
man command         # Manual page
command --help      # Help option
info command        # Info documentation
which command       # Show command location
type command        # Show command type
```bash

---

## File and Directory Operations

### Creating

```bash
touch file.txt              # Create empty file
mkdir directory             # Create directory
mkdir -p path/to/dir        # Create nested directories
```bash

### Copying and Moving

```bash
cp source dest              # Copy file
cp -r source_dir dest_dir   # Copy directory recursively
mv old_name new_name        # Rename/move file
```bash

### Deleting

```bash
rm file.txt                 # Remove file
rm -r directory             # Remove directory recursively
rm -rf directory            # Force remove (be careful!)
rmdir empty_dir             # Remove empty directory
```bash

### Viewing Files

```bash
cat file.txt                # Display entire file
less file.txt               # View file (paginated)
head file.txt               # First 10 lines
head -n 20 file.txt         # First 20 lines
tail file.txt               # Last 10 lines
tail -f log.txt             # Follow file (live updates)
```bash

### Searching

```bash
find . -name "*.txt"        # Find files by name
find . -type f -mtime -7    # Files modified in last 7 days
grep "pattern" file.txt     # Search in file
grep -r "pattern" .         # Recursive search
grep -i "pattern" file      # Case-insensitive search
```bash

---

## Text Processing

### grep - Search Text

```bash
grep "error" logfile.txt             # Find lines with "error"
grep -v "error" logfile.txt          # Exclude lines with "error"
grep -n "error" logfile.txt          # Show line numbers
grep -c "error" logfile.txt          # Count matches
grep -E "error|warning" file.txt     # Multiple patterns
```bash

### sed - Stream Editor

```bash
sed 's/old/new/' file.txt            # Replace first occurrence
sed 's/old/new/g' file.txt           # Replace all occurrences
sed -i 's/old/new/g' file.txt        # Edit file in-place
sed -n '10,20p' file.txt             # Print lines 10-20
sed '/pattern/d' file.txt            # Delete lines matching pattern
```bash

### awk - Pattern Scanning

```bash
awk '{print $1}' file.txt            # Print first column
awk '{print $1, $3}' file.txt        # Print columns 1 and 3
awk '/pattern/ {print $0}' file.txt  # Print lines matching pattern
awk '{sum+=$1} END {print sum}'      # Sum first column
```bash

### cut - Extract Columns

```bash
cut -d',' -f1 file.csv               # First field (comma delimiter)
cut -d':' -f1,3 /etc/passwd          # Fields 1 and 3
cut -c1-10 file.txt                  # Characters 1-10
```bash

### sort and uniq

```bash
sort file.txt                        # Sort lines
sort -r file.txt                     # Reverse sort
sort -n file.txt                     # Numeric sort
sort -u file.txt                     # Sort and remove duplicates
uniq file.txt                        # Remove consecutive duplicates
sort file.txt | uniq -c              # Count occurrences
```bash

---

## Variables and Data Types

### Variable Assignment

```bash
# No spaces around =
name="John"
age=25
path="/home/user"

# Using variables
echo $name
echo ${name}    # Safer, preferred
```bash

### Special Variables

```bash
$0          # Script name
$1, $2, ... # Positional parameters
$#          # Number of arguments
$@          # All arguments as separate words
$*          # All arguments as single word
$?          # Exit status of last command
$$          # Process ID of current shell
$!          # Process ID of last background command
```bash

### Environment Variables

```bash
export VAR="value"      # Export variable to child processes
echo $PATH              # Command search path
echo $HOME              # User home directory
echo $USER              # Current username
echo $PWD               # Current directory
```bash

### Arrays

```bash
# Indexed arrays
fruits=("apple" "banana" "cherry")
echo ${fruits[0]}               # First element
echo ${fruits[@]}               # All elements
echo ${#fruits[@]}              # Array length

# Add element
fruits+=("date")

# Associative arrays (Bash 4+)
declare -A person
person[name]="John"
person[age]=30
echo ${person[name]}
```bash

### Command Substitution

```bash
current_date=$(date)
files=$(ls)
num_files=$(ls | wc -l)

# Old syntax (backticks)
current_date=`date`
```bash

### Arithmetic

```bash
# Using $(( ))
result=$((5 + 3))
result=$((10 * 2))
result=$((100 / 5))
((count++))

# Using let
let result=5+3
let "result = 5 + 3"

# Using expr (older)
result=$(expr 5 + 3)
```text

---

## Control Structures

### If Statements

```bash
if [ condition ]; then
    # commands
elif [ another_condition ]; then
    # commands
else
    # commands
fi
```bash

### Test Conditions

```bash
# File tests
[ -e file ]     # Exists
[ -f file ]     # Regular file
[ -d dir ]      # Directory
[ -r file ]     # Readable
[ -w file ]     # Writable
[ -x file ]     # Executable

# String tests
[ -z "$str" ]   # Empty string
[ -n "$str" ]   # Non-empty string
[ "$a" = "$b" ] # Equal
[ "$a" != "$b" ]# Not equal

# Numeric tests
[ $a -eq $b ]   # Equal
[ $a -ne $b ]   # Not equal
[ $a -lt $b ]   # Less than
[ $a -le $b ]   # Less or equal
[ $a -gt $b ]   # Greater than
[ $a -ge $b ]   # Greater or equal

# Logical operators
[ condition1 ] && [ condition2 ]  # AND
[ condition1 ] || [ condition2 ]  # OR
[ ! condition ]                    # NOT
```bash

### Case Statements

```bash
case $variable in
    pattern1)
        # commands
        ;;
    pattern2|pattern3)
        # commands
        ;;
    *)
        # default
        ;;
esac
```bash

### For Loops

```bash
# Iterate over list
for item in apple banana cherry; do
    echo $item
done

# C-style for loop
for ((i=0; i<10; i++)); do
    echo $i
done

# Iterate over files
for file in *.txt; do
    echo "Processing $file"
done

# Iterate over array
for fruit in "${fruits[@]}"; do
    echo $fruit
done
```bash

### While Loops

```bash
counter=0
while [ $counter -lt 5 ]; do
    echo $counter
    ((counter++))
done

# Read file line by line
while read line; do
    echo $line
done < file.txt
```bash

### Until Loops

```bash
counter=0
until [ $counter -eq 5 ]; do
    echo $counter
    ((counter++))
done
```bash

---

## Functions

### Defining Functions

```bash
# Method 1
function greet() {
    echo "Hello, $1!"
}

# Method 2 (preferred)
greet() {
    echo "Hello, $1!"
}

# Call function
greet "World"
```bash

### Function Arguments

```bash
add_numbers() {
    local num1=$1
    local num2=$2
    local result=$((num1 + num2))
    echo $result
}

sum=$(add_numbers 5 3)
echo "Sum: $sum"
```text

### Return Values

```bash
is_even() {
    if [ $(($1 % 2)) -eq 0 ]; then
        return 0  # Success (true)
    else
        return 1  # Failure (false)
    fi
}

if is_even 4; then
    echo "Even number"
fi
```text

---

## Input/Output and Redirection

### Reading Input

```bash
# Simple read
read name
echo "Hello, $name"

# With prompt
read -p "Enter your name: " name

# Read password (hidden)
read -s -p "Password: " password

# Read with timeout
read -t 5 -p "Quick! Enter something: " response
```text

### Output Redirection

```bash
command > file          # Redirect stdout (overwrite)
command >> file         # Redirect stdout (append)
command 2> file         # Redirect stderr
command &> file         # Redirect both stdout and stderr
command 2>&1            # Redirect stderr to stdout
command > /dev/null     # Discard output
```bash

### Input Redirection

```bash
command < file          # Read from file
command << EOF          # Here document
multi-line content
EOF
```bash

### Pipes

```bash
command1 | command2     # Pipe stdout of cmd1 to stdin of cmd2
ls -l | grep ".txt"     # Find .txt files
ps aux | grep firefox   # Find Firefox processes
```bash

---

## Advanced Features

### Process Management

```bash
command &               # Run in background
jobs                    # List background jobs
fg %1                   # Bring job 1 to foreground
bg %1                   # Resume job 1 in background
kill %1                 # Kill job 1
kill -9 PID             # Force kill process
```bash

### Brace Expansion

```bash
echo {1..10}                    # 1 2 3 4 5 6 7 8 9 10
echo {a..z}                     # a b c ... z
echo file{1..3}.txt             # file1.txt file2.txt file3.txt
mkdir -p project/{src,bin,doc}  # Create multiple directories
```bash

### Parameter Expansion

```bash
${var:-default}         # Use default if var is unset
${var:=default}         # Assign default if var is unset
${var:?error}           # Display error if var is unset
${var:+value}           # Use value if var is set
${#var}                 # Length of var
${var:offset:length}    # Substring
${var#pattern}          # Remove shortest match from start
${var##pattern}         # Remove longest match from start
${var%pattern}          # Remove shortest match from end
${var%%pattern}         # Remove longest match from end
${var/pattern/string}   # Replace first match
${var//pattern/string}  # Replace all matches
```bash

### Aliases

```bash
alias ll='ls -lah'
alias ..='cd ..'
alias update='sudo apt update && sudo apt upgrade'
unalias ll              # Remove alias
```bash

---

## Best Practices

### 1. Use ShellCheck

Install and use ShellCheck to catch common errors:

```bash
shellcheck script.sh
```bash

### 2. Quote Variables

```bash
# Bad
rm $file

# Good
rm "$file"
```bash

### 3. Use `set` Options

```bash
set -e          # Exit on error
set -u          # Error on undefined variable
set -o pipefail # Pipe fails if any command fails
set -x          # Debug mode (print commands)

# Combine them
set -euo pipefail
```bash

### 4. Check Command Success

```bash
if ! command; then
    echo "Command failed"
    exit 1
fi

# Or
command || { echo "Failed"; exit 1; }
```bash

### 5. Use Functions

Break scripts into reusable functions for better organization.

### 6. Add Comments

Document your code:

```bash
# This function processes user input
process_input() {
    # Implementation
}
```bash

### 7. Use Meaningful Names

```bash
# Bad
x=10

# Good
max_retries=10
```bash

---

## Debugging

### Enable Debug Mode

```bash
bash -x script.sh           # Run with debug output
set -x                      # Enable in script
set +x                      # Disable in script
```bash

### Echo Debugging

```bash
echo "DEBUG: variable = $variable"
```bash

### Check Exit Codes

```bash
command
echo "Exit code: $?"
```bash

### Trap Errors

```bash
trap 'echo "Error on line $LINENO"' ERR
```bash

### Validate Syntax

```bash
bash -n script.sh           # Check syntax without running
```bash

---

## Useful One-Liners

```bash
# Find largest files
find . -type f -exec du -h {} + | sort -rh | head -n 10

# Count files by extension
find . -type f | sed 's/.*\.//' | sort | uniq -c

# Monitor file changes
watch -n 2 'ls -lh file.txt'

# Quick HTTP server
python3 -m http.server 8000

# Create backup with timestamp
cp file.txt file.txt.$(date +%Y%m%d_%H%M%S)

# Find and replace in multiple files
find . -name "*.txt" -exec sed -i 's/old/new/g' {} +
```bash

---

## Resources

- **Official Documentation**: [GNU Bash Manual](https://www.gnu.org/software/bash/manual/)
- **ShellCheck**: [shellcheck.net](https://www.shellcheck.net/)
- **Bash Guide**: [mywiki.wooledge.org](https://mywiki.wooledge.org/BashGuide)
- **Advanced Bash-Scripting Guide**: [tldp.org](https://tldp.org/LDP/abs/html/)

---

**Next Steps**: Practice with the [Questions](Questions/) to reinforce your learning!

