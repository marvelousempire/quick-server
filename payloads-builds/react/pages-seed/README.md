# React Pages Seed

React 18+ application with TypeScript, featuring 7 starter pages ready for content customization.

## Quick Start

```bash
# Clone this seed
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

## Features

- ✅ React 18+ with TypeScript
- ✅ Vite for fast development
- ✅ 7 starter pages ready for content:
  - `Home.tsx` - Landing page
  - `About.tsx` - About page
  - `Services.tsx` - Services listing
  - `Products.tsx` - Products listing
  - `Contact.tsx` - Contact form
  - `Blog.tsx` - Blog listing
  - `Dashboard.tsx` - Admin dashboard
- ✅ React Router for navigation
- ✅ TypeScript configuration
- ✅ Tailwind CSS for styling
- ✅ Component library ready
- ✅ Responsive design

## Project Structure

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
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   └── common/
│   │       └── Button.tsx
│   ├── router/
│   │   └── index.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Pages Overview

### Home.tsx
Landing page with hero section, features, and call-to-action. Ready for customization.

### About.tsx
About page template with sections for company history, mission, and team.

### Services.tsx
Services listing page with grid layout for service cards.

### Products.tsx
Products listing page with product grid and filtering options.

### Contact.tsx
Contact form page with form fields and validation ready.

### Blog.tsx
Blog listing page with post cards and pagination structure.

### Dashboard.tsx
Admin dashboard page with stats and management interface.

## Customization

### Adding Content to Pages

Each page is a separate `.tsx` file ready for your content:

```tsx
// src/pages/Home.tsx
const Home = () => {
  return (
    <div>
      <h1>Your Landing Page Content</h1>
      {/* Add your content here */}
    </div>
  )
}

export default Home
```

### Adding New Pages

1. Create new `.tsx` file in `src/pages/`
2. Add route in `src/router/index.tsx`:
   ```tsx
   {
     path: '/new-page',
     element: <NewPage />
   }
   ```
3. Add navigation link in `src/components/Layout/Navigation.tsx`

### Styling

- Uses Tailwind CSS for styling
- Customize colors in `tailwind.config.js`
- Add custom styles in `src/styles/`

## Configuration

### TypeScript

Type definitions in `src/types/index.ts`:
```tsx
export interface PageProps {
  title?: string
}
```

### Router

Configure routes in `src/router/index.tsx`:
```tsx
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
// ... other imports

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  // ... other routes
])
```

### Environment Variables

Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=My React App
```

## Development

### Dev Server

```bash
npm run dev
```

Runs on `http://localhost:5173` with HMR.

### Build

```bash
npm run build
```

Output will be in `dist/` directory.

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Deployment

### Build

```bash
npm run build
```

### Docker

```bash
docker build -t react-app .
docker run -p 80:80 react-app
```

### Static Hosting

Upload `dist/` folder to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Dependencies

- React 18
- React Router DOM
- TypeScript
- Vite
- Tailwind CSS

## Troubleshooting

- **Type Errors**: Check `tsconfig.json` configuration
- **Build Errors**: Verify Node.js version (requires 16+)
- **Import Errors**: Check file paths and extensions (.tsx)

