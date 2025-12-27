# IBM Db2 Usage Guide

## Install (Community Edition, Linux)

- Download installer from IBM
- Run `./db2setup` and follow prompts
- Create instance: `sudo /opt/ibm/db2/V11.5/instance/db2icrt db2inst1`
- Start: `sudo -u db2inst1 db2start`

## Command Line

```bash
sudo -u db2inst1 db2
=> CREATE DATABASE sample;
=> CONNECT TO sample;
=> CREATE TABLE users(id INT PRIMARY KEY, name VARCHAR(50));
=> INSERT INTO users VALUES (1, 'Ada');
=> SELECT * FROM users;
```sql

## Backup/Restore

```bash
sudo -u db2inst1 db2 "BACKUP DATABASE sample TO /backups"
sudo -u db2inst1 db2 "RESTORE DATABASE sample FROM /backups" 
```sql

## Configuration

- Database config: `db2 get db cfg for sample`
- Instance config: `db2 get dbm cfg`

## High Availability

- Use HADR for primary/standby
- Configure log shipping and `HADR_SYNCMODE`

## Monitoring

- `LIST APPLICATIONS`, `LIST TABLESPACES`
- Use `MON_GET_*` views for metrics
