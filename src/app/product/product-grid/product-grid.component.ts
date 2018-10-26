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

  products: Observable<Product[]>;
  categories: Observable<ProductCategory[]>;
  filteredProducts: any[] | number;

  selectedProduct: string; // just for show Product Category in Template
  selectedSort: string;
  p: number = 1; // ngx-pageination

  constructor(private productService: ProductService,
              private productFireStoreService: ProductFirestoreService,
              private productCategory: ProductCategoryService,
              private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.getProductList();
    this.categories = this.productCategory.getCategories();
    // https://stackoverflow.com/questions/39601026/angular-2-scroll-to-top-on-route-change  (not needed anymore in angular 7)
  }

  getProductList() {
    this.products = this.productFireStoreService.getProducts();
  }

  selectedCategory(event) {
    const categoryName = event.target.value;
    if (categoryName === '/') {  // when no category is selected (/), set filteredProduct to null
      this.filteredProducts = null;
      this.products = this.productFireStoreService.getProducts();
    } else {
      this.filteredProducts = this.productFireStoreService.getCategory(categoryName);
    }
  }

  selectedSortOption(event) {
    const selectedSortOption = event.target.value;
    if (selectedSortOption === 'a-z') {
      this.productFireStoreService.sortProductsByNameAsc();
      this.products = this.productFireStoreService.getProducts();
    }
    if (selectedSortOption === 'z-a') {
      this.productFireStoreService.sortProductsByNameDesc();
      this.products = this.productFireStoreService.getProducts();
    }
    if (selectedSortOption === 'low-high') {
      this.productFireStoreService.sortProductsByPriceAsc();
      this.products = this.productFireStoreService.getProducts();
    }
    if (selectedSortOption === 'high-low') {
      this.productFireStoreService.sortProductsByPriceDesc();
      this.products = this.productFireStoreService.getProducts();
    }
  }

  get itemsPerPage() {
    return this.settingsService.getSettings().itemsPerPage;
  }

  ngOnDestroy() {

  }

}
