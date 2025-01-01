import React, { useState } from 'react';
import { Menu } from 'lucide-react';

interface MenuNavigationProps {
  onNavigate: (sectionId: string) => void;
}

export default function MenuNavigation({ onNavigate }: MenuNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: 'pizzas-tomate',
      label: 'Pizzas Base Tomate',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=200&h=150',
    },
    {
      id: 'pizzas-creme',
      label: 'Pizzas Base Crème',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200&h=150',
    },
    {
      id: 'crepes',
      label: 'Crêpes',
      image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=200&h=150',
    },
    {
      id: 'boissons',
      label: 'Boissons',
      image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=200&h=150',
    },
  ];

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu burger pour mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation menu */}
      <div
        className={`
          fixed md:relative
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          left-0 top-0 md:top-auto
          h-full w-64
          bg-white shadow-lg
          transition-transform duration-300 ease-in-out
          z-40 md:z-auto
          overflow-y-auto
          p-4
        `}
      >
        <div className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className="w-full overflow-hidden rounded-lg hover:ring-2 hover:ring-red-600 transition-all group"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-24 md:h-32 object-cover brightness-75 group-hover:brightness-100 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-semibold text-base md:text-lg text-center px-2 drop-shadow-lg">
                    {item.label}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}