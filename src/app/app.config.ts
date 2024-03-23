import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {
  ApiModule,
  Configuration,
  ConfigurationParameters,
} from '../backend-api/v1';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // todo: move to environment & test building prod vs. local dev mode
    //basePath: 'https://demo-app5-api.azurewebsites.net', // todo: refactor to use environment.production.ts ??
    basePath: 'http://localhost:5071',
  };
  return new Configuration(params);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(ApiModule.forRoot(apiConfigFactory)),
  ],
};
