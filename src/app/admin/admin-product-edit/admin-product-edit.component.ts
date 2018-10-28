import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ProductService } from '../../product/shared/product.service';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { StorageService } from '../../shared/storage.service';
import { ProductCategoryService } from '../../product/shared/product-category.service';
import { Observable } from 'rxjs';
import { ProductCategory } from '../../models/product-category.model';
import { Product } from '../../models/product.model';
import { AlertifyService } from '../../shared/alertify.service';


@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.scss']
})
export class AdminProductEditComponent implements OnInit {
  product: Product = new Product();
  submitted = false;
  createdDate: string;
  categories$: Observable<ProductCategory[]>;
  selectedCategory: ProductCategory;
  image: any;
  discount = false;
  newProduct = false;
  bestRated =  false;

  constructor(
    private productService: ProductService,
    private productFirestoreService: ProductFirestoreService,
    private storageService: StorageService,
    private productCategory: ProductCategoryService,
    private alertifyService: AlertifyService,
  ) { }


  ngOnInit() {
    this.categories$ = this.productCategory.getCategories();
  }

  onSubmit() {
    this.submitted = true;
    if (this.product.discountFactor === undefined || this.product.discountFactor == null || this.product.discount === false) {
      this.product.discountFactor = 1;
    }

    if (!this.image) {
      this.image = 'https://firebasestorage.googleapis.com/v0/b/mabrweb-e6503.appspot.com/o/mvi9oepg?alt=media&token=69801fdc-bbb0-4e19-84e3-e87b5615ca0b';
    }

    const productObj = Object.assign({
        key: this.productFirestoreService.getPushKey(),
        image: this.image,
        productCategory: this.selectedCategory.name,
        createdDate: firebase.firestore.FieldValue.serverTimestamp(),
        discount: this.discount,
        newProduct: this.newProduct,
        bestRated: this.bestRated,
        discountFactor : this.product.discountFactor,
      },
      this.product);

    this.productFirestoreService.addProduct(productObj);
    this.alertifyService.success(this.product.name + ' wurde erfolgreich angelegt. Produkt muss noch über die Liste aktiviert werden!');
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
