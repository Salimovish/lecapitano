import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Product } from '../../types/menu';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => Promise<void>;
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500 capitalize">
                  {product.category.replace('-', ' ')}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            {'price' in product && typeof product.price === 'object' ? (
              <div className="text-sm">
                <p>Petite: {product.price.small}€</p>
                <p>Moyenne: {product.price.medium}€</p>
                <p>Grande: {product.price.large}€</p>
              </div>
            ) : (
              <p className="font-semibold">{product.price}€</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}