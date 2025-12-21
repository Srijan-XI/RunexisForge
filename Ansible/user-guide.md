# Ansible — User Guide

## 1) Install
On many systems Ansible is installed via pip or a package manager.

Verify:

```bash
ansible --version
```

## 2) Inventory
Create an inventory file (example: `Ansible/examples/inventory.ini`).

## 3) Run a Playbook

```bash
ansible-playbook -i "Ansible/examples/inventory.ini" "Ansible/examples/ping.yml"
```

## Examples & Practice
- Examples: `Ansible/examples/`
- Practice: `Ansible/questions/`
