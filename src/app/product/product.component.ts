import { Component, OnInit } from '@angular/core';
import {ProductService} from './shared/product.service';
import {LocalStorageService} from '../shared/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [`
    
  `]
})
export class ProductComponent implements OnInit {

  shoppingCartContent: string;

  basket = [];
  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit() {

  }


  getBasket() {
    // this.basket = this.productService.getbasket();
    this.router.navigate(['/bestellung']);
  }

}
