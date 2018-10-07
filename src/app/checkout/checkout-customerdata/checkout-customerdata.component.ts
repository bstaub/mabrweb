import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-enterdata',
  templateUrl: './checkout-customerdata.component.html',
  styles: []
})
export class CheckoutCustomerdataComponent implements OnInit {
  CustomerAddressForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.initCustomerAddressFormGroup();

  }


  private initCustomerAddressFormGroup() {

    this.CustomerAddressForm = new FormGroup({
      firstname: new FormControl(null),
      lasttname: new FormControl(null),
      addresss: new FormControl(null),
      zip: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null)
    });
  }
}
