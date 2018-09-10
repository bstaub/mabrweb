import { Component, OnInit } from '@angular/core';
import {AuthService} from '../user/auth.service';
import {User} from '../user/user';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';


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
    // console.log(this.authService.getAuthUser().uid);
  }

}
