import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styles: []
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;
  anonymeOrder: boolean;


  constructor(private orderService: OrderService,
              private router: Router) { }


  onSubmit() {

    const newOrder = this.orderForm.value;
    console.log(newOrder);
    this.orderService.createOrder(newOrder);
    this.onNavigateBack();

  }

  onCancel() {
    this.onNavigateBack();
  }
  onNavigateBack() {
    this.router.navigate(['/bestellung']);
  }

  ngOnInit() {

    this.orderForm = new FormGroup({
      'userId': new FormControl(null, Validators.required),
      'anonymeOrder': new FormControl('false')

    });


  }




}
