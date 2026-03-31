/*
* File: app.config.ts
* Author: Varga Livia
* Copyright: 2026, Varga Livia
* Group: Szoft II-E
* Date: 2026 03 31
* Github:
* Licenc: MIT
*/


import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};






