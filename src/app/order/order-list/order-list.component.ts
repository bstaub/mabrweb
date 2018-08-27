import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../order-firestore.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Order} from '../order.model';
import {error} from 'util';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {

  // orders: any;
  orders: any;

  constructor(private orderService: OrderService,
              private orderServiceFirestore: OrderFirestoreService,
              private router: Router) { }

  ngOnInit() {
    this.getAllOrders();
  }

  onNewOrder() {
    this.router.navigate(['/bestellung', 'neu']);

  }


  getAllOrders () {

    this.orders = this.orderServiceFirestore.getOrders();

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
