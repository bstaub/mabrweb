import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotificationComponent } from './notification/notification.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { SortPipe } from './product/shared/pipe/sort.pipe';
import { MdToHtmlPipe } from './product/shared/pipe/md-to-html.pipe';
import { CoreModule } from './core/core.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './order/order.module';
import { CheckoutModule } from './checkout/checkout.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
    AppComponent,
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
    ReactiveFormsModule,
    CoreModule, // Core Modul beinhalted Shared Modul
    ProductModule,
    AdminModule,
    OrderModule,
    CheckoutModule,
    UserModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
