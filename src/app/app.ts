import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {VALIDATION_CONSTANTS} from './app.config';
import {Todos} from '@todos/todos';
import {TodoDatepicker} from '@todo-datepicker/todo-datepicker';
import {TaskInput} from '@task-input/task-input';
import {filterState} from '@interfaces/interfaces';
import {Store} from '@ngrx/store';
import {TodoActions} from '@store/todos-action';
import {
  selectActiveCount,
  selectAllTodos,
  selectCompletedCount,
  selectGroupedTodos,
  selectTotalCount
} from '@store/todos-selectors';


@Component({
  selector: 'app-root',
  imports: [Todos, ReactiveFormsModule, TodoDatepicker, TaskInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  store = inject(Store);

  ngOnInit() {
    this.store.dispatch(TodoActions.loadTodos());
  }

  private readonly validationsConstant = inject(VALIDATION_CONSTANTS);

  readonly todos = this.store.selectSignal(selectAllTodos);

  todoForm = new FormGroup({
    task: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(this.validationsConstant.minLength),
        Validators.maxLength(this.validationsConstant.maxLength)
      ],
      nonNullable: true
    }),
    dateControl: new FormControl<Date>(new Date(), {
      nonNullable: true
    })
  });

  protected task = this.todoForm.controls.task;
  protected selectedDate = this.todoForm.controls.dateControl;
  protected isFocused = signal<boolean>(false);

  protected onInputFocused(isFocused: boolean): void {
    this.isFocused.set(isFocused);
  }

  protected groupedItems = this.store.selectSignal(selectGroupedTodos);

  protected totalCount = this.store.selectSignal(selectTotalCount);
  protected activeCount = this.store.selectSignal(selectActiveCount);
  protected completedCount = this.store.selectSignal(selectCompletedCount);

  protected setFilter(newFilter: filterState): void {
    this.store.dispatch(TodoActions.setFilter({filter: newFilter}));
  }

  protected onSubmit(): void {
    const taskValue = this.task?.value?.trim();

    if (!taskValue || this.todoForm.invalid) {
      return;
    }

    const selectedDate = this.selectedDate?.value;
    const dateString = this.formatDateToISO(selectedDate || new Date());
    this.store.dispatch(TodoActions.addTodo({task: taskValue, date: dateString}));
    this.todoForm.reset({
      task: '',
      dateControl: new Date()
    });
  }

  protected deleteTask(id: number): void {
    this.store.dispatch(TodoActions.deleteTodo({id}))
  }

  protected toggleCompletion(id: number): void {
    this.store.dispatch(TodoActions.toggleTodo({id}))
  }

  protected editTask(update: { id: number; task: string }): void {
    this.store.dispatch(TodoActions.editTodo(update));
  }

  protected formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    if (date.getTime() === todayStart.getTime()) return 'Today';
    if (date.getTime() === tomorrowStart.getTime()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  private formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  protected filterState = filterState;
}
