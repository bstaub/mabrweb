import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../product/shared/product-category.service';
import { AlertifyService } from '../../shared/alertify.service';

@Component({
  selector: 'app-admin-product-add-category',
  templateUrl: './admin-product-add-category.component.html',
  styleUrls: ['./admin-product-add-category.component.css']
})
export class AdminProductAddCategoryComponent implements OnInit {

  category: string;
  beschreibung: string;

  constructor(private productCategoryService: ProductCategoryService,
              private alertifyService: AlertifyService,
  ) {
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
    this.alertifyService.success('Kategorie ' + this.category + ' wurde erfolgreich hinzugefügt.');
  }

}
