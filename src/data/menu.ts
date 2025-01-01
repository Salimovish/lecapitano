import { Pizza, Crepe, Boisson } from '../types/menu';

export const pizzas: Pizza[] = [
  // Pizzas sauce tomate
  {
    id: '1',
    category: 'pizza-tomate',
    name: 'Margherita',
    description: 'La classique italienne avec sauce tomate, mozzarella et basilic frais',
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
    category: 'pizza-tomate',
    name: 'Diavola',
    description: 'Pour les amateurs de piment avec sauce tomate, mozzarella et salami piquant',
    price: {
      small: 12,
      medium: 15,
      large: 18
    },
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80',
    tags: ['Épicée', 'Populaire'],
    ingredients: ['sauce tomate', 'mozzarella', 'salami piquant']
  },
  // Pizzas crème fraîche
  {
    id: '3',
    category: 'pizza-creme',
    name: 'Quattro Formaggi',
    description: 'Un délice crémeux avec quatre fromages italiens',
    price: {
      small: 13,
      medium: 16,
      large: 19
    },
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80',
    tags: ['Végétarienne', 'Nouveauté'],
    ingredients: ['crème fraîche', 'mozzarella', 'gorgonzola', 'parmesan', 'chèvre']
  }
];

export const crepes: Crepe[] = [
  {
    id: 'c1',
    category: 'crepe',
    name: 'Nutella',
    description: 'Crêpe au Nutella',
    price: 4.5,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80',
    ingredients: ['pâte à crêpe', 'nutella']
  },
  {
    id: 'c2',
    category: 'crepe',
    name: 'Beurre Sucre',
    description: 'La traditionnelle au beurre et sucre',
    price: 3.5,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80',
    ingredients: ['pâte à crêpe', 'beurre', 'sucre']
  }
];

export const boissons: Boisson[] = [
  {
    id: 'b1',
    category: 'boisson',
    name: 'Coca-Cola',
    description: 'Coca-Cola classique',
    price: 3,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80',
    volume: '33cl'
  },
  {
    id: 'b2',
    category: 'boisson',
    name: 'Eau minérale',
    description: 'Eau minérale naturelle',
    price: 2,
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80',
    volume: '50cl'
  }
];