import React from 'react';
import { useCart } from '../../context/CartContext';
import { usePizzas } from '../../hooks/usePizzas';

export default function OrderSummary() {
  const { state } = useCart();
  const { pizzas } = usePizzas();

  const subtotal = state.items.reduce((sum, item) => {
    const pizza = pizzas.find(p => p.id === item.pizzaId);
    return sum + (pizza?.price[item.size] || 0) * item.quantity;
  }, 0);

  const deliveryFee = 3.50;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
      <div className="space-y-4">
        {state.items.map((item) => {
          const pizza = pizzas.find(p => p.id === item.pizzaId);
          if (!pizza) return null;
          
          return (
            <div key={`${item.pizzaId}-${item.size}`} className="flex justify-between">
              <span>
                {pizza.name} ({item.size}) x{item.quantity}
              </span>
              <span>{pizza.price[item.size] * item.quantity}€</span>
            </div>
          );
        })}
        
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Sous-total</span>
            <span>{subtotal}€</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Frais de livraison</span>
            <span>{deliveryFee}€</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{total}€</span>
          </div>
        </div>
      </div>
    </div>
  );
}