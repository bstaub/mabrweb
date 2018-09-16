import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
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
import {ProductNewComponent} from './product/product-new/product-new.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductComponent} from './product/product.component';
import {OrderItemComponent} from './order/order-list/order-item.component';
import {OrderStartComponent} from './order/order-start.component';
import {OrderComponent} from './order/order.component';
import {AuthService} from './user/shared/auth.service';
import {OrderEditComponent} from './order/order-edit/order-edit.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {NotificationComponent} from './notification/notification.component';
import {NotificationService} from './shared/notification.service';
import {StorageService} from './shared/storage.service';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {ProfileComponent} from './user/profile/profile.component';
import {UserService} from './user/shared/user.service';
import {ResetPasswordComponent} from './user/reset-password/reset-password.component';
import {SettingsService} from './shared/settings.service';
import {AdminGuard} from './user/guards/admin.guard';
import {AuthuserGuard} from './user/guards/authuser.guard';
import {Auth2Guard} from './user/guards/auth2.guard';
import { ProductGridComponent } from './product/product-grid/product-grid.component';
import { ProductItemComponent } from './product/product-item/product-item.component';





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
    OrderEditComponent,
    NotificationComponent,
    ProfileComponent,
    ResetPasswordComponent,
    ProductGridComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,  // for database
    AngularFireAuthModule,      // cloud firestore
    AngularFirestoreModule,     // do auth login register stuff
    AngularFireStorageModule,   // do file store stuff
    NgbModule.forRoot(),
    Routing,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AdminGuard, AuthuserGuard, Auth2Guard, UserService, NotificationService, StorageService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
