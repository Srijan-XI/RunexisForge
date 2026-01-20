# Gradle - Modern Build Automation Tool

## Table of Contents
- [Introduction](#introduction)
- [Why Gradle?](#why-gradle)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Build Scripts](#build-scripts)
- [Dependencies](#dependencies)
- [Tasks](#tasks)
- [Plugins](#plugins)
- [Multi-Project Builds](#multi-project-builds)
- [Build Lifecycle](#build-lifecycle)
- [Groovy vs Kotlin DSL](#groovy-vs-kotlin-dsl)
- [Performance Optimization](#performance-optimization)
- [Gradle vs Maven](#gradle-vs-maven)
- [Real-World Examples](#real-world-examples)
- [Troubleshooting](#troubleshooting)

---

## Introduction

**Gradle** is a powerful, flexible build automation tool that combines the best features of Ant and Maven with a Groovy or Kotlin-based DSL. It's the official build tool for Android and is widely used for Java, Kotlin, Scala, and other JVM-based projects.

### Key Features
- **Flexible DSL** - Groovy or Kotlin-based configuration
- **Incremental Builds** - Only rebuilds what changed
- **Build Cache** - Local and remote caching
- **Dependency Management** - Advanced resolution strategies
- **Plugin System** - Extensible architecture
- **Multi-Project Builds** - Complex project hierarchies
- **Performance** - Faster than Maven
- **Parallel Execution** - Concurrent task execution

### Core Concepts
- **Projects** - Build targets
- **Tasks** - Units of work
- **Plugins** - Reusable build logic
- **Dependencies** - External libraries
- **Configurations** - Dependency scopes
- **Build Scripts** - build.gradle or build.gradle.kts

---

## Why Gradle?

### Advantages

✅ **Performance**
- Incremental builds
- Build cache (local + remote)
- Daemon process
- Parallel execution
- Up-to-date checks

✅ **Flexibility**
- Programmatic build logic
- Custom tasks
- Dynamic dependencies
- Conditional execution

✅ **Modern DSL**
- Groovy or Kotlin
- Type-safe (Kotlin DSL)
- IDE autocomplete
- Expressive syntax

✅ **Enterprise Features**
- Build scans
- Composite builds
- Dependency locking
- Version catalogs

### Use Cases
- **Android Development** - Official build tool
- **Java/Kotlin Projects** - Modern JVM builds
- **Microservices** - Multi-module projects
- **Spring Boot** - Alternative to Maven
- **Polyglot Projects** - Java, Kotlin, Scala, Groovy
- **CI/CD Pipelines** - Fast, cacheable builds

---

## Installation & Setup

### Prerequisites

```bash
# Java JDK (8 or higher)
java -version
```

### Installation Methods

#### Using SDKMAN (Recommended)

```bash
# Install SDKMAN
curl -s "https://get.sdkman.io" | bash

# Install Gradle
sdk install gradle

# Verify
gradle -version
```

#### macOS (Homebrew)

```bash
brew install gradle

# Verify
gradle -version
```

#### Linux (Manual)

```bash
# Download
wget https://services.gradle.org/distributions/gradle-8.5-bin.zip

# Extract
unzip gradle-8.5-bin.zip
sudo mv gradle-8.5 /opt/gradle

# Set environment
echo 'export GRADLE_HOME=/opt/gradle' >> ~/.bashrc
echo 'export PATH=$GRADLE_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Verify
gradle -version
```

#### Windows

```powershell
# Download from https://gradle.org/releases/
# Extract to C:\Gradle

# Set environment variables
setx GRADLE_HOME "C:\Gradle\gradle-8.5"
setx PATH "%PATH%;%GRADLE_HOME%\bin"

# Verify
gradle -version
```

#### Using Gradle Wrapper (Project-Specific)

```bash
# The wrapper is included in the project
./gradlew -version  # Linux/macOS
gradlew.bat -version # Windows

# No global installation needed!
```

### Gradle Wrapper Setup

```bash
# Generate wrapper
gradle wrapper --gradle-version 8.5

# Files created
# gradle/wrapper/gradle-wrapper.jar
# gradle/wrapper/gradle-wrapper.properties
# gradlew (Linux/macOS)
# gradlew.bat (Windows)
```

**gradle-wrapper.properties**
```properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

---

## Project Structure

### Standard Java Project

```
my-project/
├── build.gradle              # Build configuration (Groovy)
├── build.gradle.kts          # Build configuration (Kotlin)
├── settings.gradle           # Project settings
├── gradlew                   # Wrapper script (Unix)
├── gradlew.bat               # Wrapper script (Windows)
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── src/
│   ├── main/
│   │   ├── java/            # Java source files
│   │   │   └── com/example/
│   │   │       └── App.java
│   │   └── resources/       # Application resources
│   │       └── application.properties
│   └── test/
│       ├── java/            # Test source files
│       │   └── com/example/
│       │       └── AppTest.java
│       └── resources/       # Test resources
├── build/                   # Build output (generated)
│   ├── classes/
│   ├── libs/
│   └── reports/
└── .gradle/                 # Gradle cache (generated)
```

### Creating a New Project

```bash
# Initialize new Gradle project
gradle init

# Interactive prompts:
# - Type of project (application, library, etc.)
# - Implementation language (Java, Kotlin, etc.)
# - Build script DSL (Groovy, Kotlin)
# - Test framework (JUnit, TestNG, etc.)

# Example: Create Java application
gradle init \
  --type java-application \
  --dsl kotlin \
  --test-framework junit-jupiter \
  --package com.example \
  --project-name my-app
```

---

## Build Scripts

### Groovy DSL (build.gradle)

```groovy
plugins {
    id 'java'
    id 'application'
}

group = 'com.example'
version = '1.0.0'

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web:3.2.0'
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.0'
}

application {
    mainClass = 'com.example.Main'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

### Kotlin DSL (build.gradle.kts)

```kotlin
plugins {
    java
    application
}

group = "com.example"
version = "1.0.0"

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web:3.2.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}

application {
    mainClass.set("com.example.Main")
}

tasks.test {
    useJUnitPlatform()
}
```

### Settings File

**settings.gradle** (Groovy)
```groovy
rootProject.name = 'my-project'

// Multi-project build
include 'api', 'service', 'web'
```

**settings.gradle.kts** (Kotlin)
```kotlin
rootProject.name = "my-project"

include("api", "service", "web")
```

### gradle.properties

```properties
# Project properties
group=com.example
version=1.0.0

# JVM options
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m

# Gradle daemon
org.gradle.daemon=true

# Parallel execution
org.gradle.parallel=true

# Build cache
org.gradle.caching=true

# Configuration on demand
org.gradle.configureondemand=true
```

---

## Dependencies

### Dependency Configurations

```kotlin
dependencies {
    // Compile time + runtime + packaged
    implementation("com.google.guava:guava:32.1.3-jre")
    
    // Compile time only (not packaged)
    compileOnly("org.projectlombok:lombok:1.18.30")
    
    // Runtime only
    runtimeOnly("com.h2database:h2:2.2.224")
    
    // API dependencies (exposed to consumers)
    api("org.slf4j:slf4j-api:2.0.9")
    
    // Test dependencies
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
    testImplementation("org.mockito:mockito-core:5.7.0")
    
    // Annotation processors
    annotationProcessor("org.projectlombok:lombok:1.18.30")
}
```

### Version Catalogs

**gradle/libs.versions.toml**
```toml
[versions]
spring-boot = "3.2.0"
junit = "5.10.0"
lombok = "1.18.30"

[libraries]
spring-boot-web = { group = "org.springframework.boot", name = "spring-boot-starter-web", version.ref = "spring-boot" }
spring-boot-data = { group = "org.springframework.boot", name = "spring-boot-starter-data-jpa", version.ref = "spring-boot" }
junit-jupiter = { group = "org.junit.jupiter", name = "junit-jupiter", version.ref = "junit" }
lombok = { group = "org.projectlombok", name = "lombok", version.ref = "lombok" }

[bundles]
spring-boot = ["spring-boot-web", "spring-boot-data"]
testing = ["junit-jupiter"]

[plugins]
spring-boot = { id = "org.springframework.boot", version.ref = "spring-boot" }
```

**build.gradle.kts**
```kotlin
dependencies {
    implementation(libs.spring.boot.web)
    implementation(libs.bundles.spring.boot)
    testImplementation(libs.bundles.testing)
    compileOnly(libs.lombok)
}
```

### Platform/BOM Dependencies

```kotlin
dependencies {
    // Import Spring Boot BOM
    implementation(platform("org.springframework.boot:spring-boot-dependencies:3.2.0"))
    
    // No version needed
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
}
```

### Dependency Constraints

```kotlin
dependencies {
    constraints {
        implementation("org.apache.commons:commons-lang3:3.13.0")
    }
    
    implementation("org.apache.commons:commons-lang3") // Version from constraint
}
```

### Excluding Dependencies

```kotlin
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web") {
        exclude(group = "org.springframework.boot", module = "spring-boot-starter-tomcat")
    }
    
    // Add alternative
    implementation("org.springframework.boot:spring-boot-starter-jetty")
}
```

### Dependency Locking

```kotlin
// Enable dependency locking
dependencyLocking {
    lockAllConfigurations()
}
```

```bash
# Generate lock files
./gradlew dependencies --write-locks

# Update specific dependency
./gradlew dependencies --update-locks com.google.guava:guava
```

---

## Tasks

### Built-in Tasks

```bash
# List all tasks
./gradlew tasks

# Build tasks
./gradlew clean          # Clean build directory
./gradlew build          # Full build (compile + test + package)
./gradlew assemble       # Build without tests
./gradlew check          # Run checks (tests, linting)
./gradlew test           # Run tests
./gradlew jar            # Create JAR file

# Application tasks
./gradlew run            # Run application
./gradlew bootRun        # Run Spring Boot app

# Documentation
./gradlew javadoc        # Generate Javadoc

# Dependency tasks
./gradlew dependencies   # Show dependency tree
./gradlew dependencyInsight --dependency guava
```

### Custom Tasks (Groovy)

```groovy
// Simple task
task hello {
    doLast {
        println 'Hello, Gradle!'
    }
}

// Task with dependencies
task compile {
    doLast {
        println 'Compiling...'
    }
}

task build(dependsOn: compile) {
    doLast {
        println 'Building...'
    }
}

// Task with type
task copy(type: Copy) {
    from 'src'
    into 'dest'
}

// Task with configuration
task processResources {
    inputs.dir 'src/resources'
    outputs.dir 'build/resources'
    
    doLast {
        // Processing logic
    }
}
```

### Custom Tasks (Kotlin)

```kotlin
// Simple task
tasks.register("hello") {
    doLast {
        println("Hello, Gradle!")
    }
}

// Typed task
tasks.register<Copy>("copyFiles") {
    from("src")
    into("dest")
}

// Task with dependencies
tasks.register("compile") {
    doLast {
        println("Compiling...")
    }
}

tasks.register("build") {
    dependsOn("compile")
    doLast {
        println("Building...")
    }
}

// Modify existing task
tasks.test {
    useJUnitPlatform()
    testLogging {
        events("passed", "skipped", "failed")
    }
}

// Task with inputs/outputs
tasks.register("processResources") {
    inputs.dir("src/resources")
    outputs.dir("build/resources")
    
    doLast {
        // Processing logic
    }
}
```

### Task Ordering

```kotlin
tasks.register("taskA") {
    doLast { println("Task A") }
}

tasks.register("taskB") {
    doLast { println("Task B") }
}

// Must run after
tasks.named("taskB") {
    mustRunAfter("taskA")
}

// Should run after
tasks.named("taskB") {
    shouldRunAfter("taskA")
}

// Finalized by
tasks.named("taskA") {
    finalizedBy("taskB")
}
```

---

## Plugins

### Applying Plugins

**Groovy DSL**
```groovy
plugins {
    id 'java'
    id 'application'
    id 'org.springframework.boot' version '3.2.0'
    id 'io.spring.dependency-management' version '1.1.4'
}
```

**Kotlin DSL**
```kotlin
plugins {
    java
    application
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
}
```

### Core Plugins

```kotlin
plugins {
    java              // Java compilation
    application       // Java application
    `java-library`    // Java library
    groovy            // Groovy support
    scala             // Scala support
    kotlin("jvm")     // Kotlin JVM
    war               // WAR packaging
    ear               // EAR packaging
    maven-publish     // Maven publishing
}
```

### Configuring Plugins

```kotlin
// Java plugin
java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
    withSourcesJar()
    withJavadocJar()
}

// Application plugin
application {
    mainClass.set("com.example.Main")
    applicationDefaultJvmArgs = listOf("-Xmx512m")
}

// Test plugin
tasks.test {
    useJUnitPlatform()
    maxParallelForks = Runtime.runtime.availableProcessors()
    testLogging {
        events("passed", "skipped", "failed")
        showStandardStreams = true
    }
}
```

### Popular Third-Party Plugins

```kotlin
plugins {
    // Spring Boot
    id("org.springframework.boot") version "3.2.0"
    
    // Kotlin
    kotlin("jvm") version "1.9.21"
    kotlin("plugin.spring") version "1.9.21"
    
    // Shadow (uber JAR)
    id("com.github.johnrengelman.shadow") version "8.1.1"
    
    // Spotless (code formatting)
    id("com.diffplug.spotless") version "6.23.3"
    
    // JaCoCo (code coverage)
    jacoco
    
    // Dependency updates
    id("com.github.ben-manes.versions") version "0.50.0"
}
```

### Shadow Plugin (Uber JAR)

```kotlin
plugins {
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

tasks.shadowJar {
    archiveBaseName.set("app")
    archiveClassifier.set("")
    archiveVersion.set("1.0.0")
    
    manifest {
        attributes["Main-Class"] = "com.example.Main"
    }
    
    // Merge service files
    mergeServiceFiles()
}
```

```bash
# Build uber JAR
./gradlew shadowJar
```

---

## Multi-Project Builds

### Project Structure

```
parent-project/
├── settings.gradle.kts
├── build.gradle.kts
├── common/
│   ├── build.gradle.kts
│   └── src/main/java/...
├── api/
│   ├── build.gradle.kts
│   └── src/main/java/...
├── service/
│   ├── build.gradle.kts
│   └── src/main/java/...
└── web/
    ├── build.gradle.kts
    └── src/main/java/...
```

### Root settings.gradle.kts

```kotlin
rootProject.name = "parent-project"

include("common", "api", "service", "web")
```

### Root build.gradle.kts

```kotlin
plugins {
    java
}

// Apply to all projects
allprojects {
    group = "com.example"
    version = "1.0.0"
    
    repositories {
        mavenCentral()
    }
}

// Apply to subprojects only
subprojects {
    apply(plugin = "java")
    
    java {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    
    dependencies {
        testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
    }
    
    tasks.test {
        useJUnitPlatform()
    }
}
```

### Subproject (api/build.gradle.kts)

```kotlin
plugins {
    java
}

dependencies {
    // Internal dependency
    implementation(project(":common"))
    
    // External dependencies
    implementation("org.springframework.boot:spring-boot-starter-web:3.2.0")
}
```

### Building Multi-Project

```bash
# Build all projects
./gradlew build

# Build specific project
./gradlew :api:build

# Build project and dependencies
./gradlew :web:build

# Run task in all subprojects
./gradlew :allprojects:test

# Parallel builds
./gradlew build --parallel
```

---

## Build Lifecycle

### Gradle Build Phases

1. **Initialization** - Determines which projects participate
2. **Configuration** - Configures project objects, executes build scripts
3. **Execution** - Executes selected tasks

### Task Graph

```kotlin
// Configure before task execution
gradle.taskGraph.whenReady {
    println("Task graph ready")
    println("Tasks to execute: ${allTasks.map { it.name }}")
}

// After build
gradle.buildFinished {
    println("Build finished")
}
```

### Build Phases Hooks

```kotlin
// Before project evaluation
beforeEvaluate {
    println("Before evaluation")
}

// After project evaluation
afterEvaluate {
    println("After evaluation")
}

// Task graph ready
gradle.taskGraph.whenReady {
    println("Task graph ready")
}
```

---

## Groovy vs Kotlin DSL

### Comparison

| Feature | Groovy DSL | Kotlin DSL |
|---------|-----------|------------|
| **File** | build.gradle | build.gradle.kts |
| **Syntax** | Dynamic | Static typed |
| **IDE Support** | Good | Excellent |
| **Autocomplete** | Limited | Full |
| **Performance** | Fast | Slightly slower |
| **Learning Curve** | Easy | Moderate |
| **Community** | Mature | Growing |

### Syntax Differences

**Groovy**
```groovy
plugins {
    id 'java'
    id 'application'
}

dependencies {
    implementation 'com.google.guava:guava:32.1.3-jre'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

**Kotlin**
```kotlin
plugins {
    java
    application
}

dependencies {
    implementation("com.google.guava:guava:32.1.3-jre")
}

tasks.test {
    useJUnitPlatform()
}
```

---

## Performance Optimization

### Build Cache

```kotlin
// Local cache (enabled by default in gradle.properties)
org.gradle.caching=true
```

```bash
# Remote cache
./gradlew build --build-cache
```

### Parallel Execution

```properties
# gradle.properties
org.gradle.parallel=true
org.gradle.workers.max=4
```

### Gradle Daemon

```properties
# gradle.properties
org.gradle.daemon=true
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
```

### Configuration on Demand

```properties
# gradle.properties
org.gradle.configureondemand=true
```

### Incremental Compilation

```kotlin
tasks.withType<JavaCompile> {
    options.isIncremental = true
}
```

### Build Scan

```bash
# Generate build scan
./gradlew build --scan
```

---

## Gradle vs Maven

| Feature | Gradle | Maven |
|---------|--------|-------|
| **Configuration** | Groovy/Kotlin DSL | XML |
| **Performance** | ⚡ Fast (cache, incremental) | Moderate |
| **Flexibility** | Very flexible | Convention-based |
| **Learning Curve** | Moderate | Easy |
| **Build Scripts** | Programmatic | Declarative |
| **Android** | ✅ Official | ❌ Not supported |
| **Dependency Resolution** | Advanced | Standard |
| **IDE Support** | Excellent | Excellent |

---

## Real-World Examples

### Spring Boot Application

**build.gradle.kts**
```kotlin
plugins {
    java
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
}

group = "com.example"
version = "1.0.0"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.test {
    useJUnitPlatform()
}
```

```bash
# Run application
./gradlew bootRun

# Build JAR
./gradlew bootJar

# Run JAR
java -jar build/libs/app-1.0.0.jar
```

### Android Application

**build.gradle.kts**
```kotlin
plugins {
    id("com.android.application")
    kotlin("android")
}

android {
    namespace = "com.example.app"
    compileSdk = 34
    
    defaultConfig {
        applicationId = "com.example.app"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }
    
    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"))
        }
    }
    
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
}
```

---

## Troubleshooting

### Common Commands

```bash
# Clean build
./gradlew clean build

# Refresh dependencies
./gradlew build --refresh-dependencies

# Debug mode
./gradlew build --debug

# Info logging
./gradlew build --info

# Dependency tree
./gradlew dependencies

# Dependency insight
./gradlew dependencyInsight --dependency guava

# Task list
./gradlew tasks --all

# Check for updates
./gradlew dependencyUpdates

# Build scan
./gradlew build --scan

# Stop daemon
./gradlew --stop
```

### Clear Cache

```bash
# Delete Gradle cache
rm -rf ~/.gradle/caches/

# Delete build cache
rm -rf ~/.gradle/build-cache/

# Clean project
./gradlew clean
```

---

## Resources

### Official
- **Website:** https://gradle.org
- **Documentation:** https://docs.gradle.org
- **User Manual:** https://docs.gradle.org/current/userguide/userguide.html
- **DSL Reference:** https://docs.gradle.org/current/dsl/
- **Plugin Portal:** https://plugins.gradle.org

### Learning
- **Gradle Guides:** https://gradle.org/guides/
- **Sample Projects:** https://github.com/gradle/gradle/tree/master/subprojects/docs/src/samples

---

## Conclusion

Gradle is a modern, high-performance build automation tool that offers flexibility, speed, and powerful dependency management. Its programmatic DSL (Groovy or Kotlin) provides expressiveness while maintaining build reproducibility.

**Key Takeaways:**
- ⚡ Superior performance (incremental builds, caching)
- 🔧 Flexible and extensible
- 📱 Official Android build tool
- 🎯 Modern DSL (Groovy/Kotlin)
- 🚀 Advanced dependency management
- 🏗️ Multi-project builds

Perfect for modern Java, Kotlin, and Android development!
