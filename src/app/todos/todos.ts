import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {TodoItem} from '../interfaces';
import {MatIcon} from '@angular/material/icon';
import {OpenModal} from '../todo-modal-window/open-modal/open-modal';


@Component({
  selector: 'app-todo',
  templateUrl: './todos.html',
  imports: [
    MatIcon,
    OpenModal
  ],
  styleUrls: ['./todos.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Todos {
  readonly item = input.required<TodoItem>();
  readonly deleteTaskEvent = output<number>();
  readonly toggleCompletionEvent = output<number>();
  readonly editTaskEvent = output<{id:number, description: string}>();

  deleteTask(id: number): void {
    this.deleteTaskEvent.emit(id);

  }
  editTask(id: number, description: string ): void {
    this.editTaskEvent.emit({id, description});
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
