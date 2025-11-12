# WordPress Multisite Seed

Quick clone template for setting up a WordPress Multisite network installation.

## Quick Start

```bash
# Clone this seed
cp -r payloads-builds/wordpress/multisite-seed /path/to/your/project/wordpress-multisite

# Navigate to project
cd /path/to/your/project/wordpress-multisite

# Copy WordPress core files
cp -r ../wordpress/wordpress/* .

# Configure for multisite
# Edit wp-config.php and enable multisite

# Run network installation
# Visit your site URL/wp-admin/network/setup.php
```

## Configuration

### wp-config.php Setup

1. Copy `wp-config-sample.php` to `wp-config.php`
2. Update database credentials
3. **Enable Multisite** by adding before "That's all, stop editing!":
   ```php
   define('WP_ALLOW_MULTISITE', true);
   ```
4. After network setup, WordPress will provide additional configuration to add to `wp-config.php` and `.htaccess`

### Network Installation

1. Visit: `http://yoursite.com/wp-admin/network/setup.php`
2. Choose subdomain or subdirectory installation
3. Follow instructions to update `wp-config.php` and `.htaccess`
4. Log in and configure network settings

### Installation Script

Run `install-network.sh` for automated setup:

```bash
chmod +x install-network.sh
./install-network.sh
```

## Features

- ✅ Pre-configured for multisite network
- ✅ Subdomain or subdirectory support
- ✅ Network admin dashboard
- ✅ Site management tools
- ✅ Theme/plugin network activation
- ✅ User management across sites

## Network Configuration

### Creating Sites

1. Go to Network Admin → Sites → Add New
2. Enter site address and title
3. Assign admin user
4. Site is created instantly

### Network Themes

- Themes must be network-enabled to be available to all sites
- Go to Network Admin → Themes
- Enable themes for network use

### Network Plugins

- Plugins can be network-activated
- Network-activated plugins run on all sites
- Go to Network Admin → Plugins

## Customization

### Per-Site Configuration
- Each site has its own admin dashboard
- Themes and plugins can be activated per site
- Custom domains can be mapped to sites

### Network-Wide Settings
- Configure in Network Admin dashboard
- Settings apply to all sites
- User roles and capabilities managed network-wide

## Deployment

### Docker
```bash
docker-compose up -d
```

### Manual
1. Upload files to server
2. Set correct file permissions
3. Configure database
4. Enable multisite in `wp-config.php`
5. Run network installation

## Troubleshooting

- **Multisite Not Showing**: Verify `WP_ALLOW_MULTISITE` is defined
- **Subdomain Issues**: Configure wildcard DNS for subdomain setup
- **.htaccess Errors**: Verify rewrite rules are correct
- **Site Creation Fails**: Check database permissions

