# Packer

## Introduction

Packer is an open-source tool for creating identical machine images for multiple platforms from a single source configuration. It is lightweight, runs on every major operating system, and is highly performant.

While Vagrant manages *running* virtual machines, Packer builds the *images* (Golden Images) that Vagrant (or AWS EC2, or Docker) uses.

## Installation

*   **Windows**: `winget install HashiCorp.Packer` or via Chocolatey `choco install packer`
*   **macOS**: `brew install packer`
*   **Linux**:
    ```bash
    curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
    sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
    sudo apt-get update && sudo apt-get install packer
    ```

## Usage (HCL)

Packer uses HCL (HashiCorp Configuration Language) files (`.pkr.hcl`).

### Core Commands
*   `packer init .`: Install plugins defined in the template.
*   `packer fmt .`: Format the HCL file.
*   `packer validate .`: Check context validity.
*   `packer build .`: Build the image.

## Example: Building a Docker Image

```hcl
packer {
  required_plugins {
    docker = {
      version = ">= 0.0.7"
      source  = "github.com/hashicorp/docker"
    }
  }
}

source "docker" "ubuntu" {
  image  = "ubuntu:xenial"
  commit = true
}

build {
  name    = "learn-packer"
  sources = [
    "source.docker.ubuntu"
  ]

  provisioner "shell" {
    environment_vars = [
      "FOO=hello world",
    ]
    inline = [
      "echo Adding file to Docker Container",
      "echo \"$FOO\" > example.txt",
    ]
  }
}
```

## Real World Use Case
**Immutable Infrastructure**: Instead of using Ansible to patch servers after they launch, you use Packer to build a new AMI (Amazon Machine Image) with the latest code and security patches baked in. When deploying, you simply replace the old servers with new ones based on this fresh AMI.
