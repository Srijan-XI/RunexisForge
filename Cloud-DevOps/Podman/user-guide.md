# Podman — User Guide

## Installation

### Linux

```bash
# Fedora/RHEL/CentOS
sudo dnf install podman

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install podman
```bash

### macOS

```bash
brew install podman

# Initialize VM (Podman uses a Linux VM on macOS)
podman machine init
podman machine start
```bash

### Windows

```powershell
# Install via winget
winget install RedHat.Podman

# Initialize WSL2 machine
podman machine init
podman machine start
```bash

---

## Basic commands (Docker-compatible)

```bash
# Pull an image
podman pull nginx

# Run a container
podman run -d -p 8080:80 --name web nginx

# List running containers
podman ps

# Stop a container
podman stop web

# Remove a container
podman rm web
```bash

---

## Rootless containers

Podman runs rootless by default (no sudo required):

```bash
podman run -d -p 8080:80 nginx
# Container runs as your user, not root
```bash

### Benefits

- No privilege escalation risks
- Better security isolation
- Works in environments where root access is restricted

---

## Pods (multi-container groups)

```bash
# Create a pod
podman pod create --name mypod -p 8080:80

# Add containers to the pod
podman run -d --pod mypod nginx
podman run -d --pod mypod redis

# List pods
podman pod ps

# Stop/start entire pod
podman pod stop mypod
podman pod start mypod
```bash

Pods share network namespace (containers can talk via localhost).

---

## Generate systemd units

```bash
# Run a container
podman run -d --name myapp nginx

# Generate systemd service file
podman generate systemd --new --name myapp > ~/.config/systemd/user/myapp.service

# Enable and start as a systemd service
systemctl --user enable myapp
systemctl --user start myapp
```bash

---

## Docker Compose compatibility (podman-compose)

```bash
# Install podman-compose
pip install podman-compose

# Use like docker-compose
podman-compose up -d
podman-compose down
```bash

---

## Migration from Docker

1. Most Docker commands work as-is:

   ```bash
   alias docker=podman
   ```

2. Docker Compose files can be used with `podman-compose`

3. Differences to watch:
   - No daemon socket (`/var/run/docker.sock` won't exist)
   - Networking modes differ slightly
   - Volume paths may differ in rootless mode

---

## References

- Docs: <https://docs.podman.io/>
- Tutorials: <https://github.com/containers/podman/tree/main/docs/tutorials>
