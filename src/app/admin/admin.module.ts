import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductAddComponent } from './admin-product-add/admin-product-add.component';
import { AdminProductEditComponent } from './admin-product-edit/admin-product-edit.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { AdminProductItemComponent } from './admin-product-item/admin-product-item.component';
import { AdminProductAddCategoryComponent } from './admin-product-add-category/admin-product-add-category.component';
import { SharedModule } from '../shared/shared.module';
import { AdminBilduploadComponent } from './admin-bildupload/admin-bildupload.component';

@NgModule({
  declarations: [
    AdminProductAddComponent,
    AdminProductEditComponent,
    AdminHomeComponent,
    AdminComponent,
    AdminProductListComponent,
    AdminProductItemComponent,
    AdminProductAddCategoryComponent,
    AdminBilduploadComponent,
  ],
  imports: [
    SharedModule
  ],
})
export class AdminModule { }
