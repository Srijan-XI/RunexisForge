# Terminal Tools - Supercharge Your Shell

## Table of Contents
- [Introduction](#introduction)
- [Shells](#shells)
  - [Zsh (Z Shell)](#zsh)
  - [PowerShell](#powershell)
- [Prompts & Themes](#prompts--themes)
  - [Oh My Zsh](#oh-my-zsh)
  - [Oh My Posh](#oh-my-posh)
  - [Starship](#starship)
- [Modern Terminals](#modern-terminals)
  - [Windows Terminal](#windows-terminal)
  - [iTerm2 (macOS)](#iterm2)
- [Productivity Tools](#productivity-tools)
- [Resources](#resources)

---

## Introduction

The terminal is the developer's cockpit. A default terminal is boring and inefficient. Modern tools add autocomplete, syntax highlighting, and git status information directly to your prompt.

---

## Shells

### Zsh (Z Shell)
The default shell on macOS and a popular choice on Linux.
-   **Features**: Better tab completion, shared history, themeable.

### PowerShell
The cross-platform automation and configuration tool/framework.
-   **PowerShell 7 (Core)**: Runs on Windows, Linux, and macOS.

---

## Prompts & Themes

### Oh My Zsh
A framework for managing your Zsh configuration.
-   **Plugins**: `git`, `docker`, `npm` (provide aliases and autocomplete).
-   **Themes**: `robbyrussell`, `agnoster`.

**Installation**:
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**Recommended Plugins** (`.zshrc`):
```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

### Oh My Posh
A prompt theme engine for any shell (PowerShell, Bash, Zsh). Extremely customizable and colorful.
-   **Requirements**: A "Nerd Font" (patched font with icons) like `MesloLGS NF`.

**Installation (Windows via Winget)**:
```bash
winget install JanDeDobbeleer.OhMyPosh
```

**Configuration (PowerShell config)**:
```powershell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jandedobbeleer.omp.json" | Invoke-Expression
```

### Starship
The minimal, blazing-fast, and infinitely customizable prompt for any shell. Written in Rust.
-   **Zero config**: Works great out of the box.
-   **Context aware**: Shows Node version if in a JS project, Rust version if in a Rust project.

**Installation**:
```bash
curl -sS https://starship.rs/install.sh | sh
```
Add `eval "$(starship init zsh)"` to your `.zshrc`.

---

## Modern Terminals

### Windows Terminal
The best terminal for Windows. Tabs, panes, GPU acceleration, multiple profiles (CMD, PowerShell, WSL).
-   [Download from Microsoft Store](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701)

### iTerm2 (macOS)
A replacement for Terminal.app.
-   **Features**: Split panes, search, autocomplete, paste history.

---

## Productivity Tools

1.  **fzf**: Command-line fuzzy finder. Find files or history instantly.
2.  **bat**: A `cat` clone with syntax highlighting and Git integration.
3.  **eza** (formerly exa): A modern replacement for `ls` with colors and icons.
4.  **zoxide**: A smarter `cd` command. Remembers your most used directories. (`z my-project` jumps to `~/code/js/my-project`).

---

## Resources

-   [Oh My Zsh](https://ohmyz.sh/)
-   [Oh My Posh](https://ohmyposh.dev/)
-   [Starship](https://starship.rs/)
-   [Nerd Fonts](https://www.nerdfonts.com/)
