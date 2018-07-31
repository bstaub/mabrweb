import {Routes} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';


export const PRODUCT_ROUTES: Routes = [
  {path: 'list', component: ProductListComponent},
  {path: 'detail', component: ProductDetailComponent},
];
