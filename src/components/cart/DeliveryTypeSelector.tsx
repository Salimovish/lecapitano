import React from 'react';
import { Store, ShoppingBag } from 'lucide-react';

interface DeliveryTypeSelectorProps {
  selectedType: 'dine-in' | 'takeaway';
  onSelectType: (type: 'dine-in' | 'takeaway') => void;
}

export default function DeliveryTypeSelector({ selectedType, onSelectType }: DeliveryTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-700">Mode de service</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelectType('dine-in')}
          className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-colors ${
            selectedType === 'dine-in'
              ? 'border-red-600 bg-red-50 text-red-600'
              : 'border-gray-200 hover:border-red-600 hover:bg-red-50'
          }`}
        >
          <Store className="w-5 h-5" />
          <span>Sur place</span>
        </button>
        <button
          onClick={() => onSelectType('takeaway')}
          className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-colors ${
            selectedType === 'takeaway'
              ? 'border-red-600 bg-red-50 text-red-600'
              : 'border-gray-200 hover:border-red-600 hover:bg-red-50'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>À emporter</span>
        </button>
      </div>
    </div>
  );
}