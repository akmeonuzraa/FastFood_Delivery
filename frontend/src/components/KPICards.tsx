import { ShoppingBag, TruckIcon, DollarSign, Star, CheckCircle, Clock } from 'lucide-react';
import { KPIData } from '../types';

interface KPICardsProps {
  data: KPIData;
}

export default function KPICards({ data }: KPICardsProps) {
  const cards = [
    {
      title: 'Total Commandes',
      value: data.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Livraisons Actives',
      value: data.activeDeliveries.toString(),
      icon: TruckIcon,
      color: 'bg-orange-500',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      title: 'Revenu Total',
      value: `${data.totalRevenue.toLocaleString()} DH`,
      icon: DollarSign,
      color: 'bg-green-500',
      bgLight: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Note Moyenne',
      value: data.avgRating.toFixed(1),
      icon: Star,
      color: 'bg-yellow-500',
      bgLight: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Taux de Succès',
      value: `${data.successRate}%`,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      title: 'Temps Moyen',
      value: data.avgDeliveryTime,
      icon: Clock,
      color: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium mb-2">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`${card.bgLight} p-4 rounded-xl`}>
                  <Icon className={`w-8 h-8 ${card.textColor}`} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
