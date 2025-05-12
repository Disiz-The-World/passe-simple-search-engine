import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from '../routes/app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { withFetch, withInterceptors } from '@angular/common/http';
import { AuthTokenInterceptor } from '../interceptors/auth-token.interceptor';
import { ServerErrorInterceptor } from '../interceptors/server-error.interceptor';
import { TeapotInterceptor } from '../interceptors/teapot.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        AuthTokenInterceptor,
        ServerErrorInterceptor,
        TeapotInterceptor,
      ])
    ),
  ],
};
