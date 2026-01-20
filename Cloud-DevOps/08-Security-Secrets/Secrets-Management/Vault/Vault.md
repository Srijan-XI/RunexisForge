# Vault

## Introduction

HashiCorp Vault is an identity-based secrets and encryption management system. A secret is anything that you want to tightly control access to, such as API keys, passwords, or certificates. Vault provides a unified interface to any secret, while providing tight access control and recording a detailed audit log.

## Key Features
*   **Secret Storage**: Arbitrary key/value secrets.
*   **Dynamic Secrets**: Generate credentials on the fly (e.g., AWS keys, SQL passwords) that expire automatically.
*   **Data Encryption**: Encrypt/Decrypt data without storing it (Encryption as a Service).
*   **Leasing and Renewal**: Usage limits on credentials.

## Installation

*   **Windows**: `winget install HashiCorp.Vault`
*   **macOS**: `brew install vault`
*   **Linux**: `sudo apt install vault`

## Usage (Dev Server)

For learning, start a dev server (Do not use in prod):
```bash
vault server -dev
```
Set the address:
```bash
export VAULT_ADDR='http://127.0.0.1:8200'
```

### Basic Commands

1.  **Write a Secret**:
    ```bash
    vault kv put secret/hello foo=world
    ```
2.  **Read a Secret**:
    ```bash
    vault kv get secret/hello
    ```
3.  **Delete a Secret**:
    ```bash
    vault kv delete secret/hello
    ```

## Real World Use Case
**Avoiding Hardcoded Credentials**: Instead of putting DB passwords in `config.js` or environment variables (which can leak), your application authenticates with Vault and requests a database credential. Vault creates a temporary Username/Password on the database, gives it to the app, and revokes it after 1 hour.
