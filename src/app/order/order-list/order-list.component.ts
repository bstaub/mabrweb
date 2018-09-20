import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../shared/order-firestore.service';
import {Router} from '@angular/router';
import {UserService} from '../../user/shared/user.service';



@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {
  orders: any;
  title: string;
  userId: string;
  user: any;

  constructor(private orderService: OrderService,
              private orderServiceFirestore: OrderFirestoreService,
              private router: Router,
              private userService: UserService) { }


  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.getAllOrders();
  }


  onNewOrder() {
    this.router.navigate(['/bestellung', 'neu']);
  }



  getAllOrders () {
    if (this.user) {
      this.userId = this.user.uid;
      console.log('getAllOrders - user OK');
      this.orders = this.orderServiceFirestore.getUserOrders(this.userId);


    } else {
      this.userId = '0';
      console.log('getAllOrders - No user');
      this.orders = this.orderServiceFirestore.getAnonymusOrders();
    }


  }

}
