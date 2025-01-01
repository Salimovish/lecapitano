import React, { createContext, useState, useContext, ReactNode, useReducer } from 'react';
import { OrderService } from '../services/orders';
import { PizzaSupplementLink } from '../types/pizza-supplement';

export interface CartItem {
  productId: string;
  name: string;
  size: 'small' | 'medium' | 'large' | 'standard';
  price: number;
  quantity: number;
  image?: string;
  options?: string[];
  type: 'pizza' | 'supplement';
  supplements?: PizzaSupplementLink[];
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  createOrder: (
    deliveryType: 'dine-in' | 'takeaway',
    customerName: string,
    specialInstructions?: string
  ) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: { items: CartItem[] }, action: any) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        items: state.items.concat(action.payload)
      };
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(item => 
          !(item.productId === action.payload.productId && item.size === action.payload.size)
        )
      };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map(item => 
          item.productId === action.payload.productId && item.size === action.payload.size 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };
    case 'CLEAR_CART':
      return {
        items: []
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const total = state.items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    console.log(`Calcul du total - Item: ${item.name}, Prix: ${item.price}, Quantité: ${item.quantity}, Total: ${itemTotal}`);
    return sum + itemTotal;
  }, 0);

  const addToCart = (newItem: CartItem) => {
    console.error('DEBUG: Ajout au panier dans le contexte', {
      newItem,
      currentItems: state.items
    });
    
    // Vérifier si un élément similaire existe déjà
    const existingItemIndex = state.items.findIndex(
      item => 
        // Pour les pizzas, vérifier productId, size et options
        (newItem.type === 'pizza' && 
          item.type === 'pizza' && 
          item.productId === newItem.productId && 
          item.size === newItem.size &&
          JSON.stringify(item.options || []) === JSON.stringify(newItem.options || [])) ||
        
        // Pour les suppléments, vérifier productId et options de la pizza parent
        (newItem.type === 'supplement' && 
          item.type === 'supplement' && 
          item.productId === newItem.productId &&
          JSON.stringify(item.options || []) === JSON.stringify(newItem.options || []))
    );

    console.error('DEBUG: Recherche élément existant', {
      existingItemIndex,
      existingItem: existingItemIndex !== -1 ? state.items[existingItemIndex] : null
    });

    if (existingItemIndex !== -1) {
      // Si l'élément existe, mettre à jour la quantité
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
      };
      dispatch({ type: 'CLEAR_CART' });
      updatedItems.forEach(item => dispatch({ type: 'ADD_ITEM', payload: item }));
    } else {
      // Sinon, ajouter un nouvel élément
      dispatch({ type: 'ADD_ITEM', payload: newItem });
    }

    console.error('État du panier après ajout :', state.items);
  };

  const removeFromCart = (productId: string, size: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } });
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const createOrder = async (
    deliveryType: 'dine-in' | 'takeaway',
    customerName: string,
    specialInstructions?: string
  ) => {
    try {
      const orderItems = state.items.map(item => ({
        productId: item.productId,
        size: item.size,
        quantity: item.quantity,
        options: item.options,
        type: item.type,
        price: item.price,
        supplements: item.supplements
      }));

      console.log('Éléments de la commande :', orderItems);

      const calculatedTotal = orderItems.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0);

      console.log('Total calculé :', calculatedTotal);
      console.log('Total du contexte :', total);

      await OrderService.createOrder({
        items: orderItems,
        total: calculatedTotal,
        deliveryType,
        customerName,
        specialInstructions
      });

      // Clear cart after successful order
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        createOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};