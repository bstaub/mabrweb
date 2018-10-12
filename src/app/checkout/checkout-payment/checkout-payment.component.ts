import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { ActivatedRoute } from '@angular/router';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';


@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onOrder() {
    const order = new Order();
    order.shopOrderId = 'done-123-001';
    order.orderDate = new Date();
    order.status = 'done';
    // order.totalValue = this.order.totalValue;
    // order.userId = this.user.uid;
    // this.orderId = this.orderFirestoreService.closeUserOrder(order);
    // console.log(this.orderId);
    // this.orderFirestoreService.closeProductsPerOrder(this.orderId, this.user.uid, this.productPerOrderLocalStorage);
    this.onDeleteScart();

  }

  onDeleteScart() {
    /// this.orderFirestoreService.clearScart(this.productPerOrderLocalStorage);
    // this.productPerOrderLocalStorage = [];
    // this.router.navigate(['/bestellung']);
    // this.calculateTotalSum();
  }

}
