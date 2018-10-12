import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ProductService } from '../../product/shared/product.service';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { StorageService } from '../../shared/storage.service';
import { ProductCategoryService } from '../../product/shared/product-category.service';
import { Observable } from 'rxjs';
import { ProductCategory } from '../../models/product-category.model';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.css']
})
export class AdminProductEditComponent implements OnInit {
  product: Product = new Product();
  submitted = false;
  createdDate: string;
  categories: Observable<ProductCategory[]>;
  selectedCategory: ProductCategory;
  // selectedCategory: string = '';
  image: any;
  discount: boolean = false;
  newProduct: boolean = false;
  bestRated: boolean = false;
  // selectedValues: string[] = [];  // ['discount', 'newProduct', 'bestRated'];

  constructor(
    private productService: ProductService,
    private productFirestoreService: ProductFirestoreService,
    private storageService: StorageService,
    private productCategory: ProductCategoryService,
  ) { }


  ngOnInit() {
    this.categories = this.productCategory.getCategories();
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
        // productCategory: this.selectedCategory,
        productCategory: this.selectedCategory.name,
        createdDate: firebase.firestore.FieldValue.serverTimestamp(),
        discount: this.discount,
        newProduct: this.newProduct,
        bestRated: this.bestRated,
      },
      this.product);

    this.productFirestoreService.addProduct(productObj);
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
