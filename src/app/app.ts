import { Component } from '@angular/core';
import { TodoItem} from './interfaces';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TodoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title:string = "Todo App";
  filter: "all" | "active" | "completed" = "all";
  setFilter(newFilter: "all" | "active" | "completed"):void {
    this.filter = newFilter;
  }
  todoList : TodoItem[] = [
    {
      id: 1, description: "Lorem Ipsum", completed: false,
    },
    {
      id: 2, description: "Lorem Ipsum2", completed: false,
    },
    {
      id: 3, description: "Lorem Ipsum3", completed: false,
    },
    {
      id: 4, description: "Lorem Ipsum4", completed: false,
    }
  ]
  get items(): TodoItem[] {
    switch (this.filter) {
      case "all":
        return this.todoList;
      case "active":
        return this.todoList.filter(item => !item.completed);
      case "completed":
        return this.todoList.filter(item => item.completed);
    }
  }
  addTask(task:string):void {
    if(task.trim().length > 0) {
      const newTodo: TodoItem = {
        id:Date.now(),
        description:task,
        completed:false
      }
      this.todoList.push(newTodo);
    }
  }
  toggleCompletion(id:number):void {
    const todo = this.todoList.find(item => item.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
  deleteTask(id:number):void {
    this.todoList = this.todoList.filter(item => item.id !== id);
  }
  trackById(index: number, item: TodoItem): number {
    return item.id;
  }
}
