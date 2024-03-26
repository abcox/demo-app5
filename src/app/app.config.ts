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
import { environment } from '../environments/environment';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.mainApiUrl,
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
