import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Pizza } from '../../types/pizza';
import { Size } from '../../types/order';
import { SelectedSupplement } from '../../types/supplement';
import SupplementsModal from './SupplementsModal';

interface PizzaModalProps {
  pizza: Pizza;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (size: Size, supplements: SelectedSupplement[]) => void;
}

export default function PizzaModal({ pizza, isOpen, onClose, onAddToCart }: PizzaModalProps) {
  const [selectedSize, setSelectedSize] = useState<Size>('normale');
  const [showSupplementsModal, setShowSupplementsModal] = useState(false);
  const [selectedSupplements, setSelectedSupplements] = useState<SelectedSupplement[]>([]);

  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
  };

  const handleSupplementsConfirm = (supplements: SelectedSupplement[]) => {
    setSelectedSupplements(supplements);
    setShowSupplementsModal(false);
  };

  const handleAddToCart = () => {
    onAddToCart(selectedSize, selectedSupplements);
    onClose();
  };

  const calculateTotal = () => {
    const basePrice = getPrice(selectedSize);
    const supplementsTotal = selectedSupplements.reduce(
      (total, supp) => total + (supp.price * supp.quantity),
      0
    );
    return basePrice + supplementsTotal;
  };

  if (!isOpen) return null;

  const getPrice = (size: Size) => {
    switch (size) {
      case 'petite':
        return pizza.price - 2;
      case 'grande':
        return pizza.price + 2;
      default:
        return pizza.price;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          <div className="relative">
            <img
              src={pizza.image_url}
              alt={pizza.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{pizza.name}</h2>
            <p className="text-gray-600 mb-4">{pizza.description}</p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choisissez votre taille</h3>
              <div className="grid grid-cols-3 gap-4">
                {(['petite', 'normale', 'grande'] as Size[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`p-3 text-center rounded-lg border ${
                      selectedSize === size
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-200 hover:border-red-600 hover:bg-red-50'
                    }`}
                  >
                    <div className="font-medium capitalize">{size}</div>
                    <div className="text-sm">{getPrice(size).toFixed(2)}€</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowSupplementsModal(true)}
                className="w-full p-3 flex items-center justify-center space-x-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
              >
                <Plus className="w-5 h-5" />
                <span>Ajouter des suppléments</span>
              </button>

              {selectedSupplements.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Suppléments sélectionnés:</h4>
                  <div className="space-y-2">
                    {selectedSupplements.map((supp) => (
                      <div key={supp.id} className="flex justify-between items-center text-sm">
                        <span>{supp.name} (x{supp.quantity})</span>
                        <span>{(supp.price * supp.quantity).toFixed(2)}€</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>{calculateTotal().toFixed(2)}€</span>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!selectedSupplements.length}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>

      <SupplementsModal
        isOpen={showSupplementsModal}
        onClose={() => setShowSupplementsModal(false)}
        onConfirm={handleSupplementsConfirm}
        currentSupplements={selectedSupplements}
      />
    </>
  );
}
