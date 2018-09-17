import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../product.model';
import {ActivatedRoute} from '@angular/router';
import {ProductFirestoreService} from '../shared/product-firestore.service';
import {Observable} from 'rxjs';
import {AngularFirestoreDocument} from '@angular/fire/firestore';

@Component({
  selector: 'app-detail-list',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;
  @Input() count: number;

  private productId: string;
  public selectedProduct: Observable<Product>;

  constructor(private activatedRoute: ActivatedRoute,
              private productFirestoreService: ProductFirestoreService) {
  }

  ngOnInit() {
    console.log('start detail');
    this.activatedRoute.params.subscribe(
      params => {
        this.productId = params['id'];  // (+) +params['id'] would converts string 'id' to a number
        this.selectedProduct = this.productFirestoreService.getProduct(this.productId).valueChanges();
      }
    );

  }



  updateActive(isActive: boolean) {
    // this.productService.updateProduct(this.product.key, {active: isActive});
  }

  deleteProduct() {
    // this.productService.deleteProduct(this.product.key);
  }

  addtoBasket(product) {
    // this.productService.setbasket(product);
    // alert(product.name + ' wurde dem Warenkorb hinzugefügt. ');
  }


}
