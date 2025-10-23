import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {filterState, TodoItem} from '../interfaces/interfaces';

export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Add Todo': props<{ task: string; date: string }>(),
    'Toggle Todo': props<{ id: number }>(),
    'Delete Todo': props<{ id: number }>(),
    'Edit Todo': props<{ id: number; task: string }>(),
    'Set Filter': props<{ filter: filterState }>(),
    'Load todos': emptyProps(),
    'Load Todos Success': props<{todos: TodoItem[]}>(),
    'Load Todos Fail': props<{ error: string }>(),
  }
});
