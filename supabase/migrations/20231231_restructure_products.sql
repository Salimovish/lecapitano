-- Sauvegarder les données existantes dans une table temporaire
CREATE TEMP TABLE products_temp AS 
SELECT id, category AS old_category 
FROM products;

-- Ajouter une colonne temporaire pour stocker l'ancien type de pizza
ALTER TABLE products
ADD COLUMN IF NOT EXISTS pizza_type TEXT;

-- Sauvegarder le type de pizza avant de modifier la catégorie
UPDATE products
SET pizza_type = category
WHERE category IN ('pizza-creme', 'pizza-tomate');

-- Ajouter la nouvelle colonne category sans contrainte
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS new_category TEXT;

-- Mettre à jour les catégories
UPDATE products 
SET new_category = CASE 
    WHEN category IN ('pizza-creme', 'pizza-tomate') THEN 'pizza'
    ELSE category 
END;

-- Vérifier qu'il n'y a pas de catégories invalides
SELECT id, name, new_category FROM products 
WHERE new_category NOT IN ('pizza', 'crepe', 'boisson');

-- Vérifier que toutes les catégories sont valides
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM products WHERE new_category NOT IN ('pizza', 'crepe', 'boisson')) THEN
        RAISE EXCEPTION 'Il existe des produits avec des catégories invalides';
    END IF;
END $$;

-- Supprimer l'ancienne colonne category et renommer new_category
ALTER TABLE products DROP COLUMN category;
ALTER TABLE products RENAME COLUMN new_category TO category;

-- Ajouter la contrainte sur la catégorie
ALTER TABLE products 
ADD CONSTRAINT products_category_check 
CHECK (category IN ('pizza', 'crepe', 'boisson'));
