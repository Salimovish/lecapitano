import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import BackOfficePage from './pages/BackOfficePage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import CartButton from './components/cart/CartButton';

export default function App() {
  return (
    <BrowserRouter future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true 
    }}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<BackOfficePage />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        
        {window.location.pathname !== '/admin/orders' && 
         !window.location.pathname.startsWith('/admin') && 
         <CartButton />}
      </Layout>
    </BrowserRouter>
  );
}