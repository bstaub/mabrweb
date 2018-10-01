import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutShipmentdataComponent } from './checkout-shipmentdata.component';

describe('CheckoutShipmentdataComponent', () => {
  let component: CheckoutShipmentdataComponent;
  let fixture: ComponentFixture<CheckoutShipmentdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutShipmentdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutShipmentdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
