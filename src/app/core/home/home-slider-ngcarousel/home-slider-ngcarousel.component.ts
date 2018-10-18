import { Component, OnInit } from '@angular/core';;
import { Slide } from '../../../models/Slide';
import { SliderService } from '../../shared/slider.service';


@Component({
  selector: 'app-home-slider-ngcarousel',
  templateUrl: './home-slider-ngcarousel.component.html',
  styleUrls: ['./home-slider-ngcarousel.component.scss']
})
export class HomeSliderNgcarouselComponent implements OnInit {

  sliderdata: Slide[];

  constructor(private sliderService: SliderService) {

  }

  ngOnInit() {
    this.sliderdata = this.sliderService.getAllSlides();
  }

}
