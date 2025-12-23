# SQLite Usage Guide

## Create and Query
```bash
sqlite3 app.db
sqlite> CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT);
sqlite> INSERT INTO users(name) VALUES ('Ada');
sqlite> SELECT * FROM users;
```
Exit with `.quit`.

## CLI Commands
- `.tables` list tables
- `.schema <table>` show schema
- `.mode box` pretty output
- `.import file.csv table` load CSV

## Backups
```bash
sqlite3 app.db ".backup 'backup.db'"
```

## Using in Code (Python example)
```python
import sqlite3
conn = sqlite3.connect('app.db')
cur = conn.cursor()
cur.execute('SELECT 1')
conn.commit()
conn.close()
```

## Tips
- Keep DB on reliable storage; single-writer, multi-reader concurrency
- Use WAL mode for better concurrent reads: `PRAGMA journal_mode=WAL;`
- Vacuum occasionally: `VACUUM;`
