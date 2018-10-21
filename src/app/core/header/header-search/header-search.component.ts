import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductFirestoreService } from '../../../product/shared/product-firestore.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {

  results: Object;
  resultsArray: any;
  searchTerm$ = new Subject<String>();
  @ViewChild('searchTerm') input_search: ElementRef;
  stringToSearch: string;


  constructor(private productFirestoreService: ProductFirestoreService
  ) {
    // https://alligator.io/angular/real-time-search-angular-rxjs
    this.productFirestoreService.getDataToSearch2(this.searchTerm$)
      .subscribe(result => {
        this.results = result.results;
        console.log(result);
      });
  }

  ngOnInit() {

  }

  getAllSearch(searchTerm: string) {
    this.productFirestoreService.getDataToSearch()
      .subscribe( data => {
        this.resultsArray = data.filter(item => {
          // return item.name === searchTerm;
          // return item.name.match(/Spiel/);
          if (searchTerm.length > 0) {
            this.stringToSearch = searchTerm;
          } else {
            this.stringToSearch = 'nichtsAusgebenDasGibtEsNicht159753';
          }
          return item.name.toLowerCase().includes(this.stringToSearch.toLocaleLowerCase());

        });
        // https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
        this.productFirestoreService.changeMessage(this.resultsArray);  // RxJS BehaviorSubject
      });
  }

  searchinputReset() {
    // this.stringToSearch = '';
    this.input_search.nativeElement.value = '';

  }

}
