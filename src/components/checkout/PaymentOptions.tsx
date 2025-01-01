import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { CreditCard, Banknote } from 'lucide-react';

interface PaymentOptionsProps {
  register: UseFormRegister<any>;
}

export default function PaymentOptions({ register }: PaymentOptionsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Mode de paiement</h2>
      <div className="space-y-4">
        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="card"
            {...register('paymentMethod')}
            className="mr-3"
          />
          <CreditCard className="w-5 h-5 mr-2 text-red-600" />
          <span>Carte bancaire</span>
        </label>
        
        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="cash"
            {...register('paymentMethod')}
            className="mr-3"
          />
          <Banknote className="w-5 h-5 mr-2 text-red-600" />
          <span>Espèces à la livraison</span>
        </label>
      </div>
    </div>
  );
}