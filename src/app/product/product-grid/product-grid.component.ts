import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../product.model';
import {ProductService} from '../shared/product.service';
import {ProductFirestoreService} from '../shared/product-firestore.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  products: Observable<Product[]>;
  selectedProduct: string;

  constructor(private productService: ProductService, private productFireStoreService: ProductFirestoreService) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.products = this.productFireStoreService.getProducts();
  }

  deleteProducts() {
    this.productService.deleteAll();
  }

}
