import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [`

  `]
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {

  }

  getBasket() {
    this.router.navigate(['/bestellung']);
  }

}
