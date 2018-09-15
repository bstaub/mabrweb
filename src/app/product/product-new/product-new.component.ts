import {Component, OnInit} from '@angular/core';

import {Product} from '../product.model';
import {ProductService} from '../shared/product.service';
import {ProductFirestoreService} from '../shared/product-firestore.service';
import * as firebase from 'firebase';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styles: [`
    .product-new {
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
  createdDate: string;

  constructor(
    private productService: ProductService,
    private productFirestoreService: ProductFirestoreService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    // this.product.createdDate = this.productService.formatDate(new Date());  // this ist just for Realtime DB, for CloudFirstore use Timestamp!
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
    // this.save();  // Realtime DB see save above
    // this.userService.getCurrentUserId();

    const productObj = Object.assign({key: this.productFirestoreService.generateId(), createdDate: firebase.firestore.FieldValue.serverTimestamp()}, this.product);
    this.productFirestoreService.addProduct(productObj);
  }
}
