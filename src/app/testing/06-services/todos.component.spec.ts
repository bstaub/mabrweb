import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { from } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('sollte todos items vom service zurückliefern ', () => {
    // let todos = [1, 2, 3];

    spyOn(service, 'getTodos').and.callFake(() => {
      return from([[ 1, 2, 3 ]]);
      // return from([todos]);
    });  // get control of an method in a class

    component.ngOnInit();

    expect(component.todos.length).toBe(3);
    // expect(component.todos).toBe(todos);

  });


});
