import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testcomponent2Component } from './testcomponent2.component';

describe('Testcomponent2Component', () => {
  let component: Testcomponent2Component;
  let fixture: ComponentFixture<Testcomponent2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testcomponent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testcomponent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
