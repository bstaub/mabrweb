import { Component, OnInit } from '@angular/core';
import {Order} from '../order.model';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {
  selectedOrder: Observable<any>;
  order: Observable<any>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.selectedOrder = this.orderService.getOrder(params['id']).valueChanges();
        this.order = this.orderService.getProductsPerOrder(params['id']).valueChanges();
      }
    );


  }

}
