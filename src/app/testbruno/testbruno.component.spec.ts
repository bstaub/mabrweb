import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbrunoComponent } from './testbruno.component';

describe('TestbrunoComponent', () => {
  let component: TestbrunoComponent;
  let fixture: ComponentFixture<TestbrunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestbrunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestbrunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
