import { Component, OnInit } from '@angular/core';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {

  constructor(private productFirestoreService: ProductFirestoreService) { }

  ngOnInit() {
  }

  getAllSearch(searchTerm: string) {
    // this.productFirestoreService
  }

}
