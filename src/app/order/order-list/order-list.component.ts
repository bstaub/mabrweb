import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderFirestoreService } from '../shared/order-firestore.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/shared/user.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {
  orders: any;
  title: string;
  userId: string;
  // user: User;
  user: any;

  uid: string;


  constructor(private orderService: OrderService,
              private orderServiceFirestore: OrderFirestoreService,
              private router: Router,
              private userService: UserService) {
  }


  ngOnInit() {
    setTimeout(() => {
      this.user = this.userService.getCurrentUser();
      this.getAllOrders();
      console.log('reload!!!');
      console.log(this.user);
    }, 1200);


    //this.uid = this.userService.getCurrentUserId();
    //this.getUser();


  }

  getUser() {
    // this.localStorageUser = this.userService.getProfileFromLocalStorage();
    return this.userService.getUser(this.uid)
      .subscribe(data => {
        this.user = data;
      });
  }


  onNewOrder() {
    this.router.navigate(['/bestellung', 'neu']);
  }


  getAllOrders() {
    if (this.user) {
      this.userId = this.user.uid;
      console.log('getAllOrders - user OK');
      this.orders = this.orderServiceFirestore.getUserOrder(this.userId);


    } else {
      this.userId = '0';
      console.log('getAllOrders - No user');
      //this.orders = this.orderServiceFirestore.getAnonymusOrder();
    }


  }

}
