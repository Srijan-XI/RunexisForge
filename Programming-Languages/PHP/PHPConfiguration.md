# ⚙️ PHP Configuration (php.ini)
Located at:
```
Windows: C:\php\php.ini

Linux: /etc/php/8.x/cli/php.ini

macOS: /opt/homebrew/etc/php/8.x/php.ini
```
### Common settings to update:
```
error_reporting = E_ALL
display_errors = On
memory_limit = 512M
upload_max_filesize = 20M
date.timezone = "Asia/Kolkata"
```
Restart server after changes:

```
sudo systemctl restart apache2 # or nginx/php-fpm
```
### 📁 Running PHP Scripts
Create a file `index.php`:
```
<?php
echo "Hello, PHP!";
?>
```
### Run via built-in server:
```
php -S localhost:8000
```
Navigate to `http://localhost:8000/index.php`

### 🔌 Installing PHP Extensions
```
Linux:

sudo apt install php-<extension>
```
```
macOS:

brew install php-<extension>
```

### Windows:
Enable in `php.ini` by uncommenting:
```
extension=gd
extension=curl
Restart server to apply changes.
```

### ✅ Best Practices
- Keep PHP updated to the latest stable version.

- Use a version manager like `phpenv` (Linux/macOS) for multiple versions.

- Use `composer` for dependency management:

```
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```
Avoid running PHP as root in production environments.