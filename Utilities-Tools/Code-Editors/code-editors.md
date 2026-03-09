# Code Editors - Mastering VS Code & Beyond

## Table of Contents
- [Code Editors - Mastering VS Code \& Beyond](#code-editors---mastering-vs-code--beyond)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [The Modern Editor Landscape](#the-modern-editor-landscape)
    - [Editor vs IDE](#editor-vs-ide)
  - [Visual Studio Code](#visual-studio-code)
    - [Architecture (Electron)](#architecture-electron)
    - [Killer Features for Students/Pros](#killer-features-for-studentspros)
    - [Essential Extension Packs (IIT Level)](#essential-extension-packs-iit-level)
    - [Settings \& Customization](#settings--customization)
    - [Shortcuts Cheat Sheet](#shortcuts-cheat-sheet)
    - [Debugging (Node/Python)](#debugging-nodepython)
    - [Remote Development](#remote-development)
    - [Multi-Root Workspaces](#multi-root-workspaces)
    - [Git Integration](#git-integration)
    - [Extensions Development](#extensions-development)
  - [Sublime Text](#sublime-text)
    - [Why Sublime Text?](#why-sublime-text)
    - [Installation and Setup](#installation-and-setup)
    - [Key Features](#key-features)
    - [Package Control](#package-control)
    - [Customization](#customization)
  - [Vim / Neovim](#vim--neovim)
    - [Why use it?](#why-use-it)
    - [Installation](#installation)
    - [Basic Operations](#basic-operations)
    - [Vim in VS Code](#vim-in-vs-code)
    - [Neovim \& Modern Plugins](#neovim--modern-plugins)
  - [Atom](#atom)
  - [Notepad++](#notepad)
  - [Other Notable Editors](#other-notable-editors)
    - [Kate (KDE)](#kate-kde)
    - [gedit (GNOME)](#gedit-gnome)
    - [Brackets](#brackets)
  - [Advanced Techniques](#advanced-techniques)
    - [Multi-Cursor Editing](#multi-cursor-editing)
    - [Regular Expressions](#regular-expressions)
    - [Snippets and Templates](#snippets-and-templates)
    - [Task Runners](#task-runners)
  - [Comparison: VS Code vs. The Rest](#comparison-vs-code-vs-the-rest)
  - [Choosing the Right Editor](#choosing-the-right-editor)
  - [Resources](#resources)

---

## Introduction

A **Code Editor** is a lightweight tool focused on the act of writing code. Unlike an IDE, it starts blank. You build your perfect environment by adding plugins.

### The Modern Editor Landscape
-   **VS Code**: Uses ~70% of the market. Open source, Microsoft.
-   **Vim/Neovim**: Terminal-based. 100% keyboard. High learning curve.
-   **Sublime Text**: Instant startup, proprietary, paid (winrar style).
-   **Notepad++**: Windows classic. Good for large logs.
-   **Atom**: GitHub's editor (now sunset, but still used).
-   **Kate**: KDE's powerful editor for Linux.
-   **gedit**: GNOME's simple text editor.

### Editor vs IDE

**Code Editor**:
- Lightweight, fast startup
- Extensible through plugins
- Language-agnostic
- Examples: VS Code, Sublime, Vim

**IDE** (Integrated Development Environment):
- Heavy, feature-rich
- Language-specific optimizations
- Built-in compiler, debugger, build tools
- Examples: IntelliJ IDEA, Visual Studio, PyCharm

---

## Visual Studio Code

### Architecture (Electron)
VS Code is built on **Electron** (Chromium + Node.js).
-   *Pros*: CSS/JS for UI (highly themeable), huge extension ecosystem.
-   *Cons*: Uses more RAM than Sublime (Chromium overhead).

### Killer Features for Students/Pros
1.  **Hacking the Editor**: Since it's web-tech, you can use Custom CSS extensions to make it look Cyberpunk/Neon instantly.
2.  **Dev Containers**: (Crucial for Resumes). Define your environment in a `Dockerfile`. VS Code opens *inside* that container.
    -   *Scenario*: You are on Windows, but the class needs Linux C++ tools. DevContainer gives you a Linux terminal inside VS Code on Windows.
3.  **Live Share**: Google Docs for Code. You send a link, your friend joins your editor. You debug together.

### Essential Extension Packs (IIT Level)

**1. The "Must Haves"**
-   **Prettier**: Formats code automatically on save. (Never argue about spaces vs tabs again).
-   **ESLint**: Finds bugs in JS before you run it.
-   **Material Icon Theme**: Makes the file explorer readable.
-   **GitLens**: Show "Who wrote this code 3 years ago?" inline.

**2. Web Development**
-   **Live Server**: Right Click -> Open with Live Server. Instant hot-reload html.
-   **Auto Rename Tag**: Change `<div>` to `<section>`, the closing tag updates automatically.
-   **Tailwind CSS IntelliSense**: Autocomplete classes.

**3. Data Science / Python**
-   **Python (Microsoft)**: IntelliSense, Linting.
-   **Jupyter**: Run `.ipynb` notebooks directly inside VS Code.
-   **Data Wrangler**: View CSVs/Pandas Dataframes in a glorious Excel-like grid.

### Settings & Customization
(File -> Preferences -> Settings -> Open JSON)

**Pro Config**:
```json
{
  "editor.formatOnSave": true,         // Format every time you save
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.fontFamily": "'Fira Code', Consolas, monospace",
  "editor.fontLigatures": true,        // Turn != into ≠
  "files.autoSave": "onFocusChange",   // Save when clicking away
  "terminal.integrated.fontFamily": "'MesloLGS NF'", // For Oh-My-Posh icons
  "workbench.iconTheme": "material-icon-theme"
}
```

### Shortcuts Cheat Sheet
*Memorize these to code 2x faster.*

| Action | Win/Linux | macOS | Description |
|:-------|:----------|:------|:------------|
| **Command Palette** | `Ctrl + Shift + P` | `Cmd + Shift + P` | Do ANYTHING. (Theme, Install, etc) |
| **Go to File** | `Ctrl + P` | `Cmd + P` | Fuzzy match file name. |
| **Multi Cursor** | `Alt + Click` | `Opt + Click` | Edit 10 lines at once. |
| **Move Line** | `Alt + Up/Down` | `Opt + Up/Down` | Move code block up or down. |
| **Toggle Terminal** | `` Ctrl + ` `` | `` Cmd + ` `` | Open/Close terminal. |
| **Format Code** | `Shift + Alt + F` | `Shift + Opt + F` | Fix indentation instantly. |

### Debugging (Node/Python)
Stop using `print()`!
1.  Click the "Bug" icon sidebar.
2.  Click "create a launch.json file".
3.  Set breakpoints (Red dot in gutter).
4.  Hit F5.
5.  Hover over variables to see values.

**Advanced Debugging**:
- **Conditional Breakpoints**: Right-click breakpoint -> Edit Breakpoint -> Add condition (e.g., `i > 100`)
- **Logpoints**: Like breakpoints but just log to console without stopping
- **Watch Expressions**: Monitor variables across execution
- **Call Stack**: See the chain of function calls that led to current position

### Remote Development
Work on remote machines or containers as if they were local.

**SSH Remote Development**:
1. Install "Remote - SSH" extension
2. `Ctrl + Shift + P` -> "Remote-SSH: Connect to Host"
3. Enter `user@hostname`
4. VS Code reopens, connected to remote machine
5. Files, terminal, extensions all run remotely

**WSL Integration** (Windows Subsystem for Linux):
- Install "Remote - WSL" extension
- Click bottom-left green icon -> "New WSL Window"
- Full Linux environment while on Windows
- Perfect for cross-platform development

**Dev Containers**:
- Define development environment in `.devcontainer/devcontainer.json`
- Includes Dockerfile, VS Code settings, extensions
- Team members get identical setup
- Example:
```json
{
  "name": "Python 3",
  "image": "mcr.microsoft.com/devcontainers/python:3.11",
  "customizations": {
    "vscode": {
      "extensions": ["ms-python.python", "ms-python.pylint"]
    }
  }
}
```

**GitHub Codespaces**:
- Cloud-hosted VS Code instances
- Spin up development environment in browser
- Free tier available for students

### Multi-Root Workspaces
Manage multiple projects simultaneously.

**Creating Multi-Root Workspace**:
1. File -> Add Folder to Workspace
2. Add multiple project folders
3. File -> Save Workspace As -> `myprojects.code-workspace`

**Workspace Settings**:
```json
{
  "folders": [
    { "path": "frontend" },
    { "path": "backend" },
    { "path": "../shared-lib" }
  ],
  "settings": {
    "files.exclude": {
      "**/node_modules": true
    }
  }
}
```

**Benefits**:
- Cross-project search (search across frontend + backend simultaneously)
- Shared configuration
- Manage microservices architecture
- Keep related projects synced

### Git Integration
Deep Git support built-in (no extensions needed).

**Source Control Panel** (`Ctrl + Shift + G`):
- View changed files
- Stage/unstage changes
- Commit with message
- Push/pull/sync

**GitLens Extension** (Enhanced Git):
- **Blame Annotations**: See who wrote each line + when
- **File History**: Visual timeline of changes
- **Line History**: History of a specific line
- **Commit Graph**: Visual branch diagram
- **Compare Branches**: Side-by-side diff

**Diff Viewing**:
- Click file in Source Control -> see inline diff
- `Ctrl + Shift + P` -> "Git: Compare with..." for advanced comparisons

**Merge Conflict Resolution**:
- VS Code highlights conflicts with colors
- Click "Accept Current Change" / "Accept Incoming" / "Accept Both"
- Inline editor for manual resolution

**Best Practices**:
- Use `.gitignore` properly (exclude `node_modules`, `.env`, etc.)
- Make atomic commits (one feature/fix per commit)
- Write meaningful commit messages (50 char summary, then details)

### Extensions Development
Build your own VS Code extensions.

**Getting Started**:
```bash
npm install -g yo generator-code
yo code
# Follow prompts to create extension scaffolding
```

**Extension Structure**:
- `package.json`: Metadata, activation events, contributions
- `extension.ts/js`: Main code
- `README.md`: Documentation

**Common Extension Types**:
- **Commands**: Add custom commands to command palette
- **Language Support**: Syntax highlighting, autocomplete
- **Themes**: Custom color schemes
- **Snippets**: Code templates
- **Debuggers**: Custom debug adapters

**Publishing**:
1. Create publisher account on [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
2. `vsce package` to create `.vsix`
3. `vsce publish` to publish extension

**Example - Hello World Command**:
```typescript
vscode.commands.registerCommand('extension.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World!');
});
```

---

## Sublime Text

### Why Sublime Text?
- **Lightning Fast**: C++ core, starts instantly even with huge files
- **Goto Anything**: `Ctrl + P` fuzzy file search, `@` symbol search, `:` line jump
- **Multiple Selections**: Built the multi-cursor revolution
- **Cross-Platform**: Same experience on Windows, Mac, Linux
- **Unlimited Trial**: "WinRAR model" - nag screen but fully functional

### Installation and Setup

**Windows**:
```powershell
# Using Scoop
scoop install sublime-text

# Or download from sublimetext.com
```

**macOS**:
```bash
brew install --cask sublime-text
```

**Linux (Ubuntu/Debian)**:
```bash
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
sudo apt-get install apt-transport-https
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt-get update
sudo apt-get install sublime-text
```

### Key Features

**Goto Anything** (`Ctrl + P`):
- Type filename: `model` -> finds `UserModel.js`
- Type `@methodName`: Jump to method/function
- Type `:50`: Jump to line 50
- Combine: `model@save` -> Jump to save() in model file

**Multiple Cursors**:
- `Ctrl + D`: Select next occurrence of word
- `Ctrl + L`: Select entire line (repeat for more lines)
- `Alt + F3`: Select all occurrences
- `Ctrl + Click`: Add cursor at click position
- `Ctrl + Alt + Up/Down`: Add cursor above/below

**Command Palette** (`Ctrl + Shift + P`):
- Access all functions
- Install packages
- Change syntax
- Set file encoding

**Split Editing**:
- View -> Layout -> Columns/Rows/Grid
- `Alt + Shift + 2` for 2 columns
- Drag tabs between panes

### Package Control
The essential package manager for Sublime Text.

**Installation**:
1. `Ctrl + Shift + P` -> "Install Package Control"
2. Or paste install script from packagecontrol.io

**Essential Packages**:
- **Emmet**: HTML/CSS shortcuts (`div.container>ul>li*5` expands to full HTML)
- **SublimeLinter**: Lint code in real-time
- **GitGutter**: Git diff in gutter
- **SideBarEnhancements**: Advanced file operations
- **BracketHighlighter**: Highlight matching brackets
- **A File Icon**: Better file icons
- **Terminus**: Better integrated terminal

**Installing Packages**:
- `Ctrl + Shift + P` -> "Package Control: Install Package"
- Search and select package
- Restarts automatically

### Customization

**Settings** (Preferences -> Settings):
```json
{
  "font_face": "Fira Code",
  "font_size": 11,
  "tab_size": 2,
  "translate_tabs_to_spaces": true,
  "trim_trailing_white_space_on_save": true,
  "ensure_newline_at_eof_on_save": true,
  "rulers": [80, 120],
  "highlight_line": true,
  "line_padding_bottom": 1,
  "line_padding_top": 1,
  "index_files": true,
  "theme": "Adaptive.sublime-theme",
  "color_scheme": "Monokai.sublime-color-scheme"
}
```

**Key Bindings** (Preferences -> Key Bindings):
```json
[
  { "keys": ["ctrl+shift+r"], "command": "reveal_in_side_bar" },
  { "keys": ["ctrl+alt+p"], "command": "prompt_select_workspace" }
]
```

**Build Systems**:
Create custom build systems (Tools -> Build System -> New Build System):
```json
{
  "cmd": ["python", "-u", "$file"],
  "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
  "selector": "source.python"
}
```

**Themes and Color Schemes**:
- Install theme packages (e.g., "Material Theme", "Dracula")
- Preferences -> Select Color Scheme/Theme
- Preview in real-time

---

## Vim / Neovim

**"The Mouse is Lava"**

Vim is a "Modal" editor. You are in modes:
-   **Normal Mode**: Keys move cursor (`h j k l`) or execute commands.
-   **Insert Mode**: Keys types text.
-   **Visual Mode**: Select text for operations.
-   **Command Mode**: Execute Ex commands (`:w`, `:q`, etc.).

### Why use it?
-   **Speed**: Editing logic like "Delete inside quotes" is `di"`. 3 keystrokes. In VS Code that involves dragging a mouse.
-   **Server Config**: Every Linux server has Vim installed. If you SSH into AWS, you need Vim.
-   **Ubiquitous**: Works over SSH, in terminals, on embedded systems
-   **Composable**: Combine operators with motions (verb + noun grammar)
-   **Once Learned, Forever Productive**: Same workflow across decades

### Installation

**Windows**:
```powershell
# Vim
choco install vim

# Neovim (recommended)
choco install neovim
scoop install neovim
```

**macOS**:
```bash
# Vim (pre-installed, but outdated)
brew install vim

# Neovim
brew install neovim
```

**Linux**:
```bash
# Debian/Ubuntu - Vim
sudo apt install vim

# Neovim
sudo apt install neovim

# Arch
sudo pacman -S neovim
```

### Basic Operations

**Modes**:
- `i` - Enter Insert mode (before cursor)
- `a` - Enter Insert mode (after cursor)
- `Esc` - Return to Normal mode
- `v` - Visual mode (character selection)
- `V` - Visual Line mode
- `:` - Command mode

**Movement** (Normal Mode):
- `h j k l` - Left, down, up, right
- `w` - Next word
- `b` - Previous word
- `0` - Start of line
- `$` - End of line
- `gg` - Start of file
- `G` - End of file
- `{` `}` - Previous/next paragraph
- `%` - Jump to matching bracket

**Editing**:
- `x` - Delete character
- `dd` - Delete line
- `yy` - Yank (copy) line
- `p` - Paste
- `u` - Undo
- `Ctrl + r` - Redo
- `.` - Repeat last command

**Operators + Motions**:
- `dw` - Delete word
- `d$` - Delete to end of line
- `ci"` - Change inside quotes
- `da}` - Delete around braces (including braces)
- `yap` - Yank around paragraph
- `>%` - Indent block

**Search**:
- `/pattern` - Search forward
- `?pattern` - Search backward
- `n` - Next occurrence
- `N` - Previous occurrence
- `*` - Search for word under cursor

**Save/Quit**:
- `:w` - Save
- `:q` - Quit
- `:wq` or `:x` - Save and quit
- `:q!` - Quit without saving

### Vim in VS Code
Best of both worlds. Install **Vim** extension in VS Code.
-   You get VS Code's extensions/debugging.
-   You get Vim's editing speed (hjkl navigation).
-   Configure in `settings.json`:

```json
{
  "vim.useSystemClipboard": true,
  "vim.leader": "<space>",
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["<leader>", "w"],
      "commands": ["workbench.action.files.save"]
    }
  ]
}
```

### Neovim & Modern Plugins

**Why Neovim over Vim?**
- Lua configuration (cleaner than VimScript)
- Better plugin architecture
- Asynchronous operations
- Built-in LSP (Language Server Protocol)
- Modern defaults

**Essential Neovim Distributions**:
- **LazyVim**: Pre-configured Neovim setup with sane defaults
- **NvChad**: Fast, feature-rich configuration
- **AstroNvim**: Aesthetic and functional
- **LunarVim**: IDE-like experience

**Popular Plugins**:
- **nvim-tree**: File explorer
- **telescope.nvim**: Fuzzy finder
- **nvim-lspconfig**: LSP configuration
- **nvim-treesitter**: Better syntax highlighting
- **vim-fugitive**: Git integration
- **vim-surround**: Manipulate surrounding characters
- **commentary.vim**: Comment code easily

**.vimrc** Example:
```vim
" Basic settings
set number              " Show line numbers
set relativenumber      " Relative line numbers
set tabstop=4           " Tab width
set shiftwidth=4        " Indent width
set expandtab           " Use spaces instead of tabs
set ignorecase          " Case-insensitive search
set smartcase           " Case-sensitive if uppercase used
set clipboard=unnamedplus " Use system clipboard

" Key mappings
let mapleader = " "
nnoremap <leader>w :w<CR>
nnoremap <leader>q :q<CR>

" Plugin manager (vim-plug example)
call plug#begin('~/.vim/plugged')
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'tpope/vim-fugitive'
call plug#end()
```

**init.lua** for Neovim (Modern Approach):
```lua
-- Basic settings
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.tabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

-- Key mappings
vim.g.mapleader = " "
vim.keymap.set("n", "<leader>w", ":w<CR>")
vim.keymap.set("n", "<leader>e", ":Explore<CR>")
```

---

## Atom

**Status**: Atom was sunset by GitHub in December 2022, but remains usable.

**Why Atom Was Popular**:
- Built by GitHub on Electron (like VS Code)
- "Hackable Text Editor" - highly customizable
- Excellent Git/GitHub integration
- Beautiful UI and themes

**Core Features**:
- **Teletype**: Real-time collaboration (Google Docs for code)
- **Multiple Panes**: Split editor any way you want
- **Built-in Package Manager**: `apm` (Atom Package Manager)
- **Cross-platform**: Windows, Mac, Linux

**Installation** (Legacy):
```bash
# macOS
brew install --cask atom

# Windows
choco install atom

# Linux
sudo apt install atom  # If still in repos
```

**Essential Packages**:
- **atom-beautify**: Auto-format code
- **minimap**: Code minimap like Sublime
- **pigments**: Color highlighting in CSS
- **emmet**: HTML/CSS shortcuts
- **linter**: Base linter package
- **file-icons**: Better file icons

**Why It Was Discontinued**:
- VS Code won the "Electron editor" battle
- Higher resource usage than competitors
- Microsoft (owner of GitHub) focused on VS Code

**Migration Path**:
- Most users moved to **VS Code**
- Settings/keybindings transferable
- Similar extension ecosystem

---

## Notepad++

**Windows-Only Powerhouse** for text editing.

**Why Use Notepad++?**
- **Lightning fast**: C++ native, handles multi-GB files
- **Portable**: No installation needed, run from USB
- **Plugin ecosystem**: 150+ plugins
- **Mature**: 20+ years of development
- **Free & Open Source**: No cost, no ads

**Installation**:
```powershell
# Scoop
scoop install notepadplusplus

# Chocolatey
choco install notepadplusplus

# Or download from notepad-plus-plus.org
```

**Key Features**:

**Macro Recording**:
1. Macro -> Start Recording
2. Perform actions
3. Macro -> Stop Recording
4. Macro -> Playback (or Run Multiple Times)
5. Save macro for later use

Example: Convert 1000 lines from `old_format` to `new_format` in seconds.

**Column Mode Editing**:
- `Alt + Mouse Drag` to select column
- Type to insert in all selected rows
- Perfect for editing CSV, aligned text, code blocks

**Search & Replace with Regex**:
- `Ctrl + H` - Find & Replace dialog
- Enable "Regular expression" mode
- Example: Replace all dates `(\d{2})/(\d{2})/(\d{4})` with `$3-$1-$2`

**Compare Plugin**:
- Plugins -> Plugin Admin -> Install "Compare"
- Compare -> Compare (shows side-by-side diff)
- Highlights additions, deletions, changes
- Perfect for code review, config comparison

**Large File Handling**:
- Opens 2GB+ files without freezing
- Hex editor mode for binary files
- Tail mode for log files

**Plugin Manager**:
- Plugins -> Plugin Admin
- Search and install plugins
- Auto-updates available plugins

**Essential Plugins**:
- **Compare**: File diff/comparison
- **NppFTP**: FTP/SFTP client
- **XML Tools**: Format/validate XML
- **JSON Viewer**: Pretty-print JSON
- **Explorer**: File tree sidebar
- **AutoSave**: Automatic file saving

**Multi-Language Support**:
- 80+ programming languages
- Syntax highlighting
- Auto-completion
- Function list panel

**Session Management**:
- Remembers open files across restarts
- Save/load sessions
- Perfect for project workflows

**Customization**:
- Settings -> Style Configurator (themes, fonts, colors)
- Settings -> Shortcut Mapper (customize all keybindings)
- Dark mode support

---

## Other Notable Editors

### Kate (KDE)
- KDE's advanced text editor
- Session management
- Multi-document interface
- Split views
- Syntax highlighting for 300+ languages
- Built-in terminal
- Project management

```bash
# Linux
sudo apt install kate  # Debian/Ubuntu
sudo pacman -S kate    # Arch
```

### gedit (GNOME)
- GNOME's default text editor
- Simple, clean interface
- Plugin support
- Syntax highlighting
- Snippets
- File browser sidebar

```bash
# Usually pre-installed on GNOME systems
sudo apt install gedit
```

### Brackets
- Adobe's web development editor (discontinued 2021)
- Live Preview for HTML/CSS
- Extract colors/fonts/measurements from PSD
- Preprocessor support
- Inline editors

**Migration**: Most users moved to VS Code with Live Server extension.

---

## Advanced Techniques

### Multi-Cursor Editing

**Column Selection** (VS Code):
- `Shift + Alt + Mouse Drag` - Select rectangular block
- `Ctrl + Alt + Up/Down` - Add cursor above/below
- Type to edit all lines simultaneously

**Select All Occurrences**:
- `Ctrl + D` - Select next occurrence (repeat to select more)
- `Ctrl + Shift + L` - Select all occurrences
- `Ctrl + F2` - Select all occurrences of word

**Use Cases**:
```javascript
// Convert array from single quotes to double quotes
const arr = ['one', 'two', 'three'];
// 1. Select opening quote with Ctrl+D (repeat)
// 2. Type " to replace all
```

**Add Cursor Above/Below**:
- Useful for creating similar structure
- `Ctrl + Alt + Up` or `Down`
- Example: Add `console.log()` before multiple lines

### Regular Expressions

**Find & Replace with Regex** (`Ctrl + H`):
- Enable regex mode (click `.* button`)
- Use capture groups for transformations

**Examples**:

Convert snake_case to camelCase:
```regex
Find: (\w+)_(\w)
Replace: $1\u$2
```

Extract URLs from text:
```regex
Find: https?://[^\s]+
```

Swap first and last name:
```regex
Find: (\w+),\s*(\w+)
Replace: $2 $1
```

Remove HTML tags:
```regex
Find: <[^>]+>
Replace: (empty)
```

Add quotes around numbers:
```regex
Find: (\d+)
Replace: "$1"
```

**Character Classes**:
- `\d` - Digit
- `\w` - Word character (a-z, A-Z, 0-9, _)
- `\s` - Whitespace
- `[abc]` - Any of a, b, c
- `[^abc]` - Not a, b, or c

**Quantifiers**:
- `*` - 0 or more
- `+` - 1 or more
- `?` - 0 or 1
- `{n}` - Exactly n
- `{n,m}` - Between n and m

### Snippets and Templates

**Live Templates** (VS Code):
Built-in snippets triggered by typing prefix + Tab.

**JavaScript/TypeScript**:
- `log` → `console.log()`
- `clg` → `console.log(' ', )`
- `for` → `for (let i = 0; i < array.length; i++)`
- `forin` → `for (const key in object)`
- `forof` → `for (const item of array)`

**Creating Custom Snippets**:
1. File -> Preferences -> Configure User Snippets
2. Select language
3. Add snippet JSON:

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "const ${1:ComponentName} = () => {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  );",
      "};",
      "",
      "export default ${1:ComponentName};"
    ],
    "description": "React Functional Component"
  }
}
```

**Snippet Variables**:
- `$1`, `$2` - Tab stops
- `$0` - Final cursor position
- `${1:placeholder}` - Tab stop with placeholder
- `$TM_FILENAME` - Current filename
- `$CURRENT_YEAR` - Current year
- `$CLIPBOARD` - Clipboard contents

**Snippet with Choices**:
```json
{
  "Python Function": {
    "prefix": "deff",
    "body": [
      "def ${1:function_name}(${2:params})${3| -> None, -> str, -> int, -> bool|}:",
      "    \"\"\"${4:Description}\"\"\"",
      "    $0"
    ]
  }
}
```

### Task Runners

**tasks.json** Configuration:
Create `.vscode/tasks.json` for automated build/test tasks.

**Example - Python Linting**:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Lint Python",
      "type": "shell",
      "command": "pylint",
      "args": ["${file}"],
      "group": {
        "kind": "test",
        "isDefault": true
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

**Build Task**:
```json
{
  "label": "Build Project",
  "type": "shell",
  "command": "npm run build",
  "group": {
    "kind": "build",
    "isDefault": true
  },
  "problemMatcher": ["$tsc"]
}
```

**Watch Task** (Auto-rebuild on change):
```json
{
  "label": "Watch TypeScript",
  "type": "shell",
  "command": "tsc",
  "args": ["--watch"],
  "isBackground": true,
  "problemMatcher": "$tsc-watch"
}
```

**Problem Matchers**:
Parse output to create error/warning markers.
- `$tsc` - TypeScript compiler
- `$eslint-stylish` - ESLint
- `$gcc` - GCC compiler
- Custom regex patterns for other tools

**Running Tasks**:
- `Ctrl + Shift + B` - Run build task
- `Ctrl + Shift + P` -> "Tasks: Run Task"
- Bind custom keybindings

**Terminal Integration**:
**Split Terminals**:
- Click `+` dropdown in terminal -> Split Terminal
- Or: `Ctrl + Shift + 5`
- Multiple terminals in split view

**Send Text to Terminal**:
- Select code in editor
- Right-click -> "Run Selection in Terminal"
- Or: `Ctrl + Shift + '` (custom binding)

**Shell Integration**:
VS Code can track command execution:
- Decorations show success/failure
- Navigate between commands (`Ctrl + Up/Down`)
- Rerun recent commands

**Configure Default Shell**:
```json
{
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    },
    "Git Bash": {
      "path": "C:\\Program Files\\Git\\bin\\bash.exe",
      "icon": "terminal-bash"
    }
  }
}
```

---

## Comparison: VS Code vs. The Rest

| Feature | **VS Code** | **Sublime Text** | **Vim/Neovim** |
|:--------|:------------|:-----------------|:---------------|
| **Speed** | Medium (Electron) | ⚡ Blazing Fast (C++) | ⚡ Instant (C) |
| **Learning Curve** | Low | Low | 🏔️ Very High |
| **Extensions** | ♾️ Infinite | Many | Many (Lua) |
| **Remote Dev** | ✅ Excellent (SSH/WSL) | ❌ No | ✅ Native (SSH) |
| **Best For** | Daily Driver, Web, JS | Large Files, Quick Edits | DevOps, Servers, Hardcore |

---

## Choosing the Right Editor

**For Beginners**:
- **Start with**: VS Code
- **Why**: Low learning curve, great defaults, huge community support
- **Alternative**: Sublime Text (if you want speed)

**For Web Development**:
- **Best**: VS Code with Live Server, Emmet, ESLint
- **Why**: Best JavaScript/TypeScript tooling, extensive web framework support
- **Alternative**: WebStorm (if you want a full IDE)

**For Data Science/Python**:
- **Best**: VS Code with Jupyter extension
- **Why**: Notebook support, great debugging, extensible
- **Alternative**: PyCharm (full IDE experience)

**For DevOps/System Administration**:
- **Best**: Vim/Neovim
- **Why**: Works over SSH, available everywhere, fast
- **Alternative**: VS Code with Remote-SSH

**For Large File Editing**:
- **Best**: Sublime Text or Notepad++
- **Why**: Can handle multi-GB files without freezing
- **Alternative**: Vim (for command-line)

**For Quick Edits**:
- **Best**: Sublime Text or Notepad++
- **Why**: Instant startup, no project indexing
- **Alternative**: nano/vim (command-line)

**For Cross-Platform Consistency**:
- **Best**: VS Code or Sublime Text
- **Why**: Same features on Windows, Mac, Linux
- **Settings sync**: Built into VS Code

**For Team Collaboration**:
- **Best**: VS Code with Live Share
- **Why**: Real-time collaboration, free, easy to use
- **Alternative**: JetBrains Code With Me (with JetBrains IDEs)

**Resource Usage Comparison**:
- **Lightest**: Vim (~10MB RAM)
- **Light**: Sublime Text (~50MB RAM)
- **Moderate**: VS Code (~200-500MB RAM)
- **Heavy**: Full IDEs (~1-2GB RAM)

---

## Resources

-   [VS Code Tricks (Microsoft)](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
-   [Vim Adventures (Game)](https://vim-adventures.com/)
-   [Fira Code Font](https://github.com/tonsky/FiraCode)
-   [Wes Bos VS Code Course (Free)](https://vscode.pro/)
