export interface TodoItem {
  id: number;
  description: string;
  completed: boolean;
}
export type FilterType = "all" | "active" | "completed";
