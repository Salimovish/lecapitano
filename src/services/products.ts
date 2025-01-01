import { supabase } from '../lib/supabase';
import { Product } from '../types/menu';

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: product.name,
      category: product.category,
      base_price: product.base_price,
      small_price: product.small_price,
      medium_price: product.medium_price,
      large_price: product.large_price,
      image: product.image
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: product.name,
      category: product.category,
      base_price: product.base_price,
      small_price: product.small_price,
      medium_price: product.medium_price,
      large_price: product.large_price,
      image: product.image,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Exporter aussi l'objet ProductService pour la compatibilité
export const ProductService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};