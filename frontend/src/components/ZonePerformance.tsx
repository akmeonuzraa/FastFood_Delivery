import { MapPin, Clock, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Zone } from '../types';

interface ZonePerformanceProps {
  zones: Zone[];
}

export default function ZonePerformance({ zones }: ZonePerformanceProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Performance par Zone</h2>
        <p className="text-gray-600 text-sm mt-1">Analyse géographique des livraisons</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone) => {
          const isPositiveGrowth = zone.growth > 0;
          return (
            <div
              key={zone.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{zone.name}</h3>
                      <p className="text-sm text-gray-600">{zone.orders} commandes</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                      isPositiveGrowth ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {isPositiveGrowth ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        isPositiveGrowth ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      {isPositiveGrowth ? '+' : ''}
                      {zone.growth}%
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Temps moyen</span>
                    </div>
                    <span className="font-semibold text-gray-900">{zone.avgDeliveryTime}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Revenu</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {zone.revenue.toLocaleString()} DH
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Performance</span>
                    <span className="font-semibold">
                      {isPositiveGrowth ? 'Excellente' : 'En baisse'}
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isPositiveGrowth ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.abs(zone.growth) * 5)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
