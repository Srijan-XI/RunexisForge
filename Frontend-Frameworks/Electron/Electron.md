# Electron

## Introduction

## Overview

Electron is a framework for building cross-platform desktop applications with web technologies using Chromium and Node.js.

## Key Features

- Single codebase for Windows, macOS, Linux
- Access to native APIs from JavaScript
- Auto-updates and packaging support
- Deep ecosystem of Node packages

## Common Use Cases

- Desktop companions for web apps
- Developer tools and IDEs
- Cross-platform utilities

## Resources

- Docs: <https://www.electronjs.org/docs>
- Fiddle: <https://www.electronjs.org/fiddle>

---

# Electron Usage Guide

## Create a Project

```bash
npm init electron-app@latest my-electron
cd my-electron
npm install
npm start
```bash

## Minimal `main.js`

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```bash

## Security Basics

- Disable `nodeIntegration` in renderer when possible
- Use `contextIsolation: true` and a safe `preload.js`
- Validate IPC inputs

## Packaging

```bash
npm install --save-dev electron-builder
npm run build
```bash

Configure targets in `electron-builder.yml` or `package.json`.

## Debugging

- Use Chromium DevTools (`Ctrl+Shift+I`)
- `--inspect` for debugging the main process

## Auto Updates

- Use `electron-updater` with a release server (GitHub Releases, S3, etc.)
