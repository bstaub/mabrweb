import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../product/shared/product-category.service';

@Component({
  selector: 'app-admin-product-add-category',
  templateUrl: './admin-product-add-category.component.html',
  styleUrls: ['./admin-product-add-category.component.css']
})
export class AdminProductAddCategoryComponent implements OnInit {

  category: string;

  // productCategory: ProductCategory;

  constructor(private productCategoryService: ProductCategoryService) {
  }

  ngOnInit() {
    // this.productCategory = new ProductCategory();
  }

  onSubmit() {

    /*
        const categoryObj = Object.assign(
          {id: 101,
            name: this.category,
          description: 'Keine Produktbeschreibung vorhanden'},
          this.productCategory);
    */

    this.productCategoryService.addCategory({id: '101', name: this.category, description: 'Hier die Beeschreibung der Kategorie'});
  }

}
