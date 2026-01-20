# GitHub Actions

## Introduction

GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline. You can create workflows that build and test every pull request to your repository, or deploy bridged pull requests to production.

## Core Concepts

Understanding the vocabulary is the first step:

1.  **Workflow**: A configurable automated process that will run one or more jobs. Workflows are defined by a YAML file checked in to your repository.
2.  **Event**: A specific activity in a repository that triggers a workflow run (e.g., `push`, `pull_request`, `schedule`).
3.  **Job**: A set of steps in a workflow that execute on the same runner. Jobs run in parallel by default but can be configured to run sequentially.
4.  **Step**: An individual task that can run commands or actions. Steps share data with each other since they run on the same runner.
5.  **Action**: A custom application for the GitHub Actions platform that performs a complex but frequently repeated task.
6.  **Runner**: A server that runs your workflows when they're triggered. GitHub provides hosted runners (Ubuntu, Windows, macOS), or you can host your own.

## Workflow Syntax (`.yaml`)

Workflows are stored in the `.github/workflows/` directory.

```yaml
name: CI/CD Pipeline                 # 1. Name of the workflow
on: [push, pull_request]             # 2. Events that trigger it

jobs:
  build-and-test:                    # 3. Name of the job
    runs-on: ubuntu-latest           # 4. Storage environment (Runner)
    
    steps:
      - name: Checkout code          # 5. Access the repo code
        uses: actions/checkout@v4
      
      - name: Setup Node.js          # 6. Use a pre-built Action
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies   # 7. Run a shell command
        run: npm ci
        
      - name: Run tests
        run: npm test
```

## Detailed Guides

### 1. Setting up Continuous Integration (CI)

CI ensures that your code is healthy. Typically involves linting, compiling, and testing.

**Key features to use:**
*   **Matrix Strategies**: Test across multiple OS versions or Language versions simultaneously.
    ```yaml
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
    ```
*   **Caching**: Speed up workflows by caching dependencies (e.g., `node_modules`).
    ```yaml
    - uses: actions/cache@v3
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    ```

### 2. Setting up Continuous Deployment (CD)

CD automatically deploys your code after these tests pass.

**Key features to use:**
*   **Environments**: Define environments (prod, staging) to require approval before deployment.
*   **Secrets**: Store sensitive API Keys or SSH keys in Settings > Secrets and reference them via `${{ secrets.MY_KEY }}`.
*   **Conditionals**: Only deploy when pushing to specific branches.
    ```yaml
    if: github.ref == 'refs/heads/main'
    ```

### 3. Automating Tasks

Actions aren't just for code. They can manage the repository.
*   **Staling Issues**: Close issues that haven't been active.
*   **Labeler**: Automatically label PRs based on changed files.
*   **Welcome Bot**: Comment on new issues/PRs.

## Advanced Features

### Reusable Workflows
You can reference a workflow from another workflow to avoid code duplication.
```yaml
jobs:
  call-workflow:
    uses: octo-org/this-repo/.github/workflows/workflow-1.yml@main
```

### Composite Actions
If you find yourself copying the same 5 steps into every workflow, create a local composite action to bundle them into one step.

## Best Practices

1.  **Pin Actions to a Commit SHA**: Instead of `uses: actions/checkout@v3` (which can change), use `uses: actions/checkout@a123b...` for maximum security.
2.  **Least Privilege**: Configure permissions for the `GITHUB_TOKEN` to limit what the workflow can do.
    ```yaml
    permissions:
      contents: read
    ```
3.  **Timeout-minutes**: Always set a timeout to prevent stuck jobs from eating up your free minutes.
    ```yaml
    timeout-minutes: 10
    ```

## Resources

- [Official Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Awesome Actions List](https://github.com/sdras/awesome-actions)
