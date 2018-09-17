import { Component, OnInit } from '@angular/core';
import {UserService} from './user/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  loginstatus: any;

  constructor() { }

  ngOnInit() {

  }

}
