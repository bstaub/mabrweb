import { AfterContentChecked, AfterContentInit, Component, OnChanges, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ProductService } from '../../product/shared/product.service';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { StorageService } from '../../shared/storage.service';
import { ProductCategoryService } from '../../product/shared/product-category.service';
import { Observable, Subscription } from 'rxjs';
import { ProductCategory } from '../../product/product-category.model';
import { first, tap } from 'rxjs/operators';


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
  categories: Observable<ProductCategory[]>;
  // categories: Promise<ProductCategory[]>;
  categorySubscription: Subscription;
  categoryArray = [];
  selectedCategory: ProductCategory;


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

    /*
    this.categoryArray = [
      {'name': 'Computer', 'code': 'Alles über Computer'},
      {'name': 'Fussball', 'code': 'Hier die Beeschreibung der Kategorie'}
    ];
    */




  }


  ngOnInit() {
    this.categories = this.productCategory.getCategories();

    /*
    // Observable Way
    this.categories = this.productCategory.getCategories().pipe(
      first(),
      tap( val => console.log('inside: ', val))
    );
    this.categorySubscription = this.categories.subscribe(


      val => val.forEach( x => {
              this.categoryArray.push({name: x.name, code: x.description});
          })
    );

    console.log(this.categoryArray);
    console.log(this.cities);
    */


    /*
    // Promise Way
    this.categories = this.productCategory.getCategories().pipe(
      first(),
      // tap( val => console.log('inside: ', val))
    ).toPromise();
    this.categories.then(
      val => val.forEach(x => {
        this.categoryArray.push({name: x.name, code: x.description});
      })
    );
    console.log(this.categoryArray);
    console.log(this.cities);
    */

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
