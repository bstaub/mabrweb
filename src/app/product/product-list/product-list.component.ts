import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { ProductFirestoreService } from '../shared/product-firestore.service';
import { Product } from '../../models/product.model';
import { SettingsService } from '../../shared/settings.service';
import { ProductCategory } from '../../models/product-category.model';
import { ProductCategoryService } from '../shared/product-category.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [`
    .product-filter {
      display: flex;
      padding: 30px 0;
    }

    .sort {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      align-self: flex-end;
    }

    .collection-sort {
      display: flex;
      flex-direction: column;
    }

    .collection-sort:first-child {
      padding-left: 20px;
      padding-right: 20px;
    }

    .collection-sort:last-child {
      padding-right: 20px;
    }

    label {
      color: #666;
      font-size: 10px;
      font-weight: 500;
      line-height: 1em;
      text-transform: uppercase;
    }

    @media ( max-width: 480px ) {

      .product-filter {
        flex-direction: column;
      }

      .sort {
        align-self: center;
      }

    }
  `]
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>;
  categories$: Observable<ProductCategory[]>;
  selectedCategory: string;
  selectedSort: string;
  p = 1;
  selectUndefinedOptionValue: any;

  constructor(private productFireStoreService: ProductFirestoreService,
              private productCategory: ProductCategoryService,
              private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.getProductList();
    this.categories$ = this.productCategory.getCategories();
  }

  getProductList() {
    this.products$ = this.productFireStoreService.getProducts();
  }

  selectedOption() {
    this.products$ = this.productFireStoreService.filterProductsByCategoryAndField(this.selectedCategory, this.selectedSort);
  }

  get itemsPerPage() {
    return this.settingsService.getSettings().itemsPerPage;
  }

}
