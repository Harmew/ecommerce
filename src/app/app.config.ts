import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// Angular Router
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

// Routes
import { routes } from './app.routes';

// Hot Toast
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({
        skipInitialTransition: true,
      }),
    ),
    provideHotToastConfig({ style: { marginTop: '40px' }, stacking: 'depth', duration: 1000 }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic',
        floatLabel: 'never',
      },
    }, provideClientHydration(withEventReplay()),
  ],
};
