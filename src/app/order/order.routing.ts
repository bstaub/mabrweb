import {Routes} from '@angular/router';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrderStartComponent} from './order-start.component';


export const ORDER_ROUTES: Routes = [
  {path: '', component: OrderStartComponent},
  {path: ':id', component: OrderDetailComponent}
];
