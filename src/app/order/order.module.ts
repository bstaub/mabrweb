import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderItemComponent } from './order-list/order-item.component';
import { OrderStartComponent } from './order-start.component';
import { OrderComponent } from './order.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    OrderDetailComponent,
    OrderListComponent,
    OrderItemComponent,
    OrderStartComponent,
    OrderComponent,
    OrderEditComponent,
  ]
})
export class OrderModule {
}
