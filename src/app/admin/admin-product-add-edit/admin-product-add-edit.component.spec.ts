import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAddEditComponent } from './admin-product-add-edit.component';

describe('AdminProductAddEditComponent', () => {
  let component: AdminProductAddEditComponent;
  let fixture: ComponentFixture<AdminProductAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
