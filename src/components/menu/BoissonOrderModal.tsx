import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Boisson } from '../../types/menu';

interface BoissonOrderModalProps {
  boisson: Boisson;
  isOpen: boolean;
  onClose: () => void;
}

export default function BoissonOrderModal({ boisson, isOpen, onClose }: BoissonOrderModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Vérifier si le prix est défini et valide
  const price = typeof boisson?.base_price === 'number' ? boisson.base_price : 0;
  const total = price * quantity;

  const handleAddToCart = () => {
    if (!boisson) return;
    
    addToCart({
      productId: boisson.id,
      name: boisson.name,
      size: selectedSize,
      price: price,
      quantity,
      image: boisson.image
    });
    onClose();
  };

  if (!boisson) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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

                  <h2 className="text-2xl font-bold mb-4">{boisson.name}</h2>
                  
                  {boisson.image && (
                    <div className="mb-4">
                      <img 
                        src={boisson.image} 
                        alt={boisson.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {boisson.volume && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Volume</h3>
                      <p className="text-gray-600">{boisson.volume}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Prix unitaire</h3>
                    <p className="text-lg font-medium">{price.toFixed(2)}€</p>
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
                    onClick={handleAddToCart}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
