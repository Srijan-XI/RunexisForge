# Git Workflows - Branching Strategies and Development Models

## Table of Contents
- [Introduction](#introduction)
- [Why Workflows Matter](#why-workflows-matter)
- [Popular Git Workflows](#popular-git-workflows)
  - [GitFlow](#gitflow)
  - [GitHub Flow](#github-flow)
  - [GitLab Flow](#gitlab-flow)
  - [Trunk-Based Development](#trunk-based-development)
  - [Feature Branch Workflow](#feature-branch-workflow)
- [Branching Strategies](#branching-strategies)
- [Merge vs Rebase](#merge-vs-rebase)
- [Release Management](#release-management)
- [Hotfix Workflows](#hotfix-workflows)
- [Best Practices](#best-practices)
- [Choosing the Right Workflow](#choosing-the-right-workflow)
- [Real-World Examples](#real-world-examples)
- [Common Pitfalls](#common-pitfalls)
- [Resources](#resources)

---

## Introduction

A **Git workflow** is a recipe or recommendation for how to use Git to accomplish work in a consistent and productive manner. Workflows define how teams collaborate, how code moves from development to production, and how releases are managed.

Different workflows suit different team sizes, project types, and deployment strategies. Understanding various workflows helps teams choose the best approach for their specific needs.

---

## Why Workflows Matter

### 1. **Consistency Across Teams**

- Everyone follows the same process
- Reduces confusion and conflicts
- Easier onboarding for new developers
- Predictable code review processes

### 2. **Code Quality**

- Enforces peer review through pull requests
- Isolates unstable code from production
- Enables continuous integration testing
- Maintains stable main/master branch

### 3. **Release Management**

- Clear path from development to production
- Supports multiple release strategies
- Enables hotfixes without disrupting development
- Version control for releases

### 4. **Collaboration**

- Multiple developers work simultaneously
- Clear ownership of features and fixes
- Reduced merge conflicts
- Better traceability

---

## Popular Git Workflows

### GitFlow

**Created by:** Vincent Driessen in 2010  
**Best for:** Projects with scheduled releases, larger teams, complex release cycles  
**Complexity:** High

#### Branch Structure

```
main (production-ready code)
├── develop (integration branch)
│   ├── feature/user-authentication
│   ├── feature/payment-processing
│   └── feature/email-notifications
├── release/v1.2.0
└── hotfix/critical-bug-fix
```

#### Core Branches

1. **main/master**: Production code, always stable
2. **develop**: Integration branch for features

#### Supporting Branches

1. **feature branches**: New features (`feature/feature-name`)
2. **release branches**: Release preparation (`release/v1.0.0`)
3. **hotfix branches**: Critical production fixes (`hotfix/bug-name`)

#### Workflow Steps

**1. Feature Development**

```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/user-login

# Work on feature
git add .
git commit -m "Add user login functionality"

# Push feature branch
git push origin feature/user-login

# Create pull request to develop
```

**2. Release Preparation**

```bash
# Create release branch from develop
git checkout develop
git checkout -b release/v1.0.0

# Fix release bugs, update version numbers
git commit -m "Bump version to 1.0.0"

# Merge to main
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"

# Merge back to develop
git checkout develop
git merge --no-ff release/v1.0.0

# Delete release branch
git branch -d release/v1.0.0
```

**3. Hotfix Process**

```bash
# Create hotfix from main
git checkout main
git checkout -b hotfix/security-patch

# Fix the issue
git commit -m "Fix critical security vulnerability"

# Merge to main
git checkout main
git merge --no-ff hotfix/security-patch
git tag -a v1.0.1 -m "Hotfix 1.0.1"

# Merge to develop
git checkout develop
git merge --no-ff hotfix/security-patch

# Delete hotfix branch
git branch -d hotfix/security-patch
```

#### Pros and Cons

**Pros:**
- ✅ Clear separation of concerns
- ✅ Supports parallel development
- ✅ Well-documented and widely adopted
- ✅ Excellent for scheduled releases
- ✅ Handles hotfixes elegantly

**Cons:**
- ❌ Complex for small teams
- ❌ Overhead for continuous deployment
- ❌ Long-lived branches can cause merge conflicts
- ❌ Not ideal for web apps with frequent deployments

---

### GitHub Flow

**Created by:** GitHub  
**Best for:** Web applications, continuous deployment, small to medium teams  
**Complexity:** Low

#### Branch Structure

```
main (always deployable)
├── feature/add-search
├── bugfix/fix-login
└── enhancement/improve-ui
```

#### Core Principles

1. **main branch is always deployable**
2. **Descriptive branch names**
3. **Pull requests for code review**
4. **Deploy immediately after merge**

#### Workflow Steps

```bash
# 1. Create branch from main
git checkout main
git pull origin main
git checkout -b feature/add-search

# 2. Add commits
git add .
git commit -m "Add search functionality"
git push origin feature/add-search

# 3. Open pull request
# (Done on GitHub UI)

# 4. Code review and discussion
# (Reviewers comment on PR)

# 5. Deploy branch for testing (optional)
# Deploy feature/add-search to staging

# 6. Merge to main after approval
# (Done on GitHub UI with "Merge" button)

# 7. Deploy main to production
# Continuous deployment automatically deploys
```

#### Pull Request Best Practices

```bash
# Keep PRs small and focused
# ✅ Good PR title
"Add user authentication with OAuth2"

# ✅ Good PR description
"""
## What
Implements OAuth2 authentication for users

## Why
Replaces legacy session-based auth with modern OAuth2

## How
- Added OAuth2 provider integration
- Updated user model with OAuth tokens
- Added login/logout endpoints

## Testing
- Unit tests for auth service
- Integration tests for login flow
- Manual testing on staging
"""

# ❌ Bad PR
"Updated files"
```

#### Pros and Cons

**Pros:**
- ✅ Simple and easy to learn
- ✅ Ideal for continuous deployment
- ✅ Fast iteration cycles
- ✅ Great for web applications
- ✅ Encourages code review

**Cons:**
- ❌ No formal release process
- ❌ Challenging for scheduled releases
- ❌ Limited support for multiple versions
- ❌ Can be chaotic for large teams

---

### GitLab Flow

**Created by:** GitLab  
**Best for:** Projects with multiple environments, continuous delivery  
**Complexity:** Medium

#### Variations

**1. Environment Branches**

```
main
├── pre-production
└── production
```

**2. Release Branches**

```
main
├── 2-3-stable
├── 2-4-stable
└── 2-5-stable
```

#### Environment-Based Flow

```bash
# 1. Create feature branch from main
git checkout main
git checkout -b feature/analytics

# 2. Merge to main after review
git checkout main
git merge --no-ff feature/analytics

# 3. Merge main to pre-production
git checkout pre-production
git merge main

# Test on pre-production environment

# 4. Merge pre-production to production
git checkout production
git merge pre-production

# Deploy to production
```

#### Release-Based Flow

```bash
# Create stable branch from main
git checkout main
git checkout -b 2-5-stable

# Cherry-pick bug fixes to stable branch
git checkout 2-5-stable
git cherry-pick <commit-hash>

# Deploy stable branch
```

#### Pros and Cons

**Pros:**
- ✅ Balances simplicity and structure
- ✅ Supports multiple environments
- ✅ Good for SaaS applications
- ✅ Handles versioning well
- ✅ Integrates with CI/CD pipelines

**Cons:**
- ❌ More complex than GitHub Flow
- ❌ Requires discipline
- ❌ Can have merge conflicts with long-lived branches

---

### Trunk-Based Development

**Best for:** High-performing teams, continuous integration/deployment  
**Complexity:** Low to Medium

#### Branch Structure

```
main/trunk (always green, always deployable)
├── short-lived-feature-1 (< 2 days)
└── short-lived-feature-2 (< 2 days)
```

#### Core Principles

1. **Short-lived branches** (< 2 days)
2. **Frequent commits to main**
3. **Feature flags for incomplete features**
4. **Robust CI/CD pipeline**
5. **High test coverage**

#### Workflow Steps

```bash
# 1. Create short-lived branch
git checkout main
git pull origin main
git checkout -b add-button

# 2. Make small changes
git add button.js
git commit -m "Add submit button component"

# 3. Merge quickly (same day or next day)
git checkout main
git merge add-button
git push origin main

# 4. Delete branch immediately
git branch -d add-button
```

#### Feature Flags

```javascript
// Use feature flags for incomplete features
function renderFeature() {
  if (featureFlags.isEnabled('new_checkout')) {
    return <NewCheckout />;
  }
  return <OldCheckout />;
}

// Enable feature for specific users
if (user.isInBetaGroup('new_checkout')) {
  featureFlags.enable('new_checkout');
}
```

#### Pros and Cons

**Pros:**
- ✅ Minimal merge conflicts
- ✅ Fast feedback from CI
- ✅ Simplified workflow
- ✅ Encourages small commits
- ✅ Ideal for DevOps culture

**Cons:**
- ❌ Requires mature CI/CD
- ❌ Needs comprehensive testing
- ❌ Feature flags add complexity
- ❌ Not suitable for all teams

---

### Feature Branch Workflow

**Best for:** Flexible teams, projects without strict release schedules  
**Complexity:** Low

#### Branch Structure

```
main
├── feature-1
├── feature-2
└── bugfix-1
```

#### Workflow Steps

```bash
# 1. Create feature branch
git checkout -b new-feature main

# 2. Work on feature
git commit -am "Add new feature"

# 3. Push and create PR
git push origin new-feature

# 4. Merge after review
git checkout main
git merge new-feature
git branch -d new-feature
```

#### Pros and Cons

**Pros:**
- ✅ Very simple
- ✅ Flexible
- ✅ Good for beginners

**Cons:**
- ❌ No formal release process
- ❌ Can become chaotic

---

## Branching Strategies

### Branch Naming Conventions

```bash
# Feature branches
feature/user-authentication
feature/payment-gateway
feat/JIRA-123-add-search

# Bug fixes
bugfix/login-error
fix/memory-leak
bugfix/ISSUE-456-fix-crash

# Hotfixes
hotfix/security-patch
hotfix/critical-bug

# Release branches
release/v1.0.0
release/2024-01-15

# Experimental
experiment/new-algorithm
spike/performance-test
```

### Branch Lifecycle

```bash
# 1. Create branch
git checkout -b feature/new-dashboard

# 2. Keep branch updated
git fetch origin
git rebase origin/main

# 3. Push regularly
git push origin feature/new-dashboard

# 4. Create pull request
# (Use platform UI)

# 5. Address review comments
git commit -am "Address review feedback"
git push origin feature/new-dashboard

# 6. Merge
# (Platform auto-merges or manual)

# 7. Delete branch
git branch -d feature/new-dashboard
git push origin --delete feature/new-dashboard
```

### Protected Branches

Configure protection rules on main branches:

```yaml
# GitHub branch protection example
main:
  protection:
    - require_pull_request_reviews: 2
    - require_status_checks: true
    - required_status_checks:
        - continuous-integration
        - code-coverage
    - enforce_admins: true
    - require_linear_history: true
```

---

## Merge vs Rebase

### Merge

**Creates a merge commit** that ties together histories.

```bash
git checkout main
git merge feature/login

# Creates merge commit with two parents
```

**Visualization:**
```
main:     A---B---C---F (merge commit)
                   /
feature:          D---E
```

**Pros:**
- ✅ Preserves complete history
- ✅ Non-destructive
- ✅ Shows when features were integrated

**Cons:**
- ❌ Creates merge commits
- ❌ Can clutter history
- ❌ Makes bisecting harder

### Rebase

**Rewrites history** by replaying commits.

```bash
git checkout feature/login
git rebase main

# Replays feature commits on top of main
```

**Visualization:**
```
Before:
main:     A---B---C
               \
feature:        D---E

After rebase:
main:     A---B---C
                   \
feature:            D'---E'
```

**Pros:**
- ✅ Clean, linear history
- ✅ Easier to read git log
- ✅ Better for bisecting

**Cons:**
- ❌ Rewrites history (dangerous for shared branches)
- ❌ Loses merge context
- ❌ Can be confusing for beginners

### When to Use Each

**Use Merge:**
- Public branches
- Main/master branch
- When history matters
- Team collaboration on same branch

**Use Rebase:**
- Private feature branches
- Before creating pull request
- Cleaning up local commits
- Keeping feature branch up-to-date

### Golden Rule

**⚠️ Never rebase public/shared branches!**

```bash
# ❌ NEVER do this
git checkout main
git rebase feature/something

# ✅ DO this instead
git checkout feature/something
git rebase main
```

### Interactive Rebase

Clean up commits before merging:

```bash
git rebase -i HEAD~3

# Interactive editor opens:
pick abc123 Add login form
pick def456 Fix typo
pick ghi789 Add validation

# Change to:
pick abc123 Add login form
squash def456 Fix typo
squash ghi789 Add validation

# Results in single commit: "Add login form"
```

---

## Release Management

### Semantic Versioning

Use **SemVer** (MAJOR.MINOR.PATCH):

```
v1.0.0 - Initial release
v1.1.0 - Added new feature (minor)
v1.1.1 - Fixed bug (patch)
v2.0.0 - Breaking change (major)
```

### Tagging Releases

```bash
# Lightweight tag
git tag v1.0.0

# Annotated tag (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag specific commit
git tag -a v1.0.0 <commit-hash> -m "Release 1.0.0"

# Push tags
git push origin v1.0.0
git push origin --tags

# List tags
git tag -l

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

### Release Notes

```markdown
# Release v1.2.0

## 🎉 New Features
- User authentication with OAuth2
- Email notifications
- Dark mode support

## 🐛 Bug Fixes
- Fixed memory leak in data processor
- Resolved login timeout issue

## 🔧 Improvements
- Improved search performance by 50%
- Updated dependencies

## ⚠️ Breaking Changes
- Removed deprecated API endpoints
- Changed configuration file format

## 📦 Dependencies
- Updated React to 18.2.0
- Updated Node.js minimum version to 18

## 👥 Contributors
@user1, @user2, @user3
```

### Changelog Automation

```bash
# Using conventional commits
git log --oneline --pretty=format:"%s" v1.0.0..HEAD | grep "^feat:"
git log --oneline --pretty=format:"%s" v1.0.0..HEAD | grep "^fix:"

# Generate changelog with tools
npm install -g conventional-changelog-cli
conventional-changelog -p angular -i CHANGELOG.md -s
```

---

## Hotfix Workflows

### Critical Production Bug

**GitFlow Approach:**

```bash
# 1. Create hotfix from main
git checkout main
git checkout -b hotfix/payment-crash

# 2. Fix the bug
git commit -am "Fix payment processing crash"

# 3. Merge to main
git checkout main
git merge --no-ff hotfix/payment-crash
git tag -a v1.0.1 -m "Hotfix 1.0.1"

# 4. Merge to develop
git checkout develop
git merge --no-ff hotfix/payment-crash

# 5. Deploy and cleanup
git push origin main --tags
git push origin develop
git branch -d hotfix/payment-crash
```

**GitHub Flow Approach:**

```bash
# 1. Create branch from main
git checkout main
git checkout -b fix/payment-crash

# 2. Fix and test
git commit -am "Fix payment crash"

# 3. Create PR and fast-track review
# Deploy immediately after merge

# 4. Merge to main
git checkout main
git merge fix/payment-crash
git push origin main
```

### Hotfix Checklist

- [ ] Identify root cause
- [ ] Create hotfix branch
- [ ] Write failing test
- [ ] Implement fix
- [ ] Verify fix locally
- [ ] Create pull request
- [ ] Get emergency review
- [ ] Merge to production branch
- [ ] Tag release
- [ ] Deploy to production
- [ ] Monitor for issues
- [ ] Merge back to develop
- [ ] Document in changelog
- [ ] Postmortem analysis

---

## Best Practices

### 1. Commit Best Practices

**Write Good Commit Messages:**

```bash
# ✅ Good commit message
git commit -m "Add user authentication with JWT

- Implement JWT token generation
- Add middleware for token validation
- Update user model with token fields

Closes #123"

# ❌ Bad commit message
git commit -m "fixed stuff"
```

**Conventional Commits:**

```bash
feat: add user profile page
fix: resolve memory leak in data processor
docs: update API documentation
style: format code with prettier
refactor: simplify authentication logic
test: add unit tests for user service
chore: update dependencies
```

### 2. Pull Request Best Practices

**Small, Focused PRs:**

```
✅ Good:
- PR #1: Add login component (300 lines)
- PR #2: Add logout functionality (150 lines)

❌ Bad:
- PR #1: Rewrite entire auth system (3000 lines)
```

**PR Template:**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### 3. Branch Hygiene

```bash
# Delete merged branches regularly
git branch --merged | grep -v "main\|develop" | xargs git branch -d

# Prune remote tracking branches
git remote prune origin

# List stale branches
git branch -vv | grep ': gone]'
```

### 4. Code Review Guidelines

**For Reviewers:**
- Respond within 24 hours
- Be constructive and kind
- Test the changes locally
- Check for security issues
- Verify tests are included

**For Authors:**
- Keep PRs under 400 lines
- Respond to feedback promptly
- Don't take feedback personally
- Add context in PR description

---

## Choosing the Right Workflow

### Decision Matrix

| Workflow | Team Size | Release Frequency | Complexity | Best For |
|----------|-----------|-------------------|------------|----------|
| **GitFlow** | Large (10+) | Scheduled (monthly/quarterly) | High | Enterprise, mobile apps |
| **GitHub Flow** | Small-Medium (2-10) | Continuous | Low | Web apps, SaaS |
| **GitLab Flow** | Medium (5-15) | Regular (weekly) | Medium | Multi-environment projects |
| **Trunk-Based** | Any (with mature CI/CD) | Continuous | Low-Medium | DevOps teams, microservices |
| **Feature Branch** | Small (2-5) | Flexible | Low | Startups, prototypes |

### Questions to Ask

1. **How often do you release?**
   - Continuous → GitHub Flow / Trunk-Based
   - Scheduled → GitFlow

2. **What's your team size?**
   - Small (< 5) → GitHub Flow
   - Large (10+) → GitFlow

3. **Do you need to support multiple versions?**
   - Yes → GitFlow / GitLab Flow
   - No → GitHub Flow

4. **How mature is your CI/CD?**
   - Very mature → Trunk-Based
   - Basic → GitFlow

5. **Mobile or web application?**
   - Mobile → GitFlow
   - Web → GitHub Flow

---

## Real-World Examples

### Example 1: E-Commerce Web App (GitHub Flow)

**Team:** 5 developers  
**Release:** Continuous deployment  
**Workflow:** GitHub Flow

```bash
# Developer workflow
git checkout main
git pull origin main
git checkout -b feature/add-cart

# Make changes
git commit -am "Add shopping cart functionality"
git push origin feature/add-cart

# Create PR → Review → Merge → Auto-deploy
```

**Why it works:**
- Small team can review quickly
- Continuous deployment to production
- Simple workflow, less overhead

### Example 2: Mobile Banking App (GitFlow)

**Team:** 20 developers  
**Release:** Monthly with app store review  
**Workflow:** GitFlow

```bash
# Feature development
git checkout develop
git checkout -b feature/biometric-auth

# Complete feature
git checkout develop
git merge feature/biometric-auth

# Release preparation
git checkout -b release/v2.5.0

# Fix release bugs
git commit -am "Fix biometric prompt"

# Release to app stores
git checkout main
git merge release/v2.5.0
git tag v2.5.0
```

**Why it works:**
- Scheduled releases align with app store review
- Multiple features developed in parallel
- Clear release preparation phase

### Example 3: Microservices Platform (Trunk-Based)

**Team:** 15 developers across 10 services  
**Release:** 50+ deployments per day  
**Workflow:** Trunk-Based Development

```bash
# Short-lived feature
git checkout main
git checkout -b quick-fix

# Small change
git commit -am "Update API response format"

# Merge within hours
git checkout main
git merge quick-fix
git push origin main

# CI/CD auto-deploys if tests pass
```

**Why it works:**
- High deployment frequency
- Mature CI/CD pipeline
- Feature flags control rollout

---

## Common Pitfalls

### 1. Long-Lived Feature Branches

**Problem:**
```bash
# Branch created 3 months ago
feature/major-refactor (diverged 500 commits from main)
```

**Solution:**
```bash
# Regularly rebase
git checkout feature/major-refactor
git fetch origin
git rebase origin/main

# Or break into smaller features
```

### 2. Merge Commits Everywhere

**Problem:**
```bash
# History looks like spaghetti
*   Merge branch 'main' into feature
|\  
| * Update README
* | Merge branch 'main' into feature
```

**Solution:**
```bash
# Use rebase for feature branches
git checkout feature/my-feature
git rebase main
```

### 3. Not Deleting Merged Branches

**Problem:**
```bash
git branch
# Shows 50+ merged branches
```

**Solution:**
```bash
# Auto-delete after merge (GitHub setting)
# Or delete manually
git branch -d feature/old-feature
git push origin --delete feature/old-feature
```

### 4. Force Pushing to Shared Branches

**Problem:**
```bash
# ❌ Never do this on main/develop
git push --force origin main
```

**Solution:**
```bash
# Only force push your own feature branches
git push --force-with-lease origin feature/my-branch
```

### 5. No Code Review

**Problem:**
- Direct commits to main
- No peer review
- Bugs reach production

**Solution:**
- Enforce pull requests
- Require reviews
- Use branch protection

---

## Resources

### Tools

- **GitKraken**: Visual Git client
- **Sourcetree**: Free Git GUI
- **GitHub Desktop**: Simple GitHub client
- **GitLens (VS Code)**: Enhanced Git in editor

### Documentation

- [GitFlow Original Article](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [GitLab Flow Documentation](https://docs.gitlab.com/ee/topics/gitlab_flow.html)
- [Trunk-Based Development](https://trunkbaseddevelopment.com/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)

### Books

- *Pro Git* by Scott Chacon
- *Git for Teams* by Emma Jane Hogbin Westby
- *Version Control with Git* by Jon Loeliger

### Communities

- [r/git](https://reddit.com/r/git)
- [Git Questions on Stack Overflow](https://stackoverflow.com/questions/tagged/git)
- [GitHub Community Forum](https://github.community)

---

## Summary

Git workflows provide structure for team collaboration and code management. Choose a workflow based on:

- **Team size and maturity**
- **Release frequency and strategy**
- **Project complexity**
- **CI/CD capabilities**

**Remember:**
- No workflow is perfect for all situations
- Adapt workflows to your team's needs
- Consistency matters more than the specific workflow
- Invest in automation and CI/CD
- Communicate changes clearly

Start simple (GitHub Flow), add complexity as needed (GitFlow), or optimize for speed (Trunk-Based).

---

**Next Steps:**
1. Evaluate your current workflow
2. Identify pain points
3. Choose appropriate workflow
4. Document team conventions
5. Train team members
6. Iterate and improve

Happy collaborating! 🚀
