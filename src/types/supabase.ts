export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          category: 'pizza' | 'crepe' | 'boisson'
          base_price: number
          small_price: number | null
          medium_price: number | null
          large_price: number | null
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: 'pizza' | 'crepe' | 'boisson'
          base_price: number
          small_price?: number | null
          medium_price?: number | null
          large_price?: number | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: 'pizza' | 'crepe' | 'boisson'
          base_price?: number
          small_price?: number | null
          medium_price?: number | null
          large_price?: number | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          number: string
          status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
          delivery_type: 'dine-in' | 'takeaway'
          total: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          number: string
          status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
          delivery_type: 'dine-in' | 'takeaway'
          total: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          number?: string
          status?: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
          delivery_type?: 'dine-in' | 'takeaway'
          total?: number
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          size: 'small' | 'medium' | 'large' | null
          quantity: number
          unit_price: number
          options: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          size?: 'small' | 'medium' | 'large' | null
          quantity: number
          unit_price: number
          options?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          size?: 'small' | 'medium' | 'large' | null
          quantity?: number
          unit_price?: number
          options?: Json | null
          created_at?: string
        }
      }
    }
  }
}