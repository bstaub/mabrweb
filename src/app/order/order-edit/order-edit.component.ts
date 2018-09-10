import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';
import {AuthService} from '../../user/auth.service';
import {User} from '../../user/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styles: []
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;
  anonymeOrder: boolean;
  private user: Observable<firebase.User>;
  userDetails: firebase.User = null;


  constructor(private orderService: OrderService,
              private router: Router,
              private afAuth: AngularFireAuth) {
    // Get Current Auth User
    this.user = afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }


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
