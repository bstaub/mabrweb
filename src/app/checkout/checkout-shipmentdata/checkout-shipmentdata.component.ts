import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../user/shared/user.service';
import { Router } from '@angular/router';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { Order } from '../../models/order.model';


@Component({
  selector: 'app-checkout-shipmentdata',
  templateUrl: './checkout-shipmentdata.component.html',
  styles: [``]
})
export class CheckoutShipmentdataComponent implements OnInit {
  ShipmentForm: FormGroup;
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


    this.initShipmentFormGroup();
  }

  onSubmit() {
    console.log(this.ShipmentForm.value);
    this.order = new Order();
    this.order.key = this.user.uid;
    this.order.shippingMethod = this.ShipmentForm.value.shippingmethod;
    this.orderFirestoreService.updateOrder(this.order);
    this.router.navigate(['/checkout/paymentdata']);

  }

  getOrderData() {
    this.orderFirestoreService.getUserOrder(this.user.uid).subscribe((res) => {
      this.orderData = res;
    });
  }

  initShipmentFormGroup() {
    this.ShipmentForm = new FormGroup({
      shippingmethod: new FormControl()

    });


  }

}
