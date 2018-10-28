import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../product/shared/product-category.service';

@Component({
  selector: 'app-admin-product-add-category',
  templateUrl: './admin-product-add-category.component.html',
  styleUrls: ['./admin-product-add-category.component.css']
})
export class AdminProductAddCategoryComponent implements OnInit {

  category: string;
  beschreibung: string;

  constructor(private productCategoryService: ProductCategoryService) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.productCategoryService.addCategory(
      {
        id: this.productCategoryService.getPushKey(),
        name: this.category,
        description: this.beschreibung
      });
  }

}
