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

---

## Advanced Implementation

### IPC Communication

#### Main Process to Renderer

```javascript
// main.js
const { BrowserWindow } = require('electron');

function sendToRenderer(win) {
  win.webContents.send('message-from-main', {
    text: 'Hello from main process'
  });
}
```

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onMessageFromMain: (callback) => {
    ipcRenderer.on('message-from-main', (_event, value) => callback(value));
  }
});
```

```javascript
// renderer.js
window.electronAPI.onMessageFromMain((data) => {
  console.log(data.text);
});
```

#### Renderer to Main Process

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (content) => ipcRenderer.invoke('save-file', content),
  openFile: () => ipcRenderer.invoke('open-file')
});
```

```javascript
// main.js
const { ipcMain, dialog } = require('electron');
const fs = require('fs');

ipcMain.handle('save-file', async (event, content) => {
  const { filePath } = await dialog.showSaveDialog({
    filters: [{ name: 'Text Files', extensions: ['txt'] }]
  });
  
  if (filePath) {
    fs.writeFileSync(filePath, content);
    return { success: true };
  }
  return { success: false };
});

ipcMain.handle('open-file', async (event) => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Text Files', extensions: ['txt'] }]
  });
  
  if (filePaths.length > 0) {
    const content = fs.readFileSync(filePaths[0], 'utf-8');
    return { success: true, content };
  }
  return { success: false };
});
```

### Native Menus

```javascript
const { Menu, app } = require('electron');

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New File',
        accelerator: 'CmdOrCtrl+N',
        click: () => { /* handler */ }
      },
      {
        label: 'Open File',
        accelerator: 'CmdOrCtrl+O',
        click: () => { /* handler */ }
      },
      { type: 'separator' },
      {
        label: 'Exit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => { app.quit(); }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
```

### System Tray

```javascript
const { app, Tray, Menu } = require('electron');
const path = require('path');

let tray = null;

app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, 'icon.png'));
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => { win.show(); } },
    { label: 'Quit', click: () => { app.quit(); } }
  ]);
  
  tray.setToolTip('My Electron App');
  tray.setContextMenu(contextMenu);
  
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show();
  });
});
```

### Notifications

```javascript
const { Notification } = require('electron');

function showNotification(title, body) {
  new Notification({
    title: title,
    body: body,
    icon: path.join(__dirname, 'icon.png')
  }).show();
}

// Usage
showNotification('Update Available', 'A new version is ready to install');
```

### Custom Protocol

```javascript
const { app, protocol } = require('electron');
const path = require('path');

app.whenReady().then(() => {
  protocol.registerFileProtocol('myapp', (request, callback) => {
    const url = request.url.substr(8);
    callback({ path: path.normalize(`${__dirname}/${url}`) });
  });
});

// Now you can use: myapp://assets/image.png
```

---

## Real-World Use Cases

### 1. VS Code - Code Editor

**Architecture:**
- Monaco Editor integration
- Extension system
- Terminal integration
- Git integration
- Multiple workspace support

**Key Features:**
- Custom protocol handlers
- Native module integration
- Advanced IPC patterns
- Performance optimization

### 2. Slack - Communication Platform

**Features:**
- Real-time messaging
- File sharing
- Native notifications
- System tray integration
- Auto-updates

**Technical Highlights:**
- WebSocket communication
- Native menu integration
- Deep linking support
- Secure credential storage

### 3. Discord - Gaming Communication

**Implementation:**
- Voice/video streaming
- Screen sharing
- Rich presence API
- Overlay functionality
- Game detection

**Performance:**
- Optimized rendering
- Memory management
- Native module usage
- Hardware acceleration

---

## Building Production Apps

### Project Structure

```
my-electron-app/
├── build/                    # Build resources
│   ├── icon.icns            # macOS icon
│   ├── icon.ico             # Windows icon
│   └── icon.png             # Linux icon
├── dist/                    # Built applications
├── src/
│   ├── main/               # Main process
│   │   ├── main.js
│   │   └── preload.js
│   ├── renderer/           # Renderer process
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── renderer.js
│   └── common/             # Shared code
├── package.json
└── electron-builder.yml
```

### Electron Builder Configuration

```yaml
# electron-builder.yml
appId: com.example.myapp
productName: My Electron App
directories:
  output: dist
  buildResources: build

win:
  target:
    - nsis
    - portable
  icon: build/icon.ico

mac:
  target:
    - dmg
    - zip
  icon: build/icon.icns
  category: public.app-category.productivity

linux:
  target:
    - AppImage
    - deb
    - rpm
  icon: build/icon.png
  category: Utility

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
```

### Auto-Update Implementation

```javascript
// main.js
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

app.on('ready', () => {
  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', (info) => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Available',
    message: 'A new version is available. Download now?',
    buttons: ['Yes', 'No']
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.downloadUpdate();
    }
  });
});

autoUpdater.on('update-downloaded', (info) => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Ready',
    message: 'Install and restart now?',
    buttons: ['Yes', 'Later']
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});
```

---

## Security Best Practices

### 1. Context Isolation

```javascript
const win = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,          // Isolate renderer context
    nodeIntegration: false,          // Disable Node in renderer
    nodeIntegrationInWorker: false,  // Disable in web workers
    enableRemoteModule: false,       // Disable deprecated remote module
    preload: path.join(__dirname, 'preload.js')
  }
});
```

### 2. Content Security Policy

```javascript
// In main process before creating window
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': [
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
      ]
    }
  });
});
```

### 3. Secure IPC Validation

```javascript
// main.js
ipcMain.handle('process-data', async (event, data) => {
  // Validate input
  if (typeof data !== 'object' || !data.hasOwnProperty('value')) {
    throw new Error('Invalid data format');
  }
  
  // Validate sender
  if (event.sender !== win.webContents) {
    throw new Error('Unauthorized sender');
  }
  
  // Process safely
  return processData(data.value);
});
```

### 4. Permissions

```javascript
session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
  const allowedPermissions = ['notifications', 'media'];
  
  if (allowedPermissions.includes(permission)) {
    callback(true);
  } else {
    callback(false);
  }
});
```

---

## Performance Optimization

### 1. Lazy Loading

```javascript
// Load modules only when needed
let pdfModule;

ipcMain.handle('generate-pdf', async () => {
  if (!pdfModule) {
    pdfModule = require('pdf-generation-library');
  }
  return pdfModule.generate();
});
```

### 2. Memory Management

```javascript
// Clear cache periodically
setInterval(() => {
  session.defaultSession.clearCache();
}, 3600000); // Every hour

// Monitor memory
app.on('browser-window-created', (event, window) => {
  window.webContents.on('did-finish-load', () => {
    const memory = process.memoryUsage();
    console.log(`Memory usage: ${Math.round(memory.heapUsed / 1024 / 1024)} MB`);
  });
});
```

### 3. Offscreen Rendering

```javascript
// For hidden windows doing background work
const offscreenWindow = new BrowserWindow({
  show: false,
  webPreferences: {
    offscreen: true
  }
});
```

### 4. Native Modules

```javascript
// Use native modules for CPU-intensive tasks
const nativeAddon = require('./build/Release/native-addon.node');

ipcMain.handle('heavy-computation', async (event, data) => {
  return nativeAddon.compute(data);
});
```

---

## Testing

### Unit Testing with Jest

```javascript
// tests/main.test.js
const { BrowserWindow } = require('electron');

describe('Main Process', () => {
  let win;
  
  beforeEach(() => {
    win = new BrowserWindow({
      show: false,
      webPreferences: { nodeIntegration: true }
    });
  });
  
  afterEach(() => {
    if (win && !win.isDestroyed()) {
      win.destroy();
    }
  });
  
  it('should create window', () => {
    expect(win).toBeDefined();
  });
});
```

### End-to-End Testing with Spectron

```javascript
const { Application } = require('spectron');
const path = require('path');

describe('Application Launch', () => {
  let app;
  
  beforeEach(async () => {
    app = new Application({
      path: path.join(__dirname, '../node_modules/.bin/electron'),
      args: [path.join(__dirname, '../')]
    });
    await app.start();
  });
  
  afterEach(async () => {
    if (app && app.isRunning()) {
      await app.stop();
    }
  });
  
  it('shows an initial window', async () => {
    const count = await app.client.getWindowCount();
    expect(count).toBe(1);
  });
});
```

---

## Integration with Frontend Frameworks

### React Integration

```bash
# Create React app
npx create-react-app my-app
cd my-app

# Install Electron
npm install --save-dev electron electron-builder concurrently wait-on

# Add to package.json scripts
"electron-dev": "concurrently \"BROWSER=none npm start\" \"wait-on http://localhost:3000 && electron .\""
```

```javascript
// public/electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  
  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);
```

### Vue Integration

```bash
# Vue CLI with Electron
vue add electron-builder
```

```javascript
// src/background.js (generated)
import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}

app.on('ready', createWindow)
```

---

## Case Studies

### Case Study 1: Notion Desktop App

**Challenge:** Build a fast, native desktop experience for a complex web app.

**Solution:**
- Electron wrapper around web app
- Custom protocol handlers for deep linking
- Native file system access
- Offline mode with local storage
- System tray quick access

**Results:**
- Seamless cross-platform experience
- 3x faster startup than browser version
- Native OS integration

### Case Study 2: Figma Desktop

**Technical Implementation:**
- WebGL rendering optimization
- Native clipboard integration
- File system access for local fonts
- Multi-window management
- Performance monitoring

**Key Learnings:**
- Hardware acceleration crucial
- Memory management important
- Native modules for performance-critical code

---

## Best Practices Checklist

✅ **Security**
- Enable context isolation
- Disable nodeIntegration in renderer
- Validate all IPC messages
- Implement CSP headers
- Use secure protocols (HTTPS)

✅ **Performance**
- Lazy load heavy modules
- Implement caching strategies
- Monitor memory usage
- Use native modules for heavy computation
- Optimize bundle size

✅ **User Experience**
- Implement auto-updates
- Add error handling and logging
- Provide loading states
- Handle offline scenarios
- Support keyboard shortcuts

✅ **Code Quality**
- Write tests (unit + E2E)
- Use TypeScript for type safety
- Follow consistent code style
- Document IPC channels
- Implement logging

---

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Fiddle](https://www.electronjs.org/fiddle) - Playground
- [Electron Builder](https://www.electron.build/) - Packaging tool
- [Electron Forge](https://www.electronforge.io/) - Complete toolkit
- [Awesome Electron](https://github.com/sindresorhus/awesome-electron)
- [Electron Security Checklist](https://www.electronjs.org/docs/latest/tutorial/security)
- [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
