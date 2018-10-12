import { CustomerAddress } from './customerAddress.model';


export class Order {
  key: string;
  userId: string;
  customerAddress: CustomerAddress;
  shopOrderId = 'XXX-000';
  orderDate: any = null;
  status = 'pending';
  totalValue = 0;
  shippingMethod: string;
  paymentMethod: string;
}
