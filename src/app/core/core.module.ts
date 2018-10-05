import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from '../user/shared/auth.service';
import { AdminGuard } from '../user/guards/admin.guard';
import { AuthuserGuard } from '../user/guards/authuser.guard';
import { Auth2Guard } from '../user/guards/auth2.guard';
import { UserService } from '../user/shared/user.service';
import { ProductFirestoreService } from '../product/shared/product-firestore.service';
import { ProductCategoryService } from '../product/shared/product-category.service';
import { OrderFirestoreService } from '../order/shared/order-firestore.service';
import { NotificationService } from '../shared/notification.service';
import { StorageService } from '../shared/storage.service';
import { SettingsService } from '../shared/settings.service';
import { LocalStorageService } from '../shared/local-storage.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderSearchComponent } from './header/header-search/header-search.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeaderSearchComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HeaderSearchComponent,
    SharedModule,
  ],
  providers: [AuthService,
    AdminGuard,
    AuthuserGuard,
    Auth2Guard,
    UserService,
    ProductFirestoreService,
    ProductCategoryService,
    OrderFirestoreService,
    NotificationService,
    StorageService,
    SettingsService,
    LocalStorageService,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
})
export class CoreModule {
}
