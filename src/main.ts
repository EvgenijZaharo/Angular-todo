import { bootstrapApplication } from '@angular/platform-browser';
import { todoAppConfig } from './todo-app/todo-app.config';
import { TodoApp } from './todo-app/todo-app';

bootstrapApplication(TodoApp, todoAppConfig)
  .catch((err) => console.error(err));
