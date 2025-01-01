import React from 'react';
import OrderCard from './OrderCard';
import { Order } from '../../types/order';

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedOrders.map(order => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
}