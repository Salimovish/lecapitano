import React from 'react';
import OrderList from '../components/backoffice/OrderList';
import { useOrders } from '../hooks/useOrders';

export default function OrdersPage() {
  const { orders, loading, error } = useOrders();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 p-4">
          <p>{error}</p>
        </div>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
}
