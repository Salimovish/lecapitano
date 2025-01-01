import React from 'react';
import CheckoutForm from '../components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finaliser la commande</h1>
      <CheckoutForm />
    </div>
  );
}