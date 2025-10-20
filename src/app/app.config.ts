import { ApplicationConfig, provideBrowserGlobalErrorListeners,InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

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
    {
      provide: VALIDATION_CONSTANTS,
      useValue: {
        minLength: 3,
        maxLength: 255,
      }
    }
  ]

};
