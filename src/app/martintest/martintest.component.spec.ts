import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MartintestComponent } from './martintest.component';

describe('MartintestComponent', () => {
  let component: MartintestComponent;
  let fixture: ComponentFixture<MartintestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MartintestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MartintestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
