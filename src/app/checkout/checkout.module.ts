import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CheckoutCustomerdataComponent } from './checkout-customerdata/checkout-customerdata.component';
import { CheckoutShipmentdataComponent } from './checkout-shipmentdata/checkout-shipmentdata.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutLoginComponent } from './checkout-login/checkout-login.component';
import { CheckoutComponent } from './checkout.component';


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    CheckoutCustomerdataComponent,
    CheckoutShipmentdataComponent,
    CheckoutPaymentComponent,
    CheckoutLoginComponent,
    CheckoutComponent
  ]
})
export class CheckoutModule {
}
