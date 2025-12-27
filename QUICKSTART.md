# Quick Start Guide 🚀

Get up and running with any programming language in minutes!

---

## 🎯 Choose Your Path

### Path 1: Complete Beginner

Never coded before? Start here!

1. **Choose Python** (most beginner-friendly)
2. **Go to**: `Programming-Languages/PYTHON/Installation-Guide.md`
3. **Follow**: Step-by-step installation
4. **Try**: `q01_hello_world.py`
5. **Progress**: Work through questions q01-q10

### Path 2: Experienced Developer

Setting up a new language or environment?

1. **Pick your language**: Python, Java, C/C++, PHP, R, or Rust
2. **Quick install**: Follow installation guide for your OS
3. **Jump to**: Intermediate or Advanced questions
4. **Build**: Real projects with your new skills

### Path 3: Contributor

Want to contribute to the project?

1. **Read**: [CONTRIBUTING.md](CONTRIBUTING.md)
2. **Fork**: The repository
3. **Choose**: An open issue or create new content
4. **Submit**: Pull request

---

## 📦 Installation (Quick Version)

### Windows

```powershell
# Python
winget install Python.Python.3.11

# Java
winget install Oracle.JDK.17

# Rust
winget install Rustlang.Rust.MSVC
```

### macOS

```bash
# Using Homebrew
brew install python
brew install openjdk@17
brew install rust
```

### Linux (Ubuntu/Debian)

```bash
# Python
sudo apt update
sudo apt install python3 python3-pip

# Java
sudo apt install openjdk-17-jdk

# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

*For detailed instructions, see language-specific installation guides.*

---

## 📁 Repository Structure (Quick Reference)

```bash
RunexisForge/
│
├── Programming-Languages/
│   ├── README.md        # 📚 Main navigation & categorization
│   ├── CATEGORIZATION.md # 📊 Detailed language comparison
│   ├── General-purpose/
│   │   ├── Kotlin/      # Kotlin guides & questions
│   │   ├── Scala/       # Scala guides
│   │   ├── Swift/       # Swift guides & questions
│   │   └── Dart with Flutter/ # Dart/Flutter guides
│   ├── Scripting/
│   │   ├── PYTHON/      # Python guides & questions
│   │   ├── PHP/         # PHP guides & questions
│   │   ├── Ruby/        # Ruby guides
│   │   └── Bash/        # Bash shell scripting
│   ├── WebDevelopment/
│   │   ├── JavaScript/  # JavaScript + Node.js, Express.js, Next.js
│   │   └── TypeScript/  # TypeScript guides
│   ├── SystemsProgramming/
│   │   ├── Assembly/    # Assembly guides
│   │   ├── C & C++/     # C/C++ guides & questions
│   │   └── RUST/        # Rust guides & questions
│   ├── EnterpriseApplications/
│   │   ├── CSharp/      # C# guides
│   │   └── JAVA/        # Java guides & questions
│   ├── DataScience&Analytics/
│   │   ├── R/           # R guides & questions
│   │   ├── MATLAB/      # MATLAB guides
│   │   └── Kql/         # KQL query language
│   └── Cloud-native/
│       └── Golang/      # Go guides & questions
│
├── Frontend-Frameworks/
│   ├── Angular/         # Angular framework
│   ├── React/           # React library
│   ├── Vue/             # Vue.js framework
│   ├── Svelte/          # Svelte framework
│   ├── NuxtJs/          # Nuxt.js (Vue meta-framework)
│   ├── Remix/           # Remix (React framework)
│   ├── Astro/           # Astro (islands architecture)
│   ├── SolidJs/         # SolidJS framework
│   ├── Vite/            # Vite build tool
│   ├── Electron/        # Electron desktop apps
│   └── Tauri/           # Tauri desktop apps
│
├── Backend-Web/
│   ├── Django/          # Django (Python)
│   ├── Flask/           # Flask (Python)
│   ├── FastAPI/         # FastAPI (Python)
│   ├── Spring Boot/     # Spring Boot (Java)
│   ├── ASP.NET Core/    # ASP.NET Core (C#)
│   ├── Laravel/         # Laravel (PHP)
│   ├── Ruby on Rails/   # Rails (Ruby)
│   ├── Gin/             # Gin (Go)
│   ├── LangChain/       # LangChain (LLM apps)
│   └── Streamlit/       # Streamlit (Python data apps)
│
├── Cloud-DevOps/
│   ├── AWS/             # Amazon Web Services
│   ├── Azure/           # Microsoft Azure
│   ├── GCP/             # Google Cloud Platform
│   ├── DigitalOcean/    # DigitalOcean
│   ├── Docker/          # Docker containerization
│   ├── Kubernetes/      # Kubernetes orchestration
│   ├── Terraform/       # Infrastructure as Code
│   ├── Ansible/         # Configuration management
│   ├── Git/             # Git version control
│   ├── GitHub/          # GitHub & Actions
│   ├── GitLab/          # GitLab & CI/CD
│   ├── BitBucket/       # Bitbucket & Pipelines
│   └── JenKins/         # Jenkins CI/CD
│
├── Data-Analytics/
│   ├── Apache Spark/    # Apache Spark
│   ├── Apache Kafka/    # Apache Kafka
│   ├── Pandas/          # Pandas (Python)
│   ├── NumPy/           # NumPy (Python)
│   ├── TensorFlow/      # TensorFlow ML
│   ├── MariaDB/         # MariaDB database
│   ├── SQLite/          # SQLite database
│   ├── IBM_Db2/         # IBM Db2
│   ├── Neo4j/           # Neo4j graph database
│   ├── Snowflake/       # Snowflake data warehouse
│   └── BigQuery/        # Google BigQuery
│
├── Security-Testing/
│   ├── AquaSecurity/    # Aqua Security / Trivy
│   ├── SonarQube/       # SonarQube code quality
│   ├── Snyk/            # Snyk security
│   ├── HashiCorpVault/  # HashiCorp Vault
│   ├── Burp Suite Framework/
│   ├── Metasploit Framework/
│   ├── OpenVAS/         # Vulnerability scanner
│   ├── Scapy/           # Packet manipulation
│   ├── Postman/         # API testing
│   ├── Jest/            # Jest testing
│   └── Vitest/          # Vitest unit testing
│
├── Game-Engines/
│   ├── Cocos2d/         # Cocos2d (2D games)
│   ├── CryEngine/       # CryEngine (photorealistic)
│   ├── GameMaker Studio/ # GameMaker (beginner-friendly)
│   ├── Godot/           # Godot engine
│   ├── Panda3D/         # Panda3D (Python)
│   ├── Rage/            # Rage Engine (educational)
│   ├── Spring Engine/   # Spring RTS engine
│   ├── Unity/           # Unity game engine
│   └── Unreal Engine/   # Unreal Engine
│
├── Development-Tools/
│   ├── CSV/             # CSV data format
│   ├── JSON/            # JSON data format
│   ├── TOML/            # TOML config format
│   ├── XML/             # XML data format
│   └── YAML/            # YAML config format
│
├── SQL&DB'S/
│   ├── BigQuery/        # Google BigQuery
│   ├── DynamoDB/        # AWS DynamoDB
│   ├── IBM_Db2/         # IBM Db2
│   ├── MariaDB/         # MariaDB
│   ├── MongoDB/         # MongoDB (NoSQL)
│   ├── MySQL/           # MySQL
│   ├── Neo4j/           # Neo4j graph database
│   ├── PostgreSQL/      # PostgreSQL
│   ├── Redis/           # Redis cache/DB
│   └── SQLite/          # SQLite embedded DB
│
├── Operating-Systems/
│   ├── Windows/         # Windows OS guides
│   ├── macOS/           # macOS guides
│   ├── iOS/             # iOS development
│   ├── Android/         # Android development
│   └── WSL/             # Windows Subsystem for Linux
│
├── Misc/
│   ├── Cuba/            # Cuba framework
│   ├── notes/           # General notes
│   └── zsample/         # Samples and plans
│
├── Linux/               # Linux distros (25+ distributions, family-organized)
│   ├── Alpine/          # Alpine Linux (minimal, musl)
│   ├── Arch/
│   │   ├── Arch/        # Arch Linux base
│   │   ├── BlackArch/   # Security/pentesting (2800+ tools)
│   │   ├── GarudaLinux/ # Gaming-focused derivative
│   │   ├── RedArch/     # Arch + Red Hat hybrid
│   │   └── SteamOS/     # Valve's Steam Deck OS
│   ├── Debian/
│   │   ├── Debian/      # Debian base (stable)
│   │   ├── Ubuntu/      # Most popular, LTS
│   │   ├── KaliLinux/   # Pentesting & security
│   │   ├── MintLinux/   # User-friendly desktop
│   │   ├── MX_Linux/    # #1 on DistroWatch
│   │   ├── ParrotSec/   # Security, privacy, development
│   │   ├── Pop_OS/      # System76, developer-focused
│   │   ├── Tails/       # Privacy, Tor, amnesia
│   │   └── Zorin/       # Windows-like UI, beginners
│   ├── RedHat/
│   │   ├── CentOS/      # RHEL downstream (deprecated)
│   │   ├── Fedora Linux/ # RHEL upstream, cutting-edge
│   │   ├── OracleLinux/ # Oracle-supported RHEL clone
│   │   ├── RedHatEnterpriseLinux/ # Commercial enterprise
│   │   └── Rocky_Linux/ # CentOS replacement
│   ├── Gentoo/
│   │   ├── Gentoo/      # Source-based, optimization
│   │   └── ChromeOS_Flex/ # Cloud-managed, legacy HW
│   ├── NixOS/           # Declarative, reproducible
│   ├── Qubes_OS/        # Security by isolation
│   └── Slackware/       # Oldest, traditional Unix-like
│
├── README.md            # Main documentation
├── CONTRIBUTING.md      # How to contribute
├── FAQ.md               # Common questions
├── RESOURCES.md         # Learning materials
├── ROADMAP.md           # Project roadmap
└── .github/             # Templates & workflows
```

---

## 🎓 Learning Path Recommendations

### Week 1: Getting Started

- ✅ Install chosen language
- ✅ Set up IDE/editor
- ✅ Complete beginner questions (Q1-Q5)
- ✅ Read basic syntax documentation

### Week 2-4: Building Skills

- ✅ Complete intermediate questions
- ✅ Read about data structures
- ✅ Start a small project
- ✅ Learn Docker basics (optional)
- ✅ Join community discussions

### Month 2-3: Advanced Topics

- ✅ Complete advanced questions
- ✅ Build a medium-sized project
- ✅ Contribute to open source
- ✅ Explore frameworks/libraries

---

## 💡 Quick Tips

### For Learning

1. **Code daily**: Even 30 minutes helps
2. **Type, don't copy**: Manual typing builds muscle memory
3. **Experiment**: Modify examples to see what happens
4. **Debug yourself**: Try to solve errors before searching
5. **Build projects**: Apply what you learn

### For Practice Questions

1. **Read carefully**: Understand requirements first
2. **Plan first**: Pseudocode before coding
3. **Start simple**: Get basic version working first
4. **Test thoroughly**: Try edge cases
5. **Refactor**: Improve after it works

### For Contributing

1. **Start small**: Fix typos, improve docs
2. **Follow guidelines**: Read CONTRIBUTING.md
3. **Test everything**: Run code before submitting
4. **Be patient**: Reviews take time
5. **Stay engaged**: Respond to feedback

---

## 🔧 Essential Tools

### Code Editors (Pick One)

- **VS Code** (Recommended) - Free, powerful, many extensions
- **PyCharm** - Great for Python
- **IntelliJ IDEA** - Excellent for Java
- **Sublime Text** - Lightweight and fast
- **Vim/Neovim** - For terminal lovers

### Version Control

- **Git** - Essential for all developers
- **GitHub Desktop** - GUI for Git (beginners)

### Terminal/Shell

- **Windows**: PowerShell or Windows Terminal
- **macOS**: Terminal or iTerm2
- **Linux**: Your distro's default terminal

---

## 📚 Next Steps

After completing this quick start:

1. **Deep Dive**: Read full installation guide for your language
2. **Practice**: Work through all practice questions
3. **Resources**: Check [RESOURCES.md](RESOURCES.md) for courses and books
4. **Projects**: Build something from scratch
5. **Community**: Join discussions, help others
6. **Contribute**: Add your own questions or improvements

---

## ❓ Need Help?

- 📖 Check [FAQ.md](FAQ.md)
- 💬 Open an [Issue](https://github.com/Srijan-XI/Install-and-Learn-DevLangs/issues)
- 🔍 Search existing issues
- 📧 Contact maintainers

---

## 🎯 Your First Goal

**Choose ONE task to complete today:**

- [ ] Install your first programming language
- [ ] Complete "Hello World" in any language
- [ ] Solve first 3 beginner questions
- [ ] Read through one installation guide
- [ ] Fork the repository and explore the code
- [ ] Read CONTRIBUTING.md and find an issue to work on

---

**Ready to code? Pick a language and get started!** 💻✨

[⬆ Back to README](README.md) | [View All Languages](README.md#-supported-languages) | [Contribute](CONTRIBUTING.md)
