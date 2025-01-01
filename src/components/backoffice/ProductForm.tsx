import React from 'react';
import { useForm } from 'react-hook-form';
import { Product, ProductCategory } from '../../types/menu';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export default function ProductForm({ product, onClose, onSubmit }: ProductFormProps) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: product || {
      category: 'pizza-tomate',
      name: '',
      description: '',
      image: '',
    },
  });

  const category = watch('category');
  const isPizza = category === 'pizza-tomate' || category === 'pizza-creme';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h3 className="text-xl font-semibold mb-4">
          {product ? 'Modifier le produit' : 'Ajouter un produit'}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <select
              {...register('category')}
              className="w-full p-2 border rounded-md"
            >
              <option value="pizza-tomate">Pizza Base Tomate</option>
              <option value="pizza-creme">Pizza Base Crème</option>
              <option value="crepe">Crêpe</option>
              <option value="boisson">Boisson</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register('description')}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              {...register('image')}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {isPizza ? (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prix (Petite)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price.small')}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prix (Moyenne)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price.medium')}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prix (Grande)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price.large')}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Prix</label>
              <input
                type="number"
                step="0.01"
                {...register('price')}
                className="w-full p-2 border rounded-md"
              />
            </div>
          )}

          {category === 'boisson' && (
            <div>
              <label className="block text-sm font-medium mb-1">Volume</label>
              <input
                type="text"
                {...register('volume')}
                className="w-full p-2 border rounded-md"
                placeholder="ex: 33cl"
              />
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              {product ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}