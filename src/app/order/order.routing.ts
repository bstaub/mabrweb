import { Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderEditComponent } from './order-edit/order-edit.component';


export const ORDER_ROUTES: Routes = [
  {path: '', component: OrderDetailComponent},
  {path: ':id', component: OrderDetailComponent},
  {path: ':id/bearbeiten', component: OrderEditComponent},
];
