import { useState, useEffect } from 'react';
import { Product } from '../types/menu';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/products';
import { supabase } from '../lib/supabase';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();

    // Set up real-time subscription
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          loadProducts();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      await createProduct(product);
    } catch (err) {
      console.error('Error creating product:', err);
      throw err;
    }
  };

  const editProduct = async (id: string, product: Partial<Product>) => {
    try {
      await updateProduct(id, product);
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const removeProduct = async (id: string) => {
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    refresh: loadProducts,
    addProduct,
    editProduct,
    removeProduct
  };
}