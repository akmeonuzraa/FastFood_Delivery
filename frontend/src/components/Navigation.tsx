import { LayoutDashboard, Users, Package, MapPin, BarChart3 } from 'lucide-react';

type TabType = 'overview' | 'team' | 'orders' | 'areas' | 'analytics';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'overview' as TabType, label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: 'team' as TabType, label: 'Livreurs', icon: Users },
  { id: 'orders' as TabType, label: 'Livraisons', icon: Package },
  { id: 'areas' as TabType, label: 'Zones', icon: MapPin },
  { id: 'analytics' as TabType, label: 'Analytique', icon: BarChart3 },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-orange-500 text-orange-600 bg-orange-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export type { TabType };
