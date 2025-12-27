# macOS Usage Guide

## Setup

- Keep macOS updated via System Settings > General > Software Update
- Install Xcode Command Line Tools: `xcode-select --install`
- Install Homebrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

## Package Management

```bash
brew update
brew install git
brew search <pkg>
```bash

## Shell and Terminal

- Default shell: zsh
- Use `sudo spctl --master-disable` sparingly; prefer signed apps

## Security

- Enable FileVault disk encryption
- Check Privacy & Security for permissions
- Keep Gatekeeper enabled

## Development

- Use Homebrew for toolchains (Python, Node, Go)
- For iOS/macOS apps, install full Xcode

## Troubleshooting

- Activity Monitor for processes
- Console app for logs
- Safe Mode: hold Shift on boot
