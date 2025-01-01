import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useSupplements } from '../../hooks/useSupplements';
import { Supplement, SupplementCategory, SelectedSupplement } from '../../types/supplement';

interface SupplementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedSupplements: SelectedSupplement[]) => void;
  currentSupplements?: SelectedSupplement[];
}

export default function SupplementsModal({
  isOpen,
  onClose,
  onConfirm,
  currentSupplements = []
}: SupplementsModalProps) {
  const { supplements, loading, error } = useSupplements();
  const [selected, setSelected] = useState<Record<string, SelectedSupplement>>({});

  useEffect(() => {
    // Initialiser avec les suppléments actuels uniquement si le modal est ouvert
    if (isOpen) {
      const initialSelected = currentSupplements.reduce((acc, curr) => ({
        ...acc,
        [curr.id]: curr
      }), {});
      setSelected(initialSelected);
    }
  }, [isOpen, currentSupplements]);

  const handleQuantityChange = (supplement: Supplement, change: number) => {
    setSelected(prev => {
      const current = prev[supplement.id];
      const newQuantity = (current?.quantity || 0) + change;

      if (newQuantity <= 0) {
        const { [supplement.id]: removed, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [supplement.id]: {
          id: supplement.id,
          name: supplement.name,
          quantity: newQuantity,
          price: supplement.price
        }
      };
    });
  };

  const handleConfirm = () => {
    const selectedSupplementsList = Object.values(selected)
      .filter(s => s.quantity > 0)
      .map(supplement => ({
        id: supplement.id,
        name: supplement.name,
        quantity: supplement.quantity,
        price: supplement.price
      }));

    onConfirm(selectedSupplementsList);
    onClose();
  };

  const renderSupplementsByCategory = (category: string) => {
    const categorySupplements = supplements.filter(s => 
      s.category.toLowerCase() === category.toLowerCase() && s.available
    );
    if (categorySupplements.length === 0) return null;

    return (
      <div key={category} className="mb-6">
        <h3 className="text-lg font-semibold mb-3 capitalize">{category}</h3>
        <div className="space-y-2">
          {categorySupplements.map(supplement => (
            <div
              key={supplement.id}
              className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm"
            >
              <div>
                <p className="font-medium">{supplement.name}</p>
                <p className="text-sm text-gray-600">{supplement.price.toFixed(2)}€</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(supplement, -1)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">
                  {selected[supplement.id]?.quantity || 0}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(supplement, 1)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-50 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Ajouter des suppléments</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center p-4">{error}</div>
          ) : (
            <>
              {renderSupplementsByCategory('Viande')}
              {renderSupplementsByCategory('Frommage')}
              {renderSupplementsByCategory('Légume')}
            </>
          )}
        </div>

        <div className="p-4 border-t flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
