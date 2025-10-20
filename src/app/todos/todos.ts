import {ChangeDetectionStrategy, Component, computed, effect, input, output} from '@angular/core';
import {TodoItem} from '../interfaces';
import {MatIcon} from '@angular/material/icon';
import {OpenModal} from '../todo-modal-window/open-modal/open-modal';
import {TodoCheckbox} from './todo-checkbox/todo-checkbox';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';


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
export class Todos {
  readonly item = input.required<TodoItem>();
  readonly deleteTaskEvent = output<number>();
  readonly toggleCompletionEvent = output<number>();
  readonly editTaskEvent = output<{ id: number, description: string }>();

  checkbox = new FormControl<boolean>(false);
  private checkboxValue = toSignal(this.checkbox.valueChanges);

  description = computed(() => this.item().description);
  completed = computed(() => this.item().completed);
  id = computed(() => this.item().id);

  private syncCheckboxEffect = effect(() => {
    const todoItem = this.item();
    this.checkbox.setValue(todoItem.completed, {emitEvent: false});
  });

  private checkboxChangeEffect = effect(() => {
    const value = this.checkboxValue();
    if (value !== undefined && value !== this.completed()) {
      this.toggleCompletion(this.id());
    }
  });

  protected deleteTask(id: number): void {
    this.deleteTaskEvent.emit(id);
  }

  private toggleCompletion(id: number): void {
    this.toggleCompletionEvent.emit(id);
  }
}
