# Semgrep — User Guide

## Install
```bash
pip install semgrep
# or
brew install semgrep
```

## Run with the registry rules
```bash
semgrep --config p/ci  # recommended baseline
semgrep --config auto  # auto-selects based on languages detected
```

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
```

## Write a custom rule (example: no eval in JS)
```yaml
rules:
- id: no-eval
  languages: [javascript, typescript]
  message: Avoid eval; use safer alternatives
  severity: ERROR
  patterns:
    - pattern: eval(...)
```
Run it:
```bash
semgrep --config ./rules.yml src/
```

## Tuning
- Use `--exclude` for generated code
- Use `--severity` to filter
- Autofix: add `fix:` in rules to propose changes

## References
- https://semgrep.dev/
- Rule examples: https://semgrep.dev/explore
