# Bash

Bash (Bourne Again Shell) is a Unix shell and command language written by Brian Fox for the GNU Project as a free software replacement for the Bourne shell. First released in 1989, it has become the default shell for most Linux distributions and was the default on macOS prior to Catalina. Bash is both a **command interpreter** — providing a text interface to the operating system — and a **scripting language** for automating tasks.

---

## Table of Contents

1. [Why Learn Bash?](#why-learn-bash)
2. [Bash vs Other Shells](#bash-vs-other-shells)
3. [History and Evolution](#history-and-evolution)
4. [Installation](#installation)
5. [Getting Started](#getting-started)
6. [Basic Commands](#basic-commands)
7. [File and Directory Operations](#file-and-directory-operations)
8. [Text Processing](#text-processing)
9. [Variables and Data Types](#variables-and-data-types)
10. [Control Structures](#control-structures)
11. [Functions](#functions)
12. [Input / Output and Redirection](#input--output-and-redirection)
13. [Advanced Features](#advanced-features)
14. [Error Handling](#error-handling)
15. [Debugging](#debugging)
16. [Best Practices](#best-practices)
17. [Useful One-Liners](#useful-one-liners)
18. [Resources](#resources)

---

## Why Learn Bash?

### Universal Availability

Bash is pre-installed on virtually all Linux distributions and macOS. On Windows it is available through WSL (Windows Subsystem for Linux), Git Bash, and Cygwin.

### Automation and Productivity

Bash scripts let you automate repetitive tasks, reducing human error. From simple file operations to complex system administration, Bash handles it all.

### System Administration

System administrators rely on Bash for managing servers, deploying applications, monitoring systems, and performing maintenance.

### DevOps and CI/CD

Bash is integral to DevOps workflows:

- Build automation and deployment scripts
- Configuration management
- Container orchestration
- CI/CD pipeline steps

### Data Processing

Bash excels at text processing and composes naturally with `grep`, `sed`, `awk`, `cut`, and `sort` to manipulate and analyse data efficiently.

---

## Bash vs Other Shells

| Shell | Description | Key Differences |
|---|---|---|
| **sh** (Bourne Shell) | Original Unix shell | Bash is a superset of sh, adding many features |
| **zsh** (Z Shell) | Extended Bourne shell | Richer completion, theming, and plugin ecosystem |
| **fish** | Friendly Interactive Shell | Great defaults and UX; non-POSIX syntax |
| **ksh** (Korn Shell) | AT&T Bell Labs shell | Similar feature set, different implementation |
| **csh / tcsh** | C Shell | C-like syntax; rarely used for scripting |

---

## History and Evolution

| Year | Event |
|---|---|
| 1971 | Thompson shell — the first Unix shell |
| 1977 | Bourne shell (sh) — Stephen Bourne's improved shell |
| 1989 | **Bash 1.0** — Brian Fox releases it for the GNU Project |
| 1996 | Bash 2.0 — arrays and other features added |
| 2004 | Bash 3.0 — improved internationalization |
| 2009 | Bash 4.0 — associative arrays, better globbing |
| 2019 | Bash 5.0 — improved variable expansion and misc enhancements |

---

## Installation

### Linux

Bash comes pre-installed on most distributions. Verify with:

```bash
bash --version
```

Install or update if needed:

```bash
# Debian / Ubuntu
sudo apt update && sudo apt install bash

# RHEL / CentOS / Fedora
sudo dnf install bash

# Arch Linux
sudo pacman -S bash
```

### macOS

Bash ships with macOS but Catalina and later default to zsh. To switch:

```bash
# Check installed version
bash --version

# Install the latest via Homebrew
brew install bash

# Add to allowed shells and set as default
echo "$(brew --prefix)/bin/bash" | sudo tee -a /etc/shells
chsh -s "$(brew --prefix)/bin/bash"
```

### Windows

**Option 1 — WSL (recommended)**

```powershell
wsl --install
```

**Option 2 — Git Bash**: download from [git-scm.com](https://git-scm.com)

**Option 3 — Cygwin**: download from [cygwin.com](https://www.cygwin.com)

---

## Getting Started

### Starting Bash

```bash
bash              # Open a new Bash session
bash script.sh    # Run a script directly
```

### Your First Script

Create `hello.sh`:

```bash
#!/usr/bin/env bash
# A simple greeting script

echo "Hello, World!"
echo "Current user: $USER"
echo "Current directory: $PWD"
```

Make it executable and run it:

```bash
chmod +x hello.sh
./hello.sh
```

### The Shebang Line

The first line tells the kernel which interpreter to use:

```bash
#!/bin/bash          # Absolute path to Bash
#!/usr/bin/env bash  # Portable — finds Bash in PATH (preferred)
#!/bin/sh            # POSIX sh (not necessarily Bash)
```

### Checking Your Shell

```bash
echo $SHELL          # Default login shell
echo $BASH_VERSION   # Current Bash version
ps -p $$             # Process name of the current shell
```

---

## Basic Commands

### Navigation

```bash
pwd               # Print working directory
cd /path/to/dir   # Change to absolute path
cd ~              # Go to home directory
cd ..             # Go up one level
cd -              # Return to previous directory
ls                # List files
ls -lah           # Long format, all files, human-readable sizes
```

### File Information

```bash
file filename     # Determine file type
stat filename     # Detailed metadata (size, timestamps, permissions)
wc -l file.txt    # Count lines
wc -w file.txt    # Count words
```

### Getting Help

```bash
man command       # Full manual page
command --help    # Quick help
info command      # GNU info documentation
which command     # Show path of executable
type command      # Whether it is a builtin, alias, or file
```

---

## File and Directory Operations

### Creating Files and Directories

```bash
touch file.txt            # Create an empty file (or update timestamp)
mkdir dir                 # Create a directory
mkdir -p path/to/dir      # Create nested directories in one go
```

### Copying and Moving

```bash
cp source dest                  # Copy a file
cp -r source_dir dest_dir       # Copy a directory recursively
cp -p source dest               # Preserve timestamps and permissions
mv old_name new_name            # Rename or move a file
mv *.log /var/log/archive/      # Move multiple files
```

### Deleting

```bash
rm file.txt             # Remove a file
rm -r directory         # Remove a directory recursively
rm -rf directory        # Force-remove without prompts (use carefully)
rmdir empty_dir         # Remove an empty directory only
```

### Viewing File Contents

```bash
cat file.txt            # Print entire file
less file.txt           # Paginated viewer (q to quit)
head file.txt           # First 10 lines
head -n 20 file.txt     # First N lines
tail file.txt           # Last 10 lines
tail -n 20 file.txt     # Last N lines
tail -f app.log         # Stream new lines in real time
```

### Permissions

```bash
chmod +x script.sh          # Add execute permission
chmod 644 file.txt          # rw-r--r--
chmod 755 script.sh         # rwxr-xr-x
chown user:group file.txt   # Change owner and group
ls -l                       # View permissions in long format
```

### Searching

```bash
find . -name "*.txt"              # Find by name
find . -type f -mtime -7          # Modified in the last 7 days
find . -size +10M                 # Files larger than 10 MB
find . -name "*.log" -delete      # Find and delete
grep "pattern" file.txt           # Search within a file
grep -r "pattern" ./src           # Recursive search
grep -i "pattern" file            # Case-insensitive
grep -l "pattern" *.txt           # List matching filenames only
```

---

## Text Processing

### grep — Search Text

```bash
grep "error" app.log                    # Lines containing "error"
grep -v "debug" app.log                 # Lines NOT containing "debug"
grep -n "error" app.log                 # Show line numbers
grep -c "error" app.log                 # Count matching lines
grep -A 3 "error" app.log              # 3 lines after each match
grep -B 2 "error" app.log              # 2 lines before each match
grep -E "error|warning|critical" app.log  # Extended regex
```

### sed — Stream Editor

```bash
sed 's/foo/bar/' file.txt             # Replace first occurrence per line
sed 's/foo/bar/g' file.txt            # Replace all occurrences
sed -i 's/foo/bar/g' file.txt         # Edit file in-place
sed -n '10,20p' file.txt              # Print lines 10–20
sed '/^#/d' file.txt                  # Delete comment lines
sed '/^$/d' file.txt                  # Delete blank lines
sed 's/^/  /' file.txt                # Indent every line by 2 spaces
```

### awk — Pattern Scanning and Processing

```bash
awk '{print $1}' file.txt             # Print first field
awk '{print $1, $NF}' file.txt        # First and last field
awk -F: '{print $1}' /etc/passwd      # Custom field separator
awk '/error/ {print $0}' app.log      # Print lines matching pattern
awk '{sum += $1} END {print sum}'     # Sum a column
awk 'NR==5' file.txt                  # Print line 5
awk 'NF > 3' file.txt                 # Lines with more than 3 fields
```

### cut — Extract Fields

```bash
cut -d',' -f1 data.csv                # First CSV field
cut -d':' -f1,3 /etc/passwd           # Fields 1 and 3 (colon-delimited)
cut -c1-10 file.txt                   # Characters 1–10 of each line
```

### sort and uniq

```bash
sort file.txt                  # Alphabetical sort
sort -r file.txt               # Reverse sort
sort -n numbers.txt            # Numeric sort
sort -k2 data.txt              # Sort by second field
sort -u file.txt               # Sort and remove duplicates
uniq file.txt                  # Remove consecutive duplicates
sort file.txt | uniq -c        # Count occurrences
sort file.txt | uniq -d        # Show only duplicates
```

### tr — Translate Characters

```bash
echo "hello" | tr 'a-z' 'A-Z'    # Uppercase
echo "a:b:c" | tr ':' ','        # Replace colons with commas
echo "hello  world" | tr -s ' '  # Squeeze repeated spaces
cat file.txt | tr -d '\r'        # Remove Windows carriage returns
```

---

## Variables and Data Types

### Assignment and Usage

```bash
# No spaces around =
name="Alice"
age=30
path="/home/alice"

echo $name            # Basic expansion
echo "${name}"        # Explicit — preferred inside strings
echo "Hello, ${name}!"
```

### Special Variables

```bash
$0          # Script name / path
$1 ... $9   # Positional parameters
${10}       # Positional parameter 10+
$#          # Number of arguments passed
$@          # All arguments as separate quoted words
$*          # All arguments as a single word
$?          # Exit status of the last command
$$          # PID of the current shell
$!          # PID of the last background command
$-          # Current shell option flags
```

### Environment Variables

```bash
export DATABASE_URL="postgres://localhost/mydb"   # Visible to child processes
printenv                                           # List all environment variables
echo $PATH                                         # Search path for executables
echo $HOME                                         # Home directory
echo $USER                                         # Current username
echo $HOSTNAME                                     # Machine hostname
unset DATABASE_URL                                 # Remove a variable
```

### String Operations

```bash
str="Hello, World!"

echo ${#str}                  # Length: 13
echo ${str:7}                 # Substring from index 7: "World!"
echo ${str:7:5}               # Substring, length 5: "World"
echo ${str/World/Bash}        # Replace first match: "Hello, Bash!"
echo ${str//l/L}              # Replace all matches: "HeLLo, WorLd!"
echo ${str,,}                 # Lowercase (Bash 4+)
echo ${str^^}                 # Uppercase (Bash 4+)
echo ${str#Hello, }           # Remove prefix: "World!"
echo ${str%!}                 # Remove suffix: "Hello, World"
```

### Parameter Expansion Defaults

```bash
${var:-default}     # Use default if var is unset or empty
${var:=default}     # Assign default to var if unset or empty, then use it
${var:?message}     # Print message and exit if var is unset or empty
${var:+replacement} # Use replacement only if var is set (otherwise empty)
```

### Arrays

```bash
# Indexed array
fruits=("apple" "banana" "cherry")
echo "${fruits[0]}"           # First element
echo "${fruits[-1]}"          # Last element (Bash 4.3+)
echo "${fruits[@]}"           # All elements
echo "${#fruits[@]}"          # Number of elements
fruits+=("date")              # Append an element
unset fruits[1]               # Remove element at index 1

# Iterate
for fruit in "${fruits[@]}"; do
    echo "$fruit"
done

# Associative array (Bash 4+)
declare -A config
config[host]="localhost"
config[port]="5432"
echo "${config[host]}"
echo "${!config[@]}"          # All keys
```

### Command Substitution

```bash
today=$(date +%Y-%m-%d)
lines=$(wc -l < file.txt)
upper=$(echo "$name" | tr '[:lower:]' '[:upper:]')
```

### Arithmetic

```bash
result=$(( 5 + 3 ))
result=$(( 10 * (4 - 1) ))
result=$(( 100 / 4 ))
result=$(( 7 % 3 ))       # Modulo
(( count++ ))
(( total += 10 ))

# Floating point requires bc or awk
pi=$(echo "scale=4; 22/7" | bc)
avg=$(awk "BEGIN {printf \"%.2f\", $sum/$count}")
```

---

## Control Structures

### If / Elif / Else

```bash
if [[ "$1" == "start" ]]; then
    echo "Starting service..."
elif [[ "$1" == "stop" ]]; then
    echo "Stopping service..."
else
    echo "Usage: $0 {start|stop}"
    exit 1
fi
```

### Test Operators

```bash
# File tests
[[ -e "$file" ]]      # Exists
[[ -f "$file" ]]      # Regular file
[[ -d "$path" ]]      # Directory
[[ -r "$file" ]]      # Readable
[[ -w "$file" ]]      # Writable
[[ -x "$file" ]]      # Executable
[[ -s "$file" ]]      # Non-empty file
[[ -L "$file" ]]      # Symbolic link

# String tests
[[ -z "$str" ]]           # Empty string
[[ -n "$str" ]]           # Non-empty string
[[ "$a" == "$b" ]]        # Equal
[[ "$a" != "$b" ]]        # Not equal
[[ "$str" == *pattern* ]] # Glob match

# Numeric tests
(( a == b ))    # Equal
(( a != b ))    # Not equal
(( a < b ))     # Less than
(( a <= b ))    # Less or equal
(( a > b ))     # Greater than
(( a >= b ))    # Greater or equal

# Logical
[[ cond1 && cond2 ]]    # AND
[[ cond1 || cond2 ]]    # OR
[[ ! cond ]]            # NOT
```

> **Tip:** Prefer `[[ ]]` over `[ ]` in Bash scripts — it handles empty variables safely and supports `&&`, `||`, and glob matching natively.

### Case Statements

```bash
case "$os" in
    linux*)
        echo "Linux detected"
        ;;
    darwin*)
        echo "macOS detected"
        ;;
    msys*|cygwin*)
        echo "Windows (Git Bash / Cygwin)"
        ;;
    *)
        echo "Unknown OS: $os"
        exit 1
        ;;
esac
```

### For Loops

```bash
# List iteration
for color in red green blue; do
    echo "$color"
done

# Range
for i in {1..10}; do
    echo "$i"
done

# Range with step
for i in {0..20..5}; do
    echo "$i"
done

# C-style
for (( i=0; i<5; i++ )); do
    echo "$i"
done

# Iterate over files
for file in /var/log/*.log; do
    echo "Processing: $file"
done

# Iterate over array
for item in "${array[@]}"; do
    echo "$item"
done
```

### While and Until Loops

```bash
# While: loop while condition is true
counter=0
while (( counter < 5 )); do
    echo "$counter"
    (( counter++ ))
done

# Read lines from a file
while IFS= read -r line; do
    echo "$line"
done < input.txt

# Read from command output
while IFS= read -r user; do
    echo "User: $user"
done < <(cut -d: -f1 /etc/passwd)

# Until: loop until condition becomes true
attempts=0
until ping -c1 google.com &>/dev/null; do
    (( attempts++ ))
    echo "Attempt $attempts — waiting..."
    sleep 2
done
echo "Connected!"
```

### Loop Control

```bash
for i in {1..10}; do
    [[ "$i" -eq 5 ]] && continue   # Skip 5
    [[ "$i" -eq 8 ]] && break      # Stop at 8
    echo "$i"
done
```

---

## Functions

### Defining and Calling

```bash
# Preferred syntax
greet() {
    local name="${1:-World}"
    echo "Hello, ${name}!"
}

greet              # Hello, World!
greet "Alice"      # Hello, Alice!
```

### Local Variables

Always use `local` inside functions to avoid polluting the global scope:

```bash
calculate() {
    local num1=$1
    local num2=$2
    local result=$(( num1 + num2 ))
    echo "$result"
}

sum=$(calculate 12 8)
echo "Sum: $sum"     # Sum: 20
```

### Return Values

Functions return exit codes (0 = success, 1–255 = error). To return data, print to stdout and capture with `$()`:

```bash
get_timestamp() {
    date +"%Y-%m-%d %H:%M:%S"
}

is_even() {
    (( $1 % 2 == 0 ))
}

timestamp=$(get_timestamp)
echo "Time: $timestamp"

if is_even 42; then
    echo "Even"
fi
```

### Passing Arrays (Bash 4.3+)

```bash
print_items() {
    local -n arr=$1    # nameref
    for item in "${arr[@]}"; do
        echo "  - $item"
    done
}

fruits=("apple" "banana" "cherry")
print_items fruits
```

---

## Input / Output and Redirection

### Reading User Input

```bash
read -p "Enter your name: " name
read -s -p "Password: " password; echo
read -t 10 -p "You have 10 seconds: " answer || echo "Timed out"
read -a words -p "Enter words: "         # Read into array
```

### Output Redirection

```bash
echo "output" > file.txt        # Overwrite stdout to file
echo "output" >> file.txt       # Append stdout to file
command 2> errors.txt           # Redirect stderr
command &> all.txt              # Redirect stdout and stderr
command 2>&1 | tee output.txt   # stderr to stdout, then tee to file
command > /dev/null 2>&1        # Discard all output
```

### Input Redirection

```bash
command < input.txt             # Feed file as stdin
command <<< "inline string"     # Here-string
```

### Heredocs

Pass multi-line text to a command as stdin:

```bash
cat <<EOF
Server: $HOSTNAME
Date:   $(date)
User:   $USER
EOF
```

Use a quoted delimiter to prevent variable expansion:

```bash
cat <<'EOF'
This is literal: $HOME and $(hostname)
EOF
```

### Pipes and Process Substitution

```bash
# Pipe
ps aux | grep nginx | grep -v grep

# Process substitution — treat command output as a file
diff <(sort file1.txt) <(sort file2.txt)
while IFS= read -r line; do echo "$line"; done < <(ls -1)
```

---

## Advanced Features

### Brace Expansion

```bash
echo {1..5}                        # 1 2 3 4 5
echo {a..e}                        # a b c d e
echo {01..05}                      # 01 02 03 04 05
echo file{A,B,C}.txt               # fileA.txt fileB.txt fileC.txt
mkdir -p project/{src,tests,docs,bin}
cp config.yaml config.yaml.{bak,$(date +%F)}
```

### Process Management

```bash
command &                  # Run in background
jobs                       # List background jobs
fg %1                      # Bring job 1 to foreground
bg %1                      # Resume job 1 in background
wait                       # Wait for all background jobs
wait $pid                  # Wait for a specific PID
disown %1                  # Detach job (survives shell logout)
kill %1                    # Send SIGTERM to job 1
kill -9 $pid               # Force kill (SIGKILL)
nohup command &            # Run immune to hangup signal
```

### Traps and Signals

```bash
cleanup() {
    echo "Cleaning up temp files..."
    rm -f "$tmpfile"
}
trap cleanup EXIT           # Always run on exit

trap 'echo "Interrupted"; exit 130' INT TERM

tmpfile=$(mktemp)
echo "Working with $tmpfile"
```

### Aliases

```bash
alias ll='ls -lah --color=auto'
alias la='ls -A'
alias ..='cd ..'
alias ...='cd ../..'
alias grep='grep --color=auto'
alias df='df -h'
alias update='sudo apt update && sudo apt upgrade -y'

unalias ll                  # Remove specific alias
```

Put aliases in `~/.bashrc` to make them permanent.

### Full Parameter Expansion Reference

```bash
${var:-default}           # Value of var, or default if unset/empty
${var:=default}           # Assign default to var if unset/empty
${var:?message}           # Error and exit if var is unset/empty
${var:+replacement}       # Use replacement if var is set
${#var}                   # String length
${var:offset}             # Substring from offset
${var:offset:length}      # Substring slice
${var#pattern}            # Remove shortest prefix match
${var##pattern}           # Remove longest prefix match
${var%pattern}            # Remove shortest suffix match
${var%%pattern}           # Remove longest suffix match
${var/pattern/string}     # Replace first match
${var//pattern/string}    # Replace all matches
${var^}                   # Uppercase first character
${var^^}                  # Uppercase all characters
${var,}                   # Lowercase first character
${var,,}                  # Lowercase all characters
```

---

## Error Handling

### Strict Mode

Add this at the top of every non-trivial script:

```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```

| Option | Effect |
|---|---|
| `-e` | Exit immediately if any command returns non-zero |
| `-u` | Treat unset variables as errors |
| `-o pipefail` | A pipeline fails if any stage in it fails |
| `IFS=$'\n\t'` | Safer word splitting — protects against space-split bugs |

### Checking Exit Codes

```bash
# Explicit check
if ! git commit -m "update"; then
    echo "Commit failed" >&2
    exit 1
fi

# Inline guard
cp source.txt dest.txt || { echo "Copy failed" >&2; exit 1; }

# Using $?
command
if [[ $? -ne 0 ]]; then
    echo "Command failed with exit $?" >&2
fi
```

### Custom Error Function

```bash
die() {
    echo "ERROR: $*" >&2
    exit 1
}

[[ -f "$config" ]] || die "Config file not found: $config"
```

### Trapping Errors

```bash
set -e

on_error() {
    echo "Error on line $LINENO — exit code $?" >&2
}
trap on_error ERR
```

---

## Debugging

### Running a Script in Debug Mode

```bash
bash -x script.sh     # Print each command before executing
bash -n script.sh     # Check syntax without running
bash -v script.sh     # Print each line as it is read
```

### Inline Debug Toggle

```bash
set -x    # Turn on tracing
# ... suspect code ...
set +x    # Turn off tracing
```

### Checking Variable Values

```bash
echo "DEBUG [$LINENO]: var=${var}" >&2

# Dump all attributes and value
declare -p var_name
```

### Trace with Source Location

```bash
export PS4='+[${BASH_SOURCE}:${LINENO}]: '
set -x
```

---

## Best Practices

### 1. Use `[[ ]]` Over `[ ]`

`[[ ]]` is safer — it handles empty variables without word-splitting and supports pattern matching.

### 2. Quote All Variable Expansions

```bash
# Dangerous — breaks on filenames with spaces
rm $file

# Safe
rm "$file"
```

### 3. Use `local` in Functions

```bash
process() {
    local tmpdir
    tmpdir=$(mktemp -d)
    # ...
}
```

### 4. Prefer `$(...)` Over Backticks

```bash
# Old — not nestable
result=`command`

# Preferred
result=$(command)
nested=$(echo $(date +%Y))
```

### 5. Print Errors to stderr

```bash
echo "Error: file not found" >&2
```

### 6. Use ShellCheck

Run [ShellCheck](https://www.shellcheck.net/) on every script before committing:

```bash
shellcheck script.sh
```

### 7. Add a Script Header

```bash
#!/usr/bin/env bash
# script-name.sh — Brief description
# Usage: ./script-name.sh [OPTIONS] <arg>
# Author: Your Name
# Date:   2026-02-20
set -euo pipefail
```

### 8. Use Meaningful Names

```bash
# Unclear
x=10
t=$(date)

# Clear
max_retries=10
timestamp=$(date +%Y%m%d_%H%M%S)
```

---

## Useful One-Liners

```bash
# Find the 10 largest files under the current directory
find . -type f -exec du -h {} + | sort -rh | head -n 10

# Count files grouped by extension
find . -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn

# Copy file with a timestamped backup
cp -v config.yaml config.yaml.$(date +%F_%T)

# Find and replace a string across multiple files
find . -name "*.txt" -exec sed -i 's/old/new/g' {} +

# Show top 10 most-used commands from history
history | awk '{print $2}' | sort | uniq -c | sort -rn | head -10

# Strip blank lines and comments from a config file
grep -v '^\s*#' file.conf | grep -v '^\s*$'

# Quick HTTP server on port 8000
python3 -m http.server 8000

# Base64 encode / decode
echo "hello" | base64
echo "aGVsbG8K" | base64 --decode

# Batch rename — replace spaces with underscores
for f in *\ *; do mv "$f" "${f// /_}"; done

# Watch a command every 2 seconds
watch -n 2 'df -h'
```

---

## Resources

| Resource | URL |
|---|---|
| GNU Bash Manual | [gnu.org/software/bash/manual](https://www.gnu.org/software/bash/manual/) |
| ShellCheck (linter) | [shellcheck.net](https://www.shellcheck.net/) |
| Bash Hackers Wiki | [wiki.bash-hackers.org](https://wiki.bash-hackers.org/) |
| Wooledge Bash Guide | [mywiki.wooledge.org/BashGuide](https://mywiki.wooledge.org/BashGuide) |
| Wooledge Bash FAQ | [mywiki.wooledge.org/BashFAQ](https://mywiki.wooledge.org/BashFAQ) |
| Advanced Bash-Scripting Guide | [tldp.org/LDP/abs/html](https://tldp.org/LDP/abs/html/) |
| Bash Cheat Sheet (devhints) | [devhints.io/bash](https://devhints.io/bash) |

---

**Next Steps:** Practice with the [Questions](Questions/) to reinforce your learning!