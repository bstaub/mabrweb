import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../order-firestore.service';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {
  selectedOrder: Observable<any>;
  order: Observable<any>;
  private orderId: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private orderFirestoreService: OrderFirestoreService,
    private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.orderId = params['id'];
        // this.selectedOrder = this.orderService.getOrder(params['id']).valueChanges();
        // this.order = this.orderService.getProductsPerOrder(params['id']).valueChanges();

        this.selectedOrder = this.orderFirestoreService.getOrder(params['id']).valueChanges();
        this.order = this.orderFirestoreService.getProductsPerOrder(params['id']).valueChanges();
      }
    );

  }


  onDelete() {
    this.router.navigate(['/bestellung']);
    // this.orderService.deleteOrder(this.orderId);
    this.orderFirestoreService.deleteOrder(this.orderId);
  }


  onEdit() {
    this.router.navigate(['/bestellung', this.orderId, 'bearbeiten']);
  }

  onAuthorize() {

  }

  onSubmitOrder() {

  }




}
