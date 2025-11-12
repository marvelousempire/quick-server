const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-400">About</a></li>
              <li><a href="#" className="hover:text-primary-400">Services</a></li>
              <li><a href="#" className="hover:text-primary-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-400">Blog</a></li>
              <li><a href="#" className="hover:text-primary-400">Documentation</a></li>
              <li><a href="#" className="hover:text-primary-400">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-400">Privacy</a></li>
              <li><a href="#" className="hover:text-primary-400">Terms</a></li>
              <li><a href="#" className="hover:text-primary-400">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

