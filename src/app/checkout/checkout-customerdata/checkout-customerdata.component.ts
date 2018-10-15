import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { Order } from '../../models/order.model';
import { CustomerAddress } from '../../models/customerAddress.model';
import { Router } from '@angular/router';


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
  orderId: string;
  order: Order;
  customerAddress: CustomerAddress;

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


    this.initCustomerAddressFormGroup();

  }

  getOrderData() {
    this.orderFirestoreService.getUserOrder(this.orderFirestoreService.getOrderId()).subscribe((res) => {
      this.orderData = res;
    });
  }

  onSubmit() {
    this.order = new Order();
    this.order.key = this.orderFirestoreService.getOrderId();
    this.customerAddress = new CustomerAddress();
    this.customerAddress.firstname = this.CustomerAddressForm.value.firstname;
    this.customerAddress.lastname = this.CustomerAddressForm.value.lastname;
    this.customerAddress.address = this.CustomerAddressForm.value.address;
    this.customerAddress.zip = this.CustomerAddressForm.value.zip;
    this.customerAddress.city = this.CustomerAddressForm.value.city;
    this.customerAddress.country = this.CustomerAddressForm.value.country;
    this.customerAddress.phone = this.CustomerAddressForm.value.phone;
    this.customerAddress.mail = this.CustomerAddressForm.value.mail;
    this.order.customerAddress = this.customerAddress;
    this.orderFirestoreService.updateOrder(this.order);
    this.router.navigate(['/checkout/shipmentdata']);

  }


  initCustomerAddressFormGroup() {

    this.CustomerAddressForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
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

    setTimeout(() => {

      if (this.orderData) {
        this.setOrderData();
      }
    }, 1300);

  }

  setOrderData() {
    this.CustomerAddressForm.patchValue({
      firstname: this.orderData.customerAddress.firstname,
      lastname: this.orderData.customerAddress.lastname,
      addresss: this.orderData.customerAddress.addresss,
      zip: this.orderData.customerAddress.zip,
      city: this.orderData.customerAddress.city,
      country: this.orderData.customerAddress.country
    });

  }


}
