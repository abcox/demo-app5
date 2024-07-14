import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

// bootstrap by standalone component
//bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
