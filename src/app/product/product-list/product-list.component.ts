import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Observable } from 'rxjs/index';
import { ProductFirestoreService } from '../shared/product-firestore.service';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [`

  `]
})
export class ProductListComponent implements OnInit {

  products: Observable<Product[]>;
  p: number = 1;

  constructor(private productFireStoreService: ProductFirestoreService) {
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.products = this.productFireStoreService.getProducts();
  }

}
