import { Routes } from '@angular/router';
import { NavComponent } from './component/demo/nav/nav.component';
import { StartPageComponent } from './page/start-page/start-page.component';
import { DemoPageComponent } from './page/demo-page/demo-page.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';

export const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'home', loadChildren: './home/home.module#HomeModule' },
  //{ path: 'about', loadChildren: './about/about.module#AboutModule' }
  { path: 'demo/nav', component: NavComponent },
  { path: 'start', component: StartPageComponent },
  { path: 'demo', component: DemoPageComponent },
  { path: '**', component: ErrorPageComponent },
];
