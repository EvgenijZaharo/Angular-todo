import { ApplicationConfig, provideBrowserGlobalErrorListeners,InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const VALIDATION_CONSTANTS = new InjectionToken<any>('VALIDATION_CONSTANTS');

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
