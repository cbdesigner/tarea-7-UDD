const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return { ...state, products: action.payload, loading: false };
    case 'GET_PRODUCT':
      return { ...state, selectedProduct: action.payload, loading: false };
    case 'CLEAR_PRODUCT':
      return { ...state, selectedProduct: null };
    case 'CREATE_PRODUCT':
      return { ...state, products: [action.payload, ...state.products], loading: false };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p._id === action.payload._id ? action.payload : p),
        loading: false
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p._id !== action.payload),
        loading: false
      };
    case 'ADD_TO_CART': {
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    }
    case 'REMOVE_FROM_CART': {
      const filteredCart = state.cart.filter((_, index) => index !== action.payload);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };
    }
    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return { ...state, cart: [] };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'SET_LOADING_FALSE':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default ProductReducer;
