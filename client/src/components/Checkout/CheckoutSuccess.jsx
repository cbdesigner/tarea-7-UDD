import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../../context/Product/ProductContext';

const CheckoutSuccess = () => {
  const { clearCart } = useContext(ProductContext);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-green-500 text-6xl mb-6">&#10003;</div>
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-500 mb-8">
        Thank you for your purchase. Your order has been confirmed and will be processed shortly.
      </p>
      <Link
        to="/products"
        className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
