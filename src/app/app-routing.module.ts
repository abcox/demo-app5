import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './page/error-page/error-page.component';
import { menuItems } from './config';
import { HomePageComponent } from './page/home-page/home-page.component';
import { InvoicePageComponent } from './page/invoice-page/invoice-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import {
  requireAuthentication,
  denyWhenAuthenticated,
  denyWhenAuthenticatedWithAltPath,
  requireRoles,
} from './common/guards/auth.guard';
import { SignupPageComponent } from './page/signup-page/signup-page.component';
import { PasswordResetPageComponent } from './page/password-reset-page/password-reset-page.component';
import { AuthService } from './service/auth/auth.service';

export const routes: Routes = [
  ...menuItems.map(item => {
    return {
      path: `${item.routePath}`,
      component: item.component,
      canActivate:
        item?.canActivate ||
        (item?.allowGuest === true ? undefined : [requireAuthentication]),
      canDeactivate: (<any>item)?.canDeactivate, // todo: implement
    };
  }),
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
  //{ path: '**', redirectTo: '/login' }, // Redirect to login for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
