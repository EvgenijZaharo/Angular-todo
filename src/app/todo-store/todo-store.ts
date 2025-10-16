import {computed, effect, Injectable, signal} from '@angular/core';
import {FilterType, TodoItem} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodoStore {

  private _todos = signal<TodoItem[]>([]);
  private _filter = signal<FilterType>('all');

  todos = this._todos.asReadonly();
  filter = this._filter.asReadonly();

  filteredTodos = computed(() => {
    const todos = this._todos();
    const filter = this._filter();
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
    }
  });

  constructor() {
    this.loadFromLocalStorage();
    effect(() => {
      this.saveToLocalStorage(this._todos());
    });
  }

  private loadFromLocalStorage() {
    const storedTodos = localStorage.getItem('todoList');
    const initialTodos = storedTodos ? JSON.parse(storedTodos) as TodoItem[] : [];
    this._todos.set(initialTodos);
  }

  private saveToLocalStorage(todos: TodoItem[]) {
    try {
      localStorage.setItem('todoList', JSON.stringify(todos));
    } catch (e) {
      console.warn('Failed to save to localstorage: ', e);
    }
  }

  setFilter(newFilter: FilterType): void {
    this._filter.set(newFilter);
  }

  addTask(task: string): void {
    if (task.trim().length > 0) {
      const newTodo: TodoItem = {
        id: Date.now(),
        description: task,
        completed: false
      }
      this._todos.update(curTodos => [...curTodos, newTodo]);
    }
  }

  toggleCompletion(id: number): void {
    this._todos.update(todos => todos.map(todo => todo.id === id ? {
      ...todo, completed: !todo.completed
    } : todo))
  }

  deleteTask(id: number): void {
    this._todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  editTask(id: number, newDescription: string): void {
    this._todos.update(todos => todos.map(todo => todo.id === id ? {
      ...todo, description: newDescription
    } : todo))
  }
}
