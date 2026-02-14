import { Bike, ChevronDown } from 'lucide-react';
import { Period } from '../types';

interface HeaderProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

const periods: { value: Period; label: string }[] = [
  { value: 'today', label: "Aujourd'hui" },
  { value: '7days', label: '7 jours' },
  { value: '30days', label: '30 jours' },
  { value: 'year', label: 'Année' },
];

export default function Header({ selectedPeriod, onPeriodChange }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <Bike className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">FastFood Delivery</h1>
              <p className="text-orange-100 text-sm">Plateforme de gestion des livraisons</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => onPeriodChange(e.target.value as Period)}
                className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 pr-10 rounded-lg cursor-pointer hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {periods.map((period) => (
                  <option key={period.value} value={period.value} className="text-gray-900">
                    {period.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
            </div>

            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Admin"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-orange-100">Gestionnaire</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
