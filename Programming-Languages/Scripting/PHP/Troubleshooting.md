# 🛠️ Troubleshooting

| Issue                          | Solution                                                         |
| ------------------------------ | ---------------------------------------------------------------- |
| `php` not found                | Check PATH environment variable                                  |
| `php.ini` changes not applying | Ensure correct `php.ini` is being used; restart your web server  |
| Extension missing errors       | Install via package manager or enable in `php.ini`               |
| Port in use (built-in server)  | Change port: `php -S localhost:8081`                             |
| PHP not processing in browser  | Ensure Apache/Nginx is configured to use PHP module or `php-fpm` |

# 📚 Additional Resources

PHP Manual: https://www.php.net/manual/en/

Composer: https://getcomposer.org/

PHP Coding Standards: https://www.php-fig.org/psr/