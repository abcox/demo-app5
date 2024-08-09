//import { Routes } from '@angular/router';
//import { ErrorPageComponent } from './page/error-page/error-page.component';
//import { menuItems } from './config';
//import { HomePageComponent } from './page/home-page/home-page.component';
//import { LoginPageComponent } from './page/login-page/login-page.component';
//import { authGuard } from './common/guards/auth.guard';
//import { InvalidPageComponent } from './page/invalid-page/invalid-page.component';

// WARNING!!  this is deprecated --> use app-routing.module.ts instead

//export const AppRoutes: Routes = [
//  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
//  //{ path: 'home', loadChildren: './home/home.module#HomeModule' },
//  //{ path: 'about', loadChildren: './about/about.module#AboutModule' }
//  //{ path: 'start', component: StartPageComponent },
//  //{ path: 'demo', component: DemoPageComponent },
//  { path: 'home', component: HomePageComponent },
//  ...menuItems.map(item => {
//    return {
//      path: `${item.routePath}`,
//      component: item.component,
//      //canActivate: [authGuard],
//    };
//  }),
//  //{ path: 'invalid', component: InvalidPageComponent },
//  { path: 'login', component: LoginPageComponent },
//  //{ path: '', redirectTo: '/invalid', pathMatch: 'full' },
//  { path: '**', component: ErrorPageComponent },
//  //{ path: '**', redirectTo: '/invalid' }, // Redirect to login for unknown routes
//];
