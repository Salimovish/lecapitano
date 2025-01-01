import React from 'react';
import { Pizza as PizzaIcon, Star, Clock } from 'lucide-react';
import PizzaMenu from '../components/menu/PizzaMenu';

export default function HomePage() {
  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[500px] -mt-8">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80"
            alt="Pizza"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white p-4">
          <div className="w-full max-w-md">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4">
              Les Meilleures Pizzas Artisanales
            </h1>
            <p className="text-base md:text-xl mb-4 md:mb-8">Faites avec amour, livrées chez vous</p>
            <a
              href="#menu"
              className="inline-block bg-red-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Commander maintenant
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
            <PizzaIcon className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 text-red-600" />
            <h3 className="text-base md:text-xl font-semibold mb-2">Pizzas Artisanales</h3>
            <p className="text-sm md:text-base text-gray-600">
              Préparées avec des ingrédients frais et de qualité
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
            <Clock className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 text-red-600" />
            <h3 className="text-base md:text-xl font-semibold mb-2">Livraison Rapide</h3>
            <p className="text-sm md:text-base text-gray-600">
              Votre commande livrée en 30 minutes maximum
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
            <Star className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 text-red-600" />
            <h3 className="text-base md:text-xl font-semibold mb-2">Qualité Garantie</h3>
            <p className="text-sm md:text-base text-gray-600">
              Satisfaction client ou remboursé
            </p>
          </div>
        </div>
      </section>

      {/* Pizza Menu */}
      <section className="w-full px-4 py-4 md:py-8">
        <div className="max-w-6xl mx-auto">
          <PizzaMenu />
        </div>
      </section>
    </div>
  );
}