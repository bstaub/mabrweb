import { Component, OnInit } from '@angular/core';
import { ProductService} from '../product.service';
import { Observable} from 'rxjs/index';

@Component({
  selector: 'app-detail-list',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {

  products: Observable<any>;

  constructor(private productService: ProductService) { }

  ngOnInit() {

  }


}
