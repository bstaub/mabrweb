import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../product.model';
import {ProductService} from '../shared/product.service';
import {ProductFirestoreService} from '../shared/product-firestore.service';
import {ProductCategoryService} from '../shared/product-category.service';
import {ProductCategory} from '../product-category.model';
import {getProjectAsAttrValue} from '@angular/core/src/render3/node_selector_matcher';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  products: Observable<Product[]>;
  categories: Observable<ProductCategory[]>;
  filteredProducts: any[];

  selectedProduct: string; // just for show Product Category in Template
  selectedSort: string;



  constructor(private productService: ProductService,
              private productFireStoreService: ProductFirestoreService,
              private productCategory: ProductCategoryService
              ) { }

  ngOnInit() {
    this.getProductList();
    this.categories = this.productCategory.getCategories();
  }

  getProductList() {
    this.products = this.productFireStoreService.getProducts();
  }

  deleteProduct() {
    this.productFireStoreService.deleteAll();
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
    if (selectedSortOption === 'old-new') {
      this.productFireStoreService.sortProductsByCreatedDateAsc();
      this.products = this.productFireStoreService.getProducts();
    }
    if (selectedSortOption === 'new-old') {
      this.productFireStoreService.sortProductsByCreatedDateDesc();
      this.products = this.productFireStoreService.getProducts();
    }
  }

}
