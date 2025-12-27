# PostgreSQL Installation and Usage Guide

## 💻 Installation

### Windows

**Method 1: Official Installer (Recommended)**

1. Download from <https://www.postgresql.org/download/windows/>
2. Run the installer (postgresql-xx.x-x-windows-x64.exe)
3. Follow wizard (note password for postgres user!)
4. Install pgAdmin 4 (included)
5. Verify: `psql --version`

**Method 2: Chocolatey**

```powershell
choco install postgresql
```bash

### macOS

**Homebrew (Recommended)**

```bash
# Install
brew install postgresql@16

# Start service
brew services start postgresql@16

# Verify
psql --version
```bash

### Linux

**Ubuntu/Debian**

```bash
# Add repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -qO- https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo tee /etc/apt/trusted.gpg.d/pgdg.asc &>/dev/null

# Install
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start
sudo systemctl start postgresql
sudo systemctl enable postgresql
```bash

**Fedora/RHEL**

```bash
sudo dnf install postgresql-server postgresql-contrib
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```bash

### Docker

```bash
docker run --name postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -p 5432:5432 \
  -d postgres:16
```bash

---

## ⚙️ Initial Setup

### Connect to PostgreSQL

```bash
# Connect as postgres user
sudo -u postgres psql

# Connect to specific database
psql -U username -d database_name

# Connect to remote server
psql -h hostname -U username -d database_name
```bash

### First Time Configuration

```sql
-- Create new database
CREATE DATABASE myapp;

-- Create new user
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE myapp TO myuser;

-- Connect to database
\c myapp

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO myuser;

-- List databases
\l

-- List users
\du
```bash

---

## 🎯 Basic Usage

### psql Commands

```sql
-- Connect to database
\c database_name

-- List databases
\l

-- List tables
\dt

-- Describe table
\d table_name

-- List users
\du

-- Execute SQL file
\i /path/to/file.sql

-- Show query execution time
\timing on

-- Quit
\q
```bash

### Database Operations

```sql
-- Create database
CREATE DATABASE shop;

-- Drop database
DROP DATABASE shop;

-- Rename database
ALTER DATABASE shop RENAME TO store;
```bash

### Table Operations

```sql
-- Create table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table with constraints
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER CHECK (quantity > 0),
    order_date TIMESTAMP DEFAULT NOW()
);

-- Add column
ALTER TABLE products ADD COLUMN category VARCHAR(50);

-- Drop column
ALTER TABLE products DROP COLUMN category;

-- Modify column
ALTER TABLE products ALTER COLUMN name TYPE VARCHAR(150);

-- Add constraint
ALTER TABLE products ADD CONSTRAINT unique_name UNIQUE (name);

-- Drop table
DROP TABLE products;
```bash

### CRUD Operations

```sql
-- INSERT
INSERT INTO products (name, price, stock) 
VALUES ('Laptop', 999.99, 10);

-- INSERT multiple
INSERT INTO products (name, price, stock) VALUES
    ('Mouse', 29.99, 50),
    ('Keyboard', 79.99, 30)
RETURNING *;

-- SELECT
SELECT * FROM products;
SELECT * FROM products WHERE price > 100 ORDER BY price DESC;

-- UPDATE
UPDATE products SET price = 899.99 WHERE id = 1 RETURNING *;

-- DELETE
DELETE FROM products WHERE id = 1 RETURNING *;
```bash

### Advanced Queries

```sql
-- Window functions
SELECT name, price,
       AVG(price) OVER () AS avg_price,
       RANK() OVER (ORDER BY price DESC) AS price_rank
FROM products;

-- CTE (Common Table Expression)
WITH expensive_products AS (
    SELECT * FROM products WHERE price > 500
)
SELECT * FROM expensive_products ORDER BY price;

-- Recursive CTE
WITH RECURSIVE numbers AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM numbers WHERE n < 10
)
SELECT * FROM numbers;

-- JSON operations
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    data JSONB
);

INSERT INTO users (data) VALUES 
    ('{"name": "John", "age": 30, "city": "NYC"}');

SELECT data->>'name' AS name, 
       data->>'age' AS age 
FROM users;

-- Array operations
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag_list TEXT[]
);

INSERT INTO tags (tag_list) VALUES (ARRAY['postgresql', 'database', 'sql']);
SELECT * FROM tags WHERE 'postgresql' = ANY(tag_list);
```bash

---

## 🛠️ User Management

```sql
-- Create user
CREATE USER myuser WITH PASSWORD 'password';

-- Create superuser
CREATE USER admin WITH SUPERUSER PASSWORD 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA public TO myuser;

-- Revoke privileges
REVOKE ALL ON DATABASE mydb FROM myuser;

-- Change password
ALTER USER myuser WITH PASSWORD 'newpassword';

-- Drop user
DROP USER myuser;

-- List users
\du
```bash

---

## 📊 Backup and Restore

### Backup

```bash
# Backup single database
pg_dump -U username database_name > backup.sql

# Backup with custom format (compressed)
pg_dump -U username -Fc database_name > backup.dump

# Backup all databases
pg_dumpall -U postgres > all_databases.sql

# Backup specific tables
pg_dump -U username -t table_name database_name > table_backup.sql
```bash

### Restore

```bash
# Restore SQL dump
psql -U username -d database_name < backup.sql

# Restore custom format
pg_restore -U username -d database_name backup.dump

# Restore all databases
psql -U postgres < all_databases.sql
```bash

---

## 🔧 Configuration

### postgresql.conf Location

- **Linux**: `/etc/postgresql/16/main/postgresql.conf`
- **macOS (Homebrew)**: `/usr/local/var/postgresql@16/postgresql.conf`
- **Windows**: `C:\Program Files\PostgreSQL\16\data\postgresql.conf`

### Important Settings

```ini
# Memory
shared_buffers = 256MB          # 25% of RAM
effective_cache_size = 1GB      # 50-75% of RAM
work_mem = 16MB

# Connections
max_connections = 100

# Logging
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_statement = 'all'

# Performance
random_page_cost = 1.1
effective_io_concurrency = 200
```bash

### Restart PostgreSQL

```bash
# Linux
sudo systemctl restart postgresql

# macOS
brew services restart postgresql@16

# Windows (as administrator)
net stop postgresql-x64-16
net start postgresql-x64-16
```bash

---

## 🐛 Troubleshooting

### Connection Issues

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # macOS

# Check port
sudo netstat -plnt | grep 5432

# Test connection
psql -U postgres -h localhost
```bash

### Permission Issues

```sql
-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
GRANT ALL ON ALL TABLES IN SCHEMA public TO myuser;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO myuser;
```bash

### Performance Analysis

```sql
-- Enable query timing
\timing

-- Explain query plan
EXPLAIN ANALYZE SELECT * FROM products WHERE price > 100;

-- Check slow queries
SELECT * FROM pg_stat_statements 
ORDER BY total_exec_time DESC 
LIMIT 10;
```bash

---

## 📚 Extensions

```sql
-- List available extensions
SELECT * FROM pg_available_extensions;

-- Install extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- List installed extensions
\dx
```bash

---

## 🎓 Next Steps

1. Learn advanced features (CTEs, window functions)
2. Explore JSON and array data types
3. Study PostGIS for geospatial data
4. Practice query optimization
5. Try the SQL questions in `/SQL/questions/`

---

**PostgreSQL is ready!** 🐘

[← Back to PostgreSQL Introduction](Introduction.md) | [View SQL Questions →](../questions/)
