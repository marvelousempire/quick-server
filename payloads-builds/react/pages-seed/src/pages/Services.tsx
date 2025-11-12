const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Service One',
      description: 'Service description goes here',
      price: '$99',
    },
    {
      id: 2,
      title: 'Service Two',
      description: 'Service description goes here',
      price: '$199',
    },
    {
      id: 3,
      title: 'Service Three',
      description: 'Service description goes here',
      price: '$299',
    },
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-3">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="text-2xl font-bold text-primary-600 mb-4">
                {service.price}
              </div>
              <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services

