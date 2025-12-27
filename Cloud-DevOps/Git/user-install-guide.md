# Git User Installation and Usage Guide

## Table of Contents

1. [Installation](#installation)
2. [Initial Configuration](#initial-configuration)
3. [Basic Commands](#basic-commands)
4. [Working with Repositories](#working-with-repositories)
5. [Branching and Merging](#branching-and-merging)
6. [Remote Repositories](#remote-repositories)
7. [Advanced Operations](#advanced-operations)
8. [Git Workflows](#git-workflows)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Installation

### Windows

#### Method 1: Git for Windows (Recommended)

1. **Download:**
   - Visit [git-scm.com/download/win](https://git-scm.com/download/win)
   - Download will start automatically

2. **Install:**
   - Run the installer
   - Recommended settings:
     - ✓ Git Bash Here
     - ✓ Git GUI Here
     - Default editor: VS Code or your preference
     - PATH environment: "Git from the command line and also from 3rd-party software"
     - HTTPS transport: OpenSSL
     - Line ending conversions: "Checkout Windows-style, commit Unix-style"
     - Terminal emulator: MinTTY
     - Default pull behavior: "Default (fast-forward or merge)"
     - Credential helper: Git Credential Manager

3. **Verify Installation:**

```powershell
git --version
```bash

#### Method 2: Winget (Windows Package Manager)

```powershell
winget install --id Git.Git -e --source winget
```bash

#### Method 3: Chocolatey

```powershell
choco install git
```bash

### macOS

#### Method 1: Homebrew (Recommended)

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Git
brew install git
```bash

#### Method 2: Xcode Command Line Tools

```bash
xcode-select --install
```bash

#### Method 3: Official Installer

- Download from [git-scm.com/download/mac](https://git-scm.com/download/mac)
- Run the installer package

**Verify Installation:**

```bash
git --version
```bash

### Linux

#### Debian/Ubuntu

```bash
sudo apt update
sudo apt install git
```bash

#### Fedora/RHEL/CentOS

```bash
# Fedora
sudo dnf install git

# RHEL/CentOS
sudo yum install git
```bash

#### Arch Linux

```bash
sudo pacman -S git
```bash

#### openSUSE

```bash
sudo zypper install git
```bash

**Verify Installation:**

```bash
git --version
```bash

---

## Initial Configuration

### Set Up User Identity

**Required for commits:**

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"
```bash

### Configure Default Branch Name

```bash
git config --global init.defaultBranch main
```bash

### Set Default Editor

```bash
# VS Code
git config --global core.editor "code --wait"

# Vim
git config --global core.editor "vim"

# Nano
git config --global core.editor "nano"

# Notepad (Windows)
git config --global core.editor "notepad"
```bash

### Enable Color Output

```bash
git config --global color.ui auto
```text

### Configure Line Endings

**Windows:**

```bash
git config --global core.autocrlf true
```text

**macOS/Linux:**

```bash
git config --global core.autocrlf input
```text

### View Configuration

```bash
# View all settings
git config --list

# View specific setting
git config user.name

# View configuration location
git config --list --show-origin
```text

### Configure Aliases (Optional but Useful)

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'
```text

---

## Basic Commands

### Creating a Repository

#### Initialize New Repository

```bash
# Create and navigate to project directory
mkdir my-project
cd my-project

# Initialize Git repository
git init
```text

#### Clone Existing Repository

```bash
# Clone from URL
git clone https://github.com/username/repository.git

# Clone to specific directory
git clone https://github.com/username/repository.git my-folder

# Clone specific branch
git clone -b branch-name https://github.com/username/repository.git
```text

### Checking Status

```bash
# Check repository status
git status

# Short status format
git status -s
```text

### Staging Changes

```bash
# Stage specific file
git add filename.txt

# Stage multiple files
git add file1.txt file2.txt

# Stage all changes in directory
git add .

# Stage all changes (including deletions)
git add -A

# Stage all modified files (not new files)
git add -u

# Interactive staging
git add -p
```text

### Committing Changes

```bash
# Commit staged changes
git commit -m "Commit message"

# Commit with detailed message
git commit

# Stage and commit in one step (tracked files only)
git commit -am "Commit message"

# Amend last commit
git commit --amend -m "Updated commit message"

# Amend without changing message
git commit --amend --no-edit
```text

### Viewing History

```bash
# View commit history
git log

# Condensed one-line format
git log --oneline

# Show last n commits
git log -n 5

# Show changes in commits
git log -p

# Show statistics
git log --stat

# Graphical view
git log --graph --oneline --all

# Filter by author
git log --author="John"

# Filter by date
git log --since="2 weeks ago"
git log --after="2024-01-01" --before="2024-12-31"

# Search commit messages
git log --grep="bug fix"
```text

### Viewing Changes

```bash
# View unstaged changes
git diff

# View staged changes
git diff --staged

# View changes in specific file
git diff filename.txt

# Compare branches
git diff branch1..branch2

# Compare commits
git diff commit1 commit2
```text

### Undoing Changes

```bash
# Unstage file (keep changes)
git reset HEAD filename.txt

# Discard changes in working directory
git checkout -- filename.txt

# Restore file from specific commit
git checkout commit-hash -- filename.txt

# Unstage all files
git reset HEAD

# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes unstaged)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```text

### Removing Files

```bash
# Remove file from repository and working directory
git rm filename.txt

# Remove file from repository only (keep locally)
git rm --cached filename.txt

# Remove directory
git rm -r directory-name
```text

### Moving/Renaming Files

```bash
# Rename file
git mv old-name.txt new-name.txt

# Move file
git mv file.txt directory/
```text

---

## Working with Repositories

### .gitignore File

Create `.gitignore` to exclude files from version control:

```gitignore
# Ignore node_modules
node_modules/

# Ignore build outputs
dist/
build/
*.class
*.jar

# Ignore logs
*.log
logs/

# Ignore OS files
.DS_Store
Thumbs.db

# Ignore IDE files
.vscode/
.idea/
*.swp

# Ignore environment files
.env
.env.local

# Ignore compiled files
*.pyc
__pycache__/
```text

### Stashing Changes

```bash
# Stash current changes
git stash

# Stash with message
git stash save "Work in progress"

# List stashes
git stash list

# Apply latest stash
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Apply and remove stash
git stash pop

# Remove stash
git stash drop stash@{0}

# Clear all stashes
git stash clear

# Show stash changes
git stash show -p
```text

### Tagging

```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Version 1.0.0"

# Tag specific commit
git tag -a v1.0.0 commit-hash -m "Version 1.0.0"

# List tags
git tag

# Show tag details
git show v1.0.0

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push origin --tags

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
```text

---

## Branching and Merging

### Branch Operations

```bash
# List branches
git branch

# List all branches (including remote)
git branch -a

# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch to branch
git checkout -b feature-name

# Switch to previous branch
git checkout -

# Rename current branch
git branch -m new-name

# Rename other branch
git branch -m old-name new-name

# Delete branch
git branch -d feature-name

# Force delete unmerged branch
git branch -D feature-name

# Delete remote branch
git push origin --delete feature-name
```text

### Merging

```bash
# Merge branch into current branch
git merge feature-name

# Merge with no fast-forward
git merge --no-ff feature-name

# Abort merge
git merge --abort

# Continue merge after resolving conflicts
git merge --continue
```text

### Resolving Merge Conflicts

1. **Identify conflicted files:**

```bash
git status
```text

1. **Open conflicted files and look for:**

```text
<<<<<<< HEAD
Your changes
=======
Incoming changes
>>>>>>> feature-branch
```text

1. **Edit file to resolve conflict**

2. **Stage resolved files:**

```bash
git add resolved-file.txt
```text

1. **Complete the merge:**

```bash
git commit
```text

### Rebasing

```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Continue after resolving conflicts
git rebase --continue

# Skip current commit
git rebase --skip

# Abort rebase
git rebase --abort
```text

---

## Remote Repositories

### Managing Remotes

```bash
# List remotes
git remote

# List remotes with URLs
git remote -v

# Add remote
git remote add origin https://github.com/username/repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename old-name new-name

# Change remote URL
git remote set-url origin https://github.com/username/new-repo.git

# Show remote details
git remote show origin
```text

### Fetching and Pulling

```bash
# Fetch from remote (doesn't merge)
git fetch origin

# Fetch all remotes
git fetch --all

# Pull (fetch + merge)
git pull origin main

# Pull with rebase
git pull --rebase origin main

# Pull all branches
git pull --all
```text

### Pushing

```bash
# Push to remote
git push origin main

# Push and set upstream
git push -u origin main

# Push all branches
git push --all origin

# Push tags
git push --tags

# Force push (use with caution!)
git push --force origin main

# Force push with lease (safer)
git push --force-with-lease origin main
```text

### Tracking Branches

```bash
# Create tracking branch
git checkout -b local-branch origin/remote-branch

# Set upstream for existing branch
git branch --set-upstream-to=origin/main main

# Show tracking branches
git branch -vv
```text

---

## Advanced Operations

### Cherry-Pick

```bash
# Apply specific commit to current branch
git cherry-pick commit-hash

# Cherry-pick multiple commits
git cherry-pick commit1 commit2

# Cherry-pick range
git cherry-pick commit1^..commit2
```text

### Reverting

```bash
# Revert specific commit (creates new commit)
git revert commit-hash

# Revert without committing
git revert -n commit-hash

# Revert merge commit
git revert -m 1 merge-commit-hash
```text

### Cleaning

```bash
# Show what would be removed
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove ignored files too
git clean -fdx
```text

### Bisect (Find Bug Introduction)

```bash
# Start bisect
git bisect start

# Mark current commit as bad
git bisect bad

# Mark known good commit
git bisect good commit-hash

# Test and mark
git bisect good  # or bad

# End bisect
git bisect reset
```text

### Submodules

```bash
# Add submodule
git submodule add https://github.com/user/repo.git path/to/submodule

# Initialize submodules
git submodule init

# Update submodules
git submodule update

# Clone with submodules
git clone --recurse-submodules https://github.com/user/repo.git

# Update submodule to latest
git submodule update --remote
```text

---

## Git Workflows

### Feature Branch Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push to remote
git push -u origin feature/new-feature

# 4. Create pull request on GitHub/GitLab

# 5. After approval, merge to main
git checkout main
git merge feature/new-feature

# 6. Delete feature branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```text

### Git Flow

```bash
# Main branches: main (production), develop (integration)

# Start new feature
git checkout -b feature/my-feature develop

# Finish feature
git checkout develop
git merge --no-ff feature/my-feature
git branch -d feature/my-feature

# Start release
git checkout -b release/1.0.0 develop

# Finish release
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0
git checkout develop
git merge --no-ff release/1.0.0
git branch -d release/1.0.0

# Hotfix
git checkout -b hotfix/1.0.1 main
# Fix and commit
git checkout main
git merge --no-ff hotfix/1.0.1
git tag -a v1.0.1
git checkout develop
git merge --no-ff hotfix/1.0.1
git branch -d hotfix/1.0.1
```text

---

## Troubleshooting

### Common Issues

#### Undo Last Commit

```bash
# Keep changes
git reset --soft HEAD~1

# Discard changes
git reset --hard HEAD~1
```text

#### Fix Wrong Commit Message

```bash
git commit --amend -m "Correct message"
```text

#### Recover Deleted Branch

```bash
# Find commit hash
git reflog

# Recreate branch
git checkout -b recovered-branch commit-hash
```text

#### Discard Local Changes

```bash
# Single file
git checkout -- filename

# All files
git reset --hard HEAD
```text

#### Authentication Issues

```bash
# Use SSH instead of HTTPS
git remote set-url origin git@github.com:username/repo.git

# Or use Personal Access Token
# Configure credential helper
git config --global credential.helper store
```text

---

## Best Practices

### 1. Commit Messages

```text
# Good format:
Short summary (50 chars or less)

More detailed explanation (wrap at 72 chars):
- What changed
- Why it changed
- Any side effects

# Examples:
"Fix login bug causing crashes"
"Add user authentication feature"
"Refactor database connection logic"
```text

### 2. Commit Frequency

- Commit often with logical chunks
- Each commit should be a working state
- Don't commit broken code

### 3. Branch Naming

```text
feature/user-authentication
bugfix/login-error
hotfix/security-patch
release/v1.2.0
```text

### 4. Before Pushing

```bash
# Always pull first
git pull --rebase

# Review changes
git diff

# Check status
git status

# Then push
git push
```text

### 5. Never Commit

- Passwords or API keys
- Binary files (use Git LFS)
- Generated files
- OS-specific files
- IDE configuration (unless team standard)

---

## Useful Resources

### Official Documentation

- [Git Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2) (Free)
- [Git Reference](https://git-scm.com/docs)

### Interactive Learning

- [Learn Git Branching](https://learngitbranching.js.org/)
- [Git Immersion](http://gitimmersion.com/)
- [GitHub Learning Lab](https://lab.github.com/)

### Cheat Sheets

- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)

### Community

- [Stack Overflow - Git](https://stackoverflow.com/questions/tagged/git)
- [Git Users Mailing List](https://git-scm.com/community)

---

**Congratulations!** You now have a comprehensive guide to Git. Practice these commands regularly to become proficient!
