import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductEditCategoryComponent } from './admin-product-edit-category.component';

describe('AdminProductEditCategoryComponent', () => {
  let component: AdminProductEditCategoryComponent;
  let fixture: ComponentFixture<AdminProductEditCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductEditCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
