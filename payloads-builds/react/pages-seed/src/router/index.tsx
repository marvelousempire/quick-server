import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Products from '../pages/Products'
import Contact from '../pages/Contact'
import Blog from '../pages/Blog'
import Dashboard from '../pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
])

export default router

