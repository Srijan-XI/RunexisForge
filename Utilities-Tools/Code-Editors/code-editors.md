# Code Editors - Mastering VS Code & Beyond

## Table of Contents
- [Code Editors - Mastering VS Code \& Beyond](#code-editors---mastering-vs-code--beyond)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [The Modern Editor Landscape](#the-modern-editor-landscape)
  - [Visual Studio Code](#visual-studio-code)
    - [Architecture (Electron)](#architecture-electron)
    - [Killer Features for Students/Pros](#killer-features-for-studentspros)
    - [Essential Extension Packs (IIT Level)](#essential-extension-packs-iit-level)
    - [Settings \& Customization](#settings--customization)
    - [Shortcuts Cheat Sheet](#shortcuts-cheat-sheet)
    - [Debugging (Node/Python)](#debugging-nodepython)
  - [Vim / Neovim](#vim--neovim)
    - [Why use it?](#why-use-it)
    - [Vim in VS Code](#vim-in-vs-code)
  - [Comparison: VS Code vs. The Rest](#comparison-vs-code-vs-the-rest)
  - [Resources](#resources)

---

## Introduction

A **Code Editor** is a lightweight tool focused on the act of writing code. Unlike an IDE, it starts blank. You build your perfect environment by adding plugins.

### The Modern Editor Landscape
-   **VS Code**: Uses ~70% of the market. Open source, Microsoft.
-   **Vim/Neovim**: Terminal-based. 100% keyboard. High learning curve.
-   **Sublime Text**: Instant startup, proprietary, paid (winrar style).
-   **Notepad++**: Windows classic. Good for large logs.

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

---

## Vim / Neovim

**"The Mouse is Lava"**

Vim is a "Modal" editor. You are in modes:
-   **Normal Mode**: Keys move cursor (`h j k l`) or execute commands.
-   **Insert Mode**: Keys types text.

### Why use it?
-   **Speed**: Editing logic like "Delete inside quotes" is `di"`. 3 keystrokes. In VS Code that involves dragging a mouse.
-   **Server Config**: Every Linux server has Vim installed. If you SSH into AWS, you need Vim.

### Vim in VS Code
Best of both worlds. Install **Vim** extension in VS Code.
-   You get VS Code's extensions/debugging.
-   You get Vim's editing speed (hjkl navigation).

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

## Resources

-   [VS Code Tricks (Microsoft)](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
-   [Vim Adventures (Game)](https://vim-adventures.com/)
-   [Fira Code Font](https://github.com/tonsky/FiraCode)
-   [Wes Bos VS Code Course (Free)](https://vscode.pro/)
