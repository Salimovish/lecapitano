import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import DeliveryTypeSelector from '../components/cart/DeliveryTypeSelector';

export default function CartPage() {
  const { items, createOrder, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    console.log('Éléments du panier :', items);
    const pizzaItems = items.filter(item => item.type === 'pizza');
    const supplementItems = items.filter(item => item.type === 'supplement');
    
    console.log('Pizzas dans le panier :', pizzaItems);
    console.log('Suppléments dans le panier :', supplementItems);
  }, [items]);

  const handleConfirmOrder = async () => {
    if (!customerName.trim()) {
      alert('Veuillez saisir votre prénom');
      return;
    }

    try {
      console.log('Création de la commande avec :', {
        deliveryType,
        customerName,
        specialInstructions
      });

      setIsProcessing(true);
      
      await createOrder(deliveryType, customerName, specialInstructions);

      clearCart();
      navigate('/');
      alert('Commande confirmée !');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Une erreur est survenue lors de la création de la commande');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-gray-600 mb-4">Ajoutez des produits à votre panier pour commencer votre commande.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Retour au menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Votre Panier</h1>

      <DeliveryTypeSelector 
        selectedType={deliveryType}
        onSelectType={setDeliveryType}
      />

      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <CartItem 
            key={`${item.productId}-${item.size}-${index}`} 
            item={item} 
          />
        ))}
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            Votre prénom *
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
            Instructions spéciales (optionnel)
          </label>
          <textarea
            id="specialInstructions"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Ex: Allergies, préférences de cuisson..."
          />
        </div>
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-xl font-bold">Total</span>
        <span className="text-2xl font-bold">{total.toFixed(2)}€</span>
      </div>

      <button
        onClick={handleConfirmOrder}
        disabled={isProcessing}
        className={`
          w-full mt-6 py-3 rounded-lg text-white font-semibold
          ${isProcessing 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-red-600 hover:bg-red-700'}
        `}
      >
        {isProcessing ? 'Traitement...' : 'Confirmer la commande'}
      </button>
    </div>
  );
}