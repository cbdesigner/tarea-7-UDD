import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from './context/User/UserContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Alert from './components/Layout/Alert';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import ProductAdmin from './components/Products/ProductAdmin';
import Profile from './components/Profile/Profile';
import Checkout from './components/Checkout/Checkout';
import CheckoutSuccess from './components/Checkout/CheckoutSuccess';
import CheckoutCancel from './components/Checkout/CheckoutCancel';
import Private from './routes/Private';
import Auth from './routes/Auth';

const AppContent = () => {
  const { getAuthUser, token, setLoading } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      getAuthUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Alert />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Auth><Register /></Auth>} />
          <Route path="/login" element={<Auth><Login /></Auth>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin/products" element={<Private><ProductAdmin /></Private>} />
          <Route path="/profile" element={<Private><Profile /></Private>} />
          <Route path="/checkout" element={<Private><Checkout /></Private>} />
          <Route path="/checkout/success" element={<Private><CheckoutSuccess /></Private>} />
          <Route path="/checkout/cancel" element={<Private><CheckoutCancel /></Private>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default Router;
