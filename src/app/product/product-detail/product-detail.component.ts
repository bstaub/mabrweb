import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product.model';

@Component({
  selector: 'app-detail-list',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {

  }

  updateActive(isActive: boolean) {
    this.productService.updateProduct(this.product.key, {active: isActive});
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.key);
  }


}
