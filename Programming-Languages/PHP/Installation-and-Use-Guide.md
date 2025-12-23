# ✅ PHP Installation and Use Guide (Windows, Linux, macOS)

## 📌 Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
   - [Windows](#windows)
   - [Linux (Ubuntu/Debian)](#linux-ubuntudebian)
   - [macOS](#macos)
4. [Verifying Installation](#verifying-installation)
5. [PHP Configuration (`php.ini`)](#php-configuration-phpini)
6. [Running PHP Scripts](#running-php-scripts)
7. [Installing Extensions](#installing-extensions)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🧭 Introduction

**PHP (Hypertext Preprocessor)** is a widely-used open-source scripting language ideal for web development. Whether you're building a CMS, backend APIs, or an e-commerce platform, installing PHP properly is a critical first step.

---

## 🔧 Prerequisites

- Administrative/root access  
- Terminal or Command Prompt familiarity  
- Internet connection  
- Optional: Local web server (Apache, Nginx, etc.)

---

## 💻 Installation

### 🪟 Windows

#### 🔹 Option 1: Using **XAMPP** or **WampServer** (All-in-One Stack)

**Recommended for Beginners**

1. Download:
   - [XAMPP](https://www.apachefriends.org/)
   - [WampServer](https://www.wampserver.com/)
2. Run the installer and follow on-screen instructions.
3. PHP is installed with Apache/MySQL by default.

#### 🔹 Option 2: Manual PHP Installation

**Preferred by professionals for custom setups**

1. Go to [https://windows.php.net/download/](https://windows.php.net/download/)
2. Download latest **Thread Safe** zip file.
3. Extract to `C:\php`
4. Add to Environment Variables:
   - **System Variables → Path** → Add `C:\php`
5. Rename `php.ini-development` to `php.ini` and configure as needed.

```bash
php -v
```
### 🐧 Linux (Ubuntu/Debian-based)
-  Step 1: Update Repositories
```
sudo apt update
```
-  Step 2: Install PHP and Common Modules
```
sudo apt install php php-cli php-mbstring php-xml php-mysql php-curl php-zip php-gd

```
- Optional: Install Apache or Nginx with PHP

### For Apache
```
sudo apt install apache2 libapache2-mod-php
```

### For Nginx (PHP-FPM)
```
sudo apt install nginx php-fpm
```
bash
Copy
Edit
php -v

### 🍎 macOS
-  Option 1: Homebrew (Recommended)
1. Install Homebrew:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
2. Install PHP:
```
brew install php
```
3. To start PHP's built-in server:
```
php -S localhost:8000
```
```
php -v
```
- Option 2: XAMPP for macOS

Download from https://www.apachefriends.org/index.html

### 🧪 Verifying Installation
```
php -v
```
#### Expected output:
```
PHP 8.x.x (cli) (built: ...)
```
#### Run test script:
```
<?php phpinfo(); ?>
```
#### Serve using:
```
php -S localhost:8080 
```
Navigate to: `http://localhost:8080/test.php`
