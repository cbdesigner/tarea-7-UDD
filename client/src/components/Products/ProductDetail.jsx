import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductContext from '../../context/Product/ProductContext';
import UserContext from '../../context/User/UserContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { selectedProduct, getProduct, clearProduct, addToCart, loading } = useContext(ProductContext);
  const { isAuthenticated } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    getProduct(id);
    return () => clearProduct();
  }, [id]);

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.sizes?.length > 0) setSelectedSize(selectedProduct.sizes[0]);
      if (selectedProduct.colors?.length > 0) setSelectedColor(selectedProduct.colors[0]);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity, selectedSize, selectedColor);
    }
  };

  if (loading || !selectedProduct) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/products" className="text-gray-600 hover:text-gray-900 mb-6 inline-block">
        &larr; Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.name}
            className="w-full h-96 md:h-[500px] object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {selectedProduct.category}
          </span>
          <h1 className="text-3xl font-bold mt-2 mb-4">{selectedProduct.name}</h1>
          <p className="text-3xl font-bold mb-6">${selectedProduct.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-8">{selectedProduct.description}</p>

          {/* Size Selector */}
          {selectedProduct.sizes?.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {selectedProduct.colors?.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition ${
                      selectedColor === color
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-900'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock */}
          <p className={`text-sm mb-6 ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock} available)` : 'Out of Stock'}
          </p>

          {/* Add to Cart */}
          {isAuthenticated ? (
            <button
              onClick={handleAddToCart}
              disabled={selectedProduct.stock === 0}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition text-center"
            >
              Login to Add to Cart
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
