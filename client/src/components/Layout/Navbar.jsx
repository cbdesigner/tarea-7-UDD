import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/User/UserContext';
import ProductContext from '../../context/Product/ProductContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(UserContext);
  const { cart } = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold tracking-wider">
            URBAN THREADS
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
            <Link to="/products" className="hover:text-gray-300 transition">Products</Link>

            {isAuthenticated ? (
              <>
                <Link to="/admin/products" className="hover:text-gray-300 transition">Admin</Link>
                <Link to="/profile" className="hover:text-gray-300 transition">Profile</Link>
                <Link to="/checkout" className="relative hover:text-gray-300 transition">
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
                <Link
                  to="/register"
                  className="bg-white text-gray-900 px-4 py-2 rounded font-medium hover:bg-gray-200 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 hover:text-gray-300">Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block py-2 hover:text-gray-300">Products</Link>
            {isAuthenticated ? (
              <>
                <Link to="/admin/products" onClick={() => setIsOpen(false)} className="block py-2 hover:text-gray-300">Admin</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2 hover:text-gray-300">Profile</Link>
                <Link to="/checkout" onClick={() => setIsOpen(false)} className="block py-2 hover:text-gray-300">
                  Cart ({cart.length})
                </Link>
                <button onClick={handleLogout} className="block w-full text-left py-2 text-red-400">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 hover:text-gray-300">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block py-2 hover:text-gray-300">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
