import {FormBuilder} from '@angular/forms';
import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;

  beforeEach(() => {
    component = new TodoFormComponent(new FormBuilder());
  });

  it('sollte ein form mit zwei Input Komponenten prüfen', () => {
    expect(component.form.contains('name')).toBe(true);
    expect(component.form.contains('email')).toBeTruthy();
  });

  it('der name soll erforderlich sein', () => {
    let control = component.form.get('name');

    control.setValue(''); // wenn es nicht ausgefüllt ist

    expect(control.valid).toBeFalsy(); // muss es falsch zurück geben!
  });
});
