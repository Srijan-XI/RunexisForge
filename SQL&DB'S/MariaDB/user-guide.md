# MariaDB Usage Guide

## Install (Linux)

```bash
sudo apt update && sudo apt install mariadb-server
sudo systemctl enable --now mariadb
```bash

Secure install:

```bash
sudo mariadb-secure-installation
```bash

## CLI Basics

```bash
mariadb -u root -p
CREATE DATABASE appdb;
CREATE USER 'app'@'%' IDENTIFIED BY 'secret';
GRANT ALL ON appdb.* TO 'app'@'%';
FLUSH PRIVILEGES;
```bash

## Import/Export

```bash
mysqldump -u user -p appdb > backup.sql
mariadb -u user -p appdb < backup.sql
```bash

## Configuration

- Config file: `/etc/mysql/mariadb.conf.d/50-server.cnf`
- Key tunables: `innodb_buffer_pool_size`, `max_connections`, `log_bin`

## Replication (basic)

- Enable binary logging on primary
- Configure server IDs
- Use `CHANGE MASTER TO` on replica and `START SLAVE;` (or `START REPLICA;`)

## Monitoring

- `SHOW GLOBAL STATUS;`
- `information_schema` and `performance_schema`
