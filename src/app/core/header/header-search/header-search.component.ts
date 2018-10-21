import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductFirestoreService } from '../../../product/shared/product-firestore.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit, OnDestroy {


  resultsArray: any;
  stringToSearch: string;
  searchFormReactive: FormGroup;
  // get search() {
  //   return this.searchFormReactive.get('search');
  // }
  subscription_getDataToSearch: Subscription;


  constructor(private productFirestoreService: ProductFirestoreService,
  ) {

  }

  ngOnInit() {
    this.searchFormReactive = new FormGroup({
      search: new FormControl('')
    });
  }

  getAllSearch() {  // trigger on submit and on keyup event, need submit for reset!
    this.productFirestoreService.searchCloseClicked.emit(false);
    if (!this.searchFormReactive.value.search) {
      this.resetForm();
    }

    this.subscription_getDataToSearch = this.productFirestoreService.getDataToSearch()
      .subscribe( data => {
        this.resultsArray = data.filter(item => {
          if (this.searchFormReactive.value.search && this.searchFormReactive.value.search.length > 0) {
            this.stringToSearch = this.searchFormReactive.value.search;
          } else {
            this.stringToSearch = 'nichtsAusgebenDasGibtEsNicht159753';
          }
          return item.name.toLowerCase().includes(this.stringToSearch.toLocaleLowerCase());

        });
        // https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
        this.productFirestoreService.changeMessage(this.resultsArray);  // RxJS BehaviorSubject
      });
  }

  resetForm() {
    this.searchFormReactive.reset();
    setTimeout(() => {
      this.productFirestoreService.searchCloseClicked.emit(true);
    }, 100);

  }

  ngOnDestroy() {
    this.subscription_getDataToSearch.unsubscribe();
  }


}
