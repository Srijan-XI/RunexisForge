# OpenTofu — Introduction

OpenTofu is an open-source infrastructure-as-code tool, forked from Terraform 1.5. It's a drop-in replacement for Terraform with a community-driven governance model.

## Why OpenTofu?
- **Open-source forever**: licensed under MPL 2.0 (unlike newer Terraform versions)
- **Terraform-compatible**: use existing `.tf` files and providers
- **Community-driven**: governed by the Linux Foundation
- **No vendor lock-in**: free to use, modify, and distribute

## Key concepts (same as Terraform)
- **Providers**: plugins to interact with cloud APIs (AWS, Azure, GCP)
- **Resources**: infrastructure components (VMs, databases, networks)
- **State**: tracks current infrastructure
- **Plan**: preview changes before applying
- **Modules**: reusable infrastructure templates

## OpenTofu vs Terraform
- Same workflow and HCL syntax
- OpenTofu is community-governed
- Terraform 1.6+ uses BSL license (Business Source License)

## When to use OpenTofu
- Migrating from Terraform to avoid licensing concerns
- Starting new IaC projects with an open-source-first approach
- Teams that prefer community governance over vendor control

## Where to go next
- User guide: `Cloud-DevOps/OpenTofu/user-guide.md`
- Examples: `Cloud-DevOps/OpenTofu/examples/`
