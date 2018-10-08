import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-slider-ngcarousel',
  templateUrl: './home-slider-ngcarousel.component.html',
  styleUrls: ['./home-slider-ngcarousel.component.scss']
})
export class HomeSliderNgcarouselComponent implements OnInit {

  images = [1, 2, 3].map(() => `https://picsum.photos/1200/500?random&t=${Math.random()}`);

  constructor() { }

  ngOnInit() {



  }

}
