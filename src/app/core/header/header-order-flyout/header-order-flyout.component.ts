import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../shared/local-storage.service';

@Component({
  selector: 'app-header-order-flyout',
  templateUrl: './header-order-flyout.component.html',
  styles: [`

    ul {
      margin-bottom: 0;
    }

    li.submenu {
      padding: 20px;
    }

    .shopping li {
      list-style-type: none;
    }
    
    .submenu {
      position: relative;
    }

    .submenu #shopping-cart {
      display: none;
    }

    .submenu:hover #shopping-cart {
      display: block;
      position: absolute;
      right: -15px;
      top: 66px;
      z-index: 1;
      background-color: white;
      padding: 20px;
      min-height: 400px;
      min-width: 400px;
      border: 1px solid black;
    }

    .remove {
      background-color: red;
      border-radius: 50%;
      padding: 5px 10px;
      text-decoration: none;
      color: white;
      font-weight: bold;
    }
  `]
})
export class HeaderOrderFlyoutComponent implements OnInit {
  itemsForBasket: any;

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    // delete only works on ngInit
    this.getProductsFromLocalStorage();
  }


  removeItem(event) {
    // console.log(event.target.dataset.id);
    event.target.parentElement.parentElement.remove();
  }

  getProductsFromLocalStorage() {
    this.itemsForBasket = this.localStorageService.getData('products');
  }

}
