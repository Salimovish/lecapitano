import React, { useState, useRef } from 'react';
import MenuSection from './MenuSection';
import PizzaOrderModal from './PizzaOrderModal';
import CrepeOrderModal from './CrepeOrderModal';
import BoissonOrderModal from './BoissonOrderModal';
import SupplementsModal from './SupplementsModal';
import MenuNavigation from './MenuNavigation';
import { useMenu } from '../../hooks/useMenu';
import { Pizza, Crepe, Boisson } from '../../types/menu';

export default function PizzaMenu() {
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [selectedCrepe, setSelectedCrepe] = useState<Crepe | null>(null);
  const [selectedBoisson, setSelectedBoisson] = useState<Boisson | null>(null);
  const [showSupplementsModal, setShowSupplementsModal] = useState(false);
  const { pizzasTomate, pizzasCreme, crepes, boissons, loading, error } = useMenu();

  const sectionsRef = {
    'pizzas-tomate': useRef<HTMLDivElement>(null),
    'pizzas-creme': useRef<HTMLDivElement>(null),
    'crepes': useRef<HTMLDivElement>(null),
    'boissons': useRef<HTMLDivElement>(null),
  };

  const handlePizzaOrder = (id: string, category: 'pizza-tomate' | 'pizza-creme') => {
    const pizzaList = category === 'pizza-tomate' ? pizzasTomate : pizzasCreme;
    const pizza = pizzaList.find(p => p.id === id);
    if (pizza) setSelectedPizza(pizza);
  };

  const handleCrepeOrder = (id: string) => {
    const crepe = crepes.find(c => c.id === id);
    if (crepe) setSelectedCrepe(crepe);
  };

  const handleBoissonOrder = (id: string) => {
    const boisson = boissons.find(b => b.id === id);
    if (boisson) setSelectedBoisson(boisson);
  };

  const scrollToSection = (sectionId: string) => {
    sectionsRef[sectionId as keyof typeof sectionsRef]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erreur de chargement :</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col md:flex-row">
      <div className="md:sticky md:top-0 md:h-screen w-full md:w-64 md:flex-shrink-0 bg-white shadow-md z-10">
        <MenuNavigation onNavigate={scrollToSection} />
      </div>
      
      <div className="flex-grow px-4 md:px-8">
        {pizzasTomate.length > 0 && (
          <div ref={sectionsRef['pizzas-tomate']}>
            <MenuSection
              title="Pizzas Base Tomate"
              description="Nos délicieuses pizzas avec sauce tomate"
              items={pizzasTomate}
              onOrder={(id) => handlePizzaOrder(id, 'pizza-tomate')}
            />
          </div>
        )}

        {pizzasCreme.length > 0 && (
          <div ref={sectionsRef['pizzas-creme']}>
            <MenuSection
              title="Pizzas Base Crème"
              description="Nos savoureuses pizzas avec base crème fraîche"
              items={pizzasCreme}
              onOrder={(id) => handlePizzaOrder(id, 'pizza-creme')}
            />
          </div>
        )}

        <div ref={sectionsRef['crepes']}>
          <MenuSection
            title="Crêpes"
            description="Nos crêpes sucrées"
            items={crepes}
            onOrder={handleCrepeOrder}
          />
        </div>

        <div ref={sectionsRef['boissons']}>
          <MenuSection
            title="Boissons"
            description="Nos boissons fraîches"
            items={boissons}
            onOrder={handleBoissonOrder}
          />
        </div>
      </div>

      {selectedPizza && (
        <PizzaOrderModal
          pizza={selectedPizza}
          isOpen={!!selectedPizza}
          onClose={() => setSelectedPizza(null)}
        />
      )}

      {selectedCrepe && (
        <CrepeOrderModal
          crepe={selectedCrepe}
          isOpen={!!selectedCrepe}
          onClose={() => setSelectedCrepe(null)}
        />
      )}

      {selectedBoisson && (
        <BoissonOrderModal
          boisson={selectedBoisson}
          isOpen={!!selectedBoisson}
          onClose={() => setSelectedBoisson(null)}
        />
      )}

      <SupplementsModal
        isOpen={showSupplementsModal}
        onClose={() => setShowSupplementsModal(false)}
        onConfirm={(supplements) => {
          // Logique à définir
          setShowSupplementsModal(false);
        }}
      />
    </div>
  );
}