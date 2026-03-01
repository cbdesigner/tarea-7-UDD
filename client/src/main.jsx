import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import AlertState from './context/Alert/AlertState';
import UserState from './context/User/UserState';
import ProductState from './context/Product/ProductState';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertState>
      <UserState>
        <ProductState>
          <Router />
        </ProductState>
      </UserState>
    </AlertState>
  </React.StrictMode>
);
