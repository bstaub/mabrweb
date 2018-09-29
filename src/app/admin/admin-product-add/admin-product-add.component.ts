import { Component, OnInit } from '@angular/core';
import { Product } from '../../product/product.model';
import { Observable } from 'rxjs';
import { ProductCategory } from '../../product/product-category.model';
import { ProductService } from '../../product/shared/product.service';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { StorageService } from '../../shared/storage.service';
import { ProductCategoryService } from '../../product/shared/product-category.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent implements OnInit {

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
    private productCategory: ProductCategoryService,
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

    if (!this.image) {  // add default noImage Pic, when no image is choosen..
      this.image = 'https://firebasestorage.googleapis.com/v0/b/mabrweb-e6503.appspot.com/o/mvi9oepg?alt=media&token=69801fdc-bbb0-4e19-84e3-e87b5615ca0b';
    }

    const productObj = Object.assign({
        key: this.productFirestoreService.getPushKey(),
        image: this.image,
        productCategory: this.selectedCategory,
        createdDate: firebase.firestore.FieldValue.serverTimestamp()
      },
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
