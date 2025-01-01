import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdmin = true; // TODO: Implement proper admin check with Supabase auth

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-black to-[#800020] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Le Capitano" className="h-16 w-auto" />
              <span className="ml-2 text-xl font-bold">LE CAPITANO</span>
            </Link>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md ${
                    location.pathname === '/' ? 'bg-black bg-opacity-50' : 'hover:bg-black hover:bg-opacity-30'
                  }`}
                >
                  Menu
                </Link>
                {!location.pathname.startsWith('/admin') && (
                  <Link
                    to="/cart"
                    className={`px-3 py-2 rounded-md ${
                      location.pathname === '/cart' ? 'bg-black bg-opacity-50' : 'hover:bg-black hover:bg-opacity-30'
                    }`}
                  >
                    Panier
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-md ${
                      location.pathname.startsWith('/admin') ? 'bg-black bg-opacity-50' : 'hover:bg-black hover:bg-opacity-30'
                    }`}
                  >
                    Administration
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p>Téléphone: 01 23 45 67 89</p>
              <p>Email: contact@pizzaexpress.fr</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Horaires</h3>
              <p>Lundi - Dimanche</p>
              <p>11h00 - 23h00</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-red-400">Facebook</a>
                <a href="#" className="hover:text-red-400">Instagram</a>
                <a href="#" className="hover:text-red-400">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}