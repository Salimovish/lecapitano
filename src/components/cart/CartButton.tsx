import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartButton() {
  const { items } = useCart();
  const navigate = useNavigate();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <button
      onClick={() => navigate('/cart')}
      className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2"
    >
      <ShoppingCart className="w-6 h-6" />
      <div className="flex flex-col items-start">
        <span className="text-sm">{itemCount} articles</span>
        <span className="font-bold">{total.toFixed(2)}€</span>
      </div>
    </button>
  );
}