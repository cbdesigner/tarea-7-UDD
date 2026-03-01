import { Link } from 'react-router-dom';

const CheckoutCancel = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-red-500 text-6xl mb-6">&#10007;</div>
      <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-gray-500 mb-8">
        Your payment was cancelled. Your cart items are still saved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          to="/checkout"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Back to Cart
        </Link>
        <Link
          to="/products"
          className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CheckoutCancel;
