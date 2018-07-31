import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NaviComponent} from './navi.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import {HomeComponent} from './home.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {Routing} from './app.routing';
import {OrderDetailComponent} from './order/order-detail/order-detail.component';
import {OrderListComponent} from './order/order-list/order-list.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    HeaderComponent,
    NaviComponent,
    HomeComponent,
    UserListComponent,
    UserLoginComponent,
    UserDetailComponent,
    UserRegisterComponent,
    OrderDetailComponent,
    OrderListComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    Routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
