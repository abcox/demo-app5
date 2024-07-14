import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './page/error-page/error-page.component';
import { menuItems } from './config';
import { HomePageComponent } from './page/home-page/home-page.component';
import { InvoicePageComponent } from './page/invoice-page/invoice-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { authGuard } from './common/guards/auth.guard';
import { SignupPageComponent } from './page/signup-page/signup-page.component';
import { PasswordResetPageComponent } from './page/password-reset-page/password-reset-page.component';

export const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'home', loadChildren: './home/home.module#HomeModule' },
  //{ path: 'about', loadChildren: './about/about.module#AboutModule' }
  //{ path: 'start', component: StartPageComponent },
  //{ path: 'demo', component: DemoPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
  ...menuItems.map(item => {
    return {
      path: `${item.routePath}`,
      component: item.component,
      canActivate: [authGuard],
    };
  }),
  { path: 'login', component: LoginPageComponent },
  { path: 'password-reset', component: PasswordResetPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
  //{ path: '**', redirectTo: '/login' }, // Redirect to login for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
