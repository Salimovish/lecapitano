import React from 'react';
import { useMenu } from '../../hooks/useMenu';
import { useCart } from '../../context/CartContext';
import { CartItem as CartItemType } from '../../context/CartContext';
import { useSupplements } from '../../hooks/useSupplements';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { 
    pizzasTomate, 
    pizzasCreme, 
    crepes, 
    boissons 
  } = useMenu();
  const { supplements } = useSupplements();
  const { updateQuantity, removeFromCart } = useCart();

  const allProducts = [
    ...pizzasTomate, 
    ...pizzasCreme, 
    ...crepes, 
    ...boissons,
    ...supplements
  ];

  const product = allProducts.find(p => p.id === item.productId);

  // Si le produit n'est pas trouvé, utiliser les informations de l'item
  if (!product) {
    return (
      <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-gray-700">Prix: {item.price.toFixed(2)}€</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            >
              -
            </button>
            <span className="text-lg font-medium">{item.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg">{(item.price * item.quantity).toFixed(2)}€</p>
            <button
              onClick={() => removeFromCart(item.productId, item.size)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Gestion des prix selon le type de produit
  const getProductPrice = () => {
    if (product.category === 'pizza') {
      switch (item.size) {
        case 'small':
          return product.small_price || 0;
        case 'medium':
          return product.medium_price || 0;
        case 'large':
          return product.large_price || 0;
        default:
          return item.price || 0;
      }
    }
    return product.base_price || item.price || 0;
  };

  const price = getProductPrice();
  const total = price * item.quantity;

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item.productId, item.size, newQuantity);
    } else {
      removeFromCart(item.productId, item.size);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-4">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-20 h-20 object-cover rounded-md"
          />
        )}
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          {item.type === 'pizza' && item.size && (
            <p className="text-gray-600">Taille: {
              item.size === 'small' ? 'Petite' : 
              item.size === 'medium' ? 'Moyenne' : 
              item.size === 'large' ? 'Grande' : 
              item.size
            }</p>
          )}
          {item.options && item.options.length > 0 && (
            <p className="text-gray-600 text-sm">{item.options.join(', ')}</p>
          )}
          <p className="text-gray-700">Prix: {price.toFixed(2)}€</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          >
            -
          </button>
          <span className="text-lg font-medium">{item.quantity}</span>
          <button
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          >
            +
          </button>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">{total.toFixed(2)}€</p>
          <button
            onClick={() => removeFromCart(item.productId, item.size)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}