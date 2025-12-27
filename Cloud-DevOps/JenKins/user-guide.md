# Jenkins User Guide

## Table of Contents

1. [Installation](#installation)
2. [Initial Setup](#initial-setup)
3. [Creating Jobs](#creating-jobs)
4. [Jenkins Pipeline](#jenkins-pipeline)
5. [Source Control Integration](#source-control-integration)
6. [Build Triggers](#build-triggers)
7. [Agents and Nodes](#agents-and-nodes)
8. [Credentials Management](#credentials-management)
9. [Plugins](#plugins)
10. [Best Practices](#best-practices)

---

## Installation

### Prerequisites

**Java Installation (Required):**
Jenkins requires Java 11 or Java 17.

```bash
# Check Java version
java -version

# Install Java (if needed)
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# RHEL/CentOS/Fedora
sudo dnf install java-17-openjdk

# macOS
brew install openjdk@17
```bash

### Installation Methods

#### 1. Docker (Recommended for Quick Start)

```bash
# Pull Jenkins image
docker pull jenkins/jenkins:lts

# Run Jenkins container
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts

# View initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```bash

#### 2. Ubuntu/Debian

```bash
# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt update
sudo apt install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Check status
sudo systemctl status jenkins
```bash

#### 3. RHEL/CentOS/Fedora

```bash
# Add Jenkins repository
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

# Install Jenkins
sudo dnf install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```bash

#### 4. macOS

```bash
# Using Homebrew
brew install jenkins-lts

# Start Jenkins
brew services start jenkins-lts
```bash

#### 5. Windows

1. Download Jenkins WAR file from [jenkins.io](https://www.jenkins.io/download/)
2. Run: `java -jar jenkins.war`
3. Or download Windows installer (.msi)

#### 6. WAR File (Any Platform)

```bash
# Download latest WAR
wget http://mirrors.jenkins.io/war-stable/latest/jenkins.war

# Run Jenkins
java -jar jenkins.war --httpPort=8080
```bash

### Firewall Configuration

```bash
# Ubuntu/Debian
sudo ufw allow 8080
sudo ufw allow 50000

# RHEL/CentOS
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --permanent --add-port=50000/tcp
sudo firewall-cmd --reload
```bash

---

## Initial Setup

### Access Jenkins

1. Open browser: `http://localhost:8080`

### Unlock Jenkins

**Get initial admin password:**

```bash
# Linux/macOS
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# Docker
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Windows
type "C:\Program Files\Jenkins\secrets\initialAdminPassword"
```bash

### Install Plugins

**Option 1: Install Suggested Plugins** (Recommended)

- Includes commonly used plugins
- Good for getting started

**Option 2: Select Plugins to Install**

- Choose specific plugins
- More control over installation

**Common Essential Plugins:**

- Git Plugin
- Pipeline Plugin
- Docker Plugin
- GitHub Integration Plugin
- Blue Ocean
- Credentials Binding Plugin

### Create Admin User

1. Username: `admin`
2. Password: `[secure password]`
3. Full name: `Your Name`
4. Email: `your.email@example.com`

### Configure Jenkins URL

Set to your Jenkins URL (e.g., `http://jenkins.example.com:8080`)

---

## Creating Jobs

### 1. Freestyle Project

**Basic Build Job:**

1. **New Item** → Enter name → **Freestyle project**

2. **Source Code Management:**
   - Select Git
   - Repository URL: `https://github.com/user/repo.git`
   - Credentials: Add if private repo
   - Branches to build: `*/main`

3. **Build Triggers:**
   - Poll SCM: `H/5 * * * *` (every 5 minutes)
   - Or GitHub hook trigger

4. **Build Steps:**
   - Add build step → Execute shell

   ```bash
   echo "Building application..."
   mvn clean package
   ```

5. **Post-build Actions:**
   - Archive artifacts: `target/*.jar`
   - Publish JUnit test results: `target/test-reports/*.xml`

6. **Save** and **Build Now**

### 2. Pipeline Project

**Create Pipeline:**

1. **New Item** → Enter name → **Pipeline**

2. **Pipeline Definition:**
   - Pipeline script from SCM
   - Or Pipeline script (inline)

3. **Simple Pipeline Script:**

```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/user/repo.git'
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        
        stage('Package') {
            steps {
                sh 'mvn package'
            }
        }
    }
    
    post {
        success {
            echo 'Build successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
```bash

### 3. Multibranch Pipeline

**Automatically builds all branches:**

1. **New Item** → **Multibranch Pipeline**

2. **Branch Sources:**
   - Add source → Git
   - Project Repository: `https://github.com/user/repo.git`

3. **Build Configuration:**
   - Mode: by Jenkinsfile
   - Script Path: `Jenkinsfile`

4. **Scan triggers:**
   - Periodically if not otherwise run: 1 hour

---

## Jenkins Pipeline

### Declarative Pipeline Syntax

#### Complete Example

```groovy
pipeline {
    agent any
    
    environment {
        MAVEN_HOME = tool 'Maven-3.8'
        PATH = "${MAVEN_HOME}/bin:${env.PATH}"
    }
    
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Deployment environment')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run tests?')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/user/repo.git'
            }
        }
        
        stage('Build') {
            steps {
                echo "Building for ${params.ENVIRONMENT}"
                sh 'mvn clean compile'
            }
        }
        
        stage('Test') {
            when {
                expression { params.RUN_TESTS == true }
            }
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('Code Analysis') {
            parallel {
                stage('SonarQube') {
                    steps {
                        sh 'mvn sonar:sonar'
                    }
                }
                stage('Security Scan') {
                    steps {
                        sh 'dependency-check --scan ./'
                    }
                }
            }
        }
        
        stage('Package') {
            steps {
                sh 'mvn package -DskipTests'
                archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    if (params.ENVIRONMENT == 'prod') {
                        input message: 'Deploy to production?', ok: 'Deploy'
                    }
                }
                sh "./deploy.sh ${params.ENVIRONMENT}"
            }
        }
    }
    
    post {
        success {
            slackSend channel: '#builds', color: 'good', message: "Build ${env.JOB_NAME} #${env.BUILD_NUMBER} succeeded"
        }
        failure {
            slackSend channel: '#builds', color: 'danger', message: "Build ${env.JOB_NAME} #${env.BUILD_NUMBER} failed"
            emailext (
                subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Check console output at ${env.BUILD_URL}",
                to: 'team@example.com'
            )
        }
        always {
            cleanWs()
        }
    }
}
```bash

### Pipeline Directives

#### agent

```groovy
// Run on any available agent
agent any

// Run on specific agent with label
agent { label 'linux' }

// Run in Docker container
agent {
    docker {
        image 'maven:3.8-openjdk-17'
    }
}

// No agent (specify per stage)
agent none
```bash

#### environment

```groovy
environment {
    APP_NAME = 'my-app'
    VERSION = '1.0.0'
    DEPLOY_PATH = '/opt/app'
}
```bash

#### parameters

```groovy
parameters {
    string(name: 'BRANCH', defaultValue: 'main', description: 'Branch to build')
    choice(name: 'ENV', choices: ['dev', 'staging', 'prod'])
    booleanParam(name: 'DEPLOY', defaultValue: false)
}
```bash

#### triggers

```groovy
triggers {
    cron('H 2 * * *')  // Daily at 2 AM
    pollSCM('H/15 * * * *')  // Poll every 15 minutes
}
```bash

#### when conditions

```groovy
when {
    branch 'main'
    environment name: 'DEPLOY', value: 'true'
    expression { return params.RUN_TESTS == true }
    allOf {
        branch 'main'
        environment name: 'ENV', value: 'prod'
    }
}
```bash

### Scripted Pipeline

```groovy
node {
    def mvnHome = tool 'Maven-3.8'
    
    stage('Checkout') {
        git 'https://github.com/user/repo.git'
    }
    
    stage('Build') {
        sh "${mvnHome}/bin/mvn clean compile"
    }
    
    stage('Test') {
        try {
            sh "${mvnHome}/bin/mvn test"
        } finally {
            junit 'target/surefire-reports/*.xml'
        }
    }
    
    stage('Package') {
        sh "${mvnHome}/bin/mvn package -DskipTests"
        archiveArtifacts 'target/*.jar'
    }
}
```bash

---

## Source Control Integration

### Git Integration

**Install Git Plugin:**
Manage Jenkins → Manage Plugins → Available → Git Plugin

**Configure in Pipeline:**

```groovy
stage('Checkout') {
    steps {
        git branch: 'main',
            credentialsId: 'github-creds',
            url: 'https://github.com/user/repo.git'
    }
}
```bash

### GitHub Integration

**1. Install GitHub Plugin**

**2. Configure GitHub Server:**

- Manage Jenkins → Configure System
- GitHub → Add GitHub Server
- API URL: `https://api.github.com`
- Credentials: GitHub Personal Access Token

**3. Configure Webhook:**

- GitHub Repository → Settings → Webhooks
- Payload URL: `http://jenkins.example.com/github-webhook/`
- Content type: `application/json`
- Events: Just the push event

**4. Pipeline with GitHub:**

```groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    }
}
```bash

### GitLab Integration

**1. Install GitLab Plugin**

**2. Configure GitLab Connection:**

- Manage Jenkins → Configure System → GitLab
- Connection name: `GitLab`
- GitLab host URL: `https://gitlab.com`
- Credentials: GitLab API token

**3. Configure Webhook in GitLab:**

- Project → Settings → Webhooks
- URL: `http://jenkins.example.com/project/job-name`
- Trigger: Push events, Merge request events

---

## Build Triggers

### 1. Manual Trigger

Click "Build Now" button

### 2. Poll SCM

```groovy
triggers {
    pollSCM('H/15 * * * *')  // Every 15 minutes
}
```bash

### 3. GitHub/GitLab Webhook

Automatic trigger on push events

### 4. Scheduled Builds (Cron)

```groovy
triggers {
    cron('H 2 * * *')  // 2 AM daily
}
```bash

**Cron Syntax:**

```bash
MINUTE HOUR DAY MONTH DAYOFWEEK

Examples:
H 2 * * *           - Daily at 2 AM
H H * * 0           - Weekly on Sunday
H H 1 * *           - Monthly on 1st
H/15 * * * *        - Every 15 minutes
H 9-17/2 * * 1-5    - Weekdays, 9 AM-5 PM, every 2 hours
```bash

### 5. Build After Other Projects

```groovy
triggers {
    upstream(upstreamProjects: 'upstream-job', threshold: hudson.model.Result.SUCCESS)
}
```text

### 6. Remote Trigger

```bash
# Trigger with token
curl -X POST http://jenkins.example.com/job/job-name/build?token=BUILD_TOKEN

# With parameters
curl -X POST http://jenkins.example.com/job/job-name/buildWithParameters?token=BUILD_TOKEN&PARAM1=value1
```text

---

## Agents and Nodes

### Configure Agent

**1. SSH Agent (Linux/macOS):**

- Manage Jenkins → Manage Nodes → New Node
- Node name: `linux-agent-1`
- Type: Permanent Agent
- Remote root directory: `/home/jenkins`
- Labels: `linux docker`
- Launch method: Launch agents via SSH
- Host: `192.168.1.10`
- Credentials: Add SSH username with private key

**2. JNLP Agent (Windows):**

- Launch method: Launch agent by connecting it to the controller
- Download agent.jar on Windows machine
- Run: `java -jar agent.jar -jnlpUrl http://jenkins:8080/computer/windows-agent/slave-agent.jnlp -secret <secret>`

### Using Agents in Pipeline

```groovy
pipeline {
    agent { label 'linux' }
    
    stages {
        stage('Build on Linux') {
            agent { label 'linux' }
            steps {
                sh 'make build'
            }
        }
        
        stage('Build on Windows') {
            agent { label 'windows' }
            steps {
                bat 'build.bat'
            }
        }
        
        stage('Docker Build') {
            agent {
                docker {
                    image 'maven:3.8-openjdk-17'
                    label 'docker'
                }
            }
            steps {
                sh 'mvn clean package'
            }
        }
    }
}
```text

---

## Credentials Management

### Add Credentials

1. **Manage Jenkins → Manage Credentials**
2. **Select Domain → Add Credentials**

### Credential Types

#### Username with Password

- Username: `admin`
- Password: `*******`
- ID: `admin-credentials`
- Description: `Admin credentials`

#### SSH Username with Private Key

- Username: `jenkins`
- Private Key: Enter directly or from file
- Passphrase: (if key is encrypted)
- ID: `ssh-key`

#### Secret Text

- Secret: `api-token-value`
- ID: `api-token`

#### Secret File

- File: Upload certificate or config file
- ID: `keystore`

### Using Credentials in Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        // Inject credentials as environment variables
        DOCKER_CREDS = credentials('docker-hub')
    }
    
    stages {
        stage('Build') {
            steps {
                // Username/Password
                withCredentials([usernamePassword(
                    credentialsId: 'github-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'git clone https://$USER:$PASS@github.com/user/repo.git'
                }
                
                // Secret text
                withCredentials([string(
                    credentialsId: 'api-token',
                    variable: 'API_TOKEN'
                )]) {
                    sh 'curl -H "Authorization: Bearer $API_TOKEN" https://api.example.com'
                }
                
                // SSH Key
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ssh-key',
                    keyFileVariable: 'SSH_KEY'
                )]) {
                    sh 'ssh -i $SSH_KEY user@server "deploy.sh"'
                }
            }
        }
    }
}
```text

---

## Plugins

### Install Plugins

1. **Manage Jenkins → Manage Plugins**
2. **Available tab → Search for plugin**
3. **Select and click "Install without restart"**

### Essential Plugins

**Source Control:**

- Git Plugin
- GitHub Integration Plugin
- Bitbucket Plugin
- GitLab Plugin

**Build & Test:**

- Maven Integration Plugin
- Gradle Plugin
- NodeJS Plugin
- JUnit Plugin

**Deployment:**

- Deploy to container Plugin
- Kubernetes Plugin
- Docker Plugin
- AWS Steps Plugin

**Notifications:**

- Email Extension Plugin
- Slack Notification Plugin
- Microsoft Teams Plugin

**Utilities:**

- Blue Ocean
- Pipeline Plugin
- Configuration as Code Plugin
- Credentials Binding Plugin
- Build Timeout Plugin

### Update Plugins

1. **Manage Jenkins → Manage Plugins → Updates**
2. **Select all or specific plugins**
3. **Download now and install after restart**

---

## Best Practices

### 1. Pipeline as Code

```groovy
// Store Jenkinsfile in repository
// Version control your pipeline
// Review pipeline changes with code
```text

### 2. Use Shared Libraries

```groovy
// vars/buildApp.groovy
def call(String appName) {
    pipeline {
        agent any
        stages {
            stage('Build') {
                steps {
                    sh "./build.sh ${appName}"
                }
            }
        }
    }
}

// Jenkinsfile
@Library('my-shared-library') _
buildApp('my-app')
```text

### 3. Security Best Practices

- Enable CSRF protection
- Use role-based access control
- Secure credentials properly
- Regular security updates
- Enable audit logging

### 4. Performance Optimization

```groovy
pipeline {
    agent none  // Don't allocate executor until needed
    
    stages {
        stage('Parallel Tests') {
            parallel {
                stage('Unit Tests') {
                    agent { label 'test' }
                    steps { sh 'mvn test' }
                }
                stage('Integration Tests') {
                    agent { label 'test' }
                    steps { sh 'mvn verify' }
                }
            }
        }
    }
}
```text

### 5. Resource Management

```groovy
pipeline {
    options {
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }
}
```text

---

## Resources

### Official Documentation

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Plugin Index](https://plugins.jenkins.io/)

### Learning Resources

- [Jenkins User Handbook](https://www.jenkins.io/doc/book/)
- [Pipeline Tutorial](https://www.jenkins.io/doc/book/pipeline/getting-started/)
- [Jenkins Community](https://community.jenkins.io/)

### Community

- [Stack Overflow - Jenkins](https://stackoverflow.com/questions/tagged/jenkins)
- [Jenkins Users Mailing List](https://www.jenkins.io/mailing-lists/)
- [Reddit r/jenkinsci](https://www.reddit.com/r/jenkinsci/)

---

**Congratulations!** You now have a comprehensive guide to Jenkins. Start building your CI/CD pipelines!
