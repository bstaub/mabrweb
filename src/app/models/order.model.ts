import { CustomerAddress } from './customerAddress.model';


export class Order {
  key: string;
  userId: string;
  customerBillingAddress: CustomerAddress;
  customerShippingAddress: CustomerAddress;
  shopOrderId = 'XXX-000';
  orderDate: any = null;
  status = 'pending';
  totalValue: number;
  shippingMethod: string;
  paymentMethod: string;
  shipqingEqualsBillingAddress: boolean;
}
