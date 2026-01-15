# Code Editors - Mastering VS Code

## Table of Contents
- [Introduction](#introduction)
- [Visual Studio Code (VS Code)](#visual-studio-code)
  - [Key Features](#key-features)
  - [Essential Extensions](#essential-extensions)
  - [Settings & Customization](#settings--customization)
  - [Shortcuts (Productivity)](#shortcuts)
  - [Debugging](#debugging)
- [Vim / Neovim (Brief)](#vim--neovim)
- [Resources](#resources)

---

## Introduction

So much of a developer's life is spent inside a code editor. Choosing the right one and mastering it is the highest leverage skill you can acquire. Currently, **VS Code** is the industry standard for general web and software development.

---

## Visual Studio Code

Microsoft's open-source editor. Lightweight but powerful.

### Key Features
-   **IntelliSense**: Smart completions based on variable types, function definitions, and imported modules.
-   **Integrated Terminal**: Run shell commands without leaving the editor.
-   **Git Integration**: Review diffs, stage files, and commit directly.
-   **Debugger**: Print debugging is a thing of the past.

### Essential Extensions

#### Web Development
1.  **Prettier**: Code formatter. Essential for consistent style.
2.  **ESLint**: Find and fix problems in JavaScript code.
3.  **Live Server**: Launch a local development server with live reload.
4.  **Auto Rename Tag**: Rename one HTML tag, automatically rename the pair.

#### Frameworks & Languages
5.  **Python**: Official support for Python (linting, debugging, Jupyter).
6.  **C/C++**: IntelliSense and debugging.
7.  **Docker**: Manager images/containers.
8.  **Tailwind CSS IntelliSense**: Autocomplete for utility classes.

#### Utilities
9.  **GitLens**: Supercharge Git (see who wrote each line of code).
10. **Remote - SSH**: Edit files on a remote server as if they were local.
11. **Live Share**: Real-time collaborative coding in the editor.

### Settings & Customization

VS Code is configured via `settings.json`.

**Recommended Settings**:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "files.autoSave": "onFocusChange",
  "terminal.integrated.defaultProfile.windows": "Git Bash"
}
```

### Shortcuts (Productivity)

| Action | Win/Linux | macOS |
|--------|-----------|-------|
| Command Palette | `Ctrl + Shift + P` | `Cmd + Shift + P` |
| Quick Open File | `Ctrl + P` | `Cmd + P` |
| Multi-Cursor | `Alt + Click` | `Opt + Click` |
| Find in Files | `Ctrl + Shift + F` | `Cmd + Shift + F` |
| Toggle Terminal | `` Ctrl + ` `` | `` Cmd + ` `` |
| Format Document | `Shift + Alt + F` | `Shift + Opt + F` |

### Debugging

Use the "Run and Debug" tab (Ctrl+Shift+D).
-   Set **Breakpoints** by clicking the gutter (left of line number).
-   Inspect variables and call stack in real-time.

---

## Vim / Neovim

**Vim** is a modal text editor focused on editing speed. It has a steep learning curve but allows editing at the "speed of thought".
-   If interested, install the **Vim** extension in VS Code to learn the keybindings (`h`, `j`, `k`, `l` navigation) without losing VS Code features.

---

## Resources

-   [VS Code Documentation](https://code.visualstudio.com/docs)
-   [VS Code Tips & Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
-   [Vim Adventures](https://vim-adventures.com/) - Learn Vim by playing a game.
