import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FilterType, TodoItem} from './interfaces';
import {CommonModule} from '@angular/common';
import {Todos} from './todos/todos';
import {TodoStore} from './todo-store/todo-store';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {VALIDATION_CONSTANTS} from './app.config';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Todos, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private todoService = inject(TodoStore);

  readonly todos = this.todoService.todos;

  private _validationsConstant = inject(VALIDATION_CONSTANTS);

  todoForm = new FormGroup({
    task: new FormControl('', {
      validators: [Validators.required, Validators.minLength(this._validationsConstant.minLength), Validators.maxLength(this._validationsConstant.maxLength)],
      nonNullable: true
    }),
  });

  // Tracks whether the task input currently has focus
  isTaskFocused = false;

  get items(): TodoItem[] {
    return this.todoService.filteredTodos();
  }

  get task() {
    return this.todoForm.get('task');
  }

  get totalCount(): number {
    return this.todos().length;
  }

  get activeCount(): number {
    return this.todos().filter(todo => !todo.completed).length;
  }

  get completedCount(): number {
    return this.todos().filter(todo => todo.completed).length;
  }

  setFilter(newFilter: FilterType):void {
    this.todoService.setFilter(newFilter);
  }

  onSubmit():void {
    const taskControl = this.task;
    if (!taskControl || !taskControl.value?.trim()) {
      return;
    }

    if (this.todoForm.valid) {
      this.addTask(taskControl.value);
    }
  }

  onTaskFocus(): void {
    this.isTaskFocused = true;
  }

  onTaskBlur(): void {
    this.isTaskFocused = false;
  }

  addTask(newTask: string) {
    if (this.todoForm.invalid) {
      return;
    }
    this.todoService.addTask(newTask);
    this.todoForm.reset();
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id);
  }

  toggleCompletion(id: number) {
    this.todoService.toggleCompletion(id);
  }

  editTask(update: { id: number; description: string }) {
    this.todoService.editTask(update.id, update.description);
  }
}
