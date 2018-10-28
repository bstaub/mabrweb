import { Routes } from '@angular/router';
import { AdminProductAddComponent } from './admin-product-add/admin-product-add.component';
import { AdminProductEditComponent } from './admin-product-edit/admin-product-edit.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { AdminProductAddCategoryComponent } from './admin-product-add-category/admin-product-add-category.component';
import { AdminProductEditCategoryComponent } from './admin-product-edit-category/admin-product-edit-category.component';


export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'home', component: AdminHomeComponent},
  {path: 'edit/:id', component: AdminProductEditComponent},
  {path: 'add-category', component: AdminProductAddCategoryComponent},
  {path: 'edit-category', component: AdminProductEditCategoryComponent},
  {path: 'list', component: AdminProductListComponent},
  {path: 'edit', component: AdminProductEditComponent},
  {path: 'add', component: AdminProductAddComponent},
];
