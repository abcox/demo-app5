import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { UserStateService } from '../../service/user-state/user-state.service';

export const requireAuthentication: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('authGuard: isAuthenticated', authService.isAuthenticated());
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
  }
  return authService.isAuthenticated();
};

export const denyWhenAuthenticated = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    // If the user is authenticated, redirect them away from /signup
    return router.parseUrl('/'); // Redirect to home or dashboard
  } else {
    // If the user is not authenticated, allow navigation to /signup
    return true;
  }
};

// alternatively, we could refactor as:
export const denyWhenAuthenticatedWithAltPath = (
  path: string
): boolean | UrlTree =>
  inject(AuthService).isAuthenticated() ? inject(Router).parseUrl(path) : true;

// todo: test this!!
export const requireRoles = (
  authRoles: string[],
  redirectPath: string
): boolean | UrlTree => {
  //const userRoles = inject(UserStateService).profile()?.roles ?? [];
  const userRoles = inject(AuthService).getUserRoles() ?? [];
  const isAuthenticated = inject(AuthService).isAuthenticated();
  return isAuthenticated && !authRoles.some(role => userRoles.includes(role))
    ? inject(Router).parseUrl(redirectPath)
    : true;
};
