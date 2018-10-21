import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../product/shared/product.service';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(private productService: ProductService, private productFireStoreService: ProductFirestoreService) {
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.products = this.productFireStoreService.getProducts();

  }

}
