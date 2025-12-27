# Podman — Introduction

Podman is a daemonless container engine for developing, managing, and running OCI containers. It's a drop-in replacement for Docker with rootless container support.

## Why Podman?

- **Daemonless**: no background daemon; each command spawns containers directly
- **Rootless**: run containers without root privileges for improved security
- **Docker-compatible**: `alias docker=podman` works for most workflows
- **Pod support**: manage groups of containers (like Kubernetes pods)

## Key differences from Docker

- No central daemon (no `dockerd`)
- Rootless by default
- Native systemd integration for container services
- Built-in pod concept (multi-container units)

## Use cases

- Development environments that require rootless containers
- CI/CD pipelines where daemon-less execution is preferred
- Migrating from Docker with minimal changes

## Where to go next

- User guide: `Cloud-DevOps/Podman/user-guide.md`
- Examples: `Cloud-DevOps/Podman/examples/`
