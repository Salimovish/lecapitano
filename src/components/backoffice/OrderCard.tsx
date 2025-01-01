import React, { useState } from 'react';
import { Clock, ChevronDown, Eye } from 'lucide-react';
import { Order } from '../../types/order';
import { formatDate } from '../../utils/date';
import { capitalizeFirstLetter, formatOrderNumber } from '../../utils/string';
import StatusBadge from './StatusBadge';
import { useOrderStore } from '../../stores/orderStore';
import OrderDetailsModal from '../orders/OrderDetailsModal';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const updateOrderStatus = useOrderStore(state => state.updateOrderStatus);

  console.log('Order data:', order); // Pour déboguer

  const handleStatusChange = async (newStatus: Order['status'], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(' OrderCard: Changement de statut demandé', { orderId: order.id, newStatus });
    try {
      await updateOrderStatus(order.id, newStatus);
      console.log(' OrderCard: Mise à jour effectuée');
      setShowStatusDropdown(false);
    } catch (error) {
      console.error(' OrderCard: Erreur lors de la mise à jour du statut:', error);
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const toggleStatusDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowStatusDropdown(!showStatusDropdown);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleViewDetails}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">
              {formatOrderNumber(order.number)} {order.customerName ? `- ${capitalizeFirstLetter(order.customerName)}` : ''}
            </h3>
            <p className="text-sm text-gray-500 flex items-center">
              <Clock className="w-4 h-4 inline mr-2" />
              {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button 
                type="button"
                className="flex items-center px-3 py-1 rounded-full border hover:bg-gray-50"
                onClick={toggleStatusDropdown}
              >
                <StatusBadge status={order.status} />
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {showStatusDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={(e) => handleStatusChange('pending', e)}
                  >
                    En attente
                  </button>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={(e) => handleStatusChange('preparing', e)}
                  >
                    En préparation
                  </button>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={(e) => handleStatusChange('ready', e)}
                  >
                    Prêt
                  </button>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={(e) => handleStatusChange('completed', e)}
                  >
                    Terminé
                  </button>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={(e) => handleStatusChange('cancelled', e)}
                  >
                    Annulé
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          {order.items.map((item, index) => {
            // Ne garder que les items principaux (pizzas, etc.)
            if (item.type === 'supplement') return null;

            return (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <div className="flex items-center">
                  <span className="font-medium">{item.quantity}x</span>
                  <div className="ml-3">
                    <p className="font-medium">
                      {item.name}
                      {item.size && item.size !== 'standard' && (
                        <span className="text-sm text-gray-500 ml-2">
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
                <p className="font-medium">{(item.price).toFixed(2)} €</p>
              </div>
            );
          }).filter(Boolean)}
          <div className="flex justify-between items-center pt-2 font-bold">
            <span>Total</span>
            <span>{order.total.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <OrderDetailsModal order={order} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}