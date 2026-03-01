import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../../context/Product/ProductContext';

const Checkout = () => {
  const { cart, removeFromCart, clearCart, checkout } = useContext(ProductContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    checkout(cart);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any items yet.</p>
        <Link
          to="/products"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-4">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center bg-white rounded-lg shadow-md p-4 gap-4">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 text-sm hover:text-red-700 mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center text-xl font-bold mb-6">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Proceed to Payment
          </button>
        </div>

        <Link
          to="/products"
          className="block text-center mt-4 text-gray-600 hover:text-gray-900"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
