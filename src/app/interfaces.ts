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
