import { Component, OnInit } from '@angular/core';
import {ProductPerOrder} from './productPerOrder.model';
import {ProductFirestoreService} from '../product/shared/product-firestore.service';
import {OrderFirestoreService} from './shared/order-firestore.service';
import {UserService} from '../user/shared/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-order-start',
  template: `
    
   


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
    console.log('order-start')
    this.user = this.userService.getCurrentUser();
    this.getAllProducts();
  }

  getAllProducts () {

    this.allProducts = this.productFireStoreService.getProducts();

  }
  onAddProductControl() {

    let newProductperOrder = new ProductPerOrder();
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
