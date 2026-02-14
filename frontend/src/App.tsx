import { useState } from 'react';
import Header from './components/Header';
import Navigation, { TabType } from './components/Navigation';
import KPICards from './components/KPICards';
import TopDeliveryTeam from './components/TopDeliveryTeam';
import RecentOrders from './components/RecentOrders';
import ZonePerformance from './components/ZonePerformance';
import { deliveryTeam, orders, zones, kpiData } from './data/mockData';
import { Period } from './types';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('today');
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <KPICards data={kpiData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2">
              <RecentOrders orders={orders} />
            </div>
          </div>

          <TopDeliveryTeam team={deliveryTeam} />

          <ZonePerformance zones={zones} />
        </div>
      </main>
    </div>
  );
}

export default App;




// import { useState } from 'react';
// import Header from './components/Header';
// import Navigation, { TabType } from './components/Navigation';
// import KPICards from './components/KPICards';
// import TopDeliveryTeam from './components/TopDeliveryTeam';
// import RecentOrders from './components/RecentOrders';
// import ZonePerformance from './components/ZonePerformance';
// import { deliveryTeam, orders, zones, kpiData } from './data/mockData';
// import { Period } from './types';

// const API_URL = 'http://localhost:5000/api';

// function App() {
//   const [selectedPeriod, setSelectedPeriod] = useState<Period>('today');
//   const [activeTab, setActiveTab] = useState<TabType>('overview');

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
//       <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="space-y-8">
//           <KPICards data={kpiData} />

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div className="lg:col-span-2">
//               <RecentOrders orders={orders} />
//             </div>
//           </div>

//           <TopDeliveryTeam team={deliveryTeam} />

//           <ZonePerformance zones={zones} />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;
