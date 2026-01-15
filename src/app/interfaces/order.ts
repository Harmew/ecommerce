import type { CartItem } from './cart';

export interface Order {
  id: string;
  userId: string;
  total: number;
  items: CartItem[];
  paymentStatus: 'success' | 'failure';
}
