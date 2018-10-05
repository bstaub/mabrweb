import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { OrderItemComponent } from './order/order-list/order-item.component';
import { OrderStartComponent } from './order/order-start.component';
import { OrderComponent } from './order/order.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotificationComponent } from './notification/notification.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ProfileComponent } from './user/profile/profile.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { ProductGridComponent } from './product/product-grid/product-grid.component';
import { ProductItemComponent } from './product/product-item/product-item.component';
import { SortPipe } from './product/shared/pipe/sort.pipe';
import { MdToHtmlPipe } from './product/shared/pipe/md-to-html.pipe';
import { AdminProductAddComponent } from './admin/admin-product-add/admin-product-add.component';
import { AdminProductEditComponent } from './admin/admin-product-edit/admin-product-edit.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductListComponent } from './admin/admin-product-list/admin-product-list.component';
import { AdminProductItemComponent } from './admin/admin-product-item/admin-product-item.component';
import { AdminProductAddCategoryComponent } from './admin/admin-product-add-category/admin-product-add-category.component';
import { CheckoutCustomerdataComponent } from './checkout/checkout-customerdata/checkout-customerdata.component';
import { CheckoutShipmentdataComponent } from './checkout/checkout-shipmentdata/checkout-shipmentdata.component';
import { CheckoutPaymentComponent } from './checkout/checkout-payment/checkout-payment.component';
import { CheckoutLoginComponent } from './checkout/checkout-login/checkout-login.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserLoginRegisterComponent } from './user/user-login-register/user-login-register.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
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
    ProfileComponent,
    ResetPasswordComponent,
    ProductGridComponent,
    ProductItemComponent,
    AdminProductAddComponent,
    AdminProductEditComponent,
    AdminHomeComponent,
    AdminComponent,
    AdminProductListComponent,
    AdminProductItemComponent,
    AdminProductAddCategoryComponent,
    CheckoutCustomerdataComponent,
    CheckoutShipmentdataComponent,
    CheckoutPaymentComponent,
    CheckoutLoginComponent,
    UserLoginRegisterComponent,
    NotificationComponent,
    SortPipe,
    MdToHtmlPipe,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,  // for database
    AngularFireAuthModule,      // cloud firestore
    AngularFirestoreModule,     // do auth login register stuff
    AngularFireStorageModule,   // do file store stuff
    // NgbModule.forRoot(),
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    CoreModule,
    // SharedModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
