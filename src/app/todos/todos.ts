import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {TodoItem} from '../interfaces';
import {MatIcon} from '@angular/material/icon';
import {OpenModal} from '../todo-modal-window/open-modal/open-modal';
import {TodoCheckbox} from './todo-checkbox/todo-checkbox';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todos.html',
  imports: [
    MatIcon,
    OpenModal,
    TodoCheckbox,
    ReactiveFormsModule
  ],
  styleUrls: ['./todos.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Todos{
  readonly item = input.required<TodoItem>();
  readonly deleteTaskEvent = output<number>();
  readonly toggleCompletionEvent = output<number>();
  readonly editTaskEvent = output<{ id: number, description: string }>();

  checkbox = new FormControl<boolean>(false, {nonNullable: true});

  description = computed(() => this.item().description);
  completed = computed(() => this.item().completed);
  id = computed(() => this.item().id);

  constructor() {
    toObservable(this.completed)
      .pipe(takeUntilDestroyed())
      .subscribe(completed => {
        this.checkbox.setValue(completed, {emitEvent: false});
      });
    this.checkbox.valueChanges
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.toggleCompletionEvent.emit(this.id());
      });
  }

  protected deleteTask(id: number): void {
    this.deleteTaskEvent.emit(id);
  }
}
