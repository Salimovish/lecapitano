import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface CardPaymentFormProps {
  register: UseFormRegister<any>;
  errors: Record<string, any>;
}

export default function CardPaymentForm({ register, errors }: CardPaymentFormProps) {
  return (
    <div className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Numéro de carte
        </label>
        <input
          type="text"
          {...register('cardNumber', {
            required: 'Numéro de carte requis',
            pattern: {
              value: /^\d{16}$/,
              message: 'Numéro de carte invalide'
            }
          })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="1234 5678 9012 3456"
        />
        {errors.cardNumber && (
          <p className="text-red-600 text-sm mt-1">{errors.cardNumber.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Date d'expiration
          </label>
          <input
            type="text"
            {...register('expiryDate', {
              required: 'Date d\'expiration requise',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: 'Format: MM/YY'
              }
            })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="MM/YY"
          />
          {errors.expiryDate && (
            <p className="text-red-600 text-sm mt-1">{errors.expiryDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            CVV
          </label>
          <input
            type="text"
            {...register('cvv', {
              required: 'CVV requis',
              pattern: {
                value: /^\d{3,4}$/,
                message: 'CVV invalide'
              }
            })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="123"
          />
          {errors.cvv && (
            <p className="text-red-600 text-sm mt-1">{errors.cvv.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}