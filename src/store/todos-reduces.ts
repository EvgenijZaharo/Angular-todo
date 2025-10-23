import {filterState, TodoState} from '../interfaces/interfaces';
import {createReducer, on} from '@ngrx/store';
import {TodoActions} from './todos-action';


export const initialState: TodoState =  {
  todos: [],
  filter: filterState.all,
  loading: false,
  error: null
}

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, {task, date}) => ({
    ...state,
    todos: [...state.todos, {
      id: Date.now(),
      task: task,
      completed: false,
      date: date,
    }]
  })),
  on(TodoActions.deleteTodo, (state, {id}) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
    })),
  on(TodoActions.toggleTodo, (state, {id}) => ({
    ...state,
    todos: state.todos.map(todo => todo.id === id ? {
      ...todo, completed: !todo.completed
    } : todo)
  })),
  on(TodoActions.editTodo, (state, {id, task}) => ({
    ...state,
    todos: state.todos.map(todo => todo.id === id ? {
      ...todo, task: task
    } : todo)
  })),
  on(TodoActions.setFilter, (state, {filter}) => ({
    ...state,
    filter: state.filter = filter
  })),
  on(TodoActions.loadTodos, (state) =>({
    ...state,
    loading: true
  }) ),
  on(TodoActions.loadTodosSuccess, (state,{todos}) => ({
    ...state,
    todos,
    loading: false
  })),
  on(TodoActions.loadTodosFail, (state, {error}) => ({
    ...state,
    error,
    loading: false,
  }) )
);
