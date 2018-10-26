import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { SettingsService } from '../../shared/settings.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

  products: Observable<Product[]>;
  p: number = 1;

  constructor( private productFireStoreService: ProductFirestoreService,
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
