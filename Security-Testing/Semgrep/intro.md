# Semgrep — Introduction

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
