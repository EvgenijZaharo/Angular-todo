import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {filterState} from './interfaces';
import {Todos} from './todos/todos';
import {TodoStore} from './todo-store/todo-store';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {VALIDATION_CONSTANTS} from './app.config';
import {TodoDatepicker} from './todo-datepicker/todo-datepicker';
import {TaskInput} from './task-input/task-input';

@Component({
  selector: 'app-root',
  imports: [Todos, ReactiveFormsModule, TodoDatepicker, TaskInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{


  private readonly todoService: TodoStore = inject(TodoStore);
  private readonly validationsConstant = inject(VALIDATION_CONSTANTS);

  readonly todos = this.todoService.todos;
  readonly filterState = filterState;

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

  protected onInputFocused(isFocused: boolean):void {
    this.isFocused.set(isFocused);
  }
  protected items = computed(() => this.todoService.filteredTodos());

  protected groupedItems = computed(() => {
    const items = this.items();
    const grouped = items.reduce((acc, item) => {
      if (!acc.has(item.date)) {
        acc.set(item.date, []);
      }
      acc.get(item.date)!.push(item);
      return acc;
    }, new Map<string, typeof items>());

    return Array.from(grouped, ([date, todos]) => ({date, todos}))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  protected totalCount = computed(() => this.todos().length);
  protected activeCount = computed(() => this.todos().filter(t => !t.completed).length);
  protected completedCount = computed(() => this.todos().filter(t => t.completed).length);

  protected setFilter(newFilter: filterState): void {
    this.todoService.setFilter(newFilter);
  }

  protected onSubmit(): void {
    const taskValue = this.task?.value?.trim();

    if (!taskValue || this.todoForm.invalid) {
      return;
    }

    const selectedDate = this.selectedDate?.value;
    const dateString = this.formatDateToISO(selectedDate || new Date());
    this.todoService.addTask(taskValue, dateString);
    this.todoForm.reset({
      task: '',
      dateControl: new Date()
    });
  }

  protected deleteTask(id: number): void {
    this.todoService.deleteTask(id);
  }

  protected toggleCompletion(id: number): void {
    this.todoService.toggleCompletion(id);
  }

  protected editTask(update: { id: number; description: string }): void {
    this.todoService.editTask(update.id, update.description);
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

}
