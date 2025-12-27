# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.2] - 2025-12-28

### Added

- GitHub Pages deployment workflow using MkDocs (build and deploy via Actions).
- Stub docs pages in `docs/` to include top-level files and reduce link warnings:
  - `FAQ.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTORS.md`, `RESOURCES.md`, `CHANGELOG.md`.

### Fixed

- MkDocs build workflow indentation in [.github/workflows/mkdocs-build.yml](.github/workflows/mkdocs-build.yml).
- Removed `--strict` from Pages deploy workflow to prevent aborting on non-critical warnings in [.github/workflows/pages.yml](.github/workflows/pages.yml).
- Updated internal links in [DOCUMENTATION.md](DOCUMENTATION.md) to match actual docs filenames and homepage (`index.md`).
- Resolved `docs/README.md` homepage conflict by relying on `docs/index.md`.

### Changed

- Recommended Pages source set to “GitHub Actions” for MkDocs-based deployment.
- Aligned branch protection guidance to require docs quality checks and Pages build/deploy.

## [2.1.1] - 2025-12-24

### Fixed

- **Documentation Accuracy**: Corrected all documentation to reflect actual repository structure
  - README.md badges now show accurate counts: 20+ frameworks, 11 databases, 25+ Linux distros, 9 game engines
  - Fixed Game Engines table to include all 9 engines (Unity, Unreal, Godot, CryEngine, Panda3D, Cocos2d, GameMaker Studio, Spring Engine, Rage)
  - Updated Linux Distributions section to show 25+ distros with family-based organization
  - Added comprehensive Linux distribution tables organized by family (Arch, Debian, Red Hat, Independent)
  - Corrected Programming-Languages section to reference new category-based organization
- **QUICKSTART.md Structure**: Updated to reflect actual hierarchical organization
  - Programming-Languages now shows subcategory structure (General-purpose/, Scripting/, WebDevelopment/, etc.)
  - Linux section shows family-based hierarchy (Arch/, Debian/, RedHat/, Gentoo/ with subdistros)
  - Added Development-Tools/ and SQL&DB'S/ sections with complete listings
  - Corrected project name from "Install-and-Learn-DevLangs" to "RunexisForge"
- **Path References**: All documentation now correctly references hierarchical paths
  - Programming-Languages/{category}/{language}/ structure documented
  - Linux/{family}/{distro}/ structure documented

### Changed

- **README.md Enhancements**:
  - Linux distributions expanded from 10+ to 25+ (actual count)
  - Game engines section now comprehensive with all 9 engines
  - Added organizational note about Programming-Languages categorization
  - Updated badge for frameworks from 18+ to 20+ (reflects actual count)
  - Updated badge for databases from 12+ to 11 (accurate count)
- **QUICKSTART.md Improvements**:
  - Repository structure tree now matches actual file organization
  - Added subcategory breakdown for all Programming-Languages
  - Expanded Linux section to show all 25+ distributions organized by family
  - Added SQL&DB'S complete database listing (11 databases)
  - Added Development-Tools section (5 tools: CSV, JSON, TOML, XML, YAML)

### Statistics

- **Verified Counts**:
  - 21 programming languages (categorized into 7 groups)
  - 20+ frontend and backend frameworks
  - 11 databases (BigQuery, DynamoDB, IBM_Db2, MariaDB, MongoDB, MySQL, Neo4j, PostgreSQL, Redis, SQLite, plus Snowflake)
  - 25+ Linux distributions across 8 families
  - 9 game engines (Unity, Unreal Engine, Godot, CryEngine, Panda3D, Cocos2d, GameMaker Studio, Spring Engine, Rage)
  - 115 intro.md files across repository
  - 110 user-guide.md files across repository

## [2.1.0] - 2025-12-24

### Added

- **Programming Language Categorization**: Comprehensive categorization system
  - Created `Programming-Languages/README.md` with categorized navigation
  - Created `Programming-Languages/CATEGORIZATION.md` with detailed analysis
  - Categories: Systems, General-Purpose, Scripting, Web, Query/DSL, Data Science, Scientific
  - Quick navigation by use case (Enterprise, Mobile, Web, Games, AI/ML, etc.)
  - Performance tiers and learning curve comparisons
  - Language ecosystem and framework mappings
- **Linux Distributions**: Three new enterprise and gaming-focused distros
  - ChromeOS Flex: Google's cloud-first OS for legacy hardware revival
  - SteamOS: Valve's gaming-focused Arch-based distribution
  - Rocky Linux: RHEL-compatible enterprise Linux (CentOS replacement)
- **Game Engine Documentation**: Rage Engine
  - Comprehensive guide to Rockstar's proprietary engine
  - GTA V and RDR2 modding guide
  - Technical analysis and learning resources
- **Development Tools Documentation**: JSON, XML, CSV
  - Complete guides for data format manipulation
  - Multi-language examples and best practices
- **Game Engines**: CryEngine, Panda3D, Cocos2d, GameMaker Studio, Spring Engine
  - Professional and indie game engine documentation
  - Installation guides and starter tutorials
- **Linux Distributions**: Zorin, Pop!_OS, MX Linux, Tails
  - User-friendly and privacy-focused distributions
  - Complete installation and usage guides

### Changed

- Updated n2plan.md to 100% completion (60/60 items)
- Enhanced Programming-Languages directory with comprehensive navigation
- Added Swift to language categorization table
- Reorganized documentation structure for better discoverability

### Statistics

- **32 new documentation files** created in this update
- **21 programming languages** now categorized
- **7 categories** for language classification
- **10 Linux distributions** with complete documentation
- **6 game engines** documented

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
