import { Injectable } from '@angular/core';
import { Slide } from '../../models/Slide';


@Injectable({
  providedIn: 'root'
})
export class SliderService {

  slider: Slide[];

  constructor() {

    this.slider = [
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
      }
    ];

  }


  getAllSlides() {
    return this.slider;
  }
}
