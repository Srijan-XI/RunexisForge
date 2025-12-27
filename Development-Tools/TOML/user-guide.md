# TOML User Guide

## Basic types

```toml
title = "DevSphere"
version = 1
active = true
```bash

## Arrays

```toml
ports = [3000, 8080]
```bash

## Tables

```toml
[database]
host = "localhost"
port = 5432
```bash

## Nested tables

```toml
[app]
name = "demo"

[app.logging]
level = "info"
```bash

See `TOML/examples/example.toml` for a full sample.
