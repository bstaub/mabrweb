import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { Order } from '../../models/order.model';
import { CustomerAddress } from '../../models/customerAddress.model';

@Component({
  selector: 'app-checkout-enterdata',
  templateUrl: './checkout-customerdata.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: 1px solid red;
    }
  `]
})
export class CheckoutCustomerdataComponent implements OnInit {
  CustomerAddressForm: FormGroup;
  user: any;
  orderData: any;
  order: Order;
  customerAddress: CustomerAddress;

  constructor(private orderFirestoreService: OrderFirestoreService,
              private userService: UserService,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.user = this.userService.getCurrentUser();
      this.getOrderData();
    }, 1000);


    this.initCustomerAddressFormGroup();

  }

  getOrderData() {
    this.orderFirestoreService.getUserOrder(this.user.uid).subscribe((res) => {
      this.orderData = res;
    });
  }

  onSubmit() {
    console.log(this.CustomerAddressForm);
    console.log(this.orderData);
    this.order = new Order();
    this.customerAddress = new CustomerAddress();
    this.customerAddress.firstname = this.CustomerAddressForm.value.firstname;
    this.order.key = this.user.uid;
    this.order.customerAddress = this.customerAddress;
    console.log(this.order);
    this.orderFirestoreService.updateOrder(this.order);

  }


  private initCustomerAddressFormGroup() {

    this.CustomerAddressForm = new FormGroup({
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
