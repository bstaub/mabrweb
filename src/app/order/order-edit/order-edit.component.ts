import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../order-firestore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Subscription} from "rxjs";
import {Order} from '../order.model';



@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styles: []
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;
  private isNew = true;
  private orderKey: string;
  private order: Order;
  private anonymeOrder: boolean;
  private userId: string;


  constructor(private orderService: OrderService,
              private orderServiceFirestore: OrderFirestoreService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {


  }



  onSubmit() {

    const newOrder = this.orderForm.value;
    console.log(this.orderKey);
    if (this.isNew) {
      this.orderServiceFirestore.addOrder(newOrder);
    } else {
      this.orderServiceFirestore.updateOrder(this.orderKey, newOrder)
    }

    this.onNavigateBack();

  }

  onCancel() {
    this.onNavigateBack();
  }
  onNavigateBack() {
    this.router.navigate(['/bestellung']);
  }



  ngOnInit() {
    let orderData;
    this.activatedRoute.params.subscribe(
      params => {
        if (params.hasOwnProperty('id')) {

          this.isNew = false;
          this.orderKey = params['id'];
          this.orderServiceFirestore.getOrder(this.orderKey).ref.get()
            .then(function (doc) {

              orderData = doc.data();
              orderData.id = doc.id;
              //this.order = orderData;
            console.log(orderData);
          }).catch(function (error) {
            console.log("Error getting document:", error);
          })



        } else {
          this.isNew = true;
          this.order = null;
        }



      }
    );

    console.log(this.order);

    this.orderForm = new FormGroup({
      'userId': new FormControl('', Validators.required),
      'shopOrderId': new FormControl('', Validators.required),
      'anonymeOrder': new FormControl('false')

    });


    if (this.isNew) {
      this.userId = firebase.auth().currentUser.uid;
      this.orderForm.patchValue({'userId':this.userId});
    }




  }





}
