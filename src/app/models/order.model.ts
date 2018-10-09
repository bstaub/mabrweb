import { CustomerAddress } from './customerAddress.model';

export class Order {
  key: string;
  shopOrderId: string;
  orderDate: any;
  status: string;
  totalValue: number;
  userId: string;
  customerAddress: CustomerAddress;
  // public date: string = new Date().toISOString().split('T')[0],
  // public shippingMethod: string = '',
  // public paymentMethod: string = ''
}