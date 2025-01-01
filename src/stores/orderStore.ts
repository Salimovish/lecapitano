import { create } from 'zustand';
import { Order } from '../types/order';
import { OrderService } from '../services/orders';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  pollingInterval: NodeJS.Timeout | null;
  fetchOrders: () => Promise<void>;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  startPolling: () => void;
  stopPolling: () => void;
}

const newOrderSound = new Audio('/sounds/new-order.mp3');

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,
  pollingInterval: null,

  fetchOrders: async () => {
    try {
      set({ isLoading: true, error: null });
      const allOrders = await OrderService.getOrders();
      
      // Trier les commandes par date de création (plus récentes en premier)
      const sortedOrders = allOrders.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      // Vérifier s'il y a de nouvelles commandes
      const currentOrderCount = sortedOrders.length;
      if (currentOrderCount > get().orders.length) {
        // Jouer le son de notification
        newOrderSound.play().catch(error => {
          console.warn('Erreur lors de la lecture du son de notification:', error);
        });
      }

      set({ orders: sortedOrders });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
    } finally {
      set({ isLoading: false });
    }
  },

  addOrder: (newOrder) => {
    set((state) => {
      // Vérifier si la commande n'existe pas déjà
      const exists = state.orders.some(order => order.id === newOrder.id);
      if (!exists) {
        return { orders: [newOrder, ...state.orders] };
      }
      return state;
    });
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      await OrderService.updateOrderStatus(orderId, status);
      
      if (status === 'completed' || status === 'cancelled') {
        // Remove the order from the store if it's completed or cancelled
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId)
        }));
      } else {
        // Just update the status if it's another status
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        }));
      }
      
      // Désactiver temporairement le polling pour éviter la double mise à jour
      const currentPolling = get().pollingInterval;
      if (currentPolling) {
        clearInterval(currentPolling);
        setTimeout(() => {
          get().startPolling();
        }, 5000); // Redémarrer le polling après 5 secondes
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'An error occurred while updating order status' });
    }
  },

  startPolling: () => {
    const currentPolling = get().pollingInterval;
    if (currentPolling) {
      clearInterval(currentPolling);
    }

    const interval = setInterval(async () => {
      const currentOrders = get().orders;
      try {
        const newOrders = await OrderService.getOrders();
        const sortedNewOrders = newOrders.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // Vérifier si les commandes ont changé
        const hasChanges = sortedNewOrders.some((newOrder, index) => {
          const currentOrder = currentOrders[index];
          if (!currentOrder) return true; // Nouvelle commande
          
          // Vérifier si le statut ou la date de mise à jour a changé
          return currentOrder.status !== newOrder.status || 
                 new Date(currentOrder.updatedAt).getTime() !== new Date(newOrder.updatedAt).getTime();
        });

        if (hasChanges) {
          // Vérifier s'il y a de nouvelles commandes
          const currentOrderCount = sortedNewOrders.length;
          if (currentOrderCount > get().orders.length) {
            // Jouer le son de notification
            newOrderSound.play().catch(error => {
              console.warn('Erreur lors de la lecture du son de notification:', error);
            });
          }

          set({ orders: sortedNewOrders });
        }
      } catch (error) {
        console.error('Erreur lors du polling:', error);
      }
    }, 5000);

    set({ pollingInterval: interval });
  },

  stopPolling: () => {
    const currentPolling = get().pollingInterval;
    if (currentPolling) {
      clearInterval(currentPolling);
      set({ pollingInterval: null });
    }
  },
}));
