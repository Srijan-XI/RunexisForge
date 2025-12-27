# GitHub — Introduction

## What is GitHub?

GitHub is the world’s most popular platform for hosting Git repositories and collaborating on software. It combines distributed version control (Git) with rich collaboration features like pull requests, code review, issues, Actions (CI/CD), project planning, security scanning, and more. Individuals, open-source communities, and enterprises use GitHub to plan, build, test, secure, and ship software.

## Why Use GitHub?

- Collaboration: Pull requests, reviews, comments, suggestions, and code owners.
- Automation: GitHub Actions for CI/CD, scheduled jobs, and reusable workflows.
- Planning: Issues, Projects, Discussions, milestones, and roadmaps.
- Security: Dependabot, code scanning, secret scanning, and security advisories.
- Packages: Host and consume packages (npm, Maven, NuGet, Docker images, etc.).
- Discoverability: Explore open-source projects and communities at global scale.

## Core Building Blocks

- Repository: Stores code, history, releases, wikis, and actions workflows.
- Branch: An independent line of development (e.g., `feature/login`).
- Pull Request (PR): Proposed change from one branch to another with review.
- Issue: Track bugs, tasks, features; link to PRs and commits.
- Actions: YAML-based workflows triggered by events (push, PR, schedule).
- Projects: Boards and backlogs for planning (classic and Projects Beta).
- Discussions: Q&A and open-ended conversations for a repo or org.
- Releases: Versioned artifacts and changelogs for distribution.
- Environments: Staging/production gates and secrets for deployments.
- Secrets: Encrypted variables for Actions and Dependabot.

## Typical Workflows

- Fork-and-PR: Fork a repo, push changes to your fork, open a PR upstream.
- Trunk-Based: Commit to short-lived branches, merge PRs into `main` quickly.
- GitFlow: Long-lived `develop` branch, release/hotfix branches (structured).

## GitHub Actions (Quick Glance)

Example workflow (`.github/workflows/ci.yml`):

```yaml
name: CI
on: [push, pull_request]
jobs:
 build:
  runs-on: ubuntu-latest
  steps:
   - uses: actions/checkout@v4
   - uses: actions/setup-node@v4
    with:
     node-version: '20'
   - run: npm ci
   - run: npm test -- --ci
```bash

## Permissions and Governance

- Organizations and Teams: Manage people, SSO/SAML, and granular repo access.
- Branch Protection: Required reviews, checks, and status policies.
- Code Owners: Auto-request reviews from responsible teams or individuals.

## Best Practices

- Small PRs with clear descriptions and linked issues.
- Enforce branch protection and required checks.
- Automate tests, linting, and security scans with Actions.
- Use CODEOWNERS, templates (issues/PRs), and labels consistently.
- Keep secrets in GitHub Secrets; never commit secrets.

## Learning Path

1. Create a repository and push code from local Git.
2. Open an issue and a pull request; request reviews.
3. Add a basic CI workflow with GitHub Actions.
4. Protect the `main` branch and require checks.
5. Explore Projects, Discussions, and Releases.

GitHub helps teams move fast with confidence by bringing code, collaboration, and automation together in one place.
