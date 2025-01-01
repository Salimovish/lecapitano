import React from 'react';
import { X } from 'lucide-react';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';
import { usePizzas } from '../../hooks/usePizzas';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, dispatch, total } = useCart();
  const { pizzas } = usePizzas();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Votre Panier</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-auto">
          {state.items.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">Votre panier est vide</p>
          ) : (
            state.items.map((item) => (
              <CartItem
                key={`${item.pizzaId}-${item.size}`}
                item={item}
                onUpdateQuantity={(quantity) =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { pizzaId: item.pizzaId, size: item.size, quantity },
                  })
                }
                onRemove={() =>
                  dispatch({
                    type: 'REMOVE_ITEM',
                    payload: { pizzaId: item.pizzaId, size: item.size },
                  })
                }
              />
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">{total.toFixed(2)}€</span>
            </div>
            <button
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
              onClick={() => {/* Implement checkout */}}
            >
              Commander
            </button>
          </div>
        )}
      </div>
    </div>
  );
}