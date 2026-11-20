export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  modifiers?: Modifier[];
  preparationTime?: number;
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
  available: boolean;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  allergens: string[];
}

export interface Modifier {
  id: string;
  name: string;
  options: ModifierOption[];
  required: boolean;
  multiple: boolean;
  min?: number;
  max?: number;
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
  customerName?: string;
  specialRequests?: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  modifiers: SelectedModifier[];
  notes?: string;
  status: OrderItemStatus;
}

export interface SelectedModifier {
  id: string;
  options: ModifierOption[];
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'paid' | 'cancelled';
export type OrderItemStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'cash' | 'card' | 'digital_wallet';

export interface Table {
  id: number;
  number: number;
  seats: number;
  status: TableStatus;
  currentOrder?: Order;
  reservationTime?: string;
  customerCount?: number;
  section?: string;
  waiter?: string;
}

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  createdAt: string;
  read: boolean;
  data?: any;
}

export type NotificationType = 'order_update' | 'payment_update' | 'table_update' | 'system';