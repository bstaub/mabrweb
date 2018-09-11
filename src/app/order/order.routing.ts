import {Routes} from '@angular/router';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrderStartComponent} from './order-start.component';
import {OrderEditComponent} from './order-edit/order-edit.component';
import {ProfileComponent} from '../user/profile/profile.component';
import {AuthGuard} from '../user/guards/auth-guard.service';
import {Auth2Guard} from '../user/guards/auth2.guard';


export const ORDER_ROUTES: Routes = [
  {path: '', component: OrderStartComponent},
  {path: 'neu', component: OrderEditComponent},
  {path: ':id', component: OrderDetailComponent},
  {path: ':id/bearbeiten', component: OrderEditComponent},
];
