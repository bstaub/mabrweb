import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutThxComponent } from './checkout-thx.component';



describe('ProductGridComponent', () => {
  let component: CheckoutThxComponent;
  let fixture: ComponentFixture<CheckoutThxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutThxComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutThxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});


