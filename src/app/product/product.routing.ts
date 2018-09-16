import {Routes} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductNewComponent} from './product-new/product-new.component';
import {AdminGuard} from '../user/guards/admin.guard';
import {ProductGridComponent} from './product-grid/product-grid.component';


export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {path: 'list', component: ProductListComponent},
  {path: 'grid', component: ProductGridComponent},
  {path: 'detail', component: ProductDetailComponent},
  {path: 'new', component: ProductNewComponent, canActivate: [AdminGuard]},
];
