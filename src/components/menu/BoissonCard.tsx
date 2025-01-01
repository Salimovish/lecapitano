import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Boisson } from '../../types';
import BoissionOrderModal from './BoissionOrderModal';

interface BoissonCardProps {
  boisson: Boisson;
}

export default function BoissonCard({ boisson }: BoissonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    console.log('BoissonCard clicked', { boisson, isModalOpen });
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative">
          <img 
            src={boisson.image} 
            alt={boisson.name} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <h3 className="text-lg font-semibold">{boisson.name}</h3>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="text-right w-full">
              <span className="text-xl font-bold text-red-600">
                {boisson.price}€
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <BoissionOrderModal 
        boisson={boisson} 
        isOpen={isModalOpen} 
        onClose={() => {
          console.log('BoissionOrderModal onClose');
          setIsModalOpen(false);
        }} 
      />
    </>
  );
}
