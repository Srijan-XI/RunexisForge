# MariaDB

## Introduction

MariaDB is an open-source relational database system, forked from MySQL, emphasizing performance, openness, and new storage engines.

### Key Features

- MySQL-compatible protocols and tooling
- Pluggable storage engines (InnoDB, Aria, ColumnStore)
- Galera Cluster for synchronous replication
- Strong JSON functions and window functions

### Resources

- Docs: <https://mariadb.com/kb/en/>
- Downloads: <https://mariadb.org/download/>

---

## User Guide

### Install (Linux)

```bash
sudo apt update && sudo apt install mariadb-server
sudo systemctl enable --now mariadb
```

Secure install:

```bash
sudo mariadb-secure-installation
```

### CLI Basics

```bash
mariadb -u root -p
CREATE DATABASE appdb;
CREATE USER 'app'@'%' IDENTIFIED BY 'secret';
GRANT ALL ON appdb.* TO 'app'@'%';
FLUSH PRIVILEGES;
```

### Import/Export

```bash
mysqldump -u user -p appdb > backup.sql
mariadb -u user -p appdb < backup.sql
```

### Configuration

- Config file: `/etc/mysql/mariadb.conf.d/50-server.cnf`
- Key tunables: `innodb_buffer_pool_size`, `max_connections`, `log_bin`

### Replication (basic)

- Enable binary logging on primary
- Configure server IDs
- Use `CHANGE MASTER TO` on replica and `START SLAVE;` (or `START REPLICA;`)

### Monitoring

- `SHOW GLOBAL STATUS;`
- `information_schema` and `performance_schema`
