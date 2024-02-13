# DemoApp5

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

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

# Resources

1. [Angular Material Theming System: Complete Guide](https://angular-material.dev/articles/angular-material-theming-system-complete-guide)

2. [Install Schematics](https://material.angular.io/guide/schematics)

3. [NG Add Schematic](https://brianflove.com/posts/2018-12-15-ng-add-schematic/)

# References

1. [Keeping state with a Service using Signals (May 18, 2023)](https://medium.com/ngconf/keeping-state-with-a-service-using-signals-bee652158ecf)
2. [Signalstory](https://www.npmjs.com/package/signalstory)
3. [InDepth Guide for Customizing Angular Material Button](https://dev.to/shhdharmen/indepth-guide-for-customizing-angular-material-button-58do)
