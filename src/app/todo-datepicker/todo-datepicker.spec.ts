import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDatepicker } from './todo-datepicker';

describe('TodoDatepicker', () => {
  let component: TodoDatepicker;
  let fixture: ComponentFixture<TodoDatepicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDatepicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDatepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
