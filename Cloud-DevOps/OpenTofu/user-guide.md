# OpenTofu — User Guide

## Installation

### Linux
```bash
# Snap
sudo snap install --classic opentofu

# Manual install
curl -LO https://github.com/opentofu/opentofu/releases/latest/download/tofu_<version>_linux_amd64.tar.gz
tar -xzf tofu_<version>_linux_amd64.tar.gz
sudo mv tofu /usr/local/bin/
```

### macOS
```bash
brew install opentofu
```

### Windows
```powershell
# Chocolatey
choco install opentofu

# Or download from GitHub releases
```

Verify:
```bash
tofu version
```

---

## Basic workflow (same as Terraform)

### 1. Write configuration (main.tf)

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "MyWebServer"
  }
}
```

### 2. Initialize

```bash
tofu init
```

Downloads providers and sets up backend.

### 3. Plan

```bash
tofu plan
```

Shows what will be created/changed/destroyed.

### 4. Apply

```bash
tofu apply
```

Creates the infrastructure. Confirm with `yes`.

### 5. Destroy

```bash
tofu destroy
```

Tears down all resources.

---

## Variables

**variables.tf**
```hcl
variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.micro"
}
```

**main.tf**
```hcl
resource "aws_instance" "web" {
  instance_type = var.instance_type
}
```

**Override at runtime:**
```bash
tofu apply -var="instance_type=t2.small"
```

Or use `terraform.tfvars`:
```hcl
instance_type = "t2.small"
```

---

## Outputs

**outputs.tf**
```hcl
output "instance_ip" {
  value = aws_instance.web.public_ip
}
```

View outputs:
```bash
tofu output
tofu output instance_ip
```

---

## State management

State is stored locally by default (`terraform.tfstate`).

**Remote backend (S3 example):**
```hcl
terraform {
  backend "s3" {
    bucket = "my-tofu-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}
```

Re-init after changing backend:
```bash
tofu init -migrate-state
```

---

## Modules

**Create a module:**
```
modules/
  vpc/
    main.tf
    variables.tf
    outputs.tf
```

**Use the module:**
```hcl
module "vpc" {
  source = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
}

output "vpc_id" {
  value = module.vpc.vpc_id
}
```

---

## Migrating from Terraform

OpenTofu is designed as a drop-in replacement:

1. Replace `terraform` with `tofu` in your commands
2. Optionally create an alias:
   ```bash
   alias terraform=tofu
   ```
3. Re-run `tofu init` to migrate state and providers

**State compatibility:**
- OpenTofu can read Terraform state files
- Keep backups before migrating

---

## Best practices
- Use remote state (S3, Terraform Cloud, etc.)
- Lock state with DynamoDB or similar
- Use modules for reusable components
- Pin provider versions
- Run `tofu fmt` and `tofu validate` before committing

---

## References
- Docs: https://opentofu.org/docs/
- GitHub: https://github.com/opentofu/opentofu
- Migration guide: https://opentofu.org/docs/intro/migration/
