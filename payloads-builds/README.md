# Payloads Builds - Quick Clone Seeds

This directory contains ready-to-clone seed templates for various deployment payloads. Each payload is a complete, working setup that can be quickly cloned and customized for new projects.

## Overview

Payloads are pre-configured builds that serve as starting points for different types of projects. Each payload includes:
- ✅ Complete working setup
- ✅ Configuration files
- ✅ Dependencies and build scripts
- ✅ Documentation for customization
- ✅ Quick clone instructions

## Directory Structure

```
payloads-builds/
├── wordpress/
│   ├── multisite-seed/          # WordPress Multisite setup
│   ├── single-site-seed/         # WordPress Single Site setup
│   ├── wordpress/                # Core WordPress files
│   ├── wordpress-themes/         # Pre-installed themes
│   └── wordpress-vanilla/        # Vanilla WordPress zip
├── vue/
│   └── dashboard-seed/           # Vue Dashboard with full setup
├── react/
│   └── pages-seed/               # React app with 7 starter pages
└── README.md                     # This file
```

## Quick Clone Workflow

### 1. WordPress

#### Single Site Setup
```bash
# Clone single site seed
cp -r payloads-builds/wordpress/single-site-seed /path/to/your/project/wordpress-single

# Navigate to project
cd /path/to/your/project/wordpress-single

# Configure database in wp-config.php
# Update site URL and admin credentials
# Run WordPress installation
```

#### Multisite Setup
```bash
# Clone multisite seed
cp -r payloads-builds/wordpress/multisite-seed /path/to/your/project/wordpress-multisite

# Navigate to project
cd /path/to/your/project/wordpress-multisite

# Configure wp-config.php for multisite
# Enable multisite in wp-config.php
# Run network installation
# Configure .htaccess for multisite
```

**Wordpress Seed Features:**
- Pre-configured wp-config.php templates
- Database setup scripts
- Theme installation scripts
- Plugin recommendations
- Multisite network configuration
- Single site optimization

### 2. Vue Dashboard

```bash
# Clone Vue Dashboard seed
cp -r payloads-builds/vue/dashboard-seed /path/to/your/project/vue-dashboard

# Navigate to project
cd /path/to/your/project/vue-dashboard

# Install dependencies
npm install  # or pnpm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Vue Dashboard Seed Features:**
- Complete Vue 3 + Vite setup
- Dashboard layout with sidebar navigation
- Pre-built dashboard components
- State management (Pinia/Vuex)
- Router configuration
- API integration examples
- Responsive design
- Dark mode support

### 3. React Pages Seed

```bash
# Clone React Pages seed
cp -r payloads-builds/react/pages-seed /path/to/your/project/react-app

# Navigate to project
cd /path/to/your/project/react-app

# Install dependencies
npm install  # or pnpm install

# Start development server
npm run dev

# Build for production
npm run build
```

**React Pages Seed Features:**
- React 18+ with TypeScript
- 7 starter pages ready for content:
  - `Home.tsx` - Landing page
  - `About.tsx` - About page
  - `Services.tsx` - Services listing
  - `Products.tsx` - Products listing
  - `Contact.tsx` - Contact form
  - `Blog.tsx` - Blog listing
  - `Dashboard.tsx` - Admin dashboard
- Each page is a separate `.tsx` file ready for customization
- React Router setup
- TypeScript configuration
- Component library integration
- Styling setup (Tailwind CSS or styled-components)

## Seed Structure Details

### WordPress Seeds

#### Single Site Seed (`single-site-seed/`)
```
single-site-seed/
├── wp-config.php              # Pre-configured for single site
├── .htaccess                  # Optimized for single site
├── install.sh                 # Quick installation script
├── README.md                  # Setup instructions
└── themes/                    # Custom themes directory
```

#### Multisite Seed (`multisite-seed/`)
```
multisite-seed/
├── wp-config.php              # Pre-configured for multisite
├── .htaccess                  # Multisite rewrite rules
├── install-network.sh         # Network installation script
├── README.md                  # Multisite setup guide
└── themes/                    # Network-enabled themes
```

### Vue Dashboard Seed (`vue/dashboard-seed/`)
```
dashboard-seed/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── Sidebar/
│   │   ├── Header/
│   │   └── Charts/
│   ├── views/
│   │   ├── Dashboard.vue
│   │   ├── Analytics.vue
│   │   └── Settings.vue
│   ├── router/
│   ├── store/
│   ├── api/
│   └── main.js
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

### React Pages Seed (`react/pages-seed/`)
```
pages-seed/
├── src/
│   ├── pages/
│   │   ├── Home.tsx           # Landing page
│   │   ├── About.tsx          # About page
│   │   ├── Services.tsx       # Services page
│   │   ├── Products.tsx       # Products page
│   │   ├── Contact.tsx        # Contact page
│   │   ├── Blog.tsx           # Blog page
│   │   └── Dashboard.tsx      # Dashboard page
│   ├── components/
│   ├── router/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Customization Guide

### After Cloning

1. **Update Configuration**
   - WordPress: Edit `wp-config.php` with your database credentials
   - Vue/React: Update `package.json` name and description
   - Update environment variables

2. **Customize Content**
   - WordPress: Install themes/plugins, configure settings
   - Vue: Modify dashboard components and views
   - React: Edit individual `.tsx` page files

3. **Set Up Dependencies**
   - Run installation commands
   - Configure build tools
   - Set up development environment

4. **Deploy**
   - Follow deployment instructions in each seed's README
   - Configure production settings
   - Set up CI/CD if needed

## Integration with Sites Directory

These payloads can be integrated with the `sites/` directory structure:

```bash
# Example: Clone WordPress single site to sites directory
cp -r payloads-builds/wordpress/single-site-seed sites/my-wordpress-site

# Example: Clone Vue dashboard to sites directory
cp -r payloads-builds/vue/dashboard-seed sites/my-vue-site

# Example: Clone React pages to sites directory
cp -r payloads-builds/react/pages-seed sites/my-react-site
```

## Best Practices

1. **Always clone, never modify seeds directly**
   - Seeds are templates - clone them to create new projects
   - Keep seeds clean for future use

2. **Version control**
   - Initialize git in cloned projects
   - Don't commit seed files to your project repo

3. **Documentation**
   - Each seed has its own README with specific instructions
   - Follow seed-specific setup guides

4. **Testing**
   - Test cloned payloads before deploying
   - Verify all dependencies install correctly
   - Check build processes work

## Maintenance

- **Updating Seeds**: Update seed templates when frameworks update
- **Adding New Seeds**: Create new directories following existing patterns
- **Documentation**: Keep README files up to date with changes

## Troubleshooting

### WordPress
- **Database Connection Issues**: Check `wp-config.php` credentials
- **Multisite Setup**: Verify `.htaccess` rewrite rules
- **Theme Issues**: Ensure themes are in correct directory

### Vue/React
- **Dependency Issues**: Delete `node_modules` and reinstall
- **Build Errors**: Check Node.js version compatibility
- **Type Errors**: Verify TypeScript configuration

## Contributing

When adding new seeds:
1. Create directory following naming convention: `{type}-seed/`
2. Include complete working setup
3. Add comprehensive README.md
4. Include installation scripts if needed
5. Test clone process before committing

## Related Documentation

- [Deployment Options](../docs/project/README-DEPLOYMENT-OPTIONS.md)
- [Docker Setup](../docs/project/README-DOCKER.md)
- [Sites Directory](../docs/server/README-SITES-DIRECTORY.md)

