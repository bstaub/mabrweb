import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-martintest',
  templateUrl: './martintest.component.html',
  styleUrls: ['./martintest.component.css']
})
export class MartintestComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    console.log(111);
    console.log(222);

    console.log('ganz neu');

  }

}
