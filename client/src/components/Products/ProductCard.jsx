import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
        <div className="h-64 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="p-4">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="text-lg font-semibold mt-1 group-hover:text-gray-600 transition">
            {product.name}
          </h3>
          <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
