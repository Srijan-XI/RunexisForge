# Bazel - Fast, Scalable Build System

## Table of Contents
- [Introduction](#introduction)
- [Why Bazel?](#why-bazel)
- [Installation & Setup](#installation--setup)
- [Workspace & BUILD Files](#workspace--build-files)
- [Build Rules](#build-rules)
- [Dependencies](#dependencies)
- [Querying the Build Graph](#querying-the-build-graph)
- [Remote Caching & Execution](#remote-caching--execution)
- [Platforms & Toolchains](#platforms--toolchains)
- [Starlark Language](#starlark-language)
- [Multi-Language Support](#multi-language-support)
- [Bazel vs Other Build Tools](#bazel-vs-other-build-tools)
- [Real-World Examples](#real-world-examples)
- [Troubleshooting](#troubleshooting)

---

## Introduction

**Bazel** is an open-source build and test tool developed by Google, based on their internal Blaze system. It's designed to build code quickly and reliably at massive scale, supporting multiple languages and platforms.

### Key Features
- **Fast** - Incremental builds, distributed caching
- **Scalable** - Handles monorepos with millions of files
- **Multi-Language** - Java, C++, Python, Go, Rust, JavaScript, and more
- **Hermetic** - Reproducible builds across machines
- **Distributed** - Remote execution and caching
- **Accurate** - Fine-grained dependency tracking
- **Extensible** - Custom rules using Starlark

### Core Concepts
- **Workspace** - Root directory containing WORKSPACE file
- **Package** - Directory with BUILD file
- **Target** - Buildable/testable artifact
- **Rule** - Instructions for building a target
- **Label** - Target identifier (//package:target)
- **Action** - Build step (compile, link, etc.)

### Architecture

```
Workspace (WORKSPACE)
└── Packages (BUILD files)
    └── Targets (rules)
        └── Actions (build steps)
```

---

## Why Bazel?

### Advantages

✅ **Speed**
- Incremental builds (only rebuilds changed files)
- Parallel execution
- Local and remote caching
- Advanced dependency analysis

✅ **Scalability**
- Handles massive codebases (Google-scale)
- Monorepo support
- Fine-grained build graph
- Efficient resource usage

✅ **Reproducibility**
- Hermetic builds
- Sandboxed execution
- Explicit dependencies
- Version-controlled build definitions

✅ **Multi-Language**
- Java, C++, Python, Go, Kotlin, Rust
- JavaScript, TypeScript, Protobuf
- Custom language support via rules

✅ **Correctness**
- Accurate incremental builds
- Dependency tracking
- Build isolation
- Deterministic outputs

### Use Cases
- **Monorepos** - Large, multi-language codebases
- **Microservices** - Many services in one repo
- **Cross-Platform** - Linux, macOS, Windows builds
- **Polyglot Projects** - Multiple languages
- **Enterprise** - Large teams, complex builds
- **CI/CD** - Fast, cacheable pipelines

### Companies Using Bazel
- Google
- Uber
- Dropbox
- LinkedIn
- Twitter
- Stripe
- Adobe

---

## Installation & Setup

### Prerequisites

```bash
# Java JDK (11 or higher)
java -version

# Python (for some rules)
python --version

# Git
git --version
```

### Installation

#### Linux

```bash
# Using APT (Debian/Ubuntu)
sudo apt install apt-transport-https curl gnupg
curl -fsSL https://bazel.build/bazel-release.pub.gpg | gpg --dearmor >bazel-archive-keyring.gpg
sudo mv bazel-archive-keyring.gpg /usr/share/keyrings
echo "deb [signed-by=/usr/share/keyrings/bazel-archive-keyring.gpg] https://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list
sudo apt update && sudo apt install bazel

# Using Bazelisk (recommended)
npm install -g @bazel/bazelisk
# or
brew install bazelisk
```

#### macOS

```bash
# Using Homebrew
brew install bazel

# Or Bazelisk (version manager)
brew install bazelisk

# Verify
bazel version
```

#### Windows

```powershell
# Using Chocolatey
choco install bazel

# Or download from https://github.com/bazelbuild/bazel/releases

# Verify
bazel version
```

#### Using Bazelisk (Recommended)

```bash
# Bazelisk automatically downloads correct Bazel version
# Install via package manager
npm install -g @bazel/bazelisk

# Or download binary
# Linux/macOS
wget https://github.com/bazelbuild/bazelisk/releases/latest/download/bazelisk-linux-amd64
chmod +x bazelisk-linux-amd64
sudo mv bazelisk-linux-amd64 /usr/local/bin/bazel

# Create .bazelversion file to pin version
echo "7.0.0" > .bazelversion
```

### Verification

```bash
# Check version
bazel version

# Build info
bazel info

# List commands
bazel help
```

---

## Workspace & BUILD Files

### WORKSPACE File

**WORKSPACE** (root of project)
```python
# Define workspace name
workspace(name = "my_project")

# Load external repositories
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Java rules
http_archive(
    name = "rules_java",
    sha256 = "...",
    urls = ["https://github.com/bazelbuild/rules_java/releases/download/..."],
)

# Python rules
http_archive(
    name = "rules_python",
    sha256 = "...",
    urls = ["https://github.com/bazelbuild/rules_python/releases/download/..."],
)

# Maven dependencies
load("@rules_jvm_external//:defs.bzl", "maven_install")
maven_install(
    artifacts = [
        "com.google.guava:guava:32.1.3-jre",
        "junit:junit:4.13.2",
    ],
    repositories = [
        "https://repo1.maven.org/maven2",
    ],
)
```

### BUILD Files

**BUILD** (in each package directory)
```python
# Java library
java_library(
    name = "mylib",
    srcs = glob(["src/main/java/**/*.java"]),
    deps = [
        "@maven//:com_google_guava_guava",
    ],
    visibility = ["//visibility:public"],
)

# Java binary
java_binary(
    name = "myapp",
    srcs = ["src/main/java/com/example/Main.java"],
    main_class = "com.example.Main",
    deps = [":mylib"],
)

# Java test
java_test(
    name = "mytest",
    srcs = glob(["src/test/java/**/*Test.java"]),
    deps = [
        ":mylib",
        "@maven//:junit_junit",
    ],
    test_class = "com.example.MyTest",
)
```

### Project Structure

```
my-project/
├── WORKSPACE                # Workspace definition
├── .bazelrc                 # Bazel configuration
├── .bazelversion            # Bazel version pin
├── BUILD                    # Root BUILD file
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/
│   │   │       ├── BUILD   # Package BUILD file
│   │   │       └── Main.java
│   │   └── resources/
│   └── test/
│       └── java/
│           └── com/example/
│               ├── BUILD
│               └── MainTest.java
├── bazel-bin/              # Build outputs (symlink)
├── bazel-out/              # Build cache (symlink)
└── bazel-testlogs/         # Test logs (symlink)
```

### .bazelrc Configuration

**.bazelrc**
```ini
# Build settings
build --java_language_version=17
build --java_runtime_version=remotejdk_17

# Test settings
test --test_output=errors
test --test_summary=detailed

# Remote cache
build --remote_cache=https://cache.example.com

# Build parallelism
build --jobs=8

# Compilation mode
build:opt -c opt
build:dbg -c dbg

# Platform-specific
build:linux --copt=-fPIC
build:macos --cxxopt=-std=c++17
```

---

## Build Rules

### Common Rules

#### Java Rules

```python
# Java library
java_library(
    name = "util",
    srcs = glob(["*.java"]),
    deps = [
        "@maven//:com_google_guava_guava",
    ],
    resources = glob(["resources/**"]),
    visibility = ["//visibility:public"],
)

# Java binary
java_binary(
    name = "app",
    srcs = ["Main.java"],
    main_class = "com.example.Main",
    deps = [":util"],
    jvm_flags = ["-Xmx1024m"],
)

# Java test
java_test(
    name = "util_test",
    srcs = ["UtilTest.java"],
    deps = [
        ":util",
        "@maven//:junit_junit",
    ],
    size = "small",
)
```

#### C++ Rules

```python
# C++ library
cc_library(
    name = "hello_lib",
    srcs = ["hello.cc"],
    hdrs = ["hello.h"],
    deps = ["//other:lib"],
    visibility = ["//visibility:public"],
)

# C++ binary
cc_binary(
    name = "hello_world",
    srcs = ["main.cc"],
    deps = [":hello_lib"],
)

# C++ test
cc_test(
    name = "hello_test",
    srcs = ["hello_test.cc"],
    deps = [
        ":hello_lib",
        "@googletest//:gtest_main",
    ],
)
```

#### Python Rules

```python
# Python library
py_library(
    name = "mylib",
    srcs = glob(["*.py"]),
    deps = [
        "//other:lib",
    ],
    visibility = ["//visibility:public"],
)

# Python binary
py_binary(
    name = "app",
    srcs = ["main.py"],
    deps = [":mylib"],
    python_version = "PY3",
)

# Python test
py_test(
    name = "test",
    srcs = ["test.py"],
    deps = [":mylib"],
)
```

#### Go Rules

```python
load("@io_bazel_rules_go//go:def.bzl", "go_binary", "go_library", "go_test")

# Go library
go_library(
    name = "go_default_library",
    srcs = glob(["*.go"]),
    importpath = "github.com/example/myproject",
    visibility = ["//visibility:public"],
)

# Go binary
go_binary(
    name = "app",
    embed = [":go_default_library"],
)

# Go test
go_test(
    name = "go_default_test",
    srcs = glob(["*_test.go"]),
    embed = [":go_default_library"],
)
```

### Target Labels

```python
# Current package
":target"

# Other package
"//package:target"

# External repository
"@repo//package:target"

# All targets in package
"//package:all"

# Wildcard
"//package/..."
```

---

## Dependencies

### Internal Dependencies

```python
java_library(
    name = "lib",
    deps = [
        "//src/common:util",      # Internal dependency
        "//src/service:api",       # Another internal dep
    ],
)
```

### External Dependencies (Maven)

**WORKSPACE**
```python
load("@rules_jvm_external//:defs.bzl", "maven_install")

maven_install(
    name = "maven",
    artifacts = [
        "com.google.guava:guava:32.1.3-jre",
        "org.springframework.boot:spring-boot-starter-web:3.2.0",
        "junit:junit:4.13.2",
    ],
    repositories = [
        "https://repo1.maven.org/maven2",
    ],
    fetch_sources = True,
)
```

**BUILD**
```python
java_library(
    name = "mylib",
    deps = [
        "@maven//:com_google_guava_guava",
        "@maven//:org_springframework_boot_spring_boot_starter_web",
    ],
)
```

### External Dependencies (HTTP Archive)

```python
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "com_google_protobuf",
    sha256 = "...",
    strip_prefix = "protobuf-3.21.12",
    urls = ["https://github.com/protocolbuffers/protobuf/archive/v3.21.12.tar.gz"],
)
```

### Dependency Resolution

```bash
# Show dependency graph
bazel query --output=graph "deps(//src:app)" | dot -Tpng > deps.png

# List dependencies
bazel query "deps(//src:app)"

# Reverse dependencies
bazel query "rdeps(//..., //src:lib)"

# Find path between targets
bazel query "somepath(//src:app, @maven//:com_google_guava_guava)"
```

---

## Querying the Build Graph

### Query Commands

```bash
# List all targets
bazel query //...

# List targets in package
bazel query //src/main/...

# Show dependencies
bazel query "deps(//src:app)"

# Show reverse dependencies
bazel query "rdeps(//..., //src:lib)"

# Filter by kind
bazel query "kind(java_library, //...)"

# Find tests
bazel query "kind(.*_test, //...)"

# Show build files
bazel query --output=build //src:app

# Dependency graph
bazel query --output=graph "deps(//src:app)" > graph.dot
dot -Tpng graph.dot -o graph.png
```

### Cquery (Configured Query)

```bash
# Query after configuration
bazel cquery //src:app

# Show configuration
bazel cquery --output=starlark --starlark:expr="target.label" //src:app

# Find dependencies with config
bazel cquery "deps(//src:app)"
```

### Aquery (Action Query)

```bash
# List actions
bazel aquery //src:app

# Filter by action type
bazel aquery 'mnemonic("Javac", //src:app)'
```

---

## Remote Caching & Execution

### Remote Build Cache

**.bazelrc**
```ini
# HTTP cache
build --remote_cache=https://cache.example.com

# gRPC cache
build --remote_cache=grpc://cache.example.com:9092

# Authentication
build --remote_header="Authorization=Bearer token123"
```

### Remote Execution

```ini
# Remote execution endpoint
build --remote_executor=grpc://remote.example.com:8980

# Enable remote execution
build --remote_upload_local_results=true
build --remote_download_minimal
```

### Build Event Service

```ini
# Send build events
build --bes_backend=grpc://bes.example.com:8080
build --bes_results_url=https://results.example.com/build/
```

### Local Disk Cache

```ini
# Disk cache directory
build --disk_cache=~/.bazel/cache

# Cache size
build --experimental_disk_cache_gc_max_size=10GB
```

---

## Platforms & Toolchains

### Platform Definition

```python
platform(
    name = "linux_x86_64",
    constraint_values = [
        "@platforms//os:linux",
        "@platforms//cpu:x86_64",
    ],
)

platform(
    name = "macos_arm64",
    constraint_values = [
        "@platforms//os:macos",
        "@platforms//cpu:arm64",
    ],
)
```

### Cross-Compilation

```bash
# Build for specific platform
bazel build --platforms=//platforms:linux_x86_64 //src:app

# Build for multiple platforms
bazel build --platforms=//platforms:linux_x86_64,//platforms:macos_arm64 //src:app
```

### Toolchains

```python
# Register toolchain
register_toolchains("//toolchains:my_toolchain")
```

---

## Starlark Language

### Custom Rules

**rules.bzl**
```python
def _my_rule_impl(ctx):
    # Rule implementation
    output = ctx.actions.declare_file(ctx.label.name + ".out")
    
    ctx.actions.run(
        inputs = ctx.files.srcs,
        outputs = [output],
        executable = ctx.executable._tool,
        arguments = [output.path] + [f.path for f in ctx.files.srcs],
    )
    
    return [DefaultInfo(files = depset([output]))]

my_rule = rule(
    implementation = _my_rule_impl,
    attrs = {
        "srcs": attr.label_list(allow_files = True),
        "_tool": attr.label(
            default = "//tools:processor",
            executable = True,
            cfg = "exec",
        ),
    },
)
```

**BUILD**
```python
load("//rules:rules.bzl", "my_rule")

my_rule(
    name = "processed",
    srcs = glob(["*.txt"]),
)
```

### Macros

**macros.bzl**
```python
def java_service(name, srcs, deps = [], **kwargs):
    """Macro to create a Java service with tests."""
    
    # Library
    native.java_library(
        name = name,
        srcs = srcs,
        deps = deps,
        **kwargs
    )
    
    # Test
    native.java_test(
        name = name + "_test",
        srcs = native.glob(["*Test.java"]),
        deps = [
            ":" + name,
            "@maven//:junit_junit",
        ],
    )
```

---

## Multi-Language Support

### Java + Python

**WORKSPACE**
```python
# Java rules
http_archive(name = "rules_java", ...)

# Python rules
http_archive(name = "rules_python", ...)
```

**BUILD**
```python
# Java library
java_library(
    name = "java_lib",
    srcs = glob(["*.java"]),
)

# Python binary using Java library
py_binary(
    name = "app",
    srcs = ["main.py"],
    deps = [":java_lib"],  # Cross-language dependency
)
```

### Protobuf

**WORKSPACE**
```python
http_archive(
    name = "com_google_protobuf",
    ...
)
```

**BUILD**
```python
load("@rules_proto//proto:defs.bzl", "proto_library")
load("@rules_java//java:defs.bzl", "java_proto_library")

# Proto definition
proto_library(
    name = "my_proto",
    srcs = ["my.proto"],
)

# Java proto
java_proto_library(
    name = "my_java_proto",
    deps = [":my_proto"],
)

# Python proto
py_proto_library(
    name = "my_py_proto",
    deps = [":my_proto"],
)
```

---

## Bazel vs Other Build Tools

| Feature | Bazel | Maven | Gradle | Make |
|---------|-------|-------|--------|------|
| **Speed** | ⚡⚡⚡ Very fast | Moderate | Fast | Fast |
| **Scalability** | ⭐⭐⭐ Massive | Good | Good | Limited |
| **Multi-Language** | ✅ Extensive | Java only | JVM + limited | C/C++ |
| **Caching** | Local + Remote | Local | Local + Remote | Basic |
| **Hermetic** | ✅ Yes | Limited | Limited | No |
| **Learning Curve** | Steep | Easy | Moderate | Easy |
| **Monorepo** | ✅ Excellent | Limited | Good | Poor |

---

## Real-World Examples

### Java Spring Boot Application

**WORKSPACE**
```python
workspace(name = "springboot_app")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Java rules
http_archive(
    name = "rules_java",
    ...
)

# Maven dependencies
load("@rules_jvm_external//:defs.bzl", "maven_install")
maven_install(
    artifacts = [
        "org.springframework.boot:spring-boot-starter-web:3.2.0",
        "org.springframework.boot:spring-boot-starter-data-jpa:3.2.0",
        "org.postgresql:postgresql:42.7.0",
    ],
    repositories = ["https://repo1.maven.org/maven2"],
)
```

**BUILD**
```python
java_binary(
    name = "app",
    srcs = glob(["src/main/java/**/*.java"]),
    main_class = "com.example.Application",
    deps = [
        "@maven//:org_springframework_boot_spring_boot_starter_web",
        "@maven//:org_springframework_boot_spring_boot_starter_data_jpa",
    ],
    resources = glob(["src/main/resources/**"]),
)
```

```bash
# Build
bazel build //:app

# Run
bazel run //:app
```

### Microservices Monorepo

```
monorepo/
├── WORKSPACE
├── services/
│   ├── user-service/
│   │   ├── BUILD
│   │   └── src/...
│   ├── order-service/
│   │   ├── BUILD
│   │   └── src/...
│   └── payment-service/
│       ├── BUILD
│       └── src/...
└── libs/
    ├── common/
    │   ├── BUILD
    │   └── src/...
    └── utils/
        ├── BUILD
        └── src/...
```

```bash
# Build all services
bazel build //services/...

# Build specific service
bazel build //services/user-service:app

# Run tests
bazel test //...
```

---

## Troubleshooting

### Common Commands

```bash
# Clean build
bazel clean

# Deep clean (removes all caches)
bazel clean --expunge

# Verbose output
bazel build //src:app --verbose_failures

# Debug
bazel build //src:app -s

# Show build info
bazel info

# Analyze disk usage
bazel info output_base

# Check dependencies
bazel query "deps(//src:app)"

# Invalidate cache
bazel clean --expunge_async
```

### Performance Issues

```bash
# Analyze build performance
bazel build //src:app --profile=profile.gz
bazel analyze-profile profile.gz

# Enable build event service
bazel build //src:app --bes_backend=...

# Increase parallelism
bazel build //src:app --jobs=16
```

### Debugging Build Failures

```bash
# Show full errors
bazel build //src:app --verbose_failures

# Print commands
bazel build //src:app -s

# Sandbox debug
bazel build //src:app --sandbox_debug
```

---

## Resources

### Official
- **Website:** https://bazel.build
- **Documentation:** https://bazel.build/docs
- **GitHub:** https://github.com/bazelbuild/bazel
- **Rules:** https://bazel.build/rules
- **Examples:** https://github.com/bazelbuild/examples

### Community
- **Slack:** https://slack.bazel.build
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/bazel
- **Awesome Bazel:** https://github.com/jin/awesome-bazel

### Learning
- **Tutorial:** https://bazel.build/start
- **Best Practices:** https://bazel.build/configure/best-practices

---

## Conclusion

Bazel is a powerful, scalable build system designed for massive codebases and multi-language projects. While it has a steeper learning curve than traditional build tools, its performance, correctness, and scalability make it ideal for large engineering organizations and monorepos.

**Key Takeaways:**
- ⚡ Blazing fast with incremental builds
- 🏗️ Scales to Google-sized codebases
- 🔒 Hermetic, reproducible builds
- 🌍 Multi-language support
- 💾 Remote caching and execution
- 🎯 Fine-grained dependency tracking

Perfect for monorepos, microservices, and enterprise-scale projects!
