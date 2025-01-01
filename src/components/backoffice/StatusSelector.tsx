import React from 'react';
import { OrderStatus } from '../../types/order';

interface StatusSelectorProps {
  currentStatus: OrderStatus;
  onSelect: (status: OrderStatus) => void;
}

export default function StatusSelector({ currentStatus, onSelect }: StatusSelectorProps) {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onSelect(e.target.value as OrderStatus)}
      className="w-full p-2 border rounded-lg bg-gray-50"
    >
      <option value="pending">En attente</option>
      <option value="preparing">En préparation</option>
      <option value="ready">Prêt</option>
      <option value="completed">Terminé</option>
      <option value="cancelled">Annulé</option>
    </select>
  );
}