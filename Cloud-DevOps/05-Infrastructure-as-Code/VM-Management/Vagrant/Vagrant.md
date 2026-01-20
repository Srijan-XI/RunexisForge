# Vagrant

## Introduction

Vagrant is a tool for building and managing virtual machine environments in a single workflow. With an easy-to-use workflow and focus on automation, Vagrant lowers development environment setup time, increases production parity, and makes "works on my machine" excuses a thing of the past.

It acts as a wrapper around virtualization software (like VirtualBox, VMware, Hyper-V) and configuration management software (like Ansible, Chef, Puppet).

## Installation

1.  **Install a Provider**: VirtualBox is the most common free provider.
    *   Download: [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
2.  **Install Vagrant**:
    *   Download: [Vagrant Downloads](https://developer.hashicorp.com/vagrant/downloads)
    *   **Windows**: Run the `.msi` installer.
    *   **macOS**: `brew install vagrant`
    *   **Linux**: `sudo apt install vagrant`

## Usage

Vagrant uses a file named `Vagrantfile` to describe the type of machine you want, how it's configured, and how it's provisioned.

### Basic Workflow

1.  **Initialize**: Create a `Vagrantfile`.
    ```bash
    vagrant init hashicorp/bionic64
    ```
2.  **Up**: Start and provision the guest machine.
    ```bash
    vagrant up
    ```
3.  **SSH**: Connect to the machine.
    ```bash
    vagrant ssh
    ```
4.  **Halt**: Stop the machine (shutdown).
    ```bash
    vagrant halt
    ```
5.  **Destroy**: Delete the machine completely.
    ```bash
    vagrant destroy
    ```

## Example `Vagrantfile`

```ruby
Vagrant.configure("2") do |config|
  # 1. Choose the base box
  config.vm.box = "ubuntu/focal64"

  # 2. Network settings (Private IP)
  config.vm.network "private_network", ip: "192.168.33.10"

  # 3. Sync folders (Host -> Guest)
  config.vm.synced_folder "./data", "/vagrant_data"

  # 4. Provisioning (Install Nginx)
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nginx
  SHELL
end
```

## Real World Use Case
**Dev Environments**: Instead of forcing every developer to manually install Postgres, Redis, and Node.js on their laptops (which differs per OS), you give them a `Vagrantfile`. They run `vagrant up`, and they have a fully configured Linux VM that exactly matches production.
