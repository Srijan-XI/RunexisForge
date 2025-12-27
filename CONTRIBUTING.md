# Contributing to Runexis Forge

Thank you for considering contributing to Runexis Forge! 🎉

## Table of Contents

- [Contributing to Runexis Forge](#contributing-to-runexis-forge)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [How Can I Contribute?](#how-can-i-contribute)
  - [Getting Started](#getting-started)
  - [Contribution Guidelines](#contribution-guidelines)
    - [Adding a New Language](#adding-a-new-language)
    - [Adding Practice Questions](#adding-practice-questions)
    - [Improving Documentation](#improving-documentation)
  - [Pull Request Process](#pull-request-process)
  - [Issue Reporting Guidelines](#issue-reporting-guidelines)
    - [Before Creating an Issue](#before-creating-an-issue)
    - [Creating a Good Issue](#creating-a-good-issue)
    - [Issue Template Example](#issue-template-example)
  - [Coding Standards](#coding-standards)
    - [General Guidelines](#general-guidelines)
    - [Language-Specific Standards](#language-specific-standards)
    - [Documentation Standards](#documentation-standards)
  - [Questions?](#questions)
  - [Thank You!](#thank-you)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please be considerate and constructive in your communications.

## How Can I Contribute?

There are many ways to contribute to this project:

- **Add new programming languages** with installation guides and practice questions
- **Improve existing guides** by fixing errors or adding more detailed explanations
- **Add more practice questions** for existing languages
- **Fix bugs** in code examples
- **Improve documentation** and make it more beginner-friendly
- **Report issues** when you find problems
- **Suggest enhancements** for better learning experience

## Getting Started

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/Srijan-XI/Install-and-Learn-DevLangs.git
   ```
3. **Create a new branch** for your contribution:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** following the guidelines below
5. **Test your changes** to ensure everything works correctly
6. **Commit your changes** with clear commit messages
7. **Push to your fork** and submit a pull request

### Run checks locally (recommended)

This repository uses automated checks in CI to keep documentation consistent. You can run the same checks locally before opening a PR.

1. Install `pre-commit`
   - Python: `pip install pre-commit`
2. Install git hooks (one-time)
   - `pre-commit install`
3. Run all checks
   - `pre-commit run --all-files`

CI also runs:
- Markdown linting via `.markdownlint.json`
- Link checking via `.lychee.toml`
- Spellchecking via `codespell` (project words in `.codespell-ignore-words.txt`)

## Contribution Guidelines

### Adding a New Language

When adding a new programming language, please include:

1. **Installation Guide** (`Installation-and-Usage-Guide.md` or similar)
   - Installation instructions for Windows, macOS, and Linux
   - Version recommendations
   - Environment setup
   - Basic usage examples

2. **Practice Questions Folder**
   - Create a folder for questions (e.g., `Questions/` or `language_questions/`)
   - Add at least 10 practice questions ranging from beginner to advanced
   - Name files descriptively (e.g., `Q1_Beginner_HelloWorld.ext`)

3. **Follow existing structure** - Look at existing language folders for reference

### Adding Practice Questions

- **File naming convention**: Use clear, descriptive names
  - Format: `Q##_Level_Description.ext`
  - Example: `Q5_Intermediate_PalindromeCheck.py`
  
- **Include comments**: Add helpful comments explaining the code
- **Add difficulty level**: Indicate if it's Beginner, Intermediate, or Advanced
- **Test your code**: Ensure all code examples run without errors
- **Include problem statement**: Add a comment at the top describing what the code does

### Improving Documentation

- Use clear, concise language
- Include code examples where helpful
- Keep formatting consistent with existing documents
- Add screenshots if they aid understanding
- Ensure all links work correctly

## Pull Request Process

1. **Ensure your PR addresses a specific issue** or improvement
   - Reference the issue number in your PR description (e.g., "Fixes #123")

2. **Provide a clear PR title and description**
   - Title format: `[Language] Brief description` or `[Docs] Brief description`
   - Example: `[Python] Add list comprehension examples`
   - Describe what changes you made and why

3. **Make sure your code follows the project standards**
   - Check that all code examples run correctly
   - Ensure documentation is properly formatted
   - Remove any unnecessary files or changes

4. **Update relevant documentation**
   - If you add new features, update the README or guides accordingly

5. **Keep PRs focused**
   - One PR should address one issue or add one feature
   - Avoid combining multiple unrelated changes

6. **Respond to feedback**
   - Be open to suggestions and constructive criticism
   - Make requested changes promptly

7. **Wait for review**
   - A maintainer will review your PR
   - Once approved, your PR will be merged

## Issue Reporting Guidelines

### Before Creating an Issue

- **Search existing issues** to avoid duplicates
- **Check if the problem still exists** in the latest version

### Creating a Good Issue

When creating an issue, please include:

1. **Clear, descriptive title**
   - Good: "Python factorial.py throws error on negative input"
   - Bad: "Code doesn't work"

2. **Issue type label** (if possible)
   - Bug report
   - Feature request
   - Documentation improvement
   - Question

3. **Detailed description**
   
   **For bugs:**
   - Description of the problem
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Your environment (OS, language version, etc.)
   - Error messages or screenshots
   
   **For feature requests:**
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation suggestions
   
   **For documentation:**
   - What's unclear or missing
   - Suggested improvements
   - Which file/section needs updating

4. **Code examples** (if applicable)
   ```
   Provide minimal code that demonstrates the issue
   ```

### Issue Template Example

```markdown
**Issue Type:** Bug Report / Feature Request / Documentation

**Description:**
[Clear description of the issue or request]

**Steps to Reproduce:** (for bugs)
1. Go to...
2. Run...
3. See error...

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Environment:**
- OS: [e.g., Windows 11]
- Language/Version: [e.g., Python 3.11]
- Any other relevant info

**Additional Context:**
[Any other information, screenshots, etc.]
```

## Coding Standards

### General Guidelines

- **Use clear variable names** that describe their purpose
- **Add comments** to explain complex logic
- **Follow language conventions** (PEP 8 for Python, etc.)
- **Keep code simple** and beginner-friendly
- **Include error handling** where appropriate

### Language-Specific Standards

- **Python**: Follow PEP 8 style guide
- **Java**: Use camelCase, proper indentation
- **C/C++**: Clear formatting, avoid memory leaks
- **PHP**: Follow PSR standards
- **R**: Use descriptive variable names
- **Rust**: Follow Rust style guidelines

### Documentation Standards

- Use Markdown formatting
- Include code blocks with syntax highlighting
- Add table of contents for longer documents
- Use headers hierarchically (H1, H2, H3)
- Keep line length reasonable (80-100 characters when possible)

## Questions?

If you have any questions about contributing, feel free to:
- Open an issue with the "question" label
- Check existing documentation in the README
- Look at merged PRs for examples

## Thank You!

Your contributions help make programming more accessible to everyone. We appreciate your time and effort in improving this project!

---

**Happy Contributing! 🚀**
