# Git Workflows - Collaboration Strategies

## Table of Contents
- [Introduction](#introduction)
- [Gitflow Workflow](#gitflow-workflow)
  - [How it Works](#how-it-works-gitflow)
  - [Pros & Cons](#pros--cons-gitflow)
- [GitHub Flow](#github-flow)
  - [How it Works](#how-it-works-github)
  - [Pros & Cons](#pros--cons-github)
- [Trunk-Based Development](#trunk-based-development)
  - [How it Works](#how-it-works-trunk)
  - [Pros & Cons](#pros--cons-trunk)
- [Conventional Commits](#conventional-commits)
- [Resources](#resources)

---

## Introduction

A **Git Workflow** is a recipe or recommendation for how to use Git to accomplish work in a consistent and productive manner. It defines the branching model, code review process, and deployment strategy.

---

## Gitflow Workflow
*The Classic "Heavy" Model*

Ideally suited for projects with a scheduled release cycle.

### How it Works
It uses two main branches to record the history of the project:
1.  **main** (or master): Stores the official release history.
2.  **develop**: Serves as an integration branch for features.

Scanning branches:
-   **Feature branches**: Branched from `develop`, merged back to `develop`.
-   **Release branches**: Branched from `develop`, merged into `main` and `develop`.
-   **Hotfix branches**: Branched from `main`, merged into `main` and `develop`.

### Pros & Cons
-   **Pros**: Clear structure, good for managing versions/releases.
-   **Cons**: Complex, "merge hell" if features live too long, overkill for continuous deployment.

---

## GitHub Flow
*The "Simple" Model used by GitHub*

A lightweight, branch-based workflow that supports teams and projects where deployments are made regularly.

### How it Works
1.  **Main is always deployable**.
2.  Create a branch from `main` to work on a feature/fix.
3.  Commit changes locally.
4.  Open a **Pull Request (PR)** to discuss changes.
5.  Deploy the branch to verify (optional).
6.  Merge to `main`.

### Pros & Cons
-   **Pros**: Simple, perfect for Continuous Delivery (CI/CD).
-   **Cons**: Less control over release versions (releases happen continuously).

---

## Trunk-Based Development
*The "Modern/DevOps" Model*

Developers collaborate on a single branch (`trunk` or `main`), resisting any long-lived development branches.

### How it Works
-   Developers commit directly to `main` multiple times a day.
-   OR developers use very short-lived feature branches (hours, not days) that merge to `main`.
-   **Feature Flags**: Use toggles in code to hide unfinished features from users, even if the code requires being in production.

### Pros & Cons
-   **Pros**: Enables true Continuous Integration, avoids merge conflicts, fast feedback.
-   **Cons**: Requires high test coverage and mature team discipline.

---

## Conventional Commits

A specification for adding human and machine-readable meaning to commit messages.

**Structure**:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types**:
-   `feat`: A new feature
-   `fix`: A bug fix
-   `docs`: Documentation only changes
-   `chore`: Build process or auxiliary tool changes
-   `refactor`: A code change that neither fixes a bug nor adds a feature

**Example**:
```
feat(auth): implement Google OAuth2 login
```

---

## Resources

-   [Atlassian Git Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)
-   [Trunk Based Development](https://trunkbaseddevelopment.com/)
-   [Conventional Commits](https://www.conventionalcommits.org/)
