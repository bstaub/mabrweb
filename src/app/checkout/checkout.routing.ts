import { Routes } from '@angular/router';
import { CheckoutLoginComponent } from './checkout-login/checkout-login.component';
import { CheckoutCustomerdataComponent } from './checkout-customerdata/checkout-customerdata.component';
import { CheckoutShipmentdataComponent } from './checkout-shipmentdata/checkout-shipmentdata.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutThxComponent } from './checkout-thx/checkout-thx.component';


export const CHECKOUT_ROUTES: Routes = [
  {path: '', redirectTo: 'customerdata', pathMatch: 'full', data: {checkoutStep: 1}},
  {path: 'shipmentdata', component: CheckoutShipmentdataComponent, data: {checkoutStep: 2}},
  {path: 'customerdata', component: CheckoutCustomerdataComponent, data: {checkoutStep: 1}},
  {path: 'login', component: CheckoutLoginComponent},
  {path: 'paymentdata', component: CheckoutPaymentComponent, data: {checkoutStep: 3}},
  {path: 'thx', component: CheckoutThxComponent, data: {checkoutStep: 4}},
];
