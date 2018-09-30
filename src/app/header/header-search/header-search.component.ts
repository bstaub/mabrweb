import { Component, OnInit } from '@angular/core';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {

  result: any;

  constructor(private productFirestoreService: ProductFirestoreService) { }

  ngOnInit() {
  }

  getAllSearch(searchTerm: string) {
    this.productFirestoreService.getDataToSearch()
      .subscribe( data => {
        console.log(data);
        console.log(searchTerm);
        // https://stackoverflow.com/questions/7615997/what-is-the-javascript-equivalent-of-mysqls-like-clause
        // this.result = data.name === 'test';
      });
  }

}
