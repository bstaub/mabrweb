import { Routes } from '@angular/router';
import { CheckoutLoginComponent } from './checkout-login/checkout-login.component';
import { CheckoutCustomerdataComponent } from './checkout-customerdata/checkout-customerdata.component';
import { CheckoutShipmentdataComponent } from './checkout-shipmentdata/checkout-shipmentdata.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutThxComponent } from './checkout-thx/checkout-thx.component';


export const CHECKOUT_ROUTES: Routes = [
  {path: '', redirectTo: 'customerdata', pathMatch: 'full'},
  {path: 'shipmentdata', component: CheckoutShipmentdataComponent},
  {path: 'customerdata', component: CheckoutCustomerdataComponent},
  {path: 'login', component: CheckoutLoginComponent},
  {path: 'paymentdata', component: CheckoutPaymentComponent},
  {path: 'thx', component: CheckoutThxComponent},
];
