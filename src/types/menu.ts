export type Category = 'pizza' | 'crepe' | 'boisson';
export type Size = 'small' | 'medium' | 'large';

export interface Product {
  id: string;
  name: string;
  category: Category;
  base_price: number; // Prix de base pour crêpes et boissons
  small_price?: number; // Prix pour les pizzas petites
  medium_price?: number; // Prix pour les pizzas moyennes
  large_price?: number; // Prix pour les pizzas grandes
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number | { [key in Size]?: number };
  image?: string;
}

// Helper function to get price based on category and size
export const getPrice = (product: Product | undefined, size?: Size | 'standard'): number => {
  // Gestion des suppléments
  if (!product) return 0;

  if (product.category === 'pizza' && size) {
    switch (size) {
      case 'small':
        return product.small_price || 0;
      case 'medium':
        return product.medium_price || 0;
      case 'large':
        return product.large_price || 0;
      default:
        return 0;
    }
  }
  
  // Pour les suppléments et autres produits
  return product.base_price;
};