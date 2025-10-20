import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCheckbox } from './todo-checkbox';

describe('TodoCheckbox', () => {
  let component: TodoCheckbox;
  let fixture: ComponentFixture<TodoCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
