import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../product/product.model';
import {ProductService} from '../../product/shared/product.service';
import {ProductFirestoreService} from '../../product/shared/product-firestore.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

  // products: Observable<any[]>;
  // products: Observable<any>;
  products: Observable<Product[]>;

  constructor(private productService: ProductService, private productFireStoreService: ProductFirestoreService) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductListAsync() {
    // | async in Teamplate Ausgabe hinzufügen, product kann dann auch vom Typ Observable<any[]> zurückgeben!
    // this.products = this.productService.getProductList().valueChanges();
  }

  getProductList() {
    this.products = this.productFireStoreService.getProducts();


    // this.productService.getProductList().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // ).subscribe(products => {
    //   console.log('bslogger: ', products);
    //   this.products = products;
    // });
  }

  deleteProducts() {
    this.productService.deleteAll();
  }

}
