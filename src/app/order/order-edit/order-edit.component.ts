import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../shared/order-firestore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../order.model';
import {UserService} from '../../user/shared/user.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styles: []
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;
  orderArray: any[];
  order: any;
  private userId: string;
  user: any;
  allUsers: any;
  selectedUser: string;
  selectedOrder: any;


  constructor(private orderService: OrderService,
              private orderFirestoreService: OrderFirestoreService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {


  }


  onAuthorize() {

    //console.log(this.selectedUser);
    this.orderArray = this.orderFirestoreService.getOrderDocAnonymusData();
    console.log(this.orderArray);
    //console.log('test');
    //this.order = this.order[0];
    //console.log(this.order);


    const newOrder = new Order();
    //newOrder.shopOrderId = this.order.sh

    // Objekt erstellen
    // Id hinzufügen
    // ersetzen
    // in order speicher
    // in order_temp löschen


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


        }

      }
    );








  }


  getAllUsers () {

    this.allUsers = this.userService.getUsers()

  }


}
