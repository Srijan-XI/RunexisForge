# ⚙️ PHP Configuration (php.ini)

Located at:

```yaml
Windows: C:\php\php.ini

Linux: /etc/php/8.x/cli/php.ini

macOS: /opt/homebrew/etc/php/8.x/php.ini
```yaml

### Common settings to update

```yaml
error_reporting = E_ALL
display_errors = On
memory_limit = 512M
upload_max_filesize = 20M
date.timezone = "Asia/Kolkata"
```yaml

Restart server after changes:

```yaml
sudo systemctl restart apache2 # or nginx/php-fpm
```yaml

### 📁 Running PHP Scripts

Create a file `index.php`:

```bash
<?php
echo "Hello, PHP!";
?>
```bash

### Run via built-in server

```bash
php -S localhost:8000
```bash

Navigate to `http://localhost:8000/index.php`

### 🔌 Installing PHP Extensions

```bash
Linux:

sudo apt install php-<extension>
```bash

```bash
macOS:

brew install php-<extension>
```bash

### Windows

Enable in `php.ini` by uncommenting:

```bash
extension=gd
extension=curl
Restart server to apply changes.
```bash

### ✅ Best Practices

- Keep PHP updated to the latest stable version.

- Use a version manager like `phpenv` (Linux/macOS) for multiple versions.

- Use `composer` for dependency management:

```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```bash

Avoid running PHP as root in production environments.
