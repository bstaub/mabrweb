import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-start',
  template: `
    <h1>
      Bitte eine Bestellung auswählen!
    </h1>
  `,
  styles: []
})
export class OrderStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('start');
  }

}
