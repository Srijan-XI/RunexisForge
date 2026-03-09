# WordPress

## Overview
WordPress is the world's most popular content management system (CMS), powering over 43% of all websites. Originally built as a blogging platform, it has evolved into a full-featured CMS capable of building any type of website from simple blogs to complex e-commerce stores and enterprise applications.

**Key Features:**
- Open-source and free
- Extensive plugin ecosystem (60,000+ plugins)
- Thousands of themes
- SEO-friendly
- Multi-user support
- Built-in blogging features
- Active community
- REST API for headless implementations

**Use Cases:**
- Blogs and news sites
- E-commerce stores (WooCommerce)
- Business websites
- Portfolios
- Membership sites
- Forums
- Online courses

## Installation

### Requirements
- PHP 7.4 or higher
- MySQL 5.7+ or MariaDB 10.3+
- Apache or Nginx web server
- HTTPS support (recommended)

### Local Development Setup

#### Using XAMPP (Windows/Mac/Linux)

```bash
# Download XAMPP from https://www.apachefriends.org/

# Start Apache and MySQL

# Download WordPress
cd C:\xampp\htdocs  # Windows
cd /Applications/XAMPP/htdocs  # Mac

# Extract WordPress
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
mv wordpress mysite

# Visit http://localhost/mysite
```

#### Using Local by Flywheel

```bash
# Download from https://localwp.com/
# GUI-based local WordPress development environment
# One-click setup with SSL and WP-CLI
```

#### Using Docker

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: mysql:8.0
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - ./wp-content:/var/www/html/wp-content

volumes:
  db_data:
```

```bash
docker-compose up -d
# Visit http://localhost:8000
```

### Production Installation

```bash
# 1. Download WordPress
cd /var/www/html
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
mv wordpress example.com

# 2. Create database
mysql -u root -p
CREATE DATABASE wordpress_db;
CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON wordpress_db.* TO 'wp_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 3. Configure wp-config.php
cd example.com
cp wp-config-sample.php wp-config.php
nano wp-config.php

# 4. Set permissions
chown -R www-data:www-data /var/www/html/example.com
find /var/www/html/example.com -type d -exec chmod 755 {} \;
find /var/www/html/example.com -type f -exec chmod 644 {} \;

# 5. Visit your domain and complete installation
```

## Configuration

### wp-config.php

```php
<?php
// Database settings
define('DB_NAME', 'database_name');
define('DB_USER', 'database_user');
define('DB_PASSWORD', 'password');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// Authentication unique keys and salts
// Generate from https://api.wordpress.org/secret-key/1.1/salt/
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

// Database table prefix
$table_prefix = 'wp_';

// Debugging (set to false in production)
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);

// Memory limits
define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '512M');

// Auto-updates
define('WP_AUTO_UPDATE_CORE', 'minor');

// Security
define('DISALLOW_FILE_EDIT', true);
define('FORCE_SSL_ADMIN', true);

// Performance
define('WP_CACHE', true);
define('COMPRESS_CSS', true);
define('COMPRESS_SCRIPTS', true);

/* That's all, stop editing! */
require_once ABSPATH . 'wp-settings.php';
```

## Theme Development

### Basic Theme Structure

```
my-theme/
├── style.css          # Theme stylesheet (required)
├── index.php          # Main template (required)
├── functions.php      # Theme functions
├── header.php         # Header template
├── footer.php         # Footer template
├── sidebar.php        # Sidebar template
├── single.php         # Single post template
├── page.php           # Page template
├── archive.php        # Archive template
├── search.php         # Search results template
├── 404.php            # 404 error template
├── comments.php       # Comments template
├── screenshot.png     # Theme screenshot
├── templates/         # Custom templates
├── parts/             # Template parts
├── inc/               # Include files
└── assets/
    ├── css/
    ├── js/
    └── images/
```

### style.css (Theme Header)

```css
/*
Theme Name: My Custom Theme
Theme URI: https://example.com/my-theme
Author: Your Name
Author URI: https://example.com
Description: A custom WordPress theme
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: my-theme
Tags: blog, custom-background, custom-logo, custom-menu
*/

/* Theme styles here */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}
```

### functions.php

```php
<?php
/**
 * Theme Functions
 */

// Theme setup
function mytheme_setup() {
    // Add default posts and comments RSS feed links
    add_theme_support('automatic-feed-links');
    
    // Let WordPress manage the document title
    add_theme_support('title-tag');
    
    // Enable post thumbnails
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(1200, 9999);
    
    // Add custom image sizes
    add_image_size('mytheme-featured', 800, 400, true);
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'my-theme'),
        'footer'  => __('Footer Menu', 'my-theme'),
    ));
    
    // Switch default core markup for search form, comment form, and comments
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Add custom logo support
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    
    // Add editor styles
    add_editor_style('assets/css/editor-style.css');
    
    // Add Gutenberg support
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'mytheme_setup');

// Enqueue scripts and styles
function mytheme_scripts() {
    // Stylesheet
    wp_enqueue_style('mytheme-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Custom CSS
    wp_enqueue_style('mytheme-custom', get_template_directory_uri() . '/assets/css/custom.css', array(), '1.0.0');
    
    // JavaScript
    wp_enqueue_script('mytheme-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), '1.0.0', true);
    
    // Comments script
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'mytheme_scripts');

// Register widget areas
function mytheme_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'my-theme'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here.', 'my-theme'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer', 'my-theme'),
        'id'            => 'footer-1',
        'description'   => __('Add footer widgets here.', 'my-theme'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'mytheme_widgets_init');

// Custom excerpt length
function mytheme_excerpt_length($length) {
    return 40;
}
add_filter('excerpt_length', 'mytheme_excerpt_length', 999);

// Custom excerpt more
function mytheme_excerpt_more($more) {
    return '... <a href="' . get_permalink() . '">Read More</a>';
}
add_filter('excerpt_more', 'mytheme_excerpt_more');
```

### header.php

```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header id="masthead" class="site-header">
    <div class="container">
        <div class="site-branding">
            <?php if (has_custom_logo()) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <h1 class="site-title">
                    <a href="<?php echo esc_url(home_url('/')); ?>">
                        <?php bloginfo('name'); ?>
                    </a>
                </h1>
                <p class="site-description"><?php bloginfo('description'); ?></p>
            <?php endif; ?>
        </div>

        <nav id="site-navigation" class="main-navigation">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class'     => 'primary-menu',
                'container'      => false,
            ));
            ?>
        </nav>
    </div>
</header>

<main id="primary" class="site-main">
```

### footer.php

```php
</main>

<footer id="colophon" class="site-footer">
    <div class="container">
        <?php if (is_active_sidebar('footer-1')) : ?>
            <div class="footer-widgets">
                <?php dynamic_sidebar('footer-1'); ?>
            </div>
        <?php endif; ?>

        <div class="site-info">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
```

### index.php

```php
<?php get_header(); ?>

<div class="container">
    <div class="content-area">
        <?php if (have_posts()) : ?>
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="post-thumbnail">
                                <?php the_post_thumbnail('large'); ?>
                            </div>
                        <?php endif; ?>
                        
                        <h2 class="entry-title">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_title(); ?>
                            </a>
                        </h2>
                        
                        <div class="entry-meta">
                            <span class="posted-on">
                                <?php echo get_the_date(); ?>
                            </span>
                            <span class="byline">
                                by <?php the_author(); ?>
                            </span>
                        </div>
                    </header>

                    <div class="entry-content">
                        <?php the_excerpt(); ?>
                    </div>
                </article>
            <?php endwhile; ?>

            <?php the_posts_pagination(); ?>
        <?php else : ?>
            <p><?php _e('No posts found.', 'my-theme'); ?></p>
        <?php endif; ?>
    </div>

    <?php get_sidebar(); ?>
</div>

<?php get_footer(); ?>
```

### single.php

```php
<?php get_header(); ?>

<div class="container">
    <div class="content-area">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="post-thumbnail">
                            <?php the_post_thumbnail('full'); ?>
                        </div>
                    <?php endif; ?>
                    
                    <h1 class="entry-title"><?php the_title(); ?></h1>
                    
                    <div class="entry-meta">
                        <span class="posted-on"><?php echo get_the_date(); ?></span>
                        <span class="byline">by <?php the_author(); ?></span>
                        <span class="categories"><?php the_category(', '); ?></span>
                    </div>
                </header>

                <div class="entry-content">
                    <?php the_content(); ?>
                </div>

                <footer class="entry-footer">
                    <?php the_tags('<span class="tags">Tags: ', ', ', '</span>'); ?>
                </footer>
            </article>

            <?php
            // Previous/Next navigation
            the_post_navigation(array(
                'prev_text' => '&larr; %title',
                'next_text' => '%title &rarr;',
            ));
            ?>

            <?php
            // Comments
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>
        <?php endwhile; ?>
    </div>

    <?php get_sidebar(); ?>
</div>

<?php get_footer(); ?>
```

## Plugin Development

### Basic Plugin Structure

```php
<?php
/**
 * Plugin Name: My Custom Plugin
 * Plugin URI: https://example.com/my-plugin
 * Description: A custom WordPress plugin
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL v2 or later
 * Text Domain: my-plugin
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('MY_PLUGIN_VERSION', '1.0.0');
define('MY_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('MY_PLUGIN_URL', plugin_dir_url(__FILE__));

// Activation hook
register_activation_hook(__FILE__, 'my_plugin_activate');
function my_plugin_activate() {
    // Create database tables
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_plugin_data';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    
    // Set default options
    add_option('my_plugin_version', MY_PLUGIN_VERSION);
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'my_plugin_deactivate');
function my_plugin_deactivate() {
    // Cleanup tasks
    flush_rewrite_rules();
}

// Uninstall hook
register_uninstall_hook(__FILE__, 'my_plugin_uninstall');
function my_plugin_uninstall() {
    // Remove database tables
    global $wpdb;
    $wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}my_plugin_data");
    
    // Remove options
    delete_option('my_plugin_version');
}

// Initialize plugin
add_action('plugins_loaded', 'my_plugin_init');
function my_plugin_init() {
    load_plugin_textdomain('my-plugin', false, dirname(plugin_basename(__FILE__)) . '/languages');
}

// Enqueue scripts and styles
add_action('wp_enqueue_scripts', 'my_plugin_enqueue_scripts');
function my_plugin_enqueue_scripts() {
    wp_enqueue_style('my-plugin-style', MY_PLUGIN_URL . 'assets/css/style.css', array(), MY_PLUGIN_VERSION);
    wp_enqueue_script('my-plugin-script', MY_PLUGIN_URL . 'assets/js/script.js', array('jquery'), MY_PLUGIN_VERSION, true);
    
    // Localize script
    wp_localize_script('my-plugin-script', 'myPluginData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('my_plugin_nonce'),
    ));
}

// Add shortcode
add_shortcode('my_shortcode', 'my_plugin_shortcode');
function my_plugin_shortcode($atts) {
    $atts = shortcode_atts(array(
        'title' => 'Default Title',
        'count' => 5,
    ), $atts);
    
    ob_start();
    ?>
    <div class="my-plugin-widget">
        <h3><?php echo esc_html($atts['title']); ?></h3>
        <p>Count: <?php echo intval($atts['count']); ?></p>
    </div>
    <?php
    return ob_get_clean();
}

// AJAX handler
add_action('wp_ajax_my_plugin_action', 'my_plugin_ajax_handler');
add_action('wp_ajax_nopriv_my_plugin_action', 'my_plugin_ajax_handler');
function my_plugin_ajax_handler() {
    check_ajax_referer('my_plugin_nonce', 'nonce');
    
    $response = array(
        'success' => true,
        'message' => 'Action completed successfully',
    );
    
    wp_send_json($response);
}

// Add custom post type
add_action('init', 'my_plugin_register_post_type');
function my_plugin_register_post_type() {
    register_post_type('my_custom_post', array(
        'labels' => array(
            'name' => __('Custom Posts', 'my-plugin'),
            'singular_name' => __('Custom Post', 'my-plugin'),
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-admin-post',
    ));
}

// Add admin menu
add_action('admin_menu', 'my_plugin_admin_menu');
function my_plugin_admin_menu() {
    add_menu_page(
        __('My Plugin', 'my-plugin'),
        __('My Plugin', 'my-plugin'),
        'manage_options',
        'my-plugin',
        'my_plugin_admin_page',
        'dashicons-admin-generic',
        30
    );
}

function my_plugin_admin_page() {
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('my_plugin_options');
            do_settings_sections('my-plugin');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

// Register settings
add_action('admin_init', 'my_plugin_register_settings');
function my_plugin_register_settings() {
    register_setting('my_plugin_options', 'my_plugin_setting');
    
    add_settings_section(
        'my_plugin_section',
        __('Plugin Settings', 'my-plugin'),
        'my_plugin_section_callback',
        'my-plugin'
    );
    
    add_settings_field(
        'my_plugin_field',
        __('Setting Field', 'my-plugin'),
        'my_plugin_field_callback',
        'my-plugin',
        'my_plugin_section'
    );
}

function my_plugin_section_callback() {
    echo '<p>' . __('Configure your plugin settings here.', 'my-plugin') . '</p>';
}

function my_plugin_field_callback() {
    $value = get_option('my_plugin_setting', '');
    echo '<input type="text" name="my_plugin_setting" value="' . esc_attr($value) . '" class="regular-text">';
}
```

## WordPress REST API

### Built-in Endpoints

```javascript
// Get posts
fetch('https://example.com/wp-json/wp/v2/posts')
    .then(response => response.json())
    .then(posts => console.log(posts));

// Get single post
fetch('https://example.com/wp-json/wp/v2/posts/123')
    .then(response => response.json())
    .then(post => console.log(post));

// Get pages
fetch('https://example.com/wp-json/wp/v2/pages')
    .then(response => response.json())
    .then(pages => console.log(pages));

// Get categories
fetch('https://example.com/wp-json/wp/v2/categories')
    .then(response => response.json())
    .then(categories => console.log(categories));

// Get media
fetch('https://example.com/wp-json/wp/v2/media')
    .then(response => response.json())
    .then(media => console.log(media));
```

### Custom REST Endpoints

```php
<?php
// Register custom REST route
add_action('rest_api_init', function () {
    register_rest_route('my-plugin/v1', '/items', array(
        'methods' => 'GET',
        'callback' => 'my_plugin_get_items',
        'permission_callback' => '__return_true',
    ));
    
    register_rest_route('my-plugin/v1', '/items/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'my_plugin_get_item',
        'permission_callback' => '__return_true',
    ));
    
    register_rest_route('my-plugin/v1', '/items', array(
        'methods' => 'POST',
        'callback' => 'my_plugin_create_item',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ));
});

function my_plugin_get_items($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_plugin_data';
    
    $items = $wpdb->get_results("SELECT * FROM $table_name");
    
    return new WP_REST_Response($items, 200);
}

function my_plugin_get_item($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_plugin_data';
    $id = $request['id'];
    
    $item = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $id));
    
    if (!$item) {
        return new WP_Error('not_found', 'Item not found', array('status' => 404));
    }
    
    return new WP_REST_Response($item, 200);
}

function my_plugin_create_item($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'my_plugin_data';
    
    $data = array(
        'name' => sanitize_text_field($request['name']),
        'email' => sanitize_email($request['email']),
    );
    
    $wpdb->insert($table_name, $data);
    
    return new WP_REST_Response($data, 201);
}
```

## WP-CLI Commands

```bash
# Core
wp core download
wp core install --url=example.com --title="My Site" --admin_user=admin --admin_email=admin@example.com
wp core update
wp core version

# Plugins
wp plugin list
wp plugin install plugin-name
wp plugin activate plugin-name
wp plugin deactivate plugin-name
wp plugin delete plugin-name
wp plugin update --all

# Themes
wp theme list
wp theme install theme-name
wp theme activate theme-name
wp theme delete theme-name

# Database
wp db export backup.sql
wp db import backup.sql
wp db optimize
wp db repair

# Search and replace
wp search-replace 'oldurl.com' 'newurl.com' --dry-run
wp search-replace 'oldurl.com' 'newurl.com'

# Cache
wp cache flush
wp transient delete --all

# Users
wp user list
wp user create username email@example.com --role=editor
wp user update 1 --user_pass=newpassword

# Posts
wp post list
wp post create --post_title="Title" --post_content="Content" --post_status=publish
wp post delete 123

# Maintenance
wp maintenance-mode activate
wp maintenance-mode deactivate

# Cron
wp cron event list
wp cron event run wp_scheduled_delete
```

## Security Best Practices

### Hardening WordPress

```php
// Disable file editing
define('DISALLOW_FILE_EDIT', true);

// Disable plugin and theme installation
define('DISALLOW_FILE_MODS', true);

// Force SSL for admin
define('FORCE_SSL_ADMIN', true);

// Change database prefix (during installation)
$table_prefix = 'custom_prefix_';

// Limit login attempts (use plugin)
// Hide WordPress version
remove_action('wp_head', 'wp_generator');

// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');

// Change admin username (not 'admin')
// Use strong passwords
// Keep WordPress, themes, and plugins updated
```

### .htaccess Security

```apache
# Protect wp-config.php
<files wp-config.php>
    order allow,deny
    deny from all
</files>

# Disable directory browsing
Options -Indexes

# Protect .htaccess
<files ~ "^.*\.([Hh][Tt][Aa])">
    order allow,deny
    deny from all
    satisfy all
</files>

# Limit file upload size
LimitRequestBody 10485760

# Block bad bots
RewriteEngine On
RewriteCond %{HTTP_USER_AGENT} ^badbot [NC]
RewriteRule ^(.*)$ - [F,L]
```

## Performance Optimization

### Caching Plugins
- **WP Super Cache** - Static HTML caching
- **W3 Total Cache** - Comprehensive caching
- **WP Rocket** - Premium caching (paid)
- **Redis Object Cache** - Object caching with Redis

### Optimization Techniques

```php
// Disable embeds
wp_deregister_script('wp-embed');

// Remove query strings
function remove_query_strings($src) {
    if (strpos($src, '?ver=')) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('style_loader_src', 'remove_query_strings', 10, 2);
add_filter('script_loader_src', 'remove_query_strings', 10, 2);

// Lazy load images
add_filter('the_content', 'add_lazy_loading');
function add_lazy_loading($content) {
    $content = preg_replace('/<img(.*?)src=/', '<img$1loading="lazy" src=', $content);
    return $content;
}

// Defer JavaScript
function defer_parsing_of_js($url) {
    if (is_admin()) return $url;
    if (strpos($url, '.js') === false) return $url;
    return str_replace(' src', ' defer src', $url);
}
add_filter('script_loader_tag', 'defer_parsing_of_js', 10);
```

## Popular Plugins

### Essential Plugins
- **Yoast SEO** - SEO optimization
- **WooCommerce** - E-commerce
- **Contact Form 7** - Forms
- **Akismet** - Spam protection
- **Wordfence** - Security
- **UpdraftPlus** - Backups
- **Advanced Custom Fields (ACF)** - Custom fields
- **Elementor** - Page builder
- **WP Forms** - Form builder

## Resources

- [WordPress.org](https://wordpress.org/)
- [WordPress Developer Resources](https://developer.wordpress.org/)
- [WordPress Codex](https://codex.wordpress.org/)
- [WP-CLI](https://wp-cli.org/)
- [Theme Handbook](https://developer.wordpress.org/themes/)
- [Plugin Handbook](https://developer.wordpress.org/plugins/)
- [REST API Handbook](https://developer.wordpress.org/rest-api/)
- [WordPress Stack Exchange](https://wordpress.stackexchange.com/)

WordPress remains the most popular CMS due to its ease of use, extensibility, and massive ecosystem. It's ideal for everything from simple blogs to complex enterprise websites.
