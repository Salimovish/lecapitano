import { useMenu } from './useMenu';
import { Pizza } from '../types';

// Temporary mock data - will be replaced with API calls
const MOCK_PIZZAS: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Sauce tomate, mozzarella, basilic frais',
    price: {
      small: 10,
      medium: 13,
      large: 16
    },
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80',
    tags: ['Végétarienne', 'Populaire'],
    ingredients: ['sauce tomate', 'mozzarella', 'basilic']
  },
  {
    id: '2',
    name: 'Diavola',
    description: 'Sauce tomate, mozzarella, salami piquant',
    price: {
      small: 12,
      medium: 15,
      large: 18
    },
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80',
    tags: ['Épicée', 'Populaire'],
    ingredients: ['sauce tomate', 'mozzarella', 'salami piquant']
  },
  {
    id: '3',
    name: 'Quattro Formaggi',
    description: 'Mozzarella, gorgonzola, parmesan, chèvre',
    price: {
      small: 13,
      medium: 16,
      large: 19
    },
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80',
    tags: ['Végétarienne', 'Nouveauté'],
    ingredients: ['mozzarella', 'gorgonzola', 'parmesan', 'chèvre']
  }
];

export function usePizzas() {
  const { pizzasTomate, pizzasCreme, loading, error } = useMenu();
  const pizzas = [...pizzasTomate, ...pizzasCreme];

  return {
    pizzas,
    loading,
    error
  };
}