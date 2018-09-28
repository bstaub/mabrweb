import { Component, OnInit } from '@angular/core';
import {ProductService} from './shared/product.service';
import {LocalStorageService} from '../shared/local-storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [`
    
  `]
})
export class ProductComponent implements OnInit {

  shoppingCartContent: string;

  basket = [];
  constructor(private productService: ProductService,
              private localStorageService: LocalStorageService

  ) { }

  ngOnInit() {

  }

  getBasket() {
    this.basket = this.productService.getbasket();
  }

  getProductsFromLocalStorage() {
    const itemsForBasket = this.localStorageService.getData('products');

    itemsForBasket.forEach(function(item) {
      const row = document.createElement('tr');
      row.innerHTML = `
               <tr>
                    <td>
                         <img src="${item.image}" width=100>
                    </td>
                    <td>${item.title}</td>
                    <td>${item.price}</td>
                    <td>
                         <a href="#" class="remove" data-id="${item.id}">X</a>
                    </td>
               </tr>
          `;
      this.shoppingCartContent.appendChild(row);
    });
  }

}
