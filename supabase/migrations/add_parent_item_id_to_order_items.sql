-- Ajouter la colonne parent_item_id à la table order_items
ALTER TABLE order_items 
ADD COLUMN parent_item_id UUID REFERENCES order_items(id);

-- Créer un index pour améliorer les performances de requête
CREATE INDEX idx_order_items_parent_item_id ON order_items(parent_item_id);
