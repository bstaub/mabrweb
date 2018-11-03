import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptestComponent } from './comptest.component';

describe('ComptestComponent', () => {
  let component: ComptestComponent;
  let fixture: ComponentFixture<ComptestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
