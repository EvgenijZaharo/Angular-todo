import {Component, input, output,} from '@angular/core';
import {TodoItem} from '../interfaces';

@Component({
  selector: 'app-todo',
  templateUrl: './todos.html',
  styleUrls: ['./todos.css']
})
export class Todos {
  readonly item = input.required<TodoItem>();
  readonly deleteTaskEvent = output<number>();
  readonly toggleCompletionEvent = output<number>();

  deleteTask(id: number): void {
    this.deleteTaskEvent.emit(id);
  }

  toggleCompletion(id: number): void {
    this.toggleCompletionEvent.emit(id);
  }

  get description(): string {
    return this.item().description;
  }

  get completed(): boolean {
    return this.item().completed;
  }

  get id(): number {
    return this.item().id;
  }
}
