# IBM Db2

## Introduction

IBM Db2 is an enterprise relational database offering high availability, scalability, and advanced SQL/analytics features across platforms.

### Key Features

- Row and column-organized tables
- PureScale clustering and HADR for availability
- Native JSON support and REST services
- BLU Acceleration for in-memory columnar processing

### Resources

- Docs: <https://www.ibm.com/docs/en/db2>
- Downloads (Community Edition): <https://www.ibm.com/products/db2/community-edition>

---

## User Guide

### Install (Community Edition, Linux)

- Download installer from IBM
- Run `./db2setup` and follow prompts
- Create instance: `sudo /opt/ibm/db2/V11.5/instance/db2icrt db2inst1`
- Start: `sudo -u db2inst1 db2start`

### Command Line

```bash
sudo -u db2inst1 db2
=> CREATE DATABASE sample;
=> CONNECT TO sample;
=> CREATE TABLE users(id INT PRIMARY KEY, name VARCHAR(50));
=> INSERT INTO users VALUES (1, 'Ada');
=> SELECT * FROM users;
```

### Backup/Restore

```bash
sudo -u db2inst1 db2 "BACKUP DATABASE sample TO /backups"
sudo -u db2inst1 db2 "RESTORE DATABASE sample FROM /backups"
```

### Configuration

- Database config: `db2 get db cfg for sample`
- Instance config: `db2 get dbm cfg`

### High Availability

- Use HADR for primary/standby
- Configure log shipping and `HADR_SYNCMODE`

### Monitoring

- `LIST APPLICATIONS`, `LIST TABLESPACES`
- Use `MON_GET_*` views for metrics
