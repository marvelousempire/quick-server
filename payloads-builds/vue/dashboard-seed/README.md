# Vue Dashboard Seed

Complete Vue 3 Dashboard setup with Vite, ready for quick cloning and customization.

## Quick Start

```bash
# Clone this seed
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

## Features

- ✅ Vue 3 with Composition API
- ✅ Vite for fast development
- ✅ Complete dashboard layout with sidebar
- ✅ Router configuration
- ✅ State management (Pinia)
- ✅ API integration examples
- ✅ Responsive design
- ✅ Dark mode support
- ✅ TypeScript support
- ✅ Component library ready

## Project Structure

```
dashboard-seed/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── DashboardHeader.vue
│   │   │   ├── DashboardStats.vue
│   │   │   └── DashboardCharts.vue
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.vue
│   │   │   └── SidebarItem.vue
│   │   ├── Header/
│   │   │   └── AppHeader.vue
│   │   └── Charts/
│   │       ├── LineChart.vue
│   │       └── BarChart.vue
│   ├── views/
│   │   ├── Dashboard.vue
│   │   ├── Analytics.vue
│   │   ├── Settings.vue
│   │   └── Profile.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   └── index.js
│   ├── api/
│   │   └── index.js
│   ├── assets/
│   ├── App.vue
│   └── main.js
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Customization

### Adding New Views

1. Create new Vue component in `src/views/`
2. Add route in `src/router/index.js`
3. Add navigation item in sidebar

### Styling

- Uses Tailwind CSS for styling
- Customize colors in `tailwind.config.js`
- Add custom styles in `src/assets/css/`

### API Integration

- API utilities in `src/api/index.js`
- Update base URL in `.env` file
- Add API endpoints as needed

## Configuration

### Environment Variables

Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=My Dashboard
```

### Router

Configure routes in `src/router/index.js`:
```javascript
{
  path: '/new-page',
  name: 'NewPage',
  component: () => import('../views/NewPage.vue')
}
```

### State Management

Add stores in `src/store/`:
```javascript
import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', {
  state: () => ({
    // state
  }),
  actions: {
    // actions
  }
})
```

## Deployment

### Build

```bash
npm run build
```

Output will be in `dist/` directory.

### Docker

```bash
docker build -t vue-dashboard .
docker run -p 80:80 vue-dashboard
```

### Static Hosting

Upload `dist/` folder to your hosting provider:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Development

### Dev Server

```bash
npm run dev
```

Runs on `http://localhost:5173` with HMR.

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npm run type-check
```

## Dependencies

- Vue 3
- Vue Router
- Pinia
- Vite
- Tailwind CSS
- Chart.js (for charts)

## Troubleshooting

- **Port Already in Use**: Change port in `vite.config.js`
- **Build Errors**: Check Node.js version (requires 16+)
- **Import Errors**: Verify file paths and extensions

