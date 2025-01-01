import { useEffect } from 'react';
import { useOrderStore } from '../stores/orderStore';

export function useOrders() {
  const {
    orders,
    isLoading,
    error,
    fetchOrders,
    updateOrderStatus,
    startPolling,
    stopPolling
  } = useOrderStore();

  useEffect(() => {
    console.log(' Initialisation du hook useOrders');
    fetchOrders();
    startPolling();

    return () => {
      console.log(' Nettoyage du hook useOrders');
      stopPolling();
    };
  }, [fetchOrders, startPolling, stopPolling]);

  return {
    orders,
    loading: isLoading,
    error,
    updateStatus: updateOrderStatus
  };
}