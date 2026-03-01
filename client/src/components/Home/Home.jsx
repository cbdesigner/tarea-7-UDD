import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../../context/Product/ProductContext';
import ProductCard from '../Products/ProductCard';

const categories = [
  { name: 'Men', image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400', color: 'from-blue-600' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', color: 'from-pink-600' },
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', color: 'from-slate-600' },
  { name: 'Jewelery', image: 'https://images.unsplash.com/photo-1515562143047-4f9c0d1e1c2a?w=400', color: 'from-amber-600' },
  { name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', color: 'from-orange-600' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', color: 'from-green-600' },
];

const Home = () => {
  const { products, getProducts, loading } = useContext(ProductContext);

  useEffect(() => {
    getProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
            Discover Your Style
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Premium clothing for every occasion. From casual everyday wear to standout pieces that define your look.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="relative group overflow-hidden rounded-lg h-48"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-60`}></div>
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <span className="text-white text-xl font-bold">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
