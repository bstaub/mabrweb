import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderNgcarouselComponent } from './home-slider-ngcarousel.component';

describe('HomeSliderNgcarouselComponent', () => {
  let component: HomeSliderNgcarouselComponent;
  let fixture: ComponentFixture<HomeSliderNgcarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSliderNgcarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSliderNgcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
