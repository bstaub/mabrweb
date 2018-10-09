import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotificationComponent } from './notification/notification.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ProfileComponent } from './user/profile/profile.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { SortPipe } from './product/shared/pipe/sort.pipe';
import { MdToHtmlPipe } from './product/shared/pipe/md-to-html.pipe';
import { UserLoginRegisterComponent } from './user/user-login-register/user-login-register.component';
import { CoreModule } from './core/core.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './order/order.module';
import { CheckoutModule } from './checkout/checkout.module';
import { UserLoginRegisterSlideComponent} from './user/user-login-register-slide/user-login-register-slide.component';



@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserLoginComponent,
    UserDetailComponent,
    UserRegisterComponent,
    ProfileComponent,
    ResetPasswordComponent,
    UserLoginRegisterComponent,
    NotificationComponent,
    SortPipe,
    MdToHtmlPipe,
    UserLoginRegisterSlideComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,  // for database
    AngularFireAuthModule,      // cloud firestore
    AngularFirestoreModule,     // do auth login register stuff
    AngularFireStorageModule,   // do file store stuff
    ReactiveFormsModule,
    CoreModule, // Core Modul beinhalted Shared Modul
    ProductModule,
    AdminModule,
    OrderModule,
    CheckoutModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
