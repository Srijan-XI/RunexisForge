# Version Managers - Switching Environments with Ease

## Table of Contents
- [Introduction](#introduction)
- [Node.js: nvm (Node Version Manager)](#nodejs-nvm)
  - [nvm (Linux/macOS)](#nvm-linuxmacos)
  - [nvm-windows](#nvm-windows)
  - [fnm (Fast Node Manager)](#fnm)
- [Python: pyenv](#python-pyenv)
- [Ruby: rbenv](#ruby-rbenv)
- [Java: jEnv](#java-jenv)
- [Universal: asdf](#universal-asdf)
- [Resources](#resources)

---

## Introduction

In professional development, you often work on multiple projects simultaneously. Project A might need Node.js v14, while Project B uses Node.js v20. Installing these globally causes conflicts. **Version Managers** solve this by allowing you to install multiple versions and switch between them instantly.

---

## Node.js: nvm

### nvm (Linux/macOS)
The standard for Unix systems.

**Installation**:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

**Usage**:
```bash
# Install latest node
nvm install node

# Install specific version
nvm install 18.17.0

# Use a version
nvm use 18

# Set default
nvm alias default 18
```

### nvm-windows
A separate project for Windows users.
-   **Download**: [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)
-   **Commands**: Similar to standard nvm (`nvm install 18`, `nvm use 18`).

### fnm (Fast Node Manager)
A faster alternative written in Rust. Cross-platform (Windows/Mac/Linux).

```bash
fnm install 20
fnm use 20
```

---

## Python: pyenv

**pyenv** lets you easily switch between multiple versions of Python.

**Installation (macOS)**:
```bash
brew install pyenv
```

**Usage**:
```bash
# List available versions
pyenv install --list

# Install Python 3.11.0
pyenv install 3.11.0

# Set global version
pyenv global 3.11.0

# Set local version (creates .python-version file)
pyenv local 3.9.5
```

---

## Ruby: rbenv

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
