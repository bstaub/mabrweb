import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Observable } from 'rxjs/index';
import { ProductFirestoreService } from '../shared/product-firestore.service';
import { Product } from '../../models/product.model';
import { SettingsService } from '../../shared/settings.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [`

  `]
})
export class ProductListComponent implements OnInit {

  products: Observable<Product[]>;
  p = 1;

  constructor(private productFireStoreService: ProductFirestoreService,
              private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.products = this.productFireStoreService.getProducts();
  }

  get itemsPerPage() {
    return this.settingsService.getSettings().itemsPerPage;
  }

}
