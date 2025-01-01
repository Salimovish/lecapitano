export type Size = 'small' | 'medium' | 'large';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  size: Size;
  quantity: number;
  price: number;
  options?: string[];
  category: string;
  supplements?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface Order {
  id: string;
  number: string;
  items: OrderItem[];
  status: OrderStatus;
  deliveryType: 'dine-in' | 'takeaway';
  total: number;
  createdAt: string;
  updatedAt: string;
  customerName: string;
  specialInstructions?: string;
}