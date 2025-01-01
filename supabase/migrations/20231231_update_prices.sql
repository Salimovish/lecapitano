-- Mettre à jour les prix des pizzas
UPDATE products
SET 
    small_price = 10.90,
    medium_price = 13.90,
    large_price = 16.90,
    base_price = 10.90  -- Prix de base = prix small
WHERE category = 'pizza';

-- Mettre à jour les prix des crêpes
UPDATE products
SET base_price = 4.50
WHERE category = 'crepe';

-- Mettre à jour les prix des boissons
UPDATE products
SET base_price = 2.50
WHERE category = 'boisson';
