import React from 'react';
import { Crepe, Boisson } from '../../types/menu';

interface ProductCardProps {
  product: Crepe | Boisson;
  onOrder: (productId: string) => void;
}

export default function ProductCard({ product, onOrder }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-36 sm:h-48 object-cover"
      />
      <div className="p-3 sm:p-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{product.name}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">{product.description}</p>
        {'volume' in product && (
          <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Volume: {product.volume}</p>
        )}
        {'ingredients' in product && product.ingredients && product.ingredients.length > 0 && (
          <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
            Ingrédients: {product.ingredients.join(', ')}
          </p>
        )}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className="text-base sm:text-lg font-bold">{product.base_price.toFixed(2)}€</span>
          <button 
            onClick={() => onOrder(product.id)}
            className="w-full sm:w-auto bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}