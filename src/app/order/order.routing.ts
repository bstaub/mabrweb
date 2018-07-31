import {Routes} from '@angular/router';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';


export const ORDER_ROUTES: Routes = [
  {path: 'list', component: OrderListComponent},
  {path: 'detail', component: OrderDetailComponent}
];
