import { Component, OnInit } from '@angular/core';
import { ProductService} from '../product.service';
import { Observable} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [`
  li {
    list-style-type: none;
  }
  `]
})
export class ProductListComponent implements OnInit {

  // products: Observable<any[]>;
  // products: Observable<any>;
  products: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductListAsync() {
    // | async in Teamplate Ausgabe hinzufügen, product kann dann auch vom Typ Observable<any[]> zurückgeben!
    this.products = this.productService.getProductList().valueChanges();
  }

  getProductList() {
    this.productService.getProductList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(products => {
      console.log('bslogger: ', products);
      this.products = products;
    });
  }

  deleteProducts() {
    this.productService.deleteAll();
  }

}
