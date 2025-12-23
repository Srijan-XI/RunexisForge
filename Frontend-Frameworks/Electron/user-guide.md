# Electron Usage Guide

## Create a Project
```bash
npm init electron-app@latest my-electron
cd my-electron
npm install
npm start
```

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
```

## Security Basics
- Disable `nodeIntegration` in renderer when possible
- Use `contextIsolation: true` and a safe `preload.js`
- Validate IPC inputs

## Packaging
```bash
npm install --save-dev electron-builder
npm run build
```
Configure targets in `electron-builder.yml` or `package.json`.

## Debugging
- Use Chromium DevTools (`Ctrl+Shift+I`)
- `--inspect` for debugging the main process

## Auto Updates
- Use `electron-updater` with a release server (GitHub Releases, S3, etc.)
