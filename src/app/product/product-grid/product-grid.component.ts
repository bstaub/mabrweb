import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../shared/product.service';
import { ProductFirestoreService } from '../shared/product-firestore.service';
import { ProductCategoryService } from '../shared/product-category.service';
import { ProductCategory } from '../../models/product-category.model';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  products: Observable<Product[]>;
  categories: Observable<ProductCategory[]>;
  filteredProducts: any[] | number;

  selectedProduct: string; // just for show Product Category in Template
  selectedSort: string;

  // einfach Produkte nachladen start
  limit = 5;
  next = 5;
  // einfach Produkte nachladen end

  constructor(private productService: ProductService,
              private productFireStoreService: ProductFirestoreService,
              private productCategory: ProductCategoryService,
  ) {
  }

  ngOnInit() {
    this.getProductList();
    this.categories = this.productCategory.getCategories();

    // RxJS BehaviorSubject start
    // this.productFireStoreService.currentMessage.subscribe(message => this.filteredProducts = message);
    this.productFireStoreService.currentMessage.subscribe(message => {
      if (message !== 0) {
        this.filteredProducts = message;
      } else {
        this.filteredProducts = null;
      }
    });
    // RxJS BehaviorSubject end
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
