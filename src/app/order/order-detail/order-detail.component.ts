import { Component, OnInit } from '@angular/core';
import {Order} from '../order.model';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order.service';
import {Observable} from 'rxjs';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {
  selectedOrder: Observable<any>;
  items: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.selectedOrder = this.orderService.getOrder(params['id']).valueChanges();
        this.items = this.orderService.getProductsPerOrder(params['id']).valueChanges();
        console.log(this.items);
      }
    );


  }

}
