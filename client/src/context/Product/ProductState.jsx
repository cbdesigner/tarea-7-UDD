import { useReducer, useContext } from 'react';
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import AlertContext from '../Alert/AlertContext';
import clientAxios from '../../config/axios';
import getToken from '../../config/token';

const ProductState = ({ children }) => {
  const initialState = {
    products: [],
    selectedProduct: null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    loading: true
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);
  const { setAlert } = useContext(AlertContext);

  const getProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await clientAxios.get('/api/products');
      dispatch({ type: 'GET_PRODUCTS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'SET_LOADING_FALSE' });
      setAlert('Error loading products', 'error');
    }
  };

  const getProduct = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await clientAxios.get(`/api/products/${id}`);
      dispatch({ type: 'GET_PRODUCT', payload: res.data });
    } catch (error) {
      dispatch({ type: 'SET_LOADING_FALSE' });
      setAlert('Error loading product', 'error');
    }
  };

  const clearProduct = () => {
    dispatch({ type: 'CLEAR_PRODUCT' });
  };

  const createProduct = async (productData) => {
    try {
      const res = await clientAxios.post('/api/products', productData);
      dispatch({ type: 'CREATE_PRODUCT', payload: res.data });
      setAlert('Product created successfully', 'success');
      return true;
    } catch (error) {
      setAlert(error.response?.data?.message || 'Error creating product', 'error');
      return false;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const res = await clientAxios.put(`/api/products/${id}`, productData);
      dispatch({ type: 'UPDATE_PRODUCT', payload: res.data });
      setAlert('Product updated successfully', 'success');
      return true;
    } catch (error) {
      setAlert(error.response?.data?.message || 'Error updating product', 'error');
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await clientAxios.delete(`/api/products/${id}`);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      setAlert('Product deleted successfully', 'success');
      return true;
    } catch (error) {
      setAlert(error.response?.data?.message || 'Error deleting product', 'error');
      return false;
    }
  };

  const addToCart = (product, quantity, size, color) => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      size,
      color
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    setAlert('Added to cart!', 'success');
  };

  const removeFromCart = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const checkout = async (items) => {
    getToken();
    try {
      const res = await clientAxios.post('/api/checkout', { items });
      window.location.href = res.data.url;
    } catch (error) {
      setAlert(error.response?.data?.message || 'Checkout error', 'error');
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        selectedProduct: state.selectedProduct,
        cart: state.cart,
        loading: state.loading,
        getProducts,
        getProduct,
        clearProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        clearCart,
        checkout
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductState;
