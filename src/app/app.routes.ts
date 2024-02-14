import { Routes } from '@angular/router';
import { ErrorPageComponent } from './page/error-page/error-page.component';
import { menuItems } from './config';
import { HomePageComponent } from './page/home-page/home-page.component';
import { InvoicePageComponent } from './page/invoice-page/invoice-page.component';

export const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'home', loadChildren: './home/home.module#HomeModule' },
  //{ path: 'about', loadChildren: './about/about.module#AboutModule' }
  //{ path: 'start', component: StartPageComponent },
  //{ path: 'demo', component: DemoPageComponent },
  ...menuItems.map(item => {
    return { path: item.routePath, component: item.component };
  }),
  { path: 'home', component: HomePageComponent },
  { path: 'invoice/:id', component: InvoicePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];
