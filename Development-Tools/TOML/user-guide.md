# TOML User Guide

## Basic types

```toml
title = "DevSphere"
version = 1
active = true
```

## Arrays

```toml
ports = [3000, 8080]
```

## Tables

```toml
[database]
host = "localhost"
port = 5432
```

## Nested tables

```toml
[app]
name = "demo"

[app.logging]
level = "info"
```

See `TOML/examples/example.toml` for a full sample.
