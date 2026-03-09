# TOML

## Introduction

## What is TOML?

**TOML** (Tom’s Obvious, Minimal Language) is a configuration file format designed to be easy to read and write. You often see it in Python packaging (`pyproject.toml`) and tooling configs.

## Why TOML?

- Clear syntax for config
- Strong support for nested tables
- Great for tooling and metadata

## Learning Path

1. Learn keys/values and basic types.
2. Learn arrays.
3. Learn tables and nested tables.
4. Read a real-world example like `pyproject.toml`.

---

## User Guide

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

