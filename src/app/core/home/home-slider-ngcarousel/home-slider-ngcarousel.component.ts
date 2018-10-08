import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-slider-ngcarousel',
  templateUrl: './home-slider-ngcarousel.component.html',
  styleUrls: ['./home-slider-ngcarousel.component.scss']
})
export class HomeSliderNgcarouselComponent implements OnInit {

  // images = [1, 2, 3].map(() => `https://picsum.photos/1200/500?random&t=${Math.random()}`
  public sliderdata: { image: any, title: string, text: string  }[] = [
    {
      image: `https://picsum.photos/1200/500?random&t=${Math.random()}`,
      title: 'Produkt1',
      text: 'Hier der Produktbeschreib1'
    },
    {
      image: `https://picsum.photos/1200/500?random&t=${Math.random()}`,
      title: 'Produkt2',
      text: 'Hier der Produktbeschreib2'
    },
    {
      image: `https://picsum.photos/1200/500?random&t=${Math.random()}`,
      title: 'Produkt3',
      text: 'Hier der Produktbeschreib3'
    },
  ];

  constructor() { }

  ngOnInit() {



  }

}
