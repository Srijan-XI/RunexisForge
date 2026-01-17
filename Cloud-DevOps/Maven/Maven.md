# Apache Maven - Project Management and Build Tool

## Table of Contents
- [Introduction](#introduction)
- [Why Maven?](#why-maven)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [POM (Project Object Model)](#pom-project-object-model)
- [Dependencies](#dependencies)
- [Build Lifecycle](#build-lifecycle)
- [Plugins](#plugins)
- [Profiles](#profiles)
- [Multi-Module Projects](#multi-module-projects)
- [Repository Management](#repository-management)
- [Best Practices](#best-practices)
- [Maven vs Gradle](#maven-vs-gradle)
- [Real-World Examples](#real-world-examples)
- [Troubleshooting](#troubleshooting)

---

## Introduction

**Apache Maven** is a powerful build automation and project management tool primarily used for Java projects. It uses a Project Object Model (POM) and a set of plugins to build, test, and deploy applications.

### Key Features
- **Dependency Management** - Automatic dependency resolution
- **Standard Project Structure** - Convention over configuration
- **Build Lifecycle** - Standardized build phases
- **Plugin Architecture** - Extensible functionality
- **Repository System** - Central and local repositories
- **Multi-Module Support** - Complex project hierarchies
- **Reporting** - Project documentation and metrics
- **IDE Integration** - Works with all major IDEs

### Core Concepts
- **POM (pom.xml)** - Project configuration file
- **Coordinates** - groupId, artifactId, version (GAV)
- **Dependencies** - External libraries
- **Plugins** - Build tasks and goals
- **Lifecycle** - Phases of the build process

---

## Why Maven?

### Advantages

✅ **Convention Over Configuration**
- Standard directory structure
- Predefined build lifecycle
- Minimal configuration needed

✅ **Dependency Management**
- Automatic dependency resolution
- Transitive dependencies
- Version conflict management

✅ **Reproducible Builds**
- Declarative configuration
- Consistent across environments
- Version-controlled dependencies

✅ **Extensive Plugin Ecosystem**
- Thousands of available plugins
- Custom plugin development
- Community support

✅ **IDE Support**
- IntelliJ IDEA
- Eclipse
- VS Code
- NetBeans

### Use Cases
- **Java Applications** - Standard Java projects
- **Web Applications** - WAR/EAR packaging
- **Spring Boot** - Microservices development
- **Android** - Mobile app development
- **Multi-Module Projects** - Enterprise applications
- **Library Development** - Reusable components

---

## Installation & Setup

### Prerequisites

```bash
# Java JDK (8 or higher)
java -version
```

### Installation

#### Linux/macOS

```bash
# Download Maven
wget https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz

# Extract
tar xzvf apache-maven-3.9.6-bin.tar.gz

# Move to /opt
sudo mv apache-maven-3.9.6 /opt/maven

# Set environment variables
echo 'export M2_HOME=/opt/maven' >> ~/.bashrc
echo 'export PATH=$M2_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Verify installation
mvn -version
```

#### macOS (Homebrew)

```bash
brew install maven

# Verify
mvn -version
```

#### Windows

```powershell
# Download from https://maven.apache.org/download.cgi
# Extract to C:\Program Files\Apache\maven

# Set environment variables
setx M2_HOME "C:\Program Files\Apache\maven"
setx PATH "%PATH%;%M2_HOME%\bin"

# Verify
mvn -version
```

#### Using SDKMAN

```bash
# Install SDKMAN
curl -s "https://get.sdkman.io" | bash

# Install Maven
sdk install maven

# Verify
mvn -version
```

### Configuration

**~/.m2/settings.xml**
```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
    http://maven.apache.org/xsd/settings-1.0.0.xsd">
    
    <localRepository>${user.home}/.m2/repository</localRepository>
    
    <mirrors>
        <mirror>
            <id>central-mirror</id>
            <mirrorOf>central</mirrorOf>
            <url>https://repo.maven.apache.org/maven2</url>
        </mirror>
    </mirrors>
    
    <profiles>
        <profile>
            <id>jdk-17</id>
            <activation>
                <jdk>17</jdk>
            </activation>
            <properties>
                <maven.compiler.source>17</maven.compiler.source>
                <maven.compiler.target>17</maven.compiler.target>
            </properties>
        </profile>
    </profiles>
</settings>
```

---

## Project Structure

### Standard Directory Layout

```
my-project/
├── pom.xml                      # Project configuration
├── src/
│   ├── main/
│   │   ├── java/               # Java source files
│   │   │   └── com/example/
│   │   │       └── App.java
│   │   ├── resources/          # Application resources
│   │   │   ├── application.properties
│   │   │   └── logback.xml
│   │   └── webapp/             # Web application files (WAR)
│   │       ├── WEB-INF/
│   │       │   └── web.xml
│   │       └── index.html
│   └── test/
│       ├── java/               # Test source files
│       │   └── com/example/
│       │       └── AppTest.java
│       └── resources/          # Test resources
│           └── test.properties
├── target/                     # Build output (generated)
│   ├── classes/
│   ├── test-classes/
│   └── my-project-1.0.jar
└── README.md
```

### Creating a New Project

```bash
# Interactive mode
mvn archetype:generate

# Quick start (non-interactive)
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=my-app \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DarchetypeVersion=1.4 \
  -DinteractiveMode=false

# Spring Boot project
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=spring-boot-app \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -Dversion=1.0-SNAPSHOT

# Web application
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=my-webapp \
  -DarchetypeArtifactId=maven-archetype-webapp \
  -DinteractiveMode=false
```

---

## POM (Project Object Model)

### Basic POM Structure

**pom.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    
    <modelVersion>4.0.0</modelVersion>
    
    <!-- Project Coordinates -->
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    
    <!-- Project Information -->
    <name>My Application</name>
    <description>A sample Maven project</description>
    <url>https://example.com</url>
    
    <!-- Properties -->
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <junit.version>5.10.0</junit.version>
    </properties>
    
    <!-- Dependencies -->
    <dependencies>
        <!-- Add dependencies here -->
    </dependencies>
    
    <!-- Build Configuration -->
    <build>
        <plugins>
            <!-- Add plugins here -->
        </plugins>
    </build>
    
</project>
```

### Packaging Types

```xml
<!-- JAR (default) -->
<packaging>jar</packaging>

<!-- WAR (Web Application) -->
<packaging>war</packaging>

<!-- EAR (Enterprise Application) -->
<packaging>ear</packaging>

<!-- POM (Parent/Multi-module) -->
<packaging>pom</packaging>

<!-- Maven Plugin -->
<packaging>maven-plugin</packaging>
```

### Properties

```xml
<properties>
    <!-- Java version -->
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    
    <!-- Encoding -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    
    <!-- Dependency versions -->
    <spring.boot.version>3.2.0</spring.boot.version>
    <lombok.version>1.18.30</lombok.version>
    <junit.version>5.10.0</junit.version>
    
    <!-- Plugin versions -->
    <maven.compiler.plugin.version>3.11.0</maven.compiler.plugin.version>
    <maven.surefire.plugin.version>3.2.2</maven.surefire.plugin.version>
</properties>
```

---

## Dependencies

### Adding Dependencies

```xml
<dependencies>
    <!-- JUnit 5 -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>${junit.version}</version>
        <scope>test</scope>
    </dependency>
    
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>3.2.0</version>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.30</version>
        <scope>provided</scope>
    </dependency>
    
    <!-- SLF4J Logging -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>2.0.9</version>
    </dependency>
</dependencies>
```

### Dependency Scopes

```xml
<!-- compile (default) - Available in all classpaths -->
<dependency>
    <groupId>commons-lang</groupId>
    <artifactId>commons-lang</artifactId>
    <version>2.6</version>
    <scope>compile</scope>
</dependency>

<!-- provided - Provided by JDK or container -->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
    <scope>provided</scope>
</dependency>

<!-- runtime - Not needed for compilation -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
    <scope>runtime</scope>
</dependency>

<!-- test - Only for testing -->
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>5.7.0</version>
    <scope>test</scope>
</dependency>

<!-- system - Must provide system path -->
<dependency>
    <groupId>com.custom</groupId>
    <artifactId>custom-lib</artifactId>
    <version>1.0</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/lib/custom-lib.jar</systemPath>
</dependency>
```

### Dependency Management

```xml
<!-- Parent POM -->
<dependencyManagement>
    <dependencies>
        <!-- Spring Boot BOM -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>3.2.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- Child modules don't need versions -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- Version inherited from parent -->
    </dependency>
</dependencies>
```

### Exclusions

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <!-- Exclude Tomcat, use Jetty instead -->
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- Add Jetty -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

---

## Build Lifecycle

### Three Built-in Lifecycles

1. **clean** - Cleans the project
2. **default** - Builds the project
3. **site** - Generates project documentation

### Default Lifecycle Phases

```bash
# validate - Validate project structure
mvn validate

# compile - Compile source code
mvn compile

# test - Run unit tests
mvn test

# package - Package compiled code (JAR/WAR)
mvn package

# verify - Run integration tests
mvn verify

# install - Install to local repository
mvn install

# deploy - Deploy to remote repository
mvn deploy
```

### Running Phases

```bash
# Clean and compile
mvn clean compile

# Full build with tests
mvn clean install

# Build without tests
mvn clean install -DskipTests

# Package without running tests
mvn clean package -Dmaven.test.skip=true

# Deploy to repository
mvn clean deploy

# Generate site documentation
mvn site
```

### Plugin Goals

```bash
# Run specific plugin goal
mvn compiler:compile
mvn surefire:test
mvn jar:jar

# Multiple goals
mvn clean compile test

# With profiles
mvn clean install -Pproduction

# Debug mode
mvn clean install -X

# Offline mode
mvn clean install -o
```

---

## Plugins

### Compiler Plugin

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
            <configuration>
                <source>17</source>
                <target>17</target>
                <encoding>UTF-8</encoding>
                <compilerArgs>
                    <arg>-parameters</arg>
                </compilerArgs>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### Surefire Plugin (Unit Tests)

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.2.2</version>
    <configuration>
        <includes>
            <include>**/*Test.java</include>
            <include>**/*Tests.java</include>
        </includes>
        <excludes>
            <exclude>**/*IntegrationTest.java</exclude>
        </excludes>
        <argLine>-Xmx1024m</argLine>
    </configuration>
</plugin>
```

### JAR Plugin

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>3.3.0</version>
    <configuration>
        <archive>
            <manifest>
                <mainClass>com.example.Main</mainClass>
                <addClasspath>true</addClasspath>
                <classpathPrefix>lib/</classpathPrefix>
            </manifest>
            <manifestEntries>
                <Built-By>${user.name}</Built-By>
                <Build-Time>${maven.build.timestamp}</Build-Time>
            </manifestEntries>
        </archive>
    </configuration>
</plugin>
```

### Spring Boot Maven Plugin

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>3.2.0</version>
    <configuration>
        <mainClass>com.example.Application</mainClass>
    </configuration>
    <executions>
        <execution>
            <goals>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### Assembly Plugin

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>3.6.0</version>
    <configuration>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
        <archive>
            <manifest>
                <mainClass>com.example.Main</mainClass>
            </manifest>
        </archive>
    </configuration>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### Shade Plugin (Uber JAR)

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.5.1</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <transformers>
                    <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                        <mainClass>com.example.Main</mainClass>
                    </transformer>
                </transformers>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### Exec Plugin

```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>exec-maven-plugin</artifactId>
    <version>3.1.1</version>
    <configuration>
        <mainClass>com.example.Main</mainClass>
    </configuration>
</plugin>
```

```bash
# Run Java class
mvn exec:java -Dexec.mainClass="com.example.Main"

# With arguments
mvn exec:java -Dexec.mainClass="com.example.Main" -Dexec.args="arg1 arg2"
```

---

## Profiles

### Defining Profiles

```xml
<profiles>
    <!-- Development profile -->
    <profile>
        <id>dev</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
            <env>development</env>
            <db.url>jdbc:h2:mem:devdb</db.url>
        </properties>
    </profile>
    
    <!-- Production profile -->
    <profile>
        <id>prod</id>
        <properties>
            <env>production</env>
            <db.url>jdbc:postgresql://prod-db:5432/mydb</db.url>
        </properties>
        <dependencies>
            <dependency>
                <groupId>org.postgresql</groupId>
                <artifactId>postgresql</artifactId>
                <version>42.7.0</version>
            </dependency>
        </dependencies>
    </profile>
    
    <!-- Testing profile -->
    <profile>
        <id>test</id>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <configuration>
                        <includes>
                            <include>**/*Test.java</include>
                            <include>**/*IT.java</include>
                        </includes>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>
</profiles>
```

### Activating Profiles

```bash
# Activate profile
mvn clean install -Pprod

# Multiple profiles
mvn clean install -Pdev,test

# List active profiles
mvn help:active-profiles

# Deactivate profile
mvn clean install -P!dev
```

### Profile Activation

```xml
<profile>
    <id>jdk-17</id>
    <activation>
        <!-- Activate on JDK 17 -->
        <jdk>17</jdk>
    </activation>
</profile>

<profile>
    <id>windows</id>
    <activation>
        <!-- Activate on Windows -->
        <os>
            <family>Windows</family>
        </os>
    </activation>
</profile>

<profile>
    <id>custom-property</id>
    <activation>
        <!-- Activate when property is set -->
        <property>
            <name>env</name>
            <value>prod</value>
        </property>
    </activation>
</profile>
```

---

## Multi-Module Projects

### Parent POM

**pom.xml** (root)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>parent-project</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>
    
    <name>Parent Project</name>
    
    <!-- Modules -->
    <modules>
        <module>common</module>
        <module>api</module>
        <module>service</module>
        <module>web</module>
    </modules>
    
    <!-- Common properties -->
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <spring.boot.version>3.2.0</spring.boot.version>
    </properties>
    
    <!-- Dependency management -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring.boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    
    <!-- Common dependencies -->
    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>
    </dependencies>
    
    <!-- Build configuration -->
    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.11.0</version>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
    
</project>
```

### Child Module

**api/pom.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    
    <modelVersion>4.0.0</modelVersion>
    
    <!-- Parent -->
    <parent>
        <groupId>com.example</groupId>
        <artifactId>parent-project</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    
    <artifactId>api</artifactId>
    <packaging>jar</packaging>
    
    <name>API Module</name>
    
    <!-- Module-specific dependencies -->
    <dependencies>
        <!-- Internal dependency -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>common</artifactId>
            <version>${project.version}</version>
        </dependency>
        
        <!-- Spring Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
    
</project>
```

### Project Structure

```
parent-project/
├── pom.xml                   # Parent POM
├── common/
│   ├── pom.xml
│   └── src/main/java/...
├── api/
│   ├── pom.xml
│   └── src/main/java/...
├── service/
│   ├── pom.xml
│   └── src/main/java/...
└── web/
    ├── pom.xml
    └── src/main/java/...
```

### Building Multi-Module Projects

```bash
# Build all modules
mvn clean install

# Build specific module
mvn clean install -pl api

# Build module and dependencies
mvn clean install -pl web -am

# Build from specific module
mvn clean install -rf service

# Parallel builds
mvn clean install -T 4
```

---

## Repository Management

### Local Repository

```bash
# Default location
~/.m2/repository/

# Custom location
mvn clean install -Dmaven.repo.local=/path/to/repo
```

### Remote Repositories

```xml
<repositories>
    <repository>
        <id>central</id>
        <url>https://repo.maven.apache.org/maven2</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
    
    <repository>
        <id>spring-milestones</id>
        <url>https://repo.spring.io/milestone</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
```

### Distribution Management

```xml
<distributionManagement>
    <repository>
        <id>releases</id>
        <name>Internal Releases</name>
        <url>https://nexus.example.com/repository/maven-releases/</url>
    </repository>
    
    <snapshotRepository>
        <id>snapshots</id>
        <name>Internal Snapshots</name>
        <url>https://nexus.example.com/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>
```

### Server Authentication

**~/.m2/settings.xml**
```xml
<servers>
    <server>
        <id>releases</id>
        <username>deployment</username>
        <password>password123</password>
    </server>
    
    <server>
        <id>snapshots</id>
        <username>deployment</username>
        <password>password123</password>
    </server>
</servers>
```

---

## Best Practices

### 1. Versioning

```xml
<!-- Use properties for versions -->
<properties>
    <spring.version>3.2.0</spring.version>
    <junit.version>5.10.0</junit.version>
</properties>

<!-- Semantic versioning -->
<version>1.0.0</version>         <!-- Release -->
<version>1.0.1-SNAPSHOT</version> <!-- Development -->
```

### 2. Dependency Management

```xml
<!-- Use dependencyManagement in parent -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>${spring.boot.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

### 3. Properties

```xml
<!-- Centralize configuration -->
<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
```

### 4. Plugin Versions

```xml
<!-- Always specify plugin versions -->
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```

### 5. Profiles

```bash
# Use profiles for environment-specific config
mvn clean install -Pproduction
```

---

## Maven vs Gradle

| Feature | Maven | Gradle |
|---------|-------|--------|
| **Configuration** | XML (pom.xml) | Groovy/Kotlin DSL |
| **Performance** | Moderate | Faster (incremental builds) |
| **Learning Curve** | Easy | Moderate |
| **Flexibility** | Conventions | Highly flexible |
| **IDE Support** | Excellent | Excellent |
| **Build Cache** | Local only | Local + remote |
| **Dependency Resolution** | Transitive | Advanced |
| **Android** | Not supported | Official build tool |

---

## Real-World Examples

### Spring Boot Application

**pom.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>spring-boot-app</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
    
</project>
```

```bash
# Run application
mvn spring-boot:run

# Package as JAR
mvn clean package

# Run JAR
java -jar target/spring-boot-app-1.0.0.jar
```

---

## Troubleshooting

### Common Issues

```bash
# Clean local repository
rm -rf ~/.m2/repository/*

# Force update dependencies
mvn clean install -U

# Debug mode
mvn clean install -X

# Dependency tree
mvn dependency:tree

# Resolve dependency conflicts
mvn dependency:tree -Dverbose

# Check for updates
mvn versions:display-dependency-updates

# Analyze dependencies
mvn dependency:analyze
```

---

## Resources

### Official
- **Website:** https://maven.apache.org
- **Documentation:** https://maven.apache.org/guides/
- **Plugin Registry:** https://maven.apache.org/plugins/
- **Central Repository:** https://mvnrepository.com

### Learning
- **Maven by Example:** https://books.sonatype.com/mvnex-book/
- **Maven Guides:** https://maven.apache.org/guides/getting-started/

---

## Conclusion

Maven is the de facto standard build tool for Java projects, offering robust dependency management, a standardized build lifecycle, and extensive plugin ecosystem. While it may seem verbose compared to modern alternatives, its convention-over-configuration approach and excellent IDE support make it an excellent choice for Java development.

**Key Takeaways:**
- 📦 Comprehensive dependency management
- 🏗️ Standard project structure
- 🔄 Well-defined build lifecycle
- 🔌 Extensive plugin ecosystem
- 🎯 Convention over configuration
- 🚀 Battle-tested and reliable

Perfect for Java projects of any size!
