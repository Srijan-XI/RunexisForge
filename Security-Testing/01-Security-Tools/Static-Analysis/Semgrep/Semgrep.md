# Semgrep

## Introduction

Semgrep is a fast, lightweight static analysis tool that finds code issues (including security) using pattern-based rules. It supports many languages and CI use.

## Why Semgrep?

- Simple rule syntax, quick to write custom checks
- Great for security and correctness patterns
- Runs locally and in CI; supports autofix
- Large public rule registry (r2c/semgrep-rules)

## Key concepts

- **Rules**: pattern + message + severity (YAML)
- **Pattern operators**: metavariables, ellipses (`...`), `pattern-either`, `pattern-regex`
- **Targets**: code files; supports many languages

## Where to go next

- User guide: `Semgrep/user-guide.md`
- Examples: run in CI, write a custom rule

---

## User Guide

## Install

```bash
pip install semgrep
# or
brew install semgrep
```bash

## Run with the registry rules

```bash
semgrep --config p/ci  # recommended baseline
semgrep --config auto  # auto-selects based on languages detected
```bash

## Add to CI (GitHub Actions example)

```yaml
name: semgrep
on: [push, pull_request]
jobs:
  semgrep:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: returntocorp/semgrep-action@v1
        with:
          config: p/ci
```bash

## Write a custom rule (example: no eval in JS)

```yaml
rules:
- id: no-eval
  languages: [javascript, typescript]
  message: Avoid eval; use safer alternatives
  severity: ERROR
  patterns:
    - pattern: eval(...)
```bash

Run it:

```bash
semgrep --config ./rules.yml src/
```bash

## Tuning

- Use `--exclude` for generated code
- Use `--severity` to filter
- Autofix: add `fix:` in rules to propose changes

## References

- <https://semgrep.dev/>
- Rule examples: <https://semgrep.dev/explore>

