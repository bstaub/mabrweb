import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../product.model';
import {ProductService} from '../shared/product.service';
import {ProductFirestoreService} from '../shared/product-firestore.service';
import {ProductCategoryService} from '../shared/product-category.service';
import {ProductCategory} from '../product-category.model';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  products: Observable<Product[]>;
  categories: Observable<ProductCategory[]>;
  selectedProduct: string;

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

  deleteProducts() {
    this.productService.deleteAll();
  }

}
