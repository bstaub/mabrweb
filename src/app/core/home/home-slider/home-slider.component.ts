import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSiemaOptions, NgxSiemaService } from 'ngx-siema';
// import {Observable} from 'rxjs';
// import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit, OnDestroy {

  // private unsubscribeSiema$ = new Subject();

  constructor(private ngxSiemaService: NgxSiemaService) { }

  // https://www.npmjs.com/package/ngx-siema
  public options: NgxSiemaOptions = {
    selector: '.siema',
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: false,
    onInit: () => {
      // runs immediately after first initialization
    },
    onChange: () => {
      // runs after slide change
    },
  };


  ngOnInit() {
  }

  public prev() {
    this.ngxSiemaService.prev(1)
      .subscribe((data: any) => console.log(data));
  }

  public next() {
    this.ngxSiemaService.next(1)
      .subscribe((data: any) => console.log(data));
  }

  public goTo() {
    this.ngxSiemaService.goTo(1)
      .subscribe((data: any) => console.log(data));
  }

  ngOnDestroy() {

  }

}
