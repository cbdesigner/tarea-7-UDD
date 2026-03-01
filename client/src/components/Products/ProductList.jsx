import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductContext from '../../context/Product/ProductContext';
import ProductCard from './ProductCard';

const categories = ['All', 'Men', 'Women', 'Electronics', 'Jewelery', 'Shoes', 'Accessories'];

const ProductList = () => {
  const { products, getProducts, loading } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
