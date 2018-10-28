import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit, OnDestroy {
  filteredProducts: any[] | number;
  subscription_searchCloseClicked: Subscription;
  subscription_realtimeSearch: Subscription;

  @Input() public title: string;
  @Input() public children: {title: string, link: string}[];
  @Input() public homepage = false;
  @Input() public searchCloseClicked = true; // default open true, when clicked false for closing!

  constructor(private productFireStoreService: ProductFirestoreService) {
  }


  ngOnInit() {
    // RxJS BehaviorSubject start
    this.subscription_realtimeSearch = this.productFireStoreService.currentMessage.subscribe(message => {
      if (message !== 0) {
        this.filteredProducts = message;
      } else {
        this.filteredProducts = null;
      }
    });
    // RxJS BehaviorSubject end

    this.subscription_searchCloseClicked = this.productFireStoreService.searchCloseClicked.subscribe(
      (value: boolean) => {
        this.searchCloseClicked = !value; // when clicked true auf false negieren!
      }
    );
  }

  closeSuggest() {
    this.filteredProducts = 0;
  }

  ngOnDestroy() {
    this.subscription_searchCloseClicked.unsubscribe();
    this.subscription_realtimeSearch.unsubscribe();
  }

}
