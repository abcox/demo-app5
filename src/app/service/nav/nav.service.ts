import { Injectable, inject, signal } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {
  AuthResponse,
  AuthResult,
  PasswordResetRequest,
  AuthService as backendAuthService,
} from '../../../backend-api/v1';
import { menuItems } from '../../config';
import { UserStateService } from '../user-state/user-state.service';
import { AuthService } from '../auth/auth.service';

export const getMenuItemsFilteredByUserRoles = () => {
  const auth = inject(AuthService);
  const user = inject(UserStateService);
  const isAuthenticated = auth.isAuthenticated();
  const values = menuItems.filter(item => {
    /* item.visible !== false && */
    const allowedRoles = item?.roles ?? [];
    const userRoles = user.profile()?.roles ?? [];
    const filter =
      (allowedRoles.includes('guest') && !isAuthenticated) ||
      (isAuthenticated &&
        (allowedRoles.length === 0 ||
          /* allowedRoles.includes('guest') || */
          item?.roles?.some(role => userRoles.includes(role))));
    /* console.log('getMenuItemsFilteredByUserRoles', {
      item,
      allowedRoles,
      userRoles,
      isAuthenticated,
      filter,
    }); */
    return filter;
  });
  return values;
};

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private authService = inject(backendAuthService);
  private router = inject(Router);
  constructor() {}
}
