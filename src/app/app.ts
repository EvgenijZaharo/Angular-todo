import {Component, inject} from '@angular/core';
import {FilterType, TodoItem} from './interfaces';
import {CommonModule} from '@angular/common';
import {Todos} from './todos/todos';
import {TodoStore} from './todo-store/todo-store';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Todos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private todoService = inject(TodoStore);

  readonly todos = this.todoService.todos;

  get items(): TodoItem[] {
    return this.todoService.filteredTodos();
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

  setFilter(newFilter: FilterType) {
    this.todoService.setFilter(newFilter);
  }

  addTask(newTask: string) {
    this.todoService.addTask(newTask);
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
