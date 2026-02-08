# Repository Structure


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
│   ├── Qwik/            # Qwik (resumability)
│   ├── htmx/            # htmx (hypermedia)
│   ├── Alpine.js/       # Alpine.js (lightweight)
│   ├── Lit/             # Lit (web components)
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
│   ├── Express/         # Express.js (Node.js)
│   ├── NestJS/          # NestJS (TypeScript)
│   ├── Gin/             # Gin (Go)
│   ├── Actix-web/       # Actix-web (Rust)
│   ├── Axum/            # Axum (Rust)
│   ├── Rocket/          # Rocket (Rust)
│   ├── Phoenix/         # Phoenix (Elixir)
│   ├── LangChain/       # LangChain (LLM apps)
│   ├── Streamlit/       # Streamlit (Python data apps)
│   ├── GraphQL/         # GraphQL APIs
│   ├── gRPC/            # gRPC services
│   ├── Supabase/        # Supabase (BaaS)
│   └── ...68 frameworks total
│
├── Cloud-DevOps/        # Organized by DevOps lifecycle
│   ├── 01-Version-Control/
│   │   ├── Git/         # Git version control
│   │   ├── GitHub/      # GitHub & Actions
│   │   └── GitLab/      # GitLab & CI/CD
│   ├── 03-CI-CD/
│   │   ├── Jenkins/     # Jenkins CI/CD
│   │   ├── GitHub-Actions/ # GitHub Actions
│   │   └── GitLab-CICD/ # GitLab pipelines
│   ├── 04-Containerization/
│   │   ├── Docker/      # Docker containers
│   │   ├── Podman/      # Podman containers
│   │   ├── Kubernetes/  # Kubernetes orchestration
│   │   └── Helm/        # Helm package manager
│   ├── 05-Infrastructure-as-Code/
│   │   ├── Terraform/   # Terraform IaC
│   │   ├── OpenTofu/    # OpenTofu (Terraform fork)
│   │   └── Pulumi/      # Pulumi IaC
│   ├── 06-Cloud-Providers/
│   │   ├── AWS/         # Amazon Web Services
│   │   ├── Azure/       # Microsoft Azure
│   │   ├── GCP/         # Google Cloud Platform
│   │   └── DigitalOcean/ # DigitalOcean
│   ├── 07-Observability/
│   │   ├── Prometheus/  # Prometheus monitoring
│   │   └── Grafana/     # Grafana visualization
│   ├── 08-GitOps/
│   │   ├── ArgoCD/      # ArgoCD
│   │   └── Flux/        # Flux
│   └── 09-Automation-Workflows/
│       ├── Ansible/     # Configuration management
│       └── n8n/         # Workflow automation
│
├── Data-Analytics/
│   ├── 01-Data-Processing/
│   │   ├── Pandas/      # Pandas (Python)
│   │   └── NumPy/       # NumPy (Python)
│   ├── 02-Distributed-Computing/
│   │   └── Spark/       # Apache Spark
│   ├── 04-Deep-Learning/
│   │   ├── TensorFlow/  # TensorFlow ML
│   │   └── PyTorch/     # PyTorch
│   ├── 07-Streaming-Platforms/
│   │   └── Kafka/       # Apache Kafka
│   └── 10-Visualization-Apps/
│       ├── Matplotlib/  # Matplotlib
│       └── Streamlit/   # Streamlit apps
│
├── Security-Testing/
│   ├── AquaSecurity/    # Aqua Security / Trivy
│   ├── SonarQube/       # SonarQube code quality
│   ├── Snyk/            # Snyk security
│   ├── Vault/           # HashiCorp Vault
│   ├── BurpSuite/       # Burp Suite Framework
│   ├── Metasploit/      # Metasploit Framework
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
├── Game-Development/    # Game dev frameworks & libraries
│   ├── Amethyst/        # Amethyst (Rust)
│   ├── Babylon.js/      # Babylon.js (3D web)
│   ├── Bevy/            # Bevy (Rust ECS)
│   ├── Defold/          # Defold engine
│   ├── FNA/             # FNA (.NET framework)
│   ├── LibGDX/          # LibGDX (Java)
│   ├── Love2D/          # Love2D (Lua)
│   ├── MonoGame/        # MonoGame (.NET)
│   ├── Phaser/          # Phaser (HTML5)
│   ├── PlayCanvas/      # PlayCanvas (WebGL)
│   ├── Pygame/          # Pygame (Python)
│   ├── Raylib/          # Raylib (C)
│   └── Three.js/        # Three.js (3D web)
│
├── Mobile-Development/
│   ├── React-Native/    # React Native
│   ├── Flutter/         # Flutter (Dart)
│   ├── Expo/            # Expo (React Native)
│   ├── Ionic/           # Ionic framework
│   ├── SwiftUI/         # SwiftUI (iOS)
│   ├── Jetpack-Compose/ # Jetpack Compose (Android)
│   ├── Kotlin-Multiplatform/ # KMP
│   ├── NativeScript/    # NativeScript
│   ├── Kivy/            # Kivy (Python)
│   └── PWA/             # Progressive Web Apps
│
├── Web3-Blockchain/
│   ├── Solidity/        # Solidity smart contracts
│   ├── Ethereum/        # Ethereum blockchain
│   ├── Bitcoin/         # Bitcoin protocol
│   ├── Solana/          # Solana blockchain
│   ├── Polkadot/        # Polkadot
│   ├── Hardhat/         # Hardhat dev environment
│   ├── Foundry/         # Foundry toolkit
│   ├── Truffle/         # Truffle suite
│   ├── Web3JS/          # Web3.js library
│   ├── MetaMask/        # MetaMask wallet
│   ├── DeFi/            # DeFi protocols
│   ├── NFT-Standards/   # NFT standards
│   └── ...17 topics total
│
├── CMS/                 # Content Management Systems
│   ├── WordPress/       # WordPress CMS
│   ├── Strapi/          # Strapi (headless)
│   ├── Sanity/          # Sanity.io
│   ├── Contentful/      # Contentful
│   ├── Directus/        # Directus
│   ├── Ghost/           # Ghost CMS
│   └── Payload/         # Payload CMS
│
├── Network-Tools/
│   ├── Wireshark/       # Packet analyzer
│   ├── Nmap/            # Network scanner
│   ├── tcpdump/         # Packet capture
│   └── ...27 tools total
│
├── Search&Indexing/
│   ├── Elasticsearch/   # Elasticsearch
│   ├── Algolia/         # Algolia search
│   ├── Meilisearch/     # Meilisearch
│   └── ...6 tools total
│
├── Utilities-Tools/
│   ├── Package-Managers/ # npm, yarn, pnpm
│   ├── Version-Managers/ # nvm, pyenv, rbenv
│   ├── Code-Editors/    # VS Code, Vim, etc.
│   ├── Terminal-Tools/  # tmux, zsh, oh-my-zsh
│   ├── Git-Workflows/   # Git flow, GitHub flow
│   ├── VPN/             # VPN tools & config
│   ├── SSH-SSL/         # SSH & SSL tools
│   └── ...13 categories total
│
├── Development-Tools/
│   ├── CSV/             # CSV data format
│   ├── JSON/            # JSON data format
│   ├── TOML/            # TOML config format
│   ├── XML/             # XML data format
│   └── YAML/            # YAML config format
│
├── SQL&DB'S/
│   ├── PostgreSQL/      # PostgreSQL
│   ├── MySQL/           # MySQL
│   ├── MongoDB/         # MongoDB (NoSQL)
│   ├── Redis/           # Redis cache/DB
│   ├── MariaDB/         # MariaDB
│   ├── SQLite/          # SQLite embedded DB
│   ├── DynamoDB/        # AWS DynamoDB
│   ├── Neo4j/           # Neo4j graph database
│   ├── BigQuery/        # Google BigQuery
│   └── IBM_Db2/         # IBM Db2
│
├── Operating-Systems/
│   ├── Windows/         # Windows OS guides
│   ├── macOS/           # macOS guides
│   ├── iOS/             # iOS development
│   ├── Android/         # Android development
│   └── WSL/             # Windows Subsystem for Linux
│
├── Linux/               # Linux distros (26+ distributions, family-organized)
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
├── QUICKSTART.md        # This guide!
├── SECURITY.md          # Security policy
└── .github/             # Templates & workflows
```
