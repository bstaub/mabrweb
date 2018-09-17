import {Routes} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductNewComponent} from './product-new/product-new.component';
import {AdminGuard} from '../user/guards/admin.guard';
import {ProductGridComponent} from './product-grid/product-grid.component';


export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'grid',
    pathMatch: 'full'
  },
  {path: 'grid', component: ProductGridComponent},
  {path: 'list', component: ProductListComponent},
  {path: 'detail/:id', component: ProductDetailComponent},
  {path: 'detail/:id/edit', component: ProductDetailComponent},
  {path: 'new', component: ProductNewComponent, canActivate: [AdminGuard]},
];
