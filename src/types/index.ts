export interface Pizza {
  id: string;
  name: string;
  ingredients: string[];
  image: string;
  price: {
    small: number;
    medium: number;
    large: number;
  };
}

export interface Crepe {
  id: string;
  name: string;
  ingredients: string[];
  image: string;
  price: {
    small: number;
    medium: number;
    large: number;
  };
}

export interface Boisson {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  instructions?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  paymentMethod: 'card' | 'cash';
  deliveryType: 'delivery' | 'pickup';
  deliveryTime: string;
  address?: Address;
}