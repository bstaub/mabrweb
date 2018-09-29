import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserListComponent } from './user/user-list/user-list.component';

import { PRODUCT_ROUTES } from './product/product.routing';
import { USER_ROUTES } from './user/user.routing';
import { ORDER_ROUTES } from './order/order.routing';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './user/profile/profile.component';
import { Auth2Guard } from './user/guards/auth2.guard';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { ADMIN_ROUTES } from './admin/admin.routing';
import { AdminGuard } from './user/guards/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { CheckoutEnterdataComponent } from './checkout/checkout-enterdata/checkout-enterdata.component';


const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin', component: AdminComponent, children: ADMIN_ROUTES, canActivate: [AdminGuard]},
  {path: 'produkte', component: ProductComponent, children: PRODUCT_ROUTES},
  {path: 'bestellung', component: OrderComponent, children: ORDER_ROUTES},
  {path: 'checkout', component: CheckoutEnterdataComponent, children: ORDER_ROUTES},
  {path: 'user', component: UserListComponent, children: USER_ROUTES, canActivate: [Auth2Guard]},
  {path: 'login', component: UserLoginComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [Auth2Guard]},
  {path: 'resetpw', component: ResetPasswordComponent},
  {path: '**', redirectTo: '/'},  // default Route, könnte auch 404 Seite sein, muss am Schluss aufgerufen werden
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
