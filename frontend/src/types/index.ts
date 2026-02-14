export type OrderStatus = 'delivered' | 'in_progress' | 'pending' | 'cancelled';
export type VehicleType = 'Moto' | 'Voiture' | 'Vélo';
export type DeliveryPersonStatus = 'active' | 'inactive';
export type Period = 'today' | '7days' | '30days' | 'year';

export interface DeliveryPerson {
  id: string;
  name: string;
  avatar: string;
  deliveries: number;
  rating: number;
  distance: number;
  vehicle: VehicleType;
  status: DeliveryPersonStatus;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  restaurant: string;
  address: string;
  status: OrderStatus;
  time: string;
  deliveryPerson: string;
  distance: number;
}

export interface Zone {
  id: string;
  name: string;
  orders: number;
  avgDeliveryTime: string;
  revenue: number;
  growth: number;
}

export interface KPIData {
  totalOrders: number;
  activeDeliveries: number;
  totalRevenue: number;
  avgRating: number;
  successRate: number;
  avgDeliveryTime: string;
}
