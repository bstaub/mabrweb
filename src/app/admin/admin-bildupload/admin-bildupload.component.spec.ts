import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBilduploadComponent } from './admin-bildupload.component';

describe('AdminBilduploadComponent', () => {
  let component: AdminBilduploadComponent;
  let fixture: ComponentFixture<AdminBilduploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBilduploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBilduploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
