import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Order, OrderStatus } from '../../types/order';
import { useOrderStore } from '../../stores/orderStore';
import { capitalizeFirstLetter, formatOrderNumber } from '../../utils/string';
import { supabase } from '../../lib/supabase';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  const updateOrderStatus = useOrderStore(state => state.updateOrderStatus);
  const [manualStatus, setManualStatus] = useState(order.status);
  const [error, setError] = useState<string | null>(null);
  const [availableStatuses, setAvailableStatuses] = useState<string[]>([]);

  useEffect(() => {
    async function fetchStatuses() {
      try {
        // Utiliser une requête SQL directe pour obtenir les statuts distincts
        const { data, error } = await supabase
          .rpc('get_distinct_statuses');
        
        if (error) throw error;
        
        if (data && Array.isArray(data)) {
          setAvailableStatuses(data);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des statuts:', err);
      }
    }

    fetchStatuses();
  }, []);

  const handleStatusChange = async (newStatus: Order['status']) => {
    try {
      await updateOrderStatus(order.id, newStatus);
      setError(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
        onClick={handleModalClick}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {formatOrderNumber(order.number)} {order.customerName ? `- ${capitalizeFirstLetter(order.customerName)}` : ''}
            </h2>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleStatusChange('pending')}
                className={`px-4 py-2 rounded-full border ${
                  order.status === 'pending' ? 'bg-yellow-100 border-yellow-500' : ''
                }`}
              >
                ⏳ En attente
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('preparing')}
                className={`px-4 py-2 rounded-full border ${
                  order.status === 'preparing' ? 'bg-blue-100 border-blue-500' : ''
                }`}
              >
                👨‍🍳 En préparation
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('ready')}
                className={`px-4 py-2 rounded-full border ${
                  order.status === 'ready' ? 'bg-green-100 border-green-500' : ''
                }`}
              >
                ✅ Prête
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('completed')}
                className={`px-4 py-2 rounded-full border ${
                  order.status === 'completed' ? 'bg-gray-100 border-gray-500' : ''
                }`}
              >
                🏁 Terminée
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('cancelled')}
                className={`px-4 py-2 rounded-full border ${
                  order.status === 'cancelled' ? 'bg-red-100 border-red-500' : ''
                }`}
              >
                ❌ Annulée
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {order.items.map((item, index) => {
              // Ne garder que les items principaux (pizzas, etc.)
              if (item.type === 'supplement') return null;

              return (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{item.quantity}x</span>
                      <div className="ml-3">
                        <p className="font-medium text-lg">
                          {item.name}
                          {item.size && item.size !== 'standard' && (
                            <span className="text-sm text-gray-600 ml-2">
                              ({item.size})
                            </span>
                          )}
                        </p>
                        {item.options && item.options.length > 0 && (
                          <p className="text-sm text-gray-500">
                            {item.options.join(', ')}
                          </p>
                        )}
                        {item.supplements && item.supplements.length > 0 && (
                          <div className="text-sm text-gray-500 mt-1">
                            {item.supplements.map((supplement, suppIndex) => (
                              <p key={suppIndex}>
                                + {supplement.quantity}x {supplement.name} ({(supplement.quantity * supplement.price).toFixed(2)} €)
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{(item.price).toFixed(2)} €</p>
                  </div>
                </div>
              );
            }).filter(Boolean)}
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mt-4">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">{order.total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
