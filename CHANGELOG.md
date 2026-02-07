# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.6.0] - 2026-02-07

### Added

- **Backend-Web - Phase 03 API**: Comprehensive API gateway and management expansion
  - **API Gateway** (NEW): Complete API gateway overview (~750 lines) covering architecture patterns (centralized gateway, BFF, sidecar proxy, service mesh integration), core capabilities (routing, authentication, rate limiting, transformation), gateway comparison (Kong, Traefik, NGINX, AWS API Gateway, Apigee, Azure API Management), security features (OAuth 2.0/OIDC, JWT validation, mTLS, WAF integration), traffic management (load balancing, circuit breaking, retry policies), observability (distributed tracing, metrics, logging), deployment patterns (Docker, Kubernetes Ingress, cloud-native), multi-region strategies, migration approaches, and production best practices
  - **Kong API Gateway** (NEW): Enterprise API gateway documentation (~850 lines) covering Kong architecture (control plane, data plane, Admin API), installation methods (Docker, Kubernetes Helm, DB-less declarative), declarative YAML configuration, service and route management, plugin ecosystem (authentication with JWT/OAuth/API keys, rate limiting with sliding window algorithms, CORS/request transformation, logging to HTTP/TCP/file), security best practices (RBAC, secrets management, network policies), Kubernetes Ingress Controller with custom resources, monitoring with Prometheus integration, enterprise vs OSS features, Kong Mesh service mesh, troubleshooting, and real-world use cases (microservices gateway, legacy system modernization, multi-cloud routing)
  - **Traefik** (NEW): Modern reverse proxy and load balancer guide (~800 lines) featuring automatic service discovery (Docker, Kubernetes, Consul, file providers), dynamic configuration with no restarts, middleware system (authentication, rate limiting, circuit breaker, retry, compression), static and dynamic configuration separation, Let's Encrypt automatic TLS with DNS-01/HTTP-01 challenges, Kubernetes IngressRoute CRDs, TCP/UDP support, metrics and tracing (Prometheus, Jaeger, Zipkin), access logs, deployment patterns (Docker Compose, Kubernetes DaemonSet/Deployment), dashboard UI, comparison with NGINX/HAProxy/Envoy, migration strategies, troubleshooting (certificate issues, routing problems), and production use cases (microservices ingress, Docker Swarm routing, multi-domain hosting)
  - **Refresh Tokens** (NEW): Token management lifecycle documentation (~950 lines) covering OAuth 2.0 refresh token flows, token vs session authentication, access/refresh token lifecycle, security considerations (rotation, detection of reuse, family tracking), storage strategies (Redis with TTL, PostgreSQL with indexes, mobile secure storage with iOS Keychain/Android EncryptedSharedPreferences), implementation examples across Node.js/Express, Python/FastAPI, ASP.NET Core, React SPA with automatic refresh, iOS Swift with token interceptors, Android Kotlin with OkHttp, automatic refresh patterns, token revocation strategies (blacklisting, versioning, token families), best practices (token expiry management, HTTPS enforcement, PKCE for SPAs), real-world use cases (mobile apps, SPAs, microservices), and comprehensive troubleshooting
  - **API Rate Limiting** (NEW): Rate limiting algorithms and best practices (~1000 lines) featuring algorithm implementations (fixed window counter, sliding window log, sliding window counter, token bucket, leaky bucket) with pros/cons analysis, storage backends (in-memory with Map/LRU cache, Redis with Lua scripts for atomicity, PostgreSQL with window functions), implementation examples across Express.js middleware, FastAPI decorators with Depends, ASP.NET Core middleware, distributed rate limiting patterns, rate limit headers (X-RateLimit-*, Retry-After), response strategies (429 status codes, exponential backoff), advanced patterns (user-tier limits, endpoint-specific limits, burst allowances, dynamic limits), DDoS protection integration, testing strategies, monitoring and alerting, and real-world scenarios (public APIs, authentication endpoints, GraphQL query complexity, webhook delivery)
  - **API Versioning** (NEW): API versioning strategies guide (~850 lines) covering versioning approaches (URI path versioning `/v1/users`, subdomain versioning `v1.api.example.com`, header versioning `API-Version: 1`, query parameter `?version=1`, content negotiation with Accept headers), semantic versioning for APIs, breaking vs non-breaking changes with examples, version lifecycle management (deprecation policies, sunset headers, migration periods), implementation examples across Express.js routers, FastAPI with subdomain/header routing, ASP.NET Core API versioning package with conventions, GraphQL schema evolution with field deprecation, gRPC versioning with package namespacing, versioning best practices (minimize breaking changes, clear documentation, migration guides, backwards compatibility strategies), client SDK versioning, API documentation per version, real-world patterns (GitHub API evolution, Stripe versioning model, AWS service versions), and troubleshooting common issues

### Changed

- Enhanced Backend-Web folder with comprehensive API gateway and management documentation
- Created new 08-API-Gateway subfolder for gateway-specific tools
- Expanded 05-Authentication with token management best practices
- Expanded 07-Patterns-and-Utilities with rate limiting and versioning strategies
- Improved documentation consistency across API topics with architecture patterns, implementation examples, and production best practices

### Statistics

- **6 new API guides** added (API Gateway, Kong, Traefik, Refresh Tokens, Rate Limiting, Versioning)
- **~5,200+ lines** of API documentation created
- **Complete Phase 03 API** expansion
- Comprehensive coverage: gateway architecture, service discovery, authentication patterns, traffic management, rate limiting algorithms, versioning strategies, and security best practices
- Multi-language examples: Node.js, Python, C#, React, Swift, Kotlin

## [2.5.0] - 2026-02-07

### Added

- **Monitoring & Observability - Phase 03 MO**: Comprehensive time-series database and observability platform expansion
  - **InfluxDB** (NEW): Complete time-series database documentation (~1000 lines) covering data model and architecture, installation methods (Docker, Linux, Kubernetes), writing and querying data with Flux and InfluxQL, retention policies and downsampling strategies, Grafana integration, real-world use cases (infrastructure monitoring, IoT sensor data, APM, financial markets, DevOps CI/CD metrics), performance optimization, production deployment patterns (HA, Kubernetes StatefulSets), backup and recovery, security best practices, and comprehensive troubleshooting guide for high-cardinality and query performance issues
  - **Grafana** (EXPANDED): Massively enhanced visualization platform guide (~1000 lines, from ~80 lines) with universal data source support (150+ connectors), installation across Docker/Kubernetes/Linux/Helm, comprehensive data source configuration (Prometheus, Loki, InfluxDB, Tempo, Elasticsearch with provisioning YAML examples), dashboard building with template variables and transformations, advanced unified alerting system (Grafana 8+) with contact points and notification policies, annotations for event correlation, real-world use cases (Kubernetes monitoring, APM dashboards, infrastructure metrics, PostgreSQL database monitoring, business KPIs), dashboard best practices and performance optimization, provisioning for GitOps, plugin ecosystem, Grafana Cloud features, security configuration (OAuth, LDAP, RBAC, HTTPS), and comprehensive troubleshooting
  - **Prometheus** (EXPANDED): Extensively enhanced monitoring documentation (~1200 lines, from ~133 lines) covering pull-based architecture and data model, multi-dimensional metrics with labels, installation methods (Docker, Linux with systemd, Kubernetes Helm with kube-prometheus-stack), comprehensive configuration examples, application instrumentation across Python/Flask, Go, Java/Spring Boot, and Node.js/Express, complete PromQL query language guide (basic queries, aggregations, rate/increase functions, histogram quantiles, useful functions), alerting with Alertmanager configuration and multi-channel routing, recording rules for query optimization, exporters ecosystem (Node Exporter, Blackbox, database exporters), real-world use cases (Kubernetes cluster monitoring, SLO tracking, database performance), production patterns (federation, Thanos for long-term storage, remote write configurations), resource optimization strategies, and troubleshooting guide for high memory usage and slow queries
  - **Loki** (EXPANDED): Significantly enhanced log aggregation documentation (~1000 lines, from ~104 lines) featuring label-based indexing architecture (10x cost reduction vs Elasticsearch), installation with Docker Compose/Kubernetes/S3 backend, Promtail configuration for system logs/Docker containers/Kubernetes pods, comprehensive LogQL query language (basic queries, pipeline expressions with JSON/regex/pattern parsing, aggregations, advanced queries with quantiles), real-world use cases (application error tracking, nginx access log analysis, Kubernetes pod logs with service discovery, AWS Lambda via CloudWatch, security and audit logs), alerting with Loki Ruler and recording rules, Grafana integration with log-to-trace correlation via derived fields, performance optimization (label cardinality management, query optimization, retention policies with per-tenant overrides), and troubleshooting guide for ingestion issues and slow queries
  - **Datadog** (VERIFIED): Confirmed comprehensive APM platform documentation (1304 lines) already covering full observability stack, installation, APM instrumentation, infrastructure monitoring, log management, Kubernetes integration, and production best practices

### Changed

- Enhanced Cloud-DevOps/07-Monitoring-Observability with production-grade documentation
- Updated all monitoring tools to include architecture diagrams, comparison tables, installation guides, real-world use cases, and troubleshooting sections
- Improved documentation consistency across observability stack with emphasis on Grafana integration, PromQL/LogQL query languages, and cloud-native deployments

### Statistics

- **1 new time-series database guide** added (InfluxDB)
- **4 monitoring and observability guides** significantly expanded (Grafana, Prometheus, Loki, Datadog verified)
- **~5,000+ lines** of observability documentation added
- **Complete Phase 03 MO** Monitoring & Observability expansion
- Comprehensive coverage: metrics collection, log aggregation, time-series storage, visualization, alerting, distributed tracing integration, Kubernetes monitoring, and production deployment patterns

## [2.4.0] - 2026-02-07

### Added

- **Linux Distributions - Red Hat Family**: Phase 04 AMCET 4.2 comprehensive expansion
  - **Red Hat Ecosystem Overview** (RedHat.md): Complete guide to DNF/RPM package management, systemd service management, SELinux configuration and troubleshooting, firewalld setup, Cockpit web administration, repository management, distribution family tree (Fedora→CentOS Stream→RHEL→derivatives), version comparison tables (RHEL 7/8/9), migration paths, web/database server setup, development environments, security hardening, backup strategies, and boot/package/SELinux troubleshooting (~1000 lines)
  - **Fedora Linux** (Fedora Linux.md): Cutting-edge community distribution with detailed coverage of Fedora editions (Workstation/Server/IoT/CoreOS), desktop Spins (KDE/Xfce/MATE/Cinnamon), Toolbox containerized development, installation with Anaconda, DNF package management, RPM Fusion repositories, multimedia codecs, Flatpak integration, development languages (Python/Node/Java/Go/Rust), IDEs, Podman/Buildah containers, system upgrades, Fedora innovations (systemd/Wayland/PipeWire/Btrfs pioneering), and real-world developer/container platform use cases (~1100 lines)
  - **CentOS** (CentOS.md): CentOS transformation documentation covering CentOS Linux EOL history, CentOS Stream rolling release model, development pipeline changes (Fedora→RHEL→CentOS vs Fedora→Stream→RHEL), migration paths with scripts (migrate2rocky, almalinux-deploy, convert2rhel), EPEL repository setup, when to use Stream vs alternatives (dev/test vs production), DNF package management, server setup examples (Apache, PostgreSQL, Podman), and rolling release best practices (~900 lines)
  - **Red Hat Enterprise Linux** (RedHatEnterpriseLinux.md): Enterprise platform guide with comprehensive coverage of RHEL versions and lifecycle (7/8/9 with 10+ year support), subscription types (free developer program, Standard, Premium), subscription-manager registration and management, Application Streams for multiple package versions, enterprise features (Red Hat Insights proactive management, System Roles Ansible automation, Image Builder custom images), Cockpit web console, SELinux/FIPS compliance, OpenSCAP scanning, Pacemaker/Corosync clustering, Podman containers, OpenShift Kubernetes, Red Hat support and sosreport, leapp in-place upgrades, and enterprise use cases (database servers, cloud-native platforms) (~1100 lines)
  - **Oracle Linux** (OracleLinux.md): Oracle's RHEL-compatible distribution featuring Unbreakable Enterprise Kernel (UEK) with latest features and Oracle optimizations, Ksplice zero-downtime kernel patching, 100% RHEL binary compatibility, Oracle software optimizations, DTrace dynamic tracing, Btrfs support, Oracle Database preparation and hosting, Oracle Instant Client, container support with Podman and OLCNE (Kubernetes), migration from CentOS/RHEL with conversion scripts, free vs Premier Support options, and real-world use cases for Oracle workloads and cloud-native development (~900 lines)
  - **Rocky Linux**: Verified existing comprehensive documentation (1022 lines, no expansion needed)

### Changed

- Enhanced Linux/RedHat family documentation with enterprise-grade deployment guides
- Updated all Red Hat family distributions to include subscription management, security hardening, and production best practices
- Improved documentation consistency across Red Hat ecosystem with emphasis on DNF/RPM, SELinux, and systemd

### Statistics

- **5 Red Hat distribution guides** significantly expanded (RedHat, Fedora, CentOS, RHEL, Oracle Linux)
- **1 distribution guide** verified as comprehensive (Rocky Linux)
- **~5,000 lines** of enterprise Linux documentation added
- **Complete Phase 04 AMCET 4.2** Red Hat-based distributions expansion
- Comprehensive coverage: package management, enterprise features, migration paths, security, containers, real-world deployments

## [2.3.0] - 2026-02-07

### Added

- **Monitoring & Observability**: Jaeger distributed tracing documentation
  - Complete guide to distributed tracing and OpenTelemetry integration
  - Installation and configuration examples
  - Multi-language instrumentation (Java, Go, Python, Node.js)
  - Production deployment patterns and best practices
- **Backend Frameworks**: gRPC advanced documentation enhancements
  - Advanced streaming patterns (client, server, bidirectional)
  - Comprehensive error handling examples
  - Production-grade best practices
  - Multi-language implementation examples
- **Security Testing Enhancements**: Phase 03 TQA comprehensive expansion
  - SonarQube: Added "Why Use" section, competitor comparison table, and "When to Use" decision guide
  - Checkmarx: Added decision-making sections with 10 key benefits and use case scenarios
  - OWASP ZAP: Added comprehensive comparison vs Burp Suite, Acunetix, and other tools
  - Fortify: Added enterprise platform analysis with SAST/DAST/SCA/RASP comparison
  - Codecov: Added coverage tracking comparison and integration ecosystem analysis
  - Coveralls: Added simplicity-focused comparison and cost-effectiveness analysis
- **Tool Selection Guidance**: All security testing tools now include:
  - "Why Use X?" sections highlighting unique benefits
  - Detailed comparison tables vs 4-5 competitors
  - "When to Use" guides with clear ✅/❌ scenarios
  - Decision-making criteria for tool selection

### Changed

- Enhanced Security-Testing documentation with comprehensive decision-making content
- Updated all 6 testing tool guides to include competitive analysis
- Improved tool selection guidance for enterprise and team scenarios
- Updated expansion plan to reflect completed monitoring tools and API strategies
- Removed Testing & Quality Assurance section from expansion plan (completed)

### Statistics

- **6 security testing guides** expanded with decision frameworks
- **30+ tool comparisons** added across all guides
- **60+ decision scenarios** documented for tool selection
- **1 monitoring tool** (Jaeger) added to observability stack
- **1 backend framework** (gRPC) enhanced with advanced patterns

## [2.2.0] - 2026-01-20

### Added

- **Programming Languages**: Prolog and Scheme documentation with comprehensive guides
- **Backend Frameworks**: Express.js, Next.js, and Node.js complete documentation
- **Databases**: New database documentation including Typesense (Phase 02 DBDS)
  - SQLite comprehensive guide and SQL & Databases overview
- **Network Tools**: iperf and tcpdump with detailed usage guides
  - OpenVPN and WireGuard VPN documentation with IPsec section updates
  - WebSocket documentation and examples
- **Testing Frameworks**: pytest and unittest comprehensive documentation
- **Security Testing**: Complete documentation for security testing tools
- **Development Tools**: Gradle build tool documentation
- **Visual Enhancements**: Skill icons for various technologies across the repository

### Changed

- Updated expansion plan to reflect completed programming languages and frameworks
- Refined expansion plan sections by removing completed phases (Phase 02 DBDS)
- Enhanced niche languages section organization
- Updated CODEOWNERS file with consolidated code owners (@AmanKumar-St added)
- Improved .gitignore to exclude text files
- Added restructure planning document

### Fixed

- User guide references for clarity in SteamOS, ChromeOS Flex, and Rocky Linux documentation
- Removed outdated installation guide and intro files
- Removed outdated N2PLAN documentation

### Statistics

- **5 new programming languages/frameworks** documented
- **8 new tool categories** added (Network Tools, VPN, WebSocket, Testing, Security)
- **Multiple database guides** completed
- Expansion plan continuously updated to track progress

## [2.1.3] - 2026-01-15

### Fixed

- **Documentation Accuracy**: Updated all badge counts to reflect actual repository contents
  - Languages: Updated from 21 to 35+ (reflects actual language folders across categories)
  - Backend Frameworks: Split from generic "20+" to accurate "42 Frameworks"
  - Frontend Frameworks: Added separate badge showing "11 Frameworks"
  - DevOps Tools: Updated from "15+" to accurate "26 tools"
  - Linux Distros: Updated from "25+" to accurate "26 distros"
  - Databases: Confirmed accurate at 11 ✓
  - Game Engines: Confirmed accurate at 9 ✓
- **Broken Links**: Fixed badge links that pointed to non-existent folders
  - Changed Frameworks badge from `Frameworks/` to `Backend-Web/`
  - Changed Databases badge from `Databases/` to `SQL&DB'S/`
  - Changed Languages badge from `CATEGORIZATION.md` to `Programming-Languages/`
- **Features List**: Expanded to accurately reflect 42 backend frameworks, 11 frontend frameworks, 26 DevOps tools, and comprehensive coverage across all categories

### Changed

- Enhanced README.md badges with color-coded separation between backend (orange) and frontend (pink) frameworks
- Updated features section with specific tool counts and comprehensive listings
- Improved organization description to include additional language categories (Perl, PowerShell, Julia)

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
