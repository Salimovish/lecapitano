import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Pizza, Crepe, Boisson } from '../types';

export function useMenu() {
  const [pizzasTomate, setPizzasTomate] = useState<Pizza[]>([]);
  const [pizzasCreme, setPizzasCreme] = useState<Pizza[]>([]);
  const [crepes, setCrepes] = useState<Crepe[]>([]);
  const [boissons, setBoissons] = useState<Boisson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // Fetch all pizzas and separate them by type
        const { data: pizzasData, error: pizzasError } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'pizza');

        if (pizzasError) throw pizzasError;

        // Séparer les pizzas selon leur type (stocké dans pizza_type)
        const pizzasTomate = pizzasData.filter(p => p.pizza_type === 'pizza-tomate');
        const pizzasCreme = pizzasData.filter(p => p.pizza_type === 'pizza-creme');

        // Fetch Crêpes
        const { data: crepesData, error: crepesError } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'crepe');

        if (crepesError) throw crepesError;

        // Fetch Boissons
        const { data: boissonsData, error: boissonsError } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'boisson');

        if (boissonsError) throw boissonsError;

        setPizzasTomate(pizzasTomate);
        setPizzasCreme(pizzasCreme);
        setCrepes(crepesData);
        setBoissons(boissonsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError('Erreur lors du chargement du menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return {
    pizzasTomate,
    pizzasCreme,
    crepes,
    boissons,
    loading,
    error
  };
}