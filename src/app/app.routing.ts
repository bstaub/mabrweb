import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PRODUCT_ROUTES } from './product/product.routing';
import { USER_ROUTES } from './user/user.routing';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './user/profile/profile.component';
import { Auth2Guard } from './user/guards/auth2.guard';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { ADMIN_ROUTES } from './admin/admin.routing';
import { AdminGuard } from './user/guards/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { UserLoginRegisterComponent } from './user/user-login-register/user-login-register.component';
import { NgModule } from '@angular/core';
import { CHECKOUT_ROUTES } from './checkout/checkout.routing';
import { UserLoginRegisterSlideComponent } from './user/user-login-register-slide/user-login-register-slide.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserComponent } from './user/user.component';


const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin', component: AdminComponent, children: ADMIN_ROUTES, canActivate: [AdminGuard]},
  {path: 'produkte', component: ProductComponent, children: PRODUCT_ROUTES},
  {path: 'bestellung', component: OrderDetailComponent},
  {path: 'checkout', component: CheckoutComponent, children: CHECKOUT_ROUTES},
  {path: 'users', component: UserComponent, children: USER_ROUTES, canActivate: [Auth2Guard]}, // Router Outlet auf UserComponent nicht vergessen!
  {path: 'login', component: UserLoginComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'login-register', component: UserLoginRegisterComponent},
  {path: 'user-login-register-slide', component: UserLoginRegisterSlideComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [Auth2Guard], data: { title: 'Mein Profil' }},
  {path: 'resetpw', component: ResetPasswordComponent},
  {path: '**', redirectTo: '/'},  // default Route, könnte auch 404 Seite sein, muss am Schluss aufgerufen werden
];


@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
  providers: [
    // AdminGuard,
  ]
})
export class AppRoutingModule {
}
