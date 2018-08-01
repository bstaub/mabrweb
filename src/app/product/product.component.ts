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
  constructor(private productService: ProductService) { }

  ngOnInit() {

  }

  getBasket() {
    this.basket = this.productService.getbasket();
  }

}
