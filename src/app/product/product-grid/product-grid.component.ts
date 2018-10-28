import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../shared/product.service';
import { ProductFirestoreService } from '../shared/product-firestore.service';
import { ProductCategoryService } from '../shared/product-category.service';
import { ProductCategory } from '../../models/product-category.model';
import { SettingsService } from '../../shared/settings.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit, OnDestroy {

  products$: Observable<Product[]>;
  categories$: Observable<ProductCategory[]>;
  selectedCategory: string;
  selectedSort: string;
  p = 1;
  selectUndefinedOptionValue: any;


  constructor(private productService: ProductService,
              private productFireStoreService: ProductFirestoreService,
              private productCategory: ProductCategoryService,
              private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.getProductList();
    this.categories$ = this.productCategory.getCategories();
    // https://stackoverflow.com/questions/39601026/angular-2-scroll-to-top-on-route-change  (not needed anymore in angular 7)
  }

  getProductList() {
    this.products$ = this.productFireStoreService.getProducts();
  }

  selectedOption() {
    this.products$ = this.productFireStoreService.filterProductsByCategoryAndField(this.selectedCategory, this.selectedSort);
  }

  get itemsPerPage() {
    return this.settingsService.getSettings().itemsPerPage;
  }

  ngOnDestroy() {

  }

}
