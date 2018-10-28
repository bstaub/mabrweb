import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../product/shared/product-category.service';
import { Observable } from 'rxjs';
import { ProductCategory } from '../../models/product-category.model';

@Component({
  selector: 'app-admin-product-edit-category',
  templateUrl: './admin-product-edit-category.component.html',
  styleUrls: ['./admin-product-edit-category.component.scss']
})
export class AdminProductEditCategoryComponent implements OnInit {

  categories: Observable<ProductCategory[]>;

  constructor(private productCategoryService: ProductCategoryService) {
  }

  ngOnInit() {
    this.categories = this.productCategoryService.getCategories();
  }


}
