# YAML User Guide

## Basic Syntax

### Mappings

```yaml
name: DevSphere
active: true
count: 3
```bash

### Lists

```yaml
items:
  - one
  - two
```bash

### Nested structures

```yaml
app:
  name: demo
  ports:
    - 8080
    - 9090
```bash

## Multiline strings

```yaml
message: |
  Hello
  from YAML
```bash

## Common pitfalls

- Tabs break YAML (use spaces)
- Wrong indentation level changes structure
- `yes/no` can be parsed as booleans in some parsers; quote if needed

## Validate YAML

- Online validators
- CLI tools (depending on your stack)

See `YAML/examples/example.yaml` for a more complete sample.
