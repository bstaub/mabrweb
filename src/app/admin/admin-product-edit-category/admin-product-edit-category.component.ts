import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../product/shared/product-category.service';
import { Observable } from 'rxjs';
import { ProductCategory } from '../../models/product-category.model';
import { AlertifyService } from '../../shared/alertify.service';

@Component({
  selector: 'app-admin-product-edit-category',
  templateUrl: './admin-product-edit-category.component.html',
  styleUrls: ['./admin-product-edit-category.component.scss']
})
export class AdminProductEditCategoryComponent implements OnInit {

  categories$: Observable<ProductCategory[]>;

  constructor(private productCategoryService: ProductCategoryService,
              private alertifyService: AlertifyService,
  ) {
  }

  ngOnInit() {
    this.categories$ = this.productCategoryService.getCategories();
  }

  onDeletItem(id: string) {
    this.alertifyService.confirm('Wollen Sie diese Kategorie wirklich löschen?', () => {
    this.alertifyService.success('Die Kategorie wurde erfolgreich gelöscht.');
    this.productCategoryService.deleteCategory(id);
    });
  }

}
