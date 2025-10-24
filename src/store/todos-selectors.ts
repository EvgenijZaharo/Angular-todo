import {createFeatureSelector, createSelector} from '@ngrx/store';
import {filterState, TodoState} from '@interfaces/interfaces';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectFilter = createSelector(
  selectTodoState,
  (state: TodoState) => state.filter
);


export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectFilter,
  (todos, filter) => {
    switch (filter) {
      case filterState.all:
        return todos;
      case filterState.active:
        return todos.filter(todo => !todo.completed);
      case filterState.completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }
);

export const selectTotalCount = createSelector(
  selectAllTodos,
  (todos) => todos.length
);

export const selectActiveCount = createSelector(
  selectAllTodos,
  (todos) => todos.filter(t => !t.completed).length
);

export const selectCompletedCount = createSelector(
  selectAllTodos,
  (todos) => todos.filter(t => t.completed).length
);

export const selectGroupedTodos = createSelector(
  selectFilteredTodos,
  (todos) => {
    const grouped = todos.reduce((acc, item) => {
      if (!acc.has(item.date)) {
        acc.set(item.date, []);
      }
      acc.get(item.date)!.push(item);
      return acc;
    }, new Map<string, typeof todos>());

    return Array.from(grouped, ([date, todos]) => ({date, todos}))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
);

