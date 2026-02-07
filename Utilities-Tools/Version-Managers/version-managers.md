# Version Managers - Switching Environments with Ease

## Table of Contents
- [Introduction](#introduction)
  - [Why Version Managers Matter](#why-version-managers-matter)
  - [How They Work](#how-they-work)
- [Node.js Version Managers](#nodejs-version-managers)
  - [nvm (Node Version Manager)](#nvm-node-version-manager)
  - [nvm-windows](#nvm-windows)
  - [fnm (Fast Node Manager)](#fnm-fast-node-manager)
  - [n (Simple Node Manager)](#n-simple-node-manager)
  - [volta](#volta)
- [Python Version Managers](#python-version-managers)
  - [pyenv](#pyenv)
  - [pyenv-virtualenv](#pyenv-virtualenv)
  - [conda/miniconda](#condaminiconda)
- [Ruby Version Managers](#ruby-version-managers)
  - [rbenv](#rbenv)
  - [rvm (Ruby Version Manager)](#rvm-ruby-version-manager)
  - [chruby](#chruby)
- [Java/JVM Version Managers](#javajvm-version-managers)
  - [jEnv](#jenv)
  - [SDKMAN](#sdkman)
  - [Jabba](#jabba)
- [Go Version Managers](#go-version-managers)
  - [gvm (Go Version Manager)](#gvm-go-version-manager)
  - [g (Simple Go Manager)](#g-simple-go-manager)
- [PHP Version Managers](#php-version-managers)
  - [phpenv](#phpenv)
  - [phpbrew](#phpbrew)
- [Rust Version Manager](#rust-version-manager)
  - [rustup](#rustup)
- [.NET Version Manager](#net-version-manager)
  - [dotnet (Built-in)](#dotnet-built-in)
- [Universal Version Managers](#universal-version-managers)
  - [asdf](#asdf)
  - [mise (formerly rtx)](#mise-formerly-rtx)
- [Advanced Usage](#advanced-usage)
  - [Project-Specific Versions](#project-specific-versions)
  - [IDE Integration](#ide-integration)
  - [CI/CD Integration](#cicd-integration)
  - [Performance Optimization](#performance-optimization)
- [Comparison Table](#comparison-table)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Real-World Use Cases](#real-world-use-cases)
- [Resources](#resources)

---

## Introduction

In professional development, you often work on multiple projects simultaneously. Project A might need Node.js v14, while Project B uses Node.js v20. Installing these globally causes conflicts. **Version Managers** solve this by allowing you to install multiple versions and switch between them instantly.

### Why Version Managers Matter

1. **Avoid Dependency Hell**: Different projects require different runtime versions
2. **Team Consistency**: Everyone on the team uses the exact same version
3. **Testing Across Versions**: Easily test your code against multiple runtime versions
4. **Legacy Support**: Maintain old projects without affecting new ones
5. **Security Updates**: Quickly switch to patched versions when vulnerabilities are discovered
6. **Performance Testing**: Compare performance across different runtime versions

### How They Work

Version managers typically:
1. **Download** and install multiple versions of a runtime
2. **Store** them in a dedicated directory (e.g., `~/.nvm`, `~/.pyenv`)
3. **Modify** environment variables (`PATH`, `JAVA_HOME`, etc.) to point to the selected version
4. **Switch** versions on-the-fly using shell commands or automatically via config files

**Common mechanisms:**
- **Shims**: Intercept commands and route to the correct version (pyenv, rbenv)
- **PATH manipulation**: Prepend the active version's bin directory to PATH (nvm)
- **Environment variables**: Set language-specific variables like `JAVA_HOME` (jenv)

---

## Node.js Version Managers

### nvm (Node Version Manager)
The standard for Unix systems. Most popular Node.js version manager.

**Installation**:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Or using wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Add to shell profile (~/.bashrc, ~/.zshrc)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

**Basic Usage**:
```bash
# List available versions
nvm ls-remote

# Install latest LTS
nvm install --lts

# Install specific version
nvm install 18.17.0
nvm install 20.10.0

# List installed versions
nvm ls

# Use a version
nvm use 18
nvm use 20.10.0

# Set default version
nvm alias default 18

# Use default version
nvm use default

# Check current version
nvm current

# Run command with specific version
nvm exec 18 node app.js

# Install and use .nvmrc file version
nvm install
nvm use
```

**Advanced Features**:
```bash
# Install latest NPM for current Node version
nvm install-latest-npm

# Uninstall a version
nvm uninstall 16.0.0

# Migrate packages from previous version
nvm install 20 --reinstall-packages-from=18

# Use system Node (if installed)
nvm use system

# Deactivate nvm (use system Node)
nvm deactivate

# Set default packages to install with each new Node version
echo "yarn" >> ~/.nvm/default-packages
echo "typescript" >> ~/.nvm/default-packages

# Use in CI/CD
nvm install && nvm use
npm ci
npm test
```

**.nvmrc file** (Project-specific version):
```bash
# Create .nvmrc in project root
echo "18.17.0" > .nvmrc

# Or LTS version
echo "lts/hydrogen" > .nvmrc

# Now just run:
cd /path/to/project
nvm use  # Reads .nvmrc automatically
```

**Auto-switching** (Add to shell profile):
```bash
# Auto-switch Node version when entering directory with .nvmrc
# Add to ~/.zshrc or ~/.bashrc
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

### nvm-windows
A separate project for Windows users.

**Installation**:
- **Download**: [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)
- Run the installer (nvm-setup.exe)

**Usage** (Similar to nvm):
```powershell
# List available versions
nvm list available

# Install specific version
nvm install 18.17.0
nvm install latest

# List installed versions
nvm list

# Use a version
nvm use 18.17.0

# Uninstall a version
nvm uninstall 16.0.0
```

**Configuration** (`%APPDATA%\nvm\settings.txt`):
```txt
root: C:\Users\YourName\AppData\Roaming\nvm
path: C:\Program Files\nodejs
arch: 64
proxy: none
```

### fnm (Fast Node Manager)
A faster alternative written in Rust. Cross-platform (Windows/Mac/Linux).

**Installation**:
```bash
# macOS/Linux (Homebrew)
brew install fnm

# Linux (curl)
curl -fsSL https://fnm.vercel.app/install | bash

# Windows (Scoop)
scoop install fnm

# Windows (Chocolatey)
choco install fnm
```

**Setup** (Add to shell profile):
```bash
# Bash
eval "$(fnm env --use-on-cd)"

# Zsh
eval "$(fnm env --use-on-cd)"

# Fish
fnm env --use-on-cd | source

# PowerShell
fnm env --use-on-cd | Out-String | Invoke-Expression
```

**Usage**:
```bash
# Install Node version
fnm install 20
fnm install 18.17.0

# Use version
fnm use 20

# Set default
fnm default 20

# List installed
fnm list

# Install from .node-version or .nvmrc
fnm install

# Auto-install and use
fnm use --install-if-missing 20
```

**Performance**: fnm is significantly faster than nvm:
- Install: ~2x faster
- Version switching: ~10x faster
- Shell startup: ~5x faster

### n (Simple Node Manager)
Minimalist Node.js version manager (no subshells).

**Installation**:
```bash
# Install n globally
npm install -g n

# Or via Homebrew
brew install n
```

**Usage**:
```bash
# Install latest
n latest

# Install LTS
n lts

# Install specific version
n 18.17.0

# List installed versions
n ls

# Remove a version
n rm 16.0.0

# Use specific version temporarily
n use 18 app.js

# Prune (remove all except current)
n prune
```

**Advantages**:
- Simpler than nvm (no shell integration needed)
- Faster switching (modifies symlinks)
- Works with fish shell out of the box

### volta
Hassle-free JavaScript tool manager with automatic version switching.

**Installation**:
```bash
# Unix
curl https://get.volta.sh | bash

# Windows
# Download and run installer from https://volta.sh
```

**Usage**:
```bash
# Install Node
volta install node
volta install node@18
volta install node@18.17.0

# Install package managers globally
volta install yarn
volta install pnpm

# Pin version to project (creates package.json volta field)
volta pin node@18
volta pin npm@9
volta pin yarn@3

# Volta automatically uses pinned versions when you cd into project
cd my-project  # Automatically switches to pinned version
```

**package.json integration**:
```json
{
  "volta": {
    "node": "18.17.0",
    "npm": "9.6.7",
    "yarn": "3.6.0"
  }
}
```

**Advantages**:
- Fastest version manager (written in Rust)
- Automatic switching based on project config
- Per-project tool versions (not just Node)
- No shell integration needed
- Works seamlessly on Windows

---

## Python Version Managers

### pyenv

**pyenv** lets you easily switch between multiple versions of Python.

**Installation (macOS)**:
```bash
brew install pyenv
```

**Installation (Linux)**:
```bash
curl https://pyenv.run | bash

# Add to ~/.bashrc or ~/.zshrc
export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

**Installation (Windows - pyenv-win)**:
```powershell
# PowerShell
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"
```

**Usage**:
```bash
# Update pyenv database
pyenv update

# List available versions
pyenv install --list
pyenv install --list | grep " 3\.[1-9]"  # Filter Python 3.x

# Install Python version
pyenv install 3.11.0
pyenv install 3.12.1
pyenv install 3.10.13

# List installed versions
pyenv versions

# Set global version (default)
pyenv global 3.11.0

# Set local version (creates .python-version file)
pyenv local 3.9.5

# Set shell version (current session only)
pyenv shell 3.12.1

# Check current version
pyenv version

# Uninstall a version
pyenv uninstall 3.8.0

# Rehash (rebuild shims after installing packages)
pyenv rehash
```

**Advanced Features**:
```bash
# Install multiple versions and use them together
pyenv install 3.10.0 3.11.0 3.12.0
pyenv global 3.11.0 3.10.0 3.12.0  # Priority: 3.11 first

# Show path to Python executable
pyenv which python
pyenv which pip

# Show all python commands
pyenv commands

# Set environment variables
export PYTHON_CONFIGURE_OPTS="--enable-optimizations"
pyenv install 3.11.0  # Optimized build

# Install with specific flags
CFLAGS="-O2" pyenv install 3.11.0
```

**.python-version file**:
```bash
# Create in project root
echo "3.11.0" > .python-version

# pyenv automatically switches when entering directory
cd /path/to/project  # Auto-activates Python 3.11.0
```

### pyenv-virtualenv
Plugin for pyenv that provides `pyenv virtualenv` command.

**Installation**:
```bash
# macOS
brew install pyenv-virtualenv

# Linux (if using pyenv-installer, already included)
git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv

# Add to shell profile
eval "$(pyenv virtualenv-init -)"
```

**Usage**:
```bash
# Create virtual environment
pyenv virtualenv 3.11.0 myproject-venv

# Activate
pyenv activate myproject-venv

# Deactivate
pyenv deactivate

# List virtualenvs
pyenv virtualenvs

# Delete virtualenv
pyenv uninstall myproject-venv

# Auto-activate based on directory
echo "myproject-venv" > .python-version
cd /path/to/project  # Auto-activates myproject-venv
```

### conda/miniconda
Package and environment manager for Python (and other languages).

**Installation**:
```bash
# Download Miniconda (lighter than full Anaconda)
# From https://docs.conda.io/en/latest/miniconda.html

# Linux/macOS
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# Initialize
conda init bash  # or zsh, fish, etc.
```

**Usage**:
```bash
# Create environment with specific Python version
conda create -n myenv python=3.11
conda create -n dataproject python=3.10 numpy pandas

# Activate environment
conda activate myenv

# Deactivate
conda deactivate

# List environments
conda env list

# Remove environment
conda remove -n myenv --all

# Export environment
conda env export > environment.yml

# Create from environment file
conda env create -f environment.yml

# Update conda
conda update conda

# List available Python versions
conda search python
```

**Why use conda over pyenv?**
- Better for data science (integrated with NumPy, SciPy, etc.)
- Handles binary dependencies (not just Python)
- Works on Windows without WSL
- Creates isolated environments (like venv + pyenv combined)

---

## Ruby Version Managers

### rbenv

Groom your app’s Ruby environment.

**Usage**:
```bash
rbenv install 3.2.2
rbenv global 3.2.2
```

---

## Java: jEnv

Java version management is notoriously difficult (JAVA_HOME path issues). **jEnv** simplifies this.
*Note: jEnv typically manages existing installations, it doesn't install Java for you (unlike nvm).*

```bash
# Add JDK
jenv add /Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home

# Set version
jenv global 17
```

---

## Universal: asdf

If you are tired of learning a new tool for every language (nvm for node, pyenv for python, rbenv for ruby), use **asdf**. It manages **everything**.

**Installation**:
```bash
brew install asdf
```

**Plugins**:
```bash
asdf plugin add nodejs
asdf plugin add python
```

**Usage**:
```bash
asdf install nodejs 20.5.0
asdf install python 3.11.4

asdf global nodejs 20.5.0
```

---

## Resources

-   [nvm (Unix)](https://github.com/nvm-sh/nvm)
-   [nvm-windows](https://github.com/coreybutler/nvm-windows)
-   [pyenv](https://github.com/pyenv/pyenv)
-   [asdf](https://asdf-vm.com/)
