# Terminal Tools - Supercharge Your Shell

## Table of Contents
- [Introduction](#introduction)
- [Modern Shells](#modern-shells)
  - [Zsh (Z Shell)](#zsh-z-shell)
  - [PowerShell](#powershell)
  - [Fish Shell](#fish-shell)
  - [Nushell](#nushell)
- [Terminal Emulators](#terminal-emulators)
  - [Windows Terminal](#windows-terminal)
  - [iTerm2 (macOS)](#iterm2-macos)
  - [Alacritty](#alacritty)
  - [Kitty](#kitty)
  - [WezTerm](#wezterm)
- [Prompts & Themes](#prompts--themes)
  - [Oh My Zsh](#oh-my-zsh)
  - [Oh My Posh](#oh-my-posh)
  - [Starship](#starship)
  - [Powerlevel10k](#powerlevel10k)
- [Terminal Multiplexers](#terminal-multiplexers)
  - [tmux](#tmux)
  - [GNU Screen](#gnu-screen)
  - [Zellij](#zellij)
- [Modern CLI Tools](#modern-cli-tools)
  - [fzf (Fuzzy Finder)](#fzf-fuzzy-finder)
  - [ripgrep (rg)](#ripgrep-rg)
  - [fd (File Finder)](#fd-file-finder)
  - [bat (Better cat)](#bat-better-cat)
  - [eza (Better ls)](#eza-better-ls)
  - [zoxide (Smart cd)](#zoxide-smart-cd)
  - [delta (Better diff)](#delta-better-diff)
  - [tldr (Simplified man pages)](#tldr-simplified-man-pages)
- [Shell Customization](#shell-customization)
  - [Zsh Configuration](#zsh-configuration)
  - [PowerShell Profile](#powershell-profile)
  - [Aliases and Functions](#aliases-and-functions)
- [Terminal Automation](#terminal-automation)
  - [Expect Scripts](#expect-scripts)
  - [Shell Scripting Patterns](#shell-scripting-patterns)
- [Productivity Workflows](#productivity-workflows)
- [Cross-Platform Setup](#cross-platform-setup)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

The terminal is the developer's command center. A well-configured terminal with modern tools can dramatically increase productivity through automation, better navigation, and enhanced workflow capabilities.

### Why Upgrade Your Terminal?

**Benefits:**
- ⚡ Faster navigation and file search
- 🎨 Better syntax highlighting and UI
- 🔍 Fuzzy finding for files, history, and commands
- 📊 Git status and version information at a glance
- 🚀 Improved autocomplete and suggestions
- 💾 Persistent sessions and split panes
- 🔄 Cross-platform consistency

**What We'll Cover:**
- Modern shells (Zsh, Fish, PowerShell)
- Terminal emulators with GPU acceleration
- Prompt customization and theming
- Terminal multiplexers (tmux, screen)
- Modern CLI tools replacing classic Unix commands
- Productivity workflows and automation

---

## Modern Shells

### Zsh (Z Shell)

Default shell on macOS (since Catalina) and popular on Linux.

**Installation:**

```bash
# Ubuntu/Debian
sudo apt install zsh

# macOS (already installed)
# Verify version
zsh --version

# CentOS/RHEL
sudo yum install zsh

# Set as default shell
chsh -s $(which zsh)
```

**Key Features:**

- Better tab completion
- Shared command history across sessions
- Spelling correction
- Themeable with frameworks
- Plugin ecosystem

**Basic Configuration (~/.zshrc):**

```bash
# Enable colors
autoload -U colors && colors

# Better history
HISTSIZE=10000
SAVEHIST=10000
HISTFILE=~/.zsh_history
setopt SHARE_HISTORY
setopt HIST_IGNORE_ALL_DUPS
setopt HIST_REDUCE_BLANKS

# Auto cd
setopt AUTO_CD

# Better completion
autoload -Uz compinit && compinit
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'

# Key bindings
bindkey '^[[A' history-search-backward
bindkey '^[[B' history-search-forward
```

### PowerShell

Cross-platform automation shell with .NET integration.

**Installation:**

```bash
# Windows (built-in or from Microsoft Store)
# PowerShell 7+ recommended

# macOS
brew install --cask powershell

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y powershell

# Launch
pwsh
```

**Key Features:**

- Object-based pipelines (not text)
- .NET integration
- Consistent syntax across platforms
- Rich scripting capabilities
- Module ecosystem

**Profile Location:**

```powershell
# Find profile path
$PROFILE

# Create profile if it doesn't exist
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}

# Edit profile
notepad $PROFILE  # Windows
code $PROFILE     # VS Code
```

### Fish Shell

User-friendly shell with great defaults.

**Installation:**

```bash
# macOS
brew install fish

# Ubuntu/Debian
sudo apt install fish

# Set as default
chsh -s $(which fish)
```

**Key Features:**

- Syntax highlighting out of the box
- Autosuggestions based on history
- Web-based configuration
- No need for plugins

**Configuration:**

```bash
# Launch configuration UI
fish_config

# Edit config file
nano ~/.config/fish/config.fish
```

### Nushell

Modern shell with structured data pipelines.

**Installation:**

```bash
# macOS
brew install nushell

# Cargo
cargo install nu

# Launch
nu
```

**Example:**

```bash
# Work with structured data
ls | where size > 1mb | sort-by modified

# JSON processing
http get https://api.github.com/repos/nushell/nushell | get stargazers_count
```

---

## Terminal Emulators

### Windows Terminal

Modern, GPU-accelerated terminal for Windows.

**Features:**
- Multiple tabs and panes
- GPU-accelerated text rendering
- Unicode and UTF-8 support
- Custom themes and color schemes
- Multiple profile support (CMD, PowerShell, WSL)

**Installation:**

```powershell
# Microsoft Store
# Or via winget
winget install Microsoft.WindowsTerminal
```

**Configuration (settings.json):**

```json
{
  "defaultProfile": "{guid-of-powershell}",
  "themes": [
    {
      "name": "Dracula",
      "background": "#282A36",
      "foreground": "#F8F8F2"
    }
  ],
  "profiles": {
    "defaults": {
      "fontFace": "CaskaydiaCove Nerd Font",
      "fontSize": 11,
      "opacity": 95,
      "useAcrylic": true
    },
    "list": [
      {
        "name": "PowerShell",
        "commandline": "pwsh.exe",
        "startingDirectory": "%USERPROFILE%"
      }
    ]
  },
  "actions": [
    { "command": "paste", "keys": "ctrl+v" },
    { "command": { "action": "splitPane", "split": "horizontal" }, "keys": "alt+shift+-" },
    { "command": { "action": "splitPane", "split": "vertical" }, "keys": "alt+shift+plus" }
  ]
}
```

### iTerm2 (macOS)

Feature-rich terminal replacement for macOS.

**Installation:**

```bash
brew install --cask iterm2
```

**Features:**
- Split panes
- Hotkey window
- Search and highlight
- Autocomplete
- Paste history
- Instant replay
- tmux integration

**Recommended Settings:**
- Preferences → Profiles → Colors → Color Presets → Import (Dracula, Solarized)
- Preferences → Profiles → Text → Font → Use ligatures
- Preferences → Keys → Hotkey → Create dedicated hotkey window

### Alacritty

GPU-accelerated terminal emulator.

**Installation:**

```bash
# macOS
brew install --cask alacritty

# Linux (from source)
cargo install alacritty
```

**Configuration (~/.config/alacritty/alacritty.yml):**

```yaml
window:
  padding:
    x: 10
    y: 10
  opacity: 0.95

font:
  normal:
    family: FiraCode Nerd Font
  size: 12.0

colors:
  primary:
    background: '#1e1e1e'
    foreground: '#d4d4d4'

key_bindings:
  - { key: V, mods: Control|Shift, action: Paste }
  - { key: C, mods: Control|Shift, action: Copy }
```

### Kitty

Fast, feature-rich GPU terminal.

**Installation:**

```bash
# macOS
brew install --cask kitty

# Linux
curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin
```

**Features:**
- GPU rendering
- Tiling windows
- Image support
- Ligature support

**Configuration (~/.config/kitty/kitty.conf):**

```bash
font_family FiraCode Nerd Font
font_size 12.0

background_opacity 0.95

# Dracula theme
foreground #f8f8f2
background #282a36
```

### WezTerm

Powerful cross-platform terminal.

**Installation:**

```bash
# macOS
brew install --cask wezterm

# Windows
winget install wez.wezterm
```

**Configuration (~/.config/wezterm/wezterm.lua):**

```lua
local wezterm = require 'wezterm'

return {
  font = wezterm.font 'FiraCode Nerd Font',
  font_size = 12.0,
  color_scheme = 'Dracula',
  window_background_opacity = 0.95,
  
  keys = {
    {key="n", mods="SHIFT|CTRL", action=wezterm.action{SpawnTab="CurrentPaneDomain"}},
  }
}
```

---

## Prompts & Themes

### Oh My Zsh

Framework for managing Zsh configuration.

**Installation:**

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**Configuration (~/.zshrc):**

```bash
# Theme
ZSH_THEME="robbyrussell"  # or "agnoster", "powerlevel10k/powerlevel10k"

# Plugins
plugins=(
  git
  docker
  kubectl
  npm
  node
  python
  zsh-autosuggestions
  zsh-syntax-highlighting
  zsh-completions
  history-substring-search
)

source $ZSH/oh-my-zsh.sh
```

**Install Popular Plugins:**

```bash
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### Oh My Posh

Cross-platform prompt theme engine.

**Installation:**

```bash
# Windows
winget install JanDeDobbeleer.OhMyPosh

# macOS/Linux
brew install jandedobbeleer/oh-my-posh/oh-my-posh
```

**Configuration:**

```powershell
# PowerShell Profile
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jandedobbeleer.omp.json" | Invoke-Expression

# Bash
eval "$(oh-my-posh init bash --config ~/theme.omp.json)"

# Zsh
eval "$(oh-my-posh init zsh --config ~/theme.omp.json)"
```

**List themes:**

```bash
Get-PoshThemes  # PowerShell
oh-my-posh config list  # Bash/Zsh
```

### Starship

Minimal, fast, customizable prompt.

**Installation:**

```bash
# macOS/Linux
curl -sS https://starship.rs/install.sh | sh

# Windows
winget install Starship.Starship
```

**Configuration:**

```bash
# Bash (~/.bashrc)
eval "$(starship init bash)"

# Zsh (~/.zshrc)
eval "$(starship init zsh)"

# PowerShell ($PROFILE)
Invoke-Expression (&starship init powershell)
```

**Custom Config (~/.config/starship.toml):**

```toml
[character]
success_symbol = "[➜](bold green)"
error_symbol = "[✗](bold red)"

[directory]
truncation_length = 3
truncate_to_repo = true

[git_branch]
symbol = "🌱 "

[nodejs]
format = "via [🤖 $version](bold green) "

[python]
format = 'via [🐍 $version]($style) '
```

### Powerlevel10k

Fast and flexible Zsh theme.

**Installation:**

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

**Configuration (~/.zshrc):**

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

**Run configuration wizard:**

```bash
p10k configure
```

---

## Terminal Multiplexers

### tmux

Terminal multiplexer for managing multiple sessions.

**Installation:**

```bash
# macOS
brew install tmux

# Ubuntu/Debian
sudo apt install tmux

# CentOS/RHEL
sudo yum install tmux
```

**Basic Usage:**

```bash
# Start new session
tmux

# Named session
tmux new -s mysession

# List sessions
tmux ls

# Attach to session
tmux attach -t mysession

# Detach from session
Ctrl+b, d

# Kill session
tmux kill-session -t mysession
```

**Key Bindings (Prefix: Ctrl+b):**

```bash
# Window management
c           # Create new window
n           # Next window
p           # Previous window
0-9         # Select window by number
,           # Rename window
&           # Kill window

# Pane management
%           # Split vertically
"           # Split horizontally
o           # Switch panes
x           # Kill pane
z           # Zoom pane
{           # Move pane left
}           # Move pane right

# Session management
d           # Detach
(           # Previous session
)           # Next session
s           # List sessions

# Copy mode
[           # Enter copy mode
Space       # Start selection
Enter       # Copy selection
]           # Paste
```

**Configuration (~/.tmux.conf):**

```bash
# Set prefix to Ctrl+a
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix

# Enable mouse support
set -g mouse on

# Start windows and panes at 1
set -g base-index 1
setw -g pane-base-index 1

# Split panes using | and -
bind | split-window -h
bind - split-window -v
unbind '"'
unbind %

# Reload config
bind r source-file ~/.tmux.conf \; display "Config reloaded!"

# Vim-style pane navigation
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Status bar
set -g status-bg black
set -g status-fg white
set -g status-left '#[fg=green]#S '
set -g status-right '#[fg=yellow]%Y-%m-%d %H:%M'

# Colors
set -g default-terminal "screen-256color"
```

**Plugins (TPM - Tmux Plugin Manager):**

```bash
# Install TPM
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

# Add to ~/.tmux.conf
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @plugin 'dracula/tmux'

# Initialize TPM (bottom of .tmux.conf)
run '~/.tmux/plugins/tpm/tpm'

# Install plugins: Prefix + I
# Update plugins: Prefix + U
```

### GNU Screen

Classic terminal multiplexer.

**Installation:**

```bash
# Ubuntu/Debian
sudo apt install screen

# macOS
brew install screen
```

**Basic Commands:**

```bash
# Start screen
screen

# Named session
screen -S mysession

# List sessions
screen -ls

# Attach to session
screen -r mysession

# Detach
Ctrl+a, d

# Kill session
screen -X -S mysession quit
```

**Key Bindings (Prefix: Ctrl+a):**

```bash
c           # Create window
n           # Next window
p           # Previous window
"           # List windows
d           # Detach
k           # Kill window
S           # Split horizontal
|           # Split vertical
Tab         # Switch region
```

### Zellij

Modern terminal workspace with layouts.

**Installation:**

```bash
# macOS
brew install zellij

# Cargo
cargo install zellij

# Launch
zellij
```

**Features:**
- Built-in layouts
- Plugin system
- Floating panes
- Modern UI

**Key Bindings:**

```bash
Ctrl+p, n   # New pane
Ctrl+p, x   # Close pane
Ctrl+p, h/j/k/l  # Navigate panes
Ctrl+o, n   # New tab
Ctrl+o, x   # Close tab
```

---

## Modern CLI Tools

### fzf (Fuzzy Finder)

Command-line fuzzy finder for files, history, and more.

**Installation:**

```bash
# macOS
brew install fzf
$(brew --prefix)/opt/fzf/install

# Ubuntu/Debian
sudo apt install fzf

# From source
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

**Basic Usage:**

```bash
# Find files
fzf

# Preview files
fzf --preview 'bat --color=always {}'

# Find in history
history | fzf

# Fuzzy cd
cd $(find . -type d | fzf)

# Search processes
ps aux | fzf
```

**Shell Integration:**

```bash
# Bash/Zsh - Added by fzf installer
# Ctrl+T: File finder
# Ctrl+R: History search
# Alt+C: Directory finder

# Custom commands
export FZF_DEFAULT_COMMAND='fd --type f --hidden --exclude .git'
export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border'

# Preview with bat
export FZF_CTRL_T_OPTS="--preview 'bat --color=always --style=numbers --line-range=:500 {}'"

# Advanced fd integration
export FZF_ALT_C_COMMAND='fd --type d --hidden --exclude .git'
```

**Examples:**

```bash
# Fuzzy find and edit
vim $(fzf)

# Kill process interactively
kill $(ps aux | fzf | awk '{print $2}')

# Checkout git branch
git checkout $(git branch | fzf)

# Interactive git log
git log --oneline | fzf --preview 'git show {1}' | awk '{print $1}'
```

### ripgrep (rg)

Ultra-fast recursive search tool.

**Installation:**

```bash
# macOS
brew install ripgrep

# Ubuntu/Debian
sudo apt install ripgrep

# Windows
winget install BurntSushi.ripgrep.MSVC
```

**Usage:**

```bash
# Basic search
rg "pattern"

# Case insensitive
rg -i "pattern"

# Search specific file types
rg -t py "import"

# Exclude directories
rg "pattern" --glob '!node_modules'

# Show context
rg -C 3 "pattern"  # 3 lines before/after

# Show only filenames
rg -l "pattern"

# Count matches
rg -c "pattern"

# Replace (preview)
rg "old" --replace "new"
```

**Advanced Examples:**

```bash
# Search in hidden files
rg --hidden "pattern"

# Search multiple patterns
rg -e "pattern1" -e "pattern2"

# Search with PCRE2 regex
rg -P "\\d{3}-\\d{3}-\\d{4}"

# JSON output
rg --json "pattern"

# Multiline search
rg -U "start.*end"

# Interactive search with fzf
rg --color=always --line-number --no-heading "pattern" |
  fzf --ansi --delimiter : \
    --preview 'bat --color=always --highlight-line {2} {1}'
```

### fd (File Finder)

Fast and user-friendly alternative to `find`.

**Installation:**

```bash
# macOS
brew install fd

# Ubuntu/Debian
sudo apt install fd-find

# Windows
winget install sharkdp.fd
```

**Usage:**

```bash
# Find files by name
fd pattern

# Find files with extension
fd -e txt

# Include hidden files
fd -H pattern

# Execute command on results
fd -e jpg -x convert {} {.}.png

# Max depth
fd -d 3 pattern

# Type filter
fd -t f  # files only
fd -t d  # directories only

# Exclude patterns
fd -E node_modules pattern

# Full path search
fd -p /home/user

# Case sensitive
fd -s Pattern
```

**Examples:**

```bash
# Find and delete
fd -e log -x rm {}

# Find files modified in last 24 hours
fd --changed-within 24h

# Find large files
fd -t f -S +100m

# Interactive file selection with fzf
fd -t f | fzf --preview 'bat --color=always {}'

# Find and edit
vim $(fd pattern | fzf)
```

### bat (Better cat)

Cat clone with syntax highlighting.

**Installation:**

```bash
# macOS
brew install bat

# Ubuntu/Debian
sudo apt install bat  # command is 'batcat'
# Create alias: alias bat='batcat'

# Windows
winget install sharkdp.bat
```

**Usage:**

```bash
# View file
bat file.txt

# Multiple files
bat file1.txt file2.txt

# Show line numbers
bat -n file.txt

# Show only specific lines
bat -r 10:20 file.txt

# Display all
bat -A file.txt

# Different theme
bat --theme=Dracula file.txt

# List themes
bat --list-themes

# Generate config
bat --config-file
```

**Configuration (~/.config/bat/config):**

```bash
--theme="Dracula"
--style="numbers,changes,header"
--italic-text=always
--paging=never
```

**Integration:**

```bash
# Replace cat
alias cat='bat --paging=never'

# Man pages with syntax highlighting
export MANPAGER="sh -c 'col -bx | bat -l man -p'"

# Help pages
help() {
    "$@" --help 2>&1 | bat --plain --language=help
}

# Git diff
git config --global core.pager "bat --paging=always"
```

### eza (Better ls)

Modern replacement for `ls`.

**Installation:**

```bash
# macOS
brew install eza

# Cargo
cargo install eza

# Ubuntu/Debian (from GitHub releases)
wget -c https://github.com/eza-community/eza/releases/latest/download/eza_x86_64-unknown-linux-gnu.tar.gz -O - | tar xz
sudo mv eza /usr/local/bin/
```

**Usage:**

```bash
# Basic listing
eza

# Long format
eza -l

# With icons
eza --icons

# Tree view
eza --tree

# Git status
eza -l --git

# Sort by size
eza -l --sort=size

# Sort by time
eza -l --sort=modified

# Show all files
eza -a
```

**Aliases:**

```bash
alias ls='eza --icons'
alias ll='eza -l --icons --git'
alias la='eza -la --icons --git'
alias lt='eza --tree --level=2 --icons'
alias l='eza -lah --icons --git --time-style=long-iso'
```

### zoxide (Smart cd)

Smarter `cd` command that learns your habits.

**Installation:**

```bash
# macOS
brew install zoxide

# Ubuntu/Debian
curl -sS https://webinstall.dev/zoxide | bash

# Windows
winget install ajeetdsouza.zoxide
```

**Shell Integration:**

```bash
# Bash (~/.bashrc)
eval "$(zoxide init bash)"

# Zsh (~/.zshrc)
eval "$(zoxide init zsh)"

# PowerShell ($PROFILE)
Invoke-Expression (& { (zoxide init powershell | Out-String) })
```

**Usage:**

```bash
# Add directory (automatic on cd)
z /path/to/directory

# Jump to directory
z docs  # Jumps to most frecent match

# Interactive selection
zi docs

# Query database
zoxide query docs

# Remove entry
zoxide remove /path

# List database
zoxide query -l
```

### delta (Better diff)

Syntax-highlighting pager for git and diff.

**Installation:**

```bash
# macOS
brew install git-delta

# Ubuntu/Debian
cargo install git-delta
```

**Git Integration (~/.gitconfig):**

```ini
[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true
    light = false
    side-by-side = true
    line-numbers = true

[merge]
    conflictstyle = diff3

[diff]
    colorMoved = default
```

### tldr (Simplified man pages)

Community-driven simplified man pages.

**Installation:**

```bash
# npm
npm install -g tldr

# Python
pip install tldr

# macOS
brew install tldr
```

**Usage:**

```bash
# View simplified docs
tldr tar
tldr git-commit
tldr curl

# Update cache
tldr --update

# Search
tldr --search "zip"
```

---

## Resources

-   [Oh My Zsh](https://ohmyz.sh/)
-   [Oh My Posh](https://ohmyposh.dev/)
-   [Starship](https://starship.rs/)
-   [Nerd Fonts](https://www.nerdfonts.com/)
