const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Product One',
      description: 'Product description goes here',
      price: '$49.99',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      name: 'Product Two',
      description: 'Product description goes here',
      price: '$79.99',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      name: 'Product Three',
      description: 'Product description goes here',
      price: '$99.99',
      image: 'https://via.placeholder.com/300',
    },
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    {product.price}
                  </span>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products

