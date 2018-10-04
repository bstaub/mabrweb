import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginRegisterComponent } from './user-login-register.component';

describe('UserLoginRegisterComponent', () => {
  let component: UserLoginRegisterComponent;
  let fixture: ComponentFixture<UserLoginRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
