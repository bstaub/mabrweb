import { Component, Input, OnInit } from '@angular/core';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
  filteredProducts: any[] | number;

  @Input() public title: string;
  @Input() public children: {title: string, link: string}[];
  @Input() public homepage: boolean = false;

  constructor(private productFireStoreService: ProductFirestoreService) {
  }


  ngOnInit() {
    // RxJS BehaviorSubject start
    this.productFireStoreService.currentMessage.subscribe(message => {
      if (message !== 0) {
        this.filteredProducts = message;
      } else {
        this.filteredProducts = null;
      }
    });
    // RxJS BehaviorSubject end
  }

  closeSuggest() {
    this.filteredProducts = 0;
  }

}
