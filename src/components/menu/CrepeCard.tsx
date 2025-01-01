import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crepe } from '../../types/menu';
import CrepeOrderModal from './CrepeOrderModal';

interface CrepeCardProps {
  crepe: Crepe;
}

export default function CrepeCard({ crepe }: CrepeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    console.log('CrepeCard clicked', { crepe, isModalOpen });
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        <div className="relative">
          <img 
            src={crepe.image} 
            alt={crepe.name} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <h3 className="text-lg font-semibold">{crepe.name}</h3>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                {crepe.ingredients.join(', ')}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-red-600">
                {crepe.price}€
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <CrepeOrderModal 
        crepe={crepe} 
        isOpen={isModalOpen} 
        onClose={() => {
          console.log('CrepeOrderModal onClose');
          setIsModalOpen(false);
        }} 
      />
    </>
  );
}
