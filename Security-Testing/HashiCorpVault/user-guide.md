# HashiCorp Vault Usage Guide

## Run Dev Server (for learning)

```bash
vault server -dev -dev-root-token-id=root
export VAULT_ADDR=http://127.0.0.1:8200
vault login root
```bash

## KV Secrets Engine

```bash
vault secrets enable -path=secret kv
vault kv put secret/app api_key=12345
vault kv get secret/app
```bash

## Transit Encryption

```bash
vault secrets enable transit
vault write -f transit/keys/app
vault write transit/encrypt/app plaintext=$(base64 <<< "hello")
```bash

## Dynamic Secrets (PostgreSQL example)

- Enable database engine and configure connection

```bash
vault secrets enable database
vault write database/config/pg \
  plugin_name=postgresql-database-plugin \
  allowed_roles="app" \
  connection_url="postgresql://{{username}}:{{password}}@db:5432/postgres?sslmode=disable" \
  username="vault" password="vaultpass"

vault write database/roles/app \
  db_name=pg \
  creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; GRANT SELECT ON ALL TABLES IN SCHEMA public TO \"{{name}}\";" \
  default_ttl=1h max_ttl=24h
```bash

- Generate credentials: `vault read database/creds/app`

## Auth Methods

- Token (default), AppRole, GitHub, OIDC, Kubernetes
- Example: `vault auth enable approle`

## Policies

- Write HCL policies and attach to tokens/roles

## Production Notes

- Run Vault in HA with integrated storage or Consul
- Use TLS everywhere; manage unseal keys securely (Shamir)
