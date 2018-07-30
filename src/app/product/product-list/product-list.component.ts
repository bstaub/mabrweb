import { Component, OnInit } from '@angular/core';
import { ProductService} from '../product.service';
import { Observable} from 'rxjs/index';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: []
})
export class ProductListComponent implements OnInit {

  products: Observable<any>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.products = this.productService.getProductList().valueChanges();
  }

}
