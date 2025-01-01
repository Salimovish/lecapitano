import React from 'react';
import PizzaCard from './PizzaCard';
import ProductCard from './ProductCard';
import { Pizza, Crepe, Boisson } from '../../types/menu';

interface MenuSectionProps {
  title: string;
  description?: string;
  items: (Pizza | Crepe | Boisson)[];
  onOrder: (productId: string) => void;
}

export default function MenuSection({ title, description, items, onOrder }: MenuSectionProps) {
  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
      {description && (
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          {description}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item) => (
          'category' in item && (item.category === 'pizza-tomate' || item.category === 'pizza-creme') ? (
            <PizzaCard key={item.id} pizza={item as Pizza} onOrder={onOrder} />
          ) : (
            <ProductCard key={item.id} product={item} onOrder={onOrder} />
          )
        ))}
      </div>
    </section>
  );
}