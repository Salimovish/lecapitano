export type SupplementCategory = 'viande' | 'fromage' | 'légume';

export interface Supplement {
  id: string;
  name: string;
  price: number;
  category: SupplementCategory;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface SelectedSupplement {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
