# DemoApp5

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

[Project Document](https://docs.google.com/document/d/1fwAtLKBLx6W1JoTdzPLjsB1wo1t0tuqfREb73-mKaXU/edit?usp=sharing)

[Web app (ng client)](https://demo-app5b.azurewebsites.net/)

[Web API (.NET 6 Swagger UI)](https://demo-app5-api.azurewebsites.net/swagger/index.html)

## Development Environment

Target node version: 18.13.0

Use nmv-windows to install, and use target node version.
- install `nvm install 18`
- use/switch: `nvm use 18.13.0`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Dev Environment Setup

```
ng new demo-app --style=scss --ssr=false
ng add @angular/material --skip-confirmation --defaults
ng add @angular-eslint/schematics --skip-confirmation
npm install prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev
```

## Backend (demo-app5-api)

The backend is built with .NET 8 in C# and available in github as [demo-app5-api](https://github.com/abcox/demo-app5-backend). We are also providing API via the Open API Standard and publishing the swagger.json.

Swagger UI hosted at https://demo-app5-api.azurewebsites.net/swagger/index.html

In order to expedite the process of consuming the backend API, we will use the Open API Standard with Swagger Codegen utilities to help us scaffold the client module using the pre-built Typescript template.

Procedure:

1. Install [@openapitools/openapi-generator-cli](https://github.com/OpenAPITools/openapi-generator-cli)
   ```
   npm install @openapitools/openapi-generator-cli -g
   ```
2. Of many ways to generate the client from the swagger.json file, the following is one:
   - refer to online docs and the README.md files in the generate api client project
   - add a script to the package.json, like:
     ```
     "openapi-gen-v1": "openapi-generator-cli generate -g typescript-angular -i http://localhost:5071/swagger/v1/swagger.json -o ..\\demo-app5-backend-clients\\v1 -p npmName=demo-app5-api-v1"
     ```
   - run the script like `npm run openapi-gen-v1`
   - cd to the output folder, and run `npm install`, then `npm run build`
   - it is possible to reference this work like:
     ```
     import {
        WeatherForecast,
        WeatherForecastService,
     } from '../../../../../demo-app5-backend-clients/v1';
     ```
   - configure the module in `app.config.ts` like
     ```
     export function apiConfigFactory(): Configuration {
        const params: ConfigurationParameters = {
           basePath: 'https://demo-app5-api.azurewebsites.net',
        };
        return new Configuration(params);
     }
     export const appConfig: ApplicationConfig = {
        providers: [
           // ..
           // ..
           importProvidersFrom(ApiModule.forRoot(apiConfigFactory)),
        ]
     }
     ```
   - make sure to add CORS policy to the API service so that the client has access

## TailwindCSS

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

## Dev Notes

### File that require restart of IDE (VSCode)

1. .prettierrc

### Angular CLI Commands

1. Create a page

   ```
   ng g c page/error-page
   ```

2. Create a component

   ```
   ng g c components/survey2
   ```

# Resources

1. [Angular Material Theming System: Complete Guide](https://angular-material.dev/articles/angular-material-theming-system-complete-guide)
2. [Install Schematics](https://material.angular.io/guide/schematics)
3. [NG Add Schematic](https://brianflove.com/posts/2018-12-15-ng-add-schematic/)
4. [Tutorial: Build and deploy your app to Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/tutorial-code-to-cloud?tabs=bash%2Ccsharp&pivots=acr-remote)
5. [Tutorial: Communication between microservices in Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/communicate-between-microservices?tabs=bash&pivots=acr-remote)
6. [How to Setup ESLint and Prettier in an Angular Project](https://dev.to/seanbh/how-to-setup-eslint-and-prettier-in-an-angular-project-30bd)
7. [Visual Studio Code Keyboard Shortcuts for Windows](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

## Angular

[Migrating to MDC-based Angular Material Components](https://material.angular.io/guide/mdc-migration)
[Using Angular Flex-Layout to achieve Responsive Web Design](https://medium.com/@HonoraryMarleyans/using-angular-flex-layout-to-achieve-responsive-web-design-3b73c8424bc2)

### Style

[Modern CSS in Angular: Layouts](https://blog.angular.io/modern-css-in-angular-layouts-4a259dca9127)
[Button Over Image](https://play.tailwindcss.com/1DAQLmtEgC)
[The Tailwind CSS Components Library For Coding 10x Faster](https://www.material-tailwind.com/)

### State

[Keeping state with a Service using Signals](https://medium.com/ngconf/keeping-state-with-a-service-using-signals-bee652158ecf)
[Angular and IndexedDB: A Perfect Pair for Progressive Web Apps](https://medium.com/@zeeshankhan8838/angular-and-indexeddb-a-perfect-pair-for-progressive-web-apps-315a39f49)

# References

1. [Keeping state with a Service using Signals (May 18, 2023)](https://medium.com/ngconf/keeping-state-with-a-service-using-signals-bee652158ecf)
2. [Signalstory](https://www.npmjs.com/package/signalstory)
3. [InDepth Guide for Customizing Angular Material Button](https://dev.to/shhdharmen/indepth-guide-for-customizing-angular-material-button-58do)
4. [How to Build a Scheduling App like Calendly](https://www.devteam.space/blog/how-to-build-a-scheduling-app-like-calendly/)
5. [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
6. [How to Leverage Signals in Angular Services for Better Data Communication](https://dev.to/railsstudent/service-with-a-signal-in-angular-l9e)
7. [Deborah Korata's Angular-Signals github repo](https://github.com/DeborahK/Angular-Signals/blob/main/swVehicles-no-signals/src/app/cart/cart.service.ts)
8. [ng-select-with-footer (Stackblitz)](https://stackblitz.com/edit/ng-select-with-footer)
9. [ng-select-with-footer-reactive (Stackblitz)](https://stackblitz.com/edit/ng-select-with-footer-reactive)
10. [FileHelpers](https://www.filehelpers.net/)

# Deploy

## Azure App Container (Docker)

See git history for additions to the package.json script area related to the attempts while following articles:

1.  [Tutorial: Build and deploy your app to Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/tutorial-code-to-cloud?tabs=bash%2Ccsharp&pivots=acr-remote)

2.  [Tutorial: Communication between microservices in Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/communicate-between-microservices?tabs=bash&pivots=acr-remote)

These attempts were not successful. More research is required in to dockerfile configurations, and Azure App Container service.

Deployed resources in Azure Resource Group named [demo-apps](https://portal.azure.com/#@Vorba.onmicrosoft.com/resource/subscriptions/236217f7-0ad4-4dd6-8553-dc4b574fd2c5/resourceGroups/demo-apps/overview)

## Azure App Service (Linux)

### Prerequisites

1. Azure Account
2. VSCode
3. Azure App Service Extension for VSCode

### Procedures

1. Create App Service for Linux (i.e. [app-demo5b](https://portal.azure.com/#@Vorba.onmicrosoft.com/resource/subscriptions/236217f7-0ad4-4dd6-8553-dc4b574fd2c5/resourceGroups/demo-apps/providers/Microsoft.Web/sites/demo-app5b/appServices))
2. Build app

   ```
   ng build
   ```

3. Deploy app from App Service Extension, and select folder ./dist/<app_folder>
4. Configure App Service

   a. Application Settings / SCM_DO_BUILD_DURING_DEPLOYMENT

   ```
   SCM_DO_BUILD_DURING_DEPLOYMENT = false
   ```

   b. General Settings / Startup Command

   ```
   pm2 serve /home/site/wwwroot/browser --no-daemon --spa
   ```
