import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testcomponent',
  template: `<h1>Hello {{subject}}!</h1>`,
  styles: []
})
export class TestcomponentComponent implements OnInit {
  subject = 'world';

  constructor() { }

  ngOnInit() {
  }

}
