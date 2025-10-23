import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TodoActions} from './todos-action';
import {map, tap} from 'rxjs';
import {TodoItem} from '../interfaces/interfaces';
import {Store} from '@ngrx/store';
import {selectAllTodos} from './todos-selectors';
import {concatLatestFrom} from '@ngrx/operators';


export class TodosEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.loadTodos),
    map(() => {
      try {
      const storedTodos = localStorage.getItem('todoList');
      const todos = storedTodos ? JSON.parse(storedTodos) as TodoItem[] : [];
      return TodoActions.loadTodosSuccess({todos});
      }
      catch (error) {
        return TodoActions.loadTodosFail({
          error: 'Failed to load Todos: ' + error
        });
      }
    })
  ))
  saveTodos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          TodoActions.addTodo,
          TodoActions.toggleTodo,
          TodoActions.deleteTodo,
          TodoActions.editTodo
        ),
        concatLatestFrom(() => this.store.select(selectAllTodos)),
        tap(([_, todos]) => {
          try {
            localStorage.setItem('todoList', JSON.stringify(todos));
          }
          catch (error) {
            console.warn('Failed to save Todos: ' + error)
          }
        })
      ),
    {dispatch: false}
  )
}
