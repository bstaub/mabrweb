import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../shared/order-firestore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../order.model';
import {UserService} from '../../user/shared/user.service';


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styles: []
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;
  private isNew = true;
  private orderKey: string;
  public order: Order;
  private anonymeOrder: boolean;
  private userId: string;
  user: any;
  allUsers: any;
  selectedUser: string;


  constructor(private orderService: OrderService,
              private orderServiceFirestore: OrderFirestoreService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {


  }


  onAuthorize() {

    console.log(this.selectedUser);
    console.log(this.order);

    var orderData;
    this.orderServiceFirestore.getOrderDocAnonymus(this.orderKey).ref.get()
      .then(function (doc) {

        orderData = doc.data() as Order;
        orderData.id = doc.id;
        this.orderServiceFirestore.updateOrder(this.orderKey, orderData)

      }).catch(function (error) {
      console.log('Error getting document:', error);
    });
    console.log(orderData);

    this.onNavigateBack();

  }

  onCancel() {
    this.onNavigateBack();
  }

  onNavigateBack() {
    this.router.navigate(['/bestellung']);
  }


  ngOnInit() {

    this.user = this.userService.getCurrentUser();
    this.getAllUsers();


    this.activatedRoute.params.subscribe(
      params => {
        if (params.hasOwnProperty('id')) {

          this.isNew = false;
          this.orderKey = params['id'];

        } else {
          this.isNew = true;
          this.order = null;
        }


      }
    );


    var orderData;
    if (!this.isNew) {

      if (this.user) {

        this.orderServiceFirestore.getOrderDoc(this.orderKey,this.user.uid).ref.get()
          .then(function (doc) {

            orderData = doc.data() as Order;
            orderData.id = doc.id;

          }).then(function () {

        })
          .catch(function (error) {
          console.log('Error getting document:', error);
        });

      } else {

        this.orderServiceFirestore.getOrderDocAnonymus(this.orderKey).ref.get()
          .then(function (doc) {

            orderData = doc.data() as Order;
            orderData.id = doc.id;

          }).catch(function (error) {
          console.log('Error getting document:', error);
        });


      }



    }







    setTimeout(function () {


      this.order = orderData;
      console.log(this.order);


    }, 1000);



    this.orderForm = new FormGroup({
      'userId': new FormControl('', Validators.required),
      'shopOrderId': new FormControl('', Validators.required),
      'anonymeOrder': new FormControl('false')

    });


    if (this.isNew) {

      //this.userId = this.userService.getCurrentUserId();
      //this.orderForm.patchValue({'userId': this.userId});
    }  else {

      //this.orderForm.patchValue({'userId': this.order.userId});
      //this.orderForm.patchValue({'shopOrderId': this.order.shopOrderId});


    }


  }


  getAllUsers () {

    this.allUsers = this.userService.getUsers()

  }


}
