# Ansible — Introduction

## Overview
Ansible is an automation tool for configuration management, application deployment, and orchestration. You write **playbooks** in YAML to describe the desired state of systems, and Ansible applies them over SSH (agentless).

## Why Ansible?
- Agentless (typically uses SSH)
- Human-readable YAML playbooks
- Great for server configuration and repeatable ops tasks
- Large module ecosystem

## Core Concepts
- **Inventory**: Hosts and groups you manage
- **Playbook**: YAML automation steps (plays + tasks)
- **Module**: Unit of work (package install, file edit, service)
- **Role**: Reusable structure for playbooks

## Resources
- Docs: https://docs.ansible.com/
