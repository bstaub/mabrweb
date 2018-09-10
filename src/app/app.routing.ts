import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {UserListComponent} from './user/user-list/user-list.component';

import {PRODUCT_ROUTES} from './product/product.routing';
import {USER_ROUTES} from './user/user.routing';
import {ORDER_ROUTES} from './order/order.routing';
import {OrderListComponent} from './order/order-list/order-list.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {ProductComponent} from './product/product.component';
import {OrderComponent} from './order/order.component';
import {ProfileComponent} from './user/profile/profile.component';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent },
  {path: 'produkte', component: ProductComponent, children: PRODUCT_ROUTES },
  {path: 'bestellung', component: OrderComponent, children: ORDER_ROUTES },
  {path: 'user', component: UserListComponent, children: USER_ROUTES},
  {path: 'login', component: UserLoginComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', redirectTo: '/' },  // default Route, könnte auch 404 Seite sein, muss am Schluss aufgerufen werden
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
