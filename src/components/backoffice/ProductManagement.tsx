import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { Product } from '../../types/menu';
import { useProducts } from '../../hooks/useProducts';

export default function ProductManagement() {
  const { products, loading, error, addProduct, editProduct, removeProduct } = useProducts();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestion des Produits</h2>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Ajouter un produit
        </button>
      </div>

      {(isAddingProduct || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
          onSubmit={async (data) => {
            try {
              if (editingProduct) {
                await editProduct(editingProduct.id, data);
              } else {
                await addProduct(data);
              }
              setIsAddingProduct(false);
              setEditingProduct(null);
            } catch (err) {
              alert('Une erreur est survenue');
            }
          }}
        />
      )}

      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={async (productId) => {
          if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
              await removeProduct(productId);
            } catch (err) {
              alert('Une erreur est survenue lors de la suppression');
            }
          }
        }}
      />
    </div>
  );
}