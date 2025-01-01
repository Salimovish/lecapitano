-- Ajouter la colonne type à la table order_items
ALTER TABLE order_items 
ADD COLUMN type TEXT CHECK (type IN ('pizza', 'supplement', 'boisson', 'crepe'));
