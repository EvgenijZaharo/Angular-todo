import { ApplicationConfig, provideBrowserGlobalErrorListeners,InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { todoReducer } from '../store/todos-reduces';
import {TodosEffects} from '../store/todos-effects';

export interface ValidationConstants {
  minLength: number;
  maxLength: number;
}

export const VALIDATION_CONSTANTS = new InjectionToken<ValidationConstants>('VALIDATION_CONSTANTS');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ todos: todoReducer }),
    provideEffects([TodosEffects]),
    {
      provide: VALIDATION_CONSTANTS,
      useValue: {
        minLength: 3,
        maxLength: 255,
      }
    }
  ]

};
