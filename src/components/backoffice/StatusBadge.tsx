import React from 'react';
import { Order } from '../../types/order';

interface StatusBadgeProps {
  status: Order['status'];
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    'pending': {
      label: 'En attente',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: '⏳'
    },
    'preparing': {
      label: 'En préparation',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: '🥣'
    },
    'ready': {
      label: 'Prêt',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: '✅'
    },
    'completed': {
      label: 'Terminé',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: '🎉'
    },
    'cancelled': {
      label: 'Annulé',
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: '❌'
    }
  };

  // Gérer les statuts invalides
  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status || 'Statut inconnu',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '❓'
  };

  return (
    <div 
      className={`
        px-3 py-1 rounded-full text-sm font-medium border
        flex items-center justify-center gap-2
        ${config.color}
      `}
    >
      <span>{config.icon}</span>
      {config.label}
    </div>
  );
}