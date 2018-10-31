import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestcomponentComponent } from './testcomponent.component';

describe('TestcomponentComponent', () => {
  let component: TestcomponentComponent;
  let fixture: ComponentFixture<TestcomponentComponent>;
  let de: DebugElement;


  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestcomponentComponent]
    })
      .createComponent(TestcomponentComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets "subject" to "world" by default', () => {
    expect(component.subject).toBe('world');
  });

  it('greets the subject', () => {
    const h1 = de.query(By.css('h1'));
    expect(h1.nativeElement.innerText).toBe('Hello world!');
  });

  it('updates the subject', () => {
    component.subject = 'developer';
    fixture.detectChanges();
    const h1 = de.query(By.css('h1'));
    expect(h1.nativeElement.innerText).toBe('Hello developer!');
  });

});

/*
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

describe('$COMPONENT$', () => {
  let component: $COMPONENT$$END$;
  let fixture: ComponentFixture<$COMPONENT$>;
  let de: DebugElement;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [$COMPONENT$]
    }).createComponent($COMPONENT$);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });
});

// https://onehungrymind.com/writing-basic-component-test-angular-testing-utilities/
*/
