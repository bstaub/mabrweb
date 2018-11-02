import { TestBed } from '@angular/core/testing';
import { OrderFirestoreService } from './order-firestore.service';
import { BehaviorSubject } from 'rxjs';


describe('orderFirestoreService', () => {
  let orderFirestoreService: OrderFirestoreService; // Add this

  const FirestoreStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      }),
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: OrderFirestoreService, useValue: FirestoreStub }]
    });

    orderFirestoreService = TestBed.get(OrderFirestoreService); // Add this
  });

  it('should be created', () => { // Remove inject()
    expect(orderFirestoreService).toBeTruthy();
  });
});
