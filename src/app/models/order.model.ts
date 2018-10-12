import { CustomerAddress } from './customerAddress.model';

export class Order {
  key: string;
  shopOrderId: string;
  orderDate: any;
  status: string;
  totalValue: number;
  userId: string;
  customerAddress: CustomerAddress;
  shippingMethod: string;
  paymentdMethod: string;



  // todo: constructor

}
