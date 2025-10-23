export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  date: string;
}
export enum filterState {
  all = 'all',
  active = 'active',
  completed = 'completed'
}

export interface TodoState {
  todos: TodoItem[];
  filter: filterState;
  loading: boolean;
  error: string | null;
}

export type onChangeFn<T> = (value: T) => void;
export type onTouchFn = () => void;
