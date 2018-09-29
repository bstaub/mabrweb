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
import {ProductGridComponent} from './product/product-grid/product-grid.component';
import {ProductItemComponent} from './product/product-item/product-item.component';
import {ProductFirestoreService} from './product/shared/product-firestore.service';
import {ProductCategoryService} from './product/shared/product-category.service';
import {OrderFirestoreService} from './order/shared/order-firestore.service';
import {SortPipe} from './product/shared/pipe/sort.pipe';
import {MdToHtmlPipe} from './product/shared/pipe/md-to-html.pipe';
import {AdminProductAddComponent} from './admin/admin-product-add/admin-product-add.component';
import {AdminProductEditComponent} from './admin/admin-product-edit/admin-product-edit.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {AdminComponent} from './admin/admin.component';
import {AdminProductListComponent} from './admin/admin-product-list/admin-product-list.component';
import {AdminProductItemComponent} from './admin/admin-product-item/admin-product-item.component';
import {AdminProductAddCategoryComponent} from './admin/admin-product-add-category/admin-product-add-category.component';
import {LocalStorageService} from './shared/local-storage.service';
import {CheckoutEnterdataComponent} from './checkout/checkout-enterdata/checkout-enterdata.component';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {TestbrunoComponent} from './testbruno/testbruno.component';


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
    ProductComponent,
    OrderItemComponent,
    OrderStartComponent,
    OrderComponent,
    OrderEditComponent,
    NotificationComponent,
    ProfileComponent,
    ResetPasswordComponent,
    ProductGridComponent,
    ProductItemComponent,
    SortPipe,
    MdToHtmlPipe,
    AdminProductAddComponent,
    AdminProductEditComponent,
    AdminHomeComponent,
    AdminComponent,
    AdminProductListComponent,
    AdminProductItemComponent,
    AdminProductAddCategoryComponent,
    CheckoutEnterdataComponent,
    TestbrunoComponent
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
  providers: [AuthService, AdminGuard, AuthuserGuard, Auth2Guard, UserService, ProductFirestoreService, ProductCategoryService, OrderFirestoreService, NotificationService, StorageService, SettingsService, LocalStorageService,
              { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
