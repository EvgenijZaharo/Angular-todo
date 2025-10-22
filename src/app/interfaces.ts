export interface TodoItem {
  id: number;
  description: string;
  completed: boolean;
  date: string;
}
export enum filterState {
  all = 'all',
  active = 'active',
  completed = 'completed'
}

export type onChangeFn<T> = (value: T) => void;
export type onTouchFn = () => void;
