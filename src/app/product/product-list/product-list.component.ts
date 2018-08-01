import { Component, OnInit } from '@angular/core';
import { ProductService} from '../product.service';
import { Observable} from 'rxjs/index';



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

  products: Observable<any>;
  // products: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.products = this.productService.getProductList().valueChanges();
    /*
    // Use snapshotChanges().map() to store the key
    this.productService.getProductList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(products => {
      this.products = products;
    });
    */
  }

  deleteProducts() {
    this.productService.deleteAll();
  }

}
