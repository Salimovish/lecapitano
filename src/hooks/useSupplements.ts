import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Supplement } from '../types/supplement';

export function useSupplements() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSupplements();
  }, []);

  const fetchSupplements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('supplements')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;

      setSupplements(data || []);
    } catch (err) {
      console.error('Error fetching supplements:', err);
      setError('Erreur lors du chargement des suppléments');
    } finally {
      setLoading(false);
    }
  };

  return { supplements, loading, error };
}
