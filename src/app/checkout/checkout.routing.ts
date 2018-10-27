import { Routes } from '@angular/router';
import { CheckoutCustomerdataComponent } from './checkout-customerdata/checkout-customerdata.component';
import { CheckoutShipmentdataComponent } from './checkout-shipmentdata/checkout-shipmentdata.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutThxComponent } from './checkout-thx/checkout-thx.component';
import { CheckoutOverviewComponent } from './checkout-overview/checkout-overview.component';


export const CHECKOUT_ROUTES: Routes = [
  {path: '', redirectTo: 'customerdata', pathMatch: 'full'},
  {path: 'customerdata', component: CheckoutCustomerdataComponent, data: {checkoutStep: 1}},
  {path: 'shipmentdata', component: CheckoutShipmentdataComponent, data: {checkoutStep: 2}},
  {path: 'paymentdata', component: CheckoutPaymentComponent, data: {checkoutStep: 3}},
  {path: 'overview', component: CheckoutOverviewComponent, data: {checkoutStep: 4}},
  {path: 'thx', component: CheckoutThxComponent, data: {checkoutStep: 5}},
];
