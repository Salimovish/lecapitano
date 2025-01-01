import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface CustomerDetailsProps {
  register: UseFormRegister<any>;
}

export default function CustomerDetails({ register }: CustomerDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom complet</label>
          <input
            type="text"
            {...register('fullName', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Téléphone</label>
          <input
            type="tel"
            {...register('phone', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
}