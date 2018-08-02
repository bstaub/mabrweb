import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../order.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styles: []
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;



  constructor() { }

  ngOnInit() {
  }

}
