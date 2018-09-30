import { Component, OnInit } from '@angular/core';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {

  results: Object;
  searchTerm$ = new Subject<String>();

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
        console.log(data);
        console.log('suche1', searchTerm);
        // https://stackoverflow.com/questions/7615997/what-is-the-javascript-equivalent-of-mysqls-like-clause
        // this.result = data.name === 'test';
      });
  }

}
