import { Component, OnInit } from '@angular/core';
import {ProductService} from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [`
    
  `]
})
export class ProductComponent implements OnInit {

  basket = [];
  basketObj = {};
  constructor(private productService: ProductService) { }

  ngOnInit() {

  }

  getBasket() {
    // this.basketObj = this.productService.getbasket();
    this.basket = this.productService.getbasket();
  }

}
