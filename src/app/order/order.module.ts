import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    OrderDetailComponent,
  ]
})
export class OrderModule {
}
