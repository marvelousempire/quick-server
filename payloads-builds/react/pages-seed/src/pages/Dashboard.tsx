const Dashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%' },
    { label: 'Revenue', value: '$45,678', change: '+8%' },
    { label: 'Orders', value: '567', change: '+5%' },
    { label: 'Growth', value: '23%', change: '+3%' },
  ]

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-green-600">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-600">Dashboard activity content goes here</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                Action One
              </button>
              <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                Action Two
              </button>
              <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                Action Three
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

