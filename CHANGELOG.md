# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-24

### Added
- **Major reorganization**: Categorized all topics into 9 main folders for better navigation
- **Programming Languages**: C#, MATLAB, Dart with Flutter, Assembly, Scala
- **Frontend Frameworks**: NuxtJs, Remix, Astro, SolidJs
- **Backend Frameworks**: Gin (Go), Electron
- **Operating Systems**: Windows, macOS, iOS, Android with complete guides
- **Linux Distributions**: NixOS, Rocky Linux, Zorin OS, Pop!_OS, MX Linux, Tails, Qubes OS, ChromeOS Flex, Alpine Linux, SteamOS
- **Databases**: MariaDB, SQLite, IBM Db2, Neo4j, Snowflake, BigQuery
- **Cloud Platforms**: Azure, AWS, GCP, DigitalOcean with complete CLI guides
- **DevSecOps Tools**: AquaSecurity/Trivy, SonarQube, Snyk, HashiCorp Vault
- **DevOps Tools**: GitLab CI/CD, GitHub Actions, Bitbucket Pipelines

### Changed
- Reorganized repository into categorized folders:
  - `01-Programming-Languages/`
  - `02-Frontend-Frameworks/`
  - `03-Backend-Web/`
  - `04-Cloud-DevOps/`
  - `05-Data-Analytics-DB/`
  - `06-Security-Testing/`
  - `07-Game-Engines/`
  - `08-Operating-Systems/`
  - `09-Misc/`
- Linux folder remains at top level with organized distro subfamilies
- Updated all documentation to reflect new structure

## [1.5.3] - 2025-12-22

### Added
- New starter topics: **WSL**, **YAML**, **TOML**, **Vite**, **Vitest**, **Streamlit**, **TensorFlow**, **LangChain**, **Tauri**, **Ruby**, **Laravel**, **Cuba**



## [1.5.2] - 2025-12-22

### Added
- **Kotlin** documentation and starter content: intro, user guide, examples, and practice questions
- **Swift** documentation and starter content: intro, user guide, examples, and practice questions

### Changed
- Updated README.md and DOCUMENTATION.md to include Kotlin and Swift

## [1.5.1] - 2025-12-22

### Added
- **Game Development** documentation and starter content:
  - **Unity**: intro, user guide, example C# script, and a practice script
  - **Unreal Engine**: intro, user guide, example snippet, and a practice task
  - **Godot**: intro, user guide, example GDScript, and a practice script
- **Infrastructure & Automation** documentation and starter content:
  - **Kubernetes**: intro, user guide, example manifest, and a practice manifest
  - **Terraform**: intro, user guide, example `.tf`, and a practice `.tf`
  - **Ansible**: intro, user guide, example inventory/playbook, and a practice playbook

## [1.5.0] - 2025-12-20

### Added
- **Data Engineering** documentation and practice content:
  - **Apache Spark**: intro, user guide, examples, and practice questions
  - **Apache Kafka**: intro, user guide, examples, and practice questions
  - **Pandas**: intro, user guide, examples, and practice questions
  - **NumPy**: intro, user guide, examples, and practice questions
- Updated README.md and DOCUMENTATION.md to include Data Engineering section

## [1.4.0] - 2025-12-19

### Added
- **Linux** comprehensive operating system guide covering:
  - Linux kernel overview and distro families (Arch, Debian, RedHat, Gentoo, Slackware, SUSE)
  - Installation guides (ISO download, USB creation, VM setup, WSL)
  - Family-specific documentation:
    - Arch family: Arch, BlackArch, Garuda Linux, RedArch
    - Debian family: Debian, Ubuntu, Linux Mint, Kali Linux, Parrot OS
    - RedHat family: RHEL, Fedora, CentOS Stream, Oracle Linux
    - Gentoo and Slackware
  - Each distro with intro.md and user-guide.md covering package managers, services, installation steps
  - Linux COMMANDS.md cheat sheet with package management, system administration, file operations, text processing, and cross-distro tips
  - Quick reference links and navigation
- Updated README.md with Operating Systems & Linux Distros table
- Updated DOCUMENTATION.md with Linux section
- Added Linux to Getting Started navigation in README

### Changed
- Enhanced project scope to include operating systems documentation
- Updated language/OS coverage in README badges and tables

## [1.3.0] - 2025-11-14

### Added
- **Bash** shell scripting guide covering:
  - Introduction to Bash and shell scripting
  - Installation and setup across platforms
  - User guide with basic commands and scripting
  - File operations and text processing
  - Variables, control structures, and functions
  - I/O redirection and process management
  - 10 practice questions (beginner to advanced)
  - Best practices and troubleshooting
- **KQL (Kusto Query Language)** comprehensive guide covering:
  - Introduction to KQL and Azure services
  - Query syntax and structure
  - Operators (where, project, summarize, extend, join)
  - Filtering and aggregation
  - Time-based analysis and series
  - User guide with practical examples
  - 10 practice queries (basic to complex)
  - Visualization and best practices
- **Git** comprehensive version control guide covering:
  - Introduction to Git and version control systems
  - Installation for Windows, macOS, and Linux
  - User installation and configuration guide
  - Basic and advanced Git commands
  - Branching, merging, and workflows
  - Remote repositories and collaboration
  - Best practices and troubleshooting
- **Jenkins** complete CI/CD automation guide covering:
  - Introduction to Jenkins and CI/CD concepts
  - Installation via Docker, package managers, and WAR file
  - Initial setup and plugin management
  - Creating jobs (Freestyle, Pipeline, Multibranch)
  - Pipeline as Code with declarative and scripted syntax
  - Source control integration (Git, GitHub, GitLab)
  - Build triggers and distributed builds
  - Agents, nodes, and credentials management
  - Best practices and security
- **Jest** testing framework guide covering:
  - Introduction to Jest and JavaScript testing
  - Installation and setup for various environments
  - Writing tests with matchers and assertions
  - Async testing and mocking
  - Snapshot testing and React component testing
  - Code coverage and configuration
  - Best practices and CI integration
- **GitHub** collaboration platform guide covering:
  - Introduction to GitHub features and workflows
  - Core concepts (repositories, branches, pull requests)
  - GitHub Actions for CI/CD
  - Projects, Issues, and Discussions
  - Permissions, governance, and security
  - Best practices and learning path
- **Postman** API platform guide covering:
  - Introduction to Postman and API testing
  - Installation (Desktop, Web, Newman CLI)
  - Creating and organizing requests and collections
  - Authorization and authentication
  - Variables and environments
  - Pre-request scripts and tests with JavaScript
  - Collection Runner and Newman for automation
  - Mock servers and monitors
  - Documentation generation and OpenAPI import
  - CI/CD integration and best practices
- **Django** Python web framework guide covering:
  - Introduction to Django and MTV architecture
  - Installation and project setup
  - Models, migrations, and ORM
  - Views, URLs, and templates
  - Django admin interface
  - Forms and validation
  - Django REST Framework basics
  - Testing and deployment
  - Best practices and ecosystem
- **Flask** Python microframework guide covering:
  - Introduction to Flask and microframework concepts
  - Installation and basic application setup
  - Routing and request handling
  - Templates and static files
  - Forms with Flask-WTF
  - SQLAlchemy integration and migrations
  - Blueprints and application factory pattern
  - Configuration management
  - Testing with pytest
  - Building JSON APIs
  - Deployment and best practices

### Changed
- Enhanced README.md with new tools and frameworks sections
- Updated badge counts (2 frameworks, 5 tools added)
- Reorganized tool categories (DevOps, Development Tools, Frameworks)
- Updated repository navigation to include new folders

## [1.2.0] - 2025-11-13

### Added
- **Docker** comprehensive introduction guide covering:
  - Core concepts (Containers, Images, Dockerfile, Docker Engine)
  - Architecture and Docker vs VMs comparison
  - Installation instructions for Windows, macOS, and Linux
  - Complete command reference (containers, images, system)
  - Dockerfile examples and multi-stage builds
  - Docker Compose for multi-container applications
  - Volumes, networking, and data persistence
  - Best practices for security and optimization
  - Real-world examples (WordPress, Node.js apps)
- **JavaScript** complete practice question series (25 questions)
- **JavaScript** questions covering beginner to expert topics:
  - Q1-Q5: Beginner (Hello World, Variables, Operators, Control Flow, Loops)
  - Q6-Q12: Intermediate (Functions, Arrays, Objects, Destructuring, Promises, Async/Await, Classes)
  - Q13-Q20: Advanced (Modules, DOM, Events, Fetch API, Error Handling, Regex, JSON, Storage)
  - Q21-Q25: Expert (Design Patterns, Closures, Prototypes, Performance, Security)
- **Node.js** comprehensive introduction guide
- **Express.js** comprehensive introduction guide
- **Next.js** comprehensive introduction guide
- Updated README with JavaScript coverage (25 questions + 3 frameworks)
- Updated language count from 9 to 10
- Updated practice questions count from 91+ to 116+

### Changed
- Enhanced README.md with JavaScript framework guides
- Updated ROADMAP with JavaScript completion status

## [1.1.0] - 2025-11-13

### Added
- **Go (Golang)** complete installation guide with introduction, advantages, disadvantages
- **Go (Golang)** 10 practice questions (beginner to advanced)
- **TypeScript** comprehensive installation and usage guide
- **TypeScript** introduction with advantages, disadvantages, and use cases
- **TypeScript** 10 practice questions covering basic to advanced topics
- **SQL** main introduction and installation overview
- **MySQL** introduction and complete installation guide
- **PostgreSQL** introduction and complete installation guide  
- **MongoDB** introduction and complete installation guide
- **Redis** introduction and complete installation guide
- **DynamoDB** introduction and AWS-specific guide
- **SQL** 10 practice questions (beginner to advanced)
- Updated README with new language badges (91+ questions, 9 languages)
- Updated ROADMAP to reflect completed goals

### Changed
- Enhanced README.md with Go, TypeScript, and SQL coverage
- Updated language count from 6 to 9
- Updated practice questions count from 61+ to 91+
- Updated ROADMAP with v1.1 completion status

## [1.0.0] - 2025-11-13 (Initial Release)

### Added
- Initial repository structure
- Python installation guide and 21 practice questions
- Java installation guide and 10 practice questions
- C/C++ installation guide and 10+ practice questions
- PHP installation guide, configuration guide, and 10 practice questions
- R installation guide and 10 practice questions
- Rust installation guide and practice questions
- MIT License
- Basic README.md
- CONTRIBUTING.md with contribution guidelines
- CODE_OF_CONDUCT.md for community guidelines
- SECURITY.md for security policy
- FAQ.md with frequently asked questions
- RESOURCES.md with curated learning materials
- Issue templates for bugs, features, and questions
- Pull request template
- GitHub Actions workflow for validation
- .editorconfig for consistent coding style
- CONTRIBUTORS.md to acknowledge contributors

### Documentation
- Installation guides for all supported languages
- Platform-specific instructions (Windows, macOS, Linux)
- Usage examples and starter scripts
- Troubleshooting guides

---

## Legend

- **Added**: New features or files
- **Changed**: Changes to existing functionality
- **Deprecated**: Features that will be removed in future releases
- **Removed**: Removed features or files
- **Fixed**: Bug fixes
- **Security**: Security improvements or vulnerability fixes
