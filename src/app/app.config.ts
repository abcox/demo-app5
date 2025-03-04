import {
  ApplicationConfig,
  InjectionToken,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {
  ApiModule,
  Configuration,
  ConfigurationParameters,
} from '../backend-api/v1';
import { environment } from '../environments/environment';
import {
  InactivityService,
  //initInactivityService,
} from './service/inactivity/inactivity.service';

// configure backend api
export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.mainApiUrl,
  };
  return new Configuration(params);
}
// todo: assure we're using 'backend-api/v1' and not httpclient directly (i.e. search for 'httpclient' and 'http' or other hard-coded api route paths in the codebase)

// this becomes a provider in the app.module, and allows us to bring inject this configuration into any component or service
export const APP_CONFIG = new InjectionToken<ApplicationConfig>('app.config'); // todo: review this as we don't have any good use cases for this yet
// ex. of user would be like:  constructor(@Inject(APP_CONFIG) private config: ApplicationConfig) {}

export const TOKEN_KEY = 'token'; // todo: move to a shared constant file -- candidate for InjectionToken?

export const appConfig: ApplicationConfig = {
  providers: [
    // the following is how we can do this when configuring routes via a main with a standalone component and bootstrapApplication by that component
    //provideRouter(routes, withComponentInputBinding()), // we're configuring routes in app-routing.module.ts and including in the app module
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(ApiModule.forRoot(apiConfigFactory)),
    /* {
      provide: 'INIT_INACTIVITY_SERVICE',
      useFactory: initInactivityService,
      deps: [InactivityService], // Inject the service here
    }, */
  ],
};
