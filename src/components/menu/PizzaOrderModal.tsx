import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pizza } from '../../types';
import { useCart } from '../../context/CartContext';
import { Size } from '../../types/order';
import SupplementsModal from './SupplementsModal';
import { SelectedSupplement } from '../../types/supplement';

interface PizzaOrderModalProps {
  pizza: Pizza;
  isOpen: boolean;
  onClose: () => void;
}

export default function PizzaOrderModal({ pizza, isOpen, onClose }: PizzaOrderModalProps) {
  const { addToCart } = useCart();
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [quantity, setQuantity] = useState(1);
  const [selectedCrust, setSelectedCrust] = useState<'normal' | 'mozza' | 'boursin'>('normal');
  const [showSupplementsModal, setShowSupplementsModal] = useState(false);
  const [selectedSupplements, setSelectedSupplements] = useState<SelectedSupplement[]>([]);

  useEffect(() => {
    if (size === 'small') {
      setSelectedCrust('normal');
    }
  }, [size]);

  const basePrice = size === 'small' ? pizza.small_price : 
                   size === 'medium' ? pizza.medium_price : 
                   pizza.large_price || 0;

  const crustPrices = {
    'normal': 0,
    'mozza': size === 'small' ? 0 : size === 'medium' ? 2 : 3,
    'boursin': size === 'small' ? 0 : size === 'medium' ? 2 : 3
  };

  const unitPrice = basePrice + crustPrices[selectedCrust];
  const total = unitPrice * quantity;

  const handleOpenSupplementsModal = () => {
    setShowSupplementsModal(true);
  };

  const handleSupplementsConfirm = (supplements: SelectedSupplement[]) => {
    setSelectedSupplements(supplements);
    setShowSupplementsModal(false);
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: pizza.id,
      name: pizza.name,
      size,
      price: unitPrice,
      quantity,
      image: pizza.image,
      options: selectedCrust !== 'normal' ? [`Croûte ${selectedCrust}`] : [],
      type: 'pizza',
      supplements: selectedSupplements.map(supplement => ({
        pizzaId: pizza.id,
        supplementId: supplement.id,
        quantity: supplement.quantity
      }))
    };

    console.error('DEBUG: Ajout au panier', {
      pizza: pizza,
      size: size,
      unitPrice: unitPrice,
      quantity: quantity,
      selectedCrust: selectedCrust,
      selectedSupplements: selectedSupplements,
      cartItem: cartItem
    });

    // Ajouter la pizza
    addToCart(cartItem);

    // Ajouter les suppléments séparément
    selectedSupplements.forEach(supplement => {
      addToCart({
        productId: supplement.id,
        name: supplement.name,
        size: 'standard',
        price: supplement.price,
        quantity: supplement.quantity,
        type: 'supplement',
        options: [`Supplément de ${pizza.name}`]
      });
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment key={pizza.id}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-y-auto max-h-[90vh]"
            >
              <div className="p-6">
                <div className="relative">
                  <button
                    onClick={onClose}
                    className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <h2 className="text-2xl font-bold mb-4">{pizza.name}</h2>
                  
                  {pizza.image && (
                    <div className="mb-4">
                      <img 
                        src={pizza.image} 
                        alt={pizza.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Taille</h3>
                    <div className="flex gap-2">
                      {pizza.small_price && (
                        <button
                          className={`px-4 py-2 rounded ${size === 'small' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                          onClick={() => setSize('small')}
                        >
                          Petite
                        </button>
                      )}
                      {pizza.medium_price && (
                        <button
                          className={`px-4 py-2 rounded ${size === 'medium' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                          onClick={() => setSize('medium')}
                        >
                          Moyenne
                        </button>
                      )}
                      {pizza.large_price && (
                        <button
                          className={`px-4 py-2 rounded ${size === 'large' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                          onClick={() => setSize('large')}
                        >
                          Grande
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Croûte</h3>
                    <div className="flex gap-2">
                      <button
                        className={`px-4 py-2 rounded ${selectedCrust === 'normal' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                        onClick={() => setSelectedCrust('normal')}
                      >
                        Normale
                      </button>
                      <button
                        className={`px-4 py-2 rounded ${
                          selectedCrust === 'mozza' ? 'bg-red-600 text-white' : 'bg-gray-100'
                        } ${size === 'small' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => size !== 'small' && setSelectedCrust('mozza')}
                        disabled={size === 'small'}
                      >
                        Mozzarella {size !== 'small' && `(+${crustPrices.mozza}€)`}
                      </button>
                      <button
                        className={`px-4 py-2 rounded ${
                          selectedCrust === 'boursin' ? 'bg-red-600 text-white' : 'bg-gray-100'
                        } ${size === 'small' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => size !== 'small' && setSelectedCrust('boursin')}
                        disabled={size === 'small'}
                      >
                        Boursin {size !== 'small' && `(+${crustPrices.boursin}€)`}
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Quantité</h3>
                    <div className="flex items-center gap-4">
                      <button
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">{quantity}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold">{total.toFixed(2)}€</span>
                  </div>

                  <button
                    onClick={handleOpenSupplementsModal}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors mb-4"
                  >
                    Ajouter des suppléments
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </React.Fragment>
      )}
      <SupplementsModal
        isOpen={showSupplementsModal}
        onClose={() => setShowSupplementsModal(false)}
        onConfirm={handleSupplementsConfirm}
        currentSupplements={selectedSupplements}
      />
    </AnimatePresence>
  );
}