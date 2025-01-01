import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMenu } from '../hooks/useMenu';
import PizzaCard from '../components/menu/PizzaCard';
import CrepeCard from '../components/menu/CrepeCard';
import BoissonCard from '../components/menu/BoissonCard';
import { useCart } from '../context/CartContext';

export default function MenuPage() {
  const { pizzasTomate, pizzasCreme, crepes, boissons, loading, error } = useMenu();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<'pizzas' | 'crepes' | 'boissons'>('pizzas');

  const categories = [
    { name: 'Pizzas', value: 'pizzas' },
    { name: 'Crêpes', value: 'crepes' },
    { name: 'Boissons', value: 'boissons' }
  ];

  const handleAddToCart = (productId: string, category: 'pizza' | 'crepe' | 'boisson') => {
    addToCart({
      productId,
      category,
      size: 'medium', // Default size
      quantity: 1
    });
  };

  const renderProducts = () => {
    switch (activeCategory) {
      case 'pizzas':
        return [
          ...pizzasTomate.map(pizza => (
            <PizzaCard key={`tomate-${pizza.id}`} pizza={pizza} onOrder={(pizzaId) => handleAddToCart(pizzaId, 'pizza')} />
          )),
          ...pizzasCreme.map(pizza => (
            <PizzaCard key={`creme-${pizza.id}`} pizza={pizza} onOrder={(pizzaId) => handleAddToCart(pizzaId, 'pizza')} />
          ))
        ];
      case 'crepes':
        return crepes.map(crepe => (
          <CrepeCard key={crepe.id} crepe={crepe} onOrder={(crepeId) => handleAddToCart(crepeId, 'crepe')} />
        ));
      case 'boissons':
        return boissons.map(boisson => (
          <BoissonCard key={boisson.id} boisson={boisson} onOrder={(boissonId) => handleAddToCart(boissonId, 'boisson')} />
        ));
    }
  };

  if (loading) return <div>Chargement du menu...</div>;
  if (error) return <div>Erreur de chargement : {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Notre Menu</h1>

      <div className="mb-8 flex justify-center space-x-4">
        {categories.map(category => (
          <motion.button
            key={category.value}
            onClick={() => setActiveCategory(category.value as any)}
            className={`
              px-6 py-2 rounded-lg transition-colors
              ${activeCategory === category.value 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {renderProducts()}
      </div>
    </div>
  );
}
