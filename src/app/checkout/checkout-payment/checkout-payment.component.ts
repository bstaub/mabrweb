import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { Router } from '@angular/router';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styles: [``]
})
export class CheckoutPaymentComponent implements OnInit {

  PaymentForm: FormGroup;
  user: any;
  orderData: any;
  order: Order;


  constructor(private orderFirestoreService: OrderFirestoreService,
              private userService: UserService,
              private router: Router
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.user = this.userService.getCurrentUser();
      this.getOrderData();

    }, 1000);


    this.initPaymentFormGroup();
  }

  onSubmit() {
    console.log(this.PaymentForm.value);
    this.order = new Order();
    this.order.key = this.user.uid;
    this.order.paymentdMethod = this.PaymentForm.value.paymentmethod;
    this.orderFirestoreService.updateOrder(this.order);
    this.router.navigate(['/checkout/thx']);

  }


  getOrderData() {
    this.orderFirestoreService.getUserOrder(this.user.uid).subscribe((res) => {
      this.orderData = res;
    });
  }

  initPaymentFormGroup() {
    this.PaymentForm = new FormGroup({
      paymentmethod: new FormControl()

    });

  }
}

