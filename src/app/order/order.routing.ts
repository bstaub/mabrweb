import {Routes} from '@angular/router';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrderStartComponent} from './order-start.component';
import {OrderEditComponent} from './order-edit/order-edit.component';
import {ProfileComponent} from '../user/profile/profile.component';
import {AuthGuard} from '../user/guards/auth-guard.service';


export const ORDER_ROUTES: Routes = [
  {path: '', component: OrderStartComponent, canActivate: [AuthGuard]},
  {path: 'neu', component: OrderEditComponent, canActivate: [AuthGuard]},
  {path: ':id', component: OrderDetailComponent, canActivate: [AuthGuard]},
  {path: ':id/bearbeiten', component: OrderEditComponent, canActivate: [AuthGuard]},
];
