import React from 'react';
import { motion } from 'framer-motion';
import { Pizza } from '../../types';

interface PizzaCardProps {
  pizza: Pizza;
  onOrder: (pizzaId: string) => void;
}

export default function PizzaCard({ pizza, onOrder }: PizzaCardProps) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.img
        src={pizza.image}
        alt={pizza.name}
        className="w-full h-36 sm:h-48 object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <div className="p-3 sm:p-4">
        <motion.h3 
          className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {pizza.name}
        </motion.h3>
        <motion.div 
          className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold">{pizza.small_price?.toFixed(2)}€</span>
              {pizza.medium_price && (
                <span className="text-sm text-gray-500">
                  - {pizza.medium_price.toFixed(2)}€
                </span>
              )}
              {pizza.large_price && (
                <span className="text-sm text-gray-500">
                  - {pizza.large_price.toFixed(2)}€
                </span>
              )}
            </div>
            <button
              onClick={() => onOrder(pizza.id)}
              className="w-full sm:w-auto bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              Commander
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}