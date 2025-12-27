## Expansion Plan 26 for Runexis Forge part 1

## Status (started)

- [x] GitHub Actions CI: markdown lint, link check, spellcheck
- [x] Prose lint: Vale (Microsoft + write-good)
- [x] Docs site scaffold: MkDocs (Material) + CI build
- [x] Repo hygiene: CODEOWNERS + Dependabot for GitHub Actions
- [x] Security: secret scanning (gitleaks)

### New content created

- n8n:
	- `Cloud-DevOps/n8n/intro.md`
	- `Cloud-DevOps/n8n/user-guide.md`
	- `Cloud-DevOps/n8n/examples/docker-compose.yml`
- Virtualization (Windows):
	- `Operating-Systems/Windows/Virtualization/intro.md`
	- `Operating-Systems/Windows/Virtualization/virtualbox.md`
	- `Operating-Systems/Windows/Virtualization/vmware.md`
- Containers & DevOps expansion:
	- Podman: `Cloud-DevOps/Podman/intro.md`, `user-guide.md`
	- Helm: `Cloud-DevOps/Helm/intro.md`, `user-guide.md`
	- Azure DevOps Pipelines: `Cloud-DevOps/AzureDevOpsPipelines/intro.md`, `user-guide.md`
	- ArgoCD: `Cloud-DevOps/ArgoCD/intro.md`, `user-guide.md`
	- Flux: `Cloud-DevOps/Flux/intro.md`, `user-guide.md`
	- OpenTofu: `Cloud-DevOps/OpenTofu/intro.md`, `user-guide.md`
	- GitHub Actions: `Cloud-DevOps/GitHub/starter-workflows.md`
- Backend expansion:
	- gRPC: `Backend-Web/gRPC/intro.md`, `user-guide.md`
	- GraphQL: `Backend-Web/GraphQL/intro.md`, `user-guide.md`
	- Redis patterns: `SQL&DB'S/Redis/patterns-guide.md`
	- Background Jobs: `Backend-Web/BackgroundJobs/intro.md`, `celery-guide.md`, `sidekiq-guide.md`
	- OAuth 2.0 & OIDC: `Backend-Web/OAuth-OIDC/intro.md`, `user-guide.md`

- Observability expansion:
	- OpenTelemetry: `Cloud-DevOps/OpenTelemetry/intro.md`, `user-guide.md`
	- Prometheus: `Cloud-DevOps/Prometheus/intro.md`, `user-guide.md`
	- Grafana: `Cloud-DevOps/Grafana/intro.md`, `user-guide.md`
	- Loki: `Cloud-DevOps/Loki/intro.md`, `user-guide.md`
	- ELK & OpenSearch: `Cloud-DevOps/ELK-OpenSearch/intro.md`, `user-guide.md`

- Security expansion:
	- OWASP Top 10: `Security-Testing/OWASP-Top-10/intro.md`, `user-guide.md`
	- Semgrep: `Security-Testing/Semgrep/intro.md`, `user-guide.md`
	- Dependency Scanning: `Security-Testing/Dependency-Scanning/intro.md`, `user-guide.md`
	- Secrets Scanning: `Security-Testing/Secrets-Scanning/intro.md`, `user-guide.md`

- Data expansion:
	- dbt: `Data-Analytics/dbt/intro.md`, `user-guide.md`
	- Apache Airflow: `Data-Analytics/Airflow/intro.md`, `user-guide.md`
	- DuckDB: `Data-Analytics/DuckDB/intro.md`, `user-guide.md`
	- Lakehouse basics: `Data-Analytics/Lakehouse/intro.md`, `user-guide.md`

- Dev experience & templates:
	- Dev Container: `.devcontainer/devcontainer.json`
	- Issue Forms: `.github/ISSUE_TEMPLATE/bug_report.yml`, `feature_request.yml`, `question.yml`

## Software/technologies to consider adding as topics (content expansion)

- Containers & DevOps: Podman, Helm, GitHub Actions “starter workflows”, Azure DevOps Pipelines, ArgoCD/Flux, OpenTofu (Terraform alternative).
- Backend: Node.js (Express/NestJS), gRPC, GraphQL, Redis patterns, background jobs (Celery / Sidekiq), API auth (OAuth2/OIDC).
- Observability: OpenTelemetry, Prometheus/Grafana, Loki, ELK/OpenSearch.
- Security: OWASP Top 10, Semgrep, dependency scanning basics, secrets scanning (how-to + prevention).
- Data: dbt, Airflow, DuckDB, modern lakehouse basics (Delta/Iceberg/Hudi) if that fits your audience.

---

- GitHub Actions CI (workflows): add workflows to run on PRs:
Markdown lint using your existing .markdownlint.json
Broken link checking (internal + external)
Spellcheck / prose lint (lightweight)
Optional: validate TOC / consistency checks (duplicate headings, malformed frontmatter, etc.)

- Link-check tooling: e.g., lychee or markdown-link-check to catch dead links early (very common issue in learning repos).
- Prose quality tooling: Vale (style rules) and/or codespell (typos). This dramatically improves perceived quality with low effort.
- Pre-commit hooks: add pre-commit config so contributors automatically run markdownlint + link checks + whitespace fixes before committing.
- Docs site generator (optional but very impactful): MkDocs (Material) or Docusaurus to turn the repo into a browsable website with search + navigation instead of relying on GitHub browsing. This is the biggest UX upgrade for a knowledgebase.
- Dev Container / Codespaces: add a .devcontainer/ so anyone can contribute with one click (consistent tooling: markdownlint, vale, link checker).
- Repo hygiene automation:
CODEOWNERS (review routing)
dependabot.yml for GitHub Actions (even if you only depend on actions, keeping them updated matters)
Issue forms (YAML issue forms) if you want stricter reporting than Markdown templates
- Consistency metadata: a simple frontmatter schema (or a small metadata.json) for each guide: difficulty, prerequisites, last-reviewed date, tested-on versions. Then CI can enforce “must have last-reviewed within N months” for key docs.

--- 
### N8N Related Content Ideas
- What is n8n? Overview, features, and benefits of using n8n for workflow automation.
- Getting Started with n8n: Installation guides (Docker, n8n.cloud, self-hosted), initial setup, and first workflow creation.
- n8n Workflow Tutorials: Step-by-step guides for building common workflows (e.g., email automation, data syncing, social media posting).
- Advanced n8n Features: Using expressions, variables, error handling, and custom functions within n8n workflows.
- N8N integration guides: popular connectors, custom connector creation, best practices for workflows.
 with With proper guidance. Dev.to article : https://dev.to/srijan-xi/n8ndocker-f5l

### VM ware and Visual Box Related Content Ideas
- Introduction to Virtualization: Basics of virtualization, benefits, and use cases.
- Getting Started with VMware: Installation, configuration, and creating your first virtual machine.
- Using VirtualBox: Step-by-step guide to installing VirtualBox, creating VMs, and managing virtual environments.
- VMware vs. VirtualBox: Comparison of features, performance, and use cases for both virtualization platforms.
- Advanced Virtualization Techniques: Snapshots, cloning, networking, and resource management in VMware and VirtualBox.
- Troubleshooting Common Issues: Solutions to common problems faced while using VMware and VirtualBox.
- Best Practices for Virtualization: Tips for optimizing performance, security, and resource allocation in virtual environments.
- Use Cases and Tutorials: Real-world scenarios and step-by-step guides for using VMware and VirtualBox in different contexts (development, testing, learning).
- Integration with Other Tools: How to integrate VMware and VirtualBox with other software and tools for enhanced functionality.
- Community and Resources: Where to find help, tutorials, forums, and additional learning materials for VMware and VirtualBox users.
- Security Considerations: Best practices for securing virtual machines and environments in VMware and VirtualBox.
- Automation and Scripting: Using PowerCLI for VMware and VBoxManage for VirtualBox to automate tasks and manage VMs programmatically.
- Performance Optimization: Techniques to improve the performance of virtual machines in both VMware and VirtualBox.
- Use Cases in Development and Testing: How developers and testers can leverage VMware and VirtualBox for efficient workflows.
- Future Trends in Virtualization: Emerging technologies and trends in the virtualization space.

---


