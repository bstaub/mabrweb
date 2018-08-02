import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {

  orders: any;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getAllOrders();
  }


  getAllOrders () {
    // Use snapshotChanges().map() to store the key
    this.orderService.getOrderList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(orders => {
      this.orders = orders;
    });
  }

}
