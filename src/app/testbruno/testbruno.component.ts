import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-testbruno',
  templateUrl: './testbruno.component.html',
  styleUrls: ['./testbruno.component.css']
})
export class TestbrunoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  testbruno(event) {
    console.log(event);
    console.log(222);

  }
}
