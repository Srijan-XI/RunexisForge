# Package Managers - The Developer's Arsenal

## Table of Contents
- [Introduction](#introduction)
- [Node.js Ecosystem](#nodejs-ecosystem)
  - [npm (Node Package Manager)](#npm)
  - [Yarn](#yarn)
  - [pnpm](#pnpm)
  - [Comparison](#comparison-js)
- [Python Ecosystem](#python-ecosystem)
  - [pip](#pip)
  - [Poetry (Modern Alternative)](#poetry)
- [Rust Ecosystem](#rust-ecosystem)
  - [Cargo](#cargo)
- [System Package Managers](#system-package-managers)
  - [Homebrew (macOS/Linux)](#homebrew)
  - [Chocolatey / Winget (Windows)](#windows)
- [Resources](#resources)

---

## Introduction

**Package managers** automates the process of installing, upgrading, configuring, and removing computer programs. For developers, language-specific package managers are crucial for managing dependencies (libraries) efficiently.

---

## Node.js Ecosystem

JavaScript has a vibrant ecosystem with three major players.

### npm (Node Package Manager)
The default package manager for Node.js.
-   **Usage**: Comes installed with Node.js.
-   **Lockfile**: `package-lock.json`.

```bash
# Initialize
npm init -y

# Install dependency
npm install axios

# Install dev dependency
npm install --save-dev typescript

# Run script
npm run build
```

### Yarn
Created by Facebook to address performance and security issues in early npm.
-   **Features**: Faster installs (caching), Workspaces (monorepos).
-   **Lockfile**: `yarn.lock`.

```bash
# Install global
npm install -g yarn

# Usage
yarn add axios
yarn add -D typescript
yarn build
```

### pnpm
"Performant npm". Uses hard links and symlinks to save disk space.
-   **Efficiency**: If you have 10 projects using React, pnpm saves React ONLY ONCE on disk, not 10 times.
-   **Speed**: Often the fastest of the three.

```bash
# Install
npm install -g pnpm

# Usage
pnpm add axios
pnpm install
```

### Comparison (JS)
| Feature | npm | Yarn (v1) | pnpm |
|---------|-----|-----------|------|
| Install Speed | Moderate | Fast | Very Fast |
| Disk Usage | Heavy | Moderate | Light |
| Monorepo | Workspaces | Workspaces | Workspaces |
| Default | Yes | No | No |

---

## Python Ecosystem

### pip
The standard package installer for Python.
-   **Usage**: Usually paired with a virtual environment (`venv`).

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate # (Mac/Linux)
# .\venv\Scripts\activate (Windows)

# Install
pip install requests

# Save requirements
pip freeze > requirements.txt

# Install from file
pip install -r requirements.txt
```

### Poetry
A tool for dependency management and packaging in Python. Handles dependency resolution better than pip.

```bash
# Initialize
poetry init

# Add dependency
poetry add requests
```

---

## Rust Ecosystem

### Cargo
Cargo is Rust's build system and package manager. It is generally considered best-in-class.
-   **Crates**: Packages in Rust are called crates.
-   **Registry**: crates.io.

```bash
# Create new project
cargo new my_project

# Build
cargo build

# Run
cargo run

# Add dependency (in Cargo.toml)
# [dependencies]
# serde = "1.0"
```

---

## System Package Managers

These manage tools at the operating system level (like installing Node, Git, GCC).

### Homebrew
The missing package manager for macOS (and Linux).

```bash
# Install Git
brew install git

# Update
brew update && brew upgrade
```

### Windows
-   **Chocolatey**: `choco install git`
-   **Winget** (Microsoft Official): `winget install git.git`

---

## Resources

-   [npm Docs](https://docs.npmjs.com/)
-   [Yarn Docs](https://yarnpkg.com/)
-   [pnpm Docs](https://pnpm.io/)
-   [pip Docs](https://pip.pypa.io/en/stable/)
-   [The Rust Book (Cargo)](https://doc.rust-lang.org/cargo/)
