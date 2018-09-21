import { Component, OnInit } from '@angular/core';
import {AuthService} from '../user/shared/auth.service';
import {User} from '../user/user';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {ProductsPerOrder} from './productsPerOrder.model';
import {ProductFirestoreService} from '../product/shared/product-firestore.service';
import {OrderFirestoreService} from './shared/order-firestore.service';
import {UserService} from '../user/shared/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-order-start',
  template: `
    
    <div>
      <div>
        <div>
          <div>
            <select [(ngModel)]="selectedProduct">
              <option value="">- Select -</option>
              <option *ngFor="let product of allProducts | async" [value]="product.key">{{product.name}}</option>
            </select>
          </div>
          <div><input type="text" class="form-control" [(ngModel)]="productAmount"></div>
          <div>
            <button
              type="button"
              class="btn btn-primary"
              (click)="onAddProductControl()">+
            </button>
          </div>
        </div>
      </div>
    </div>


  `,
  styles: []
})
export class OrderStartComponent implements OnInit {

  allProducts: any;
  selectedProduct: string;
  productAmount: number;
  user: any;

  constructor( private orderFirestoreService: OrderFirestoreService,
               private productFireStoreService: ProductFirestoreService,
               private router: Router,
               private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.getAllProducts();
  }

  getAllProducts () {

    this.allProducts = this.productFireStoreService.getProducts();

  }
  onAddProductControl() {

    let newProductperOrder = new ProductsPerOrder();
    //newProductperOrder.orderId = this.orderId;
    newProductperOrder.productId = this.selectedProduct;
    newProductperOrder.qty = this.productAmount;

    if (this.user) {
      newProductperOrder.userId = this.user.uid;
      this.orderFirestoreService.addProductToOrder(newProductperOrder);
      console.log('onAddProductControl - user Ok');
    } else {
      newProductperOrder.userId = '0';
      this.orderFirestoreService.addProductToOrderAnonymus(newProductperOrder);
      console.log('onAddProductControl - No user');
    }

    this.selectedProduct = '';
    this.productAmount = 0;


  }


}
