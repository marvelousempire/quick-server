const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Blog Post Title One',
      excerpt: 'Blog post excerpt goes here. This is a preview of the blog post content.',
      date: 'January 1, 2024',
      author: 'Author Name',
    },
    {
      id: 2,
      title: 'Blog Post Title Two',
      excerpt: 'Blog post excerpt goes here. This is a preview of the blog post content.',
      date: 'January 15, 2024',
      author: 'Author Name',
    },
    {
      id: 3,
      title: 'Blog Post Title Three',
      excerpt: 'Blog post excerpt goes here. This is a preview of the blog post content.',
      date: 'February 1, 2024',
      author: 'Author Name',
    },
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.author}</span>
                </div>
                <button className="mt-4 text-primary-600 hover:text-primary-700 font-semibold">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              2
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              3
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog

