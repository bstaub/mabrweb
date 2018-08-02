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
import { ProductNewComponent } from './product/product-new/product-new.component';
import {FormsModule} from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { OrderItemComponent } from './order/order-list/order-item.component';
import { OrderStartComponent } from './order/order-start.component';
import {OrderComponent} from './order/order.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductNewComponent,
    HeaderComponent,
    NaviComponent,
    HomeComponent,
    UserListComponent,
    UserLoginComponent,
    UserDetailComponent,
    UserRegisterComponent,
    OrderDetailComponent,
    OrderListComponent,
    ProductComponent,
    OrderItemComponent,
    OrderStartComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    Routing,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
