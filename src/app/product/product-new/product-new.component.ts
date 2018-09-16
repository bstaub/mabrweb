import {Component, OnInit} from '@angular/core';

import {Product} from '../product.model';
import {ProductService} from '../shared/product.service';
import {ProductFirestoreService} from '../shared/product-firestore.service';
import * as firebase from 'firebase';
import {StorageService} from '../../shared/storage.service';
import {ProductCategoryService} from '../shared/product-category.service';
import {ProductCategory} from '../product-category.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styles: [`
    .product-new {
      border: 1px solid black;
      background-color: #ecf1f3;
      padding: 10px;
      margin-top: 40px;
    }
  `]
})
export class ProductNewComponent implements OnInit {

  product: Product = new Product();
  categories: Observable<ProductCategory[]>;
  selectedCategory: string;
  submitted = false;
  createdDate: string;
  image: string;

  constructor(
    private productService: ProductService,
    private productFirestoreService: ProductFirestoreService,
    private storageService: StorageService,
    private productCategory: ProductCategoryService
  ) {
  }

  ngOnInit() {
    // this.product.createdDate = this.productService.formatDate(new Date());  // this ist just for Realtime DB, for CloudFirstore use Timestamp!
    this.categories = this.productCategory.getCategories();

  }

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }

  save() {
    this.productService.createProduct(this.product);
    this.product = new Product();
  }


  onSubmit() {
    this.submitted = true;
    // this.save();  // Realtime DB see save above
    // this.userService.getCurrentUserId();

    const productObj = Object.assign({key: this.productFirestoreService.generateId(),
                                            image: this.image,
                                            productCategory: this.selectedCategory,
                                            createdDate: firebase.firestore.FieldValue.serverTimestamp()},
                                            this.product);

    this.productFirestoreService.addProduct(productObj);
  }


  onFileSelection($event) {
    this.storageService.upload($event)
      .then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

        uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
          this.image = downloadURL;

          /*
          // update Image
          const data: Product = {
            key: this.product.key,
            downloadUrl: downloadURL,
          };
          this.productFirestoreService.setProduct(data);
          */

        });

      });
  }


}
