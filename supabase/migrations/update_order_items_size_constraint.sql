-- Mettre à jour la contrainte de taille pour autoriser 'standard'
ALTER TABLE order_items 
DROP CONSTRAINT IF EXISTS order_items_size_check;

ALTER TABLE order_items 
ADD CONSTRAINT order_items_size_check 
CHECK (size IN ('small', 'medium', 'large', 'standard'));
