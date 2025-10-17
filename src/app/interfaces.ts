export interface TodoItem {
  id: number;
  description: string;
  completed: boolean;
  date: string;
}
export type FilterType = "all" | "active" | "completed";
