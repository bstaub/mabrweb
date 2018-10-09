import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ProductService } from '../../product/shared/product.service';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { StorageService } from '../../shared/storage.service';
import { ProductCategoryService } from '../../product/shared/product-category.service';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.css']
})
export class AdminProductEditComponent implements OnInit {
  cities: City[];
  selectedCity: City;


  selectedValues: string[] = ['val1', 'val2', 'val3'];


  image: any;

  constructor(
    private productService: ProductService,
    private productFirestoreService: ProductFirestoreService,
    private storageService: StorageService,
    private productCategory: ProductCategoryService,
  ) {

    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];

  }


  ngOnInit() {

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
