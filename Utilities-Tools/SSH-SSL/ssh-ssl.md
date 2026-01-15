# SSH & SSL - Secure Communication

## Table of Contents
- [Introduction](#introduction)
- [SSH (Secure Shell)](#ssh-secure-shell)
  - [Generatings Keys](#generating-keys)
  - [Config File](#config-file)
  - [Port Forwarding](#port-forwarding)
- [SSL / TLS Certificates](#ssl--tls-certificates)
  - [Concepts (CA, CSR, CRT)](#concepts)
  - [Self-Signed Certs](#self-signed-certs)
  - [Let's Encrypt (Certbot)](#lets-encrypt)
  - [OpenSSL Cheatsheet](#openssl-cheatsheet)
- [Resources](#resources)

---

## Introduction

**SSH** is the standard for accessing remote servers securely. **SSL/TLS** is the standard for securing web traffic (HTTPS). Mastering these is essential for DevOps and backend development.

---

## SSH (Secure Shell)

### Generating Keys
Never use passwords for server access. Use SSH keys.

```bash
# Generate Ed25519 key (modern, secure, fast)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Or RSA 4096 (legacy compatibility)
ssh-keygen -t rsa -b 4096
```

**Copy to Server**:
```bash
ssh-copy-id user@hostname
```

### Config File
Stop typing `ssh -i ~/.ssh/my_key user@very-long-hostname.com`. Use `~/.ssh/config`.

```ssh
Host myserver
    HostName api.production.com
    User deploy
    IdentityFile ~/.ssh/prod_key
    Port 2222
```

Now you just type: `ssh myserver`

### Port Forwarding
Access a database on a private server (port 5432) via a bastion host.

```bash
# Local Forwarding: Map localhost:9999 to db-server:5432
ssh -L 9999:db-server:5432 user@bastion-host
```

Now connect to `localhost:9999`.

---

## SSL / TLS Certificates

### Concepts
-   **Private Key (.key)**: Keep secret. Decrypts data.
-   **Public Key / Certificate (.crt / .pem)**: Public. Encrypts data.
-   **CSR (Certificate Signing Request)**: Sent to a CA to get a certificate.
-   **CA (Certificate Authority)**: Trusted entity (like DigiCert, Let's Encrypt) that signs certificates.

### Self-Signed Certs
For local development only (browser will warn you).

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

### Let's Encrypt (Certbot)
Free, automated SSL for production.

```bash
# Install
sudo apt install certbot python3-certbot-nginx

# Run (auto-configures Nginx)
sudo certbot --nginx
```

### OpenSSL Cheatsheet

**Check certificate details**:
```bash
openssl x509 -in certificate.crt -text -noout
```

**Convert DER (binary) to PEM (base64)**:
```bash
openssl x509 -inform der -in certificate.cer -out certificate.pem
```

**Generate CSR**:
```bash
openssl req -new -key private.key -out request.csr
```

---

## Resources

-   [OpenSSL Cookbook](https://www.feistyduck.com/books/openssl-cookbook/)
-   [Let's Encrypt](https://letsencrypt.org/)
-   [SSH Config Man Page](https://linux.die.net/man/5/ssh_config)
