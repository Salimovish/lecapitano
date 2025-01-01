import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { MapPin, Store } from 'lucide-react';

interface DeliveryOptionsProps {
  register: UseFormRegister<any>;
}

export default function DeliveryOptions({ register }: DeliveryOptionsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Mode de livraison</h2>
      <div className="space-y-4">
        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="delivery"
            {...register('deliveryType')}
            className="mr-3"
          />
          <MapPin className="w-5 h-5 mr-2 text-red-600" />
          <span>Livraison à domicile</span>
        </label>
        
        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="pickup"
            {...register('deliveryType')}
            className="mr-3"
          />
          <Store className="w-5 h-5 mr-2 text-red-600" />
          <span>À emporter</span>
        </label>
      </div>
    </div>
  );
}