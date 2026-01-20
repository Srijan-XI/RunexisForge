# Version Control

> **Track changes, collaborate effectively, and manage code history**

---

## 📋 Overview

Version control is the foundation of modern software development. It enables teams to track changes, collaborate seamlessly, and maintain a complete history of their codebase.

### Why Version Control?

✅ **Track Changes** - See who changed what and when  
✅ **Collaborate** - Multiple developers working together  
✅ **Revert Mistakes** - Go back to any previous version  
✅ **Branching** - Experiment without affecting main code  
✅ **Code Review** - Review changes before merging  
✅ **Backup** - Distributed copies of your code  

---

## 🛠️ Tools in This Category

### [Git](./Git/)
**The distributed version control system**

- Industry standard for version control
- Fast, efficient, and powerful
- Works offline
- Flexible branching and merging
- Large ecosystem of tools

**Best for:** Everyone (mandatory skill)

---

### Code Hosting Platforms

#### [GitHub](./Platforms/GitHub/)
**The world's largest code hosting platform**

- 100+ million developers
- Excellent collaboration features
- GitHub Actions for CI/CD
- Large open-source community
- Free for public repositories

**Best for:** Open source, collaboration, CI/CD integration

---

#### [GitLab](./Platforms/GitLab/)
**Complete DevOps platform**

- Built-in CI/CD
- Issue tracking
- Project management
- Container registry
- Self-hosted option

**Best for:** Complete DevOps toolchain, self-hosting

---

#### [BitBucket](./Platforms/BitBucket/)
**Atlassian's Git solution**

- Integrates with Jira
- Unlimited private repositories
- Built-in CI/CD (Pipelines)
- Pull request reviews
- Free for small teams

**Best for:** Teams using Atlassian tools

---

## 📊 Comparison Matrix

| Feature | GitHub | GitLab | BitBucket |
|---------|--------|--------|-----------|
| **Hosting** | Cloud | Cloud + Self-hosted | Cloud |
| **CI/CD** | GitHub Actions | GitLab CI | Pipelines |
| **Free Private Repos** | ✅ Unlimited | ✅ Unlimited | ✅ Unlimited |
| **Self-Hosted** | Enterprise only | ✅ Free | Datacenter only |
| **Issue Tracking** | ✅ | ✅ | ✅ |
| **Code Review** | Pull Requests | Merge Requests | Pull Requests |
| **Container Registry** | ✅ | ✅ | ❌ |
| **Best For** | Open source | Complete DevOps | Atlassian users |

---

## 🎯 Which Should You Choose?

### Choose GitHub if:
- You want the largest community
- You're working on open source
- You want simple, effective CI/CD
- You need extensive marketplace integrations

### Choose GitLab if:
- You want a complete DevOps platform
- You need self-hosting capability
- You want advanced CI/CD features
- You prefer an all-in-one solution

### Choose BitBucket if:
- You're using Jira or Confluence
- You're heavily invested in Atlassian
- You want simple Git hosting
- You need Jira integration

---

## 🚀 Getting Started

### 1. Install Git

**Windows:**
```powershell
winget install Git.Git
```

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt install git  # Ubuntu/Debian
sudo yum install git  # CentOS/RHEL
```

### 2. Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Create Your First Repository

```bash
mkdir my-project
cd my-project
git init
echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"
```

### 4. Push to Remote

**GitHub:**
```bash
git remote add origin https://github.com/username/my-project.git
git branch -M main
git push -u origin main
```

---

## 📖 Common Workflows

### GitFlow Workflow
```
main (production)
  ├── develop (integration)
  │   ├── feature/login
  │   ├── feature/dashboard
  │   └── feature/api
  ├── release/v1.0
  └── hotfix/critical-bug
```

**Best for:** Scheduled releases, large teams

### GitHub Flow
```
main (always deployable)
  ├── feature-branch-1
  ├── feature-branch-2
  └── feature-branch-3
```

**Best for:** Continuous deployment, small teams

### Trunk-Based Development
```
main (trunk)
  ├── short-lived-branch-1
  └── short-lived-branch-2
```

**Best for:** High-performing teams, fast iteration

---

## ✅ Best Practices

### Commits

✅ Commit often, with clear messages  
✅ Write descriptive commit messages  
✅ One logical change per commit  
✅ Keep commits focused and atomic  

**Good commit message:**
```
feat: add user authentication

- Implement JWT-based authentication
- Add login and signup endpoints
- Include password hashing with bcrypt

Closes #123
```

### Branching

✅ Use descriptive branch names  
✅ Delete branches after merging  
✅ Keep branches short-lived  
✅ Regularly sync with main  

**Branch naming conventions:**
```
feature/user-authentication
bugfix/login-error
hotfix/security-patch
release/v1.2.0
```

### Pull/Merge Requests

✅ Write clear descriptions  
✅ Link related issues  
✅ Request specific reviewers  
✅ Respond to feedback promptly  
✅ Keep PRs focused and small  

### Code Review

✅ Review within 24 hours  
✅ Be constructive and kind  
✅ Explain your suggestions  
✅ Approve only when confident  
✅ Test changes locally if needed  

---

## 🎓 Learning Resources

### Beginner
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub Learning Lab](https://lab.github.com)
- [Git Basics Tutorial](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

### Intermediate
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [Advanced Git Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Git Branching Strategies](https://nvie.com/posts/a-successful-git-branching-model/)

### Advanced
- [Git Internals](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
- [Mastering Git](https://thoughtbot.com/upcase/mastering-git)

---

## 🔍 Common Commands

### Basic Operations
```bash
git clone <url>              # Clone repository
git add <file>               # Stage changes
git commit -m "message"      # Commit changes
git push                     # Push to remote
git pull                     # Pull from remote
git status                   # Check status
```

### Branching
```bash
git branch <name>            # Create branch
git checkout <name>          # Switch branch
git checkout -b <name>       # Create and switch
git merge <branch>           # Merge branch
git branch -d <name>         # Delete branch
```

### History
```bash
git log                      # View history
git log --oneline            # Compact history
git diff                     # See changes
git show <commit>            # Show commit details
```

### Undoing Changes
```bash
git reset HEAD <file>        # Unstage file
git checkout -- <file>       # Discard changes
git revert <commit>          # Revert commit
git reset --hard <commit>    # Reset to commit
```

---

## 📚 Related Resources

- [Getting Started Guide](../GETTING-STARTED.md)
- [DevOps Lifecycle](../DEVOPS-LIFECYCLE.md)
- [CI/CD Tools](../03-CI-CD/)
- [Git Cheat Sheet](../13-Reference/cheat-sheets/)

---

**Ready to master version control?**  
👉 Start with the [Git Guide](./Git/)

---

*Last Updated: 2026-01-20*  
*Part of the Cloud-DevOps Complete Guide*
