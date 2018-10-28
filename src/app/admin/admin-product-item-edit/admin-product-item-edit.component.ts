import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import * as firebase from 'firebase';
import { StorageService } from '../../shared/storage.service';
import { ProductCategory } from '../../models/product-category.model';
import { ProductCategoryService } from '../../product/shared/product-category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-product-item-edit',
  templateUrl: './admin-product-item-edit.component.html',
  styleUrls: ['./admin-product-item-edit.component.scss']
})
export class AdminProductItemEditComponent implements OnInit {

  @Input() product: Product;
  @Input() count: number;

  editState = false;
  productToEdit: Product;
  image: any;
  selectedCategory: ProductCategory;
  categories$: Observable<ProductCategory[]>;

  constructor(private productService: ProductFirestoreService,
              private orderFirestoreService: OrderFirestoreService,
              private storageService: StorageService,
              private productCategory: ProductCategoryService
  ) {
  }

  ngOnInit() {
    this.categories$ = this.productCategory.getCategories();
    if (this.product.discountFactor == null || this.product.discount === false) {
      this.product.discountFactor = 1;
    }
  }

  updateActive(isActive: boolean) {
    this.productService.updateProduct(this.product.key, {active: isActive});
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.key);
  }

  editProduct(event, product) {
    this.selectedCategory = product.productCategory;  // wichtig, damit der Initial Wert der vorhandene Wert beim Dropdown Edit übernommen wird!
    this.editState = true;
    this.productToEdit = product;
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product.key, product, this.image, this.selectedCategory.name);  // Parameter 3 und 4 is optional for Admin Edit!
  }

  onFileSelection($event) {
    this.storageService.upload($event)
      .then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

        uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
          this.image = downloadURL;

        });

      });
  }
}
