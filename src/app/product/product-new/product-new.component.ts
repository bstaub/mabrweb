import { Component, OnInit } from '@angular/core';

import { Product} from '../product.model';
import { ProductService} from '../product.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styles: [`    
    .product-new{
      border: 1px solid black;
      background-color: #ecf1f3;
      padding: 10px;
      margin-top: 40px;
    }
  `]
})
export class ProductNewComponent implements OnInit {

  product: Product = new Product();
  submitted = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }

  save() {
    this.productService.createProduct(this.product);
    this.product = new Product();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
