import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../order-firestore.service';
import {Router} from '@angular/router';
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
  userId: string;


  constructor(private orderService: OrderService,
              private orderServiceFirestore: OrderFirestoreService,
              private router: Router,
              private afAuth: AngularFireAuth) {


  }



  onSubmit() {

    const newOrder = this.orderForm.value;
    console.log(newOrder);
    this.orderServiceFirestore.addOrder(newOrder);
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
      'userId': new FormControl('', Validators.required),
      'anonymeOrder': new FormControl('false')

    });


    this.userId = firebase.auth().currentUser.uid;
    this.orderForm.patchValue({'userId':this.userId});
    console.log(this.userId)


  }





}
