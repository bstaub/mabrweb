import { NgModule } from '@angular/core';
import { AdminProductAddComponent } from './admin-product-add/admin-product-add.component';
import { AdminProductEditComponent } from './admin-product-edit/admin-product-edit.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { AdminProductItemEditComponent } from './admin-product-item-edit/admin-product-item-edit.component';
import { AdminProductAddCategoryComponent } from './admin-product-add-category/admin-product-add-category.component';
import { SharedModule } from '../shared/shared.module';
import { AdminBilduploadComponent } from './admin-bildupload/admin-bildupload.component';
import { AdminProductEditCategoryComponent } from './admin-product-edit-category/admin-product-edit-category.component';
import { Testcomponent2Component } from './testcomponent2/testcomponent2.component';

@NgModule({
  declarations: [
    AdminProductAddComponent,
    AdminProductEditComponent,
    AdminHomeComponent,
    AdminComponent,
    AdminProductListComponent,
    AdminProductItemEditComponent,
    AdminProductAddCategoryComponent,
    AdminBilduploadComponent,
    AdminProductEditCategoryComponent,
    Testcomponent2Component,
  ],
  imports: [
    SharedModule
  ],
})
export class AdminModule { }
