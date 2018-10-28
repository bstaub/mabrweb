import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { ProductFirestoreService } from '../shared/product-firestore.service';
import { Product } from '../../models/product.model';
import { SettingsService } from '../../shared/settings.service';
import { ProductCategory } from '../../models/product-category.model';
import { ProductCategoryService } from '../shared/product-category.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [`

  `]
})
export class ProductListComponent implements OnInit {

  products: Observable<Product[]>;
  categories: Observable<ProductCategory[]>;
  selectedCategory: string;
  selectedSort: string;
  p = 1;
  selectUndefinedOptionValue: any;

  constructor(private productFireStoreService: ProductFirestoreService,
              private productCategory: ProductCategoryService,
              private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.getProductList();
    this.categories = this.productCategory.getCategories();
  }

  getProductList() {
    this.products = this.productFireStoreService.getProducts();
  }

  selectedOption() {
    this.products = this.productFireStoreService.filterProductsByCategoryAndField(this.selectedCategory, this.selectedSort);
  }

  get itemsPerPage() {
    return this.settingsService.getSettings().itemsPerPage;
  }

}
