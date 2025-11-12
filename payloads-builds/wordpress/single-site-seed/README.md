# WordPress Single Site Seed

Quick clone template for setting up a WordPress single site installation.

## Quick Start

```bash
# Clone this seed
cp -r payloads-builds/wordpress/single-site-seed /path/to/your/project/wordpress-single

# Navigate to project
cd /path/to/your/project/wordpress-single

# Copy WordPress core files
cp -r ../wordpress/wordpress/* .

# Configure database
# Edit wp-config.php with your database credentials

# Run installation
# Visit your site URL and follow WordPress installation wizard
```

## Configuration

### wp-config.php Setup

1. Copy `wp-config-sample.php` to `wp-config.php`
2. Update database credentials:
   ```php
   define('DB_NAME', 'your_database_name');
   define('DB_USER', 'your_database_user');
   define('DB_PASSWORD', 'your_database_password');
   define('DB_HOST', 'localhost');
   ```
3. Generate security keys: https://api.wordpress.org/secret-key/1.1/salt/
4. Add keys to `wp-config.php`

### Installation Script

Run `install.sh` for automated setup:

```bash
chmod +x install.sh
./install.sh
```

The script will:
- Check PHP version
- Verify database connection
- Set file permissions
- Create necessary directories

## Features

- ✅ Pre-configured for single site
- ✅ Optimized .htaccess rules
- ✅ Security hardening
- ✅ Performance optimizations
- ✅ Ready for production deployment

## Customization

### Themes
- Place custom themes in `wp-content/themes/`
- Activate theme from WordPress admin

### Plugins
- Place plugins in `wp-content/plugins/`
- Activate from WordPress admin

### Configuration
- Edit `wp-config.php` for advanced settings
- Configure `.htaccess` for URL rewriting

## Deployment

### Docker
```bash
docker-compose up -d
```

### Manual
1. Upload files to server
2. Set correct file permissions
3. Configure database
4. Run WordPress installation

## Troubleshooting

- **Database Connection**: Verify credentials in `wp-config.php`
- **File Permissions**: Ensure `wp-content/` is writable
- **URL Issues**: Check `.htaccess` rewrite rules

