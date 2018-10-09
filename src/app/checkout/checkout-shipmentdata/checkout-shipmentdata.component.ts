import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/shared/user.service';
import { Router } from '@angular/router';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { Order } from '../../models/order.model';


@Component({
  selector: 'app-checkout-shipmentdata',
  templateUrl: './checkout-shipmentdata.component.html',
  styleUrls: ['./checkout-shipmentdata.component.css']
})
export class CheckoutShipmentdataComponent implements OnInit {
  ShipmentForm: FormGroup;
  user: any;
  orderData: any;
  order: Order;


  constructor(private orderFirestoreService: OrderFirestoreService,
              private userService: UserService,
              private router: Router,
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
    this.router.navigate(['/checkout/paymentdata']);
  }

  getOrderData() {
    this.orderFirestoreService.getUserOrder(this.user.uid).subscribe((res) => {
      this.orderData = res;
    });
  }

  initShipmentFormGroup() {
    this.ShipmentForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lasttname: new FormControl(null, Validators.required),
      addresss: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      mail: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl(null)
    });


  }

}
