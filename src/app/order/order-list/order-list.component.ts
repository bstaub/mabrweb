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
  // orders: any;
  orders: any;
  title: string;

  constructor(private orderService: OrderService,
              private orderServiceFirestore: OrderFirestoreService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.getAllOrders();
    //this.title = this.userService.getCurrentUserId();
    //console.log(this.title);

  }

  onNewOrder() {
    this.router.navigate(['/bestellung', 'neu']);

  }


  getAllOrders () {

    this.orders = this.orderServiceFirestore.getOrders();
    //console.log(this.orders)

    /*
    // Use snapshotChanges().map() to store the key
    this.orderService.getOrderList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(orders => {
      this.orders = orders;
    });
    */
  }

}
