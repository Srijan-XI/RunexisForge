# MySQL Installation and Usage Guide

## 💻 Installation

### Windows Installation

#### Method 1: MySQL Installer (Recommended)

1. **Download MySQL Installer**
   - Visit: <https://dev.mysql.com/downloads/installer/>
   - Download MySQL Installer for Windows (mysql-installer-web-community)

2. **Run the Installer**
   - Double-click the downloaded `.msi` file
   - Choose setup type:
     - **Developer Default**: MySQL Server + tools
     - **Server only**: Just the server
     - **Full**: Everything
     - **Custom**: Choose components

3. **Configuration**
   - Choose Config Type: Development Machine / Server / Dedicated
   - Set root password (remember this!)
   - Configure Windows Service (start at boot recommended)
   - Apply configuration

4. **Verify Installation**

   ```powershell
   mysql --version
   ```

#### Method 2: Chocolatey

```powershell
choco install mysql
```bash

#### Method 3: Winget

```powershell
winget install Oracle.MySQL
```bash

### macOS Installation

#### Method 1: Homebrew (Recommended)

```bash
# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation

# Verify
mysql --version
```bash

#### Method 2: DMG Package

1. Download from <https://dev.mysql.com/downloads/mysql/>
2. Open `.dmg` file
3. Run installer package
4. Follow installation wizard
5. Note the temporary root password

### Linux Installation

#### Ubuntu/Debian

```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Enable on boot
sudo systemctl enable mysql

# Secure installation
sudo mysql_secure_installation

# Verify
mysql --version
```bash

#### Fedora/RHEL/CentOS

```bash
# Install MySQL
sudo dnf install mysql-server

# Start service
sudo systemctl start mysqld

# Enable on boot
sudo systemctl enable mysqld

# Get temporary password
sudo grep 'temporary password' /var/log/mysqld.log

# Secure installation
sudo mysql_secure_installation
```bash

#### Arch Linux

```bash
# Install
sudo pacman -S mysql

# Initialize data directory
sudo mysqld --initialize --user=mysql --basedir=/usr --datadir=/var/lib/mysql

# Start service
sudo systemctl start mysqld

# Enable on boot
sudo systemctl enable mysqld
```bash

### Docker Installation

```bash
# Pull MySQL image
docker pull mysql:latest

# Run MySQL container
docker run --name mysql \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -p 3306:3306 \
  -d mysql:latest

# Access MySQL shell
docker exec -it mysql mysql -uroot -p

# With persistent storage
docker run --name mysql \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -v mysql-data:/var/lib/mysql \
  -p 3306:3306 \
  -d mysql:latest
```bash

---

## ⚙️ Initial Setup

### Secure Installation

```bash
mysql_secure_installation
```bash

This will:

- Set root password
- Remove anonymous users
- Disallow root login remotely
- Remove test database
- Reload privilege tables

### Connect to MySQL

```bash
# Connect as root
mysql -u root -p

# Connect to specific database
mysql -u root -p database_name

# Connect to remote server
mysql -h hostname -u username -p database_name
```bash

### First Time Configuration

```sql
-- Check current user
SELECT USER();

-- Show databases
SHOW DATABASES;

-- Create new database
CREATE DATABASE myapp;

-- Use database
USE myapp;

-- Create new user
CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON myapp.* TO 'myuser'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Verify user
SELECT user, host FROM mysql.user;
```bash

---

## 🎯 Basic Usage

### Database Operations

```sql
-- Create database
CREATE DATABASE shop;

-- List all databases
SHOW DATABASES;

-- Select database
USE shop;

-- Delete database
DROP DATABASE shop;

-- Get current database
SELECT DATABASE();
```bash

### Table Operations

```sql
-- Create table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Show tables
SHOW TABLES;

-- Describe table structure
DESCRIBE products;
-- or
SHOW COLUMNS FROM products;

-- Show create table statement
SHOW CREATE TABLE products;

-- Alter table
ALTER TABLE products ADD COLUMN category VARCHAR(50);
ALTER TABLE products MODIFY COLUMN name VARCHAR(150);
ALTER TABLE products DROP COLUMN category;

-- Rename table
RENAME TABLE products TO items;

-- Drop table
DROP TABLE products;

-- Truncate table (delete all data)
TRUNCATE TABLE products;
```bash

### CRUD Operations

#### INSERT

```sql
-- Insert single row
INSERT INTO products (name, price, stock) 
VALUES ('Laptop', 999.99, 10);

-- Insert multiple rows
INSERT INTO products (name, price, stock) VALUES
    ('Mouse', 29.99, 50),
    ('Keyboard', 79.99, 30),
    ('Monitor', 299.99, 15);

-- Insert with all columns
INSERT INTO products VALUES 
    (NULL, 'Headphones', 149.99, 25, NOW());
```bash

#### SELECT

```sql
-- Select all
SELECT * FROM products;

-- Select specific columns
SELECT name, price FROM products;

-- With WHERE clause
SELECT * FROM products WHERE price > 100;

-- With multiple conditions
SELECT * FROM products 
WHERE price > 50 AND stock < 20;

-- With ORDER BY
SELECT * FROM products ORDER BY price DESC;

-- With LIMIT
SELECT * FROM products LIMIT 5;

-- With OFFSET
SELECT * FROM products LIMIT 5 OFFSET 10;

-- With LIKE (pattern matching)
SELECT * FROM products WHERE name LIKE '%phone%';

-- With IN
SELECT * FROM products WHERE id IN (1, 3, 5);

-- With BETWEEN
SELECT * FROM products WHERE price BETWEEN 50 AND 200;
```bash

#### UPDATE

```sql
-- Update single row
UPDATE products SET price = 899.99 WHERE id = 1;

-- Update multiple columns
UPDATE products 
SET price = 899.99, stock = 15 
WHERE id = 1;

-- Update with calculation
UPDATE products SET price = price * 1.1 WHERE category = 'Electronics';

-- Update all rows (careful!)
UPDATE products SET stock = stock + 10;
```bash

#### DELETE

```sql
-- Delete specific row
DELETE FROM products WHERE id = 1;

-- Delete with condition
DELETE FROM products WHERE stock = 0;

-- Delete all rows (careful!)
DELETE FROM products;
```bash

### Joins

```sql
-- Create related tables
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- INNER JOIN
SELECT products.name, products.price, categories.name AS category
FROM products
INNER JOIN categories ON products.category_id = categories.id;

-- LEFT JOIN
SELECT products.name, categories.name AS category
FROM products
LEFT JOIN categories ON products.category_id = categories.id;

-- RIGHT JOIN
SELECT products.name, categories.name AS category
FROM products
RIGHT JOIN categories ON products.category_id = categories.id;

-- Multiple joins
SELECT o.id, c.name AS customer, p.name AS product
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id;
```bash

### Aggregate Functions

```sql
-- COUNT
SELECT COUNT(*) FROM products;
SELECT COUNT(*) AS total_products FROM products;

-- SUM
SELECT SUM(price) AS total_value FROM products;

-- AVG
SELECT AVG(price) AS average_price FROM products;

-- MAX and MIN
SELECT MAX(price) AS highest_price FROM products;
SELECT MIN(price) AS lowest_price FROM products;

-- GROUP BY
SELECT category_id, COUNT(*) AS product_count
FROM products
GROUP BY category_id;

-- GROUP BY with HAVING
SELECT category_id, AVG(price) AS avg_price
FROM products
GROUP BY category_id
HAVING avg_price > 100;
```bash

### Subqueries

```sql
-- Subquery in WHERE
SELECT name FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Subquery with IN
SELECT name FROM products
WHERE category_id IN (
    SELECT id FROM categories WHERE name LIKE 'Elect%'
);

-- Subquery in FROM
SELECT AVG(price) FROM (
    SELECT price FROM products WHERE stock > 0
) AS available_products;
```bash

---

## 🛠️ Useful Commands

### User Management

```sql
-- Create user
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

-- Create user for remote access
CREATE USER 'username'@'%' IDENTIFIED BY 'password';

-- Grant all privileges
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';

-- Grant specific privileges
GRANT SELECT, INSERT, UPDATE ON database_name.* TO 'username'@'localhost';

-- Show grants
SHOW GRANTS FOR 'username'@'localhost';

-- Revoke privileges
REVOKE ALL PRIVILEGES ON database_name.* FROM 'username'@'localhost';

-- Change password
ALTER USER 'username'@'localhost' IDENTIFIED BY 'new_password';

-- Drop user
DROP USER 'username'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;
```bash

### Database Information

```sql
-- Show all databases
SHOW DATABASES;

-- Show tables in current database
SHOW TABLES;

-- Show table structure
DESCRIBE table_name;

-- Show indexes
SHOW INDEX FROM table_name;

-- Show table status
SHOW TABLE STATUS;

-- Show create table
SHOW CREATE TABLE table_name;

-- Show server status
SHOW STATUS;

-- Show variables
SHOW VARIABLES;

-- Show process list
SHOW PROCESSLIST;
```bash

### Backup and Restore

#### Backup

```bash
# Backup single database
mysqldump -u root -p database_name > backup.sql

# Backup all databases
mysqldump -u root -p --all-databases > all_databases.sql

# Backup specific tables
mysqldump -u root -p database_name table1 table2 > tables_backup.sql

# Backup with compression
mysqldump -u root -p database_name | gzip > backup.sql.gz
```bash

#### Restore

```bash
# Restore database
mysql -u root -p database_name < backup.sql

# Restore from compressed backup
gunzip < backup.sql.gz | mysql -u root -p database_name

# Restore all databases
mysql -u root -p < all_databases.sql
```bash

---

## 🔧 Configuration

### Configuration File Location

- **Windows**: `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`
- **macOS (Homebrew)**: `/usr/local/etc/my.cnf`
- **Linux**: `/etc/mysql/my.cnf` or `/etc/my.cnf`

### Important Settings

```ini
[mysqld]
# Port
port = 3306

# Data directory
datadir = /var/lib/mysql

# Maximum connections
max_connections = 151

# Buffer pool size (adjust based on RAM)
innodb_buffer_pool_size = 1G

# Log files
log_error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log

# Character set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
```bash

### Restart MySQL

```bash
# Linux (systemd)
sudo systemctl restart mysql

# macOS (Homebrew)
brew services restart mysql

# Windows
net stop MySQL80
net start MySQL80
```bash

---

## 📊 MySQL Workbench

### Installation

```bash
# Windows: Download from mysql.com
# macOS
brew install --cask mysqlworkbench

# Ubuntu/Debian
sudo apt install mysql-workbench
```bash

### Features

- Visual database design
- SQL editor with syntax highlighting
- Database administration
- Performance dashboard
- Data modeling
- Import/export data

---

## 🐛 Troubleshooting

### Can't Connect

```bash
# Check if MySQL is running
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS

# Check port
netstat -an | grep 3306

# Reset root password
# Stop MySQL, start with skip-grant-tables, change password
```bash

### Access Denied

```sql
-- Check user exists
SELECT user, host FROM mysql.user;

-- Grant proper privileges
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```bash

### Performance Issues

```sql
-- Check slow queries
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';

-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Check current queries
SHOW PROCESSLIST;

-- Kill slow query
KILL process_id;
```bash

---

## 📚 Next Steps

1. Complete the practice questions in `/SQL/questions/`
2. Learn about indexes and optimization
3. Study transactions and locking
4. Explore stored procedures and triggers
5. Practice with real projects

---

**MySQL is ready! Start building!** 🚀

[← Back to MySQL Introduction](Introduction.md) | [View SQL Questions →](../questions/)
