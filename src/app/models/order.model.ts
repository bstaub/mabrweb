import { CustomerAddress } from './customerAddress.model';


export class Order {
  key: string;
  userId: string;
  customerBillingAddress: CustomerAddress;
  customerShippingAddress: CustomerAddress;
  shopOrderId = 0;
  orderDate: any = null;
  status = 'pending';
  totalValue: number;
  shippingMethod: string;
  paymentMethod: string;
  shipqingEqualsBillingAddress: boolean;
  anonymusOrder: boolean;
}
